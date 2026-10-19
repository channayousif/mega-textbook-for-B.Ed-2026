/**
 * Print / "Save as PDF" for textbook pages.
 *
 * Images. Figures use `loading="lazy"`, so anything below the fold, and the light
 * copy a dark-mode reader never saw, has not been fetched when the print snapshot
 * is taken: the PDF showed empty figure boxes. Switching to eager inside
 * `beforeprint` is not enough, because the browser takes the snapshot without
 * waiting for those fetches. So the print paths we control (the PrintHandout
 * button and Ctrl/Cmd+P) load the images first and only then open the dialog.
 *
 * Links. A link cannot be clicked on paper, so each one that leads somewhere else
 * (another site or another textbook page) gets a QR code printed beside it. The
 * codes exist only while printing: added before the dialog, removed after, so the
 * React-rendered page is left as it was.
 *
 * Title. The browser prints `document.title` at the top of every page; while
 * printing it reads "subject | unit | topic", taken from the breadcrumbs.
 */

const IMAGE_TIMEOUT_MS = 10000;
const QR_QUIET_ZONE = 4; // modules of white border a scanner needs
const SVG_NS = 'http://www.w3.org/2000/svg';
const MAX_URL_CHARS = 70;

/** Starts fetching every lazy image on the page; resolves when all have loaded or failed. */
export function loadImagesForPrint(timeoutMs = IMAGE_TIMEOUT_MS): Promise<void> {
  const pending = Array.from(document.images)
    .map((img) => {
      if (img.loading === 'lazy') img.loading = 'eager';
      if (img.complete) return null;
      return new Promise<void>((resolve) => {
        img.addEventListener('load', () => resolve(), { once: true });
        img.addEventListener('error', () => resolve(), { once: true });
      });
    })
    .filter((p): p is Promise<void> => p !== null);
  if (!pending.length) return Promise.resolve();
  // A slow or stalled image must not block printing forever.
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, timeoutMs));
  return Promise.race([Promise.all(pending).then(() => undefined), timeout]);
}

// ---------------------------------------------------------------- title

/**
 * "subject | unit | topic" from the breadcrumb labels, or null when there is
 * nothing to say. The first labelled crumb is the semester or track, a grouping
 * rather than part of the address, so it is left out.
 */
export function printTitle(crumbs: string[]): string | null {
  const parts = crumbs.map((c) => c.trim()).filter(Boolean).slice(1);
  return parts.length ? parts.join(' | ') : null;
}

let savedTitle: string | null = null;

/** Puts the print title in place of the page title until restorePageTitle(). */
export function setPrintTitle(): void {
  if (savedTitle !== null) return;
  const crumbs = Array.from(document.querySelectorAll('.theme-doc-breadcrumbs .breadcrumbs__item'))
    .map((li) => li.textContent ?? '');
  const title = printTitle(crumbs);
  if (!title) return;
  savedTitle = document.title;
  document.title = title;
}

export function restorePageTitle(): void {
  if (savedTitle === null) return;
  document.title = savedTitle;
  savedTitle = null;
}

// ---------------------------------------------------------------- link QR codes

/**
 * The absolute URL a printed link should carry, or null when a QR code would mean
 * nothing on paper: in-page anchors, the page itself, and non-web schemes.
 */
export function printableLinkUrl(href: string | null, pageUrl: string): string | null {
  if (!href || href.startsWith('#')) return null;
  let url: URL;
  try {
    url = new URL(href, pageUrl);
  } catch {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
  const here = new URL(pageUrl);
  const path = (u: URL) => u.pathname.replace(/\/$/, '');
  if (url.origin === here.origin && path(url) === path(here)) return null;
  return url.href;
}

/** The URL as printed under its QR code: no scheme or "www.", shortened when long. */
export function shortUrl(url: string): string {
  const s = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  return s.length > MAX_URL_CHARS ? `${s.slice(0, MAX_URL_CHARS - 3)}...` : s;
}

type QrCode = {
  addData(data: string): void;
  make(): void;
  getModuleCount(): number;
  isDark(row: number, col: number): boolean;
};
type QrFactory = (typeNumber: 0, errorCorrectionLevel: 'M') => QrCode;

// Loaded on first print only, so the encoder never weighs on a normal page view.
let qrFactory: QrFactory | null = null;
async function loadQrFactory(): Promise<QrFactory> {
  if (!qrFactory) qrFactory = (await import('qrcode-generator')).default as unknown as QrFactory;
  return qrFactory;
}

function qrSvg(factory: QrFactory, url: string): SVGSVGElement {
  const qr = factory(0, 'M');
  qr.addData(url);
  qr.make();
  const n = qr.getModuleCount();
  const size = n + 2 * QR_QUIET_ZONE;
  let d = '';
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (qr.isDark(row, col)) d += `M${col + QR_QUIET_ZONE} ${row + QR_QUIET_ZONE}h1v1h-1z`;
    }
  }
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('shape-rendering', 'crispEdges');
  const ground = document.createElementNS(SVG_NS, 'rect');
  ground.setAttribute('width', String(size));
  ground.setAttribute('height', String(size));
  ground.setAttribute('fill', '#fff');
  const modules = document.createElementNS(SVG_NS, 'path');
  modules.setAttribute('d', d);
  modules.setAttribute('fill', '#000');
  svg.append(ground, modules);
  return svg;
}

function qrTargets(): Array<[HTMLAnchorElement, string]> {
  const out: Array<[HTMLAnchorElement, string]> = [];
  document.querySelectorAll<HTMLAnchorElement>('article .markdown a[href]').forEach((a) => {
    if (a.classList.contains('hash-link') || a.closest('nav, .print-hidden, .print-qr')) return;
    if (a.nextElementSibling?.classList.contains('print-qr')) return;
    const url = printableLinkUrl(a.getAttribute('href'), window.location.href);
    if (url) out.push([a, url]);
  });
  return out;
}

function insertQrCodes(factory: QrFactory): void {
  for (const [a, url] of qrTargets()) {
    const box = document.createElement('span');
    box.className = 'print-qr';
    box.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.className = 'print-qr__url';
    label.dir = 'ltr';
    label.textContent = shortUrl(url);
    box.append(qrSvg(factory, url), label);
    a.after(box);
  }
}

/** Prints a QR code beside every link that leads off the page. */
export async function addLinkQrCodes(): Promise<void> {
  if (!qrTargets().length) return;
  insertQrCodes(await loadQrFactory());
}

/**
 * For `beforeprint`, which cannot wait: adds the codes at once when the encoder
 * is already loaded, otherwise starts loading it (best effort for the browser's
 * own print menu).
 */
export function addLinkQrCodesNow(): void {
  if (qrFactory) insertQrCodes(qrFactory);
  else void addLinkQrCodes();
}

export function removeLinkQrCodes(): void {
  document.querySelectorAll('.print-qr').forEach((el) => el.remove());
}

// ---------------------------------------------------------------- print

/** Adds the link QR codes, loads every image, then opens the browser's print dialog. */
export async function printHandout(): Promise<void> {
  await addLinkQrCodes();
  await loadImagesForPrint();
  window.print();
}
