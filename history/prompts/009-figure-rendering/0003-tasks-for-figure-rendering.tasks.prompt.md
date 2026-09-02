---
id: 0003
title: Tasks for figure rendering
stage: tasks
date: 2026-09-01
surface: agent
model: claude-sonnet-5
feature: 009-figure-rendering
branch: 009-figure-rendering
user: channayousif
command: /sp.tasks (backfill)
labels: ["tasks", "figures", "tdd", "content-gate"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0012-figure-rendering-component-manifest-lifecycle-and-the-generate-figures-skill.md
  pr: null
files:
  - specs/009-figure-rendering/tasks.md
tests:
  - none (task-generation stage)
---

## Prompt

/sp.tasks

(Backfill record — the 009 PHR directory was empty when the implement PHR was written. This
captures `tasks.md` as generated from plan.md / the contracts.)

## Response snapshot

Decomposed the plan into 36 dependency-ordered tasks across 7 phases:

1. **Contracts & governance** (T001–T004) — Spec 008 manifest pointer, `style-guide.md` v3.1,
   `.gitignore`, `backlog.md`.
2. **`<Figure>` component** (T005–T007) — `Figure.tsx`, `MDXComponents.tsx`, `.figure` CSS.
3. **Gate rewrite, TDD** (T008–T011) — red-first `figures-gate.test.mjs` cases (T009) before the
   `check-figures.mjs` rewrite (T010); real-repo regression check (T011).
4. **Offline optimiser** (T012–T014) — `sharp` devDep, `optimize-figure.mjs`, smoke test.
5. **`generate-figures` skill** (T015–T021) — `SKILL.md` + 4 references, `author-unit` pointer,
   README.
6. **Render EFMP-302 Unit 1** (T022–T031) — author 4 SVG + 4 `.ur.svg`, wire 8 topic files,
   manifest v2, run the gate set + build + visual check. The proving unit.
7. **Polish** (T032–T036) — agent-context, drift reconciliation, ADR-0012, PHRs, final
   verification + commit + PR.

Out-of-scope follow-ups listed: rendering figures for EFMP-302 Units 2–6 / other courses; a raster
re-do of `fig-U1-2`; `srcset`/`<picture>`/CDN/lightbox; element-count comparison of
`<figId>.svg` vs `<figId>.ur.svg` in the gate.

## Outcome

- ✅ Impact: an executable, dependency-ordered task list; TDD sequencing pinned for the gate; the
  proving unit isolated as Phase 6.
- 🧪 Tests: n/a (task generation).
- 📁 Files: tasks.md.
- 🔁 Next prompts: `/sp.implement` (→ 0001).
- 🧠 Reflection: the one TDD-critical ordering is T009 (red) → T010 (green); everything else is
  parallelisable within its phase.

## Evaluation notes (flywheel)

- Failure modes observed: none at task stage.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
