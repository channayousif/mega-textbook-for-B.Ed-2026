/**
 * Feature 032 phase C: a topic's flashcards in the Study Studio panel. The term is on the front,
 * the definition on the back (from the reviewed glossary, or an authored deck in
 * specs/studio/flashcards/). One card at a time; tap, Enter or Space flips; arrows move. Print
 * shows the whole deck as a list.
 */
import React, { useMemo, useState } from 'react';
import styles from './studio.module.css';

type Locale = 'en' | 'ur';
export type Card = { term: string; definition: string };
const T = {
  flip: { en: 'Show the meaning', ur: 'معنی دکھائیں' },
  back: { en: 'Show the term', ur: 'اصطلاح دکھائیں' },
  prev: { en: 'Previous', ur: 'پچھلا' },
  next: { en: 'Next', ur: 'اگلا' },
  shuffle: { en: 'Shuffle', ur: 'ترتیب بدلیں' },
  of: { en: (i: number, n: number) => `Card ${i} of ${n}`, ur: (i: number, n: number) => `کارڈ ${i} از ${n}` },
  hint: { en: 'Say the meaning to yourself, then turn the card.', ur: 'پہلے خود معنی بتائیں، پھر کارڈ پلٹیں۔' },
} as const;

export default function Flashcards({ cards, locale }: { cards: Card[]; locale: Locale }): React.ReactElement | null {
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = useMemo(() => cards[order[pos]], [cards, order, pos]);
  if (!cards.length || !card) return null;
  const go = (d: number) => { setPos((p) => (p + d + cards.length) % cards.length); setFlipped(false); };
  const shuffle = () => {
    const o = [...order];
    for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; }
    setOrder(o); setPos(0); setFlipped(false);
  };
  return (
    <div className={styles.flashcards} data-testid="flashcards">
      <p className={styles.note}>{T.hint[locale]}</p>
      <button type="button" className={`${styles.flashcard} ${flipped ? styles.flashcardBack : ''}`} aria-pressed={flipped}
        aria-label={flipped ? `${card.term}: ${card.definition}. ${T.back[locale]}` : `${card.term}. ${T.flip[locale]}`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') go(locale === 'ur' ? -1 : 1); if (e.key === 'ArrowLeft') go(locale === 'ur' ? 1 : -1); }}>
        {flipped
          ? <span><strong className={styles.flashTerm}>{card.term}</strong><span className={styles.flashDef}>{card.definition}</span></span>
          : <strong className={styles.flashTermFront}>{card.term}</strong>}
      </button>
      <div className={styles.flashNav}>
        <button type="button" className={styles.btn} onClick={() => go(-1)}>{T.prev[locale]}</button>
        <span aria-live="polite">{T.of[locale](pos + 1, cards.length)}</span>
        <button type="button" className={styles.btn} onClick={() => go(1)}>{T.next[locale]}</button>
        <button type="button" className={styles.btn} onClick={shuffle}>{T.shuffle[locale]}</button>
      </div>
      <dl className={styles.flashPrint}>
        {cards.map((c) => (<React.Fragment key={c.term}><dt>{c.term}</dt><dd>{c.definition}</dd></React.Fragment>))}
      </dl>
    </div>
  );
}
