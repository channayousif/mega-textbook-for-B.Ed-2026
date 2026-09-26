import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ReviewerGuard from '@site/src/components/ReviewerGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { getSupabase } from '@site/src/lib/supabase';
import { fetchCatalog, type Catalog } from '@site/src/lib/catalog';
import { fetchContentStatus } from '@site/src/lib/contentStatus';
import { buildReviewQueue, type ContentIndexEntry, type ReviewQueueItem } from '@site/src/lib/reviewQueue';
import { canReview, courseTrack, type ReviewerGrant } from '@site/src/lib/reviewerScopes';
import licenceRegistry from '@site/catalog/licence-objectives.json';

type Topic = ContentIndexEntry & { kind: string; topic_no: number | null; title: string };
type Target = { track: 'bed' | 'licence'; course_code: string | null; unit_no: number | null; topic_no: number | null; page_slug?: string | null; stage: 'topic' | 'G3' | 'G5' | 'licence'; title: string; permalink: string | null };
const CRITERIA = ['Accuracy and sources', 'Learning objectives', 'Pedagogy and examples', 'Assessment and answer guidance', 'Language and accessibility'];

function Workbench(): React.ReactElement {
  const { profile } = useAuth();
  const [grants, setGrants] = useState<ReviewerGrant[]>([]);
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [formal, setFormal] = useState<ReviewQueueItem[]>([]);
  const [target, setTarget] = useState<Target | null>(null);
  const [checks, setChecks] = useState<Record<string, string>>({});
  const [comments, setComments] = useState('');
  const [evidence, setEvidence] = useState('');
  const [recommendation, setRecommendation] = useState<'approve' | 'improve'>('improve');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    const db = await getSupabase(); if (!db || !profile) return;
    const [g, c, s, i] = await Promise.all([
      db.from('reviewer_grants').select('id,track,course_code,revoked_at').eq('subject_id', profile.id),
      fetchCatalog(), fetchContentStatus(),
      fetch('/content-index.json').then(r => r.ok ? r.json() : []).catch(() => []),
    ]);
    if (g.error || !c || !s) { setError(g.error?.message || 'Could not load the review queue.'); return; }
    setGrants((g.data ?? []) as ReviewerGrant[]); setCatalog(c);
    setTopics((i as Topic[]).filter(x => x.kind === 'topic' && !('coming_soon' in x && x.coming_soon)));
    setFormal(buildReviewQueue(s, i as ContentIndexEntry[]));
  }, [profile]);
  useEffect(() => { void load(); }, [load]);

  const scopedTopics = topics.filter(t => catalog && canReview(grants, courseTrack(catalog, t.course_code), t.course_code));
  const scopedFormal = formal.filter(f => catalog && canReview(grants, courseTrack(catalog, f.course_code), f.course_code));
  function select(t: Target): void { setTarget(t); setChecks({}); setComments(''); setEvidence(''); setRecommendation('improve'); setError(''); setNotice(''); }

  async function submit(e: React.FormEvent): Promise<void> {
    e.preventDefault(); if (!target || !profile) return;
    const criteria = Object.fromEntries(CRITERIA.map(c => [c, checks[c] || 'unverified']));
    if (Object.values(criteria).some(v => v === 'unverified')) { setError('Complete every criterion before submitting.'); return; }
    if (recommendation === 'approve' && Object.values(criteria).some(v => v !== 'pass')) { setError('An approval recommendation requires every criterion to pass.'); return; }
    const db = await getSupabase(); if (!db) return;
    const { error: submitError } = await db.from('review_submissions').insert({
      reviewer_id: profile.id, track: target.track, course_code: target.course_code,
      unit_no: target.unit_no, topic_no: target.topic_no, page_slug: target.page_slug || null, stage: target.stage,
      criteria, comments, recommendation, evidence_path: evidence || null,
    });
    if (submitError) setError(submitError.message);
    else { setNotice('Recommendation submitted to the admin. Formal G3/G5 status changes only after committed evidence passes Git gates.'); setTarget(null); }
  }

  return <main className="container auth-page margin-vert--lg">
    <h1>Review workbench</h1>
    <p>Choose a topic or a formal unit review within your grant. Read the source before completing the checklist.</p>
    <p><Link to="/app/reviewer/apply">Apply for another scope</Link>{' · '}<Link to="/app/admin/review-queue">Prepare formal G3/G5 evidence</Link></p>
    {error && <div className="alert alert--danger" role="alert">{error}</div>}
    {notice && <div className="alert alert--success" role="status">{notice}</div>}
    <h2>Formal G3/G5 queue</h2>
    {scopedFormal.length === 0 ? <p>No formal reviews in your scope are pending.</p> : <ul>{scopedFormal.map(f => <li key={`${f.course_code}-${f.unit_no}-${f.stage}`}>
      {f.course_code} Unit {f.unit_no} {f.stage}{' '}
      <button className="button button--sm button--secondary" onClick={() => { const track = courseTrack(catalog!, f.course_code); if (track) select({ track, course_code: f.course_code, unit_no: f.unit_no, topic_no: null, stage: f.stage, title: `${f.course_code} Unit ${f.unit_no} ${f.stage}`, permalink: f.en_route }); }}>Review</button>
    </li>)}</ul>}
    {grants.some(g => !g.revoked_at && g.track === 'licence' && g.course_code === null) && <>
      <h2>Teaching licence pages</h2><p>These page reviews are advisory while the licence topic-list evidence contract is being developed.</p>
      <ul>{licenceRegistry.headings.map(h => {
        const permalink = `/licence/pedagogy/${h.dir}/`;
        return <li key={h.id}>{h.title_en}{' '}<button className="button button--sm button--secondary" onClick={() => select({ track: 'licence', course_code: null, unit_no: null, topic_no: null, page_slug: permalink, stage: 'licence', title: h.title_en, permalink })}>Review</button></li>;
      })}</ul>
    </>}
    <h2>Topic queue</h2>
    {scopedTopics.length === 0 ? <p>No topics in your scope are available.</p> : <div className="table-scroll"><table><thead><tr><th>Course</th><th>Topic</th><th>Action</th></tr></thead><tbody>{scopedTopics.map(t => <tr key={`${t.course_code}-${t.unit_no}-${t.topic_no}`}><td>{t.course_code}</td><td>{t.title}</td><td><button className="button button--sm button--secondary" onClick={() => { const track = courseTrack(catalog!, t.course_code); if (track) select({ track, course_code: t.course_code, unit_no: t.unit_no, topic_no: t.topic_no, stage: 'topic', title: t.title, permalink: t.permalink }); }}>Review</button></td></tr>)}</tbody></table></div>}
    {target && <section className="work-panel"><h2>{target.title}</h2>
      {target.permalink && <p><a href={target.permalink} target="_blank" rel="noreferrer">Open source in a new tab</a></p>}
      <form className="work-form" onSubmit={e => void submit(e)}>
        {CRITERIA.map(c => <label key={c}>{c}<select className="input" required value={checks[c] || ''} onChange={e => setChecks(v => ({ ...v, [c]: e.target.value }))}><option value="">Select result</option><option value="pass">Pass</option><option value="fail">Needs improvement</option><option value="unverified">Cannot verify</option></select></label>)}
        <label>Specific comments and source locations <textarea className="input" required minLength={10} rows={5} value={comments} onChange={e => setComments(e.target.value)} /></label>
        {target.stage !== 'topic' && <label>Git evidence path, if prepared <input className="input" value={evidence} onChange={e => setEvidence(e.target.value)} /></label>}
        <label>Recommendation <select className="input" value={recommendation} onChange={e => setRecommendation(e.target.value as 'approve' | 'improve')}><option value="improve">Request improvement</option><option value="approve">Recommend approval</option></select></label>
        <button type="submit" className="button button--primary">Submit recommendation</button>
      </form>
    </section>}
  </main>;
}
export default function ReviewerWorkbenchPage(): React.ReactElement { return <Layout title="Review workbench"><ReviewerGuard><Workbench /></ReviewerGuard></Layout>; }
