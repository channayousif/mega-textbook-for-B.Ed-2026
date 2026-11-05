---
id: crew-gsos-301-u03-repair_en
title: crew repair_en GSOS-301 unit 3
stage: misc
date: 2026-11-05
surface: agent
model: codex
feature: gsos-301
branch: crew/gsos-301-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-03/index.mdx
 - docs/semester-2/gsos-301/unit-03/topic-01.mdx
 - docs/semester-2/gsos-301/unit-03/topic-02.mdx
 - docs/semester-2/gsos-301/unit-03/unit-assessment.mdx
 - docs/semester-2/gsos-301/unit-03/unit-teacher-notes.mdx
 - history/prompts/general/20261130-repair-gsos301-unit-three.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/unit-teacher-notes.mdx
 - specs/content/gsos-301/concepts/unit-03.md
 - specs/content/gsos-301/coverage/unit-03.md
 - specs/content/gsos-301/figures/unit-03.md
 - specs/content/gsos-301/reviews/unit-03/G2/20261105T172625106Z-gates.json
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261105T172625106Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261105T172625106Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261105T172625106Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261105T172625106Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261105T172625106Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261105T172625106Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261105T172625106Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261105T172625106Z/validate-content.txt
 - specs/content/gsos-301/reviews/unit-03/repair-20261105.md
 - specs/content/gsos-301/reviews/unit-03/repair-content-check.log
 - specs/content/gsos-301/reviews/unit-03/repair-figure-measurement.log
 - specs/content/gsos-301/reviews/unit-03/repair-source-binding.sha256
 - specs/content/gsos-301/sources/unit-03.md
 - specs/content/gsos-301/tasks.md
 - static/img/figures/gsos-301/unit-03/fig-U3-1.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-1.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-1.ur.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-4.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-4.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u03-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gsos-301/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-03/`.

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
From `specs/content/gsos-301/reviews/unit-03/G3/20261102T212207Z-g3-desk-ece43fa7.json` (disposition: revise). Resolve each one:
- [blocking] topic-01.mdx Status and roles, index outcome 1, fig-U3-1 alt/brief, activity and summative task, unit-teacher-notes.mdx and assessment MCQ3/ERQ1 conflate inter-status role conflict with within-role strain. Both cited sources distinguish them (source-inspection.md). MCQ3 has no correct option. Separate author must repair explanation, cases, key, figure inputs and dependent concept mappings; approved spec also contains the conflation, so refer that bounded spec correction to its owner rather than editing approved authority here.
- [blocking] All four Figure src paths in topic-01.mdx and topic-02.mdx point to nonexistent static/img/figures/gsos-301/unit-03/fig-U3-[1-4].svg. Manifest rows are prompt-only with blank Src/Kind. Supply actual teaching assets and reconcile lifecycle in a separate visual job. check:figures passing does not demonstrate assets exist in this case.
- [blocking] unit-assessment.mdx RRQs distribute 3 items to Topic 3.1 (1,2,4) and 7 to Topic 3.2 (3,5,6,7,8,9,10), against approved 5/5. RRQ2 is simple recall outside Understand-to-Analyze blueprint; MCQ8 recognises a memorised feature despite Apply tag. Rebalance and classify thinking actually needed.
- [blocking] unit-assessment.mdx RRQ8 permits coercion although its stem establishes no threat; RRQ5 requests two examples but allocation awards one example; ERQ5 awards integration of both topics although competition, conflict and communication all belong to Topic 3.2. Make each stem and scoring rule align.
- [blocking] Both topic Summative task Mini-rubrics use numeric bands with reversed/ambiguous descriptor order; topic-01 Structural analysis offers three descriptors for four scores 0-3. ERQ criteria supply only binary achievement checks with no descriptors for quality of analysis/evaluation. Specify score-to-performance mappings.
- [blocking] topic-01 Further reading places groups and bureaucracy in OpenStax Chapter 4; inspected support is 6.1 and 6.3. coverage/unit-03.md adds hammondnd for U3-04..06 beyond approved Unit 3 mapping. sources/unit-03.md unavailable declarations lack complete dated attempts/authorisation linkage; no bound claim-support excerpts were supplied. Correct locators, source mappings and retrieval evidence.
- [blocking] topic-02 Explanation generalises about Pakistan rural/urban life, communication proportions and girls schooling benefits without inspected claim support; topic-01 transfer example asserts influence cannot bypass the queue as a guaranteed outcome. Supply specific support or explicitly bounded illustrations and ideal-type qualifications. See source-inspection.md for exact passage descriptions.
- [blocking] topic-02 Cooperation, competition, conflict, Check your understanding #2 and assessment RRQ3/key make absence of agreed rules the defining test for conflict. Opposition can operate within negotiated rules; the taught rule cannot distinguish cases reliably. Require direct opposition versus rivalry for a scarce reward and allow regulated conflict.
- [blocking] coverage/unit-03.md Reinforcement maps MCQ10 (conformity) to status/roles, MCQ8 (bureaucratic hierarchy) to groups and MCQ5 (sports competition) to communication. concepts/unit-03.md maps role strain to RRQ1 which only defines status/role, and conflict to MCQ9 which tests coercion. Repair links to items actually eliciting each concept.
- [advisory] Tracker Unit 3 not-started/G1-pending wording contradicts approved frontmatter, authored G2 and confirmed D-2026-0066. Parent/owner should reconcile metadata without treating this unsigned report as G3 completion.
- [advisory] check:content exits 1 solely on stale static/content-status.json, reproduced on clean origin/main at the identical input commit. Other 12 gates pass. No review-input repair or global generated-file change is made by this reviewer.
- [uncertain] No parent-prepared handoff or actual author run identity was supplied. Prepared and verified 88 inputs locally at 05b4e3c0f7535953a6f2c319a7599bd868cc93a7. Author PHR identifies opencode and author commit 099a6c2d, not an execution ID. Reviewer is actual CODEX_THREAD_ID 01a16968-f1c8-7233-add1-497c86787970. This fresh session did not author the unit; host-verifiable author identity and source-bound handoff remain unavailable. Model family is GPT-6; exact model build is not exposed. Do not certify.
- [uncertain] Desktop, 360px narrow view, keyboard table scrolling and A4 print not inspected: brief prohibits build/server/Playwright. No render-review execution or image evidence is claimed. ERQ rubric tables immediately follow bold labels without blank lines; check parsing in a permitted rendered review before calling that an observed layout defect.

## Notes from earlier jobs on this unit
- (gsos-301-u03-translate-r1, translate, claude) English MCQ 3 + key, topic 3.1 village example and teacher notes conflate role conflict with role strain; RRQ 3 guidance and RRQ 1-2 Bloom levels also need English repair, after which only those Urdu passages need re-translation.
- (gsos-301-u03-translate-r1, translate, claude) Concept graph labels CON:GSOS-301-3-13 as مواصلات while the Urdu prose uses the banked ابلاغ; the owner should align them. Proposed Urdu terms are listed in reviews/unit-03/G4/translation-handoff.md.
- (gsos-301-u03-translate-r1, translate, claude) Rendered Urdu (desktop, 360px, A4) has not been inspected; run render-inspect --locale ur on a permitted host before G5.
- (gsos-301-u03-figures, figures, codex) Urdu Unit 3 pages are absent; the translation job must wire the prepared Urdu SVGs.
- (gsos-301-u03-figures, figures, codex) Urdu Unit 3 pages are absent; the translation job must wire the prepared Urdu SVGs.


## Response snapshot

Repaired Unit 3 terminology, assessments, rubrics, figures, source records and mappings, mirrored corrections into Urdu, and refreshed G2 evidence.

## Outcome

- Impact: repair_en for GSOS-301 Unit 3 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 37 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 3 terminology, assessments, rubrics, figures, source records and mappings, mirrored corrections into Urdu, and refreshed G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner must correct the approved-spec conflation; independent source/provenance and rendered reviews remain pending. G3/G5 stay open.
  - Owner must correct the approved-spec conflation; independent source/provenance and rendered reviews remain pending. G3/G5 stay open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
