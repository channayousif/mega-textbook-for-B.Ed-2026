---
id: 0048
title: Author GSOS-301 Unit 5 social institutions
stage: green
date: 2026-10-23
surface: agent
model: claude-opus-5-5
feature: gsos-301
branch: crew/gsos-301-u05-author
user: M Yousif Channa
command: crew job gsos-301-u05-author (author-unit skill)
labels: ["crew", "claude", "author-unit", "gsos-301", "unit-05"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-05/index.mdx
 - docs/semester-2/gsos-301/unit-05/topic-01.mdx
 - docs/semester-2/gsos-301/unit-05/topic-02.mdx
 - docs/semester-2/gsos-301/unit-05/unit-assessment.mdx
 - docs/semester-2/gsos-301/unit-05/unit-teacher-notes.mdx
 - static/img/figures/gsos-301/unit-05/fig-U5-1..4.svg (+ .dark.svg)
 - specs/content/gsos-301/coverage/unit-05.md
 - specs/content/gsos-301/sources/unit-05.md
 - specs/content/gsos-301/figures/unit-05.md
 - specs/content/gsos-301/concepts/unit-05.md
 - specs/content/gsos-301/reviews/unit-05/G2/20261022T202830186Z-gates.json (+ logs)
 - specs/content/gsos-301/tasks.md
 - glossary.json
tests:
 - npm run check:content (12/13 pass; check:content-status fails identically on origin/main)
 - node scripts/prepare-gate-evidence.mjs GSOS-301 5 (all draft commands PASS)
 - MDX compile of all five unit files with @mdx-js/mdx + remark-gfm (ok)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(Brief: crew job gsos-301-u05-author - author GSOS-301 Unit 5 from its approved content-spec following the author-unit skill end to end, English only; continue earlier work on the branch; check:content must report no finding origin/main does not; commit, do not push or open a PR.)

## Response snapshot

Rebased the branch onto origin/main (stale untracked copies of main files removed after a byte-for-byte check; glossary conflict resolved by keeping both sides). Revised the opencode draft: corrected OpenStax chapter/section citations (14, 15.1, 16.2, 17.1, 18, 19.1-19.2), taught manifest/latent functions, hidden curriculum, Weber's power/authority types and institutional change, rebuilt the 10/10/5 bank to the 5/5 per-topic blueprint with matched answers and 10-mark analytic ERQ rubrics, and fixed pacing to Weeks 11-12. Hand-authored four schematic SVGs (two concept maps, two tables), rendered previews to check layout, derived dark variants, placed them as `<Figure>`. Updated coverage, sources, concepts (14 concepts, every item mapped) and 10 glossary entries; reading minutes 46 (band 45-60). G2 evidence recorded.

## Outcome

- ✅ Impact: GSOS-301 Unit 5 English draft complete and at standard; G2 en-draft evidence recorded.
- 🧪 Tests: check:content 12/13 (content-status stale on main too); G2 evidence all PASS; MDX compiles.
- 📁 Files: 5 unit MDX files, 8 SVGs, 4 governance tables, tracker, glossary, G2 evidence.
- 🔁 Next prompts: G3 independent English review; then G4 Urdu translation with `.ur.svg` figure labels.
- 🧠 Reflection: the figures gate now requires rendered `<Figure>` elements, so author-unit jobs must also produce schematic SVGs, not just prompt-only markers.

## Handoff (for CEO and agents)

- Shipped / changed: GSOS-301 Unit 5 English content, figures and governance artefacts on branch `crew/gsos-301-u05-author` (unpushed).
- Decisions the team must respect: G3 not marked; no self-review. Pakistani worked-example facts (Lady Health Worker programme 1994 start, low-fee private school spread, Council of Islamic Ideology advisory role) are recorded as `no-external-source` for a reviewer to confirm.
- Pending / next owner: G3 reviewer (independent); translate job for Urdu mirror and `.ur.svg` labels; `static/content-status.json` staleness is a main-wide issue owned by crew lead.
- Paperclip issues affected: none (Paperclip retired; crew job).

## Evaluation notes (flywheel)

- Failure modes observed: worktree carried 328 untracked copies of origin/main files that blocked a rebase; sharp/librsvg renders CSS-variable SVGs as black, so layout previews need token substitution.
- Graders run and results (PASS/FAIL): check:content PASS except check:content-status (pre-existing FAIL on main).
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): have the crew planner add "place schematic SVGs" to author briefs now that check:figures requires rendered figures.
