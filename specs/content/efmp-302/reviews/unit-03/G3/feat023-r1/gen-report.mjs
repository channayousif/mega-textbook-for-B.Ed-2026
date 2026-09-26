import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { rulingDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const root = process.cwd();
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
const manifest = JSON.parse(readFileSync('specs/content/efmp-302/reviews/unit-03/G3/feat023-r1/manifest.json', 'utf8'));

// Evidence: every saved log and render artifact for this attempt.
const evidence = {};
const addDir = (dir) => {
  for (const f of readdirSync(join(root, dir))) {
    const p = `${dir}/${f}`;
    if (statSync(join(root, p)).isFile()) evidence[p] = sha(p);
  }
};
addDir('specs/content/efmp-302/reviews/unit-03/G3/logs-feat023-r1');
addDir('specs/content/efmp-302/reviews/unit-03/G3/renders-feat023-r1');

const L = 'specs/content/efmp-302/reviews/unit-03/G3/logs-feat023-r1';
const R = 'specs/content/efmp-302/reviews/unit-03/G3/renders-feat023-r1';

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'Course guide read at Scheme-and-Course-guides/extracted-text/1st 2026.txt:832-863 (guide Unit 3, Weeks 6-8) and the bound course-guide PDF .specify/Course_guides_and_Scheme/EFMP-302 Teaching Profession.pdf, text extracted this run with ghostscript txtwrite (/tmp/efmp302-guide.txt, extraction recorded in this run log transcript). Both carry the same Unit 3 outline: 3.1 Understanding Teacher Effectiveness (redefining an effective teaching and effective teacher; components of teacher effectiveness), 3.2 Personal and Professional Qualities (attitude toward the profession; dressing and grooming as dimensions of professional image; personality traits empathy/patience/self-control/optimism/humour/resilience/adaptability etc.; influence of personality trait on teacher effectiveness), 3.3 Social skills and Relationship Building (building positive relationships with various stakeholders; managing conflict and maintaining professionalism), 3.4 Effective communication skills (verbal; non-verbal, types and classroom use), 3.5 The Evolving Roles (facilitator, researcher, change agent, moral agent, life-long learner).',
      'specs/content/efmp-302/content-spec.md "## Unit 3" (lines 441-563) is the approved unit-spec. Its 13-row sub-topic checklist covers every guide leaf bullet; guide 3.5 is one bullet naming five roles and is decomposed into U3-11/12/13, and the checklist self-description at content-spec.md:462-466 now honestly says rows are "a decomposition rather than a transcription" (run-007 A-12a repaired). The Topic list partitions U3-01..U3-13 totally and disjointly across the five topic files on disk.',
      'Every guide leaf verified taught by reading the assigned section: topic-01.mdx "### Redefining effective teaching and the effective teacher" and "### The components of teacher effectiveness, and what each can and cannot show"; topic-02.mdx "### A teacher\'s attitude toward the teaching profession", "### Dressing and grooming as dimensions of professional image", "### Personality traits of effective teachers", "### The influence of personality traits on teacher effectiveness"; topic-03.mdx "### Building positive relationships with pupils, parents, colleagues and the community", "### Managing conflict while maintaining professionalism"; topic-04.mdx "### Verbal communication in the classroom", "### Non-verbal communication: its types and their classroom use"; topic-05.mdx "### The teacher as facilitator and as researcher", "### The teacher as change agent and as moral agent", "### The teacher as life-long learner".',
      'Guide CLO trace remains imprecise (advisory A-12b): content-spec.md:445 says Unit 3 "traces to guide CLOs 1, 5", but per the guide PDF\'s own CLO order the on-point outcome is CLO 2, "Identify and exhibit the characteristics and qualities of an effective teacher", and CLO 1 (role and responsibilities) maps only loosely to Topic 3.5. Every guide leaf bullet for 3.1-3.5 is taught, so this is an imprecise trace, not missing or contradictory authority.'
    ]
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'run-007 B-01 REPAIR VERIFIED IN BYTES: static/img/figures/efmp-302/unit-03/fig-U3-7.svg and .dark.svg now caption "Furlich (2016): the verbal measure was significant, the non-verbal one was not. Sample size and setting are unstated in the abstract -" (class="m" block at x=20 y=304). grep for "N=77" and "N = 77" over docs/semester-1/efmp-302/unit-03/, static/img/figures/efmp-302/unit-03/ and specs/content/efmp-302/ returns no hit outside the furlich2016.md scope note and historical review records. The stated direction matches the bound verbatim abstract at specs/content/efmp-302/sources/texts/furlich2016.md:12-19 ("Only instructor verbal immediacy behaviors had a significant linear regression relationship result with student motivation to learn").',
      'run-007 B-02 REPAIR VERIFIED IN CONTENT: fig-U3-7 row 4 now reads "The class tends to believe the non-verbal channel." with the sub-line "A practitioner\'s heuristic: widely held, and not established as a finding by the studies cited here.", which agrees with topic-04.mdx:131-140, the unit summary at unit-assessment.mdx:44-46 and MCQ 8\'s key (b). Note: these very lines are overprinted by the new blocking finding B-01 of this run, so the repair is present in bytes but not legible until that is repaired.',
      'furlich2016 VERIFIED: topic-04.mdx:117-124 states the small-liberal-arts-university setting, the verbal-significant/non-verbal-not result, and that the published abstract gives neither a sample size nor a country; Further reading at :253-258 repeats all three. The 93% claim is treated as a misconception and its usual replacement is explicitly scoped as a practitioner\'s heuristic descending from the same experiments (topic-04.mdx:126-140).',
      'taylor2023 VERIFIED: the bound verbatim quote "many papers used inaccurate or implied definitions of TE" (taylor2023.md:11-12) is used at topic-01.mdx:72-74, and the school-appraisal extension is marked "a reasonable inference rather than their finding" at :77-78.',
      'goe2008 VERIFIED IN PART: "no single measure... Multiple measures...must be employed" and "Resist pressures to reduce the definition of teacher effectiveness to a single score" (goe2008.md:14-18) support topic-01.mdx:50-52 and :120-123. The "explicit... should not be reused for high-stakes appraisal" direction remains a paraphrase beyond the excerpt (advisory A-11 carried).',
      'keelson2024 VERIFIED at record level: 614 participants, a technical university, five-point Likert self-report, significant facial-expression and gesture associations (keelson2024.md:13-17) match topic-04.mdx:80-81 and :113-117. "Ghana" rests on author affiliation (advisory A-10 carried).',
      'suarez2022 VERIFIED at record level for the claim made: the record summary (suarez2022.md:13-16) supports the professional-identity development claim at topic-05.mdx:107-109, and establishes the work addresses neither change agent nor moral agent, which is why U3-12 is regrounded to no-external-source.',
      'Unverifiable sources declared per D-2026-0001: hurst2009, brookfield2017 and suarez2022 are declared under "## Unverifiable sources" at sources/unit-03.md:23-30 with retrieval attempts, the 2026-09-19 date and the owner authorisation; each declaration names exactly the sub-topic set the coverage matrix grounds in it, checked in both directions against coverage/unit-03.md. Honest and complete, so per the G3 reference these do not fail sources. Residual point-of-use attribution questions remain advisory A-09.',
      'no-external-source rows verified: topic-03.mdx "### Managing conflict while maintaining professionalism" and topic-05.mdx "### The teacher as change agent and as moral agent" carry no citation, exactly as sources/unit-03.md:41 asserts.'
    ]
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efmp-302/coverage/unit-03.md: all 13 rows checked against the actual "###" headings under "## Explanation" in the named topic files; every mapping resolves to a real heading that teaches the sub-topic rather than merely naming it. U3-08 and U3-12 are correctly regrounded to no-external-source and the coverage rows agree with the Supports cells in sources/unit-03.md in both directions.',
      'Assessment coverage per topic verified in unit-assessment.mdx: MCQ 1-2 / RRQ 1-2 / ERQ 1 cover 3.1, MCQ 3-4 / RRQ 3-4 / ERQ 2 cover 3.2, MCQ 5-6 / RRQ 5-6 / ERQ 3 cover 3.3, MCQ 7-8 / RRQ 7-8 / ERQ 4 cover 3.4, MCQ 9-10 / RRQ 9-10 / ERQ 5 cover 3.5, matching the content-spec blueprint at content-spec.md:556-563.',
      'specs/content/efmp-302/concepts/unit-03.md: 20 concepts with derived assessment item IDs spot-checked against the bank (CON:EFMP-302-3-17 Contradicting channels -> MCQ-08, ERQ-04; CON:EFMP-302-3-10 trait at excess -> MCQ-04, RRQ-04, ERQ-02; CON:EFMP-302-3-13 de-escalation -> MCQ-06, RRQ-06, ERQ-03).',
      'npm run check:depth-gate exit 0 (' + L + '/check-depth-gate.log): concept coverage, required blocks, formative floor, reading-minutes band and coverage-sources consistency. Reading-minutes total 166 (index 8 + topics 120 + assessment 27 + notes 11) inside the 130-175 band.'
    ]
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      'All 25 items solved independently before the supplied answers were read. Derived MCQ key: 1-c, 2-a, 3-b, 4-d, 5-a, 6-c, 7-d, 8-b, 9-a, 10-d. The supplied key at unit-assessment.mdx:180-193 is identical on all ten. No ambiguous stem found; every distractor is defensibly wrong, and MCQ 8\'s distractor c ("disproved by Furlich\'s study") is correctly handled by the key\'s own note that the null result concerned immediacy and motivation, not channel contradiction.',
      'RRQ schemes are point-by-point and total 6+4+4+9+5+4+5+5+4+4 = 50 (unit-assessment.mdx:195-240); each scheme matches the content an independent solver derives from the topic alone. RRQ 4\'s scheme correctly carries the humour exception: "aimed at a pupil" is credited as inversion rather than excess and markers are told not to mark it down.',
      'ERQ rubrics (unit-assessment.mdx:242-290): five analytic rubrics, four criteria each at Limited 1-2 / Adequate 3 / Strong 4-5 so 20 is reachable; the cap of 10 for a response below Adequate on the analysis or evaluation criterion is stated at :244-245; every ERQ carries at least one bolded Analyze-or-higher criterion.',
      'Bloom demand judged from the thinking actually required: MCQ 9 is genuine Apply (classifying a new mini-case); MCQ 4 and 7 are recall of sentences stated verbatim in topic-02.mdx:100-102 and topic-04.mdx:57-59 (advisory A-07); ERQ 4 is genuinely Create and inside the content-spec range "Analyze to Evaluate/Create" while the front-matter blooms_summary omits Create (advisory A-08).',
      'npm run check:no-answer-keys exit 0 (' + L + '/check-no-answer-keys.log): no answer or mark scheme leaks outside the marked section.'
    ]
  },
  {
    id: 'accessibility',
    status: 'fail',
    evidence: [
      'FAIL - new blocking finding B-01: the b8f8ffe (2026-09-21) SVG re-optimisation pass overprints text in 9 of the unit\'s 10 figures. Rendered-DOM geometry measured in Chromium over all 20 committed SVGs (' + L + '/fig-geometry-1-5.json, fig-geometry-6-10.json, fig-geometry-U3-7.json) finds 18 full superpositions of distinct strings (two different lines at the same baseline and x-range): fig-U3-2 x4 in its bottom caption, fig-U3-5 x2 in its bottom caption, fig-U3-6 x4, fig-U3-7 x5 across three table cells and both caption blocks, fig-U3-9 x3 in its closing caption; plus 10-16px partial collisions in fig-U3-2 (leaf labels against "evidenced by" lines), fig-U3-3 (footnote against the Adaptability row), fig-U3-4 (legend pairs and caption), fig-U3-6, fig-U3-7 and fig-U3-9. fig-U3-10 is clean; fig-U3-1, fig-U3-5 and fig-U3-8 carry only benign 9px header/subtitle line-box proximity whose glyphs do not collide.',
      'Ink-collision pixel proof (' + L + '/ink-collision.log): rendering each line of a pair alone and intersecting inked pixels shows physical glyph collision - fig-U3-7 "A practitioner\'s heuristic: widely held, and not established as a" vs "Saying \'take your time\' while" shares 1784 inked pixels; fig-U3-2 bottom caption 1471; fig-U3-9 1842; fig-U3-6 215; fig-U3-5 1353; fig-U3-7 "definitions," vs "instructions," 586; fig-U3-4 legend 137; fig-U3-3 footnote 304.',
      'The served pages deliver exactly the committed bytes: all ten figure SVGs fetched from the rebuilt site hash-match the manifest digests (' + L + '/print-inspect.log servedDigests). Crops saved under ' + R + '/crop-*.png and standalone renders ' + R + '/fig-U3-*-standalone-2x.png; on-page capture ' + R + '/onpage-fig-U3-7-narrow360.png.',
      'The illegible regions carry assessment-keyed instructional meaning: fig-U3-7 row 4 (the MCQ 8 heuristic distinction, including the run-007 B-02 repair text itself), fig-U3-3\'s overdone column (RRQ 4), fig-U3-5\'s link labels (RRQ 5), fig-U3-9\'s stations and closing caution (MCQ 10, RRQ 10), and each affected figure\'s own takeaway caption. A learner cannot recover that meaning from the figure; the alt text carries topic-level meaning only.',
      'Narrow 360x780 measured on the scrolling elements themselves per the G3 reference (' + L + '/page-inspect.log): div.theme-doc-markdown correctly reports overflow-x visible with scrollWidth == clientWidth == 328; each figure is its own scroller (scrollWidth 800-900 inside 328, overflow-x auto), accepts scrollLeft = scrollWidth, reaches its right edge exactly, and carries tabindex="0", role="region" and an aria-label. The five unit-assessment ERQ rubric tables (scrollWidth 471-527 inside 328) all scroll to their right edge with tabindex/role/aria-label. Nothing is unreachable; the defect is inside the SVGs, not the page layout.',
      'A4 print at 794px: clippedElems 0 on all 8 pages (' + L + '/render-review.log section C; ' + L + '/print-inspect.log), the full bank and the entire answers and marking guidance section render unclipped, PDFs saved under ' + R + '/print-a4-*.pdf. Note: ' + L + '/page-inspect.log\'s print section used a 1280px viewport and its clippedElements=231 is a measurement artifact; the 794px numbers in print-inspect.log and render-review.log are the valid ones.',
      'Structure: one h1 per page, no heading-level skips, every img carries a non-empty alt matching the figure manifest, light/dark pairs share an identical alt with exactly one displayed (' + L + '/render-review.log section A).',
      'Glyph geometry per the committed tool: node scripts/measure-figure-text.mjs exit 0 on all 20 SVGs (' + L + '/measure-figure-text.log) - which is precisely the gap: that tool checks viewBox overflow and wordmark-against-text only, so every overprint above passes it silently, as do check:figures and the refreshed G2 gate evidence.',
      'run-007 A-01 (fig-U3-6 wordmark collision) is repaired in current bytes: no text or painted shape intersects the wordmark in any of the 20 SVGs (fig-geometry-*.json wmText=0, wmShape=0 for all).'
    ]
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      'All 8 unit files read in full (index.mdx, topic-01..05.mdx, unit-assessment.mdx, unit-teacher-notes.mdx). The register holds for a fresh HSC/intermediate graduate: short single-idea paragraphs, concrete Larkana and government-school vignettes before abstraction, and no specialist term used before it is defined. Teacher effectiveness (topic-01.mdx:46), verbal communication (topic-04.mdx:40) and non-verbal communication (topic-04.mdx:76) each carry a Glossary entry and all three are in specs/content/terminology.csv:111-113.',
      'Uncertainty is marked in the reader\'s own terms: topic-01.mdx:72-78 separates Taylor and Thion\'s finding from the school-appraisal extension; topic-04.mdx:117-140 separates what the cited studies establish from the practitioner\'s heuristic and scopes both cited studies to university settings. This is the citation discipline the unit itself teaches.',
      'est_reading_minutes totals 166, inside the content-spec 130-175 band; no padding detected.',
      'npm run check:no-em-dash exit 0; npm run validate:content exit 0 (' + L + '/).',
      'Advisories: A-13 ("Immediacy" at topic-04.mdx:68 and :76-82 has no glossary entry; style-guide.md:117-118 requires one for graduate-level jargon; the inline apposition gloss is adequate for comprehension) and A-04 (fig-U3-9\'s caption count "three" fits no counting of the timeline) remain the only readability defects; neither impedes prose comprehension.'
    ]
  },
  {
    id: 'pedagogy',
    status: 'fail',
    evidence: [
      'FAIL - blocking finding B-01 has direct pedagogical consequence. The opening figure of Topic 3.4 is the worst affected (five superposed cell/caption line pairs), and the illegible regions are the ones the assessment keys on: fig-U3-7 row 4 versus MCQ 8, fig-U3-3\'s overdone column versus RRQ 4, fig-U3-5\'s link labels versus RRQ 5, fig-U3-9\'s additions-not-replacements caution versus MCQ 10 and RRQ 10. The prose carries the full distinctions, so this is a presentation-driven failure of the figure layer rather than of the written pedagogy, but the figure layer is part of the taught design (>= 2 figure carriers per topic, Constitution Art. III.10) and cannot be waived.',
      'The nine-part cycle is intact in all five topic files, verified by reading: A real classroom situation, Explanation, Activity, Check your understanding, Summary, Self-assessment checklist, Try this at your practicum school, Summative task, Further reading, in that order.',
      'Progression carries load: each vignette (Mr Junaid and Miss Shazia; Ayesha and Bushra; Hina\'s father at the gate; Mr Tariq\'s Class 7; Mr Imran\'s Class 8 science) is returned to inside the explanation and re-used in the summative task.',
      'All five content-spec misconceptions (content-spec.md:510-513) are named and corrected in the owning topic, and unit-teacher-notes.mdx:32-59 gives each a handling strategy, including the caution against settling for the 93% replacement claim (:56-59).',
      'Activities are feasible in the stated Pakistani/Sindhi context: groups of 3-5, 25-30 minutes, no materials beyond board and exercise books, each with stated grouping, output and debrief. The known failure mode of the Topic 3.4 delivery activity has its intervention (write the instruction on the board and require it verbatim, unit-teacher-notes.mdx:77-85).',
      'Practicum transfer tasks are realistic for a trainee with no authority, and the two real risks (tasks reading as evaluation of the host mentor; the 3.1 appraisal enquiry surfacing uncomfortable findings) are flagged with framing at unit-teacher-notes.mdx:61-75.',
      'Conceptual depth beyond listing: topic-02 distinguishes a trait\'s excess from its inversion and changes the remedy accordingly; topic-05 argues the researcher role is the load-bearing one. Carried advisories A-02 (fig-U3-3 resilience cell diverges from the prose and the RRQ 4 scheme) and A-03 (fig-U3-5 link labels give instances where prose and RRQ 5 require purposes) remain live.'
    ]
  }
];

