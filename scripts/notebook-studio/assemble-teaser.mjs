#!/usr/bin/env node
// Feature 029 studio-teaser stage 6: five Veo shots + per-shot captions + an end card -> one Short.
//
//   node scripts/notebook-studio/assemble-teaser.mjs <id> <locale> <out.mp4> <shot1.mp4> ... <shot5.mp4> [--platform youtube|tiktok|instagram|facebook|linkedin] [--speed 1.25]
//
// Each shot is scaled/cropped to 1080x1920 at 30 fps and gets its narration line as a burned-in
// caption (Veo speaks the line; the caption makes it readable with sound off, and keeps Urdu
// legible as Nastaliq RTL). Fast pace (owner, 2026-11-17: the 43 s cross-fade cut felt "slow and
// lame"): pauses of 0.45 s or more inside a shot and its dead head/tail are cut, the voice runs
// 12% faster, segments join with hard cuts plus a whoosh, alternate segments are punched in and
// every segment slowly pushes in, a beat bed ducks under the voice, and a 3 s end card zooms in
// with the course title, the call to action and the exact page address.
import { execFileSync, spawnSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { wrap, bidiUr } from './text-layout.mjs';
import { buildThumbnail } from './thumbnail.mjs';
import { loadScript, teaserRoute } from './teaser.mjs';

const bin = (t) => (process.env.FFMPEG_DIR ? join(process.env.FFMPEG_DIR, t) : t);
import { BRAND } from '../media/brand.mjs'; // Feature 030: one source of truth for house colours
export const END_SECONDS = 3;
export const PACE = { speed: 1.12, gap: 0.45, keep: 0.12, punch: 1.1, push: 0.0025, bpm: 124 };
const FPS = 30;
const AUDIO_OUT = 'loudnorm=I=-15.5:TP=-2:LRA=11,alimiter=limit=0.7:level=disabled';
const W = 1080;
const H = 1920;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
const fontFor = (locale) => (locale === 'ur' ? "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif" : "'Nunito', 'DejaVu Sans', sans-serif");
// librsvg: under direction="rtl" the anchor still centres on x with "middle", which is what captions use.
const dirAttr = (locale) => (locale === 'ur' ? ' direction="rtl" unicode-bidi="embed"' : '');
export { bidiUr }; // moved to text-layout.mjs; re-exported for existing callers
const lineText = (l, locale) => (locale === 'ur' ? `\u200F${esc(l)}` : esc(l));

/** Transparent 1080x1920 overlay with the caption in a dark box in the lower third. */
export function captionSvg(text, locale) {
  const ur = locale === 'ur';
  // Never truncate a spoken line: wrap without an ellipsis, and step the size down for long lines.
  const src = ur ? bidiUr(text) : text;
  let lines = wrap(src, ur ? 26 : 24, 9);
  const long = lines.length > 3;
  if (long) lines = wrap(src, ur ? 30 : 28, 9);
  const size = ur ? (long ? 48 : 54) : (long ? 48 : 54);
  const lh = ur ? Math.round(size * 2.2) : Math.round(size * 1.35);
  const boxH = lines.length * lh + 60;
  const top = 1560 - boxH;
  const t = lines.map((l, i) => `<text x="${W / 2}" y="${top + 30 + (i + 0.8) * lh}" font-size="${size}" font-weight="700" fill="${BRAND.paper}" text-anchor="middle"${dirAttr(locale)} font-family="${fontFor(locale)}">${lineText(l, locale)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect x="60" y="${top}" width="${W - 120}" height="${boxH}" rx="28" fill="#000" fill-opacity="0.55"/>${t}</svg>`;
}

/** Brand end card: course title, call to action, and the address (split so it never overflows). */
export function endCardSvg({ title, cta, url, locale, bio = false }) {
  const ur = locale === 'ur';
  const titleLines = wrap(ur ? bidiUr(title) : title, ur ? 18 : 20, 3);
  const tSize = ur ? 76 : 84;
  const tLh = ur ? Math.round(tSize * 2.4) : Math.round(tSize * 1.25);
  const host = 'textbook.com.pk';
  const path = url.replace(/^https:\/\/textbook\.com\.pk/, '') || '/';
  const tTop = 640;
  const tt = titleLines.map((l, i) => `<text x="${W / 2}" y="${tTop + i * tLh}" font-size="${tSize}" font-weight="700" fill="${BRAND.paper}" text-anchor="middle"${dirAttr(locale)} font-family="${fontFor(locale)}">${lineText(l, locale)}</text>`).join('');
  const ctaY = tTop + titleLines.length * tLh + (ur ? 90 : 70);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${BRAND.teal}"/>
<rect x="0" y="0" width="${W}" height="24" fill="${BRAND.amber}"/>
${tt}
<text x="${W / 2}" y="${ctaY}" font-size="${ur ? 60 : 56}" fill="${BRAND.amber}" font-weight="700" text-anchor="middle"${dirAttr(locale)} font-family="${fontFor(locale)}">${lineText(ur ? bidiUr(cta) : cta, locale)}</text>
<rect x="110" y="1380" width="${W - 220}" height="250" rx="36" fill="${BRAND.paper}"/>
<text x="${W / 2}" y="1480" font-size="72" font-weight="800" fill="${BRAND.teal}" text-anchor="middle" font-family="'Nunito', 'DejaVu Sans', sans-serif">${host}</text>
${bio ? `<text x="${W / 2}" y="1578" font-size="${ur ? 46 : 44}" font-weight="700" fill="${BRAND.teal}" text-anchor="middle"${dirAttr(locale)} font-family="${fontFor(locale)}">${lineText(ur ? 'لنک بائیو میں' : 'Link in bio', locale)}</text>`
    : `<text x="${W / 2}" y="1570" font-size="${path.length > 34 ? 34 : 40}" fill="${BRAND.teal}" text-anchor="middle" font-family="'DejaVu Sans Mono', monospace">${esc(path)}</text>`}
</svg>`;
}

/**
 * Platform-aware follow reminder (owner, 2026-11-17: a periodic layer, text and icons only). Generic
 * drawn icons, never platform logos. `bio` platforms cannot show a clickable link, so their end card
 * points to the profile bio instead of printing the page path.
 */
export const PLATFORM_CTA = {
  youtube: { icon: 'bell', bio: false, ur: 'چینل سبسکرائب کریں', en: 'Subscribe to the channel' },
  tiktok: { icon: 'follow', bio: true, ur: 'مزید کورسز کے لیے فالو کریں', en: 'Follow for more courses' },
  instagram: { icon: 'follow', bio: true, ur: 'مزید کورسز کے لیے فالو کریں', en: 'Follow for more courses' },
  facebook: { icon: 'follow', bio: false, ur: 'پیج فالو کریں', en: 'Follow the page' },
  linkedin: { icon: 'follow', bio: false, ur: 'مزید کورسز کے لیے فالو کریں', en: 'Follow for more courses' },
};
export const CTA_BOX = { w: 860, h: 150, y: 300 };
const ICONS = {
  bell: (c) => `<path d="M50 12c-15 0-26 12-26 27v18l-8 12v4h68v-4l-8-12V39c0-15-11-27-26-27z" fill="${c}"/><circle cx="50" cy="84" r="8" fill="${c}"/>`,
  follow: (c) => `<circle cx="40" cy="34" r="15" fill="${c}"/><path d="M12 84c0-17 12-28 28-28s28 11 28 28z" fill="${c}"/><rect x="70" y="42" width="26" height="9" rx="3" fill="${c}"/><rect x="78.5" y="33.5" width="9" height="26" rx="3" fill="${c}"/>`,
};

export function ctaSvg(platform, locale) {
  const P = PLATFORM_CTA[platform];
  if (!P) throw new Error(`unknown platform ${platform}`);
  const ur = locale === 'ur';
  const { w, h } = CTA_BOX;
  const r = h / 2;
  // Icon disc on the reading-start side: right for Urdu, left for English.
  const cx = ur ? w - r : r;
  const textX = ur ? (w - h) / 2 + 6 : h + (w - h) / 2 - 6; // centre of the space beside the icon
  const icon = `<g transform="translate(${cx - 44} ${r - 44}) scale(0.88)">${ICONS[P.icon](BRAND.amber)}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<rect x="3" y="3" width="${w - 6}" height="${h - 6}" rx="${r - 3}" fill="${BRAND.amber}" stroke="${BRAND.paper}" stroke-width="6"/>
<circle cx="${cx}" cy="${r}" r="${r - 14}" fill="${BRAND.teal}"/>${icon}
<text x="${textX}" y="${ur ? r + 22 : r + 18}" font-size="${ur ? 50 : 40}" font-weight="800" fill="${BRAND.teal}" text-anchor="middle"${dirAttr(locale)} font-family="${fontFor(locale)}">${lineText(P[locale] ?? P.en, locale)}</text>
</svg>`;
}

/** Three reminder windows across the shots (not the end card), as [start, end] seconds. */
export function ctaWindows(contentSeconds, { at = [0.15, 0.5, 0.8], show = 2.2 } = {}) {
  return at.map((f) => {
    const a = +Math.max(0.5, Math.min(f * contentSeconds, contentSeconds - show - 0.3)).toFixed(2);
    return [a, +(a + show).toFixed(2)];
  });
}

/**
 * Speech spans of one shot from ffmpeg silencedetect output: pauses shorter than `gap` stay, longer
 * ones split the shot, and each span keeps `keep` seconds of air on both sides.
 */
export function speechSegments(stderr, duration, { gap = PACE.gap, keep = PACE.keep } = {}) {
  const sil = [];
  let open = null;
  for (const m of stderr.matchAll(/silence_(start|end): ([\d.]+)/g)) {
    if (m[1] === 'start') open = +m[2];
    else { sil.push([open ?? 0, +m[2]]); open = null; }
  }
  if (open !== null) sil.push([open, duration]);
  const speech = [];
  let t = 0;
  for (const [a, b] of sil) { if (a > t) speech.push([t, a]); t = b; }
  if (t < duration) speech.push([t, duration]);
  const merged = [];
  for (const [a, b] of speech.filter(([a, b]) => b - a > 0.08)) {
    const last = merged.at(-1);
    if (last && a - last[1] < gap) last[1] = b; else merged.push([a, b]);
  }
  if (!merged.length) merged.push([0, duration]);
  return merged.map(([a, b]) => ({ a: +Math.max(0, a - keep).toFixed(3), b: +Math.min(duration, b + keep).toFixed(3) }));
}

/**
 * filter_complex for the fast cut. Inputs: shots 0..N-1 (with audio), their caption PNGs N..2N-1,
 * the end-card PNG 2N. `segments` are {shot (0-based), a, b} in play order. Returns the graph, the
 * output labels and the duration.
 */
export function buildFilter(segments, { shots = 5, crops = [], endSeconds = END_SECONDS, pace = PACE, cta = false } = {}) {
  if (segments.length < 2) throw new Error('need at least two segments');
  const p = [];
  const cuts = [];
  let total = 0;
  const zoom = (z) => `scale=${W * 1.2}:${H * 1.2},zoompan=z='${z}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=${W}x${H}:fps=${FPS}`;
  segments.forEach((s, k) => {
    const c = crops[s.shot];
    const pre = c ? `crop=${c.w}:${c.h}:${c.x}:${c.y},` : '';
    const frames = Math.ceil(((s.b - s.a) / pace.speed) * FPS);
    const secs = frames / FPS;
    const z0 = k % 2 ? pace.punch : 1;
    p.push(`[${s.shot}:v]trim=${s.a}:${s.b},setpts=(PTS-STARTPTS)/${pace.speed},${pre}scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=${FPS},` +
      `${zoom(`${z0}+${pace.push}*on`)},setsar=1,format=yuv420p[z${k}]`);
    p.push(`[z${k}][${shots + s.shot}:v]overlay=0:0:shortest=1,tpad=stop_mode=clone:stop_duration=1,trim=end_frame=${frames},setpts=PTS-STARTPTS[v${k}]`);
    p.push(`[${s.shot}:a]atrim=${s.a}:${s.b},asetpts=PTS-STARTPTS,atempo=${pace.speed},aresample=48000,aformat=channel_layouts=stereo,` +
      `afade=t=in:d=0.02,afade=t=out:st=${Math.max(0, secs - 0.05).toFixed(3)}:d=0.03,apad,atrim=end=${secs.toFixed(4)}[a${k}]`);
    cuts.push(total);
    total += secs;
  });
  const n = segments.length;
  p.push(`[${2 * shots}:v]${zoom('max(1,1.15-0.01*on)')},setsar=1,format=yuv420p,tpad=stop_mode=clone:stop_duration=1,trim=end_frame=${endSeconds * FPS}[v${n}]`);
  p.push(`anullsrc=r=48000:cl=stereo,atrim=end=${endSeconds}[a${n}]`);
  cuts.push(total);
  total += endSeconds;
  const all = [...Array(n + 1).keys()];
  const content = total - endSeconds;
  const windows = cta ? ctaWindows(content) : [];
  p.push(`${all.map((k) => `[v${k}]`).join('')}concat=n=${n + 1}:v=1:a=0${windows.length ? '[vcat]' : '[vout]'}`);
  if (windows.length) {
    // Input 2N+1 is the reminder PNG: each window fades in while sliding down 40 px, then fades out.
    p.push(`[${2 * shots + 1}:v]format=rgba,split=${windows.length}${windows.map((_, i) => `[c${i}]`).join('')}`);
    let prev = 'vcat';
    windows.forEach(([a, b], i) => {
      p.push(`[c${i}]fade=t=in:st=${a}:d=0.25:alpha=1,fade=t=out:st=${(b - 0.25).toFixed(2)}:d=0.25:alpha=1[cf${i}]`);
      const outL = i === windows.length - 1 ? 'vout' : `vc${i}`;
      p.push(`[${prev}][cf${i}]overlay=x=(W-w)/2:y='${CTA_BOX.y}-40*max(0,1-(t-${a})/0.25)':enable='between(t,${a},${b})'[${outL}]`);
      prev = outL;
    });
  }
  p.push(`${all.map((k) => `[a${k}]`).join('')}concat=n=${n + 1}:v=0:a=1,asplit=2[voice][sc]`);
  // Beat bed: kick on the beat, hat on the off-beat, a plucked bass on eighths over four chords.
  const B = +(60 / pace.bpm).toFixed(5);
  const bass = `if(lt(mod(t,${8 * B}),${2 * B}),55,if(lt(mod(t,${8 * B}),${4 * B}),65.41,if(lt(mod(t,${8 * B}),${6 * B}),49,58.27)))`;
  p.push(`aevalsrc='0.9*sin(2*PI*52*mod(t,${B})*(1+2.5*exp(-mod(t,${B})*28)))*exp(-mod(t,${B})*10)` +
    `+0.18*(random(0)*2-1)*exp(-mod(t+${B / 2},${B})*70)+0.35*sin(2*PI*${bass}*2*t)*exp(-mod(t,${B / 2})*7)'` +
    `:s=48000:d=${total.toFixed(2)},aformat=channel_layouts=stereo,lowpass=f=6000,volume=0.5,afade=t=in:d=0.3,afade=t=out:st=${(total - 1.2).toFixed(2)}:d=1.2[bed]`);
  const wh = cuts.slice(1).map((t, i) => `anoisesrc=d=0.28:c=pink:a=0.35:r=48000,highpass=f=900,lowpass=f=5000,` +
    `afade=t=in:d=0.18,afade=t=out:st=0.18:d=0.1,aformat=channel_layouts=stereo,adelay=${Math.max(0, Math.round((t - 0.18) * 1000))}:all=1[w${i}]`);
  p.push(...wh);
  p.push('[bed][sc]sidechaincompress=threshold=0.03:ratio=8:attack=15:release=250[duck]');
  p.push(`[voice][duck]${wh.map((_, i) => `[w${i}]`).join('')}amix=inputs=${2 + wh.length}:normalize=0:duration=first,${AUDIO_OUT}[aout]`);
  return { graph: p.join(';'), video: '[vout]', audio: '[aout]', duration: +total.toFixed(3), cuts, windows };
}

/**
 * Letterbox bars Veo burned into a clip, from ffmpeg cropdetect (most frequent box). Returns null
 * when the picture already fills the frame or the bars are thin (under 2% of the height).
 */
export function parseCropdetect(stderr, width, height) {
  const counts = new Map();
  for (const m of stderr.matchAll(/crop=(\d+):(\d+):(\d+):(\d+)/g)) counts.set(m[0], (counts.get(m[0]) ?? 0) + 1);
  if (!counts.size) return null;
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
  const [w, h, x, y] = top.slice(5).split(':').map(Number);
  if (height - h < height * 0.02 && width - w < width * 0.02) return null;
  return { w, h, x, y };
}

const detectCrop = (f) => {
  const r = spawnSync(bin('ffmpeg'), ['-hide_banner', '-i', f, '-vf', 'cropdetect=24:2:0', '-f', 'null', '-'], { encoding: 'utf8' });
  const dim = execFileSync(bin('ffprobe'), ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', f], { encoding: 'utf8' }).trim().split(',').map(Number);
  return parseCropdetect(r.stderr ?? '', dim[0], dim[1]);
};

const detectSilence = (f) => spawnSync(bin('ffmpeg'), ['-hide_banner', '-nostats', '-i', f, '-af', 'silencedetect=n=-35dB:d=0.25', '-f', 'null', '-'], { encoding: 'utf8' }).stderr ?? '';

const probeDuration = (f) => Number(execFileSync(bin('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' }).trim());

export async function assemble({ id, locale, out, shots, platform = 'youtube', speed = PACE.speed }) {
  if (!PLATFORM_CTA[platform]) throw new Error(`unknown platform ${platform}`);
  if (shots.length !== 5) throw new Error('a teaser has exactly five shots');
  const script = loadScript(id);
  const L = script.locales[locale];
  if (!L) throw new Error(`${id} has no ${locale} locale`);
  const url = `https://textbook.com.pk${locale === 'ur' ? '/ur' : ''}${teaserRoute(script)}`;
  const caps = [];
  for (let i = 0; i < 5; i++) {
    const p = `${out}.cap${i + 1}.png`;
    await sharp(Buffer.from(captionSvg(L.narration[i], locale))).png().toFile(p);
    caps.push(p);
  }
  const end = `${out}.end.png`;
  await sharp(Buffer.from(endCardSvg({ title: L.end_card.headline, cta: L.end_card.cta, url, locale, bio: PLATFORM_CTA[platform].bio }))).png().toFile(end);
  const ctaPng = `${out}.cta.png`;
  await sharp(Buffer.from(ctaSvg(platform, locale))).png().toFile(ctaPng);
  const crops = shots.map(detectCrop);
  const segments = shots.flatMap((f, shot) => speechSegments(detectSilence(f), probeDuration(f)).map((s) => ({ shot, ...s })));
  const { graph, video, audio, duration, windows } = buildFilter(segments, { crops, cta: true, pace: { ...PACE, speed } });
  const args = ['-nostdin', '-hide_banner', '-loglevel', 'error', '-y'];
  for (const s of shots) args.push('-i', s);
  for (const c of caps) args.push('-loop', '1', '-i', c);
  args.push('-loop', '1', '-t', String(END_SECONDS), '-i', end);
  args.push('-loop', '1', '-t', String(duration), '-i', ctaPng);
  args.push('-filter_complex', graph, '-map', video, '-map', audio,
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '30',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-t', String(duration), '-movflags', '+faststart', out);
  execFileSync(bin('ffmpeg'), args, { stdio: ['ignore', 'inherit', 'inherit'] });
  // Thumbnail (thumbnail.mjs): best frame across the raw shots 1-4 (no captions), the title's question
  // as the hook, the course badge, the "free course" ribbon and a watch pill. Shot 5 is the shared
  // closing shot, the same in every teaser, so it is left out to keep each thumbnail distinct.
  const hook = L.youtube_title.split(' | ')[0];
  const thumb = out.replace(/\.mp4$/, '') + '.thumb.jpg';
  await buildThumbnail({
    out: thumb, hook, badge: `${script.course_code ?? 'Licence'} · ${script.title[locale].replace(/\s*\([^)]*\)\s*/g, ' ').trim()}`,
    kind: 'short', locale, aspect: 'portrait', frameFrom: [shots.slice(0, 4).map((f) => ({ file: f, samples: 5 }))],
  });
  return { encoded_file: out, thumbnail_file: thumb, platform, end_card: end, captions: caps, expected_duration_s: duration, url, crops, segments, cta_windows: windows };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2);
  const pi = argv.indexOf('--platform');
  const platform = pi >= 0 ? argv.splice(pi, 2)[1] : 'youtube';
  // Recipe v2 (D-2026-0094) speeds the voice 1.25x; the default stays 1.12 for existing teasers.
  const si = argv.indexOf('--speed');
  const speed = si >= 0 ? Number(argv.splice(si, 2)[1]) : PACE.speed;
  const [id, locale, out, ...shots] = argv;
  if (!id || !['en', 'ur'].includes(locale) || !out || shots.length !== 5 || !PLATFORM_CTA[platform] || !(speed >= 1 && speed <= 1.5)) {
    console.error(`usage: assemble-teaser.mjs <id> <en|ur> <out.mp4> <shot1> ... <shot5> [--platform ${Object.keys(PLATFORM_CTA).join('|')}] [--speed 1-1.5]`);
    process.exit(2);
  }
  assemble({ id, locale, out: resolve(out), shots: shots.map((s) => resolve(s)), platform, speed })
    .then((r) => console.log(JSON.stringify(r, null, 1)))
    .catch((e) => { console.error(`assemble-teaser: ${e.message}`); process.exit(1); });
}
