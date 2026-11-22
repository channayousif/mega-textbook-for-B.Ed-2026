---
id: crew-gqur-301-u05-illustrate
title: crew illustrate GQUR-301 unit 5
stage: misc
date: 2026-11-22
surface: agent
model: agy
feature: gqur-301
branch: crew/gqur-301-u05-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-05/index.mdx
 - docs/semester-2/gqur-301/unit-05/topic-01.mdx
 - docs/semester-2/gqur-301/unit-05/topic-02.mdx
 - docs/semester-2/gqur-301/unit-05/topic-03.mdx
 - history/prompts/gqur-301/crew-gqur-301-u05-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-05/topic-03.mdx
 - specs/content/gqur-301/figures/unit-05.banner.md
 - specs/content/gqur-301/figures/unit-05.md
 - specs/content/gqur-301/reviews/unit-05/G2/20261122T100009756Z-gates.json
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261122T100009756Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261122T100009756Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261122T100009756Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261122T100009756Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261122T100009756Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261122T100009756Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261122T100009756Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-05/G2/logs-20261122T100009756Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-05/fig-U5-7.webp
 - static/img/figures/gqur-301/unit-05/fig-U5-8.webp
 - static/img/figures/gqur-301/unit-05/fig-U5-9.webp
 - static/img/figures/gqur-301/unit-05/fig-U5-10.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u05-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u05-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GQUR-301 Unit 5 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GQUR-301 5` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it picks the image producer itself (agy, then gflow while the owner's PC is reachable, then Codex; each image's producer is printed on its ✓ line), optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-05/`.

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
- (gqur-301-u05-plan_illustrations, plan_illustrations, claude) The illustrate job should produce `fig-U5-7` with `--banner`, then `fig-U5-8`, `fig-U5-9` and `fig-U5-10`, and check that the images show no numbers or labels, since every scene leans on charts, slips or tallies.
- (gqur-301-u05-plan_illustrations, plan_illustrations, claude) The topic 5.2 situation in the text is a Karachi garment workshop, but its picture is a B.Ed classroom acting it out, because the brief requires a school setting.
- (gqur-301-u05-repair_en-r1, repair_en, opencode) The report's three content findings were already fixed by commit c358e8dc9; this pass strengthened them, so a fresh independent G3 review is still required. Uncertain findings P1-P4 (author/run provenance, open G1, solve-before-key verification, rendered narrow/A4 inspection) remain for the evaluator/review host.
- (gqur-301-u05-repair_en-conflict5, fix, opencode) Unit 5 P1-P4 (author/run provenance, open G1 under D-2026-0070, answer-blind verification, rendered narrow/A4 inspection) remain open for the evaluator/review host; G3 stays open (ADR-0019).
- (gqur-301-u05-repair_en-conflict5, fix, opencode) G5 should verify Nastaliq rendering and text-fit inside the inherited viewBox at narrow width and A4 print.

## Response snapshot

Generated, inspected, and placed all four GQUR-301 Unit 5 raster illustrations and banner (fig-U5-7, fig-U5-8, fig-U5-9, fig-U5-10) in English and Urdu topic and index files, transitioned figure manifests to placed, refreshed G2 gate evidence, and verified all 14 content gates pass.

## Outcome

- Impact: illustrate for GQUR-301 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree with all 14 content gates green.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated, inspected, and placed all four GQUR-301 Unit 5 raster illustrations and banner (fig-U5-7, fig-U5-8, fig-U5-9, fig-U5-10), updated manifests to placed, and refreshed G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All four raster illustrations (unit banner fig-U5-7, topic scenes fig-U5-8, fig-U5-9, fig-U5-10) were generated via gflow, inspected, accepted, placed with zero em dashes in both English and Urdu files, and validated across all 14 content gates.
  - G3 English review remains open for independent review on committed bytes; G1, provenance and narrow/A4 inspection remain open for the evaluator/review host.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
