// Report builder for EFMP-301 Unit 12 G3 run001.
// Assembles the contract report, hashing the exact evidence bytes on disk.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { inputManifest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const ROOT = process.cwd();
const BASE = 'specs/content/efmp-301/reviews/unit-12/G3';
const LOGS = `${BASE}/logs-agent-g3-efmp301-u12-run001`;
const RENDERS = `${BASE}/renders-agent-g3-efmp301-u12-run001`;

const sha = (p) => createHash('sha256').update(readFileSync(join(ROOT, p))).digest('hex');

const evidence = {};
for (const f of readdirSync(join(ROOT, LOGS))) evidence[`${LOGS}/${f}`] = sha(`${LOGS}/${f}`);
for (const f of readdirSync(join(ROOT, RENDERS))) {
  // Skip the intermediate re-encode copies made while probing image display.
  if (f.startsWith('inspect-')) continue;
  evidence[`${RENDERS}/${f}`] = sha(`${RENDERS}/${f}`);
}
evidence[`${BASE}/summary-run001.txt`] = sha(`${BASE}/summary-run001.txt`);

const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 12,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'claude-code:022-author-efmp-301:8b67651c',
  reviewer_run_id: 'g3-review:efmp-301-u12:20260925',
  model: 'LongCat-2.0',
  started_at: '2026-09-25T16:48:24Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: 'eccc4074a6f753d12663e5010e19d9b3a0f9f5c461ac8c3a22d093503345998b',
  input_manifest: inputManifest(ROOT, 'EFMP-301', 12, 'G3'),
  criteria: [
    {
      id: 'authority',
      status: 'fail',
      evidence: [
        'Guide chain verified: the Week 16 block (Scheme-and-Course-guides/extracted-text/1st 2026.txt:1162-1171) names Chapters 11-12 combined plus the course review, with bullets "Guidance and counseling", "Application of educational psychology", "Technology and learning", "Professional ethics" (mental health went to Unit 11); the unit takes exactly the remaining four bullets, as its index (docs/semester-1/efmp-301/unit-12/index.mdx:21-24) and the content-spec partition note (specs/content/efmp-301/content-spec.md:1305-1311) disclose',
        'SLO traces verified: SLO:EFMP-301-12-1 and -12-2 -> guide CLO 6 "Promote inclusive, ethical, and supportive learning environments" (content-spec.md:1313-1316 against 1st 2026.txt:1040); SLO:EFMP-301-12-3 -> CLOs 3 and 6 (1st 2026.txt:1037, 1040); topic clo_refs are correct one-per-topic subsets; intake D-2026-0044 approved the 12-unit partition and the Week 16 bullet assignment (specs/content/efmp-301/intake-2/evaluation.md:76-83) and content-spec status is approved (content-spec.md:3)',
        'Guide claims in the unit verified: the five teaching strategies named at unit-teacher-notes.mdx:32-33 are the guide\'s list verbatim (1st 2026.txt:1173-1180); the practical-work list naming hands-on computer exercises and internet-research tasks (topic-03.mdx:68-69) is accurate (1st 2026.txt:1182-1191); the Week 16 shared-slot framing (index.mdx:60-62, unit-teacher-notes.mdx:23-28) matches the guide; the fig-U12-6 timeline week-to-unit mapping matches the guide week schedule exactly (fig-U12-6.svg against 1st 2026.txt:1042-1171)',
        'FAIL locus: unit-teacher-notes.mdx:84-88 presents the dilemma-round presentations as "The guide\'s practical component for this chapter" - the guide\'s Practical Work list is course-generic (five items, no chapter assignment) and "case study analysis" is a teaching strategy, not practical work; the course overview itself frames practical work correctly (docs/semester-1/efmp-301/course-overview.mdx:79-83). Same defect class as Unit 10 round-1 blocking finding 2 (finding 2 below)'
      ]
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'khizar2019 verified: the inline citation (topic-02.mdx:71-75, "public accountability, not private virtue (Khizar, Anwar & Malik, 2019)") matches the bound paraphrase (sources/texts/khizar2019.md:12-26, "professionalism is treated as a quality of the teaching force that policy and standards are meant to build and measure, not as a private virtue"); the excerpt records Unit 12 usage; the citation details (Bulletin of Education and Research 41(3), 101-118, ERIC EJ1244705) are consistent across registry, excerpt and Further Reading (topic-02.mdx:174-177)',
        'who2026 and vosniadou2001 bound and consistent with their excerpts (sources/texts/who2026.md:17-20 environment-reshaping quote; sources/texts/vosniadou2001.md:14-28 developmental-differences principle behind the U12-5 reading), though neither excerpt\'s "Used for" list records Unit 12 (advisory finding 11)',
        'Cross-unit references verified against sibling units and the content-spec: three-part scope (unit-01/topic-01.mdx:3), stage-descriptions-not-class-average (unit-02/topic-04.mdx:58), enactive-to-iconic (unit-03/unit-assessment.mdx:33), workbench (unit-04/index.mdx:28), elaboration (unit-05/topic-02.mdx:68), attribution and protect loops (unit-06/topic-02.mdx), ladder\'s dignity (unit-08/index.mdx:39), third Monday (unit-11/topic-02.mdx:69), teacher-with-wrong-answer modeling (unit-03/topic-03.mdx:27,53)',
        'FAIL loci: sources/unit-12.md:16 (seifert2009 row) claims "bound excerpt in sources/texts/seifert2009.md" for U12-1 (Chapter 8 communication grounding), U12-4 (Chapter 1 professional responsibility framing) and U12-5 (Chapters 1-10 course whole), but the bound file\'s 14 sections are all "used by" Units 2-10 - no Chapter 8 or Chapter 1 passage exists (grep of all section headers); the unit\'s Further Reading directs learners to those chapters (topic-01.mdx:167-168, topic-02.mdx:178-179, topic-03.mdx:179-181); the row\'s "the modeling finding of Chapter 10" (U12-6) mislabels Chapter 2 material - the passage is bound at seifert2009.md:117-130 under a heading mislabeled "Chapter 10 - Planning instruction (used by Unit 3)", and the same passage appears in the later "Chapter 2 extension" (seifert2009.md:325-399) (finding 5)'
      ]
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All six sub-topics taught at the mapped headings, verified against the actual teaching not just the matrix: U12-1 at topic-01.mdx:42-71 ("What guidance and counseling are" - the three-way distinction, confidentiality, relationship-as-method); U12-2 and U12-3 at topic-01.mdx:73-97 ("The guidance programme and the teacher as first line" - four programme parts, first-line rules, referral; sharing one section is permitted by the depth standard when both are individually accounted for, which coverage/unit-12.md:9-11 does); U12-4 at topic-02.mdx:38-99 (five duties + decision path); U12-5 at topic-03.mdx:40-64; U12-6 at topic-03.mdx:66-103',
        'Every sub-topic assessed: U12-1 (MCQ 1-3, RRQ 1-3), U12-2 (RRQ 4, ERQ 1), U12-3 (MCQ 4-5, RRQ 5), U12-4 (MCQ 6-7, RRQ 6-7, ERQ 2), U12-5 (ERQ 4-5), U12-6 (MCQ 9-10, RRQ 9-10, ERQ 3); concept-graph linkage (concepts/unit-12.md) consistent per check:concept-graph',
        'Reinforcement rows verified present (topic-02 revisits confidentiality\'s limit and the referral at :49-59, :91-93; unit-assessment.mdx:23-43 unit summary; unit-teacher-notes.mdx:82-91 practical work); reading budget 86 min equals the spec target (index 4 + topics 17+15+18 + assessment 24 + notes 8; content-spec.md:1353-1354, band 78-105)',
        'Advisory: two of the spec\'s worked examples (the Hyderabad counselor\'s week, U12-2; the floods referral, U12-3, content-spec.md:1366-1370) are not delivered as named - the Larkana case serves those sub-topics collectively (finding 10)'
      ]
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'Independent solve of all 25 items before comparison (logs-agent-g3-efmp301-u12-run001/blind-derivation.md): all 10 MCQ keys agree (b,c,b,b,c,c,b,b,c,c); all 10 RRQ model answers and all 5 ERQ rubrics agree with the reviewer\'s derived answers; each ERQ rubric sums to 20 (6+7+3+4 / 5+7+4+4 / 6+7+3+4 / 6+7+3+4 / 8+6+2+4) and carries at least one Analyze-or-higher row (Create/Analyze/Create/Analyze/Evaluate); ERQ structure matches the blueprint\'s "one per topic plus two integrative, the fifth the course capstone" (ERQ 1=12.1, 2=12.2, 3=12.3, 4 integrative, 5 capstone)',
        'FAIL loci: MCQ topic spread is 5/3/2 (12.1=MCQ 1-5, 12.2=MCQ 6-8, 12.3=MCQ 9-10, unit-assessment.mdx:49-110) against the promised 4/3/3 (content-spec.md:1405); RRQ spread is 5/3/2 (12.1=RRQ 1-5, 12.2=RRQ 6-8, 12.3=RRQ 9-10, unit-assessment.mdx:114-129) against the promised 3/4/3 (content-spec.md:1406); no RRQ reaches the promised Understand-to-Analyze band\'s Analyze level (7 Understand + 3 Apply) - same defect class as Unit 10 round-1 blocking finding 1 (finding 1)',
        'FAIL locus: the RRQ 9 model answer (unit-assessment.mdx:198-200, "connection and research (Unit 3\'s analogy)") and its taught source (topic-03.mdx:77-78, "the internet-research task is Unit 3\'s analogy strategy") misattribute the analogy strategy to Unit 3; analogy is taught in Unit 4 (content-spec.md:647-648, fig-U4-6; docs/semester-1/efmp-301/unit-04/topic-03.mdx:165) and appears nowhere in Unit 3 (finding 4)',
        'Advisory: MCQ key clustering b x 5 / c x 5, a and d never correct (finding 7); MCQ 2 and MCQ 9 labelled Apply though the taught passage states the answer nearly verbatim (finding 8)'
      ]
    },
    {
      id: 'accessibility',
      status: 'fail',
      evidence: [
        'Rendered inspection of all six pages at 1280x800, 360x640 narrow and A4 print emulation 794x1123 media=print, from the worktree-local build (exit 0) served on localhost:3212 (logs-agent-g3-efmp301-u12-run001/render-review.log; 26 PNGs + render-audit.json under renders-agent-g3-efmp301-u12-run001/): no document overflow at any width; every table measured on the table element itself (clientWidth 328 === scrollWidth 328 at 360px, rightmost cell right edge 344 < 360, so no scroll is needed and the absent tabindex/role/aria-label hydration attributes are moot); figures render 328x198 narrow / 703x425 desktop with non-empty alt text and lazy loading; dark variants swap under [data-theme=dark] (topic-01-dark.png); answers, rubrics, MCQ options and figures are not clipped in narrow or print views; the nine-part heading order renders correctly on all three topics',
        'FAIL locus: fig-U12-3 (static/img/figures/efmp-301/unit-12/fig-U12-3.svg and .dark.svg; figures/unit-12.md row 3; topic-02.mdx:34) - in the fifth row the column-2 text "welfare against reputation, results, convenience" overprints the column-3 text "when duties conflict, the pupil\'s welfare outranks them" by 33.6 x 14.2 px in both variants (browser-measured bboxes, logs-agent-g3-efmp301-u12-run001/figure-overprint-audit.log); the row also lacks its grid separator (last grid line y=326, row text y 411-427) and the duty label "pupil welfare first" crosses the panel\'s bottom edge by 1.1 px; check:figures and measure-figure-text both pass this file (finding 3; renders: figure-fig-U12-3-light.png, figure-fig-U12-3-fifthrow-zoom.png)',
        'Advisory: fig-U12-1\'s dashed guidance-counseling link is unlabelled, its endpoints float 70 px below the guidance and teacher boxes, and its middle passes behind the opaque counseling box (logs-agent-g3-efmp301-u12-run001/fig-u12-1-dashlink.log; renders figure-fig-U12-1-dashlink-zoom.png) - the manifest row\'s "often one programme in school" label is absent, though the relationship is recoverable from fig-U12-2\'s caption and the prose (finding 6); Further Reading uses the bare open.umn.edu URL as link text (finding 12)'
      ]
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'HSC/intermediate register maintained: every technical term is glossed at first use in plain language (guidance as "information and direction: helping a person see the options and choose a path", topic-01.mdx:44-45; counseling as "a skilled relationship: a trained listener helping a person work through a difficulty that information alone cannot touch", topic-01.mdx:51-52; professional ethics as "the set of duties that make the role trustworthy", topic-02.mdx:40-42); compressed cross-unit phrases (enactive-to-iconic, operant conditioning, the workbench) rest on the stated Units 1-11 prerequisite (index.mdx:46-50)',
        'Concrete Pakistani grounding throughout: the Larkana Class 9 pupil, the patron\'s child marks case, the rural Sindh tablet project with one device per four pupils; unit-level apparatus (outcomes, prerequisites, "In this unit" links, how-to-use) present in index.mdx; est_reading_minutes consistent with the delivered text (86 total, band 78-105)',
        'Nine-part cycle complete and ordered in all three topics (verified in the rendered heading audit, render-audit.json); misconception blocks named and corrected in each topic (topic-01.mdx:90-95, topic-02.mdx:101-107, topic-03.mdx:96-103); no em dashes (check:no-em-dash exit 0)',
        'Advisory: topic-02/topic-03 do not link the banked term "Professional Ethics" at first definition (topic-01 links "Guidance and Counseling" at topic-01.mdx:54; terminology.csv:53,107) (finding 14)'
      ]
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        'Progression classroom-situation -> explanation -> activity -> retrieval -> reflection -> assessment verified in all three topics: the Larkana three-responses opener (topic-01.mdx:26-38), the examiner-pressure opener (topic-02.mdx:25-32), the tablet-project opener (topic-03.mdx:25-36); five Bloom-labelled retrieval items per topic; four-item self-assessment checklists; practicum transfer tasks (topic-01.mdx:140-144, topic-02.mdx:147-151, topic-03.mdx:151-157)',
        'Activities feasible in the stated Sindhi classroom context with usable instructions and no exotic materials: "Three responses, one pupil" (small groups, 20 min, re-read the case), "The dilemma round" (groups of four, 20 min, real dilemmas, path run aloud), "The episode through the course" (pairs, 25 min); teacher-notes week sequencing table (unit-teacher-notes.mdx:51-55) with a concrete cut-if-time-is-lost priority',
        'Integration is the unit\'s explicit design and is delivered with verified cross-unit references (23 of 24 spot-checked attributions correct - the exception is finding 4); mini-rubrics and ERQ rubrics demand Analyze-or-higher work with evidence-over-affection criteria; the closing-on-agency design the spec requires (content-spec.md:1382-1383) is delivered (topic-03.mdx:89-103, unit-teacher-notes.mdx:44-47)',
        'Advisory: the "course\'s one running question" is stated only in figure captions and differs from the teacher notes\' phrasing of the "one question" (finding 9); the spec\'s Hyderabad counselor-week and floods-referral worked examples were not delivered (finding 10)'
      ]
    }
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: 'Assessment blueprint violation: the approved blueprint (specs/content/efmp-301/content-spec.md:1404-1411) promises MCQ spread 4/3/3 across topics 12.1-12.3, RRQ spread 3/4/3, and an Understand-to-Analyze RRQ band, but the delivered bank maps MCQ 5/3/2 (12.1 = MCQ 1-5, 12.2 = MCQ 6-8, 12.3 = MCQ 9-10, unit-assessment.mdx:49-110) and RRQ 5/3/2 (12.1 = RRQ 1-5, 12.2 = RRQ 6-8, 12.3 = RRQ 9-10, unit-assessment.mdx:114-129), and no RRQ reaches Analyze (7 Understand + 3 Apply). Same defect class as Unit 10 round-1 blocking finding 1. Repair: redistribute one MCQ and two RRQs onto 12.2/12.3 material to the promised spreads, raise at least one RRQ to genuine Analyze demand, or have the owner amend the blueprint.'
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Guide misattribution (teacher notes): docs/semester-1/efmp-301/unit-12/unit-teacher-notes.mdx:84-88 presents the dilemma-round presentations as "The guide\'s practical component for this chapter ... a case study analysis and presentations". The guide\'s Practical Work list (Scheme-and-Course-guides/extracted-text/1st 2026.txt:1182-1191) is course-generic (hands-on computer exercises, individual assignments, group assignments, presentations, internet-research tasks) and names no chapter-specific task; "case study analysis" is teaching strategy 5 (1st 2026.txt:1173-1180), not practical work; the specific task is authored. Same defect class as Unit 10 round-1 blocking finding 2 and Unit 2\'s round-1 finding; the course overview frames it correctly (course-overview.mdx:79-83). Repair: reword to present the task as the unit\'s own practical work aligned with the guide\'s generic components, and align "the guide\'s practical-work list ... behind ... the teacher notes" at specs/content/efmp-301/sources/unit-12.md:25.'
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Figure text-on-text overprint and row defects (fig-U12-3): in the fifth row ("pupil welfare first" - the duty that orders all others), the column-2 text "welfare against reputation, results, convenience" overprints the column-3 text "when duties conflict, the pupil\'s welfare outranks them" by 33.6 x 14.2 px, in both static/img/figures/efmp-301/unit-12/fig-U12-3.svg and fig-U12-3.dark.svg (browser-measured bboxes; logs-agent-g3-efmp301-u12-run001/figure-overprint-audit.log; renders figure-fig-U12-3-light.png and figure-fig-U12-3-fifthrow-zoom.png). The row also lacks its grid separator (last grid line at y=326; the row\'s text spans y 411-427 in the same band as "honest reporting") and the duty label crosses the panel\'s bottom border by 1.1 px. check:figures and measure-figure-text both pass this file - text-on-text overprint and border crossing are invisible to both, the same blind spot as Unit 10\'s fig-U10-4 blocking finding. Repair: wrap the column-2 text within its column (grid line x=398), add the missing fifth-row separator, and move the row clear of the panel bottom, then re-run measure-figure-text and this audit.'
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Wrong cross-unit attribution, propagated into the marked bank: topic-03.mdx:77-78 says "the internet-research task is Unit 3\'s analogy strategy at the speed of a search box", and the RRQ 9 model answer repeats "connection and research (Unit 3\'s analogy)" (unit-assessment.mdx:198-200). The analogy strategy is taught in Unit 4 (specs/content/efmp-301/content-spec.md:647-648, fig-U4-6 "problem-solving strategies (algorithm, heuristic, means-ends, working backwards, analogy)"; docs/semester-1/efmp-301/unit-04/topic-03.mdx:165); the string "analogy" appears nowhere in Unit 3\'s files. Because the affordances list\'s method is "each through the unit it comes from" and RRQ 9 asks learners to name affordances "each with the unit it comes from", the wrong attribution is load-bearing: a learner would be taught and marked on a false unit reference. Repair: change "Unit 3\'s analogy" to "Unit 4\'s analogy" in both loci.'
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'seifert2009 registry row overstates bound support: specs/content/efmp-301/sources/unit-12.md:16 declares "retrieved and read 2026-09-24; bound excerpt in sources/texts/seifert2009.md" while claiming support for U12-1 ("the communication and relationship grounding of Chapter 8 behind the counseling distinction"), U12-2, U12-4 ("the professional responsibility framing of Chapter 1"), U12-5 ("the course whole, Chapters 1-10") and U12-6 - but the bound excerpt file contains no Chapter 8 or Chapter 1 passage (its 14 sections are all "used by" Units 2-10), so none of the Chapter 8/Chapter 1 grounding is verifiable from the bundle. The unit\'s Further Reading directs learners to those chapters (topic-01.mdx:167-168 Chapter 8; topic-02.mdx:178-179 Chapter 1). Additionally the row\'s "the modeling finding of Chapter 10" (U12-6) mislabels Chapter 2 material: the passage is bound at seifert2009.md:117-130 under a heading mislabeled "Chapter 10 - Planning instruction (used by Unit 3)", and the same passage appears in the file\'s later "Chapter 2 extension". The G3 rubric names this failure mode: a declaration that understates what it leaves unchecked. Repair: bind the actual Chapter 8 and Chapter 1 passages that ground the claims (as sibling units did for their chapters), or reword the row to declare exactly what is and is not bound; fix the Chapter 10/Chapter 2 modeling label.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'fig-U12-1\'s dashed guidance-counseling link is not delivered as its manifest row specifies: the "often one programme in school" label is absent (no text element carries it), the curve\'s endpoints (170,340) and (610,340) float 70 px below the guidance and teacher boxes (both end at y=270) attached to nothing, and its middle passes behind the opaque counseling box (painted later in document order; browser-verified paint order and bboxes in logs-agent-g3-efmp301-u12-run001/fig-u12-1-dashlink.log; renders figure-fig-U12-1-dashlink-zoom.png). The relationship is recoverable from fig-U12-2\'s caption ("Both are one programme in school...") and the prose, so advisory; repair requested (label the link and route it clearly between guidance and counseling, or remove the floating stubs).'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'MCQ key clustering: option b is the key in 5 of 10 items and c in 5; options a and d are never correct (unit-assessment.mdx:163-172). Not a rubric violation; consider spreading the key across options in the repair cycle.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Bloom labels vs actual demand: MCQ 2 (the Larkana careers talk) and MCQ 9 (the tablet project evaluation finding) are labelled Apply, but the taught passage states each answer nearly verbatim (topic-01.mdx:29-30; topic-03.mdx:33-35), so the thinking actually required is recall/matching. The Remember..Apply band is not broken either way; recorded as a classification note for the repair cycle.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'The "course\'s one running question" ("why does this pupil bother, and what will help?") exists only in the fig-U12-5 and fig-U12-6 captions; no earlier unit, the course overview, or topic-03\'s prose states it, and the teacher notes phrase the "one question" differently ("what would you have done, and why", unit-teacher-notes.mdx:44-47). topic-03\'s self-assessment item 4 (topic-03.mdx:149) asks learners to "say what the course\'s one running question is" - answerable only from a figure caption. Consider stating the question in topic-03\'s prose and aligning the teacher-notes phrasing.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Worked-examples plan deviations: the content-spec promised a Hyderabad secondary-school counselor\'s-week example (U12-2) and a Class 6 floods-referral example (U12-3) (content-spec.md:1364-1374); neither is delivered - the Larkana case serves those sub-topics collectively. The style guide\'s one-example-per-sub-topic target is soft ("aim for roughly"), and the delivered Pakistani examples (Larkana, the marks case, the tablet project) are strong, so advisory.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Source-excerpt bookkeeping: who2026.md\'s "Used for" list records only Unit 11 and vosniadou2001.md\'s only Units 1-2, though the Unit 12 registry cites both (sources/unit-12.md:17-19); khizar2019.md\'s excerpt was updated for Unit 12 correctly. Update the two excerpts\' usage lists in the repair cycle.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Further Reading uses the bare open.umn.edu URL as link text (topic-01.mdx:168, topic-02.mdx:179, topic-03.mdx:181); link purpose is recoverable from the citation context. Same advisory as Unit 10 round-1.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Input drift, recorded per the parent\'s run instruction: the prepared manifest (specs/content/efmp-301/reviews/unit-12/G3/manifest.json, prepared 2026-09-24 19:13, committed 6d6236d7) is stale against the reviewed HEAD for exactly one bound input - sources/texts/seifert2009.md, extended at 8c15c7c9 (2026-09-25 05:13) and b2ff0b3b (2026-09-25 11:25) with additive excerpts for Units 2/3/4/9 (0 deletions verified; every added section is labelled for another unit; this unit\'s own support passages are byte-identical to the freeze state). All other 100 paths and the skill digest are unchanged. HEAD also moved during the review itself (d837f4eb -> f1d20a72: Unit 11 G3 repairs and G2 evidence refreshes) with NO further unit-12 bound-input change - git diff d837f4eb..f1d20a72 over every unit-12 bound path is empty (logs-agent-g3-efmp301-u12-run001/manifest-verify.log). This report binds the recomputed manifest at f1d20a72, as validateReport requires, so its findings describe exactly the bytes the manifest hashes; the renders were built at d837f4eb whose unit-12 bound inputs are identical. The parent should prepare a fresh manifest for the repair round. Under the skill\'s strictest reading a mismatched digest alone is escalation-worthy; it is recorded advisory here because the drift is fully explained, additive-only, unrelated to Unit 12\'s claims, and the parent\'s instructions directed re-verification and recording (same handling as Unit 10 round-1 finding 9).'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Glossary linking: topic-01 links the banked term "Guidance and Counseling" at first definition (topic-01.mdx:54; terminology.csv:53), but topic-02 does not link the banked "Professional Ethics" (terminology.csv:107) at its first definition and imports no Glossary component at all (nor does topic-03). The teacher notes\' banked-terms claim (unit-teacher-notes.mdx:77-80) was verified accurate against terminology.csv (all four Urdu labels banked: Guidance and Counseling, Professional Ethics, Code of Ethical Conduct, Ethical Dilemma). Same advisory class as Unit 10 round-1 finding 9.'
    }
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.log` },
    { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.log` },
    { name: 'check:concept-graph', exit_code: 0, log_path: `${LOGS}/check-concept-graph.log` },
    { name: 'check:bloom-bands', exit_code: 0, log_path: `${LOGS}/check-bloom-bands.log` },
    { name: 'check:source-floor', exit_code: 0, log_path: `${LOGS}/check-source-floor.log` },
    { name: 'figures:variants:check', exit_code: 0, log_path: `${LOGS}/figures-variants-check.log` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${LOGS}/measure-figure-text.log` },
    { name: 'figure-overprint-audit', exit_code: 1, log_path: `${LOGS}/figure-overprint-audit.log` },
    { name: 'figure-zoom-shots', exit_code: 0, log_path: `${LOGS}/figure-zoom-shots.log` },
    { name: 'build', exit_code: 0, log_path: `${LOGS}/build.log` },
    { name: 'manifest-verify', exit_code: 0, log_path: `${LOGS}/manifest-verify.log` }
  ],
  evidence_manifest: evidence
};

writeFileSync(join(ROOT, `${BASE}/agent-g3-efmp301-u12-run001.json`), JSON.stringify(report, null, 2) + '\n');
console.log('report written:', `${BASE}/agent-g3-efmp301-u12-run001.json`);
console.log('evidence files:', Object.keys(evidence).length);
