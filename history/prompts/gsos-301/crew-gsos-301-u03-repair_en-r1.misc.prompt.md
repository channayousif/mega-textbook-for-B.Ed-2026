---
id: crew-gsos-301-u03-repair_en-r1
title: crew repair_en GSOS-301 unit 3
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u03-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gsos-301/tasks.md
 - history/prompts/gsos-301/crew-gsos-301-u03-repair_en-r1.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job gsos-301-u03-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u03-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
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
From `specs/content/gsos-301/reviews/unit-03/G3/20261108T203238Z-g3-desk-193c20bb.json` (disposition: revise). Resolve each one:
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
- (gsos-301-u03-repair_en, repair_en, codex) Owner must correct the approved-spec conflation; independent source/provenance and rendered reviews remain pending. G3/G5 stay open.
- (gsos-301-u03-repair_en, repair_en, codex) Owner must correct the approved-spec conflation; independent source/provenance and rendered reviews remain pending. G3/G5 stay open.
- (gsos-301-u03-translate-r1, translate, claude) English MCQ 3 + key, topic 3.1 village example and teacher notes conflate role conflict with role strain; RRQ 3 guidance and RRQ 1-2 Bloom levels also need English repair, after which only those Urdu passages need re-translation.
- (gsos-301-u03-translate-r1, translate, claude) Concept graph labels CON:GSOS-301-3-13 as مواصلات while the Urdu prose uses the banked ابلاغ; the owner should align them. Proposed Urdu terms are listed in reviews/unit-03/G4/translation-handoff.md.
- (gsos-301-u03-translate-r1, translate, claude) Rendered Urdu (desktop, 360px, A4) has not been inspected; run render-inspect --locale ur on a permitted host before G5.

## Response snapshot

Verified that the latest G3 desk report's findings were already repaired on main by commits 1c7d1cfed and 6770b3915, and appended an unticked advisory tracker row naming report 20261108T203238Z-g3-desk-193c20bb.json. No content edits were required.

## Outcome

- Impact: repair_en for GSOS-301 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed (all 14 content gates) after regenerating static/content-status.json.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the latest G3 desk report's findings were already repaired on main and appended an unticked advisory tracker row naming report 20261108T203238Z-g3-desk-193c20bb.json.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this commit does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the commit touches a protected path).
- Notes for the next job on this unit:
  - The 20261108 desk report carries findings identical to the 20261102 report, but its input manifest binds the current repaired files, so treat it as a carry-forward rather than a fresh review.
  - The approved content-spec Unit 3 worked example still calls a multi-status clash role strain; the curriculum owner must correct that bounded conflation.
  - Historical author provenance and rendered narrow-screen/A4 inspection remain open and are not author-repairable.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