const findings = [
  {
    severity: 'blocking',
    resolved: false,
    message: 'B-01 (NEW, accessibility and pedagogy). The b8f8ffe "SVG re-optimisation pass" (2026-09-21, after run-007) re-wrapped long text lines into tspan blocks but positioned consecutive text elements at overlapping baselines, so distinct strings print on top of each other. 9 of the unit\'s 10 figures are affected in both committed variants; only fig-U3-10 is clean. LOCATORS (full superpositions, light and dark identical): fig-U3-7.svg - "definitions," over "instructions," (both baseline 114, x=250), "words" over "the pupil does not" (baseline 174, x=250), "read" over "without you deciding" (baseline 174, x=550), "held, and not established as a" over "Saying \'take your time\' while" (baseline 292, x~540), "finding by the studies cited here." over "glancing at the clock teaches only" (baseline 312, x~540); fig-U3-2.svg - bottom caption "Effectiveness is a bundle of processes, not a single trait." superposed on "Each leaf names how it is evidenced..." and "Taylor and Thion (2023): many papers use inaccurate or merely..." (baselines 307/327/347/367, x~330-420); fig-U3-5.svg - bottom caption "the relationship is FOR, not with who the person is." superposed on "A relationship that achieves none of these is cordial, not..." (baselines 387/407, x~320-380); fig-U3-6.svg - "checking" over "name a time you will", "head" over "with the reason", "nameable." over "Escalation is an outcome, not a", "failure," over "provided the reason is written"; fig-U3-9.svg - closing caption "A teacher today is still expected... also doing the three that came after." interleaved with "Each station was ADDED..." and "That accumulation, not any single role, is what makes the present expectation heavy." (three caption blocks overprinting). Partial 10-16px collisions additionally affect fig-U3-2 leaf labels, fig-U3-3\'s footnote against the Adaptability row, fig-U3-4\'s legend and caption, fig-U3-7\'s caption blocks and fig-U3-9\'s station labels. PROOF: rendered-DOM geometry in Chromium (logs-feat023-r1/fig-geometry-*.json) and pixel ink-intersection (logs-feat023-r1/ink-collision.log, 8 confirmed collisions up to 1842 shared ink pixels); the rebuilt site serves exactly these bytes (print-inspect.log servedDigests match the manifest). No gate sees this: check:figures reads no glyph geometry and measure-figure-text.mjs checks only viewBox overflow and the wordmark, both exit 0 (measure-figure-text.log). REPAIR: fix the tspan baseline stacking in the 9 affected figures (each wrapped text block\'s second <text> element must start below the previous block\'s last tspan baseline, and the enlarged 16/18/14px font sizes need >= 20-24px leading), or revert unit-03\'s SVGs to the 38d8e7f geometry and re-apply the two content repairs at that geometry; then re-run figures:variants:check, measure-figure-text.mjs and a rendered inspection that measures text-on-text overlap, and update the stale carrier dimensions (see the carrier advisory). The unit\'s provisional tier is revoked, so nothing is live to learners, but any future publication would ship these bytes.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-N1 (NEW, accessibility). All 10 figure carriers in the topic files carry a height exactly 50px below the re-optimised SVG viewBox height, e.g. topic-04.mdx:24 <Figure id="fig-U3-7" ... width="860" height="400"> against viewBox 0 0 860 450; the same 50px staleness holds for all ten (carrier heights 400/460/470/470/470/520/400/490/420/470 against viewBox heights 450/510/520/520/520/570/450/540/470/520). The Figure component passes these as <img width height>, so every figure letterboxes at about 89% scale inside its reserved box rather than filling it. REPAIR: update the carrier width/height to the SVG viewBox values in the same pass as B-01.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-02 (carried from run-007, re-verified in current bytes). fig-U3-3\'s "How it fails when overdone" cell for Resilience reads "Endures what should be reported", while topic-02.mdx:127-129 teaches "Overdone, it becomes stubbornness: persisting with a method for four years because giving it up would feel like defeat." These are different failure modes (tolerating what should be escalated vs refusing to abandon a method), and unit-assessment.mdx RRQ 4 awards a mark for the failure mode with the model answer following the prose. REPAIR: align the fig-U3-3 cell with the prose, or add the second failure mode to both the prose and the RRQ 4 scheme.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-03 (carried from run-007, re-verified in current bytes). fig-U3-5\'s link labels give illustrative instances where the prose and the RRQ 5 mark scheme require purposes: colleagues "so a hard class can be handed over" (prose: "so that practice improves and so that a pupil is not handled inconsistently"), head "so a problem is heard early" (prose: "so that you can get things done that require permission, and so that when you raise something difficult it is heard"), community "so a girl is allowed to keep attending" (prose: "so the school can ask things of it"), parents "so a parent will act" (prose also requires "and so that you learn what you cannot see", topic-03.mdx:55-60). Only the pupils link matches. RRQ 5 is a five-mark recall item scored one per relationship and fig-U3-5 is the opening visual of the topic it examines. REPAIR: bring the labels into line with the prose or widen the RRQ 5 scheme to credit the figure\'s wording.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-04 (carried from run-007, re-verified in current bytes). fig-U3-9\'s closing caption says "A teacher today is still expected to transmit content accurately and still expected to instruct - while also doing the three that came after." No count of three fits: the timeline has four stations (Transmitter, Instructor, Facilitator, "And also, now"), so two stations come after Instructor, the "And also, now" box lists four roles, and the unit teaches five roles overall. REPAIR: state the count the figure shows, or drop the number.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-06 (carried from run-005 via run-007, re-verified). MCQ option-length cue: the key is the longest option by a clear margin on items 5, 6, 7 and 8 of unit-assessment.mdx, and on 6 and 7 it is more than twice the length of every distractor. REPAIR: lengthen the distractors or compress the keys.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-07 (carried from run-005 via run-007, re-verified). Bloom labels overstate demand on two MCQs: unit-assessment.mdx MCQ 4 (empathy at excess) and MCQ 7 ("Does everyone understand?") are labelled (Apply) but each is recall of a sentence stated verbatim in topic-02.mdx:100-102 and topic-04.mdx:57-59 with no new case to transfer to. Of the three Apply-labelled MCQs only item 9 requires application. The content-spec blueprint range "Remember to Apply" is not breached. REPAIR: relabel or re-case the two items.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-08 (carried from run-005 via run-007, re-verified). unit-assessment.mdx:9 blooms_summary says "ERQs at Analyze and Evaluate", but ERQ 4 is labelled (Create) and its rubric row is "Design reasoning (Create)". The content-spec Unit 3 blueprint permits "Analyze to Evaluate/Create", so the item is in scope and it is the front-matter description that is inaccurate. REPAIR: amend blooms_summary to include Create.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-09 (carried from run-005 via run-007, re-verified). Two declared-unretrievable sources are attributed at point of use without an uncorroborated marker, and U3-11\'s grounding is nominal: topic-02.mdx:48-52 attributes a specific list to Hurst and Reding ("punctuality, preparedness, the willingness to be interrupted by a pupil\'s question, follow-through on what was promised") and topic-05.mdx:105-108 attributes a comparative claim to Brookfield ("development that consists of collecting courses is weaker than..."), while coverage/unit-03.md grounds U3-11 (facilitator and researcher) in brookfield2017 although the facilitator/researcher section at topic-05.mdx:42-70 carries no Brookfield citation (his only topic-05 citation is at :105, inside the life-long learner section). ASSESSED UNDER D-2026-0001 AND NOT FAILED: sources/unit-03.md\'s declarations are honest and complete, name the level of support and the exact sub-topic set each key grounds, and volunteer that U3-11 rests on the unread source alone; the attributions are general characterisations of well-known works, not statistics or reported findings. REPAIR options for the owner: reground U3-11 as no-external-source, cite Brookfield in that section once the book is obtainable, or add point-of-use scope notes on the Unit 6 model.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-10 (carried from run-005 via run-007, re-verified). topic-04.mdx:117 and Further reading at :259-262 say "614 university students in Ghana"; the bound record (keelson2024.md:19-28) confirms 614 and the tertiary setting but derives Ghana from the authors\' Takoradi Technical University affiliation rather than a stated study location, and recommends "a technical university in Ghana". Not false; more precise about location than the record supports. REPAIR: adopt the record\'s preferred phrasing if the sentence is revisited.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-11 (carried from run-005 via run-007, re-verified against the bound excerpt). topic-01.mdx:121-123: "Goe and colleagues are explicit that different components are appropriate for different purposes, and that an instrument built for professional development should not be reused for high-stakes appraisal." goe2008.md supports the purpose-before-measure and single-score caution passages verbatim; the reuse direction is a paraphrase of the opposite direction from the one the excerpt states (a value-added score "would be less helpful in providing teachers with guidance on how to improve their performance"), and "explicit" overstates. REPAIR: bind a covering passage or mark the direction as an inference the way topic-01 marks the Taylor and Thion extension.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-12b (carried from run-007, re-verified against the guide PDF re-extracted this run; A-12a is repaired). content-spec.md:445 traces Unit 3 to "guide CLOs 1, 5". The guide PDF\'s own CLO order makes CLO 2, "Identify and exhibit the characteristics and qualities of an effective teacher", the on-point outcome for this unit; CLO 1 ("Define and explain the role and responsibilities of teachers in education") maps only loosely to Topic 3.5\'s roles, and CLO 5 ("Evaluate the impact of teacher effectiveness on student learning outcomes") is on point for 3.1. Imprecise, not contradictory; every guide leaf bullet for 3.1-3.5 is taught. REPAIR: re-trace to CLOs 2 and 5.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-13 (carried from run-005 via run-007, re-verified). "Immediacy" is introduced as a research construct at topic-04.mdx:68 and :76-82 and glossed inline by apposition rather than by a glossary entry; style-guide.md:117-118 requires a bilingual glossary entry for graduate-level jargon, and the entry would also serve the Urdu pass. REPAIR: add the entry when the glossary is next versioned.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-15 (carried from run-005 via run-007, not re-derived this run). Three limits in scripts/lib/unit-depth.mjs checkSourceScopeAgreement recorded at run-007: an empty claimed-ID set short-circuits the loop, no-external-source rows are skipped entirely, and the check is set equality on IDs that never verifies the prose section for a grounded sub-topic actually cites the key (which is why A-09 survives a passing gate). The gate passed at exit 0 this run (check-depth-gate.log). Owner tooling item.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-05 (carried from run-007, scoped). The review-ref/ untracked git-ignored full-repository snapshot that run-007 recorded as a review hazard does not exist in this worktree, so it cannot have influenced this attempt; the main-checkout cleanup remains an owner action from run-007. Recorded so the item is not lost.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'A-N3 (NEW, low). render-inspect flags bare-URL link text on the Further reading lists of topic-01, topic-03, topic-04 and topic-05 (DOI and ERIC links). Bare URLs are conventional in citation lists, and the G3 rubric asks for descriptive links; descriptive text (for example "Goe, Bell and Little 2008 (PDF)") would serve screen-reader users better. Low priority; no repair required for correctness.'
  },
  {
    severity: 'blocking',
    resolved: true,
    message: 'run-007 B-01 (fig-U3-7 asserted "Furlich (2016), N=77") REPAIRED at 38d8e7f and verified in current bytes: the caption now reads "Furlich (2016): the verbal measure was significant, the non-verbal one was not. Sample size and setting are unstated in the abstract -", which the bound verbatim abstract supports exactly, and no N=77 remains anywhere in the unit directory, the figure directory or the course specs tree outside the excerpt\'s own scope note and historical review records. Resolved.'
  },
  {
    severity: 'blocking',
    resolved: true,
    message: 'run-007 B-02 (fig-U3-7 row 4 stated "The class believes the non-verbal channel." flat, contradicting the topic and MCQ 8) REPAIRED IN CONTENT at 38d8e7f and verified in current bytes: the row now reads "The class tends to believe the non-verbal channel." with the sub-line "A practitioner\'s heuristic: widely held, and not established as a finding by the studies cited here.", so figure, prose (topic-04.mdx:131-140), unit summary (unit-assessment.mdx:44-46) and the MCQ 8 key now agree. Resolved as a content repair; note that these exact lines are among those overprinted by this run\'s new blocking finding B-01, so legibility waits on that repair.'
  },
  {
    severity: 'advisory',
    resolved: true,
    message: 'run-007 A-01 (fig-U3-6 "Escalated to the head" box overprinted the wordmark by 74.3 x 10.4 px) REPAIRED as a side effect of the b8f8ffe re-optimisation: rendered-DOM measurement over all 20 committed SVGs finds no text and no painted shape intersecting the wordmark in any figure (fig-geometry-*.json, wmText=0 and wmShape=0 throughout). Resolved.'
  },
  {
    severity: 'advisory',
    resolved: true,
    message: 'run-007 A-12a (content-spec checklist self-described as "One row per leaf bullet" although guide 3.5 yields three rows) REPAIRED in current bytes: content-spec.md:462-466 now says rows "derive from course-guide sections 3.1-3.5" and that a bullet naming more than one thing yields "a decomposition rather than a transcription", which is accurate. Resolved.'
  },
  {
    severity: 'uncertain',
    resolved: true,
    message: 'run-007 A-16 (repair-cycle allowance exhausted; re-review reserved to the owner under D-2026-0005) is superseded by events, not re-litigated: the owner commissioned feature 023 (specs/023-author-efmp-302/, branch 023-author-efmp-302), and this attempt is the first G3 cycle of that new submission against a freshly prepared manifest binding current bytes. The repair cycle this run\'s blocking finding requires would be the submission\'s first, within the skill\'s two-cycle allowance. The tracker row for Unit 3 G3 remains unset and this report does not change it. Resolved as process context; the content history (this is the 8th G3 cycle on this unit overall) is recorded for the owner\'s improvement loop.'
  }
];

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: L + '/validate-content.log' },
  { name: 'check:depth-gate', exit_code: 0, log_path: L + '/check-depth-gate.log' },
  { name: 'check:figures', exit_code: 0, log_path: L + '/check-figures.log' },
  { name: 'check:no-em-dash', exit_code: 0, log_path: L + '/check-no-em-dash.log' },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: L + '/check-no-answer-keys.log' },
  { name: 'check:docs-sync', exit_code: 0, log_path: L + '/check-docs-sync.log' },
  { name: 'measure-figure-text', exit_code: 0, log_path: L + '/measure-figure-text.log' },
  { name: 'site-build', exit_code: 0, log_path: L + '/site-build.log' },
  { name: 'render-review', exit_code: 0, log_path: L + '/render-review.log' },
  { name: 'page-inspect', exit_code: 0, log_path: L + '/page-inspect.log' },
  { name: 'print-inspect', exit_code: 0, log_path: L + '/print-inspect.log' },
  { name: 'fig-geometry-1-5', exit_code: 0, log_path: L + '/fig-geometry-1-5.json' },
  { name: 'fig-geometry-6-10', exit_code: 0, log_path: L + '/fig-geometry-6-10.json' },
  { name: 'fig-geometry-U3-7', exit_code: 0, log_path: L + '/fig-geometry-U3-7.json' },
  { name: 'ink-collision-proofs', exit_code: 0, log_path: L + '/ink-collision.log' }
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 3,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:53caf73',
  reviewer_run_id: 'agent-g3-efmp302-u3-feat023-r1',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T13:35:10Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings: {
    'D-2026-0001': rulingDigest(root, 'D-2026-0001'),
    'D-2026-0005': rulingDigest(root, 'D-2026-0005')
  },
  criteria,
  findings,
  commands,
  evidence_manifest: evidence,
  supersedes: [
    'specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-run001.json',
    'specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-run002.json',
    'specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-run003.json',
    'specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-run004.json',
    'specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-run005.json',
    'specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-run007.json'
  ],
  summary: 'Fresh G3 review of EFMP-302 Unit 3 under feature 023 (attempt r1), binding current bytes at commit 53caf73 against the prepared feat023-r1 manifest (all 111 inputs digest-verified; the manifest recomputes identically). Disposition revise.\n\nThe two run-007 blocking findings are confirmed repaired in content: fig-U3-7 no longer asserts N=77 anywhere, and its row 4 now marks the channel-contradiction claim as a practitioner\'s heuristic in agreement with the prose, the unit summary and MCQ 8. The run-007 wordmark collision and the checklist self-description advisories are also repaired.\n\nA new blocking defect replaces them. The b8f8ffe SVG re-optimisation pass (2026-09-21, after run-007) enlarged every figure\'s fonts and re-wrapped its long lines into tspan blocks, but stacked the wrapped blocks at overlapping baselines. In 9 of the 10 figures, distinct strings now print on top of each other: 18 full superpositions (fig-U3-2 x4, fig-U3-5 x2, fig-U3-6 x4, fig-U3-7 x5, fig-U3-9 x3) plus numerous 10-16px partial collisions. Proof is rendered-DOM geometry in Chromium plus a pixel ink-intersection test (up to 1842 shared ink pixels for one pair), and the rebuilt site serves exactly the committed bytes. No gate sees the defect: check:figures reads no glyph geometry and measure-figure-text.mjs checks only viewBox overflow and the wordmark; both exit 0. The illegible regions are the assessment-critical ones (fig-U3-7 row 4 against MCQ 8, fig-U3-3\'s overdone column against RRQ 4, fig-U3-5\'s link labels against RRQ 5, fig-U3-9\'s caution against MCQ 10), which is why accessibility and pedagogy fail while the prose-level criteria pass. A companion advisory records that all 10 carriers carry height 50px below the new viewBoxes, so every figure also letterboxes.\n\nEverything else held up. The assessment bank was solved blind first: all ten MCQ keys match the independent derivation, the RRQ schemes are point-by-point and sound, and the ERQ rubrics cap undemanding answers correctly. Narrow-360 and A4-print inspection, measured on the scrolling elements themselves per the amended reference, found nothing unreachable and nothing clipped; the defect is inside the SVGs, not the page layout. Authority, sources, coverage and readability pass; eleven advisories carry forward (A-02, A-03, A-04, A-06, A-07, A-08, A-09, A-10, A-11, A-12b, A-13, A-15, A-05 scoped to the main checkout, plus two new low ones).\n\nOne limitation is recorded honestly: this reviewer session could not view raster images directly, so rendered inspection was performed by real-browser DOM geometry measurement and pixel-level ink intersection over the actual built and served pages, with screenshots and crops saved as evidence for human verification. This is stronger than eyeballing for overlap detection but a human should still look at the crops.\n\nNothing here is a sign-off. The report is unsigned and advisory: no reviewer is registered or qualified in specs/reviewers/registry.json, no protected signing host exists, and this reviewer edited no content, gate, rubric, registry or tracker row. The tracker row for Unit 3 G3 remains unset; recording the outcome is the parent\'s and owner\'s action.'
};

writeFileSync('specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-feat023-r1.json', JSON.stringify(report, null, 2) + '\n');
console.log('report written; evidence files:', Object.keys(evidence).length);
