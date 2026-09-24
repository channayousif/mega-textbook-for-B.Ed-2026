import sharp from 'sharp';

// fig-U2-1.ur.svg element screenshot: 703x476. The SVG viewBox is 780x470, so the
// element is scaled by 703/780 = 0.9013. The side note baseline is y=428, glyph box
// roughly y=410..432 in viewBox units; scaled: y=370..390. Its glyph box spans
// x=-40.7..84.5 in viewBox units; scaled: x=-36.7..76.2, i.e. clipped at x=0.
const file = 'specs/content/gqur-300/reviews/unit-02/G5/renders-agent-g5-gqur300-u2-run001/fig-U2-1-ur-element.png';
const { data, info } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true });
const w = info.width, h = info.height;
const scale = w / 780;

// Rows where the note lives (viewBox y 405..435 -> pixels)
const y0 = Math.floor(405 * scale * (h / (470 * scale)));
const y1 = Math.ceil(435 * scale * (h / (470 * scale)));
let inkFirstCol = 0, inkSecondCol = 0, inkCol10 = 0;
for (let y = y0; y < Math.min(y1, h); y++) {
  // column 0 and 1 (leftmost pixels) and column 10
  if (data[y * w + 0] < 160) inkFirstCol++;
  if (data[y * w + 1] < 160) inkSecondCol++;
  if (data[y * w + 10] < 160) inkCol10++;
}
console.log(`image ${w}x${h}, scale=${scale.toFixed(3)}, note rows ${y0}..${Math.min(y1, h)}`);
console.log(`dark pixels in column 0: ${inkFirstCol}, column 1: ${inkSecondCol}, column 10: ${inkCol10}`);
console.log(inkFirstCol > 0
  ? 'CONFIRMED: glyphs are physically cut at the left edge of the rendered Urdu figure (ink in column 0 at the side-note rows).'
  : 'no ink at column 0 in the note rows');
