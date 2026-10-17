---
id: 0148
title: Urdu translation started
stage: misc
date: 2026-10-16
surface: agent
model: GPT-6 Codex
feature: efmp-305
branch: agent/TEX-39
user: Paperclip BilingualAuthor
command: translate-unit
labels: ["BilingualAuthor", "TEX-80", "urdu", "partial-translation"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: TEX-80
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/119
files:
  - glossary.json
  - specs/content/terminology.csv
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-06/unit-teacher-notes.mdx
  - history/prompts/efmp-305/0148-urdu-translation-started.misc.prompt.md
tests:
  - validate:content PASS
  - check:no-answer-keys PASS
  - check:no-em-dash PASS
  - completed-file heading metadata import and component parity PASS
  - check:content FAIL (10/13 pass; pipeline depth figures fail)
---

## Prompt

Complete structured server-supplied wake input for this heartbeat (unabridged):

```json
{
  "reason": "issue_children_completed",
  "executionContinuation": {
    "resumeDelta": {
      "baseRunId": "ca5af69f-aa59-4898-9df8-4de70bf57f49",
      "messages": [
        {
          "id": "a6e140e0-79e3-4e52-b751-66f0b0a4de84",
          "authorType": "agent",
          "authorId": "bbc7d03f-440f-41f5-ab6f-c13bd8c40cf3",
          "createdByRunId": "ca5af69f-aa59-4898-9df8-4de70bf57f49",
          "body": "Owner terminology ruling accepted; English acceptance follow-up assigned.\n\n- Interaction `60d24ab9-443f-4212-8a45-114018864f03` approves all nine proposed Urdu pairs. No further answer is requested. Accommodation retains the learning standard; modification changes it. Banking the approved pairs and glossary repair remain part of this translation task.\n- Created [TEX-86](/TEX/issues/TEX-86) for CurriculumOwner to settle the English corrections and arrange independent G3, returning exact accepted versions. This supplies the missing actionable owner path rather than leaving a review request only in prose.\n- Translation is blocked on that follow-up. The last audited tracker has no accepted G3 rows; English authoring completion is not independent acceptance. No translation or repository changes were made in this coordination heartbeat. Existing `agent/TEX-39` / PR #119 and the Codex exception remain in force.",
          "createdAt": "2026-10-16T16:40:28.251Z",
          "updatedAt": "2026-10-16T16:40:28.251Z",
          "deleted": false,
          "sourceTrust": null
        },
        {
          "id": "5a1cbdfc-92d5-4bb2-8600-57f6d91b94af",
          "authorType": "agent",
          "authorId": "bbc7d03f-440f-41f5-ab6f-c13bd8c40cf3",
          "createdByRunId": "62870401-9443-4c2d-bf2c-95c0c24ab140",
          "body": "Figure handoff from [TEX-79](/TEX/issues/TEX-79): all 30 EFMP-305 figures now have English and horizontally mirrored Urdu light SVGs plus dark twins in the existing agent/TEX-39 worktree, and all English carriers are placed. Source commit will be recorded on [TEX-79](/TEX/issues/TEX-79) after the final build.\n\nFor Urdu placement, use each `static/img/figures/efmp-305/unit-NN/fig-Ux-y.ur.svg` description as the EXACT Figure alt. Keep matching IDs, use `.ur.svg` src, and carry kind plus width/height from the English Figure. The Urdu assets already mirror layout and put the wordmark bottom-left. No Urdu topic pages existed at production time; none were invented as stubs. Retain every draft notice. Unit 6 dense tables retain every field in stacked record panels for phone reading; shared-support terminology uses `مشترکہ معاونت منصوبہ`. G5 must independently assess labels and legal terms. This handoff neither clears your G3 prerequisites nor authorizes review/publication.",
          "createdAt": "2026-10-16T17:50:49.864Z",
          "updatedAt": "2026-10-16T17:50:49.864Z",
          "deleted": false,
          "sourceTrust": null
        },
        {
          "id": "0b188a69-8b24-4560-8281-e21c3a607a88",
          "authorType": "agent",
          "authorId": "bbc7d03f-440f-41f5-ab6f-c13bd8c40cf3",
          "createdByRunId": "62870401-9443-4c2d-bf2c-95c0c24ab140",
          "body": "Figure handoff commit is now pushed: [544653f7](https://github.com/channayousif/mega-textbook-for-B.Ed-2026/commit/544653f712f6d15c0b197466d33c09440215d500) on existing agent/TEX-39 / draft PR #119. Both en/ur builds pass; all 30 EN carriers are placed and all mirrored Urdu assets ready. [TEX-79](/TEX/issues/TEX-79) is blocked on [TEX-80](/TEX/issues/TEX-80) for actual Urdu carriers, then final bilingual verification. Review evidence must account for changed English topic bytes; no G3/G5 or publication approval is claimed. Exact checks and downloadable assets are recorded on [TEX-79](/TEX/issues/TEX-79).",
          "createdAt": "2026-10-16T18:05:45.383Z",
          "updatedAt": "2026-10-16T18:05:45.383Z",
          "deleted": false,
          "sourceTrust": null
        }
      ]
    },
    "recoveryOutcomes": [],
    "version": 1,
    "companyId": "6df48a3f-89b7-48c7-9ba9-46f325f30c02",
    "issueId": "99afad23-c1b0-4afd-a10c-d45766699e7a",
    "trigger": {
      "reason": "issue_children_completed",
      "interactionId": null,
      "sourceRunId": null
    },
    "originCommentIds": [],
    "objective": "Child of [TEX-69](/TEX/issues/TEX-69). Branch `agent/TEX-39`, PR #119. **Do not open a new branch or PR.**\n\n**Blocked** until the English units are drafted: [TEX-76](/TEX/issues/TEX-76), [TEX-77](/TEX/issues/TEX-77), [TEX-78](/TEX/issues/TEX-78). Units 1-3 EN are already drafted, so Urdu for units 1-3 can start as soon as those are G3-accepted; this issue covers all six so the terminology stays consistent across the course.\n\n## Objective\nProduce the complete **Urdu mirror (gate G4)** of EFMP-305, all six units, following `.claude/skills/translate-unit/SKILL.md`.\n\nTarget tree: `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-NN/`.\n\nPer unit: `index.mdx`, every `topic-NN.mdx`, `unit-assessment.mdx` with its 10/10/5 bank and bounded answers section, `unit-teacher-notes.mdx`, the `.ur.svg` figure wiring, and the UR `key_terms` block that `check:pipeline-gate` reads.\n\n## Standards\n- **Urdu is an original, not a subtitle track.** Academic-plain register - درسی مگر عام فہم. Write Urdu a Sindhi or Punjabi teacher reads naturally. Do not calque English syntax.\n- **Equivalent depth.** An English unit with an Urdu stub is not done. Reading minutes and structure must mirror.\n- `translation_status: draft` on every file. Do not mark anything reviewed; **G5 is an independent review and you never review your own translation.**\n- **Terminology is bound.** Use `specs/content/terminology.csv` for every banked pair.\n\n## Terminology to bank before translating Unit 3\n`specs/content/efmp-305/concepts/unit-03.md` introduced labels that are **new to the course and not yet in `terminology.csv`**. `terminology.csv` freezes as a pair with `style-guide.md` (Spec 006 FR-007), and banking is an owner decision (precedent `D-2026-0067`), so **propose these to the owner before translating Unit 3 and use whatever is ruled**:\n\n| EN | Proposed UR |\n|---|---|\n| Cooperative learning | اشتراکی تعلم |\n| Flexible assessment | لچکدار تشخیص |\n| Accommodation (access adaptation) | سہولت کاری |\n| Modification (standard changed) | ترمیم |\n| Universal Design for Learning | تعلم کے لیے عالمگیر ڈیزائن |\n| Positive interdependence | مثبت باہمی انحصار |\n| Individual accountability | انفرادی جوابدہی |\n| Tiered activities | درجہ بند سرگرمیاں |\n| Differentiating content / process / product | مواد / عمل / حاصلِ کار میں تنوع |\n\nAlready banked and to be reused as-is: Differentiated instruction `متنوع ہدایات`, Scaffolding `معاونتی تدریس`, Formative assessment `تشکیلی تشخیص`.\n\nThe **accommodation / modification** pair is the one that matters most: Unit 3 and Unit 5 both turn on the distinction, and a translation that blurs them destroys the unit's argument and its legal content. Get a ruling, do not guess.\n\n## A defect to fix while you are in there\n`glossary.json`'s Urdu definitions for the EFMP-305 inclusive-education terms are poor - `Cooperative Learning` contains \"تدریجی نرتیجہ\" and \"مشترہہ\", `Flexible Assessment` contains \"جیسیاً\", `Universal Design for Learning` has \"ایسی ڈھانچہ\" (gender disagreement). These read as machine output and at least two are not Urdu words. Repair them as part of this issue and say so in your comment. `glossary.json` is **not** a bound intake input, so this is safe to edit.\n\n## Verification\n`npm run check:content` (including `check:pipeline-gate` for the UR parity and `key_terms` checks) and `scripts/heavy.sh npm run build` for **both** locales, plus a render inspection in `ur` - Nastaliq line-height and RTL figure placement are only visible in a real render.\n\nPHR under `history/prompts/efmp-305/` with Handoff. Then `in_review` and hand to the Reviewer for **G5** (the Reviewer runs on agy/Gemini, a different model family - ADR-0019 engine independence).\n",
    "messages": [
      {
        "id": "bbbca197-7f35-42bc-ad26-8c28e8c7a8b5",
        "authorType": "agent",
        "authorId": "1367a85f-fee8-44a9-bc41-769d3eb697e1",
        "createdByRunId": "8149c2cb-b36d-43b2-a704-0f15287207a4",
        "body": "TEX-84 verified TEX-76/77 are done; TEX-78 remains unfinished. Keep the Unit 6 dependency and resume G4 only against stable English inputs. Runtime mismatch is escalated on TEX-84.",
        "createdAt": "2026-10-16T06:06:13.815Z",
        "updatedAt": "2026-10-16T06:06:13.815Z",
        "deleted": false,
        "sourceTrust": null
      },
      {
        "id": "a1338a18-7d5e-4455-9316-6ff2988a03d9",
        "authorType": "agent",
        "authorId": "bbc7d03f-440f-41f5-ab6f-c13bd8c40cf3",
        "createdByRunId": "11dd301d-922c-4e4d-8a12-4f7e9ae1fab8",
        "body": "Blocked; latest dependency update acknowledged.\n\n- [TEX-76](/TEX/issues/TEX-76) and [TEX-77](/TEX/issues/TEX-77) are complete per the wake comment. [TEX-78](/TEX/issues/TEX-78) remains the Unit 6 dependency; checkout independently returned 422 naming that unresolved blocker.\n- No translation or repository changes were made. This run is Codex, so it cannot perform the Claude-only authoring assignment. Runtime remediation remains tracked on [TEX-84](/TEX/issues/TEX-84).\n- Next action: the assigned English author completes [TEX-78](/TEX/issues/TEX-78); the runtime-remediation owner on [TEX-84](/TEX/issues/TEX-84) restores the required Claude runtime. BilingualAuthor then resumes G4 against stable English inputs with applicable G3 acceptance verified. Existing branch agent/TEX-39 and PR #119 remain the only delivery path.\n\nTriage success condition met: Unit 6 dependency retained and no blocker-dependent deliverable work started.",
        "createdAt": "2026-10-16T06:10:01.749Z",
        "updatedAt": "2026-10-16T06:10:01.749Z",
        "deleted": false,
        "sourceTrust": null
      },
      {
        "id": "8991c238-4d4f-4d29-b88c-e671f3091d77",
        "authorType": "agent",
        "authorId": "1367a85f-fee8-44a9-bc41-769d3eb697e1",
        "createdByRunId": "428c594d-bd72-4c4f-a355-97f2d4070f99",
        "body": "Board ruling on TEX-84, answered interaction e24471d0-c9d7-4b83-bc49-59655cd38782: Codex role exception explicitly authorized for outstanding BilingualAuthor authoring (TEX-78/79 and then Urdu children). This supersedes the Claude-only runtime hold for that bounded work. All content specs, independence rules, review gates, draft-PR restrictions and serial shared-branch work remain binding. Preserve unfinished files on agent/TEX-39 / PR #119. This is not review or publication approval. Keep genuine content dependencies; do not translate unstable English.",
        "createdAt": "2026-10-16T12:17:53.933Z",
        "updatedAt": "2026-10-16T12:17:53.933Z",
        "deleted": false,
        "sourceTrust": null
      },
      {
        "id": "c686a009-b87a-4a23-9f64-a59f4d9e3cf8",
        "authorType": "agent",
        "authorId": "bbc7d03f-440f-41f5-ab6f-c13bd8c40cf3",
        "createdByRunId": "6a0f6f62-34e0-4bd8-bfba-41b57a5bedf2",
        "body": "Blocked on English stability; runtime hold superseded.\n\n- Acknowledged the board ruling reported on [TEX-84](/TEX/issues/TEX-84), interaction `e24471d0-c9d7-4b83-bc49-59655cd38782`: Codex is authorized for the bounded outstanding BilingualAuthor authoring work and subsequent Urdu children. Claude runtime restoration is no longer an unblock requirement for this issue.\n- [TEX-78](/TEX/issues/TEX-78) remains the genuine Unit 6 English dependency. No unstable English was translated and no shared-branch files were changed during this triage.\n- Next action: the assigned author completes and stabilizes the English inputs on [TEX-78](/TEX/issues/TEX-78). BilingualAuthor can then resume G4 under the approved runtime exception, verifying applicable G3 acceptance and terminology rulings before translation. Preserve `agent/TEX-39` / PR #119, serial branch access, draft status and independent G5 review.\n\nDisposition: retain the existing first-class English dependency; the runtime exception grants neither review nor publication approval.",
        "createdAt": "2026-10-16T12:42:28.665Z",
        "updatedAt": "2026-10-16T12:42:28.665Z",
        "deleted": false,
        "sourceTrust": null
      },
      {
        "id": "975b4333-7cc3-442d-8f08-e18e974cf28e",
        "authorType": "agent",
        "authorId": "bbc7d03f-440f-41f5-ab6f-c13bd8c40cf3",
        "createdByRunId": "edea1e92-3559-48ec-82c7-fb995de2a2da",
        "body": "Baseline audit complete; waiting for required terminology ruling.\n\n- [TEX-78](/TEX/issues/TEX-78) is done. Existing branch `agent/TEX-39` is clean at `91bb82d9`; no content files were changed. Its editorial review records three corrections and explicitly says independent G3 remains pending.\n- All six G3 rows are pending and G2 evidence is incomplete in the course tracker. The assignment requires G3 acceptance for Units 1-3; completion of English authoring alone does not establish that acceptance. [CurriculumOwner](/TEX/agents/curriculumowner) owns settling the English corrections and arranging the independent English review before translation of affected units.\n- Saved owner question `60d24ab9-443f-4212-8a45-114018864f03` proposes all nine requested terminology pairs, including the access-adaptation versus changed-standard distinction. No bank terms were silently added. This pending interaction provides the wake path.\n- The Codex exception remains valid. Existing branch/PR, draft banners, serial shared-branch access and independent G5 remain binding. No translation, glossary repair, build or render check is claimed. Resume after the terminology ruling, and verify the applicable settled English/G3 baseline before translating.",
        "createdAt": "2026-10-16T12:45:48.513Z",
        "updatedAt": "2026-10-16T12:45:48.513Z",
        "deleted": false,
        "sourceTrust": null
      },
      {
        "id": "a6e140e0-79e3-4e52-b751-66f0b0a4de84",
        "authorType": "agent",
        "authorId": "bbc7d03f-440f-41f5-ab6f-c13bd8c40cf3",
        "createdByRunId": "ca5af69f-aa59-4898-9df8-4de70bf57f49",
        "body": "Owner terminology ruling accepted; English acceptance follow-up assigned.\n\n- Interaction `60d24ab9-443f-4212-8a45-114018864f03` approves all nine proposed Urdu pairs. No further answer is requested. Accommodation retains the learning standard; modification changes it. Banking the approved pairs and glossary repair remain part of this translation task.\n- Created [TEX-86](/TEX/issues/TEX-86) for CurriculumOwner to settle the English corrections and arrange independent G3, returning exact accepted versions. This supplies the missing actionable owner path rather than leaving a review request only in prose.\n- Translation is blocked on that follow-up. The last audited tracker has no accepted G3 rows; English authoring completion is not independent acceptance. No translation or repository changes were made in this coordination heartbeat. Existing `agent/TEX-39` / PR #119 and the Codex exception remain in force.",
        "createdAt": "2026-10-16T16:40:28.251Z",
        "updatedAt": "2026-10-16T16:40:28.251Z",
        "deleted": false,
        "sourceTrust": null
      },
      {
        "id": "5a1cbdfc-92d5-4bb2-8600-57f6d91b94af",
        "authorType": "agent",
        "authorId": "bbc7d03f-440f-41f5-ab6f-c13bd8c40cf3",
        "createdByRunId": "62870401-9443-4c2d-bf2c-95c0c24ab140",
        "body": "Figure handoff from [TEX-79](/TEX/issues/TEX-79): all 30 EFMP-305 figures now have English and horizontally mirrored Urdu light SVGs plus dark twins in the existing agent/TEX-39 worktree, and all English carriers are placed. Source commit will be recorded on [TEX-79](/TEX/issues/TEX-79) after the final build.\n\nFor Urdu placement, use each `static/img/figures/efmp-305/unit-NN/fig-Ux-y.ur.svg` description as the EXACT Figure alt. Keep matching IDs, use `.ur.svg` src, and carry kind plus width/height from the English Figure. The Urdu assets already mirror layout and put the wordmark bottom-left. No Urdu topic pages existed at production time; none were invented as stubs. Retain every draft notice. Unit 6 dense tables retain every field in stacked record panels for phone reading; shared-support terminology uses `مشترکہ معاونت منصوبہ`. G5 must independently assess labels and legal terms. This handoff neither clears your G3 prerequisites nor authorizes review/publication.",
        "createdAt": "2026-10-16T17:50:49.864Z",
        "updatedAt": "2026-10-16T17:50:49.864Z",
        "deleted": false,
        "sourceTrust": null
      },
      {
        "id": "0b188a69-8b24-4560-8281-e21c3a607a88",
        "authorType": "agent",
        "authorId": "bbc7d03f-440f-41f5-ab6f-c13bd8c40cf3",
        "createdByRunId": "62870401-9443-4c2d-bf2c-95c0c24ab140",
        "body": "Figure handoff commit is now pushed: [544653f7](https://github.com/channayousif/mega-textbook-for-B.Ed-2026/commit/544653f712f6d15c0b197466d33c09440215d500) on existing agent/TEX-39 / draft PR #119. Both en/ur builds pass; all 30 EN carriers are placed and all mirrored Urdu assets ready. [TEX-79](/TEX/issues/TEX-79) is blocked on [TEX-80](/TEX/issues/TEX-80) for actual Urdu carriers, then final bilingual verification. Review evidence must account for changed English topic bytes; no G3/G5 or publication approval is claimed. Exact checks and downloadable assets are recorded on [TEX-79](/TEX/issues/TEX-79).",
        "createdAt": "2026-10-16T18:05:45.383Z",
        "updatedAt": "2026-10-16T18:05:45.383Z",
        "deleted": false,
        "sourceTrust": null
      }
    ],
    "interactionOutcomes": [
      {
        "id": "60d24ab9-443f-4212-8a45-114018864f03",
        "kind": "ask_user_questions",
        "status": "answered",
        "result": {
          "answers": [
            {
              "optionIds": [
                "approve"
              ],
              "questionId": "terms"
            }
          ],
          "version": 1,
          "summaryMarkdown": null
        }
      }
    ],
    "completedWork": "# Continuation Summary\n\n- Issue: TEX-80 — EFMP-305 G4: Urdu mirror, all six units\n- Status: blocked\n- Priority: high\n- Current mode: implementation\n- Last updated by run: ca5af69f-aa59-4898-9df8-4de70bf57f49\n- Agent: BilingualAuthor (codex_local)\n\n## Objective\n\nProduce the complete **Urdu mirror (gate G4)** of EFMP-305, all six units, following `.claude/skills/translate-unit/SKILL.md`.\n\nTarget tree: `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-NN/`.\n\nPer unit: `index.mdx`, every `topic-NN.mdx`, `unit-assessment.mdx` with its 10/10/5 bank and bounded answers section, `unit-teacher-notes.mdx`, the `.ur.svg` figure wiring, and the UR `key_terms` block that `check:pipeline-gate` reads.\n\n## Acceptance Criteria\n\nNo explicit acceptance criteria captured.\n\n## Recent Concrete Actions\n\n- Run `ca5af69f-aa59-4898-9df8-4de70bf57f49` finished with status `succeeded` at 2026-10-16T16:40:32.461Z.\n- Recorded approval of all nine terminology pairs. Created TEX-86 for CurriculumOwner to settle English corrections and arrange independent G3 acceptance. TEX-80 is confirmed blocked on that follow-up; no repository files changed.\n\n## Files / Routes Touched\n\n- `scripts/lib/review-evidence.mjs`\n- `scripts/heavy.sh`\n- `scripts/check-figures.mjs`\n\n## Commands Run\n\n- Heartbeat run `ca5af69f-aa59-4898-9df8-4de70bf57f49` invoked adapter `codex_local`.\n- Detailed shell/tool commands remain in the run log and transcript.\n\n## Blockers / Decisions\n\n- No new blocker was recorded by the latest run.\n\n## Next Action\n\n- Wait for reviewer feedback or approval before continuing executor work.",
    "completedActions": [],
    "unresolvedInteractionIds": [],
    "coverage": {
      "kind": "full_task_history",
      "throughCommentId": "0b188a69-8b24-4560-8281-e21c3a607a88",
      "summaryThroughCommentId": null
    }
  },
  "recovery": null,
  "issue": {
    "id": "99afad23-c1b0-4afd-a10c-d45766699e7a",
    "identifier": "TEX-80",
    "title": "EFMP-305 G4: Urdu mirror, all six units",
    "description": "Child of [TEX-69](/TEX/issues/TEX-69). Branch `agent/TEX-39`, PR #119. **Do not open a new branch or PR.**\n\n**Blocked** until the English units are drafted: [TEX-76](/TEX/issues/TEX-76), [TEX-77](/TEX/issues/TEX-77), [TEX-78](/TEX/issues/TEX-78). Units 1-3 EN are already drafted, so Urdu for units 1-3 can start as soon as those are G3-accepted; this issue covers all six so the terminology stays consistent across the course.\n\n## Objective\nProduce the complete **Urdu mirror (gate G4)** of EFMP-305, all six units, following `.claude/skills/translate-unit/SKILL.md`.\n\nTarget tree: `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-NN/`.\n\nPer unit: `index.mdx`, every `topic-NN.mdx`, `unit-assessment.mdx` with its 10/10/5 bank and bounded answers section, `unit-teacher-notes.mdx`, the `.ur.svg` figure wiring, and the UR `key_terms` block that `check:pipeline-gate` reads.\n\n## Standards\n- **Urdu is an original, not a subtitle track.** Academic-plain register - درسی مگر عام فہم. Write Urdu a Sindhi or Punjabi teacher reads naturally. Do not calque English syntax.\n- **Equivalent depth.** An English unit with an Urdu stub is not done. Reading minutes and structure must mirror.\n- `translation_status: draft` on every file. Do not mark anything reviewed; **G5 is an independent review and you never review your own translation.**\n- **Terminology is bound.** Use `specs/content/terminology.csv` for every banked pair.\n\n## Terminology to bank before translating Unit 3\n`specs/content/efmp-305/concepts/unit-03.md` introduced labels that are **new to the course and not yet in `terminology.csv`**. `terminology.csv` freezes as a pair with `style-guide.md` (Spec 006 FR-007), and banking is an owner decision (precedent `D-2026-0067`), so **propose these to the owner before translating Unit 3 and use whatever is ruled**:\n\n| EN | Proposed UR |\n|---|---|\n| Cooperative learning | اشتراکی تعلم |\n| Flexible assessment | لچکدار تشخیص |\n| Accommodation (access adaptation) | سہولت کاری |\n| Modification (standard changed) | ترمیم |\n| Universal Design for Learning | تعلم کے لیے عالمگیر ڈیزائن |\n| Positive interdependence | مثبت باہمی انحصار |\n| Individual accountability | انفرادی جوابدہی |\n| Tiered activities | درجہ بند سرگرمیاں |\n| Differentiating content / process / product | مواد / عمل / حاصلِ کار میں تنوع |\n\nAlready banked and to be reused as-is: Differentiated instruction `متنوع ہدایات`, Scaffolding `معاونتی تدریس`, Formative assessment `تشکیلی تشخیص`.\n\nThe **accommodation / modification** pair is the one that matters most: Unit 3 and Unit 5 both turn on the distinction, and a translation that blurs them destroys the unit's argument and its legal content. Get a ruling, do not guess.\n\n## A defect to fix while you are in there\n`glossary.json`'s Urdu definitions for the EFMP-305 inclusive-education terms are poor - `Cooperative Learning` contains \"تدریجی نرتیجہ\" and \"مشترہہ\", `Flexible Assessment` contains \"جیسیاً\", `Universal Design for Learning` has \"ایسی ڈھانچہ\" (gender disagreement). These read as machine output and at least two are not Urdu words. Repair them as part of this issue and say so in your comment. `glossary.json` is **not** a bound intake input, so this is safe to edit.\n\n## Verification\n`npm run check:content` (including `check:pipeline-gate` for the UR parity and `key_terms` checks) and `scripts/heavy.sh npm run build` for **both** locales, plus a render inspection in `ur` - Nastaliq line-height and RTL figure placement are only visible in a real render.\n\nPHR under `history/prompts/efmp-305/` with Handoff. Then `in_review` and hand to the Reviewer for **G5** (the Reviewer runs on agy/Gemini, a different model family - ADR-0019 engine independence).\n",
    "descriptionTruncated": false,
    "status": "in_progress",
    "workMode": "standard",
    "priority": "high"
  },
  "checkedOutByHarness": true,
  "externalChatExecutionBound": false,
  "externalChatProvider": null,
  "externalChatQuestionResponse": null,
  "skillTest": false,
  "simplifiedEnglishInteractions": false,
  "dependencyBlockedInteraction": false,
  "treeHoldInteraction": false,
  "activeTreeHold": null,
  "unresolvedBlockerIssueIds": [],
  "unresolvedBlockerSummaries": [],
  "executionStage": null,
  "continuationSummary": {
    "key": "continuation-summary",
    "title": "Continuation Summary",
    "body": "# Continuation Summary\n\n- Issue: TEX-80 — EFMP-305 G4: Urdu mirror, all six units\n- Status: blocked\n- Priority: high\n- Current mode: implementation\n- Last updated by run: ca5af69f-aa59-4898-9df8-4de70bf57f49\n- Agent: BilingualAuthor (codex_local)\n\n## Objective\n\nProduce the complete **Urdu mirror (gate G4)** of EFMP-305, all six units, following `.claude/skills/translate-unit/SKILL.md`.\n\nTarget tree: `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-NN/`.\n\nPer unit: `index.mdx`, every `topic-NN.mdx`, `unit-assessment.mdx` with its 10/10/5 bank and bounded answers section, `unit-teacher-notes.mdx`, the `.ur.svg` figure wiring, and the UR `key_terms` block that `check:pipeline-gate` reads.\n\n## Acceptance Criteria\n\nNo explicit acceptance criteria captured.\n\n## Recent Concrete Actions\n\n- Run `ca5af69f-aa59-4898-9df8-4de70bf57f49` finished with status `succeeded` at 2026-10-16T16:40:32.461Z.\n- Recorded approval of all nine terminology pairs. Created TEX-86 for CurriculumOwner to settle English corrections and arrange independent G3 acceptance. TEX-80 is confirmed blocked on that follow-up; no repository files changed.\n\n## Files / Routes Touched\n\n- `scripts/lib/review-evidence.mjs`\n- `scripts/heavy.sh`\n- `scripts/check-figures.mjs`\n\n## Commands Run\n\n- Heartbeat run `ca5af69f-aa59-4898-9df8-4de70bf57f49` invoked adapter `codex_local`.\n- Detailed shell/tool commands remain in the run log and transcript.\n\n## Blockers / Decisions\n\n- No new blocker was recorded by the latest run.\n\n## Next Action\n\n- Wait for reviewer feedback or approval before continuing executor work.",
    "bodyTruncated": false,
    "updatedAt": "2026-10-16T16:40:32.518Z"
  },
  "planReviewContext": null,
  "documentReviewContext": null,
  "annotationDeltas": [],
  "livenessContinuation": null,
  "taskWatchdog": null,
  "interactionId": null,
  "sourceRunId": null,
  "interactionKind": null,
  "interactionStatus": null,
  "externalInteractionContinuation": false,
  "checkboxSelection": null,
  "questionResponse": null,
  "executionWorkspace": null,
  "agentMessage": null,
  "childIssueSummaries": [
    {
      "id": "c35d0340-279b-49d1-9330-5d22a5c2f327",
      "identifier": "TEX-86",
      "title": "EFMP-305: settle English baseline and arrange G3 before Urdu translation",
      "status": "done",
      "priority": "high",
      "summary": "## G3 verdict received — acceptance decision\n\n[TEX-97](/TEX/issues/TEX-97) (independent G3 review, Antigravity) is complete. Disposition: **escalate** on one item only — the 193-minute depth overrun.\n\n### Reconciliation\n\nThe board depth-budget band for Unit 6 is 140–170 minutes (`specs/content/efmp-305/content-spec.md:644`, set at G0/G1 intake as a pre-authoring estimate). The unit totals 193 minutes.\n\nThe overrun is **structural, not padded**:\n- Per-topic bands are all met: topic [truncated]"
    }
  ],
  "childIssueSummaryTruncated": false,
  "commentIds": [],
  "latestCommentId": null,
  "comments": [],
  "requestedCount": 0,
  "includedCount": 0,
  "missingCount": 0,
  "truncated": false,
  "fallbackFetchNeeded": false
}
```

## Response snapshot

Read TEX-86's final owner acceptance of English baseline 78798ec3 for translation. The owner did not waive the Unit 6 depth gate for publication. Started Unit 6 with full index and teacher-notes translations, matching headings, component calls, SLOs and reading minutes. Draft flags and review-pending notices remain. Banked all nine pairs approved in interaction 60d24ab9-443f-4212-8a45-114018864f03. Fixed the three specifically reported glossary definitions without changing their English definitions. No topic or assessment stubs were created.

## Outcome

- Impact: two complete translated files plus approved terminology and glossary repairs; this is partial G4 work.
- Tests: validation, answer-key scan, em-dash scan and completed-file structural comparison pass. Full content suite fails on 50 pipeline findings, Unit 6's acknowledged 193-minute depth overrun, and 454 global figure findings. No complete-unit parity, build, render inspection or G5 success is claimed.
- Files: two Urdu pages, glossary definitions and nine approved bank rows.
- Next prompts: finish Unit 6 topics and assessment, then remaining units and full bilingual verification.
- Reflection: Urdu as an original guided natural sentence order while retaining modality, local cases and practical instructions. Teach, don't cover guided preservation of role-play obstacles and actionable teacher instructions.

## Handoff (for CEO and agents)

- Shipped / changed: partial Urdu translation on existing PR #119; nine approved terminology pairs persisted; Cooperative Learning, Flexible Assessment and Universal Design for Learning Urdu definitions repaired.
- Decisions the team must respect: use settled EN 78798ec3. Accommodation retains the standard; modification changes it. Unit 6 translation-baseline acceptance does not waive publication depth gate. Keep draft status, independent G5 and shared-branch serial work. Units 1-3 still require unit-specific English acceptance verification, not inference from the Unit 6 report.
- Pending / next owner: BilingualAuthor owns remaining translation and final parity/build/render checks. Child-task creation returned HTTP 409 and was not retried. Resume on this issue through a queued on-demand continuation if confirmed by the API; do not infer new child tasks exist. CurriculumOwner owns any missing English acceptance and board owns the publication depth ruling.
- Paperclip issues affected: TEX-80, TEX-79 (waiting for Urdu carriers), TEX-86 (completed baseline acceptance).

## Evaluation notes (flywheel)

- Failure modes observed: most parity gates are silent for draft content; explicit comparisons are needed. Child creation failed with 409; no children were created.
- Graders run and results: see tests above. No reviewer certification.
- Prompt variant: none.
- Next experiment: complete Unit 6 topic-01 against the settled source, preserving both Urdu figure carriers and their exact descriptions.
