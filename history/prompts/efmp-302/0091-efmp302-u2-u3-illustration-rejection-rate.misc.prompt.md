---
id: 0091
title: EFMP-302 U2-U3 illustration rejection rate
stage: misc
date: 2026-10-05
surface: agent
model: claude-opus-5
feature: efmp-302
branch: agent/TEX-24
user: M Yousif Channa
command: Paperclip heartbeat (TEX-24)
labels: ["BilingualAuthor", "illustrations", "adr-0029", "qc-clearance", "efmp-302", "measurement"]
links:
  spec: null
  ticket: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/issues/TEX-24
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
 - static/img/figures/efmp-302/unit-02/fig-U2-11.webp
 - specs/content/efmp-302/figures/unit-02.md
 - specs/content/efmp-302/figures/unit-03.banner.md
 - docs/semester-1/efmp-302/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/index.mdx
 - scripts/generate-illustration.mjs
 - specs/content/efmp-302/tasks.md
 - specs/content/efmp-302/reviews/unit-02/G2/20261005T051427392Z-gates.json
 - specs/content/efmp-302/reviews/unit-03/G2/20261005T051440651Z-gates.json
tests:
 - npm run check:content (13/13 content gates pass)
 - visual inspection of all 11 EFMP-302 U2/U3 illustrations against ADR-0029 house-style v2
---

## Prompt

TEX-24: roll the ADR-0029 Gemini illustration pipeline onto EFMP-302 Units 2 and 3 and measure
the rejection rate before anyone scales it further. Every image is looked at before its row moves
to `placed`: no maps, flags or national emblems; Pakistani (Sindh government-school) plausibility
in uniforms, furniture, light and dress; no text in the image; reject and regenerate rather than
accept with reservations. EN and UR alt text at informational parity and consistent with the prose
on the same page. Banner rows in a sidecar `unit-0N.banner.md`; `check-figures.mjs` unmodified.
Record the measurement and state plainly whether the pipeline is ready to scale to a whole course.

Spec amendment (2026-10-04, roadmap revision 2 2a): the reader-facing banner is a permanent,
intentional disclaimer that the content is machine-authored. Nothing removes it, and no part of
this work is justified as clearing or softening it. This issue is the corpus's reference
implementation of QC item E (imagery is locally plausible); items F (EN/UR alt-text parity) and
A (`npm run check:content`) are also binding. Add a `## QC clearance (A-F)` section to the PR body.

## Response snapshot

The generation and placement half of TEX-24 was already on `origin/main`: a board-direct run
produced and merged the Unit 2, 3 and 4 illustrations through PR #98. What the issue still owed
was the inspection and the measurement, so this run did those rather than regenerating work that
already existed.

All 11 committed U2/U3 illustrations were opened and looked at against the four rules. Ten passed.
One was rejected: `fig-U2-11`'s head-of-department inset showed a woman in a Western blazer with
loose bobbed hair and no dupatta, which is the "generically Western" failure rule E names. Its
prompt was rewritten to name the dress of every adult in the frame, including inset and background
figures, and it was regenerated once and accepted.

One alt-text defect was found and fixed in both locales: `fig-U3-11` described the teacher as
moving among pupils, which is prompt language, where the image shows her crouched beside a single
desk listening to a boy and a girl. A second suspected defect was investigated and dismissed:
`fig-U2-13`'s Urdu alt text says `طالبہ` (a female pupil) where the English says only "a pupil",
but the prose on that page names the pupil Ayesha in English and عائشہ in Urdu, so the Urdu is
consistent with its own page and carries more information rather than less. That is not the
TEX-22 defect class.

Measured first-pass rejection rate: **1 of 11, 9.1%**, against the pilot's 2 of 5 (40%). One
regeneration attempt was needed and it succeeded. The single reason class (non-local dress on an
adult figure) did not repeat within this batch, but it is the same underlying failure as the
pilot's wall maps: the generator reaching for a non-Pakistani default when the prompt does not
pin a detail down. The house-style rule that prevents it was added to `HOUSE_STYLE` in
`scripts/generate-illustration.mjs`, following the precedent the pilot set when it added the
no-maps rule there.

Recommendation recorded for the board: the pipeline is ready to scale to a whole course, provided
the per-image inspection stays mandatory. The rate is low enough to be economic and the failures
are a prompt-specification problem rather than a model-capability one, but 1 in 11 is still far
too high to place images unseen.

## Handoff (for CEO and agents)

**What shipped.** An inspection and measurement pass over the 11 EFMP-302 Unit 2 and Unit 3
illustrations that PR #98 had already merged. One image regenerated (`fig-U2-11`), one alt text
corrected in both locales (`fig-U3-11`), one house-style rule added, G2 gate evidence refreshed
for both units, and all 13 content gates passing.

**Decisions the team must respect.**
- Every adult in a generated scene wears Pakistani dress. No blazers, suits, jackets or Western
  office clothing on any teacher, parent or head teacher, including background and inset figures.
  This is now in `HOUSE_STYLE` and applies to every future generation.
- The measured first-pass rejection rate on this batch is 1/11 (9.1%). Treat the pilot's 40% as
  the anecdote it was; this is the number to plan against.
- Per-image inspection remains mandatory. The recommendation to scale is conditional on it.
- `fig-U2-13`'s Urdu alt text is correct as it stands. It specifies the pupil's gender because the
  prose on that page names her; do not "fix" it toward the English.

**What is pending and who owns it.** CurriculumOwner owns the review verdict on this change set.
The draft PR carries the measurement table and the `## QC clearance (A-F)` section. Unit 4's
illustrations were merged by the same board-direct run but sit outside TEX-24's scope and have not
been inspected under this contract; TEX-27 already records an adverse QC finding touching U3/U4
imagery, and whoever picks that up should apply the same four rules to Unit 4's four images.

**Paperclip issues affected.** TEX-24 (this issue, moving to `in_review`), TEX-4 (parent roadmap),
TEX-27 (U4 imagery still uninspected under this contract), TEX-22 (alt-text defect class, one
suspected recurrence investigated and dismissed here).
