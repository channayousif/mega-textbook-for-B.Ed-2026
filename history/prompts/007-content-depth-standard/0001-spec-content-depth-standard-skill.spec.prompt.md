---
id: 0001
title: Spec content depth standard skill
stage: spec
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 007-content-depth-standard
branch: 007-content-depth-standard
user: channayousif@gmail.com
command: /sp.specify
labels: [content-pipeline, depth-standard, authoring-skill, ci-gate, spec]
links:
  spec: specs/007-content-depth-standard/spec.md
  ticket: null
  adr: history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md
  pr: null
files:
 - specs/007-content-depth-standard/spec.md
 - specs/007-content-depth-standard/checklists/requirements.md
 - history/prompts/007-content-depth-standard/0001-spec-content-depth-standard-skill.spec.prompt.md
tests:
 - none (specification only; no code changed)
---

## Prompt

User: "proceed with new feature branch."

(Preceding turn: user approved ADR-0010 and answered five planning clarifiers —
1. concepts matter, words flexible/precise/no padding, ~one example per point;
2. re-draft ONE unit (EFMP-302 Unit 1) to see the result;
3. OK to substitute open-access sources as long as topically related;
4. HSC-level register, simple language;
5. create a Skill — then said "Run /sp.adr", which produced ADR-0010 Accepted.)

The `/sp.specify` feature description passed into this run:

Content depth standard and reusable unit-authoring skill (extends Spec 006). Per ADR-0010
(Accepted, 2026-08-27). Problem: the content pipeline's first at-scale output (EFMP-302 Units
1-6) is too shallow for the credit weight — EFMP-302 Unit 1 covers weeks 1-3 of a 16-week
course, four guide sub-units (~16 concepts), but index.mdx is ~620 words and cites none of the
six scholarly sources the guide attaches; content-spec.md omits Course Description, full
annotated reading list, week schedule, teaching strategies, and standards anchors.

Scope (5 clustered components that version together):
1. Depth standard added to specs/content/style-guide.md v2.0 — concept coverage is the HARD
   rule: every course-guide sub-topic bullet gets its own named subsection in the file it
   folds into; a committed per-unit coverage.md maps guide-sub-topic -> file -> section ->
   source-cited. Word length is SOFT: precise and complete over the concept set, no padding,
   ~one Pakistan-grounded example per sub-topic. Scholarly engagement: paraphrase-and-cite the
   unit's mapped readings, or a topically-related open-access substitute recorded in a
   committed sources-consulted.md. Required blocks: "Common misconceptions" and "Further
   reading" (real citations) in index.mdx; formative >=5 items floor; summative keeps rubric +
   >=1 Analyze. Register UNCHANGED — HSC/intermediate-graduate plain English (Constitution
   Art. III.1); concept depth rises, language complexity does not.
2. Expanded content-spec.md schema (contracts/content-spec-frontmatter.schema.json bump +
   template) — new required sections: Course Description; Reading list (full APA + DOI/URL,
   each entry tagged to unit(s), one-line annotation, split guide-required vs
   curated-supplementary); Week schedule; Standards & frameworks anchors (UNESCO/NACTE/OECD/
   National Professional Standards for Teachers Pakistan/HEC). Per-unit subsection gains: depth
   budget (concept count + target reading minutes), prerequisite knowledge, common
   misconceptions, mapped readings, worked-examples plan, international best-practice notes.
3. Reusable skill .claude/skills/author-unit/ (Claude Code skill, progressive disclosure) —
   SKILL.md drives G1->G2: source gathering (read guide sub-unit verbatim, pull mapped
   readings, substitute reputable open sources when unavailable) -> backward design / UbD
   (CLOs -> understandings -> assessment evidence -> content, Bloom alignment table) -> draft
   the five files to the depth standard -> self-review + emit coverage.md. references/ files:
   pedagogy checklist (cognitive load, worked-example effect, retrieval practice, UDL,
   explicit vocabulary, dialogic/inquiry activities), depth standard (shared numeric source of
   truth), citation/register rules.
4. New CI depth gate — scripts/check-unit-depth.mjs (plain Node + gray-matter, same shape as
   check-pipeline-gate.mjs): asserts coverage.md exists and references every guide sub-topic
   for the unit, required blocks present, formative item count >=5, est_reading_minutes
   consistent with content length. Wired into .github/workflows/ci.yml after "Validate
   content", alongside the Spec 006 pipeline gate. Additive to Spec 001 validators and the
   FR-016 pipeline gate, not a replacement.
