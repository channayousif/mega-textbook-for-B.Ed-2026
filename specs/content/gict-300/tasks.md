# GICT-300 - Task Tracker

Legend (3-value status enum): `▢` not-started · `▣` in-progress · `✅` done (requires
evidence). One row per unit per stage (`G1`-`G7`).

**Intake (2026-09-23):** the content-spec passed G0/G1 intake evaluation under **D-2026-0030**
(agent:evaluator, pending-owner-review; all 54 manifest digests verified at commit 73001c11).
The derived 16-week calendar is escalated as **G-2026-25** (open) and blocks only the
`## Week schedule` table and the per-unit "Weeks N-M (derived)" lines, not authoring. Repair
items (a) blueprint bullet format and (b) depth-budget recalibration were applied at 708d85c
before any unit was authored. The course is bilingual: G4/G5 are in scope for every unit.

**G2 evidence scoping note (all units):** `prepare-gate-evidence` runs its eight draft gates
repo-wide, and this branch's base (origin/main 39c9a95) carries pre-existing red gates from
the stale geng-300 tree (already fixed on the unmerged sibling branch 018-author-geng300, out
of this course's scope). Each unit's G2 gates were therefore run through a CONTENT_ROOT
overlay tree at the unit's commit plus the sibling branch's geng-300 fixes; all eight gates
pass for GICT-300's own bytes, and each evidence file's input manifest binds this course's
files at that commit. The geng-300 reds are recorded as known-stale-on-main in the PR.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 1 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0030; content-spec status: approved |
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-01/G2/20261013T123436400Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | advisory run 001 (disposition: revise) at reviews/unit-01/G3/agent-g3-gict300-u1-run001.json; blocking findings F1/F2 repaired at 140dd8a, advisory F3/F4 repaired, F5 (bare URLs) left; agent reviews are advisory under ADR-0019 |
| Unit 1 | G4 ur-translation | ▣ | | Complete 7-file UR mirror reconciled with EN baseline ee13c3e2 on 2026-10-18 (crew gict-300-u01-translate-r1); semantic, register, and figure-label repairs; bank-conformant key_terms; handoff: reviews/unit-01/G4/translation-handoff.md; translation_status stays draft pending fresh independent G5; no certification claimed. |
| Unit 1 | G5 ur-review | ▢ | | advisory run 001 (disposition: escalate; F1 stale G3 dependency needs run002, F2-F4 Urdu defects repaired) at reviews/unit-01/G5/agent-g5-gict300-u1-run001.json; agent reviews advisory under ADR-0019 |
| Unit 1 | G6 assets | ▢ | | |
| Unit 1 | G7 publish | ▢ | | |
| Unit 2 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0030; content-spec status: approved |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-02/G2/20261013T123447966Z-gates.json |
| Unit 2 | G3 en-review | ▢ | | advisory run 001 (disposition: pass, no blocking findings) at reviews/unit-02/G3/agent-g3-gict300-u2-run001.json; agent reviews advisory under ADR-0019 |
| Unit 2 | G4 ur-translation | ▣ | | Complete seven-file mirror reconciled with EN 37fcef38 on 2026-10-18 (Codex crew gict-300-u02-translate-r1); register, citation, assessment and eight Urdu figure-pair repairs; bank-conformant key_terms, computing terms proposed separately; handoff: reviews/unit-02/G4/translation-handoff.md. translation_status stays draft pending fresh independent G5 and rendered inspection; no certification claimed. |
| Unit 2 | G5 ur-review | ▢ | | advisory run 001 (disposition: revise; F1-F3 figure-label defects repaired) at reviews/unit-02/G5/agent-g5-gict300-u2-run001.json; agent reviews advisory under ADR-0019 |
| Unit 2 | G6 assets | ▢ | | |
| Unit 2 | G7 publish | ▢ | | |
| Unit 3 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0030; content-spec status: approved |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-03/G2/20261013T123502518Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | advisory run 001 (disposition: revise; blocking F1 sources-chain, F2 render unverified under capacity directive) at reviews/unit-03/G3/agent-g3-gict300-u3-run001.json; F1 repair in progress; agent reviews advisory under ADR-0019 |
| Unit 3 | G3 en-review | ▢ | | advisory: revise; repairs applied for report reviews/unit-03/G3/agent-g3-gict300-u3-run002.json (crew gict-300-u03-repair_en, 2026-10-19): F5 verbatim ch 39 sentence and F6 metadata excerpt confirmed present (b3b0eabc), F6 deletion account now disclosed title-level under shellyVermaat; F3 MCQ keys rebalanced to a3/b2/c2/d3 (EN+UR); F4 ERQ-01..04 given new scenarios distinct from the topic Summative tasks (EN+UR); F7/F8 confirmed fixed (b3b0eabc); F10 descriptive link text on all four topics (EN+UR); F9 (year-less ostep key outside the ADR-0027 digest binding) left as an owner decision, since renaming the key touches the approved content-spec. ADR-0019 two-cycle G3 budget is exhausted: a run 003 needs owner authorisation in specs/decisions/log.md; agent reviews advisory under ADR-0019 |
| Unit 3 | G4 ur-translation | ▣ | | Complete 7-file UR mirror reconciled with unchanged EN baseline 7cdacb45 on 2026-10-18 (crew gict-300-u03-translate-r1); continuation repairs disk-reading, payroll, double-click and rubric clarity wording; structural/component/assessment parity and bank-conformant key_terms checked; handoff: reviews/unit-03/G4/translation-handoff.md. translation_status stays draft pending accepted G3 and fresh independent G5 with rendered inspection; no certification claimed. |
| Unit 3 | G5 ur-review | ▢ | | advisory run 001 (disposition: revise; F1 stale G3 dependency, F2-F5 Urdu defects repaired) at reviews/unit-03/G5/agent-g5-gict300-u3-run001.json; agent reviews advisory under ADR-0019 |
| Unit 3 | G6 assets | ▢ | | |
| Unit 3 | G7 publish | ▢ | | |
| Unit 4 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0030; content-spec status: approved |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-04/G2/20261013T123512662Z-gates.json |
| Unit 4 | G3 en-review | ▢ | | run 001 (disposition: revise; 5 blocking findings repaired at a7200d2) at reviews/unit-04/G3/agent-g3-gict300-u4-run001.json; run 002 (disposition: revise; B1 password miscount + B2 preamble repaired at aa2e7d0) at reviews/unit-04/G3/agent-g3-gict300-u4-run002.json; agent reviews advisory under ADR-0019 |
| Unit 4 | G4 ur-translation | ▣ | | Complete 7-file UR mirror reconciled with EN baseline ef87f8f4 on 2026-10-18 (crew gict-300-u04-translate-r1); semantic, register, and figure repairs; bank-conformant key_terms; 15 computing concepts proposed separately; handoff: reviews/unit-04/G4/translation-handoff.md; translation_status stays draft pending fresh independent G5; no certification claimed. |
| Unit 4 | G5 ur-review | ▢ | | advisory run 001 (disposition: escalate; F1 stale G3 dependency, F2-F7 Urdu defects repaired) at reviews/unit-04/G5/agent-g5-gict300-u4-run001.json; agent reviews advisory under ADR-0019 |
| Unit 4 | G6 assets | ▢ | | |
| Unit 4 | G7 publish | ▢ | | |
| Unit 5 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0030; content-spec status: approved |
| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-05/G2/20261013T123518696Z-gates.json |
| Unit 5 | G3 en-review | ▢ | | advisory run 001 (disposition: pass; advisory F1-F8) at reviews/unit-05/G3/agent-g3-gict300-u5-run001.json; agent reviews advisory under ADR-0019 |
| Unit 5 | G4 ur-translation | ▢ | | |
| Unit 5 | G5 ur-review | ▢ | | advisory run 001 (disposition: revise; F1 ERQ-2 Urdu tag repaired) at reviews/unit-05/G5/agent-g5-gict300-u5-run001.json; agent reviews advisory under ADR-0019 |
| Unit 5 | G6 assets | ▢ | | |
| Unit 5 | G7 publish | ▢ | | |
| Unit 6 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0030; content-spec status: approved |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-06/G2/20261013T123522536Z-gates.json |
| Unit 6 | G3 en-review | ▢ | | advisory run 001 (disposition: pass, no blocking findings) at reviews/unit-06/G3/agent-g3-gict300-u6-20260923T171945671Z.json; agent reviews advisory under ADR-0019 |
| Unit 6 | G4 ur-translation | ▣ | | Complete 7-file UR mirror reconciled with EN baseline 34f207fb on 2026-10-18 (crew gict-300-u06-translate-r1); semantic, register, and figure-label repairs; bank-conformant key_terms (Assessment, Self-Assessment, Rubric), 15 unbanked concept labels proposed separately; handoff: reviews/unit-06/G4/translation-handoff.md; translation_status stays draft pending fresh independent G5; no certification claimed. |
| Unit 6 | G5 ur-review | ▢ | | advisory run 001 (disposition: revise; F1-F2 figure labels repaired) at reviews/unit-06/G5/agent-g5-gict300-u6-run001.json; agent reviews advisory under ADR-0019 |
| Unit 6 | G6 assets | ▢ | | |
| Unit 6 | G7 publish | ▢ | | |
