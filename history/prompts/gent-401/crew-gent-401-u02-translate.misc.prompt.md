---
id: crew-gent-401-u02-translate
title: crew translate GENT-401 unit 2
stage: misc
date: 2026-11-24
surface: agent
model: claude
feature: gent-401
branch: crew/gent-401-u02-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-02/unit-teacher-notes.mdx
 - specs/content/gent-401/reviews/unit-02/G4/translation-handoff.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-1.ur.svg
 - static/img/figures/gent-401/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-2.ur.svg
 - static/img/figures/gent-401/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-3.ur.svg
 - static/img/figures/gent-401/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u02-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GENT-401 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-02/`.

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
- (gent-401-u02-author-conflict1, fix, claude_crew) Unit 2 G2 evidence at reviews/unit-02/G2/20261124T045217007Z-gates.json is still fresh at the merge commit; no re-run needed.
- (gent-401-u02-author-conflict1, fix, claude_crew) Unit 2 remains English-only (no `.ur.svg`, no Urdu mirror); banner `fig-U2-5` is still a prompt-only row for the illustrate job, and G3/G5 are unticked.
- (gent-401-u02-author-conflict1, fix, claude_crew) glossary.json will keep conflicting for every sibling gent-401 job; the fix is always main's entries first, then the branch's, with no duplicate terms.
- (gent-401-u02-author, author, claude_crew) G3 reviewer should confirm the `qamar-2020-social` row against its OpenAlex record W3118924195 (the DOI host `ojstest.umt.edu.pk` did not resolve on 2026-11-24) and the `butler-iea` edition year (spec says 2020).
- (gent-401-u02-author, author, claude_crew) `mellor-2009` is declared under `## Unverifiable sources` and backs only general background; no page or wording is claimed.


## Response snapshot

Translated GENT-401 Unit 2 into a complete draft Urdu mirror (five pages, four mirrored `.ur.svg` figures with dark variants, a G4 handoff and tracker notes), committed with all content gates passing and translation_status still draft.

## Outcome

- Impact: translate for GENT-401 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GENT-401 Unit 2 into a complete draft Urdu mirror (five pages, four mirrored `.ur.svg` figures with dark variants, a G4 handoff and tracker notes), committed with all content gates passing and translation_status still draft.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Urdu figure labels and pages have not been seen rendered (no render-inspect, and ImageMagick couldn't draw the styled text), so G5 must inspect `fig-U2-*.ur.svg` and the pages at narrow width and in A4 print.
  - `glossary.json` `definition_ur` for "Small business" says "مقامی بازار کو اہتمام کرتا ہے", which is not idiomatic Urdu and needs a glossary fix outside this unit's scope.
  - None of the unit's core terms are in the bank; the proposed Urdu terms are listed in `reviews/unit-02/G4/translation-handoff.md` for the owner to decide.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
