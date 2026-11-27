---
id: 20261299
title: Fix CI figure-geometry failure on EFPC-411 Unit 1 Urdu table labels
stage: general
date: 2026-11-27
surface: agent
model: claude-longcat-2-5
feature: 032-textbook-visuals
branch: crew/batch-20261127-0301
user: crew
command: crew job batch-20261127-0301-cifix1
labels: [claude_crew, fix]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: 921
files:
  - static/img/figures/efpc-411/unit-01/fig-U1-1.ur.svg
  - static/img/figures/efpc-411/unit-01/fig-U1-1.ur.dark.svg
  - static/img/figures/efpc-411/unit-01/fig-U1-4.ur.svg
  - static/img/figures/efpc-411/unit-01/fig-U1-4.ur.dark.svg
  - static/img/figures/efpc-411/unit-01/fig-U1-8.ur.svg
  - static/img/figures/efpc-411/unit-01/fig-U1-8.ur.dark.svg
tests:
  - gh pr checks 921 (only figure-geometry fail)
  - gh run view --job 140285953625 --log-failed
  - node scripts/measure-figure-text.mjs --ci-fonts --changed 42b33b8999926641cc5586a511dbbf92919549a0 (exit 0, 32 files)
  - node scripts/measure-figure-text.mjs --ci-fonts (six edited SVGs, exit 0)
  - node scripts/build-figure-variants.mjs (3 dark twins rewritten)
  - node scripts/build-figure-variants.mjs --check (1775 figures OK)
  - node scripts/check-svg-style.mjs (pass)
  - node scripts/check-figures.mjs (pass)
  - node scripts/check-no-em-dash.mjs (pass)
  - npm run build:content-status (regenerated)
  - npm run check:content (14/14 PASS)
---

## Prompt

# Crew job batch-20261127-0301-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261127-0301`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #921 (checks: figure-geometry). Run `gh pr checks 921` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#921) changes, which belong to the crew jobs efmp-301-u07-flashcards, gicp-400-u00-teaser_clips, gqur-301-u06-illustrate, efpc-411-u02-author, efpc-411-u01-translate, gqur-301-u07-illustrate. Change only what the merge or CI needs.

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
- (batch-20261125-1831-cifix1, fix, claude_crew) CI's figure-geometry job still has to re-run and confirm on PR #869; earlier batches on this PR family had the same local-passes/CI-pending pattern.
- (batch-20261125-1831-cifix1, fix, claude_crew) do not restore the longer `فطری طور پر پورا کرتی ہے` header line at x=448, it is the string that overran the column in DejaVu.
- (batch-20261125-1831-cifix1, fix, claude_crew) Unit 6 G3 en-review and G5 ur-review rows stay open; this PR certifies nothing.
- (batch-20261125-1431-cifix1, fix, claude_crew) CI's figure-geometry job still has to confirm on PR #864, though the local `--ci-fonts --changed 3910d261...` run is the same measurement and exits 0.
- (batch-20261125-1431-cifix1, fix, claude_crew) G3 and the Unit 3 Urdu mirror remain open; this PR certifies nothing.

## Response snapshot

Read `gh pr checks 921` and `gh run view --job 140285953625 --log-failed`: the only red check is
`figure-geometry`, on three EFPC-411 Unit 1 Urdu tables and their dark twins (10 problems, identical
in both variants):

- `fig-U1-1.ur.svg`: overlaps 20.3px: "پریکٹیکم کی ترقی کی نگرانی" / "سپروائزر کی ہدایت میں"
- `fig-U1-4.ur.svg`: overlaps 17.0px: "- تحریر کا بھاری بوجھ" / "غیر کام والے جوڑے کو نام لے کر پرامن کیا";
  overlaps 53.8px: "- خام ڈیٹا کے بغیر ذاتی" / "شرمیلی لڑکیوں کو اعتماد سے بولنے میں مدد دی"
- `fig-U1-8.ur.svg`: only 3.9px from the next label: "ہر میز کے جوڑے کے لیے، منگل کے کلاس میں" /
  "اور ریاضی کے مراحل کی وضاحت کرتی ہیں"; overlaps 4.4px: "پلیسمنٹ کے پہلے 5 منٹ میں" /
  "متحرک کلاس پر غرق کرتا ہے، چیخنے کے بغیر"

