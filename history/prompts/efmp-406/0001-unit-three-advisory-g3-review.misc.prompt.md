---
id: 1
title: EFMP-406 Unit 3 independent advisory G3 review
stage: misc
date: 2026-11-02
surface: agent
model: GPT-6 (Codex; deployed revision not exposed)
feature: efmp-406
branch: crew/efmp-406-u03-review_en
user: crew
command: carry out .crew/brief.md
labels: [codex, crew, efmp-406, G3, advisory]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/efmp-406/reviews/unit-03/G3/01a19c22-e969-7f80-81b7-f2e304f416df.json
  - specs/content/efmp-406/reviews/unit-03/G3/01a19c22-e969-7f80-81b7-f2e304f416df.summary.md
  - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/
  - specs/content/efmp-406/tasks.md
  - history/prompts/efmp-406/0001-unit-three-advisory-g3-review.misc.prompt.md
tests:
  - npm run check:content (all 13 gates pass)
  - six mandatory deterministic review commands (all exit 0)
  - node scripts/review-evidence.mjs validate (valid escalation report)
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The invoked brief, verbatim:

# Crew job efmp-406-u03-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u03-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-406 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-03/`.

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

Produced an input-bound advisory G3 escalation report, readable summary, real command logs, complete assessment comparison notes and provenance/presentation/source limitations. Recorded an open advisory tracker row. All 13 content gates pass. No unit inputs were repaired by the reviewer and no gate was certified.

## Outcome

- Impact: independent review of Unit 3 with precise author repair requests and explicit evidence gaps.
- Tests: mandatory deterministic commands pass; full content suite passes after refreshing ignored static/content-status.json following the tracker addition; report structurally validates as escalate. Browser/print/geometry inspection prohibited by the brief and not claimed.
- Files: new review evidence directory, report, summary, this PHR and one advisory tracker row.
- Next prompts: separate author repairs, host source/provenance preparation and fresh independent review.
- Reflection: structural validity is insufficient for source support or accessibility. The initial assessment read exposed guidance before a written blind solve; the report discloses that limitation rather than claiming strict independent solve compliance.

## Handoff (for CEO and agents)

- Shipped / changed: unsigned advisory escalation with all seven criteria and saved evidence; G3 stays open.
- Decisions the team must respect: confirmed D-2026-0075 settles earlier intake escalations; do not reopen them from historical text. Do not treat commit IDs as actual author session identities. No authoring, signing, qualification, acceptance or publication occurred.
- Pending / next owner: author repairs source provenance, unsupported claims, dense language/glossary, fictional civic documents and assessment demand/rubrics; crew lead supplies actual author run identity and primary sources in a frozen bundle; authorized host obtains browser and print evidence; fresh reviewer repeats blind assessment solving.
- Paperclip issues affected: none supplied; crew job efmp-406-u03-review_en.

## Evaluation notes (flywheel)

- Failure modes observed: local source excerpts not included in generated G3 manifest; Papen Unit 3 quotation blocks do not match primary passages; Ashraf text unavailable; exact author run/model revision absent; browser work forbidden; assessment solve protocol not fully preserved.
- Graders run and results (PASS/FAIL): check:content PASS; six deterministic commands PASS; review evidence validation PASS for escalate; rendering UNVERIFIED.
- Prompt variant (if applicable): crew brief efmp-406-u03-review_en.
- Next experiment (smallest change to try): provide source passages and questions without answers to a fresh reviewer after bounded author repairs.
