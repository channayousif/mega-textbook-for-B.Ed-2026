---
id: crew-gent-401-u04-review_en
title: crew G3 English review of GENT-401 Unit 4
stage: green
date: 2026-11-27
surface: agent
model: LongCat-2.5
feature: gent-401
branch: crew/gent-401-u04-review_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["crew", "claude", "review", "gent-401-u04-review_en"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gent-401/reviews/unit-04/G3/crew-gent-401-u04-review_en-r1.json
 - specs/content/gent-401/reviews/unit-04/G3/crew-gent-401-u04-review_en-r1/manifest.json
 - specs/content/gent-401/reviews/unit-04/G3/crew-gent-401-u04-review_en-r1/summary.md
 - specs/content/gent-401/reviews/unit-04/G3/crew-gent-401-u04-review_en-r1/logs-20261126T210700Z
 - specs/content/gent-401/tasks.md
 - history/prompts/gent-401/crew-gent-401-u04-review_en.green.prompt.md
tests:
 - npm run check:content (14/14 pass)
 - node scripts/review-evidence.mjs validate (structurally valid, escalate)
 - npm run check:pipeline-gate (pass)
---

## Prompt

# Crew job gent-401-u04-review_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u04-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of GENT-401 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/gent-401/reviews/unit-04/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/gent-401/unit-04/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs GENT-401 4 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-04/`.

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

Ran an independent advisory G3 English review of GENT-401 Unit 4 at HEAD 4f558d48a without changing any unit prose. Prepared a 93-input manifest, ran the six contract gates plus check:concept-graph, check:bloom-bands, check:content and measure-figure-text (all exit 0), inspected the figure SVGs and the banner raster, and recorded disposition escalate with 11 findings. render-review is unavailable because the deployed build (366019f8) is not the reviewed input. G3 stays open and unsigned.

## Outcome

- ✅ Impact: advisory G3 evidence report, readable summary, evidence logs and an advisory tracker row for Unit 4 G3.
- 🧪 Tests: check:content 14/14 pass; report structurally valid (escalate); pipeline gate pass; measure-figure-text clean on all 16 unit SVGs.
- 📁 Files: report JSON, run folder (manifest, summary, 13 logs), tasks.md advisory row, this PHR.
- 🔁 Next prompts: a separate author repair of F1-F9, then a fresh reviewer run with a renderable input.
- 🧠 Reflection: the deterministic gates are all green while the concept-graph mapping, a formative Bloom tag and two citation-record errors remain; only reading the files exposes them.

## Handoff (for CEO and agents)

- Shipped / changed: advisory G3 report at specs/content/gent-401/reviews/unit-04/G3/crew-gent-401-u04-review_en-r1.json (disposition escalate; criteria authority/coverage/readability/pedagogy pass, sources/assessment fail, accessibility unverified; 11 unresolved findings F1-F11).
- Decisions the team must respect: G3 is NOT done and must not be ticked, signed or given human initials; the report is unsigned and advisory; render-review is unavailable until the deployed build matches HEAD for this unit.
- Pending / next owner: author repair of F1 (OpenStax licence), F2 (Mellor declaration/claim), F3 (topic-02 formative Analyze tag), F4 (ERQ 1 "eight-section"), F5 (RRQ 1 model), F6 (concept-graph mapping), F7 (fig-U4-4 21 vs 20), F8/F9 (unsupported generalisations); then a fresh G3 run on the repaired bytes.
- Paperclip issues affected: none recorded.

## Evaluation notes (flywheel)

- Failure modes observed: governance metadata (concept graph) and formative Bloom tags pass every deterministic gate while being wrong; a raster figure's headcount contradicts its own label; a source licence is recorded two different ways in one file.
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS; render-review unavailable.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): extend check:concept-graph to compare each item's Bloom tag and topic against the concept's topic, and extend check:bloom-bands to the per-topic Check your understanding items.
