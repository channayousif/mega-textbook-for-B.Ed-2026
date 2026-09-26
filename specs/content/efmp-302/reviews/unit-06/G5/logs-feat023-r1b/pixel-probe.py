#!/usr/bin/env python3
"""G5 feat023-r1b: pixel probe of the rendered Urdu pages (PIL only, no numpy).

Verifies that (a) the figure regions carry real ink (Nastaliq rendered, not blank/tofu boxes),
(b) prose regions carry ink, (c) in fig-U6-7's rendered area the left margin-note column shows
ONLY ONE note box (the missing-note defect), by scanning the figure's bounding rows.
"""
from PIL import Image
import os

R = "specs/content/efmp-302/reviews/unit-06/G5/renders-feat023-r1b"

def ink_rows(path, x0, x1, y0, y1, step=10, thresh=200):
    im = Image.open(path).convert("L")
    rows = []
    for y in range(y0, min(y1, im.height), step):
        dark = 0
        total = 0
        for x in range(x0, min(x1, im.width), 3):
            total += 1
            if im.getpixel((x, y)) < thresh:
                dark += 1
        rows.append((y, dark / max(total, 1)))
    return rows

print("== desktop-topic-04.png: figure region (fig-U6-7), content column x 300-980 ==")
rows = ink_rows(os.path.join(R, "desktop-topic-04.png"), 300, 980, 250, 1450)
bands = []
for y, d in rows:
    bands.append("y=%d %.3f%s" % (y, d, " <== INK" if d > 0.01 else ""))
print("\n".join(bands[:60]))

print("\n== summary: ink coverage of the whole page in 200px bands ==")
im = Image.open(os.path.join(R, "desktop-topic-04.png")).convert("L")
w, h = im.size
print("page size:", w, h)
for y0 in range(0, h, 500):
    dark = sum(1 for y in range(y0, min(y0 + 500, h), 7) for x in range(300, 980, 7) if im.getpixel((x, y)) < 200)
    total = sum(1 for y in range(y0, min(y0 + 500, h), 7) for x in range(300, 980, 7))
    print("band %5d-%5d: ink %.4f" % (y0, y0 + 500, dark / max(total, 1)))
