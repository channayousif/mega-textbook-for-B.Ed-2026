---
id: 0086
title: Real contact details in both locales
stage: general
date: 2026-10-04
surface: agent
model: claude-opus-5
feature: none
branch: agent/TEX-20
user: M Yousif Channa
command: Paperclip TEX-20
labels: ["contact-page", "i18n", "urdu", "ui-ux", "tier-c", "programmanager"]
links:
  spec: null
  ticket: https://textbook.com.pk/TEX/issues/TEX-20
  adr: null
  pr: null
files:
 - src/pages/contact.mdx
 - i18n/ur/docusaurus-plugin-content-pages/contact.mdx
tests:
 - npm run check:no-em-dash (PASS)
 - npm run validate:content (PASS)
---

## Prompt

Board message (TEX-20, 2026-10-03): Use these real contact details for contact.mdx in both
locales, replacing the placeholders: Email: channayousif@yahoo.com, Phone: 03332707826

Board update (TEX-20 comment, 2026-10-04): Board update, please read before continuing:
(1) The Licence paid layer is ON HOLD; the TEX-7 and TEX-8 trees (incl. TEX-18) are paused,
and the priority is UI/UX. (2) New rule: at the start of every run, read the new PHRs under
history/prompts/ (their Handoff sections). PHRs labelled board-direct record work the board
did directly with Claude; do not redo or contradict it. See your role file's 'Board-direct
awareness' section and PR #93. (3) This task still stands: replace the contact placeholders
in src/pages/contact.mdx and i18n/ur/docusaurus-plugin-content-pages/contact.mdx with
Email: channayousif@yahoo.com, Phone: 03332707826, via a draft PR with a PHR.

## Response snapshot

Read the PHRs added since the last run first, per the new board-direct awareness rule:

- `0084-urdu-copy-landing-about-contact` (TEX-12, merged) authored the Urdu copy for the
  landing, about and contact pages. It created the Urdu contact page but carried the English
  placeholder contact lines across verbatim.
- `0085-reading-ux-refresh-and-gemini-illustrations` (board-direct, PRs #89/#90, merged)
  touched `src/pages/contact.mdx` as part of the reading-UX refresh and introduced ADR-0029
  (Gemini via `agy` as a raster illustration producer). It did **not** fill the contact
  placeholders.

So TEX-20 does not overlap or contradict either record: the placeholder lines were still
live on `origin/main` at `e4a1404d`. Verified before editing.

Tier C (board rule 2026-10-02): two lines of user-facing page copy, no schema, no auth, no
payments, no new route and no gate change. The Paperclip task is the spec. Tier A full SDD
would be disproportionate to a copy replacement, and the board specified the process it
wanted (draft PR plus PHR) in the wake comment.

Change, identical in both locales:

```
- **Email:** [channayousif@yahoo.com](mailto:channayousif@yahoo.com)
- **Phone:** [03332707826](tel:03332707826)
```

The values are used exactly as the board gave them, not reformatted into an international
`+92` form, so nothing is invented. Both are wrapped as `mailto:` / `tel:` links because the
current board priority is UI/UX and a tappable number is the whole point of the line on
mobile; `tel:03332707826` dials correctly from within Pakistan, which is the audience.

The `**Address:**` / `**پتہ:**` line was left untouched: it is not a placeholder and was not
in scope. Grepped `src`, `i18n` and `docusaurus.config.ts` for `support@textbook.com.pk` and
`+92 XX` afterwards: no other occurrence anywhere in the repository, so these two files were
the complete footprint.

No build was run. The change is MDX body prose with no front-matter, component or import
change, so `check:no-em-dash` plus `validate:content` is the smallest verification that
proves it; a full Docusaurus build on the shared 2-CPU production host is not justified for
two text lines.

## Outcome

- ✅ Impact: the EN and UR contact pages now carry real, reachable contact details instead of
  a self-documenting placeholder, and both are clickable.
- 🧪 Tests: `check:no-em-dash` PASS, `validate:content` PASS. No build (not warranted, see above).
- 📁 Files: `src/pages/contact.mdx`, `i18n/ur/docusaurus-plugin-content-pages/contact.mdx`.
- 🔁 Next prompts: none required by this change. A later UI/UX pass may want the Urdu page's
  address line translated, which is still English prose from TEX-12.
- 🧠 Reflection: reading the recent PHRs first was load-bearing here, not ceremony. PHR 0085
  edited the very file this task targets, so without that check the safe assumption would
  have been that the work was already done, or the edit would have been written blind against
  a stale copy of the file.

## Evaluation notes (flywheel)

- Failure modes observed: three prior runs on TEX-20 died with a terminal limit failure before
  touching a file. Recovery worked because the task is small and self-describing; nothing had
  to be reconstructed.
- Graders run and results (PASS/FAIL): `check:no-em-dash` PASS, `validate:content` PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none for this task.

## Handoff (for CEO and agents)

- `src/pages/contact.mdx` and `i18n/ur/docusaurus-plugin-content-pages/contact.mdx` are the
  canonical home of the public contact details. They are plain MDX prose, not config, and are
  not referenced from `docusaurus.config.ts` or the footer, so changing them again is a
  two-line edit in two files.
- There is no remaining contact placeholder anywhere in `src/` or `i18n/`.
- Still open as UI/UX polish, not a blocker: the Urdu contact page's address line is English
  prose carried over from TEX-12.
- No migration, no secret, no deploy step. Draft PR only; the board merges.
