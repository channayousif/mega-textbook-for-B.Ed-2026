---
id: crew-intel-2026-11-19-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-18
surface: agent
model: claude
feature: crew-intelligence
branch: crew/intel-2026-11-19-distill
user: crew
command: crew intel_distill
labels: ["crew", "claude", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-19.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-19-distill

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-19-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-19.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [failure] x7 recent, 55 total, since 2026-10-19: worker exited n:
  example: worker exited 1:
  evidence: job:gnas-301-u01-illustrate, job:efpg-401-u03-translate, job:gnas-301-u04-illustrate
- [log-error] x5 recent, 5 total, since 2026-11-18: error: the 'gpt-n.n-sol' model is not supported when using codex with a chatgpt account.
  example: ERROR: The 'gpt-6.1-sol' model is not supported when using Codex with a ChatGPT account.
  evidence: log:gnas-301-u01-illustrate.1.log, log:gnas-301-u01-illustrate.2.log, log:gnas-301-u04-illustrate.3.log
- [cron] x2 recent, 3 total, since 2026-10-22: notify whatsapp failed: gatewaytransporterror: gateway timeout after nms
  example: notify whatsapp failed: GatewayTransportError: gateway timeout after 10000ms
  evidence: cron.log
- [log-error] x2 recent, 3 total, since 2026-11-06: error: interrupted
  example: error: interrupted
  evidence: log:gicp-400-u03-author.1.log, log:efpg-401-u03-illustrate.1.log, log:gnas-301-u04-illustrate.1.log
- [failure] x1 recent, 3 total, since 2026-11-06: worker exited n (timeout):
  example: worker exited 124 (timeout):
  evidence: job:gicp-400-u03-author, job:efpg-401-u03-illustrate
- [phr] x1 recent, 2 total, since 2026-11-11: next experiment (smallest change to try): confirm pr #n ci passes.
  example: next experiment (smallest change to try): Confirm PR #539 CI passes.
  evidence: phr:history/prompts/general/20261193-fix-pr539-urdu-figure-geometry.general.prompt.md, phr:history/prompts/general/20261215-fix-pr642-urdu-figure-geometry.general.prompt.md
- [handoff] x1 recent, 1 total, since 2026-11-18: the urdu unit n topic files lack the new marker ids <path>, so the illustrate job (or gn) must add them when it places these images.
  example: The Urdu Unit 15 topic files lack the new marker IDs fig-U15-8/9/10, so the illustrate job (or G4) must add them when it places these images.
  evidence: job:gqur-301-u15-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: <path> for unit n are still open; the review-host follow-ups listed in the brief still apply.
  example: G3/G5 for Unit 15 are still open; the review-host follow-ups listed in the brief still apply.
  evidence: job:gqur-301-u15-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: unit n gn review remains open and escalated; n svg figure text geometry defects in fig-un-n, fig-un-n.ur, fig-un-n, and fig-un-n still need fixing.
  example: Unit 1 G3 review remains open and escalated; 10 SVG figure text geometry defects in fig-U1-2, fig-U1-3.ur, fig-U1-6, and fig-U1-8 still need fixing.
  evidence: job:gnas-301-u01-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-18: live <path> inspection remains pending for <course> unit n.
  example: Live browser/print inspection remains pending for GNAS-301 Unit 1.
  evidence: job:gnas-301-u01-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-18: urdu names for the methods differ from unit n's urdu pages (قواعد و ترجمہ vs گرائمر-ترجمہ, ترسیلی vs ابلاغی); the owner should pick one form for the course.
  example: Urdu names for the methods differ from Unit 4's Urdu pages (قواعد و ترجمہ vs گرائمر-ترجمہ, ترسیلی vs ابلاغی); the owner should pick one form for the course.
  evidence: job:efpg-401-u03-translate
- [handoff] x1 recent, 1 total, since 2026-11-18: english topic-n.mdx shows raw latex (<code>) because the site has no maths plugin; the urdu uses plain text.
  example: English topic-04.mdx shows raw LaTeX (`$4 \times 4 \times 4 \times 4$`) because the site has no maths plugin; the Urdu uses plain text.
  evidence: job:efpg-401-u03-translate
- [handoff] x1 recent, 1 total, since 2026-11-18: rendered urdu pages were not inspected (no build allowed); gn must check the deployed <path>/ pages, especially the bidi in fig-un-n and fig-un-n.
  example: Rendered Urdu pages were not inspected (no build allowed); G5 must check the deployed /ur/ pages, especially the bidi in fig-U3-6 and fig-U3-10.
  evidence: job:efpg-401-u03-translate
- [handoff] x1 recent, 1 total, since 2026-11-18: <code> has wrong urdu labels that i left alone because the file is a hashed gn input: <code> should use سات ("seven") rather than ساتھ ("with"), and <code> uses
  example: `specs/content/efpg-401/concepts/unit-05.md` has wrong Urdu labels that I left alone because the file is a hashed G2 input: `سبقی منصوبے کے ساتھ مراحل` should use سات ("seven") rather than ساتھ ("with
  evidence: job:efpg-401-u05-translate
- [handoff] x1 recent, 1 total, since 2026-11-18: the rendered urdu (nastaliq at npx and an print) has not been checked; run <code> once the unit is deployed, before gn.
  example: The rendered Urdu (Nastaliq at 360px and A4 print) has not been checked; run `scripts/render-inspect.mjs EFPG-401 5 --locale ur --base https://textbook.com.pk` once the unit is deployed, before G5.
  evidence: job:efpg-401-u05-translate
- [handoff] x1 recent, 1 total, since 2026-11-18: the english doesn't give a gender for several unnamed colleagues, but urdu verbs need one, so i chose feminine in topics n.n, n.n and n.n and masculine in n.n a
  example: The English doesn't give a gender for several unnamed colleagues, but Urdu verbs need one, so I chose feminine in Topics 5.1, 5.5 and 5.6 and masculine in 5.2 and 5.7. The owner or the G5 reviewer may
  evidence: job:efpg-401-u05-translate
- [handoff] x1 recent, 1 total, since 2026-11-18: ci figure-geometry uses a dejavu sans fallback (local playwright resolves narrower noto nastaliq), so validate future urdu svg edits with a dejavu-forced copy; 
  example: CI figure-geometry uses a DejaVu Sans fallback (local Playwright resolves narrower Noto Nastaliq), so validate future Urdu SVG edits with a DejaVu-forced copy; fig-U5-4's purpose column anchor moved f
  evidence: job:batch-20261118-0430-cifix1
- [phr] x1 recent, 1 total, since 2026-11-18: failure modes observed: urdu subheadings and long body lines overflow their columns under ci's dejavu fallback; local playwright passes because it resolves the 
  example: failure modes observed: Urdu subheadings and long body lines overflow their columns under CI's DejaVu fallback; local Playwright passes because it resolves the narrower Noto Nastaliq face.
  evidence: phr:history/prompts/general/20261215-fix-pr642-urdu-figure-geometry.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: next experiment (smallest change to try): add an adr index check to check-docs-sync so the readme count
  example: next experiment (smallest change to try): add an ADR index check to check-docs-sync so the README count
  evidence: phr:history/prompts/general/20261214-adr-multi-producer-illustrations.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: failure modes observed: a stage chain listed a fallback worker that could not change the actual image
  example: failure modes observed: a stage chain listed a fallback worker that could not change the actual image
  evidence: phr:history/prompts/general/20261213-illustrate-multi-producer-gflow-codex.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: next experiment (smallest change to try): if gflow is reliable, consider two illustrate jobs in
  example: next experiment (smallest change to try): if gflow is reliable, consider two illustrate jobs in
  evidence: phr:history/prompts/general/20261213-illustrate-multi-producer-gflow-codex.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: failure modes observed: shared-db fixture leak causing deterministic rls failure; earlier watcher waited on pr checks while main itself was red.
  example: failure modes observed: shared-DB fixture leak causing deterministic RLS failure; earlier watcher waited on PR checks while main itself was red.
  evidence: phr:history/prompts/general/20261212-terms-live-ci-unblock.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: next experiment (smallest change to try): scope the scoring test's quiz_items query to the items it created.
  example: next experiment (smallest change to try): scope the scoring test's quiz_items query to the items it created.
  evidence: phr:history/prompts/general/20261212-terms-live-ci-unblock.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: failure modes observed: the first davinci build hit the vn heap limit (default heap sized from the n gib cgroup); fixed with node_options=--max-old-space-size=n
  example: failure modes observed: the first davinci build hit the V8 heap limit (default heap sized from the 5 GiB cgroup); fixed with NODE_OPTIONS=--max-old-space-size=3584 in the davinci scripts.
  evidence: phr:history/prompts/general/20261207-crew-builds-on-davinci.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-18: next experiment (smallest change to try): measure crew build wall time on davinci against local over a week.
  example: next experiment (smallest change to try): measure crew build wall time on davinci against local over a week.
  evidence: phr:history/prompts/general/20261207-crew-builds-on-davinci.general.prompt.md
- [handoff] x1 recent, 1 total, since 2026-11-18: the urdu topic files carry the same marker ids with english prompts; the illustrate job must swap them for <code> elements with urdu alt text when it places the
  example: The Urdu topic files carry the same marker IDs with English prompts; the illustrate job must swap them for `<Figure>` elements with Urdu alt text when it places the images.
  evidence: job:efpg-401-u03-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: topics n.n and n.n have no illustration on purpose, because a text-free image of those situations would only decorate.
  example: Topics 3.4 and 3.6 have no illustration on purpose, because a text-free image of those situations would only decorate.
  evidence: job:efpg-401-u03-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: fig-un-n (all n variants) was re-flowed earlier but not measured by measure-figure-text.mjs due to host restrictions; ci figure-geometry job or browser host mus
  example: fig-U2-6 (all 4 variants) was re-flowed earlier but not measured by measure-figure-text.mjs due to host restrictions; CI figure-geometry job or browser host must confirm it.
  evidence: job:gnas-301-u02-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-18: <path> still require owner authorisation before the next gn review cycle.
  example: GOV-01/EVID-01/RENDER-01/ASSESS-01 still require owner authorisation before the next G3 review cycle.
  evidence: job:gnas-301-u02-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-18: the urdu topic files carry the new markers with the english prompt and alt text. the illustrate job should turn them into <code> elements with urdu alt text.
  example: The Urdu topic files carry the new markers with the English prompt and alt text. The illustrate job should turn them into `<Figure>` elements with Urdu alt text.
  evidence: job:efpg-401-u05-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: <code> needs the course code in capitals (<code>). with <code> it fails with "invalid unit or stage".
  example: `scripts/prepare-gate-evidence.mjs` needs the course code in capitals (`EFPG-401 5`). With `efpg-401` it fails with "invalid unit or stage".
  evidence: job:efpg-401-u05-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: the urdu topic files under <code> do not have markers for <path> yet; the illustrate job or the urdu side must add them with urdu alt text when placing.
  example: The Urdu topic files under `i18n/ur/` do not have markers for fig-U16-8/9/10 yet; the illustrate job or the Urdu side must add them with Urdu alt text when placing.
  evidence: job:gqur-301-u16-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: gn is still stale since the figure-geometry repair, and urdu rendering and gn are still pending; this job did not change either.
  example: G3 is still stale since the figure-geometry repair, and Urdu rendering and G5 are still pending; this job did not change either.
  evidence: job:gqur-301-u16-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: topic n.n's prose sets its school in southern punjab, so the fig-un-n prompt describes a plains school "in the style common to sindh and southern punjab" and it
  example: Topic 1.3's prose sets its school in southern Punjab, so the fig-U1-10 prompt describes a plains school "in the style common to Sindh and southern Punjab" and its alt text names no province; the illus
  evidence: job:gsos-301-u01-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: the urdu topic files have no markers for fig-un-n to fig-un-n (unit is <code>); the illustrate job mirrors them when it places the images.
  example: The Urdu topic files have no markers for fig-U1-8 to fig-U1-10 (unit is `translation_status: draft`); the illustrate job mirrors them when it places the images.
  evidence: job:gsos-301-u01-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: topics n.n and n.n have no illustration on purpose, as their concepts turn on written words.
  example: Topics 3.4 and 3.6 have no illustration on purpose, as their concepts turn on written words.
  evidence: job:efpg-401-u03-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-18: rendered urdu pages were not inspected locally due to host limits; gn must check deployed <path>/ pages.
  example: Rendered Urdu pages were not inspected locally due to host limits; G5 must check deployed /ur/ pages.
  evidence: job:efpg-401-u03-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-18: no illustration markers were added to the urdu topic files, following the unit n precedent; the illustrate job must mirror <code>/<code> into urdu when it place
  example: No illustration markers were added to the Urdu topic files, following the Unit 1 precedent; the illustrate job must mirror `fig-U2-6`/`fig-U2-7` into Urdu when it places them.
  evidence: job:gsos-301-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: <code> needs the uppercase course code (<code>); lowercase fails with "invalid unit or stage".
  example: `prepare-gate-evidence.mjs` needs the uppercase course code (`GSOS-301`); lowercase fails with "invalid unit or stage".
  evidence: job:gsos-301-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-18: the topic n.n classroom story is set in punjab, so fig-un-n asks for a setting "in the style common to sindh and punjab" (as unit n did); the illustrate job sho
  example: The topic 3.2 classroom story is set in Punjab, so fig-U3-7 asks for a setting "in the style common to Sindh and Punjab" (as Unit 2 did); the illustrate job should check that the setting looks right f
  evidence: job:gsos-301-u03-plan_illustrations

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-19.md` only.

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
- (intel-2026-11-18-distill, intel_distill, agy) GISS-401 Unit 7 raster illustrations are landed on main (PR #633) with G2 evidence refreshed; Unit 7 G3 review remains open pending independent academic and scholar review.
- (intel-2026-11-18-distill, intel_distill, agy) OpenClaw loopback transport timeout on WhatsApp notifications (10000ms) recurs during high host memory pressure and needs graceful handling in scripts/crew/notify.mjs.
- (intel-2026-11-17-distill, intel_distill, agy) Gemini 3.1 flash image quota remains exhausted until 2026-11-17T11:00:06Z; illustrate launches are held in queue via PR #629's image-quota check.
- (intel-2026-11-17-distill, intel_distill, agy) GISS-401 Units 1-7 and GICT-300 Unit 4 prompt-only illustration manifests are preserved and await rerun and G2 refresh once the quota resets.
- (intel-2026-11-16-distill, intel_distill, agy) Production deployed SHA lags behind HEAD commits containing new raster illustrations, causing G3 reviews to record render-review as unavailable and escalate otherwise clean units.


## Response snapshot

Wrote 6 intelligence candidates for 2026-11-19; the strongest is that an unsupported Codex model name used up job attempts without the worker being marked unhealthy.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Wrote 6 intelligence candidates for 2026-11-19; the strongest is that an unsupported Codex model name used up job attempts without the worker being marked unhealthy.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `specs/content/efpg-401/concepts/unit-05.md` has the wrong Urdu word ساتھ ("with") where it should say سات ("seven"); the file is a hashed G2 input, so it needs an English-side repair job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
