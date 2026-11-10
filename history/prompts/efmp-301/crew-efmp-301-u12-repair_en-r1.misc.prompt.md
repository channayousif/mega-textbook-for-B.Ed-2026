---
id: crew-efmp-301-u12-repair_en-r1
title: crew repair_en EFMP-301 unit 12
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: efmp-301
branch: crew/efmp-301-u12-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u12-repair_en-r1.misc.prompt.md
 - specs/content/efmp-301/reviews/unit-12/G3/20261110-repair-notes.md
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u12-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u12-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-301/reviews/unit-12/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 12 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 12 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-12/`.

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
From `specs/content/efmp-301/reviews/unit-12/G3/20261108T203238Z-g3-desk-ad4c974d.json` (disposition: revise). Resolve each one:
- [blocking] R002-F2: topic-03.mdx Technology and learning claims the screen has no face and therefore teacher modelling has no tablet equivalent; unit-assessment.mdx RRQ10 response awards two marks for modelling cannot happen, and RRQ5 includes the same claim. Bound seifert2009.md Chapter 2 modelling passage (lines 117-133, repeated under Chapter 2 extension) supports observing a model and vicarious reinforcement, but supplies no live-only restriction. Restrict the claim to the device failing to provide responsive relational judgement by itself, distinguish recorded human models, and repair the taught ...
- [blocking] R002-F6: unit-assessment.mdx ERQ rubrics assign four marks in every ERQ to writing within the word count, but none of its five ERQ prompts supplies a word limit. Topic-level summative tasks provide 250-300 words, which cannot establish a limit for the separate integrative ERQ4/5. Specify the limits or remove that scoring condition; do not penalise learners against an unstated requirement. Final-cycle owner escalation.
- [advisory] R002-F5: Carry run001 finding 9 partially: teacher notes now states the running question, but topic-03.mdx Self-assessment checklist asks for it while its Explanation leaves it in figure captions. State it in learner prose so the task is recoverable without captions or teacher notes.
- [advisory] R002-F7: unit-assessment.mdx RRQ2 mapping reputation/convenience/kindness is one defensible interpretation, not uniquely supplied by the stem. RRQ4 and RRQ5 require four/three components for two marks without component allocation. ERQ rubrics give mark weights and ideal descriptions but no partial-performance levels; ERQ2's Analyze row rewards naming rather than explicit analysis. Clarify partial-credit guidance and assess reasons rather than reproducing the model wording.
- [uncertain] R002-F1: Current desktop, narrow and A4 print inspection unavailable: .crew/brief.md explicitly forbids build, dev server and Playwright. No current rendered images or render-review execution is claimed. Prior run001 images predate repairs and cannot verify repaired fig-U12-3 (prior finding 3) or fig-U12-1 (prior finding 6). Preserve both as unverified; owner must arrange authorised visual inspection before closing accessibility.
- [uncertain] R002-F3: topic-03.mdx A real classroom situation and concluding paragraphs repeatedly report what the tablet project's own evaluation found, without identifying a project or evaluation in sources/unit-12.md. The classroom case is useful as an authored illustration, but its empirical-sounding evaluation is not verifiable from the bundle. Label it explicitly as a constructed illustrative case or bind the actual evaluation and supporting passage. Owner to settle source status; no outside source silently added.
- [uncertain] R002-F4: Run001 records author identity claude-code:022-author-efmp-301:8b67651c. Repair commit 678a6f2d and PHR 0070 establish separate Claude authoring, but no exact repair-session run ID or parent-attested identity bundle was supplied. This fresh Codex session did not write reviewed content; reviewer run is the actual CODEX_THREAD_ID. Exact deployed model version is not exposed beyond GPT-6/Codex. Record this provenance limitation rather than invent a repair-run identity or model version.

## Notes from earlier jobs on this unit
- (efmp-301-u12-repair_en, repair_en, codex) Owner must arrange visual inspection, resolve historical provenance limits, and authorise further review; G3/G5 remain open.
- (efmp-301-u12-repair_en, repair_en, codex) Owner must arrange visual inspection, resolve historical provenance limits, and authorise further review; G3/G5 remain open.
- (efmp-301-u12-review_en, review_en, codex) Owner action needed on modelling claims, unstated ERQ word limits, source uncertainty, and current visual inspection.
- (efmp-301-u12-review_en, review_en, codex) Owner action needed on modelling claims, unstated ERQ word limits, source uncertainty, and current visual inspection.

## Feedback from the previous attempt
the worker exited without committing any change

## Response snapshot

Verified that committed Unit 12 EN and UR content already satisfies every editable finding in G3 desk report ad4c974d, documented repair verification in repair-notes, and appended an unticked advisory tracker row in tasks.md; all 14 content gates pass.

## Outcome

- Impact: repair_en for EFMP-301 Unit 12 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before committing.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified Unit 12 EN/UR files satisfy G3 desk review report ad4c974d findings, added 20261110-repair-notes.md, and appended the advisory unticked tracker row in tasks.md.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this commit does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner must arrange authorised visual inspection (desktop, narrow-screen, A4 print) for fig-U12-1 and fig-U12-3.
  - Review provenance and historical author run metadata remain documented limitations.
  - Unit 12 G3 remains open and unticked pending owner authorisation for a subsequent review cycle under ADR-0019.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
