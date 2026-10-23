# Unit 13 translation prerequisite blocker

Baseline: 05b4e3c0f7535953a6f2c319a7599bd868cc93a7, identical to origin/main at task start.
The branch had no earlier local commits or uncommitted changes.

Translation was not started. The translate-unit skill explicitly says to stop if
English is wrong and forbids repairing English within translation. The existing
independent advisory G3 escalation remains applicable: reviews/unit-13/G3/crew-20261023.md
and its JSON report.

Confirmed unresolved source defects:

- unit-assessment.mdx:123 describes two scatter plots from the same data with
  different clustering and asks which has larger absolute correlation. Its RRQ8
  guidance at line 190 chooses Plot A, contradicting the same-data premise.
- topic-02.mdx:121-124 claims near-zero correlation implies near-zero
  unstandardised slope. Slope also depends on the ratio of variable scales.
- topic-02.mdx:81 calls interpolation generally reliable without the
  qualifications requested by the independent report.

The report also identifies missing figures, confidence/assessment defects and
unresolved G1, source/provenance and render evidence. A separate English author
owns F1-F5 repairs; the curriculum owner/evaluator owns unresolved G1 and
provenance questions. Resume translation from settled repaired English bytes.
Do not silently correct these claims only in Urdu.

No Urdu MDX or SVG was authored and no terminology was proposed or banked.
The existing G4 row records the blocker without a completion claim or new row.
G3/G5 remain open; translation_status remains draft. Build, server, Playwright
and rendered inspection were not run, as prohibited by the brief.

The baseline content check passed 12 gates and failed only check:content-status
because generated static/content-status.json was stale. HEAD equalled origin/main,
with no changed authored content or gate inputs, so this measures main too.
Refreshed derived metadata with build:content-status (not a site build) before
rerunning the full content suite. Logs accompany this handoff.

After metadata refresh all 13 content gates passed. Restored the tracked generated
static/content-status.json afterward to keep this commit within Unit 13 scope.
The restored file has the same baseline staleness as origin/main; no new content
finding was introduced.
