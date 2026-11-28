---
id: crew-guhq-301-u01-review_en-r1
title: crew review GUHQ-301 unit 1 English at G3
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: guhq-301
branch: crew/guhq-301-u01-review_en
user: crew
command: crew review
labels: ["crew", "claude", "review"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1.json
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/manifest.json
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/summary.md
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/limitations.md
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/assessment-solutions.md
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/source-checks.md
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/advisory-tracker-row.md
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/logs-20261128T125230Z/validate-content.txt
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/logs-20261128T125230Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/logs-20261128T125230Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/logs-20261128T125230Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/logs-20261128T125230Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/logs-20261128T125230Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/logs-20261128T125230Z/measure-figure-text.txt
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/logs-20261128T125230Z/render-review.txt
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/logs-20261128T125230Z/lazy-load-diagnostic.txt
 - specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1/renders/
tests:
 - npm run check:content
 - node scripts/review-evidence.mjs validate specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1.json
---

## Prompt

# Crew job guhq-301-u01-review_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u01-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of GUHQ-301 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/guhq-301/reviews/unit-01/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/guhq-301/unit-01/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs GUHQ-301 1 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-01/`.

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

Ran as the independent G3 reviewer on a clean checkout at HEAD d103b2448 (equal to the deployed SHA).
Prepared the 95-input manifest, ran the six deterministic gates plus measure-figure-text, and ran
render-inspect against the production build. Verified every cited verse against the Quran.com API,
the corpus root counts against the live dictionary pages, the Yazar-Batur claims against the MDPI
full text, and the tajwid claim against the arXiv abstract. Solved all 25 assessment items
independently before reading the key. Wrote the advisory report, summary, limitations, assessment
solutions, source checks and advisory tracker row, and validated the report.

## Outcome

- ✅ Impact: GUHQ-301 Unit 1 is content-sound on all seven G3 criteria; the only thing preventing a
  pass is a render-inspect tooling false positive (no scroll before reading `naturalWidth`), so the
  advisory disposition is `escalate` with one uncertain finding and four advisories.
- 🧪 Tests: `npm run check:content` all 14 gates PASS; `node scripts/review-evidence.mjs validate`
  exits 0 (`Report structurally valid: escalate`).
- 📁 Files: the G3 report JSON plus its evidence folder (manifest, six gate logs, measure-figure-text,
  render-review log, lazy-load diagnostic, eight render PNGs, render-inspect json/log, four markdown
  supporting documents) and this PHR.
- 🔁 Next prompts: fix `scripts/render-inspect.mjs` to scroll before the desktop `naturalWidth`
  measurement (or accept `notServed=0` plus served-byte identity), then re-run this review; the
  author may optionally rebalance the MCQ key, convert the sources declaration to a
  `no-external-source` row, and de-duplicate ERQ 3 against the Topic 1.2 summative task.
- 🧠 Reflection: the unit itself needed no repair, so the whole cycle turned on a measurement
  artifact. Recording the real exit code 1 and proving the false positive with a scroll diagnostic
  kept the report honest without mislabelling the content.

## Handoff (for CEO and agents)

- Shipped / changed: `specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1.json`
  (advisory `escalate`, all seven criteria pass) with its evidence folder, and this PHR. No tracker
  row was edited, no gate marked done, no signature, no `translation_status` change.
- Decisions the team must respect: G3 stays open; the report is advisory and cannot certify. The
  render-review exit code 1 is a tooling artifact, not a content defect, and must not be "fixed" by
  editing the unit or by recording a false exit 0.
- Pending / next owner: a host/tooling fix to `scripts/render-inspect.mjs` (scroll before measuring)
  or an owner ruling on accepting `notServed=0`; then a fresh G3 run. Author advisories A1-A4 are
  optional polish.
- Paperclip issues affected: none; `links.ticket` is null.

## Evaluation notes (flywheel)

- Failure modes observed: `scripts/render-inspect.mjs` reports `visible image did not load` for
  figures below Chromium's lazy-load threshold because the desktop pass never scrolls; on this unit
  that is `fig-U1-1` (4781px) and `fig-U1-4` (4408px).
- Graders run and results (PASS/FAIL): `npm run check:content` PASS (14/14);
  `node scripts/review-evidence.mjs validate` PASS; `scripts/heavy.sh node
  scripts/measure-figure-text.mjs <16 svgs>` exit 0; `scripts/heavy.sh node scripts/render-inspect.mjs
  GUHQ-301 1 --base https://textbook.com.pk --no-pdf` exit 1 (two lazy-load false positives).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add a scroll pass to the desktop section of
  `scripts/render-inspect.mjs` before the `naturalWidth` read, then re-run this unit and confirm
  exit 0.
