# GQUR-300 Unit 5 translation handoff

Continuation verification on 2026-10-18, from branch commit 8330b2b6. The earlier
translate attempt (branch crew/gqur-300-u05-translate) completed the Urdu mirror and
merged it to main in 7441bece, with G5 repairs applied at 5bcd8fbe and a final pass
fixing MCQ option letters, Mode term and figure alt parity at 16aaa278. That attempt
left the G4 tracker row at ▢ per the translate-unit skill's instruction not to claim
completion. This job verifies the merged mirror and records the G4 row.

## Bundle

The mirror contains index.mdx, topic-01.mdx, topic-02.mdx, topic-03.mdx,
unit-assessment.mdx and unit-teacher-notes.mdx. File sets, heading-level vectors,
component counts (Figure, Glossary, PrintHandout), figure IDs and Urdu SVG paths
were compared with English for every file. All six Urdu SVGs exist; generated dark
variants pass figures:variants:check. Both index files remain
translation_status: draft. No G3/G5 certification or publication claim is made.

## Structural parity

All six files match the English on heading count, heading-level vector, file count,
and component counts. Figure IDs are preserved; every English `<Figure src="...svg">`
carries a matching `<Figure src="...ur.svg">` in the Urdu file. The temporary
reviewed-flip test fires the parity gates explicitly: validate:content and
check:figures pass, and the only pipeline findings are the 11 unbanked terms and the
G4/G5 tracker rows themselves. Both index flags were reverted to draft after the
test.

## Not run

A build, development server and rendered inspection were not run: the crew brief
explicitly prohibits builds and dev servers. Independent G5 still needs actual
Urdu desktop, narrow-width and A4 evidence. Structural checks do not certify semantic
equivalence.

## Proposed terms for curriculum owner

All eleven index key_terms remain absent from the frozen terminology bank:

| English | Existing Urdu proposal |
|---|---|
| Bar chart | بار چارٹ |
| Data | معطیات |
| Frequency table | تعدد جدول |
| Line graph | لکیر گراف |
| Mean | حسابی اوسط |
| Measures of central tendency | مراکزی رجحان کے پیمانے |
| Median | درمیانی قدر |
| Mode | موڈ |
| Pictograph | تصویری جدول |
| Pie chart | پائی چارٹ |
| Tally | گنتی |

The Mode rendering موڈ also appears in the prose and Glossary of every topic, while
the concept graph (specs/content/gqur-300/concepts/unit-05.md) separately uses عاد
for the same concept. The translator must not silently edit the frozen bank to
resolve this; it is an owner ruling.

## Next owner

Curriculum owner banks the eleven statistics terms (or rules on the Mode/عاد
discrepancy) and resolves the G3 dependency. A fresh independent G5 reviewer
compares every passage, assessment item and figure and obtains rendered evidence.
No reviewer initials or review-completion marks were supplied here.

## Retry validation, 2026-10-18

Codex continued from 5bd81ad2 without changing the translated bundle or tracker
status. The previous missing `static/content-status.json` finding was an absent
gitignored generated artifact. Running `npm run build:content-status` regenerated
it successfully; do this again in a fresh checkout before running content gates.
The artifact remains generated and is not committed.

`npm run check:content` now passes all 13 gates, with no findings. The captured
output is `retry-content-gates.log` beside this handoff. A fresh source comparison
confirmed all six file names, heading vectors and component counts match, all
referenced Urdu figure files exist, and both index statuses remain `draft`.
`npm run figures:variants:check` also passes. The earlier temporary reviewed-flip
results above remain applicable because this continuation changed no unit inputs.
Builds and rendered inspection remain prohibited by the brief and pending for G5.
