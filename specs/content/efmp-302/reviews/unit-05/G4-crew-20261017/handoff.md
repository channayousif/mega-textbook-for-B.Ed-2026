# EFMP-302 Unit 5 Urdu translation handoff

Date: 2026-10-17. Translator: Codex. This is a G4 work record, not an independent review,
signed acceptance, publication authorisation, or G5 claim.

## Baseline and scope

English baseline: `65d2428e170574f474b50d20cefdf722ef389d19`, also `origin/main` at the start.
The checkout had no earlier branch commits or uncommitted work. All seven Urdu files and eight
Urdu schematic sources already existed, so this job repaired the mirror rather than replacing it
with new stubs. The existing green G2 record satisfies the translate-unit baseline prerequisite;
G3 remains open. No English content, source declarations, approved specification, terminology
bank, glossary entry, concept label, review acceptance or publication state was changed.

Translated/repaired files, all under the resolved Urdu Unit 5 directory:

- `index.mdx`
- `topic-01.mdx`
- `topic-02.mdx`
- `topic-03.mdx`
- `topic-04.mdx`
- `unit-assessment.mdx`
- `unit-teacher-notes.mdx`

Updated `fig-U5-1` through `fig-U5-8` Urdu labels and descriptions; regenerated all eight dark
variants. All 13 Figure carriers remain in place. Illustrations reuse the same five WebP assets.
English figure prompts and manifests retain their authored meanings and lifecycle states.

## Material repairs

- Topic 5.1: corrected ninety minutes from the former ninety-nine; restored readable descriptions
  of workload, burnout, the three dimensions, value conflict and the demands/resources model.
- Topic 5.2: restored the omitted half-page writing requirement; distinguished a stakeholder's
  wish, measurement and legitimate claim; clarified occupational status versus recognition.
- Topic 5.3: clarified that pupil protection is the primary reason for visible communication,
  rather than declaring teacher protection unimportant; preserved technology costs, replacement
  and the specific teacher-development scope of the Hennessy review.
- Topic 5.4: clarified control, influence, collective action and why resilience is insufficient.
- Assessment: preserved option order, all 25 questions, marks and the final bounded Urdu answers
  section; restored autonomy in MCQ 7's explanation and clarified ERQ 5's case and rubric.
- Teacher notes: repaired a reversed warning. Presenting observation as an audit, rather than
  asking what the job consists of, damages the placement relationship.
- All eight schematic descriptions now exactly match the Urdu carrier alt text. Elaboration uses
  Urdu punctuation and colons. Bibliographic author/year forms, URLs and qualifications remain.

## Terminology and owner proposals

`terminology.md` records the bank working set and the three existing glossary definitions.
The four index key terms remain exactly bank-conformant. No new bank entry was added.

The existing unit concept graph already flags authored labels for G5. Its fourteen flagged
concepts remain owner/reviewer proposals, not newly approved vocabulary. In particular, confirm:

| Unbanked technical expression | Urdu used/proposed |
|---|---|
| Visible and invisible workload | ظاہر اور پوشیدہ کام کا بوجھ |
| Elastic work | لچکدار کام / بڑھتا گھٹتا کام |
| Exhaustion | تھکن |
| Cynicism / distancing | بے دلی / دوری |
| Reduced sense of accomplishment | کامیابی کے احساس میں کمی |
| Demands and resources | تقاضے اور وسائل |
| Dissonant value context | اقدار کا متصادم ماحول |
| Multilingual classroom | کثیر اللسانی جماعت |
| Accountability | جوابدہی |
| Autonomy | خود مختاری |
| Supervisory support | نگران کی معاونت |
| Occupational status | پیشے کا سماجی مقام |
| Public recognition | عوامی پذیرائی |
| Control and influence | اختیار اور اثر |
| Resilience | لچک |

`Burnout` uses the banked **Teacher Burnout** form, پیشہ ورانہ تھکن. Occupational Status also has
an existing Urdu glossary definition, but no terminology-bank row. The bank's generic
Development (نشوونما) and Reliability (اعتماديت) have context-sensitive uses here: professional
development is rendered ترقی, consistent with the bank's Continuous Professional Development
phrase, and device reliability is expressed as قابلِ اعتماد ہونا / بھروسا. These are explicit
owner terminology questions, not silent bank changes or a claim of reviewer acceptance.

## Checks and their limits

- `origin-main-content.log`: initial untouched checkout at `origin/main` passed 12/13 gates;
  only `check:content-status` failed because its ignored generated file was missing.
- Generated the ignored status report using `npm run build:content-status`; it is not committed.
- `final-content.log`: `npm run check:content`, all 13 gates pass in the final draft state.
- `temporary-reviewed-content.log`: both indexes temporarily set to reviewed to activate parity.
  Content validation and figures pass. Pipeline reports exactly the open G4 and G5 rows;
  content-status reports the expected stale generated report due to the temporary flag.
  Both indexes were restored in a `finally` block. No review row was forged to make this green.
- `parity.log`: all seven MDX files parse; file sets, heading vectors, invariant metadata,
  imports, component counts, figure IDs/kinds/dimensions/paths, glossary keys and alt/desc match.
  Assessment counts are 10/10/5; MCQ mapping is d/c/a/b/d/b/a/c/d/a, and RRQ marks are unchanged.
- `npm run figures:variants:check`: all 618 repository sources have fresh derived variants.
- `svg-geometry-fallback-font.log`: the repository standalone geometry checker passes all 16
  Urdu light/dark assets. This check does not load the site's font and has limited edge checks.
- `svg-geometry-nastaliq.json`: additional isolated Chromium renders load the bundled Noto
  Nastaliq Urdu font, measuring all four viewBox edges on all 16 assets. Zero overflow.
  The translator inspected `urdu-figures-contact.png`, assembled from isolated light renders
  to avoid CSS class interference between SVGs. This is standalone figure evidence only.
- `git diff --check`: clean. English content remains byte-identical to the baseline.

The brief explicitly prohibits `npm run build` and any dev server, so no full-site build or
`render-inspect.mjs` was run. Actual Urdu page rendering at desktop/360px and A4 print remains
unverified. Standalone figure geometry is not a substitute for that inspection. Existing RTL
geometry and wordmark positions were retained; visual refinements beyond label translation
remain for the rendering/review pass. Prior G5 evidence must not be treated as covering these
changed Urdu bytes.

## Handoff (for CEO and agents)

- Shipped / changed: complete seven-file draft mirror repaired, eight Urdu schematics and dark
  twins refreshed, G4 tracker note updated with this record, validation evidence captured.
- Decisions to respect: translation_status remains draft on every page and in the unchanged
  English baseline. G4 remains open (▣), reflecting uncompleted full-page inspection. G3/G5
  statuses and historical evidence are untouched. No self-certification or human initials.
- Pending / next owner: the rendering worker needs an authorised full build and page inspection;
  the curriculum owner decides terminology proposals and commissions a fresh independent G5
  against accepted G3 for the same English version. Historical G3 dependency limitations remain.
- Paperclip issues affected: none assigned in the crew brief; no Paperclip operations performed.
- Timing: a dedicated translation timer was not started, so no measured translation-rate claim
  is made. This continuation repaired an existing full mirror and is not a new-unit rate probe.
