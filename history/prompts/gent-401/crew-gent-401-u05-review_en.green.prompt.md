---
id: crew-gent-401-u05-review_en
title: crew G3 English review of GENT-401 Unit 5
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: gent-401
branch: crew/gent-401-u05-review_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["crew", "claude", "review", "gent-401-u05-review_en"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gent-401/reviews/unit-05/G3/crew-gent-401-u05-review_en-r1.json
 - specs/content/gent-401/reviews/unit-05/G3/crew-gent-401-u05-review_en-r1/manifest.json
 - specs/content/gent-401/reviews/unit-05/G3/crew-gent-401-u05-review_en-r1/summary.md
 - specs/content/gent-401/reviews/unit-05/G3/crew-gent-401-u05-review_en-r1/source-verification.md
 - specs/content/gent-401/reviews/unit-05/G3/crew-gent-401-u05-review_en-r1/assessment-solutions.md
 - specs/content/gent-401/reviews/unit-05/G3/crew-gent-401-u05-review_en-r1/figure-check.md
 - specs/content/gent-401/reviews/unit-05/G3/crew-gent-401-u05-review_en-r1/advisory-tracker-row.md
 - specs/content/gent-401/reviews/unit-05/G3/crew-gent-401-u05-review_en-r1/make-report.mjs
 - specs/content/gent-401/reviews/unit-05/G3/crew-gent-401-u05-review_en-r1/logs
 - specs/content/gent-401/tasks.md
 - history/prompts/gent-401/crew-gent-401-u05-review_en.green.prompt.md
tests:
 - npm run check:content (14/14 pass)
 - node scripts/review-evidence.mjs validate (structurally valid, escalate)
 - scripts/heavy.sh node scripts/measure-figure-text.mjs fig-U5-1..4 (exit 0)
---

## Prompt

# Crew job gent-401-u05-review_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u05-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of GENT-401 Unit 5 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/gent-401/reviews/unit-05/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/gent-401/unit-05/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs GENT-401 5 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-05/`.

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

Prepared the G3 manifest (93 inputs, re-verified 0 mismatches) at 01fde1b30, read every unit file, the content-spec, coverage, concepts, figure manifest and all five bound source notes, solved all 25 assessment items before reading the key, checked the four SVGs' text and the break-even chart's geometry against its own axes, and read two public sources only to classify claims the bound notes did not cover. render-review is unavailable because the deployment (366019f8a) predates the banner fig-U5-5 and its index.mdx line. Wrote the advisory report (escalate) with five blocking findings, two uncertain and seven advisory, and appended an open advisory G3 row to tasks.md.

## Outcome

- ✅ Impact: advisory G3 evidence report, readable summary, source, assessment and figure evidence, logs and an advisory tracker row for Unit 5 G3.
- 🧪 Tests: check:content 14/14 pass; report structurally valid (escalate); measure-figure-text clean on fig-U5-1 to fig-U5-4.
- 📁 Files: report JSON, run folder (manifest, summary, three evidence notes, make-report, 14 logs), tasks.md advisory row, this PHR.
- 🔁 Next prompts: a separate author repair of F1-F5 and F7, then a fresh G3 run once the deployed build matches HEAD for this unit.
- 🧠 Reflection: every gate is green while the running case contradicts itself across topics, a quantitative chart is drawn off its own scale and one claim is attributed to the wrong book; only reading and measuring catch these.

## Handoff (for CEO and agents)

- Shipped / changed: advisory G3 report at specs/content/gent-401/reviews/unit-05/G3/crew-gent-401-u05-review_en-r1.json (disposition escalate; authority, coverage, readability pass; sources, assessment, pedagogy fail; accessibility unverified).
- Decisions the team must respect: G3 is NOT done and must not be ticked, signed or given human initials; the report is unsigned and advisory; render-review is unavailable until the deployed build includes this unit's banner commit.
- Pending / next owner: author repair job for F1 (Imran's savings Rs 50,000 in Topic 5.1 vs Rs 20,000 in Topic 5.2), F2 (redraw fig-U5-1 lines in all four variants at the coordinates in figure-check.md; 12.5 vs 13 wording), F3 (move the network/media point from OpenStax to Scott at topic-02.mdx:64), F4 (rebalance MCQ keys, fix MCQ 3 distractors), F5 (soften the Sintha claim at topic-01.mdx:73), F7 (add Scott ch. 10 and ch. 1 notes to sources/texts/scott-2017-efmd.md). F2 also touches the Urdu .ur.svg charts (G4/G5 scope). Then a fresh G3 reviewer run.
- Issues affected: none recorded.

## Evaluation notes (flywheel)

- Failure modes observed: a running case whose numbers change between topics; an SVG chart whose plotted lines disagree with its own gridlines while measure-figure-text and check:figures pass; a paraphrase attributed to the wrong one of two co-cited sources; an MCQ key with no D answers.
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS; render-review unavailable.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): a gate that reports MCQ key letter counts per unit and flags any letter used 0 or more than 4 times; a check that plotted chart coordinates in data-labelled SVGs agree with their axis ticks.
