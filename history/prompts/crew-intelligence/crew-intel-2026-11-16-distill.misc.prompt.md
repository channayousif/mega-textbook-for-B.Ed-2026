---
id: crew-intel-2026-11-16-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-15
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-16-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-16.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-16-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-16-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-16.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [handoff] x12 recent, 18 total, since 2026-11-14: upstream image model gemini-n.n-flash-image quota remains exhausted (http n resource_exhausted) resetting at n-n-ntn:n:nz.
  example: Upstream image model gemini-3.1-flash-image quota remains exhausted (HTTP 429 RESOURCE_EXHAUSTED) resetting at 2026-11-17T11:00:06Z.
  evidence: job:geng-301-u03-illustrate-r1, job:geng-301-u05-illustrate, job:geng-301-u05-illustrate-r1
- [handoff] x6 recent, 6 total, since 2026-11-15: figures fig-un-n (banner) and fig-un-n through fig-un-n remain preserved at prompt-only in unit-n.banner.md and unit-n.md with all n content gates passing.
  example: Figures fig-U2-9 (banner) and fig-U2-10 through fig-U2-13 remain preserved at prompt-only in unit-02.banner.md and unit-02.md with all 14 content gates passing.
  evidence: job:geng-301-u03-illustrate-r1, job:geng-301-u05-illustrate, job:geng-301-u05-illustrate-r1
- [handoff] x4 recent, 10 total, since 2026-11-14: figures fig-un-n through fig-un-n remain preserved at prompt-only across unit-n.banner.md and unit-n.md with all n content gates passing.
  example: Figures fig-U1-5 through fig-U1-7 remain preserved at prompt-only across unit-01.banner.md and unit-01.md with all 14 content gates passing.
  evidence: job:efmp-406-u05-illustrate-r1, job:geng-300-u04-illustrate, job:geng-300-u04-illustrate-r1
- [handoff] x4 recent, 8 total, since 2026-10-31: protected script changes require owner review.
  example: Protected script changes require owner review.
  evidence: job:maint-2026-w45-m1, job:maint-2026-w46-m2, job:maint-2026-w46-m1
- [review] x4 recent, 4 total, since 2026-11-15: production deployed sha <sha> does not match head <sha> for <course> unit n across n files
  example: Production deployed SHA 1793d49325c9148bea848c4f85d16e11420a881e does not match HEAD 4afd7143719c2666f85bff10fd51deb7b705aee2 for EFPG-401 Unit 7 across 6 files
  evidence: review:specs/content/efpg-401/reviews/unit-06/G3/adf16229-bf24-4d11-8b38-608ae9868dab.json, review:specs/content/efpg-401/reviews/unit-04/G3/09a7dfec-778d-4a22-be90-cc04eb62924e.json, review:specs/content/efpg-401/reviews/unit-02/G3/39596879-d636-4d89-8a00-e06f6d15a654.json
- [log-error] x3 recent, 106 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efpg-401-u02-illustrate.1.log, log:efpg-401-u06-illustrate.1.log, log:efpg-401-u07-illustrate.1.log
- [log-error] x3 recent, 59 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:efpg-401-u02-illustrate.1.log, log:efpg-401-u06-illustrate.1.log, log:efpg-401-u07-illustrate.1.log
- [handoff] x3 recent, 3 total, since 2026-11-15: all english content files, coverage mappings, and all n assessment items in <path>/ are completely clean and pass all n content gates.
  example: All English content files, coverage mappings, and all 25 assessment items in docs/semester-3/efpg-401/unit-04/ are completely clean and pass all 14 content gates.
  evidence: job:efpg-401-u04-review_en, job:efpg-401-u06-review_en, job:efpg-401-u07-review_en
- [handoff] x2 recent, 2 total, since 2026-11-14: when quota resets, generate fig-un-n, fig-un-n and fig-un-n, replace <path> markers with figure elements, and rerun gn evidence.
  example: When quota resets, generate fig-U5-5, fig-U5-6 and fig-U5-7, replace EN/UR markers with Figure elements, and rerun G2 evidence.
  evidence: job:efmp-406-u05-illustrate, job:efmp-406-u05-illustrate-r1
