/**
 * A ring showing one share of a whole, with the percentage written in the middle as
 * real text. Decorative ring, readable number.
 */
import React from 'react';
import styles from './ui.module.css';

export default function Donut({ percent, label, size = 120 }: { percent: number; label: React.ReactNode; size?: number }): React.ReactElement {
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className={styles.donut} style={{ inlineSize: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" focusable="false">
        <circle cx="50" cy="50" r={r} className={styles.donutTrack} />
        <circle cx="50" cy="50" r={r} className={styles.donutFill} strokeDasharray={`${(p / 100) * c} ${c}`} transform="rotate(-90 50 50)" />
      </svg>
      <span className={styles.donutText}><strong>{p}%</strong><span>{label}</span></span>
    </div>
  );
}
