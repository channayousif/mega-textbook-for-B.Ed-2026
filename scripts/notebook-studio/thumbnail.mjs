#!/usr/bin/env node
// Feature 029: eye-catching, informative, action-oriented thumbnails for every Study Studio upload
// (owner, 2026-11-17). The best frame of the video, colour-boosted, behind a huge hook, a course
// badge, a "free course" ribbon and an action pill. Used by audio-to-video.mjs (unit audio/video,
// 1280x720) and assemble-teaser.mjs (Shorts, 1080x1920) so every future upload gets one.
//
//   node scripts/notebook-studio/thumbnail.mjs backfill <course> <unit>   # rebuild for a unit ledger
//   node scripts/notebook-studio/thumbnail.mjs preview <thumb.jpg>        # phone-grid size check image
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { wrap, bidiUr } from './text-layout.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const bin = (t) => (process.env.FFMPEG_DIR ? join(process.env.FFMPEG_DIR, t) : t);
export const THUMB_MAX_BYTES = 2 * 1024 * 1024;
const BRAND = { teal: '#123e43', amber: '#e5a333', paper: '#f8f5ef', ink: '#0b1f22' };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
const URDU = "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif";
const LATIN = "'Nunito', 'DejaVu Sans', sans-serif";
export const SIZES = { landscape: { w: 1280, h: 720 }, portrait: { w: 1080, h: 1920 } };

// ---------- frame choice ----------

/** Higher is better: sharp, mid-bright, colourful. Inputs are 0..1 except sharpness (Laplacian stdev). */
export function frameScore({ sharpness, brightness, colour }) {
  const exposure = 1 - Math.min(1, Math.abs(brightness - 0.5) * 2.2); // penalise near-black and blown-out
  return sharpness * (0.35 + exposure) * (0.6 + colour);
}

async function measure(buf) {
  const img = sharp(buf);
  const lap = await img.clone().greyscale().convolve({ width: 3, height: 3, kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0] }).stats();
  const st = await img.clone().stats();
  const [r, g, b] = st.channels;
  const brightness = (r.mean + g.mean + b.mean) / (3 * 255);
  const colour = Math.min(1, (Math.abs(r.mean - g.mean) + Math.abs(g.mean - b.mean) + Math.abs(b.mean - r.mean)) / 255 + (r.stdev + g.stdev + b.stdev) / (3 * 255));
  return { sharpness: lap.channels[0].stdev, brightness, colour };
}

