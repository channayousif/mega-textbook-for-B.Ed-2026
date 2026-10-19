# GSOS-301 Unit 2 translation handoff

- Translator: Codex, repair pass on 2026-10-19. English baseline: `17d2d4d1cf0410c431a2023cf005dc6440ee253b` (also `origin/main` when this job began).
- Continued the existing mirror, with repairs in `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx`. English files, English assessment demands, figure assets and approved specifications are unchanged.
- Preserved the frozen bank, existing three conformant `key_terms`, glossary keys, figure IDs and `.ur.svg` wiring, item order, 10/10/5 bank, marks and bounded final answers section. Restored uncertainty, examples and attribution where the earlier Urdu diverged; translated the explanatory prose surrounding the original bibliographic records.
- `translation_status` remains `draft` in both locales. G4 remains in progress; no G3/G5 approval or certification is claimed. The existing G4 row was updated as the brief explicitly requests, rather than appending a duplicate or marking it done.

## Checks

- The unchanged checkout exactly matched `origin/main`; all 13 `check:content` gates passed there.
- Temporary `reviewed` flags on both index files enabled parity checks. `validate:content` and `check:figures` passed. The only findings were unfinished G4/G5 tracker stages and stale derived content status caused by the temporary flags. Both flags were restored in a `finally` block. Those findings are expected governance safeguards, not approvals to bypass.
- Direct source checks confirmed five matching filenames, invariant metadata, heading level vectors, component counts, four matching figure IDs/attributes and localized paths, matching SVG descriptions/page alt strings, and MCQ option/key order. All three existing key terms match the bank.
- `npm run figures:variants:check` passed for all 810 sources. Existing assets were retained.
- Updated tracker notes invalidated the ignored derived status report by digest. `npm run build:content-status` regenerated it without a build or a tracked generated-file change.
- Final `npm run check:content`: all 13 gates passed with draft restored.
- No build, dev server, browser or render inspection was run: the crew brief explicitly prohibits a build or dev server. Desktop, 360px and A4 Urdu render inspection remains required before G5 acceptance. Source checks do not establish Nastaliq legibility or absence of clipping.

## Pending work and owners

- English author/G3 owner: reconcile Givens & White, Henson and Lindsey citations against approved sources; reconcile Mead stage ages in topic 2.2, fig-U2-4 and assessment content. The inherited prose and figure disagree (preparatory about 3 vs 2; play 3-5 vs 2-6; game 6-8 vs 7+). Translation preserves the corresponding English inputs rather than resolving this academic question. Align affected Urdu prose and `.ur.svg` after English repair.
- English author/G3 owner: resolve the previously recorded Bloom demand, rubric and coverage findings before freezing accepted English inputs for G5.
- Independent G5 reviewer: compare the complete accepted English/Urdu bundle, solve Urdu items independently and inspect actual rendered Urdu and figures. This translating session provides no G5 verdict.
- Curriculum owner: decide unbanked terminology below. No vocabulary was added to the bank.

## Proposed vocabulary for owner consideration

These existing draft renderings are proposals, not approved bank entries. The concept graph records the same core vocabulary.

| English | Current Urdu |
|---|---|
| Culture | ثقافت |
| Norms | معیار / سماجی معیار |
| Values | قدریں / اقدار |
| Beliefs | عقائد |
| Symbols | علامتیں |
| Material culture | مادی ثقافت |
| Non-material culture | غیر مادی ثقافت |
| Cultural diversity | ثقافتی تنوع |
| Cultural universals | ثقافتی عالمگیر مظاہر |
| Ethnocentrism | ثقافت پرستی |
| Cultural relativism | ثقافتی اضافیت |
| Agents of socialization | معاشرتی بندی کے ایجنٹ |
| Stages of socialization | معاشرتی بندی کے مراحل |
| Conflicting socialization agents | متضاد معاشرتی بندی ایجنٹ |
| Personality shaped by social forces | سماجی قوتوں کے زیرِ اثر شخصیت کی تشکیل |
| Folkways | لوک طریقے |
| Mores | اخلاقی شعار |
| Hidden curriculum | مخفی نصاب |
| Peer pressure | ساتھیوں کا دباؤ |
| Self | ذات |
| Generalized other | عمومی دوسرا |
| Preparatory stage | تیاری کا مرحلہ |
| Play stage | کھیل کا مرحلہ |
| Game stage | گیم کا مرحلہ |
| Adult socialization | بالغوں کی معاشرتی بندی |
