/**
 * Meta AI image producer (spec 033 User Story 2; owner go 2026-11-28, D-2026-0102).
 *
 * meta.ai runs in the davinci workspace Chrome, signed in to the owner's Meta account, and this
 * producer drives it over Chrome DevTools through the media tunnel (127.0.0.1:18802 -> davinci 9222):
 * a new chat, the brief typed into the composer after a real click, Send, then the first new
 * full-size image is fetched by the page and saved. Lessons from the smoke test
 * (specs/033-meta-ai-producer/smoke-test.md): the composer is a contenteditable textbox (a hidden
 * textarea sits beside it), the Send button must be clicked, and the tab must be in front (Chrome does not
 * lay out a background tab, so every element measures 0 x 0).
 *
 * Only scripts/media/producers/image.mjs imports this file (ADR-0029 point 4: generate-illustration.mjs
 * stays the single entry point that calls an image service). Never import it from a content gate (FR-018).
 */
export const META_CDP_URL = process.env.META_CDP_URL || 'http://127.0.0.1:18802';
export const META_HOME = 'https://www.meta.ai/';
const WAIT_MS = 4 * 60 * 1000;

/**
 * What the page says, from its text and controls: `signed-out` (a sign-in wall or no composer),
 * `limited` (a usage or rate message) or `ok`.
 */
export function pageState({ text = '', hasComposer = false, loginControls = false }) {
  if (loginControls || /\b(log in|sign up) to (continue|use|create)/i.test(text)) return 'signed-out';
  if (/(reached|hit) (your|the) (daily |image )?limit|too many (requests|images)|try again (later|tomorrow)|limit for (today|now)/i.test(text)) return 'limited';
  if (!hasComposer) return 'signed-out';
  return 'ok';
}

/** The prompt for meta.ai: one image, the brief unchanged (the same brief every producer gets). */
export function metaPrompt(brief, aspect = '16:9 landscape') {
  return `Create one image, ${aspect}. ${brief.replace(/\s*\n\s*/g, ' ')}`;
}

/** Centre-crop box that brings `w` x `h` to the target ratio, or null when it is within 3 %. */
export function cropBox(w, h, aspect = '16:9 landscape') {
  const target = aspect.startsWith('3:4') ? 3 / 4 : 16 / 9;
  const ratio = w / h;
  if (Math.abs(ratio - target) / target <= 0.03) return null;
  if (ratio > target) { const nw = Math.round(h * target); return { left: Math.round((w - nw) / 2), top: 0, width: nw, height: h }; }
  const nh = Math.round(w / target);
  return { left: 0, top: Math.round((h - nh) / 2), width: w, height: nh };
}

/** One CDP session on the meta.ai tab (opened when missing). */
async function session(cdpUrl) {
  const list = await (await fetch(`${cdpUrl}/json/list`)).json();
  let tab = list.find((t) => t.type === 'page' && t.url.startsWith(META_HOME));
  if (!tab) tab = await (await fetch(`${cdpUrl}/json/new?${META_HOME}`, { method: 'PUT' })).json();
  const host = new URL(cdpUrl).host;
  const ws = new WebSocket(tab.webSocketDebuggerUrl.replace(/\/\/[^/]+/, `//${host}`));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => { const d = JSON.parse(m.data); const p = pending.get(d.id); if (p) { pending.delete(d.id); d.error ? p.reject(new Error(d.error.message)) : p.resolve(d.result); } };
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = () => reject(new Error('CDP websocket failed')); });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const i = ++id; pending.set(i, { resolve, reject }); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.value;
  const click = async ({ x, y }) => { for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 }); };
  return { send, evaluate, click, close: () => ws.close() };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const STATE_JS = `JSON.stringify({ text: document.body.innerText.slice(-3000), hasComposer: !!document.querySelector('[contenteditable=true][role=textbox]'),
  loginControls: [...document.querySelectorAll('a,button')].some((e) => /^(log in|sign up)$/i.test(e.innerText.trim())) })`;
const CENTRE = (sel) => `(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; })()`;

