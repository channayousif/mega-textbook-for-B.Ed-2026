---
id: crew-efmp-303-u05-repair_en-r1
title: crew repair_en EFMP-303 unit 5 continuation
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-303
branch: crew/efmp-303-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/efmp-303/unit-05/topic-01.mdx
  - docs/semester-2/efmp-303/unit-05/topic-02.mdx
  - docs/semester-2/efmp-303/unit-05/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/unit-assessment.mdx
  - specs/content/efmp-303/concepts/unit-05.md
  - specs/content/efmp-303/coverage/unit-05.md
  - specs/content/efmp-303/reviews/unit-05/G2/20261103T084218376Z-gates.json
  - specs/content/efmp-303/reviews/unit-05/G2/logs-20261103T084218376Z/
  - specs/content/efmp-303/reviews/unit-05/G3/crew-repair-en-handoff.md
  - specs/content/efmp-303/sources/texts/gem-unitfive-2020.md
  - specs/content/efmp-303/sources/texts/nep-unitfive-2009.md
  - specs/content/efmp-303/sources/texts/wb-unitfive-2023.md
  - specs/content/efmp-303/sources/texts/wb_hci.md
  - specs/content/efmp-303/sources/unit-05.md
  - specs/content/efmp-303/sources/unit-05/ncc.md
  - specs/content/efmp-303/tasks.md
  - static/img/figures/efmp-303/unit-05/fig-U5-2.dark.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-2.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-2.ur.dark.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-2.ur.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-4.dark.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-4.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-4.ur.dark.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-4.ur.svg
  - history/prompts/efmp-303/crew-efmp-303-u05-repair_en-r1.misc.prompt.md
tests:
  - npm run check:content
  - npm test
  - node scripts/measure-figure-text.mjs static/img/figures/efmp-303/unit-05/*.svg
---

## Prompt

# Crew job efmp-303-u05-repair_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u05-repair_en`.
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

## Feedback from the previous attempt
npm run check:content has 5 finding(s) that main does not have:
✗ Pipeline gate failed with 4 finding(s):
- EFMP-303 Unit 1 (docs/semester-2/efmp-303/unit-01): G2 en-draft: stale or incomplete input manifest
- EFMP-303 Unit 2 (docs/semester-2/efmp-303/unit-02): G2 en-draft: stale or incomplete input manifest
- EFMP-303 Unit 4 (docs/semester-2/efmp-303/unit-04): G2 en-draft: stale or incomplete input manifest
- EFMP-303 Unit 6 (docs/semester-2/efmp-303/unit-06): G2 en-draft: stale or incomplete input manifest

## Response snapshot

Continued the existing repair branch. Corrected the NEP 2009 qualification wording to the differentiated elementary and secondary targets with their stated exceptions, replaced the unsourced SNC/NCP standardisation claims with a dated NCC FAQ description, finished the source-register repair with unit-specific bound paraphrases, restored the shared World Bank excerpt to its origin/main state, and removed the short-lived shared NEP/GEM excerpts that were invalidating Units 1, 2, 4 and 6 G2 evidence. Fixed the EN/UR MCQ-02 distractor mismatch, regenerated Unit 5 G2 gate evidence, and repointed the Unit 5 tracker row.

## Outcome

- Impact: repair_en continuation for EFMP-303 Unit 5 by opencode.
- Tests: `npm run check:content` 13/13 PASS; `npm test` 347/347 PASS; `node scripts/measure-figure-text.mjs` exit 0.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: the first repair pass added shared source excerpts that other units' tables name; creating files is enough to invalidate their committed G2 evidence even when the new unit does not cite them. Delete unused shared keys rather than restoring them.

## Handoff (for CEO and agents)

- Shipped / changed: completed all blocking and advisory G3 repairs in EN and UR; added unit-specific bound excerpts (`nep-unitfive-2009`, `gem-unitfive-2020`, `wb-unitfive-2023`, `ncc`); refreshed Unit 5 G2 evidence at `specs/content/efmp-303/reviews/unit-05/G2/20261103T084218376Z-gates.json`; kept the Unit 5 G3 row unticked with the advisory repair suggestion.
- Decisions the team must respect: G3/G5 remain open and unsigned; translation_status stays draft; the shared `texts/nep2009.md` and `texts/gem-report2020.md` must stay deleted because Units 1, 2, 4 and 6 cite those keys and their presence breaks those units' G2 manifests.
- Pending / next owner: fresh independent G3 review owns acceptance of these repairs; independent G5 owns the Urdu mirror and rendered inspection.
- Notes for the next job on this unit: F1 author identity and F2 narrow-screen/A4 rendered evidence remain unresolved under the no-build/no-server constraint. `static/content-status.json` is gitignored and must be regenerated locally after tracker edits.
- Paperclip issues affected: none (ticket null).

## Evaluation notes (flywheel)

- Failure modes observed: first-pass repair created shared excerpt files that other units cite; tracked-but-unused files invalidate committed G2 evidence for unrelated units. Also the EN/UR MCQ-02 distractor drifted during rebalancing.
- Graders run and results (PASS/FAIL): check:content PASS (13/13), npm test PASS (347/347), measure-figure-text PASS, pipeline-gate PASS.
- Prompt variant (if applicable): crew brief v1, continuation r1.
- Next experiment (smallest change to try): when adding a source excerpt under `sources/texts/`, first grep every unit's coverage/sources table for that key; if any other unit cites it, use a unit-namespaced key instead.
