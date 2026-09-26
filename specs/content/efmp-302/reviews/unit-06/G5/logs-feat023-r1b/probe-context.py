#!/usr/bin/env python3
import re, html as h

def vis(p):
    x = open(p, encoding="utf-8").read()
    x = re.sub(r"<script\b.*?</script>", " ", x, flags=re.S)
    x = re.sub(r"<style\b.*?</style>", " ", x, flags=re.S)
    x = re.sub(r"<[^>]+>", " ", x)
    return re.sub(r"\s+", " ", h.unescape(x))

ua = vis("build/ur/semester-1/efmp-302/unit-06/unit-assessment/index.html")
i = ua.find("محفوظ وقت کی قیمت")
print("ASSESSMENT context:", ua[i-260:i+320] if i >= 0 else "not found")
# also check the ovezar sentence in topic-03 summary for the same wording
t3 = vis("build/ur/semester-1/efmp-302/unit-06/topic-03/index.html")
j = t3.find("ڈائریاں سب سے سستی")
print("\nTOPIC-03 summary context:", t3[j-120:j+320] if j >= 0 else "not found")
