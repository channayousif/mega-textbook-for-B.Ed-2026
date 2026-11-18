---
id: 20261214
title: ADR multi-producer illustrations
stage: general
date: 2026-11-18
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/illustrate-multi-producer
user: M Yousif Channa
command: /sp.adr
labels: [board-direct, adr, illustrate, gflow, codex]
links:
  spec: null
  ticket: null
  adr: history/adr/0036-multi-producer-raster-illustrations-with-per-producer-quotas.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/639
files:
  - history/adr/0036-multi-producer-raster-illustrations-with-per-producer-quotas.md
  - history/adr/0029-gemini-agy-raster-illustration-producer.md
  - history/adr/README.md
  - specs/decisions/log.md
tests:
  - node scripts/check-docs-sync.mjs (pass)
---

## Prompt

merge it and sync the crew, run adr

## Response snapshot

Ran /sp.adr against the approved plan and PR #639. No feature plan.md exists, because this was cross-cutting
crew work, so the plan file and the PR were used as the planning source.

One decision cluster passed the significance test: multi-producer raster illustrations with per-producer
quotas. Created ADR-0036, which amends ADR-0029 points 1 and 4. It records:
- producer order agy, gflow, Codex;
- one entry point;
- the producer contract (quota, unavailable, failed);
- the per-producer quota file;
- the gflow transport;
- serial generation with provenance per image.

It lists six alternatives (agy only, worker-chain fix only, parallel producers, Gemini API key, opencode,
gflow first) with pros and cons.

Also:
- the ADR-0029 status line and the ADR index (README row, count 36, figure prose) now name the amendment;
- D-2026-0085 now names ADR-0036.

The ADR goes into PR #639 before merge. After that: merge #639 on green CI, then fast-forward `~/crew-system`.

## Outcome

- ✅ Impact: the multi-producer design has a permanent record next to ADR-0024/0029/0033.
- 🧪 Tests: check-docs-sync passes; ADR grader: clustered decision, alternatives with rationale, both
  consequence sides, references.
- 📁 Files: one new ADR, three record edits.
- 🔁 Next prompts: watch the first live gflow/Codex illustrate run and amend ADR-0036's "untested paths"
  consequence once confirmed.
- 🧠 Reflection: a decision entry created in the same PR can still be corrected freely; once a report
  cites it, its digest binds.

## Handoff (for CEO and agents)

- Shipped / changed: ADR-0036 accepted (owner instruction 2026-11-18, D-2026-0085).
- Decisions the team must respect:
  - Producer order agy, gflow, Codex.
  - All images go through `generate-illustration.mjs`.
  - Claude does not itself call Codex or gflow image generation.
  - One illustrate job at a time.
- Pending / next owner:
  - Lead: merge #639 and sync `~/crew-system`.
  - Owner: keep the tunnel up when gflow should help.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: none in this step.
- Graders run and results (PASS/FAIL): ADR checklist PASS (clustered, alternatives, pros/cons, concise).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add an ADR index check to check-docs-sync so the README count
  cannot drift.