- [handoff] x2 recent, 2 total, since 2026-11-14: used codex fallback after gemini quota exhaustion; independent <path> and rendered-page review remain pending.
  example: Used Codex fallback after Gemini quota exhaustion; independent G3/G5 and rendered-page review remain pending.
  evidence: job:efpg-401-u02-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-15: existing review escalations remain open; fresh gn requires owner authorisation.
  example: Existing review escalations remain open; fresh G3 requires owner authorisation.
  evidence: job:geng-300-u02-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-15: figures fig-un-n, fig-un-n, fig-un-n, and fig-un-n remain preserved at prompt-only in unit-n.banner.md and unit-n.md with all n content gates passing.
  example: Figures fig-U1-7, fig-U1-8, fig-U1-9, and fig-U1-10 remain preserved at prompt-only in unit-01.banner.md and unit-01.md with all 14 content gates passing.
  evidence: job:geng-301-u01-illustrate, job:geng-301-u01-illustrate-r1
- [handoff] x2 recent, 2 total, since 2026-11-15: placing fig-un-n..n once quota resets will require regenerating gn evidence (<code>) and repointing tasks.md.
  example: Placing fig-U5-9..13 once quota resets will require regenerating G2 evidence (`node scripts/prepare-gate-evidence.mjs GENG-301 5`) and repointing tasks.md.
  evidence: job:geng-301-u05-illustrate, job:geng-301-u05-illustrate-r1
- [handoff] x2 recent, 2 total, since 2026-11-15: figures fig-un-n (banner) and fig-un-n..n remain preserved at prompt-only with all n content gates passing.
  example: Figures fig-U6-9 (banner) and fig-U6-10..13 remain preserved at prompt-only with all 14 content gates passing.
  evidence: job:geng-301-u06-illustrate, job:geng-301-u06-illustrate-r1
- [handoff] x2 recent, 2 total, since 2026-11-15: generating and placing fig-un-n..n after quota reset will require running prepare-gate-evidence and updating tasks.md.
  example: Generating and placing fig-U6-9..13 after quota reset will require running prepare-gate-evidence and updating tasks.md.
  evidence: job:geng-301-u06-illustrate, job:geng-301-u06-illustrate-r1
- [log-error] x1 recent, 5 total, since 2026-10-17: assertionerror
  example: AssertionError
  evidence: log:efmp-301-u11-repair_en-conflict3.1.log, log:gicp-400-u01-author.1.log, log:efpg-401-u06-illustrate.1.log
- [handoff] x1 recent, 1 total, since 2026-11-14: the urdu topic files don't have the fig-un-n to fig-un-n markers yet; the illustrate job should add them when it places the images.
  example: The Urdu topic files don't have the fig-U6-8 to fig-U6-10 markers yet; the illustrate job should add them when it places the images.
  evidence: job:gqur-300-u06-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: the n.n scene follows the prose, so it is set in a school admission office, not a classroom. the prose doesn't say whether the trainee cousin is male or female;
  example: The 6.3 scene follows the prose, so it is set in a school admission office, not a classroom. The prose doesn't say whether the trainee cousin is male or female; the prompt makes her a niece.
  evidence: job:gqur-300-u06-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: the prose doesn't name a school type for topic n.n; i made it a government girls' middle school in sindh to match the woman teacher.
  example: The prose doesn't name a school type for Topic 2.1; I made it a government girls' middle school in Sindh to match the woman teacher.
  evidence: job:gqur-301-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: there is no urdu mirror of unit n yet, so fig-un-n and fig-un-n exist only in the english topic files; whoever writes the urdu mirror needs to add them.
  example: There is no Urdu mirror of Unit 2 yet, so fig-U2-6 and fig-U2-7 exist only in the English topic files; whoever writes the Urdu mirror needs to add them.
  evidence: job:gqur-301-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: after this week's tasks land, the next job should start with <code> and <code>; <code> has also been <code> since wn.
  example: After this week's tasks land, the next job should start with `crew retry efpg-401-u03-author` and `crew retry efpg-401-u05-author`; `gqur-301-u15-repair_en` has also been `gate_red` since W45.
  evidence: job:maint-2026-w46-survey
