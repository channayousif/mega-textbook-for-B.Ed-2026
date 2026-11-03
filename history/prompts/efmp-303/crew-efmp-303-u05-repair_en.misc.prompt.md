---
id: crew-efmp-303-u05-repair_en
title: crew repair_en EFMP-303 unit 5
stage: misc
date: 2026-11-03
surface: agent
model: agy
feature: efmp-303
branch: crew/efmp-303-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/efmp-303/unit-05/topic-01.mdx
  - docs/semester-2/efmp-303/unit-05/topic-02.mdx
  - docs/semester-2/efmp-303/unit-05/unit-assessment.mdx
  - history/prompts/efmp-303/crew-efmp-303-u05-repair_en.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/unit-assessment.mdx
  - specs/content/efmp-303/concepts/unit-05.md
  - specs/content/efmp-303/coverage/unit-05.md
  - specs/content/efmp-303/reviews/unit-05/G2/20261103T071412577Z-gates.json
  - specs/content/efmp-303/reviews/unit-05/G3/crew-repair-en-handoff.md
  - specs/content/efmp-303/sources/texts/gem-report2020.md
  - specs/content/efmp-303/sources/texts/nep2009.md
  - specs/content/efmp-303/sources/texts/wb_hci.md
  - specs/content/efmp-303/sources/unit-05.md
  - specs/content/efmp-303/tasks.md
  - static/img/figures/efmp-303/unit-05/fig-U5-2.dark.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-2.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-2.ur.dark.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-2.ur.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-4.dark.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-4.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-4.ur.dark.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-4.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-303-u05-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-303/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-05/`.

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
From `specs/content/efmp-303/reviews/unit-05/G3/20261102T212207Z-g3-desk-58144d8a.json` (disposition: revise). Resolve each one:
- [blocking] F3: sources/unit-05.md, Unverifiable sources: no retrieval-attempt record or explicit owner authorization; claim-level disclaimer conflicts with specific policy and national trend assertions in both topics. Khan 2018 is used but absent from the source table; wb_hci has no retrievable document locator. Repair source register and bind actual supporting passages before fresh review.
- [blocking] F4: concepts/unit-05.md assessment mappings are semantically incorrect: curriculum maps MCQ-02 (teacher development), teacher training maps MCQ-04 (human capital), human capital maps MCQ-05/06 and RRQ-04 (quality cycle/inclusion), inequality maps MCQ-07 (training), inclusion maps MCQ-09 (standardization). Remap to actual item demand.
- [blocking] F5: unit-assessment.mdx RRQ-08 and its model assert a greatest-barriers pair without comparative evidence. Remove the ranking or supply justified comparative criteria; accept defensible examples.
- [blocking] F6: unit-assessment.mdx RRQ-02 marks omit why-mechanism-matters; RRQ-09 marks omit comparison and restrict judgement to teacher training. Align scoring with requested reasoning and allow justified alternatives. MCQ-09 is recognition, not Apply; RRQ-10 is explanation, not application. ERQ rubrics need descriptors that distinguish causal analysis and evaluation from listing.
- [blocking] F7: Both topic opening situations read as observed local events, with relative dates and specific incidents but no evidence or hypothetical label. Identify as constructed illustrations or document provenance; avoid presenting invented local incidents as reporting.
- [blocking] F10: Topic 5.1 Teacher training reduces the differentiated NEP 2009 qualification policy to all teachers holding at least B.Ed. by 2018. Preserve level distinctions and exceptions. See source-inspection.md for the exact policy locator; this external retrieval is supplementary, not a newly accepted manifest input.
- [advisory] F9: MCQ letters are B except item 8; several distractors are implausible. Rebalance and improve distractors. fig-U5-2 still labels accreditation authority NACTE / HEC despite prose distinction; clarify remit with sources. SVG fig-U5-4 puts Gender norms at x=660..760 over the employment box x=520..680; inspect overlap in a real render.
- [uncertain] F1: Author run identity and exact model build were not supplied. Reviewer is the actual CODEX_SESSION_ID in execution.json; author_run_id is explicitly unknown. This session did not author the unit, but independent handoff provenance cannot be fully verified. Manifest was prepared here over clean HEAD, not supplied by a separate parent.
- [uncertain] F2: Current narrow-screen and A4 rendered evidence unavailable under the brief prohibition on builds and servers. See render-limitation.txt. No accessibility pass claimed.
- [uncertain] F8: Topic 5.1 Standardization calls SNC the most recent effort and implies all-province reach without dated authoritative support. Verify scope and currency, including provincial adaptation, in a new bound source bundle.

## Notes from earlier jobs on this unit
- (efmp-303-u05-fix, fix, codex) Regenerated static/content-status.json remains uncommitted; it was already modified at task start.
- (efmp-303-u05-fix, fix, codex) G3 needs a fresh independent run.
- (efmp-303-u05-fix, fix, codex) Regenerated static/content-status.json remains uncommitted; it was already modified at task start.
- (efmp-303-u05-translate-r1, translate, agy) EFMP-303 Unit 5 Urdu mirror is complete at G4 (5 files, 4 localized .ur.svg figures with dark variants, 13/13 content gates pass); translation_status stays draft pending independent G5 review.
- (efmp-303-u05-translate-r1, translate, agy) Render inspection (desktop, narrow 360px, A4 print) was omitted per brief constraints and should be run during the independent G5 review session.

## Response snapshot

Applied all findings from the latest G3 review report (20261102T212207Z-g3-desk-58144d8a.json) to EFMP-303 Unit 5 across English and Urdu mirrored files, refreshed G2 deterministic evidence, and appended an unticked advisory G3 repair row.

## Outcome

- Impact: repair_en for EFMP-303 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed for all scoped gates; local individual gate scripts passed 100%.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied all G3 findings for EFMP-303 Unit 5 in English and Urdu, registered bound source texts (nep2009, gem-report2020), resolved khan2018 and wb_hci locators, remapped concept assessments, balanced MCQ keys, updated RRQ/ERQ scoring rubrics, framed opening scenarios as illustrative cases, fixed figure remits and SVG geometry, refreshed G2 gate manifest, and recorded the advisory G3 repair row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All findings from G3 report 20261102T212207Z-g3-desk-58144d8a are confirmed resolved in both EN and UR; Unit 5 requires a fresh independent G3 review run.
  - G4 Urdu mirror (5 files, 4 localized SVG figures) remains synchronized and intact with translation_status set to draft pending independent G5 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): validate:content PASS, check:depth-gate PASS, check:figures PASS, check:no-em-dash PASS, check:no-answer-keys PASS, check:concept-graph PASS, check:bloom-bands PASS, check:source-floor PASS, check:licence PASS, licence:map:check PASS, check:content-status PASS, check:docs-sync PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