5. Governance + proof-first rollout — style-guide.md + terminology.csv freeze bumped to v2.0
   (they freeze as a pair per Spec 006 FR-007). Definition of Done: v2.0 style guide +
   expanded content-spec schema + author-unit skill + check-unit-depth.mjs in CI + EFMP-302
   Unit 1 re-drafted through the new standard and passing all gates with a committed
   coverage.md and sources-consulted.md. Re-drafting EFMP-302 Units 2-6 and deciding EFMP-301
   golden unit (re-draft vs grandfather-with-note) is subsequent execution tracked through the
   pipeline's own task trackers, NOT a condition of this feature being done.

User constraints from planning (2026-08-27): concepts matter, words flexible/precise/no
padding, ~one example per point; prove on ONE unit (EFMP-302 Unit 1) before wider rollout;
open-access source substitution OK when topically related; HSC-level simple language; package
the method as a Skill.

## Response snapshot

Created feature branch `007-content-depth-standard` (next number after 006; no existing
`content-depth` branch/spec) via `create-new-feature.sh --number 7`.

Wrote `specs/007-content-depth-standard/spec.md` following the Spec 006 process-spec pattern:
- 5 prioritized user stories: (P1) author a unit to the concept-coverage standard using the
  skill; (P1) expand the course content-spec so it carries course description / annotated
  readings / week schedule / standards anchors / per-unit depth budget; (P2) CI depth gate
  blocks a merge missing the structural evidence of depth; (P2) freeze style guide +
  terminology bank as a v2.0 pair; (P3) roll to remaining units via the existing tracker
  without re-opening this feature.
- 18 functional requirements (FR-001…FR-018): concept-coverage hard rule + soft no-padding
  length; per-unit coverage matrix; scholarly engagement with mapped/substitute sources +
  sources-consulted list; "no external source found" escalation path; required
  misconceptions/further-reading blocks; formative >=5 floor; register ceiling held
  explicitly; expanded content-spec schema + per-unit fields + approved status; the authoring
  skill and its reference material; the additive CI depth gate + failure-message requirement;
  explicit statement that the gate is structural-only and judgement stays with the human
  Content gate; v2.0 pair freeze; EFMP-302 Unit 1 proof; DoD scoped to the proof (Units 2-6
  and EFMP-301 decision are downstream); Urdu mirror inherits coverage via Spec 001 parity, no
  separate coverage matrix, EN re-draft drops translation_status; README docs gate.
- 8 measurable, technology-agnostic success criteria (100% sub-topic coverage; >=3 scholarly
  sources up from 0; passes all four gates first run; thin PR fails the gate 100%; register
  spot-check clean; content-spec carries description + 100% of guide readings; both docs read
  v2.0; a second author needs zero "how deep is deep enough" questions).
- Assumptions + Dependencies sections tie back to Spec 006, Spec 001, ADR-0010, and the
  relevant Constitution articles.

Wrote `checklists/requirements.md` — all 20 items pass; no [NEEDS CLARIFICATION] markers (the
six planning clarifications are encoded in `## Clarifications`); script/skill mechanics
deferred to `/sp.plan`.

## Outcome

- ✅ Impact: Feature 007 scoped and specified; branch live; ready for `/sp.plan`.
- 🧪 Tests: none — spec only.
- 📁 Files: `specs/007-content-depth-standard/spec.md`,
  `specs/007-content-depth-standard/checklists/requirements.md`, this PHR.
- 🔁 Next prompts: `/sp.plan` (design the depth gate script shape, the skill layout, the
  content-spec schema diff, the CI wiring, and the EFMP-302 Unit 1 re-draft sequence);
  optionally `/sp.clarify` first if the team wants a formal pass.
- 🧠 Reflection: Kept the spec at the "what must be guaranteed" altitude — the concept-coverage
  rule and per-unit depth budget are the testable core; padding detection is explicitly left
  to human review because no automated check can own it.

## Evaluation notes (flywheel)

- Failure modes observed: n/a (spec authoring).
- Graders run and results (PASS/FAIL): spec quality checklist — 20/20 PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): during `/sp.plan`, decide whether the coverage
  matrix is a standalone `coverage.md` per unit dir or a subsection appended to the course
  content-spec (mirrors the Spec 006 R1 unit-spec decision) — this materially shapes the depth
  gate script.
