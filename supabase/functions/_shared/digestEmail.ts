// Feature 028: the weekly new-content email, rendered as one bilingual message.
//
// Pure functions only (no Deno globals), so vitest imports this file directly.
// Layout rules for real mail clients: a 600px table, inline styles, a hosted PNG
// logo (Gmail strips SVG), no web fonts required, and a plain-text alternative.
// The Urdu half is its own dir="rtl" block with a Nastaliq-first font stack.

export type DigestEvent = {
  id: string;
  type: 'course' | 'unit' | 'urdu' | 'review';
  gate?: 'G3' | 'G5';
  date: string;
  course_code: string;
  unit_no: number | null;
  title_en: string;
  title_ur: string | null;
  course_title_en: string;
  course_title_ur: string | null;
  permalink: string;
};

export type DigestNews = {
  id: string;
  kind: 'news' | 'offer' | 'update' | 'event' | 'alert';
  title_en: string;
  title_ur: string | null;
  link_url: string | null;
};

export type DigestInput = {
  events: DigestEvent[];
  news: DigestNews[];
  siteUrl: string;
  weekLabel: string;
  unsubscribeUrl: string;
  profileUrl: string;
};

export type DigestEmail = { subject: string; html: string; text: string };

const TEAL = '#123e43';
const AMBER = '#e5a333';
const PAPER = '#f8f5ef';
const INK = '#123e43';
const MUTED = '#3b5154';
const URDU_FONTS = "'Noto Nastaliq Urdu','Jameel Noori Nastaleeq','Urdu Typesetting',Tahoma,serif";
/** Items shown per section; the rest become one "and N more" link to the site. */
export const MAX_PER_GROUP = 8;
const LATIN_FONTS = "Nunito,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

type Group = {
  key: string;
  emoji: string;
  en: string;
  ur: string;
  items: { titleEn: string; titleUr: string; context: string | null; href: string; hrefUr: string }[];
};

/** ISO-8601 week of a date, e.g. "2026-W45": the digest's idempotency key. */
export function isoWeek(date: Date): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function absolute(siteUrl: string, href: string, ur = false): string {
  if (/^https:\/\//.test(href)) return href;
  const base = siteUrl.replace(/\/$/, '');
  return `${base}${ur ? '/ur' : ''}${href.startsWith('/') ? href : `/${href}`}`;
}

function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}

