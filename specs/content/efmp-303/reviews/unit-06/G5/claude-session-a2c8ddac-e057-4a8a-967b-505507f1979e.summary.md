# G5 review summary - EFMP-303 Unit 6 (Urdu mirror)

- Report: `specs/content/efmp-303/reviews/unit-06/G5/claude-session-a2c8ddac-e057-4a8a-967b-505507f1979e.json`
- Disposition: **escalate** (advisory only. Nothing is signed, G5 is not marked, `translation_status` stays `draft`.)
- Reviewer: `agent:g5-reviewer`, model claude-opus-5-5, fresh Claude Code session
  `a2c8ddac-e057-4a8a-967b-505507f1979e` (crew job efmp-303-u06-review_ur). This session did not
  translate the unit. The author run is `commit:91adece4`, the last commit to touch the Urdu inputs. The
  translation was by opencode (Claude) and Codex (see `G4/translation-handoff.md`).
- Inputs: `crew-20261102/manifest.json` (118 paths). The 99 English-side digests are identical to those
  in the CMY G3 desk report `G3/20261102T140729Z-g3-desk-218f29ab.json`.

## Criteria

| Criterion | Status | Reason |
|---|---|---|
| authority | pass | All four outcomes and both SLOs are carried. Every coverage sub-topic U6-01..09 has its Urdu section. |
| sources | pass | Every inline citation and Further-reading URL is kept on the same claim. The figure source lines are kept too. |
| coverage | pass | The nine cycle parts are in each topic. The 10/10/5 bank maps one-to-one to English. |
| assessment | pass | Derived the Urdu MCQ key before reading any answers: ب x9, الف (Q10). It is identical to the English key. RRQ and ERQ marks are unchanged. |
| accessibility | unverified | No rendered page or figure was available (see render-review.log). |
| completeness | pass | No passage, item or rubric row is missing. Figure label counts match. Three clause-level omissions are advisory. |
| semantics | pass | Negation, modality and numbers were checked in every pair. The earlier G4 repairs are verified. The remaining shifts are not material. |
| terminology | fail | Bank key_terms are exact. Drift remains: Learning Outcome heading, Feedback written as آرا in 3 figures, شہادت/شواہد, جامع/شمولیتی, and policy actor in three forms. |
| register | fail | There are about 25 grammar or calque errors, many in learner-facing rubric text. "draws on" is rendered پر بھروسہ 11 times. |
| rtl | unverified | Shaping, bidi and print wrapping were not inspected. |

## Why escalate

1. **No render evidence (uncertain).** The brief forbids build, servers and Chromium. The ImageMagick
   MSVG fallback cannot resolve the SVG CSS variables, so it produced blank canvases, which were deleted.
2. **G3 dependency is a human, unsigned report (uncertain).** It is current, but an automatic G5 cannot verify it.
3. **Register repair list (blocking).** The exact sites and suggested fixes are in the JSON finding. A
   translator applies them, then a fresh G5 rechecks. This is repair cycle 1 of 2.
4. **Terminology drift needs an owner ruling (uncertain).** The main item is the Learning Outcome heading,
   which differs from the bank and follows a corpus-wide pattern.

## Next steps
- Translator: apply the register list. Align the figure labels for Feedback and Evidence with the prose and alt
  text (`fig-U6-3/4/6.ur.svg`, then regenerate the dark variants). Re-run `measure-figure-text.mjs`.
- Main session: render the six Urdu pages and the 12 Urdu SVG variants (desktop, narrow, A4) for the next G5.
- Owner: rule on the bank question for the Learning Outcome heading and on the proposed terms listed in `G4/translation-handoff.md`.
