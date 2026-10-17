---
id: 0154
title: TEX-117 EFMP-305 U4 number-line materials count, timing baseline, U5 RRQ 6 list alignment
stage: content
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: efmp-305
branch: agent/TEX-117
user: channayousif
command: paperclip heartbeat (CurriculumOwner, TEX-117)
labels: ["CurriculumOwner", "efmp-305", "content-correction", "G3", "D-2026-0065"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: TEX-117
  adr: null
  pr: "157"
files:
 - docs/semester-2/efmp-305/unit-04/topic-02.mdx
 - docs/semester-2/efmp-305/unit-04/unit-teacher-notes.mdx
 - docs/semester-2/efmp-305/unit-05/unit-assessment.mdx
tests:
  - check:no-answer-keys: pass
  - check:content: EFMP-305 failures pre-existing (G2 status, U6 depth-budget)
  - check:depth-gate: no EFMP-305 failures introduced
  - check:concept-graph: no EFMP-305 failures
---

## Why

TEX-117 asked for three specific English-source corrections before Unit 4 Urdu translation begins, plus a mechanical regression fix in Unit 5.

1. **Unit 4 topic-02 worked example 1 — bottle cap count mismatch.** Materials listed ten bottle caps but step 2 marks eleven positions (0 through 10) and step 3 glues one cap at each. A trainee cannot build the specified aid with ten caps.
2. **Unit 4 topic-02 — timing contradiction.** Gate-to-seat journey is about seven minutes on a dry day (line 40); the ramp claim says it would take "about ten minutes off Rameen's morning" (line 70), apparently saving more than the whole trip. No measured times were invented; the ambiguity needed explicit disposal.
3. **Unit 5 unit-assessment RRQ 6 — leading space regression.** Commit 9b14d48e (TEX-109) introduced a leading space before `6.` on both the question (line 203) and model answer (line 319). Normalize list alignment so the gate's 10-item bank recognition holds.

## What changed

**docs/semester-2/efmp-305/unit-04/topic-02.mdx**
- Line 189: "Ten bottle caps" → "Eleven bottle caps" to match the eleven marks (0 through 10) that each receive one cap.
- Lines 70-71: "ten minutes off Rameen's morning and remove" → "ten minutes off Rameen's morning in total, across the several crossings of that step in a day, and remove". Disposes of the ambiguity by making the cumulative baseline explicit — the ramp saves time on multiple crossings (arrival, water, toilet, departure), not a single trip.

**docs/semester-2/efmp-305/unit-04/unit-teacher-notes.mdx**
- Line 58: "ten bottle caps" → "eleven bottle caps" to match the corrected topic-02 materials list.

**docs/semester-2/efmp-305/unit-05/unit-assessment.mdx**
- Line 203: ` 6.` → `6.` (removed leading space, RRQ 6 question)
- Line 319: ` 6.` → `6.` (removed leading space, RRQ 6 model answer)

No meaning changes. No Urdu files touched.

## Decisions and trade-offs

- **Eleven caps rather than ten.** The pedagogical requirement is a number line from 0 to 10 for place value instruction — eleven positions. The materials list must supply one cap per position. Choosing to change the count (rather than the range) preserves the learning objective.
- **Cumulative baseline rather than a new single-trip time.** The task explicitly said "Do not invent measured times." The verbatim "about seven minutes on a dry day" and "about ten minutes" both stand; only the relationship between them is made explicit. The clarification is conservative: it explains why both numbers can be true without replacing either.
- **List alignment only.** The TEX-109 ruling (D-2026-0053, PHR 0143) preserved the six-classroom-accommodations-plus-escalation distinction. The leading space was a mechanical regression from commit 9b14d48e, not a content decision. This fix touches alignment only.

## Verification

- `npm run check:no-answer-keys`: pass
- `npm run check:content`: EFMP-305 failures are pre-existing (G2 review status across all six units; Unit 6 est_reading_minutes 193 outside the 140-170 band). None introduced by these edits.
- `npm run check:depth-gate`: no EFMP-305 findings
- `npm run check:concept-graph`: no EFMP-305 findings
- No board-direct PHRs in the 72-hour window overlap this scope.
- Figure U4-4 (`static/img/figures/efmp-305/unit-04/fig-U4-4.svg`) inspected: it is a table of ten learner needs matched to aids/solutions; contains no bottle-cap or count-dependent text. No dependent quantity in the figure.

## Handoff (for CEO and agents)

- Shipped / changed: three EFMP-305 English source files corrected on `agent/TEX-117` (draft PR #157). Commit `ac542123`.
- Decisions the team must respect: (1) **Unit 4 materials count is now eleven bottle caps** — do not revert to ten without also changing the mark count or the range, or the mismatch returns. (2) **The "ten minutes off Rameen's morning" claim stands as cumulative across several veranda-step crossings in a day** — this is the settled baseline. Do not treat it as a single-trip saving or as a measured time to be challenged. (3) **Unit 5 RRQ 6 list alignment is normalized** — both `6.` entries align with the rest of the 10-item bank; the TEX-109 content ruling is untouched.
- Pending / next owner: Unit 4 Urdu translation (G4) can now proceed from a settled English source. This is unblocked. Units 1-3 G3 EN review remains on TEX-107. The Unit 5 Urdu mirror does not need rework from this change — the TEX-109 ruling's content (six accommodations + escalation) was not altered, only the `6.` alignment.
- Paperclip issues affected: TEX-117 (this, the deliverable), TEX-107 (Units 1-3 G3 EN review, independent and unchanged), TEX-39 (parent EFMP-305 authoring branch whose draft PR #119 carries the broader unit set).
