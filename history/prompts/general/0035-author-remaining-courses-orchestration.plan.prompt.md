---
id: "0035"
title: "Author remaining courses orchestration"
stage: plan
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: none
branch: 019-author-gnas-301
user: M Yousif Channa
command: "user prompt (orchestration)"
labels: [orchestration, sdd, content-pipeline, semester-1]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - none
tests:
  - none
---

## Prompt

author remaining courses in new session per course with dedicated agent to each. use /sp.specify skill to create separate specs and pranch for each course. follow speckit SDD workflow constitution and the skills to author the content.

## Response snapshot

Planned and launched the Semester-1 course authoring batch. Explored catalog status (10 courses with zero authored units; GENG-300 complete but unmerged on branch 018), the SpecKit SDD workflow, and the authoring skills/gates. User decisions: Sem-1 scope (GNAS-301, GICT-300, GQUR-300), full Urdu (G4+G5) per course before PR, G3 agent review on every unit, batches of 3. Approved plan: pre-flight settles 018 and pushes main; three worktree-isolated dedicated agents (specs 019/020/021 with pre-allocated D/G-code blocks) each run the /sp.specify flow then the content pipeline (G1 content-spec, evaluator intake, author-unit + generate-figures with .ur.svg variants, G2 gates, G3 per unit, G4/G5 Urdu, check:all, PR); serial merges with union resolution of the three append-only hot files; local CI attestations while GitHub Actions is quota-blocked until 2026-10-01.

## Outcome

- ✅ Impact: launched the three-course Semester-1 authoring batch (GNAS-301 spec 019, GICT-300 spec 020, GQUR-300 spec 021) with pre-allocated D/G-code blocks and worktree isolation per course agent.
- 🧪 Tests: none at planning stage.
- 📁 Files: none (planning exchange; per-course artifacts land on branches 019/020/021).
- 🔁 Next prompts: each dedicated course agent runs /sp.specify, then the content pipeline (G1 content-spec, evaluator intake, author-unit, generate-figures, G2 gates, G3/G4/G5, check:all, PR).
- 🧠 Reflection: pre-allocating decision-code blocks and isolating each course in its own worktree prevents cross-agent contention on the shared .git and the append-only hot files.

## Evaluation notes (flywheel)

- Failure modes observed: none; the user prompt was captured verbatim and routed to general (no single feature context; the exchange spans three feature branches).
- Graders run and results (PASS/FAIL): not applicable at planning stage.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
