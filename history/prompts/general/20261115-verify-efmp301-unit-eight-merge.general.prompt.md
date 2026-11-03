---
id: 20261115
title: Verify EFMP301 Unit Eight Merge
stage: general
date: 2026-11-03
surface: agent
model: GPT-6 Codex
feature: content-pipeline
branch: crew/efmp-301-u08-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: [codex, crew, efmp-301, unit-08, merge-verification]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/20261115-verify-efmp301-unit-eight-merge.general.prompt.md
tests:
  - git fetch origin && git merge origin/main (already up to date)
  - npm run check:content (13/13 PASS)
  - origin/main npm run check:content (12/13 PASS; missing static/content-status.json)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The delegated brief, preserved verbatim:

# Crew job efmp-301-u08-repair_en-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u08-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-301-u08-repair_en conflicts with main (specs/content/efmp-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-08/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (efmp-301-u08-repair_en, repair_en, claude) The Urdu Unit 8 files contain a mistranslated term "کاؤنٹرائزنگ" in place of "management" (for example in MCQ 2-3, RRQ 3, ERQ 5 and the topic-02 summary). It was out of scope for this English repair; a G5 or translation job should fix it.
- (efmp-301-u08-repair_en, repair_en, claude) The narrow-screen/A4 render check and fuller Seifert source passages are still owed by the owner, and the report marked this the final G3 cycle, so a fresh G3 run needs owner authorisation.
- (efmp-301-u08-review_en-conflict1, fix, agy_claude) The `check:content-status` gate fails on both this branch and origin/main because `static/content-status.json` was deleted; regenerating it requires `npm run build:content-status` but that is a separate fix job.
- (efmp-301-u08-review_en, review_en, codex) Owner action needed on untaught RRQ-10, unspecified ERQ word limits, and missing source/render evidence.
- (efmp-301-u08-review_en, review_en, codex) Owner action needed on untaught RRQ-10, unspecified ERQ word limits, and missing source/render evidence.


## Response snapshot

Fetched origin and attempted the requested merge. origin/main at cfc41817f4da5373f350b120cc7b79dea3437429 is already an ancestor of HEAD; Git reports Already up to date. No merge commit or conflict resolution is applicable. Preserved all three existing repair commits. Shared registries have no branch changes. All 13 content gates pass in the supplied checkout. A detached baseline inside .crew confirms main fails only check:content-status because its generated JSON is missing. No content, tracker, registry or evidence changes were necessary.

## Outcome

- ✅ Impact: Verified the existing Unit 8 repairs integrate with fetched main without conflicts.
- 🧪 Tests: Branch 13/13 PASS; detached main 12/13 PASS, with the documented missing generated status artifact.
- 📁 Files: Only this PHR was added. Scratch gate logs remain ignored under .crew.
- 🔁 Next prompts: Owner or translation job retains the earlier handoff obligations.
- 🧠 Reflection: The conflict described by the brief was absent in the actual fetched graph; an unnecessary merge commit was not fabricated.

## Handoff (for CEO and agents)

- Shipped / changed: Verified current main ancestry and a passing full content gate tier; committed this record.
- Decisions the team must respect: No G3/G5 certification, publication state or existing tracker status changed. No push or PR.
- Pending / next owner: Existing Urdu terminology and owner source/render/review-cycle obligations remain as stated in the brief; no new Unit 8 findings. The generated status artifact missing on main belongs to its separate job.
- Paperclip issues affected: No issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Stale conflict premise; main baseline lacks generated static/content-status.json while the supplied branch checkout has it.
- Graders run and results (PASS/FAIL): PASS: branch content tier, main ancestry, shared registry diff inspection. FAIL on main only: check:content-status.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No further implementation needed for this conflict job.
