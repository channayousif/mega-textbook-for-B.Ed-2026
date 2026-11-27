---
id: crew-efpg-402-u04-cifix1
title: crew fix EFPG-402 unit 4
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efpg-402
branch: crew/batch-20261127-1147
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/930
files:
 - docs/semester-4/efpg-402/unit-04/topic-02.mdx
 - docs/semester-4/efpg-402/unit-04/topic-03.mdx
 - docs/semester-4/efpg-402/unit-04/unit-assessment.mdx
 - specs/content/efpg-402/reviews/unit-04/G2/20261127T120603888Z-gates.json
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261127T120603888Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261127T120603888Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261127T120603888Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261127T120603888Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261127T120603888Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261127T120603888Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261127T120603888Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261127T120603888Z/validate-content.txt
 - specs/content/efpg-402/tasks.md
 - history/prompts/efpg-402/crew-efpg-402-u04-cifix1.misc.prompt.md
tests:
 - npm run check:content (14/14 gates PASS)
 - node scripts/prepare-gate-evidence.mjs EFPG-402 4 (8/8 draft gates PASS)
 - @mdx-js/mdx compile of all 26 changed MDX files (0 failures)
---

## Prompt

# Crew job batch-20261127-1147-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261127-1147`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #930 (checks: build). Run `gh pr checks 930` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#930) changes, which belong to the crew jobs efmp-301-u08-flashcards, efmp-301-u06-slides, efpc-411-u02-illustrate, gqur-301-u08-illustrate, efpg-402-u03-author, efpg-402-u04-author. Change only what the merge or CI needs.

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
- (batch-20261127-0745-cifix1, fix, claude_crew) CI's build job must re-run and confirm on PR #927.
- (batch-20261127-0745-cifix1, fix, claude_crew) `static/studio/slides/efmp-301/unit-05.en.pptx` still holds the old phrase; the gate does not scan `.pptx`, so regenerate offline if the download should match the outline.
- (batch-20261127-0745-cifix1, fix, claude_crew) the source answer-key gate does not scan `specs/studio/` or generated `static/` decks, so this class of defect only fails in CI's built-output scan.
- (batch-20261127-0301-cifix1, fix, claude_crew) CI's figure-geometry job still has to re-run and confirm on PR #921.
- (batch-20261127-0301-cifix1, fix, claude_crew) EFPC-411 Unit 1 G3/G4/G5 rows stay open; this PR certifies nothing.

## Response snapshot

Read `gh pr checks 930` and the failed build run 45993471950 (job 140486894329). Docusaurus SSG failed for three paths: `/semester-4/efpg-402/unit-04/topic-02/`, `/semester-4/efpg-402/unit-04/topic-03/` and `/semester-4/efpg-402/unit-04/unit-assessment/`, each with a ReferenceError (`mL`, `V`, `m`).

Root cause: the repo configures no remark-math or KaTeX plugin, so `$...$` is plain text. The author job wrote LaTeX spans such as `$45\text{ mL}$`; MDX parsed the braces of `\text{ mL}` as a JSX expression and compiled it to a bare `mL` reference, which throws at SSG time. Confirmed by compiling a probe with `@mdx-js/mdx`: the span emits `children: ["A pupil measures $45\\text", mL, "$ of solution."]`.

Fix: replaced the seven brace-bearing spans with plain-text units and values (45 mL, 47 mL, 45.0 mL, 250 mL, 15 mL, 1.5 V, g = 9.8 m/s²), matching precedent commit e7ccf12a3. Repointed the Unit 4 G2 evidence row at fresh gate evidence and re-ran the gates.

## Outcome

- Impact: Unit 4 topic-02, topic-03 and unit-assessment no longer emit undefined MDX references; the three failing SSG paths are cleared.
- Tests: All 14 content gates PASS; 8/8 draft gates PASS for the refreshed evidence; all 26 changed MDX files compile with `@mdx-js/mdx`.
- Files: Three EFPG-402 Unit 4 MDX files, fresh Unit 4 G2 evidence and logs, the tasks.md tracker row, and this PHR.
- Next prompts: CI build on PR #930 must re-run and confirm.
- Reflection: Any `{...}` inside a `$...$` span is an MDX expression, not maths. With no math plugin, spans must stay brace-free or be plain text.

## Handoff (for CEO and agents)

- Shipped / changed: Plain-text replacements in `docs/semester-4/efpg-402/unit-04/topic-02.mdx`, `topic-03.mdx` and `unit-assessment.mdx`; refreshed Unit 4 G2 evidence and repointed `specs/content/efpg-402/tasks.md`.
- Decisions the team must respect: No G3/G5 status, reviewer registry, signed evidence or publication state changed. No push and no PR opened. Zero em dashes.
- Pending / next owner: CI build on PR #930.
- Notes for the next job on this unit: `topic-02.mdx` still contains brace-free `$...$` spans (`$\pm 10%$`, `$N$`) and `unit-assessment.mdx` has `$\rightarrow$` and `$v = f\lambda$`; they do not break the build, but they render literally because the repo has no math plugin. `topic-01.mdx` and other courses have the same pre-existing pattern.
- Paperclip issues affected: PR #930; crew job batch-20261127-1147-cifix1.

## Evaluation notes (flywheel)

- Failure modes observed: LaTeX `\text{...}` inside `$...$` becomes an MDX expression and throws ReferenceError at SSG; the draft gates do not compile MDX, so only CI build catches it.
- Graders run and results (PASS/FAIL): check:content PASS (14/14); prepare-gate-evidence PASS (8/8); MDX compile PASS (26/26).
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): Add an MDX compile step to CONTENT_GATES so this class fails in the fast loop instead of in CI.
