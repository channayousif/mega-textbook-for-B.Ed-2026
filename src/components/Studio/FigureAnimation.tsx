/**
 * Feature 032: a "Watch it animate" button under a figure that has an approved animation. It
 * opens a dialog with the silent, captioned video; the youtube-nocookie frame loads only after
 * the reader asks, so a page makes no request to YouTube until then. Data comes from the
 * build-time `figureAnimations` index (docusaurus.config customFields), never from MDX props,
 * so placed figures and review-bound pages stay untouched.
 */
import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { figureBase, figureLang, type FigureAnimationIndex } from '@site/src/lib/figureAnimations';
import styles from './animation.module.css';

const T = {
  watch: { en: 'Watch it animate', ur: 'متحرک دیکھیں' },
  title: { en: 'Animated figure', ur: 'متحرک خاکہ' },
  close: { en: 'Close', ur: 'بند کریں' },
};

export function useFigureAnimation(src: string): { id: string; lang: 'en' | 'ur' } | null {
  const { siteConfig } = useDocusaurusContext();
  const index = (siteConfig.customFields?.figureAnimations ?? {}) as FigureAnimationIndex;
  const lang = figureLang(src);
  const id = index[figureBase(src)]?.[lang];
  return id ? { id, lang } : null;
}

export default function FigureAnimationButton({ src, alt }: { src: string; alt: string }): React.ReactElement | null {
  const anim = useFigureAnimation(src);
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  if (!anim) return null;
  const { id, lang } = anim;
  return (
    <>
      <button type="button" className={styles.watch} onClick={() => setOpen(true)} data-testid="figure-animate">
        <span aria-hidden="true" className={styles.play} /> {T.watch[lang]}
      </button>
      <dialog ref={ref} className={styles.dialog} onClose={() => setOpen(false)} onClick={(e) => { if (e.target === ref.current) setOpen(false); }} aria-label={`${T.title[lang]}: ${alt}`}>
        <div className={styles.body}>
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label={T.close[lang]}>✕</button>
          {open && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1&playsinline=1`}
              title={`${T.title[lang]}: ${alt}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              lang={lang}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
