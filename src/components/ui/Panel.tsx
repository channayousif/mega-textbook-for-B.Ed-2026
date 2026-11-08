/** A titled surface for one block of a dashboard. Renders a section with its heading. */
import React from 'react';
import clsx from 'clsx';
import styles from './ui.module.css';

type Props = {
  title?: React.ReactNode;
  headingLevel?: 2 | 3;
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export default function Panel({ title, headingLevel = 2, actions, className, children }: Props): React.ReactElement {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <section className={clsx(styles.panel, className)}>
      {(title || actions) && (
        <div className={styles.panelHead}>
          {title && <H className={styles.panelTitle}>{title}</H>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}
