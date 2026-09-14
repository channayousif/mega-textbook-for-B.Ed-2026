---
id: 0008
title: Close final three tasks
stage: green
date: 2026-09-14
surface: agent
model: claude-opus-5
feature: 017-reviewer-role
branch: 017-reviewer-role
user: M Yousif Channa
command: fix the test:rls env loading, do Three tasks
labels: ["impl-017", "reviewer", "rls-harness", "quickstart", "privilege-audit"]
links:
  spec: specs/017-reviewer-role/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/53
files:
 - tests/rls/_setup.mjs (new), vitest.rls.config.ts
 - specs/reviewers/human-reviewers.md (grant record)
 - specs/017-reviewer-role/quickstart.md (the prepare step, and two traps the walk found)
 - specs/017-reviewer-role/tasks.md (41/41)
tests:
 - npm run check:all - 14/14 PASS
 - full RLS suite with no manual env sourcing - 175 passed, 1 skipped, 0 failed
 - unconfigured RLS run - exits 1 with a named error (verified by moving .env.local aside)
---

## Prompt

fix the test:rls env loading, do Three tasks

## Response snapshot

**The RLS harness now refuses to run unconfigured.** `tests/rls/_setup.mjs` loads `.env.local` the
way `docusaurus.config.ts` does, then throws if any of the three variables is still missing. The
skip was worse than a missing feature: ci.yml's own comment says "treat a missing/skipped one as a
failing gate", and a suite of negative assertions that exits 0 while asserting nothing is
indistinguishable from one where every policy is wide open. `vitest.config.ts` includes
`tests/unit/**` alone, so nothing needed the skip to keep `npm test` green offline. Both paths
verified: configured 175 passed, unconfigured exit 1.

**T036, the grant.** Applied at the owner's instruction: `privilege_audit` row 6936, `false -> true`
on the owner's profile, `actor_id` **NULL**. I did not mint a session to make that row name them.
The null is accurate - no signed-in user performed the write - and `human-reviewers.md` records why,
plus the rule that a second null-actor row would be a defect rather than a precedent. A forged
actor in the first audit row of the first delegation of a content gate would have been the worse
outcome by a wide margin.

**T041, the walk, found three things.** The task named the wrong unit: EFMP-302 Unit 1's G5 has been
done since 2026-08-30, and the actually-open G5s are EFMP-301 Unit 1 and EFMP-302 Units 2-6.
`review:evidence prepare` is missing from the quickstart entirely, and it is not optional, because
the digests cannot come from a browser. And `Scheme-and-Course-guides/` is a bound input for every
review, so the untracked brand-strategy PDF was blocking `prepare` for **every unit in the
repository** - the error names the file but not the consequence.

The walk was a dry run and committed no certification. Nobody has reviewed EFMP-301 Unit 1's Urdu,
and writing a certification that says otherwise is the precise failure this feature exists to
prevent. What it proved: the binding refuses a G5 with no `g3_report`, the artefact carries 129
digests as a map rather than a path, and the tracker row parses back through the gate's own parser.

41/41 tasks.

## Outcome

- ✅ Impact: the feature is complete and exercised end to end; the RLS harness can no longer pass by asserting nothing.
- 🧪 Tests: check:all 14/14; RLS 175 passed with no manual env; unconfigured run fails loudly.
- 📁 Files: tests/rls/_setup.mjs, vitest.rls.config.ts, human-reviewers.md, quickstart.md, tasks.md.
- 🔁 Next prompts: merge #53; decide what to do with the untracked PDF, which blocks the review pipeline while it sits there.
- 🧠 Reflection: the walk was worth more than the code it validated. Three defects, and the one that mattered was invisible from reading any artefact - it took running the command in a dirty tree to find that one stray file blocks every review in the repository.

## Evaluation notes (flywheel)

- Failure modes observed: a test harness that skipped instead of failing, contradicting the CI comment sitting directly above its own invocation; a task that named a unit whose gate had been closed two weeks earlier; a quickstart that omitted the one command without which none of it works.
- Graders run and results (PASS/FAIL): check:all PASS 14/14; RLS PASS 175/176 (1 pre-existing skip); unconfigured-harness negative test PASS (exit 1).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): have `prepare`'s dirty-tree error say which bound root the offending file falls under, so the consequence is legible from the message.
