---
id: crew-gqur-301-u14-translate
title: crew translate GQUR-301 unit 14
stage: misc
date: 2026-10-22
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u14-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/unit-assessment.mdx
 - specs/content/gqur-301/reviews/unit-14/translation-validation/check-content-draft.txt
 - specs/content/gqur-301/reviews/unit-14/translation-validation/check-content-temporary-reviewed.txt
 - specs/content/gqur-301/reviews/unit-14/translation-validation/figure-variants.txt
 - specs/content/gqur-301/reviews/unit-14/translation-validation/handoff.md
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-14/fig-U14-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-1.ur.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-2.ur.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-3.ur.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-14/fig-U14-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u14-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u14-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 14 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 14 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-14/`.

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
- (gqur-301-u14-review_en, review_en, claude) F1 (data sum 503 not 513) touches topic-01, topic-02, all four fig-U14 SVGs plus dark variants, and the RRQ 1 key; fix them together and re-measure fig-U14-4.
- (gqur-301-u14-review_en, review_en, claude) F3 (z vs t) may need an owner ruling if the course intends z only; until then items that supply z* stay answerable.
- (gqur-301-u14-review_en, review_en, claude) static/content-status.json is tracked and out of date on origin/main; check:content-status fails there too.
- (gqur-301-u14-author, author, opencode) SVGs authored by Claude as secondary fallback under ADR-0024 (Codex unavailable); used plain ASCII math labels (x-bar, p-hat, sqrt) to avoid hex-color-literal false positives. Unit still needs independent G3 review, G4 Urdu translation, G5 Urdu review, and .ur.svg figure variants before publication.


## Response snapshot

Added the complete draft Urdu mirror of GQUR-301 Unit 14 (4 MDX pages, 4 `.ur.svg` figures with dark variants), a translation handoff, and a G4 tracker note, with translation_status left as draft.

## Outcome

- Impact: translate for GQUR-301 Unit 14 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the complete draft Urdu mirror of GQUR-301 Unit 14 (4 MDX pages, 4 `.ur.svg` figures with dark variants), a translation handoff, and a G4 tracker note, with translation_status left as draft.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Urdu mirror keeps the English G3 findings F1-F5 unchanged (sum 513, 30.5-37.9 range, z with s, rubric 2.12-2.68), and `fig-U14-2.ur.svg` shows `513 / 15`. When the English is repaired, apply the same fixes to the Urdu pages and figures and re-run G4.
  - Nobody has viewed the Urdu pages or figures rendered. Nastaliq is tall, so the step boxes in fig-U14-3 and the reading panels in fig-U14-1/2 are where clipping is most likely. Run `render-inspect.mjs GQUR-301 14 --locale ur` before G5.
  - Several glossary.json `definition_ur` entries these pages show are corrupted (Confidence level, Margin of error, Normal model, Estimator). They are out of scope for this unit; the glossary owner needs to fix them.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
