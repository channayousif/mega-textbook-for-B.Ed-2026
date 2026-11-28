---
id: crew-guhq-301-u06-illustrate
title: crew illustrate GUHQ-301 unit 6
stage: misc
date: 2026-11-28
surface: agent
model: agy
feature: guhq-301
branch: crew/guhq-301-u06-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/guhq-301/unit-06/index.mdx
  - docs/semester-3/guhq-301/unit-06/topic-01.mdx
  - history/prompts/guhq-301/crew-guhq-301-u06-illustrate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-06/topic-01.mdx
  - specs/content/guhq-301/figures/unit-06.banner.md
  - specs/content/guhq-301/figures/unit-06.md
  - specs/content/guhq-301/reviews/unit-06/G2/20261128T152533535Z-gates.json
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261128T152533535Z/check-bloom-bands.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261128T152533535Z/check-concept-graph.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261128T152533535Z/check-depth-gate.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261128T152533535Z/check-docs-sync.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261128T152533535Z/check-figures.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261128T152533535Z/check-no-answer-keys.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261128T152533535Z/check-no-em-dash.txt
  - specs/content/guhq-301/reviews/unit-06/G2/logs-20261128T152533535Z/validate-content.txt
  - specs/content/guhq-301/tasks.md
  - static/img/figures/guhq-301/unit-06/fig-U6-4.webp
  - static/img/figures/guhq-301/unit-06/fig-U6-5.webp
tests:
  - npm run check:content
---

## Prompt

# Crew job guhq-301-u06-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u06-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GUHQ-301 Unit 6 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GUHQ-301 6 --producer meta` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's meta image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (meta is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-06/`.

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
- (guhq-301-u06-plan_illustrations, plan_illustrations, claude) The illustrate job should produce fig-U6-4 with `--banner` and fig-U6-5 from the topic 6.1 marker, then add the Urdu `<Figure>` with Urdu alt text when it places fig-U6-5.
- (guhq-301-u06-translate, translate, agy) G5 independent review must verify the six authored Urdu concept labels in `specs/content/guhq-301/concepts/unit-06.md` and check every rendered verse meaning against trusted translations.
- (guhq-301-u06-translate, translate, agy) G3 review must make the religious-content check per content-spec drafting note 7.
- (guhq-301-u06-author, author, agy) Urdu job needs `.ur.svg` for all three placed schematic figures and independent G5 review for the six authored Urdu concept labels.
- (guhq-301-u06-author, author, agy) G3 review must make the religious-content check (content-spec drafting note 7); classroom scenarios and pedagogical applications are flagged as instructional models.


## Response snapshot

Generated topic illustration fig-U6-5 and unit banner fig-U6-4 via meta producer, inspected both assets for visual, pedagogical and cultural compliance, placed them in English and Urdu pages, updated manifests to placed, generated G2 gate evidence, and verified clean content gates.

## Outcome

- Impact: illustrate for GUHQ-301 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before committing.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed the GUHQ-301 Unit 6 topic illustration (fig-U6-5) and banner illustration (fig-U6-4) in both English and Urdu index/topic pages, updated figure manifests, refreshed G2 gate evidence, and verified that all 14 content gates pass cleanly.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit banner fig-U6-4 and topic illustration fig-U6-5 are placed; Unit 6 G3 review and G5 review remain open for independent evaluation.
  - G5 independent review must verify the six authored Urdu concept labels in `specs/content/guhq-301/concepts/unit-06.md` and check every rendered verse meaning against trusted translations.
  - G3 review must make the religious-content check per content-spec drafting note 7.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
