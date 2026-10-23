---
id: 20261023-gsos-301-u03-independent-review
title: Review GSOS-301 Unit 3 independently
stage: misc
date: 2026-10-23
surface: agent
model: GPT-6 (Codex; exact build unavailable)
feature: gsos-301
branch: crew/gsos-301-u03-review_en
user: crew
command: read .crew/brief.md and execute
labels: ["board-direct", "crew", "codex", "G3", "advisory"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
 - specs/content/gsos-301/reviews/unit-03/G3/01a16968-f1c8-7233-add1-497c86787970.json
 - specs/content/gsos-301/reviews/unit-03/G3/crew-review-20261023/
 - specs/content/gsos-301/tasks.md
 - history/prompts/gsos-301/20261023-gsos-301-u03-independent-review.misc.prompt.md
tests:
 - Six mandatory deterministic review checks passed
 - npm run check:content (initial and final)
 - npm run check:content on detached origin/main
 - node scripts/review-evidence.mjs validate (escalate report)
 - Prepared input-manifest digest equality (88 paths)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

### Referenced brief (verbatim)

# Crew job gsos-301-u03-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u03-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GSOS-301 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-03/`.

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

Completed an independent advisory G3 review of Unit 3 with disposition escalate. The report validates structurally and records role-conflict/strain errors, missing figures, assessment blueprint and scoring defects, citation and concept-mapping defects, plus provenance and browser limitations. Added the explicitly requested advisory tracker row with G3 unchecked. Full content gates reproduce main's sole stale content-status finding; no input content was repaired by its reviewer.

## Outcome

- Impact: Concrete repair requests and auditable unsigned evidence for the next author/reviewer.
- Tests: Six required deterministic checks pass; initial/full final suite compared to origin/main; report validation passes.
- Files: Review JSON, readable summary, manifest, assessment derivation, source inspection, command logs, advisory tracker row and this PHR.
- Next prompts: Separate author and visual repair jobs, then fresh independent review with complete provenance and permitted render tools.
- Reflection: Gate success did not establish figure existence when the manifest remained prompt-only.

## Handoff (for CEO and agents)

- Shipped / changed: Advisory escalation with input digests, passage/item-specific repairs, real command logs and unchecked tracker row.
- Decisions the team must respect: No G3/G5 completion, signing, publication or translation-status change; approved-spec conceptual correction belongs to its owner; reviewer did not revise review inputs. The brief explicitly authorises only the advisory tracker row despite the skill's normal tracker prohibition.
- Pending / next owner: Author fixes role distinction, assessments, support and mappings; visual producer supplies four assets; owner handles approved-spec correction; review host supplies author run ID, frozen source evidence and browser/print inspection. Shared stale content-status failure predates this branch.
- Paperclip issues affected: none supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Conceptual misinformation shared by prose/key/spec; absent SVGs missed by figure gate; incomplete source and provenance evidence; render tools forbidden by brief.
- Graders run and results (PASS/FAIL): Six required deterministic checks PASS; report schema PASS; full content suite FAIL only stale content-status on both branch and origin/main.
- Prompt variant (if applicable): crew gsos-301-u03-review_en.
- Next experiment (smallest change to try): Separate author repairs MCQ3 and its taught role distinction before a fresh bound review.
