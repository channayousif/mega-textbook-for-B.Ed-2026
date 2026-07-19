---
id: 0005
title: Amend constitution for English-only courses
stage: constitution
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: none
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["constitution", "bilingual", "content-policy"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - "n/a — governance document"
---

## Prompt

please note that there are some english only courses that do not require urdu translation like Functional english. edit the related artifacts

## Response snapshot

Article III.2's Urdu-parity requirement had been unconditional ("every student-facing unit MUST
have a complete, human-reviewed Urdu version before publish") — a non-negotiable clause with no
carve-out. Amended it to exempt courses explicitly designated English-only (the subject itself
being the English language, e.g. GENG-300 Functional English), flagged via a new `bilingual:
false` field in the course's `course-overview.mdx`. Bumped the constitution to v2.3.0 (MINOR —
narrows a non-negotiable obligation but invalidates no existing approved unit, since GENG-300 is
still unauthored/`coming_soon`), with a SYNC IMPACT REPORT enumerating every downstream artifact
touched in the companion 001-content-platform PHR.

## Outcome

- ✅ Impact: the bilingual mandate now has one documented, mechanism-backed exception rather than
  requiring silent policy drift or an unenforced editorial exemption.
- 🧪 Tests: n/a directly (governance text); the enforcement-side change and its test live in the
  companion content-platform PHR.
- 📁 Files: `.specify/memory/constitution.md` (Article III.2, SYNC IMPACT REPORT, version footer
  2.2.0 → 2.3.0).
- 🔁 Next prompts: none required; the mechanism (`bilingual: false`) is general — future
  English-only courses need only the same course-overview flag, no further constitution change.
- 🧠 Reflection: kept the constitution and its downstream artifacts in the same amendment rather
  than declaring the policy here and leaving the validator/spec to drift out of sync with it —
  consistent with Article IV.4's "spec drift is a defect."

## Evaluation notes (flywheel)

- Failure modes observed: none — this was a direct owner instruction, not a discovered gap.
- Graders run and results (PASS/FAIL): n/a (governance-only file); validator test in the
  companion PHR is PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
