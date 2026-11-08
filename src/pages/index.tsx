/**
 * Landing page, redesign v2 "From knowledge to practice" (logo kit v2, boards approved
 * 2026-11-07). A teal hero with the tagline and the live EN/اردو card, then one climb
 * from reading to applying in school, audience paths with photo stacks, counts on a
 * stepped band, the learning-aids gallery, features, trust, access, questions, and a
 * closing panel where a student teacher climbs once to the top step.
 */
import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import catalog from '@site/catalog/courses.json';
import { trackEvent } from '@site/src/lib/analytics';
import useReveal from '@site/src/lib/useReveal';
import Icon, { type IconName } from '@site/src/components/icons/Icon';
import { COPY } from '@site/src/components/landing/copy';
import { SCENES, type SceneId } from '@site/src/components/landing/scenes';
import ReturningStrip from '@site/src/components/landing/ReturningStrip';
import StepsEdge from '@site/src/components/landing/StepsEdge';
import ClimbArt from '@site/src/components/landing/ClimbArt';
import s from '@site/src/components/landing/landing.module.css';

type Stats = { courses: number; units: number; urduUnits: number; figures: number };
type Locale = 'en' | 'ur';

const SAMPLE_TOPIC = '/semester-1/efmp-302/unit-01/topic-01/';
const AUDIENCE_LINKS = ['/intro', '/licence/', '/guides/teacher-guide/', '/contact'];
const ACCESS_LINKS = ['/intro', '/app/signup', '/contact'];
const TEAL = '#123E43';

const AUDIENCE_STACKS: readonly (readonly [SceneId, SceneId, SceneId])[] = [
  ['U3-13', 'GENG', 'E301'],
  ['U6-10', 'GQUR', 'E304'],
  ['U3-11', 'E305', 'U3-16'],
  ['GICT', 'GSOS', 'U6-9'],
];
const GALLERY: readonly (readonly [SceneId, string])[] = [
  ['E301', 'EFMP-301'], ['U1-9', 'EFMP-302'], ['E304', 'EFMP-304'],
  ['E305', 'EFMP-305'], ['GNAS', 'GNAS-301'], ['GICT', 'GICT-300'],
  ['GQUR', 'GQUR-301'], ['GSOS', 'GSOS-301'], ['GENG', 'GENG-300'],
];
/** Gallery pictures that are published textbook figures; the rest were made for the site. */
const FROM_TEXTBOOK: ReadonlySet<SceneId> = new Set<SceneId>(['U1-9', 'E304']);
const CLIMB_ICONS: readonly IconName[] = ['explain', 'activity', 'check', 'chalkboard'];
const FEATURE_ICONS: readonly IconName[] = ['language', 'scenario', 'chalkboard', 'ict', 'bookmark', 'classes'];
const TRUST_ICONS: readonly IconName[] = ['foundations', 'pedagogy', 'reading', 'shield'];

type CatalogNode = { code?: string; title_en?: string; title_ur?: string; [k: string]: unknown };
const TITLES: Record<string, { en: string; ur?: string }> = {};
(function walk(o: unknown): void {
  if (Array.isArray(o)) { o.forEach(walk); return; }
  if (o && typeof o === 'object') {
    const n = o as CatalogNode;
    if (n.code && n.title_en) TITLES[n.code] = { en: n.title_en, ur: n.title_ur };
    Object.values(n).forEach(walk);
  }
})(catalog);

function Scene({ id, locale, className, eager }: { id: SceneId; locale: Locale; className?: string; eager?: boolean }): React.ReactElement {
  const sc = SCENES[id];
  const src = useBaseUrl(sc.src);
  return (
    <img className={className} src={src} width={sc.w} height={sc.h} alt={sc[locale]}
      loading={eager ? undefined : 'lazy'} decoding="async" />
  );
}

function Ticks({ items, onTeal }: { items: readonly string[]; onTeal?: boolean }): React.ReactElement {
  return (
    <ul className={clsx(s.ticks, onTeal && s.ticksOnTeal)}>
      {items.map((item) => <li key={item}><Icon name="success" size={20} accent={false} /><span>{item}</span></li>)}
    </ul>
  );
}

