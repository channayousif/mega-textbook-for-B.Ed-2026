import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { trackEvent } from '@site/src/lib/analytics';
import { COPY } from '@site/src/components/landing/copy';
import Icon from '@site/src/components/landing/Icon';
import ReturningStrip from '@site/src/components/landing/ReturningStrip';
import s from '@site/src/components/landing/landing.module.css';

type Stats = { courses: number; units: number; urduUnits: number; figures: number };
const SAMPLE_TOPIC = '/semester-1/efmp-302/unit-01/topic-01/';
const AUDIENCE_LINKS = ['/intro', '/licence/', '/guides/teacher-guide/', '/contact'];
const OPPORTUNITY_LINKS = ['/intro', '/licence/', '/app/signup', '/contact', SAMPLE_TOPIC, '/app/reviewer/apply'];
const ACCESS_LINKS = ['/intro', '/app/signup', '/contact'];

function Ticks({ items }: { items: readonly string[] }): React.ReactElement {
  return (
    <ul className={s.ticks}>
      {items.map((item) => <li key={item}><Icon name="check" /><span>{item}</span></li>)}
    </ul>
  );
}

function Tabs({ labels, current, onPick, label }: { labels: readonly string[]; current: number; onPick: (i: number) => void; label: string }): React.ReactElement {
  return (
    <div className={s.tabs} role="group" aria-label={label}>
      {labels.map((text, i) => (
        <button key={text} type="button" className={i === current ? `${s.tab} ${s.tabOn}` : s.tab} aria-pressed={i === current} onClick={() => onPick(i)}>{text}</button>
      ))}
    </div>
  );
}

