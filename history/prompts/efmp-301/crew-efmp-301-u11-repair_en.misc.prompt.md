---
id: crew-efmp-301-u11-repair_en
title: crew repair_en EFMP-301 unit 11
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u11-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-11/topic-01.mdx
 - docs/semester-1/efmp-301/unit-11/topic-02.mdx
 - docs/semester-1/efmp-301/unit-11/unit-assessment.mdx
 - docs/semester-1/efmp-301/unit-11/unit-teacher-notes.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/unit-teacher-notes.mdx
 - specs/content/efmp-301/coverage/unit-11.md
 - specs/content/efmp-301/figures/unit-11.md
 - specs/content/efmp-301/reviews/unit-11/G2/20261103T055535383Z-gates.json
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/validate-content.txt
 - specs/content/efmp-301/sources/texts/who2000.md
 - specs/content/efmp-301/sources/unit-11.md
 - specs/content/efmp-301/tasks.md
 - static/img/figures/efmp-301/unit-11/fig-U11-2.dark.svg
 - static/img/figures/efmp-301/unit-11/fig-U11-2.svg
 - static/img/figures/efmp-301/unit-11/fig-U11-2.ur.dark.svg
 - static/img/figures/efmp-301/unit-11/fig-U11-2.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u11-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u11-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-301/reviews/unit-11/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 11 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 11 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-11/`.

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
From `specs/content/efmp-301/reviews/unit-11/G3/20261102T212207Z-g3-desk-c705dbc8.json` (disposition: revise). Resolve each one:
- [blocking] Source-support gap: sources/unit-11.md attributes U11-2 signs to who2026, but sources/texts/who2026.md only binds definition/human-right/environment/SEL passages, no warning signs or referral protocol. topic-01.mdx Common difficulties and their signs asserts local frequency, clustered Monday absences, sudden calm implying a decision, and same-day escalation; topic-02.mdx Refer beyond it prescribes the timing/route, repeated in MCQ 7/RRQ 9 and fig-U11-2. These clinical and safeguarding claims cannot be verified from this bundle. Bind suitable authoritative passages and have a qualified subje...
- [advisory] Prior finding 4 remains: topic-01.mdx and topic-02.mdx Further reading retain bare URLs. Use descriptive linked titles.
- [advisory] Prior finding 5 remains: content-spec.md Unit 11 Common misconceptions includes talking about suicide or sadness plants the idea; no explicit correction appears in topic-01.mdx or unit-teacher-notes.mdx. Author needs a sourced explicit correction.
- [advisory] Prior finding 7 remains: unit-teacher-notes.mdx Language and access says banked where banked and lists four terms without distinguishing authored Mental Health/Well-being from banked Stress/Anxiety.
- [advisory] unit-assessment.mdx ERQ rubrics reserve four marks for writing within the word count, but unit-bank prompts give no word count (only topic summative tasks state 250-300). Specify the applicable limit or remove that scoring condition.
- [advisory] coverage/unit-11.md duplicates U11-3/U11-4 rows and still maps seifert2009 directly onto U11-3 despite sources/unit-11.md limiting it to background. Align the declared mapping.
- [uncertain] Current desktop/narrow-screen/A4 print inspection unavailable under explicit crew prohibition on build/server/Playwright. accessibility remains unverified; no render-review success or images fabricated.
- [uncertain] Parent did not supply current frozen bundle or actual author session identity. Author repair commit is documented, not a session ID. Exact model revision unavailable. New manifest prepared explicitly in reviewer session; independence asserted by brief and fresh reviewer history but full handoff provenance unverifiable.
- [uncertain] Assessment answers were exposed in combined source read before a blind solve was recorded. assessment-and-repairs.md records consistency re-solving of all 25 items; required blind-solve sequence remains unverified.
- [uncertain] Second and final review cycle per crew brief: unresolved support, render and provenance limitations require curriculum-owner escalation, not an automatic third cycle or gate completion.

## Notes from earlier jobs on this unit
- (efmp-301-u11-review_en-conflict1, fix, agy) Owner escalation required for clinical source support, render evidence and review provenance; no automatic third review cycle under ADR-0019.
- (efmp-301-u11-review_en-conflict1, fix, agy) Untracked gitignored static/content-status.json to align with origin/main maintenance 2026-W43.
- (efmp-301-u11-review_en, review_en, codex) Owner escalation required for clinical source support, render evidence and review provenance; no automatic third cycle.
- (efmp-301-u11-review_en, review_en, codex) Owner escalation required for clinical source support, render evidence and review provenance; no automatic third cycle.
- (efmp-301-u11-fix, fix, codex) Fresh independent G3 review required; local generated content-status.json remains uncommitted.


## Response snapshot

Applied G3 desk-c705dbc8 to EFMP-301 Unit 11 EN+UR: bound the signs and referral to the WHO 2000 teacher resource, removed unsupported clinical claims, added a sourced correction of the talking misconception, linked Further reading, set the ERQ word limit, clarified banked terms, removed coverage duplicates, updated fig-U11-2, refreshed G2 evidence and appended an advisory G3 row.

## Outcome

- Impact: repair_en for EFMP-301 Unit 11 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied G3 desk-c705dbc8 to EFMP-301 Unit 11 EN+UR: bound the signs and referral to the WHO 2000 teacher resource, removed unsupported clinical claims, added a sourced correction of the talking misconception, linked Further reading, set the ERQ word limit, clarified banked terms, removed coverage duplicates, updated fig-U11-2, refreshed G2 evidence and appended an advisory G3 row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner escalation is still needed for a qualified subject review of the WHO-bound clinical, urgency and referral wording, for render inspection, and for review provenance; a fresh G3 run needs owner authorisation under ADR-0019.
  - `sources/texts/who2026.md`'s "Used for" note still lists U11-2 signs; I didn't edit it because the file is shared with Unit 12 and changing it makes Unit 12's G2 evidence stale.
  - The Urdu wording is new and hasn't had a G5 review; check the added WHO quotations and the "اچانک، نمایاں تبدیلی" sign wording.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
