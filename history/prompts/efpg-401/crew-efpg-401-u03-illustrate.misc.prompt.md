---
id: crew-efpg-401-u03-illustrate
title: crew illustrate EFPG-401 unit 3
stage: misc
date: 2026-11-18
surface: agent
model: agy
feature: efpg-401
branch: crew/efpg-401-u03-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efpg-401/unit-03/index.mdx
 - docs/semester-3/efpg-401/unit-03/topic-01.mdx
 - docs/semester-3/efpg-401/unit-03/topic-02.mdx
 - docs/semester-3/efpg-401/unit-03/topic-03.mdx
 - docs/semester-3/efpg-401/unit-03/topic-05.mdx
 - history/prompts/efpg-401/crew-efpg-401-u03-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/topic-05.mdx
 - specs/content/efpg-401/figures/unit-03.banner.md
 - specs/content/efpg-401/figures/unit-03.md
 - specs/content/efpg-401/reviews/unit-03/G2/20261118T174227190Z-gates.json
 - specs/content/efpg-401/reviews/unit-03/G2/logs-20261118T174227190Z/check-bloom-bands.txt
 - specs/content/efpg-401/reviews/unit-03/G2/logs-20261118T174227190Z/check-concept-graph.txt
 - specs/content/efpg-401/reviews/unit-03/G2/logs-20261118T174227190Z/check-depth-gate.txt
 - specs/content/efpg-401/reviews/unit-03/G2/logs-20261118T174227190Z/check-docs-sync.txt
 - specs/content/efpg-401/reviews/unit-03/G2/logs-20261118T174227190Z/check-figures.txt
 - specs/content/efpg-401/reviews/unit-03/G2/logs-20261118T174227190Z/check-no-answer-keys.txt
 - specs/content/efpg-401/reviews/unit-03/G2/logs-20261118T174227190Z/check-no-em-dash.txt
 - specs/content/efpg-401/reviews/unit-03/G2/logs-20261118T174227190Z/validate-content.txt
 - specs/content/efpg-401/tasks.md
 - static/img/figures/efpg-401/unit-03/fig-U3-13.webp
 - static/img/figures/efpg-401/unit-03/fig-U3-14.webp
 - static/img/figures/efpg-401/unit-03/fig-U3-15.webp
 - static/img/figures/efpg-401/unit-03/fig-U3-16.webp
 - static/img/figures/efpg-401/unit-03/fig-U3-17.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u03-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u03-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFPG-401 Unit 3 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 3` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it picks the image producer itself (agy, then gflow while the owner's PC is reachable, then Codex; each image's producer is printed on its ✓ line), optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-03/`.

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
- (efpg-401-u03-plan_illustrations, plan_illustrations, claude) The Urdu topic files carry the same marker IDs with English prompts; the illustrate job must swap them for `<Figure>` elements with Urdu alt text when it places the images.
- (efpg-401-u03-plan_illustrations, plan_illustrations, claude) Topics 3.4 and 3.6 have no illustration on purpose, because a text-free image of those situations would only decorate.
- (efpg-401-u03-translate, translate, claude) Urdu names for the methods differ from Unit 4's Urdu pages (قواعد و ترجمہ vs گرائمر-ترجمہ, ترسیلی vs ابلاغی); the owner should pick one form for the course.
- (efpg-401-u03-translate, translate, claude) English topic-04.mdx shows raw LaTeX (`$4 \times 4 \times 4 \times 4$`) because the site has no maths plugin; the Urdu uses plain text.
- (efpg-401-u03-translate, translate, claude) Rendered Urdu pages were not inspected (no build allowed); G5 must check the deployed /ur/ pages, especially the bidi in fig-U3-6 and fig-U3-10.

## Feedback from the previous attempt
worker exited 124 (timeout):
root agent idle; waiting for 1 background task(s) to finish
I have launched `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 3` in the background to generate the topic illustrations (fig-U3-14 through fig-U3-17) and will await its completion.
I have launched `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 3 --id fig-U3-15 --reuse-staging` to process the staged `fig-U3-15.png` and am awaiting its completion.
I have launched `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 3 --producer codex --id fig-U3-14` to test image generation via Codex, and am awaiting its completion.
I have launched `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 3 --producer codex --id fig-U3-14` in the background and am awaiting its completion.
I have launched `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 3 --id fig-U3-14` in the background and am awaiting its completion.
I have launched `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 3` to generate the remaining topic illustrations (fig-U3-16 and fig-U3-17) and am awaiting its completion.
I have launched `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 3 --banner` in the background to generate the unit banner illustration (fig-U3-13) and am awaiting its completion.
error: interrupted



## Response snapshot

Inspected and placed all five EFPG-401 Unit 3 raster illustrations (fig-U3-13 banner, fig-U3-14 through fig-U3-17) in English and Urdu topics, updated figure manifests, refreshed passing G2 evidence, and passed all 14 content gates.

## Outcome

- Impact: illustrate for EFPG-401 Unit 3 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Inspected and placed all five EFPG-401 Unit 3 raster illustrations (fig-U3-13 banner, fig-U3-14 through fig-U3-17) in English and Urdu topics, updated figure manifests, refreshed passing G2 evidence, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Topics 3.4 and 3.6 have no illustration on purpose, as their concepts turn on written words.
  - Rendered Urdu pages were not inspected locally due to host limits; G5 must check deployed /ur/ pages.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
