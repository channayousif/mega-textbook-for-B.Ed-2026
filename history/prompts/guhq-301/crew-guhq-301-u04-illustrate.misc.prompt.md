---
id: crew-guhq-301-u04-illustrate
title: crew illustrate GUHQ-301 unit 4
stage: misc
date: 2026-11-28
surface: agent
model: agy
feature: guhq-301
branch: crew/guhq-301-u04-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/guhq-301/unit-04/index.mdx
 - docs/semester-3/guhq-301/unit-04/topic-01.mdx
 - docs/semester-3/guhq-301/unit-04/topic-02.mdx
 - docs/semester-3/guhq-301/unit-04/topic-03.mdx
 - history/prompts/guhq-301/crew-guhq-301-u04-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-04/topic-03.mdx
 - specs/content/guhq-301/figures/unit-04.banner.md
 - specs/content/guhq-301/figures/unit-04.md
 - specs/content/guhq-301/reviews/unit-04/G2/20261128T135213972Z-gates.json
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261128T135213972Z/check-bloom-bands.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261128T135213972Z/check-concept-graph.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261128T135213972Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261128T135213972Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261128T135213972Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261128T135213972Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261128T135213972Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261128T135213972Z/validate-content.txt
 - specs/content/guhq-301/tasks.md
 - static/img/figures/guhq-301/unit-04/fig-U4-7.webp
 - static/img/figures/guhq-301/unit-04/fig-U4-8.webp
 - static/img/figures/guhq-301/unit-04/fig-U4-9.webp
 - static/img/figures/guhq-301/unit-04/fig-U4-10.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job guhq-301-u04-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u04-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GUHQ-301 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GUHQ-301 4 --producer gflow2` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's gflow2 image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (gflow2 is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-04/`.

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
- (guhq-301-u04-plan_illustrations, plan_illustrations, claude) Topic 4.1 places the class in a government boys' high school in Jacobabad, but topic 4.2 says it is "the same Class 9 group" and includes a girl, Sana. `fig-U4-9` follows topic 4.2 and shows her, so G3 should settle which is right and the illustrate job should check the scene against that.
- (guhq-301-u04-plan_illustrations, plan_illustrations, claude) Before placing `fig-U4-8`..`fig-U4-10`, the illustrate job must check that no phone screen, board or book shows Arabic script or scripture. It also adds the Urdu `<Figure>` with Urdu alt text.
- (guhq-301-u04-translate, translate, claude) Any new file under `specs/content/guhq-301/translations/unit-NN/` makes that unit's G2 evidence stale; re-run `prepare-gate-evidence.mjs` and repoint the tracker row after adding one.
- (guhq-301-u04-translate, translate, claude) Still pending: checking the rendered Urdu pages at 360px and A4, G3 fixing the English 103:1 error (copied into the Urdu), and G5 review of verse meanings and concept labels.
- (guhq-301-u04-author, author, opencode) Urdu job needs `.ur.svg` for all six figures and G5 review of the nine authored Urdu concept labels.


## Response snapshot

Generated, inspected, and placed the GUHQ-301 Unit 4 banner illustration (fig-U4-7) and three topic illustrations (fig-U4-8, fig-U4-9, fig-U4-10) in the English and Urdu topic/index pages, updated figure manifests, refreshed G2 gate evidence, and verified clean content gates.

## Outcome

- Impact: illustrate for GUHQ-301 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before completing.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed the GUHQ-301 Unit 4 banner illustration (fig-U4-7) and three topic illustrations (fig-U4-8, fig-U4-9, fig-U4-10) in English and Urdu pages, updated manifests to placed, refreshed G2 gate evidence, and passed all content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All four raster illustrations (banner fig-U4-7 and topic scenes fig-U4-8..fig-U4-10) are placed in English and Urdu; Unit 4 G3 review and G5 review remain open.
  - Still pending from earlier jobs: checking rendered Urdu pages at 360px and A4, G3 resolving English 103:1 verse division error, and G5 review of verse meanings and concept labels.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
