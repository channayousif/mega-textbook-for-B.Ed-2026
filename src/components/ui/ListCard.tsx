/**
 * A card of short rows: an icon, a title and subtitle, a value at the end and an
 * optional thin progress bar. Rows can link somewhere. Shows `empty` when there are none.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Icon, { type IconName } from '@site/src/components/icons/Icon';
import Panel from './Panel';
import type { StatTone } from './StatTile';
import styles from './ui.module.css';

export type ListRowData = {
  key: string;
  icon?: IconName;
  tone?: StatTone;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  value?: React.ReactNode;
  percent?: number;
  to?: string;
  testId?: string;
};

type Props = {
  title: React.ReactNode;
  id?: string;
  actions?: React.ReactNode;
  rows: ListRowData[];
  empty: React.ReactNode;
  footer?: React.ReactNode;
};

function Row({ r }: { r: ListRowData }): React.ReactElement {
  const p = r.percent == null ? null : Math.max(0, Math.min(100, Math.round(r.percent)));
  const inner = (
    <>
      {r.icon && <span className={clsx(styles.rowIcon, styles[`tone_${r.tone ?? 'teal'}`])} aria-hidden="true"><Icon name={r.icon} size={20} accent={false} /></span>}
      <span className={styles.rowText}>
        <span className={styles.rowTitle}>{r.title}</span>
        {r.subtitle && <span className={styles.rowSub}>{r.subtitle}</span>}
      </span>
      {(r.value != null || p != null) && (
        <span className={styles.rowEnd}>
          {r.value != null && <span className={styles.rowValue}>{r.value}</span>}
          {p != null && <span className={styles.rowBar} aria-hidden="true"><span style={{ inlineSize: `${p}%` }} /></span>}
        </span>
      )}
    </>
  );
  return (
    <li className={styles.row} data-testid={r.testId}>
      {r.to ? <Link className={styles.rowLink} to={r.to}>{inner}</Link> : <div className={styles.rowLink}>{inner}</div>}
    </li>
  );
}

export default function ListCard({ title, id, actions, rows, empty, footer }: Props): React.ReactElement {
  return (
    <Panel title={title} id={id} actions={actions}>
      {rows.length === 0 ? <div className={styles.listEmpty}>{empty}</div> : (
        <ul className={styles.list}>{rows.map((r) => <Row key={r.key} r={r} />)}</ul>
      )}
      {footer && <div className={styles.listFooter}>{footer}</div>}
    </Panel>
  );
}