function Reveal({ as: Tag = 'div', className, children, ...rest }: { as?: 'div' | 'article' | 'figure'; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>): React.ReactElement {
  const [ref, state] = useReveal<HTMLElement>();
  const El = Tag as 'div';
  return <El ref={ref as React.Ref<HTMLDivElement>} className={className} data-reveal={state === 'static' ? undefined : state} {...rest}>{children}</El>;
}

export default function Home(): React.ReactElement {
  const { siteConfig, i18n } = useDocusaurusContext();
  const locale: Locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const rtl = locale === 'ur';
  const c = COPY[locale];
  const stats = siteConfig.customFields?.siteStats as Stats;
  const hero = useBaseUrl('/img/site/hero-efmp-302-fig-U1-10.webp');
  const [aud, setAud] = useState(0);
  const [lang, setLang] = useState<Locale>(locale);
  const track = (what: string) => () => trackEvent('landing_click', { what });

  const audiences = [
    { label: c.a1, t: c.a1t, d: c.a1d, l: c.a1l, cta: c.a1c },
    { label: c.a2, t: c.a2t, d: c.a2d, l: c.a2l, cta: c.a2c },
    { label: c.a3, t: c.a3t, d: c.a3d, l: c.a3l, cta: c.a3c },
    { label: c.a4, t: c.a4t, d: c.a4d, l: c.a4l, cta: c.a4c },
  ];
  const climbText = [c.f[0][2], c.how[1][1], c.f[1][2], c.a3d];
  const counts: readonly (readonly [number, string])[] = [
    [stats.courses, c.s1l], [stats.units, c.s2l], [stats.urduUnits, c.s3l], [stats.figures, c.s4l],
  ];

  return (
    <Layout title={c.meta_title} description={c.meta_desc}>
      {/* Without JavaScript every audience panel stays readable. */}
      <noscript><style>{`.${s.panel}[hidden]{display:block}`}</style></noscript>
      <ReturningStrip c={c} />
      <main className={s.root}>
        <section className={s.hero}>
          <svg className={s.heroMark} viewBox="0 0 116 135" aria-hidden="true" focusable="false">
            <path d="M91 26 H110 V51 Q110 65 91 69 L78 71 V50 Q78 42 91 42Z" />
            <path d="M38 5 H57 V31 H80 Q80 49 62 49 H57 V60 L45 74 Q65 63 86 61 Q103 58 110 50 V64 Q109 82 83 82 H65 Q45 82 45 94 Q45 105 60 105 H70 L77 115 L76 102 Q84 98 83 88 Q104 98 96 116 Q88 132 62 128 Q22 124 22 94 V49 H4 Q4 31 22 31 V22 Q22 5 38 5Z" />
          </svg>
          <div className={clsx(s.wrap, s.heroGrid)}>
            <div>
              <p className={s.tagline} lang="ur" dir="rtl">علم سے عمل تک</p>
              {c.tagline_en && <p className={s.taglineEn}>{c.tagline_en}</p>}
              <h1 className={s.h1}>{c.h1a}{c.h1b}<span className={s.h1Urdu} lang="ur">{c.h1c}</span>{c.h1d}</h1>
              <p className={s.lead}>{c.lead}</p>
              <div className={s.ctas}>
                <Link className={clsx('button button--lg', s.btnAmber)} to="#who" onClick={track('hero-programme')}>{c.cta1} <Icon name="arrow" size={20} accent={false} /></Link>
                <Link className={clsx('button button--lg', s.btnGhost)} to={SAMPLE_TOPIC} onClick={track('hero-sample')}>{c.cta2}</Link>
              </div>
              <Ticks items={[c.r1, c.r2, c.r3]} onTeal />
            </div>
            <div className={s.heroArt}>
              <div className={s.heroBlock} aria-hidden="true" />
              <img className={s.heroImg} src={hero} width={1100} height={614} alt={c.alt} fetchPriority="high" />
              <div className={s.heroCard}>
                <div className={s.heroCardHead}>
                  <p className={s.meta}>{c.card_k} · {c.card_min}</p>
                  <div className={s.seg} role="group" aria-label={c.aria_lang}>
                    <button type="button" lang="en" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
                    <button type="button" lang="ur" aria-pressed={lang === 'ur'} onClick={() => setLang('ur')}>اردو</button>
                  </div>
                </div>
                {lang === 'en' ? (
                  <div lang="en" dir="ltr"><p className={s.passageTitle}>{c.card_t_en}</p><p className={s.small}>{c.p_en}</p></div>
                ) : (
                  <div lang="ur" dir="rtl" className={s.passageUr}><p className={s.passageTitle}>{c.card_t_ur}</p><p className={s.small}>{c.p_ur}</p></div>
                )}
              </div>
            </div>
          </div>
          <StepsEdge rtl={rtl} height={rtl ? 308 : 180} />
        </section>

        <section className={clsx(s.wrap, s.sec)} id="climb">
          <p className={s.eye}>{c.e_climb}</p>
          <h2 className={s.h2}>{c.h_climb}</h2>
          <ol className={s.climb}>
            {c.climb.map((title, i) => (
              <li key={title} className={s.climbStep}>
                <Reveal className={s.bubble}>
                  <span className={s.tile}><Icon name={CLIMB_ICONS[i]} size={26} /></span>
                  <h3 className={s.h3}>{title}</h3>
                  <p className={s.small}>{climbText[i]}</p>
                </Reveal>
                <div className={clsx(s.riser, s[`riser${i}`])} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </section>

        <section className={s.white} id="who">
          <div className={clsx(s.wrap, s.sec)}>
            <p className={s.eye}>{c.e_who}</p>
            <h2 className={s.h2}>{c.h_who}</h2>
            <div className={s.tabs} role="group" aria-label={c.aria_aud}>
              {audiences.map((a, i) => (
                <button key={a.label} type="button" className={clsx(s.tab, i === aud && s.tabOn)} aria-pressed={i === aud}
                  onClick={() => { setAud(i); trackEvent('landing_audience', { audience: i }); }}>{a.label}</button>
              ))}
            </div>
            {audiences.map((a, i) => (
              <div key={a.label} className={s.panel} hidden={i !== aud}>
                <div className={s.audience}>
                  <div>
                    <h3 className={s.h3big}>{a.t}</h3>
                    <p className={s.body}>{a.d}</p>
                    <Ticks items={a.l} />
                    <Link className="button button--primary" to={AUDIENCE_LINKS[i]} onClick={track(`audience-${i}`)}>{a.cta} <Icon name="arrow" size={20} accent={false} /></Link>
                  </div>
                  <div className={s.stack}>
                    {AUDIENCE_STACKS[i].map((id, k) => (
                      <figure key={id} className={clsx(s.photo, s[`stack${k}`])}><Scene id={id} locale={locale} /></figure>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={s.band} aria-label={c.e_feat}>
          <StepsEdge fill={TEAL} rtl={rtl} height={150} className={s.bandEdge} />
          <div className={clsx(s.wrap, s.counts)}>
            {counts.map(([n, label], i) => (
              <div key={label} className={s[`count${i}`]}><p className={s.countN}>{n}</p><p className={s.countL}>{label}</p></div>
            ))}
          </div>
        </section>

        <section className={clsx(s.wrap, s.sec)} id="gallery">
          <p className={s.eye}>{c.e_gal}</p>
          <h2 className={s.h2}>{c.h_gal}</h2>
          <div className={s.gallery}>
            {GALLERY.map(([id, code]) => (
              <figure key={id} className={s.photo}>
                <Scene id={id} locale={locale} />
                <figcaption>
                  {/* Seven of these are site scenes, not textbook figures: say so (owner, 2026-11-08). */}
                  {FROM_TEXTBOOK.has(id)
                    ? <strong>{code}</strong>
                    : <strong>{locale === 'ur' ? `${code} ${c.gal_inspired}` : `${c.gal_inspired} ${code}`}</strong>}
                  {' '}{(locale === 'ur' && TITLES[code]?.ur) || TITLES[code]?.en}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={clsx(s.wrap, s.sec)} id="features">
          <p className={s.eye}>{c.e_feat}</p>
          <h2 className={s.h2}>{c.h_feat}</h2>
          <div className={s.g3}>
            {c.f.map(([, title, text], i) => (
              <Reveal as="article" key={title} className={s.bubble}>
                <span className={s.tile}><Icon name={FEATURE_ICONS[i]} size={26} /></span>
                <h3 className={s.h3}>{title}</h3>
                <p className={s.small}>{text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={s.white}>
          <div className={clsx(s.wrap, s.sec)}>
            <p className={s.eye}>{c.e_trust}</p>
            <h2 className={s.h2}>{c.h_trust}</h2>
            <div className={s.g4}>
              {c.tr.map(([title, text], i) => (
                <div key={title}>
                  <span className={s.tile}><Icon name={TRUST_ICONS[i]} size={26} /></span>
                  <h3 className={s.h3}>{title}</h3>
                  <p className={s.small}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(s.wrap, s.sec)} id="access">
          <p className={s.eye}>{c.e_acc}</p>
          <h2 className={s.h2}>{c.h_acc}</h2>
          <div className={s.g3}>
            {c.ac.map(([title, price, text, list, cta], i) => (
              <article key={title as string} className={clsx(s.price, i === 1 && s.priceFeature)}>
                <p className={s.priceKind}>{title as string}</p>
                <p className={s.amount}>{price as string}</p>
                <p className={s.small}>{text as string}</p>
                <Ticks items={list as readonly string[]} onTeal={i === 1} />
                <Link className={clsx('button button--block', i === 1 ? s.btnAmber : 'button--secondary')} to={ACCESS_LINKS[i]} onClick={track(`access-${i}`)}>{cta as string}</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={s.white}>
          <div className={clsx(s.wrap, s.sec)}>
            <p className={s.eye}>{c.e_faq}</p>
            <h2 className={s.h2}>{c.h_faq}</h2>
            <div className={s.faqs}>
              {c.q.map(([q, a], i) => (
                <details key={q} className={s.faq} open={i === 0}>
                  <summary>{q}<Icon name="chevron" size={20} accent={false} className={s.chev} /></summary>
                  <p className={s.small}>{a.replace('{urdu}', String(stats.urduUnits))}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={clsx(s.wrap, s.sec)}>
          <div className={s.final}>
            <div className={s.finalArt}><ClimbArt rtl={rtl} /></div>
            <div className={s.finalText}>
              <h2 className={s.finalH}>{c.f_h}</h2>
              <p>{c.f_d}</p>
              <Link className={clsx('button button--lg', s.btnAmber)} to="#who" onClick={track('final-programme')}>{c.cta1} <Icon name="arrow" size={20} accent={false} /></Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
