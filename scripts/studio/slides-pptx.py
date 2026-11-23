"""Feature 032 phase B: a downloadable PowerPoint from a unit's slide outline.

    uv run --with python-pptx python scripts/studio/slides-pptx.py <outline.json> <lang> <figure-png-dir> <out.pptx>

Same slides as the web deck (title, sections, points, figures, summary), 16:9, house colours;
Urdu paragraphs are right to left. Figure PNGs come from scripts/studio/figure-pngs.mjs.
"""
import json, os, sys
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Emu, Pt

TEAL, AMBER, PAPER, INK, PALE, MUTED = (RGBColor.from_string(c) for c in ("123E43", "E5A333", "F8F5EF", "132A24", "A6DFDC", "566B65"))
WHITE, MINT = RGBColor(255, 255, 255), RGBColor(0xEA, 0xF4, 0xF1)
W, H = Emu(12192000), Emu(6858000)  # 13.333 x 7.5 in


def main(outline_path, lang, png_dir, out):
    o = json.load(open(outline_path, encoding="utf-8"))
    rtl = lang == "ur"
    font = "Noto Nastaliq Urdu" if rtl else "Segoe UI"
    prs = Presentation()
    prs.slide_width, prs.slide_height = W, H
    blank = prs.slide_layouts[6]

    def bg(slide, color):
        f = slide.background.fill
        f.solid()
        f.fore_color.rgb = color
        bar = slide.shapes.add_shape(1, 0, 0, W, Emu(80000))
        bar.fill.solid()
        bar.fill.fore_color.rgb = AMBER
        bar.line.fill.background()

    def text(slide, x, y, w, h, lines, size, color, bold=False, bullets=False):
        tf = slide.shapes.add_textbox(Emu(x), Emu(y), Emu(w), Emu(h)).text_frame
        tf.word_wrap = True
        for i, line in enumerate(lines):
            p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
            r = p.add_run()
            r.text = ("• " if bullets else "") + line
            r.font.size, r.font.bold, r.font.name = Pt(size), bold, font
            r.font.color.rgb = color
            p.alignment = PP_ALIGN.RIGHT if rtl else PP_ALIGN.LEFT
            p.space_after = Pt(size * 0.6)
            if rtl:
                p._p.get_or_add_pPr().set("rtl", "1")

    m = 760000
    s = prs.slides.add_slide(blank)
    bg(s, TEAL)
    text(s, m, 1900000, W - 2 * m, 500000, [o["subtitle"][lang]], 20, PALE, True)
    text(s, m, 2500000, W - 2 * m, 1600000, [o["title"][lang]], 48, WHITE, True)
    text(s, m, 5200000, W - 2 * m, 400000, ["textbook.com.pk"], 18, AMBER, True)
    for sl in o["slides"]:
        s = prs.slides.add_slide(blank)
        title = sl["title"][lang]
        if sl["kind"] == "section":
            bg(s, TEAL)
            text(s, m, 2600000, W - 2 * m, 1400000, [title], 40, WHITE, True)
            continue
        bg(s, MINT if sl["kind"] == "summary" else PAPER)
        text(s, m, 520000, W - 2 * m, 900000, [title], 32, TEAL, True)
        if sl["kind"] in ("points", "summary"):
            text(s, m, 1650000, W - 2 * m, 4500000, sl["points"][lang], 24, INK, bullets=True)
        elif sl["kind"] == "figure":
            png = os.path.join(png_dir, os.path.basename(sl["figure"]) + (".ur" if rtl else "") + ".png")
            if os.path.exists(png):
                pic = s.shapes.add_picture(png, 0, Emu(1500000), height=Emu(3900000))
                pic.left = int((W - pic.width) / 2)
            text(s, m, 5550000, W - 2 * m, 700000, [sl["caption"][lang]], 16, MUTED)
        text(s, m, H - 520000, W - 2 * m, 300000, ["textbook.com.pk"], 12, MUTED)
    prs.save(out)
    print(f"wrote {out}: {len(prs.slides)} slides")


if __name__ == "__main__":
    main(*sys.argv[1:5])
