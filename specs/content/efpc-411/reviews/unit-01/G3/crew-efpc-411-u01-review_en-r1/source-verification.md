# EFPC-411 Unit 1 - source verification (G3)

Reviewer: agent:claude-crew, 2026-11-27. The four works cited by `sources/unit-01.md` were
retrieved from their stated URLs on 2026-11-27 (all HTTP 200) and read as text. The bound note
`specs/content/efpc-411/sources/texts/teach-primary-2021.md` was checked against the PDF; the
HEC notes are not manifest-bound (the prepare key regex captures `hec-2013`), so the HEC claims
were checked against the retrieved PDFs themselves.

Retrieved copies (scratch, not committed): `.crew/efpc-411-u01-review/{hec-2013-practicum,hec-2013-methods,hec-2013-currdev,teach-primary-2021}.{pdf,txt}`.

## Claims supported

- `topic-01.mdx:63` roles of supervisor / cooperating teacher / student-teacher (HEC, 2013):
  the practicum handbook has "Summary of the role of the College/University Practicum
  Supervisor", "Summary of the role of the Cooperating Teacher" and "Summary of the role of the
  Student Teacher" (pp. 18-19). Supported.
- `topic-03.mdx:39` four-stage cycle (HEC, 2013): the handbook names the "Formal Observation
  Cover sheet, Pre-observation Guide, and Post-observation Reflection" and feedback conferences
  (pp. 32-33). Supported as a synthesis.
- `topic-03.mdx:51` high- vs low-inference notes (Molina et al., 2021): the manual's note-taking
  section says "it is important to be as descriptive as possible" and teaches verbatim scripting
  (p. 12); the terms low/high-inference appear in the tool-development discussion (p. 9).
  Supported.
- `topic-02.mdx:56` descriptive rating rubrics (Molina et al., 2021): the manual scores 28
  behaviours on a 5-point scale with Low/Medium/High descriptors. Supported.
- `topic-02.mdx:43` lesson objectives (HEC, 2013): the curriculum guide's Unit 6 covers goals,
  objectives and alignment. Supported.
- `topic-02.mdx:44` teaching strategies (HEC, 2013): the methods guide's Unit 3 covers
  teacher-centred vs student-centred methods and wait-time. Supported.
- `topic-04.mdx:50` developmental evidence-based feedback (Molina et al., 2021): the manual's
  Feedback element and observation-feedback cycle. Supported.

## Claims not supported

- **topic-04.mdx:43** - "In many traditional Pakistani classrooms, teachers lecture for 30 minutes
  of a 35-minute period, leaving only 5 minutes for hurried copying (HEC, 2013)." None of the four
  retrieved works contains this claim. The methods guide's only "30 minutes" passages are about a
  observed lesson lasting 30 minutes, not a 35-minute period with 5 minutes of copying. This is a
  factual generalisation with no source support.
- **topic-03.mdx:66** - the observer-bias paragraph ends "(HEC, 2013)". The practicum handbook
  contains no discussion of observer bias, halo/horns, confirmation, leniency/severity or cultural
  bias. The bound Teach Primary manual does discuss observer bias ("Weighing of Specific Events or
  First Impressions", "Central Tendency", p. 16). The citation is misattributed; the coverage
  matrix itself maps U1-09 to `teach-primary-2021`, not to HEC.
- **topic-01.mdx:39** - the definition of classroom observation is cited "(Higher Education
  Commission [HEC], 2013)". The handbook does not define observation in those terms; it describes
  observation as part of the student-teacher role. The definition is a reasonable author synthesis,
  but the citation is decorative. Advisory.
- **sources/texts/hec-2013-practicum.md** note 4 claims the handbook introduces "descriptive rating
  scales, episodic anecdotal records". The handbook clearly covers checklists ("Student Teaching
  Checklist") and reflective journals, but not rating scales or anecdotal records. The unit's tools
  section is guide-determined (Week 2 lists all four tools), so this is a note-accuracy defect, not
  a prose defect. Advisory.

## Unavailable-source declaration

`sources/unit-01.md` has no `## Unverifiable sources` section. None is needed: all four cited works
were retrieved. The failures above are unsupported claims, not missing text.