export default function Home(): React.ReactElement {
  const { siteConfig, i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const c = COPY[locale];
  const stats = siteConfig.customFields?.siteStats as Stats;
  const scene = useBaseUrl('/img/figures/efmp-302/unit-01/fig-U1-10.webp');
  const [aud, setAud] = useState(0);
  const [tour, setTour] = useState(0);
  const [lang, setLang] = useState<'en' | 'ur'>(locale);
  const audiences = [
    { label: c.a1, t: c.a1t, d: c.a1d, l: c.a1l, cta: c.a1c },
    { label: c.a2, t: c.a2t, d: c.a2d, l: c.a2l, cta: c.a2c },
    { label: c.a3, t: c.a3t, d: c.a3d, l: c.a3l, cta: c.a3c },
    { label: c.a4, t: c.a4t, d: c.a4d, l: c.a4l, cta: c.a4c },
  ];
  const track = (what: string) => () => trackEvent('landing_click', { what });

  return (
    <Layout title={c.meta_title} description={c.meta_desc}>
      {/* Without JavaScript every tab panel stays readable. */}
      <noscript><style>{`.${s.panel}[hidden]{display:block}`}</style></noscript>
      <ReturningStrip c={c} />
      <main className={s.root}>
        <div className={s.backdrop} aria-hidden="true" />
        <section className={`${s.wrap} ${s.hero}`}>
          <div>
            <p className={s.pill}><i />{c.pill}</p>
            <h1 className={s.h1}>{c.h1a}<span className={s.grad}>{c.h1b}</span><span className={s.urdu} lang="ur">{c.h1c}</span>{c.h1d}</h1>
            <p className={s.lead}>{c.lead}</p>
            <div className={s.ctas}>
              <Link className="button button--primary button--lg" to="#who" onClick={track('hero-programme')}>{c.cta1} <Icon name="arrow" className={s.flip} /></Link>
              <Link className="button button--secondary button--lg" to={SAMPLE_TOPIC} onClick={track('hero-sample')}>{c.cta2}</Link>
            </div>
            <Ticks items={[c.r1, c.r2, c.r3]} />
          </div>
          <div className={s.readerCard}>
            <img src={scene} width={1376} height={768} alt={c.alt} fetchPriority="high" />
            <div className={s.readerBody}>
              <div className={s.readerHead}>
                <p className={s.meta}>{c.card_k} · {c.card_min}</p>
                <div className={s.seg} role="group" aria-label={c.aria_lang} data-on={lang}>
                  <span className={s.thumb} aria-hidden="true" />
                  <button type="button" lang="en" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
                  <button type="button" lang="ur" aria-pressed={lang === 'ur'} onClick={() => setLang('ur')}>اردو</button>
                </div>
              </div>
              {lang === 'en' ? (
                <div lang="en" dir="ltr" className={s.passageEn}><p className={s.passageTitle}>{c.card_t_en}</p><p>{c.p_en}</p></div>
              ) : (
                <div lang="ur" dir="rtl" className={s.passageUr}><p className={s.passageTitle}>{c.card_t_ur}</p><p>{c.p_ur}</p></div>
              )}
            </div>
          </div>
        </section>

        <section className={`${s.wrap} ${s.sec}`} id="who">
          <p className={s.eye}>{c.e_who}</p>
          <h2 className={s.h2}>{c.h_who}</h2>
          <Tabs labels={audiences.map((a) => a.label)} current={aud} onPick={(i) => { setAud(i); trackEvent('landing_audience', { audience: i }); }} label={c.aria_aud} />
          {audiences.map((a, i) => (
            <div key={a.label} className={s.panel} hidden={i !== aud}>
              <div className={s.audience}>
                <div>
                  <h3 className={s.h3big}>{a.t}</h3>
                  <p className={s.body}>{a.d}</p>
                  <Link className="button button--primary" to={AUDIENCE_LINKS[i]} onClick={track(`audience-${i}`)}>{a.cta} <Icon name="arrow" className={s.flip} /></Link>
                </div>
                <Ticks items={a.l} />
              </div>
            </div>
          ))}
          <p className={s.next}><span className={s.badge}>{c.next_b}</span>{c.next_t}</p>
        </section>

        <section className={s.wrap} aria-label={c.e_feat}>
          <div className={s.stats}>
            <div><p className={s.statN}>{stats.courses}</p><p className={s.statL}>{c.s1l}</p></div>
            <div><p className={s.statN}>{stats.units}</p><p className={s.statL}>{c.s2l}</p></div>
            <div><p className={s.statN}>{stats.urduUnits}</p><p className={s.statL}>{c.s3l}</p></div>
            <div><p className={s.statN}>{stats.figures}</p><p className={s.statL}>{c.s4l}</p></div>
          </div>
        </section>

        <section className={`${s.wrap} ${s.sec}`} id="features">
          <p className={s.eye}>{c.e_feat}</p>
          <h2 className={s.h2}>{c.h_feat}</h2>
          <div className={s.g3}>
            {c.f.map(([icon, title, text]) => (
              <article key={title} className={`${s.card} ${s.lift}`}>
                <span className={s.tile}><Icon name={icon} /></span>
                <h3 className={s.h3}>{title}</h3>
                <p className={s.small}>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${s.wrap} ${s.sec}`}>
          <p className={s.eye}>{c.e_how}</p>
          <h2 className={s.h2}>{c.h_how}</h2>
          <ol className={s.steps}>
            {c.how.map(([title, text]) => (
              <li key={title}><h3 className={s.h3}>{title}</h3><p className={s.small}>{text}</p></li>
            ))}
          </ol>
        </section>

        <section className={`${s.wrap} ${s.sec}`} id="tour">
          <p className={s.eye}>{c.e_tour}</p>
          <h2 className={s.h2}>{c.h_tour}</h2>
          <Tabs labels={[c.t1, c.t2, c.t3]} current={tour} onPick={setTour} label={c.aria_tour} />
          <div className={s.panel} hidden={tour !== 0}>
            <div className={s.shot}>
              <div className={s.shotReader}>
                <div>
                  <p className={s.meta}>{c.card_k}</p>
                  <p className={s.h3big}>{c.ttl}</p>
                  <img src={scene} width={1376} height={768} alt={c.alt} loading="lazy" />
                </div>
                <ol className={s.toc}>{c.toc.map((item, i) => <li key={item} className={i === 0 ? s.tocOn : undefined}>{item}</li>)}</ol>
              </div>
            </div>
          </div>
          <div className={s.panel} hidden={tour !== 1}>
            <div className={s.shot}>
              <span className={s.sample}>{c.sample}</span>
              <p className={s.h3big}>{c.d1}</p>
              <div className={s.g3}>
                <div className={s.mini}><p className={s.meta}>{c.d_c}</p><p className={s.h3}>{c.d_cn}</p></div>
                <div className={s.mini}><p className={s.meta}>{c.d_a}</p><p className={s.h3}>{c.d_an}</p><p className={s.small}>{c.d_due}</p></div>
                <div className={s.mini}><p className={s.meta}>{c.d_u}</p><p className={s.statN}>3 / 6</p></div>
              </div>
            </div>
          </div>
          <div className={s.panel} hidden={tour !== 2}>
            <div className={s.shot}>
              <span className={s.sample}>{c.sample}</span>
              <div className={s.tableWrap}>
                <table>
                  <thead><tr><th scope="col">{c.g1}</th><th scope="col">{c.g2}</th><th scope="col">{c.g3}</th><th scope="col">{c.g4}</th></tr></thead>
                  <tbody>{c.gr.map(([who, a, b, q]) => <tr key={who}><th scope="row">{who}</th><td>{a}</td><td>{b}</td><td>{q}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className={`${s.wrap} ${s.sec}`}>
          <p className={s.eye}>{c.e_opp}</p>
          <h2 className={s.h2}>{c.h_opp}</h2>
          <div className={s.g3}>
            {c.o.map(([icon, title, text], i) => (
              <Link key={title} className={`${s.card} ${s.lift} ${s.opportunity}`} to={OPPORTUNITY_LINKS[i]} onClick={track(`opportunity-${i}`)}>
                <span className={`${s.tile} ${s.tileWarm}`}><Icon name={icon} /></span>
                <span><span className={s.h3}>{title}</span><span className={s.small}>{text}</span></span>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${s.wrap} ${s.sec}`}>
          <p className={s.eye}>{c.e_trust}</p>
          <h2 className={s.h2}>{c.h_trust}</h2>
          <div className={s.g4}>
            {c.tr.map(([title, text]) => <div key={title} className={s.trust}><h3 className={s.h3}>{title}</h3><p className={s.small}>{text}</p></div>)}
          </div>
        </section>

        <section className={`${s.wrap} ${s.sec}`}>
          <p className={s.eye}>{c.e_acc}</p>
          <h2 className={s.h2}>{c.h_acc}</h2>
          <div className={s.g3}>
            {c.ac.map(([title, price, text, list, cta], i) => (
              <article key={title as string} className={i === 1 ? `${s.card} ${s.price} ${s.priceFeature}` : `${s.card} ${s.price}`}>
                <h3 className={s.h3}>{title as string}</h3>
                <p className={s.amount}>{price as string}</p>
                <p className={s.small}>{text as string}</p>
                <Ticks items={list as readonly string[]} />
                <Link className={i === 1 ? 'button button--primary button--block' : 'button button--secondary button--block'} to={ACCESS_LINKS[i]} onClick={track(`access-${i}`)}>{cta as string}</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={`${s.wrap} ${s.sec}`}>
          <p className={s.eye}>{c.e_faq}</p>
          <h2 className={s.h2}>{c.h_faq}</h2>
          {c.q.map(([q, a], i) => (
            <details key={q} className={s.faq} open={i === 0}>
              <summary>{q}<Icon name="chev" className={s.chev} /></summary>
              <p className={s.small}>{a.replace('{urdu}', String(stats.urduUnits))}</p>
            </details>
          ))}
        </section>

        <section className={`${s.wrap} ${s.sec}`}>
          <div className={s.final}>
            <div>
              <h2 className={s.h2}>{c.f_h}</h2>
              <p>{c.f_d}</p>
              <Link className={`button button--lg ${s.finalBtn}`} to="#who" onClick={track('final-programme')}>{c.cta1}</Link>
            </div>
            <div className={s.stack} aria-hidden="true"><img src={scene} alt="" loading="lazy" /><img src={scene} alt="" loading="lazy" /></div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
