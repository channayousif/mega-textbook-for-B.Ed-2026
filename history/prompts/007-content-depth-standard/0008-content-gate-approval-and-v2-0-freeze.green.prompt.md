---
id: 0008
title: Content gate approval and v2.0 freeze
stage: green
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 007-content-depth-standard
branch: 007-content-depth-standard
user: channayousif@gmail.com
command: /sp.implement (continuation)
labels: [content-pipeline, depth-standard, content-gate, v2.0-freeze, done]
links:
  spec: specs/007-content-depth-standard/spec.md
  ticket: null
  adr: history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md
  pr: null
files:
 - specs/content/efmp-302/tasks.md
 - specs/content/style-guide.md
 - specs/007-content-depth-standard/tasks.md
 - specs/007-content-depth-standard/quickstart.md
 - history/prompts/007-content-depth-standard/0008-content-gate-approval-and-v2-0-freeze.green.prompt.md
tests:
 - full suite: npx vitest run → 45/45 pass
---

## Prompt

User (acting as curriculum owner):
"1. reviewed and approve
2. do it"

i.e. the human Content gate (T013 + T036) is passed — complete the remaining gated tasks.

## Response snapshot

- **T013 / T036 (Content gate, curriculum owner "YM", 2026-08-27):** the re-drafted EFMP-302
  Unit 1 (five EN files) and the expanded `efmp-302/content-spec.md` are approved.
  `specs/content/efmp-302/tasks.md` Unit 1 `G2 en-draft` and `G3 en-review` set `▣ → ✅ | YM`;
  the header note updated to record the Content-gate clearance. G4/G5 remain `▢` (Urdu
  re-translation is downstream, FR-016). EN files keep `translation_status: draft` — Spec 001's
  parity gate only engages at `reviewed`, and the Urdu mirror is not yet re-translated; both
  locales return to `reviewed` together when G5 completes.
- **T032:** `specs/content/style-guide.md` front matter `version: "1.0" → "2.0"`; intro note
  updated (single freeze marker for the style-guide + `terminology.csv` pair; `terminology.csv`
  has no version field; v2.0 adds the two depth-standard sections).
- **T033:** `git diff --stat` confirms `terminology.csv` is untouched; the
  `style-guide-frontmatter.schema.json` `^[0-9]+\.[0-9]+$` pattern matches `"2.0"`;
  `check:pipeline-gate` re-run — green.

**All 41 tasks complete.** Final gate status (CI-equivalent):

| Gate | Result |
|---|---|
| `npm run validate:content` | ✓ |
| `npm run check:pipeline-gate` | ✓ (was RED pre-T036; now green) |
| `npm run check:depth-gate` | ✓ |
| `npm run check:no-answer-keys` | ✓ |
| `npm run check:add-course` | ✓ |
| `npx vitest run` | ✓ 45/45 |

## Outcome

- ✅ Impact: Feature 007 is done. The content depth standard is frozen at style-guide v2.0,
  its CI gate is live, the `author-unit` skill is in place, and EFMP-302 Unit 1 is the proven
  working depth exemplar (14/14 concept coverage, 7 cited sources). Branch is mergeable — all
  required CI gates green.
- 🧪 Tests: 45/45.
- 📁 Files this turn: `efmp-302/tasks.md`, `style-guide.md` (v2.0), feature `tasks.md`
  (T013/T032/T033/T036 checked), feature `quickstart.md` (results note).
- 🔁 Next: open the PR (CI should be fully green). Downstream, tracked in `specs/backlog.md`:
  EFMP-301 Unit 1 v2.0 re-proof (Constitution Art. VI.1 — the immediate-next content task),
  EFMP-302 Unit 1 Urdu re-translation + G4/G5, EFMP-302 Units 2–6 v2.0 re-drafts.
- 🧠 Reflection: keeping EN `translation_status: draft` through the EN-review-passed / UR-not-yet
  window is the small modelling call that lets the pipeline gate and the parity gate both stay
  green without a validator change — the tracker (`G3 ✅`) carries the "EN reviewed" fact, the
  front-matter field carries the stronger "bilingual parity complete" fact.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders: all six CI-equivalent gates PASS; unit suite 45/45.
- Prompt variant: n/a
- Next experiment: when EFMP-301 Unit 1 is re-proofed, compare its checklist size and
  reading-minutes band to EFMP-302 Unit 1's — the golden unit's numbers become the reference
  the style guide can cite as a worked example of "how deep is deep enough" (SC-008).
