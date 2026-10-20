# Unit 1 translation prerequisite blocker

- Job: `gqur-301-u01-translate`, Codex, 2026-10-19.
- English baseline: `eedbf84bcfd74e5afb4e31f3bf60407dc4d28737`. HEAD equals origin/main; no earlier branch commits or uncommitted work were present.
- G4 was not started. Translation status remains `draft`; no tracker completion, G3/G5 certification or publication change is asserted.

## Stop condition

`.claude/skills/translate-unit/SKILL.md`, Inputs / Out of scope, says: "if the English is wrong, say so and stop, do not silently improve it in translation". Although the tracker has green G2 evidence, the following directly reproducible English error prevents a faithful, correct Urdu mirror. A translator must neither copy known wrong arithmetic nor silently repair the English baseline in Urdu.

## Required English repair

`docs/semester-2/gqur-301/unit-01/topic-03.mdx:22-24` lists 25 quiz marks. Counting those actual values gives:

| Interval | Values | Frequency | Relative frequency | Cumulative frequency |
|---|---|---|---|---|
| 10-14 | 11, 12, 13, 14 | 4 | 0.16 | 4 |
| 15-19 | 15, 15, 16, 16, 17, 17, 18, 18, 19, 19 | 10 | 0.40 | 14 |
| 20-24 | 20, 20, 20, 21, 21, 22, 22, 23, 23, 24 | 10 | 0.40 | 24 |
| 25-29 | 25 | 1 | 0.04 | 25 |

The frequency table at lines 51-56 instead gives `5, 9, 10, 1`. The cumulative table at lines 91-96 repeats the first two wrong frequencies and gives the first cumulative frequency as 5 instead of 4. Lines 58-60 describe 20-24 as the highest-count interval, although 15-19 and 20-24 tie.

The same defect is carried by `static/img/figures/gqur-301/unit-01/fig-U1-5.svg` and its generated dark variant: the first two frequencies, their relative frequencies and the first cumulative frequency disagree with the raw data. The tally strings also disagree with the actual counts. The interpretation at line 85 claims 23 of 25 marks lie in 15-24; the actual count is 20. Its claim that 20-24 is uniquely highest also needs alignment.

Reproduction, run from the repository root:

```js
// node --input-type=module
import fs from 'node:fs';
const source = fs.readFileSync('docs/semester-2/gqur-301/unit-01/topic-03.mdx', 'utf8');
const marks = source.match(/The marks, in no particular order, are: ([\s\S]*?)\. She wants/)[1]
  .split(',').map(Number);
let cumulative = 0;
for (const [lo, hi] of [[10, 14], [15, 19], [20, 24], [25, 29]]) {
  const frequency = marks.filter(value => value >= lo && value <= hi).length;
  cumulative += frequency;
  console.log(lo, hi, frequency, frequency / marks.length, cumulative);
}
```

The separate English author owns correction of the worked example and dependent figure material, followed by refreshed evidence as required. Existing G3 and render follow-ups remain with their owners; this translation pass does not certify them. Resume G4 against the repaired, frozen English version, then hand off to a fresh independent G5 reviewer when its English dependency is available.

## Terminology prerequisite

The current frozen `terminology.csv` has no `Data` entry, despite `concepts/unit-01.md` describing that label as banked. Its other core statistics labels are also absent from the bank. The glossary does contain Data, Primary source, Secondary source, Frequency distribution and other statistics entries. Before resuming, distinguish glossary definitions and proposed concept labels from bank-approved translations. Do not alter the bank to make translator choices pass. No Urdu terms were coined in this stopped pass.

## Validation and limits

The brief prohibits builds, dev servers and Playwright; none was run. No Urdu mirror or rendered inspection is claimed, and no temporary reviewed-status flip was appropriate. The existing G4 row remains unchanged under the skill's Step 7 instruction not to append a G4 row.

The initial `npm run check:content` at unchanged HEAD/origin/main passed 12 gates and failed only because the ignored `static/content-status.json` cache was absent. `npm run build:content-status` generated that cache without building the site. Final `npm run check:content`: all 13 gates passed. `git diff --check` was also clean. The accompanying prompt history record documents the request and handoff.

## Retry r1 verification (2026-10-19)

- Job: `gqur-301-u01-translate-r1`, Codex.
- Baseline: `4d7d41a83241913300549da2eaa98e0a668c5e0a`, identical to `origin/main`; clean checkout with no branch-only commits at entry.
- The recorded English repair addressed other G3 findings. Both topic-03 tables and fig-U1-5 still contain the arithmetic errors documented above. Recounting the 25 actual marks with Node gives frequencies `4, 10, 10, 1`, relative frequencies `0.16, 0.40, 0.40, 0.04`, and cumulative frequencies `4, 14, 24, 25`.
- The translate-unit stop condition remains binding. No Urdu translation was started or English correction made. Step 7 prohibits appending a G4 row; existing tracker rows and draft status remain unchanged.
- Next owner: a separate English repair pass must correct both topic-03 tables, the tied-maximum interpretation, and fig-U1-5's counts, tallies, proportions and 20-of-25 interpretation, regenerate the dark variant, and refresh affected evidence. Resume translation against that repaired frozen baseline.
- Validation: initial `npm run check:content` on unchanged origin/main passed 12 gates and failed only for the missing ignored status cache. `npm run build:content-status` generated that report without building the site; rerun passed all 13 gates. No build, dev server, Chromium or Playwright was run. Render inspection and G5 remain pending.
