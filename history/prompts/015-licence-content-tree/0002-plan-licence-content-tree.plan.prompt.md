---
id: 0002
title: Plan licence content tree
stage: plan
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 015-licence-content-tree
branch: 015-licence-content-tree
user: M Yousif Channa
command: /sp.plan 015-licence-content-tree
labels: ["spec-015", "plan", "content-tier", "adr-0009", "article-v4"]
links:
  spec: specs/015-licence-content-tree/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/46
files:
 - specs/015-licence-content-tree/plan.md
 - specs/015-licence-content-tree/research.md
 - specs/015-licence-content-tree/data-model.md
 - specs/015-licence-content-tree/contracts/content-roots.md
 - specs/015-licence-content-tree/quickstart.md
 - CLAUDE.md (agent context, truncation repaired)
tests:
 - npm run check:content (7/7)
 - no unresolved template placeholders in plan.md
---

## Prompt

run /sp.plan for 015

## Response snapshot

Renamed the working branch to `015-licence-content-tree` first: `check-prerequisites.sh` expects
the `NNN-feature-name` convention and could not resolve FEATURE_DIR from `spec/015-...`, which is
why `/sp.adr` aborted twice over. With the convention followed, `setup-plan.sh` resolved cleanly.

**Phase 0** resolved all three open questions plus one the spec had not asked:

- **R1 catalogue key**: additive `tracks[]` beside `semesters[]`, not a flat list with a `tier`
  field. A breaking catalogue migration in the same change as a six-script refactor would make
  FR-009 unfalsifiable, since a degree regression could originate in either. The known weakness of
  an additive key - a consumer that silently misses licence courses - is closed by an
  `allCourses()` reader that makes "every course" the default way to ask.
- **R2 route**: `/licence/`, following ADR-0009's precedent of naming an instance for what it
  holds. The usual argument for a generic name is future cost, and the tier abstraction removes
  it: once the walker exists, a third tier is a config entry. A future SSC/HSC track would want
  its own tier regardless, since its authority is the DCAR school curriculum rather than the HEC
  guides.
- **R3 navigation**: own sidebar, navbar entry and search indexing, but not in the semester
  sidebar. Placing a non-scheme course in degree navigation misrepresents the programme, which is
  the same objection that ruled out folding EED-313 into an unrelated course.
- **R4 Article V.4**, not in the spec: `check-add-course.mjs` compares git status around its own
  throwaway course, so this feature does not trip it. But it would then pass while proving nothing
  about the tier the feature exists to add. Decision: extend the gate to add a throwaway licence
  course too, so "adding a course is content-only" is checkable for the new tier rather than
  asserted.

**Constitution Check** passes on eight articles and is CONDITIONAL on V.4, recorded in Complexity
Tracking: V.4 governs adding a course, not adding a tier, and R4 makes the distinction falsifiable.

**Phase 1** produced the data model (ContentTier, UnitRecord, CatalogTrack), the walker contract,
and an add-a-licence-course quickstart that doubles as R4's assertion. Two invariants are called
out because they are the failure modes: `urBase` is derived from the plugin id, never assumed; and
a tier without an ordinal must never be asked for a semester number.

Phase 2 ordering puts the walker and the six-consumer port first with no licence directory in
existence, so FR-009's byte-identical acceptance test cannot be confounded by the new tier.

Repaired two CLAUDE.md entries the agent-context script truncated mid-sentence, and removed the
multi-line Technical Context values that caused it.

## Outcome

- ✅ Impact: the ADR is now writable - its two load-bearing alternatives (catalogue key, route) are decided with rationale.
- 🧪 Tests: check:content 7/7; no unresolved placeholders; zero em dash.
- 📁 Files: five planning artifacts (516 lines total) plus a CLAUDE.md repair.
- 🔁 Next prompts: re-run /sp.adr licence-content-tier, then /sp.tasks.
- 🧠 Reflection: the branch-naming convention was not bureaucratic - it was the only thing standing between this feature and its own tooling, and ignoring it cost an aborted command.

## Evaluation notes (flywheel)

- Failure modes observed: update-agent-context.sh takes only the first line of a Technical Context field, so multi-line values land truncated in CLAUDE.md.
- Graders run and results (PASS/FAIL): constitution gate evaluated article by article PASS; all NEEDS CLARIFICATION resolved PASS; placeholder scan PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): keep every Technical Context value on one line in future plans, and see whether the agent-context entries land intact.
