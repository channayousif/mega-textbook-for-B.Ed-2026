---
id: crew-efmp-301-u08-repair_en
title: crew repair_en EFMP-301 unit 8
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u08-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-08/topic-01.mdx
 - docs/semester-1/efmp-301/unit-08/topic-03.mdx
 - docs/semester-1/efmp-301/unit-08/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-08/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-08/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-08/unit-assessment.mdx
 - specs/content/efmp-301/figures/unit-08.md
 - specs/content/efmp-301/reviews/unit-08/G2/20261103T053653429Z-gates.json
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261103T053653429Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261103T053653429Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261103T053653429Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261103T053653429Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261103T053653429Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261103T053653429Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261103T053653429Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261103T053653429Z/validate-content.txt
 - specs/content/efmp-301/sources/unit-08.md
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u08-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u08-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-301/reviews/unit-08/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 8 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-08/`.

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
From `specs/content/efmp-301/reviews/unit-08/G3/20261102T212207Z-g3-desk-04504f15.json` (disposition: revise). Resolve each one:
- [blocking] R1 partial repair: MCQs now meet 4/3/3, but RRQ-10 at unit-assessment.mdx:125-126 and its guidance at :197-199 ask about break-time peer inclusion and a once-a-term social seating map. Topic-02:81 only teaches a day-one map for names. RRQ distribution remains 3/3/3 plus an untaught item, not content-spec.md:1026-1028 approved 3/4/3. Replace RRQ-10 with a taught 8.2 item and align guidance/concept mapping through a separate author. Final cycle: escalate to owner.
- [blocking] New assessment defect: unit-assessment.mdx ERQ rubrics 1-5 each award 4/20 for within the word count, but none of the five ERQ stems or shared bank instructions supplies a word limit. Set explicit limits or revise the scoring criteria through a separate author.
- [advisory] R2 persists: MCQ guidance has seven b, two c, one a, zero d (unit-assessment.mdx:159-170). Rebalance option positions; merely changing MCQ-05 to a did not remove the 7/10 b concentration.
- [advisory] R3 partial: unit-teacher-notes.mdx:87-89 now honestly calls the ladder task the unit instantiation of generic practical work. However sources/unit-08.md:20 still calls it guide-named practical work behind teacher notes. Guide 1st 2026.txt:1182-1189 has only generic task categories. Correct the source registry attribution.
- [advisory] R4 partial: sources/unit-08.md:14 removed pacing, but still presents U8-5 as escalation responses including ignoring/conflict resolution instead of distinguishing the unit ladder from source mechanisms. Its support claim for the five-part environment exceeds the short bound Chapter 7 excerpt. Align support locators and distinguish synthesis from documented source findings.
- [advisory] R8 partial: topic-01.mdx:38, figure manifest alt, and fig-U8-1.svg desc now include the not-silence tagline. Manifest Prompt still omits it, so the requested prompt provenance correction remains.
- [uncertain] Fresh narrow-screen and A4 inspection unavailable: .crew/brief.md expressly prohibits builds, dev servers and Playwright. Old render images are not evidence of the repaired current bytes. Accessibility remains unverified; owner must provide permitted input-bound render evidence.
- [uncertain] Source support limited to bound sources/texts/seifert2009.md Chapter 7 excerpt. It verifies prevention, rules and natural/logical consequences, but not the complete environment framework, comparative claims such as most misbehaviour being design or proximity resolving more disruption than any raised voice, or the claimed documented head-teacher practice. No original full source text was provided or independently retrieved in this run. sources/unit-08.md has no Unverifiable sources declaration. Supply bound passages or qualify unsupported claims.
- [uncertain] Review handoff incomplete: parent supplied no current prepared frozen bundle or actual provider session/model-version metadata. This fresh reviewer prepared current committed inputs itself and records provenance transparently; that does not retroactively satisfy the skill requirement for a parent-prepared immutable handoff. No certified or provisional pass is claimed.

## Notes from earlier jobs on this unit
- (efmp-301-u08-review_en-conflict1, fix, agy_claude) The `check:content-status` gate fails on both this branch and origin/main because `static/content-status.json` was deleted; regenerating it requires `npm run build:content-status` but that is a separate fix job.
- (efmp-301-u08-review_en, review_en, codex) Owner action needed on untaught RRQ-10, unspecified ERQ word limits, and missing source/render evidence.
- (efmp-301-u08-review_en, review_en, codex) Owner action needed on untaught RRQ-10, unspecified ERQ word limits, and missing source/render evidence.
- (efmp-301-u08-fix, fix, opencode) G3 en-review is stale and needs a fresh run after the figure-geometry repair.
- (efmp-301-u08-fix, fix, opencode) The G2 en-draft gates file was regenerated; verify it passes `npm run check:content` before further work.


## Response snapshot

Applied the G3 desk-04504f15 repairs to EFMP-301 Unit 8 in English and Urdu (a taught Topic 8.2 RRQ 10, 400-500 word ERQ limits, a rebalanced MCQ key, corrected source registry attributions and scope, qualified synthesis claims, the fig-U8-1 prompt tagline), refreshed the G2 evidence and added an unticked advisory G3 tracker row.

## Outcome

- Impact: repair_en for EFMP-301 Unit 8 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the G3 desk-04504f15 repairs to EFMP-301 Unit 8 in English and Urdu (a taught Topic 8.2 RRQ 10, 400-500 word ERQ limits, a rebalanced MCQ key, corrected source registry attributions and scope, qualified synthesis claims, the fig-U8-1 prompt tagline), refreshed the G2 evidence and added an unticked advisory G3 tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Urdu Unit 8 files contain a mistranslated term "کاؤنٹرائزنگ" in place of "management" (for example in MCQ 2-3, RRQ 3, ERQ 5 and the topic-02 summary). It was out of scope for this English repair; a G5 or translation job should fix it.
  - The narrow-screen/A4 render check and fuller Seifert source passages are still owed by the owner, and the report marked this the final G3 cycle, so a fresh G3 run needs owner authorisation.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
