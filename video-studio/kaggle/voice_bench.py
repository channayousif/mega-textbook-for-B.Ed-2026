"""Kaggle job for the VS-003 Urdu voice benchmark (VS-ADR-0011).

Generates `takes` takes per character for each open-source candidate in candidates.json, using the
texts in passages.json, then loudness-normalises them so the blind comparison is about the voice,
not the volume. Each candidate runs in its own process (and Parler in its own Python 3.11 venv,
since it pins transformers==4.46.1). A candidate that cannot run is reported as skipped, never faked.

Outputs in /kaggle/working/out: takes/<candidate>_<character>_take<k>.wav, report.json,
output-manifest.json.
"""
import glob, hashlib, json, os, shutil, subprocess, sys, time, traceback, wave

OUT = "/kaggle/working/out"
SEED_BASE = 1000


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 16), b""):
            h.update(chunk)
    return h.hexdigest()


def write_wav(path, samples, rate):
    import numpy as np
    pcm = (np.clip(samples, -1, 1) * 32767).astype("<i2").tobytes()
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(pcm)


def gen(cand, passages, takes):
    """Child process: generate all takes for one candidate."""
    import torch
    device = "cuda" if torch.cuda.is_available() else "cpu"
    os.makedirs(os.path.join(OUT, "takes"), exist_ok=True)
    rows = []
    if cand["engine"] == "mms":
        from transformers import AutoTokenizer, VitsModel
        model = VitsModel.from_pretrained(cand["model"]).to(device)
        tok = AutoTokenizer.from_pretrained(cand["model"])
        rate, rev = model.config.sampling_rate, getattr(model.config, "_commit_hash", None)
        synth = lambda text, _desc: model(**tok(text, return_tensors="pt").to(device)).waveform[0].cpu().numpy()
    elif cand["engine"] == "parler":
        from parler_tts import ParlerTTSForConditionalGeneration
        from transformers import AutoTokenizer
        model = ParlerTTSForConditionalGeneration.from_pretrained(cand["model"]).to(device)
        tok = AutoTokenizer.from_pretrained(cand["model"])
        dtok = AutoTokenizer.from_pretrained(model.config.text_encoder._name_or_path)
        rate, rev = model.config.sampling_rate, getattr(model.config, "_commit_hash", None)

        def synth(text, desc):
            d = dtok(desc, return_tensors="pt").to(device)
            p = tok(text, return_tensors="pt").to(device)
            g = model.generate(input_ids=d.input_ids, attention_mask=d.attention_mask,
                               prompt_input_ids=p.input_ids, prompt_attention_mask=p.attention_mask)
            return g.cpu().numpy().squeeze()
    else:
        raise SystemExit("unknown engine " + cand["engine"])
    for character, opts in cand["characters"].items():
        for k in range(1, takes + 1):
            seed = SEED_BASE + k
            torch.manual_seed(seed)
            t0 = time.time()
            with torch.no_grad():
                samples = synth(passages[character], opts.get("description", ""))
            path = os.path.join(OUT, "takes", "%s_%s_take%d.wav" % (cand["id"], character, k))
            write_wav(path, samples, rate)
            rows.append({"file": os.path.relpath(path, OUT), "candidate": cand["id"], "character": character,
                         "take": k, "seed": seed, "seconds": round(len(samples) / rate, 2),
                         "gen_seconds": round(time.time() - t0, 1), "sampling_rate": rate})
    json.dump({"revision": rev, "device": device, "rows": rows},
              open(os.path.join(OUT, "_%s.json" % cand["id"]), "w"), indent=2)


def python_for(cand, log):
    """Interpreter for a candidate: the image's Python, or a uv venv for pinned packages."""
    if "package" not in cand:
        return sys.executable
    venv = "/tmp/venv-" + cand["id"]
    if not os.path.exists(venv + "/bin/python"):
        subprocess.run([sys.executable, "-m", "pip", "install", "-q", "uv"], check=True)
        subprocess.run(["uv", "venv", venv, "--python", "3.11", "-q"], check=True)
        subprocess.run(["uv", "pip", "install", "-q", "--python", venv + "/bin/python",
                        cand["package"], "numpy"], check=True, stdout=log, stderr=log)
    return venv + "/bin/python"


