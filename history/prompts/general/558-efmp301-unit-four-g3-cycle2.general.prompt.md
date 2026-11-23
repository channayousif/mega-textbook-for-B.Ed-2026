---
id: 558
title: EFMP301 Unit4 G3 second review
stage: general
date: 2026-11-24
surface: agent
model: LongCat-2.5
feature: 022-author-efmp-301
branch: crew/efmp-301-u04-review_en-r1
user: owner via crew brief
command: crew efmp-301-u04-review_en-r1
labels: [claude, crew, g3-review, cycle-2]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/efmp-301/reviews/unit-04/G3/crew-cycle2-20261124.json
  - specs/content/efmp-301/reviews/unit-04/G3/crew-cycle2-20261124/
  - specs/content/efmp-301/tasks.md
  - static/content-status.json (tracker digest only)
  - history/prompts/general/558-efmp301-unit-four-g3-cycle2.general.prompt.md
tests:
  - Six mandatory deterministic review commands, all exit 0
  - npm run check:content, 14 of 14 gates pass
  - node scripts/measure-figure-text.mjs on 24 unit SVGs, exit 0
  - node scripts/review-evidence.mjs validate, escalate report valid
---

## Prompt

# Crew job efmp-301-u04-review_en-r1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u04-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-301 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efmp-301/reviews/unit-04/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efmp-301/unit-04/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFMP-301 4 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Response snapshot

Advisory cycle 2 escalates on the unavailable render and print evidence. Every finding
of the latest report was verified against the current bytes: the Vosniadou coverage
mismatch, the prose/figure factor list and the MCQ answer-position balance are
resolved; the render limitation is carried forward. No G3 sign-off, no signature.

## Outcome

- Impact: New input-bound advisory G3 evidence and an append-only open tracker row.
- Tests: Six mandatory checks exit 0; the full content suite passes 14/14; figure text
  measurement exits 0 on all 24 SVGs; the report validates as escalate.
- Files: New report, prepared manifest, summary, prior-findings, assessment solutions,
  limitations, advisory row and hashed logs; one advisory tracker row; the generated
  tracker digest; this PHR.
- Next prompts: Owner or a permitted host runs render-inspect on a build of this HEAD
  and adjudicates the two cosmetic wordmark collisions.
- Reflection: A stale production deploy is a review-input identity problem, not a
  content defect; the diff check settles it before any browser work.

## Handoff (for CEO and agents)

- Shipped / changed: Cycle-2 advisory G3 review of EFMP-301 Unit 4 at HEAD
  98fbbb064, with every prior finding accounted for.
- Decisions the team must respect: G3 remains open. No signature, acceptance, registry
  edit, content edit or publication change. The brief explicitly authorises the
  advisory tracker row despite the general reviewer prohibition.
- Pending / next owner: Render and print inspection on a build of this HEAD, plus owner
  adjudication of the carried render limitation and the two advisory notes.
- Paperclip issues affected: efmp-301-u04-review_en-r1 crew job; no issue ID supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Current browser inspection prohibited by the brief; the
  deployed SHA predates the reviewed HEAD, so the live site cannot stand in for the
  render input. Both are recorded limitations, not successful checks.
- Graders run and results (PASS/FAIL): PASS deterministic review commands and content
  suite; PASS report-format validation; ESCALATE semantic/evidence completeness.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Owner-directed render inspection on a
  permitted host, then a fresh independent G3 recheck if the owner authorises a cycle.
