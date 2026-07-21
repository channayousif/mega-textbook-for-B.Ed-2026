---
id: 0007
title: Document docs-instance ADR for guides
stage: misc
date: 2026-07-20
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: /sp.adr
labels: ["adr", "architecture", "docs-infrastructure", "student-dashboard"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: history/adr/0009-separate-docusaurus-docs-instance-for-usage-guides.md
  pr: null
files:
 - history/adr/0009-separate-docusaurus-docs-instance-for-usage-guides.md
 - specs/004-student-dashboard/plan.md
tests:
 - none (documentation-only change)
---

## Prompt

yes run /sp.adr

(Follows the plan.md ADR suggestion for `docs-plugin-instance-for-usage-guides`, passed as the
`/sp.adr` command's argument per the user's prior turn.)

## Response snapshot

Ran `.specify/scripts/bash/check-prerequisites.sh --json` to confirm `plan.md` and its Phase 0/1
artifacts exist for `004-student-dashboard`. Extracted candidate decision clusters from
`plan.md`/`research.md`/`data-model.md` and applied the three-part significance test
(impact/alternatives/scope) to each:

- **Docs-plugin instance for usage guides** (research.md R6) — passed all three: long-term
  consequence for every future spec adding guide content (Teacher Guide included), real
  alternatives considered (folding into the existing docs tree, plain `src/pages/` React pages, a
  single-file guide), and cross-cutting scope (a new content-pipeline root, not an isolated file
  change). **Created as ADR-0009.**
- **Achievement-granting architecture** (3 pure Postgres triggers + 1 client-assisted/
  server-verified RPC exception, research.md R2) — considered but **not** created as an ADR: scope
  is narrow (confined to one feature's badge system, not a reusable cross-cutting pattern), and
  the plan's own Follow-ups section already explicitly warns future features not to cite this as
  blanket precedent — meeting the "scope: cross-cutting" bar poorly enough to fail the test.
  Already adequately captured in research.md R2 and data-model.md's design-decision prose.
- **Achievement catalog as static code vs. a database table** (research.md R4) — considered but
  **not** created: this applies an *already-established* repo convention (the `MESSAGES`-dict
  bilingual-string pattern used throughout `src/pages/app/`), not a new architectural decision —
  fails the "will be questioned or revisited" bar since it's consistent execution of existing
  practice, not a fresh precedent.
- **No new npm dependency / CSS-only progress bars** (research.md R7) — considered but **not**
  created: trivial, single-feature, no real alternative debate beyond "don't add a dependency you
  don't need" — over-granular per the skill's own explicit warning example.

Checked `history/adr/` for conflicts before creating anything: ADR-0002 (Content Platform
Architecture and Hosting) establishes the *existing* single curriculum docs instance and its
Semester → Course → Unit sidebar/search tuning, but says nothing about a second instance for
non-curriculum content — no conflict, and ADR-0009 is written to explicitly not disturb ADR-0002's
decisions (cited as a related ADR, not a superseded one).

Ran `create-adr.sh --title "Separate Docusaurus docs instance for usage guides" --json` →
`ADR-0009`. Filled every placeholder: Context (Article X's new obligation, the Sync Impact
Report's Spec-004-as-natural-home note, the existing single-instance setup this decision must
coexist with); Decision (plugin instance details — id, routeBasePath, content dir, i18n reuse,
search-index extension, role-gated nav entry, not a public link); Consequences (positive: no
interference with curriculum sidebar/search, one home for the future Teacher Guide too, reuses the
existing content pipeline per Art. X.4's literal requirement; negative: new
config-misconfiguration surface, inherited-but-unverified Urdu search-relevance risk, a second
role-gating surface for a future spec to get wrong); three Alternatives Considered (folding into
the existing docs tree; plain `src/pages/` React pages; a single-file, no-docs-plugin guide) each
with an explicit rejection rationale; References (spec.md, plan.md's Constitution Check rows,
research.md R6, quickstart.md's failure mode #3, Constitution Art. VII/X, related ADR-0002, and
the PHR for the planning session that first surfaced this decision).

Updated `plan.md` in three places to replace the "ADR-suggestion candidate" language (written
before the ADR existed) with direct links to the now-created ADR-0009: the Constitution Check
section's closing paragraph, the Follow-ups bullet, and the trailing "Architectural decision
detected" callout (changed to "documented," now linking the file instead of suggesting a command
to run).

## Outcome

- ✅ Impact: The docs-architecture decision this feature's plan flagged now has a permanent,
  reviewable record with real alternatives and explicit consequences — any future spec adding the
  Teacher Guide inherits this decision's rationale instead of re-deriving or silently diverging
  from it. Three other candidate decisions were deliberately *not* turned into ADRs, keeping the
  ADR log itself meaningful rather than diluted with narrow, single-feature design notes that
  research.md/data-model.md already document adequately.
- 🧪 Tests: None (documentation-only; no code or schema changed this session).
- 📁 Files: `history/adr/0009-separate-docusaurus-docs-instance-for-usage-guides.md` (new,
  Proposed); `specs/004-student-dashboard/plan.md` (3 edits linking to the new ADR).
- 🔁 Next prompts: `/sp.tasks` to decompose the plan (unaffected by this ADR session, since no
  design changed) into a dependency-ordered task list. The ADR's `Status: Proposed` may be
  promoted to `Accepted` once the owner reviews it — not something to do unprompted.
- 🧠 Reflection: Applying the significance test strictly (rejecting 3 of 4 candidates) was the
  right call given the plan's own Follow-ups section had already pre-warned against treating the
  achievement-RPC exception as a reusable pattern — creating an ADR for it anyway would have
  contradicted that guidance and diluted the ADR log's signal.

## Evaluation notes (flywheel)

- Failure modes observed: None — the "over-granular ADR" failure mode the skill explicitly warns
  against was avoided by checking each of the 4 research.md findings against the three-part test
  individually rather than defaulting to "document everything research.md flagged."
- Graders run and results (PASS/FAIL): Self-applied checklist grader (per the skill's Step 4
  "Measure" instructions) — PASS on all four criteria for ADR-0009: (1) decision clusters
  route/content/search/nav together as one integrated docs-infrastructure decision, not four
  atomic ones; (2) 3 explicit alternatives with rejection rationale; (3) pros/cons listed for both
  chosen approach and alternatives; (4) concise (single decision cluster, ~550 words) but complete
  enough for future reference.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When a plan's Follow-ups section already contains
  explicit "don't treat this as precedent" language for a design decision, treat that as a strong
  signal to skip the ADR entirely for that item rather than re-evaluating it fresh against the
  significance test — the plan-writing pass already did that evaluation once.
