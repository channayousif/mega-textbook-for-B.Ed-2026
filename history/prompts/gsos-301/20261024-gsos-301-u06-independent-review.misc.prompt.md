---
id: 20261024-gsos-301-u06-independent-review
title: Review GSOS-301 Unit 6 independently
stage: misc
date: 2026-10-24
surface: agent
model: Gemini 3.8 Flash (High)
feature: gsos-301
branch: crew/gsos-301-u06-review_en
user: crew
command: read .crew/brief.md and execute
labels: ["board-direct", "crew", "agy", "G3", "advisory"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/gsos-301/reviews/unit-06/G3/a90a7de2-a9f8-4abe-9afa-e66589e688ca.json
  - specs/content/gsos-301/reviews/unit-06/G3/manifest.json
  - specs/content/gsos-301/reviews/unit-06/G3/summary.md
  - specs/content/gsos-301/reviews/unit-06/G3/logs-a90a7de2/
  - specs/content/gsos-301/tasks.md
  - static/content-status.json
  - history/prompts/gsos-301/20261024-gsos-301-u06-independent-review.misc.prompt.md
tests:
  - npm run check:content (13 of 13 gates pass)
  - node scripts/review-evidence.mjs validate specs/content/gsos-301/reviews/unit-06/G3/a90a7de2-a9f8-4abe-9afa-e66589e688ca.json (passes)
  - Six required deterministic checks passed (validate:content, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys, check:docs-sync)
  - node scripts/measure-figure-text.mjs static/img/figures/gsos-301/unit-06/*.svg (all 8 SVGs pass)
  - Prepared input-manifest digest equality (96 paths)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

### Referenced brief (verbatim)

# Crew job gsos-301-u06-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u06-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GSOS-301 Unit 6 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-06/`.

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

Completed an independent advisory G3 review of GSOS-301 Unit 6 with disposition `escalate`. The report validates structurally against the Spec 014 review evidence contract and records: visual render inspection unperformed due to job execution constraints (brief prohibits build/server/browser); citation misattribution of Pakistani media demographics to LibreTexts; minor typo in Sialkot; coverage and concept graph mapping misalignments (RRQ-07 vs RRQ-08 for media); and missing dated retrieval attempts under unverifiable sources. Updated tasks.md with the explicitly requested advisory tracker row (G3 remaining unchecked `▢`, reviewer `agent:agy`, and no certification claimed) and rebuilt static/content-status.json. All 13 content gates pass cleanly.

## Outcome

- Impact: Actionable repair notes for author/visual jobs and auditable G3 advisory review evidence produced without violating independence or self-certification rules.
- Tests: 13 of 13 content gates PASS; node scripts/review-evidence.mjs validate PASS; six required deterministic checks PASS; figure text measurement PASS.
- Files: G3 evidence report JSON, manifest.json, summary.md, 8 command logs, updated tasks.md, rebuilt content-status.json, and this PHR.
- Next prompts: Separate author repair job for citation, typo, and mapping fixes; separate visual review job with permitted browser tools for live 360px and A4 print verification.
- Reflection: The unit is pedagogically strong and well-structured, but execution limits properly prevent claiming visual accessibility without live render verification.

## Handoff (for CEO and agents)

- Shipped / changed: G3 review evidence bundle under specs/content/gsos-301/reviews/unit-06/G3/; advisory escalate row in tasks.md; regenerated content-status.json.
- Decisions the team must respect: G3 remains unchecked (`▢`); reviewer identity recorded as `agent:agy`; no human initials or certification; reviewer did not edit candidate content.
- Pending / next owner: Author fixes citation (Hammond & Cheney for Pakistan media reach), Sialkit typo, and coverage/concept reinforcement mapping rows; visual reviewer runs permitted browser inspection.
- Paperclip issues affected: null.

## Evaluation notes (flywheel)

- Failure modes observed: American sociology textbook cited for Pakistani demographic data; minor reinforcement mapping discrepancies between coverage table and assessment items.
- Graders run and results (PASS/FAIL): check:content 13 PASS; validate report PASS; deterministic commands PASS.
- Prompt variant (if applicable): crew gsos-301-u06-review_en.
- Next experiment (smallest change to try): Author replaces Hammond & Cheney citation in topic-02.mdx line 58 with Pakistani empirical source.
