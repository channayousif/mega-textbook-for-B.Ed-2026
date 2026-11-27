---
id: crew-efpg-402-u01-illustrate
title: crew illustrate EFPG-402 unit 1
stage: misc
date: 2026-11-27
surface: agent
model: agy
feature: efpg-402
branch: crew/efpg-402-u01-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpg-402/unit-01/index.mdx
 - history/prompts/efpg-402/crew-efpg-402-u01-illustrate.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-01/index.mdx
 - specs/content/efpg-402/figures/unit-01.banner.md
 - specs/content/efpg-402/reviews/unit-01/G2/20261127T132403083Z-gates.json
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T132403083Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T132403083Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T132403083Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T132403083Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T132403083Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T132403083Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T132403083Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T132403083Z/validate-content.txt
 - specs/content/efpg-402/tasks.md
 - static/img/figures/efpg-402/unit-01/fig-U1-11.webp
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u01-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u01-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for EFPG-402 Unit 1 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs EFPG-402 1 --producer gflow` for the topic scenes and again with `--banner` (same flags) for the unit banner (unit-NN.banner.md); this job holds the crew's gflow image lane, so use only that producer (other units' jobs use the other producers at the same time; each image's producer is printed on its ✓ line). If it exits 3 (gflow is out of quota), stop as described below and the crew moves the job to a free producer, optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-01/`.

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
- (efpg-402-u01-translate, translate, claude_crew) G2 evidence now points at `specs/content/efpg-402/reviews/unit-01/G2/20261127T102232075Z-gates.json`; any further edit to `specs/content/efpg-402/translations/unit-01/handoff.md` (or any unit-01-named file under `specs/content/efpg-402/`) re-stales it and needs `node scripts/prepare-gate-evidence.mjs --refresh-stale` again.
- (efpg-402-u01-translate, translate, claude_crew) Rendered Urdu is unverified because this brief forbids `npm run build`, a dev server and local `render-inspect.mjs`; G5 must inspect Nastaliq shaping, 360px and A4 print, and RTL table reading order.
- (efpg-402-u01-translate, translate, claude_crew) Banner `fig-U1-11` is still `prompt-only` for the illustrate job; G3 and G5 tracker rows stay open and `translation_status` stays `draft`.
- (efpg-402-u01-author, author, claude) catalog/course-guides.json was edited (EFPG-402 entry, pages 21-24, plus static/guides/semester-4/efpg-402.pdf) despite the brief's catalog ban, because validate:content requires it for the overview and sibling jobs did the same; revert if the ban covers this file.
- (efpg-402-u01-author, author, claude) Urdu mirror job needs ten .ur.svg label translations (generator kept at .crew/gen_figs.py); banner fig-U1-11 is prompt-only for the illustrate job; npm run build has not been run on these pages.


## Response snapshot

Produced, inspected, and placed the EFPG-402 Unit 1 banner illustration (fig-U1-11) into English and Urdu unit index files, updated manifests and task tracker, and refreshed G2 gate evidence.

## Outcome

- Impact: illustrate for EFPG-402 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced, inspected, and placed the EFPG-402 Unit 1 banner illustration (fig-U1-11) into English and Urdu unit index files, updated manifests and task tracker, and refreshed G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Banner illustration fig-U1-11 generated via gflow, verified against cultural guidelines, and placed in both English and Urdu index.mdx files.
  - Refreshed G2 gate evidence recorded at specs/content/efpg-402/reviews/unit-01/G2/20261127T132403083Z-gates.json with all 14 content gates passing cleanly.
  - G3 and G5 review stages remain open for independent qualified review; rendered Urdu layout inspection at 360px and A4 print remains pending G5.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
