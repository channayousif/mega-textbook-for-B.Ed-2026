// Crop regions of the G5 render PNGs for close visual inspection.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const root = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-affcb48d7818e8183';
const src = `${root}/specs/content/gqur-300/reviews/unit-01/G5/renders-agent-g5-gqur300-u1-run001`;
const out = `${root}/specs/content/gqur-300/reviews/unit-01/G5/renders-agent-g5-gqur300-u1-run001/crops`;
mkdirSync(out, { recursive: true });

// [file, top, height, name] - crops taken from the full-page desktop renders.
const crops = [
  ['desktop-topic-01.png', 0, 900, 't01-top-figure1'],
  ['desktop-topic-01.png', 900, 900, 't01-mid-figure2-activity'],
  ['desktop-topic-01.png', 1800, 900, 't01-checkunderstanding-summary'],
  ['desktop-topic-02.png', 0, 900, 't02-top-figure3'],
  ['desktop-topic-02.png', 900, 900, 't02-mid-figure4-worked'],
  ['desktop-topic-02.png', 1800, 900, 't02-activity-check'],
  ['desktop-topic-03.png', 0, 900, 't03-top-figure5'],
  ['desktop-topic-03.png', 900, 900, 't03-mid-figure6-ifthen'],
  ['desktop-topic-03.png', 1800, 900, 't03-worked-steps'],
  ['desktop-unit-assessment.png', 0, 900, 'ua-top-mcq'],
  ['desktop-unit-assessment.png', 900, 900, 'ua-mcq-mid'],
  ['desktop-unit-assessment.png', 2700, 900, 'ua-rrq-models'],
  ['desktop-unit-assessment.png', 3600, 900, 'ua-erq-rubrics'],
  ['desktop-index.png', 0, 900, 'idx-top'],
  ['desktop-unit-teacher-notes.png', 0, 900, 'notes-top'],
];

for (const [file, top, height, name] of crops) {
  const img = sharp(`${src}/${file}`);
  const meta = await img.metadata();
  const h = Math.min(height, meta.height - top);
  if (h <= 0) { console.log(`skip ${name} (past end)`); continue; }
  await img.extract({ left: 0, top, width: meta.width, height: h })
    .png()
    .toFile(`${out}/${name}.png`);
  console.log(`wrote ${name}.png (${meta.width}x${h})`);
}
