#!/usr/bin/env node
// Feature 029 studio-teaser stage 6: five Veo shots + per-shot captions + an end card -> one Short.
//
//   node scripts/notebook-studio/assemble-teaser.mjs <id> <locale> <out.mp4> <shot1.mp4> ... <shot5.mp4>
//
// Each shot is scaled/cropped to 1080x1920 at 30 fps and gets its narration line as a burned-in
// caption (Veo speaks the line; the caption makes it readable with sound off, and keeps Urdu
// legible as Nastaliq RTL). Shots join with 0.2 s cross-fades, then a 5 s brand end card carries
// the course title, the call to action and the exact page address. Audio is loudness-normalised
// with the same loudnorm + limiter chain as audio-to-video.mjs. Run it through scripts/heavy.sh.
import { execFileSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { LOUDNORM, wrap } from './audio-to-video.mjs';
import { loadScript, teaserRoute } from './teaser.mjs';

const bin = (t) => (process.env.FFMPEG_DIR ? join(process.env.FFMPEG_DIR, t) : t);
const BRAND = { teal: '#123e43', amber: '#e5a333', paper: '#f8f5ef', pale: '#a6dfdc' };
export const XFADE = 0.2;
export const END_SECONDS = 5;
const W = 1080;
const H = 1920;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
const fontFor = (locale) => (locale === 'ur' ? "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif" : "'Nunito', 'DejaVu Sans', sans-serif");
// librsvg: under direction="rtl" the anchor still centres on x with "middle", which is what captions use.
const dirAttr = (locale) => (locale === 'ur' ? ' direction="rtl" unicode-bidi="embed"' : '');

/** Transparent 1080x1920 overlay with the caption in a dark box in the lower third. */
export function captionSvg(text, locale) {
  const ur = locale === 'ur';
  // Never truncate a spoken line: wrap without an ellipsis, and step the size down for long lines.
  let lines = wrap(text, ur ? 26 : 24, 9);
  const long = lines.length > 3;
  if (long) lines = wrap(text, ur ? 30 : 28, 9);
  const size = ur ? (long ? 48 : 54) : (long ? 48 : 54);
  const lh = ur ? Math.round(size * 2.2) : Math.round(size * 1.35);
  const boxH = lines.length * lh + 60;
  const top = 1560 - boxH;
  const t = lines.map((l, i) => `<text x="${W / 2}" y="${top + 30 + (i + 0.8) * lh}" font-size="${size}" font-weight="700" fill="${BRAND.paper}" text-anchor="middle"${dirAttr(locale)} font-family="${fontFor(locale)}">${esc(l)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect x="60" y="${top}" width="${W - 120}" height="${boxH}" rx="28" fill="#000" fill-opacity="0.55"/>${t}</svg>`;
}

/** Brand end card: course title, call to action, and the address (split so it never overflows). */
export function endCardSvg({ title, cta, url, locale }) {
  const ur = locale === 'ur';
  const titleLines = wrap(title, ur ? 18 : 20, 3);
  const tSize = ur ? 76 : 84;
  const tLh = ur ? Math.round(tSize * 2.4) : Math.round(tSize * 1.25);
  const host = 'textbook.com.pk';
  const path = url.replace(/^https:\/\/textbook\.com\.pk/, '') || '/';
  const tTop = 640;
  const tt = titleLines.map((l, i) => `<text x="${W / 2}" y="${tTop + i * tLh}" font-size="${tSize}" font-weight="700" fill="${BRAND.paper}" text-anchor="middle"${dirAttr(locale)} font-family="${fontFor(locale)}">${esc(l)}</text>`).join('');
  const ctaY = tTop + titleLines.length * tLh + (ur ? 90 : 70);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${BRAND.teal}"/>
<rect x="0" y="0" width="${W}" height="24" fill="${BRAND.amber}"/>
${tt}
<text x="${W / 2}" y="${ctaY}" font-size="${ur ? 60 : 56}" fill="${BRAND.amber}" font-weight="700" text-anchor="middle"${dirAttr(locale)} font-family="${fontFor(locale)}">${esc(cta)}</text>
<rect x="110" y="1380" width="${W - 220}" height="250" rx="36" fill="${BRAND.paper}"/>
<text x="${W / 2}" y="1480" font-size="72" font-weight="800" fill="${BRAND.teal}" text-anchor="middle" font-family="'Nunito', 'DejaVu Sans', sans-serif">${host}</text>
<text x="${W / 2}" y="1570" font-size="${path.length > 34 ? 34 : 40}" fill="${BRAND.teal}" text-anchor="middle" font-family="'DejaVu Sans Mono', monospace">${esc(path)}</text>
</svg>`;
}

/**
 * filter_complex for N shots (inputs 0..N-1 with audio), N caption PNGs (N..2N-1), the end-card PNG
 * (2N) and a silent track (2N+1). Returns the graph, the output labels and the expected duration.
 */
export function buildFilter(durations, { xfade = XFADE, endSeconds = END_SECONDS } = {}) {
  const n = durations.length;
  if (n < 2) throw new Error('need at least two shots');
  const parts = [];
  for (let i = 0; i < n; i++) {
    parts.push(`[${i}:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=30,setsar=1,format=yuv420p[b${i}]`);
    parts.push(`[b${i}][${n + i}:v]overlay=0:0:shortest=1,format=yuv420p[v${i}]`);
    parts.push(`[${i}:a]aresample=48000,aformat=channel_layouts=stereo[a${i}]`);
  }
  parts.push(`[${2 * n}:v]scale=${W}:${H},fps=30,setsar=1,format=yuv420p[v${n}]`);
  parts.push(`[${2 * n + 1}:a]aresample=48000,aformat=channel_layouts=stereo[a${n}]`);
  const all = [...durations, endSeconds];
  let len = all[0];
  let vPrev = 'v0';
  let aPrev = 'a0';
  for (let k = 1; k < all.length; k++) {
    const off = +(len - xfade).toFixed(3);
    const vOut = k === all.length - 1 ? 'vout' : `x${k}`;
    const aOut = `y${k}`;
    parts.push(`[${vPrev}][v${k}]xfade=transition=fade:duration=${xfade}:offset=${off}[${vOut}]`);
    parts.push(`[${aPrev}][a${k}]acrossfade=d=${xfade}[${aOut}]`);
    len = len + all[k] - xfade;
    vPrev = vOut;
    aPrev = aOut;
  }
  parts.push(`[${aPrev}]${LOUDNORM}[aout]`);
  return { graph: parts.join(';'), video: '[vout]', audio: '[aout]', duration: +len.toFixed(3) };
}

const probeDuration = (f) => Number(execFileSync(bin('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' }).trim());

export async function assemble({ id, locale, out, shots }) {
  if (shots.length !== 5) throw new Error('a teaser has exactly five shots');
  const script = loadScript(id);
  const L = script.locales[locale];
  const url = `https://textbook.com.pk${locale === 'ur' ? '/ur' : ''}${teaserRoute(script)}`;
  const caps = [];
  for (let i = 0; i < 5; i++) {
    const p = `${out}.cap${i + 1}.png`;
    await sharp(Buffer.from(captionSvg(L.narration[i], locale))).png().toFile(p);
    caps.push(p);
  }
  const end = `${out}.end.png`;
  await sharp(Buffer.from(endCardSvg({ title: L.end_card.headline, cta: L.end_card.cta, url, locale }))).png().toFile(end);
  const durations = shots.map(probeDuration);
  const { graph, video, audio, duration } = buildFilter(durations);
  const args = ['-nostdin', '-hide_banner', '-loglevel', 'error', '-y'];
  for (const s of shots) args.push('-i', s);
  for (const c of caps) args.push('-loop', '1', '-i', c);
  args.push('-loop', '1', '-t', String(END_SECONDS), '-i', end);
  args.push('-f', 'lavfi', '-t', String(END_SECONDS), '-i', 'anullsrc=r=48000:cl=stereo');
  args.push('-filter_complex', graph, '-map', video, '-map', audio,
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '30',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-t', String(duration), '-movflags', '+faststart', out);
  execFileSync(bin('ffmpeg'), args, { stdio: ['ignore', 'inherit', 'inherit'] });
  return { encoded_file: out, end_card: end, captions: caps, expected_duration_s: duration, url };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [id, locale, out, ...shots] = process.argv.slice(2);
  if (!id || !['en', 'ur'].includes(locale) || !out || shots.length !== 5) {
    console.error('usage: assemble-teaser.mjs <id> <en|ur> <out.mp4> <shot1> <shot2> <shot3> <shot4> <shot5>');
    process.exit(2);
  }
  assemble({ id, locale, out: resolve(out), shots: shots.map((s) => resolve(s)) })
    .then((r) => console.log(JSON.stringify(r, null, 1)))
    .catch((e) => { console.error(`assemble-teaser: ${e.message}`); process.exit(1); });
}
