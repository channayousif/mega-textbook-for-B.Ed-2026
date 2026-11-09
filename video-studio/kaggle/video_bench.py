"""VS-005 open-model video bench, run as a Kaggle script kernel (GPU T4 x2).

Pushed by `npm run video:bench -- run`. It:
  1. finds the private input dataset (candidates.json, shots.json, workflows, stills, manifest.json)
     and verifies every input hash (fail closed);
  2. clones ComfyUI at the pinned commit and installs its requirements, keeping Kaggle's CUDA torch;
  3. for each active candidate: checks free disk, downloads its weights at the pinned Hugging Face
     revision, verifies each SHA-256, starts one ComfyUI server per GPU and runs the shot jobs;
  4. composites I2V start frames from the cast and set PNGs, encodes every clip with x264 and
     records wall time, peak VRAM and peak host RAM per clip;
  5. writes report.json and output-manifest.json under /kaggle/working/out.
Only /kaggle/working/out is uploaded back; weights and frames live in /tmp.

No GPU needed:  python3 -I video_bench.py --selftest <inputs-dir>   (build and check every graph)
                python3 -I video_bench.py --verify-only <inputs-dir> (input tamper test)
"""
import copy, glob, hashlib, json, os, shutil, subprocess, sys, threading, time, traceback, urllib.error, urllib.request, uuid

OUT = "/kaggle/working/out"
WORK = "/tmp/vs-video"
COMFY = os.path.join(WORK, "ComfyUI")
BASE_PORT = 8188
HEADROOM_BYTES = 6 * 1024 ** 3   # frames, encode and ComfyUI temp files
NODE_IMAGE = "6"                 # LoadImage node id in every workflow
NODE_SAVE = "11"                 # SaveImage node id in every workflow
FAMILY_FILES = {                 # workflow placeholder per file role
    "wan22_ti2v": {"unet": "unet", "clip": "clip", "vae": "vae"},
    "hunyuan15_i2v": {"unet": "unet", "clip1": "clip1", "clip2": "clip2", "vae": "vae", "clip_vision": "clip_vision"},
}


def log(msg):
    print("video_bench: " + msg, flush=True)


def die(msg, code=2):
    log("FAIL: " + msg)
    sys.exit(code)


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def flat_name(rel):
    """Stills are packed flat (Kaggle uploads skip subfolders): sets/classroom.png -> sets__classroom.png."""
    return rel.replace("/", "__")


# ---------------------------------------------------------------- inputs

def verify_inputs(inputs):
    manifest = json.load(open(os.path.join(inputs, "manifest.json")))
    bad = [n for n, want in manifest["files"].items()
           if not os.path.isfile(os.path.join(inputs, n)) or sha256(os.path.join(inputs, n)) != want]
    if bad:
        die("input hash mismatch or missing: %s" % bad[:5])
    log("inputs verified (%d files)" % len(manifest["files"]))
    return manifest


def load_spec(inputs):
    cands = json.load(open(os.path.join(inputs, "candidates.json")))
    shots = json.load(open(os.path.join(inputs, "shots.json"), encoding="utf-8"))
    workflows = {}
    for c in cands["candidates"]:
        workflows[c["workflow"]] = json.load(open(os.path.join(inputs, c["workflow"])))
    return cands, shots, workflows


def resolve_shot(shot, shots):
    """A style-arm shot borrows image and prompt from its base shot."""
    if "base" not in shot:
        return shot
    base = next(s for s in shots["shots"] if s["id"] == shot["base"])
    merged = dict(base)
    merged.update({k: v for k, v in shot.items() if k != "base"})
    return merged


def shot_texts(shot, shots):
    """Positive and negative prompts: shot prompt + brand (or style-arm) suffix; brand negative + motion negative."""
    style = shots["style_arms"][shot["style"]] if shot.get("style") else shots["brand_style"]
    positive = "%s %s" % (shot["prompt"].strip(), style["prompt_suffix"].strip())
    negative = "%s, %s" % (style["negative"].strip(), shots["motion_negative"].strip())
    return positive, negative


