---
id: crew-batch-20261127-0745-cifix1
title: fix EFMP-301 Unit 5 slide answer-key phrase
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261127-0745
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/927
files:
 - specs/studio/slides/efmp-301/unit-05.json
 - history/prompts/crew/crew-batch-20261127-0745-cifix1.misc.prompt.md
tests:
 - node scripts/check-no-answer-keys.mjs
 - node scripts/build-studio-index.mjs
 - npm run build:content-status
 - npm run check:content
---

## Prompt

# Crew job batch-20261127-0745-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261127-0745`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #927 (checks: build). Run `gh pr checks 927` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#927) changes, which belong to the crew jobs efmp-303-u02-refresh_figures, efmp-301-u09-flashcards, efmp-301-u05-slides. Change only what the merge or CI needs.

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
- (batch-20261127-0301-cifix1, fix, claude_crew) CI's figure-geometry job still has to re-run and confirm on PR #921.
- (batch-20261127-0301-cifix1, fix, claude_crew) EFPC-411 Unit 1 G3/G4/G5 rows stay open; this PR certifies nothing.
- (batch-20261127-0301-cifix1, fix, claude_crew) Do not restore the longer Urdu label forms removed here (سپروائزر کی ہدایت میں, غیر کام والے جوڑے کو نام لے کر پرامن کیا, اور ریاضی کے مراحل کی وضاحت کرتی ہیں, متحرک کلاس پر غرق کرتا ہے): they overran the columns under the CI fallback face.
- (batch-20261125-1831-cifix1, fix, claude_crew) CI's figure-geometry job still has to re-run and confirm on PR #869; earlier batches on this PR family had the same local-passes/CI-pending pattern.
- (batch-20261125-1831-cifix1, fix, claude_crew) do not restore the longer `فطری طور پر پورا کرتی ہے` header line at x=448, it is the string that overran the column in DejaVu.

## Response snapshot

Read the failed build log: the Docusaurus build itself passed and only the built-output answer-key check failed, on `build/studio/slides/efmp-301/unit-05.en.html` and its `/ur/` copy, for the phrase "marking scheme". Traced it to `specs/studio/slides/efmp-301/unit-05.json` (slide 7, topic 2), where the bullet had compressed the topic text's "every way of giving marks" into "every marking scheme". Restored the topic's own wording, rebuilt the studio index, confirmed the generated deck is clean, and ran the content gates green.

## Outcome

- Impact: fix for CREW batch-20261127-0745 by claude_crew (attempt 1).
- Tests: `npm run check:content` passed (all 14 content gates); `node scripts/check-no-answer-keys.mjs` exit 0; `node scripts/build-studio-index.mjs` printed no "skipped slides"; regenerated `static/studio/slides/efmp-301/unit-05.en.html` and `.ur.html` contain no forbidden phrase.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: reworded the EFMP-301 Unit 5 slide outline bullet from "Every marking scheme either has a box for originality or trains it out" to the topic-02 wording "Every way of giving marks either has a box for originality or trains it out", removing the built-output answer-key hit on PR #927.
- Decisions the team must respect: the three prose patterns (answer key / marking scheme / correct answer) stay forbidden in built public output; slide points must restate the topic text without introducing those phrases.
- Pending / next owner: crew lead (auto-merge when CI is green). CI's build job must re-run and confirm on PR #927.
- Notes for the next job on this unit:
  - The committed `static/studio/slides/efmp-301/unit-05.en.pptx` still contains the old phrase; the gate does not scan `.pptx`, so this is a consistency leftover, not a CI failure. Regenerate offline with `scripts/studio/slides-pptx.py` if the deck download should match the outline.
  - The Urdu outline bullet already matched the new wording, so no UR change was needed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: a slide outline paraphrase introduced a forbidden answer-key phrase that only the built-output scan (not the source scan) catches, because `specs/studio/` is outside the gate's roots.
- Graders run and results (PASS/FAIL): check:content PASS; check:no-answer-keys PASS; build-studio-index PASS (no skipped slides).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): consider scanning generated `static/studio/slides/*.html` in the source answer-key gate so this class of defect fails locally too.
