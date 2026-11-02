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

## Continuation: evidence-location repair

The continuation verified that origin/main is still the English baseline named above and
that the cited categorical claims remain unchanged. Translation remains blocked by the
translate-unit stop-on-English-errors instruction. No G4 row is added: despite the brief's
request to record one, its required skill expressly prohibits doing so at Step 7.

The earlier translation hold and log were moved from `translations/unit-03/` into
`reviews/unit-03/translation-hold/`. They are lifecycle evidence, not learner content.
The former location added two tracked inputs to G2 and invalidated its manifest. The
review-evidence contract excludes `reviews/` specifically to prevent recording results
from invalidating their inputs. After relocation, the original G2 input manifest matches
exactly, with no content edits, evidence regeneration or changes to gate policy.

The historical PHR retains its original paths as a record of that earlier attempt.
Current validation is recorded in `check-content-continuation.txt` beside this handoff.
Build and rendered Urdu inspection remain prohibited by the crew brief.
