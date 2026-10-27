"""Kaggle notebook entry point for one video-studio render job (VS-ADR-0011).

Pushed by `npm run kaggle:run` as a script kernel. It:
  1. finds the private input dataset (manifest.json + project.tar.gz),
  2. verifies the tarball and every file inside it against manifest.json (fail closed),
  3. ensures Node 22 (checksum-verified download if the image lacks it) and Chrome libraries,
  4. if props.json asks for TTS (evaluation only, VS-003), voices each line on the GPU and
     retimes the captions to the real audio lengths,
  5. installs the pinned npm lockfile and runs kaggle/render-job.ts,
  6. writes output-manifest.json with the SHA-256 of every output.
Only /kaggle/working/out is produced; the build tree lives in /tmp so it is not uploaded back.

Local tamper test (no Kaggle needed):  python3 -I render.py --verify-only <bundle-dir>
"""
import glob, hashlib, json, os, platform, shutil, subprocess, sys, tarfile, time, urllib.request

NODE_VERSION = "22.22.1"
CHROME_LIBS = ["libnss3", "libdbus-1-3", "libatk1.0-0", "libgbm1", "libxrandr2", "libxkbcommon0",
               "libxfixes3", "libxcomposite1", "libxdamage1", "libatk-bridge2.0-0", "libpango-1.0-0",
               "libcairo2", "libcups2"]
WORK = "/tmp/vs"
OUT = "/kaggle/working/out"
timings = {}


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 16), b""):
            h.update(chunk)
    return h.hexdigest()


def die(msg, code=2):
    print("render.py: FAIL: " + msg, flush=True)
    sys.exit(code)


def verify(bundle_dir, extract_to):
    """Check the tarball hash, extract safely, then require the exact file set and hashes."""
    manifest_path = os.path.join(bundle_dir, "manifest.json")
    if not os.path.isfile(manifest_path):
        die("manifest.json missing from " + bundle_dir)
    manifest = json.load(open(manifest_path, encoding="utf-8"))
    tar_path = os.path.join(bundle_dir, manifest["bundle_file"])
    if sha256(tar_path) != manifest["bundle_sha256"]:
        die("bundle tarball hash does not match manifest")
    shutil.rmtree(extract_to, ignore_errors=True)
    os.makedirs(extract_to)
    with tarfile.open(tar_path, "r:gz") as tf:
        for m in tf.getmembers():
            if not (m.isfile() or m.isdir()) or m.name.startswith("/") or ".." in m.name.split("/"):
                die("unsafe tar member: " + m.name)
        try:
            tf.extractall(extract_to, filter="data")
        except TypeError:  # Python without tarfile filters; members were validated above
            tf.extractall(extract_to)
    found = {}
    for root, _dirs, files in os.walk(extract_to):
        for f in files:
            p = os.path.join(root, f)
            found[os.path.relpath(p, extract_to)] = sha256(p)
    expected = manifest["files"]
    if set(found) != set(expected):
        die("file set differs from manifest: extra=%s missing=%s"
            % (sorted(set(found) - set(expected))[:5], sorted(set(expected) - set(found))[:5]))
    bad = [p for p in expected if found[p] != expected[p]]
    if bad:
        die("hash mismatch: %s" % bad[:5])
    print("render.py: bundle verified (%d files)" % len(found), flush=True)
    return manifest


def run(cmd, **kw):
    print("+ " + " ".join(cmd), flush=True)
    return subprocess.run(cmd, check=True, **kw)


def ensure_node():
    try:
        v = subprocess.run(["node", "--version"], capture_output=True, text=True).stdout.strip()
        if v and int(v.lstrip("v").split(".")[0]) >= 22:
            return v
    except FileNotFoundError:
        pass
    base = "https://nodejs.org/dist/v%s/" % NODE_VERSION
    name = "node-v%s-linux-x64.tar.xz" % NODE_VERSION
    sums = urllib.request.urlopen(base + "SHASUMS256.txt", timeout=60).read().decode()
    want = next(l.split()[0] for l in sums.splitlines() if l.endswith(" " + name))
    dest = "/tmp/" + name
    urllib.request.urlretrieve(base + name, dest)
    if sha256(dest) != want:
        die("Node tarball checksum mismatch")
    with tarfile.open(dest) as tf:
        try:
            tf.extractall("/tmp", filter="data")
        except TypeError:
            tf.extractall("/tmp")
    os.environ["PATH"] = "/tmp/node-v%s-linux-x64/bin:%s" % (NODE_VERSION, os.environ["PATH"])
    return subprocess.run(["node", "--version"], capture_output=True, text=True).stdout.strip()


