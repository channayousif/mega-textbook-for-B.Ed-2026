---
id: crew-gent-401-u07-review_en
title: crew G3 English review of GENT-401 Unit 7
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: gent-401
branch: crew/gent-401-u07-review_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["crew", "claude", "review", "gent-401-u07-review_en"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gent-401/reviews/unit-07/G3/crew-gent-401-u07-review_en-r1.json
 - specs/content/gent-401/reviews/unit-07/G3/crew-gent-401-u07-review_en-r1/manifest.json
 - specs/content/gent-401/reviews/unit-07/G3/crew-gent-401-u07-review_en-r1/summary.md
 - specs/content/gent-401/reviews/unit-07/G3/crew-gent-401-u07-review_en-r1/logs-20261127T003522Z
 - specs/content/gent-401/tasks.md
 - history/prompts/gent-401/crew-gent-401-u07-review_en.green.prompt.md
tests:
 - npm run check:content (all content gates pass)
 - node scripts/review-evidence.mjs validate (structurally valid, escalate)
 - scripts/heavy.sh node scripts/measure-figure-text.mjs on fig-U7-1..4 (exit 0)
---

## Prompt

# Crew job gent-401-u07-review_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u07-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of GENT-401 Unit 7 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/gent-401/reviews/unit-07/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/gent-401/unit-07/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs GENT-401 7 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-07/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Response snapshot

Ran an independent advisory G3 English review of GENT-401 Unit 7 at HEAD 01fde1b30 without changing any unit prose. Prepared a 93-input manifest, ran the six contract gates plus measure-figure-text, build:content-status and check:content (all exit 0), checked the cited OpenStax passages (7.3, 10.5, 12.2, 13.7) against the live book, solved the assessment independently (all ten MCQ keys agree), inspected the four schematic SVGs from source and the banner raster, and recorded disposition escalate: 8 blocking, 2 uncertain, 8 advisory findings. render-review is unavailable because the deployed build (366019f8a) predates the fig-U7-5 banner commit. G3 stays open and unsigned.

## Outcome

- ✅ Impact: advisory G3 evidence report, readable summary, evidence logs and an advisory tracker row for Unit 7 G3.
- 🧪 Tests: check:content all pass; report structurally valid (escalate); measure-figure-text clean on the four English SVGs.
- 📁 Files: report JSON, run folder (manifest, summary, 13 logs), tasks.md advisory row, this PHR.
- 🔁 Next prompts: a separate author repair of F1-F8 (and a check of F9), then a fresh reviewer run once production is rebuilt from a commit that includes this unit's banner.
- 🧠 Reflection: every gate is green while the worked pitch's own numbers do not add up, the risk-matrix figure contradicts its prose, and one figure's alt text describes a column the image lacks; only reading figure coordinates and doing the arithmetic exposes them.

## Handoff (for CEO and agents)

- Shipped / changed: advisory G3 report at specs/content/gent-401/reviews/unit-07/G3/crew-gent-401-u07-review_en-r1.json (escalate; authority, coverage, readability pass; sources, pedagogy, assessment, accessibility fail; findings F1-F10 unresolved, A1-A8 advisory).
- Decisions the team must respect: G3 is NOT done and must not be ticked, signed or given human initials; the report is unsigned and advisory; render-review stays unavailable until the deployed build matches HEAD for docs/semester-4/gent-401/unit-07/ and its figures.
- Pending / next owner: unit author repairs F1 (worked pitch time and ask arithmetic), F2 (fig-U7-2 accident placement vs prose), F3 (seven vs eight pitch parts), F4 (ERQ 1 and ERQ 5 rubric alignment), F5 (MCQ 3 stem, MCQ 4 rationale), F6 (exact 10.5 quotation, plus bound note 12), F7 (7.3 attribution), F8 (fig-U7-4 skill column or alt/prose fix, with the Urdu pair); then prepare-gate-evidence and a fresh G3 run. Fixes to figures and English text will also need the G4 Urdu mirror updated.
- Issues affected: none recorded.

## Evaluation notes (flywheel)

- Failure modes observed: worked-example arithmetic and timing inconsistent with the stated total; a plotted point in a schematic contradicting the prose reading; alt text claiming content the image lacks; rubric criteria scoring work the task does not request; altered wording inside quotation marks.
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS; render-review unavailable.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): a gate that compares each quoted OpenStax phrase in a unit with its bound source note and flags quotation marks around text absent from the note, and a check that each ERQ rubric criterion maps to a demand stated in the task.
