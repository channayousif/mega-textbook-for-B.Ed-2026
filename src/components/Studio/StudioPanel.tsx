/**
 * Study Studio panel (Feature 029): the reviewed Gemini Notebook extras for one topic, shown under
 * the topic text. Data-driven: it reads static/studio-index.json (built from the manifests in
 * specs/studio/ by scripts/build-studio-index.mjs), so no topic MDX file is ever edited and no
 * review manifest goes stale.
 *
 * Tabs appear only when the topic has that kind of item: Poster, Mind map, Listen (brief first,
 * then "Go deeper" parts revealed one at a time), Brief, Study guide, and Slides (verified
 * teachers only; a UI convenience, the slides themselves contain no answers).
 * On /ur/ pages Urdu items are used; a kind with no Urdu item falls back to English with a note.
 */
import React, { useEffect, useMemo, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs, { type TabItem } from '@site/src/components/ui/Tabs';
import { useAuth } from '@site/src/contexts/AuthContext';
import { studioMarkdownToHtml } from '@site/src/lib/studioMarkdown';
import { youtubeEmbed, isYouTubeMusic, driveEmbed } from '@site/src/lib/studioMedia';
import StudioPoster from './StudioPoster';
import StudioMindMap from './StudioMindMap';
import styles from './studio.module.css';

type Locale = 'en' | 'ur';
export type StudioItem = { kind: string; part?: number; title: string; audience: 'all' | 'teacher'; alt: string; src?: string; url?: string };
type StudioIndex = Record<string, Record<Locale, StudioItem[]>>;

const T = {
  eyebrow: { en: 'Study Studio', ur: 'اسٹڈی اسٹوڈیو' },
  title: { en: 'Revise this topic', ur: 'اس موضوع کی دہرائی' },
  disclaimer: {
    en: 'Made with Gemini Notebook from this topic only, then checked against the text.',
    ur: 'یہ مواد صرف اسی موضوع سے Gemini Notebook کے ذریعے بنایا گیا اور متن سے ملا کر جانچا گیا۔',
  },
  tabs: { en: 'Study Studio', ur: 'اسٹڈی اسٹوڈیو' },
  poster: { en: 'Poster', ur: 'پوسٹر' },
  mindmap: { en: 'Mind map', ur: 'ذہنی نقشہ' },
  audio: { en: 'Listen', ur: 'سنیں' },
  brief: { en: 'Practicum brief', ur: 'پریکٹیکم بریف' },
  studyguide: { en: 'Study guide', ur: 'اسٹڈی گائیڈ' },
  video: { en: 'Watch', ur: 'دیکھیں' },
  slides: { en: 'Slides', ur: 'سلائیڈز' },
  openMusic: { en: 'Open in YouTube Music', ur: 'YouTube Music میں کھولیں' },
  openYouTube: { en: 'Open on YouTube', ur: 'YouTube پر کھولیں' },
  openDrive: { en: 'Open in Google Drive', ur: 'Google Drive میں کھولیں' },
  fallback: { en: '', ur: 'اس حصے کا اردو ورژن ابھی تیار نہیں، اس لیے انگریزی ورژن دکھایا جا رہا ہے۔' },
  deeper: { en: 'Go deeper', ur: 'مزید تفصیل' },
  open: { en: 'Open', ur: 'کھولیں' },
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  failed: { en: 'Could not load this item.', ur: 'یہ حصہ لوڈ نہیں ہو سکا۔' },
} as const;

function useAsset<T>(src: string | undefined, as: 'json' | 'text'): { data: T | null; error: boolean } {
  const url = useBaseUrl(src ?? '/');
  const [state, setState] = useState<{ data: T | null; error: boolean }>({ data: null, error: false });
  useEffect(() => {
    if (!src) return undefined;
    let live = true;
    fetch(url)
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return as === 'json' ? r.json() : r.text(); })
      .then((d) => { if (live) setState({ data: d as T, error: false }); })
      .catch(() => { if (live) setState({ data: null, error: true }); });
    return () => { live = false; };
  }, [url, src, as]);
  return state;
}

function Prose({ item, locale }: { item: StudioItem; locale: Locale }): React.ReactElement {
  const { data, error } = useAsset<string>(item.src, 'text');
  if (error) return <p className={styles.note}>{T.failed[locale]}</p>;
  if (data === null) return <p className={styles.note}>{T.loading[locale]}</p>;
  // eslint-disable-next-line react/no-danger -- studioMarkdownToHtml escapes every character first.
  return <div className={styles.prose} dangerouslySetInnerHTML={{ __html: studioMarkdownToHtml(data) }} />;
}

function Json<D>({ item, locale, render }: { item: StudioItem; locale: Locale; render: (d: D) => React.ReactNode }): React.ReactElement {
  const { data, error } = useAsset<D>(item.src, 'json');
  if (error) return <p className={styles.note}>{T.failed[locale]}</p>;
  if (data === null) return <p className={styles.note}>{T.loading[locale]}</p>;
  return <>{render(data)}</>;
}

const isAudioFile = (u: string) => /\.(m4a|mp3|ogg|wav|aac)(\?|$)/i.test(u);

