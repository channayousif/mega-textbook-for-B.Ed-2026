/**
 * A table that scrolls sideways inside its own box on narrow screens instead of
 * pushing the page wider. The region is focusable and named, so keyboard users can
 * scroll it. Pass ordinary thead/tbody children.
 */
import React from 'react';
import clsx from 'clsx';
import styles from './ui.module.css';

type Props = { caption: string; hideCaption?: boolean; dense?: boolean; className?: string; children: React.ReactNode };

export default function DataTable({ caption, hideCaption, dense, className, children }: Props): React.ReactElement {
  return (
    <div className={styles.tableWrap} role="region" aria-label={caption} tabIndex={0}>
      <table className={clsx(styles.table, dense && styles.tableDense, className)}>
        <caption className={hideCaption ? 'sr-only' : styles.caption}>{caption}</caption>
        {children}
      </table>
    </div>
  );
}
