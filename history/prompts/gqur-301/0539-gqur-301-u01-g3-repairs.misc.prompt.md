---
id: 0539
title: GQUR-301 Unit 1 G3 repairs
stage: misc
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: gqur-301
branch: crew/gqur-301-u01-repair_en
user: M Yousif Channa
command: crew job gqur-301-u01-repair_en (repair_en)
labels: ["crew", "claude", "gqur-301", "g3-repair"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-01/topic-02.mdx
 - docs/semester-2/gqur-301/unit-01/unit-assessment.mdx
 - specs/content/gqur-301/sources/unit-01.md
 - specs/content/gqur-301/tasks.md
 - specs/content/gqur-301/reviews/unit-01/G2/20261019T235035407Z-gates.json
 - specs/content/gqur-301/reviews/unit-01/G2/logs-20261019T235035407Z/
 - static/img/figures/gqur-301/unit-01/fig-U1-1..8.svg and .dark.svg (16 files)
tests:
 - npm run check:content (12/13 PASS; check:content-status fails identically on origin/main, gitignored static/content-status.json)
 - npm run figures:variants:check (OK)
 - node scripts/prepare-gate-evidence.mjs GQUR-301 1 (all G2 gates PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the six findings of G3 report 459abd64-a834-454a-bb77-eaf0f571110a. X1: fig-U1-1 re-laid
out (Data node moved to the empty top band, examples split into two rows) so no box overlaps and no
text leaves the 780px viewBox; `.wm` gains `text-anchor:end` in fig-U1-2..8 light and dark. M1: RRQ 5
key now 2/6/4. S1: topic-02 cites Lane (2023, Chapter 6 "Basics of Data Collection", verified live)
and the NCC mathematics progression grid in prose and Further reading. M2: MCQ 10 option B now
17-19. S2: dated D-2026-0001 declarations for pbs and ncc-maths (both portals HTTP 200 on 2026-10-19;
NCC grid PDF not located). X2 not actionable under the crew brief. G2 evidence regenerated, G2 row
repointed, new unticked G3 tracker row appended.

## Outcome

- ✅ Impact: all three blocking G3 findings and both actionable advisories repaired.
- 🧪 Tests: check:content matches origin/main (only check:content-status fails, as on main).
- 📁 Files: two unit pages, sources and tracker records, 16 SVGs, fresh G2 evidence.
- 🔁 Next prompts: fresh independent G3 review of GQUR-301 Unit 1.
- 🧠 Reflection: fig-U1-1 had overlapping boxes beyond the one overflow flagged; widths were
  measured with DejaVu Sans (the host's system-ui), which matched the reviewer's Chromium figure.

## Handoff (for CEO and agents)

- Shipped / changed: GQUR-301 U1 G3 repairs on branch crew/gqur-301-u01-repair_en (unpushed).
- Decisions the team must respect: G3 stays unticked until a fresh independent review (ADR-0019).
- Pending / next owner: fresh G3 review (crew); Chromium re-measure of the 16 SVGs with
  scripts/measure-figure-text.mjs; live narrow-viewport and print check (X2); G4 Urdu mirror.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: reviewer-suggested fig-U1-1 coordinates would still have left the box
  narrower than its text; figures without a font-family render in a different default font.
- Graders run and results (PASS/FAIL): G2 gate set PASS; check:content 12/13 (baseline parity).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): a Node-only text-width estimator for crew jobs that
  cannot launch Chromium.
