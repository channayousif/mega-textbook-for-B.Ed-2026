---
id: crew-gqur-300-u04-repair_en-r1
title: crew repair_en GQUR-300 unit 4
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gqur-300
branch: crew/gqur-300-u04-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-300/crew-gqur-300-u04-repair_en-r1.misc.prompt.md
 - specs/content/gqur-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u04-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u04-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-300/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-04/`.

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
From `specs/content/gqur-300/reviews/unit-04/G3/20261108T203238Z-g3-desk-dfd6f1c3.json` (disposition: revise). Resolve each one:
- [blocking] C2-01: unit-assessment.mdx ERQ-04 and ERQ rubric 4 do not fix the store placement or define which boundary receives skirting. A 5 m wide, 4 m deep edge notch gives 108 m; a corner notch gives 100 m; both leave 580 m2. Default 100 m plus vaguely allowing a few metres does not provide a determinate marking rule. Supply a labelled plan and assess specified placements, or explicitly reward conditional solutions and explain that translation along the same edge does not change boundary length.
- [blocking] C2-03: topic-01 Summative task and mini-rubric, repeated as ERQ-01, label routine rice conversion/sack rounding and an estimate Analyze. The prescribed arithmetic plus noting 9 kg is below 25 kg is Apply; topic-01 has no clearly Analyze-or-higher summative criterion. Add an actual comparison of alternatives, diagnosis of a flawed order or justified assumptions, with scoring that requires analysis.
- [advisory] P04 Length, Mass and Capacity remain unglossed declared key terms; no glossary.json entries found.
- [advisory] P05 Topic4.3 still primarily has one MCQ. Approved content-spec permits integrated exception, so not blocking. unit-assessment frontmatter nevertheless claims at least two per topic.
- [advisory] P06 Explicit shapes-properties bank item remains RRQ-08 only; consider an additional classification item.
- [advisory] P07 MCQ-06 and RRQ-06 remain absent from concepts/unit-04.md item mappings.
- [advisory] P08 former render-tool limitation superseded by C2-04; no current render acceptance inferred from old report.
- [advisory] Additional assessment/scaffolding concerns: RRQ-02 should allow other defensible units; RRQ-07 cannot identify a unique most-likely error from4800 alone. ERQ-03 four-shelf bookcase assumption is introduced in rubric only. Topic-02 cylindrical volume formula is assessed without preceding derivation. See assessment-recomputation.md.
- [advisory] fig-U4-6 Shelf-length row unit metres conflicts with method books*spine-width/shelf when shelf denotes shelf length: result is shelf count. Separate length calculation from number of shelves.
- [uncertain] C2-02: sources/unit-04.md Unverifiable sources says None, but texts/ncm.md explicitly has no internal curriculum text. topic-01 Units of measurement now claims NCC carries the same strands across years. texts/openstax-prealgebra.md is structure-level and cannot substantiate topic-02 precise claim about how authors introduce measures together. Obtain bound supporting passages or disclose and authorise unavailable support. See source-inspection.md.
- [uncertain] C2-04: Current narrow, desktop and A4 render inspection unavailable under explicit brief prohibitions. SVG source reads and deterministic gates do not verify current accessibility. No render-review execution or screenshot claimed.
- [uncertain] C2-05: Assessment answers were exposed in the initial whole-file read. Recomputed every bank item and formative task, with reasoning saved, but cannot certify a blind solve before consulting supplied answers. Owner must arrange fresh blind assessment verification.
- [uncertain] C2-06: Fresh reviewer did not author these bytes; actual reviewer session ID recorded from host. Author identity is only repair commit86531818, not an attested author session, and exact deployed model version is not exposed. Parent-supplied frozen manifest/session provenance was absent; reviewer prepared a clean current manifest instead. No qualified acceptance claim can rest on these substitutes.

## Notes from earlier jobs on this unit
- (gqur-300-u04-repair_en, repair_en, codex) Owner follow-ups remain for source support, shared glossary entries, current renders, fresh blind assessment verification and review provenance.
- (gqur-300-u04-repair_en, repair_en, codex) Owner follow-ups remain for source support, shared glossary entries, current renders, fresh blind assessment verification and review provenance.
- (gqur-300-u04-review_en, review_en, codex) Owner must resolve assessment and source-support concerns; current renders and a fresh blind solve remain pending. G3 stays open.
- (gqur-300-u04-review_en, review_en, codex) Owner must resolve assessment and source-support concerns; current renders and a fresh blind solve remain pending. G3 stays open.
- (gqur-300-u04-fix, fix, opencode) The G3 en-review row for GQUR-300 Unit 4 is stale and needs a fresh G3 run before certification.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Verified the 2026-11-08 G3 findings are already resolved on origin/main by d2ce30b33, appended the Unit 4 G3 tracker row naming the report, and committed it with the PHR.

## Outcome

- Impact: repair_en for GQUR-300 Unit 4 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the 2026-11-08 G3 findings are already resolved on origin/main by d2ce30b33, appended the Unit 4 G3 tracker row naming the report, and committed it with the PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Nov 8 G3 report's input-manifest hashes for the unit files do not match origin/main, so its findings were carried forward from the pre-repair state; a fresh G3 run against the committed bytes is needed before acceptance.
  - `glossary.json` (repo root) is outside this brief's scope, so Length/Mass/Capacity remain unbanked; the pipeline gate would fail if `<Glossary>` wrappers were added before the entries exist.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
