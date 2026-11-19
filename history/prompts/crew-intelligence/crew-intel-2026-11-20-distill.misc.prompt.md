---
id: crew-intel-2026-11-20-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-19
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-20-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-20.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-20-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-20-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-20.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [handoff] x2 recent, 2 total, since 2026-11-18: bind source passages and deploy the reviewed bytes before a fresh render-capable gn review.
  example: Bind source passages and deploy the reviewed bytes before a fresh render-capable G3 review.
  evidence: job:efpg-401-u03-review_en
- [review] x2 recent, 2 total, since 2026-11-19: this independent report is advisory only
  example: This independent report is advisory only
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json, review:specs/content/efpg-401/reviews/unit-03/G3/crew-job-efpg-401-u03-review_en.json
- [failure] x1 recent, 60 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:giss-401-u05-translate-r1, job:batch-20261110-1201-cifix1, job:efpg-401-u01-plan_illustrations
- [phr] x1 recent, 1 total, since 2026-11-18: failure modes observed: gflow agent-only composer timed out at n s after the credit gate (paid, no file); a gflow logging typeerror hid the media id.
  example: failure modes observed: gflow agent-only composer timed out at 600 s after the credit gate (paid, no file); a gflow logging TypeError hid the media id.
  evidence: phr:history/prompts/general/20261216-gflow-reuse-one-flow-project.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: next experiment (smallest change to try): one shot on gflow n.n.n inside a per-teaser project.
  example: next experiment (smallest change to try): one shot on gflow 0.101.2 inside a per-teaser project.
  evidence: phr:history/prompts/general/20261216-gflow-reuse-one-flow-project.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: failure modes observed: an outdated assumption about catalog binding nearly drove an unnecessary evidence refresh.
  example: failure modes observed: an outdated assumption about catalog binding nearly drove an unnecessary evidence refresh.
  evidence: phr:history/prompts/general/2486-sem4-owner-rulings-approve.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: next experiment (smallest change to try): state the current catalog-binding rule in the evaluate-intake skill so evaluators stop escalating catalog insertion as
  example: next experiment (smallest change to try): state the current catalog-binding rule in the evaluate-intake skill so evaluators stop escalating catalog insertion as an evidence-staleness question.
  evidence: phr:history/prompts/general/2486-sem4-owner-rulings-approve.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: failure modes observed: drafts cite owner rulings beyond their scope (<code> items n and
  example: failure modes observed: drafts cite owner rulings beyond their scope (`D-2026-0053` items 2 and
  evidence: phr:history/prompts/general/2485-sem4-intake-evaluation.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: next experiment (smallest change to try): ask the owner for one corpus-wide decision covering
  example: next experiment (smallest change to try): ask the owner for one corpus-wide decision covering
  evidence: phr:history/prompts/general/2485-sem4-intake-evaluation.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: failure modes observed: first-pass depth budgets summed topics only and would have failed <code> once units were authored; corrected before commit of the intake
  example: failure modes observed: first-pass depth budgets summed topics only and would have failed `check-unit-depth` once units were authored; corrected before commit of the intake bundles.
  evidence: phr:history/prompts/general/2484-sem4-intake-drafts.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: next experiment (smallest change to try): have <code> validate a draft spec's depth-budget band against its topic table plus a fixed <path> allowance, so the mi
  example: next experiment (smallest change to try): have `check:content` validate a draft spec's depth-budget band against its topic table plus a fixed index/assessment allowance, so the mismatch is caught at d
  evidence: phr:history/prompts/general/2484-sem4-intake-drafts.general.prompt.md
- [handoff] x1 recent, 1 total, since 2026-11-18: topics n.n, n.n and n.n intentionally omit raster illustrations because their pedagogy turns on a written plan, text emotions, or tense choices where text-free 
  example: Topics 5.2, 5.5 and 5.7 intentionally omit raster illustrations because their pedagogy turns on a written plan, text emotions, or tense choices where text-free images would only decorate.
  evidence: job:efpg-401-u05-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-18: rendered urdu pages (nastaliq at npx and an print) were not inspected locally due to host limits; gn review must verify deployed <path>/ pages.
  example: Rendered Urdu pages (Nastaliq at 360px and A4 print) were not inspected locally due to host limits; G5 review must verify deployed /ur/ pages.
  evidence: job:efpg-401-u05-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-18: the repair job must fix <code> (the missing-step activity lists all seven steps) and either rewrite or flag as unchecked the celce-murcia and sheikh claims list
  example: The repair job must fix `topic-02.mdx:71-73` (the missing-step activity lists all seven steps) and either rewrite or flag as unchecked the Celce-Murcia and Sheikh claims listed in the report; Topic 5.
  evidence: job:efpg-401-u05-review_en
- [handoff] x1 recent, 1 total, since 2026-11-18: minor fixes worth doing at the same time: the "n units" labels at <code>, the fig-un-n and fig-un-n alt text, the multiple-choice answer order (n of n are b), a
  example: Minor fixes worth doing at the same time: the "180 units" labels at `fig-U5-2.svg:39,41`, the fig-U5-1 and fig-U5-14 alt text, the multiple-choice answer order (8 of 10 are B), and the RRQ 7 wording.
  evidence: job:efpg-401-u05-review_en
- [handoff] x1 recent, 1 total, since 2026-11-18: the next gn attempt can capture render evidence only after production is deployed from a main that includes the unit n changes (it is currently at <sha>).
  example: The next G3 attempt can capture render evidence only after production is deployed from a main that includes the Unit 5 changes (it is currently at 331c3fc1).
  evidence: job:efpg-401-u05-review_en
- [handoff] x1 recent, 1 total, since 2026-11-18: gn en-review remains unticked and owner-gated by g-n-n; all unit n figure rows are now placed with committed webp illustrations.
  example: G3 en-review remains unticked and owner-gated by G-2026-33; all Unit 6 figure rows are now placed with committed WebP illustrations.
  evidence: job:gnas-301-u06-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-18: fig-un-n, fig-un-n and fig-un-n were edited without renaming, so visitors may see the old versions for up to n days; verify the live images after deployment.
  example: fig-U5-1, fig-U5-2 and fig-U5-14 were edited without renaming, so visitors may see the old versions for up to 30 days; verify the live images after deployment.
  evidence: job:efpg-401-u05-repair_en
- [handoff] x1 recent, 1 total, since 2026-11-18: the mcq options were reordered (new key b d c a c a d c b d); the backend quiz bank for unit n, if seeded from this page, has the old order.
  example: The MCQ options were reordered (new key B D C A C A D C B D); the backend quiz bank for Unit 5, if seeded from this page, has the old order.
  evidence: job:efpg-401-u05-repair_en
- [handoff] x1 recent, 1 total, since 2026-11-18: celce-murcia and sheikh are now cited only under further reading, with no specific in-text claims; keep it that way until a bound excerpt exists.
  example: Celce-Murcia and Sheikh are now cited only under Further reading, with no specific in-text claims; keep it that way until a bound excerpt exists.
  evidence: job:efpg-401-u05-repair_en
- [handoff] x1 recent, 1 total, since 2026-11-19: all unit n english content defects from cycle n are resolved and verified on live deployment. a human reviewer or qualified signing authority may inspect the ev
  example: All Unit 5 English content defects from cycle 1 are resolved and verified on live deployment. A human reviewer or qualified signing authority may inspect the evidence package to certify G3, and G4 Urd
  evidence: job:efpg-401-u05-review_en-r1
- [handoff] x1 recent, 1 total, since 2026-11-19: all <course> unit n figures are placed with committed webp illustrations (banner fig-un-n and classroom scenes fig-un-n and fig-un-n).
  example: All GPKS-402 Unit 2 figures are placed with committed WebP illustrations (banner fig-U2-5 and classroom scenes fig-U2-6 and fig-U2-7).
  evidence: job:gpks-402-u02-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-19: gn gate evidence was refreshed at ntnz; gn en-review and gn ur-review remain open for independent reviewers.
  example: G2 gate evidence was refreshed at 20261119T021459360Z; G3 en-review and G5 ur-review remain open for independent reviewers.
  evidence: job:gpks-402-u02-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-19: all <course> unit n figures are placed with committed webp illustrations (banner fig-un-n and classroom scenes fig-un-n, fig-un-n, fig-un-n).
  example: All GPKS-402 Unit 6 figures are placed with committed WebP illustrations (banner fig-U6-7 and classroom scenes fig-U6-8, fig-U6-9, fig-U6-10).
  evidence: job:gpks-402-u06-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-19: no urdu mirror exists yet for unit n; the urdu translation job will need to copy over the placed figure markers into the translated topics.
  example: No Urdu mirror exists yet for Unit 6; the Urdu translation job will need to copy over the placed figure markers into the translated topics.
  evidence: job:gpks-402-u06-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-19: gn gate evidence refreshed at ntnz; gn en-review remains open for an independent reviewer.
  example: G2 gate evidence refreshed at 20261119T031856430Z; G3 en-review remains open for an independent reviewer.
  evidence: job:gpks-402-u06-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-19: all four unit n raster illustrations (banner fig-un-n and classroom scenes fig-un-n, fig-un-n, fig-un-n) are placed in english and urdu files with matching mani
  example: All four Unit 2 raster illustrations (banner fig-U2-7 and classroom scenes fig-U2-8, fig-U2-9, fig-U2-10) are placed in English and Urdu files with matching manifests.
  evidence: job:gqur-300-u02-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-19: gn gate evidence refreshed at [ntnz-gates.json](file:<path>); gn en-review and gn ur-review remain open for independent reviewers.
  example: G2 gate evidence refreshed at [20261119T042049432Z-gates.json](file:///home/a2ahs/crew-wt/gqur-300-u02-illustrate/specs/content/gqur-300/reviews/unit-02/G2/20261119T042049432Z-gates.json); G3 en-revie
  evidence: job:gqur-300-u02-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-19: nov n gn report input-manifest hashes for unit n files do not match current committed bytes, so a fresh gn run is needed before acceptance.
  example: Nov 8 G3 report input-manifest hashes for Unit 4 files do not match current committed bytes, so a fresh G3 run is needed before acceptance.
  evidence: job:gqur-300-u04-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-19: shared glossary terms length, mass, and capacity remain unbanked in root glossary.json pending owner follow-up.
  example: Shared glossary terms Length, Mass, and Capacity remain unbanked in root glossary.json pending owner follow-up.
  evidence: job:gqur-300-u04-illustrate
- [review] x1 recent, 1 total, since 2026-11-19: render-review tooling limitation
  example: render-review tooling limitation
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-19: this independent review report is advisory only
  example: This independent review report is advisory only
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1.json
- [phr] x1 recent, 1 total, since 2026-11-19: reflection: <code> needs the uppercase course code (<course>) and does not
  example: reflection: `prepare-gate-evidence.mjs` needs the uppercase course code (EFPG-401) and does not
  evidence: phr:history/prompts/efpg-401/20261219-efpg-401-unit-05-g3-repair.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-19: failure modes observed: lowercase course code rejected by prepare-gate-evidence (known, cn in
  example: failure modes observed: lowercase course code rejected by prepare-gate-evidence (known, C4 in
  evidence: phr:history/prompts/efpg-401/20261219-efpg-401-unit-05-g3-repair.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-19: reflection: an earlier incomplete attempt on this branch left uncommitted logs, a summary and a
  example: reflection: an earlier incomplete attempt on this branch left uncommitted logs, a summary and a
  evidence: phr:history/prompts/efpg-401/20261218-efpg-401-unit-05-g3-review.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-19: failure modes observed: an earlier attempt's tracker row cited a report file that was never written.
  example: failure modes observed: an earlier attempt's tracker row cited a report file that was never written.
  evidence: phr:history/prompts/efpg-401/20261218-efpg-401-unit-05-g3-review.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-19: next experiment: the next gn attempt should run render-inspect against production once main
  example: next experiment: the next G3 attempt should run render-inspect against production once main
  evidence: phr:history/prompts/efpg-401/20261218-efpg-401-unit-05-g3-review.misc.prompt.md
- [review] x1 recent, 1 total, since 2026-11-19: <path>:n-n (activity
  example: docs/semester-3/efpg-401/unit-05/topic-02.mdx:71-73 (Activity
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json
- [review] x1 recent, 1 total, since 2026-11-19: prose attributes specific claims to sources that <path> declares as title-level only, without disclosing them as uncorroborated
  example: Prose attributes specific claims to sources that sources/unit-05.md declares as title-level only, without disclosing them as uncorroborated
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json
- [review] x1 recent, 1 total, since 2026-11-19: the bound paulsrud and gheitasi (n) record is an abstract-level paraphrase (language-as-resource stance; materials outweigh policy)
  example: The bound Paulsrud and Gheitasi (2024) record is an abstract-level paraphrase (language-as-resource stance; materials outweigh policy)
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-20.md` only.

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
- (intel-2026-11-19-distill, intel_distill, claude) `specs/content/efpg-401/concepts/unit-05.md` has the wrong Urdu word ساتھ ("with") where it should say سات ("seven"); the file is a hashed G2 input, so it needs an English-side repair job.
- (intel-2026-11-18-distill, intel_distill, agy) GISS-401 Unit 7 raster illustrations are landed on main (PR #633) with G2 evidence refreshed; Unit 7 G3 review remains open pending independent academic and scholar review.
- (intel-2026-11-18-distill, intel_distill, agy) OpenClaw loopback transport timeout on WhatsApp notifications (10000ms) recurs during high host memory pressure and needs graceful handling in scripts/crew/notify.mjs.
- (intel-2026-11-17-distill, intel_distill, agy) Gemini 3.1 flash image quota remains exhausted until 2026-11-17T11:00:06Z; illustrate launches are held in queue via PR #629's image-quota check.
- (intel-2026-11-17-distill, intel_distill, agy) GISS-401 Units 1-7 and GICT-300 Unit 4 prompt-only illustration manifests are preserved and await rerun and G2 refresh once the quota resets.


## Response snapshot

8 candidates; strongest is filtering WebP raster illustrations out of render-inspect's SVG geometry check.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: 8 candidates; strongest is filtering WebP raster illustrations out of render-inspect's SVG geometry check.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - In `scripts/render-inspect.mjs:306-310`, Section D attempts to fetch `.svg` variants for all placed figures in `unitFigures()`, failing on WebP illustrations (`kind: illustration`).
  - `prepare-gate-evidence.mjs` rejects lowercase course codes (e.g., `efpg-401`); uppercase arguments remain required until the script normalizes them automatically.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
