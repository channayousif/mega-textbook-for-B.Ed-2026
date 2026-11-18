/**
 * One number with its label: a tinted icon square, the value, the label and an optional
 * hint in words (never colour alone), with an optional meter for a share of a whole.
 */
import React from 'react';
import clsx from 'clsx';
import Icon, { type IconName } from '@site/src/components/icons/Icon';
import styles from './ui.module.css';

export type StatTone = 'teal' | 'amber' | 'green' | 'blue' | 'plum';

type Props = { label: React.ReactNode; value: React.ReactNode; icon?: IconName; tone?: StatTone; hint?: React.ReactNode; percent?: number };

export default function StatTile({ label, value, icon, tone = 'teal', hint, percent }: Props): React.ReactElement {
  const p = percent == null ? null : Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div className={styles.stat}>
      {icon && <span className={clsx(styles.statIcon, styles[`tone_${tone}`])} aria-hidden="true"><Icon name={icon} size={24} accent={false} /></span>}
      <div className={styles.statBody}>
        <div className={styles.statLabel}>{label}</div>
        <div className={styles.statValue}>{value}</div>
        {p != null && (
          <div className={styles.meter} aria-hidden="true">
            <span className={styles.meterFill} style={{ inlineSize: `${p}%` }} />
          </div>
        )}
        {hint && <div className={styles.statHint}>{hint}</div>}
      </div>
    </div>
  );
}
