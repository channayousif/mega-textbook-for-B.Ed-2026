---
id: crew-efpc-411-u01-illustrate
title: crew illustrate EFPC-411 unit 1
stage: misc
date: 2026-11-27
surface: agent
model: agy
feature: efpc-411
branch: crew/efpc-411-u01-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpc-411/unit-01/index.mdx
 - history/prompts/efpc-411/crew-efpc-411-u01-illustrate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/index.mdx
 - specs/content/efpc-411/figures/unit-01.banner.md
 - specs/content/efpc-411/reviews/unit-01/G2/20261127T101218554Z-gates.json
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T101218554Z/check-bloom-bands.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T101218554Z/check-concept-graph.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T101218554Z/check-depth-gate.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T101218554Z/check-docs-sync.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T101218554Z/check-figures.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T101218554Z/check-no-answer-keys.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T101218554Z/check-no-em-dash.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T101218554Z/validate-content.txt
 - specs/content/efpc-411/tasks.md
 - static/img/figures/efpc-411/unit-01/fig-U1-9.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efpc-411-u01-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u01-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFPC-411 Unit 1 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFPC-411 1 --producer gflow` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's gflow image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (gflow is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPC-411 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-01/`.

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
- (efpc-411-u01-translate, translate, claude_crew) English G3 is still `▢` (not accepted); this Urdu is bound to English `ff6248a9`, so any English repair requires matching Urdu repairs and a fresh G5.
- (efpc-411-u01-translate, translate, claude_crew) `render-inspect.mjs EFPC-411 1 --locale ur` was not run (brief bans dev servers/browser runs other than `measure-figure-text.mjs`); Nastaliq shaping at 360px, bidi punctuation and A4 clipping are unverified.
- (efpc-411-u01-translate, translate, claude_crew) `key_terms` deliberately carries only banked pairs; the 27 unbanked unit terms (classroom observation, checklist, rating scale, anecdotal record, observer bias, constructive feedback and so on) are proposals in the handoff for the owner, not silent bank edits.
- (efpc-411-u01-author-cifix1, fix, claude_crew) Push the branch so PR #882 re-runs CI; the RLS red was shared-DB schema drift (main's 0058), not EFPC-411 content.
- (efpc-411-u01-author-cifix1, fix, claude_crew) Unit 1 English is ready for independent G3; banner figure fig-U1-9 is still prompt-only for the illustration pipeline.

## Response snapshot

Generated and inspected the unit banner illustration fig-U1-9 with gflow, placed it as a Figure component in both English and Urdu index.mdx files, updated manifest and tasks, prepared G2 gate evidence, and validated check:content.

## Outcome

- Impact: illustration for EFPC-411 Unit 1 by agy.
- Tests: npm run check:content passed.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Generated unit banner illustration fig-U1-9 using gflow via scripts/generate-illustration.mjs, inspected image against cultural and pedagogical requirements (authentic Sindh classroom setting, modest dress, no text/calligraphy, matches alt text), placed in docs/semester-4/efpc-411/unit-01/index.mdx and i18n Urdu mirror, updated unit-01.banner.md to placed, generated G2 gate evidence, and updated tasks.md.
- Decisions the team must respect: G3/G5 stay advisory until qualified independent review; this PR does not certify anything.
- Pending / next owner: crew lead / independent reviewer for G3 English and G5 Urdu reviews.
- Notes for the next job on this unit:
  - English G3 is open; Urdu G4 draft mirror is in place.
  - All Unit 1 figures (eight schematic SVGs fig-U1-1 through fig-U1-8, and banner fig-U1-9) are now placed.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
