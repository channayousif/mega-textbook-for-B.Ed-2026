import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { useAuth } from '@site/src/contexts/AuthContext';
import {
  joinClassByCode,
  classifyJoinError,
  listJoinedClasses,
} from '@site/src/lib/classes';
import type { Class, Enrollment } from '@site/src/lib/types';

/**
 * Student "My classes" - join by code and see current classes, without leaving the
 * dashboard (Spec 011, US2 / FR-006). Reuses the Spec 003 join RPC + error classifier.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  title: { en: 'My classes', ur: 'میری کلاسیں' },
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  loadError: { en: 'Could not load your classes.', ur: 'آپ کی کلاسیں لوڈ نہیں ہو سکیں۔' },
  joinHeading: { en: 'Join a class', ur: 'کلاس میں شامل ہوں' },
  codeLabel: { en: 'Join code', ur: 'شمولیت کوڈ' },
  join: { en: 'Join', ur: 'شامل ہوں' },
  joining: { en: 'Joining…', ur: 'شامل ہو رہے ہیں…' },
  joinSuccess: { en: 'Joined. The class is in your list below.', ur: 'شامل ہو گئے۔ کلاس نیچے آپ کی فہرست میں ہے۔' },
  joinAlready: { en: 'You are already in this class.', ur: 'آپ پہلے سے اس کلاس میں ہیں۔' },
  joinInvalid: { en: 'That code is not valid or has expired.', ur: 'یہ کوڈ درست نہیں یا اس کی میعاد ختم ہو گئی۔' },
  joinRemoved: { en: 'You were removed from this class and cannot rejoin with this code.', ur: 'آپ کو اس کلاس سے نکال دیا گیا تھا اور آپ اس کوڈ سے دوبارہ شامل نہیں ہو سکتے۔' },
  joinError: { en: 'Could not join. Please try again.', ur: 'شامل نہیں ہو سکے۔ دوبارہ کوشش کریں۔' },
  yourClasses: { en: 'Your classes', ur: 'آپ کی کلاسیں' },
  none: { en: 'You are not in any class yet.', ur: 'آپ ابھی کسی کلاس میں نہیں ہیں۔' },
  colName: { en: 'Class', ur: 'کلاس' },
  colCourse: { en: 'Course', ur: 'کورس' },
  colTerm: { en: 'Term', ur: 'مدت' },
} as const;

function ClassesContent(): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [rows, setRows] = useState<(Enrollment & { classes: Class })[] | null>(null);
  const [code, setCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!profile) return;
    const { data, error: e } = await listJoinedClasses(profile.id);
    if (e) {
      setError(MESSAGES.loadError[locale]);
      return;
    }
    setRows((data ?? []).filter((r) => r.status === 'active'));
  }, [profile, locale]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleJoin(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setJoining(true);
    setError(null);
    setMessage(null);
    const { data, error: joinError } = await joinClassByCode(code.trim().toUpperCase());
    setJoining(false);
    if (joinError) {
      const kind = classifyJoinError(joinError);
      setError(
        kind === 'removed'
          ? MESSAGES.joinRemoved[locale]
          : kind === 'invalid_code'
            ? MESSAGES.joinInvalid[locale]
            : MESSAGES.joinError[locale],
      );
      return;
    }
    setMessage(data?.alreadyEnrolled ? MESSAGES.joinAlready[locale] : MESSAGES.joinSuccess[locale]);
    setCode('');
    await load();
  }

  return (
    <div>
      <h1>{MESSAGES.title[locale]}</h1>
      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}
      {message && <div className="alert alert--success" role="status">{message}</div>}

      <form onSubmit={handleJoin} className="margin-bottom--lg">
        <h2>{MESSAGES.joinHeading[locale]}</h2>
        <label htmlFor="join-code">{MESSAGES.codeLabel[locale]}</label>
        <input
          id="join-code"
          className="input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          autoCapitalize="characters"
        />
        <button type="submit" className="button button--primary button--sm margin-top--sm" disabled={joining || !code.trim()}>
          {joining ? MESSAGES.joining[locale] : MESSAGES.join[locale]}
        </button>
      </form>

      <h2>{MESSAGES.yourClasses[locale]}</h2>
      {!rows ? (
        <p>{MESSAGES.loading[locale]}</p>
      ) : rows.length === 0 ? (
        <p>{MESSAGES.none[locale]}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{MESSAGES.colName[locale]}</th>
              <th>{MESSAGES.colCourse[locale]}</th>
              <th>{MESSAGES.colTerm[locale]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} data-testid="joined-class-row">
                <td>{r.classes.name}</td>
                <td>{r.classes.course_code}</td>
                <td>{r.classes.term_label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function StudentClassesPage(): React.ReactElement {
  return (
    <Layout title="My classes">
      <AppDashboardShell role="student">
        <ClassesContent />
      </AppDashboardShell>
    </Layout>
  );
}