def jobs_for(cands, shots, mode):
    """(candidate, shot, seed) triples, honouring active flags, supported kinds and smoke mode."""
    out = []
    for c in cands["candidates"]:
        if not c.get("active", True):
            continue
        if mode == "smoke":
            s = resolve_shot(next(x for x in shots["shots"] if x["id"] == cands["smoke"]["shot"]), shots)
            if s["kind"] in c["kinds"]:
                out.append((c, s, cands["smoke"]["seed"]))
            continue
        for raw in shots["shots"]:
            s = resolve_shot(raw, shots)
            if s["kind"] not in c["kinds"]:
                continue
            for seed in cands["seeds"]:
                out.append((c, s, seed))
    return out


# ---------------------------------------------------------------- graphs

def fill(node, values):
    """Replace every "$name" string with values[name] (keeps the value's JSON type)."""
    if isinstance(node, dict):
        return {k: fill(v, values) for k, v in node.items()}
    if isinstance(node, list):
        return [fill(v, values) for v in node]
    if isinstance(node, str) and node.startswith("$"):
        key = node[1:]
        if key not in values:
            raise KeyError("workflow placeholder %s has no value" % node)
        return values[key]
    return node


def build_graph(workflow, cand, shot, seed, shots, image_name, prefix, length=None):
    graph = {k: copy.deepcopy(v) for k, v in workflow.items() if not k.startswith("_")}
    if shot["kind"] == "t2v":
        graph.pop(NODE_IMAGE, None)
        for node in graph.values():
            node["inputs"].pop("start_image", None)
    positive, negative = shot_texts(shot, shots)
    values = dict(cand["params"])
    if length:
        values["length"] = length
    values.update(positive=positive, negative=negative, seed=seed, prefix=prefix, image=image_name or "")
    roles = FAMILY_FILES[cand["family"]]
    for f in cand["files"]:
        if f["role"] in roles:
            values[roles[f["role"]]] = os.path.basename(f["path"])
    graph = fill(graph, values)
    check_graph(graph)
    return graph


def check_graph(graph):
    """Every link must point at an existing node; no placeholder may survive."""
    for nid, node in graph.items():
        for key, val in node["inputs"].items():
            if isinstance(val, list) and len(val) == 2 and isinstance(val[0], str):
                if val[0] not in graph:
                    raise ValueError("node %s input %s links to missing node %s" % (nid, key, val[0]))
            if isinstance(val, str) and val.startswith("$"):
                raise ValueError("node %s input %s still has placeholder %s" % (nid, key, val))


# ---------------------------------------------------------------- stills

def composite(shot, inputs, width, height, dest):
    """Cover-fit the set to width x height, then paste cast layers anchored bottom-centre at x."""
    from PIL import Image
    spec = shot["image"]
    bg = Image.open(os.path.join(inputs, flat_name(spec["background"]))).convert("RGB")
    scale = max(width / bg.width, height / bg.height)
    bg = bg.resize((round(bg.width * scale), round(bg.height * scale)), Image.LANCZOS)
    left, top = (bg.width - width) // 2, (bg.height - height) // 2
    canvas = bg.crop((left, top, left + width, top + height)).convert("RGBA")
    for layer in spec.get("layers", []):
        im = Image.open(os.path.join(inputs, flat_name(layer["file"]))).convert("RGBA")
        h = round(height * layer["height"])
        im = im.resize((round(im.width * h / im.height), h), Image.LANCZOS)
        x = round(width * layer["x"] - im.width / 2)
        canvas.paste(im, (x, height - h), im)  # paste clips at the edges; alpha_composite rejects negative offsets
    canvas.convert("RGB").save(dest)
    return dest


# ---------------------------------------------------------------- ComfyUI

