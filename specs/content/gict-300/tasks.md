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
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-01/G2/20261006T182137515Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | advisory run 001 (disposition: revise) at reviews/unit-01/G3/agent-g3-gict300-u1-run001.json; blocking findings F1/F2 repaired at 140dd8a, advisory F3/F4 repaired, F5 (bare URLs) left; agent reviews are advisory under ADR-0019 |
| Unit 1 | G4 ur-translation | ▢ | | |
| Unit 1 | G5 ur-review | ▢ | | advisory run 001 (disposition: escalate; F1 stale G3 dependency needs run002, F2-F4 Urdu defects repaired) at reviews/unit-01/G5/agent-g5-gict300-u1-run001.json; agent reviews advisory under ADR-0019 |
| Unit 1 | G6 assets | ▢ | | |
| Unit 1 | G7 publish | ▢ | | |
| Unit 2 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0030; content-spec status: approved |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-02/G2/20261006T182141314Z-gates.json |
| Unit 2 | G3 en-review | ▢ | | advisory run 001 (disposition: pass, no blocking findings) at reviews/unit-02/G3/agent-g3-gict300-u2-run001.json; agent reviews advisory under ADR-0019 |
| Unit 2 | G4 ur-translation | ▢ | | |
| Unit 2 | G5 ur-review | ▢ | | advisory run 001 (disposition: revise; F1-F3 figure-label defects repaired) at reviews/unit-02/G5/agent-g5-gict300-u2-run001.json; agent reviews advisory under ADR-0019 |
| Unit 2 | G6 assets | ▢ | | |
| Unit 2 | G7 publish | ▢ | | |
| Unit 3 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0030; content-spec status: approved |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-03/G2/20261006T182144769Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | advisory run 001 (disposition: revise; blocking F1 sources-chain, F2 render unverified under capacity directive) at reviews/unit-03/G3/agent-g3-gict300-u3-run001.json; F1 repair in progress; agent reviews advisory under ADR-0019 |
| Unit 3 | G4 ur-translation | ▢ | | |
| Unit 3 | G5 ur-review | ▢ | | advisory run 001 (disposition: revise; F1 stale G3 dependency, F2-F5 Urdu defects repaired) at reviews/unit-03/G5/agent-g5-gict300-u3-run001.json; agent reviews advisory under ADR-0019 |
| Unit 3 | G6 assets | ▢ | | |
| Unit 3 | G7 publish | ▢ | | |
| Unit 4 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0030; content-spec status: approved |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-04/G2/20261006T182148824Z-gates.json |
| Unit 4 | G3 en-review | ▢ | | run 001 (disposition: revise; 5 blocking findings repaired at a7200d2) at reviews/unit-04/G3/agent-g3-gict300-u4-run001.json; run 002 (disposition: revise; B1 password miscount + B2 preamble repaired at aa2e7d0) at reviews/unit-04/G3/agent-g3-gict300-u4-run002.json; agent reviews advisory under ADR-0019 |
| Unit 4 | G4 ur-translation | ▢ | | |
| Unit 4 | G5 ur-review | ▢ | | advisory run 001 (disposition: escalate; F1 stale G3 dependency, F2-F7 Urdu defects repaired) at reviews/unit-04/G5/agent-g5-gict300-u4-run001.json; agent reviews advisory under ADR-0019 |
| Unit 4 | G6 assets | ▢ | | |
| Unit 4 | G7 publish | ▢ | | |
| Unit 5 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0030; content-spec status: approved |
| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-05/G2/20261006T182152572Z-gates.json |
| Unit 5 | G3 en-review | ▢ | | advisory run 001 (disposition: pass; advisory F1-F8) at reviews/unit-05/G3/agent-g3-gict300-u5-run001.json; agent reviews advisory under ADR-0019 |
| Unit 5 | G4 ur-translation | ▢ | | |
| Unit 5 | G5 ur-review | ▢ | | advisory run 001 (disposition: revise; F1 ERQ-2 Urdu tag repaired) at reviews/unit-05/G5/agent-g5-gict300-u5-run001.json; agent reviews advisory under ADR-0019 |
| Unit 5 | G6 assets | ▢ | | |
| Unit 5 | G7 publish | ▢ | | |
| Unit 6 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0030; content-spec status: approved |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gict-300/reviews/unit-06/G2/20261006T182157046Z-gates.json |
| Unit 6 | G3 en-review | ▢ | | advisory run 001 (disposition: pass, no blocking findings) at reviews/unit-06/G3/agent-g3-gict300-u6-20260923T171945671Z.json; agent reviews advisory under ADR-0019 |
| Unit 6 | G4 ur-translation | ▢ | | |
| Unit 6 | G5 ur-review | ▢ | | advisory run 001 (disposition: revise; F1-F2 figure labels repaired) at reviews/unit-06/G5/agent-g5-gict300-u6-run001.json; agent reviews advisory under ADR-0019 |
| Unit 6 | G6 assets | ▢ | | |
| Unit 6 | G7 publish | ▢ | | |
