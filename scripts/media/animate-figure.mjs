#!/usr/bin/env node
// Feature 032 (D-2026-0097): turn a placed figure plus a beats file into a HyperFrames
// composition, and optionally render it to a silent, captioned MP4.
//
//   node scripts/media/animate-figure.mjs --beats specs/studio/animations/<course>/<fig>.json \
//     [--lang en|ur] [--format 16x9|9x16] [--out <dir>] [--render]
//
// The figure is never edited: its SVG is read and inlined. Each beat names a region of the
// figure (x, y, w, h in the figure's own viewBox); every top-level element whose box centre
// falls inside it is revealed in that beat, with arrows drawn on. For Urdu the regions are
// mirrored (the .ur.svg is laid out right to left). Captions come from the beats file and
// must restate the unit text, never add to it. Output is media: it goes to ~/studio-media,
// never into git. Rendering is heavy: run it through scripts/heavy.sh in a capped scope.
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { BRAND } from './brand.mjs';

export const SKILL_DIR = process.env.ANIMATED_DIAGRAMS_DIR ?? join(homedir(), '.local/share/animated-diagrams');
export const FORMATS = { '16x9': { w: 1920, h: 1080 }, '9x16': { w: 1080, h: 1920 } };
const HOLD_END = 2;
export const ACCENTS = ['a1', 'a2', 'a3', 'a4']; // the figure palette: teal, blue, orange, purple

// The site's own icon pack (logo kit v2): [base, accent] paths on a 24px grid.
export function loadIcons(path = 'src/components/icons/paths.ts') {
  const out = {};
  for (const m of readFileSync(path, 'utf8').matchAll(/^\s+([a-z][a-z0-9]*): \['([^']*)', '([^']*)'\]/gm)) out[m[1]] = [m[2], m[3]];
  return out;
}
const LEAD_IN = 0.3;

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : fallback;
}

export function validateBeats(spec, icons) {
  const errs = [];
  if (!spec || typeof spec !== 'object') return ['beats file is not an object'];
  for (const k of ['course', 'unit', 'figure', 'svg']) if (!spec[k]) errs.push(`missing ${k}`);
  if (!Array.isArray(spec.beats) || spec.beats.length < 2) errs.push('need at least two beats');
  if (spec.langs !== undefined && (!Array.isArray(spec.langs) || !spec.langs.length || spec.langs.some((l) => !['en', 'ur'].includes(l)))) errs.push('langs must list en and/or ur');
  if (spec.langs && spec.langs.length < 2 && !spec.langs_note) errs.push('langs_note must say why a language is left out');
  for (const [i, b] of (spec.beats ?? []).entries()) {
    const regions = regionsOf(b);
    if (!regions.length || regions.some((r) => !Array.isArray(r) || r.length !== 4 || r.some((n) => typeof n !== 'number'))) errs.push(`beat ${i}: region must be [x, y, w, h] or a list of them`);
    if (!b.caption?.en) errs.push(`beat ${i}: missing caption.en`);
    if (!b.caption?.ur) errs.push(`beat ${i}: missing caption.ur`);
    if (!(b.seconds > 0 && b.seconds <= 12)) errs.push(`beat ${i}: seconds must be in (0, 12]`);
    if (b.accent !== undefined && !ACCENTS.includes(b.accent)) errs.push(`beat ${i}: accent must be one of ${ACCENTS.join(', ')}`);
    if (b.icon !== undefined && icons && !icons[b.icon]) errs.push(`beat ${i}: unknown icon "${b.icon}" (see src/components/icons/paths.ts)`);
    for (const lang of ['en', 'ur']) if (/[\u2014\u2015\u2E3A\u2E3B]/.test(b.caption?.[lang] ?? '')) errs.push(`beat ${i}: em dash in caption.${lang}`);
  }
  return errs;
}

// A beat names one region or several; an element goes to the smallest region that holds it.
export function regionsOf(beat) {
  const r = beat?.region;
  if (!Array.isArray(r)) return [];
  return Array.isArray(r[0]) ? r : [r];
}

// Map an English region onto the right-to-left Urdu figure: mirror it, then scale it to the
// Urdu viewBox (the .ur.svg is the English layout mirrored and enlarged for Nastaliq). A beat
// may give `region_ur` instead when the Urdu layout differs more than that.
export function mirrorRegion([x, y, w, h], enW, urW = enW, sy = 1) {
  const sx = urW / enW;
  const r = (n) => Math.round(n * 10) / 10;
  return [r((enW - x - w) * sx), r(y * sy), r(w * sx), r(h * sy)];
}

export const viewBoxOf = (svgText) => {
  const vb = svgText.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!vb) throw new Error('figure SVG has no "0 0 w h" viewBox');
  return { w: Number(vb[1]), h: Number(vb[2]) };
};

