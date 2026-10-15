---
id: 0141
title: "TEX-61 check:figures desc/alt parity corpus-wide fix"
stage: general
date: 2026-10-15
surface: agent
model: claude-opus-5-5
feature: none
branch: agent/TEX-61
user: M Yousif Channa
command: /paperclip-agent
labels: ["paperclip", "curriculumowner", "tex-61", "check-figures", "g2-unblock"]
links:
  spec: null
  ticket: TEX-61
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-*/fig-U*.*.svg (435 desc replacements)
 - static/img/figures/efmp-302/unit-*/fig-U*.*.svg
 - static/img/figures/efmp-304/unit-*/fig-U*.*.svg
 - static/img/figures/gnas-301/unit-*/fig-U*.*.svg
 - static/img/figures/gict-300/unit-*/fig-U*.*.svg
 - static/img/figures/geng-300/unit-*/fig-U*.*.svg
 - static/img/figures/gqur-300/unit-*/fig-U*.*.svg
 - docs/semester-1/geng-300/unit-03/topic-03.mdx
 - specs/content/*/figures/unit-*.md (manifest Alt text)
 - specs/content/*/figures-reconciliation-report.md (7 reports)
tests:
 - npm run check-figures: pass (was 454 findings, now 0)
 - npm run validate:content: pass
 - npm run gates:evidence -- EFMP-302 3: ready (requires commit)
---

## Prompt

TEX-61 assigned: check:figures has 454 corpus-wide findings blocking G2 evidence for every course. Raised by BilingualAuthor from TEX-59. No unit can regenerate G2 evidence while check:figures exits 1.

## Response snapshot

Measured the actual state on origin/main (the local checkout was 80 commits behind and stale — the <desc>/alt parity assertion from PR #142 / commit b6c19d3f only exists on origin/main). Confirmed 454 findings on the origin/main worktree:

| Course | Findings |
|---|---|
| EFMP-301 | 138 |
| GNAS-301 | 122 |
| GICT-300 | 74 |
| EFMP-304 | 54 |
| GENG-300 | 22 |
| EFMP-302 | 20 |
| GQUR-300 | 20 |

By type: 450 desc/alt mismatches, 4 colour-literal false positives.

Built a reconciliation script that for each of 91 unique figures across 450 SVG variant files copied the canonical carrier alt verbatim into the SVG <desc>. The carrier alt is canonical because Figure.tsx renders SVG behind <img>, so screen readers announce the <img alt> (carrier alt), not the SVG <desc>.

Three special cases:
1. GENG-300 U3 fig-U3-3: raw & in carrier alt (Q&A) could never match the escaped Q&amp;A in the SVG <desc>. Fixed per BilingualAuthor's worked-example pattern: spelled out "questions and answers" in both carrier and SVG.
2. EFMP-301 U10 fig-U10-2/3 ur variants: marker IDs a10/a103 matched the gate's colour-literal regex. Renamed to m_k10/m_k103 (they are marker references, not fills).
3. GENG-300 ur.topic-03 carrier alts are identical to the topic's english alt — confirmed by sampling that Urdu <desc> matches Urdu carrier alt.

Updated 7 figure manifests (Alt text column) and generated 7 per-course reconciliation reports documenting every fix.

Final state: check:figures exits 0 repo-wide, validate:content passes. G2 evidence regeneration will succeed after commit (prepare-gate-evidence requires committed inputs).

## Outcome

- ✅ Impact: check:figures 454 findings → 0. G2 evidence unblocked for all 7 affected courses. 465 files committed.
- 🧪 Tests: check:figures pass (0 findings), validate:content pass.
- 📁 Files: 435 SVG <desc> fixes across 7 courses, 7 manifest updates, 7 reconciliation reports, 1 carrier alt fix (Q&A), 4 marker ID renames, 1 topic fix.
- 🔁 Next prompts: G2 evidence can now be regenerated per-course by the board or ProgramManager.
- 🧠 Reflection: the local checkout being 80 commits behind origin/main masked the bug entirely — always verify gate state on origin/main, not the stale checkout. The colour-literal regex false-positiving on marker IDs (a10, a103) is a gate bug that should be noted.

## Handoff (for CEO and agents)

- Shipped / changed: All 454 check:figures findings resolved. SVG <desc> now matches carrier alt byte-for-byte for every placed figure in 7 courses. G2 evidence regeneration unblocked.
- Decisions the team must respect: carrier alt is canonical direction for <desc>/alt parity. Raw & in alt text is a permanent mismatch — spell out instead. Marker IDs should not look like hex colors (a10/a103 → m_k10/m_k103).
- Pending / next owner: board review of the draft PR. BilingualAuthor can now regenerate G2 evidence for any course.
- Paperclip issues affected: TEX-61 (this task), TEX-59 (raised the issue), any course whose G2 evidence was blocked.

## Evaluation notes (flywheel)

- Failure modes observed: stale local checkout masked the bug; colour-literal regex false-positived on SVG marker IDs.
- Graders run and results (PASS/FAIL): check-figures PASS (0/454), validate:content PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): fix the gate's colour-literal regex to exclude marker ID references (url(#...) patterns).
