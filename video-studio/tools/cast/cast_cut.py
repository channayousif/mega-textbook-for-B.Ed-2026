"""T013: cut the cast images to transparent layers on the 1080x1440 puppet canvas.

Every part is a full-frame edit of one master, so all layers share one registration.
Background removal: flood fill from the border over pixels close to the background,
where the background is modelled per row (left/right edge medians, interpolated across
x) so flat, framed and gradient backdrops all work. Usage:
  python -I cast_cut.py <raw_dir> <out_dir> part=file [part=file ...]
"""
import json, sys, hashlib
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

CANVAS = (1080, 1440)
TOL = 32.0

def bg_model(a):
    h, w, _ = a.shape
    k = 60
    left = np.median(a[:, k:k + 30], 1)          # (h, 3)
    right = np.median(a[:, w - k - 30:w - k], 1)
    t = np.linspace(0, 1, w)[None, :, None]
    row = left[:, None, :] * (1 - t) + right[:, None, :] * t
    flat = [np.median(np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]]), 0)]
    return row, flat

def cut(path):
    a = np.asarray(Image.open(path).convert('RGB')).astype(float)
    row, flat = bg_model(a)
    dist = np.min([np.sqrt(((a - row) ** 2).sum(2))] + [np.sqrt(((a - b) ** 2).sum(2)) for b in flat], 0)
    lab, _ = ndimage.label(dist < TOL)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    fg = ndimage.binary_fill_holes(~np.isin(lab, list(edge)))
    # keep the largest component (the figure) and anything touching it
    lab2, n = ndimage.label(fg)
    if n > 1:
        sizes = ndimage.sum(fg, lab2, range(1, n + 1))
        fg = lab2 == (1 + int(np.argmax(sizes)))
    alpha = ndimage.gaussian_filter(fg.astype(float), 0.8)
    return np.dstack([a, alpha * 255]).astype(np.uint8), fg.mean()

def place(rgba):
    im = Image.fromarray(rgba, 'RGBA')
    s = CANVAS[1] / im.height
    im = im.resize((round(im.width * s), CANVAS[1]), Image.LANCZOS)
    canvas = Image.new('RGBA', CANVAS, (0, 0, 0, 0))
    canvas.alpha_composite(im, ((CANVAS[0] - im.width) // 2, 0))
    return canvas

def main():
    raw, out = Path(sys.argv[1]), Path(sys.argv[2])
    out.mkdir(parents=True, exist_ok=True)
    manifest, checks = {}, []
    for spec in sys.argv[3:]:
        part, name = spec.split('=', 1)
        src = next(raw.glob(name))
        rgba, frac = cut(src)
        layer = place(rgba)
        dest = out / f'{part}.png'
        layer.save(dest, optimize=True)
        manifest[part] = {'source': src.name, 'source_sha256': hashlib.sha256(src.read_bytes()).hexdigest(),
                          'sha256': hashlib.sha256(dest.read_bytes()).hexdigest(), 'figure_fraction': round(float(frac), 3)}
        checks.append((part, layer))
        print(f'{part:14s} {src.name[:46]:46s} figure {frac*100:5.1f}%')
    (out / 'layers.json').write_text(json.dumps({'canvas': CANVAS, 'layers': manifest}, indent=2) + '\n')
    # contact check: every layer on magenta (top) and dark teal (bottom)
    tw, th = 270, 360
    sheet = Image.new('RGB', (tw * len(checks), th * 2), 'white')
    for i, (_, layer) in enumerate(checks):
        small = layer.resize((tw, th), Image.LANCZOS)
        for j, col in enumerate([(255, 0, 255, 255), (20, 40, 36, 255)]):
            bg = Image.new('RGBA', (tw, th), col); bg.alpha_composite(small)
            sheet.paste(bg.convert('RGB'), (i * tw, j * th))
    sheet.save(out / 'check.jpg', quality=85)

main()
