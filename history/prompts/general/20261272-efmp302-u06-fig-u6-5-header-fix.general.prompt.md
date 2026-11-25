---
id: 20261272
title: Fix CI figure-geometry failure on fig-U6-5 Urdu header
stage: general
date: 2026-11-26
surface: agent
model: claude-longcat-2-5
feature: 032-textbook-visuals
branch: crew/batch-20261125-1831
user: crew
command: crew job batch-20261125-1831-cifix1
labels: [claude_crew, fix]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: 869
files:
  - static/img/figures/efmp-302/unit-06/fig-U6-5.ur.svg
  - static/img/figures/efmp-302/unit-06/fig-U6-5.ur.dark.svg
  - specs/content/efmp-302/reviews/unit-06/G2/20261125T200523979Z-gates.json
  - specs/content/efmp-302/reviews/unit-06/G2/logs-20261125T200523979Z/
  - specs/content/efmp-302/tasks.md
tests:
  - node scripts/measure-figure-text.mjs --ci-fonts --changed origin/main (exit 0)
  - node scripts/measure-figure-text.mjs --ci-fonts <fig-U6-5.ur.svg> (exit 0)
  - node scripts/measure-figure-text.mjs <fig-U6-5.ur.svg> (exit 0, Noto Nastaliq)
  - node scripts/build-figure-variants.mjs (dark twin regenerated)
  - node scripts/check-svg-style.mjs (1751 figures, pass)
  - node scripts/check-figures.mjs (pass)
  - node scripts/check-no-em-dash.mjs (pass)
  - npm run build:content-status (regenerated)
  - npm run check:content (all 14 content gates PASS)
---

## Prompt

# Crew job batch-20261125-1831-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261125-1831`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #869 (checks: figure-geometry). Run `gh pr checks 869` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#869) changes, which belong to the crew jobs efmp-302-u06-refresh_figures, efmp-408-u03-repair_en, efmp-408-u01-review_en-r1, efmp-408-u05-review_en. Change only what the merge or CI needs.

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
- (batch-20261125-1431-cifix1, fix, claude_crew) CI's figure-geometry job still has to confirm on PR #864, though the local `--ci-fonts --changed 3910d261...` run is the same measurement and exits 0.
- (batch-20261125-1431-cifix1, fix, claude_crew) G3 and the Unit 3 Urdu mirror remain open; this PR certifies nothing.
- (batch-20261125-1216-cifix1, fix, claude_crew) CI's figure-geometry job still has to confirm on PR #792, though the local `--ci-fonts --changed origin/main` run is the same measurement and exits 0.
- (batch-20261125-1216-cifix1, fix, claude_crew) Urdu-only figure edits do not stale a unit's G2 evidence (it binds English SVGs only), so no gate-evidence refresh was needed; G3 and the unit-03 Urdu mirror remain open.
- (batch-20261124-2201-cifix1, fix, claude_crew) CI's figure-geometry job still has to confirm on the PR, though the local `--ci-fonts --changed 8fa83e44...` run is the same measurement and exits 0.

## Response snapshot

Read `gh pr checks 869` and `gh run view --job 139424496249 --log-failed`: the only failing job is
`figure-geometry`, and the only failing files are `static/img/figures/efmp-302/unit-06/fig-U6-5.ur.svg`
and its dark twin:

```
✗ static/img/figures/efmp-302/unit-06/fig-U6-5.ur.dark.svg
    overlaps other text by 0.8px: "‏کن کام کے‏" / "‏موضوع 6.1 کے اصول جو‏"
    overlaps other text by 19.3px: "‏موزوں‏" / "‏فطری طور پر پورا کرتی ہے‏"
```

Reproduced locally with `scripts/heavy.sh node scripts/measure-figure-text.mjs --ci-fonts --changed
origin/main` (4 problems, same two pairs). Measured the header glyph boxes under both the CI fallback
face (DejaVu Sans, no Nastaliq on the runner) and the local Noto Nastaliq to see which column was
short: the "principles" column at x=448 holds a 202.8px line in DejaVu where the English original
needs 158px, and the "suited" column label at x=278 collides with it in the fallback face only.

