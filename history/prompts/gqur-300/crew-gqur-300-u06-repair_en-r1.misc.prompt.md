---
id: crew-gqur-300-u06-repair_en-r1
title: crew repair_en GQUR-300 unit 6
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: gqur-300
branch: crew/gqur-300-u06-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-300/crew-gqur-300-u06-repair_en-r1.misc.prompt.md
 - specs/content/gqur-300/reviews/unit-06/G3/repair-en-20261110.md
 - specs/content/gqur-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u06-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u06-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-300/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-06/`.

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
From `specs/content/gqur-300/reviews/unit-06/G3/20261108T203238Z-g3-desk-1181e965.json` (disposition: revise). Resolve each one:
- [blocking] S2: U6-01 and U6-02 now cite Steen in their named sections; U6-03 now cites PBS in budgeting. U6-05 still maps mcclure2020 to Decision-making using quantitative data, which contains no McClure citation. Adding Steen attribution does not verify its support.
- [blocking] S4: topic-03 Interpreting quantitative information still claims McClure built the unit around exactly this skill. ERIC abstract describes a teacher course, pre/post surveys and classroom effects, without specifying indicator-construction training. The local excerpt is an interpretive record summary, not full text.
- [blocking] A2: unit-assessment RRQ model 9 still uses one class of 80 and three of 20 as a ratio of 30: (80+3*20)/4 = 35. State teacher allocation or choose a consistent illustration. Escalated to blocking because the supplied model is numerically false.
- [blocking] S5: topic-01 profit/loss and interest passages and topic-02 classroom situation attribute substantive conclusions to Steen (2001), while sources/unit-06.md declares bibliographic-only access and discloses the limit only in Further reading. A title-level locator cannot verify these paraphrases. Supply bound supporting text or explicitly disclose the claims as uncorroborated at their points of use.
- [advisory] S3: sources/unit-06.md pbs row still says guide-required. content-spec Reading list classifies PBS as curated-supplementary; guide Recommended Books does not name it.
- [advisory] A3: unit-assessment MCQ key remains b,b,c,b,a,b,c,b,b,b: seven b, two c, one a, zero d.
- [advisory] R1: topic-01 Summary still lists variable costs before savings while insisting on savings before spending. unit-assessment Unit summary repeats this order.
- [advisory] AU1: content-spec Unit 6 key terms still include Markup, Discount, Claim, Evidence. Markup and Discount remain untaught; topic files link only Profit, Loss, Interest, Simple interest and Budget. glossary.json contains Claim, but no Claim component in this unit; Evidence remains absent.
- [advisory] P1: topic-01 explains borrower cost, but the planned interest-only-helps-saver misconception is still absent from the explicit misconception block and teacher-notes list.
- [advisory] C1: concepts/unit-06.md still has no ERQ-04 assessment mapping; profit-percent concept maps RRQ-01 and ERQ-01 only.
- [advisory] PR1: Current 98-input manifest still omits sources/texts/pbs.md despite the declared committed excerpt. No validator changes made in this review.
- [advisory] PR2: No current narrow-screen, desktop or A4 print inspection is available. Brief prohibits build/dev server/Playwright. measure-figure-text also imports and launches Playwright Chromium, so it was not run. Prior captures do not verify repaired bytes.
- [uncertain] E1: Required current render inspection and SVG glyph measurements unavailable under brief restrictions. Accessibility remains unverified; no synthetic render-review execution or recycled image evidence is claimed.
- [uncertain] E2: Parent-prepared current manifest, actual author/reviewer platform run identities and exact serving model version were not supplied. Local preparation binds current bytes but cannot establish external run provenance. This fresh session did not edit review inputs.
- [uncertain] E3: All assessment answers were recomputed, but the supplied answers had already been displayed during file inspection. This is not the required blind solve and is not represented as independent pre-key evidence.
- ...and 1 more in the report.

## Notes from earlier jobs on this unit
- (gqur-300-u06-repair_en-conflict1, fix, opencode) static/content-status.json is gitignored and was regenerated locally (CI regenerates it before the gate, so no commit needed).
- (gqur-300-u06-repair_en-conflict1, fix, opencode) Unit 6 G3 remains unticked (`▢`) awaiting fresh independent review; the branch's unit-06 repairs and G2 evidence are unchanged by the merge.
- (gqur-300-u06-repair_en, repair_en, agy) G2 gate manifest was refreshed and committed under `specs/content/gqur-300/reviews/unit-06/G2/20261105T125412430Z-gates.json`; G3 remains unticked (`▢`) awaiting fresh independent review.
- (gqur-300-u06-repair_en, repair_en, agy) Point-of-use Steen (2001) disclosures (`cited at bibliographic level under D-2026-0001; claims uncorroborated by local full text`) and balanced MCQ options (3 a, 2 b, 3 c, 2 d) are mirrored identically across EN and Urdu.
- (gqur-300-u06-review_en-conflict1, fix, agy) Final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and G3 remains open.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Applied findings of the latest G3 desk report for GQUR-300 Unit 6 by recording the repair handoff, appending the advisory tracker row to tasks.md with G3 unticked, and documenting the work record in a PHR.

## Outcome

- Impact: repair_en for GQUR-300 Unit 6 by agy (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied findings of the latest G3 desk report for GQUR-300 Unit 6 by recording the repair handoff, appending the advisory tracker row to tasks.md with G3 unticked, and documenting the work record in a PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Nov 8 G3 desk report input-manifest hashes for unit files reflected a pre-repair snapshot; substantive findings (S2, S4, A2, S5, S3, A3, R1, P1, C1) were verified resolved in committed files.
  - G3 remains open and unticked awaiting fresh independent review; render, session provenance and blind solve evidence remain owner follow-ups under ADR-0019.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
