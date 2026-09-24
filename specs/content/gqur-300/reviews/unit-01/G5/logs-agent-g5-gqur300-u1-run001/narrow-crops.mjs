// Crop bands from the narrow-viewport renders to inspect figure scaling at 360px.
import sharp from 'sharp';

const root = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-affcb48d7818e8183';
const src = `${root}/specs/content/gqur-300/reviews/unit-01/G5/renders-agent-g5-gqur300-u1-run001`;
const out = `${src}/crops`;

// narrow renders are 720px wide (2x DPR of 360). Figures sit under their section headings.
// Scan for the figure blocks by brightness is overkill; crop fixed bands instead.
const bands = [
  ['narrow360-topic-01.png', 1000, 700, 'narrow-t01-fig1'],
  ['narrow360-topic-01.png', 3000, 700, 'narrow-t01-fig2'],
  ['narrow360-topic-02.png', 1000, 700, 'narrow-t02-fig3'],
  ['narrow360-topic-02.png', 3000, 700, 'narrow-t02-fig4'],
  ['narrow360-topic-03.png', 1000, 700, 'narrow-t03-fig5'],
  ['narrow360-topic-03.png', 3000, 700, 'narrow-t03-fig6'],
];

for (const [file, top, height, name] of bands) {
  const img = sharp(`${src}/${file}`);
  const meta = await img.metadata();
  const h = Math.min(height, meta.height - top);
  if (h <= 0) { console.log(`skip ${name}`); continue; }
  await img.extract({ left: 0, top, width: meta.width, height: h })
    .resize(1080) // 1.5x upscale of the 720px band for inspection
    .png()
    .toFile(`${out}/${name}.png`);
  console.log(`wrote ${name}.png`);
}