export function groupDigest(input: Pick<DigestInput, 'events' | 'news' | 'siteUrl'>): Group[] {
  const { events, news, siteUrl } = input;
  const ev = (type: DigestEvent['type']) => events.filter((e) => e.type === type).map((e) => ({
    titleEn: type === 'review' ? `${e.title_en} (${e.gate} review)` : e.title_en,
    titleUr: e.title_ur || e.title_en,
    context: type === 'course' ? null : e.course_code,
    href: absolute(siteUrl, e.permalink),
    hrefUr: absolute(siteUrl, e.permalink, true),
  }));
  const groups: Group[] = [
    { key: 'course', emoji: '🎉', en: 'New courses', ur: 'نئے کورس', items: ev('course') },
    { key: 'unit', emoji: '📘', en: 'New units', ur: 'نئے یونٹ', items: ev('unit') },
    { key: 'urdu', emoji: '🌐', en: 'Now in Urdu', ur: 'اب اردو میں', items: ev('urdu') },
    { key: 'review', emoji: '✅', en: 'Reviewed units', ur: 'جائزہ مکمل یونٹ', items: ev('review') },
    {
      key: 'news', emoji: '📣', en: 'News and offers', ur: 'خبریں اور پیشکشیں',
      items: news.map((n) => ({
        titleEn: n.title_en,
        titleUr: n.title_ur || n.title_en,
        context: null,
        href: n.link_url ? absolute(siteUrl, n.link_url) : siteUrl,
        hrefUr: n.link_url ? absolute(siteUrl, n.link_url, !/^https:\/\//.test(n.link_url)) : `${siteUrl.replace(/\/$/, '')}/ur/`,
      })),
    },
  ];
  return groups.filter((g) => g.items.length > 0);
}

function summary(groups: Group[]): { en: string; ur: string } {
  const count = (k: string) => groups.find((g) => g.key === k)?.items.length ?? 0;
  const en: string[] = [];
  const ur: string[] = [];
  if (count('course')) { en.push(plural(count('course'), 'new course', 'new courses')); ur.push(`${count('course')} نئے کورس`); }
  if (count('unit')) { en.push(plural(count('unit'), 'new unit', 'new units')); ur.push(`${count('unit')} نئے یونٹ`); }
  if (count('urdu')) { en.push(plural(count('urdu'), 'Urdu translation', 'Urdu translations')); ur.push(`${count('urdu')} اردو ترجمے`); }
  if (count('review')) { en.push(plural(count('review'), 'reviewed unit', 'reviewed units')); ur.push(`${count('review')} جائزہ مکمل یونٹ`); }
  if (count('news')) { en.push(plural(count('news'), 'announcement', 'announcements')); ur.push(`${count('news')} اعلانات`); }
  return { en: en.join(', '), ur: ur.join('، ') };
}

function groupHtml(g: Group, ur: boolean, site: string): string {
  const extra = g.items.length - MAX_PER_GROUP;
  const rows = g.items.slice(0, MAX_PER_GROUP).map((it) => {
    const title = escapeHtml(ur ? it.titleUr : it.titleEn);
    const href = escapeHtml(ur ? it.hrefUr : it.href);
    const chip = it.context
      ? `<span style="display:inline-block;background:#e6f2f1;color:${TEAL};border-radius:999px;padding:2px 8px;font-size:12px;font-weight:700;font-family:${LATIN_FONTS};direction:ltr;unicode-bidi:isolate;">${escapeHtml(it.context)}</span>&nbsp;`
      : '';
    return `<tr><td style="padding:6px 0;border-bottom:1px solid #eee7da;">${chip}<a href="${href}" style="color:${TEAL};font-weight:700;text-decoration:none;">${title}</a></td></tr>`;
  }).join('') + (extra > 0
    ? `<tr><td style="padding:6px 0;"><a href="${escapeHtml(ur ? `${site}/ur/` : `${site}/`)}" style="color:${MUTED};">${ur ? `اور ${extra} مزید` : `and ${extra} more`}</a></td></tr>`
    : '');
  return `<tr><td style="padding:18px 0 4px;"><h2 style="margin:0;font-size:${ur ? 20 : 17}px;line-height:${ur ? 2.2 : 1.4};color:${INK};">${g.emoji} ${escapeHtml(ur ? g.ur : g.en)}</h2></td></tr>
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table></td></tr>`;
}

function button(href: string, label: string, ur: boolean): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 4px;"><tr><td style="background:${TEAL};border-radius:999px;">
<a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 26px;color:#ffffff;font-weight:800;text-decoration:none;font-family:${ur ? URDU_FONTS : LATIN_FONTS};${ur ? 'line-height:2;' : ''}">${escapeHtml(label)}</a></td></tr></table>`;
}

