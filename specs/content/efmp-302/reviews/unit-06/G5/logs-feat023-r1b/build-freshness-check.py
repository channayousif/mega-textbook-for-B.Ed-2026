#!/usr/bin/env python3
"""G5 feat023-r1b: verify the shared build's Urdu Unit 6 pages contain the CURRENT source bytes.

v2: probes are clean prose lines only (no markdown/frontmatter syntax); the built HTML is
reduced to visible text (tags stripped) before matching, and whitespace is collapsed.
"""
import re
import sys
import unicodedata

SRC = "i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06"
BUILD = "build/ur/semester-1/efmp-302/unit-06"
PAGES = {
    "index.mdx": "index.html",
    "topic-01.mdx": "topic-01/index.html",
    "topic-02.mdx": "topic-02/index.html",
    "topic-03.mdx": "topic-03/index.html",
    "topic-04.mdx": "topic-04/index.html",
    "unit-assessment.mdx": "unit-assessment/index.html",
    "unit-teacher-notes.mdx": "unit-teacher-notes/index.html",
}

def norm(s):
    s = unicodedata.normalize("NFC", s)
    s = re.sub(r"[​-‏‪-‮⁦-⁩﻿]", "", s)
    return re.sub(r"\s+", " ", s)

def visible_text(html):
    html = re.sub(r"<script\b.*?</script>", " ", html, flags=re.S)
    html = re.sub(r"<style\b.*?</style>", " ", html, flags=re.S)
    html = re.sub(r"<[^>]+>", " ", html)
    import html as h
    return norm(h.unescape(html))

def clean_probes(src):
    body = src.split("---", 2)[2] if src.startswith("---") else src
    probes = []
    for line in body.splitlines():
        l = line.strip()
        if len(l) < 45:
            continue
        if re.match(r"^(\d+\.|- |\||>|import|<|#|\*|\*\*)", l):
            continue
        if any(ch in l for ch in "[]*<>{}#"):
            continue
        probes.append(norm(l))
    return sorted(probes, key=len, reverse=True)[:5]

fail = 0
for src_name, html_name in PAGES.items():
    src = open("%s/%s" % (SRC, src_name), encoding="utf-8").read()
    text = visible_text(open("%s/%s" % (BUILD, html_name), encoding="utf-8").read())
    probes = clean_probes(src)
    print("== %s (%d clean probes)" % (src_name, len(probes)))
    for probe in probes:
        ok = probe in text
        if not ok:
            fail += 1
        print("   [%s] %s" % ("ok" if ok else "MISSING", probe[:90]))
print("\nRESULT:", "FAIL" if fail else "PASS - build serves the current Urdu Unit 6 content")
sys.exit(1 if fail else 0)
