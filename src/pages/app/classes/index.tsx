import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthGuard from '@site/src/components/AuthGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import {
  createClass, listOwnClasses, listJoinedClasses, joinClassByCode, classifyJoinError,
} from '@site/src/lib/classes';
import type { Class, Enrollment } from '@site/src/lib/types';
import { fetchCourseOptions, type CourseOptionGroup } from '@site/src/lib/courseOptions';

/**
 * Class list + create (teacher) / join-by-code + joined list (student) -
 * Spec 003, T019/T062. FR-001, FR-003, FR-016 (bilingual status/error text;
 * static labels/headings stay English, matching Spec 002's login.tsx
 * precedent - see PHR 0019).
 */

const MESSAGES = {
  loadClassesError: { en: 'Could not load your classes.', ur: 'آپ کی کلاسیں لوڈ نہیں ہو سکیں۔' },
  creating: { en: 'Creating…', ur: 'بنائی جا رہی ہے…' },
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  joining: { en: 'Joining…', ur: 'شامل ہو رہے ہیں…' },
  createClassError: {
    en: 'Could not create the class. Check the course code format (e.g. EFMP-301).',
    ur: 'کلاس نہیں بنائی جا سکی۔ کورس کوڈ کی صورت دیکھیں (مثلاً EFMP-301)۔',
  },
  joinRemoved: {
    en: 'You were removed from this class by your teacher. Contact them if you believe this is a mistake.',
    ur: 'آپ کو آپ کے استاد نے اس کلاس سے ہٹا دیا ہے۔ اگر آپ کے خیال میں یہ غلطی ہے تو ان سے رابطہ کریں۔',
  },
  joinInvalidCode: {
    en: 'That join code is not valid. Check it with your teacher.',
    ur: 'یہ جوائن کوڈ درست نہیں ہے۔ اپنے استاد سے تصدیق کریں۔',
  },
  joinGenericError: {
    en: 'Could not join that class. Please try again.',
    ur: 'اس کلاس میں شامل نہیں ہوا جا سکا۔ براہِ کرم دوبارہ کوشش کریں۔',
  },
  joinAlreadyEnrolled: { en: 'You are already in this class.', ur: 'آپ پہلے ہی اس کلاس میں شامل ہیں۔' },
  joinSuccess: { en: 'You joined the class!', ur: 'آپ کلاس میں شامل ہو گئے!' },
} as const;

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

