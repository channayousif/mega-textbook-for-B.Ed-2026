"""T041: build a puppet rig from the cut layers (cast_cut.py output).

Every layer is a full figure on the same canvas and the head never moves between edits (checked by
phase correlation), so the puppet is: one pose image, then small feathered face overlays (eyes
closed, mouth shapes) cut from their edits, then an occluder (e.g. a hand at the chin) lifted from
the pose so it stays in front of the mouth. Writes rig.json (with SHA-256 of every file) and the
overlay PNGs beside the layers. Usage:
  python -I cast_rig.py <cast_dir> pose=layer [pose=layer ...]
"""
import hashlib, json, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage as nd

MOUTHS = ['M', 'E', 'A', 'O']
PAD = 14
FEATHER = 5.0

def load(d, name):
    return np.asarray(Image.open(d / f'{name}.png')).astype(float)

def changed(a, b, thr):
    return np.abs(a[..., :3] - b[..., :3]).sum(2) > thr

def region(masks, head_rows, top=0):
    """Bounding box of the strong, compact differences between rows top and head_rows."""
    m = np.zeros_like(masks[0])
    for d in masks:
        d = d.copy(); d[head_rows:] = False; d[:top] = False
        lab, n = nd.label(nd.binary_closing(d, iterations=3))
        if n:
            sizes = nd.sum(d, lab, range(1, n + 1))
            keep = [i + 1 for i, s in enumerate(sizes) if s >= 0.15 * sizes.max()]
            m |= np.isin(lab, keep)
    ys, xs = np.nonzero(m)
    return [int(xs.min()) - PAD, int(ys.min()) - PAD, int(xs.max()) + PAD, int(ys.max()) + PAD]

def feather(w, h):
    """Soft rounded-rectangle alpha so an overlay blends into the face around it."""
    yy, xx = np.mgrid[0:h, 0:w]
    edge = np.minimum.reduce([xx, yy, w - 1 - xx, h - 1 - yy]).astype(float)
    return np.clip(edge / FEATHER, 0, 1)

def crop(layer, box, alpha=None):
    x0, y0, x1, y1 = box
    c = layer[y0:y1, x0:x1].copy()
    a = feather(x1 - x0, y1 - y0) if alpha is None else alpha
    c[..., 3] = c[..., 3] * a
    return c

def save(d, name, arr, box, files):
    p = d / f'{name}.png'
    Image.fromarray(arr.astype(np.uint8), 'RGBA').save(p, optimize=True)
    files[p.name] = hashlib.sha256(p.read_bytes()).hexdigest()
    x0, y0, x1, y1 = box
    return {'src': p.name, 'x': x0, 'y': y0, 'w': x1 - x0, 'h': y1 - y0}

def main():
    d = Path(sys.argv[1])
    poses = dict(s.split('=', 1) for s in sys.argv[2:])
    base = load(d, 'base')
    H = base.shape[0]
    head_rows = int(H * 0.3)
    mouths = {m: load(d, f'mouth_{m}') for m in MOUTHS if (d / f'mouth_{m}.png').exists()}
    blink = load(d, 'blink')
    eyes_box = region([changed(blink, base, 110)], head_rows)
    # Mouth edits often nudge the brows too; the mouth overlay starts below the eyes so the eyes
    # never flicker with the mouth shape.
    mouth_box = region([changed(v, base, 110) for v in mouths.values()], head_rows, top=eyes_box[3] + PAD)
    files, rig = {}, {'canvas': [base.shape[1], H], 'poses': {}, 'eyes': {}, 'mouths': {}, 'occluders': {}}
    for pose, layer in poses.items():
        p = d / f'{layer}.png'
        files[p.name] = hashlib.sha256(p.read_bytes()).hexdigest()
        rig['poses'][pose] = p.name
    rig['eyes']['closed'] = save(d, 'ov_eyes_closed', crop(blink, eyes_box), eyes_box, files)
    rig['eyes']['open'] = save(d, 'ov_eyes_open', crop(base, eyes_box), eyes_box, files)
    rig['mouths']['rest'] = save(d, 'ov_mouth_rest', crop(base, mouth_box), mouth_box, files)
    for m, layer in mouths.items():
        rig['mouths'][m] = save(d, f'ov_mouth_{m}', crop(layer, mouth_box), mouth_box, files)
    # Occluders: parts of a pose that differ from the base inside a margin round the face boxes and
    # reach outside it (a hand coming in), as opposed to changes wholly inside (an expression).
    fx0 = min(eyes_box[0], mouth_box[0]) - 40; fy0 = min(eyes_box[1], mouth_box[1]) - 40
    fx1 = max(eyes_box[2], mouth_box[2]) + 40; fy1 = max(eyes_box[3], mouth_box[3]) + 40
    for pose, layer in poses.items():
        if layer == 'base':
            continue
        P = load(d, layer)
        diff = changed(P, base, 60)[fy0:fy1, fx0:fx1]
        lab, n = nd.label(nd.binary_closing(diff, iterations=2))
        border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
        occ = np.isin(lab, list(border)) & nd.binary_dilation(diff, iterations=1)
        # only what overlaps the face overlays matters
        inner = np.zeros_like(occ)
        for b in (eyes_box, mouth_box):
            inner[b[1] - fy0:b[3] - fy0, b[0] - fx0:b[2] - fx0] = True
        if (occ & inner).sum() < 40:
            continue
        occ = nd.binary_fill_holes(nd.binary_dilation(occ, iterations=2))
        alpha = nd.gaussian_filter(occ.astype(float), 1.0)
        box = [fx0, fy0, fx1, fy1]
        rig['occluders'][pose] = save(d, f'ov_occ_{pose}', crop(P, box, alpha), box, files)
    rig['files'] = files
    (d / 'rig.json').write_text(json.dumps(rig, indent=2) + '\n')
    print(d.name, 'eyes', eyes_box, 'mouth', mouth_box, 'mouths', sorted(rig['mouths']), 'occluders', sorted(rig['occluders']))

main()
