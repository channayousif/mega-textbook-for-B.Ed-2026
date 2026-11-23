/**
 * Feature 032: animated versions of placed figures (D-2026-0097).
 *
 * The ledger `specs/studio/animations/placed.json` lists each rendered animation the owner has
 * approved and the YouTube video it lives in. Only public or unlisted videos reach the site (a
 * private video cannot play in an embed). The index is keyed by the figure's base path, so the
 * English page (`fig.svg`), its dark twin and the Urdu page (`fig.ur.svg`) find their own video.
 */
export type AnimationEntry = {
  figure: string; // e.g. /img/figures/efmp-301/unit-04/fig-U4-3
  lang: 'en' | 'ur';
  format: '16x9' | '9x16';
  youtube_id: string;
  status: 'private' | 'unlisted' | 'public';
};
export type FigureAnimationIndex = Record<string, Partial<Record<'en' | 'ur', string>>>;

const ID = /^[A-Za-z0-9_-]{11}$/;

/** Base path of a figure src: drops `.dark`, `.ur` and the extension. */
export function figureBase(src: string): string {
  return src.replace(/\.(svg|webp|png|jpe?g)$/i, '').replace(/\.dark$/, '').replace(/\.ur$/, '');
}

export function figureLang(src: string): 'en' | 'ur' {
  return /\.ur(\.dark)?\.[a-z]+$/i.test(src) ? 'ur' : 'en';
}

export function buildFigureAnimationIndex(ledger: { animations?: AnimationEntry[] } | null | undefined): FigureAnimationIndex {
  const out: FigureAnimationIndex = {};
  for (const a of ledger?.animations ?? []) {
    if (a.format !== '16x9' || (a.status !== 'public' && a.status !== 'unlisted')) continue;
    if (!ID.test(a.youtube_id) || !a.figure.startsWith('/img/figures/') || (a.lang !== 'en' && a.lang !== 'ur')) continue;
    (out[figureBase(a.figure)] ??= {})[a.lang] = a.youtube_id;
  }
  return out;
}
