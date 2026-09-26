#!/usr/bin/env python3
"""G5 feat023-r2: fragment-search the two probes the visible-text pass missed."""
import re
import unicodedata
import html as h

def norm(s):
    s = unicodedata.normalize("NFC", s)
    s = re.sub(r"[​-‏‪-‮⁦-⁩﻿]", "", s)
    # The built HTML contains literal NUL bytes (Docusaurus JSX text-node
    # separators). The HTML parser ignores U+0000 character tokens, so they
    # never render; stripping them joins the split words for matching.
    s = s.replace("\x00", "")
    return re.sub(r"\s+", " ", s)

def load(p):
    with open(p, encoding="utf-8") as f:
        return norm(h.unescape(f.read()))

CASES = [
    ("build/ur/semester-1/efmp-302/unit-06/topic-03/index.html",
     ["مشاہدہ نہیں کر سکتا", "اس کی کمزوری یہ ہے کہ یہ فرماں برداری کی مشق بن جاتی ہے"]),
    ("build/ur/semester-1/efmp-302/unit-06/unit-assessment/index.html",
     ["اصول پورا کرتی ہے اور صفح محفوظ وقت", "غور و فکر کے اوزار"]),
]
# corrected fragment sets (whitespace-safe)
CASES = [
    ("build/ur/semester-1/efmp-302/unit-06/topic-03/index.html",
     ["مشاہدہ نہیں کر سکتا", "فرماں برداری کی مشق بن جاتی ہے", "اس کی کمزوری یہ ہے"]),
    ("build/ur/semester-1/efmp-302/unit-06/unit-assessment/index.html",
     ["اصول پورا کرتی ہے", "محفوظ وقت کی قیمت لیتی ہے", "غور و فکر کے اوزار"]),
]

fail = 0
for path, frags in CASES:
    raw = load(path)
    for frag in frags:
        ok = frag in raw
        print(f"  [{'OK' if ok else 'MISS'}] {path.split('/unit-06/')[1]}: {frag}")
        if not ok:
            fail += 1
print(f"RESULT: {'all fragments present (JSX word-split, not stale build)' if fail == 0 else f'{fail} genuinely missing'}")
raise SystemExit(0 if fail == 0 else 1)