// Fit the figure and a caption band onto the canvas.
export function layout(format, vbW, vbH) {
  const { w, h } = FORMATS[format];
  const captionH = format === '9x16' ? 420 : 190;
  const margin = format === '9x16' ? 40 : 60;
  const scale = Math.min((w - 2 * margin) / vbW, (h - captionH - 2 * margin) / vbH);
  const fw = vbW * scale, fh = vbH * scale;
  const fx = (w - fw) / 2;
  const fy = format === '9x16' ? (h - captionH - fh) / 2 : margin;
  return { w, h, scale, fx, fy, fw, fh, captionY: fy + fh + (format === '9x16' ? 90 : 40), captionH };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function buildComposition(spec, svgText, { lang = 'en', format = '16x9', en, icons = {} } = {}) {
  const { w: vbW, h: vbH } = viewBoxOf(svgText);
  const src = en ?? { w: vbW, h: vbH };
  const L = layout(format, vbW, vbH);
  const beats = spec.beats.map((b, i) => ({
    regions: lang === 'ur'
      ? (b.region_ur ? regionsOf({ region: b.region_ur }) : regionsOf(b).map((r) => mirrorRegion(r, src.w, vbW, vbH / src.h)))
      : regionsOf(b),
    caption: b.caption[lang],
    seconds: b.seconds,
    accent: b.accent ?? ACCENTS[i % ACCENTS.length],
    icon: b.icon && icons[b.icon] ? icons[b.icon] : null,
  }));
  const duration = LEAD_IN + beats.reduce((s, b) => s + b.seconds, 0) + HOLD_END;
  // The figure's own font stack sits on its root <svg>, which is replaced below: carry it over,
  // or the text falls back to the renderer's default (a serif on Kaggle).
  const figFont = svgText.match(/<svg[^>]*\sfont-family="([^"]*)"/)?.[1] ?? '';
  // Inline the figure, drop its own title/desc (the video has captions) and size it.
  const inner = svgText
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title[\s\S]*?<\/title>/, '')
    .replace(/<desc[\s\S]*?<\/desc>/, '');
  // One highlight rect per beat region, drawn behind the figure's content (after its background).
  const pad = 8;
  // Placeholder geometry: the timeline script fits each rect to the elements its region holds.
  const hl = beats.map((b, i) => b.regions.map(([x, y, w, h], r) =>
    `<rect class="hl hl-${i}" id="hl-${i}-${r}" x="${x - pad}" y="${y - pad}" width="${w + 2 * pad}" height="${h + 2 * pad}" rx="14" `
    + `fill="var(--${b.accent}-fill)" stroke="var(--${b.accent})" stroke-width="2.5" opacity="0"/>`).join('')).join('');
  const bgRect = inner.match(/<rect class="bg"[^>]*\/>/);
  const figInner = bgRect ? inner.replace(bgRect[0], bgRect[0] + hl) : hl + inner;
  const rtl = lang === 'ur';
  const font = rtl ? "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif" : "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
  const capSize = format === '9x16' ? (rtl ? 50 : 54) : (rtl ? 40 : 44);
  const badgePx = format === '9x16' ? 120 : 92;
  return { duration, html: `<!doctype html>
<html lang="${lang}" dir="${rtl ? 'rtl' : 'ltr'}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=${L.w}, height=${L.h}" />
<script src="./vendor/gsap.min.js"></script>
<script src="./vendor/DrawSVGPlugin.min.js"></script>
<style>
${rtl ? "@font-face { font-family: 'Noto Nastaliq Urdu'; src: url('./fonts/NotoNastaliqUrdu-Regular.woff2') format('woff2'); }\n" : ''}html, body { margin: 0; width: ${L.w}px; height: ${L.h}px; background: ${BRAND.paper}; overflow: hidden; }
#fig { position: absolute; left: ${L.fx}px; top: ${L.fy}px; width: ${L.fw}px; height: ${L.fh}px;
  border-radius: 18px; box-shadow: 0 10px 40px rgba(18, 62, 67, .14); background: #fff;
  direction: ltr; /* the figure carries its own anchors; an inherited rtl would flip them */ }
#cap { position: absolute; left: 80px; right: 80px; top: ${L.captionY}px; min-height: ${L.captionH - 60}px;
  display: flex; align-items: flex-start; justify-content: center; text-align: center;
  font-family: ${font}; font-size: ${capSize}px; line-height: ${rtl ? 2.1 : 1.3}; color: ${BRAND.teal}; }
#cap .cap { position: absolute; left: 0; right: 0; opacity: 0; display: flex; align-items: center; justify-content: center; gap: ${format === '9x16' ? 30 : 28}px; }
#cap .badge { flex: none; width: ${badgePx}px; height: ${badgePx}px; border-radius: 50%; display: grid; place-items: center; box-shadow: 0 6px 18px rgba(18, 62, 67, .18); }
#cap .badge svg { width: 58%; height: 58%; }
#cap .txt { max-width: ${format === '9x16' ? 760 : 1480}px; }
#mark { position: absolute; ${rtl ? 'left' : 'right'}: 40px; bottom: 26px; font: 600 26px system-ui, sans-serif; color: ${BRAND.teal}; opacity: .55; }
#bar { position: absolute; left: 0; bottom: 0; height: 8px; width: ${L.w}px; background: ${BRAND.amber}; transform-origin: ${rtl ? 'right' : 'left'}; transform: scaleX(0); }
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${duration}" data-width="${L.w}" data-height="${L.h}">
<svg id="fig" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}"${figFont ? ` font-family="${figFont}"` : ''}>${figInner}</svg>
<div id="cap">${beats.map((b, i) => `<div class="cap" id="cap-${i}">${b.icon ? `<span class="badge" style="background: var(--${b.accent})"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${b.icon[0]}" stroke="#fff"/>${b.icon[1] ? `<path d="${b.icon[1]}" stroke="${b.accent === 'a3' ? BRAND.pale : BRAND.amber}"/>` : ''}</svg></span>` : ''}<span class="txt">${esc(b.caption)}</span></div>`).join('')}</div>
<div id="mark">textbook.com.pk</div>
<div id="bar"></div>
</div>
<script>
gsap.registerPlugin(DrawSVGPlugin);
const BEATS = ${JSON.stringify(beats.map(({ regions, seconds, accent }) => ({ regions, seconds, accent })))};
const fig = document.getElementById('fig');
// The background rect and the watermark stay; every other top-level element joins a beat.
const els = [...fig.children].filter((el) => !['defs', 'style', 'title', 'desc'].includes(el.tagName)
  && !el.classList.contains('bg') && !el.classList.contains('wm') && !el.classList.contains('hl'));
const inBeat = BEATS.map(() => []);
const boxes = {}; // "beat-region" -> union of the boxes of the elements it holds
for (const el of els) {
  const b = el.getBBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  let k = BEATS.length - 1, kr = -1, best = Infinity;
  BEATS.forEach(({ regions }, i) => regions.forEach(([x, y, w, h], r) => {
    if (cx >= x && cx <= x + w && cy >= y && cy <= y + h && w * h < best) { best = w * h; k = i; kr = r; }
  }));
  inBeat[k].push(el);
  if (kr >= 0) {
    const key = k + '-' + kr, u = boxes[key];
    boxes[key] = u ? { x1: Math.min(u.x1, b.x), y1: Math.min(u.y1, b.y), x2: Math.max(u.x2, b.x + b.width), y2: Math.max(u.y2, b.y + b.height) }
      : { x1: b.x, y1: b.y, x2: b.x + b.width, y2: b.y + b.height };
  }
}
// Fit each highlight to what it frames, kept inside the figure; drop empty ones.
const VB = fig.viewBox.baseVal, PAD = ${pad};
fig.querySelectorAll('rect.hl').forEach((r) => {
  const u = boxes[r.id.slice(3)];
  if (!u) { r.remove(); return; }
  const x = Math.max(2, u.x1 - PAD), y = Math.max(2, u.y1 - PAD);
  r.setAttribute('x', x); r.setAttribute('y', y);
  r.setAttribute('width', Math.min(VB.width - 2, u.x2 + PAD) - x); r.setAttribute('height', Math.min(VB.height - 2, u.y2 + PAD) - y);
});
// Colour each beat in the figure's own palette (video only; the placed figure is untouched).
BEATS.forEach((beat, i) => inBeat[i].forEach((el) => {
  const c = el.getAttribute('class') || '';
  // Tint only part-sized panels: a frame that holds half the figure would wash out its contents.
  const big = el.tagName === 'rect' && el.getBBox().width * el.getBBox().height > 0.25 * VB.width * VB.height;
  if (el.tagName === 'rect' && /panel/.test(c) && !big) { el.style.fill = 'var(--' + beat.accent + '-fill)'; el.style.stroke = 'var(--' + beat.accent + ')'; }
  if (el.tagName === 'text' && /\b(h|sh)\b/.test(c) && i > 0) el.style.fill = 'var(--' + beat.accent + ')';
}));
const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
const last = BEATS.length - 1;
let t = ${LEAD_IN};
BEATS.forEach((beat, i) => {
  const lines = inBeat[i].filter((el) => el.tagName === 'path' && (el.getAttribute('marker-end') || /stroke|cross|grid/.test(el.getAttribute('class') || '')));
  const rest = inBeat[i].filter((el) => !lines.includes(el));
  gsap.set(inBeat[i], { opacity: 0 });
  // Focus: earlier beats step back while this one builds; the last beat brings everything back.
  const earlier = inBeat.slice(0, i).flat();
  if (i > 0 && i < last && earlier.length) tl.to(earlier, { opacity: 0.45, duration: 0.4 }, t);
  if (i === last && earlier.length) tl.to(earlier, { opacity: 1, duration: 0.5 }, t);
  if (i > 0) tl.to('.hl-' + (i - 1), { opacity: 0, duration: 0.4 }, t);
  tl.fromTo('.hl-' + i, { opacity: 0 }, { opacity: 0.9, duration: 0.5 }, t);
  if (rest.length) tl.to(rest, { opacity: 1, duration: 0.5, stagger: Math.min(0.08, 1.2 / rest.length) }, t + 0.1);
  if (lines.length) tl.set(lines, { opacity: 1 }, t + 0.4).from(lines, { drawSVG: '0%', duration: 0.7, ease: 'power1.inOut', stagger: 0.15 }, t + 0.4);
  tl.to('#cap-' + i, { opacity: 1, duration: 0.4 }, t);
  tl.from('#cap-' + i + ' .badge', { scale: 0.4, rotation: -20, duration: 0.6, ease: 'back.out(2)' }, t);
  if (i > 0) tl.to('#cap-' + (i - 1), { opacity: 0, duration: 0.3 }, t);
  t += beat.seconds;
});
tl.to('#bar', { scaleX: 1, duration: ${duration - LEAD_IN}, ease: 'none' }, ${LEAD_IN});
window.__timelines = window.__timelines || {};
window.__timelines.main = tl;
</script>
</body>
</html>
` };
}

