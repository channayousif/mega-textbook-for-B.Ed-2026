import { describe, it, expect } from 'vitest';
import { draftPrAction } from '../../scripts/lib/agent-job-pr.mjs';

describe('agent draft PR publishing', () => {
  const id = '123e4567-e89b-12d3-a456-426614174000';
  const branch = `agent/job-${id}`;
  it('requests a draft PR for a new branch', () => {
    expect(draftPrAction(null, branch, id, '/tmp/body.md').args).toEqual([
      'pr','create','--draft','--head',branch,'--title',`Agent improvement ${id}`,'--body-file','/tmp/body.md',
    ]);
  });
  it('reuses an existing draft and refuses a published PR', () => {
    const pr = { url: 'https://github.com/example/repo/pull/12', isDraft: true };
    expect(draftPrAction(pr, branch, id, '').args).toBeNull();
    expect(draftPrAction(pr, branch, id, '').url).toBe(pr.url);
    expect(() => draftPrAction({ ...pr, isDraft: false }, branch, id, '')).toThrow(/not a draft/);
  });
});