function TeacherClassesView(): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [classes, setClasses] = useState<Class[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [name, setName] = useState('');
  const [termLabel, setTermLabel] = useState('');
  const [courseOpts, setCourseOpts] = useState<CourseOptionGroup[]>([]);

  const load = useCallback(async () => {
    if (!profile) return;
    const { data, error: loadError } = await listOwnClasses(profile.id);
    if (loadError) setError(MESSAGES.loadClassesError[locale]);
    else setClasses(data ?? []);
  }, [profile, locale]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    let cancelled = false;
    fetchCourseOptions().then((g) => { if (!cancelled) setCourseOpts(g); });
    return () => { cancelled = true; };
  }, []);

  async function handleCreate(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!profile) return;
    setCreating(true);
    setError(null);
    const { data, error: createError } = await createClass({
      teacherId: profile.id,
      courseCode: courseCode.trim().toUpperCase(),
      name: name.trim(),
      termLabel: termLabel.trim(),
    });
    setCreating(false);
    if (createError || !data) {
      setError(MESSAGES.createClassError[locale]);
      return;
    }
    setCourseCode('');
    setName('');
    setTermLabel('');
    await load();
  }

  return (
    <div>
      <h2>Your classes</h2>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}

      <form onSubmit={handleCreate} className="margin-bottom--lg">
        <h3>Create a class</h3>
        <div className="margin-bottom--sm">
          <label htmlFor="courseCode">Course</label>
          <select
            id="courseCode"
            className="input"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          >
            <option value="" disabled>{locale === 'ur' ? 'کورس منتخب کریں…' : 'Select a course…'}</option>
            {courseOpts.map((g) => (
              <optgroup key={g.semester} label={`${locale === 'ur' ? 'سمسٹر' : 'Semester'} ${g.semester}`}>
                {g.courses.map((c) => (
                  <option key={c.code} value={c.code} disabled={!c.hasContent}>
                    {c.code} - {locale === 'ur' ? c.title_ur : c.title_en}
                    {c.hasContent ? '' : (locale === 'ur' ? ' (کوئی مواد نہیں)' : ' (no content)')}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="margin-bottom--sm">
          <label htmlFor="className">Class name</label>
          <input
            id="className"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="margin-bottom--sm">
          <label htmlFor="termLabel">Term</label>
          <input
            id="termLabel"
            className="input"
            value={termLabel}
            onChange={(e) => setTermLabel(e.target.value)}
            placeholder="Fall 2026"
            required
          />
        </div>
        <button type="submit" className="button button--primary" disabled={creating}>
          {creating ? MESSAGES.creating[locale] : 'Create class'}
        </button>
      </form>

      {!classes ? (
        <p>{MESSAGES.loading[locale]}</p>
      ) : classes.length === 0 ? (
        <p>You haven&apos;t created any classes yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Term</th>
              <th>Join code</th>
              <th>Status</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.course_code}</td>
                <td>{c.term_label}</td>
                <td>{c.join_code ?? '(revoked)'}</td>
                <td>{c.status}</td>
                <td>
                  <Link to={`/app/classes/roster?classId=${c.id}`}>Manage</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function StudentClassesView(): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const [enrollments, setEnrollments] = useState<(Enrollment & { classes: Class })[] | null>(null);
  const [code, setCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!profile) return;
    const { data, error: loadError } = await listJoinedClasses(profile.id);
    if (loadError) setError(MESSAGES.loadClassesError[locale]);
    else setEnrollments((data ?? []).filter((e) => e.status === 'active'));
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
            ? MESSAGES.joinInvalidCode[locale]
            : MESSAGES.joinGenericError[locale],
      );
      return;
    }
    setMessage(data?.alreadyEnrolled ? MESSAGES.joinAlreadyEnrolled[locale] : MESSAGES.joinSuccess[locale]);
    setCode('');
    await load();
  }

  return (
    <div>
      <h2>Your classes</h2>
      {error && (
        <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>
      )}
      {message && (
        <div className="alert alert--success" role="status">{message}</div>
      )}

      <form onSubmit={handleJoin} className="margin-bottom--lg">
        <h3>Join a class</h3>
        <label htmlFor="joinCode">Join code</label>
        <input
          id="joinCode"
          className="input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="ABC123"
          required
        />
        <button type="submit" className="button button--primary margin-left--sm" disabled={joining}>
          {joining ? MESSAGES.joining[locale] : 'Join'}
        </button>
      </form>

      {!enrollments ? (
        <p>{MESSAGES.loading[locale]}</p>
      ) : enrollments.length === 0 ? (
        <p>You haven&apos;t joined any classes yet.</p>
      ) : (
        <ul>
          {enrollments.map((e) => (
            <li key={e.id}>
              {e.classes.name} - {e.classes.course_code} ({e.classes.term_label})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ClassesContent(): React.ReactElement {
  const { role } = useAuth();
  if (role === 'teacher') return <TeacherClassesView />;
  if (role === 'student') return <StudentClassesView />;
  return <p>Only students and teachers use classes.</p>;
}

export default function ClassesIndexPage(): React.ReactElement {
  return (
    <Layout title="Classes">
      <AuthGuard requireRole={['teacher', 'student']}>
        <main className="container auth-page margin-vert--lg">
          <ClassesContent />
        </main>
      </AuthGuard>
    </Layout>
  );
}
