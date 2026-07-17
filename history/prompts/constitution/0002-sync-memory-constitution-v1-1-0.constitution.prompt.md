---
id: 0002
title: Sync Memory Constitution v1.1.0
stage: constitution
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: none
branch: main
user: channayousif@gmail.com
command: /sp.constitution update according to @SDD/constitution.md
labels: ["constitution", "governance", "sync", "sdd", "versioning"]
links:
  spec: null
  ticket: null
  adr: history/adr/0001-content-scaffold-scope-scaffold-all-8-semesters-prioritize-content-for-semesters-1-4.md
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - "grep templates for stale refs (Semester I / 6 courses / Drive / 1.0.0 / pilot) — none found"
 - "no unresolved [BRACKET] placeholders; version footer matches Sync Impact Report (1.1.0)"
---

## Prompt

/sp.constitution update according to @SDD/constitution.md

## Response snapshot

Synced the SpecKit memory constitution (`.specify/memory/constitution.md`, 1.0.0) to match the ratified amendment in `SDD/constitution.md` (v1.0 → v1.1). Classified as a **MINOR** bump → **1.1.0** (new non-negotiable requirements added; nothing removed/redefined-incompatibly).

Changes propagated (preserving the memory file's richer Article I–X structure):
- **Article II** — source of truth moved from the remote Drive folder to the local `Scheme-and-Course-guides/` folder (all 8 semesters; Sem I–II PDF, Sem III–VIII DOCX); gaps clause notes guides are extracted and board-vs-guide discrepancies tracked in `specs/gaps.md`.
- **Article III** — item 5 now allows guide recommended-books as a cited-not-reproduced starting point; NEW item 6 **Guide-section fidelity** (teaching strategies, suggested practical activities, reading materials, practical work, assessment criteria); NEW item 7 **Assessment weighting 60/40** for GECEs; Accessibility renumbered 6 → 8.
- **Article VI** — reframed from "Pilot = Semester I (6 courses)" to "Build once, scale by semester — all 8 semesters scaffolded, content priority Sems 1–4; golden unit EFMP-301 U1."
- **Article VII** — Content gate checklist gains "guide-section fidelity."
- Prepended a Sync Impact Report; updated footer to Version 1.1.0 / Last Amended 2026-07-17.

Propagation checklist: plan/spec/tasks templates derive the Constitution Check dynamically and hardcode no principle text — grep confirms no stale references; commands template dir is absent (nothing to reconcile).

## Outcome

- ✅ Impact: Memory constitution and SDD constitution are aligned at 1.1.0; governance is single-sourced again.
- 🧪 Tests: no leftover bracket placeholders; version line ↔ report consistent; templates grep clean.
- 📁 Files: `.specify/memory/constitution.md` updated (Sync Impact Report + v1.1.0).
- 🔁 Next prompts: resolve `specs/gaps.md` G-2026-02..05; then reconcile ROADMAP catalog codes.
- 🧠 Reflection: kept the memory file's Article IX/X (Authentication, Amendment & Versioning) which the SDD draft numbers differently — memory structure is the canonical SpecKit governance shape.

## Evaluation notes (flywheel)

- Failure modes observed: potential article-numbering divergence between SDD draft (IX = Amendment) and memory (IX = Auth, X = Amendment) — handled by preserving memory structure and mapping substantive changes only.
- Graders run and results (PASS/FAIL): placeholder check PASS; version/report consistency PASS; template grep PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): once gaps resolved, PATCH the Article II discrepancy examples if codes change.

Suggested commit message: `docs: amend constitution to v1.1.0 (guide-section fidelity, 60/40 assessment, all-8-semester scope)`
