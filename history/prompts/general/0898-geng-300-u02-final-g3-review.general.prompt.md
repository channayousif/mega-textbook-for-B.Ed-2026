---
id: 0898
title: GENG-300 Unit 2 final-cycle advisory English review
stage: general
date: 2026-10-28
surface: agent
model: GPT-6 (exact deployed snapshot unavailable)
feature: 014-agent-review-governance
branch: crew/geng-300-u02-review_en-r1
user: crew owner
command: Read .crew/brief.md and carry out the assigned independent G3 review
labels: ["codex", "crew", "geng-300", "g3-review"]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1.json
  - specs/content/geng-300/reviews/unit-02/G3/20261028-codex-r1/
  - specs/content/geng-300/tasks.md
  - static/content-status.json
tests:
  - npm run check:content (all 13 gates passed)
  - Six mandatory standalone deterministic checks (passed)
  - node scripts/review-evidence.mjs validate (escalate report structurally valid)
  - Local input manifest recomputation (96 matching inputs)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The delegated brief follows verbatim:

# Crew job geng-300-u02-review_en-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u02-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GENG-300 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-02/`.

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

Produced a new input-bound advisory escalation report, checked all earlier findings, recorded remaining assessment and evidence issues, and appended an unsigned in-progress tracker row. All content gates pass. G3 remains open.

## Outcome

- ✅ Impact: Independent final-cycle findings preserved without altering reviewed content or claiming certification.
- 🧪 Tests: All 13 content gates and six standalone checks pass; report contract validates. Browser/print and glyph measurement prohibited by crew brief, so unavailable evidence is explicitly escalated.
- 📁 Files: New JSON report, manifest, command logs and readable analyses; one advisory Unit 2 tracker row; refreshed generated tracker digest in static/content-status.json; this PHR.
- 🔁 Next prompts: Owner to resolve final-cycle escalation and provide authorised review/render provenance; no third routine cycle.
- 🧠 Reflection: Gate success does not establish assessment coverage, stimulus completeness, provenance or current rendering. Answers were exposed with questions, so no blind pre-key solve is claimed.

## Handoff (for CEO and agents)

- Shipped / changed: Final-cycle advisory G3 report and evidence; five prior findings resolved, old figure clearance advisory remains unverified after repair.
- Decisions the team must respect: Respect frozen inputs, review independence and exhausted cycle limit. No G3/G5 completion, signing, publication changes, push or PR.
- Pending / next owner: Curriculum owner: topic assessment minima, ERQ 3 stimulus, authority/source clarity, actual author run and exact model provenance; authorised host: current narrow/desktop/print and SVG geometry inspection.
- Paperclip issues affected: Crew job geng-300-u02-review_en-r1; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Tracker update caused a stale generated content-status check, corrected with npm run build:content-status; pre-key assessment protocol not met after combined page retrieval; parent handoff absent; visual checks prohibited. Report explicitly escalates rather than claiming pass.
- Graders run and results (PASS/FAIL): PASS: all content gates, six standalone validators, current input recomputation and JSON report schema. UNVERIFIED: rendered accessibility and glyph clearance.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Owner supplies a frozen, provenance-complete handoff and decides how to handle unresolved findings beyond the authorised final cycle.
