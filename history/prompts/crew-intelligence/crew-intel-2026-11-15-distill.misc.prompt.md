---
id: crew-intel-2026-11-15-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-14
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-15-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-15.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-15-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-15-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-15.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [handoff] x7 recent, 7 total, since 2026-11-14: upstream image model gemini-n.n-flash-image quota remains exhausted (http n resource_exhausted) resetting at n-n-ntn:n:nz.
  example: Upstream image model gemini-3.1-flash-image quota remains exhausted (HTTP 429 RESOURCE_EXHAUSTED) resetting at 2026-11-17T11:00:06Z.
  evidence: job:efmp-406-u03-illustrate, job:efmp-406-u03-illustrate-r1, job:efmp-406-u05-illustrate
- [handoff] x7 recent, 7 total, since 2026-11-14: figures fig-un-n through fig-un-n remain preserved at prompt-only across unit-n.banner.md and unit-n.md with all n content gates passing.
  example: Figures fig-U1-5 through fig-U1-7 remain preserved at prompt-only across unit-01.banner.md and unit-01.md with all 14 content gates passing.
  evidence: job:efmp-406-u03-illustrate, job:efmp-406-u03-illustrate-r1, job:efmp-406-u05-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-14: independent <path> and <path> page inspection remain pending.
  example: Independent G3/G5 and narrow-screen/A4 page inspection remain pending.
  evidence: job:efmp-303-u04-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-14: fresh independent gn and dependent gn reviews remain pending; adr-n two-cycle limit may require owner authorization before re-running.
  example: Fresh independent G3 and dependent G5 reviews remain pending; ADR-0019 two-cycle limit may require owner authorization before re-running.
  evidence: job:efmp-304-u01-illustrate, job:efmp-304-u01-illustrate-r1
- [handoff] x2 recent, 2 total, since 2026-11-14: upstream image model gemini-n.n-flash-image quota is exhausted (http n resource_exhausted) with quota reset timestamp n-n-ntn:n:nz.
  example: Upstream image model gemini-3.1-flash-image quota is exhausted (HTTP 429 RESOURCE_EXHAUSTED) with quota reset timestamp 2026-11-17T11:00:06Z.
  evidence: job:efmp-305-u05-illustrate, job:efmp-305-u06-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-14: figures fig-un-n, fig-un-n, fig-un-n, and fig-un-n remain safely at prompt-only in unit-n.banner.md and unit-n.md with all n content gates passing.
  example: Figures fig-U5-7, fig-U5-8, fig-U5-9, and fig-U5-10 remain safely at prompt-only in unit-05.banner.md and unit-05.md with all 14 content gates passing.
  evidence: job:efmp-305-u05-illustrate, job:efmp-305-u05-illustrate-r1
- [handoff] x2 recent, 2 total, since 2026-11-14: upstream image model gemini-n.n-flash-image quota remains exhausted (http n resource_exhausted) with quota reset timestamp n-n-ntn:n:nz.
  example: Upstream image model gemini-3.1-flash-image quota remains exhausted (HTTP 429 RESOURCE_EXHAUSTED) with quota reset timestamp 2026-11-17T11:00:06Z.
  evidence: job:efmp-305-u05-illustrate-r1, job:efmp-305-u06-illustrate-r1
- [handoff] x2 recent, 2 total, since 2026-11-14: figures fig-un-n through fig-un-n remain safely at prompt-only in unit-n.banner.md and unit-n.md with all n content gates passing.
  example: Figures fig-U6-7 through fig-U6-10 remain safely at prompt-only in unit-06.banner.md and unit-06.md with all 14 content gates passing.
  evidence: job:efmp-305-u06-illustrate, job:efmp-305-u06-illustrate-r1
- [log-error] x1 recent, 103 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efpg-401-u02-author.1.log, log:efpg-401-u05-author.1.log, log:efmp-303-u04-illustrate.1.log
- [log-error] x1 recent, 56 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:efpg-401-u02-author.1.log, log:efpg-401-u05-author.1.log, log:efmp-303-u04-illustrate.1.log
- [handoff] x1 recent, 2 total, since 2026-11-10: unit n gn remains unticked and open pending fresh independent review under adr-n.
  example: Unit 3 G3 remains unticked and open pending fresh independent review under ADR-0019.
  evidence: job:efmp-305-u03-repair_en-r1, job:efmp-305-u03-illustrate
