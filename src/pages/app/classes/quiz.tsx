import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AuthGuard from '@site/src/components/AuthGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { useClassRole, useQueryParam } from '@site/src/contexts/ClassContext';
import { getAssignment } from '@site/src/lib/assignments';
import {
  fetchQuizItemsForUnit, submitAttempt, fetchOwnBestScore, fetchClassBestScores,
} from '@site/src/lib/quiz';
import type { QuizAttemptResult, ClassBestScoreRow } from '@site/src/lib/quiz';
import type { Assignment, QuizItem } from '@site/src/lib/types';

/**
 * Auto-graded practice quiz — student take/retake UI, teacher best-score
 * results view (Spec 003, T060/T062). FR-017, FR-016, 2026-07-19 clarification.
 */

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  noClassAccess: { en: "You don't have access to this class.", ur: 'اس کلاس تک آپ کی رسائی نہیں ہے۔' },
  noQuizAccess: { en: "You don't have access to this quiz.", ur: 'اس کوئز تک آپ کی رسائی نہیں ہے۔' },
  loadQuizError: { en: 'Could not load the quiz.', ur: 'کوئز لوڈ نہیں ہو سکا۔' },
  loadThisQuizError: { en: 'Could not load this quiz.', ur: 'یہ کوئز لوڈ نہیں ہو سکا۔' },
  submitError: { en: 'Could not submit the quiz. The due date may have passed.', ur: 'کوئز جمع نہیں ہو سکا۔ ہو سکتا ہے آخری تاریخ گزر چکی ہو۔' },
  noQuestions: { en: 'No quiz questions available for this unit yet.', ur: 'اس یونٹ کے لیے ابھی کوئی کوئز سوالات دستیاب نہیں۔' },
  pastDueWarning: {
    en: 'The due date for this quiz has passed — new attempts are no longer accepted.',
    ur: 'اس کوئز کی آخری تاریخ گزر چکی ہے — نئی کوششیں اب قبول نہیں کی جاتیں۔',
  },
  submitting: { en: 'Submitting…', ur: 'جمع ہو رہا ہے…' },
  loadResultsError: { en: 'Could not load the results.', ur: 'نتائج لوڈ نہیں ہو سکے۔' },
  notAttempted: { en: 'Not attempted', ur: 'ابھی نہیں دیا' },
} as const;

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

function bestScoreSoFar(locale: 'en' | 'ur', bestScore: number, maxMark: number): string {
  return locale === 'ur'
    ? `اب تک آپ کا بہترین سکور: ${bestScore} / ${maxMark}`
    : `Your best score so far: ${bestScore} / ${maxMark}`;
}

function scoreResult(locale: 'en' | 'ur', score: number, maxMark: number, correctCount: number, totalItems: number): string {
  return locale === 'ur'
    ? `سکور: ${score} / ${maxMark} (${totalItems} میں سے ${correctCount} درست)`
    : `Score: ${score} / ${maxMark} (${correctCount} of ${totalItems} correct)`;
}