- [handoff] x1 recent, 1 total, since 2026-11-14: once mn is merged, one tick should close decisions c-n to c-n in <code> and <code>; check that it did.
  example: Once M2 is merged, one tick should close decisions C-017 to C-021 in `decisions.json` and `BOARD.md`; check that it did.
  evidence: job:maint-2026-w46-survey
- [handoff] x1 recent, 1 total, since 2026-11-14: the illustrate job should produce <code> with <code>, then <code>, <code> and <code>, and check that the images show no numbers or labels, since every scene lea
  example: The illustrate job should produce `fig-U5-7` with `--banner`, then `fig-U5-8`, `fig-U5-9` and `fig-U5-10`, and check that the images show no numbers or labels, since every scene leans on charts, slips
  evidence: job:gqur-301-u05-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: the topic n.n situation in the text is a karachi garment workshop, but its picture is a b.ed classroom acting it out, because the brief requires a school settin
  example: The topic 5.2 situation in the text is a Karachi garment workshop, but its picture is a B.Ed classroom acting it out, because the brief requires a school setting.
  evidence: job:gqur-301-u05-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: this touches protected <code>, so the resulting pr waits for the owner; the new brief sentence reaches every non-self job via <code>.
  example: This touches protected `scripts/`, so the resulting PR waits for the owner; the new brief sentence reaches every non-self job via `scripts/crew/crew.mjs:265`.
  evidence: job:maint-2026-w46-m4
- [handoff] x1 recent, 1 total, since 2026-11-14: on merge, <course> un (revise) and <course> un (escalate) get a gn report for the first time, so the planner will plan new work for them. watch the first planni
  example: On merge, EFMP-407 U7 (revise) and GQUR-301 U16 (escalate) get a G3 report for the first time, so the planner will plan new work for them. Watch the first planning run after the merge.
  evidence: job:maint-2026-w46-m5
- [handoff] x1 recent, 1 total, since 2026-11-14: ten units' cycle counts go up by one (<course> un and un reach n). if anything reads <code> as an adr-n limit, those units may now count as out of cycles.
  example: Ten units' cycle counts go up by one (GNAS-301 U2 and U6 reach 7). If anything reads `g3Cycles` as an ADR-0019 limit, those units may now count as out of cycles.
  evidence: job:maint-2026-w46-m5
- [handoff] x1 recent, 1 total, since 2026-11-14: live site deployed sha (<sha>) differed from head (<sha>) because of recent raster illustration additions; render-review was recorded as unavailable and visual 
  example: Live site deployed SHA (33d5feca) differed from HEAD (925047c67) because of recent raster illustration additions; render-review was recorded as unavailable and visual inspection remains unverified.
  evidence: job:efpg-401-u02-review_en
- [handoff] x1 recent, 1 total, since 2026-11-14: english prose, coverage, and all n assessment items in <path>/ are completely clean and pass all n content gates.
  example: English prose, coverage, and all 25 assessment items in docs/semester-3/efpg-401/unit-02/ are completely clean and pass all 14 content gates.
  evidence: job:efpg-401-u02-review_en
- [handoff] x1 recent, 1 total, since 2026-11-14: unit n has no urdu mirror yet, so the new markers exist only in the english files; the translate job must carry <code> to <code> into the urdu topic files.
  example: Unit 6 has no Urdu mirror yet, so the new markers exist only in the English files; the translate job must carry `fig-U6-8` to `fig-U6-10` into the Urdu topic files.
  evidence: job:gqur-301-u06-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-14: the illustrate job should check that every image shows no readable numbers or labels, because all four scenes rely on slips, dot plots or chalk lines.
  example: The illustrate job should check that every image shows no readable numbers or labels, because all four scenes rely on slips, dot plots or chalk lines.
  evidence: job:gqur-301-u06-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-15: live site deployed sha (<sha>) differed from head (<sha>) due to recent raster illustration placements; render-review was recorded as unavailable and browser in
  example: Live site deployed SHA (925047c6) differed from HEAD (1793d493) due to recent raster illustration placements; render-review was recorded as unavailable and browser inspection remains unverified.
  evidence: job:efpg-401-u04-review_en
