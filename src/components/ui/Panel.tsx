/** A card for one block of a dashboard: a title row with an optional subtitle and action. */
import React from 'react';
import clsx from 'clsx';
import styles from './ui.module.css';

type Props = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headingLevel?: 2 | 3;
  actions?: React.ReactNode;
  className?: string;
  id?: string;
  children: React.ReactNode;
};

export default function Panel({ title, subtitle, headingLevel = 2, actions, className, id, children }: Props): React.ReactElement {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <section className={clsx(styles.panel, className)} aria-labelledby={title && id ? `${id}-title` : undefined} id={id}>
      {(title || actions) && (
        <div className={styles.panelHead}>
          <div>
            {title && <H className={styles.panelTitle} id={id ? `${id}-title` : undefined}>{title}</H>}
            {subtitle && <p className={styles.panelSub}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.panelActions}>{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
