# EFMP-305 Unit 4 G5 advisory review

Disposition: **escalate**. Observed translation defects require revision before a fresh review. No certification, G5 completion, translation-status change or publication is authorised.

Reviewed commit: `8e53c97716db5306aec048da223a5e6809dc0963`.
Reviewer: `agent:codex-g5-reviewer`; actual Codex thread: `01a19d42-cab2-79c3-9b37-ac2bf916690b`.
Model: GPT-6, exact runtime build not exposed. This session did not author or translate the inputs.
Translator handoff identifies Antigravity and branch `crew/efmp-305-u04-translate`, but supplies no actual translator conversation ID. The report records this absence rather than inventing provenance.

## Observed defects for the translator

1. **Blocking semantic reversal:** `docs/semester-2/efmp-305/unit-04/unit-assessment.mdx:53` says a teaching aid carrying content through another sense “rules out decoration”. `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-04/unit-assessment.mdx:29` says `جو سجاوٹ کا حکم دیتا ہے`, calling for decoration. Restore the exclusion. This contradicts the otherwise useful Urdu test at `topic-02.mdx:94-96` and affects the principle assessed in MCQ 8 and RRQ 9.
2. **Blocking mathematical mistranslation:** `docs/semester-2/efmp-305/unit-04/topic-02.mdx:186,203` uses “place value”; `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-04/topic-02.mdx:108,119` uses `مقامی قیمت` (local price). The error recurs in RRQ 9 guidance at `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-04/unit-assessment.mdx:159` against EN `unit-assessment.mdx:282`. Use the mathematical positional-value term, with an owner terminology decision if necessary, across teaching and marking guidance. This finding concerns translation; it does not certify the English number-line explanation.
3. **Blocking marking-language corruption:** EN RRQ 10 guidance `unit-assessment.mdx:290` describes print the pupil cannot read or instructions she cannot follow. UR `unit-assessment.mdx:161` says `ہدایت جو وہ پی نہیں سکتی` (instruction she cannot drink). Restore the following-instructions/access meaning and check the whole model answer before reuse.
4. **Register repair:** UR assessment title `unit-assessment.mdx:2` says `یونٹ 4 کا جانچ`, description repeats `یونٹ`, and RRQ 8 Bloom tag at line 115 is `اطلال`. These impede academic-plain Urdu. Proofread the assessment throughout, including `نرقم` in RRQ 1/2 guidance and `بڑی چپائی` in RRQ 9. Avoid a token-only repair of the three blocking examples.
5. **Terminology ambiguity:** EN `index.mdx:32` means a human teaching assistant, while UR `index.mdx:32` uses `تدریسی معاون`, the same expression defined as an object/picture/sound/action at UR `topic-02.mdx:94`. Make the personnel meaning explicit in the opening.

## Preconditions and review limits

- The human G3 desk record `specs/content/efmp-305/reviews/unit-04/G3/20261102T140729Z-g3-desk-75d4e208.json` has reviewer `CMY`. All 92 inputs shared with this G5 bundle match, as recorded in `dependency-audit.json`. Its `.sig` is absent. Preserve the historical human sign-off; it does not supply the fresh signed G3 dependency the automatic G5 contract requires. No acceptance command was issued.
- The brief expressly prohibits builds, dev servers and Playwright. No current normal, narrow or A4 Urdu render was inspected, and no render success is claimed. SVG source inspection is not Nastaliq/bidi/clipping verification. A rendering-enabled host must perform these checks on the repaired frozen inputs.
- No actual translator run ID was supplied. The reviewer thread above is real; `author_run_id` explicitly records the missing information and must not be treated as verified independence provenance.
- This is a bounded defect/precondition review, not a completed passage-by-passage bilingual certification. Inspected material includes the index, topic 4.1 classroom case/PBS/seating/rotation, topic 4.2 aids/number-line example/summary, assessment items/model guidance/band rubrics, teacher notes and figure 3 SVG labels. Complete omissions/additions, all source-support comparisons and every figure/viewport remain unverified. All ten criteria are represented in the JSON, with no inferred pass from structural success.
- MCQ choices read as B B C B C B C C B B and agree with the printed EN/UR keys. The tool output exposed the answer section during the initial item read, so this is not an independent blind solve. A fresh reviewer must solve all Urdu assessment items before opening supplied answers. RRQ 1 keeps 5 marks; ERQ 5 keeps Rs 320 and two hours, and asks what the figure omits. These local observations do not establish full scoring equivalence.
- The three declared key terms match the bank: Classroom Management / جماعتی انتظام; Environment / ماحول; Inclusive Education / شمولیتی تعلیم. The G4 handoff lists proposed unbanked labels. The mistranslated mathematical term above needs resolution; no bank was changed.
- Topic 4.1 retains the Multan teacher-perception scope, Indonesian small-school limitation and Vietnamese university/41-student caution. Source contents were not independently retrieved in this attempt; `sources/unit-04.md` declares unavailable full texts. No source criterion pass is inferred from citations, metadata or the prior report.

## Actual checks

`npm run check:content`: exit 0, all 13 gates PASS, including mandatory validate:content, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys and check:docs-sync. Exact output is saved in `logs/check-content.log`. Draft translation status means this is not proof of all reviewed-Urdu parity checks. No temporary status flip was used.

Prepared 108 input hashes from a clean bound checkout. Recomputed inputManifest and skillDigest match exactly (`logs/verify-manifest.json`). Existing branch had no commits beyond origin/main and a clean working tree before preparation. No candidate input was edited. No origin/main failure comparison was necessary because all gates passed.

## Handoff

A separate translator should repair the paired defects and proofread the assessment, then a host should prepare a new frozen manifest, supply actual translator provenance and the appropriate G3 dependency, and arrange a fresh independent review with normal/narrow/A4 render access. Preserve all prior reports. G5 remains open. The explicit brief authorises the advisory tracker row despite the review skill's default prohibition on reviewer tracker edits; the row carries no done mark or acceptance token.

After the advisory tracker row, an intermediate check failed only check:content-status because the generated tracker digest was stale. Ran `npm run build:content-status` to refresh the gitignored generated file. Final `npm run check:content` exited 0 with all 13 gates passing (`logs/final-check-content.log`). No generated publication record or other out-of-scope file enters the commit.
