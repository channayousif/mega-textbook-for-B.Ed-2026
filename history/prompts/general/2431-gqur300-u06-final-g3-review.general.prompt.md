---
id: 2431
title: GQUR-300 Unit 6 final G3 advisory review
stage: general
date: 2026-10-28
surface: agent
model: GPT-6 (host-declared family)
feature: 014-agent-review-governance
branch: crew/gqur-300-u06-review_en
user: crew owner
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "crew", "g3-review", "cycle-2"]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/gqur-300/tasks.md
  - specs/content/gqur-300/reviews/unit-06/G3/codex-cycle2-20261028.json
  - specs/content/gqur-300/reviews/unit-06/G3/codex-cycle2-20261028.summary.md
  - specs/content/gqur-300/reviews/unit-06/G3/codex-cycle2-20261028/
  - history/prompts/general/2431-gqur300-u06-final-g3-review.general.prompt.md
tests:
  - npm run check:content (baseline and final)
  - Six mandatory non-render validators individually
  - node scripts/review-evidence.mjs validate (escalate)
  - Manifest recomputation equality
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief delegated by that prompt (verbatim):

# Crew job gqur-300-u06-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u06-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GQUR-300 Unit 6 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

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


## Response snapshot

Produced a structurally valid final-cycle escalate report, current digest manifest, criterion evidence, complete prior-finding disposition table, real command logs and advisory tracker row. Kept G3 open and did not edit content inputs.

## Outcome

- ✅ Impact: Rechecked every previous finding; A1/S1/F1 fixed, S2 partial; remaining source, arithmetic, readability and evidence limitations escalated.
- 🧪 Tests: Baseline and final content gates; individual six validators; report structural validation. First final check failed generated content-status freshness after tracker append; refreshed ignored artifact with npm run build:content-status and reran. Browser inspection prohibited by brief, so no pass or certification.
- 📁 Files: Append-only review evidence, one advisory Unit 6 tracker row, this PHR.
- 🔁 Next prompts: Curriculum owner resolves final-cycle escalation; separate author handles content repairs; no automatic third cycle.
- 🧠 Reflection: Green structural gates do not establish semantic correctness. Assessment recomputation was not blind because supplied answers were displayed first; report states this limit.

## Handoff (for CEO and agents)

- Shipped / changed: Unsigned escalate report, 98-input local manifest, real validator logs, source and assessment notes, advisory tracker entry.
- Decisions the team must respect: No G3/G5 completion, signing or publication. Current render evidence and protected qualification remain required. Reviewed inputs unchanged. Final review cycle exhausted.
- Pending / next owner: Curriculum owner: remaining U6-05 citation grounding, McClure and Steen support, RRQ-09 average, budget order, key terms and missing render/provenance evidence. G5 dependency remains unresolved.
- Paperclip issues affected: No ticket supplied; existing tracker cites G-2026-30 for G5 dependency.

## Evaluation notes (flywheel)

- Failure modes observed: Prior repairs fixed teacher-ratio arithmetic and citation presence but retained unsupported source claims and inconsistent summaries. Required build/browser inspection prohibited. Tout retrieval timed out twice. Exact platform session/model provenance unavailable.
- Graders run and results (PASS/FAIL): PASS baseline/final content gates and six individual validators; PASS structural report validation; UNVERIFIED current renders and blind-solve procedure.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Owner-led resolution with bound primary-source passages and current desktop/narrow/A4 artifacts on an authorised host.
