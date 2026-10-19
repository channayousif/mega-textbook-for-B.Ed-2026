---
id: crew-gict-300-u05-translate-r1
title: crew translate GICT-300 unit 5
stage: misc
date: 2026-10-19
surface: agent
model: opencode
feature: gict-300
branch: crew/gict-300-u05-translate-r1
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0343-gict300-u05-g4-translate-verify.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-05/topic-03.mdx
 - specs/content/gict-300/reviews/unit-05/G4/translation-handoff.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gict-300-u05-translate-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gict-300-u05-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICT-300 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICT-300 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gict-300/`, and `static/img/figures/gict-300/unit-05/`.

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
- (gict-300-u05-translate, translate, opencode) 10 key_terms (Digital citizenship, Netiquette, Intellectual property, Copyright, Patent, Trademark, Fair use, Public domain, Creative Commons, Plagiarism) are absent from the frozen terminology.csv  -  proposed to the owner, must not be banked by agents. G5 review (independent, fresh session) still pending to advance translation_status beyond draft.


## Response snapshot

Verified GICT-300 Unit 5 G4 Urdu mirror complete, applied G5 F2 fair-use quotation boundary repair, added G4 translation handoff and PHR; all 13 content gates pass.

## Outcome

- Impact: translate for GICT-300 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified GICT-300 Unit 5 G4 Urdu mirror complete, applied G5 F2 fair-use quotation boundary repair, added G4 translation handoff and PHR; all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - 10 key_terms (Digital citizenship, Netiquette, Intellectual property, Copyright, Patent, Trademark, Fair use, Public domain, Creative Commons, Plagiarism) remain unbanked per earlier owner proposal  -  agents must not bank them. G5 advisory run 001 F1 (ERQ-2 tag) was already repaired at a7200d2; F2 applied this session; F3-F6 remain advisory. Independent G5 still pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
