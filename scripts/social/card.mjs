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

const LINE_H = 50;   // one card line
const ITEM_PAD = 40; // space under each highlight
const UR_LINE_H = 58;
const PILL_TOP = CARD.h - 168;

/** The last y a bullet baseline may take: the address pill starts at PILL_TOP. */
const BOTTOM = PILL_TOP - 14;
// Full card: five highlights and the "and N more" line leave no slack, so the line pitch and the
// gap under each highlight close up instead of letting the last line run under the pill (2026-11-25).
const TIGHT_LINE_H = 42;
const TIGHT_PAD = 22;

/**
 * Height each highlight takes on the card, and the lines it is drawn as. The column is measured
 * against the address pill, and a tight card uses the tighter pitch: text is never cut or overlapped.
 */
export function layout(post) {
  const headLines = wrap(post.headline.en, 20, 2);
  const top = 330 + (headLines.length - 1) * 76 + 30 + 140;
  const withUr = post.highlights.length <= 3;
  const items = post.highlights.map((hl) => ({
    hl,
    lines: wrap(hl.card_en ?? hl.en, 34, 2),
    ur: withUr ? wrap(hl.card_ur ?? hl.ur, 44, 2) : null,
  }));
  const height = (it, lh, pad) => it.lines.length * lh + (it.ur ? it.ur.length * UR_LINE_H + 8 : 0) + pad;
  const need = (lh, pad) => items.reduce((t, it) => t + height(it, lh, pad), 0) + (post.more ? lh : 0);
  const tight = need(TIGHT_LINE_H, TIGHT_PAD) <= BOTTOM - top;
  const lh = tight ? TIGHT_LINE_H : LINE_H;
  const pad = tight ? TIGHT_PAD : ITEM_PAD;
  const blockH = need(lh, pad);
  const y = top + Math.max(0, Math.floor((BOTTOM - top - blockH) / 2));
  const rows = [];
  let yy = y;
  for (const it of items) {
    rows.push({ text: it.lines.at(-1), y: yy + (it.lines.length - 1) * lh });
    yy += height(it, lh, pad);
  }
  if (post.more) rows.push({ text: `and ${post.more} more on the site`, y: yy });
  return { items, blockH, top, rows, y, lh, pad };
}

/** Where the first highlight baseline starts. */
export const layoutStart = (post) => layout(post).y;

/** The card's SVG (exported for tests and previews). */
export function cardSvg(post) {
  const { w, h } = CARD;
  const pad = 72;
  const logo = readFileSync(join(ROOT, 'static/img/kit/horizontal-reverse.svg')).toString('base64');
  const eyebrow = post.kind === 'feature' ? 'PLATFORM UPDATE' : "WHAT'S NEW";
  const headLines = wrap(post.headline.en, 20, 2);
  const head = headLines.map((l, i) => `<text x="${pad}" y="${330 + i * 76}" font-size="64" font-weight="800" fill="#fff" font-family="${LATIN}">${esc(l)}</text>`).join('');
  // Urdu: anchored at the right margin; no SVG `direction` (it flips the anchor in librsvg), the
  // shaper handles the right-to-left run and bidiUr isolates any English terms.
  const urHead = `<text x="${w - pad}" y="${330 + (headLines.length - 1) * 76 + 30 + 52}" font-size="44" font-weight="700" fill="${BRAND.amber}" text-anchor="end" font-family="${URDU}">${esc(bidiUr(post.headline.ur))}</text>`;
  // A highlight may carry a short card line (`card_en`/`card_ur`) beside its fuller caption text
  // (`en`/`ur`): the card has room for about 68 characters, the caption for plain explanation.
  const { items, lh, pad: itemPad } = layout(post);
  const itemH = (it) => it.lines.length * lh + (it.ur ? it.ur.length * UR_LINE_H + 8 : 0) + itemPad;
  let y = layoutStart(post);
  const bullets = [];
  for (const it of items) {
    const d = ICON[it.hl.type] ?? ICON.feature;
    bullets.push(`<g transform="translate(${pad + 26} ${y - 14})"><circle r="26" fill="${BRAND.amber}"/><path d="${d}" fill="none" stroke="${BRAND.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></g>`);
    it.lines.forEach((l, i) => bullets.push(`<text x="${pad + 76}" y="${y + i * lh}" font-size="40" font-weight="${i ? 600 : 700}" fill="#fff" font-family="${LATIN}">${esc(l)}</text>`));
    (it.ur ?? []).forEach((u, i) => bullets.push(`<text x="${w - pad}" y="${y + it.lines.length * lh + 22 + i * UR_LINE_H}" font-size="32" font-weight="400" fill="${BRAND.pale}" text-anchor="end" font-family="${URDU}">${esc(bidiUr(u))}</text>`));
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
