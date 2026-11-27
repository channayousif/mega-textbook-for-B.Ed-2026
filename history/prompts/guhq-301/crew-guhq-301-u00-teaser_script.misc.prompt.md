---
id: crew-guhq-301-u00-teaser_script
title: crew teaser_script GUHQ-301 unit 0
stage: misc
date: 2026-11-27
surface: agent
model: claude
feature: guhq-301
branch: crew/guhq-301-u00-teaser_script
user: crew
command: crew teaser_script
labels: ["crew", "claude", "teaser_script"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/029-notebook-studio/crew-guhq-301-u00-teaser_script.green.prompt.md
 - specs/studio/teasers/guhq-301.json
 - specs/studio/teasers/media-teasers.json
tests:
 - npm run check:content
---

## Prompt

# Crew job guhq-301-u00-teaser_script

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u00-teaser_script`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Draft the Urdu course teaser script for GUHQ-301 (studio-teaser skill, steps 1-3) at `specs/studio/teasers/guhq-301.json`, following recipe teaser@3 (`specs/studio/recipes/teaser@3.json`, `"recipe": { "name": "teaser", "version": 3 }`): an on-screen presenter speaks to the camera in shots 1 and 5, an unseen woman narrator speaks over action in shots 2-4, each with a named camera move (push-in, crane, dolly, tracking, whip-pan...), at most 18 Urdu words a line, no maps, flags, emblems or readable text, Pakistani school settings and modest dress. Take every fact from the course overview and `catalog/courses.json` only, and model the structure on an existing script in `specs/studio/teasers/`. Run `node scripts/notebook-studio/teaser.mjs check guhq-301` until it passes, then `node scripts/notebook-studio/teaser.mjs plan guhq-301 ur` (unless the item exists) and `node scripts/notebook-studio/teaser.mjs advance guhq-301-ur scripted --json '{"script_sha256":"<sha256sum of the file>","gates":{"qg0":{"verdict":"pass","by":"teaser.mjs"}}}'`. Stop at `scripted`: the owner approves with `crew approve-script guhq-301-ur`. Never call gflow, Flow, Veo or any image or video generator in this job, and never record an approval: no credit may be spent before the owner approves the script (FR-012). Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

Follow `.claude/skills/studio-teaser/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The GUHQ-301 teaser only: `specs/studio/teasers/guhq-301.json` and its own item in `specs/studio/teasers/media-teasers.json` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.

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

Drafted the GUHQ-301 Urdu teaser script (teaser@3, script check passes) and added the guhq-301-ur ledger item, moved to scripted to wait for owner approval.

## Outcome

- Impact: teaser_script for GUHQ-301 Unit 0 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Drafted the GUHQ-301 Urdu teaser script (teaser@3, script check passes) and added the guhq-301-ur ledger item, moved to scripted to wait for owner approval.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The optional Urdu `objectives` are missing because `parseOverview` only reads "## Course learning outcomes" and the GUHQ-301 overview says "## Course outcomes". Fix the parser or the heading, then add the 4 objectives (adding them does not reopen script approval).
  - At clip review, reject any take that shows a book cover, Arabic script or calligraphy; the prompts forbid them, but Veo may still draw one for a Quran-themed scene.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
