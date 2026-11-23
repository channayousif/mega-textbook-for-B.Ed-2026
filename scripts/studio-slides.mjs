// Feature 032 phase B: web slide decks from a unit outline (specs/studio/slides/<course>/unit-NN.json).
// renderDeck() returns one self-contained HTML page per language: a fixed 1920x1080 stage scaled to
// the viewport, arrow keys (reversed for Urdu), a counter, one slide per printed page, the site's
// palette and fonts. build-studio-index.mjs writes the decks to static/studio/slides/ at build time.
const BRAND = { teal: '#123e43', amber: '#e5a333', paper: '#f8f5ef', ink: '#132a24', pale: '#a6dfdc', muted: '#566b65' };
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const KINDS = ['section', 'points', 'figure', 'summary'];

/** Problems with an outline. Pure. */
export function validateOutline(o) {
  const errs = [];
  if (!o?.course || !o?.unit) errs.push('course and unit are required');
  for (const k of ['title', 'subtitle']) for (const l of ['en', 'ur']) if (!o?.[k]?.[l]) errs.push(`${k}.${l} missing`);
  if (!Array.isArray(o?.slides) || o.slides.length < 3 || o.slides.length > 30) errs.push('3 to 30 slides');
  (o?.slides ?? []).forEach((s, i) => {
    const at = `slide ${i + 1}`;
    if (!KINDS.includes(s.kind)) errs.push(`${at}: kind must be one of ${KINDS.join(', ')}`);
    for (const l of ['en', 'ur']) {
      if (!s.title?.[l]) errs.push(`${at}: title.${l} missing`);
      if ((s.title?.[l] ?? '').length > 70) errs.push(`${at}: title.${l} over 70 characters`);
      if (s.kind === 'points' || s.kind === 'summary') {
        const p = s.points?.[l];
        if (!Array.isArray(p) || p.length < 1 || p.length > 5) errs.push(`${at}: 1 to 5 points in ${l}`);
        else p.forEach((x, j) => { if (x.length > 110) errs.push(`${at}: point ${j + 1} (${l}) over 110 characters`); });
      }
      if (s.kind === 'figure' && !s.caption?.[l]) errs.push(`${at}: caption.${l} missing`);
    }
    if ((s.kind === 'points' || s.kind === 'summary') && s.points?.en?.length !== s.points?.ur?.length) errs.push(`${at}: en and ur point counts differ`);
    if (s.kind === 'figure' && !/^\/img\/figures\/[a-z0-9-]+\/unit-\d{2}\/fig-[A-Za-z0-9-]+$/.test(s.figure ?? '')) errs.push(`${at}: figure must be a figure base path`);
  });
  if (/[—―⸺⸻]/.test(JSON.stringify(o))) errs.push('long dash');
  return errs;
}

function slideHtml(s, lang, i, total) {
  const rtl = lang === 'ur';
  const t = esc(s.title[lang]);
  const foot = `<footer><span>textbook.com.pk</span><span dir="ltr">${i + 1} / ${total}</span></footer>`;
  if (s.kind === 'section') return `<section class="slide section" data-i="${i}"><p class="eyebrow">${rtl ? 'موضوع' : 'Topic'} ${esc(s.topic ?? '')}</p><h2>${t}</h2>${foot}</section>`;
  if (s.kind === 'figure') {
    const src = `${s.figure}${rtl ? '.ur' : ''}.svg`;
    return `<section class="slide figure" data-i="${i}"><h2>${t}</h2><img src="${esc(src)}" alt="${esc(s.caption[lang])}"><p class="caption">${esc(s.caption[lang])}</p>${foot}</section>`;
  }
  const items = s.points[lang].map((p) => `<li>${esc(p)}</li>`).join('');
  return `<section class="slide ${s.kind}" data-i="${i}"><h2>${t}</h2><ul>${items}</ul>${foot}</section>`;
}