def run(cmd, **kw):
    log("+ " + " ".join(cmd))
    return subprocess.run(cmd, check=True, **kw)


def install_comfy(pin):
    if not os.path.isdir(COMFY):
        run(["git", "clone", "--filter=blob:none", pin["repo"], COMFY])
    run(["git", "-C", COMFY, "checkout", "-q", pin["commit"]])
    head = subprocess.run(["git", "-C", COMFY, "rev-parse", "HEAD"], capture_output=True, text=True).stdout.strip()
    if head != pin["commit"]:
        die("ComfyUI HEAD %s is not the pinned %s" % (head, pin["commit"]))
    # Keep Kaggle's CUDA build of torch: drop torch, torchvision and torchaudio from the requirements.
    reqs = [l for l in open(os.path.join(COMFY, "requirements.txt")).read().splitlines()
            if l.strip() and not l.strip().startswith("#")
            and not l.split("=")[0].split(">")[0].split("<")[0].strip().lower() in ("torch", "torchvision", "torchaudio")]
    open(os.path.join(WORK, "comfy-reqs.txt"), "w").write("\n".join(reqs) + "\n")
    run([sys.executable, "-m", "pip", "install", "-q", "-r", os.path.join(WORK, "comfy-reqs.txt"), "huggingface_hub"])


def download(cand, models_dir):
    from huggingface_hub import hf_hub_download
    need = sum(f["size"] for f in cand["files"]) + HEADROOM_BYTES
    free = shutil.disk_usage(WORK).free
    if free < need:
        raise RuntimeError("not enough disk for %s: need %.1f GB, free %.1f GB" % (cand["id"], need / 1e9, free / 1e9))
    took = {}
    for f in cand["files"]:
        t0 = time.time()
        src = hf_hub_download(cand["hf_repo"], f["path"], revision=cand["revision"], local_dir=os.path.join(WORK, "hf"))
        if os.path.getsize(src) != f["size"] or sha256(src) != f["sha256"]:
            raise RuntimeError("weight hash mismatch: %s" % f["path"])
        dest_dir = os.path.join(models_dir, f["dir"])
        os.makedirs(dest_dir, exist_ok=True)
        dest = os.path.join(dest_dir, os.path.basename(f["path"]))
        if os.path.lexists(dest):
            os.remove(dest)
        os.symlink(os.path.realpath(src), dest)
        took[os.path.basename(f["path"])] = round(time.time() - t0, 1)
    return took


def purge_weights(cand, models_dir):
    """Free the disk before the next candidate: drop the model symlinks and the downloaded files."""
    for f in cand["files"]:
        for p in (os.path.join(models_dir, f["dir"], os.path.basename(f["path"])), os.path.join(WORK, "hf", f["path"])):
            if os.path.lexists(p):
                os.remove(p)
    shutil.rmtree(os.path.join(WORK, "hf", ".cache"), ignore_errors=True)


def http(method, port, path, body=None, timeout=30):
    req = urllib.request.Request("http://127.0.0.1:%d%s" % (port, path), method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read() or b"{}")


