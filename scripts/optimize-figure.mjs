#!/usr/bin/env node
/**
 * Offline figure optimiser (Spec 009). Processes ONE local file — no network.
 *
 *   node scripts/optimize-figure.mjs <in> <out>            # raster → resized WebP
 *   node scripts/optimize-figure.mjs --svg <in> <out>      # SVG → whitespace/comment strip
 *
 * Raster mode: resize so the longest edge is ≤ MAX_EDGE, encode WebP q80, write <out>.
 *   Hard-fails (exit 1) if the result exceeds RASTER_BUDGET.
 * SVG mode: drop XML comments, collapse insignificant whitespace between tags, write <out>.
 *   Hard-fails if the result exceeds SVG_BUDGET or is not well-formed enough to keep an <svg> root.
 *
 * The Hugging Face MCP call that *produces* a raster happens in the skill's agent turn (like
 * author-unit's WebFetch), never here — this script only shrinks a file already on disk, so the
 * repo invariant "scripts/*.mjs make no network calls" holds.
 */
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { dirname, extname } from 'node:path';

const MAX_EDGE = 1600;
const RASTER_BUDGET = 150 * 1024; // 150 KB
const SVG_BUDGET = 20 * 1024; // 20 KB

const args = process.argv.slice(2);
const svgMode = args[0] === '--svg';
const [inPath, outPath] = svgMode ? args.slice(1) : args;

function die(msg) {
  console.error(`✗ optimize-figure: ${msg}`);
  process.exit(1);
}

if (!inPath || !outPath) die('usage: [--svg] <in> <out>');
if (!existsSync(inPath)) die(`input not found: ${inPath}`);
mkdirSync(dirname(outPath), { recursive: true });

if (svgMode) {
  let svg = readFileSync(inPath, 'utf8');
  svg = svg
    .replace(/<!--[\s\S]*?-->/g, '') // XML comments
    .replace(/>\s+</g, '><') // whitespace between tags
    .replace(/\s{2,}/g, ' ') // runs of spaces inside tags/text
    .replace(/^\s+|\s+$/g, '');
  if (!/<svg[\s>]/i.test(svg)) die('output has no <svg> root — refusing to write');
  writeFileSync(outPath, svg + '\n');
  const bytes = statSync(outPath).size;
  if (bytes > SVG_BUDGET) die(`${outPath} is ${(bytes / 1024).toFixed(1)} KB — over the ${SVG_BUDGET / 1024} KB SVG budget`);
  console.log(`✓ svg  ${inPath} → ${outPath}  (${(bytes / 1024).toFixed(1)} KB)`);
  process.exit(0);
}

// --- raster mode ---
if (extname(outPath).toLowerCase() !== '.webp') die('raster output must be a .webp path');
const sharp = (await import('sharp')).default;
const meta = await sharp(inPath).metadata();
const longest = Math.max(meta.width || 0, meta.height || 0);
const pipeline = sharp(inPath).rotate();
if (longest > MAX_EDGE) {
  pipeline.resize({
    width: meta.width >= meta.height ? MAX_EDGE : undefined,
    height: meta.height > meta.width ? MAX_EDGE : undefined,
    withoutEnlargement: true,
    fit: 'inside',
  });
}
await pipeline.webp({ quality: 80, effort: 5 }).toFile(outPath);
const bytes = statSync(outPath).size;
if (bytes > RASTER_BUDGET) {
  die(`${outPath} is ${(bytes / 1024).toFixed(1)} KB — over the ${RASTER_BUDGET / 1024} KB raster budget. ` +
      `Re-generate at a smaller size or simplify the image.`);
}
console.log(`✓ webp ${inPath} → ${outPath}  (${(bytes / 1024).toFixed(1)} KB, longest edge ${Math.min(longest, MAX_EDGE)}px)`);
