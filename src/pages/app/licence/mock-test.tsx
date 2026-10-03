import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import AuthGuard from '@site/src/components/AuthGuard';
import { getSupabase } from '@site/src/lib/supabase';
import Translate from '@docusaurus/Translate';

export default function LicenceMockTestPage() {
  const [entitled, setEntitled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizItems, setQuizItems] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'intro' | 'taking' | 'submitting' | 'results'>('intro');
  const [results, setResults] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAccess() {
      const { data, error } = await getSupabase()
        .from('entitlements')
        .select('id')
        .eq('entitlement_type', 'licence_practice_pass')
        .is('revoked_at', null)
        .limit(1);
      
      if (!error && data && data.length > 0) {
        setEntitled(true);
      } else {
        setError("Access denied. Ensure your Licence Practice Pass is verified.");
      }
      setLoading(false);
    }
    checkAccess();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'taking' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (status === 'taking' && timeLeft === 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  async function startTest() {
    setLoading(true);
    const { data, error } = await getSupabase()
      .from('quiz_items_public')
      .select('*')
      .eq('course_code', 'licence');
    
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    
    setQuizItems(data || []);
    setStatus('taking');
    setLoading(false);
  }

  async function handleSubmit() {
    setStatus('submitting');
    const { data, error } = await getSupabase()
      .rpc('submit_licence_mock_attempt', { p_answers: answers });

    if (error) {
      setError(error.message);
      setStatus('taking');
    } else {
      setResults(data);
      setStatus('results');
    }
  }

  function formatTime(secs: number) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  const objectiveNames: Record<number, string> = {
    1: 'A. Methods of Teaching and Foundations of Education',
    2: 'B. Child Development and Educational Psychology',
    3: 'C. Classroom Management',
    4: 'D. Assessment and Test Development',
    5: 'E. School, Community and Teacher',
  };

  return (
    <Layout title="Licence Mock Test">
      <AuthGuard>
        <main className="container margin-vert--lg">
          <h1><Translate>Licence Practice Pass: Timed Mock Test</Translate></h1>
          
          {loading && status === 'intro' ? (
            <p><Translate>Loading...</Translate></p>
          ) : error ? (
            <div className="alert alert--danger">
              {error}
              <br/><br/>
              <a href="/pricing" className="button button--secondary"><Translate>View Pricing</Translate></a>
              {' '}
              <a href="/app/support" className="button button--link"><Translate>I paid but cannot access</Translate></a>
            </div>
          ) : status === 'intro' ? (
            <div>
              <p><Translate>This is a full-length, timed mock test covering all 5 pedagogy objectives.</Translate></p>
              <ul>
                <li><strong><Translate>Time limit:</Translate></strong> <Translate>60 minutes</Translate></li>
                <li><strong><Translate>Questions:</Translate></strong> <Translate>Server-marked multiple choice</Translate></li>
              </ul>
              <button className="button button--primary button--lg" onClick={startTest}>
                <Translate>Start Mock Test</Translate>
              </button>
            </div>
          ) : status === 'taking' || status === 'submitting' ? (
            <div>
              <div style={{ position: 'sticky', top: 60, background: 'var(--ifm-background-color)', padding: '10px 0', zIndex: 10, borderBottom: '1px solid var(--ifm-color-emphasis-200)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}><Translate>Time Remaining:</Translate> {formatTime(timeLeft)}</h3>
                <button 
                  className="button button--success" 
                  onClick={handleSubmit} 
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? <Translate>Submitting...</Translate> : <Translate>Submit Test</Translate>}
                </button>
              </div>

              {quizItems.length === 0 ? (
                <p><Translate>No questions available yet. Check back later.</Translate></p>
              ) : (
                <div className="quiz-container">
                  {quizItems.map((item, index) => (
                    <div key={item.id} className="card margin-bottom--md" style={{ padding: '20px' }}>
                      <h4><Translate>Question</Translate> {index + 1}</h4>
                      <p>{item.question_text}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(item.options as string[]).map((opt, i) => (
                          <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                            <input 
                              type="radio" 
                              name={`q-${item.id}`} 
                              value={opt}
                              checked={answers[item.id] === opt}
                              onChange={() => setAnswers(prev => ({ ...prev, [item.id]: opt }))}
                              disabled={status === 'submitting'}
                              style={{ marginTop: '5px' }}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : status === 'results' && results ? (
            <div>
              <div className="alert alert--success margin-bottom--lg">
                <h2><Translate>Test Completed!</Translate></h2>
                <p><Translate>Overall Score:</Translate> <strong>{results.score}%</strong> ({results.correct_count} <Translate>out of</Translate> {results.total_items} <Translate>correct</Translate>)</p>
              </div>
              
              <h3><Translate>Per-Objective Breakdown</Translate></h3>
              <table className="table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th><Translate>Objective</Translate></th>
                    <th><Translate>Score</Translate></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results.score_breakdown).map(([unit_no, stats]: [string, any]) => (
                    <tr key={unit_no}>
                      <td>{objectiveNames[parseInt(unit_no)] || `Unit ${unit_no}`}</td>
                      <td>
                        {stats.correct} / {stats.total} (
                        {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="margin-top--xl">
                <button className="button button--secondary" onClick={() => window.location.reload()}>
                  <Translate>Take Test Again</Translate>
                </button>
              </div>
            </div>
          ) : null}
        </main>
      </AuthGuard>
    </Layout>
  );
}
