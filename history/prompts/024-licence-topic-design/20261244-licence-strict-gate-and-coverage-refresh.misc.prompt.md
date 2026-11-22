---
id: 20261244
title: Close Feature 024 - strict licence gate, Urdu required in CI, blueprint coverage refreshed
stage: misc
date: 2026-11-22
surface: agent
model: claude-opus-5-5
feature: 024-licence-topic-design
branch: chore/024-licence-close
user: M Yousif Channa
command: licence headings plan
labels: [board-direct, licence]
links:
  spec: specs/024-licence-topic-design/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - package.json
  - .github/workflows/ci.yml
  - specs/content/licence-blueprint.md
  - specs/024-licence-topic-design/tasks.md
  - specs/028-news-ticker/tasks.md
tests:
  - LICENCE_REQUIRE_UR=1 npm run check:licence (57/57 objective pages, 67 pages)
  - node scripts/check-docs-sync.mjs
---

## Prompt

show me licence headings plan

yes, open the PR and merge when green

## Response snapshot

- Found Feature 024 essentially complete: all five headings (A 11, B 12, C 10 with EED-313
  migrated, D 16, E 8 objectives) have one page per objective plus a practice page, English and
  Urdu; the tasks were simply unticked.
- T032: `check:licence` no longer passes `--allow-missing` (strict run passes: 57/57 objective
  pages, 67 pages); CI's licence step sets `LICENCE_REQUIRE_UR=1`; the blueprint's Coverage status
  table is refreshed (3 covered, 34 partial, 20 authored) with the September figures kept as history.
- Checked first: the blueprint is not hashed by any intake manifest (four evaluations cite it by
  line, all above the edited section, so no cited line moved); `package.json` and `ci.yml` are not
  review-bound; `specs/decisions/log.md` left the manifest under ADR-0027 (reports bind only the
  rulings they cite), so today's appended decisions invalidated nothing.
- Ticked 024 T013, T020-T022, T030-T032 and 028 T026 (rollout done today).

## Outcome

- ✅ Impact: Feature 024 closed; a future licence page without its Urdu mirror now fails CI.
- 🧪 Tests: strict licence gate and docs-sync pass.
- 📁 Files: see front matter.
- 🔁 Next prompts: Notebook Studio's remaining items, or the social updates pilot.
- 🧠 Reflection: feature trackers drift when the crew finishes work; check the tree before planning.

## Handoff (for CEO and agents)

- Shipped / changed: strict licence gate, Urdu required in CI, coverage table refreshed, ticks.
- Decisions the team must respect: every licence page needs its Urdu mirror before it merges.
- Pending / next owner: Part I positioning (blueprint open item 3) stays an owner decision.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: unticked tasks made a finished feature look half done.
- Graders run and results (PASS/FAIL): check:licence strict PASS; docs-sync PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a weekly check that flags tasks whose files exist on main.
