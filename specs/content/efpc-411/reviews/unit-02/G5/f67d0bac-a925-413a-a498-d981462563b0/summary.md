# EFPC-411 Unit 2 - G5 Urdu review summary

**Disposition: revise.** Reviewer `agent:claude_crew`, session `f67d0bac-a925-413a-a498-d981462563b0`,
2026-11-28. Advisory only: this report does not certify the unit, tick G5, or set
`translation_status`.

The Urdu mirror is structurally complete and generally faithful: all six files mirror their
English counterparts in headings, figures, tables and assessment counts; the 30 `key_terms` match
`terminology.csv`; the alt text and `<desc>` of all eight schematic figures are identical; the
MCQ keys, RRQ mark splits and ERQ rubrics correspond item for item; and the rendered Urdu pages
are legible, overflow-free, keyboard-scrollable and print-clean.

Five blocking semantic defects prevent a pass:

1. **"period" -> "hour"** in at least eight places (topic-01:28, 60, 83, 112; unit-assessment:47;
   fig-U2-1.ur.svg; fig-U2-2.ur.svg twice), while the same unit correctly uses "پیریڈ" elsewhere.
   This changes a quantity/unit and makes the unit inconsistent.
2. **"marked a short quiz on the board" -> "حل کروایا"** ("had a quiz solved") in topic-03:28.
3. **"managing complexity in the classroom" -> "کلاس روم کے انتظامی عمل کی بنیادی ذمہ داریاں"** in
   topic-01:56, dropping the source-supported framing.
4. **"the exclusion" -> "تفریق"** ("distinction") in the topic-04 mini-rubric.
5. **Teach Primary "stated, acknowledged and redirected" -> "واضح کرے"** in topic-01:66, omitting
   two practices.

Advisory items cover "صیغہ راز" for "confidential" (index:115), two different renderings of
"feedback conversation", a few flattened examples, and concept-graph labels that drift from the
prose. The render-inspect wordmark flags (16) are false positives of a one-sided test; the
symmetric `measure-figure-text.mjs` check exits 0.

Uncertain: no signed G3 report exists for the exact English inputs (the human CMY record is
outside the report schema and the agent G3 report is unsigned), and the translator's agy run id
was not supplied. See `findings.md` for paired locators and repair requests.
