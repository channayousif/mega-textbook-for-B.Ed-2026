#!/usr/bin/env python3
import re, html as h, unicodedata

def norm(s):
    s = unicodedata.normalize("NFC", s)
    return re.sub(r"\s+", " ", s)

def vis(p):
    x = open(p, encoding="utf-8").read()
    x = re.sub(r"<script\b.*?</script>", " ", x, flags=re.S)
    x = re.sub(r"<style\b.*?</style>", " ", x, flags=re.S)
    x = re.sub(r"<[^>]+>", " ", x)
    return norm(h.unescape(x))

t3 = vis("build/ur/semester-1/efmp-302/unit-06/topic-03/index.html")
for frag in ["فرماں برداری کی مشق بن جاتی ہے", "اسی لمحے جمع کی جائے", "پورٹ فولیو", "جیسے یونٹ 4 نے سمجھایا"]:
    print("topic-03:", frag[:30], "->", "FOUND" if norm(frag) in t3 else "ABSENT")
ua = vis("build/ur/semester-1/efmp-302/unit-06/unit-assessment/index.html")
for frag in ["محفوظ وقت کی قیمت لیتی ہے", "غور و فکر کے اوزار ڈائریوں سے", "پیشہ ورانہ تعلمی برادری سب سے زیادہ اصول پورا کرتی ہے"]:
    print("assessment:", frag[:34], "->", "FOUND" if norm(frag) in ua else "ABSENT")
i = t3.find("پورٹ فولیو")
print("portfolio context:", t3[i:i+420] if i >= 0 else "n/a")
