// G5 feat023-r1 render crops: cut targeted regions out of the full-page
// screenshots so the reviewer (and the report's readers) can see the specific
// passages this review cites: the U+FFFD corruption in topic-04, the "دہشت"
// Stakes label in topic-01, and the RTL-mirrored timeline in topic-04.
import { execSync } from 'node:child_process';

const dir = 'specs/content/efmp-302/reviews/unit-04/G5/renders-feat023-r1';
const crops = [
  // [src, out, x, y, w, h] - coordinates chosen after reading the full pages.
  ['desktop-topic-04.png', 'crop-topic-04-ufffd.png', 260, 3050, 1020, 260],
  ['desktop-topic-01.png', 'crop-topic-01-stakes.png', 260, 2500, 1020, 420],
  ['desktop-topic-04.png', 'crop-topic-04-timeline.png', 200, 700, 1080, 620],
  ['desktop-topic-02.png', 'crop-topic-02-fig-U4-3.png', 200, 620, 1080, 700],
  ['narrow360-topic-02.png', 'crop-narrow360-topic-02.png', 0, 0, 720, 2000],
];
for (const [src, out, x, y, w, h] of crops) {
  execSync(`python3 -c "
from PIL import Image
im = Image.open('${dir}/${src}')
im.crop((${x}, ${y}, ${x}+${w}, ${y}+${h})).save('${dir}/${out}')
print('${out}', 'saved')
"`, { stdio: 'inherit' });
}
