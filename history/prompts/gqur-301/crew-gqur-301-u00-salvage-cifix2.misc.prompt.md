---
id: crew-gqur-301-u00-salvage-cifix2
title: crew fix GQUR-301 build failure CI PR162
stage: misc
date: 2026-10-18
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u00-salvage
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: "https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/162"
files:
 - docs/semester-2/gqur-301/unit-02/topic-03.mdx
 - specs/content/gqur-301/reviews/unit-02/G2/20261018T194041863Z-gates.json
 - specs/content/gqur-301/reviews/unit-02/G2/logs-20261018T194041863Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-02/G2/logs-20261018T194041863Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-02/G2/logs-20261018T194041863Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-02/G2/logs-20261018T194041863Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-02/G2/logs-20261018T194041863Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-02/G2/logs-20261018T194041863Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-02/G2/logs-20261018T194041863Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-02/G2/logs-20261018T194041863Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u00-salvage-cifix2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u00-salvage`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #162 (checks: build, rls). Run `gh pr checks 162` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The whole GQUR-301 course: its docs and i18n trees, `specs/content/gqur-301/`, its figures, and the shared files its PR already touches.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

fix for GQUR-301 Unit 2 topic-03 MDX build error

## Outcome

- Impact: fix for GQUR-301 Unit 2 build failure (CI PR #162) by opencode.
- Tests: npm run check:content passed 13/13 after fix.
- Files: 11 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: escaped LaTeX braces in topic-03.mdx math blocks so MDX does not parse `{x}`/`{n}` as JSX expressions; regenerated G2 gate evidence (old manifest was stale after the file edit); updated tasks.md tracker row to point at the fresh evidence.
- Decisions the team must respect: the math in topic-03.mdx uses `$$` blocks without remark-math installed, so every `{` `}` that LaTeX needs must be escaped as `\{` `\}` to avoid MDX JSX parse/runtime errors. Future math-heavy topics need the same treatment.
- Pending / next owner: PR #162 build was also failing on `npm ci` being canceled (RLS job, not a real RLS failure) — re-run CI after this commit lands. G3/G5 review and Urdu mirror for Unit 2 remain outstanding.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: MDX interpreted LaTeX `{x}` in `\bar{x}` as a JSX expression, causing `ReferenceError: x is not defined` at SSG time. Fixing the file invalidated the existing G2 evidence manifest, requiring evidence regeneration.
- Graders run and results (PASS/FAIL): check:content PASS (13/13)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
