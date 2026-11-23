"""Kaggle script kernel: render a batch of animated-figure compositions (Feature 032).

Pushed by `node scripts/media/kaggle-animate.mjs run <batch>` as a private CPU kernel. It:
  1. finds the private input dataset (manifest.json + bundle.bin, an uncompressed tar),
  2. verifies the tar and every file in it against manifest.json (fail closed),
  3. ensures Node 22 (checksum-verified download) and Chrome's system libraries,
  4. installs the pinned HyperFrames + GSAP lockfile, with telemetry off,
  5. renders each composition to MP4 and captures a contact sheet,
  6. writes output-manifest.json with the SHA-256 of every output.
Only /kaggle/working/out is produced. Silent video: no audio track is made.
"""
import glob, hashlib, json, os, shutil, subprocess, sys, tarfile, time, urllib.request

NODE_VERSION = "22.22.1"
CHROME_LIBS = ["libnss3", "libdbus-1-3", "libatk1.0-0", "libgbm1", "libxrandr2", "libxkbcommon0",
               "libxfixes3", "libxcomposite1", "libxdamage1", "libatk-bridge2.0-0", "libpango-1.0-0",
               "libcairo2", "libcups2", "fonts-noto-core"]
WORK = "/tmp/anim"
OUT = "/kaggle/working/out"


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 16), b""):
            h.update(chunk)
    return h.hexdigest()


def die(msg):
    print("render_animations: FAIL: " + msg, flush=True)
    sys.exit(2)


def verify(bundle_dir):
    manifest = json.load(open(os.path.join(bundle_dir, "manifest.json"), encoding="utf-8"))
    tar_path = os.path.join(bundle_dir, manifest["bundle_file"])
    if sha256(tar_path) != manifest["bundle_sha256"]:
        die("bundle hash does not match manifest")
    shutil.rmtree(WORK, ignore_errors=True)
    os.makedirs(WORK)
    with tarfile.open(tar_path, "r:") as tf:
        for m in tf.getmembers():
            if not (m.isfile() or m.isdir()) or m.name.startswith("/") or ".." in m.name.split("/"):
                die("unsafe tar member: " + m.name)
        try:
            tf.extractall(WORK, filter="data")
        except TypeError:
            tf.extractall(WORK)
    found = {}
    for root, _d, files in os.walk(WORK):
        for f in files:
            p = os.path.join(root, f)
            found[os.path.relpath(p, WORK)] = sha256(p)
    if found != manifest["files"]:
        die("bundle file set or hashes differ from manifest")
    return manifest


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


APT_OPTS = ["-o", "Acquire::Retries=3", "-o", "Acquire::http::Timeout=30", "-o", "Acquire::https::Timeout=30"]


def ensure_chrome_libs():
    """Install Chrome's system libraries. Kaggle's image lists third-party apt repositories (an R
    mirror among them) that can hang `apt-get update`; only the Ubuntu archive is needed here,
    so the others are set aside for this step. A missing library fails the render loudly."""
    set_aside = []
    d = "/etc/apt/sources.list.d"
    for f in (os.listdir(d) if os.path.isdir(d) else []):
        p = os.path.join(d, f)
        try:
            if os.path.isfile(p) and "ubuntu.com" not in open(p, encoding="utf-8", errors="ignore").read():
                os.rename(p, p + ".anim-off")
                set_aside.append(p)
        except OSError:
            pass
    try:
        subprocess.run(["apt-get", *APT_OPTS, "update", "-qq"], check=False, timeout=300)
        subprocess.run(["apt-get", *APT_OPTS, "install", "-y", "-qq", "--no-install-recommends", *CHROME_LIBS],
                       check=False, timeout=600, stdout=subprocess.DEVNULL)
    except subprocess.TimeoutExpired as e:
        print("render_animations: apt step timed out (%s)" % " ".join(e.cmd[:4]), flush=True)
    finally:
        for p in set_aside:
            os.rename(p + ".anim-off", p)
    have = subprocess.run(["ldconfig", "-p"], capture_output=True, text=True).stdout
    missing = [lib for lib in ("libatk-1.0.so.0", "libnss3.so", "libgbm.so.1") if lib not in have]
    if missing:
        die("Chrome libraries missing after apt: " + ", ".join(missing))


def run(cmd, **kw):
    print("$ " + " ".join(cmd), flush=True)
    return subprocess.run(cmd, **kw)


def main():
    t0 = time.time()
    bundles = [os.path.dirname(p) for p in glob.glob("/kaggle/input/**/manifest.json", recursive=True)]
    if len(bundles) != 1:
        die("expected one input bundle, found %d" % len(bundles))
    manifest = verify(bundles[0])
    print("node", ensure_node(), flush=True)
    ensure_chrome_libs()
    env = dict(os.environ, HYPERFRAMES_NO_TELEMETRY="1", DO_NOT_TRACK="1", HYPERFRAMES_NO_UPDATE_CHECK="1",
               HYPERFRAMES_NO_AUTO_INSTALL="1", CI="1")
    rt = os.path.join(WORK, "runtime")
    if run(["npm", "ci", "--no-audit", "--no-fund"], cwd=rt, env=env).returncode:
        die("npm ci failed")
    hf = os.path.join(rt, "node_modules", ".bin", "hyperframes")
    run([hf, "browser", "ensure"], env=env, check=False)
    os.makedirs(OUT, exist_ok=True)
    results = []
    for comp in manifest["compositions"]:
        cid = comp["id"]
        src = os.path.join(WORK, "compositions", cid)
        mp4 = os.path.join(OUT, cid + ".mp4")
        s = time.time()
        r = run([hf, "render", src, "-o", mp4, "--fps", "30", "--quality", "standard"], env=env)
        ok = r.returncode == 0 and os.path.isfile(mp4)
        sheet = None
        if ok:
            run([hf, "snapshot", src, "--frames", "6", "--describe", "false"], env=env, check=False)
            cs = os.path.join(src, "snapshots", "contact-sheet.jpg")
            if os.path.isfile(cs):
                sheet = cid + ".contact.jpg"
                shutil.copy(cs, os.path.join(OUT, sheet))
        results.append({"id": cid, "ok": ok, "seconds": round(time.time() - s, 1), "sheet": sheet})
        print("render %s %s in %.0fs" % (cid, "ok" if ok else "FAILED", time.time() - s), flush=True)
    outputs = {f: sha256(os.path.join(OUT, f)) for f in sorted(os.listdir(OUT))}
    json.dump({"batch": manifest["batch"], "bundle_sha256": manifest["bundle_sha256"], "results": results,
               "outputs": outputs, "wall_seconds": round(time.time() - t0)},
              open(os.path.join(OUT, "output-manifest.json"), "w"), indent=2)
    if not all(r["ok"] for r in results):
        die("one or more renders failed")


if __name__ == "__main__":
    main()
