---
id: crew-batch-20261125-1431-cifix1
title: crew fix figure-geometry overlap in efmp-409 unit 05
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261125-1431
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/crew/crew-batch-20261125-1431-cifix1.misc.prompt.md
 - static/img/figures/efmp-409/unit-05/fig-U5-5.ur.dark.svg
 - static/img/figures/efmp-409/unit-05/fig-U5-5.ur.svg
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs --ci-fonts --changed 3910d26161b35a1faf18ce848fd50ab0b4cf59f7
---

## Prompt

# Crew job batch-20261125-1431-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261125-1431`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #864 (checks: figure-geometry). Run `gh pr checks 864` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#864) changes, which belong to the crew jobs efmp-409-u05-translate, efmp-408-u01-illustrate, efmp-406-u00-media_assemble, efmp-408-u02-illustrate, efmp-408-u03-illustrate. Change only what the merge or CI needs.

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
- (batch-20261125-1216-cifix1, fix, claude_crew) CI's figure-geometry job still has to confirm on PR #792, though the local `--ci-fonts --changed origin/main` run is the same measurement and exits 0.
- (batch-20261125-1216-cifix1, fix, claude_crew) Urdu-only figure edits do not stale a unit's G2 evidence (it binds English SVGs only), so no gate-evidence refresh was needed; G3 and the unit-03 Urdu mirror remain open.
- (batch-20261124-2201-cifix1, fix, claude_crew) CI's figure-geometry job still has to confirm on the PR, though the local `--ci-fonts --changed 8fa83e44...` run is the same measurement and exits 0.
- (batch-20261124-2201-cifix1, fix, claude_crew) This PR certifies nothing; G3 and the Unit 3 Urdu mirror remain open.
- (batch-20261124-1946-cifix1, fix, claude_crew) CI's build job still has to confirm the acorn error is gone (`npm run build` was not run locally, per the brief); the now-unreferenced old evidence set `20261124T184540786Z-gates.json` and its logs dir were left in place, matching the earlier Unit 4 precedent.

## Response snapshot

Re-broke the over-wide Urdu right-column heading in efmp-409 `fig-U5-5.ur.svg` ("1998-2010 کی پالیسی" / "میں ہدف" to "1998-2010 کی" / "پالیسی میں ہدف") and mirrored it into the derived dark variant, clearing the CI figure-geometry label-gap failure under the CI fallback face.

## Outcome

- ✅ Impact: fix for CREW Unit 0 by claude_crew (attempt 1): PR #864 figure-geometry red to green.
- 🧪 Tests: `npm run check:content` passed (14/14); `node scripts/measure-figure-text.mjs --ci-fonts --changed 3910d261...` exited 0 on all 12 changed Urdu SVGs.
- 📁 Files: 3 file(s), listed above.
- 🔁 Next prompts: the crew planner derives the unit's next stage from main after merge.
- 🧠 Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: the Urdu right-column heading of `static/img/figures/efmp-409/unit-05/fig-U5-5.ur.svg` and its `.ur.dark.svg` variant now wraps as "1998-2010 کی" / "پالیسی میں ہدف", so the header stays inside its column and keeps a 63px gap from the middle header under the CI fallback face.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything. Urdu-only figure edits do not stale a unit's G2 evidence (it binds English SVGs only), so no gate-evidence refresh was needed.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - CI's figure-geometry job still has to confirm on PR #864, though the local `--ci-fonts --changed 3910d261...` run is the same measurement and exits 0.
  - G3 and the Unit 3 Urdu mirror remain open; this PR certifies nothing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS; measure-figure-text --ci-fonts PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