export function writeComposition(spec, { lang, format, out }) {
  const svgPath = lang === 'ur' ? spec.svg.replace(/\.svg$/, '.ur.svg') : spec.svg;
  const en = viewBoxOf(readFileSync(spec.svg, 'utf8'));
  const { html, duration } = buildComposition(spec, readFileSync(svgPath, 'utf8'), { lang, format, en, icons: loadIcons() });
  mkdirSync(join(out, 'vendor'), { recursive: true });
  for (const f of ['gsap.min.js', 'DrawSVGPlugin.min.js']) {
    const src = join(SKILL_DIR, 'assets/vendor/gsap', f);
    if (!existsSync(src)) throw new Error(`${src} missing: install animated-diagrams-skill (see .claude/skills/animated-figures)`);
    cpSync(src, join(out, 'vendor', f));
  }
  if (lang === 'ur') {
    // Ship the font with the composition so a fresh renderer (Kaggle) shapes Nastaliq the same.
    mkdirSync(join(out, 'fonts'), { recursive: true });
    cpSync('static/fonts/NotoNastaliqUrdu-Regular.woff2', join(out, 'fonts/NotoNastaliqUrdu-Regular.woff2'));
  }
  writeFileSync(join(out, 'index.html'), html);
  return duration;
}

export const compositionId = (spec, lang, format) =>
  `${spec.course.toLowerCase()}-u${String(spec.unit).padStart(2, '0')}-${spec.figure}-${lang}-${format}`;

