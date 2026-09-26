#!/usr/bin/env python3
"""G5 feat023-r1b: dump text labels, direction hints and viewBox of the 16 Urdu figure variants."""
import re
import glob
import os

BASE = "static/img/figures/efmp-302/unit-06"
OUT = "specs/content/efmp-302/reviews/unit-06/G5/logs-feat023-r1b/ur-figure-text-dump.txt"

files = sorted(glob.glob(os.path.join(BASE, "*.ur.svg")) + glob.glob(os.path.join(BASE, "*.ur.dark.svg")))
with open(OUT, "w", encoding="utf-8") as out:
    for path in files:
        svg = open(path, encoding="utf-8").read()
        vb = re.search(r'viewBox="([^"]+)"', svg)
        rtl = "direction:rtl" in svg or 'direction="rtl"' in svg
        anchors = sorted(set(re.findall(r'text-anchor="(\w+)"', svg)))
        out.write("=== %s ===\n" % os.path.basename(path))
        out.write("viewBox: %s | direction-rtl: %s | text-anchors: %s\n" % (vb.group(1) if vb else "NONE", rtl, ",".join(anchors) or "none"))
        for m in re.finditer(r"<text\b([^>]*)>(.*?)</text>", svg, re.S):
            attrs, inner = m.group(1), m.group(2)
            txt = re.sub(r"<[^>]+>", "", inner)
            txt = re.sub(r"\s+", " ", txt).strip()
            if not txt:
                continue
            x = re.search(r'\bx="([\d.-]+)"', attrs)
            y = re.search(r'\by="([\d.-]+)"', attrs)
            anchor = re.search(r'text-anchor="(\w+)"', attrs)
            out.write("  [%s x=%s y=%s] %s\n" % (anchor.group(1) if anchor else "-", x.group(1) if x else "?", y.group(1) if y else "?", txt[:160]))
        out.write("\n")
print("wrote", OUT)