class Server:
    def __init__(self, gpu, extra_args, input_dir):
        self.gpu, self.port = gpu, BASE_PORT + gpu
        self.out_dir = os.path.join(WORK, "frames", "gpu%d" % gpu)
        os.makedirs(self.out_dir, exist_ok=True)
        self.log_path = os.path.join(OUT, "comfy-gpu%d.log" % gpu)
        cmd = [sys.executable, "main.py", "--listen", "127.0.0.1", "--port", str(self.port), "--cuda-device", str(gpu),
               "--input-directory", input_dir, "--output-directory", self.out_dir, "--disable-auto-launch"] + list(extra_args)
        self.proc = subprocess.Popen(cmd, cwd=COMFY, stdout=open(self.log_path, "a"), stderr=subprocess.STDOUT)
        for _ in range(180):
            if self.proc.poll() is not None:
                raise RuntimeError("ComfyUI on GPU %d exited at start; see %s" % (gpu, os.path.basename(self.log_path)))
            try:
                http("GET", self.port, "/system_stats", timeout=5)
                return
            except (urllib.error.URLError, ConnectionError, OSError):
                time.sleep(2)
        raise RuntimeError("ComfyUI on GPU %d did not start in 6 min" % gpu)

    def generate(self, graph, timeout_s=3 * 3600):
        try:
            pid = http("POST", self.port, "/prompt", {"prompt": graph, "client_id": str(uuid.uuid4())})["prompt_id"]
        except urllib.error.HTTPError as e:
            raise RuntimeError("ComfyUI rejected the graph: %s" % e.read().decode()[:2000])
        t0 = time.time()
        while time.time() - t0 < timeout_s:
            time.sleep(3)
            if self.proc.poll() is not None:
                raise RuntimeError("ComfyUI on GPU %d died mid-job (out of memory?)" % self.gpu)
            hist = http("GET", self.port, "/history/" + pid).get(pid)
            if not hist:
                continue
            status = hist.get("status", {})
            if status.get("status_str") != "success":
                raise RuntimeError("job failed: %s" % json.dumps(status.get("messages", []))[-2000:])
            images = hist["outputs"][NODE_SAVE]["images"]
            return [os.path.join(self.out_dir, i.get("subfolder", ""), i["filename"]) for i in images]
        raise RuntimeError("job still running after %d s" % timeout_s)

    def stop(self):
        self.proc.terminate()
        try:
            self.proc.wait(30)
        except subprocess.TimeoutExpired:
            self.proc.kill()


# ---------------------------------------------------------------- metrics and encode

class Sampler(threading.Thread):
    """Samples per-GPU used memory and host used RAM every 2 s; jobs read peaks over their window."""
    def __init__(self):
        super().__init__(daemon=True)
        self.samples, self.stop_flag = [], False

    def run(self):
        while not self.stop_flag:
            t = time.time()
            gpu = {}
            try:
                q = subprocess.run(["nvidia-smi", "--query-gpu=index,memory.used", "--format=csv,noheader,nounits"],
                                   capture_output=True, text=True, timeout=10).stdout
                for line in q.strip().splitlines():
                    i, used = [x.strip() for x in line.split(",")]
                    gpu[int(i)] = int(used)
            except Exception:  # noqa: BLE001 - metrics are best effort
                pass
            mem = dict(l.split(":", 1) for l in open("/proc/meminfo").read().splitlines() if ":" in l)
            host = (int(mem["MemTotal"].split()[0]) - int(mem["MemAvailable"].split()[0])) // 1024
            self.samples.append((t, gpu, host))
            time.sleep(2)

    def peaks(self, gpu, t0, t1):
        window = [s for s in self.samples if t0 <= s[0] <= t1]
        return (max([s[1].get(gpu, 0) for s in window], default=None), max([s[2] for s in window], default=None))


def ffmpeg_bin():
    found = shutil.which("ffmpeg")
    if found:
        return found
    run([sys.executable, "-m", "pip", "install", "-q", "imageio-ffmpeg"])
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def encode(frames, fps, dest):
    seq = os.path.join(WORK, "seq-" + uuid.uuid4().hex)
    os.makedirs(seq)
    for n, f in enumerate(sorted(frames)):
        os.symlink(f, os.path.join(seq, "f%05d.png" % n))
    run([ffmpeg_bin(), "-hide_banner", "-loglevel", "error", "-y", "-framerate", str(fps), "-i", os.path.join(seq, "f%05d.png"),
         "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", dest])
    shutil.rmtree(seq)
    for f in frames:
        os.remove(f)


def black_frames(frames):
    """Count near-black frames (fp16 overflow shows up as black output)."""
    from PIL import Image, ImageStat
    return sum(1 for f in frames if max(ImageStat.Stat(Image.open(f).convert("L")).extrema[0]) < 8)


