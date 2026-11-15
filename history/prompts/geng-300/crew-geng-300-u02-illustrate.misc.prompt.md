---
id: crew-geng-300-u02-illustrate
title: crew illustrate GENG-300 unit 2
stage: misc
date: 2026-11-15
surface: agent
model: codex
feature: geng-300
branch: crew/geng-300-u02-illustrate
user: crew
command: crew illustrate
labels: ["crew", "codex", "illustrate"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/geng-300/unit-02/index.mdx
 - docs/semester-1/geng-300/unit-02/topic-01.mdx
 - docs/semester-1/geng-300/unit-02/topic-02.mdx
 - docs/semester-1/geng-300/unit-02/topic-03.mdx
 - history/prompts/009-figure-rendering/0008-produce-geng-unit-two-illustrations.green.prompt.md
 - specs/content/geng-300/figures/unit-02.banner.md
 - specs/content/geng-300/figures/unit-02.md
 - specs/content/geng-300/reviews/unit-02/G2/20261115T024417317Z-gates.json
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261115T024417317Z/check-bloom-bands.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261115T024417317Z/check-concept-graph.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261115T024417317Z/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261115T024417317Z/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261115T024417317Z/check-figures.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261115T024417317Z/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261115T024417317Z/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-02/G2/logs-20261115T024417317Z/validate-content.txt
 - specs/content/geng-300/tasks.md
 - static/img/figures/geng-300/unit-02/fig-U2-10.webp
 - static/img/figures/geng-300/unit-02/fig-U2-7.webp
 - static/img/figures/geng-300/unit-02/fig-U2-8.webp
 - static/img/figures/geng-300/unit-02/fig-U2-9.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u02-illustrate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u02-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GENG-300 Unit 2 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GENG-300 2` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it generates with agy, optimises to WebP and moves each row to generated. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-02/`.

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
- (geng-300-u02-plan_illustrations, plan_illustrations, claude) The topic scenes say "a government school of the kind found across Sindh" because the brief requires a Sindh setting, but the topic text places these classrooms in Lahore, Peshawar and Quetta. The pictures contain no text, so they don't contradict the prose, but the illustrate job should keep it in mind.
- (geng-300-u02-plan_illustrations, plan_illustrations, claude) Once fig-U2-7 to fig-U2-10 are placed, the illustrate job must refresh the G2 evidence again (`node scripts/prepare-gate-evidence.mjs GENG-300 2` and repoint the tasks.md row).
- (geng-300-u02-repair_en-r1-conflict1, fix, codex) Existing owner escalations remain open; fresh G3 review requires owner authorisation.
- (geng-300-u02-repair_en-r1-conflict1, fix, codex) Existing owner escalations remain open; fresh G3 review requires owner authorisation.
- (geng-300-u02-repair_en-r1, repair_en, claude) E1, E2 and U1 are still open and need the owner or a host with a browser; a fresh independent G3 review needs owner authorisation because the cycle limit is used up.


## Response snapshot

Added three classroom scenes and a unit banner for GENG-300 Unit 2 with validated placements and fresh draft evidence.

## Outcome

- Impact: illustrate for GENG-300 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added three classroom scenes and a unit banner for GENG-300 Unit 2 with validated placements and fresh draft evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Existing review escalations remain open; fresh G3 requires owner authorisation.
  - Existing review escalations remain open; fresh G3 requires owner authorisation.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
