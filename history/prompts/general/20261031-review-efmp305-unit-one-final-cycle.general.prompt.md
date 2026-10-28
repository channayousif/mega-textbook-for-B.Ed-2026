---
id: 20261031
title: Review EFMP-305 Unit 1 final G3 cycle
stage: general
date: 2026-10-28
surface: agent
model: GPT-6 (exact deployed build unavailable)
feature: 014-agent-review-governance
branch: crew/efmp-305-u01-review_en
user: owner
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "g3-review", "efmp-305"]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/efmp-305/reviews/unit-01/G3/codex-01a17f6f.json
  - specs/content/efmp-305/reviews/unit-01/G3/codex-01a17f6f.summary.md
  - specs/content/efmp-305/reviews/unit-01/G3/codex-01a17f6f/
  - specs/content/efmp-305/tasks.md
  - static/content-status.json
  - history/prompts/general/20261031-review-efmp305-unit-one-final-cycle.general.prompt.md
tests:
  - npm run check:content
  - six mandatory npm review validators
  - node scripts/review-evidence.mjs validate
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Crew brief read verbatim:

# Crew job efmp-305-u01-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u01-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-305 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-01/`.

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

Completed final independent advisory G3 review. Prior findings resolved; remaining assessment, source and evidence defects escalated. Report validates and content gates pass. No G3/G5 certification or publication change.

## Outcome

- ✅ Impact: Input-bound final-cycle escalation with actionable evidence.
- 🧪 Tests: All six mandatory npm validators and all 13 content gates pass; JSON report structurally valid. Browser inspection unavailable under brief prohibition.
- 📁 Files: New report, summary and hashed logs; advisory row; necessary generated tracker digest; PHR.
- 🔁 Next prompts: Curriculum owner to resolve final-cycle defects and missing evidence.
- 🧠 Reflection: Deterministic gates do not establish marking correctness or source support.

## Handoff (for CEO and agents)

- Shipped / changed: Final-cycle advisory report and preserved previous finding history.
- Decisions the team must respect: No self-signing, no G3 completion, no third autonomous review; reviewed inputs unchanged. Brief explicitly requested advisory tracker row despite general skill prohibition.
- Pending / next owner: Curriculum owner: assessment/source defects, provenance and permitted current narrow/A4 render inspection; author and translator to reconcile repairs.
- Paperclip issues affected: Crew efmp-305-u01-review_en; no supplied ticket.

## Evaluation notes (flywheel)

- Failure modes observed: Previous review missed contradictory segregation marking, incorrect RRQ 5 remedies and bibliographic drift. Current run lacks exact model build and actual author session.
- Graders run and results (PASS/FAIL): PASS content gates and structural validation; academic outcome ESCALATE.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Owner-directed correction and permitted evidence completion, without an unauthorised additional cycle.
