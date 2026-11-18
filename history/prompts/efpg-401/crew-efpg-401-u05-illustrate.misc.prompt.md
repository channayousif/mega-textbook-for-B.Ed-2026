---
id: crew-efpg-401-u05-illustrate
title: crew illustrate EFPG-401 unit 5
stage: misc
date: 2026-11-19
surface: agent
model: agy
feature: efpg-401
branch: crew/efpg-401-u05-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efpg-401/unit-05/index.mdx
 - docs/semester-3/efpg-401/unit-05/topic-01.mdx
 - docs/semester-3/efpg-401/unit-05/topic-03.mdx
 - docs/semester-3/efpg-401/unit-05/topic-04.mdx
 - docs/semester-3/efpg-401/unit-05/topic-06.mdx
 - history/prompts/efpg-401/crew-efpg-401-u05-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-06.mdx
 - specs/content/efpg-401/figures/unit-05.banner.md
 - specs/content/efpg-401/figures/unit-05.md
 - specs/content/efpg-401/reviews/unit-05/G2/20261118T200124659Z-gates.json
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T200124659Z/check-bloom-bands.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T200124659Z/check-concept-graph.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T200124659Z/check-depth-gate.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T200124659Z/check-docs-sync.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T200124659Z/check-figures.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T200124659Z/check-no-answer-keys.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T200124659Z/check-no-em-dash.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T200124659Z/validate-content.txt
 - specs/content/efpg-401/tasks.md
 - static/img/figures/efpg-401/unit-05/fig-U5-15.webp
 - static/img/figures/efpg-401/unit-05/fig-U5-16.webp
 - static/img/figures/efpg-401/unit-05/fig-U5-17.webp
 - static/img/figures/efpg-401/unit-05/fig-U5-18.webp
 - static/img/figures/efpg-401/unit-05/fig-U5-19.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u05-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u05-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFPG-401 Unit 5 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-401 5` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it picks the image producer itself (agy, then gflow while the owner's PC is reachable, then Codex; each image's producer is printed on its ✓ line), optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-05/`.

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
- (efpg-401-u05-plan_illustrations, plan_illustrations, claude) The Urdu topic files carry the new markers with the English prompt and alt text. The illustrate job should turn them into `<Figure>` elements with Urdu alt text.
- (efpg-401-u05-plan_illustrations, plan_illustrations, claude) `scripts/prepare-gate-evidence.mjs` needs the course code in capitals (`EFPG-401 5`). With `efpg-401` it fails with "invalid unit or stage".
- (efpg-401-u05-translate, translate, claude) `specs/content/efpg-401/concepts/unit-05.md` has wrong Urdu labels that I left alone because the file is a hashed G2 input: `سبقی منصوبے کے ساتھ مراحل` should use سات ("seven") rather than ساتھ ("with"), and `شعری سبق کا سير` uses an Arabic yeh. Fixing them means regenerating the G2 evidence.
- (efpg-401-u05-translate, translate, claude) The rendered Urdu (Nastaliq at 360px and A4 print) has not been checked; run `scripts/render-inspect.mjs EFPG-401 5 --locale ur --base https://textbook.com.pk` once the unit is deployed, before G5.
- (efpg-401-u05-translate, translate, claude) The English doesn't give a gender for several unnamed colleagues, but Urdu verbs need one, so I chose feminine in Topics 5.1, 5.5 and 5.6 and masculine in 5.2 and 5.7. The owner or the G5 reviewer may want to change these.

## Response snapshot

Inspected and placed all five EFPG-401 Unit 5 raster illustrations (fig-U5-15 banner, fig-U5-16, fig-U5-17, fig-U5-18, and fig-U5-19) in English and Urdu unit and topic files, updated figure manifests to placed, refreshed passing G2 evidence, and confirmed clean pass across all 14 content gates.

## Outcome

- Impact: illustrate for EFPG-401 Unit 5 by agy.
- Tests: npm run check:content passed in the job worktree.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Inspected and placed all five EFPG-401 Unit 5 raster illustrations (fig-U5-15 banner, fig-U5-16, fig-U5-17, fig-U5-18, and fig-U5-19) in English and Urdu unit and topic files, updated figure manifests to placed, refreshed passing G2 evidence, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Topics 5.2, 5.5 and 5.7 have no illustration on purpose, as their situations turn on a written plan, text emotions, or tense choices where text-free images would only decorate.
  - Rendered Urdu pages were not inspected locally due to host limits; G5 must check deployed /ur/ pages.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
