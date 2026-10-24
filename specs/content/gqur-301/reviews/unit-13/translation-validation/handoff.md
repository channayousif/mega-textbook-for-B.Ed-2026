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

## Re-check 2026-10-24 (crew job gqur-301-u13-translate-r1, claude)

Baseline: d064fe72144f24a544de194cda53f8632ffc98d2 (origin/main at task start; no
earlier branch commits). English Unit 13 has not changed since the blocker above
apart from figure placement (ecda0868, 153d343f). All three confirmed defects are
still present, so translation was again not started:

- unit-assessment.mdx:123 (RRQ8 same-data premise) with guidance at line 190.
- topic-02.mdx:121-124 (near-zero r implies near-zero slope).
- topic-02.mdx:80 ("Interpolation is generally reliable", unqualified).

New observation for the English author, not in the G3 report: topic-02.mdx:123
writes the mean as "ȷ" (U+0237, dotless j), apparently a mangled y-bar.

No Urdu MDX, SVG, key_terms or terminology proposal was written; the G4 row is
unchanged; translation_status remains draft. Resume only after a separate English
repair of G3 F1-F5 lands on main.
