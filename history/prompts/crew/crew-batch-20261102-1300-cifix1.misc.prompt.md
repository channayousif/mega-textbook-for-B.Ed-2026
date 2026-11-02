---
id: crew-batch-20261102-1300-cifix1
title: crew fix batch-20261102-1300-cifix1 figure geometry
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: crew
branch: crew/batch-20261102-1300
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["crew", "opencode", "fix", "efmp-406", "figure-geometry"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-406/unit-01/fig-U1-2.ur.svg
  - static/img/figures/efmp-406/unit-01/fig-U1-2.ur.dark.svg
  - history/prompts/crew/crew-batch-20261102-1300-cifix1.misc.prompt.md
tests:
  - npm run check:content (13/13 pass)
  - npm run figures:variants:check (1075 figures OK)
---

## Prompt

# Crew job batch-20261102-1300-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261102-1300`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #408 (checks: figure-geometry). Run `gh pr checks 408` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#408) changes, which belong to the crew jobs efmp-406-u01-translate, efmp-406-u03-review_en, efmp-406-u04-author-r1. Change only what the merge or CI needs.

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
- (batch-20261102-0900-conflict1, fix, opencode) The new Unit 3 G2 evidence binds main's `scripts/lib/review-evidence.mjs` and `catalog/courses.json`; any further edit to those globals or Unit 3's bound files re-opens G2, so use `node scripts/prepare-gate-evidence.mjs --refresh-stale` rather than a hand edit.
- (batch-20261102-0900-conflict1, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally; CI's prestart hook rebuilds it.
- (batch-20261102-0900-cifix1, fix, opencode) Unit 3's G2 input manifest was refreshed in place (6 figure hashes); any further edit under `static/img/figures/efmp-406/unit-03/` re-opens it, so recompute with `inputManifest(root, 'EFMP-406', 3, 'G3')`.
- (batch-20261102-0900-cifix1, fix, opencode) `fig-U3-4` table body type is now 11px and headers 13px (the repo's stated minimum label size); a reviewer wanting larger type should widen the columns, which needs about 808px at 13px/14px.
- (batch-20261102-0900-cifix1, fix, opencode) `fig-U3-1` right boxes are x=520 w=270 (text x=535); `fig-U3-3` left cards are 360 wide with arrows at x1=400 and x2=410.

## Response snapshot

Read the figure-geometry failure from `gh run view --log-failed`: `fig-U1-2.ur.svg` and its dark twin each reported four labels spilling about 106px out of the first-column panel. The Urdu table mirrored its panels with per-shape `transform="translate(780 0) scale(-1 1)"`, which `measure-figure-text.mjs` cannot see past, so the third-column labels were measured against the unmirrored first-column panel. Rewrote the panel and rule coordinates in the mirrored space and dropped the transforms, regenerated the dark variant, and confirmed the rendered figure is pixel-identical to the previous version. `npm run check:content` passes 13/13 and `npm run figures:variants:check` passes for 1075 figures.

## Outcome

- ✅ Impact: the figure-geometry job should no longer flag Unit 1's Urdu comparison table; the rendered figure is unchanged.
- 🧪 Tests: `npm run check:content` 13/13 PASS; `npm run figures:variants:check` PASS (1075 figures); old and new SVG rendered pixel-identical with sharp.
- 📁 Files: `fig-U1-2.ur.svg` and `fig-U1-2.ur.dark.svg` geometry rewritten; this PHR.
- 🔁 Next prompts: independent G5 Urdu review of Unit 1, including render inspection.
- 🧠 Reflection: the repo's own `mirror-figure-rtl.mjs` rewrites coordinates rather than using transforms precisely so measurement tools compare like with like; the translate job's transform shortcut defeated the geometry gate.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 1 Urdu table figure now uses coordinate mirroring (no transforms); dark variant regenerated.
- Decisions the team must respect: only `.ur.svg` files changed, so Unit 1's G2 input manifest is untouched (Urdu variants bind to G5 only); no G3/G5 status changed.
- Pending / next owner: independent G5 reviewer should still run geometry and render inspection; the other three Unit 1 Urdu figures still use transforms and pass only by layout coincidence, so a future edit could re-expose the same false positive.
- Paperclip issues affected: Crew job batch-20261102-1300-cifix1; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: transform-based RTL mirroring hides shape geometry from `measure-figure-text.mjs`, producing a false-positive spill.
- Graders run and results (PASS/FAIL): PASS: `npm run check:content` (13/13), `npm run figures:variants:check`. NOT RUN: `measure-figure-text.mjs` (Playwright forbidden by the brief).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): convert the remaining Unit 1 `.ur.svg` figures to coordinate mirroring for consistency, or teach the measure script to apply shape transforms.