/** One self-contained HTML deck. Pure. */
export function renderDeck(o, lang = 'en') {
  const rtl = lang === 'ur';
  const font = rtl ? "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif" : "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
  const titleSlide = `<section class="slide title" data-i="0"><p class="eyebrow">${esc(o.subtitle[lang])}</p><h1>${esc(o.title[lang])}</h1><p class="brand">textbook.com.pk</p></section>`;
  const total = o.slides.length + 1;
  const body = [titleSlide, ...o.slides.map((s, i) => slideHtml(s, lang, i + 1, total))].join('\n');
  return `<!doctype html>
<html lang="${lang}" dir="${rtl ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title[lang])} | ${esc(o.course)} ${rtl ? 'یونٹ' : 'Unit'} ${o.unit}</title>
<style>
@font-face { font-family: 'Noto Nastaliq Urdu'; src: url('/fonts/NotoNastaliqUrdu-Regular.woff2') format('woff2'); font-display: swap; }
html, body { margin: 0; height: 100%; background: #0d2a2e; font-family: ${font}; }
.viewport { position: fixed; inset: 0; overflow: hidden; }
.stage { position: absolute; left: 50%; top: 50%; width: 1920px; height: 1080px; transform-origin: center center; transform: translate(-50%, -50%); }
.slide { position: absolute; inset: 0; box-sizing: border-box; padding: 110px 140px 120px; background: ${BRAND.paper}; color: ${BRAND.ink};
  visibility: hidden; opacity: 0; display: flex; flex-direction: column; justify-content: center; }
.slide.active { visibility: visible; opacity: 1; }
.slide::before { content: ''; position: absolute; inset: 0 0 auto 0; height: 14px; background: ${BRAND.amber}; }
h1 { font-size: 104px; line-height: ${rtl ? 2 : 1.1}; margin: 0 0 30px; color: ${BRAND.teal}; }
h2 { font-size: 68px; line-height: ${rtl ? 2.1 : 1.15}; margin: 0 0 48px; color: ${BRAND.teal}; }
.eyebrow { font-size: 34px; letter-spacing: ${rtl ? 0 : '0.06em'}; text-transform: ${rtl ? 'none' : 'uppercase'}; color: ${BRAND.muted}; margin: 0 0 24px; font-weight: 600; }
.title { background: ${BRAND.teal}; color: #fff; }
.title h1 { color: #fff; } .title .eyebrow { color: ${BRAND.pale}; }
.brand { font: 600 34px system-ui, sans-serif; color: ${BRAND.amber}; margin-top: 60px; }
.section { background: ${BRAND.teal}; } .section h2 { color: #fff; font-size: 84px; } .section .eyebrow { color: ${BRAND.amber}; }
ul { margin: 0; padding-inline-start: 0; list-style: none; display: grid; gap: ${rtl ? 26 : 34}px; }
li { font-size: ${rtl ? 46 : 50}px; line-height: ${rtl ? 2 : 1.3}; padding-inline-start: 64px; position: relative; }
li::before { content: ''; position: absolute; inset-inline-start: 0; top: ${rtl ? '0.95em' : '0.45em'}; width: 26px; height: 26px; border-radius: 50%; background: ${BRAND.amber}; }
.summary { background: #eaf4f1; }
.figure img { display: block; margin: 0 auto; max-height: 640px; max-width: 100%; background: #fff; border-radius: 16px; box-shadow: 0 10px 40px rgba(18,62,67,.14); }
.caption { font-size: ${rtl ? 36 : 36}px; line-height: ${rtl ? 2 : 1.35}; color: ${BRAND.muted}; text-align: center; margin: 28px 0 0; }
footer { position: absolute; inset: auto 140px 44px 140px; display: flex; justify-content: space-between; font: 600 26px system-ui, sans-serif; color: ${BRAND.muted}; }
.section footer, .title footer { color: ${BRAND.pale}; }
.nav { position: fixed; inset: auto 0 12px 0; display: flex; justify-content: center; gap: 10px; z-index: 2; }
.nav button { font: 600 15px system-ui, sans-serif; padding: 8px 14px; border-radius: 999px; border: 0; background: rgba(255,255,255,.88); color: ${BRAND.teal}; cursor: pointer; }
.nav button:focus-visible { outline: 3px solid ${BRAND.amber}; }
@media (prefers-reduced-motion: no-preference) { .slide { transition: opacity .25s ease; } }
@media print {
  @page { size: 1920px 1080px; margin: 0; }
  html, body { background: #fff; height: auto; }
  .viewport { position: static; display: block; } .stage { position: static; transform: none !important; width: auto; height: auto; }
  .slide { position: relative; visibility: visible; opacity: 1; width: 1920px; height: 1080px; break-after: page; }
  .nav { display: none; }
}
</style>
</head>
<body>
<div class="viewport"><main class="stage" id="stage" aria-live="polite">
${body}
</main></div>
<nav class="nav" aria-label="${rtl ? 'سلائیڈ' : 'Slides'}">
<button type="button" id="prev">${rtl ? 'پچھلی' : 'Previous'}</button>
<button type="button" id="next">${rtl ? 'اگلی' : 'Next'}</button>
<button type="button" id="full">${rtl ? 'پوری اسکرین' : 'Full screen'}</button>
</nav>
<script>
(function () {
  var slides = [].slice.call(document.querySelectorAll('.slide'));
  var stage = document.getElementById('stage');
  var rtl = document.documentElement.dir === 'rtl';
  var i = Math.max(0, Math.min(slides.length - 1, (parseInt(location.hash.slice(1), 10) || 1) - 1));
  function fit() { var s = Math.min(innerWidth / 1920, (innerHeight - 56) / 1080); stage.style.transform = 'translate(-50%, -50%) translateY(-24px) scale(' + s + ')'; }
  function show(n) { i = Math.max(0, Math.min(slides.length - 1, n)); slides.forEach(function (el, k) { el.classList.toggle('active', k === i); el.setAttribute('aria-hidden', k === i ? 'false' : 'true'); }); history.replaceState(null, '', '#' + (i + 1)); }
  addEventListener('resize', fit); fit(); show(i);
  addEventListener('keydown', function (e) {
    var fwd = rtl ? 'ArrowLeft' : 'ArrowRight', back = rtl ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === fwd || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); show(i + 1); }
    else if (e.key === back || e.key === 'PageUp') { e.preventDefault(); show(i - 1); }
    else if (e.key === 'Home') show(0); else if (e.key === 'End') show(slides.length - 1);
  });
  document.getElementById('next').onclick = function () { show(i + 1); };
  document.getElementById('prev').onclick = function () { show(i - 1); };
  document.getElementById('full').onclick = function () { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); };
})();
</script>
</body>
</html>
`;
}
