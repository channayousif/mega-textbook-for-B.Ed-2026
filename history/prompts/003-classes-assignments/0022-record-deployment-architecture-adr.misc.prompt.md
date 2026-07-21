---
id: 0022
title: Record deployment architecture ADR
stage: misc
date: 2026-07-21
surface: agent
model: claude-fable-5
feature: 003-classes-assignments
branch: main
user: channayousif@gmail.com
command: /sp.adr
labels: [adr, deployment, architecture, supersession]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: history/adr/0008-production-deployment-architecture.md
  pr: null
files:
  - history/adr/0008-production-deployment-architecture.md (new)
  - history/adr/0002-content-platform-architecture-and-hosting.md (supersession note on Status line)
tests:
  - "Significance checklist applied: impact (release process for the platform's life), alternatives (4 documented with rejection rationale), cross-cutting (affects every future merge) — all PASS"
  - "Over-granularity check: Spec 003's security decisions deliberately NOT made into a new ADR (extension of ADR-0007's existing cluster); routing/exceljs/schema details left in plan.md"
---

## Prompt

/sp.adr (no additional input — invoked after the production-deployment integration, following the
assistant's suggestion: `/sp.adr production-deployment-architecture`)

## Response snapshot

Ran the ADR workflow against specs/003-classes-assignments (branch is `main` post-merge, so the
prerequisites script's branch detection failed benignly; feature dir resolved explicitly).

Decision extraction and clustering:
- **New cluster — Production Deployment Architecture** (the only candidate passing all three
  significance tests): pull-based CI-gated cron deployer on the production host, workflow-run-API
  gate keyed by exact head SHA (not check-run names — deploy.yml's `build` job name collides),
  dedicated build clone isolated from the dev working tree, sanity-gated rsync to the HestiaCP
  docroot, Pages fallback demoted to dispatch-only. Written as **ADR-0008 (Accepted)** with four
  alternatives (self-hosted runner, SSH-push, webhook listener, actually-adopting Vercel/Pages)
  and honest negatives (5-min latency, host-only observability, no deploy monitoring).
- **Referenced, not duplicated**: Spec 003's SECURITY DEFINER RPCs + guard triggers + RLS matrix
  are a direct extension of ADR-0007's authorization cluster; creating a new ADR would restate it.
- **Conflict handled**: ADR-0002's "Hosting & delivery" bullet ("Vercel primary, GitHub Pages
  fallback") never matched deployed reality and is now formally superseded by ADR-0008 for the
  delivery mechanism — annotated directly on ADR-0002's Status line with a link, leaving its
  content-platform decisions untouched.
- **Rejected as over-granular**: query-string routing, `source_kind='quiz'` implying auto-graded,
  exceljs dynamic-import — all documented where they live (plan.md/data-model.md), none
  cross-cutting enough alone.

## Outcome

- ✅ Impact: the deployment architecture decided and implemented earlier today is now a permanent,
  reviewable record with its alternatives and tradeoffs; the stale ADR-0002 hosting claim can no
  longer mislead a future reader about how production actually ships.
- 🧪 Tests: significance checklist and over-granularity/missing-alternatives graders applied per
  the command's flywheel hooks — 1 candidate passed, 3+ candidates correctly rejected or
  referenced to existing ADRs.
- 📁 Files: 1 new ADR (0008), 1 supersession annotation (0002).
- 🔁 Next prompts: commit + push the ADR (flows through the new pipeline itself); consider a
  future ADR only if the deploy trigger mechanism changes (webhook/runner upgrade path is noted
  inside ADR-0008 as drop-in).
- 🧠 Reflection: the most useful part of the workflow was the conflict check, not the new
  document — ADR-0002 asserted a hosting story ("Vercel primary") that was never true in
  production, and nothing before today's live tracing would have caught the drift between the
  recorded decision and the running system.

## Evaluation notes (flywheel)

- Failure modes observed: check-prerequisites.sh assumes a feature branch and errors on `main` —
  worked around by resolving FEATURE_DIR explicitly; worth a `--feature` flag someday.
  create-adr.sh requires `--title` flag syntax (positional args rejected).
- Graders run and results (PASS/FAIL): ADR-0008 against the command's checklist — clustered
  decision (trigger + gate + isolation + release step + fallback demotion): PASS; ≥1 alternative
  with rationale (4 given): PASS; pros AND cons for chosen + alternatives: PASS; concise but
  future-referenceable: PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): none — single-ADR outcome matched the pre-analysis
  prediction from PHR 0021.
