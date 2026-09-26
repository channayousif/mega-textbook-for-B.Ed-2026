import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import AuthGuard from '@site/src/components/AuthGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { getSupabase } from '@site/src/lib/supabase';
import { fetchCatalog, type Catalog } from '@site/src/lib/catalog';

function ApplicationForm(): React.ReactElement {
  const { profile } = useAuth();
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [track, setTrack] = useState<'bed' | 'licence'>('bed');
  const [course, setCourse] = useState('');
  const [evidence, setEvidence] = useState('');
  const [message, setMessage] = useState('');
  const [applications, setApplications] = useState<{ id: string; track: string; course_code: string | null; status: string }[]>([]);
  useEffect(() => { void fetchCatalog().then(setCatalog).catch(() => setMessage('Could not load course catalog.')); }, []);
  useEffect(() => {
    if (!profile) return;
    void getSupabase().then(async db => { if (!db) return; const { data } = await db.from('reviewer_applications').select('id,track,course_code,status').eq('applicant_id', profile.id); setApplications(data ?? []); });
  }, [profile]);
  const courses = track === 'bed' ? catalog?.semesters.flatMap(s => s.courses) ?? [] : catalog?.tracks?.find(t => t.id === 'licence')?.courses ?? [];
  async function submit(e: React.FormEvent): Promise<void> {
    e.preventDefault(); if (!profile) return;
    const db = await getSupabase(); if (!db) return;
    const { error } = await db.from('reviewer_applications').insert({ applicant_id: profile.id, track, course_code: course || null, qualification_evidence: evidence });
    setMessage(error ? error.message : 'Application submitted. An admin will review your evidence.');
    if (!error) { setEvidence(''); const { data } = await db.from('reviewer_applications').select('id,track,course_code,status').eq('applicant_id', profile.id); setApplications(data ?? []); }
  }
  return <main className="container auth-page margin-vert--lg"><h1>Apply to review content</h1>
    <p>Request access to one track or a single course. Approval depends on recorded qualification evidence.</p>
    <form className="work-form" onSubmit={e => void submit(e)}>
      <label>Track <select className="input" value={track} onChange={e => { setTrack(e.target.value as 'bed' | 'licence'); setCourse(''); }}><option value="bed">B.Ed</option><option value="licence">Teaching licence</option></select></label>
      {track === 'bed' && <label>Course <select className="input" value={course} onChange={e => setCourse(e.target.value)}><option value="">All B.Ed courses</option>{courses.map(c => <option key={c.code} value={c.code}>{c.code} - {c.title_en}</option>)}</select></label>}
      {track === 'licence' && <p>The teaching licence is a topic list with no course codes. This application covers the track.</p>}
      <label>Qualifications and examples of review work <textarea className="input" required minLength={20} rows={5} value={evidence} onChange={e => setEvidence(e.target.value)} /></label>
      <button className="button button--primary" type="submit">Submit application</button>
    </form>
    {message && <p role="status">{message}</p>}
    <h2>Your applications</h2>{applications.length === 0 ? <p>No applications yet.</p> : <ul>{applications.map(a => <li key={a.id}>{a.track} {a.course_code ?? 'all courses'}: {a.status}</li>)}</ul>}
    <p><Link to="/app/reviewer/workbench">Open review workbench</Link></p>
  </main>;
}
export default function ReviewerApplyPage(): React.ReactElement { return <Layout title="Apply to review"><AuthGuard><ApplicationForm /></AuthGuard></Layout>; }
