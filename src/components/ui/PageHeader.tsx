/** Page title band for app pages: an optional icon, the title, a lead line and actions. */
import React from 'react';
import Icon, { type IconName } from '@site/src/components/icons/Icon';
import styles from './ui.module.css';

type Props = { title: React.ReactNode; icon?: IconName; lead?: React.ReactNode; actions?: React.ReactNode };

export default function PageHeader({ title, icon, lead, actions }: Props): React.ReactElement {
  return (
    <header className={styles.pageHeader}>
      <div className={styles.pageHeaderText}>
        <h1 className={styles.pageTitle}>
          {icon && <span className={styles.pageIcon}><Icon name={icon} size={26} /></span>}
          {title}
        </h1>
        {lead && <p className={styles.pageLead}>{lead}</p>}
      </div>
      {actions && <div className={styles.pageActions}>{actions}</div>}
    </header>
  );
}