Reproduced locally with `scripts/heavy.sh node scripts/measure-figure-text.mjs --ci-fonts ...` (same 10
problems). This machine has Noto Nastaliq, so a default-face run hides the defect; `--ci-fonts` forces
the CI fallback face (DejaVu Sans), which is what the runner measures.

Measured candidate strings under DejaVu at the real class weights (`.sh` is 14px/600, `.cell` is
13px/400) and shortened or re-wrapped the labels, following the `d5b76794c` precedent (shorten and
re-wrap, keep the unit's own Urdu):

- fig-U1-1: `سپروائزر کی ہدایت میں` to `سپروائزر کی ہدایت` (132.4px at 14/600, fits the 144px column)
- fig-U1-4: moved `غیر کام والے` onto the first line (`9:14 بجے: استاد نے غیر کام والے`, 180.5px) and
  left `جوڑے کو نام لے کر پرامن کیا` (156px) on the second; re-wrapped the reflective-journal entry to
  three lines (`میں نے دیکھا کہ ہم پیشہ کام نے` / `شرمیلی لڑکیوں کو اعتماد سے` / `بولنے میں مدد دی`, new
  line at y=414) so no word is lost
- fig-U1-8: dropped the leading `اور` (`ریاضی کے مراحل کی وضاحت کرتی ہیں`, 216.3px) and the filler
  `کرتا ہے` (`متحرک کلاس پر غرق، چیخنے کے بغیر`, 203px)

Regenerated the three dark twins with `npm run figures:variants` (only those three changed).
`measure-figure-text.mjs --ci-fonts --changed 42b33b89...` now exits 0 over all 32 changed files, and
`figures:variants:check` is OK.

No gate-evidence refresh: the Unit 1 G2 manifest binds English SVGs only (no `.ur.svg` entries), so
Urdu-only figure edits do not stale it (same finding as batch-20261125-1216-cifix1). Ran
`npm run build:content-status` then `npm run check:content`: all 14 content gates PASS.

## Outcome

- ✅ Impact: PR #921's only red check (`figure-geometry`) is fixed at the source; `npm run check:content` is green on this branch.
- 🧪 Tests: `--ci-fonts --changed 42b33b89...` exit 0 (was 10 problems); all six edited SVGs clean in `--ci-fonts`; `figures:variants:check` OK; `check:svg-style`, `check:figures`, `check:no-em-dash` pass; 14/14 content gates pass.
- 📁 Files: six EFPC-411 Unit 1 Urdu SVGs (labels only; no geometry, palette, manifest or prose change).
- 🔁 Next prompts: CI must re-run `figure-geometry` on PR #921 to confirm. EFPC-411 Unit 1 G3 en-review, G4 ur-translation and G5 ur-review stay open; this PR certifies nothing.
- 🧠 Reflection: the Urdu mirror was laid out by eye against the English column widths. DejaVu (the CI fallback) renders these Urdu strings wider than Noto Nastaliq, so a label that fits locally fails on the runner. The `.sh` cells are semi-bold, which widens them further. Measuring in `--ci-fonts` mode is the only reliable check.

## Handoff (for CEO and agents)

- Shipped / changed: three EFPC-411 Unit 1 Urdu table figures re-worded so every label clears its neighbours under the CI fallback face; dark twins regenerated.
- Decisions the team must respect: keep the shortened labels (`سپروائزر کی ہدایت`, `جوڑے کو نام لے کر پرامن کیا`, the three-line reflective-journal entry, `ریاضی کے مراحل کی وضاحت کرتی ہیں`, `متحرک کلاس پر غرق، چیخنے کے بغیر`). Do not restore the longer forms; they are what overran the columns in DejaVu.
- Pending / next owner: CI's `figure-geometry` job must confirm on PR #921. EFPC-411 Unit 1 G3/G4/G5 stay open; this PR certifies nothing.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Urdu figure labels measured only against the local Nastaliq face; CI runners have no Nastaliq and fall back to DejaVu Sans, which is wider for these strings. The `.sh` class is 600 weight, so its labels are wider still. Earlier batches on this PR family had the same local-passes/CI-pending pattern.
- Graders run and results (PASS/FAIL): PASS - `measure-figure-text.mjs --ci-fonts --changed 42b33b89...` exit 0; `npm run check:content` 14/14 PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): run `measure-figure-text.mjs --ci-fonts` (not the default face) as the last step of every Urdu figure edit.
