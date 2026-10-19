# EFMP-305 Unit 6 Urdu translation handoff

Verification date: 2026-10-19. This continues the existing translation; no prose or figure source was rewritten in this pass.

## Baseline and scope

The existing mirror was checked against the English unit currently on origin/main, last changed by commit `24d5f43d7ef5c547d8edcaece07a9981534d6c84`. This identifies the verification baseline, not a claim that this session originally translated the files.

English root: `docs/semester-2/efmp-305/unit-06/`.
Urdu root resolved through `resolveUnit()`: `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-06/`.

Both contain `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx`.
The topics carry all six figure IDs, using `fig-U6-1.ur.svg` through `fig-U6-6.ur.svg` under `static/img/figures/efmp-305/unit-06/`, with generated dark variants.

## Checks and limitations

- All six file pairs match in required shared front matter, heading level vectors and counts of Figure, Glossary, PrintHandout, BloomTag, ObjectiveList and ActivityCard components.
- Assessment question sections retain the 10 MCQ / 10 restricted-response / 5 extended-response counts. Figure IDs, kinds and dimensions match; each Urdu carrier points to its `.ur.svg` and has Urdu alt text.
- All four declared key terms match the frozen bank: Inclusive Education / شمولیتی تعلیم; Attitude / رویہ; Peer Group / ہم عمر گروہ; Cooperative learning / اشتراکی تعلم.
- `npm run figures:variants:check` passes for all 810 figure sources.
- Regenerated the missing, gitignored `static/content-status.json` using `npm run build:content-status`. It is a local generated prerequisite, not a source file to commit. A fresh checkout must generate it before checking content.
- `npm run check:content` passes all 13 gates with the unit at draft.
- Temporary `reviewed` check: content validation and bilingual figure parity passed; pipeline reported only the expected unfinished G4/G5 rows, with no terminology errors. Content-status also became stale during the temporary flip. Both indexes were restored byte-for-byte to draft; no tracker claims were changed.
- Structural checks do not establish passage-level semantic fidelity or assessment equivalence. No independent review is claimed here.
- The brief prohibits a build and dev server. No fresh rendered Urdu, narrow viewport or A4 print inspection was performed; the next reviewer must obtain that evidence.

## Terms awaiting the curriculum owner

The full set of authored, unbanked concept labels and mandatory translator distinctions is preserved in `specs/content/efmp-305/concepts/unit-06.md`, especially its `Authored Urdu labels for G5 review` section. These remain proposals, not additions to the bank. Priority decisions are:

| English | Proposed Urdu |
|---|---|
| Classroom culture | جماعتی ماحول کا چلن |
| Empathy | ہمدردی, with empathy on first use and the perspective-taking gloss |
| Class charter | جماعتی عہد نامہ |
| Buddy rota | ساتھی باری نامہ |
| Shared support plan | مشترکہ معاونت منصوبہ |

Preserve the distinction between empathy and sympathy, between a shared support plan and an IEP, and the English statutory terms on first use. Do not silently alter the terminology bank.

## Next owner

All translation flags remain `draft`. The existing G4 row stays in progress with no initials. G3 and G5 remain open. Obtain accepted G3 evidence for the exact English baseline before independent G5 review, including complete bilingual comparison, assessment equivalence and rendered Urdu evidence. This handoff grants no certification or publication authority.