function StudentQuiz({ assignment, studentId }: { assignment: Assignment; studentId: string }): React.ReactElement {
  const locale = useLocale();
  const [items, setItems] = useState<QuizItem[] | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizAttemptResult | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadBest = useCallback(async () => {
    const { data } = await fetchOwnBestScore(assignment.id, studentId);
    setBestScore(data);
  }, [assignment.id, studentId]);

  useEffect(() => {
    if (!assignment.course_code || assignment.unit_no === null) return;
    fetchQuizItemsForUnit(assignment.course_code, assignment.unit_no).then(({ data, error: itemsError }) => {
      if (itemsError) setError(MESSAGES.loadQuizError[locale]);
      else setItems(data ?? []);
    });
    loadBest();
  }, [assignment.course_code, assignment.unit_no, loadBest, locale]);

  const pastDue = Date.now() > new Date(assignment.due_at).getTime();
  const allAnswered = items !== null && items.every((item) => answers[item.id]);

  async function handleSubmit(): Promise<void> {
    setError(null);
    setSubmitting(true);
    const { data, error: submitError } = await submitAttempt(assignment.id, answers);
    setSubmitting(false);
    if (submitError || !data) {
      setError(MESSAGES.submitError[locale]);
      return;
    }
    setResult(data);
    await loadBest();
  }

  function handleRetake(): void {
    setResult(null);
    setAnswers({});
  }

  if (error) return <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>;
  if (!items) return <p>{MESSAGES.loading[locale]}</p>;
  if (items.length === 0) return <p>{MESSAGES.noQuestions[locale]}</p>;

  return (
    <div>
      {bestScore !== null && (
        <p>{bestScoreSoFar(locale, bestScore, assignment.max_mark)}</p>
      )}
      {pastDue && !result && (
        <div className="alert alert--warning" role="status">
          {MESSAGES.pastDueWarning[locale]}
        </div>
      )}
      {result ? (
        <div className="alert alert--success" role="status">
          <p>
            {scoreResult(locale, result.score, assignment.max_mark, result.correct_count, result.total_items)}
          </p>
          {!pastDue && (
            <button type="button" className="button button--sm button--secondary" onClick={handleRetake}>
              Retake
            </button>
          )}
        </div>
      ) : (
        <div>
          {items.map((item, index) => (
            <fieldset key={item.id} className="margin-bottom--md">
              <legend>{index + 1}. {item.question_text}</legend>
              {item.options.map((option) => (
                <label key={option.key} className="margin-right--md">
                  <input
                    type="radio"
                    name={`quiz-item-${item.id}`}
                    checked={answers[item.id] === option.key}
                    onChange={() => setAnswers((prev) => ({ ...prev, [item.id]: option.key }))}
                    disabled={pastDue}
                  />
                  {' '}{option.text}
                </label>
              ))}
            </fieldset>
          ))}
          <button
            type="button"
            className="button button--primary"
            disabled={pastDue || !allAnswered || submitting}
            onClick={handleSubmit}
          >
            {submitting ? MESSAGES.submitting[locale] : 'Submit quiz'}
          </button>
        </div>
      )}
    </div>
  );
}

function TeacherResults({ classId, assignmentId, maxMark }: { classId: string; assignmentId: string; maxMark: number }): React.ReactElement {
  const locale = useLocale();
  const [rows, setRows] = useState<ClassBestScoreRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClassBestScores(classId, assignmentId).then(({ data, error: loadError }) => {
      if (loadError) setError(MESSAGES.loadResultsError[locale]);
      else setRows(data ?? []);
    });
  }, [classId, assignmentId, locale]);

  if (error) return <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>;
  if (!rows) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Best score</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.student.id}>
            <td>{row.student.full_name ?? '(no name set)'}</td>
            <td>{row.bestScore === null ? MESSAGES.notAttempted[locale] : `${row.bestScore} / ${maxMark}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function QuizContent({ classId, assignmentId }: { classId: string; assignmentId: string }): React.ReactElement {
  const locale = useLocale();
  const { profile } = useAuth();
  const { loading: classLoading, classRow, role } = useClassRole(classId);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAssignment(assignmentId).then(({ data, error: loadError }) => {
      if (loadError || !data) setError(MESSAGES.loadThisQuizError[locale]);
      else setAssignment(data);
    });
  }, [assignmentId, locale]);

  if (classLoading) return <p>{MESSAGES.loading[locale]}</p>;
  if (!classRow) {
    return (
      <div className="alert alert--danger" role="alert" aria-live="assertive">
        {MESSAGES.noClassAccess[locale]}
      </div>
    );
  }
  if (error) return <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>;
  if (!assignment) return <p>{MESSAGES.loading[locale]}</p>;

  return (
    <div>
      <h2>{assignment.title}</h2>
      <p>Due {new Date(assignment.due_at).toLocaleString()} · Max mark {assignment.max_mark}</p>
      {role === 'teacher' ? (
        <TeacherResults classId={classId} assignmentId={assignmentId} maxMark={assignment.max_mark} />
      ) : role === 'student' && profile ? (
        <StudentQuiz assignment={assignment} studentId={profile.id} />
      ) : (
        <p>{MESSAGES.noQuizAccess[locale]}</p>
      )}
    </div>
  );
}

export default function QuizPage(): React.ReactElement {
  const classId = useQueryParam('classId');
  const assignmentId = useQueryParam('assignmentId');
  return (
    <Layout title="Quiz">
      <AuthGuard requireRole={['teacher', 'student']}>
        <main className="container auth-page margin-vert--lg">
          {classId && assignmentId ? (
            <QuizContent classId={classId} assignmentId={assignmentId} />
          ) : (
            <p>No quiz selected.</p>
          )}
        </main>
      </AuthGuard>
    </Layout>
  );
}
