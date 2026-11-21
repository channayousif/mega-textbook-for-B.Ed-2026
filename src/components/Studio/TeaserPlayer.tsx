/**
 * Feature 030 (T039-T041): a public course teaser Short in a 9:16 frame.
 *
 * Facade first: the frame shows the YouTube poster and a play button, and the youtube-nocookie
 * iframe loads only after a tap, so a page with a teaser makes no request to YouTube until the
 * reader asks for it. The frame has a fixed aspect ratio, so swapping poster for player never
 * shifts the layout. Teasers are Urdu (D-2026-0083); English pages show the Urdu teaser.
 */
import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { youtubeEmbed } from '@site/src/lib/studioMedia';
import styles from './teaser.module.css';

export type Teaser = { youtube_id: string; title: string; locale: string };
type Locale = 'en' | 'ur';

const T = {
  play: { en: 'Play the course teaser', ur: 'کورس کا تعارفی ویڈیو چلائیں' },
  heading: { en: 'This course in 30 seconds', ur: 'یہ کورس 30 سیکنڈ میں' },
  urduNote: { en: 'In Urdu', ur: 'اردو میں' },
  button: { en: 'Teaser', ur: 'تعارف' },
  close: { en: 'Close', ur: 'بند کریں' },
};

/** The public teaser of a course, from the build-time studio index (docusaurus.config customFields). */
export function useTeaser(courseCode: string | null | undefined): Teaser | null {
  const { siteConfig } = useDocusaurusContext();
  const all = (siteConfig.customFields?.courseTeasers ?? {}) as Record<string, Teaser>;
  return courseCode ? all[courseCode.toUpperCase()] ?? null : null;
}

export default function TeaserPlayer({ teaser, locale, autoLoad = false }: { teaser: Teaser; locale: Locale; autoLoad?: boolean }): React.ReactElement {
  const [on, setOn] = useState(autoLoad);
  const src = youtubeEmbed(`https://youtube.com/shorts/${teaser.youtube_id}`);
  return (
    <div className={styles.frame} data-testid="teaser-frame">
      {on && src ? (
        <iframe
          src={`${src}&autoplay=1&playsinline=1`}
          title={teaser.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          lang={teaser.locale}
        />
      ) : (
        <button type="button" className={styles.facade} onClick={() => setOn(true)} aria-label={`${T.play[locale]}: ${teaser.title}`}>
          <img src={`https://i.ytimg.com/vi/${teaser.youtube_id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" width={480} height={360} />
          <span className={styles.play} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/** The course overview block: player beside a short heading. */
export function CourseTeaser({ courseCode, locale }: { courseCode: string; locale: Locale }): React.ReactElement | null {
  const teaser = useTeaser(courseCode);
  if (!teaser) return null;
  return (
    <aside className={styles.block} aria-label={T.heading[locale]} data-testid="course-teaser">
      <TeaserPlayer teaser={teaser} locale={locale} />
      <div className={styles.text}>
        <p className={styles.heading}>{T.heading[locale]}</p>
        <p className={styles.caption} lang={teaser.locale} dir={teaser.locale === 'ur' ? 'rtl' : undefined}>{teaser.title}</p>
        {locale !== teaser.locale && <p className={styles.note}>{T.urduNote[locale]}</p>}
      </div>
    </aside>
  );
}

/** The catalogue card button: opens the player in a modal dialog (Escape and the close button close it). */
export function TeaserButton({ courseCode, courseTitle, locale }: { courseCode: string; courseTitle: string; locale: Locale }): React.ReactElement | null {
  const teaser = useTeaser(courseCode);
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  if (!teaser) return null;
  return (
    <>
      <button type="button" className={styles.cardButton} onClick={() => setOpen(true)} aria-label={`${T.play[locale]}: ${courseTitle}`} data-testid={`teaser-button-${courseCode}`}>
        <span aria-hidden="true">▶</span> {T.button[locale]}
      </button>
      <dialog ref={ref} className={styles.dialog} onClose={() => setOpen(false)} onClick={(e) => { if (e.target === ref.current) setOpen(false); }} aria-label={teaser.title}>
        <div className={styles.dialogBody}>
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label={T.close[locale]}>✕</button>
          {open && <TeaserPlayer teaser={teaser} locale={locale} autoLoad />}
        </div>
      </dialog>
    </>
  );
}
