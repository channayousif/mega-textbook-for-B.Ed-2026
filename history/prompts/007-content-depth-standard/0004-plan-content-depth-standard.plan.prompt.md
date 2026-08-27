---
id: 0004
title: Plan content depth standard
stage: plan
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 007-content-depth-standard
branch: 007-content-depth-standard
user: channayousif@gmail.com
command: /sp.plan
labels: [content-pipeline, depth-standard, authoring-skill, ci-gate, plan]
links:
  spec: specs/007-content-depth-standard/spec.md
  ticket: null
  adr: history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md
  pr: null
files:
 - specs/007-content-depth-standard/plan.md
 - specs/007-content-depth-standard/research.md
 - specs/007-content-depth-standard/data-model.md
 - specs/007-content-depth-standard/contracts/content-spec-v2.md
 - specs/007-content-depth-standard/contracts/coverage-matrix.md
 - specs/007-content-depth-standard/contracts/sources-consulted.md
 - specs/007-content-depth-standard/quickstart.md
 - specs/007-content-depth-standard/spec.md
 - CLAUDE.md
tests:
 - none (planning only; no code changed)
---

## Prompt

/sp.plan (no additional argument text)

Execute the implementation planning workflow for feature 007-content-depth-standard from its
approved, twice-clarified spec.md — fill Technical Context, run the Constitution Check gate,
produce Phase 0 research.md and Phase 1 data-model.md / contracts/ / quickstart.md, update the
agent context file, re-check the Constitution post-design, and stop before /sp.tasks.

## Response snapshot

`setup-plan.sh` copied the plan template. Read spec.md (all clarifications), constitution
v2.4.0, and the existing implementation this feature extends: `scripts/check-pipeline-gate.mjs`
(the gate shape to mirror), `scripts/check-no-answer-keys.mjs` (already scans `specs/content`),
`tests/unit/pipeline-gate.test.mjs` + `_helpers.mjs` (the fixture pattern),
`contracts/{content-spec,style-guide,unit}-frontmatter.schema.json`, `.github/workflows/ci.yml`,
`package.json`, and the EFMP-302 guide block in
`Scheme-and-Course-guides/extracted-text/1st 2026.txt`.

**plan.md** written:
- Technical Context — plain Node `.mjs` on Node 22+, `gray-matter` + hand-rolled table parser,
  **no new dependency**, Vitest fixture tests, GitHub Actions CI, single project. NEEDS
  CLARIFICATION: none (both /sp.clarify passes + ADR-0010 settled every fork).
- Constitution Check — PASS. 15 article rows evaluated. One tracked note (not a violation):
  Art. VI.1 names EFMP-301 Unit 1 as the golden unit; this feature raises the bar and proves
  it on EFMP-302 Unit 1 per user direction, deferring the EFMP-301 re-draft — recorded as the
  first post-feature follow-up, with a note that renaming the golden unit would be a
  Constitution PATCH. Complexity Tracking empty.
- Project Structure — new: `scripts/check-unit-depth.mjs`, `tests/unit/depth-gate.test.mjs`,
  `.claude/skills/author-unit/` (`SKILL.md` + 3 `references/`), 3 `contracts/*.md` format
  contracts; edited: `style-guide.md` (→ v2.0 + 2 sections), `efmp-302/content-spec.md`
  (expanded), `efmp-302/tasks.md` (+G4/G5 rows), EFMP-302 U1 five EN + five UR files, `ci.yml`,
  `package.json`, `README.md`, `contracts/style-guide-frontmatter.schema.json` (desc only).
- Phase 2 note + 3 risks (EFMP-301 below the raised bar; formative heuristic shallowness;
  skill/style-guide depth-standard drift).