- [handoff] x1 recent, 1 total, since 2026-11-15: the pending unit n gn review request (<code>, <code>) was prepared against the files before the illustration markers were added, so it is now stale and must be 
  example: The pending Unit 7 G3 review request (`⏳ CMY`, `g3-desk-253d4cd9`) was prepared against the files before the illustration markers were added, so it is now stale and must be re-prepared.
  evidence: job:gqur-301-u07-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-15: <code> has two unit n gn rows (lines n and n). the pipeline gate reads the last one, so repoint both after any evidence refresh.
  example: `tasks.md` has two Unit 7 G2 rows (lines 60 and 204). The pipeline gate reads the last one, so repoint both after any evidence refresh.
  evidence: job:gqur-301-u07-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-15: the urdu topic files carry the english-language markers for <code> and <code>. the illustrate job must wire both locales when it places them.
  example: The Urdu topic files carry the English-language markers for `fig-U7-6` and `fig-U7-7`. The illustrate job must wire both locales when it places them.
  evidence: job:gqur-301-u07-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-15: live site deployed sha (<sha>) differed from head (<sha>) due to recent raster illustration placements, so render-review was recorded as unavailable and browser
  example: Live site deployed SHA (1793d493) differed from HEAD (3f513718) due to recent raster illustration placements, so render-review was recorded as unavailable and browser inspection remains unverified.
  evidence: job:efpg-401-u06-review_en
- [handoff] x1 recent, 1 total, since 2026-11-15: fig-un-n..fig-un-n are prompt-only and need the illustrate job to generate, inspect and place them; the gn evidence must be regenerated again after placement.
  example: fig-U8-7..fig-U8-10 are prompt-only and need the illustrate job to generate, inspect and place them; the G2 evidence must be regenerated again after placement.
  evidence: job:gqur-301-u08-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-15: unit n gn is still open, and the urdu topic files carry the new markers only as untranslated english comments.
  example: Unit 8 G3 is still open, and the Urdu topic files carry the new markers only as untranslated English comments.
  evidence: job:gqur-301-u08-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-15: gn needs a fresh independent review of commits <sha> and <sha>; the rn report is now stale.
  example: G3 needs a fresh independent review of commits b02ba6e6e and a9c118a0a; the r1 report is now stale.
  evidence: job:efmp-407-u07-repair_en
- [handoff] x1 recent, 1 total, since 2026-11-15: the urdu side has only index.mdx, so the translate job should copy the corrected "section n.n (curriculum reform), policy action n" locator into the urdu topic-
  example: The Urdu side has only index.mdx, so the translate job should copy the corrected "section 6.2 (Curriculum Reform), policy action 5" locator into the Urdu topic-01.
  evidence: job:efmp-407-u07-repair_en

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-16.md` only.

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
- (intel-2026-11-15-distill, intel_distill, agy) Upstream image generation model gemini-3.1-flash-image quota remains exhausted until 2026-11-17T11:00:06Z, causing repetitive illustrate job churn (C1).
- (intel-2026-11-15-distill, intel_distill, agy) G2 evidence manifests are invalidated when raster illustrations are placed in topic files, requiring mandatory G2 regeneration in illustrate briefs (C2, matching proposed I-0029).
- (intel-2026-11-15-distill, intel_distill, agy) Duplicate G2 rows in gict-300/tasks.md and giss-401/tasks.md split evidence pointers and warrant table deduplication (C4).
- (intel-2026-11-14-distill, intel_distill, codex) The four topic markers were also copied into the Urdu topic files, so when placing, update the markers there as well as in the English files.
- (intel-2026-11-14-distill, intel_distill, codex) Topic 2.5's story is set in Peshawar, so its scene `fig-U2-16` names no city. The owner may want the story moved to Sindh or the prompt changed.


## Response snapshot

Distilled 4 intelligence candidates for 2026-11-16, led by premature G3 review escalations caused by production deployed SHA mismatches.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 4 intelligence candidates for 2026-11-16, led by premature G3 review escalations caused by production deployed SHA mismatches.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Production deployed SHA lags behind HEAD commits containing new raster illustrations, causing G3 reviews to record render-review as unavailable and escalate otherwise clean units.
  - Gemini 3.1 flash image quota remains exhausted until 2026-11-17T11:00:06Z; illustrate launches should be held or cooled until reset.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
