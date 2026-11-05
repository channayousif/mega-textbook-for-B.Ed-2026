import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useAuth } from '@site/src/contexts/AuthContext';
import { trackEvent } from '@site/src/lib/analytics';
import { readLastRead, type LastRead } from '@site/src/lib/lastRead';
import { COPY } from './copy';
import styles from './landing.module.css';

const DASHBOARDS = { student: '/app/dashboard/', teacher: '/app/teacher/', admin: '/app/admin/' } as const;

/**
 * The returning visitor's path. Signed in: a role-based dashboard button. Reading
 * without an account: resume the last page, saved only on this device. A first-time
 * visitor sees nothing. No automatic redirect, so the home page stays reachable and
 * crawlable. `html[data-returning]`, set by a head script before paint, reserves the
 * height so the page does not jump when this appears.
 */
export default function ReturningStrip({ c }: { c: (typeof COPY)['en'] | (typeof COPY)['ur'] }): React.ReactElement {
  const { role, profile } = useAuth();
  const [last, setLast] = useState<LastRead | null>(null);
  useEffect(() => setLast(readLastRead()), []);

  const name = profile?.full_name?.trim();
  const greeting = name ? c.welcome.replace('{name}', name) : c.welcome_plain;
  const go = (what: string) => () => trackEvent('landing_returning', { what });

  let body: React.ReactNode = null;
  if (role) {
    const label = role === 'teacher' ? c.rs_dashT : role === 'admin' ? c.admin : c.rs_dash;
    body = (
      <>
        <p><strong>{greeting}</strong>{role === 'teacher' ? c.rs_te : c.rs_st}</p>
        <span className={styles.grow} />
        <Link className={styles.stripBtn} to={DASHBOARDS[role]} onClick={go('dashboard')}>{label}</Link>
        {last && <Link className={styles.stripLink} to={last.url} onClick={go('resume')}>{c.rs_cont}</Link>}
      </>
    );
  } else if (last) {
    body = (
      <>
        <p><strong>{c.rs_cont}: {last.title}</strong>{c.rs_where.split('·').pop()?.trim()}</p>
        <span className={styles.grow} />
        <Link className={styles.stripBtn} to={last.url} onClick={go('resume')}>{c.rs_resume}</Link>
        <Link className={styles.stripLink} to="/intro" onClick={go('all-courses')}>{c.rs_all}</Link>
      </>
    );
  }
  return (
    <div className={styles.slot}>
      {body && <section className={styles.strip}><div className={styles.stripInner}>{body}</div></section>}
    </div>
  );
}
