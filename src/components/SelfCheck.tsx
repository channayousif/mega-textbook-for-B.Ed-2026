/**
 * Feature 032 phase C: a self-check of the unit's ten multiple-choice questions on the assessment
 * page. Anyone sees the questions; marking needs sign-in and runs on the server, which says how
 * many are right and which numbers to revisit, never the right option. Injected by
 * src/theme/DocItem/Content.tsx, so no MDX changes. Hidden in print (the page itself prints).
 */
import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useAuth } from '@site/src/contexts/AuthContext';
import { fetchSelfCheck, submitSelfCheck, type SelfCheckQuestion, type SelfCheckResult } from '@site/src/lib/selfCheck';

type Locale = 'en' | 'ur';
const T = {
  title: { en: 'Check yourself', ur: 'خود کو جانچیں' },
  intro: {
    en: 'Answer the ten multiple-choice questions, then check them. You will see how many are right and which ones to revisit; the right options stay hidden so the check stays useful.',
    ur: 'دس کثیر الاختیاری سوالات کے جواب دیں، پھر جانچیں۔ آپ دیکھیں گے کہ کتنے درست ہیں اور کن پر دوبارہ غور کرنا ہے؛ درست انتخاب پوشیدہ رہتے ہیں تاکہ جانچ کارآمد رہے۔',
  },
  check: { en: 'Check my answers', ur: 'میرے جواب جانچیں' },
  signIn: { en: 'Sign in to check your answers', ur: 'جواب جانچنے کے لیے سائن ان کریں' },
  score: { en: (s: number, t: number) => `${s} of ${t} right.`, ur: (s: number, t: number) => `${t} میں سے ${s} درست۔` },
  revisit: { en: 'Revisit:', ur: 'دوبارہ دیکھیں:' },
  allRight: { en: 'All right. Well done.', ur: 'سب درست۔ شاباش۔' },
  left: { en: (n: number) => `${n} check(s) left today for this unit.`, ur: (n: number) => `آج اس یونٹ کے لیے ${n} جانچ باقی۔` },
  unanswered: { en: 'Answer every question first.', ur: 'پہلے ہر سوال کا جواب دیں۔' },
  question: { en: 'Question', ur: 'سوال' },
} as const;

export default function SelfCheck({ courseCode, unitNo, locale }: { courseCode: string; unitNo: number; locale: Locale }): React.ReactElement | null {
  const { session, loading } = useAuth() as unknown as { session: unknown; loading: boolean };
  const [questions, setQuestions] = useState<SelfCheckQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<SelfCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let live = true;
    fetchSelfCheck(courseCode, unitNo, locale).then((q) => { if (live) setQuestions(q); });
    return () => { live = false; };
  }, [courseCode, unitNo, locale]);

  if (!questions.length) return null;
  const complete = questions.every((q) => answers[q.item_no]);
  const wrong = new Set(result?.wrong ?? []);

  const onCheck = async () => {
    if (!complete) { setError(T.unanswered[locale]); return; }
    setBusy(true); setError(null);
    const r = await submitSelfCheck(courseCode, unitNo, locale, answers);
    setBusy(false);
    if (r.ok === true) setResult(r.result); else setError((r as { error: string }).error);
  };

  return (
    <section className="self-check" aria-labelledby="self-check-title" data-testid="self-check" lang={locale} dir={locale === 'ur' ? 'rtl' : undefined}>
      <h2 id="self-check-title">{T.title[locale]}</h2>
      <p>{T.intro[locale]}</p>
      <ol className="self-check__list">
        {questions.map((q) => (
          <li key={q.item_no} className={result ? (wrong.has(q.item_no) ? 'self-check__item--wrong' : 'self-check__item--right') : undefined}>
            <fieldset>
              <legend>{q.question_text}</legend>
              {Object.entries(q.options).map(([k, text]) => (
                <label key={k} className="self-check__option">
                  <input type="radio" name={`sc-${q.item_no}`} value={k} checked={answers[q.item_no] === k}
                    onChange={() => { setAnswers((a) => ({ ...a, [q.item_no]: k })); setResult(null); }} />
                  <span>{text}</span>
                </label>
              ))}
            </fieldset>
          </li>
        ))}
      </ol>
      {!loading && !session ? (
        <p><Link className="button button--primary" to="/app/login">{T.signIn[locale]}</Link></p>
      ) : (
        <p><button type="button" className="button button--primary" onClick={onCheck} disabled={busy}>{T.check[locale]}</button></p>
      )}
      {error && <p className="self-check__error" role="alert">{error}</p>}
      {result && (
        <div className="self-check__result" role="status" aria-live="polite">
          <p><strong>{T.score[locale](result.score, result.total)}</strong>{' '}
            {result.wrong.length ? `${T.revisit[locale]} ${result.wrong.map((n) => `${T.question[locale]} ${n}`).join(', ')}` : T.allRight[locale]}</p>
          <p className="self-check__note">{T.left[locale](result.attempts_left)}</p>
        </div>
      )}
    </section>
  );
}
