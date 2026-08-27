---
id: 0009
title: Content depth standard and authoring skill
stage: plan
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 006-content-pipeline
branch: main
user: channayousif@gmail.com
command: /sp.adr content-depth-standard-and-authoring-skill
labels: [content-pipeline, depth-standard, authoring-skill, style-guide-v2, adr]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md
  pr: null
files:
 - history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md
 - history/prompts/006-content-pipeline/0009-content-depth-standard-and-authoring-skill.plan.prompt.md
tests:
 - none (planning + ADR only; no code changed)
---

## Prompt

(Session spanned three user turns on 2026-08-26/27.)

Turn 1: "explain how a unit content is authored"

Turn 2: "I am not satisfied with the unit authored by this content pipeline, EFMP-302 Unit 1
is 3 week (9 credit hours) long and has 4 main topics, it does not provide the required depth
for 9 credit hours. the depth can be guaged by looking at the suggested readings or reffered
books/sources in the course outline @Scheme-and-Course-guides/ directory. it is proposed that
a reusable skill may be created for writing a unit according to international standards and
best practices for authoring educational content and other best resources on the same topic,
age appropriate. Also content-spec.md does not incorporate imprtant details such as course
description, suggested readings etc. Suggest me upgrades"

Turn 3: "Approved the proposed.
1. concepts are important, words remain flexible but avoid unnecessary length, be precise,
   may include one example to illustrate the point.
2. Redraft one unit to see the result.
3. ok to substitute as long as it is related to the content
4. HSC level is ok, simple language is better
5. create a Skill to make the process more smooth
Run /sp.adr"

## Response snapshot

Diagnosis confirmed against the repo: EFMP-302 Unit 1 (`docs/semester-1/efmp-302/unit-01/`)
covers weeks 1–3 of a 16-week 3 CH course, four guide sub-units (1.1–1.4, ~16 concepts), but
`index.mdx` is ~620 words / 10 reading-minutes and cites none of the six scholarly sources the
guide attaches (Hargreaves 2000; Demirkasımoğlu 2010; Carr 2000; Beijaard et al. 2004;
Brookfield 2017; Suarez & McGrath 2022). `specs/content/efmp-302/content-spec.md` has no
Course Description, a bare `Author (year)` reading list (no full citations / DOIs / per-unit
mapping / annotations), no week schedule, no derived teaching strategies, no standards anchors.

Proposed and user-approved a five-part clustered upgrade (→ ADR-0010, Accepted):
1. Depth standard in `style-guide.md` v2 — concept-coverage is the hard rule (every guide
   sub-topic → named subsection; committed `coverage.md` matrix); word length soft (precise,
   no padding, ~one example per point); scholarly engagement with mapped/substitute readings
   recorded in `sources-consulted.md`; required "Common misconceptions" + "Further reading"
   blocks; formative ≥5 items; HSC/Art. III.1 register unchanged.
2. Expanded `content-spec.md` schema — Course Description, annotated per-unit Reading list,
   Week schedule, Standards & frameworks anchors; per-unit depth budget / prerequisites /
   misconceptions / mapped readings / worked-examples plan.
3. Reusable skill `.claude/skills/author-unit/` — SKILL.md (source-gather → UbD backward
   design → draft five files → self-review + emit coverage.md) + references/ (pedagogy
   checklist, depth standard, citation/register).
4. New CI gate `scripts/check-unit-depth.mjs` wired after "Validate content".
5. Governance — style-guide + terminology.csv freeze → v2.0; proof-first rollout: re-draft
   EFMP-302 Unit 1 only, then decide on Units 2–6 and the EFMP-301 golden unit; README docs
   gate (Art. X.2).

`/sp.adr` note: `check-prerequisites.sh` aborts (not on a feature branch — on `main`), so the
skill's plan.md-driven flow could not run verbatim; created ADR-0010 directly via
`create-adr.sh` using this session's approved proposal + Spec 006 artifacts as the planning
context. No conflicts with existing ADRs (0004 is complementary — depth gate in the spirit of
its content build gate).

## Outcome

- ✅ Impact: ADR-0010 accepted, recording the content-depth standard + expanded content-spec
  schema + reusable authoring skill + CI depth gate + style-guide/terminology v2.0 freeze as
  one decision cluster extending Spec 006.
- 🧪 Tests: none — planning/ADR only.
- 📁 Files: `history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md`
  (created + filled); this PHR.
- 🔁 Next prompts: create a feature branch (e.g. `007-content-depth`) with spec/plan/tasks, or
  proceed directly to: (a) build `.claude/skills/author-unit/`, (b) draft `style-guide.md`
  v2.0 + `content-spec` schema, (c) re-draft EFMP-302 Unit 1 as the proof, (d) add
  `scripts/check-unit-depth.mjs` + CI step.
- 🧠 Reflection: The v1 pipeline optimized for structural correctness (five files, front
  matter, parity) and left conceptual depth to reviewer judgement; at 3,000-document scale
  that gap needs a structural proxy (coverage matrix) plus a skill that front-loads pedagogy.
- 📋 ADR: ADR-0010 (Accepted).

## Evaluation notes (flywheel)

- Failure modes observed: shallow at-scale output from a pipeline whose only depth signal was
  human review; content-spec missing author-facing source material (course description,
  annotated readings).
- Graders run and results (PASS/FAIL): ADR significance checklist — PASS (clustered decision,
  ≥1 alternative per sub-decision with rationale, pros+cons stated, references linked).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): re-draft EFMP-302 Unit 1 under the new standard
  and skill; compare concept coverage (guide sub-topics addressed) and citation count against
  the current draft before committing to a full EFMP-302 re-work.
