---
id: crew-gcce-400-u03-illustrate
title: crew illustrate GCCE-400 unit 3
stage: green
date: 2026-11-23
surface: agent
model: agy
feature: gcce-400
branch: crew/gcce-400-u03-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: history/adr/0029-local-image-generation-flow-and-agy-role.md
  pr: null
files:
  - docs/semester-4/gcce-400/unit-03/index.mdx
  - docs/semester-4/gcce-400/unit-03/topic-01.mdx
  - docs/semester-4/gcce-400/unit-03/topic-02.mdx
  - history/prompts/gcce-400/crew-gcce-400-u03-illustrate.green.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/topic-02.mdx
  - specs/content/gcce-400/figures/unit-03.banner.md
  - specs/content/gcce-400/figures/unit-03.md
  - specs/content/gcce-400/reviews/unit-03/G2/20261123T063911326Z-gates.json
  - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T063911326Z/check-bloom-bands.txt
  - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T063911326Z/check-concept-graph.txt
  - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T063911326Z/check-depth-gate.txt
  - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T063911326Z/check-docs-sync.txt
  - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T063911326Z/check-figures.txt
  - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T063911326Z/check-no-answer-keys.txt
  - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T063911326Z/check-no-em-dash.txt
  - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T063911326Z/validate-content.txt
  - specs/content/gcce-400/tasks.md
  - static/img/figures/gcce-400/unit-03/fig-U3-5.webp
  - static/img/figures/gcce-400/unit-03/fig-U3-6.webp
  - static/img/figures/gcce-400/unit-03/fig-U3-7.webp
tests:
  - npm run check:content
---

## Prompt

# Crew job gcce-400-u03-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u03-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GCCE-400 Unit 3 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GCCE-400 3` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it picks the image producer itself (agy, then gflow while the owner's PC is reachable, then Codex; each image's producer is printed on its ✓ line), optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-03/`.

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
- (gcce-400-u03-plan_illustrations, plan_illustrations, claude) `fig-U3-5` (banner), `fig-U3-6` and `fig-U3-7` are prompt-only; the illustrate job generates and places them and adds the Urdu `<Figure>` with Urdu alt text to the Urdu topic files.
- (gcce-400-u03-plan_illustrations, plan_illustrations, claude) Unit 3 G3 en-review is still open (constitutional currency of Articles 8-28 and Article 5); the new scene markers don't change the prose.
- (gcce-400-u03-translate, translate, claude_crew) `scripts/render-inspect.mjs --locale ur` was not run; G5 owns the 360px and A4 print inspection and the RTL reading order of `fig-U3-1` and `fig-U3-2`.
- (gcce-400-u03-translate, translate, claude_crew) G3 en-review is still open (constitutional currency of Articles 8-28 and Article 5); any G3 correction to the English must be mirrored here before G5.
- (gcce-400-u03-translate, translate, claude_crew) this branch is based on `252004ace`; `origin/main` has since advanced to `3260222eb` (PR #716), so the crew lead should rebase or merge before CI.

## Response snapshot

Generated raster illustrations fig-U3-5 (unit banner), fig-U3-6 (Topic 3.1), and fig-U3-7 (Topic 3.2) using generate-illustration.mjs via gflow (Nano Banana). Read and visually inspected all three WebP images for pedagogical alignment and cultural authenticity (Sindhi school/office/veranda settings, shalwar kameez and dupattas, blank registers and papers, no readable text, no sacred depictions). Placed Figure components in English and Urdu index and topic files, transitioned manifest rows to placed, recorded fresh G2 gate evidence, updated task tracker, and verified all 14 content gates pass.

## Outcome

- Impact: illustrate GCCE-400 Unit 3 raster figures (fig-U3-5, fig-U3-6, fig-U3-7) and place in English and Urdu files.
- Tests: npm run check:content passed (14/14 content gates).
- Files: 21 file(s), listed above.
- Next prompts: crew lead merges branch or schedules downstream reviews.
- Reflection: None.

## Handoff (for CEO and agents)

- Shipped / changed: GCCE-400 Unit 3 illustrations fig-U3-5 (banner), fig-U3-6 (Topic 3.1), and fig-U3-7 (Topic 3.2) generated, inspected, and placed in English and Urdu MDX files; manifests updated to placed; fresh G2 gate evidence recorded and tracked.
- Decisions the team must respect: G3 en-review and G5 ur-review remain open and independent.
- Pending / next owner: crew lead / G3 reviewer.
- Notes for the next job on this unit:
  - G3 en-review remains open (confirm constitutional currency of Articles 8-28 and Article 5).
  - G5 ur-review remains open (owns 360px and A4 print inspection, RTL reading order of fig-U3-1 and fig-U3-2).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): check:content PASS (14/14 content gates).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
