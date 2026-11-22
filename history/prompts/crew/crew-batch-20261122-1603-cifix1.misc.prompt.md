---
id: crew-batch-20261122-1603-cifix1
title: crew fix GCCE-400 unit 5
stage: misc
date: 2026-11-22
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261122-1603
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: 713
files:
 - history/prompts/crew/crew-batch-20261122-1603-cifix1.misc.prompt.md
 - static/img/figures/gcce-400/unit-05/fig-U5-6.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-6.ur.svg
tests:
 - node scripts/measure-figure-text.mjs --ci-fonts static/img/figures/gcce-400/unit-05/fig-U5-6.ur.svg static/img/figures/gcce-400/unit-05/fig-U5-6.ur.dark.svg
 - npm run check:content
---

## Prompt

# Crew job batch-20261122-1603-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261122-1603`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #713 (checks: figure-geometry). Run `gh pr checks 713` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#713) changes, which belong to the crew jobs gcce-400-u05-translate. Change only what the merge or CI needs.

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
- (batch-20261122-1231-cifix1, fix, agy) Urdu SVGs `fig-U1-5.ur.svg` and `fig-U1-5.ur.dark.svg` row header "مرکزی خصوصیت" was split across two lines to fit within the 116px column when rendered under CI fallback font DejaVu Sans.
- (batch-20261122-1231-cifix1, fix, agy) All changed figures passed `scripts/measure-figure-text.mjs --ci-fonts` and all 14 gates in `npm run check:content` passed cleanly.
- (batch-20261122-0130-cifix1, fix, agy) Replaced `$$\text{...}$$` math wrapper with standard Markdown blockquote (`> `) in GUHQ-301 Unit 7 Topic 1 because Docusaurus MDX parses unescaped curly braces as JavaScript expressions when KaTeX is not configured.
- (batch-20261122-0130-cifix1, fix, agy) Unit 7 G2 evidence has been refreshed and re-pointed in tasks.md; all 14 content gates pass cleanly.
- (batch-20261118-0430-cifix1, fix, opencode) CI figure-geometry uses a DejaVu Sans fallback (local Playwright resolves narrower Noto Nastaliq), so validate future Urdu SVG edits with a DejaVu-forced copy; fig-U5-4's purpose column anchor moved from x=625 to x=615 and `.sh`/`.body` are now 13px in the three repaired figures.

## Response snapshot

Fixed PR #713 figure-geometry failure by moving the last caption line in the GCCE-400 Unit 5 Urdu timeline figures (fig-U5-6.ur.svg and fig-U5-6.ur.dark.svg) up 3px (y=505 to y=502) so it clears the bottom edge of its .panel-a under CI fallback font metrics.

## Outcome

- Impact: fix for GCCE-400 Unit 5 by claude_crew (attempt 1).
- Tests: `measure-figure-text.mjs --ci-fonts` exited 0 on both edited SVGs; `npm run check:content` passed 14/14.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: moved the final line "بنیادی مقصد پورا ہوا۔" in fig-U5-6.ur.svg and fig-U5-6.ur.dark.svg from y=505 to y=502, clearing the 1.2px spill below .panel-a [172,425,692,505].
- Decisions the team must respect: no gate status, evidence, tracker row or publication state was touched; only the two Urdu SVGs and this PHR changed.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Urdu timeline wraps to four lines where the English original uses three, which is why the last baseline sat exactly on the panel bottom; CI's DejaVu Sans fallback descent then poked 1.2px out.
  - Verified with `--ci-fonts` (CI has no Noto Nastaliq); a local default run resolves a narrower face and can pass the same file.
  - No English unit file, manifest, sources, coverage or concepts changed, so Unit 5's G2 evidence remains valid and did not need a refresh.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: Urdu text wrapping to an extra line pushed the final baseline onto the panel bottom, and CI's fallback font descent spilled 1.2px past it; local Nastaliq metrics hid the defect.
- Graders run and results (PASS/FAIL): measure-figure-text.mjs --ci-fonts PASS; check:content PASS (14/14)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
