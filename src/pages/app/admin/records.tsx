import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import { getSupabase } from '@site/src/lib/supabase';

type Person = { id: string; full_name: string | null; email: string | null; role: string; status: string; deleted_at: string | null };
type ClassRow = { id: string; name: string; course_code: string; teacher_id: string; status: string };
type Enrollment = { id: string; student_id: string; status: string; joined_at: string };
type Progress = { id: string; course_code: string; unit_no: number; method: string };

function Records(): React.ReactElement {
  const [people, setPeople] = useState<Person[]>([]);
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [classId, setClassId] = useState('');
  const [personId, setPersonId] = useState('');
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [error, setError] = useState('');
  const [classNote, setClassNote] = useState('');
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    const db = await getSupabase(); if (!db) return;
    const [p,c,u] = await Promise.all([
      db.from('profiles').select('id,full_name,role,status,deleted_at').is('deleted_at',null).order('full_name'),
      db.from('classes').select('id,name,course_code,teacher_id,status').order('created_at',{ascending:false}),
      db.functions.invoke('admin-list-users', { method: 'GET' }),
    ]);
    if (p.error || c.error) setError(p.error?.message || c.error?.message || 'Could not load records.');
    else { const emails = new Map(((u.data as { users?: Person[] })?.users ?? []).map(x => [x.id, x.email])); setPeople(((p.data ?? []) as Person[]).map(x => ({ ...x, email: emails.get(x.id) ?? null }))); setClasses((c.data ?? []) as ClassRow[]); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => { if (!classId) { setEnrollments([]); return; } void getSupabase().then(async db => { if (!db) return; const { data,error:e } = await db.from('enrollments').select('id,student_id,status,joined_at').eq('class_id',classId); if(e) setError(e.message); else setEnrollments((data ?? []) as Enrollment[]); }); }, [classId]);
  useEffect(() => { if (!personId) { setProgress([]); return; } void getSupabase().then(async db => { if (!db) return; const { data,error:e } = await db.from('unit_progress').select('id,course_code,unit_no,method').eq('student_id',personId); if(e) setError(e.message); else setProgress((data ?? []) as Progress[]); }); }, [personId]);
  const label = (id: string) => { const p = people.find(x => x.id === id); return p?.full_name || p?.email || id; };
  const selectedClass = classes.find(c => c.id === classId);
  const selectedPerson = people.find(p => p.id === personId);
  async function changeClassStatus(): Promise<void> {
    if (!selectedClass) return;
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    const { error: e } = await db.rpc('admin_set_class_status', { p_id: selectedClass.id, p_archive: selectedClass.status === 'active', p_note: classNote });
    setBusy(false); if (e) setError(e.message); else { setClassNote(''); await load(); }
  }
  return <main className="container auth-page margin-vert--lg"><p><Link to="/app/admin/">Admin dashboard</Link></p>
    <h1>Classes and learner records</h1><p>Select a record to inspect it. This view uses your admin access and does not enter another person&apos;s session.</p>
    {error && <div className="alert alert--danger" role="alert">{error}</div>}
    <div className="work-grid"><section className="work-panel"><h2>Class</h2>
      <label>Select class <select className="input" value={classId} onChange={e => setClassId(e.target.value)}><option value="">Choose a class</option>{classes.map(c => <option key={c.id} value={c.id}>{c.name} | {c.course_code}</option>)}</select></label>
      {selectedClass && <><p>Teacher: {label(selectedClass.teacher_id)} | Status: {selectedClass.status}</p>
        <label>Reason for class action <textarea className="input" rows={2} value={classNote} onChange={e => setClassNote(e.target.value)} /></label>
        <p><button className="button button--sm button--secondary" disabled={busy || classNote.trim().length < 5} onClick={() => void changeClassStatus()}>{selectedClass.status === 'active' ? 'Archive selected class' : 'Reactivate selected class'}</button></p>
        <h3>Roster</h3>{enrollments.length === 0 ? <p>No enrollment records.</p> : <ul>{enrollments.map(e => <li key={e.id}>{label(e.student_id)} | {e.status} | {new Date(e.joined_at).toLocaleDateString()}</li>)}</ul>}</>}
    </section><section className="work-panel"><h2>Student or teacher</h2>
      <label>Select person <select className="input" value={personId} onChange={e => setPersonId(e.target.value)}><option value="">Choose a person</option>{people.map(p => <option key={p.id} value={p.id}>{p.full_name || p.email || p.id} | {p.role}</option>)}</select></label>
      {selectedPerson && <><p>Role: {selectedPerson.role} | Status: {selectedPerson.status}</p>
        {selectedPerson.role === 'student' && <><h3>Unit progress</h3>{progress.length === 0 ? <p>No units recorded.</p> : <ul>{progress.map(p => <li key={p.id}>{p.course_code} Unit {p.unit_no} | {p.method}</li>)}</ul>}</>}
        {selectedPerson.role === 'teacher' && <><h3>Classes taught</h3>{classes.filter(c => c.teacher_id === personId).length === 0 ? <p>No classes.</p> : <ul>{classes.filter(c => c.teacher_id === personId).map(c => <li key={c.id}>{c.name} | {c.course_code}</li>)}</ul>}</>}
        <p><Link to="/app/admin/users">Manage account</Link>{' · '}<Link to={`/app/admin/reviewers?user=${personId}`}>Manage reviewer scopes</Link></p></>}
    </section></div>
  </main>;
}
export default function AdminRecordsPage(): React.ReactElement { return <Layout title="Admin records"><OwnerConsoleGuard><Records /></OwnerConsoleGuard></Layout>; }