- [handoff] x1 recent, 2 total, since 2026-11-13: topic n.n's story is set in peshawar, so its scene <code> names no city. the owner may want the story moved to sindh or the prompt changed.
  example: Topic 2.5's story is set in Peshawar, so its scene `fig-U2-16` names no city. The owner may want the story moved to Sindh or the prompt changed.
  evidence: job:efpg-401-u02-plan_illustrations, job:intel-2026-11-14-distill
- [handoff] x1 recent, 2 total, since 2026-11-13: the six new rows (<code> banner, <code> to <code> scenes) are prompt-only, and their markers are also in the urdu topic files. the illustrate job needs to gener
  example: The six new rows (`fig-U2-11` banner, `fig-U2-12` to `fig-U2-16` scenes) are prompt-only, and their markers are also in the Urdu topic files. The illustrate job needs to generate, inspect and place th
  evidence: job:efpg-401-u02-plan_illustrations, job:intel-2026-11-14-distill
- [handoff] x1 recent, 1 total, since 2026-11-13: unit n raster illustrations (banner fig-un-n and topic scenes fig-un-n..n) are generated, visually inspected, and placed in both english and urdu topic files.
  example: Unit 2 raster illustrations (banner fig-U2-7 and topic scenes fig-U2-8..10) are generated, visually inspected, and placed in both English and Urdu topic files.
  evidence: job:efmp-303-u02-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-13: gn draft gate evidence is refreshed and clean with all n content gates passing; unit n is ready for fresh independent gn review.
  example: G2 draft gate evidence is refreshed and clean with all 14 content gates passing; Unit 2 is ready for fresh independent G3 review.
  evidence: job:efmp-303-u02-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-13: illustrate job: produce <code> with <code>, and the topic scenes <code> to <code> from their rows in <code>, then move each row prompt-only → generated → placed
  example: Illustrate job: produce `fig-U2-9` with `scripts/generate-illustration.mjs geng-301 2 --banner`, and the topic scenes `fig-U2-10` to `fig-U2-13` from their rows in `figures/unit-02.md`, then move each
  evidence: job:geng-301-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: after placing these images, regenerate the gn evidence again, because changing the topic files makes the manifest from ntnz stale.
  example: After placing these images, regenerate the G2 evidence again, because changing the topic files makes the manifest from 20261113T193245605Z stale.
  evidence: job:geng-301-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: placing fig-un-n..n will change the topic files again, so the gn evidence from ntnz must be regenerated afterwards (<code>, then repoint the tasks.md unit n gn 
  example: Placing fig-U3-9..13 will change the topic files again, so the G2 evidence from 20261113T203345864Z must be regenerated afterwards (`node scripts/prepare-gate-evidence.mjs GENG-301 3`, then repoint th
  evidence: job:geng-301-u03-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: <course> unit n has no urdu mirror, so no ur markers were added; topics n.n and n.n are set in a secondary school because their prose features school pupils.
  example: GENG-301 Unit 3 has no Urdu mirror, so no UR markers were added; topics 3.2 and 3.3 are set in a secondary school because their prose features school pupils.
  evidence: job:geng-301-u03-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: placing fig-un-n..n changes unit n's topic files and figure manifest, so the illustrate job must regenerate gn evidence (<code>) and repoint the unit n gn row i
  example: Placing fig-U5-9..13 changes Unit 5's topic files and figure manifest, so the illustrate job must regenerate G2 evidence (`node scripts/prepare-gate-evidence.mjs GENG-301 5`) and repoint the Unit 5 G2
  evidence: job:geng-301-u05-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: unit n still needs a fresh independent gn review against the current files, plus provenance and render inspection.
  example: Unit 5 still needs a fresh independent G3 review against the current files, plus provenance and render inspection.
  evidence: job:geng-301-u05-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: the four topic markers were also copied into the urdu topic files, so when placing, update the markers there as well as in the english files.
  example: The four topic markers were also copied into the Urdu topic files, so when placing, update the markers there as well as in the English files.
  evidence: job:intel-2026-11-14-distill
- [handoff] x1 recent, 1 total, since 2026-11-13: fig-un-n..n are prompt-only; the illustrate job generates and places them. banner command: <code>.
  example: fig-U6-9..13 are prompt-only; the illustrate job generates and places them. Banner command: `scripts/generate-illustration.mjs geng-301 6 --banner`.
  evidence: job:geng-301-u06-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: placing these figures changes the topic files, so gn evidence must be regenerated again (<code>, then repoint the gn row in <code>). the urdu topic files do not
  example: Placing these figures changes the topic files, so G2 evidence must be regenerated again (`node scripts/prepare-gate-evidence.mjs GENG-301 6`, then repoint the G2 row in `tasks.md`). The Urdu topic fil
  evidence: job:geng-301-u06-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: the new markers are english-only; the draft urdu topic files under <code> still need the same marker ids fig-un-n..n when the translator or the illustrate job m
  example: The new markers are English-only; the draft Urdu topic files under `i18n/ur/.../gict-300/unit-03/` still need the same marker IDs fig-U3-10..13 when the translator or the illustrate job mirrors them.
  evidence: job:gict-300-u03-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: placing fig-un-n..n will change bound inputs again, so the illustrate job must regenerate gn evidence (<code>) and repoint the <code> row.
  example: Placing fig-U3-9..13 will change bound inputs again, so the illustrate job must regenerate G2 evidence (`node scripts/prepare-gate-evidence.mjs GICT-300 3`) and repoint the `tasks.md` row.
  evidence: job:gict-300-u03-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: independent <path> review and narrow-screen (npx) / an print render inspection remain pending for <course> unit n.
  example: Independent G3/G5 review and narrow-screen (360px) / A4 print render inspection remain pending for EFMP-303 Unit 5.
  evidence: job:efmp-303-u05-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-14: placing fig-un-n..n changes the unit's bound inputs again, so the illustrate job must rerun <code> and update the newer unit n gn row in <code> (there are two).
  example: Placing fig-U4-9..13 changes the unit's bound inputs again, so the illustrate job must rerun `node scripts/prepare-gate-evidence.mjs GICT-300 4` and update the newer Unit 4 G2 row in `tasks.md` (there
  evidence: job:gict-300-u04-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: the markers are english only; when the illustrate job places the figures, it mirrors them into the urdu topic files.
  example: The markers are English only; when the illustrate job places the figures, it mirrors them into the Urdu topic files.
  evidence: job:gict-300-u04-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: fig-un-n (unit banner in unit-n.banner.md) and fig-un-n (topic n.n scene) remain prompt-only due to upstream image generation quota exhaustion resetting at n-n-
  example: fig-U1-11 (unit banner in unit-01.banner.md) and fig-U1-15 (Topic 1.5 scene) remain prompt-only due to upstream image generation quota exhaustion resetting at 2026-11-14T05:03:27Z.
  evidence: job:efmp-304-u01-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-14: placing fig-un-n..n changes the bound topic and manifest files, so the illustrate job must rerun <code> and update the unit n gn row in tasks.md.
  example: Placing fig-U1-5..7 changes the bound topic and manifest files, so the illustrate job must rerun `node scripts/prepare-gate-evidence.mjs GISS-401 1` and update the Unit 1 G2 row in tasks.md.
  evidence: job:giss-401-u01-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: the urdu topic files carry english figure markers for <path>; when placing, mirror the <code> into the urdu files and translate the alt text.
  example: The Urdu topic files carry English FIGURE markers for fig-U1-6/7; when placing, mirror the `<Figure>` into the Urdu files and translate the alt text.
  evidence: job:giss-401-u01-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: fig-un-n (unit banner in unit-n.banner.md) and fig-un-n (topic n.n scene) remain prompt-only due to upstream image generation quota resetting at n-n-ntn:n:nz.
  example: fig-U1-11 (unit banner in unit-01.banner.md) and fig-U1-15 (Topic 1.5 scene) remain prompt-only due to upstream image generation quota resetting at 2026-11-14T05:03:27Z.
  evidence: job:efmp-304-u01-illustrate-r1
- [handoff] x1 recent, 1 total, since 2026-11-14: placing fig-un-n..n changes bound topic and manifest files, so the illustrate job must rerun <code> and update the unit n gn row in tasks.md.
  example: Placing fig-U2-7..10 changes bound topic and manifest files, so the illustrate job must rerun `node scripts/prepare-gate-evidence.mjs GISS-401 2` and update the Unit 2 G2 row in tasks.md.
  evidence: job:giss-401-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: the fig-un-n prompt mentions an "islamiat textbook" held open; check the generated image for any calligraphy or qur'anic script on its pages before marking it p
  example: The fig-U2-8 prompt mentions an "Islamiat textbook" held open; check the generated image for any calligraphy or Qur'anic script on its pages before marking it placed.
  evidence: job:giss-401-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: all three raster illustrations (unit banner fig-un-n and classroom scenes fig-un-n, fig-un-n) are placed in both english and urdu files and verified clean.
  example: All three raster illustrations (unit banner fig-U1-5 and classroom scenes fig-U1-6, fig-U1-7) are placed in both English and Urdu files and verified clean.
  evidence: job:efmp-305-u01-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-14: gn gate evidence was refreshed at <code> and tasks.md line n repointed to maintain green pipeline gates.
  example: G2 gate evidence was refreshed at `20261114T052100718Z-gates.json` and tasks.md line 30 repointed to maintain green pipeline gates.
  evidence: job:efmp-305-u01-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-14: placing fig-un-n..n changes files the gn evidence is bound to, so the illustrate job must rerun <code> and update both duplicate unit n gn rows in <code>.
  example: Placing fig-U3-5..7 changes files the G2 evidence is bound to, so the illustrate job must rerun `node scripts/prepare-gate-evidence.mjs GISS-401 3` and update both duplicate Unit 3 G2 rows in `specs/c
  evidence: job:giss-401-u03-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: fig-un-n shows a prayer hall; check the generated image for any qur'anic script, calligraphy or patterned mats before marking it placed.
  example: fig-U3-6 shows a prayer hall; check the generated image for any Qur'anic script, calligraphy or patterned mats before marking it placed.
  evidence: job:giss-401-u03-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: fig-un-n draws the trainee as a woman, following the n.n narration; if a later fix settles the open "sir"/"she" issue the other way, update the prompt and alt t
  example: fig-U3-6 draws the trainee as a woman, following the 3.1 narration; if a later fix settles the open "Sir"/"she" issue the other way, update the prompt and alt text in both topic files and the manifest
  evidence: job:giss-401-u03-plan_illustrations

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-15.md` only.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. The acceptance checks in your task pass; `npm run check:content` reports nothing new against origin/main;
   any `node --test tests/crew/*.test.mjs` or unit tests covering what you changed pass.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (intel-2026-11-14-distill, intel_distill, codex) The four topic markers were also copied into the Urdu topic files, so when placing, update the markers there as well as in the English files.
- (intel-2026-11-14-distill, intel_distill, codex) Topic 2.5's story is set in Peshawar, so its scene `fig-U2-16` names no city. The owner may want the story moved to Sindh or the prompt changed.
- (intel-2026-11-14-distill, intel_distill, codex) The six new rows (`fig-U2-11` banner, `fig-U2-12` to `fig-U2-16` scenes) are prompt-only, and their markers are also in the Urdu topic files. The illustrate job needs to generate, inspect and place them, then refresh the G2 evidence again.
- (intel-2026-11-13-distill, intel_distill, agy) C1 documents CLI stream truncation annotations `(response may be truncated)` fracturing identical quota exhaustion errors into duplicate clusters in `scripts/crew/intel.mjs`.
- (intel-2026-11-13-distill, intel_distill, agy) C2 highlights daily distill job CREW-HANDOFF notes echoing back into the 12-hour harvest as operational handoffs, creating a self-referential feedback loop.


## Response snapshot

Distilled 4 reusable intelligence candidates for 2026-11-15 into specs/intelligence/daily/2026-11-15.md, led by stage-level image quota cooldowns and mandatory G2 evidence refresh after illustration placement.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 4 reusable intelligence candidates for 2026-11-15 into specs/intelligence/daily/2026-11-15.md, led by stage-level image quota cooldowns and mandatory G2 evidence refresh after illustration placement.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Upstream image generation model gemini-3.1-flash-image quota remains exhausted until 2026-11-17T11:00:06Z, causing repetitive illustrate job churn (C1).
  - G2 evidence manifests are invalidated when raster illustrations are placed in topic files, requiring mandatory G2 regeneration in illustrate briefs (C2, matching proposed I-0029).
  - Duplicate G2 rows in gict-300/tasks.md and giss-401/tasks.md split evidence pointers and warrant table deduplication (C4).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