function main() {
  const beatsPath = arg('beats');
  if (!beatsPath) { console.error('usage: animate-figure.mjs --beats <file> [--lang en|ur] [--format 16x9|9x16] [--out dir] [--render]'); process.exit(2); }
  const spec = JSON.parse(readFileSync(beatsPath, 'utf8'));
  const errs = validateBeats(spec, loadIcons());
  if (errs.length) { console.error(errs.map((e) => `✗ ${e}`).join('\n')); process.exit(1); }
  const lang = arg('lang', 'en'), format = arg('format', '16x9');
  if (!FORMATS[format] || !['en', 'ur'].includes(lang)) { console.error('bad --lang or --format'); process.exit(2); }
  const id = compositionId(spec, lang, format);
  const out = resolve(arg('out', join(homedir(), 'studio-media/animations', id)));
  let duration;
  try { duration = writeComposition(spec, { lang, format, out }); } catch (e) { console.error(`✗ ${e.message}`); process.exit(1); }
  console.log(`composition ${out}/index.html · ${duration}s · ${lang} · ${format}`);
  if (process.argv.includes('--render')) {
    const env = { ...process.env, HYPERFRAMES_NO_TELEMETRY: '1', PRODUCER_LOW_MEMORY_MODE: '1' };
    const r = spawnSync('node', [join(SKILL_DIR, 'scripts/render.mjs'), '--project', out, '--output', join(out, `${id}.mp4`), '--snapshots', '6', '--probe'], { stdio: 'inherit', env });
    process.exit(r.status ?? 1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
