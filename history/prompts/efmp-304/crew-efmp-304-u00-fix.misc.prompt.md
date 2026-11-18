---
id: crew-efmp-304-u00-fix
title: crew fix EFMP-304 unit 0
stage: misc
date: 2026-11-09
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u00-fix
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-304/crew-efmp-304-u00-fix.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/course-overview.mdx
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u00-fix

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u00-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Add the Urdu course overview for EFMP-304 at i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/course-overview.mdx; main has only the English docs/semester-2/efmp-304/course-overview.mdx. Owner handover 2026-11-08: an untracked draft from the owner checkout is at ~/.crew/mega-book/handover/efmp-304-ur-course-overview.draft.mdx; use it as a starting point if it helps, but mirror the current English overview exactly (frontmatter, sections, links, guide notice), translate-unit rules and specs/content/terminology.csv apply, translation_status stays draft, and the Urdu topic titles follow existing EFMP-304 Urdu units. Make every content gate pass (npm run check:content) and open the PR. Do not tick G4/G5.

## Scope
The whole EFMP-304 course: its docs and i18n trees, `specs/content/efmp-304/`, its figures, and the shared files its PR already touches.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Added the draft Urdu course overview for EFMP-304 with full frontmatter, zero em dashes, and clean content gate checks.

## Outcome

- Impact: fix for EFMP-304 Unit 0 by agy (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the draft Urdu course overview for EFMP-304 with full frontmatter, zero em dashes, and clean content gate checks.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu course overview for EFMP-304 added at i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/course-overview.mdx with translation_status set to draft.
  - Tracker rows for G4 and G5 were left unticked in accordance with review governance.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
