---
id: crew-gicp-400-u00-teaser_script
title: crew teaser_script GICP-400 unit 0
stage: misc
date: 2026-11-25
surface: agent
model: claude
feature: gicp-400
branch: crew/gicp-400-u00-teaser_script
user: crew
command: crew teaser_script
labels: ["crew", "claude", "teaser_script"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/030-media-studio/20261274-gicp-400-teaser-script.green.prompt.md
 - specs/studio/teasers/gicp-400.json
 - specs/studio/teasers/media-teasers.json
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u00-teaser_script

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u00-teaser_script`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Draft the Urdu course teaser script for GICP-400 (studio-teaser skill, steps 1-3) at `specs/studio/teasers/gicp-400.json`, following recipe teaser@3 (`specs/studio/recipes/teaser@3.json`, `"recipe": { "name": "teaser", "version": 3 }`): an on-screen presenter speaks to the camera in shots 1 and 5, an unseen woman narrator speaks over action in shots 2-4, each with a named camera move (push-in, crane, dolly, tracking, whip-pan...), at most 18 Urdu words a line, no maps, flags, emblems or readable text, Pakistani school settings and modest dress. Take every fact from the course overview and `catalog/courses.json` only, and model the structure on an existing script in `specs/studio/teasers/`. Run `node scripts/notebook-studio/teaser.mjs check gicp-400` until it passes, then `node scripts/notebook-studio/teaser.mjs plan gicp-400 ur` (unless the item exists) and `node scripts/notebook-studio/teaser.mjs advance gicp-400-ur scripted --json '{"script_sha256":"<sha256sum of the file>","gates":{"qg0":{"verdict":"pass","by":"teaser.mjs"}}}'`. Stop at `scripted`: the owner approves with `crew approve-script gicp-400-ur`. Never call gflow, Flow, Veo or any image or video generator in this job, and never record an approval: no credit may be spent before the owner approves the script (FR-012). Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

Follow `.claude/skills/studio-teaser/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The GICP-400 teaser only: `specs/studio/teasers/gicp-400.json` and its own item in `specs/studio/teasers/media-teasers.json` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.

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

Wrote the teaser@3 Urdu script `specs/studio/teasers/gicp-400.json`, which passes QG0, and moved `gicp-400-ur` to `scripted` in the teaser ledger with its PHR.

## Outcome

- Impact: teaser_script for GICP-400 Unit 0 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Wrote the teaser@3 Urdu script `specs/studio/teasers/gicp-400.json`, which passes QG0, and moved `gicp-400-ur` to `scripted` in the teaser ledger with its PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The five Urdu objectives are left out until `parseOverview` (scripts/notebook-studio/describe.mjs) reads the "Course objectives" heading. Adding them later is metadata only and does not reopen approval.
  - When the clips are reviewed, fail any take that shows a flag, emblem, map, portrait or readable text; the topic makes these likely.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
