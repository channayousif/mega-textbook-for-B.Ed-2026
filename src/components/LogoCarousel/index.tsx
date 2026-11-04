import React, { useState } from 'react';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

import hec from '@site/static/img/logos/hec.png';
import sindhUniversity from '@site/static/img/logos/university-of-sindh.png';
import sindhGovt from '@site/static/img/logos/sindh-govt.png';
import steda from '@site/static/img/logos/steda.png';
import gec from '@site/static/img/logos/gec.png';
import adtti from '@site/static/img/logos/adtti.png';
import detrc from '@site/static/img/logos/detrc.png';
import pite from '@site/static/img/logos/pite.png';

const LOGOS = [
  { src: hec, w: 250, h: 277, alt: 'Higher Education Commission (HEC)' },
  { src: sindhUniversity, w: 210, h: 235, alt: 'University of Sindh' },
  { src: sindhGovt, w: 243, h: 300, alt: 'Government of Sindh' },
  { src: steda, w: 474, h: 111, alt: 'STEDA' },
  { src: gec, w: 445, h: 449, alt: 'Government Elementary Colleges, Sindh' },
  { src: adtti, w: 144, h: 150, alt: 'Additional Director, TTIs' },
  { src: detrc, w: 447, h: 447, alt: 'DETRC' },
  { src: pite, w: 258, h: 197, alt: 'PITE Sindh' },
];

/**
 * Owner request, 2026-11-04: partner logos revolve automatically at the end of the
 * landing page. REEC is left out until the owner supplies a cleaner logo. WCAG 2.2.2 requires a way to stop content that moves for more than five
 * seconds, so it pauses on hover and focus and has a button, and it stands still for
 * readers who ask for reduced motion. The track moves by half its width, so each half
 * must be wider than the band or a gap shows at the end of the cycle: one set is about
 * 925px, hence four. Only the first is exposed to assistive technology. Fixed image dimensions
 * keep the width steady while lazy images load, or the loop would jump.
 */
export default function LogoCarousel(): React.ReactElement {
  const [paused, setPaused] = useState(false);
  const label = translate({ id: 'partners.label', message: 'Supporting:' });
  const set = (hidden: boolean) => (
    <ul className={styles.set} aria-hidden={hidden || undefined}>
      {LOGOS.map((logo) => (
        <li key={logo.alt}><img src={logo.src} width={logo.w} height={logo.h} alt={hidden ? '' : logo.alt} title={logo.alt} loading="lazy" /></li>
      ))}
    </ul>
  );
  return (
    <section className={`${styles.band} print-hidden`} aria-label={label}>
      <div className={styles.head}>
        <h2 className={styles.label}>{label}</h2>
        <button type="button" className={styles.pause} aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused
            ? translate({ id: 'partners.play', message: 'Play logos' })
            : translate({ id: 'partners.pause', message: 'Pause logos' })}
        </button>
      </div>
      <div className={paused ? `${styles.marquee} ${styles.paused}` : styles.marquee} dir="ltr">
        <div className={styles.track}>{set(false)}{set(true)}{set(true)}{set(true)}</div>
      </div>
    </section>
  );
}
