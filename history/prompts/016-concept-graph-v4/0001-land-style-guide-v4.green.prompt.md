---
id: 0001
title: Land style guide v4.0
stage: green
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 016-concept-graph-v4
branch: 016-concept-graph-v4
user: M Yousif Channa
command: now land v4.0
labels: ["spec-016", "v4.0", "concept-graph", "freeze", "fr-003"]
links:
  spec: specs/016-concept-graph-v4/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - scripts/check-concept-graph.mjs (new) · scripts/lib/gates.mjs · package.json · .github/workflows/ci.yml
 - specs/016-concept-graph-v4/{spec,validation}.md + contracts/concept-graph.md
 - specs/content/style-guide.md (v3.4 to v4.0) · .claude/skills/author-unit/SKILL.md
 - specs/content/efmp-302/concepts/unit-01.md · specs/content/efmp-301/concepts/unit-01.md
 - specs/backlog.md
tests:
 - FR-003 - EFMP-302 U1 still reviewed in both locales, zero docs/ or i18n/ files touched (PASS)
 - success criterion 2 - all five gate checks fire, each naming the offending ID (PASS)
 - npm run check:all - 14/14 gates including build (PASS)
---

## Prompt

now land v4.0

## Response snapshot

Art. IV requires an approved spec before implementation, so this became feature 016 rather than a
direct edit. Two spec questions materially changed the build and went to the owner: schema widening
was **deferred** (the SSC/HSC scheme is not in the repository, so widening would trade real
typo-catching for a guess at a format nobody has seen), and Urdu concept labels are **filled now**,
from `terminology.csv` where banked and flagged for G5 review where authored.

**The largest finding removed the feature's main risk entirely.** The roadmap and the repositioning
plan both described FR-004 as "the one place prose is touched" - assessment items needing stable
IDs so concepts could cite them. Reading `unit-assessment.mdx` showed the items are already
numbered beneath three named headings, so `MCQ-01 … ERQ-05` are derivable from what is on the page.
FR-004 was rewritten to derive rather than author, which turned FR-003 from an intention into a
property of the design: there was nothing to touch, so nothing could break.

It held. `EFMP-302` Unit 1 - the only `reviewed` Urdu mirror in the repository - came through the
ninth standard revision at `reviewed` in both locales, with `git status --porcelain docs i18n`
empty after both retrofits.

The gate has five checks, each proved by mutation rather than assertion. The cycle check reports
the path (`1-1 -> 1-3 -> 1-1`), which is the difference between a usable error and a puzzle.

**A second finding, unrelated to v4.0 and arguably worth more.** `EFMP-301`'s content-spec keeps its
tables at document level with no `## Unit 1` heading, so `unitSectionLines` returns null and
`check:depth-gate` **silently skips the golden unit** - and has since Spec 007. The gate passes
because it never looks. Found by building against the same helper. This feature handles both spec
shapes by falling back to the whole document; fixing the depth gap is in `specs/backlog.md`,
because adding the heading may surface findings hidden for months and is a task of unknown size
rather than a one-line fix.

The bidirectional docs-sync check built during Feature 015 paid off immediately: registering the
gate failed it with "gate-commands block is out of date" in two skill files, which `--fix`
regenerated. Before that change it checked one direction only and the skills would have drifted.

FR-011 begins the freeze. Two units carry a concept graph; 50 lifts it.

## Outcome

- ✅ Impact: the authoring standard is at v4.0 and frozen; the substrate later sequencing needs exists, and the only reviewed Urdu unit survived untouched.
- 🧪 Tests: check:all 14/14 including build; five gate mutations each fire correctly; FR-003 verified on both retrofitted units.
- 📁 Files: new gate, contract, spec and validation; style guide to v4.0; author-unit skill step; two concept graphs; gates.mjs, package.json, CI, backlog.
- 🔁 Next prompts: the freeze holds until 50 units. Authoring EED-313 and EFMP-408 is now unblocked.
- 🧠 Reflection: the risk that justified three binding mitigations turned out to be avoidable by reading the file first. The mitigations were still right to demand.

## Evaluation notes (flywheel)

- Failure modes observed: a plan asserting prose must change when the existing structure already sufficed; a gate that passes because it silently skips its most important unit.
- Graders run and results (PASS/FAIL): FR-003 PASS; five-mutation suite PASS; check:all 14/14 PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add `## Unit 1` to EFMP-301's content-spec on a throwaway branch and count the depth findings that appear - that sizes the backlog item.