# ---------------------------------------------------------------- bench

def run_candidate(cand, jobs, cands, shots, workflows, inputs, mode, sampler, clips, gpus):
    models_dir = os.path.join(COMFY, "models")
    took = download(cand, models_dir)
    log("%s: weights verified %s" % (cand["id"], took))
    input_dir = os.path.join(WORK, "input")
    os.makedirs(input_dir, exist_ok=True)
    n_workers = max(1, min(cands.get("workers", 1), gpus))
    servers = [Server(g, cand.get("comfy_args", []), input_dir) for g in range(n_workers)]
    length = cands["smoke"]["length"] if mode == "smoke" else None
    try:
        if mode == "smoke":
            # Phase 1: one job alone on GPU 0 (cold, then warm). Phase 2: the same job on every GPU at once.
            phases = [[(0, jobs[0])], [(0, jobs[0])], [(g, jobs[0]) for g in range(n_workers)]]
            labels = ["solo-cold", "solo-warm", "parallel-%d" % n_workers]
        else:
            queues = [[] for _ in range(n_workers)]
            for i, j in enumerate(jobs):
                queues[i % n_workers].append(j)
            phases, labels = [[(g, j) for g, q in enumerate(queues) for j in q]], ["full"]
        for label, phase in zip(labels, phases):
            by_gpu = {}
            for g, j in phase:
                by_gpu.setdefault(g, []).append(j)
            threads = [threading.Thread(target=worker, args=(servers[g], q, cand, cands, shots, workflows, inputs, input_dir,
                                                             length, label, sampler, clips)) for g, q in by_gpu.items()]
            for t in threads:
                t.start()
            for t in threads:
                t.join()
    finally:
        for s in servers:
            s.stop()
        purge_weights(cand, models_dir)


def worker(server, queue, cand, cands, shots, workflows, inputs, input_dir, length, label, sampler, clips):
    p = cand["params"]
    for c, shot, seed in queue:
        name = "%s_%s_s%d" % (cand["id"], shot["id"], seed) + ("-%s-gpu%d" % (label, server.gpu) if label != "full" else "")
        row = {"file": "clips/%s.mp4" % name, "candidate": cand["id"], "shot": shot["id"], "seed": seed, "phase": label,
               "gpu": server.gpu, "width": p["width"], "height": p["height"], "length": length or p["length"],
               "fps": p["fps"], "steps": p["steps"]}
        try:
            image = None
            if shot["kind"] == "i2v":
                image = "%s_%s_%d.png" % (cand["id"], shot["id"], server.gpu)
                composite(shot, inputs, p["width"], p["height"], os.path.join(input_dir, image))
            graph = build_graph(workflows[cand["workflow"]], cand, shot, seed, shots, image, name, length)
            t0 = time.time()
            frames = server.generate(graph)
            t1 = time.time()
            row["seconds"] = round(t1 - t0, 1)
            row["peak_vram_mib"], row["peak_host_ram_mib"] = sampler.peaks(server.gpu, t0, t1)
            row["frames"] = len(frames)
            row["black_frames"] = black_frames(frames)
            os.makedirs(os.path.join(OUT, "clips"), exist_ok=True)
            encode(frames, p["fps"], os.path.join(OUT, row["file"]))
            row["status"] = "ok"
        except Exception as e:  # noqa: BLE001 - one failed clip must not stop the bench
            row["status"] = "error: %s" % str(e)[:500]
            row.pop("file", None)
            traceback.print_exc()
        log(json.dumps(row))
        clips.append(row)


