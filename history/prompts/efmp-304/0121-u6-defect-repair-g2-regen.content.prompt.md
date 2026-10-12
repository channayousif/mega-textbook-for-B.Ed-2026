---
id: 0121
title: EFMP-304 Unit 6 defect repair and G2 regeneration
stage: misc
date: 2026-10-12
surface: agent
model: claude-opus-5
feature: efmp-304
branch: agent/TEX-48
user: channayousif@gmail.com
command: Paperclip heartbeat (BilingualAuthor, TEX-48)
labels: ["BilingualAuthor", "efmp-304", "unit-06", "revise-topic", "G2", "D-2026-0067"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: TEX-48
  adr: history/adr/0019-g3-g5-review-delegation.md
  pr: null
files:
  - docs/semester-2/efmp-304/unit-06/topic-03.mdx
  - docs/semester-2/efmp-304/unit-06/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/unit-assessment.mdx
  - specs/content/efmp-304/reviews/unit-06/G2/20261012T033427776Z-gates.json
  - specs/content/efmp-304/tasks.md
  - history/prompts/efmp-304/0121-u6-defect-repair-g2-regen.content.prompt.md
tests:
  - npm run check:content (13 gates, all PASS after the repair)
  - npm run gates:evidence -- EFMP-304 6 (8 bound gates PASS, manifest written)
  - npm run test:review (40 pass, 0 fail)
---

## Prompt

Owner ruling D-2026-0067 item 3 (2026-10-11), raised in TEX-47 and G5 advisory F1.

Defects in reviewed English (fix with the revise-topic skill, mirror into Urdu):
1. docs/semester-2/efmp-304/unit-06/topic-03.mdx: third journal entry reads "The pupils did not understood the lesson".
2. docs/semester-2/efmp-304/unit-06/unit-assessment.mdx: RRQ 5 asks why a teacher would use a starting prompt, but the model answer lists prompts and is marked out of 4. Make question and answer correspond.

Because these files are bound inputs of the Unit 6 G2/G3/G5 evidence, after the edit: regenerate G2 (npm run gates:evidence -- EFMP-304 6, update the tasks.md row), then hand Unit 6 to Reviewer for a fresh G3 and G5. Do not review your own work. Work on a new branch from main after PR #132 merges.

## Response snapshot

Both defects repaired under the `revise-topic` posture (smallest edit at the exact anchor, EN plus
UR mirror, full content-gate set before handing over).

**Defect 1, `topic-03.mdx:38`.** The topic opens with three journal entries about the same incident
at three reflective levels. Entries 1 and 2 read "The pupils did not understand the lesson"; entry 3
read "did not understood". One-word correction to `understand`. The Urdu mirror already read
correctly (`طلبہ سبق نہیں سمجھے۔`), so no Urdu edit was needed there, and none was invented.

**Defect 2, `unit-assessment.mdx` RRQ 5.** The question is tagged *(Understand)*, asks for two
sentences, and asks *why* a teacher might use a starting prompt in a week when nothing dramatic
happened. The model answer instead listed three starting and three deepening prompts and was marked
out of 4 with "1 per correct prompt". Rather than rewrite the question into a recall list, the model
answer was replaced with a 2-mark answer to the question as asked (most weeks are not dramatic, so
waiting for an incident ends the writing; a prompt gives a way into an ordinary week), with a band
split that matches. That choice was checked against the concept graph:
`specs/content/efmp-304/concepts/unit-06.md` maps `CON:EFMP-304-6-5` (Journal prompts) to MCQ-06
numbering `MCQ-08, RRQ-05`, and MCQ 8 already does the recall ("Which of the following is a
deepening prompt?"), as does Topic 6.4's own check for understanding. Keeping RRQ 5 at Understand
therefore preserves both mapped items and removes a duplicated recall item. Urdu model answer 5
carried the identical mismatch and was mirrored.

RRQ bank mark total moves from 27 to 25; no gate constrains the total, and the 10/10/5 item counts
and the derived assessment-item numbering are unchanged, so the concept graph and the EN/UR parity
gate are untouched.

**G2 regeneration.** `npm run gates:evidence -- EFMP-304 6` refused to run against uncommitted
bound inputs, so the content fix was committed first, then the manifest was written:
`specs/content/efmp-304/reviews/unit-06/G2/20261012T033427776Z-gates.json`. The Unit 6 G2 row in
`specs/content/efmp-304/tasks.md` now points at it. A first attempt annotated the G2 Notes cell with
the supersession prose and broke `check:pipeline-gate`, which requires that cell to be exactly
`gates:<path>.json` (`scripts/lib/review-evidence.mjs:564`); the annotation moved into the unit's
narrative paragraph instead.

**Review rows reopened.** The repair changed bytes that the existing agent G3 (run 501d802f) and
agent G5 (run 36f939d6) were bound to, so both rows now say a fresh review of the current bytes is
pending under TEX-48, with the superseded run paths kept for history. Neither review was re-run by
the author (ADR-0019 engine independence).

**Branch note.** The ruling said to branch from main after PR #132 merges. PR #132 is still open and
`REVIEW_REQUIRED`, and Unit 6 does not exist on `main` at all, so `agent/TEX-48` was cut from
`origin/agent/TEX-46` (the #132 head) and its PR is stacked on #132. It must merge after #132.

## Outcome

- ✅ Impact: both D-2026-0067 item 3 defects repaired in English with the Urdu mirror corrected; Unit 6 G2 evidence rebound to the current bytes; G3 and G5 reopened for independent re-review.
- 🧪 Tests: `npm run check:content` 13/13 PASS; `gates:evidence` 8/8 bound gates PASS; `npm run test:review` 40 pass / 0 fail.
- 📁 Files: 2 English content files, 1 Urdu content file, 1 new G2 manifest, `tasks.md`, this PHR.
- 🔁 Next prompts: Reviewer's fresh G3 (English) and G5 (Urdu) on Unit 6 at the TEX-48 head commit.
- 🧠 Reflection: the pipeline gate's exact-match requirement on an automated Notes cell is easy to break with a well-meant annotation; supersession history belongs in the unit narrative, not the row.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-304 Unit 6 English `topic-03.mdx` grammar fix and `unit-assessment.mdx` RRQ 5 model answer / mark scheme rewrite, Urdu model answer 5 mirrored, G2 manifest regenerated, `tasks.md` Unit 6 rows updated.
- Decisions the team must respect: RRQ 5 stays an Understand "why" question at 2 marks; prompt recall stays with MCQ 8 and Topic 6.4's check for understanding, so `CON:EFMP-304-6-5` keeps both mapped items. The superseded G2 manifest `20261011T213320443Z-gates.json` and the two superseded agent review reports are retained for history but no longer bind.
- Pending / next owner: the board merges PR #132 first, then this stacked PR. Reviewer (agy, Gemini) owns the fresh G3 and G5 on the TEX-48 head. `translation_status` stays `draft` and the machine-authored banner stays in place.
- Paperclip issues affected: TEX-48 (this work), TEX-47 and TEX-46 (origin of the defects), TEX-37 (parent).

## Evaluation notes (flywheel)

- Failure modes observed: `gates:evidence` blocks on uncommitted bound inputs (correct, but forces a commit-then-evidence ordering); `check:pipeline-gate` rejects any prose in an `auto:gates` Notes cell.
- Graders run and results (PASS/FAIL): `check:content` PASS (13/13), `gates:evidence` PASS, `test:review` PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): when a defect repair touches bound inputs, regenerate G2 and update the tracker in the same commit as the content fix is impossible by design, so record the two-commit ordering in the `revise-topic` skill so the next author does not discover it from a gate failure.
