---
id: crew-gent-401-u06-repair_en
title: crew repair_en GENT-401 unit 6
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: gent-401
branch: crew/gent-401-u06-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-06/topic-01.mdx
 - docs/semester-4/gent-401/unit-06/topic-02.mdx
 - docs/semester-4/gent-401/unit-06/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-06/unit-assessment.mdx
 - specs/content/gent-401/concepts/unit-06.md
 - specs/content/gent-401/figures/unit-06.md
 - specs/content/gent-401/reviews/unit-06/G2/20261128T042041116Z-gates.json
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261128T042041116Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261128T042041116Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261128T042041116Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261128T042041116Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261128T042041116Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261128T042041116Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261128T042041116Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261128T042041116Z/validate-content.txt
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-06/fig-U6-1.dark.svg
 - static/img/figures/gent-401/unit-06/fig-U6-1.svg
 - static/img/figures/gent-401/unit-06/fig-U6-1.ur.dark.svg
 - static/img/figures/gent-401/unit-06/fig-U6-1.ur.svg
 - static/img/figures/gent-401/unit-06/fig-U6-2.dark.svg
 - static/img/figures/gent-401/unit-06/fig-U6-2.svg
 - static/img/figures/gent-401/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/gent-401/unit-06/fig-U6-2.ur.svg
 - static/img/figures/gent-401/unit-06/fig-U6-4.dark.svg
 - static/img/figures/gent-401/unit-06/fig-U6-4.svg
 - static/img/figures/gent-401/unit-06/fig-U6-4.ur.dark.svg
 - static/img/figures/gent-401/unit-06/fig-U6-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u06-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/gent-401/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-06/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/gent-401/reviews/unit-06/G3/20261127T192818Z-g3-desk-3318f22a.json` (disposition: revise). Resolve each one:
- [advisory] concepts/unit-06.md:7 maps RRQ-02 (word-of-mouth promotion) to CON:GENT-401-6-1 (Branding and market positioning) although the item assesses CON:GENT-401-6-2 (Promotion strategies); :12 maps ERQ-05 only to CON:GENT-401-6-6 although the integrative task also integrates CON-1, CON-2, CON-4 and CON-5. Correct the mapping.
- [advisory] unit-assessment.mdx ERQs are distributed 1 for topic 6.1 (ERQ 1) and 3 for topic 6.2 (ERQ 2-4) plus the integrative ERQ 5, while content-spec.md:348 says "2 per topic plus 1 integrative item (total 5)". Either recount ERQ 4 as a 6.1 item or move/add an ERQ so each topic carries two.
- [advisory] topic-02.mdx:113 characterises fabricating government affiliations as violating "the Pakistan Penal Code (fraud)" and consumer protection standards. No bound source supports that specific legal label; cite a bound source or soften it to the statutory offence.
- [advisory] topic-01.mdx:56-61 says the positioning table is plotted "as shown in Figure 6.1", but fig-U6-1.svg plots a different set of four ventures: it drops the standard textbook bookstore and adds an "Unverified Tutor". Align the figure with the prose table or reword the prose.
- [advisory] topic-01.mdx:73-78 names four channels (word of mouth, targeted print, demonstrations, referral incentives) while fig-U6-2.svg rows are word of mouth, targeted print, digital & social and demonstrations, and the alt text calls the fourth row "community events"; fig-U6-4.svg gives the patent example as "at half normal cost" where topic-02.mdx:88 says "using 80 percent less wire".
- [uncertain] topic-02.mdx:133 "Check your understanding" item 3 is tagged *(Evaluate)*, above the approved formative band Remember - Understand - Apply (style-guide.md:227,237). The item genuinely demands evaluation, so either reword it into the band or record an owner ruling that the band extends.
- [uncertain] topic-01.mdx:75 states word of mouth is "the single most influential driver of school choices and tuition enrolments" in Pakistani education. No bound source supports that superlative (openstax-entrepreneurship.md:33 and scott-2017-efmd.md:50 list word of mouth only as a bootstrap technique). Cite a source, soften the claim, or record a no-external-source row (style-guide.md:293).
- [uncertain] Rendered-page and A4 print inspection unavailable: the deployed build 366019f8ace647e892523e553b81ab6d1832ec68 differs from reviewed HEAD f71773ed96f566c1e421ec586142274b2fdf3acd for this unit, and the brief prohibits building or serving the site. Narrow-screen, reading-order, clipping and print checks remain unverified.

## Notes from earlier jobs on this unit
- (gent-401-u06-review_en, review_en, claude_crew) G3 is advisory escalate and unsigned; the next author repair should fix F1-F8, then a fresh G3 run needs a renderable input (deployed SHA must equal HEAD for `docs/semester-4/gent-401/unit-06/` and `static/img/figures/gent-401/unit-06/`).
- (gent-401-u06-review_en, review_en, claude_crew) `check:bloom-bands` does not read per-topic `## Check your understanding` items and `check:concept-graph` does not judge mapping semantics, so F1/F2 pass the gates; verify fixes by reading, not by the gate.
- (gent-401-u06-review_en, review_en, claude_crew) Live SECP/IPO pages were unreachable (403 / TLS failure), so source support was judged against `specs/content/gent-401/sources/texts/`; F4/F5 would need a new bound note or a softened claim.
- (gent-401-u06-illustrate, illustrate, agy) Unit 6 banner fig-U6-5 is placed with gflow; G3 en-review and G5 ur-review remain open for independent evaluation.
- (gent-401-u06-illustrate, illustrate, agy) Independent reviewer should verify SECP eZfile incorporation steps and IPO-Pakistan IP classifications.


## Response snapshot

Repaired the GENT-401 Unit 6 G3 desk findings in English and Urdu (concept mapping, ERQ balance, unsupported claims, one Bloom tag, figures 6.1, 6.2 and 6.4), refreshed G2 evidence and added the advisory G3 tracker row, leaving G3 unticked.

## Outcome

- Impact: repair_en for GENT-401 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 30 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired the GENT-401 Unit 6 G3 desk findings in English and Urdu (concept mapping, ERQ balance, unsupported claims, one Bloom tag, figures 6.1, 6.2 and 6.4), refreshed G2 evidence and added the advisory G3 tracker row, leaving G3 unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - A fresh G3 run needs the deployed build to include these changes; rendered-page, narrow-screen and A4 checks are still unverified, and ERQ 4's rubric was reweighted (3/2/2/2/1).
  - In fig-U6-4.svg (English), "(renewable 10 yrs)" and "Registered Designs" touch or cross the column divider; this was there before, was not a G3 finding, and I left it.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
