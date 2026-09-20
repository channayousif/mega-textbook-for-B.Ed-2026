---
id: 0030
title: Commit OpenCode parity and G3 manifest
stage: general
date: 2026-09-18
surface: agent
model: claude-opus-5
feature: none
branch: measurement-run-002-efmp-302-u2
user: M Yousif Channa
command: git add all commit pr
labels: ["git", "opencode", "speckit", "review-evidence", "efmp-302"]
links:
  spec: null
  ticket: null
  adr: history/adr/0019-agent-review-delegation.md
  pr: null
files:
 - .opencode/commands/sp.adr.md
 - .opencode/commands/sp.analyze.md
 - .opencode/commands/sp.checklist.md
 - .opencode/commands/sp.clarify.md
 - .opencode/commands/sp.constitution.md
 - .opencode/commands/sp.git.commit_pr.md
 - .opencode/commands/sp.implement.md
 - .opencode/commands/sp.phr.md
 - .opencode/commands/sp.plan.md
 - .opencode/commands/sp.reverse-engineer.md
 - .opencode/commands/sp.specify.md
 - .opencode/commands/sp.tasks.md
 - .opencode/commands/sp.taskstoissues.md
 - .opencode/agents/g3-reviewer.md
 - .opencode/agents/g5-reviewer.md
 - .claude/agents/g3-reviewer.md
 - .claude/agents/g5-reviewer.md
 - specs/content/efmp-302/reviews/unit-02/G3-run002/manifest.json
 - history/prompts/general/0030-commit-opencode-parity-and-g3-manifest.general.prompt.md
tests:
 - npm run check:content (validate:content PASS, check:pipeline-gate FAIL, pre-existing)
 - npm run check:depth-gate (PASS)
 - npm run check:figures (PASS)
 - npm run check:concept-graph (PASS)
 - npm run check:no-answer-keys (PASS)
 - npm run check:docs-sync (PASS)
 - npm run check:no-em-dash (PASS)
 - npm run figures:variants:check (PASS)
---

## Prompt

git add all commit pr

## Response snapshot

Surveyed the working tree, found two unrelated change sets, and split them into
two commits rather than one.

1. `e86c287` chore: OpenCode surface parity. `746cdd4` had initialized SpecKit
   Plus for OpenCode with a partial, stale command set: seven files behind
   `.claude/commands/` and six missing. Verified every file under
   `.opencode/commands/` is now byte-identical to its `.claude/commands/`
   counterpart. The two review agents were mirrored into `.opencode/agents/`,
   and the `tools:` frontmatter key dropped from both `.claude/agents/`
   reviewers so one definition is valid on both surfaces.

2. `fd01843` content(efmp-302): pin the Unit 2 G3 run 002 input manifest.
   Before committing, confirmed the manifest's recorded digests for
   `g3-reviewer.md` / `g5-reviewer.md` match the frozen `review-ref/` checkout
   at `cc9d811`, not the working tree, so commit 1 does not invalidate the
   in-flight parallel G3 review. The run holds only the binding so far; no
   report, no disposition, no tracker movement.

Left the em dashes in the `.opencode/` files alone: they are verbatim SpecKit
Plus upstream text, the identical strings already sit in the committed
`.claude/commands/` mirror, and `check:no-em-dash` does not scan either tree.
Normalizing them would break the byte-for-byte parity the commit establishes.

## Outcome

- ✅ Impact: OpenCode and Claude now run identical workflow command definitions; the Unit 2 G3 run 002 freeze is auditable in version control.
- 🧪 Tests: 7 of 8 content gates pass. `check:pipeline-gate` is red on the Units 2-6 `G2 en-draft` / `G3 en-review` tracker rows, which is the expected in-flight state of measurement run 002 and predates both commits.
- 📁 Files: 18 files across two commits, plus this record.
- 🔁 Next prompts: land the G3 run 002 report and gate logs beside the manifest; close the Units 3, 4 and 6 G1 partition decisions; render the 34 outstanding figures for Units 3-6.
- 🧠 Reflection: the digest check against `review-ref/` was the load-bearing step. Committing the agent frontmatter change without it would have looked harmless while silently putting the parallel review's binding in question.

## Evaluation notes (flywheel)

- Failure modes observed: none. The one real hazard, a tooling commit invalidating in-flight review evidence, was ruled out by comparing worktree, HEAD and `review-ref/` digests against the manifest before staging.
- Graders run and results (PASS/FAIL): content gate suite PASS except the pre-existing `check:pipeline-gate` FAIL.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): have `scripts/review-evidence.mjs` print the resolved root and its commit when preparing a manifest, so the `review-ref/` binding is self-evident from the artifact instead of needing a manual three-way digest comparison.
