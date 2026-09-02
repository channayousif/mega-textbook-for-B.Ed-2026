---
id: 0002
title: Plan figure rendering feature
stage: plan
date: 2026-09-01
surface: agent
model: claude-sonnet-5
feature: 009-figure-rendering
branch: 009-figure-rendering
user: channayousif
command: /sp.plan (backfill)
labels: ["plan", "figures", "mdx-component", "svg", "bilingual", "content-gate"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: history/adr/0012-figure-rendering-component-manifest-lifecycle-and-the-generate-figures-skill.md
  pr: null
files:
  - specs/009-figure-rendering/plan.md
  - specs/009-figure-rendering/research.md
  - specs/009-figure-rendering/data-model.md
  - specs/009-figure-rendering/quickstart.md
  - specs/009-figure-rendering/contracts/figure-manifest-v2.md
  - specs/009-figure-rendering/contracts/figure-component.md
tests:
  - none (planning stage)
---

## Prompt

/sp.plan

(Backfill record — the 009 PHR directory was empty when the implement PHR was written. The
original planning prompt was the standard `/sp.plan` run against
`specs/009-figure-rendering/spec.md`; this file captures the plan as it stood entering
implementation.)

## Response snapshot

Produced the Phase 0–1 design set for turning Spec 008 `{/* FIGURE[...] */}` prompt-markers into
rendered images:

- **research.md** — R1 raster route = Hugging Face MCP (owner-side config, run-time tool
  detection, brief + `.staging/` fallback); R2 SVG-first for schematic figures; R3 end-state =
  **replace** the comment with `<Figure>`; R4 `<img src="/img/…">` not SVGR; R5 `sharp` devDep for
  the offline optimiser; R6 manifest v2 columns + `prompt-only → generated → placed`; R7 gate
  widening is additive (new checks only from `generated`/`placed`); R8 bilingual diagrams get
  `<figId>.ur.svg`; R9 no CI change.
- **data-model.md** — file-based entities: Figure asset, `<Figure>` component, manifest v2,
  generation brief, `.staging/` dir; the `prompt-only → generated → placed` state machine.
- **contracts/** — `figure-manifest-v2.md` (supersedes the Spec 008 `figures-manifest.md`;
  `Kind`/`Src` rules, the Status lifecycle, the `<Figure>` end-state, the `.ur.svg` rule, the
  asset-path grammar) and `figure-component.md` (props, rendered DOM, a11y, print, RTL, the
  root-absolute-`/img/` rule).
- **plan.md** — Constitution Check PASS, no amendment (Art. III.8 and V.5 strengthened, not
  modified); one Complexity Tracking entry for the `sharp` devDep; the marker→`<Figure>` layer +
  the carrier concept flagged as an ADR candidate (revisits ADR-0011 rejected alternative D).

## Outcome

- ✅ Impact: fixed every design fork the spec deferred — v2 column order, the SVG archetype list,
  the gate's per-Status branch, the asset-path grammar, the SVG-first/HF-MCP split.
- 🧪 Tests: n/a (planning).
- 📁 Files: plan.md + research.md + data-model.md + quickstart.md + 2 contracts.
- 🔁 Next prompts: `/sp.tasks` (→ 0003); `/sp.implement` (→ 0001).
- 🧠 Reflection: the four owner decisions (HF MCP raster; hybrid SVG-first; full SDD; render
  Unit 1 now) left no NEEDS CLARIFICATION.

## Evaluation notes (flywheel)

- Failure modes observed: none at plan stage.
- Graders run and results (PASS/FAIL): Constitution Check PASS (v2.6.0), no amendment required.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
