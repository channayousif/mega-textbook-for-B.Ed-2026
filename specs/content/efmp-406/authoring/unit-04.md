# EFMP-406 Unit 4 Authoring Record

Author: Codex, crew job `efmp-406-u04-author`, 2026-11-02. This is an author self-check and handoff, not independent G3/G5 evidence. No certification or publication is claimed.

## Inputs and scope

The approved Unit 4 spec is grounded in the guide's four verbatim bullets at `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:264-268`. D-2026-0075's confirmed owner ruling approves the two-topic grouping, readings and source floor, while deliberately deferring catalog registration. No earlier job commits or working-tree changes existed on this branch when work began. The course had no tracker; only Unit 4 rows were added.

The English unit has five files, two topic cycles and four schematic figures. No Urdu page, Urdu asset, catalog entry, protected evidence, gate script or approved content-spec was changed. The guide supplies teaching strategies and practical group work, so a teacher-notes page is included. `coming_soon: true` keeps the draft unpublished; `translation_status: draft` preserves the English-first/Urdu-debt disclosure path for later publication. No accepted G2 record is issued here.

## Backward design

Topic 4.1 enduring understandings:

- A technology feature is justified by its contribution to an explicit literacy goal, with access and support considered.
- Research findings have a population and task scope; preference is different evidence from comprehension.
- Writing develops through audience awareness, specific feedback and explained revision.

Topic 4.2 enduring understandings:

- Online messages involve real reading and writing choices, but recognising those choices does not prescribe public platforms for children.
- Source judgment includes evidence, origin and underlying interests, rather than popularity alone.
- Permission, credit, privacy and access are separate checks; an unresolved check requires a deliberate next action.

| Sub-topic | Target Bloom level | Explanation heading | Assessment evidence |
|---|---|---|---|
| U4-01 | Understand, Apply, Analyze | Technology and literacy development | Topic 4.1 checks 1–3 and summative proposal; MCQ 01–03; RRQ 01–02, 04; ERQ 01 |
| U4-02 | Apply, Analyze, Create | Digital reading and writing practices | Topic 4.1 checks 3–4 and summative proposal; MCQ 04–05; RRQ 03–05; ERQ 02 |
| U4-03 | Understand, Apply, Evaluate | Online communication and social media | Topic 4.2 checks 2, 4 and summative redesign; MCQ 08–09; RRQ 06, 08, 10; ERQ 03 |
| U4-04 | Understand, Apply, Analyze | Ethical, legal and responsible use of digital resources | Topic 4.2 checks 1, 3 and summative redesign; MCQ 06–07, 10; RRQ 07, 09; ERQ 04 |

Each topic has four formative retrieval items, five self-check statements, collaborative work, a practicum transfer task and an Analyze-or-higher summative rubric. The eight formative items stay within the spec's 5–8 band. The unit bank assigns five MCQs and five RRQs to each topic; two ERQs to each topic and one integrative ERQ across both. MCQ keys are distributed across all four option positions. The 100 practice marks are a self-study scoring scheme, not a replacement for guide course weights.

## Reading-time calculation

Reading estimates use the final prose word count, rounded up at 180 words per minute, including the self-study guidance and teacher notes. Inline figure markup, imports and front matter are not reading prose. The final per-file estimates are 3, 21, 21, 17 and 8 minutes: total 70 minutes, inside the approved unit band of 55–75. The 14–19 per-topic planning targets are exceeded by the final topic estimates; the binding unit-total band is met without changing the approved spec or inflating reading minutes to account for activity time. The independent content reviewer should judge concision and depth.

## Checks and limitations

- Baseline `npm run check:content` on the unchanged checkout at origin/main: all 13 gates passed.
- Final `npm run check:content`: all 13 gates passed; no baseline-relative findings.
- Direct call to the repository's `checkTopic` implementation: no errors. This explicitly exercises depth, coverage, sources, cycles and item counts despite `coming_soon` causing the normal depth dispatcher to skip the draft.
- All five MDX bodies compile through `@mdx-js/mdx` without a site build.
- Four SVGs optimised below 20 KB each; generated dark twins pass the scoped variants freshness check. IDs, prompt text and alt text are preserved from the authoring manifest. Each figure has an attribution caption and a decorative wordmark.
- All four English light figures and representative dark table/cycle figures visually inspected using local Sharp previews. The preview operation ran through `scripts/heavy.sh` after checking memory. No dev server, full build or Playwright run was started.
- The mandatory `measure-figure-text.mjs` script imports Playwright and launches Chromium. The crew brief explicitly prohibits Playwright, so that script was not run. A separate permitted validation job must perform it before these assets are accepted for publication. Visual inspection does not replace its geometry evidence.
- `static/content-status.json` was refreshed through the existing generator. It is ignored generated output, not a committed shared-file edit.

## Handoff

The registration/integration owner must preserve D-2026-0075's catalog deferral and arrange accepted draft evidence before removing `coming_soon`. The independent English reviewer owns G3; this author self-check is not a review. The Urdu job owns the five-file mirror, four RTL Urdu schematics, banked terminology checks and the authored Urdu labels in the concept graph.

`glossary/unit-04.json` stages five bilingual vocabulary additions for the shared glossary integration owner. The English prose defines all five inline; existing global entries are used through `<Glossary>` for Inference, Copyright and Plagiarism. The crew file scope excludes root `glossary.json`, so the staged additions have not been merged or wired to the global component. Their Urdu definitions require the downstream language review. Wire the five corresponding terms when integration is authorised.

Current skill text describes a prompt-only figure handoff, but the installed gate requires rendered output. Four English schematic pairs were therefore produced and placed to satisfy the task's explicit requirement to fix current in-scope gate findings. Urdu rendering remains the separately assigned job. Figure geometry measurement and shared glossary integration remain explicit follow-ups, not hidden passes.
