# EFMP-302 Unit 2: G4 continuation handoff

Translator: Codex. Date: 2026-10-17. This is an authoring record, not an independent review.

## Baseline and scope

English comparison baseline: `65d2428e170574f474b50d20cefdf722ef389d19`, identical to
`origin/main` at job start. The initial branch had no additional commits or working changes.
G2 is gate-checked; G3 remains open. The complete Urdu mirror and its figures already existed
in that baseline, including the earlier MCQ 6 source-qualification repair. They were continued,
not regenerated. English prose, assessments, figures, bank and glossary remain unchanged.

All seven Urdu counterparts were compared: `index.mdx`, `topic-01.mdx` through `topic-04.mdx`,
`unit-assessment.mdx`, and `unit-teacher-notes.mdx`, under the resolver-provided Urdu unit directory.
Five pages received small repairs: the index's account of obligations and prerequisites,
Topic 2.1's role-attached definition, a Topic 2.2 grammatical agreement, Latin author-year
citations in Topics 2.1/2.3/2.4, and Topic 2.4's consistency-drift label and distinction between
homework and household chores. Assessment and teacher notes retain their existing translation.

The current crew brief authorizes this bounded Unit 2 continuation; the older Feature 023
restriction to review-demanded Unit 1/2 repairs does not narrow that newer authorization.
The existing G4 tracker row is updated to in-progress with no reviewer signature. No row was
appended or marked done. G3/G5 rows, reports, publication state and review-cycle budget stand.
All fourteen EN/UR page statuses remain `draft`; the visible status badge remains draft.

## Verification

- `baseline-content.log`: the first `check:content` run on unchanged `origin/main` failed only
  because the ignored generated `static/content-status.json` was absent. Regenerated locally
  with `npm run build:content-status`, which is not a site build.
- `mirror-check.log`: seven file pairs, front-matter invariants, heading vectors, imports,
  component sequences, links, Bloom tags, four Glossary keys with Urdu definitions, and MDX
  compilation pass. The 10/10/5 bank, MCQ option ordering/correspondence, RRQ marks and final
  bounded Urdu answers section were retained. Translator solving matched all ten MCQs.
- Thirteen figure carriers match across locales: eight Urdu schematic sources with eight
  derived dark twins, and five reused WebP illustrations. All Urdu `alt` strings match both
  SVG variants' `desc` strings; every SVG is within 20 KB. No asset needed editing.
- `reviewed-probe.log`: both indexes temporarily set to reviewed, with automatic restoration
  in a finally block. All gates other than pipeline passed; pipeline reported exactly two
  expected unfinished G4/G5 stage findings, with no terminology finding. Both indexes were
  restored byte-for-byte and the generated status cache refreshed. The probe predates the
  tracker note update, so it records G4's original not-started state.
- `figure-geometry.log`: Chromium measured all sixteen Urdu SVGs via `scripts/heavy.sh`;
  zero reported geometry defects. `figures:variants:check` passed for all 618 source figures.
- `final-content.log`: final normal draft run of all thirteen content gates passes.
- `translator-inputs.json` records exact final content/asset/dependency hashes for handoff;
  it is not signed review evidence and grants no acceptance authority.

The crew brief forbids `npm run build` and any dev server. No site build or full-page render
inspection was run. MDX compilation and standalone SVG measurement do not establish Nastaliq,
bidi, narrow-page table access or A4 layout of the current pages. The historical G5 render
artifacts remain historical; they do not validate these changed Urdu bytes.

## Terms for the curriculum owner

The four declared key terms exactly match the frozen bank: Professional Ethics,
Code of Ethical Conduct, Ethical Dilemma and Reflective Decision Making. The bank was not edited.
The inherited unbanked conceptual labels below remain proposals, using the existing Unit 2
concept graph. No new preferred term is silently promoted. The earlier G5 report notes prose
wording variants for six labels; owner terminology alignment remains pending.

| English concept | Existing proposed Urdu label |
|---|---|
| Personal morality | ذاتی اخلاقیات |
| The law as an ethical floor | قانون بطور اخلاقی کم از کم حد |
| The teacher-pupil power asymmetry | استاد اور شاگرد کے درمیان اختیار کا عدم توازن |
| Professional trust | پیشہ ورانہ اعتماد |
| Routine acts as ethical decisions | روزمرہ اعمال بطور اخلاقی فیصلے |
| Conduct toward students | شاگردوں کے ساتھ طرزِ عمل |
| Assessment integrity | تشخیص میں دیانت |
| Conduct toward parents and community | والدین اور معاشرے کے ساتھ طرزِ عمل |
| Conduct toward colleagues and the profession | ہم پیشہ افراد اور پیشے کے ساتھ طرزِ عمل |
| The limits of a written code | لکھے ہوئے ضابطے کی حدود |
| Moral sensitivity | اخلاقی حساسیت |
| Moral judgement | اخلاقی فیصلہ |
| Moral motivation | اخلاقی محرک |
| Moral character | اخلاقی کردار |
| The four-step decision framework | چار مرحلوں کا فیصلہ ساز ڈھانچہ |
| The mark and the response | نمبر اور ردِ عمل کا فرق |
| Bounded confidentiality | محدود رازداری |
| The public-reason test for equity | مساوات کے لیے علنی جواز کی کسوٹی |

No source gap was guessed away: Carr/Icka/UNESCO/NPST access caveats, the Standard 9 qualification,
NACTE uncertainty and the guide-given four-step framework disclosure remain in the mirror.

## Pending ownership

The curriculum owner owns the existing G3 dependency and exhausted review-cycle escalations
`G-2026-63` and `G-2026-65`, terminology promotion, and authorization for any further review cycle.
A separate authorized G5 reviewer must assess the current Urdu bytes against an accepted English
baseline and inspect fresh desktop, 360px and A4 renders before any reviewed-status transition.
No review was commissioned in this translator session. No Paperclip issue was supplied or changed.

This was a continuation and verification of an existing complete mirror, not a fresh rate-probe
translation. Original translation elapsed time cannot be reconstructed from this job and is not
claimed as a new measurement.
