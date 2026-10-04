---
id: 0090
title: EFMP-302 U1 G5 alt-text fixes
stage: misc
date: 2026-10-04
surface: agent
model: claude-opus-5
feature: efmp-302
branch: agent/TEX-22
user: M Yousif Channa
command: Paperclip heartbeat on TEX-22 (issue_assigned)
labels: ["BilingualAuthor", "efmp-302", "unit-01", "g5", "alt-text", "accessibility", "urdu", "adr-0029"]
links:
  spec: specs/content/efmp-302/figures/unit-01.md
  ticket: TEX-22
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
 - docs/semester-1/efmp-302/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-03.mdx
 - specs/content/efmp-302/figures/unit-01.md
 - history/prompts/efmp-302/0090-efmp302-u1-g5-alt-text-fixes.misc.prompt.md
tests:
 - npm run check:content (13/13 gates PASS)
---

## Prompt

Paperclip issue **TEX-22 - "EFMP-302 U1: fix 2 blocking Urdu alt-text defects from G5 (+1 carried)"**,
assigned to BilingualAuthor by CurriculumOwner as a child of TEX-4. Verbatim objective:

> Fix the two blocking Urdu alt-text defects found at G5 on the five Gemini illustrations in EFMP-302
> Unit 1 (shipped by board-direct PR #91, ADR-0029), plus one carried finding in the same files.
>
> Full verdict: the `g5-efmp302-u1-illustrations` document on TEX-4. Read it before starting.
>
> ## Tier
>
> **Tier B** - content work on an existing course, under that course's content spec and the
> `translate-unit` conventions. No `sp.specify`. Gates only.
>
> ## B-01 (blocking) - `topic-01.mdx`, fig-U1-10 alt text
>
> The Urdu alt text says **استانی** (a female teacher). The English alt text, the English prose and the
> Urdu prose nine lines below it are all gender-neutral ("a young teacher" / "the new teacher" /
> `نئے استاد`). The Urdu alt text is the only place in either locale that assigns this teacher a gender,
> and it contradicts its own page.
>
> **Before you edit, look at `static/img/figures/efmp-302/unit-01/fig-U1-10.webp`.**
>
> - If the teacher in the image is **not** visibly a woman: change the Urdu alt text to
>   `ایک نوجوان استاد`. Urdu only; English is correct.
> - If the teacher in the image **is** visibly a woman: the English is the wrong one. Then fix the
>   **English** alt text and the Urdu alt text together so both state it, and leave the body prose of
>   both locales alone (the prose describes the scenario, not the image).
>
> Say in your PR body which branch you took and what you saw in the image. Do not guess from the prompt
> text - the prompt did not specify a gender, so only the rendered pixels settle it.
>
> Files: `i18n/ur/.../semester-1/efmp-302/unit-01/topic-01.mdx`, and
> `docs/semester-1/efmp-302/unit-01/topic-01.mdx` only if the second branch applies. Manifest row
> `specs/content/efmp-302/figures/unit-01.md` fig-U1-10 must stay in sync with whatever the English alt
> becomes.
>
> ## B-02 (blocking) - `topic-03.mdx`, fig-U1-12 alt text
>
> The alt text says `سیکنڈری اسکول`; the prose four lines below says `ثانوی اسکول`, for the same
> teacher. Each term appears exactly once in the whole Urdu unit.
>
> **Fix:** change the alt text to `ثانوی اسکول`. Decided, not open - the prose already uses it, it is the
> Urdu form, and the unit's register is academic-plain (درسی مگر عام فہم). Transliteration is for product
> names and UI nouns (PHR 0084's posture), not for a school tier with a settled Urdu word.
>
> File: `i18n/ur/.../semester-1/efmp-302/unit-01/topic-03.mdx`.
>
> ## C-01 (carried, fix in the same pass) - `topic-01.mdx`, fig-U1-1 alt text
>
> Not one of the five illustrations, but a worse accessibility defect found in the same file.
>
> - English alt carries the table's finding: "... **- the teacher and the doctor meet all four, the
>   shopkeeper meets none.**"
> - Urdu alt drops that entire clause. An Urdu screen-reader user learns that a table exists and nothing
>   else.
> - Separately, `کے خلاف` is a calque of English "against". In Urdu it reads "in opposition to". Use
>   `کے حوالے سے`.
>
> **Fix:** restore the result clause in Urdu and replace the calque. The Urdu alt must carry the same
> information as the English alt.
>
> ## Acceptance criteria
>
> - [ ] fig-U1-10 alt text consistent with the rendered image, with the English alt, and with the Urdu
>   prose on the same page; PR body states which branch was taken and what the image shows
> - [ ] fig-U1-12 alt text reads `ثانوی اسکول`
> - [ ] fig-U1-1 Urdu alt carries the result clause and drops `کے خلاف`
> - [ ] Figure manifest rows in `specs/content/efmp-302/figures/unit-01.md` match the published English
>   alt text byte for byte
> - [ ] `npm run check:content` passes (`flock /tmp/mega-book-heavy.lock` any heavy step; one at a time
>   on this host)
> - [ ] PHR written under `history/prompts/`, `links.ticket` set to this issue, `labels` include your
>   agent name, Handoff section filled
> - [ ] Draft PR only. Never merge, never push to `main`. Worktree removed after the PR is open.
>
> ## Advisories - do NOT fix in this pass
>
> Recorded so they are not lost, deliberately excluded to keep the diff minimal:
>
> - fig-U1-11 flattens the English "some puzzling and some raising their hands" contrast into one group
>   plus a subset.
> - Board vocabulary is split across the unit: `بورڈ` (3 uses) vs `تختۂ سیاہ` (1, in fig-U1-13). Prefer
>   `بورڈ` when this is regularised later.
>
> These go to the improvement loop. If you touch them, the diff stops being reviewable against this
> verdict.

## Response snapshot

Read the frozen G5 verdict document (`g5-efmp302-u1-illustrations`, TEX-4) in full, then decoded
`static/img/figures/efmp-302/unit-01/fig-U1-10.webp` to PNG and looked at it before editing anything.

**B-01 - branch 2 taken (the teacher is visibly a woman), so the English moved, not the Urdu.**
The rendered image shows two adult women in the lane outside the school gate. The woman on the left,
in a green shalwar kameez and an embroidered dupatta, is holding the hand of a small child in a blue
school pinafore carrying a satchel - she is the mother. The woman on the right, in a rust/terracotta
shalwar kameez with her hair tied back and no dupatta over her head, is the person being addressed -
she is the teacher. There is no man in the scene apart from the elderly shopkeeper behind the counter
of the general store across the lane, who is clearly not the teacher. The Urdu `استانی` was therefore
*correct* and the gender-neutral English alt was the inaccurate one.

Fixed the English alt in `docs/.../topic-01.mdx` to "a young woman teacher" and synced the fig-U1-10
Alt text column of the manifest byte for byte. The Urdu alt is unchanged - it already stated it. Body
prose in both locales left alone, as directed.

**B-02** - `سیکنڈری اسکول` → `ثانوی اسکول` in the fig-U1-12 Urdu alt, matching the prose four lines
below. Urdu only; the English alt and the manifest row were already correct.

**C-01** - the fig-U1-1 Urdu alt now carries the table's finding and drops the calque:

> استاد، دکاندار اور ڈاکٹر کا پیشے کی چار خصوصیات **کے حوالے سے** موازنہ کرنے والا نقشہ: **استاد اور ڈاکٹر
> چاروں پر پورے اترتے ہیں، جبکہ دکاندار کسی پر بھی نہیں۔**

`کے حوالے سے` replaces `کے خلاف` per the verdict's direction, and the result clause now matches the
information the English alt carries. The Urdu uses a colon rather than the English spaced hyphen
because a mid-sentence hyphen reads badly in RTL Nastaliq; the information content is identical.

Both advisories (A-01 fig-U1-11 "some ... some", A-02 بورڈ vs تختۂ سیاہ) were deliberately left
untouched so the diff stays reviewable against the verdict.

Four files changed, four alt-text/manifest lines. No prose, no code, no component, no schema.

## Outcome

- ✅ Impact: all three G5 findings closed. The fig-U1-10 alt text now matches the rendered pixels in
  both locales; fig-U1-12 uses one Urdu term for "secondary school" across alt text and prose; the
  fig-U1-1 Urdu alt reaches EN/UR information parity, so an Urdu screen-reader user gets the table's
  finding instead of only its existence.
- 🧪 Tests: `npm run check:content` - 13 of 13 content gates PASS (`validate:content`,
  `check:pipeline-gate`, `check:depth-gate`, `check:figures`, `check:no-em-dash`,
  `check:no-answer-keys`, `check:concept-graph`, `check:bloom-bands`, `check:source-floor`,
  `check:licence`, `licence:map:check`, `check:content-status`, `check:docs-sync`).
  `check:content-status` first failed only because the git-ignored `static/content-status.json`
  does not exist in a fresh worktree; `npm run build:content-status` regenerated it and the full set
  then passed clean.
- 📁 Files: `docs/semester-1/efmp-302/unit-01/topic-01.mdx` (EN fig-U1-10 alt),
  `i18n/ur/.../unit-01/topic-01.mdx` (UR fig-U1-1 alt),
  `i18n/ur/.../unit-01/topic-03.mdx` (UR fig-U1-12 alt),
  `specs/content/efmp-302/figures/unit-01.md` (fig-U1-10 Alt text column).
- 🔁 Next prompts: regularise the two recorded advisories (fig-U1-11 contrast, board vocabulary) in a
  later pass; consider a G5 alt-text sweep over the other EFMP-302 units' pre-existing table figures,
  since fig-U1-1 suggests the dropped-result-clause defect is not unique to Unit 1.
- 🧠 Reflection: the verdict was right to refuse to settle B-01 from text. The prompt, the English alt
  and both locales' prose all pointed at a neutral teacher, and the image disagreed with all of them.
  Alt text describes pixels, not intent, so the generated raster has to be opened before any alt-text
  verdict on an illustration is final.

## Handoff (for CEO and agents)

- Shipped / changed: three alt-text corrections in EFMP-302 Unit 1 (fig-U1-10 EN, fig-U1-12 UR,
  fig-U1-1 UR) plus the matching fig-U1-10 figure-manifest row. Draft PR from `agent/TEX-22`.
  No prose, code, schema or migration.
- Decisions the team must respect: (1) fig-U1-10 depicts a **woman** teacher - the English alt and the
  manifest now say so, and the Urdu `استانی` stands; the body prose in both locales stays
  gender-neutral because it narrates the scenario, not the image. (2) `ثانوی اسکول` is the EFMP-302
  term for "secondary school" in Urdu; `سیکنڈری اسکول` is not used. (3) Under ADR-0029, a generated
  illustration's alt text must be checked against the rendered file, never against its generation
  prompt. (4) The two G5 advisories (fig-U1-11 "some ... some" contrast, `بورڈ` vs `تختۂ سیاہ`) are
  open and intentionally unfixed.
- Pending / next owner: CurriculumOwner reviews the draft PR and clears the G5 illustration set; the
  board merges. The two advisories need an owner in the improvement loop.
- Paperclip issues affected: TEX-22 (this work, to `in_review`), TEX-4 (parent roadmap and review
  backlog; the `g5-efmp302-u1-illustrations` verdict's B-01, B-02 and the carried fig-U1-1 finding
  are now addressed).

## Evaluation notes (flywheel)

- Failure modes observed: a fresh `git worktree` lacks the git-ignored `static/content-status.json`,
  so `npm run check:content` fails its last-but-one gate on a clean branch for reasons unrelated to
  the diff. Worth knowing before reading that failure as a content defect.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS (13/13).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): have `generate-figures` require a recorded visual
  inspection note per raster row in the manifest, so the alt text and the rendered image are
  reconciled at production time rather than at G5.
