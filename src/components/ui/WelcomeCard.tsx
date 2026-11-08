/**
 * The first card of a dashboard home: the greeting is the page's h1, then one figure
 * that matters most right now and one action. Optional art sits at the end side.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './ui.module.css';

type Props = {
  title: React.ReactNode;
  lead?: React.ReactNode;
  figure?: React.ReactNode;
  figureLabel?: React.ReactNode;
  action?: { label: React.ReactNode; to: string };
  art?: React.ReactNode;
};

export default function WelcomeCard({ title, lead, figure, figureLabel, action, art }: Props): React.ReactElement {
  return (
    <section className={styles.welcome}>
      <div className={styles.welcomeText}>
        <h1 className={styles.welcomeTitle}>{title}</h1>
        {lead && <p className={styles.welcomeLead}>{lead}</p>}
        {figure != null && (
          <p className={styles.welcomeFigure}>
            <span className={styles.welcomeNumber}>{figure}</span>
            {figureLabel && <span className={styles.welcomeFigureLabel}>{figureLabel}</span>}
          </p>
        )}
        {action && <Link className="button button--primary" to={action.to}>{action.label}</Link>}
      </div>
      {art && <div className={styles.welcomeArt} aria-hidden="true">{art}</div>}
    </section>
  );
}
