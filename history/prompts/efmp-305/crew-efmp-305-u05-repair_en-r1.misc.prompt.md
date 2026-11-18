---
id: crew-efmp-305-u05-repair_en-r1
title: crew repair_en EFMP-305 unit 5
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u05-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u05-repair_en-r1.misc.prompt.md
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u05-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u05-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-305/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-05/`.

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
From `specs/content/efmp-305/reviews/unit-05/G3/20261108T203238Z-g3-desk-79043796.json` (disposition: revise). Resolve each one:
- [blocking] 2. **F2, blocking, assessment ambiguity.** unit-assessment.mdx, MCQ 7: B correctly rejects the ICT Act's territorial applicability; C also correctly describes that Act's admission bar; D combines them. The answer note explicitly awards B when reasoning is visible although the instructions say choose one. Repair to one unambiguous best answer and consistent scoring, then independently re-solve.
- [blocking] 3. **F3, blocking, audit coverage and feasibility.** topic-02.mdx, 'The school responsibilities audit', lists five headings that omit explicit tests for transport (duty 8), life/social skills (9) and all modes of education (10). ERQ 3 demands a section-by-section audit using those same five headings; its top band does not repair those omissions. The 'nine of ten' immediately available assertion also ignores transport and inaccessible buildings, both of which can require money. Figure fig-U5-4's alt/prompt repeats that assurance. Add checks for all ten duties, distinguish evidence of noncomp...
- [blocking] 4. **F4, blocking, privacy and inconsistent pedagogy.** topic-03.mdx Activity Part 1 says nobody collects the private reservation; teacher notes 'Running the activities' explicitly forbid asking what was written. The same topic's Summative task item 5 and four-mark Self-account criterion then require that reservation. Permit a hypothetical or voluntarily chosen reflection, with equal marks for declining disclosure, and align teacher notes. Also align teacher notes 'Where trainees reliably go wrong' item 6, which refuses every analysis without a classroom-level gap, with the learner task's i...
- [blocking] 5. **F5, blocking, source overstatement.** topic-03.mdx 'What Pakistani teachers themselves report' says each factor accounts for roughly equal variance, while sources/unit-05.md anis2025 explicitly excludes any variance claim and the next paragraph says no strength of effect or number is asserted. Equal factor variances would not by themselves establish that attitudes, resources and preparedness are inseparable. Retrieve and bind the relevant results, qualify the inference and reconcile the source declaration. The Summary and RRQ 8 model also repeat roughly equal dimensions.
- [advisory] 7. **F7, advisory, misleading source framing.** topic-01.mdx's case uses precise school numbers and an unsupported taluka-average comparison; topic-03.mdx cites examples from previous cohorts and says half of first drafts fail, without provenance. Label constructed illustrations and remove invented empirical precision or supply evidence. sources/unit-05.md's six unavailable sources are declared, so missing full text alone is not treated as an automatic failure under D-2026-0001. Specific overclaims, rather than URL availability, drive F5 and F6.
- [advisory] 8. **F8, advisory, stale asset narrative.** figures/unit-05.md rows are placed and carriers/assets exist, but its closing paragraph says all six are prompt-only. Tracker G6 notes have the same stale description. Author/asset owner should reconcile narrative in a separate repair; reviewer has not changed bound inputs.
- [uncertain] 1. **F1, uncertain, provenance and rendering.** Parent author-run provenance and exact model build are unavailable, and current browser/print evidence is absent. Owner/host must supply these for a fresh review. A regenerated manifest alone is insufficient proof of independent handoff.
- [uncertain] 6. **F6, uncertain, legal inference beyond bound excerpts.** topic-01.mdx 'What a national education policy is, and what it is not' says no parent can take a policy to court or ask for an order. The bound NEP excerpt establishes wording, not judicial enforceability or use in constitutional proceedings. topic-02.mdx 'Reasonable accommodation, taught properly' similarly infers comprehensive cost and fundamental-alteration rules from a definition without bound interpretive authority. Have an appropriately qualified source/reviewer delimit these propositions. Teach the narrower distinction betw...

## Notes from earlier jobs on this unit
- (efmp-305-u05-repair_en-conflict3, fix, opencode) tasks.md conflict resolved by keeping main's Unit 6 G3 advisory row then this branch's Unit 5 G3/G2 rows; no other paths conflicted.
- (efmp-305-u05-repair_en-conflict3, fix, opencode) F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 stays unticked.
- (efmp-305-u05-repair_en-conflict3, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally; CI generates it before the gate.
- (efmp-305-u05-repair_en-conflict2, fix, opencode) The stated tasks.md conflict was already resolved by conflict1's merge `cda326287`; this run only synced main's later EFMP-301 Unit 4 repair.
- (efmp-305-u05-repair_en-conflict2, fix, opencode) F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 stays unticked.


## Response snapshot

Appended the Unit 5 G3 tracker row naming the 20261108 report after verifying its F2-F8 repairs were already landed on main, with all 14 content gates passing.

## Outcome

- Impact: repair_en for EFMP-305 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Appended the Unit 5 G3 tracker row naming the 20261108 report after verifying its F2-F8 repairs were already landed on main, with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The 20261108 G3 findings are byte-identical to the 20261102 set already repaired on main in 12b3c13a5, so no prose edit was needed; F2-F8 are present in EN and UR.
  - F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 stays unticked.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
