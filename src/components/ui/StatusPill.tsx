/** A short status word with an icon, so colour is never the only cue. */
import React from 'react';
import clsx from 'clsx';
import Icon, { type IconName } from '@site/src/components/icons/Icon';
import styles from './ui.module.css';

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'pending';

const ICON: Record<Tone, IconName | null> = {
  neutral: null, info: 'info', success: 'success', warning: 'warning', error: 'error', pending: 'pending',
};

export default function StatusPill({ tone = 'neutral', children }: { tone?: Tone; children: React.ReactNode }): React.ReactElement {
  const icon = ICON[tone];
  return (
    <span className={clsx(styles.pill, styles[`pill_${tone}`])}>
      {icon && <Icon name={icon} size={16} accent={false} />}
      {children}
    </span>
  );
}
