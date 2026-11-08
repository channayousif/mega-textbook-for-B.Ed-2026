/** One number with its label, and an optional step-shaped meter for a share of a whole. */
import React from 'react';
import Icon, { type IconName } from '@site/src/components/icons/Icon';
import styles from './ui.module.css';

type Props = { label: React.ReactNode; value: React.ReactNode; icon?: IconName; hint?: React.ReactNode; percent?: number };

export default function StatTile({ label, value, icon, hint, percent }: Props): React.ReactElement {
  const p = percent == null ? null : Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div className={styles.stat}>
      <div className={styles.statLabel}>
        {icon && <Icon name={icon} size={20} />}
        <span>{label}</span>
      </div>
      <div className={styles.statValue}>{value}</div>
      {p != null && (
        <div className={styles.meter} aria-hidden="true">
          <span className={styles.meterFill} style={{ inlineSize: `${p}%` }} />
        </div>
      )}
      {hint && <div className={styles.statHint}>{hint}</div>}
    </div>
  );
}
