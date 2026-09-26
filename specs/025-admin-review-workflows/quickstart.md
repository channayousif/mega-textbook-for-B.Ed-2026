# Admin review and agent job workflow

## Deployment order

Apply `supabase/migrations/0046_scoped_review_and_agent_jobs.sql` and
`0047_admin_moderation_audit.sql` and `0048_review_course_scope_sync.sql` before deploying
the new dashboard. The first migration
keeps the old `profiles.reviewer` column and its audit entries for
history, but `is_reviewer()` now depends on an active scoped grant. Existing holders must apply
or receive a direct scoped grant with qualification evidence. No blanket migration of the old
boolean is safe because its course scope was never recorded.

Deploy the site and run the normal content gates. No browser route stores answer keys or formal
review status. G3/G5 review recommendations in Postgres are advisory. A formal review requires
the existing Git certification, tracker row and gate checks before publication status changes.
The licence track currently has no course codes (Feature 024). Its heading-page reviews are
advisory until a topic-list evidence contract exists.

## Host heartbeat contract

The trusted heartbeat host holds `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `gh` authentication,
and `AGENT_HOST_CONFIGS_FILE`. Do not put those credentials in the dashboard or Git. The config
file is a JSON array of installed, allowed provider/name pairs, for example:

```json
[
  { "provider": "claude", "host_config_name": "default" },
  { "provider": "codex", "host_config_name": "default" },
  { "provider": "antigravity", "host_config_name": "default" },
  { "provider": "opencode", "host_config_name": "default" }
]
```

The host maps each pair to its own installed CLI profile. The database stores names only. Run
`npm run agent:job -- sync-catalog` and `npm run agent:job -- sync-configs` from the deployed
main branch at heartbeat startup. The first command updates course scopes when the Git catalog
changes; the second makes the admin settings page list those
choices. Then run `npm run agent:job -- claim`. It returns one approved job JSON, `null` for an
empty queue, or `{ "status": "failed", "job_id": "..." }` if the selected host configuration
is unavailable. A claim includes a secret `claim_token`; do not post it to a PR.

Create or reuse the job's `branch_name` on the host and give the job instructions to the selected
agent. Report `running` to renew the 45-minute lease:

```bash
npm run agent:job -- report JOB_ID CLAIM_TOKEN running
```

On failure, write a JSON file such as `{ "error_text": "reason", "checks": { "content": "failed" } }`
and run `npm run agent:job -- report JOB_ID CLAIM_TOKEN failed result.json`. Admins can retry a
failed job from the dashboard. The same branch and job ID are reused. Expired leases can be
claimed again with a new token, and the old token cannot report over the new attempt.

On success, run relevant gates and write `result.json` with a nonempty `diff_summary` and a
`checks` object containing actual command outcomes. With the job branch checked out:

```bash
npm run agent:job -- publish JOB_ID CLAIM_TOKEN result.json
```

`publish` pushes that branch, reuses its existing **draft** PR when retrying, or opens one with
`gh pr create --draft`. It then reports the PR URL, diff summary and checks to the dashboard.
It refuses an existing non-draft PR. The job remains claimed if PR creation fails, so the
heartbeat should report the error before the lease expires. Admins can use **Manual export**
when the agent is unavailable. Export does not claim a job or change publication status.

Antigravity implementation and review must use separate fresh runs. The implementation run may
open only a draft PR; it never certifies its own changes. See `AGENTS.md` and the pending ADR
proposal in `specs/decisions/adr-proposals.md`.
