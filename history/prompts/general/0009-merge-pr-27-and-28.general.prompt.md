---
id: 0009
title: Merge PR 27 and PR 28
stage: green
date: 2026-09-10
surface: agent
model: claude-opus-5
feature: 008-rich-unit-pedagogy
branch: content-efmp-302-u1-ur-v3
user: channayousif@gmail.com
command: (chat)
labels: ["merge", "ci", "e2e", "spec-010", "urdu", "rtl"]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: history/adr/0017-visual-density-standard-and-figure-taxonomy.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/28
files:
 - tests/e2e/self-assessment-checklist.spec.ts
 - history/prompts/general/0009-merge-pr-27-and-28.general.prompt.md
tests:
 - npx playwright test tests/e2e/self-assessment-checklist.spec.ts (local, live Supabase)
 - npm test (142/142)
 - validate:content, check:figures, check:depth-gate, check:no-em-dash, check:pipeline-gate, check:no-answer-keys
---

## Prompt

then merge #27 and #28

## Response snapshot

#27 (Spec 012, visual-density standard) was `MERGEABLE / CLEAN` with build and e2e green, and
was merged into `main`. Its branch was deliberately NOT deleted at merge time, because #28 was
still based on it and deleting the base would have disturbed the stacked PR.

#28 (EFMP-302 Unit 1 Urdu re-translation) was red on e2e. The failure was a consequence of
#28's own content, not a defect:

```
tests/e2e/self-assessment-checklist.spec.ts:145
expect(getByTestId('self-assessment-checkbox-1')).toHaveCount(0)   Received: 1
```

That spec's header states its premise explicitly: "no course's Urdu translation has a completed
per-topic self-assessment checklist yet (every `## خود جائزہ فہرست` section in this repo is
still a `<!-- TODO -->` placeholder with zero real `- [ ]` items)". It therefore asserted the
graceful-fallback path on the Urdu page. #28 translates `efmp-302/unit-01/topic-01`, which now
carries four real Urdu checklist items, so that page hydrates into a working checklist and the
fallback no longer applies to it.

Rather than weaken the assertion, the UR section was upgraded to the claim the file said it
could not yet make. The old NOTE conceded the bilingual interactive claim "rests on the
mechanism being locale-agnostic by construction ... verified in `en` above"; it is now verified
in `ur` directly:

```ts
await expect(pageA.getByTestId('self-assessment-checkbox-1')).toBeEnabled();
await expect(pageA.getByTestId('self-assessment-checkbox-4')).toBeEnabled();
await expect(pageA.getByTestId('self-assessment-sync-hint')).toBeVisible();
```

Checked STATE is deliberately not asserted: localStorage is per-origin and shared across
locales, so tick state carries over from the `en` steps and asserting it would be vacuous -
the same class of mistake that produced #26's CI failure. The fallback path stays covered by
the locale-independent unit fixtures in `tests/unit/`.

#28 was also retargeted from the now-merged `012-visual-density-standard` to `main`, and
`main` merged into it cleanly.

## Outcome

- ✅ Impact: #27 merged; #28 unblocked and its obsolete Urdu assertion replaced with stronger,
  now-possible coverage of the hydrated bilingual checklist.
- 🧪 Tests: self-assessment e2e PASS locally (15.0s); `npm test` 142/142; `tsc` clean; all six
  content gates PASS.
- 📁 Files: 1 e2e spec, 1 PHR.
- 🔁 Next prompts: #29 (Spec 011 dashboards) - needs its `build: failure` diagnosed and
  migrations 0038-0041 deployed to the self-hosted Supabase before merge.
- 🧠 Reflection: a test that hard-codes "this content does not exist yet" becomes a tripwire the
  moment the content lands. That is the correct behaviour - it forced the coverage upgrade
  instead of letting the Urdu interactive path stay unverified.

## Evaluation notes (flywheel)

- Failure modes observed: an e2e assertion encoding a transient content-state assumption
  ("no Urdu checklist exists yet") that a content PR legitimately invalidated.
- Graders run and results (PASS/FAIL): unit 142/142 PASS; six content gates PASS; tsc PASS;
  self-assessment e2e PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): grep the e2e suite for other assertions premised on
  content being absent or still-draft, which will break as translations land.
