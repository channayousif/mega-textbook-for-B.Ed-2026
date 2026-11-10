---
id: crew-efmp-304-u03-repair_en-r1
title: crew repair_en EFMP-304 unit 3 (r1)
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-304
branch: crew/efmp-304-u03-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-304/tasks.md
 - history/prompts/efmp-304/crew-efmp-304-u03-repair_en-r1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u03-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u03-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-304/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-03/`.

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
From `specs/content/efmp-304/reviews/unit-03/G3/20261108T203238Z-g3-desk-ef4a8074.json` (disposition: revise). Resolve each one:
- [blocking] Render inspection (visual accessibility) cannot be performed because the crew job constraint prohibits running npm run build or a dev server. A render-review requires a built/serving site. All other G3 criteria pass or are advisory. The unit needs a separate render inspection before it can be certified at G3.
- [advisory] bassham2010 is a declared-unverifiable print monograph. The prose attributes specific claims to it (e.g., 'Bassham et al. (2010) treat these four patterns as the core of introductory deductive reasoning' in topic-02.mdx:125-127). The sources file correctly limits it to title-level support. A reviewer with access to the book should confirm the four patterns and their near-miss fallacies match its treatment. This is honest but the attribution is slightly stronger than title-level support alone carries.
- [advisory] Render inspection (visual accessibility: small-screen layout, A4 print views, table scrollability) was not performed. The crew job constraint prohibits running npm run build or a dev server. Structural accessibility checks (alt text, heading hierarchy, link text) were verified from source. A separate render inspection is recommended before publication.

## Notes from earlier jobs on this unit
- (efmp-304-u03-illustrate, illustrate, agy) Fresh independent G3 and dependent G5 reviews remain open without certification.
- (efmp-304-u03-illustrate, illustrate, agy) Visual browser and print inspection (360px viewport, table scrollability, A4 print) remains unexecuted due to crew constraints prohibiting build, dev server, and Playwright runs.
- (efmp-304-u03-illustrate, illustrate, agy) English G3 for EFMP-304 Unit 3 remains open with an advisory escalate, so future English prose repair may require updating the Urdu mirror.
- (efmp-304-u03-repair_en, repair_en, agy) Visual browser and print inspection (360px viewport, table scrollability, A4 print) remains unexecuted because crew job constraints prohibit build/server/Playwright; full G3 certification needs permitted browser tooling on a live build.
- (efmp-304-u03-repair_en, repair_en, agy) Fresh independent G3 and dependent G5 review remain pending; stage stays open without certification.

## Response snapshot

Verified the latest G3 desk report's only content finding (bassham2010 over-attribution) is already resolved in the current bytes by repair commit 8e7f76c4a; appended an unticked Unit 3 G3 advisory repair row naming the report and recorded this PHR.

## Outcome

- Impact: repair_en for EFMP-304 Unit 3 (attempt r1, opencode).
- Tests: npm run build:content-status and npm run check:content passed (14/14) on the clean tree and after the tracker edit.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Appended an unticked Unit 3 G3 advisory repair row naming `20261108T203238Z-g3-desk-ef4a8074.json`; no content edit was needed because the bassham2010 attribution finding is already resolved in current bytes (repair commit 8e7f76c4a).
- Decisions the team must respect: G3 stays open and unticked; the render inspection findings cannot be resolved by content edits and need a separate permitted render inspection on a live build.
- Pending / next owner: crew lead; a permitted render inspection (360px viewport, table scrollability, A4 print) and fresh independent G3/G5 remain open.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
