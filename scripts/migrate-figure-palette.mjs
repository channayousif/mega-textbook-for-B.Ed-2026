#!/usr/bin/env node
/**
 * ONE-SHOT migration: Spec 009/012 greyscale SVGs -> Spec 013 token SVGs.
 * Delete this script once the 16 EFMP-302 Unit 1 figures are converted.
 *
 * Deliberately adds NO hue. It is a pure mechanical transform that
 *   1. maps the eight legacy greys onto palette tokens,
 *   2. hoists colour into one `:root{}` block,
 *   3. DELETES the `@media (prefers-color-scheme: dark)` block (the bug), and
 *   4. appends the wordmark.
 *
 * Adding accent colour is a separate, per-figure editorial pass. Bundling eight
 * editorial judgements into a mechanical diff makes the diff unreviewable and
 * risks silently breaking an Art. III.8 redundant encoding.
 *
 * NOTE ON THE `.ah` TRAP: an arrowhead is a FILL that must match its arrow's
 * STROKE. A naive "fill -> --ink, stroke -> --line" split would colour every
 * arrowhead differently from its own arrow. Mapping both to --ink sidesteps it
 * entirely, which is consistent with this pass adding no hue.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { LIGHT_TOKENS, rootBlock, WORDMARK_TEXT } from './lib/figure-palette.mjs';

const GREY_TO_TOKEN = {
  '#ffffff': 'bg',
  '#1c1e21': 'ink',
  '#f4f5f7': 'panel',
  '#6b7280': 'muted',
};

function migrate(file) {
  let svg = readFileSync(file, 'utf8');
  const isUr = file.endsWith('.ur.svg');

  const styleMatch = /<style>([\s\S]*?)<\/style>/.exec(svg);
  if (!styleMatch) throw new Error(`${file}: no <style> block`);
  let style = styleMatch[1];

  // 1. Drop the OS-preference dark block. Balanced-brace scan, because the
  //    block contains nested rule braces and a regex would stop at the first }.
  const at = style.indexOf('@media (prefers-color-scheme: dark)');
  if (at !== -1) {
    let i = style.indexOf('{', at);
    let depth = 0;
    for (; i < style.length; i += 1) {
      if (style[i] === '{') depth += 1;
      else if (style[i] === '}') { depth -= 1; if (depth === 0) { i += 1; break; } }
    }
    style = style.slice(0, at) + style.slice(i);
  }

  // 2. Legacy greys -> var(--token).
  for (const [hex, token] of Object.entries(GREY_TO_TOKEN)) {
    style = style.split(hex).join(`var(--${token})`);
    style = style.split(hex.toUpperCase()).join(`var(--${token})`);
  }

  // 3. The wordmark's own class.
  style = `${rootBlock(LIGHT_TOKENS)} ${style.trim()} .wm{fill:var(--wm);font-size:11px}`;
  svg = svg.replace(styleMatch[0], `<style>${style}</style>`);

  // 4. The wordmark itself, mirrored for RTL. aria-hidden and absent from
  //    <desc>: it is decoration, and Art. III.8 wants the description to
  //    describe the teaching content, not the branding.
  const vb = /viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/.exec(svg);
  if (!vb) throw new Error(`${file}: no viewBox`);
  const [w, h] = [Number(vb[1]), Number(vb[2])];
  const x = isUr ? 12 : w - 12;
  const anchor = isUr ? 'start' : 'end';
  const mark = `<text class="wm" x="${x}" y="${h - 10}" text-anchor="${anchor}" aria-hidden="true">${WORDMARK_TEXT}</text>`;
  svg = svg.replace(/<\/svg>\s*$/, `${mark}</svg>`);

  writeFileSync(file, svg);
  return { file, hadDark: at !== -1 };
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('usage: node scripts/migrate-figure-palette.mjs <file.svg> [...]');
  process.exit(2);
}
for (const f of files) {
  const r = migrate(f);
  console.log(`${r.file}  ${r.hadDark ? 'media block removed' : 'no media block'}`);
}