Rewrote the header as a three-line label that fits both faces and reads as the unit's own Urdu
(`topic-03.mdx` uses the same `کس کام کے لیے موزوں` / `چھ اصولوں سے` wording):

- `موضوع 6.1 کے چھ اصول` (line 1, x=448 y=56.9) - dropped the trailing `جو`, which the next line supplies
- `جو پورے کرتی ہیں` (line 2, x=448 y=76.9) - shorter than the original `فطری طور پر پورا کرتی ہے`
- `موزوں` moved to its own header line (x=278 y=86.9) so it cannot touch either principles line

`‏نہیں کر سکتی‏` and the cost/reach headers are unchanged. Regenerated the dark twin with
`node scripts/build-figure-variants.mjs`. `measure-figure-text.mjs` now exits 0 on both the light and
dark file in `--ci-fonts` mode and in local Nastaliq mode, and the whole `--ci-fonts --changed
origin/main` set (32 files) is clean.

Ran `node scripts/prepare-gate-evidence.mjs efmp-302 6`, which wrote
`reviews/unit-06/G2/20261125T200523979Z-gates.json` plus its `logs-*` directory, and repointed the
Unit 6 G2 en-draft tracker row from `20261125T173248874Z-gates.json` to it (same pattern as the
earlier `f0f9efa88` refresh; the script prints the row but does not edit the tracker). Ran
`npm run build:content-status` then `npm run check:content`: all 14 content gates PASS.

## Outcome

- ✅ Impact: PR #869's only red check (`figure-geometry`) is fixed at the source; `npm run check:content` is green on this branch.
- 🧪 Tests: `measure-figure-text.mjs --ci-fonts --changed origin/main` exits 0 (was 4 problems); both fig-U6-5 Urdu variants clean in CI and local fonts; `check:svg-style`, `check:figures`, `check:no-em-dash` pass; all 14 content gates pass.
- 📁 Files: `fig-U6-5.ur.svg` and its `.dark.svg` (labels only, no geometry or palette change); new G2 evidence JSON + logs; `tasks.md` G2 row repointed.
- 🔁 Next prompts: CI must re-run `figure-geometry` on PR #869 to confirm; G3 and G5 for Unit 6 stay open and this certifies nothing.
- 🧠 Reflection: the Urdu header was laid out by eye against the English column widths. The English columns are 180/180/170/150/130 px but DejaVu renders the Urdu strings ~30% wider than Nastaliq, so a label that fits on the author's machine fails on the CI runner. Measuring in `--ci-fonts` mode is the only reliable check; the real-font run passes even when CI fails.

## Handoff (for CEO and agents)

- Shipped / changed: `fig-U6-5.ur.svg` header re-wrapped to three short lines so it measures clean in the CI fallback face; dark twin regenerated; Unit 6 G2 evidence refreshed and its tracker row repointed.
- Decisions the team must respect: the header wording keeps the unit's own Urdu (`چھ اصول`, `جو پورے کرتی ہیں`, `موزوں`). Do not restore the longer `فطری طور پر پورا کرتی ہے` line at x=448; it is what overran the column in DejaVu.
- Pending / next owner: CI's `figure-geometry` job still has to confirm on PR #869 (earlier batches had the same local-passes/CI-pending pattern). Unit 6 G3 en-review and G5 ur-review rows stay open; this PR certifies nothing.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Urdu labels measured only against the local Nastaliq face; CI runners have no Nastaliq and fall back to DejaVu Sans, which is ~30% wider for these strings. Two earlier batches on this same PR family noted "local run exits 0" while CI stayed red for the same reason.
- Graders run and results (PASS/FAIL): PASS - `measure-figure-text.mjs --ci-fonts --changed origin/main` exit 0; `npm run check:content` 14/14 PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): run `measure-figure-text.mjs --ci-fonts` (not the default face) as the last step of every figure edit, since the default face hides exactly the defect CI catches.
