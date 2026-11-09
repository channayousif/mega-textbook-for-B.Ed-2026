#!/usr/bin/env node
// Feature 029 studio-media stage 4: make the file YouTube receives, plus its thumbnail.
//
//   node scripts/notebook-studio/audio-to-video.mjs <in> <out.mp4> --course efmp-301 --unit 4 --topic 1 \
//        --locale en|ur --kind audio|video [--part N] [--title "..."]
//
// audio: a 1920x1080 brand card (topic title, course, unit/topic, part) + the audio, loudness
//        normalised to -16 LUFS / -1.5 dBTP, H.264 still-image at 6 fps, AAC 192k.
// video: the NotebookLM picture is copied untouched; only the audio is loudness-normalised.
// Always writes <out>.thumb.jpg (1280x720, < 2 MB, the YouTube custom-thumbnail limit).
// The title defaults to static/studio/<course>/unit-NN/topic-NN/poster.<locale>.json.
// CPU-heavy for long files: run through scripts/heavy.sh.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const bin = (t) => (process.env.FFMPEG_DIR ? join(process.env.FFMPEG_DIR, t) : t);
const BRAND = { teal: '#123e43', amber: '#e5a333', paper: '#f8f5ef', pale: '#a6dfdc' };
// Single-pass loudnorm can overshoot its TP target (QG1 caught 0 dBFS on EFMP-301 4.3); the limiter
// after it holds peaks at about -1.6 dBFS (0.83 linear).
export const LOUDNORM = 'loudnorm=I=-16:TP=-1.5:LRA=11,alimiter=limit=0.83:level=disabled';
const THUMB_MAX_BYTES = 2 * 1024 * 1024;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);

/** Greedy word wrap by character budget; returns at most maxLines lines (last one ellipsised). */
export function wrap(text, budget, maxLines = 3) {
  const lines = [];
  let cur = '';
  for (const w of String(text).split(/\s+/).filter(Boolean)) {
    if (cur && (cur + ' ' + w).length > budget) { lines.push(cur); cur = w; } else cur = cur ? `${cur} ${w}` : w;
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = `${lines[maxLines - 1].replace(/\s+\S*$/, '')} …`; }
  return lines;
}

