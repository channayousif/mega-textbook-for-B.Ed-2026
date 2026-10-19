---
id: 523
title: Unit two merge content gates
stage: misc
date: 2026-10-19
surface: agent
model: GPT-6
feature: efmp-305
branch: crew/efmp-305-u02-repair_en
user: crew
command: Read and execute .crew/brief.md
labels: ["board-direct", "crew", "codex", "repair_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-305/523-unit-two-merge-content-gates.misc.prompt.md
  - static/content-status.json (generated, git-ignored)
tests:
  - npm run build:content-status
  - npm run check:content
  - git diff origin/main -- glossary.json specs/decisions/log.md specs/gaps.md specs/content/terminology.csv
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief read at execution:

# Crew job efmp-305-u02-repair_en-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u02-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Merged onto main's latest state, crew/efmp-305-u02-repair_en fails npm run check:content (it could not join the hourly batch):
✗ static/content-status.json is missing. Run: npm run build:content-status Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-305 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (efmp-305-u02-repair_en, repair_en, claude) Urdu topic 2.2 Further reading has the corrected Florian citation and DOI link, but the Urdu description line was left as it was; G5 should check it.
- (efmp-305-u02-repair_en, repair_en, claude) `static/content-status.json` is git-ignored and goes stale after any edit; run `npm run build:content-status` before `check:content`.
- (efmp-305-u02-translate-r1, translate, agy) All 4 .ur.svg figure variants are wired in topics 1 and 2 with exact carrier alt matching SVG desc tags.
- (efmp-305-u02-translate-r1, translate, agy) All 5 key_terms in index.mdx are bound to terminology.csv; translation_status stays draft pending independent G5.
- (efmp-305-u02-translate-r1, translate, agy) Proposed terms for owner: learner diversity (متعلمین کا تنوع), impairment (خرابی), handicap (ہینڈی کیپ / ماحولیاتی رکاوٹ), labelling (لیبلنگ / منفی ٹھپا لگانا), stigma (داغ / عیب).


## Response snapshot

Fetched origin and merged origin/main without conflicts, preserving earlier Unit 2 repairs. The shared registries exactly match main. Regenerated the missing ignored content-status artifact. All 13 content gates passed.

## Outcome

- ✅ Impact: Merge committed as ffb49f01; earlier content repairs preserved.
- 🧪 Tests: Content-status generation passed; npm run check:content passed all 13 gates; git diff --check passed.
- 📁 Files: Merge plus mandatory PHR; regenerated ignored status artifact.
- 🔁 Next prompts: No further implementation required for this brief.
- 🧠 Reflection: A missing generated artifact requires regeneration rather than a gate-script change.

## Handoff (for CEO and agents)

- Shipped / changed: Merged latest origin/main and restored local content-status artifact.
- Decisions the team must respect: No review certification, publication, shared-registry edits or content rewrites. No push or PR.
- Pending / next owner: Independent G3 and G5 remain with their assigned reviewers. Urdu topic 2.2 Florian description remains a G5 handoff from the earlier job.
- Paperclip issues affected: None identified; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Missing git-ignored static/content-status.json blocked the earlier batch.
- Graders run and results (PASS/FAIL): PASS: all 13 content gates; shared registries unchanged from origin/main; git diff --check.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
