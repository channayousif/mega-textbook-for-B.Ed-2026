---
id: 0156
title: TEX-118 EFMP-305 U4 assessment marks and costing alignment
stage: content
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: efmp-305
branch: agent/TEX-39
user: channayousif
command: paperclip heartbeat (CurriculumOwner, TEX-118)
labels: ["CurriculumOwner", "efmp-305", "assessment-alignment", "content-correction"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: TEX-118
  adr: null
  pr: "119"
files:
 - docs/semester-2/efmp-305/unit-04/unit-assessment.mdx
tests:
  - check:no-answer-keys: pass
  - check:content: EFMP-305 Unit 4 failures pre-existing only (G2 en-draft, U6 depth-budget); none introduced
  - check:concept-graph: no EFMP-305 failures
  - check:depth-gate: no EFMP-305 failures
---

## Prompt

TEX-118: settle two source conflicts in EFMP-305 Unit 4 assessment before the Urdu assessment is authored.

1. RRQ 1 is declared "(4 marks)" but the model answer allocates 1 mark per four management elements plus 1 for the reason access belongs on the management list, totaling 5. Settle a 4-mark allocation or adjust the declared marks coherently.

2. topic-02.mdx worked example 3 Shabana term total Rs 160 includes Rs 90 for six photocopies; the whole-afternoon total is about Rs 320. ERQ 5 Band 4 says the figure "excludes all recurring costs such as photocopies" — contradicting the source. Clarify one accounting basis and correct dependent rubric statements.

Work on the existing agent/TEX-39 branch only (draft PR #119). TEX-117 fixes ac542123 and PHR 01040002 are incorporated verbatim.

## Response snapshot

Inspected the full unit set (index, topic-01, topic-02, unit-assessment, unit-teacher-notes). Confirmed TEX-117 fixes (ac542123, PHR 01040002) already present on agent/TEX-39: eleven bottle caps, cumulative-across-crossings timing, U5 RRQ 6 list alignment, PHR file 0154.

**Edit 1 — `unit-assessment.mdx` line 138:** RRQ 1 declared "(4 marks)" changed to "(5 marks)". The model answer (lines 217-222) already allocates 1 mark per element (predictability, access, participation, response = 4) plus 1 mark for the reason access belongs on the management list = 5 total. Declaring 5 marks makes the question header coherent with the settled mark scheme.

**Edit 2 — `unit-assessment.mdx` lines 366-368 (ERQ 5 Band 4 rubric):** Replaced "excludes ... all recurring costs such as photocopies" with "covers materials and recurring copying costs ... and excludes the teacher's two hours of making, her skill, the escalated ramp and drain slab, anything prescribed or weight-bearing." This aligns the rubric with the source accounting basis in topic-02.mdx worked example 3, where Shabana's Rs 160 term total explicitly includes Rs 90 for six enlarged photocopy papers, and the whole-afternoon Rs 320 total is the sum of Shabana (Rs 160), Rameen (Rs 0), Komal (Rs 0), and Saba/class (Rs 150).

**Verification:**
- `npm run check:no-answer-keys`: pass
- `npm run check:content`: EFMP-305 Unit 4 shows only the pre-existing G2 en-draft failure; no new failures introduced
- `npm run check:concept-graph`: no EFMP-305 findings
- `npm run check:depth-gate`: no EFMP-305 findings
- MCQ answer key (1-B, 2-B, 3-C, 4-B, 5-C, 6-B, 7-C, 8-C, 9-B, 10-B) verified against topic content; no other direct question/model/mark inconsistencies found in the assessment.

## Outcome

- Status: both rulings settled in a single commit on agent/TEX-39.
- English source now coherent: RRQ 1 declared marks match model allocation; ERQ 5 rubric matches the topic-02 cost accounting basis.
- Urdu carriers unaffected (the task preserves BilingualAuthor's existing Urdu work; only the English source changed, so any future Urdu assessment alignment picks up the corrected source).

## Handoff (for CEO and agents)

- Shipped / changed: `docs/semester-2/efmp-305/unit-04/unit-assessment.mdx` on agent/TEX-39. Commit pushed to the TEX-39 branch (draft PR #119).
- Decisions the team must respect:
  1. **RRQ 1 is now a 5-mark item** (four management functions + reason for access on the management list). The translator must carry this into the Urdu assessment verbatim; do not revert to 4.
  2. **The Rs 320 figure INCLUDES recurring photocopy costs** — Shabana's Rs 160 explicitly contains Rs 90 for six photocopy papers. The ERQ 5 rubric now reflects this. Do not reintroduce "excludes recurring costs such as photocopies" in any Urdu or English carrier.
- Pending / next owner: BilingualAuthor to author the remaining Urdu assessment (G4) from the now-settled English source. Units 1-3 G3 EN review remains on TEX-107.
- Paperclip issues affected: TEX-118 (this deliverable), TEX-39 (parent authoring branch), TEX-107 (Units 1-3 G3, unchanged).
