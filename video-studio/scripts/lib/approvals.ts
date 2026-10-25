// Append-only approvals log: episodes/<id>/approvals.jsonl (VS-004 PI002/PI003).
// Only scripts/approve.ts (owner TTY) and the Studio gate route (owner token) may append.
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { episodeDir } from './paths.ts';
import { GATES, type ApprovalEvent } from './invalidation.ts';

export const approvalsPath = (id: string) => join(episodeDir(id), 'approvals.jsonl');

export function readApprovals(id: string): ApprovalEvent[] {
  const p = approvalsPath(id);
  if (!existsSync(p)) return [];
  return readFileSync(p, 'utf8').split('\n').filter(Boolean).map((line, i) => {
    const e = JSON.parse(line) as ApprovalEvent;
    if (!GATES.includes(e.gate)) throw new Error(`${p}:${i + 1}: unknown gate ${e.gate}`);
    return e;
  });
}

export function appendApproval(id: string, event: ApprovalEvent): void {
  appendFileSync(approvalsPath(id), JSON.stringify(event) + '\n', { encoding: 'utf8', flag: 'a' });
}
