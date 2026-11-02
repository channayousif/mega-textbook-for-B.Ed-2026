# GPKS-402 Unit 4: G4 translation handoff

Translator: codex. Date: 2026-11-02. This is a translation handoff, not G5 review evidence.

## Bundle and baseline

Continued the pre-existing untracked draft rather than restarting it. English baseline: `64ced4166f567a768620926290370b118f5697e9` (also this checkout's origin/main at task start). No English prose, approved spec, terminology bank, figure manifest, G2 evidence or G3/G5 evidence changed.

The complete mirror has five files: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, and `unit-assessment.mdx`, under the Urdu directory returned by `resolveUnit('.', 'GPKS-402', 4)`: `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/`. The English unit has no teacher notes. The assessment retains all 10 MCQs, 10 restricted-response questions and 5 extended-response questions, followed by the bounded final Urdu answers and marking guidance section. Option order, Bloom demand and mark allocations are retained.

All 16 Glossary calls retain their English lookup keys and now supply Urdu visible text; the component otherwise displays the English key. Definitions are supplied by the existing bilingual glossary. All seven Figure carriers retain their IDs, positions and translated alt text, using `fig-U4-1.ur.svg` through `fig-U4-7.ur.svg`. Each Urdu SVG has its generated dark twin. SVG descriptions equal the page alt text, fonts are Nastaliq-first, and table/timeline reading order is mirrored. The geographic map retains geographic orientation. The English manifest continues to describe the unchanged English assets; Urdu asset work is recorded here.

## Terminology working set and proposals

The bank is unchanged. Index key_terms use accepted bank values: Pakistan Studies / پاکستان کے مطالعہ; Objectives Resolution / قراردادِ مقاصد; Lahore Resolution / قراردادِ لاہور; Quaid-e-Azam / قائدِ اعظم; Curriculum / نصاب; Assessment / تشخیص; Self-Assessment / خود جائزہ; Summative Assessment / مجموعی جائزہ; Rubric / معیارِ جانچ.

Other bank strings found in the English baseline were checked in context: Learning, Development, Punishment, Memory, Attention, Environment, Validity and Profession. Their educational uses follow the bank. Ordinary-language occurrences retain their contextual sense: constitutional validity concerns آئینی حیثیت rather than psychometric صداقت; publication titles and citations remain bibliographic originals.

The concept graph's 15 Urdu labels remain proposals for owner/G5 consideration, not newly banked entries. See `specs/content/gpks-402/concepts/unit-04.md`, including its full authored-label table. The four spec key terms remain unbanked: Federalism / وفاقیت; Separation of Powers / اختیارات کی علیحدگی; Fundamental Rights / بنیادی حقوق; Strategic Importance / تزویراتی اہمیت. They are deliberately excluded from the bank-validated index list.

Additional unbanked glossary display forms used in this translation are proposed for the owner:

| English | Proposed Urdu |
|---|---|
| Legislature | مقننہ |
| Executive | انتظامیہ |
| Judiciary | عدلیہ |
| Civil-military relations | سول ملٹری تعلقات |
| Martial law | مارشل لا |
| Writ petition | رٹ پٹیشن |
| Principles of Policy | حکمتِ عملی کے اصول |
| Citizen | شہری |
| Indus River System | دریائے سندھ کا نظام |
| Climate | آب و ہوا |
| Natural resources | قدرتی وسائل |
| China-Pakistan Economic Corridor | چین پاکستان اقتصادی راہداری |

## Validation and limitations

- `npm run check:content`: all 13 gates pass in final draft state, with no baseline findings to subtract. The ignored `static/content-status.json` report was regenerated after recording the tracker note, because its tracker hash became stale; no publication or review state changed.
- Conditional parity run: both index flags temporarily set to reviewed, then restored in a finally block. Content validation, figure parity and terminology checks pass. Only the expected two open G4/G5 tracker findings and stale generated publication report occur. No review completion or publication-state regeneration was used to suppress those findings.
- Supplemental structural comparison: identical file sets, heading-level vectors, preserved metadata, component counts and glossary key sets; translated figure descriptions match page alt text. The 10/10/5 assessment bank and corresponding answer bands remain present. Translator MCQ self-check gives ب، ب، ج، ب، الف، ب، ج، ب، ج، ب, matching the translated key. This is not independent assessment review.
- All seven Urdu SVGs pass SVG optimisation at 6.8–11.6 KB each, below 20 KB. `npm run figures:variants:check` passes.
- Build, dev server, Playwright, `render-inspect.mjs`, and browser-based `measure-figure-text.mjs` were not run because the crew brief explicitly prohibits them. No rendered, narrow-width, print or geometry pass is claimed. The next permitted inspection session must measure every Urdu SVG and inspect Urdu desktop, 360px and A4 output before G5 acceptance.

## Next owner

`translation_status` remains `draft` on every page. The existing G4 stage row records this handoff but remains open per translate-unit Step 7; G3/G5 remain open and unsigned. A fresh independent reviewer owns complete semantic comparison and assessment equivalence, with qualified acceptance required before any reviewed flag. The tracker currently carries accepted G2 evidence and an open G3 row; any future G5 acceptance must establish the exact accepted G3 dependency. No translation meaning is intentionally left unresolved; unbanked terminology and untested rendered layout remain explicit review work.

Elapsed translation time was not reliably measured across the interrupted attempts, so this unit cannot provide a valid end-to-end rate estimate.
