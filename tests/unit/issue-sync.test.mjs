import { describe, expect, it } from 'vitest';
import { issueBody, labelsFor, parseTasks, taskFiles, writeBack } from '../../scripts/issue-sync.mjs';

const sample = `# Tasks

- [x] T001 Done thing
  - Stage: 0 | Area: ops | Type: new | Priority: p1 | Owner: no
- [ ] T010 Rename the navbar link (#12)
  - Stage: 2 | Area: navbar | Type: new | Priority: p1 | Owner: no
- [ ] T024 Fix Urdu figures
  - Stage: 5 | Area: figures | Type: carryover | Priority: p1 | Owner: yes
  - Source: specs/032 T008
  - Done when: every affected file matches.
- [-] T099 Superseded thing
- [ ] Plain unnumbered task
`;

describe('issue-sync (Feature 034)', () => {
  it('parses tasks, issue refs and metadata', () => {
    const t = parseTasks(sample);
    expect(t.map((x) => x.id)).toEqual(['T001', 'T010', 'T024', null]);
    expect(t[1]).toMatchObject({ done: false, issue: 12, title: 'Rename the navbar link' });
    expect(t[2].meta).toMatchObject({ stage: '5', area: 'figures', owner: 'yes' });
    expect(t[2].doneWhen).toBe('every affected file matches.');
  });

  it('derives labels and a body with an idempotency marker', () => {
    const t = parseTasks(sample)[2];
    expect(labelsFor(t)).toEqual(['area:figures', 'type:carryover', 'priority:p1', 'blocked:owner']);
    expect(issueBody('034-backlog-tracking', t)).toContain('<!-- task:034-backlog-tracking/T024 -->');
  });

  it('writes issue numbers back only where missing', () => {
    const out = writeBack(sample, new Map([['T010', 99], ['T024', 40]]));
    expect(out).toContain('- [ ] T010 Rename the navbar link (#12)\n');
    expect(out).toContain('- [ ] T024 Fix Urdu figures (#40)\n');
  });

  it('never scans course trackers under specs/content', () => {
    expect(taskFiles().some((f) => f.includes('/specs/content/'))).toBe(false);
  });
});
