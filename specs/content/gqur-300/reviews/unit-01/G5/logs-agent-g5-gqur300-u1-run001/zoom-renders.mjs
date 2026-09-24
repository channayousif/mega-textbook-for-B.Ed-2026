// Zoom crops (2x upscale) of figure regions and specific text lines for close inspection.
import sharp from 'sharp';

const root = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-affcb48d7818e8183';
const src = `${root}/specs/content/gqur-300/reviews/unit-01/G5/renders-agent-g5-gqur300-u1-run001`;
const out = `${src}/crops`;

// [file, left, top, width, height, name]
const zooms = [
  // fig-U1-4 table region in topic-02 desktop (figure sits under its heading)
  ['desktop-topic-02.png', 200, 950, 880, 420, 'zoom-figU1-4-ur'],
  // fig-U1-6 table region in topic-03 desktop
  ['desktop-topic-03.png', 200, 950, 880, 460, 'zoom-figU1-6-ur'],
  // fig-U1-2 table region in topic-01 desktop
  ['desktop-topic-01.png', 200, 980, 880, 430, 'zoom-figU1-2-ur'],
  // the activity line with embedded Latin "tutors" in topic-02
  ['desktop-topic-02.png', 0, 2130, 1280, 260, 'zoom-t02-activity-tutors'],
  // MCQ options with Latin a) b) c) d) in the assessment
  ['desktop-unit-assessment.png', 0, 620, 1280, 420, 'zoom-ua-mcq-options'],
  // RRQ item with numbers
  ['desktop-unit-assessment.png', 0, 1750, 1280, 300, 'zoom-ua-rrq-numbers'],
];

for (const [file, left, top, width, height, name] of zooms) {
  const img = sharp(`${src}/${file}`);
  const meta = await img.metadata();
  const w = Math.min(width, meta.width - left);
  const h = Math.min(height, meta.height - top);
  if (w <= 0 || h <= 0) { console.log(`skip ${name}`); continue; }
  await img.extract({ left, top, width: w, height: h })
    .resize(Math.round(w * 1.6))
    .png()
    .toFile(`${out}/${name}.png`);
  console.log(`wrote ${name}.png (${Math.round(w * 1.6)}x${Math.round(h * 1.6)})`);
}
