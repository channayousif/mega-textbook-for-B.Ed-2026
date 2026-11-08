/** What an empty list says instead of nothing: an illustration, a sentence and a next step. */
import React from 'react';
import Icon, { type IconName } from '@site/src/components/icons/Icon';
import styles from './ui.module.css';

type Props = { title: React.ReactNode; icon?: IconName; art?: React.ReactNode; children?: React.ReactNode; action?: React.ReactNode };

export default function EmptyState({ title, icon = 'info', art, children, action }: Props): React.ReactElement {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyArt} aria-hidden="true">{art ?? <Icon name={icon} size={40} />}</div>
      <p className={styles.emptyTitle}>{title}</p>
      {children && <div className={styles.emptyText}>{children}</div>}
      {action && <div className={styles.emptyAction}>{action}</div>}
    </div>
  );
}