function MediaFrame({ url, title, locale }: { url: string; title: string; locale: Locale }): React.ReactElement {
  if (isAudioFile(url)) {
    // eslint-disable-next-line jsx-a11y/media-has-caption -- the alt line above summarises the clip.
    return <audio controls preload="none" src={url} />;
  }
  const embed = youtubeEmbed(url);
  const linkLabel = isYouTubeMusic(url) ? T.openMusic[locale] : embed ? T.openYouTube[locale] : T.open[locale];
  return (
    <>
      {embed && (
        <div className={styles.frame}>
          <iframe src={embed} title={title} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" />
        </div>
      )}
      <a href={url} target="_blank" rel="noopener noreferrer">{linkLabel}</a>
    </>
  );
}

function Listen({ items, locale }: { items: StudioItem[]; locale: Locale }): React.ReactElement {
  const parts = items.filter((i) => i.url).sort((a, b) => (a.part ?? 1) - (b.part ?? 1));
  const [shown, setShown] = useState(1);
  return (
    <div className={styles.parts}>
      {parts.slice(0, shown).map((p) => (
        <div key={p.url} className={styles.part}>
          <h4>{p.title}</h4>
          <p className={styles.note}>{p.alt}</p>
          <MediaFrame url={p.url!} title={p.title} locale={locale} />
        </div>
      ))}
      {shown < parts.length && (
        <button type="button" className={styles.btn} onClick={() => setShown((n) => n + 1)}>
          {T.deeper[locale]} ({shown + 1}/{parts.length})
        </button>
      )}
    </div>
  );
}

export default function StudioPanel({ courseCode, unitNo, topicNo, locale }: { courseCode: string; unitNo: number; topicNo: number; locale: Locale }): React.ReactElement | null {
  const indexUrl = useBaseUrl('/studio-index.json');
  const [index, setIndex] = useState<StudioIndex | null>(null);
  const { verifiedTeacher } = useAuth() as unknown as { verifiedTeacher: boolean };

  useEffect(() => {
    let live = true;
    fetch(indexUrl).then((r) => (r.ok ? r.json() : {})).then((d) => { if (live) setIndex(d as StudioIndex); }).catch(() => { if (live) setIndex({}); });
    return () => { live = false; };
  }, [indexUrl]);

  const slot = index?.[`${courseCode.toLowerCase()}/${unitNo}/${topicNo}`];

  const tabs = useMemo<TabItem[]>(() => {
    if (!slot) return [];
    const pick = (kind: string): { items: StudioItem[]; fellBack: boolean } => {
      const own = slot[locale].filter((i) => i.kind === kind);
      if (own.length || locale === 'en') return { items: own, fellBack: false };
      return { items: slot.en.filter((i) => i.kind === kind), fellBack: true };
    };
    const out: TabItem[] = [];
    const add = (kind: keyof typeof T, body: (items: StudioItem[], loc: Locale) => React.ReactNode, teacherOnly = false) => {
      const { items, fellBack } = pick(kind);
      const visible = items.filter((i) => (teacherOnly || i.audience === 'teacher' ? verifiedTeacher : true));
      if (!visible.length) return;
      out.push({
        id: kind,
        label: T[kind][locale],
        content: (
          <div lang={fellBack ? 'en' : locale} dir={fellBack ? 'ltr' : undefined}>
            {fellBack && <p className={styles.note} lang="ur" dir="rtl">{T.fallback.ur}</p>}
            {body(visible, fellBack ? 'en' : locale)}
          </div>
        ),
      });
    };
    add('poster', (it, loc) => <Json item={it[0]} locale={locale} render={(d) => <StudioPoster data={d as never} locale={loc} />} />);
    add('mindmap', (it, loc) => <Json item={it[0]} locale={locale} render={(d) => <StudioMindMap tree={d as never} locale={loc} storageKey={`studio-recall:${courseCode}:${unitNo}:${topicNo}:${loc}`} />} />);
    add('audio', (it) => <Listen items={it} locale={locale} />);
    add('video', (it) => <Listen items={it} locale={locale} />);
    add('brief', (it) => <Prose item={it[0]} locale={locale} />);
    add('studyguide', (it) => <Prose item={it[0]} locale={locale} />);
    add('slides', (it) => (
      <div className={styles.parts}>
        {it.filter((i) => i.url).map((i) => (
          <div key={i.url} className={styles.part}>
            <h4>{i.title}</h4>
            <p className={styles.note}>{i.alt}</p>
            {driveEmbed(i.url!) && (
              <div className={styles.frame}>
                <iframe src={driveEmbed(i.url!)!} title={i.title} loading="lazy" allow="fullscreen" referrerPolicy="strict-origin-when-cross-origin" />
              </div>
            )}
            <a href={i.url} target="_blank" rel="noopener noreferrer">{driveEmbed(i.url!) ? T.openDrive[locale] : T.open[locale]}</a>
          </div>
        ))}
      </div>
    ), true);
    return out;
  }, [slot, locale, verifiedTeacher, courseCode, unitNo, topicNo]);

  if (!tabs.length) return null;
  return (
    <section className={styles.panel} aria-labelledby="studio-panel-title">
      <div className={styles.head}>
        <p className={styles.eyebrow}>{T.eyebrow[locale]}</p>
        <h2 id="studio-panel-title" className={styles.title}>{T.title[locale]}</h2>
        <p className={styles.note}>{T.disclaimer[locale]}</p>
      </div>
      <Tabs items={tabs} label={T.tabs[locale]} />
    </section>
  );
}
