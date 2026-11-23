# GCCE-400 Unit 4 - independent G3 English review, run 1 (advisory)

Disposition: **revise**. Reviewer: agent:claude (fresh crew session, claude-opus-5-5). Author run:
commit 7953d1221 (Unit 4 English authoring). Reviewed HEAD 9502097ff; rendered input deployed SHA
98fbbb064, identical for the unit's English files and figures. Report:
`specs/content/gcce-400/reviews/unit-04/G3/crew-run1-20261124.json`. Advisory only; no signature,
no certification, G3 stays open.

## Criteria

| Criterion | Status | Basis |
|---|---|---|
| authority | pass | All seven content-spec sub-topics U4-01..U4-07 taught under their mapped headings; figure plan and blueprint met |
| sources | pass | Hasan 2006, Retallick 2005, MacQueen 2001, UNESCO 2015, Bala 2013, OECD 2011 and EPA claims checked against bound notes; constitution Arts 16, 19, 25 re-read in current text (unchanged by 26th/27th Amendments); youniss-levine declared and used at title level only |
| coverage | pass | coverage/unit-04.md maps every leaf; check:depth-gate exit 0 |
| assessment | fail | All 10 MCQ keys reproduced independently; RRQ 6 model answer rests on an untaught and contradicted point (F1) |
| accessibility | unverified | Production render: alt text, heading order, 360px table scrolling, A4 print clipping all clean; three lazy SVGs did not load in the inspector though served bytes match HEAD |
| readability | pass | HSC register, terms defined at first use, Sindh examples |
| pedagogy | pass | Full learning cycle in both topics, feasible activities, misconceptions from the spec addressed |

## Findings

- **F1 (blocking).** Topic 4.2, "Approaches to effective community engagement", IAP2 table: the
  Collaborate example "A committee of residents and council staff agrees on the site" presents a joint
  decision, and the topic never states that the agency remains the decision-maker at Involve and
  Collaborate. The bound EPA page says "as at involve, the agency is still the ultimate decision-maker"
  (source-checks/epa-involve-collaborate.md), and the source note claims the topic uses this point.
  RRQ 6's model similarity ("the agency still makes the final decision") therefore marks learners on
  untaught content. Repair: reword the Collaborate example (e.g. residents and staff work out a shared
  recommendation that the council adopts) and add one sentence that at Involve and Collaborate the
  agency still decides; or change the RRQ 6 model similarity.
- **F2 (uncertain).** fig-U4-2, fig-U4-4, fig-U4-5 not confirmed as rendered on screen (lazy images).
- **F3 (advisory).** ERQ 4 rubric "the committee only informs": also accept a token consult, since the
  scenario includes a meeting.
- **F4 (advisory).** MCQ key positions A1/B5/C4/D0; no item keyed D. MCQ 5 tagged Remember but needs
  Understand/Apply.
- **F5 (advisory).** fig-U4-2 (Topic 4.1) repeats the markdown table placed directly beneath it,
  row for row; consider keeping one.
- **F6 (advisory).** Further-reading links are bare URLs (render-inspect advisory); youniss-levine
  Unverifiable declaration lacks an owner-authorisation line.
