---
id: 20261303
title: Fix CI figure-geometry failure on EFPG-402 Unit 2 Urdu table labels
stage: general
date: 2026-11-27
surface: agent
model: claude-longcat-2-5
feature: 032-textbook-visuals
branch: crew/batch-20261127-1300
user: crew
command: crew job batch-20261127-1300-cifix1
labels: [claude_crew, fix]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: 931
files:
  - static/img/figures/efpg-402/unit-02/fig-U2-7.ur.svg
  - static/img/figures/efpg-402/unit-02/fig-U2-7.ur.dark.svg
  - static/img/figures/efpg-402/unit-02/fig-U2-10.ur.svg
  - static/img/figures/efpg-402/unit-02/fig-U2-10.ur.dark.svg
  - history/prompts/general/20261303-efpg402-u02-fig-ur-label-fix.general.prompt.md
tests:
  - gh pr checks 931 (only figure-geometry fail)
  - gh run view --log-failed 46003558842
  - node scripts/measure-figure-text.mjs --ci-fonts (four edited SVGs, exit 0)
  - node scripts/measure-figure-text.mjs --ci-fonts --changed c8efed9b430b39867c1418fae61194c49cefcda9 (exit 0, 20 files)
  - node scripts/build-figure-variants.mjs (2 dark twins rewritten)
  - node scripts/build-figure-variants.mjs --check (1863 figures OK)
  - npm run build:content-status (regenerated)
  - npm run check:content (14/14 PASS)
---

## Prompt

# Crew job batch-20261127-1300-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261127-1300`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #931 (checks: figure-geometry). Run `gh pr checks 931` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#931) changes, which belong to the crew jobs efpc-411-u03-illustrate, efpc-411-u01-review_en, efpg-402-u02-translate. Change only what the merge or CI needs.

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
- (batch-20261127-1147-cifix1, fix, claude_crew) CI's build job on PR #930 must re-run and confirm; the `ur` locale build never ran because `en` SSG failed first, so it is worth watching.
- (batch-20261127-1147-cifix1, fix, claude_crew) Brace-free `$...$` spans remain in Unit 4 (`topic-02.mdx` `$\pm 10\%$`, `$N$`; `unit-assessment.mdx` `$\rightarrow$`, `$v = f\lambda$`); they build fine but render literally because the repo has no math plugin.
- (batch-20261127-1147-cifix1, fix, claude_crew) EFPG-402 Unit 4 G3/G4/G5 stay open; this job certifies nothing and changed no reviewer registry or publication state.
- (batch-20261127-0745-cifix1, fix, claude_crew) CI's build job must re-run and confirm on PR #927.
- (batch-20261127-0745-cifix1, fix, claude_crew) `static/studio/slides/efmp-301/unit-05.en.pptx` still holds the old phrase; the gate does not scan `.pptx`, so regenerate offline if the download should match the outline.

## Response snapshot

Read `gh pr checks 931` and `gh run view --log-failed 46003558842`: the only red check is
`figure-geometry`, on two EFPG-402 Unit 2 Urdu tables and their dark twins (6 problems, identical in
both variants):

- `fig-U2-10.ur.svg`: overlaps 7.9px: "سائنس کیا دیتی ہے" / "سائنس کیا لیتی ہے"; overlaps 3.3px:
  "جماعت 6 تا 8 مثال" / "سائنس کیا دیتی ہے"
- `fig-U2-7.ur.svg`: overlaps 13.8px: "غلط حقائق غلط سائنس سکھاتے ہیں" /
  "حقائق موجودہ سائنس اور قومی نصاب کے SLOs"

Reproduced locally with `scripts/heavy.sh node scripts/measure-figure-text.mjs --ci-fonts ...` (same 6
problems). This machine has Noto Nastaliq, so a default-face run hides the defect; `--ci-fonts` forces
the CI fallback face (DejaVu Sans), which is what the runner measures.

Measured candidate strings under DejaVu at the real class weights (`.sh` is 14px/600, `.cell` is
13px/400) and re-wrapped the over-long labels, following the svg-authoring rule "wrap, don't shrink"
(no label text was changed, no font size was changed):

- fig-U2-10 header: `سائنس کیا لیتی ہے` split to `سائنس` (41.9px) / `کیا لیتی ہے` (62.1px) and
  `سائنس کیا دیتی ہے` split to `سائنس` / `کیا دیتی ہے` (63.7px), both at the same x, lines at y=58.6
  and y=80.6
- fig-U2-7 row 1 middle cell: `حقائق موجودہ سائنس اور قومی نصاب کے SLOs کے مطابق` split to
  `حقائق موجودہ سائنس اور قومی نصاب کے SLOs` (264.1px) / `کے مطابق` (56.2px), lines at y=123.2 and
  y=147

Regenerated the two dark twins with `node scripts/build-figure-variants.mjs` (only those two changed).
`measure-figure-text.mjs --ci-fonts` exits 0 on all four edited SVGs, and the CI-fallback simulation
of the changed set, `--ci-fonts --changed c8efed9b430b39867c1418fae61194c49cefcda9`, exits 0 over
all 20 changed figure SVGs.

No gate-evidence refresh: the Unit 2 G2 manifest binds English SVGs only (no `.ur.svg` entries), so
Urdu-only figure edits do not stale it. Ran `npm run build:content-status` then
`npm run check:content`: all 14 content gates PASS.

## Outcome

- ✅ Impact: PR #931's only red check (`figure-geometry`) is fixed at the source; `npm run check:content` is green on this branch.
- 🧪 Tests: `--ci-fonts` exit 0 on the four edited SVGs; `--ci-fonts --changed c8efed9b430b39867c1418fae61194c49cefcda9` exit 0 (20 files); `figures:variants:check` OK (1863 figures); 14/14 content gates PASS.
- 📁 Files: four EFPG-402 Unit 2 Urdu SVGs (wrapped two over-long labels; no wording, geometry of other labels, palette, manifest or prose change).
- 🔁 Next prompts: CI must re-run `figure-geometry` on PR #931 to confirm. EFPG-402 Unit 2 G3/G4/G5 stay open; this PR certifies nothing.
- 🧠 Reflection: the Urdu mirror reused the English column widths. DejaVu (the CI fallback) renders these Urdu strings wider than Noto Nastaliq, so labels that fit locally fail on the runner. Wrapping at the same x and class keeps the wording and the 14px/13px scale while clearing the neighbours.

## Handoff (for CEO and agents)

- Shipped / changed: `fig-U2-10.ur.svg` header labels `سائنس کیا لیتی ہے` and `سائنس کیا دیتی ہے` wrapped to two lines each; `fig-U2-7.ur.svg` row 1 middle cell wrapped to two lines; dark twins regenerated.
- Decisions the team must respect: keep the wrapped two-line forms. Do not restore the single-line headers or the single-line long cell; they are what overran the columns under the CI fallback face. No G3/G5 status, publication state, reviewer registry or evidence changes. No push and no PR opened.
- Pending / next owner: CI's `figure-geometry` job must confirm on PR #931. EFPG-402 Unit 2 G3/G4/G5 stay open; this PR certifies nothing.

## Evaluation notes (flywheel)

- Failure modes observed: Urdu table headers and long cells laid out against English column widths overflow under CI's DejaVu fallback; local Playwright resolves the narrower Noto Nastaliq face and passes.
- Graders run and results (PASS/FAIL): check:content PASS (14/14); measure-figure-text PASS (`--ci-fonts` and `--changed`); build-figure-variants --check PASS.
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): Confirm PR #931 CI passes.
