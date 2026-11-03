---
id: crew-efmp-303-u04-repair_en
title: crew repair_en EFMP-303 unit 4
stage: misc
date: 2026-11-03
surface: agent
model: codex
feature: efmp-303
branch: crew/efmp-303-u04-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-303/unit-04/topic-01.mdx
 - docs/semester-2/efmp-303/unit-04/topic-02.mdx
 - history/prompts/general/20261116-repair-efmp303-unit04-g3.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/topic-02.mdx
 - specs/content/efmp-303/concepts/unit-04.md
 - specs/content/efmp-303/reviews/unit-04/G2/20261103T065114781Z-gates.json
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261103T065114781Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261103T065114781Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261103T065114781Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261103T065114781Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261103T065114781Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261103T065114781Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261103T065114781Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-04/G2/logs-20261103T065114781Z/validate-content.txt
 - specs/content/efmp-303/reviews/unit-04/G3/repair-handoff-20261103.md
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u04-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u04-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-303/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-04/`.

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
From `specs/content/efmp-303/reviews/unit-04/G3/20261102T212207Z-g3-desk-a0d82ff4.json` (disposition: revise). Resolve each one:
- [blocking] render-review step could not be performed: the review host forbids running npm run build or a dev server, which is required to produce rendered HTML for visual inspection (small-screen layout, A4 print views, figure clipping). This is a required command for a passing report under the evidence contract. Disposition escalated on this limitation.
- [advisory] Topic 4.2 line 36 cites (Government of Pakistan, 2009) for a specific numerical claim (below 2.5 per cent GDP, 4 per cent commitment) but the source is declared unverifiable in sources/unit-04.md with title-and-catalogue-level support only. The declaration understates the reliance. Verify the claim against the NEP 2009 PDF or rephrase to remove the specific citation.
- [advisory] Topic 4.1 line 38 cites (Coombs, 1970) for a specific conceptual claim about the M&E cycle but the source is declared unverifiable in sources/unit-04.md. The prose uses it beyond title-and-catalogue-level support as declared. Consider verifying the claim against the open UNESDOC text or rephrasing to a general statement without a specific citation.
- [advisory] Concept-graph concepts CON:EFMP-303-4-3 label reads M&E process process (duplicate word) and its SLO refs are SLO:EFMP-303-4-1 only, not SLO:EFMP-303-4-2. Minor labeling issue in specs/content/efmp-303/concepts/unit-04.md line 7.

## Notes from earlier jobs on this unit
- (efmp-303-u04-fix, fix, opencode) G3 en-review remains open and flagged stale  -  needs a fresh independent G3 run. Translation_status stays draft across all 5 mirror files pending G5.
- (efmp-303-u04-translate-r1, translate, agy) All 4 .ur.svg figure variants and derived dark variants are wired in topics 1-2 with passing figures:variants:check.
- (efmp-303-u04-translate-r1, translate, agy) Full structural, heading, component, and bank-bound key_terms parity verified clean under temporary reviewed flip.
- (efmp-303-u04-translate-r1, translate, agy) translation_status remains draft across all 5 mirror files pending independent G5 review.
- (efmp-303-u04-translate, translate, agy) All 4 .ur.svg figure variants and derived dark variants are wired in topics 1-2 with matching carrier alt text and passing figures:variants:check.


## Response snapshot

Repaired EFMP-303 Unit 4 citation reliance in English and Urdu, corrected its concept label, and committed advisory tracking and refreshed draft evidence.

## Outcome

- Impact: repair_en for EFMP-303 Unit 4 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired EFMP-303 Unit 4 citation reliance in English and Urdu, corrected its concept label, and committed advisory tracking and refreshed draft evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Render inspection remains blocked by host restrictions; G3 stays unticked pending independent review.
  - Render inspection remains blocked by host restrictions; G3 stays unticked pending independent review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
