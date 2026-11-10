---
id: crew-gqur-300-u02-repair_en-r1
title: crew repair_en GQUR-300 unit 2 r1
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: gqur-300
branch: crew/gqur-300-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/gqur-300/unit-02/topic-03.mdx
  - docs/semester-1/gqur-300/unit-02/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/unit-assessment.mdx
  - specs/content/gqur-300/reviews/unit-02/G2/20261110T054829615Z-gates.json
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261110T054829615Z/check-bloom-bands.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261110T054829615Z/check-concept-graph.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261110T054829615Z/check-depth-gate.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261110T054829615Z/check-docs-sync.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261110T054829615Z/check-figures.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261110T054829615Z/check-no-answer-keys.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261110T054829615Z/check-no-em-dash.txt
  - specs/content/gqur-300/reviews/unit-02/G2/logs-20261110T054829615Z/validate-content.txt
  - specs/content/gqur-300/reviews/unit-02/G3/repair-en-20261110.md
  - specs/content/gqur-300/tasks.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

# Crew job gqur-300-u02-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-300/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-02/`.

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
From `specs/content/gqur-300/reviews/unit-02/G3/20261108T203238Z-g3-desk-9e1e2df2.json` (disposition: revise). Resolve each one:
- [blocking] N01: topic-03.mdx:41-42 and :55 says exponent counts multiplications. For positive integer powers it counts factors: 2^3 has three factors and two multiplication operations. Repair both statements to explain number of times base appears as a factor; otherwise the definition contradicts its own example.
- [blocking] N02: unit-assessment.mdx:210-214 ERQ-04 conversion rubric awards 0-3, one mark per two correct, for five conversions. This yields two whole marks (or 2.5 fractionally), with no specified way to earn three, despite stated total seven. Define a complete partial-credit rule with full three for all five correct.
- [advisory] P05 carried partly: unit-assessment.mdx:137-139 still asks which raw score looked most impressive but performed worst; 55 is the largest raw score, 42/60 is second-largest and lowest percentage. Teacher notes:60-61 now correct. Reword assessment stem consistently.
- [advisory] P06 carried: topic-01.mdx NCC n.d. remains although historical Progression Grid title gives 2022-23. Owner editorial call; not a new blocking defect.
- [advisory] P07 carried: Root and Operation absent from inspected glossary.json; Square root covers part of Root. Glossary is not bound, so this is supplementary and needs bound evidence before acceptance.
- [advisory] P08 carried: nine RRQs reuse formative/examples and ERQ-01/02/03 repeat topic tasks. Consider varying numbers/contexts; no novelty requirement found.
- [advisory] N03: topic-01.mdx Activity: The bazaar ledger mixes kg stock and rupee amounts, then asks for one number line and closing position without unit conversions, prices or opening balance. Tutor should supply a dimensionally consistent cash ledger or separate stock/cash ledgers and specify opening values.
- [advisory] N04: topic-03.mdx:86-90 asks which tile size wastes least cutting; all three divide 12m by 9m exactly, so all have zero cutting waste. Accept a tie explicitly and clarify that 64 tiles cover areas 16,64,144 square metres, rather than asking how many tiles a tile budget covers.
- [advisory] P09 outside scope: old Unit 3 build failure not reverified because no build allowed. Do not infer it persists. No Unit 3 files changed.
- [uncertain] E01: No current rendered desktop, narrow-view or A4 print evidence. Crew brief prohibits builds, servers and Playwright. fig-U2-1 source repair is present but prior clipping finding cannot be visually closed. See render-limitation.txt. Owner must arrange permitted inspection; accessibility remains unverified.
- [uncertain] E02: Parent did not supply actual author-run or reviewer-session identities or exact model build. Historical report uses author commit c1634c8; current authoring/repair provenance is tracked by commits 3590d6c9,704aa823,96f35fa3,d15cfba8. This fresh Codex session authored none of those inputs. Job name is a job identifier, not attested conversation provenance. Manifest was prepared locally over clean HEAD, not supplied by parent. Do not treat commit/job labels as verified session independence; obtain host provenance before acceptance.
- [uncertain] E03: topic-03.mdx:63-65 attributes an exact operation-choice definition to Gula and Lovric; bound sources/texts/gula2025.md supports task-category distinction and transfer, not that definition. Publisher abstract does not establish the stronger attribution and full text is subscription-only. sources/unit-02.md declares none unverifiable and calls this source open access. Obtain supporting passage and accurate access disclosure or narrow attribution; see source-inspection.md. Old missing-citation finding is repaired only as to presence.
- [uncertain] E04: Prepared manifest omits glossary.json, terminology.csv, NCC and OpenStax source-text excerpts, despite skill requiring these dependencies. Historical source artifacts and publisher lookup are supplementary, not accepted bound inputs. No full OpenStax explanatory passages verified in this attempt. Request authoritative source evidence and corrected bundle through owner; do not modify input policy in this review.

## Response snapshot

Repaired Unit 2 definitions and assessment stems in English and mirrored in Urdu, created repair handoff record, refreshed G2 draft gate evidence, and appended the Unit 2 G3 and G2 tracker rows in tasks.md.

## Outcome

- Impact: repair_en for GQUR-300 Unit 2 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before commit.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Clarified exponent definitions in topic 2.3 and aligned ERQ-04 stem with teacher notes in unit assessment in English and Urdu, recorded findings disposition in repair-en-20261110.md, refreshed Unit 2 G2 gate evidence, and updated tasks.md tracker rows.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3/G5 remain open; owner must resolve render, provenance, source-bundle and editorial evidence needs recorded in the repair handoff.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
