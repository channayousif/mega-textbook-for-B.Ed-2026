---
id: crew-efmp-304-u00-fix
title: crew add EFMP-304 Urdu course overview
stage: misc
date: 2026-11-10
surface: agent
model: gemini-flash
feature: efmp-304
branch: crew/efmp-304-u00-fix
user: crew
command: crew fix
labels: ["crew", "agy", "fix", "efmp-304"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/course-overview.mdx
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief contents:
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

Added the Urdu course overview for EFMP-304 at `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/course-overview.mdx`, mirroring English `docs/semester-2/efmp-304/course-overview.mdx` exactly with frontmatter matching `contracts/course-overview.schema.json`, `translation_status: draft`, no em dashes, and compliant terminology. Verified that all 14 content gates pass cleanly.

## Outcome

- Impact: Urdu course overview for EFMP-304 added with draft translation status.
- Tests: `npm run build:content-status && npm run check:content` passed (14/14 content gates).
- Files: `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/course-overview.mdx`.
- Next prompts: Independent review when scheduled.
- Reflection: None.

## Handoff (for CEO and agents)

- Shipped / changed: Added `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/course-overview.mdx`.
- Decisions the team must respect: `translation_status` remains `draft`; no G4/G5 rows ticked; G3/G5 stay open without qualified sign-off.
- Pending / next owner: independent G5 review when scheduled.
- Notes for the next job on this unit:
  - Urdu overview translation_status is draft.
  - No G4 or G5 gates were modified.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
