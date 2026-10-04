import React, { useEffect, useState } from 'react';

/**
 * Reading tools for doc pages (UX refresh, 2026-10-04), modelled on the TU Delft
 * interactive textbooks: a reading-time chip, text size, a dyslexia-friendly font,
 * high contrast, a reading-progress bar, and private "write your answer" notes on
 * the "Check your understanding" questions that src/rehype/topic-enhance.mjs marks
 * up as `ol.check-list`.
 *
 * Everything is per-reader and stays in this browser's localStorage. Nothing is sent
 * to Supabase, so there is no new table, RLS policy or privacy notice to change.
 * Preferences are applied as attributes on <html>, styled in src/css/custom.css.
 */

type Locale = 'en' | 'ur';
type Prefs = { size: 0 | 1 | 2; dyslexic: boolean; contrast: boolean };

const PREFS_KEY = 'reading-prefs';
const DEFAULT_PREFS: Prefs = { size: 0, dyslexic: false, contrast: false };

const T = {
  minutes: { en: (n: number) => `${n} min read`, ur: (n: number) => `${n} منٹ کا مطالعہ` },
  toolbar: { en: 'Reading options', ur: 'مطالعے کے اختیارات' },
  smaller: { en: 'Smaller text', ur: 'چھوٹا متن' },
  larger: { en: 'Larger text', ur: 'بڑا متن' },
  dyslexic: { en: 'Dyslexia-friendly font', ur: 'ڈسلیکسیا کے لیے موزوں فونٹ' },
  contrast: { en: 'High contrast', ur: 'زیادہ تضاد' },
  progress: { en: 'Reading progress', ur: 'مطالعے کی پیش رفت' },
  note: { en: 'Write your answer', ur: 'اپنا جواب لکھیں' },
  notePlaceholder: {
    en: 'Your answer is saved only on this device.',
    ur: 'آپ کا جواب صرف اسی آلے پر محفوظ ہوتا ہے۔',
  },
  noteSaved: { en: 'Saved on this device', ur: 'اس آلے پر محفوظ ہے' },
};

function readJson<V>(key: string, fallback: V): V {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: string): void {
  try {
    if (value) window.localStorage.setItem(key, value);
    else window.localStorage.removeItem(key);
  } catch {
    // Storage blocked (private window, quota): the control still works for this visit.
  }
}

function applyPrefs(p: Prefs): void {
  const html = document.documentElement;
  html.setAttribute('data-text-size', String(p.size));
  html.toggleAttribute('data-dyslexic-font', p.dyslexic);
  html.toggleAttribute('data-high-contrast', p.contrast);
}

/** Toolbar shown above every doc page: reading time plus reader preferences. */
export function ReadingToolbar({ minutes, locale }: { minutes: number | null; locale: Locale }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  useEffect(() => {
    const stored = readJson(PREFS_KEY, DEFAULT_PREFS);
    setPrefs(stored);
    applyPrefs(stored);
  }, []);

  const update = (next: Prefs) => {
    setPrefs(next);
    applyPrefs(next);
    write(PREFS_KEY, JSON.stringify(next));
  };

  return (
    <div className="reading-toolbar print-hidden" role="toolbar" aria-label={T.toolbar[locale]}>
      {minutes ? <span className="reading-toolbar__time">{T.minutes[locale](minutes)}</span> : null}
      <span className="reading-toolbar__controls">
        <button
          type="button"
          className="reading-toolbar__btn"
          aria-label={T.smaller[locale]}
          title={T.smaller[locale]}
          disabled={prefs.size === 0}
          onClick={() => update({ ...prefs, size: (prefs.size - 1) as Prefs['size'] })}>
          A−
        </button>
        <button
          type="button"
          className="reading-toolbar__btn"
          aria-label={T.larger[locale]}
          title={T.larger[locale]}
          disabled={prefs.size === 2}
          onClick={() => update({ ...prefs, size: (prefs.size + 1) as Prefs['size'] })}>
          A+
        </button>
        <button
          type="button"
          className="reading-toolbar__btn"
          aria-pressed={prefs.dyslexic}
          title={T.dyslexic[locale]}
          onClick={() => update({ ...prefs, dyslexic: !prefs.dyslexic })}>
          {T.dyslexic[locale]}
        </button>
        <button
          type="button"
          className="reading-toolbar__btn"
          aria-pressed={prefs.contrast}
          title={T.contrast[locale]}
          onClick={() => update({ ...prefs, contrast: !prefs.contrast })}>
          {T.contrast[locale]}
        </button>
      </span>
    </div>
  );
}

/** Thin bar under the navbar showing how far through the article the reader is. */
export function ReadingProgress({ locale }: { locale: Locale }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const article = document.querySelector<HTMLElement>('.theme-doc-markdown');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const done = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      setPct(Math.round(done * 100));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="reading-progress print-hidden"
      role="progressbar"
      aria-label={T.progress[locale]}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}>
      <div className="reading-progress__bar" style={{ transform: `scaleX(${pct / 100})` }} />
    </div>
  );
}

/**
 * Adds a collapsible private note box under each "Check your understanding" question.
 * A vanilla-DOM pass over rendered MDX, the same approach DocItem/Content uses for the
 * self-assessment checklist, so no topic file changes. Notes are keyed by page path and
 * question position.
 */
export function useAnswerNotes(locale: Locale, pathname: string): void {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const added: HTMLElement[] = [];
    const items = Array.from(document.querySelectorAll<HTMLLIElement>('ol.check-list > li'));
    items.forEach((li, index) => {
      if (li.querySelector('.answer-note')) return;
      const key = `answer-note:${pathname}:${index + 1}`;
      const details = document.createElement('details');
      details.className = 'answer-note print-hidden';
      const summary = document.createElement('summary');
      summary.textContent = T.note[locale];
      const area = document.createElement('textarea');
      area.className = 'answer-note__text';
      area.rows = 4;
      area.placeholder = T.notePlaceholder[locale];
      area.setAttribute('aria-label', `${T.note[locale]} ${index + 1}`);
      const status = document.createElement('span');
      status.className = 'answer-note__status';
      status.setAttribute('aria-live', 'polite');
      try {
        area.value = window.localStorage.getItem(key) ?? '';
      } catch {
        area.value = '';
      }
      if (area.value) {
        details.open = true;
        status.textContent = T.noteSaved[locale];
      }
      let timer: number | undefined;
      area.addEventListener('input', () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          write(key, area.value.trim() ? area.value : '');
          status.textContent = area.value.trim() ? T.noteSaved[locale] : '';
        }, 400);
      });
      details.append(summary, area, status);
      li.append(details);
      added.push(details);
    });
    return () => {
      for (const el of added) el.remove();
    };
  }, [locale, pathname]);
}
