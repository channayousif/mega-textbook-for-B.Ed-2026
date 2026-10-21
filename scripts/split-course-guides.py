"""Cut each course's pages out of its semester course-guide PDF into static/guides/.

Reads catalog/course-guides.json. Offline authoring tool, never run at build time:
    uv run --with pypdf==6.21.1 python scripts/split-course-guides.py
"""
import json
from pathlib import Path

from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parent.parent
guides = json.loads((ROOT / "catalog" / "course-guides.json").read_text())["courses"]

for code, g in guides.items():
    reader = PdfReader(ROOT / g["source"])
    first, last = g["pages"]
    writer = PdfWriter()
    for i in range(first - 1, last):
        writer.add_page(reader.pages[i])
    writer.add_metadata({"/Title": f"{code} course guide - University of Sindh, Faculty of Education"})
    out = ROOT / "static" / g["pdf"]
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("wb") as f:
        writer.write(f)
    print(f"{code}: pages {first}-{last} -> static/{g['pdf']} ({out.stat().st_size // 1024} KB)")
