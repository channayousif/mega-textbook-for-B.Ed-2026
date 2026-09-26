#!/usr/bin/env python3
"""G5 feat023-r2: verify the shared build (built at 87ed3f39, after repair e99c1a2)
serves the REPAIRED Urdu Unit 6 bytes.

Probes:
  1. the exact repaired sentences (e99c1a2) in the built pages' visible text
  2. the pre-repair defect strings must NOT be present
  3. the built fig-U6-7 .ur.svg / .ur.dark.svg assets carry the added note lines
  4. five general prose probes per page (r1 method) for overall freshness
"""
import re
import unicodedata
import html as h

BUILD = "build/ur/semester-1/efmp-302/unit-06"
SRC = "i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06"
PAGES = {
    "index.mdx": "index.html",
    "topic-01.mdx": "topic-01/index.html",
    "topic-02.mdx": "topic-02/index.html",
    "topic-03.mdx": "topic-03/index.html",
    "topic-04.mdx": "topic-04/index.html",
    "unit-assessment.mdx": "unit-assessment/index.html",
    "unit-teacher-notes.mdx": "unit-teacher-notes/index.html",
}

REPAIRED = {
    "index.html": [("ذاتی پیشہ ورانہ ترقی کا منصوبہ بنائیے", "ذتی repair")],
    "topic-02/index.html": [("انہیں جو نہیں ملا وہ ہے", "ملاا repair")],
    "topic-04/index.html": [("ذاتی ترقی کا منصوبہ چھ خانوں والا", "ذتی repair (summary)")],
    "unit-assessment/index.html": [("کا متبادل استحکام نہیں بلکہ سہولت کی طرف بہاؤ", "متبعل repair (summary)"),
                                    ("ترقی کا متبادل استحکام نہیں بلکہ بہاؤ ہے", "متبعل repair (MCQ 3 stem)")],
    "unit-teacher-notes/index.html": [("بہت سے زیرِ خدمت استاد بھی", "فرضی استاد repair"),
                                       ("نشست کے دوران لاگو کیجیے، نمبر دہی میں نہیں", "session/marking garble repair")],
}
GONE = {
    "index.html": ["ذتی پیشہ ورانہ"],
    "topic-02/index.html": ["نہیں ملاا"],
    "topic-04/index.html": ["ذتی ترقی کا منصوبہ"],
    "unit-assessment/index.html": ["متبعل"],
    "unit-teacher-notes/index.html": ["فرضی استاد", "نششت"],
}
FIG_NOTES = ["پانچ ہدف مارچ تک افسوسوں کی فہرست ہوتے ہیں۔",
             "ابھی طے کیجیے، مارچ میں نہیں۔",
             "بعد میں چنی گئی شہادت ہمیشہ داد دیتی ہے۔",
             "ایک، پانچ نہیں۔"]


def norm(s):
    s = unicodedata.normalize("NFC", s)
    s = re.sub(r"[​-‏‪-‮⁦-⁩﻿]", "", s)
    return re.sub(r"\s+", " ", s)


def visible_text(html):
    html = re.sub(r"<script\b.*?</script>", " ", html, flags=re.S)
    html = re.sub(r"<style\b.*?</style>", " ", html, flags=re.S)
    html = re.sub(r"<[^>]+>", " ", html)
    return norm(h.unescape(html))


def raw_text(html):
    return norm(h.unescape(html))


fail = 0

print("A. Repaired sentences present in built pages (visible text):")
for page, probes in REPAIRED.items():
    with open(f"{BUILD}/{page}", encoding="utf-8") as f:
        vis = visible_text(f.read())
    for probe, label in probes:
        # JSX may split words across text nodes; fall back to raw-HTML fragment search
        with open(f"{BUILD}/{page}", encoding="utf-8") as f:
            raw = raw_text(f.read())
        ok = probe in vis or probe in raw
        print(f"  [{'OK' if ok else 'MISS'}] {page}: {label}")
        if not ok:
            fail += 1

print("B. Pre-repair defect strings absent from built pages:")
for page, bad in GONE.items():
    with open(f"{BUILD}/{page}", encoding="utf-8") as f:
        vis = visible_text(f.read())
    for b in bad:
        present = b in vis
        print(f"  [{'OK' if not present else 'STILL-PRESENT'}] {page}: {b}")
        if present:
            fail += 1

print("C. Built fig-U6-7 Urdu SVG assets carry the added margin notes:")
for fig in ["fig-U6-7.ur.svg", "fig-U6-7.ur.dark.svg"]:
    with open(f"build/img/figures/efmp-302/unit-06/{fig}", encoding="utf-8") as f:
        svg = norm(f.read())
    for note in FIG_NOTES:
        ok = note in svg
        print(f"  [{'OK' if ok else 'MISS'}] {fig}: {note[:40]}")
        if not ok:
            fail += 1

print("D. General freshness: 5 clean prose probes per page (r1 method):")
for src_name, html_name in PAGES.items():
    with open(f"{SRC}/{src_name}", encoding="utf-8") as f:
        src = f.read()
    body = src.split("---", 2)[2] if src.startswith("---") else src
    probes = []
    for line in body.splitlines():
        l = line.strip()
        if len(l) < 45 or re.match(r"^(\d+\.|- |\||>|import|<|#|\*|\*\*)", l):
            continue
        if any(ch in l for ch in "[]*<>{}#"):
            continue
        probes.append(norm(l))
    probes = sorted(probes, key=len, reverse=True)[:5]
    with open(f"{BUILD}/{html_name}", encoding="utf-8") as f:
        vis = visible_text(f.read())
    with open(f"{BUILD}/{html_name}", encoding="utf-8") as f:
        raw = raw_text(f.read())
    hits = sum(1 for p in probes if p in vis or p in raw)
    print(f"  {src_name}: {hits}/{len(probes)} probes found")
    if hits < len(probes):
        for p in probes:
            if p not in vis and p not in raw:
                print(f"    missing: {p[:70]}")
        fail += 1

print(f"\nRESULT: {'FRESH (all probes OK)' if fail == 0 else f'{fail} FAILURES'}")
raise SystemExit(0 if fail == 0 else 1)