def ensure_chrome_libs():
    try:
        subprocess.run(["apt-get", "update", "-qq"], check=False, timeout=300)
        for lib in CHROME_LIBS + ["libasound2t64"]:
            subprocess.run(["apt-get", "install", "-y", "-qq", lib], check=False, timeout=300,
                           stdout=subprocess.DEVNULL)
        subprocess.run(["apt-get", "install", "-y", "-qq", "libasound2"], check=False, timeout=300,
                       stdout=subprocess.DEVNULL)
    except Exception as e:  # noqa: BLE001 - best effort; the render step reports real failures
        print("render.py: apt step skipped: %s" % e, flush=True)


def synthesize(work):
    """Voice each line with the requested open-source TTS and rewrite the timings in props.json."""
    props_path = os.path.join(work, "props.json")
    props = json.load(open(props_path, encoding="utf-8"))
    req = props.get("tts")
    if not req:
        return None
    if req["engine"] != "mms-tts-urd":
        die("unsupported tts engine: %s" % req["engine"])
    import numpy as np
    import torch
    import wave
    from transformers import AutoTokenizer, VitsModel
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = VitsModel.from_pretrained(req["model"]).to(device)
    tok = AutoTokenizer.from_pretrained(req["model"])
    rate = model.config.sampling_rate
    audio_dir = os.path.join(work, "remotion", "public", "audio")
    os.makedirs(audio_dir, exist_ok=True)
    os.makedirs(os.path.join(OUT, "audio"), exist_ok=True)
    t = req["lead_s"]
    report = []
    for line in props["lines"]:
        torch.manual_seed(req["seed"])
        with torch.no_grad():
            wav = model(**tok(line["text_ur"], return_tensors="pt").to(device)).waveform[0].cpu().numpy()
        pcm = (np.clip(wav, -1, 1) * 32767).astype("<i2").tobytes()
        name = "%s.wav" % line["id"]
        for dest in (os.path.join(audio_dir, name), os.path.join(OUT, "audio", name)):
            with wave.open(dest, "wb") as w:
                w.setnchannels(1)
                w.setsampwidth(2)
                w.setframerate(rate)
                w.writeframes(pcm)
        dur = len(wav) / rate
        line["audio"] = "audio/" + name
        line["from_s"] = round(t, 3)
        line["to_s"] = round(t + dur, 3)
        t = line["to_s"] + req["gap_s"]
        report.append({"id": line["id"], "seconds": round(dur, 2), "sha256": sha256(os.path.join(audio_dir, name))})
    props["duration_s"] = round(props["lines"][-1]["to_s"] + 0.5 + props["end_card"]["seconds"], 2)
    json.dump(props, open(props_path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    info = {"engine": req["engine"], "model": req["model"],
            "revision": getattr(model.config, "_commit_hash", None), "seed": req["seed"],
            "sampling_rate": rate, "device": device, "licence": "CC-BY-NC-4.0 (MMS); evaluation only",
            "lines": report, "duration_s": props["duration_s"]}
    json.dump(info, open(os.path.join(OUT, "tts-report.json"), "w", encoding="utf-8"), indent=2)
    return info


def step(name, fn):
    t0 = time.time()
    try:
        return fn()
    finally:
        timings[name] = round(time.time() - t0, 1)


def main():
    if len(sys.argv) == 3 and sys.argv[1] == "--verify-only":
        verify(sys.argv[2], "/tmp/vs-verify")
        return
    manifests = glob.glob("/kaggle/input/**/manifest.json", recursive=True)
    if len(manifests) != 1:
        die("expected exactly one manifest.json under /kaggle/input, found %d" % len(manifests))
    bundle_dir = os.path.dirname(manifests[0])
    manifest = step("verify_s", lambda: verify(bundle_dir, WORK))
    os.makedirs(OUT, exist_ok=True)
    step("tts_s", lambda: synthesize(WORK))
    node = step("node_s", ensure_node)
    step("apt_s", ensure_chrome_libs)
    step("npm_ci_s", lambda: run(["npm", "ci", "--no-audit", "--no-fund"], cwd=WORK))
    os.makedirs(OUT, exist_ok=True)
    step("render_job_s", lambda: run(["npx", "tsx", "kaggle/render-job.ts", "props.json", OUT], cwd=WORK))
    gpu = subprocess.run(["nvidia-smi", "-L"], capture_output=True, text=True).stdout.strip() or "none"
    outputs = {}
    for root, _dirs, files in os.walk(OUT):
        for f in files:
            if f == "output-manifest.json":
                continue
            p = os.path.join(root, f)
            outputs[os.path.relpath(p, OUT)] = sha256(p)
    json.dump({
        "episode_id": manifest["episode_id"],
        "input_manifest_sha256": sha256(os.path.join(bundle_dir, "manifest.json")),
        "outputs": outputs,
        "versions": {"node": node, "python": platform.python_version(), "remotion": manifest.get("remotion")},
        "gpu": gpu,
        "timings_s": timings,
    }, open(os.path.join(OUT, "output-manifest.json"), "w", encoding="utf-8"), indent=2)
    print("render.py: done %s" % json.dumps(timings), flush=True)


main()
