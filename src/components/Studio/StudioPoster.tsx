/**
 * Revision poster (Feature 029, option A): Gemini wrote the content from the topic only, Claude
 * checked it, and this component draws it with the site's own tokens and fonts. Fixed section
 * order: header band, key terms, the three properties, memory hooks, teacher moves, myth/reality.
 * Memory hooks stay in English on both locales (owner ruling 2026-11-09).
 */
import React from 'react';
import styles from './studio.module.css';

type Poster = {
  title: string;
  tagline: string;
  key_terms: { term: string; meaning: string }[];
  properties: { name: string; line: string }[];
  mnemonics: { phrase: string; expands: string }[];
  teacher_moves: { name: string; line: string }[];
  misconception: { myth: string; reality: string };
};

const L = {
  terms: { en: 'Key terms', ur: 'اہم terms' },
  props: { en: 'Three properties of attention', ur: 'Attention کی تین خصوصیات' },
  hooks: { en: 'Memory hooks', ur: 'یاد رکھنے کے hooks' },
  moves: { en: 'Three teacher moves', ur: 'استاد کے تین moves' },
  myth: { en: 'Myth', ur: 'غلط فہمی' },
  reality: { en: 'Reality', ur: 'حقیقت' },
} as const;

export default function StudioPoster({ data, locale }: { data: Poster; locale: 'en' | 'ur' }): React.ReactElement {
  const rtl = locale === 'ur';
  return (
    <article className={styles.poster} lang={locale} dir={rtl ? 'rtl' : 'ltr'}>
      <header className={styles.posterHead}>
        <h3>{data.title}</h3>
        <p>{data.tagline}</p>
      </header>
      <section className={styles.section}>
        <h4>{L.terms[locale]}</h4>
        <div className={styles.grid}>
          {data.key_terms.map((t) => (
            <div key={t.term} className={styles.card}><b>{t.term}</b><span>{t.meaning}</span></div>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <h4>{L.props[locale]}</h4>
        <ol className={styles.props}>
          {data.properties.map((p) => <li key={p.name}><b>{p.name}</b><span>{p.line}</span></li>)}
        </ol>
      </section>
      <section className={styles.hooks} aria-label={L.hooks[locale]}>
        <h4>{L.hooks[locale]}</h4>
        {data.mnemonics.map((m) => (
          <div key={m.phrase} className={styles.hook} lang="en"><b>{m.phrase}</b><span>{m.expands}</span></div>
        ))}
      </section>
      <section className={styles.section}>
        <h4>{L.moves[locale]}</h4>
        <div className={styles.grid}>
          {data.teacher_moves.map((m) => (
            <div key={m.name} className={styles.card}><b>{m.name}</b><span>{m.line}</span></div>
          ))}
        </div>
      </section>
      <section className={styles.myth}>
        <div className={styles.mythBad}><b>{L.myth[locale]}</b><span>{data.misconception.myth}</span></div>
        <div className={styles.mythGood}><b>{L.reality[locale]}</b><span>{data.misconception.reality}</span></div>
      </section>
    </article>
  );
}
