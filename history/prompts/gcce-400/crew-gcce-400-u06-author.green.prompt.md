---
id: crew-gcce-400-u06-author
title: crew author GCCE-400 unit 6
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: gcce-400
branch: crew/gcce-400-u06-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-06/index.mdx
 - docs/semester-4/gcce-400/unit-06/topic-01.mdx
 - docs/semester-4/gcce-400/unit-06/topic-02.mdx
 - docs/semester-4/gcce-400/unit-06/topic-03.mdx
 - docs/semester-4/gcce-400/unit-06/unit-assessment.mdx
 - docs/semester-4/gcce-400/unit-06/unit-teacher-notes.mdx
 - glossary.json
 - specs/content/gcce-400/concepts/unit-06.md
 - specs/content/gcce-400/coverage/unit-06.md
 - specs/content/gcce-400/figures/unit-06.banner.md
 - specs/content/gcce-400/figures/unit-06.md
 - specs/content/gcce-400/reviews/unit-06/G2/20261122T122147614Z-gates.json
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-06/G2/logs-20261122T122147614Z/validate-content.txt
 - specs/content/gcce-400/sources/texts/ali-2023-misinformation.md
 - specs/content/gcce-400/sources/texts/coe-2019-dce.md
 - specs/content/gcce-400/sources/texts/iftikhar-2023-digital-divide.md
 - specs/content/gcce-400/sources/texts/khalid-2026-social-media-civic.md
 - specs/content/gcce-400/sources/unit-06.md
 - specs/content/gcce-400/tasks.md
 - static/img/figures/gcce-400/unit-06/fig-U6-1.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-1.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-2.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-2.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-3.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-3.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-4.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-4.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-5.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-5.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-6.dark.svg
 - static/img/figures/gcce-400/unit-06/fig-U6-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u06-author

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author GCCE-400 Unit 6 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-06/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Response snapshot

Authored GCCE-400 Unit 6 (Digital Citizenship and Technology) as three per-topic cycles, a 10/10/5 unit assessment, teacher notes, six placed schematic SVGs with derived dark variants and a banner prompt, plus coverage, sources, concepts, bound source notes and seven new glossary entries. Recorded the G2 gate evidence and ticked the tracker row; all 14 content gates pass.

## Outcome

- ✅ Impact: author for GCCE-400 Unit 6 by claude (attempt 1).
- 🧪 Tests: npm run check:content passed in the job worktree (all 14 content gates).
- 📁 Files: 38 file(s), listed above.
- 🔁 Next prompts: the crew planner derives the unit's next stage from main after merge.
- 🧠 Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: GCCE-400 Unit 6 English draft at the per-topic standard, with six placed schematic figures (fig-U6-1 to fig-U6-6) and a prompt-only banner (fig-U6-7), coverage, sources, concepts, bound source notes and G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything. The CoE handbook was read through an Internet Archive snapshot because rm.coe.int returns HTTP 403 from this host; the bound note records this.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The branch base is 4823107ca; origin/main advanced to 430e60570 (Unit 2 merged) while this job ran, so `git diff origin/main..HEAD` also shows Unit 2 as deleted. Merge main before opening the PR.
  - G3 en-review stays open; the tracker note asks the reviewer to confirm the CoE attribution, the Shair et al. (2022) figures and the Pakistani examples in `sources/unit-06.md`.
  - Banner `fig-U6-7` remains prompt-only for the illustrate job, and no `.ur.svg` figures exist yet because the Urdu mirror is a separate job.
  - Seven glossary entries were added (digital platform, digital civic engagement, cyber ethics, misinformation, disinformation, digital divide, digital literacy); their Urdu definitions are authored and need G5 checking.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 0 earlier attempt(s); first attempt on this unit.
- Graders run and results (PASS/FAIL): check:content PASS.
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): none.
