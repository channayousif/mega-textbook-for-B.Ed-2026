---
id: 0003
title: Clarify round 2 depth standard
stage: spec
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 007-content-depth-standard
branch: 007-content-depth-standard
user: channayousif@gmail.com
command: /sp.clarify
labels: [content-pipeline, depth-standard, clarify, spec]
links:
  spec: specs/007-content-depth-standard/spec.md
  ticket: null
  adr: history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md
  pr: null
files:
 - specs/007-content-depth-standard/spec.md
 - specs/007-content-depth-standard/checklists/requirements.md
 - history/prompts/007-content-depth-standard/0003-clarify-round-2-depth-standard.spec.prompt.md
tests:
 - none (specification clarification only; no code changed)
---

## Prompt

/sp.clarify (no additional argument text) — second interactive pass on
`specs/007-content-depth-standard/spec.md`. Three questions asked and answered (all "a" =
recommended option):

1. Q: Which units does the depth gate apply to?
   A: A — a unit is in scope iff its content-spec subsection carries the FR-009a enumerated
   guide-sub-topic checklist. Units without one are skipped (grandfathered) — no new
   front-matter marker; the checklist's presence is the opt-in. Mirrors Spec 006's gate
   skipping `coming_soon`.
2. Q: Is EFMP-302 Unit 1's Urdu re-work inside this feature's Definition of Done?
   A: A — no. DoD = the English re-draft passing every EN-side gate + the handoff (Urdu
   mirror's `translation_status` reset + a G4/G5 revision row opened in
   `specs/content/efmp-302/tasks.md`). The Urdu re-translation/re-review itself is the next
   pipeline task.
3. Q: Where does the v2.0 freeze marker live?
   A: A — `style-guide.md`'s `version` field alone governs the style-guide + terminology-bank
   pair (unchanged from Spec 006 FR-007); `terminology.csv` gains no version field. FR-014 /
   SC-007 / User Story 4 reworded to match.

## Response snapshot

Second ambiguity scan: prior round left most categories Clear; three residual points had
material impact (gate scope / grandfathering mechanism, feature-scope boundary for the proof
unit's Urdu, and a marker-location inconsistency between this spec and Spec 006 FR-007).

Spec edits applied incrementally and saved after each:
- Added `### Session 2026-08-27 (/sp.clarify, round 2)` under `## Clarifications` with the
  three Q/A bullets.
- Q1 → FR-012 (added the in-scope rule: gate runs only for units whose content-spec subsection
  has the FR-009a checklist); User Story 5 scenario 2 (EFMP-301 grandfathered automatically
  via absence of a checklist).
- Q2 → FR-016 (DoD now explicitly EN re-draft + EN-side gates + Urdu `translation_status`
  reset + G4/G5 revision row; Urdu re-review moved to the downstream list); FR-017 (EN
  re-draft opens the G4/G5 revision row and the re-review is downstream, not this feature);
  round-1 planning bullet on rollout lightly qualified to "English content only… every EN-side
  gate".
- Q3 → FR-014 (only `style-guide.md`'s `version` field, set to `"2.0"`; `terminology.csv` has
  no version field); User Story 4 body; SC-007 (reworded to the single field governing the
  pair).
- Updated `checklists/requirements.md` Notes.

Validation: round-2 session block has exactly 3 bullets, no duplicates; 3 asked (≤5);
headings consistent with the file's existing dated-session pattern; no contradictory leftover
text (scanned for "all units" / "every gate" / "terminology bank both read" — the one
remaining hit was the round-1 planning bullet, now qualified).

## Outcome

- ✅ Impact: Removes the last plan-blocking ambiguities — the depth-gate script now has a
  precise in-scope predicate (checklist present), the feature's scope boundary for the proof
  unit is fixed (EN + handoff, not full bilingual), and the v2.0 marker mechanics match Spec
  006 exactly (one field, one script change).
- 🧪 Tests: none — spec only.
- 📁 Files: `specs/007-content-depth-standard/spec.md` (Clarifications round-2 block; FR-012,
  FR-014, FR-016, FR-017; User Story 4 body; User Story 5 scenario 2; SC-007; round-1 rollout
  bullet), `checklists/requirements.md`, this PHR.
- 🔁 Next prompts: `/sp.plan` — nothing further to clarify. Plan should cover:
  `check-unit-depth.mjs` (walk `specs/content/`, for each course parse per-unit enumerated
  checklists, run the gate only for units that have one, compare `coverage/unit-NN.md`, check
  required blocks / formative ≥5 / reading-minutes band / matrix↔sources consistency);
  `.claude/skills/author-unit/` layout; `content-spec` schema diff (enumerated checklist +
  depth budget + course description + reading list + week schedule + standards anchors);
  `style-guide.md` v2.0 with the depth standard + gate-scope statement; CI wiring; and the
  EFMP-302 Unit 1 EN re-draft + Urdu-handoff sequence.
- 🧠 Reflection: Q1's "checklist presence = opt-in" avoids a `depth_standard:` front-matter
  flag and a bulk migration of already-published units in one move — the gate scales in as
  units are migrated, not all-or-nothing.

## Evaluation notes (flywheel)

- Failure modes observed: n/a (clarification).
- Graders run and results (PASS/FAIL): Clarifications structure check — PASS (3 bullets this
  round, ≤5 asked, headings consistent, terminology consistent, no contradictions left).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): in `/sp.plan`, pin the concrete row format of the
  enumerated checklist and `coverage/unit-NN.md` — a stable per-sub-topic id shared by both
  makes the structured comparison exact and the gate's failure message name the exact missing
  id.