/** The week's email, or null when nothing is new (the caller then sends nothing). */
export function renderDigest(input: DigestInput): DigestEmail | null {
  const groups = groupDigest(input);
  if (groups.length === 0) return null;
  const site = input.siteUrl.replace(/\/$/, '');
  const sum = summary(groups);
  const subject = `This week on textbook.com.pk: ${sum.en} | اس ہفتے نیا مواد`;
  const preheader = `${sum.en}. ${sum.ur}`;

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:${PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAPER};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;font-family:${LATIN_FONTS};color:${INK};">
<tr><td style="background:${TEAL};padding:18px 24px;border-bottom:4px solid ${AMBER};">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="padding-right:12px;"><img src="${site}/img/kit/icon-192.png" width="44" height="44" alt="textbook.com.pk" style="display:block;border:0;border-radius:10px;"></td>
<td style="color:#ffffff;font-size:20px;font-weight:800;">textbook.com.pk<div style="font-size:13px;font-weight:600;color:#f8e3b8;">Weekly update | ${escapeHtml(input.weekLabel)}</div></td>
</tr></table></td></tr>
<tr><td style="padding:24px 24px 8px;" lang="en" dir="ltr">
<h1 style="margin:0 0 6px;font-size:24px;line-height:1.3;color:${INK};">New on textbook.com.pk this week</h1>
<p style="margin:0;color:${MUTED};font-size:15px;line-height:1.5;">${escapeHtml(sum.en)}.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:15px;line-height:1.5;">
${groups.map((g) => groupHtml(g, false, site)).join('\n')}
</table>
${button(`${site}/`, 'Continue learning', false)}
</td></tr>
<tr><td style="padding:0 24px;"><hr style="border:0;border-top:2px dashed #eee7da;margin:18px 0;"></td></tr>
<tr><td style="padding:0 24px 16px;font-family:${URDU_FONTS};text-align:right;" lang="ur" dir="rtl">
<h1 style="margin:0 0 6px;font-size:24px;line-height:2.3;color:${INK};">اس ہفتے textbook.com.pk پر نیا مواد</h1>
<p style="margin:0;color:${MUTED};font-size:16px;line-height:2.2;">${escapeHtml(sum.ur)}۔</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:16px;line-height:2.2;" dir="rtl">
${groups.map((g) => groupHtml(g, true, site)).join('\n')}
</table>
${button(`${site}/ur/`, 'پڑھائی جاری رکھیں', true)}
</td></tr>
<tr><td style="background:${PAPER};padding:18px 24px;color:${MUTED};font-size:12px;line-height:1.6;">
You are receiving this because you have an account at textbook.com.pk. One email a week, only when something new is published.<br>
<a href="${escapeHtml(input.unsubscribeUrl)}" style="color:${TEAL};">Unsubscribe</a> | <a href="${escapeHtml(input.profileUrl)}" style="color:${TEAL};">Email settings</a>
<div dir="rtl" lang="ur" style="font-family:${URDU_FONTS};line-height:2.2;margin-top:6px;">یہ ای میل آپ کو textbook.com.pk اکاؤنٹ کی وجہ سے ملی ہے۔ <a href="${escapeHtml(input.unsubscribeUrl)}" style="color:${TEAL};">ای میل بند کریں</a></div>
</td></tr>
</table></td></tr></table>
</body></html>`;

  const textGroups = (ur: boolean) => groups.map((g) => [
    `${g.emoji} ${ur ? g.ur : g.en}`,
    ...g.items.slice(0, MAX_PER_GROUP).map((it) => `- ${it.context ? `${it.context}: ` : ''}${ur ? it.titleUr : it.titleEn}\n  ${ur ? it.hrefUr : it.href}`),
    ...(g.items.length > MAX_PER_GROUP ? [ur ? `اور ${g.items.length - MAX_PER_GROUP} مزید: ${site}/ur/` : `and ${g.items.length - MAX_PER_GROUP} more: ${site}/`] : []),
  ].join('\n')).join('\n\n');

  const text = [
    `textbook.com.pk weekly update | ${input.weekLabel}`,
    '',
    `New this week: ${sum.en}.`,
    '',
    textGroups(false),
    '',
    `Continue learning: ${site}/`,
    '',
    '----',
    '',
    `اس ہفتے نیا مواد: ${sum.ur}۔`,
    '',
    textGroups(true),
    '',
    '----',
    `Unsubscribe: ${input.unsubscribeUrl}`,
    `Email settings: ${input.profileUrl}`,
  ].join('\n');

  return { subject, html, text };
}
