// Feature 031: the branded 1080x1350 (4:5) card for a daily update post. Facebook, Instagram and
// LinkedIn all show 4:5 at full width in the feed. Teal ground, amber accents, the reverse logo,
// an eyebrow with the date, the English headline, the Urdu headline in Nastaliq, up to five
// bullets and the site address. Text only: no faces, maps or flags (media-studio imagery rules).
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { wrap, bidiUr } from '../notebook-studio/text-layout.mjs';
import { BRAND } from '../media/brand.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const CARD = { w: 1080, h: 1350 };
const LATIN = "'Nunito', 'DejaVu Sans', sans-serif";
const URDU = "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif";
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);

const ICON = {
  course: 'M-9 -2 0 -11 9 -2M-6 -4V8H6V-4',
  unit: 'M-9 -8H-1V8H-9zM1 -8H9V8H1z',
  urdu: 'M-9 -7H3V2H-3L-7 6V2H-9zM5 -2H9V7H7V10L4 7H-1V5',
  teaser: 'M-5 -8V8L8 0z',
  figures: 'M-10 -7H10V8H-10zM-9 6-3 0 1 4 4 1 9 6',
  updated: 'M-8 8-7 4 4 -7 7 -4-4 7z',
  review: 'M-8 0-3 5 8 -6',
  feature: 'M0 -10 3 -3 10 -3 4 2 6 9 0 5-6 9-4 2-10 -3-3 -3z',
};

const dateLabel = (iso) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Karachi' }).format(new Date(`${iso}T12:00:00Z`));

/** The card's SVG (exported for tests and previews). */
export function cardSvg(post) {
  const { w, h } = CARD;
  const pad = 72;
  const logo = readFileSync(join(ROOT, 'static/img/kit/horizontal-reverse.svg')).toString('base64');
  const eyebrow = post.kind === 'feature' ? 'PLATFORM UPDATE' : "WHAT'S NEW";
  const headLines = wrap(post.headline.en, 20, 2);
  let y = 330;
  const head = headLines.map((l, i) => `<text x="${pad}" y="${y + i * 76}" font-size="64" font-weight="800" fill="#fff" font-family="${LATIN}">${esc(l)}</text>`).join('');
  y += (headLines.length - 1) * 76 + 30;
  // Urdu: anchored at the right margin; no SVG `direction` (it flips the anchor in librsvg), the
  // shaper handles the right-to-left run and bidiUr isolates any English terms.
  const urHead = `<text x="${w - pad}" y="${y + 52}" font-size="44" font-weight="700" fill="${BRAND.amber}" text-anchor="end" font-family="${URDU}">${esc(bidiUr(post.headline.ur))}</text>`;
  const top = y + 140;
  const bottom = h - 220;
  // With three items or fewer there is room for each one's Urdu line too.
  const withUr = post.highlights.length <= 3;
  const items = post.highlights.map((hl) => ({ hl, lines: wrap(hl.en, 34, 2), ur: withUr ? wrap(hl.ur, 44, 2) : null }));
  const itemH = (it) => it.lines.length * 50 + (it.ur ? it.ur.length * 58 + 8 : 0) + 40;
  const blockH = items.reduce((t, it) => t + itemH(it), 0) + (post.more ? 50 : 0);
  y = top + Math.max(0, Math.floor((bottom - top - blockH) / 2));
  const bullets = [];
  for (const it of items) {
    const d = ICON[it.hl.type] ?? ICON.feature;
    bullets.push(`<g transform="translate(${pad + 26} ${y - 14})"><circle r="26" fill="${BRAND.amber}"/><path d="${d}" fill="none" stroke="${BRAND.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></g>`);
    it.lines.forEach((l, i) => bullets.push(`<text x="${pad + 76}" y="${y + i * 50}" font-size="40" font-weight="${i ? 600 : 700}" fill="#fff" font-family="${LATIN}">${esc(l)}</text>`));
    (it.ur ?? []).forEach((u, i) => bullets.push(`<text x="${w - pad}" y="${y + it.lines.length * 50 + 22 + i * 58}" font-size="32" font-weight="400" fill="${BRAND.pale}" text-anchor="end" font-family="${URDU}">${esc(bidiUr(u))}</text>`));
    y += itemH(it);
  }
  if (post.more) { bullets.push(`<text x="${pad + 76}" y="${y}" font-size="36" font-weight="600" fill="${BRAND.pale}" font-family="${LATIN}">and ${post.more} more on the site</text>`); }
  const pillW = 600;
  const pill = `<g transform="translate(${pad} ${h - 168})"><rect width="${pillW}" height="88" rx="44" fill="${BRAND.amber}"/><text x="${pillW / 2}" y="57" font-size="34" font-weight="800" fill="${BRAND.teal}" text-anchor="middle" font-family="${LATIN}">Read free: textbook.com.pk</text></g>`;
  const lang = `<text x="${w - pad}" y="${h - 110}" font-size="34" font-weight="700" fill="${BRAND.pale}" text-anchor="end" font-family="${LATIN}">English &amp; <tspan font-family="${URDU}">اردو</tspan></text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<rect width="${w}" height="${h}" fill="${BRAND.teal}"/>
<rect width="${w}" height="14" fill="${BRAND.amber}"/>
<circle cx="${w + 40}" cy="${h - 260}" r="300" fill="#ffffff" fill-opacity="0.04"/>
<image x="${pad}" y="70" width="420" height="105" xlink:href="data:image/svg+xml;base64,${logo}" preserveAspectRatio="xMinYMid meet"/>
<text x="${pad}" y="232" font-size="30" font-weight="800" letter-spacing="3" fill="${BRAND.amber}" font-family="${LATIN}">${eyebrow}  ·  ${esc(dateLabel(post.date))}</text>
${head}${urHead}${bullets.join('')}${pill}${lang}
</svg>`;
}

/** Render the card to a JPEG (under 1 MB keeps every platform happy). */
export async function renderCard(post, file) {
  await sharp(Buffer.from(cardSvg(post))).jpeg({ quality: 88, mozjpeg: true }).toFile(file);
  return file;
}
