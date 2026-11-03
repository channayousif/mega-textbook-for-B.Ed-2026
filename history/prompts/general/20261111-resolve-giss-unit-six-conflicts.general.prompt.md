---
id: 20261111
title: Resolve GISS Unit Six Conflicts
stage: general
date: 2026-11-03
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/giss-401-u06-author
user: crew owner
command: crew brief execution
labels: ["codex", "crew", "giss-401", "unit-06"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/giss-401/sources/texts/quran-translation.md
  - specs/content/giss-401/tasks.md
  - specs/content/giss-401/reviews/unit-06/G2/20261103T011742805Z-gates.json
  - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T011742805Z/
tests:
  - npm run check:content (merged branch and detached origin/main baseline)
  - node scripts/prepare-gate-evidence.mjs GISS-401 6 (eight draft gates passed)
  - npm run build:content-status
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Delegated brief, verbatim:

# Crew job giss-401-u06-author-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u06-author conflicts with main (specs/content/giss-401/sources/texts/quran-translation.md, specs/content/giss-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GISS-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-06/`.

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
- (giss-401-u06-author, author, claude) G3 needs a qualified Islamic Studies reviewer who also fetches the full UDHR text independently; it is declared unverifiable because official pages returned HTTP 403.
- (giss-401-u06-author, author, claude) Other GISS-401 unit branches also add to `tasks.md`, `sources/texts/quran-translation.md` and `sources/texts/bhat-2019-education.md`; expect add/add merge conflicts there and keep every unit's sections.
- (giss-401-u06-author, author, claude) Still open: the Urdu mirror, `.ur.svg` labels and a `measure-figure-text` run, which needs a browser and this brief barred it.

## Response snapshot

Merged origin/main, preserving Unit 4 and Unit 6 source notes and tracker rows. Refreshed stale Unit 6 G2 evidence after the shared source changes and regenerated the ignored content-status report.

## Outcome

- ✅ Impact: Resolved both merge conflicts without removing main entries or changing review certification.
- 🧪 Tests: Eight G2 draft gates passed; final content suite passed all 13 gates. Main baseline passed 12 gates with only its missing generated content-status report failing.
- 📁 Files: Shared Qur’an source notes, course tracker, fresh Unit 6 deterministic G2 evidence and logs, and this PHR.
- 🔁 Next prompts: Independent G3 review, Urdu translation and browser figure geometry remain separate jobs.
- 🧠 Reflection: Shared bound source changes invalidate Unit 6 G2 input hashes, so a successful textual merge still needs fresh evidence.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main and regenerated Unit 6 draft evidence.
- Decisions the team must respect: Main entries retained; no registry changes, G3/G5 certification, push or PR.
- Pending / next owner: Qualified Islamic Studies reviewer for G3 and independent full UDHR retrieval; translation owner for Urdu; permitted browser session for figure geometry.
- Paperclip issues affected: No ticket supplied; crew job giss-401-u06-author-conflict1.

## Evaluation notes (flywheel)

- Failure modes observed: Initial merged run found stale Unit 6 G2 manifest and stale ignored content-status report.
- Graders run and results (PASS/FAIL): G2 draft gates PASS; final npm run check:content PASS (13/13); git diff --check PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No additional experiment needed.
