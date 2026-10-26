"""Kaggle job for the VS-003 Urdu voice benchmark (VS-ADR-0011).

Generates `takes` takes per character (a candidate may set its own `takes`) for each active open-source candidate in candidates.json,
using the texts in passages.json (or the candidate's own `passages` file, e.g. the Devanagari
transliteration), then loudness-normalises them so the blind comparison is about the voice, not the
volume. Cloning engines take the character's reference clips from `refs`, cycling one per take. Each
candidate runs in its own process, and in its own uv venv when it pins packages. A candidate that
cannot run is reported as skipped or errored, never faked.

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


def model_path(cand):
    """A privately mirrored model dataset if mounted, else the Hugging Face id."""
    slug = cand.get("model_dataset")
    if slug:
        hits = [os.path.dirname(p) for p in glob.glob("/kaggle/input/**/config.json", recursive=True)
                if "/%s/" % slug in p + "/" or os.path.basename(os.path.dirname(p)) == slug]
        if hits:
            return hits[0]
    return cand["model"]


def by_sentence(synth_one, text, rate, pause_s=0.35):
    """Voice one sentence at a time and join with short pauses (autoregressive engines drift or stop
    on long inputs; the real pipeline voices lines of 22 words or fewer)."""
    import numpy as np
    import re
    parts = [s.strip() for s in re.split(r"(?<=[\u06d4\u061f\u0964!?])\s+", text) if s.strip()]
    pause = np.zeros(int(pause_s * rate), dtype="float32")
    out = []
    for s in parts:
        out += [np.asarray(synth_one(s), dtype="float32").squeeze(), pause]
    return np.concatenate(out[:-1])


def chatterbox(cand, device):
    """Chatterbox Multilingual from a local checkpoint dir: the shared assets of ResembleAI/chatterbox
    plus the T3 and V3 decoder of the chosen variant. The V3 decoder is a meanflow S3Gen (a plain
    S3Gen() rejects its state dict, 2026-10-26 run); falls back to the V2 decoder if neither loads."""
    from huggingface_hub import hf_hub_download
    from chatterbox.mtl_tts import ChatterboxMultilingualTTS
    main = "ResembleAI/chatterbox"
    ck = "/tmp/ck-" + cand["id"]
    os.makedirs(ck, exist_ok=True)
    for f in ["ve.pt", "conds.pt", "Cangjie5_TC.json", "grapheme_mtl_merged_expanded_v1.json"]:
        link(hf_hub_download(main, f), os.path.join(ck, f))
    repo, t3 = (cand["model"], "t3_hi.safetensors") if cand["t3"] == "hi" else (main, "t3_mtl23ls_v3.safetensors")
    link(hf_hub_download(repo, t3), os.path.join(ck, t3))
    decoder = "s3gen_v3.pt from " + repo
    import torch
    from chatterbox.models.s3gen import S3Gen
    link(hf_hub_download(main, "s3gen.pt"), os.path.join(ck, "s3gen.pt"))
    model = ChatterboxMultilingualTTS.from_local(ck, device, t3_model=t3)
    v3 = torch.load(hf_hub_download(repo, "s3gen_v3.pt"), map_location="cpu", weights_only=True)
    for meanflow in (True, False):
        try:
            s3 = S3Gen(meanflow=meanflow)
            s3.load_state_dict(v3)
            model.s3gen = s3.to(device).eval()
            return model, "s3gen_v3.pt from %s (meanflow=%s)" % (repo, meanflow)
        except RuntimeError as e:
            print("V3 decoder meanflow=%s did not load: %s" % (meanflow, str(e)[:300]), flush=True)
    return model, "s3gen.pt from %s (V3 decoder did not load)" % main


def link(src, dst):
    if os.path.lexists(dst):
        os.remove(dst)
    os.symlink(src, dst)


def gen(cand, passages, takes, refs, inputs):
    """Child process: generate all takes for one candidate."""
    import torch
    device = "cuda" if torch.cuda.is_available() else "cpu"
    os.makedirs(os.path.join(OUT, "takes"), exist_ok=True)
    rows, extra = [], {}
    if cand["engine"] == "mms":
        from transformers import AutoTokenizer, VitsModel
        model = VitsModel.from_pretrained(cand["model"]).to(device)
        tok = AutoTokenizer.from_pretrained(cand["model"])
        rate, rev = model.config.sampling_rate, getattr(model.config, "_commit_hash", None)
        synth = lambda text, _opts, _ref: model(**tok(text, return_tensors="pt").to(device)).waveform[0].cpu().numpy()
    elif cand["engine"] == "parler":
        from parler_tts import ParlerTTSForConditionalGeneration
        from transformers import AutoTokenizer
        src = model_path(cand)
        model = ParlerTTSForConditionalGeneration.from_pretrained(src).to(device)
        tok = AutoTokenizer.from_pretrained(src)
        dtok = AutoTokenizer.from_pretrained(model.config.text_encoder._name_or_path)
        rate, rev = model.config.sampling_rate, getattr(model.config, "_commit_hash", None)

        def synth(text, opts, _ref):
            # Parler stops at about 30 s per generation (a 133-word passage came back cut at 30.2 s,
            # 2026-10-26), hence sentence-wise.
            d = dtok(opts["description"], return_tensors="pt").to(device)

            def one(s):
                p = tok(s, return_tensors="pt").to(device)
                return model.generate(input_ids=d.input_ids, attention_mask=d.attention_mask,
                                      prompt_input_ids=p.input_ids, prompt_attention_mask=p.attention_mask).cpu().numpy()
            return by_sentence(one, text, rate)
    elif cand["engine"] == "chatterbox":
        model, extra["decoder"] = chatterbox(cand, device)
        rate, rev = model.sr, cand["t3"]
        synth = lambda text, _opts, ref: by_sentence(
            lambda s: model.generate(s, language_id="hi", audio_prompt_path=ref["path"]).cpu().numpy(), text, rate)
    elif cand["engine"] == "tortoise":
        from huggingface_hub import hf_hub_download
        from tortoise.api import TextToSpeech
        from tortoise.utils.audio import load_audio
        tts = TextToSpeech(ar_checkpoint=hf_hub_download(cand["model"], cand["checkpoint"]))
        rate, rev = 24000, cand["checkpoint"]
        # This fork wants each reference as a pair (22.05 kHz clip, 24 kHz clip), each shaped
        # (channels, samples); load_audio returns 1-D for a mono float WAV.
        clip = lambda path, sr: (lambda a: a.unsqueeze(0) if a.dim() == 1 else a)(load_audio(path, sr))
        synth = lambda text, _opts, ref: by_sentence(
            lambda s: tts.tts_with_preset(s, voice_samples=[[clip(ref["path"], 22050), clip(ref["path"], 24000)]],
                                          conditioning_latents=None, preset="fast").squeeze().cpu().numpy(), text, rate)
    elif cand["engine"] == "indicf5":
        from transformers import AutoModel
        model = AutoModel.from_pretrained(model_path(cand), trust_remote_code=True)
        rate, rev = 24000, None

        def synth(text, _opts, ref):
            def one(s):
                a = model(s, ref_audio_path=ref["path"], ref_text=ref["text_deva"])
                return a.astype("float32") / 32768.0 if a.dtype.kind == "i" else a
            return by_sentence(one, text, rate)
    else:
        raise SystemExit("unknown engine " + cand["engine"])
    for character, opts in cand["characters"].items():
        mine = [dict(r, path=os.path.join(inputs, r["audio"])) for r in refs.get(character, [])]
        for k in range(1, takes + 1):
            seed = SEED_BASE + k
            torch.manual_seed(seed)
            ref = mine[(k - 1) % len(mine)] if mine else None
            t0 = time.time()
            with torch.no_grad():
                samples = synth(passages[character], opts, ref)
            path = os.path.join(OUT, "takes", "%s_%s_take%d.wav" % (cand["id"], character, k))
            write_wav(path, samples, rate)
            rows.append({"file": os.path.relpath(path, OUT), "candidate": cand["id"], "character": character,
                         "take": k, "seed": seed, "seconds": round(len(samples) / rate, 2),
                         "gen_seconds": round(time.time() - t0, 1), "sampling_rate": rate,
                         "reference": ref["audio"] if ref and cand["engine"] in CLONING else None})
    json.dump({"revision": rev, "device": device, "rows": rows, **extra},
              open(os.path.join(OUT, "_%s.json" % cand["id"]), "w"), indent=2)


CLONING = {"chatterbox", "tortoise", "indicf5"}


def python_for(cand, log):
    """Interpreter for a candidate: the image's Python, or a uv venv built by `package` or `setup`
    (shell lines, with $PY set to the venv's python)."""
    if "package" not in cand and "setup" not in cand:
        return sys.executable
    venv = "/tmp/venv-" + cand["id"]
    py = venv + "/bin/python"
    if not os.path.exists(py):
        subprocess.run([sys.executable, "-m", "pip", "install", "-q", "uv"], check=True)
        subprocess.run(["uv", "venv", venv, "--python", cand.get("python", "3.11"), "-q"], check=True)
        lines = cand.get("setup") or ["uv pip install -q --python $PY '%s' numpy" % cand["package"]]
        for line in lines + ["uv pip install -q --python $PY numpy soundfile huggingface_hub"]:
            log.write("$ %s\n" % line)
            log.flush()
            subprocess.run(["bash", "-c", line], check=True, stdout=log, stderr=log, env=dict(os.environ, PY=py))
    return py


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
        passages = json.load(open(os.path.join(inputs, cand.get("passages", "passages.json")), encoding="utf-8"))
        gen(cand, passages, cand.get("takes", cands["takes"]), cands.get("refs", {}), inputs)
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
    # Diagnostics only: whether Kaggle exposed a secrets channel and why a lookup failed. Never the value.
    secret_diag = {"secrets_channel_present": bool(os.environ.get("KAGGLE_USER_SECRETS_TOKEN"))}
    for attempt in range(1, 6):  # the secrets service has returned transient ConnectionErrors
        try:
            from kaggle_secrets import UserSecretsClient
            value = UserSecretsClient().get_secret("HF_TOKEN")
            if value:
                env["HF_TOKEN"] = value
            secret_diag["HF_TOKEN"] = ("found" if value else "empty") + " (attempt %d)" % attempt
            break
        except Exception as e:  # noqa: BLE001 - the secret is optional; candidates needing it are skipped
            secret_diag["HF_TOKEN"] = "%s: %s (after %d attempts)" % (type(e).__name__, str(e)[:200], attempt)
            time.sleep(5 * attempt)
    status = {}
    cands["candidates"] = [c for c in cands["candidates"] if c.get("active", True)]
    for cand in cands["candidates"]:
        if cand.get("model_dataset") and model_path(cand) == cand["model"] and not env.get("HF_TOKEN"):
            status[cand["id"]] = "skipped: model dataset %s not mounted and no HF_TOKEN" % cand["model_dataset"]
            continue
        if cand.get("needs_secret") and not env.get(cand["needs_secret"]):
            status[cand["id"]] = "skipped: Kaggle secret %s unavailable (%s)" % (
                cand["needs_secret"], secret_diag.get(cand["needs_secret"], "not looked up"))
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
                                     "licence": cand["licence"], "decoder": p.get("decoder")}
            rows += p["rows"]
    for r in rows:
        norm = normalise(os.path.join(OUT, r["file"]))
        r["sha256"] = sha256(os.path.join(OUT, r["file"]))
    gpu = subprocess.run(["nvidia-smi", "-L"], capture_output=True, text=True).stdout.strip() or "none"
    json.dump({"status": status, "secret": secret_diag, "models": revisions, "normalisation": norm, "gpu": gpu, "takes": rows},
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
