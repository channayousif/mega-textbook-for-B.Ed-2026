---
id: 20261118
title: Stop OCI Object Storage charge by deleting old Hestia archive
stage: general
date: 2026-11-03
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: none
labels: [board-direct, ops, oci, billing]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/20261118-stop-oci-object-storage-charge.general.prompt.md
tests:
  - none
---

## Prompt

today i was billed B91628 OBJECTSTORE  Object Storage - Storage    GB Months    0.006624    12.31    0.081569947    0    0.081569947
why we are moving to paid tier, wile we can avoid it. investigate

## Response snapshot

Investigated the Toronto tenancy (ca-toronto-1) read-only. There is only one bucket,
`textbook-db-backups` (Standard tier, 14.3 GB, no versioning, no lifecycle policy). The usage
API showed about 0.42 GB-months used per day against the 10 GB-month Standard free allowance.
October's allowance ran out on 2026-10-26, and 10-26 to 10-31 were billed (about 0.015 SGD a
day). 11.73 GB of the bucket was one object, `hestia-archive/a2ahs.2026-09-11_05-29-54.tar`
(the old a2ahs.com Hestia backup, uploaded 2026-09-29, with no retention). The DB backups
(`supabase/`, `base/`, `wal/`, about 2.6 GB) are already pruned by `~/bin/supabase-backup.sh`
(60 days) and `~/bin/pg-basebackup.sh` (7 days). The owner ruled that the archive be deleted
outright. It was deleted, and the bucket now holds 2.57 GB (sum of object sizes).

## Outcome

- ✅ Impact: Object Storage is back under the free tier. November should cost nothing.
- 🧪 Tests: none (the sum of object sizes after deletion is 2571021151 bytes)
- 📁 Files: this PHR only (no repository or script changes)
- 🔁 Next prompts: check the Object Storage COST line in the usage API at the end of November
- 🧠 Reflection: one-off archives left in the backups bucket quietly use up the free allowance

## Handoff (for CEO and agents)

- Shipped / changed: deleted `oci://textbook-db-backups/hestia-archive/a2ahs.2026-09-11_05-29-54.tar` (11.73 GB, owner ruling 2026-11-03).
- Decisions the team must respect: `textbook-db-backups` holds DB backups only. Do not upload one-off archives to Toronto Object Storage; the free tier is 10 GB Standard per month.
- Pending / next owner: none. October's charge of about 0.08 SGD was already incurred.
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: a large unretained object pushed the bucket over the free allowance with no alert.
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): if DB dump growth nears 10 GB, shorten KEEP_REMOTE_DAYS.
