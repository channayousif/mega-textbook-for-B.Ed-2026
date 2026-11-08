/** A labelled progress bar: real progressbar semantics, the value written beside it. */
import React from 'react';
import styles from './ui.module.css';

export default function ProgressBar({ value, max = 100, label, display }: { value: number; max?: number; label: string; display?: string }): React.ReactElement {
  const p = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0;
  return (
    <div className={styles.progress}>
      <div className={styles.progressTop}><span>{label}</span><span className={styles.progressValue}>{display ?? `${p}%`}</span></div>
      <div className={styles.progressTrack} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-valuetext={display ?? `${p}%`}>
        <span className={styles.progressFill} style={{ inlineSize: `${p}%` }} />
      </div>
    </div>
  );
}