**research.md** — R1–R10 as Decision/Rationale/Alternatives, each tied to a clarify answer or
ADR-0010, plus 3 plan-pinned format choices: R1 sub-topic ID grammar `U<n>-<seq>` (stable),
R6 reading-minutes band checked against the **unit total** (sum of 5 EN files), R7 formative
floor via `/^\s*\d+\.\s/m` count ≥ 5.

**data-model.md** — 6 file-based entities (Enumerated Sub-topic Checklist, Unit Coverage
Matrix, Sources-Consulted List, Expanded Course Content-Spec, Depth Standard, Authoring Skill)
with columns/rules/validation, a relationships diagram, and state transitions (unit enters
gate scope when its checklist table is added; irreversible).

**contracts/** — `content-spec-v2.md` (expanded body sections + the `### Sub-topic checklist`
table the gate parses), `coverage-matrix.md`, `sources-consulted.md` — Markdown format
contracts (these artefacts have no front matter, so JSON Schema doesn't apply — same reasoning
as Spec 006 pinning `tasks.md`'s shape in prose).

**quickstart.md** — 7 steps: seed style-guide v2 → contracts → build the gate + fixture tests
→ build the skill → prove on EFMP-302 U1 (expand content-spec, re-draft 5 EN files, emit
coverage/sources, Urdu handoff, run gates, human Content gate, freeze v2.0) → wire CI → README.
15-item verification checklist.

**Spec refinements during planning** (Constitution Art. IV.4): FR-012(d) + Assumptions
reworded from "each file's `est_reading_minutes`" to "sum of the unit's five English files'
`est_reading_minutes`" (a single band can't fit `teacher-notes.mdx` and `index.mdx`); an
Assumptions line saying the feature "re-runs its Urdu review" corrected to "hands off the Urdu
mirror for re-work" (matches round-2 clarify Q2).

`update-agent-context.sh claude` ran; CLAUDE.md's two 007 active-technology lines tidied from
the script's truncated parse into readable entries.

Post-design Constitution re-check: still PASS.

## Outcome

- ✅ Impact: Feature 007 fully planned; every artefact grounded in an existing file or a
  clarify decision; ready for `/sp.tasks`.
- 🧪 Tests: none — planning only. (Plan specifies `tests/unit/depth-gate.test.mjs` with 10
  fixture cases for the red/green split in `/sp.tasks`.)
- 📁 Files: plan.md, research.md, data-model.md, contracts/{content-spec-v2,coverage-matrix,
  sources-consulted}.md, quickstart.md; spec.md (2 refinement edits); CLAUDE.md (agent
  context).
- 🔁 Next prompts: `/sp.tasks` — decompose into dependency-ordered tasks (contracts +
  style-guide v2 → gate script + failing fixtures → gate implementation → EFMP-302
  content-spec expansion + U1 checklist → U1 EN re-draft + coverage/sources + tasks.md rows +
  UR status reset → CI wiring + package.json + README → human Content-gate pass).
- 🧠 Reflection: The whole feature reduces to "one Node script shaped like check-pipeline-gate,
  one skill, and Markdown" — the risk isn't build complexity, it's whether the re-drafted
  EFMP-302 U1 actually reads as deeper; the human Content gate (SC-003) is the real
  acceptance test, the CI gate only guards structure.
- 📋 ADR: the decision cluster is already ADR-0010 (Accepted). One residual governance
  question surfaced — whether EFMP-301 Unit 1 (constitutional golden unit) should be brought
  to v2.0 within this feature or the Constitution should name a different golden unit — see
  ADR suggestion below.

## Evaluation notes (flywheel)

- Failure modes observed: n/a (planning).
- Graders run and results (PASS/FAIL): Constitution Check gate — PASS (15 rows, 0 violations,
  1 tracked non-violation note); post-design re-check — PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): in `/sp.tasks`, sequence the EFMP-302 Unit 1
  checklist authoring as its **own** task before the EN re-draft, so the checklist (the gate's
  authoritative list) is reviewed for guide-fidelity by the curriculum owner before any prose
  is written against it.
