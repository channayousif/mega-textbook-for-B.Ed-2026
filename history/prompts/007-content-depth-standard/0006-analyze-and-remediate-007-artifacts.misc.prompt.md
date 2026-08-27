---
id: 0006
title: Analyze and remediate 007 artifacts
stage: misc
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 007-content-depth-standard
branch: 007-content-depth-standard
user: channayousif@gmail.com
command: /sp.analyze
labels: [content-pipeline, depth-standard, analyze, remediation, cross-artifact]
links:
  spec: specs/007-content-depth-standard/spec.md
  ticket: null
  adr: history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md
  pr: null
files:
 - specs/007-content-depth-standard/spec.md
 - specs/007-content-depth-standard/plan.md
 - specs/007-content-depth-standard/quickstart.md
 - specs/007-content-depth-standard/tasks.md
 - specs/007-content-depth-standard/checklists/requirements.md
 - history/prompts/007-content-depth-standard/0006-analyze-and-remediate-007-artifacts.misc.prompt.md
tests:
 - none (analysis + doc remediation; no code changed)
---

## Prompt

/sp.analyze  →  then user: "fix all"

Read-only cross-artifact consistency analysis of spec.md / plan.md / tasks.md (with
research/data-model/contracts/quickstart + constitution v2.5.0), followed by an explicit
instruction to remediate every finding.

## Response snapshot

**Analysis — 12 findings** (1 CRITICAL, 2 HIGH, 4 MEDIUM, 5 LOW; coverage 93%, 0 hard
constitution MUST violations):

- **C1 (CRITICAL)** — tasks T034 added `▢` `G1`–`G7` rows for the already-published EFMP-301
  Unit 1; `check-pipeline-gate.mjs` reads the *last* matching tracker row, so this would flip
  EFMP-301 U1 to "not done" → `check:pipeline-gate` CI red on `main` → deploy cron blocked.
- **H1** — the depth gate's required-blocks check was phrased "fail if **neither**
  `## Common misconceptions` **nor** `## Further reading` present" in plan §gate step 4,
  quickstart §3.4, T028 step 4, T027 case (h) — only catches the both-missing case, but
  FR-005/FR-012(b) require **both** present.
- **H2** — T031 (developer) and T036 (curriculum owner) both set the EFMP-302 U1 `G2/G3`
  rows to `✅`; the `G3 en-review` `✅` is the Content gate's to grant (Art. VII).
- **M1** — SC-006 ("content-spec re-approved") had no task.
- **M2** — after T024 the EN-only interim publish state (Spec 001 FR-003 banner) was unstated.
- **M3** — Art. VII Teacher gate (per-course-once) unaddressed for the re-drafted assessments.
- **M4** — `check:pipeline-gate` is RED for EFMP-302 U1 between T026 and T036 by design; not
  called out as a merge blocker.
- **L1** "proof unit" vs "proving unit"; **L2** stale `coverage.md` in a historical
  clarification bullet; **L3** `**Depth budget**` band width unbounded; **L4** approximate
  guide line numbers in T007/T008; **L5** T027 asserted the failure message only for one case.

**Remediation — "fix all" (12/12 addressed, no code, docs only):**

- C1 → T034 rewritten: **prose note only** in `efmp-301/content-spec.md` + `specs/backlog.md`
  bullet; explicit "do NOT add stage rows"; new **T034a** runs `check:pipeline-gate` to
  confirm no regression. Total tasks 40 → 41.
- H1 → plan §gate step 4, quickstart §3 step 4, T028 step 4 all reworded to "fail if **either**
  block is missing (FR-005 mandates both; message names which)"; T027 case (h) split into
  **h1** (misconceptions missing) + **h2** (further-reading missing).
- H2 → T031 now ends `check:pipeline-gate`-free, leaves `G2/G3` at `▣`; **T036 is the sole
  task that sets them `✅`** with the curriculum owner's initials.
- M1 → T013 broadened to review the *whole* expanded content-spec and re-affirm
  `status: approved` (SC-006).
- M2 → spec Edge Case + Dependencies + a new plan Constitution-Check **III.2** row: the `ur`
  route falls back to EN behind Spec 001 FR-003's "translation in progress" banner in the
  interim — Art. III.2-compliant via FR-003, not a `bilingual: false` carve-out.
- M3 → spec Assumptions + T036 + plan VII row: Teacher gate is per-course-once, satisfied
  under Spec 006, not re-run.
- M4 → new "⚠️ Merge gate" block in tasks Dependencies: do not merge until T036 restores
  `check:pipeline-gate` to green; MVP/summary lines updated.
- L1 → spec "proof unit" → "proving unit" (kept "proof-first rollout"); matches constitution.
- L2 → historical clarification bullet gains a parenthetical pointing to the round-1 fix.
- L3 → T004 adds "keep the `**Depth budget**` band tight — roughly ±25% of target".
- L4 → T007/T008 anchor on the guide's section headings ("Course Description", "Suggested
  Readings"), not fixed line numbers.
- L5 → T027 "every failing case MUST assert … the message names the unmet condition";
  T028 step list ends with the same requirement.
- checklists/requirements.md Notes updated with the analyze + remediation record.

## Outcome

- ✅ Impact: the one production-breaking task (C1) is defused; the gate's block-presence
  semantics now match FR-005; review-gate ownership is unambiguous. Feature ready for
  `/sp.implement`.
- 🧪 Tests: none — docs only.
- 📁 Files: spec.md, plan.md, quickstart.md, tasks.md (41 tasks), checklists/requirements.md;
  this PHR.
- 🔁 Next prompts: `/sp.implement` — Phase 1 → stop & validate after Phase 4 (MVP).
- 🧠 Reflection: C1 is the kind of cross-artifact bug a single-artifact review misses — it
  only shows up when you trace T034's tracker edit through `check-pipeline-gate.mjs`'s
  last-row-wins semantics onto the production deploy cron.

## Evaluation notes (flywheel)

- Failure modes observed: a task (T034) that would silently break an unrelated, already-shipped
  unit's CI gate; an inverted boolean in the gate spec propagated identically across three
  design docs.
- Graders run and results (PASS/FAIL): post-remediation re-scan — 0 CRITICAL, 0 HIGH
  outstanding; task IDs sequential (T001–T040 + T034a); "proof unit" residual = 0.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): in `/sp.implement`, run `check:pipeline-gate`
  immediately after T026 and again after T034 to catch any tracker regression the moment it
  is introduced rather than at the merge gate.
