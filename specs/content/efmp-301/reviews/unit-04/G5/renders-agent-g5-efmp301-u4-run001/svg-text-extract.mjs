// Evidence script for agent-g5-efmp301-u4-run001: extract <text> runs from each
// EN/UR figure pair for label-level comparison.
import { readFileSync } from 'node:fs';

const base = 'static/img/figures/efmp-301/unit-04';
const figs = ['fig-U4-1', 'fig-U4-2', 'fig-U4-3', 'fig-U4-4', 'fig-U4-5', 'fig-U4-6'];

const texts = (svg) => {
  const out = [];
  const re = /<text\b([^>]*)>([\s\S]*?)<\/text>/g;
  let m;
  while ((m = re.exec(svg)) !== null) {
    const attrs = m[1];
    const body = m[2].replace(/<tspan[^>]*>/g, ' ').replace(/<\/tspan>/g, '').replace(/\s+/g, ' ').trim();
    const x = /\bx="([\d.]+)"/.exec(attrs)?.[1] ?? '?';
    const y = /\by="([\d.]+)"/.exec(attrs)?.[1] ?? '?';
    out.push(`(${x},${y}) ${body}`);
  }
  return out;
};

for (const fig of figs) {
  console.log(`\n===== ${fig} EN =====`);
  for (const t of texts(readFileSync(`${base}/${fig}.svg`, 'utf8'))) console.log(t);
  console.log(`\n===== ${fig} UR =====`);
  for (const t of texts(readFileSync(`${base}/${fig}.ur.svg`, 'utf8'))) console.log(t);
}
