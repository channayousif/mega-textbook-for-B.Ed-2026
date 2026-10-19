---
id: crew-efmp-303-u01-translate
title: crew translate EFMP-303 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: efmp-303
branch: crew/efmp-303-u01-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/crew-efmp-303-u01-translate.misc.prompt.md
 - specs/content/efmp-303/reviews/unit-01/G4/translation-handoff.md
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
 - npm run test:crew
 - npm run test:review
 - npm run figures:variants:check
---

## Prompt

# Crew job efmp-303-u01-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u01-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-303 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (efmp-303-u01-review_en, review_en, agy) G3 disposition is escalate because host brief constraints prohibit running build or dev server for live interactive viewport (360x780) and A4 print emulation.
- (efmp-303-u01-review_en, review_en, agy) Board G0/G1 intake status is noted as pending in tasks.md:15 despite approved content-spec.

## Response snapshot

Verified EFMP-303 Unit 1 complete 7-file Urdu mirror at G4 with 8 wired .ur.svg/.ur.dark.svg figure variants, 10/10/5 assessment parity with bounded answers, and terminology compliance; created translation handoff, updated G4 tracker row in tasks.md to in-progress, and passed all 13 content gates.

## Outcome

- Impact: translate for EFMP-303 Unit 1 by agy.
- Tests: npm run check:content, test:crew, test:review, and figures:variants:check all passed.
- Files: 3 file(s), listed above.
- Next prompts: crew planner derives next stage (independent G5 ur-review).
- Reflection: None.

## Handoff (for CEO and agents)

- Shipped / changed: Verified EFMP-303 Unit 1 complete 7-file Urdu mirror at G4 with wired figures and terminology compliance, created translation handoff, updated task tracker, and passed all content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything. translation_status stays draft pending independent G5 review.
- Pending / next owner: crew lead / independent G5 reviewer.
- Notes for the next job on this unit:
  - All 8 .ur.svg figure variants are wired in topics 1-4 with matching carrier alt text and derived .ur.dark.svg twins; figures:variants:check passes cleanly.
  - Structural, figure, and terminology parity verified clean under temporary reviewed flip (reverted to draft pending independent G5 review).
  - Proposed terms for curriculum owner: Educational policy (تعلیمی پالیسی), Educational planning (تعلیمی منصوبہ بندی), Policy-planning relationship (پالیسی اور منصوبہ بندی کا تعلق), Education-society-development triangle (تعلیم، سماج اور ترقی کا تکون), Social factors shaping education (تعلیم کو تشکیل دینے والے معاشرتی عوامل), Colonial education legacy (نوآبادیاتی تعلیم کا وراثت), Post-independence education developments (آزادی کے بعد تعلیمی ترقیات), Sharif Commission (1959) (شریف کمیشن (1959)), Education milestones timeline (تعلیم کے سنگ میل کا خط زمانی), Human capital (انسانی سرمایہ); and note on Development sense split (نشوونما vs ترقی).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
