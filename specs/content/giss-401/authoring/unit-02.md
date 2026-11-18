# GISS-401 Unit 2 authoring record

English authoring only, under the approved Unit 2 spec and `D-2026-0079` owner ruling.
This is an author self-check and backward-design record, not an independent review.

## Enduring understandings and evidence

- Topic 2.1: source authority differs from confidence or popularity; Hadith reports preserve
  knowledge of the Sunnah; dependent legal reasoning needs a relevant basis. Classical
  non-direct-ruling cases include Sahaba consensus on compiling the Qur'an and Qiyas on
  Friday prayer commercial contracts. Evidence: three retrieval questions, source-sorting
  activity, four self-check statements and an analytical response to Amina with an explicit
  limit on classroom authority.
- Topic 2.2: exact references enable checking; meanings and applications need distinguishing;
  Qur'anic moral themes guide conduct with attention to context. Evidence: three retrieval
  questions, peer-checked theme cards, four self-check statements and an analysis of Bilal's
  proposed reading support.
- Topic 2.3: transmission and text have different jobs; reliability is not judged from an
  appealing message; the Sunnah links knowledge with worship and conduct. Evidence: three
  retrieval questions, paired card audit, four self-check statements and analysis of an
  unsourced attribution with a checked alternative.

## Bloom mini-table

| Sub-topic | Target | Explanation heading | Evidence |
|---|---|---|---|
| U2-01 | Understand | The Holy Qur'an as a source | Topic 2.1 check 1; MCQ-01; RRQ-01; ERQ-01 |
| U2-02 | Understand | Hadith and Sunnah as a source | Topic 2.1 check 2; MCQ-02; ERQ-01 |
| U2-03 | Analyze | Ijma and Qiyas | Topic 2.1 check 3 and summative; MCQ-03/04; RRQ-02/03; ERQ-01 |
| U2-04 | Understand | Introduction to the Qur'an | Topic 2.2 check 1/2; MCQ-05; RRQ-04/05 |
| U2-05 | Apply | The Qur'an as a source of guidance | Topic 2.2 check 3; MCQ-06; RRQ-06; ERQ-02 |
| U2-06 | Apply | Selected Qur'anic verses: a theme-based study | Topic 2.2 activity and summative; MCQ-07; RRQ-07; ERQ-02 |
| U2-07 | Understand | Importance of Hadith | Topic 2.3 card audit; RRQ-10; ERQ-03 |
| U2-08 | Analyze | Classification of Hadith | Topic 2.3 checks 1/2/3 and summative; MCQ-08/09/10; RRQ-08/09; ERQ-03 |
| U2-09 | Apply | Role of Sunnah in Islamic life | Topic 2.3 practicum and summative; RRQ-10; ERQ-03/05 |

The unit bank samples topics 2.1/2.2/2.3 at 4/3/3 MCQs and 3/4/3 RRQs. ERQs 1–3
give one task per topic; ERQs 4–5 integrate all three topics. All three topic rubrics
require analysis. Each unit ERQ has separate scored criteria and performance levels.

## Scope and fidelity self-check

- Guide Weeks 3–5, lines 416–427, compared verbatim with all nine checklist leaves.
- Five English pages only: opening, three nine-part cycles and unit assessment.
- No teacher-notes page invented: the guide supplies no Unit 2 practical-work or strategies block.
- Six planned figure carriers match the manifest; the required process figure is fig-U2-5.
- No raster production or SVG authoring belongs to this pass.
- Worked examples precede activities; each leaf has a school or learner-facing example.
- Every source actually used has coverage; no detailed attribution to the unread Maududi edition.
- Religious claims need independent Islamic Studies review. Sunni framework limits, specialist
  grading limits, the distinction between weak and fabricated, and the intoxicant example's
  general textual coverage are explicit.
- Technical terms are defined inline. The global glossary has no matching religious terms;
  adding its entries and tooltips is outside this unit-only scope and remains integration work.
- No Urdu mirror authored. The translation badge stays draft; concept Urdu labels are explicitly
  authored metadata awaiting G5 checking, not a completed Urdu translation.

## Reading-time calculation

Count body words after stripping front matter, imports, non-rendered figure comments,
URL targets and component tags. Use ceiling(words / 190), within the skill's 180–200 wpm
range. Reading time excludes carrying out activities and writing responses.

| File | Body words | Minutes |
|---|---|---|
| index.mdx | 428 | 3 |
| topic-01.mdx | 2815 | 15 |
| topic-02.mdx | 2494 | 14 |
| topic-03.mdx | 2514 | 14 |
| unit-assessment.mdx | 3118 | 17 |

Total: 63 minutes, within the approved 55–75 minute band. No re-baselining required.

## Integration handoff

G3/G5, Urdu translation, global glossary integration and figure generation are pending.
Catalog work remains under G-2026-196. A derived content-status refresh is necessary when
integrating the unit; the brief's scope excludes that global report. This authoring record
does not grant publication authority or certify the content.

## Deterministic checks and remaining blockers

At branch start, HEAD matched origin/main and all 13 content gates passed. After authoring,
10 of 13 pass: content schema, unit depth and source excerpts, punctuation, public-answer
bounds, concept graph, Bloom bands, source floor, licence checks and documentation sync.
The actual logs are in `authoring/unit-02/checks/`; these are author check logs, not G2 evidence.
All five pages also compile through the MDX compiler. No build, dev server or Playwright ran.

Three checks remain red relative to main:

1. `check:figures`: six planned carriers do not meet the newer rendered-figure floor.
   The author-unit skill explicitly excludes generation and placement. ADR-0030 does allow
   Codex to author SVG schematics, superseding the older ownership description, but the
   mandated SVG geometry script uses Playwright, which the crew brief explicitly forbids.
   No figure is falsely marked generated or placed.
2. `check:pipeline-gate`: G2 remains in progress because valid deterministic evidence cannot
   be prepared while the figure gate fails. G3/G5 remain open, without invented initials.
3. `check:content-status`: adding the unit changes the derived global report. The required
   `static/content-status.json` refresh is outside the brief's explicit scope. It was not
   changed while the scope clarification was pending.

The owner was asked about these scope/dependency conflicts. No answer was received during
this author pass; elapsed time was not treated as permission. The crew lead owns integration
and the decision whether to extend this author job or schedule the separate figure pass.
