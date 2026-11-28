---
id: crew-gent-401-u05-repair_en
title: crew repair_en GENT-401 unit 5
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: gent-401
branch: crew/gent-401-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-05/topic-01.mdx
 - docs/semester-4/gent-401/unit-05/topic-02.mdx
 - docs/semester-4/gent-401/unit-05/unit-assessment.mdx
 - history/prompts/gent-401/crew-gent-401-u05-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-05/unit-assessment.mdx
 - specs/content/gent-401/figures/unit-05.md
 - specs/content/gent-401/reviews/unit-05/G2/20261128T040717436Z-gates.json
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261128T040717436Z/validate-content.txt
 - specs/content/gent-401/sources/texts/cegielska-2018-startup-financing.md
 - specs/content/gent-401/sources/texts/scott-2017-efmd.md
 - specs/content/gent-401/sources/unit-05.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-05/fig-U5-1.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-1.svg
 - static/img/figures/gent-401/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-1.ur.svg
 - static/img/figures/gent-401/unit-05/fig-U5-3.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-3.svg
 - static/img/figures/gent-401/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/gent-401/unit-05/fig-U5-3.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u05-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/gent-401/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-05/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/gent-401/reviews/unit-05/G3/20261127T192818Z-g3-desk-f43b7b2c.json` (disposition: revise). Resolve each one:
- [blocking] Running case contradicts itself: topic-01.mdx:24 and :53 say Imran saved Rs 50,000, which covers the Rs 50,000 start-up budget exactly; topic-02.mdx:24 and :42 (and the bootstrapping row at :46) say he saved Rs 20,000 and needs Rs 50,000. REPAIR: use one savings figure across the unit (for example Rs 20,000 in Topic 5.1, so the budget shows a Rs 30,000 gap that Topic 5.2 funds) and reword topic-01.mdx:53 to match.
- [blocking] fig-U5-1 break-even chart is not drawn to its own axis scale (all four variants: .svg, .dark.svg, .ur.svg, .ur.dark.svg). Fixed-cost line at y=270 shows about Rs 21,700 (should be y=285, Rs 20,000); revenue reaches about Rs 43,400 at 20 pupils (should end at y=110, Rs 40,000); total cost ends about Rs 30,400 (should end at y=215, Rs 28,000); break-even dot at y=222 shows about Rs 27,200 (should be y=241.25, Rs 25,000). The alt, desc and topic-01.mdx:71 say the lines cross at 13 pupils; they cross at 12.5 pupils and 13 is the whole-pupil break-even. REPAIR: redraw at the coordinates in figur...
- [blocking] Misattribution at topic-02.mdx:64: 'The OpenStax textbook warns that a campaign needs an established network and skilful use of the media (section 9.2)'. The bound note (openstax-entrepreneurship.md:54) has only the late-rewards point, and OpenStax 9.2 read on 2026-11-27 contains no such statement; the point is Scott (2017) ch. 12: 'without an established network and/or skillful media involvement'. REPAIR: attribute the network/media point to Scott, keep the late-rewards point for OpenStax 9.2.
- [blocking] MCQ construction (unit-assessment.mdx:32-81, key :110-119). Keys are correct, but the distribution is A2/B6/C2/D0: answering B throughout scores 6/10 and D is never correct. MCQ 3 options A and D both describe variable costs, so they can be discarded together. REPAIR: spread the keys across A-D (about 2-3 each) and replace one of the equivalent distractors in MCQ 3.
- [blocking] Overstated source at topic-01.mdx:73: Sintha (2020) 'notes that many small businesses fail because they never do this calculation at all'. The bound note (sintha-2020-break-even.md:27) says many SMEs stop trying and one cause is that they never do the calculation. REPAIR: 'notes that one reason many small businesses give up is that they never do this calculation'.
- [advisory] Topic 5.1 est_reading_minutes 11 is below its content-spec band of 12-16 (content-spec.md:282); the unit total of 40 is inside 34-46 and check:depth-gate passes.
- [advisory] MCQ 6 is labelled (Apply) but asks for a definition (Remember/Understand).
- [advisory] topic-02.mdx:24 offers an uncle's loan repaid in two years, but the worked example and table at :44-48 recast it as a bank loan repaid monthly. Name it a family loan or add the bank as a separate option.
- [advisory] topic-02.mdx:72 'an edtech repair shop' is unclear; name the venture plainly (for example a computer repair shop).
- [advisory] fig-U5-3 reaches crowdfunding only through 'willing to give up part ownership? yes', although reward crowdfunding gives up none (topic-02.mdx:62); the start node asks how much money is needed but no branch uses the amount (figure plan, content-spec.md:296).
- [advisory] Cegielska & Zawadzka is cited as 2018 (OpenAlex year) while the DOI and volume 51(6) are the journal 2017 issue (sources/unit-05.md; topic-02.mdx:122).
- [advisory] The fig-U5-1 manifest prompt (figures/unit-05.md) says the lines cross 'at 13 pupils and 25,000 rupees', which is not a point on either line. Fix with F2.
- [uncertain] Render and print inspection unavailable. Deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from reviewed HEAD 01fde1b302e083ffef3098d3dadd40fbb90cf8d7 on docs/semester-4/gent-401/unit-05/index.mdx (banner Figure line) and static/img/figures/gent-401/unit-05/fig-U5-5.webp, so the CI-built production site is not the reviewed input and the brief forbids a build or server. No 360px or A4 print inspection was done; accessibility is unverified. The undeployed banner is treated as unverified, not as a content defect.
- [uncertain] Two Scott (2017) claims have no bound note: topic-01.mdx:89 (ch. 10, cash-flow problems among the main reasons new businesses fail) and the 'pile of cash' reason at topic-02.mdx:36 (ch. 1). The Unit 5 notes in scott-2017-efmd.md:35-44 cover chapters 1 (frugality only), 12 and 13. Both claims are true in the publisher PDF (ch. 10 'Reason 3: Cash Flow Problems'; ch. 1 'Lack of Money'), read outside the bundle. REPAIR: extend sources/texts/scott-2017-efmd.md; no prose change needed.

## Notes from earlier jobs on this unit
- (gent-401-u05-review_en, review_en, claude) The repair job should fix F1 (Imran's savings), F2 (redraw fig-U5-1 lines in all 4 variants, including `.ur.svg`, at the coordinates in `figure-check.md`), F3 (credit Scott at `topic-02.mdx:64`), F4 (rebalance MCQ keys, fix MCQ 3) and F5 (soften the Sintha claim), and F7 (add Scott ch. 10 and ch. 1 to `sources/texts/scott-2017-efmd.md`).
- (gent-401-u05-review_en, review_en, claude) render-review stays unavailable until the deployed SHA includes the fig-U5-5 banner commit. The next G3 run should then use render-inspect against https://textbook.com.pk.
- (gent-401-u05-illustrate, illustrate, agy) Unit banner fig-U5-5 is placed; Unit 5 G3 review and G5 review remain open for independent evaluation.
- (gent-401-u05-illustrate, illustrate, agy) Unit 5 financial planning terms are authored proposals not banked in terminology.csv; an independent G5 reviewer should verify them.
- (gent-401-u05-illustrate, illustrate, agy) translation_status remains draft across both index.mdx files pending independent G5 review.


## Response snapshot

Repaired GENT-401 Unit 5 per the G3 report (consistent savings figure, to-scale break-even chart, correct attribution, rebalanced MCQs, softened Sintha claim, advisories, Scott source notes) in English and Urdu, refreshed G2 evidence and added an open G3 repair row.

## Outcome

- Impact: repair_en for GENT-401 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 29 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired GENT-401 Unit 5 per the G3 report (consistent savings figure, to-scale break-even chart, correct attribution, rebalanced MCQs, softened Sintha claim, advisories, Scott source notes) in English and Urdu, refreshed G2 evidence and added an open G3 repair row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The next G3 run needs render and A4/360px inspection against https://textbook.com.pk after this and the fig-U5-5 banner are deployed.
  - G5 should check the changed Urdu (topics 5.1 and 5.2, MCQ options and keys, fig-U5-1 and fig-U5-3 labels and alt text); punctuation placement in the fig-U5-3.ur.svg box titles looked odd in a local sharp render and needs a browser check.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