export function cardSvg({ title, course, unit, topic, locale, kind, part }) {
  const ur = locale === 'ur';
  const font = ur ? "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif" : "'Nunito', 'DejaVu Sans', sans-serif";
  const label = kind === 'video'
    ? (ur ? 'ویڈیو جائزہ' : 'Video overview')
    : part > 1 ? (ur ? `مزید تفصیل: حصہ ${part}` : `Go deeper: part ${part}`) : (ur ? 'آڈیو بریف' : 'Audio brief');
  const where = `${course.toUpperCase()} · ${ur ? 'یونٹ' : 'Unit'} ${unit} · ${ur ? 'موضوع' : 'Topic'} ${unit}.${topic}`;
  const lines = wrap(title, ur ? 30 : 34, 3);
  const size = ur ? 74 : 84;
  const lh = ur ? Math.round(size * 2.6) : 108; // bold Nastaliq ink reaches 2.55em, so 2.6 line height
  const x = ur ? 1800 : 120;
  // librsvg follows SVG: under direction="rtl", text-anchor "start" is the right edge at x.
  // (rtl + "end" runs the text off the right side; no direction lays mixed Urdu/English out LTR.)
  const anchor = 'start';
  const dir = ur ? ' direction="rtl" unicode-bidi="embed"' : '';
  const top = 540 - ((lines.length - 1) * lh) / 2;
  const t = esc;
  const tspans = lines.map((l, i) => `<text x="${x}" y="${top + i * lh}" font-size="${size}" font-weight="700" fill="${BRAND.paper}" text-anchor="${anchor}"${dir} font-family="${font}">${t(l)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
<rect width="1920" height="1080" fill="${BRAND.teal}"/>
<rect x="0" y="0" width="24" height="1080" fill="${BRAND.amber}"/>
<text x="${x}" y="190" font-size="${ur ? 52 : 46}" font-weight="700" fill="${BRAND.amber}" text-anchor="${anchor}"${dir} font-family="${font}">${t(label)}</text>
${tspans}
<text x="${x}" y="930" font-size="${ur ? 44 : 40}" fill="${BRAND.pale}" text-anchor="${anchor}"${dir} font-family="${font}">${t(where)}</text>
<text x="${ur ? 120 : 1800}" y="1000" font-size="40" font-weight="700" fill="${BRAND.paper}" text-anchor="${ur ? 'start' : 'end'}" font-family="'Nunito', 'DejaVu Sans', sans-serif">textbook.com.pk</text>
</svg>`;
}

export function posterTitle(course, unit, topic, locale, root = ROOT) {
  const p = join(root, 'static', 'studio', course, `unit-${String(unit).padStart(2, '0')}`, `topic-${String(topic).padStart(2, '0')}`, `poster.${locale}.json`);
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')).title : null;
}

const run = (args) => execFileSync(bin('ffmpeg'), ['-nostdin', '-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['ignore', 'inherit', 'inherit'] });

export async function encode({ input, output, course, unit, topic, locale, kind, part = 1, title }) {
  const t = title ?? posterTitle(course, unit, topic, locale) ?? `${course.toUpperCase()} ${unit}.${topic}`;
  const svg = Buffer.from(cardSvg({ title: t, course, unit, topic, locale, kind, part }));
  const card = `${output}.card.png`;
  const thumb = `${output}.thumb.jpg`;
  await sharp(svg).png().toFile(card);
  await sharp(svg).resize(1280, 720).jpeg({ quality: 86 }).toFile(thumb);
  if (statSync(thumb).size >= THUMB_MAX_BYTES) throw new Error(`thumbnail ${thumb} is over 2 MB`);
  if (kind === 'audio') {
    // -shortest overshoots by up to a second with a looped still, so cut to the probed audio length.
    const dur = Number(execFileSync(bin('ffprobe'), ['-v', 'error', '-select_streams', 'a:0', '-show_entries', 'format=duration', '-of', 'csv=p=0', input], { encoding: 'utf8' }).trim());
    if (!(dur > 0)) throw new Error(`could not read the audio duration of ${input}`);
    run(['-loop', '1', '-framerate', '6', '-t', dur.toFixed(3), '-i', card, '-i', input, '-map', '0:v', '-map', '1:a', '-t', dur.toFixed(3),
      '-c:v', 'libx264', '-tune', 'stillimage', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', '6',
      '-af', LOUDNORM, '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', output]);
  } else {
    run(['-i', input, '-map', '0:v:0', '-map', '0:a:0', '-c:v', 'copy', '-af', LOUDNORM,
      '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', output]);
  }
  return { encoded_file: output, thumbnail_file: thumb, card_file: card, title: t };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const opt = (n, d) => (a.includes(`--${n}`) ? a[a.indexOf(`--${n}`) + 1] : d);
  const [input, output] = a;
  const args = { input, output, course: opt('course'), unit: Number(opt('unit')), topic: Number(opt('topic')), locale: opt('locale'), kind: opt('kind'), part: Number(opt('part', 1)), title: opt('title') };
  if (!input || !output || !args.course || !args.unit || !args.topic || !['en', 'ur'].includes(args.locale) || !['audio', 'video'].includes(args.kind)) {
    console.error('usage: audio-to-video.mjs <in> <out.mp4> --course c --unit N --topic N --locale en|ur --kind audio|video [--part N] [--title t]');
    process.exit(2);
  }
  encode(args).then((r) => console.log(JSON.stringify(r, null, 1))).catch((e) => { console.error(`audio-to-video: ${e.message}`); process.exit(1); });
}
