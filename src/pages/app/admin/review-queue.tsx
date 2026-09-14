import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import ReviewerGuard from '@site/src/components/ReviewerGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { fetchContentStatus } from '@site/src/lib/contentStatus';
import {
  buildReviewQueue, buildCertification, buildTrackerRow, certificationPath,
  CERTIFICATION_CRITERIA, CERTIFICATION_COMMANDS,
  type ReviewQueueItem, type ContentIndexEntry, type Disposition,
  type CertificationCriterion, type CertificationFinding, type CriterionStatus,
} from '@site/src/lib/reviewQueue';

/**
 * The review surface (Spec 017 FR-004, T022-T024, T031-T032).
 *
 * Two things this page deliberately does not do:
 *
 * 1. **It writes nothing.** Certifying produces two downloads, which the
 *    reviewer commits through the ordinary PR flow (ADR-0015, FR-009). No
 *    `translation_status` changes, no gate is marked done, no row is written.
 *    `tests/unit/reviewQueue.test.mjs` asserts the module behind this page
 *    imports no Supabase client at all, so that claim is checked rather than
 *    promised.
 * 2. **It invents no digests.** The browser cannot see the repository, so
 *    `input_manifest` is read from the `manifest.json` the reviewer generated
 *    with `npm run review:evidence prepare`, and the deterministic checks are
 *    recorded as the exit codes the reviewer actually saw. Fabricating either
 *    would produce evidence that looks identical to real evidence, which is
 *    worse than having none.
 *
 * The queue itself comes from `static/content-status.json`, built from the
 * tracker files, so Postgres holds nothing about a gate outcome (Art. V.1).
 */

type DraftCriterion = { status: CriterionStatus; evidence: string };

const ACTIONS: { disposition: Disposition; label: string; hint: string }[] = [
  {
    disposition: 'pass',
    label: 'Certify',
    hint: 'Every criterion passes and no blocking or uncertain finding is open.',
  },
  {
    disposition: 'revise',
    label: 'Request revision',
    hint: 'Goes back to authoring. Art. VII §2 allows at most two repair cycles before escalation.',
  },
  {
    disposition: 'escalate',
    label: 'Escalate',
    hint: 'Reaches the curriculum owner, who keeps policy and escalation ownership under Art. VII §1. There is no separate inbox: an escalation is a committed certification whose disposition leaves the gate open, which the owner sees at the next gate run.',
  },
];

