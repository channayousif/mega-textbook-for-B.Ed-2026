---
id: crew-gent-401-u06-translate
title: crew translate GENT-401 unit 6
stage: misc
date: 2026-11-24
surface: agent
model: claude
feature: gent-401
branch: crew/gent-401-u06-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-06/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-06/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-06/unit-teacher-notes.mdx
 - specs/content/gent-401/reviews/unit-06/G4/translation-handoff.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-06/fig-U6-1.ur.dark.svg
 - static/img/figures/gent-401/unit-06/fig-U6-1.ur.svg
 - static/img/figures/gent-401/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/gent-401/unit-06/fig-U6-2.ur.svg
 - static/img/figures/gent-401/unit-06/fig-U6-3.ur.dark.svg
 - static/img/figures/gent-401/unit-06/fig-U6-3.ur.svg
 - static/img/figures/gent-401/unit-06/fig-U6-4.ur.dark.svg
 - static/img/figures/gent-401/unit-06/fig-U6-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u06-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u06-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GENT-401 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-06/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gent-401-u06-author-conflict3, fix, claude_crew) The openstax consulted list keeps both sides' section slugs, so 8-1 and 13-1 each appear twice with different slugs; neither side's slugs match the real title-derived OpenStax URLs (e.g. `8-1-entrepreneurial-marketing-and-the-marketing-mix`), so a job that owns this file should verify and dedupe the whole line.
- (gent-401-u06-author-conflict3, fix, claude_crew) Unit 6 G3 en-review and the Urdu G4/G5 mirror are still open; the reviewer should verify SECP eZfile incorporation steps and IPO-Pakistan IP classifications.
- (gent-401-u06-author-conflict3, fix, claude_crew) Unit 6 G2 evidence is now `20261124T101619522Z` (the two older files are orphaned but still validate); figures are English-only with banner fig-U6-5 prompt-only for the illustrate job.
- (gent-401-u06-author-conflict2, fix, claude_crew) Unit 6 G3 en-review and the Urdu G4/G5 mirror are still open; the reviewer should verify SECP eZfile incorporation steps and IPO-Pakistan IP classifications.
- (gent-401-u06-author-conflict2, fix, claude_crew) Unit 6 figures are placed in English only (fig-U6-1 to fig-U6-4, no .ur.svg yet); banner fig-U6-5 is prompt-only for the illustrate job.


## Response snapshot

Added the complete draft Urdu mirror of GENT-401 Unit 6 (five pages, four RTL `.ur.svg` figures with dark variants, `key_terms` from the terminology bank, G4 handoff and tracker notes) with all 14 content gates passing.

## Outcome

- Impact: translate for GENT-401 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the complete draft Urdu mirror of GENT-401 Unit 6 (five pages, four RTL `.ur.svg` figures with dark variants, `key_terms` from the terminology bank, G4 handoff and tracker notes) with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English inconsistencies left as written: topic 6.2 patent example says "80 percent less wire" but fig-U6-4 says "half normal cost"; ERQ 1 names three academies but describes only A and B.
  - Rendered Urdu pages not inspected (no build allowed, not yet on production); G5 should check at 360px and in A4 print, and look at the tight two-line cell in fig-U6-2 row 2.
  - Assessment section uses the bank term جامع تشخیص where Unit 1 used the unbanked اختتامی تشخیص; the owner may want the course to settle on one.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
