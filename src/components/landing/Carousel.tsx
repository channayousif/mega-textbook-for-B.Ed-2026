/**
 * Feature 034 T016 (#803): a horizontal card carousel for the landing page ("Learning aids" and
 * "Features"). The track is a native scroll-snap row, so swipe, trackpad and no-JavaScript reading
 * all work without code; the previous/next buttons and arrow keys only add convenience. Buttons
 * render after hydration, scroll by one visible page, respect reduced motion, and follow RTL.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Icon from '@site/src/components/icons/Icon';
import s from './carousel.module.css';

type Locale = 'en' | 'ur';
const T = {
  prev: { en: 'Previous', ur: 'پچھلا' },
  next: { en: 'Next', ur: 'اگلا' },
  role: { en: 'carousel', ur: 'کیروسل' },
} as const;

type Props = { label: string; locale: Locale; children: React.ReactNode; className?: string; itemClassName?: string };

export default function Carousel({ label, locale, children, className, itemClassName }: Props): React.ReactElement {
  const track = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const rtl = locale === 'ur';

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft); // negative in RTL
    // .track's 4px inline padding (carousel.module.css) makes the first mandatory-snap
    // position scrollLeft = 4 (RTL -4), not 0; a 2px tolerance read that as "scrolled"
    // and enabled Previous on the first slide.
    setAtStart(pos <= 8);
    setAtEnd(pos >= max - 8);
  }, []);

  useEffect(() => {
    setReady(true);
    const el = track.current;
    if (!el) return undefined;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [update]);

  const go = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * (rtl ? -1 : 1) * el.clientWidth * 0.9, behavior: reduce ? 'auto' : 'smooth' });
  }, [rtl]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const forward = e.key === (rtl ? 'ArrowLeft' : 'ArrowRight');
    go(forward ? 1 : -1);
  };

  return (
    <div className={clsx(s.carousel, className)} role="region" aria-roledescription={T.role[locale]} aria-label={label}>
      <div ref={track} className={s.track} tabIndex={0} onKeyDown={onKey}>
        {React.Children.map(children, (child) => <div className={clsx(s.item, itemClassName)}>{child}</div>)}
      </div>
      {ready && !(atStart && atEnd) && (
        <div className={s.controls}>
          <button type="button" className={s.btn} onClick={() => go(-1)} disabled={atStart} aria-label={T.prev[locale]}>
            <Icon name="chevron" size={22} accent={false} className={rtl ? s.pointRight : s.pointLeft} />
          </button>
          <button type="button" className={s.btn} onClick={() => go(1)} disabled={atEnd} aria-label={T.next[locale]}>
            <Icon name="chevron" size={22} accent={false} className={rtl ? s.pointLeft : s.pointRight} />
          </button>
        </div>
      )}
    </div>
  );
}
