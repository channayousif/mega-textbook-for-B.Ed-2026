# Phase 1 Data Model: The reviewer role

Three things live in Postgres and one deliberately does not.

## 1. `profiles.reviewer` - the capability

```sql
alter table public.profiles
  add column reviewer boolean not null default false;
```

Mirrors `verified_teacher` exactly (`0002_profiles.sql:32`). Default off. Granted only by an admin;
`guard_privileged_columns` rejects any other writer, as it already does for `role` and
`verified_teacher`.

**Invariant**: holding `reviewer` grants no authoring, granting or editing right. It grants the
ability to certify a review and to read what is needed to do so, and nothing else.

## 2. `audit_change` gains `'reviewer'`

```sql
alter type public.audit_change add value 'reviewer';
```

The enum is `('role', 'verified_teacher', 'status')` in `0001_enums.sql`. Every grant **and
revocation** writes a `privilege_audit` row with `subject_id`, `actor_id` and timestamp, so the
question "who made this person a reviewer, and when" always has an answer. That table references
`profiles` rather than `auth.users` precisely so the history survives account deletion.

## 3. `is_reviewer(uid)` - the single point of control

```sql
create or replace function public.is_reviewer(uid uuid default auth.uid())
returns boolean language sql stable security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.profiles p
    where p.auth_user_id = uid
      and p.reviewer = true
      and p.status = 'active'
      and p.deleted_at is null
  );
$$;
```

The `status` and `deleted_at` tests live **here**, not in each policy, for the reason
`0004_is_admin.sql` gives for `is_admin`: a suspension then takes effect everywhere at once, and a
policy written later cannot forget it.

**Who calls it.** No policy does, and that is not an oversight: this feature creates no policy,
because certifying produces a file rather than a row. The caller is the review surface, over RPC,
so that a suspended holder is refused by the database rather than by a cached column in the
browser. The helper is also the point any future policy would attach to, which is why the status
test belongs in it now rather than later. spec.md's **Enforcement posture** section says what the
capability does and does not control.

## 4. Queue state - derived, and therefore not in Postgres at all

Which units await review. An earlier draft of this section said Postgres owned this as "ephemeral"
state while giving it no schema, and the plan's Technical Context budgeted no table to put it in.
Resolved in favour of deriving it: `scripts/report-content-status.mjs` already reduces the tracker
files to a per-unit fact table in `static/content-status.json`, so it emits per-unit G3/G5 gate
state alongside everything else it emits, and the queue is built from that in the browser.

This is not a smaller table, it is the absence of one. There is no row to go stale, no claim to
reconcile, and nothing about a **gate outcome** in Postgres, which is what Art. V.1 asks for.
"Which unit a reviewer currently has open" is simply not tracked: two reviewers opening the same
unit produce two certifications, and a later one names the earlier in `supersedes`. That is a
better outcome than a lock, because the second review is evidence rather than a collision.

## The certification artefact - Git, not Postgres

A certification is a file, not a row:

```
specs/content/<course>/reviews/unit-NN/<stage>/<run-id>.json
```

in the shape the agent path already writes, and referenced from the tracker row as
`review:<path>`. See [contracts/certification.md](./contracts/certification.md).

**Why it is not a table.** Art. V.1 keeps gate outcomes in version control; a table would make
Postgres authoritative for one. And a human certification in the agent's own format is directly
usable as a G5 comparator, which is what agent qualification is blocked on. A table would need an
export step to produce the same thing, so storing it as a file removes work rather than adding it.

**Append-only comes free.** A superseded certification is a prior commit. There is no soft-delete
column to forget, and no way to quietly overwrite a judgement.

## `specs/reviewers/human-reviewers.md` - the qualification record

Owner-maintained Markdown, one entry per reviewer: initials, scope (courses and stages),
qualification evidence, date, status. **Not a gate input** - `validateAgentTrackerRow` already
accepts human initials with no lookup. It is plain Markdown rather than the agent path's signed
JSON registry because the signature answers a threat a named person in Git history does not pose.
