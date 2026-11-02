# Unit 3 translation dependency hold

English baseline: `5be22ec44218b86f2771eabeee55fd88e3e3e974` (also origin/main at inspection).
No earlier branch commits or uncommitted changes existed when this job began.

Translation was not started. The mandatory translate-unit skill explicitly says to stop
when the English is wrong rather than repair it in translation. The existing advisory G3
report has disposition `escalate`, and its flagged passages remain in the current baseline:

- `docs/semester-3/efmp-406/unit-03/topic-02.mdx:135` retains categorical cognitive,
  dropout and transfer claims without the supporting evidence requested by the reviewer.
- `docs/semester-3/efmp-406/unit-03/topic-02.mdx:169` retains the claims of eliminating
  fear and dramatically improving comprehension identified in that review.
- `docs/semester-3/efmp-406/unit-03/unit-assessment.mdx:97` labels a definition-recognition
  MCQ Apply, and item 4 at line 133 still requires defending a predetermined superior model.

These are inherited findings, not a new independent review or certification. Full repair
instructions are in `specs/content/efmp-406/reviews/unit-03/G3/01a19c22-e969-7f80-81b7-f2e304f416df.summary.md`
and its linked source-support and assessment-review notes.

Next owner: a separate author must repair English/source support and obtain fresh G2
evidence; the crew lead then reschedules translation against that frozen baseline and
independent review. Existing G3 and G5 remain open and unsigned. No tracker row was appended:
translate-unit Step 7 expressly prohibits adding G4 rows. No translation status was changed;
`draft` remains in place. No terms were proposed because no translation was attempted.

Validation: all 13 `npm run check:content` gates passed. The initial checkout exactly matched
origin/main, so this also establishes the baseline result. The accompanying log records the
actual run. No build, dev server, browser or print inspection was run, as prohibited by the
crew brief. This is a blocked handoff, not delivery of G4 or a complete Urdu mirror.