/**
 * Make one image. Errors are classified by the caller's classes (image.mjs passes QuotaError and
 * UnavailableError) so this module does not import image.mjs.
 */
export async function metaImage({ brief, png, aspect = '16:9 landscape', cdpUrl = META_CDP_URL, errors, waitMs = WAIT_MS }) {
  const { QuotaError, UnavailableError } = errors;
  let s;
  try { s = await session(cdpUrl); } catch (e) { throw new UnavailableError('meta', `meta.ai Chrome unreachable at ${cdpUrl}: ${e.message}`); }
  try {
    await s.send('Page.enable');
    // A background tab is not laid out (every box 0 x 0, empty innerText): bring it to the front.
    await s.send('Page.bringToFront');
    await s.send('Page.navigate', { url: META_HOME });
    let state = 'signed-out';
    for (let waited = 0; waited < 30000 && state === 'signed-out'; waited += 2000) {
      await sleep(2000);
      state = pageState(JSON.parse(await s.evaluate(STATE_JS)));
    }
    if (state === 'signed-out') throw new UnavailableError('meta', 'meta.ai is not signed in (sign in on the davinci desktop)');
    if (state === 'limited') throw new QuotaError('meta', 'meta.ai image limit reached');
    const before = new Set(await s.evaluate('[...document.images].map((i) => i.src)'));
    const box = await s.evaluate(CENTRE('[contenteditable=true][role=textbox]'));
    await s.click(box);
    await sleep(500);
    await s.send('Input.insertText', { text: metaPrompt(brief, aspect) });
    await sleep(1200);
    const send = await s.evaluate(CENTRE('[aria-label=Send]'));
    if (!send) throw new Error('meta.ai Send button not found');
    await s.click(send);
    const t0 = Date.now();
    let img = null;
    while (Date.now() - t0 < waitMs) {
      await sleep(6000);
      state = pageState(JSON.parse(await s.evaluate(STATE_JS)));
      if (state === 'limited') throw new QuotaError('meta', 'meta.ai image limit reached');
      const fresh = await s.evaluate(`[...document.images].filter((i) => i.naturalWidth >= 400).map((i) => ({ src: i.src, w: i.naturalWidth, h: i.naturalHeight }))`);
      const busy = await s.evaluate(`/Generating|Creating|Imagining/i.test(document.body.innerText)`);
      img = fresh.find((i) => !before.has(i.src)) ?? null;
      if (img && !busy) break;
    }
    if (!img) throw new Error(`meta.ai made no image within ${Math.round(waitMs / 1000)} s`);
    const b64 = await s.evaluate(`fetch(${JSON.stringify(img.src)}).then((r) => r.arrayBuffer()).then((b) => { let t = ''; const u = new Uint8Array(b); for (let i = 0; i < u.length; i += 32768) t += String.fromCharCode(...u.subarray(i, i + 32768)); return btoa(t); }).catch((e) => 'ERR ' + e)`);
    if (!b64 || b64.startsWith('ERR')) throw new Error(`meta.ai image download failed: ${String(b64).slice(0, 120)}`);
    const sharp = (await import('sharp')).default;
    const bytes = Buffer.from(b64, 'base64');
    const crop = cropBox(img.w, img.h, aspect);
    await (crop ? sharp(bytes).extract(crop) : sharp(bytes)).png().toFile(png);
    return { model: `Meta AI (meta.ai, ${img.w}x${img.h}${crop ? ', cropped' : ''})` };
  } finally {
    s.close();
  }
}

/** The workspace Chrome answers on the tunnel. */
export async function metaReachable(cdpUrl = META_CDP_URL) {
  try { const r = await fetch(`${cdpUrl}/json/version`, { signal: AbortSignal.timeout(3000) }); return r.ok; } catch { return false; }
}

// Kept for a manual check: node scripts/media/producers/meta.mjs state
if (process.argv[1]?.endsWith('meta.mjs') && process.argv[2] === 'state') {
  const s = await session(META_CDP_URL);
  console.log(pageState(JSON.parse(await s.evaluate(STATE_JS))));
  s.close();
}
