---
id: crew-geng-301-u04-repair_en
title: crew repair_en GENG-301 unit 4
stage: misc
date: 2026-11-27
surface: agent
model: agy2
feature: geng-301
branch: crew/geng-301-u04-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy2", "repair_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/geng-301/unit-04/topic-01.mdx
 - docs/semester-2/geng-301/unit-04/topic-02.mdx
 - docs/semester-2/geng-301/unit-04/topic-03.mdx
 - docs/semester-2/geng-301/unit-04/unit-assessment.mdx
 - history/prompts/geng-301/crew-geng-301-u04-repair_en.misc.prompt.md
 - specs/content/geng-301/figures/unit-04.md
 - specs/content/geng-301/reviews/unit-04/G2/20261127T222455890Z-gates.json
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261127T222455890Z/check-bloom-bands.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261127T222455890Z/check-concept-graph.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261127T222455890Z/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261127T222455890Z/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261127T222455890Z/check-figures.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261127T222455890Z/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261127T222455890Z/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-04/G2/logs-20261127T222455890Z/validate-content.txt
 - specs/content/geng-301/sources/unit-04.md
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u04-repair_en

You are the agy2 worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u04-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/geng-301/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-04/`.

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
From `specs/content/geng-301/reviews/unit-04/G3/20261127T192818Z-g3-desk-88e82e93.json` (disposition: revise). Resolve each one:
- [blocking] sources/unit-04.md `## Unverifiable sources` (lines 12-20) does not meet the unavailable-source convention: it records no retrieval attempt, no date and no owner authorisation under D-2026-0001, unlike the repaired declarations in units 01, 02, 03 and 06 of the same course. The unit prose also states more than the declaration supports: topic-01.mdx:119-120 (Zinsser chapter 6), topic-02.mdx:122-123 (Rosenwasser and Stephen chapter 3) and topic-03.mdx:125-126 (Faigley and Selzer chapter 7) assert chapter-level content of monographs whose text was not obtained, without disclosing that the clai...
- [blocking] unit-assessment.mdx:195 (RRQ 9 mark scheme) reads "Marks (2): 1 - goal stated; 2 - steps in order". The components sum to 3 against a 2-mark header, so a teacher cannot award the scheme as written. Repair: make the header and the components agree, either "Marks (3): 1 - goal stated; 2 - steps in order" or "Marks (2): 1 - goal stated; 1 - steps in order".
- [advisory] Figure manifest Alt text is stale for all six schematics. specs/content/geng-301/figures/unit-04.md rows carry the short authoring-time alt (for example fig-U4-1 "A diagram comparing description (sensory detail) and illustration (concrete examples)"), while the carrier alt and the SVG <desc> carry the longer aligned text (for example " ... as two ways to make abstract ideas concrete."). The four illustrations match. ADR-0024 makes the manifest row and the carrier the same handoff contract, so the six rows should be brought in line with the carrier alt unless a content correction is recorded.
- [advisory] The approved content-spec Unit 4 topic list and figure plan (content-spec.md:356-373) still list only the six schematics. The four placed illustrations (fig-U4-7 banner, fig-U4-8..10) are recorded in the figure manifest and banner sidecar but not in the spec, so the frozen spec and the delivered unit diverge. The spec is approved and frozen, so aligning it is an owner decision.
- [advisory] content-spec.md:331-335 maps UNESCO2022 and openstax2021 section 11.3 to Unit 4 as open-access readings, but neither key appears in sources/unit-04.md, coverage/unit-04.md or the unit prose, and the unit carries no open-access binding note of the kind sources/unit-01.md and unit-02.md record for the same situation. The open-access floor itself is met by writing2015, so this is a mapping gap, not a floor failure.
- [advisory] MCQ 6 (unit-assessment.mdx:67-71) keys on the signal phrase "For example" over the concept: the stem sentence "For example, many schools lack libraries" is a generalisation rather than a concrete example, and topic-01.mdx:81-83 teaches that a "For example" sentence can fail to illustrate. The key (B Illustration) is defensible, but a concrete instance would remove the tension.
- [advisory] Residual MCQ option-length cue (unit-assessment.mdx:34-98). The keyed option is the uniquely longest option in 3 of 10 items (4, 7 and 9) and is tied longest with a distractor in item 2, so a pupil who follows the convention "the longest option is usually right" is rewarded in four items. Every key is defensible on content and the effect is much weaker than the 9-of-10 giveaway recorded for EFMP-408 cycle 1, so this is advisory. Rebalancing the option wording in items 4, 7 and 9 would remove it.
- [advisory] Prior report finding F2 (narrow-viewport and A4-print inspection never performed with a real browser) is NOT resolved. It is carried as the uncertain finding above; the limitation is now caused by the deployed build lagging HEAD rather than only by the absent browser.
- [uncertain] Rendered-page and A4-print evidence is unavailable, so this carries forward prior finding F2 (no real browser inspection). The deployed build 366019f8ace647e892523e553b81ab6d1832ec68 differs from HEAD 6a810e62c7b9d4ff7643b56a17f75cb9db2ce98e on the unit, and the brief forbids a local build or server, so render-review is recorded as unavailable (logs/render-review.txt, exit 1). Narrow-viewport scrolling, print clipping and visual accessibility of the current bytes remain unverified. Changed images can be served stale for up to 30 days, so this is a tooling limitation, not a content defect.

## Notes from earlier jobs on this unit
- (geng-301-u04-review_en-r1, review_en, claude_crew) The advisory tracker row is written to `advisory-tracker-row.md`, not to `tasks.md` (appending it would make the unticked row authoritative and reopen the owner-signed G3 row); the parent must append it deliberately.
- (geng-301-u04-review_en-r1, review_en, claude_crew) Both blocking repairs are content edits (sources declaration, RRQ 9 mark scheme), and this is the final ADR-0019 cycle, so they need the owner's authorisation before a further cycle.
- (geng-301-u04-review_en-r1, review_en, claude_crew) Rendered/print evidence needs the repaired commit deployed first (or an owner-run build); a fresh G3 run on unchanged input is prohibited.
- (geng-301-u04-illustrate, illustrate, agy) GENG-301 Unit 4 has no Urdu mirror, so no Urdu files were modified or created.
- (geng-301-u04-illustrate, illustrate, agy) The G3 en-review for Unit 4 still needs a fresh independent run (ADR-0019); the newly placed illustrations are part of the content it will evaluate.


## Response snapshot

Resolved GENG-301 Unit 4 G3 review findings by repairing unverifiable source lookups and Further reading claims, reconciling the RRQ 9 mark scheme, rebalancing MCQ cues, aligning figure manifest alt text, refreshing G2 gate evidence, and appending an advisory revise tracker row.

## Outcome

- Impact: repair_en for GENG-301 Unit 4 by agy2 (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved GENG-301 Unit 4 G3 review findings by repairing unverifiable source lookups and Further reading claims, reconciling the RRQ 9 mark scheme, rebalancing MCQ cues, aligning figure manifest alt text, refreshing G2 gate evidence, and appending an advisory revise tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains unticked and uncertified (ADR-0019); a fresh independent G3 review cycle is required after deployment.
  - Rendered-page and A4-print evidence was unavailable due to the deployed build lagging HEAD; desktop, 360px viewport, and A4 print verification remain deferred to an authorized browser host.
  - The frozen content-spec topic list/figure plan divergence regarding the four added illustrations and mapped open-access readings remains an owner decision.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
