---
id: crew-gcce-400-u03-repair_en-r1
title: crew repair_en GCCE-400 unit 3
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: gcce-400
branch: crew/gcce-400-u03-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-03/topic-01.mdx
 - docs/semester-4/gcce-400/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/unit-assessment.mdx
 - specs/content/gcce-400/reviews/unit-03/G2/20261128T030334740Z-gates.json
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261128T030334740Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261128T030334740Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261128T030334740Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261128T030334740Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261128T030334740Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261128T030334740Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261128T030334740Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261128T030334740Z/validate-content.txt
 - specs/content/gcce-400/sources/unit-03.md
 - specs/content/gcce-400/tasks.md
 - specs/content/gcce-400/translations/unit-03/handoff.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u03-repair_en-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u03-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/gcce-400/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/gcce-400/reviews/unit-03/G3/20261127T192818Z-g3-desk-4b3d1361.json` (disposition: revise). Resolve each one:
- [blocking] Article 184 was omitted from the Constitution by the Twenty-seventh Amendment Act, 2025 (Article 29, effective 13 November 2025). The public-importance fundamental-rights jurisdiction now sits in the Federal Constitutional Court under Article 175E(3), which requires an application. The unit still teaches the repealed article and court at topic-01.mdx:52, unit-assessment.mdx:101, unit-assessment.mdx:141 and unit-assessment.mdx:168-169, and sources/unit-03.md:7,18 still claims the article is current. Repair: re-point these passages to Article 175E(3) and the Federal Constitutional Court and c...
- [uncertain] render-review tooling limitation: render-inspect.mjs exited 1 on six artifacts - Section D tested .svg variants on the two WebP illustrations (fig-U3-6, fig-U3-7), and the desktop pass measured two below-fold lazy images before Chrome loaded them. A scroll probe (logs/probe-figure-loading.txt) measures fig-U3-2.svg at 860x640 and fig-U3-4.svg at 860x563, both complete and visible. Accessibility is therefore recorded as unverified for machine pass rather than as a content defect.
- [uncertain] This independent review is advisory only. No server-protected signing host or qualified registry entry was used, so it does not certify G3 or support a tracker done state. With review cycle 2 completed under ADR-0019, the unit is escalated for an owner ruling on the Article 184 repair and final editorial qualification.

## Notes from earlier jobs on this unit
- (gcce-400-u03-review_en-r1, review_en, claude_crew) F9 needs an owner ruling: re-point the four passages to Article 175E(3)/Federal Constitutional Court, or authorise a third cycle (ADR-0019 allows two).
- (gcce-400-u03-review_en-r1, review_en, claude_crew) `render-inspect.mjs` Section D assumes every placed figure has `.svg`/`.dark.svg` variants, so it flags the WebP illustrations fig-U3-6/7 as MISSING; that is a tool limitation, not a content defect.
- (gcce-400-u03-review_en-r1, review_en, claude_crew) `~/deploy/deployed-sha` moved from `8fc777848` to `dd2b91483` during this run; the live render evidence is valid for the reviewed HEAD `dd2b91483`.
- (gcce-400-u03-repair_en, repair_en, claude) A fresh independent G3 is needed. The production site still runs the pre-repair commit, so check whether it has redeployed before the render and accessibility inspection (F6).
- (gcce-400-u03-repair_en, repair_en, claude) RRQ 10 and MCQ 4 were rewritten in both locales, so the G5 Urdu review should check the new Urdu wording in `unit-assessment.mdx` and the new Topic 3.1 bullets for Article 9A and Articles 23-24.


## Response snapshot

Re-pointed GCCE-400 Unit 3's Article 184(3) passages (EN and UR) to Article 175E(3) and the Federal Constitutional Court, corrected the sources note, and recorded new G2 evidence and an advisory G3 repair row.

## Outcome

- Impact: repair_en for GCCE-400 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Re-pointed GCCE-400 Unit 3's Article 184(3) passages (EN and UR) to Article 175E(3) and the Federal Constitutional Court, corrected the sources note, and recorded new G2 evidence and an advisory G3 repair row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Review cycle 2 under ADR-0019 is used, so another agent G3 needs owner authorisation. The new Urdu wording in `topic-01.mdx` and `unit-assessment.mdx` still needs G5 review, and the live site shows the old text until this deploys.
  - The new Unit 3 G3 row (▢, agent:claude) comes after the sign-off desk's `⏳ CMY` row, so it is now the authoritative one; the owner or desk should check that is intended.
  - `sources/texts/constitution-pakistan.md` has no Article 175E(3) entry. I left it unchanged because other units share it; the check is recorded in `sources/unit-03.md`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
