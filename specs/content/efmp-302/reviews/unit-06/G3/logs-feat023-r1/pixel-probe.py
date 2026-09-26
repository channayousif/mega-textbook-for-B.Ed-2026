from PIL import Image

def probe(path, vbw, vbh, name, regions):
    im = Image.open(path).convert('RGB')
    W, H = im.size
    s = min(W / vbw, H / vbh)  # preserveAspectRatio=meet uniform scale
    oy = (H - vbh * s) / 2     # vertical letterbox offset
    print(f"{name}: {W}x{H} scale={s:.3f} y-offset={oy:.1f}")
    for label, (x0, y0, x1, y1) in regions.items():
        px0, py0, px1, py1 = int(x0*s), int(oy + y0*s), int(x1*s), int(oy + y1*s)
        crop = im.crop((px0, py0, px1, py1))
        pixels = list(crop.getdata())
        dark = sum(1 for r,g,b in pixels if r+g+b < 420)
        light = sum(1 for r,g,b in pixels if r+g+b > 600)
        print(f"  {label}: {len(pixels)} px, dark ink={dark} ({100*dark/len(pixels):.1f}%), light bg={light} ({100*light/len(pixels):.1f}%)")

probe('specs/content/efmp-302/reviews/unit-06/G3/renders-feat023-r1/fig-U6-2.light-geometry.png', 924, 470, 'fig-U6-2 light', {
  'escape strip x881-906 y79-93 (text outside box)': (881, 79, 906, 93),
  'inside-box same text x850-878 y79-93': (850, 79, 878, 93),
  'empty area below boxes x881-906 y120-140': (881, 120, 906, 140),
})
probe('specs/content/efmp-302/reviews/unit-06/G3/renders-feat023-r1/fig-U6-2.dark-geometry.png', 924, 470, 'fig-U6-2 dark', {
  'escape strip x881-906 y79-93': (881, 79, 906, 93),
})
probe('specs/content/efmp-302/reviews/unit-06/G3/renders-feat023-r1/fig-U6-3.light-geometry.png', 900, 400, 'fig-U6-3 light', {
  'label overhang on s1 fill x250-260 y112-125': (250, 112, 260, 125),
  'label over gap x262-338 y112-125': (262, 112, 338, 125),
  'label overhang on s3 fill x640-648 y98-111': (640, 98, 648, 111),
})
probe('specs/content/efmp-302/reviews/unit-06/G3/renders-feat023-r1/fig-U6-1.light-geometry.png', 900, 400, 'fig-U6-1 light', {
  'panel interior x400-500 y210-225': (400, 210, 500, 225),
})
probe('specs/content/efmp-302/reviews/unit-06/G3/renders-feat023-r1/fig-U6-1.dark-geometry.png', 900, 400, 'fig-U6-1 dark', {
  'panel interior x400-500 y210-225': (400, 210, 500, 225),
})