const duration = (f) => Number(execFileSync(bin('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], { encoding: 'utf8' }).trim());
const grab = (f, t, width) => spawnSync(bin('ffmpeg'), ['-nostdin', '-v', 'error', '-ss', t.toFixed(2), '-i', f, '-frames:v', '1', ...(width ? ['-vf', `scale=${width}:-2`] : []), '-f', 'image2pipe', '-vcodec', 'png', '-'], { maxBuffer: 64 * 1024 * 1024 }).stdout;

/** The best frame of a video (full resolution PNG buffer), skipping the opening and any end card. */
export async function pickFrame(file, { skipStart = 1, skipEnd = 0, samples = 12 } = {}) {
  const d = duration(file);
  const a = Math.min(skipStart, d * 0.2);
  const b = Math.max(a + 0.1, d - skipEnd - 0.3);
  let best = null;
  for (let i = 0; i < samples; i++) {
    const t = a + ((b - a) * (i + 0.5)) / samples;
    const small = grab(file, t, 320);
    if (!small?.length) continue;
    const s = frameScore(await measure(small));
    if (!best || s > best.s) best = { s, t };
  }
  if (!best) throw new Error(`no frame could be read from ${file}`);
  // Trim letterbox bars Veo sometimes burns in, so `cover` fills the frame with picture.
  const png = await sharp(grab(file, best.t)).trim({ threshold: 24 }).png().toBuffer().catch(() => grab(file, best.t));
  return { t: best.t, score: best.s, png };
}

// ---------- layout ----------

const ICON = {
  play: (c) => `<path d="M36 24 L80 50 L36 76 Z" fill="${c}"/>`,
  audio: (c) => `<path d="M20 58v-8a30 30 0 0 1 60 0v8" fill="none" stroke="${c}" stroke-width="9"/><rect x="14" y="54" width="18" height="28" rx="6" fill="${c}"/><rect x="68" y="54" width="18" height="28" rx="6" fill="${c}"/>`,
};

const LABELS = {
  ur: { free: 'مفت کورس', watch: 'ابھی دیکھیں', listen: 'ابھی سنیں', unit: 'یونٹ', kinds: { video: 'ویڈیو', audio: 'آڈیو بریف', short: 'مختصر ویڈیو' } },
  en: { free: 'Free course', watch: 'Watch now', listen: 'Listen now', unit: 'Unit', kinds: { video: 'Video', audio: 'Audio brief', short: 'Short' } },
};

/** Hook lines and size: the largest size that fits the hook in at most three lines. */
export function fitHook(hook, { locale, aspect }) {
  const ur = locale === 'ur';
  const src = ur ? bidiUr(hook) : String(hook);
  const steps = aspect === 'portrait' ? [[124, 11], [108, 13], [92, 16]] : [[92, 15], [80, 18], [68, 21]];
  for (const [size, budget] of steps) {
    const lines = wrap(src, ur ? budget : Math.round(budget * 1.15), 9);
    if (lines.length <= (aspect === 'portrait' ? 3 : 2)) return { lines, size };
  }
  const [size, budget] = steps.at(-1);
  return { lines: wrap(src, ur ? budget : Math.round(budget * 1.15), 3), size };
}

/**
 * The overlay drawn over the frame. `kind` is video | audio | short; `badge` is the course and unit
 * line (e.g. "EFMP-301 · یونٹ 4").
 */
export function thumbnailSvg({ hook, badge, kind = 'video', locale = 'ur', aspect = 'landscape' }) {
  const ur = locale === 'ur';
  const { w, h } = SIZES[aspect];
  const L = LABELS[ur ? 'ur' : 'en'];
  const font = ur ? URDU : LATIN;
  const dir = ur ? ' direction="rtl" unicode-bidi="embed"' : '';
  const rtl = (s) => (ur ? `‏${esc(s)}` : esc(s));
  const { lines, size } = fitHook(hook, { locale, aspect });
  const lh = ur ? Math.round(size * 1.95) : Math.round(size * 1.12);
  const portrait = aspect === 'portrait';
  // Text block: right side for Urdu, left for English (landscape); centred band for portrait.
  const textX = portrait ? w / 2 : ur ? w - 56 : 56;
  const anchor = portrait ? 'middle' : 'start'; // under rtl, "start" is the right edge at x
  const blockH = lines.length * lh;
  const top = portrait ? 560 : Math.max(150, (h - blockH) / 2 + (ur ? 10 : 0));
  const hookSvg = lines.map((l, i) => `<text x="${textX}" y="${top + (i + 0.78) * lh}" font-size="${size}" font-weight="800" fill="#fff" stroke="${BRAND.ink}" stroke-width="${Math.round(size / 9)}" paint-order="stroke" stroke-linejoin="round" text-anchor="${anchor}"${dir} font-family="${font}" filter="url(#sh)">${rtl(l)}</text>`).join('');
  const barW = portrait ? 360 : 300;
  const barX = portrait ? (w - barW) / 2 : ur ? w - 56 - barW : 56;
  const barY = top + blockH + (ur ? 6 : 18);
  const shade = portrait
    ? `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0.55"/><stop offset="0.25" stop-color="#000" stop-opacity="0.15"/><stop offset="0.6" stop-color="#000" stop-opacity="0.25"/><stop offset="1" stop-color="#000" stop-opacity="0.85"/></linearGradient>`
    : `<linearGradient id="g" x1="${ur ? 1 : 0}" y1="0" x2="${ur ? 0 : 1}" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0.9"/><stop offset="0.6" stop-color="#000" stop-opacity="0.7"/><stop offset="1" stop-color="#000" stop-opacity="0.2"/></linearGradient>`;
  // Ribbon and badge along the top; action pill near the bottom.
  const pad = portrait ? 60 : 36;
  const ribbonW = ur ? 230 : 250;
  const ribbon = `<g transform="translate(${ur ? pad : w - pad - ribbonW} ${pad})"><rect width="${ribbonW}" height="${portrait ? 96 : 70}" rx="14" fill="${BRAND.amber}"/><text x="${ribbonW / 2}" y="${portrait ? (ur ? 66 : 63) : (ur ? 48 : 47)}" font-size="${portrait ? (ur ? 44 : 40) : (ur ? 34 : 32)}" font-weight="800" fill="${BRAND.teal}" text-anchor="middle"${dir} font-family="${font}">${rtl(L.free)}</text></g>`;
  const badgeText = `${badge} · ${L.kinds[kind]}`;
  const badgeW = Math.min(w - ribbonW - pad * 3, (portrait ? 26 : 20) * [...badgeText].length + 60);
  const badgeEl = `<g transform="translate(${ur ? w - pad - badgeW : pad} ${pad})"><rect width="${badgeW}" height="${portrait ? 96 : 70}" rx="14" fill="${BRAND.teal}" fill-opacity="0.92" stroke="${BRAND.amber}" stroke-width="3"/><text x="${badgeW / 2}" y="${portrait ? (ur ? 66 : 62) : (ur ? 48 : 46)}" font-size="${portrait ? (ur ? 38 : 36) : (ur ? 30 : 28)}" font-weight="700" fill="${BRAND.paper}" text-anchor="middle"${dir} font-family="${font}">${rtl(ur ? bidiUr(badgeText) : badgeText)}</text></g>`;
  const ctaLabel = kind === 'audio' ? L.listen : L.watch;
  const pillH = portrait ? 130 : 88;
  const pillW = portrait ? 520 : 330;
  const pillX = portrait ? (w - pillW) / 2 : ur ? w - 56 - pillW : 56;
  const pillY = portrait ? h - 430 : h - pillH - 44;
  const disc = pillH / 2;
  const discX = ur ? pillW - disc : disc;
  const icon = `<g transform="translate(${discX - disc * 0.62} ${disc - disc * 0.62}) scale(${(disc * 1.24) / 100})">${ICON[kind === 'audio' ? 'audio' : 'play'](BRAND.amber)}</g>`;
  const pill = `<g transform="translate(${pillX} ${pillY})" filter="url(#sh)"><rect width="${pillW}" height="${pillH}" rx="${pillH / 2}" fill="${BRAND.amber}"/><circle cx="${discX}" cy="${disc}" r="${disc - 9}" fill="${BRAND.teal}"/>${icon}<text x="${ur ? (pillW - pillH) / 2 : pillH + (pillW - pillH) / 2}" y="${disc + (ur ? (portrait ? 20 : 14) : (portrait ? 16 : 12))}" font-size="${portrait ? (ur ? 54 : 50) : (ur ? 38 : 36)}" font-weight="800" fill="${BRAND.teal}" text-anchor="middle"${dir} font-family="${font}">${rtl(ctaLabel)}</text></g>`;
  const brand = `<text x="${portrait ? w / 2 : ur ? 56 : w - 56}" y="${h - (portrait ? 140 : 40)}" font-size="${portrait ? 44 : 28}" font-weight="800" fill="#fff" stroke="${BRAND.ink}" stroke-width="5" paint-order="stroke" text-anchor="${portrait ? 'middle' : ur ? 'start' : 'end'}" font-family="${LATIN}">textbook.com.pk</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs>${shade}<filter id="sh" x="-10%" y="-10%" width="120%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000" flood-opacity="0.6"/></filter></defs>
<rect width="${w}" height="${h}" fill="url(#g)"/>
${hookSvg}
<rect x="${barX}" y="${barY}" width="${barW}" height="${portrait ? 16 : 12}" rx="6" fill="${BRAND.amber}"/>
${ribbon}${badgeEl}${pill}${brand}
</svg>`;
}

/** Brand gradient when no frame is available. */
const fallbackBg = ({ w, h }) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${BRAND.teal}"/><stop offset="1" stop-color="#1f6b70"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#b)"/></svg>`);

/**
 * Write the thumbnail JPEG. `frameFrom` is a list of candidate videos (first readable wins) with
 * optional { skipEnd }; with none, the brand gradient is used.
 */
export async function buildThumbnail({ out, hook, badge, kind, locale, aspect = 'landscape', frameFrom = [], soften = aspect === 'landscape' }) {
  const { w, h } = SIZES[aspect];
  let bg = null;
  // Sources are tiers: the first tier with a readable file wins, and within a tier (an array of
  // files, e.g. the five teaser shots) the best-scoring frame across all files is used.
  for (const tier of frameFrom) {
    let best = null;
    for (const src of [tier].flat()) {
      const f = typeof src === 'string' ? { file: src } : src;
      if (!f?.file || !existsSync(f.file)) continue;
      try { const r = await pickFrame(f.file, { skipEnd: f.skipEnd ?? 0, samples: f.samples ?? 12 }); if (!best || r.score > best.score) best = r; } catch { /* next file */ }
    }
    if (best) { bg = best.png; break; }
  }
  const base = bg
    // NotebookLM frames are slides with their own text: soften them so only the hook reads.
    ? await (soften ? sharp(bg).resize(w, h, { fit: 'cover', position: 'attention' }).blur(6) : sharp(bg).resize(w, h, { fit: 'cover', position: 'attention' }))
      .modulate({ saturation: 1.3, brightness: soften ? 0.92 : 1.04 }).linear(1.08, -6).toBuffer()
    : await sharp(fallbackBg({ w, h })).png().toBuffer();
  await sharp(base).composite([{ input: Buffer.from(thumbnailSvg({ hook, badge, kind, locale, aspect })) }]).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
  if (statSync(out).size >= THUMB_MAX_BYTES) await sharp(out).jpeg({ quality: 74 }).toFile(`${out}.tmp.jpg`).then(() => writeFileSync(out, readFileSync(`${out}.tmp.jpg`)));
  if (statSync(out).size >= THUMB_MAX_BYTES) throw new Error(`thumbnail ${out} is over 2 MB`);
  return { thumbnail_file: out, from_frame: Boolean(bg) };
}

/** Phone-grid preview (how the thumbnail looks in a feed) for the visual check. */
export async function preview(thumb) {
  const meta = await sharp(thumb).metadata();
  const portrait = meta.height > meta.width;
  const out = thumb.replace(/\.jpg$/, '.preview.png');
  await sharp(thumb).resize(portrait ? 120 : 168, portrait ? 213 : 94).resize(portrait ? 360 : 504, portrait ? 640 : 282, { kernel: 'nearest' }).png().toFile(out);
  return out;
}

// ---------- unit-ledger helpers ----------

/** Hook, badge, kind and frame sources for a unit media-ledger item. */
export function unitThumbSpec(ledger, item, { mediaRoot = join(process.env.HOME ?? '', 'studio-media') } = {}) {
  const ur = item.locale === 'ur';
  const dir = join(mediaRoot, ledger.course, `unit-${String(ledger.unit).padStart(2, '0')}`, `topic-${String(item.topic).padStart(2, '0')}`);
  const sibling = ledger.items.find((i) => i.topic === item.topic && i.locale === item.locale && i.kind === 'video')
    ?? ledger.items.find((i) => i.topic === item.topic && i.kind === 'video');
  const own = item.kind === 'video' ? [item.file, join(dir, `${item.key}.mp4`)] : [];
  const sib = sibling ? [sibling.file, join(dir, `${sibling.key}.mp4`)] : [];
  const teaserShots = [1, 2, 3, 4, 5].map((n) => join(mediaRoot, 'teasers', ledger.course, item.locale, `shot-${n}-t1.mp4`));
  return {
    hook: item.title,
    badge: `${ledger.course.toUpperCase()} · ${ur ? 'یونٹ' : 'Unit'} ${ledger.unit}`,
    kind: item.kind === 'video' ? 'video' : 'audio',
    locale: item.locale,
    frameFrom: [...own, ...sib].filter(Boolean).map((f) => ({ file: f.replace(/^~/, process.env.HOME ?? '~'), skipEnd: 4 }))
      .concat([teaserShots.map((f) => ({ file: f, samples: 4 }))]),
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, x, y] = process.argv.slice(2);
  const run = async () => {
    if (cmd === 'preview') return { preview: await preview(resolve(x)) };
    if (cmd === 'backfill') {
      const { loadLedger } = await import('./media-ledger.mjs');
      const L = loadLedger(x, Number(y));
      const out = [];
      for (const item of L.items.filter((i) => i.youtube_id && ['public', 'placed'].includes(i.state))) {
        const spec = unitThumbSpec(L, item);
        const file = (item.encoded_file ?? join(process.env.HOME, 'studio-media', x, `unit-${String(y).padStart(2, '0')}`, `topic-${String(item.topic).padStart(2, '0')}`, `${item.key}.yt.mp4`)).replace(/^~/, process.env.HOME);
        const r = await buildThumbnail({ out: `${file}.thumb2.jpg`, ...spec });
        out.push({ key: item.key, youtube_id: item.youtube_id, thumbnail_path: r.thumbnail_file, from_frame: r.from_frame });
      }
      return out;
    }
    throw new Error('commands: backfill <course> <unit> | preview <thumb.jpg>');
  };
  run().then((r) => console.log(JSON.stringify(r, null, 1))).catch((e) => { console.error(`thumbnail: ${e.message}`); process.exit(1); });
}
