# Unit 7 translation baseline blocker

- Job: efmp-407-u07-translate
- Agent: codex
- Date: 2026-11-07
- English baseline: 55307590f487d4bb65e91fc2ce1126c4a8d1f7fc (identical to origin/main at task start).
- Disposition: translation not started; English repair required. This is not G3 or G5 review evidence or certification.

The earlier independent English review reported F1 as blocking. The baseline still cites National Education Policy 2009 section 6.1 at all four recorded locations:

- `docs/semester-3/efmp-407/unit-07/topic-01.mdx:33`
- `docs/semester-3/efmp-407/unit-07/topic-01.mdx:107`
- `specs/content/efmp-407/sources/unit-07.md:7`
- `specs/content/efmp-407/sources/texts/nep-2009.md:7`

The reviewer identifies section 6.2 (Curriculum Reform), policy action 5, printed page 36 as the correct locator. This job confirmed that the reported incorrect locators remain; it did not independently re-review the policy or repair the English source.

The mandatory translate-unit skill explicitly excludes English repairs: "if the English is wrong, say so and stop, do not silently improve it in translation". Translation therefore stops before prose or figure production. The repair_en owner must resolve F1 in English and its source records, then rerun the translation job against the repaired baseline.

No G4 tracker row is appended: Step 7 explicitly prohibits it. No G3/G5 row, publication state, terminology bank or translation status is changed. English remains `translation_status: draft`. No new terms are proposed because translation has not begun.

The crew brief prohibits build, dev server and Playwright execution. No browser inspection or rendered Urdu evidence is claimed. A later permitted job must perform actual narrow-width and A4 inspection after translation, followed by independent G5 review. Until accepted G5, translation status must remain draft.

Validation: `npm run check:content` passed all 14 gates with no findings. `git diff --check` passed. These deterministic results do not resolve the English review finding.

## Retry r1 baseline verification

Job `efmp-407-u07-translate-r1` rechecked commit
`5c3000f9e855230e6f505c38bdc6c79cf57c4a27`, identical to `origin/main`
at job start. The branch was clean with no commits ahead of main. The independent
r1 G3 report has disposition `revise`; all four F1 locators above still say
section 6.1. The prerequisite English repair has not landed. Translation remains
unstarted under the skill's explicit stop rule. The existing open G4 row and
`translation_status: draft` remain unchanged. No Urdu render or review is claimed.

Next owner: `repair_en` must correct the four F1 locators against the independent
report, then return a settled baseline for translation. Repeating translation
jobs before that repair cannot discharge G4.

Retry validation: `npm run check:content` passed all 14 gates with no findings;
`git diff --check` passed. No baseline comparison run was needed because there
were zero findings. Build, dev server and Playwright were not run, as the brief
prohibits them.
