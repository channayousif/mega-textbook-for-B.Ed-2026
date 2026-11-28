---
id: 20261314
title: Content Pack v2 Stage 1 data model
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: 038-content-pack-v2
branch: feature/038-stage1-data-model
user: M Yousif Channa
command: board-direct session
labels: ["board-direct", "media-studio", "content-pack", "supabase"]
links:
  spec: specs/038-content-pack-v2/spec.md
  ticket: null
  adr: history/adr/0040-content-pack-v2-supersedes-the-teaser-model.md
  pr: null
files:
 - supabase/migrations/0060_content_packs.sql
 - tests/rls/content-packs.test.mjs
 - tests/unit/media-pack-data.test.mjs
 - tests/profile-dependents.mjs
 - specs/studio/studio-manifest.schema.json
 - specs/studio/media-job.schema.json
 - scripts/media/states.mjs
 - scripts/media/brand.mjs
 - scripts/check-studio-manifest.mjs
 - specs/038-content-pack-v2/tasks.md
tests:
 - scripts/heavy.sh npx vitest run (6 focused files, 53 pass, 11 new)
 - migration 0060 dry run on live supabase-db inside begin/rollback (valid; anon cannot execute RPCs; authenticated cannot insert; non-admin create refused; nothing left behind)
 - check-studio-manifest, check-docs-sync, check:no-em-dash pass
---

## Prompt

approve plan, stage 1, run adr

## Response snapshot

Stage 1 of Feature 038. Migration 0060 adds `content_packs` (one row per topic, twelve stage statuses,
links, Flow watermark-toggle status) and the append-only `content_pack_events`, admin-read RLS, no
client writes, four security-definer RPCs (create, set stage, set link, set watermark) that check
`is_admin()` first and log, and a private `content-pack-uploads` bucket (50 MB, images, PDF, pptx,
subtitle and text files, no video because block storage is at the free cap; path
`{pack}/{stage}/{file}`). Manifest gains `longform`, `short`, `infographic`, `deck_pdf`, playlist,
related video (required for a placed short), chapters (start at 00:00), captions and audio tracks;
media kinds `video.longform`/`video.short` (scripted path) and `doc.infographic`; `playlistFor()` in
brand.mjs. The Studio checker skips text checks on binary pack assets. None of these files is a
bound review input, so no G2 evidence goes stale. The migration is not applied live yet.

## Outcome

- ✅ Impact: the data model for packs exists and is tested; the admin page (Stage 6) can build on it.
- 🧪 Tests: 53 focused vitest pass; live dry run clean; RLS test waits for the live migration.
- 📁 Files: listed above.
- 🔁 Next prompts: owner go-ahead to apply 0060 live, then `npm run test:rls -- content-packs`; Stage 2 cast.
- 🧠 Reflection: a begin/rollback dry run on the live database validates a migration with no lasting change.

## Handoff (for CEO and agents)

- Shipped / changed: migration 0060 (unapplied), pack kinds in schemas and states, playlist map.
- Decisions the team must respect: pack video never goes into Supabase storage; all pack writes go through the RPCs.
- Pending / next owner: owner approves applying 0060 to live Supabase (psql --single-transaction on supabase-db, then NOTIFY pgrst). Rollback: `drop table public.content_pack_events, public.content_packs cascade; drop function public.create_content_pack(text,integer,integer,text,text), public.set_content_pack_stage(uuid,text,text,text), public.set_content_pack_link(uuid,text,jsonb), public.set_content_pack_watermark(uuid,text), public.content_pack_stage_keys(); drop policy content_pack_uploads_select on storage.objects; drop policy content_pack_uploads_insert on storage.objects; drop policy content_pack_uploads_delete on storage.objects; delete from storage.buckets where id = 'content-pack-uploads';`
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the worktree had no node_modules (symlinked from the main checkout after confirming the same lockfile).
- Graders run and results (PASS/FAIL): vitest PASS, dry run PASS, content checks PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): run the RLS test right after the live apply.
