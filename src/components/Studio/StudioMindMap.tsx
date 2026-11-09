/**
 * Mind map with a recall mode (Feature 029, owner-agreed use 2026-11-09).
 *
 *  - Explore: a collapsible outline of the topic (first two levels open), an advance organiser.
 *  - Recall: every branch below the top level is hidden. The student says what is under a branch,
 *    taps it to reveal, then ticks "I remembered" if they got it. The score is retrieval practice
 *    and holds no answer key - the map is the topic itself.
 * Ticks are a per-reader convenience kept in localStorage (wrapped in try/catch; private windows
 * simply start fresh).
 */
import React, { useEffect, useMemo, useState } from 'react';
import styles from './studio.module.css';

type Node = { label: string; children: Node[] };

const L = {
  explore: { en: 'Explore', ur: 'دیکھیں' },
  recall: { en: 'Recall', ur: 'یاد کریں' },
  help: {
    en: 'Recall mode hides the branches. Say what is under each one, tap to check, and tick it if you remembered.',
    ur: 'Recall mode میں شاخیں چھپ جاتی ہیں۔ ہر شاخ کے نیچے کیا ہے، پہلے خود بتائیں، پھر tap کر کے دیکھیں اور یاد ہو تو tick کریں۔',
  },
  hidden: { en: 'Tap to reveal', ur: 'دیکھنے کے لیے tap کریں' },
  got: { en: 'I remembered', ur: 'مجھے یاد تھا' },
  score: { en: 'remembered', ur: 'یاد تھے' },
  reset: { en: 'Start again', ur: 'دوبارہ شروع کریں' },
} as const;

const paths = (n: Node, p = '0', out: string[] = []): string[] => {
  n.children.forEach((c, i) => { const cp = `${p}.${i}`; out.push(cp); paths(c, cp, out); });
  return out;
};

function load(key: string): Set<string> {
  try { return new Set(JSON.parse(window.localStorage.getItem(key) ?? '[]') as string[]); } catch { return new Set(); }
}
function save(key: string, s: Set<string>) {
  try { window.localStorage.setItem(key, JSON.stringify([...s])); } catch { /* storage unavailable: keep in memory */ }
}

export default function StudioMindMap({ tree, locale, storageKey }: { tree: Node; locale: 'en' | 'ur'; storageKey: string }): React.ReactElement {
  const [mode, setMode] = useState<'explore' | 'recall'>('explore');
  const [open, setOpen] = useState<Set<string>>(() => new Set(['0', ...tree.children.map((_, i) => `0.${i}`)]));
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [got, setGot] = useState<Set<string>>(new Set());
  const recallable = useMemo(() => paths(tree).filter((p) => p.split('.').length > 2), [tree]);

  useEffect(() => { setGot(load(storageKey)); }, [storageKey]);

  const toggle = (set: Set<string>, id: string) => { const n = new Set(set); if (n.has(id)) n.delete(id); else n.add(id); return n; };
  const tick = (id: string) => setGot((g) => { const n = toggle(g, id); save(storageKey, n); return n; });

  const render = (n: Node, id: string, depth: number): React.ReactElement => {
    const hasKids = n.children.length > 0;
    const isOpen = open.has(id);
    const hiddenInRecall = mode === 'recall' && depth >= 2 && !revealed.has(id);
    return (
      <li key={id} className={depth === 0 ? styles.root : undefined}>
        <div className={styles.node}>
          {hiddenInRecall ? (
            <button type="button" onClick={() => setRevealed((r) => toggle(r, id))}>
              <span className={styles.caret} aria-hidden="true">?</span>
              <span className={styles.hidden}>{L.hidden[locale]}</span>
            </button>
          ) : (
            <button type="button" aria-expanded={hasKids ? isOpen : undefined} onClick={() => hasKids && setOpen((o) => toggle(o, id))}>
              <span className={styles.caret} aria-hidden="true">{hasKids ? (isOpen ? '−' : '+') : '•'}</span>
              <span>{n.label}</span>
            </button>
          )}
          {mode === 'recall' && depth >= 2 && revealed.has(id) && (
            <label className={styles.tick}>
              <input type="checkbox" checked={got.has(id)} onChange={() => tick(id)} /> {L.got[locale]}
            </label>
          )}
        </div>
        {hasKids && (isOpen || mode === 'recall') && (
          <ul>{n.children.map((c, i) => render(c, `${id}.${i}`, depth + 1))}</ul>
        )}
      </li>
    );
  };

  const remembered = recallable.filter((p) => got.has(p)).length;
  return (
    <div lang={locale} dir={locale === 'ur' ? 'rtl' : 'ltr'} style={{ display: 'grid', gap: '0.6rem' }}>
      <div className={styles.mapBar} role="group" aria-label="Mind map mode">
        <button type="button" className={styles.btn} aria-pressed={mode === 'explore'} onClick={() => setMode('explore')}>{L.explore[locale]}</button>
        <button type="button" className={styles.btn} aria-pressed={mode === 'recall'} onClick={() => { setMode('recall'); setRevealed(new Set()); }}>{L.recall[locale]}</button>
        {mode === 'recall' && (
          <>
            <span className={styles.score} aria-live="polite">{remembered}/{recallable.length} {L.score[locale]}</span>
            <button type="button" className={styles.btn} onClick={() => { setRevealed(new Set()); setGot(new Set()); save(storageKey, new Set()); }}>{L.reset[locale]}</button>
          </>
        )}
      </div>
      {mode === 'recall' && <p className={styles.note}>{L.help[locale]}</p>}
      <ul className={styles.tree}>{render(tree, '0', 0)}</ul>
    </div>
  );
}
