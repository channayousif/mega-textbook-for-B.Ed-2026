# EFPG-401 Unit 3 Independent G3 English Review Summary

**Course:** EFPG-401 Teaching of English  
**Unit:** Unit 3, Methods of Teaching English  
**Stage:** G3 English review  
**Disposition:** **escalate**  
**Reviewer:** `agent:codex`  
**Reviewer run:** `crew-job:efpg-401-u03-review_en`

## Result

All six guide leaves are taught and mapped to assessment. The deterministic content checks passed.
The review cannot pass because the production build is older than the reviewed Unit 3 bytes, so
the required narrow-screen and A4 print inspection was unavailable. The two open-access source
records provide author paraphrases and short title anchors, not inspectable source passages; their
support therefore remains unverified. This is an advisory report only. G3 remains open.

## Criterion evidence

- **Authority and coverage - pass.** Guide leaves 3.1 to 3.6 at
  `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:63-69` match the Unit 3 specification,
  `coverage/unit-03.md`, and topics 01 through 06. The concept graph maps every leaf to named
  MCQ, RRQ, and ERQ items.
- **Sources - unverified.** `sources/unit-03.md` declares the three print monographs honestly
  under `## Unverifiable sources` pursuant to `D-2026-0001`. The bound records for Ahmad (2013)
  and Kiran (2021) explicitly say that their notes are not a substitute for independent source
  review and contain no inspectable passage beyond a short title anchor. The cited research claims
  in `topic-01.mdx:37-47` and `topic-05.mdx:33-55` cannot be checked against source text.
- **Assessment - pass.** I independently derived MCQ answers 1 to 10 as B, C, B, B, B, C, B, B,
  B, B before consulting the key. RRQs and ERQs have answers/rubrics that distinguish the stated
  performance. The Evaluate-level eclectic-method task satisfies the approved assessment blueprint.
- **Accessibility - unverified.** Static inspection found descriptive figure alternative text,
  ordered headings, and bounded assessment guidance. The required rendered narrow-screen and A4
  print review is unavailable in `logs/render-review.txt` because deployed SHA
  `d1d77592a755b16e7c6fd13ef96dabe1263d74b4` differs from reviewed HEAD
  `331c3fc1720593a1b53c129fc71ec144d44f4f35` for five English files and five raster assets.
- **Readability and pedagogy - pass.** Each topic develops a realistic Sindhi classroom problem,
  an explanation, worked example, feasible activity, retrieval questions, practicum task, and
  assessed reflection. The progression supports an HSC/intermediate reader.

## Findings

1. **Uncertain:** rendered page and print evidence are unavailable because production is not the
   reviewed input. After a deployment matching the reviewed bytes, run the required production
   render inspection in a fresh review attempt.
2. **Uncertain:** the open-access source records lack inspectable source passages. Add bounded
   passages with precise locators, or document the sources as unavailable under the applicable
   owner ruling before a fresh review.
3. **Advisory:** `specs/content/efpg-401/figures/unit-03.md:3` still calls figures U3-14 to U3-17
   `prompt-only`, although its rows identify them as `placed`. Align that introductory lifecycle
   statement with the table before the next evidence preparation.

## Commands

| Command | Exit | Evidence |
|---|---:|---|
| validate:content | 0 | `logs/validate-content.txt` |
| check:depth-gate | 0 | `logs/check-depth-gate.txt` |
| check:figures | 0 | `logs/check-figures.txt` |
| check:no-em-dash | 0 | `logs/check-no-em-dash.txt` |
| check:no-answer-keys | 0 | `logs/check-no-answer-keys.txt` |
| check:docs-sync | 0 | `logs/check-docs-sync.txt` |
| render-review | 1 | `logs/render-review.txt` |
