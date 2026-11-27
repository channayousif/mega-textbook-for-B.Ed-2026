---
id: crew-batch-20261127-1517-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261127-1517
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/936
files:
 - static/img/figures/efpg-402/unit-04/fig-U4-3.ur.svg
 - static/img/figures/efpg-402/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/efpg-402/unit-04/fig-U4-10.ur.svg
 - static/img/figures/efpg-402/unit-04/fig-U4-10.ur.dark.svg
 - history/prompts/crew/crew-batch-20261127-1517-cifix1.misc.prompt.md
tests:
 - npm run check:content (14/14 gates PASS)
 - node scripts/measure-figure-text.mjs --ci-fonts --changed 956c4ba9149ccc34e41e7d1dc31c624f7709d1b6 (exit 0)
 - node scripts/measure-figure-text.mjs --changed 956c4ba9149ccc34e41e7d1dc31c624f7709d1b6 (exit 0)
---

## Prompt

# Crew job batch-20261127-1517-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261127-1517`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #936 (checks: figure-geometry). Run `gh pr checks 936` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#936) changes, which belong to the crew jobs efpc-411-u01-repair_en, efpc-411-u03-review_en, efpg-402-u04-translate. Change only what the merge or CI needs.

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
- (batch-20261127-1300-cifix1, fix, claude_crew) CI's figure-geometry job must re-run on PR #931 to confirm; the local `--ci-fonts --changed c8efed9...` run is the same measurement and exits 0.
- (batch-20261127-1300-cifix1, fix, claude_crew) Keep the wrapped two-line forms; restoring the single-line headers or the long accuracy cell reintroduces the DejaVu overlaps.
- (batch-20261127-1300-cifix1, fix, claude_crew) EFPG-402 Unit 2 G3/G4/G5 stay open; this job certifies nothing and touched no reviewer registry, evidence or publication state.
- (batch-20261127-1147-cifix1, fix, claude_crew) CI's build job on PR #930 must re-run and confirm; the `ur` locale build never ran because `en` SSG failed first, so it is worth watching.
- (batch-20261127-1147-cifix1, fix, claude_crew) Brace-free `$...$` spans remain in Unit 4 (`topic-02.mdx` `$\pm 10\%$`, `$N$`; `unit-assessment.mdx` `$\rightarrow$`, `$v = f\lambda$`); they build fine but render literally because the repo has no math plugin.

## Response snapshot

Read `gh pr checks 936` and the failed figure-geometry run 46023799280 (job 140589875565). Six text-geometry problems in two EFPG-402 Unit 4 Urdu figures: `fig-U4-3.ur.svg` overlapped by 20.2px and 20.8px ("امتحانی نلی (ٹیسٹ ٹیوب)" over the middle-column cell) and `fig-U4-10.ur.svg` overlapped by 3.6px ("کم خرچ ماڈلز بنانا؛ ڈیٹا جمع" against "2. پراجیکٹ کی تعمیر"). Reproduced locally with `node scripts/measure-figure-text.mjs --ci-fonts`.

Root cause: in both tables the right-hand column is 146px wide (grid line at x=610, anchor x=740), and the single-line Urdu labels are wider than that (180.2px and 146.5px in DejaVu Sans, the CI fallback face), so they crossed the divider into the next column. The English counterparts use short labels ("Test tube", "2. Development") and pass.

Fix: wrapped each over-long label onto two lines, the convention already used in the efpc-411 Urdu figures ("باقاعدہ" / "مشاہدہ" and similar), keeping the wording unchanged. `fig-U4-3`: "امتحانی نلی" (y=88) / "(ٹیسٹ ٹیوب)" (y=105). `fig-U4-10`: "2. پراجیکٹ" (y=149) / "کی تعمیر" (y=166), with the existing date line moved 180 to 183 to keep the 17px line pitch. Applied the identical edit to both `.ur.svg` and `.ur.dark.svg` (they differ only in the `:root` palette). No English file, figure manifest, source, coverage or concept was touched, so no G2 evidence refresh was due.

## Outcome

- Impact: the four changed SVGs now measure clean, so CI's figure-geometry job on PR #936 should pass; the two Urdu tables no longer print labels over their neighbours.
- Tests: `npm run check:content` 14/14 gates PASS; `measure-figure-text.mjs --ci-fonts --changed 956c4ba...` exit 0 (28 SVGs); same command without `--ci-fonts` exit 0.
- Files: four EFPG-402 Unit 4 Urdu figure SVGs and this PHR.
- Next prompts: CI figure-geometry on PR #936 must re-run and confirm.
- Reflection: the Urdu mirror can be wider than the English original it mirrors, so a label that fits the English column can still overflow its Urdu column; measure the Urdu SVG itself, not the English one.

## Handoff (for CEO and agents)

- Shipped / changed: wrapped the over-long right-column labels in `static/img/figures/efpg-402/unit-04/fig-U4-3.ur.svg` and `fig-U4-10.ur.svg` (and their `.ur.dark.svg` twins) onto two lines; wording unchanged.
- Decisions the team must respect: no G3/G5 status, reviewer registry, signed evidence, tracker gate status or publication state changed. No push and no PR opened. Zero em dashes. No English unit file, manifest, source, coverage or concept touched, so no `prepare-gate-evidence` run was required.
- Pending / next owner: CI figure-geometry on PR #936.
- Notes for the next job on this unit:
  - CI's figure-geometry job must re-run on PR #936 to confirm; the local `--ci-fonts --changed 956c4ba...` run is the same measurement and exits 0.
  - Keep these wrapped two-line forms; restoring the single-line labels reintroduces the DejaVu overlaps.
  - `fig-U4-10.ur.svg` row 2 now carries three lines in the right column ("2. پراجیکٹ" / "کی تعمیر" / date) where the other rows carry two; the row is 68px tall so it fits, but a future re-translation that shortens the phase name could collapse it back to two.
  - Brace-free `$...$` spans remain in Unit 4 (`topic-02.mdx` `$\pm 10\%$`, `$N$`; `unit-assessment.mdx` `$\rightarrow$`, `$v = f\lambda$`); they build fine but render literally because the repo has no math plugin.
  - EFPG-402 Unit 4 G3/G4/G5 stay open; this job certifies nothing.
- Paperclip issues affected: PR #936; crew job batch-20261127-1517-cifix1.

## Evaluation notes (flywheel)

- Failure modes observed: a Urdu label wider than its table column crosses the grid line and prints over the next column; the English original passing does not predict the Urdu mirror passing, because Nastaliq fallback (DejaVu Sans in CI) metrics differ from the English labels.
- Graders run and results (PASS/FAIL): check:content PASS (14/14); measure-figure-text --ci-fonts PASS (exit 0); measure-figure-text local fonts PASS (exit 0).
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): have the translate skill run `measure-figure-text.mjs --ci-fonts` on the Urdu SVGs it writes, so this class is caught before CI.