def write_output_manifest(inputs):
    outputs = {}
    for root, _d, files in os.walk(OUT):
        for f in files:
            if f == "output-manifest.json":
                continue
            p = os.path.join(root, f)
            outputs[os.path.relpath(p, OUT)] = sha256(p)
    json.dump({"input_manifest_sha256": sha256(os.path.join(inputs, "manifest.json")), "outputs": outputs},
              open(os.path.join(OUT, "output-manifest.json"), "w"), indent=2)


def selftest(inputs):
    cands, shots, workflows = load_spec(inputs)
    tmp = os.path.join("/tmp", "vs-video-selftest")
    os.makedirs(tmp, exist_ok=True)
    n = 0
    for c in cands["candidates"]:
        c = dict(c, active=True)
        for mode in ("full", "smoke"):
            for cand, shot, seed in jobs_for(dict(cands, candidates=[c]), shots, mode):
                build_graph(workflows[cand["workflow"]], cand, shot, seed, shots, "x.png", "p", 25 if mode == "smoke" else None)
                if shot["kind"] == "i2v" and os.path.isfile(os.path.join(inputs, flat_name(shot["image"]["background"]))):
                    composite(shot, inputs, cand["params"]["width"], cand["params"]["height"],
                              os.path.join(tmp, "%s_%s.png" % (cand["id"], shot["id"])))
                n += 1
    print("selftest: %d graphs ok; composited stills (if packed) in %s" % (n, tmp))


def main():
    if len(sys.argv) == 3 and sys.argv[1] == "--verify-only":
        verify_inputs(sys.argv[2])
        return
    if len(sys.argv) == 3 and sys.argv[1] == "--selftest":
        selftest(sys.argv[2])
        return
    found = glob.glob("/kaggle/input/**/candidates.json", recursive=True)
    if len(found) != 1:
        die("expected one candidates.json under /kaggle/input, found %d" % len(found))
    inputs = os.path.dirname(found[0])
    verify_inputs(inputs)
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(WORK, exist_ok=True)
    cands, shots, workflows = load_spec(inputs)
    mode = cands.get("mode", "full")
    gpus = len([l for l in subprocess.run(["nvidia-smi", "-L"], capture_output=True, text=True).stdout.splitlines() if l.strip()])
    if gpus == 0:
        die("no GPU in this session; the bench needs the T4 x2 accelerator")
    started = time.time()
    install_comfy(cands["comfyui"])
    import torch  # noqa: E402 - only after the session is known to have a GPU
    sampler = Sampler()
    sampler.start()
    status, clips = {}, []
    for cand in [c for c in cands["candidates"] if c.get("active", True)]:
        jobs = [j for j in jobs_for(dict(cands, candidates=[cand]), shots, mode)]
        if not jobs:
            status[cand["id"]] = "skipped: no shots of its kinds"
            continue
        t0 = time.time()
        try:
            run_candidate(cand, jobs, cands, shots, workflows, inputs, mode, sampler, clips, gpus)
            ok = sum(1 for c in clips if c["candidate"] == cand["id"] and c["status"] == "ok")
            status[cand["id"]] = "%d/%d clips in %.0f s" % (ok, len(jobs) if mode != "smoke" else 2 + min(gpus, cands.get("workers", 1)), time.time() - t0)
        except Exception as e:  # noqa: BLE001
            traceback.print_exc()
            status[cand["id"]] = "error: %s" % str(e)[:500]
    sampler.stop_flag = True
    for c in clips:
        if c["status"] == "ok":
            c["sha256"] = sha256(os.path.join(OUT, c["file"]))
    gpu_names = subprocess.run(["nvidia-smi", "-L"], capture_output=True, text=True).stdout.strip()
    json.dump({"mode": mode, "status": status, "comfyui": cands["comfyui"], "torch": torch.__version__,
               "cuda": torch.version.cuda, "gpu": gpu_names, "session_minutes": round((time.time() - started) / 60, 1),
               "clips": clips}, open(os.path.join(OUT, "report.json"), "w"), indent=2)
    write_output_manifest(inputs)
    log("done: " + json.dumps(status))


main()
