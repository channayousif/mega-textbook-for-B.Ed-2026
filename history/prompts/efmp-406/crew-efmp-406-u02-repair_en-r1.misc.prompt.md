---
id: crew-efmp-406-u02-repair_en-r1
title: crew repair_en EFMP-406 unit 2 (r1)
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-406
branch: crew/efmp-406-u02-repair_en-r1
user: crew
command: Read .crew/brief.md and carry it out
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-406/crew-efmp-406-u02-repair_en-r1.misc.prompt.md
  - specs/content/efmp-406/tasks.md
tests:
  - npm run build:content-status
  - npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efmp-406/unit-02/fig-U2-1.svg static/img/figures/efmp-406/unit-02/fig-U2-1.dark.svg static/img/figures/efmp-406/unit-02/fig-U2-2.svg static/img/figures/efmp-406/unit-02/fig-U2-2.dark.svg static/img/figures/efmp-406/unit-02/fig-U2-3.svg static/img/figures/efmp-406/unit-02/fig-U2-3.dark.svg static/img/figures/efmp-406/unit-02/fig-U2-4.svg static/img/figures/efmp-406/unit-02/fig-U2-4.dark.svg
  - git diff --check
---

## Prompt

# Crew job efmp-406-u02-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-406/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/efmp-406/reviews/unit-02/G3/20261108T203238Z-g3-desk-d76ac5cd.json` (disposition: revise). Resolve each one:
- [blocking] RRQ 2, 3 and 9 schemes reward unrequested additions or explanations. Align prompts and full-credit requirements as detailed in crew-review/findings.md.
- [advisory] Review Bloom demand/tag alignment for MCQ 4/8 and Topic 2.2 retrieval item 2 while respecting approved bands.
- [uncertain] Actual author run identity, parent-prepared handoff and exact deployed model version unavailable. Crew job identifies reviewer task, not host session ID. Independence provenance requires coordinator evidence.
- [uncertain] Primary-source support not independently verified from a bound passage bundle; provide frozen excerpts or complete authorised unavailable-source declarations.
- [uncertain] Actual narrow-screen and A4 print inspection plus SVG glyph geometry unavailable because brief prohibits builds and Playwright. Accessibility remains unverified.

## Notes from earlier jobs on this unit
- (efmp-406-u02-translate-r1, translate, codex) Status remains draft; independent G3/G5 review and authorised browser, print and SVG geometry checks remain pending.
- (efmp-406-u02-translate-r1, translate, codex) Status remains draft; independent G3/G5 review and authorised browser, print and SVG geometry checks remain pending.
- (efmp-406-u02-repair_en, repair_en, claude) The source-excerpt bundle, author run provenance and the screen, print and SVG geometry checks are still open and need the coordinator and a host that can run a browser.
- (efmp-406-u02-repair_en, repair_en, claude) The questions and model answers changed in RRQ 2/3/9, MCQ 4/8 and Topic 2.2 check item 2, so the Urdu translation job should start from the repaired English, and a fresh independent G3 review must look at these new versions.
- (efmp-406-u02-translate, translate, codex) English author must repair RRQ 2/3/9 before translation resumes; draft status and G3/G5 remain unchanged.

## Response snapshot

Verified that the current Unit 2 bytes already carry the bb9cdada5 repairs for the 20261108 desk report's stale findings, measured all 8 EN SVG variants with measure-figure-text (exit 0), and appended the advisory G3 tracker row naming 20261108T203238Z-g3-desk-d76ac5cd.json. G3 left unticked.

## Outcome

- Impact: resolved the EFMP-406 Unit 2 G3 repair findings for report 20261108T203238Z-g3-desk-d76ac5cd.json without invalidating accepted evidence.
- Tests: all 14 content gates pass after an ignored content-status cache refresh; all 8 EN SVG variants pass measure-figure-text geometry.
- Files: 2 file(s), listed above.
- Next prompts: fresh independent G3; existing draft Urdu still needs independent G5 and rendered inspection.
- Reflection: the desk report's findings are stale against its own input manifest, which already carries the repairs.

## Handoff (for CEO and agents)

- Shipped / changed: advisory Unit 2 G3 tracker row naming 20261108T203238Z-g3-desk-d76ac5cd.json, and this PHR.
- Decisions the team must respect: keep G3 unticked; no certification, publication change or reviewer identity substitution; the report's findings were already resolved by bb9cdada5, so a fresh independent review must check the current bytes.
- Pending / next owner: independent reviewer owns fresh G3; the source passage bundle, author run provenance and narrow-screen/A4 print inspection remain with the coordinator and an authorised browser host.
- Paperclip issues affected: no ticket supplied in the crew brief.

## Evaluation notes (flywheel)

- Failure modes observed: the desk report's findings describe the pre-repair bytes while its input manifest binds the repaired bytes; verify current bytes before editing content.
- Graders run and results (PASS/FAIL): all 14 content gates PASS; measure-figure-text PASS on 8 EN SVGs; git diff --check PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): fresh independent review of current inputs.
