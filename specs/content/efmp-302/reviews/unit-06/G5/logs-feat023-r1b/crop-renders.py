#!/usr/bin/env python3
"""G5 feat023-r1b: crop full-resolution regions from the rendered PNGs for close reading."""
from PIL import Image
import os

R = "specs/content/efmp-302/reviews/unit-06/G5/renders-feat023-r1b"
OUT = "specs/content/efmp-302/reviews/unit-06/G5/renders-feat023-r1b/crops"
os.makedirs(OUT, exist_ok=True)

def crop(src, name, box):
    im = Image.open(os.path.join(R, src))
    w, h = im.size
    x0, y0, x1, y1 = box
    x1, y1 = min(x1, w), min(y1, h)
    im.crop((x0, y0, x1, y1)).save(os.path.join(OUT, name))
    print(name, (x1 - x0, y1 - y0))

# topic-04 desktop (1280x7528): title + fig-U6-7 region
crop("desktop-topic-04.png", "t04-top-figure.png", (0, 150, 1280, 1500))
# topic-04 desktop: destroyer prose + review outcomes band
crop("desktop-topic-04.png", "t04-destroyers.png", (0, 2600, 1280, 3900))
# topic-04 desktop: mini-rubric table
crop("desktop-topic-04.png", "t04-rubric.png", (0, 6300, 1280, 7100))
# unit-assessment desktop: MCQ section
crop("desktop-unit-assessment.png", "ua-mcqs.png", (0, 1250, 1280, 2900))
# unit-assessment desktop: answer key + RRQ schemes
crop("desktop-unit-assessment.png", "ua-answers.png", (0, 4400, 1280, 6200))
# topic-01 desktop: principles section with fig-U6-2
crop("desktop-topic-01.png", "t01-principles.png", (0, 2400, 1280, 3900))
# topic-03 desktop: lesson-study flowchart fig-U6-6
crop("desktop-topic-03.png", "t03-lessonstudy.png", (0, 3500, 1280, 5000))
# narrow 360 topic-04: top (mobile RTL)
crop("narrow360-topic-04.png", "n360-t04-top.png", (0, 0, 720, 2400))