def normalise(path):
    """Two-pass loudnorm to -16 LUFS with ffmpeg when present; returns the method used."""
    ff = shutil.which("ffmpeg")
    if not ff:
        return "none (ffmpeg missing)"
    tmp = path + ".norm.wav"
    subprocess.run([ff, "-v", "error", "-y", "-i", path, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
                    "-ar", "48000", "-ac", "1", tmp], check=True)
    os.replace(tmp, path)
    return "ffmpeg loudnorm I=-16 TP=-1.5, 48 kHz mono"


def main():
    if len(sys.argv) == 4 and sys.argv[1] == "--gen":
        inputs = sys.argv[3]
        cands = json.load(open(os.path.join(inputs, "candidates.json")))
        cand = next(c for c in cands["candidates"] if c["id"] == sys.argv[2])
        gen(cand, json.load(open(os.path.join(inputs, "passages.json"), encoding="utf-8")), cands["takes"])
        return
    found = glob.glob("/kaggle/input/**/candidates.json", recursive=True)
    if len(found) != 1:
        raise SystemExit("expected one candidates.json under /kaggle/input, found %d" % len(found))
    inputs = os.path.dirname(found[0])
    manifest = json.load(open(os.path.join(inputs, "manifest.json")))
    for name, want in manifest["files"].items():
        if sha256(os.path.join(inputs, name)) != want:
            raise SystemExit("input hash mismatch: " + name)
    os.makedirs(OUT, exist_ok=True)
    cands = json.load(open(os.path.join(inputs, "candidates.json")))
    env = dict(os.environ)
    try:
        from kaggle_secrets import UserSecretsClient
        env["HF_TOKEN"] = UserSecretsClient().get_secret("HF_TOKEN")
    except Exception:  # noqa: BLE001 - the secret is optional; candidates needing it are skipped
        pass
    status = {}
    for cand in cands["candidates"]:
        if cand.get("needs_secret") and not env.get(cand["needs_secret"]):
            status[cand["id"]] = "skipped: Kaggle secret %s is not attached to this notebook" % cand["needs_secret"]
            continue
        t0 = time.time()
        log_path = os.path.join(OUT, "log-%s.txt" % cand["id"])
        with open(log_path, "w") as log:
            try:
                py = python_for(cand, log)
                subprocess.run([py, os.path.abspath(__file__), "--gen", cand["id"], inputs],
                               check=True, env=env, stdout=log, stderr=log)
                status[cand["id"]] = "ok in %.0f s" % (time.time() - t0)
            except Exception:  # noqa: BLE001
                log.write(traceback.format_exc())
                status[cand["id"]] = "error: see log-%s.txt" % cand["id"]
    rows, revisions, norm = [], {}, None
    for cand in cands["candidates"]:
        part = os.path.join(OUT, "_%s.json" % cand["id"])
        if os.path.exists(part):
            p = json.load(open(part))
            os.remove(part)
            revisions[cand["id"]] = {"model": cand["model"], "revision": p["revision"], "device": p["device"],
                                     "licence": cand["licence"]}
            rows += p["rows"]
    for r in rows:
        norm = normalise(os.path.join(OUT, r["file"]))
        r["sha256"] = sha256(os.path.join(OUT, r["file"]))
    gpu = subprocess.run(["nvidia-smi", "-L"], capture_output=True, text=True).stdout.strip() or "none"
    json.dump({"status": status, "models": revisions, "normalisation": norm, "gpu": gpu, "takes": rows},
              open(os.path.join(OUT, "report.json"), "w"), indent=2)
    outputs = {}
    for root, _d, files in os.walk(OUT):
        for f in files:
            p = os.path.join(root, f)
            outputs[os.path.relpath(p, OUT)] = sha256(p)
    json.dump({"input_manifest_sha256": sha256(os.path.join(inputs, "manifest.json")), "outputs": outputs},
              open(os.path.join(OUT, "output-manifest.json"), "w"), indent=2)
    print("voice_bench: " + json.dumps(status), flush=True)


main()