function download(filename: string, body: string, type: string): void {
  const url = window.URL.createObjectURL(new Blob([body], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

function ReviewQueueContent(): React.ReactElement {
  const { displayName } = useAuth();
  const [queue, setQueue] = useState<ReviewQueueItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ReviewQueueItem | null>(null);

  // Certification draft state.
  const [initials, setInitials] = useState('');
  const [manifest, setManifest] = useState<Record<string, string> | null>(null);
  const [manifestName, setManifestName] = useState<string | null>(null);
  const [g3Report, setG3Report] = useState('');
  const [supersedes, setSupersedes] = useState('');
  const [startedAt] = useState(() => new Date().toISOString());
  const [criteria, setCriteria] = useState<Record<string, DraftCriterion>>({});
  const [commands, setCommands] = useState<Record<string, number | ''>>({});
  const [findings, setFindings] = useState<CertificationFinding[]>([]);

  const load = useCallback(async () => {
    setError(null);
    const [status, indexRes] = await Promise.all([
      fetchContentStatus(),
      fetch('/content-index.json').then((r) => (r.ok ? r.json() : [])).catch(() => []),
    ]);
    if (!status) {
      setError('Could not read the content status report. Is the site built?');
      setQueue([]);
      return;
    }
    setQueue(buildReviewQueue(status, (indexRes as ContentIndexEntry[]) ?? []));
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const stageCriteria = useMemo(
    () => (selected ? CERTIFICATION_CRITERIA[selected.stage] : []),
    [selected],
  );

  function openUnit(item: ReviewQueueItem): void {
    setSelected(item);
    setError(null);
    setManifest(null);
    setManifestName(null);
    setG3Report('');
    setSupersedes('');
    setFindings([]);
    setCriteria(Object.fromEntries(
      CERTIFICATION_CRITERIA[item.stage].map((id) => [id, { status: 'unverified' as CriterionStatus, evidence: '' }]),
    ));
    setCommands(Object.fromEntries(CERTIFICATION_COMMANDS.map((name) => [name, ''])));
  }

  async function readManifestFile(file: File): Promise<void> {
    try {
      const parsed = JSON.parse(await file.text());
      const map = parsed?.input_manifest ?? parsed;
      if (!map || typeof map !== 'object' || Array.isArray(map)) {
        throw new Error('no input_manifest object found');
      }
      setManifest(map as Record<string, string>);
      setManifestName(file.name);
      setError(null);
    } catch (e) {
      setManifest(null);
      setManifestName(null);
      setError(`Could not read ${file.name}: ${(e as Error).message}. Expected the manifest.json written by "npm run review:evidence prepare".`);
    }
  }

  function certify(disposition: Disposition): void {
    if (!selected) return;
    try {
      const certification = buildCertification({
        course_code: selected.course_code,
        unit_no: selected.unit_no,
        stage: selected.stage,
        reviewer_id: initials.trim().toUpperCase(),
        input_manifest: manifest ?? {},
        commands: Object.entries(commands)
          .filter(([, code]) => code !== '')
          .map(([name, code]) => ({ name, exit_code: Number(code) })),
        criteria: stageCriteria.map<CertificationCriterion>((id) => ({
          id,
          status: criteria[id]?.status ?? 'unverified',
          evidence: (criteria[id]?.evidence ?? '').split('\n').map((l) => l.trim()).filter(Boolean),
        })),
        findings,
        disposition,
        started_at: startedAt,
        completed_at: new Date().toISOString(),
        ...(supersedes.trim() ? { supersedes: supersedes.trim() } : {}),
        ...(selected.stage === 'G5' && g3Report.trim() ? { g3_report: g3Report.trim() } : {}),
      });
      const runId = `${certification.completed_at.slice(0, 10)}-${certification.reviewer_id.toLowerCase()}-${Math.random().toString(36).slice(2, 8)}`;
      const path = certificationPath(certification, runId);
      download(`${runId}.json`, `${JSON.stringify(certification, null, 2)}\n`, 'application/json');
      download(`${runId}.tracker-row.txt`, `${buildTrackerRow(certification, path)}\n`, 'text/plain');
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <main className="container margin-vert--lg">
      <h1>Review queue</h1>
      <p>
        Units awaiting a G3 English review or a G5 Urdu review, derived from each course tracker.
        Certifying produces two files to commit; this page changes nothing by itself.
      </p>

      {error && <div className="alert alert--danger" role="alert">{error}</div>}

      {queue === null && <p>Loading…</p>}

      {queue !== null && queue.length === 0 && (
        <div className="alert alert--success" role="status">Nothing is awaiting review.</div>
      )}

      {queue !== null && queue.length > 0 && (
        <table>
          <thead>
            <tr><th>Course</th><th>Unit</th><th>Stage</th><th /></tr>
          </thead>
          <tbody>
            {queue.map((item) => (
              <tr key={`${item.course_code}-${item.unit_no}-${item.stage}`}>
                <td>{item.course_code}</td>
                <td>{item.unit_no}</td>
                <td>{item.stage}</td>
                <td>
                  <button
                    type="button"
                    className="button button--sm button--primary"
                    onClick={() => openUnit(item)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selected && (
        <section className="margin-top--lg">
          <h2>{selected.course_code} Unit {selected.unit_no} - {selected.stage}</h2>

          {/* T023 - side by side for G5, with plain links beside each frame so
              the comparison still works where frames are blocked. */}
          {selected.stage === 'G5' && selected.en_route && selected.ur_route && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {([['English', selected.en_route], ['Urdu', selected.ur_route]] as const).map(([label, route]) => (
                <div key={label} style={{ flex: '1 1 20rem', minWidth: 0 }}>
                  <p><strong>{label}</strong> - <a href={route} target="_blank" rel="noreferrer">open in a new tab</a></p>
                  <iframe title={`${label} source`} src={route} style={{ width: '100%', height: '32rem', border: '1px solid var(--ifm-color-emphasis-300)' }} />
                </div>
              ))}
            </div>
          )}

          {selected.stage === 'G3' && selected.en_route && (
            <p><a href={selected.en_route} target="_blank" rel="noreferrer">Open the English unit in a new tab</a></p>
          )}

          {!selected.en_route && (
            <div className="alert alert--warning" role="alert">
              This unit is authored but has no entry in the content index, so there is no route to open.
            </div>
          )}

          <h3>Evidence</h3>
          <p>
            Run <code>npm run review:evidence prepare {selected.course_code} {selected.unit_no} {selected.stage} &lt;dir&gt;</code>,
            then attach the <code>manifest.json</code> it writes. The digests come from the file, never from this page.
          </p>
          <label className="auth-tap-target">
            <span>manifest.json</span>{' '}
            <input
              type="file"
              accept="application/json,.json"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) void readManifestFile(f); }}
            />
          </label>
          {manifest && (
            <p>
              <strong>{manifestName}</strong>: {Object.keys(manifest).length} input(s) digested.
            </p>
          )}

          <h3>Deterministic checks</h3>
          <p>Record the exit code you saw for each. A certification cannot pass with a missing or non-zero one.</p>
          <table>
            <thead><tr><th>Command</th><th>Exit code</th></tr></thead>
            <tbody>
              {CERTIFICATION_COMMANDS.map((name) => (
                <tr key={name}>
                  <td><code>{name}</code></td>
                  <td>
                    <input
                      className="input"
                      type="number"
                      aria-label={`Exit code for ${name}`}
                      value={commands[name] ?? ''}
                      onChange={(e) => setCommands((c) => ({ ...c, [name]: e.target.value === '' ? '' : Number(e.target.value) }))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Criteria</h3>
          <table>
            <thead><tr><th>Criterion</th><th>Verdict</th><th>Evidence (one locator per line)</th></tr></thead>
            <tbody>
              {stageCriteria.map((id) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>
                    <select
                      className="input"
                      aria-label={`Verdict for ${id}`}
                      value={criteria[id]?.status ?? 'unverified'}
                      onChange={(e) => setCriteria((c) => ({ ...c, [id]: { ...c[id], status: e.target.value as CriterionStatus } }))}
                    >
                      <option value="pass">pass</option>
                      <option value="fail">fail</option>
                      <option value="unverified">unverified</option>
                    </select>
                  </td>
                  <td>
                    <textarea
                      className="input"
                      aria-label={`Evidence for ${id}`}
                      rows={2}
                      value={criteria[id]?.evidence ?? ''}
                      onChange={(e) => setCriteria((c) => ({ ...c, [id]: { ...c[id], evidence: e.target.value } }))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Findings</h3>
          {findings.map((finding, i) => (
            <div key={i} className="margin-bottom--sm" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <select
                className="input"
                aria-label={`Severity for finding ${i + 1}`}
                value={finding.severity}
                onChange={(e) => setFindings((f) => f.map((x, j) => (j === i ? { ...x, severity: e.target.value as CertificationFinding['severity'] } : x)))}
              >
                <option value="blocking">blocking</option>
                <option value="uncertain">uncertain</option>
                <option value="advisory">advisory</option>
              </select>
              <input
                className="input"
                style={{ flex: '1 1 16rem' }}
                aria-label={`Message for finding ${i + 1}`}
                value={finding.message}
                onChange={(e) => setFindings((f) => f.map((x, j) => (j === i ? { ...x, message: e.target.value } : x)))}
              />
              <label className="auth-tap-target">
                <input
                  type="checkbox"
                  checked={finding.resolved}
                  aria-label={`Finding ${i + 1} resolved`}
                  onChange={(e) => setFindings((f) => f.map((x, j) => (j === i ? { ...x, resolved: e.target.checked } : x)))}
                />{' '}resolved
              </label>
            </div>
          ))}
          <button
            type="button"
            className="button button--sm button--secondary"
            onClick={() => setFindings((f) => [...f, { severity: 'advisory', message: '', resolved: false }])}
          >
            Add a finding
          </button>

          <h3>Identity</h3>
          <label className="auth-tap-target">
            <span>Your initials</span>{' '}
            <input
              className="input"
              aria-label="Reviewer initials"
              value={initials}
              placeholder={displayName ? displayName.slice(0, 2).toUpperCase() : 'AB'}
              onChange={(e) => setInitials(e.target.value)}
            />
          </label>
          <p>
            One to five capitals, matching your entry in{' '}
            <code>specs/reviewers/human-reviewers.md</code>. Never an agent identity.
          </p>

          {selected.stage === 'G5' && (
            <>
              <h3>The G3 this binds to</h3>
              <p>
                Art. VII §4: a G5 binds to accepted G3 evidence for the same English version.
                Paste the path of this unit&apos;s accepted G3 certification.
              </p>
              <input
                className="input"
                style={{ width: '100%' }}
                aria-label="Accepted G3 certification path"
                value={g3Report}
                placeholder={`specs/content/${selected.course_code.toLowerCase()}/reviews/unit-${String(selected.unit_no).padStart(2, '0')}/G3/<run-id>.json`}
                onChange={(e) => setG3Report(e.target.value)}
              />
            </>
          )}

          <h3>Superseding an earlier attempt</h3>
          <input
            className="input"
            style={{ width: '100%' }}
            aria-label="Run id this supersedes"
            value={supersedes}
            placeholder="run-id of a prior attempt, or leave blank"
            onChange={(e) => setSupersedes(e.target.value)}
          />

          <h3>Disposition</h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {ACTIONS.map((action) => (
              <button
                key={action.disposition}
                type="button"
                className={`button button--sm ${action.disposition === 'pass' ? 'button--primary' : 'button--secondary'}`}
                title={action.hint}
                onClick={() => certify(action.disposition)}
              >
                {action.label}
              </button>
            ))}
          </div>
          <ul>
            {ACTIONS.map((action) => (
              <li key={action.disposition}><strong>{action.label}</strong> - {action.hint}</li>
            ))}
          </ul>

          <div className="alert alert--info" role="note">
            Each action downloads the certification and its tracker row. Applying them is a commit
            you make, through the ordinary pull request flow - this page writes nothing to Git, to
            the database, or to any <code>translation_status</code>.
          </div>
        </section>
      )}
    </main>
  );
}

export default function ReviewQueuePage(): React.ReactElement {
  return (
    <Layout
      title="Review queue"
      description="Units awaiting a G3 English or G5 Urdu content review, for qualified reviewers."
    >
      <ReviewerGuard>
        <ReviewQueueContent />
      </ReviewerGuard>
    </Layout>
  );
}
