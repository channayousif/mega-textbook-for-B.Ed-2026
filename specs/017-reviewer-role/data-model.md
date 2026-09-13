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

## 4. Queue state - ephemeral, and the only thing Postgres owns here

Which units await review, and which a reviewer currently has open. Safe to lose: it can be rebuilt
from the tracker files and the content index. Nothing about a **gate outcome** is stored in
Postgres.

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
