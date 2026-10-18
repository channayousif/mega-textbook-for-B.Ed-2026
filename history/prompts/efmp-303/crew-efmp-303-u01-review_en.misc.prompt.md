---
id: crew-efmp-303-u01-review_en
title: crew review_en EFMP-303 unit 1
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: efmp-303
branch: crew/efmp-303-u01-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/0177-efmp-303-u01-independent-g3-review.misc.prompt.md
 - history/prompts/efmp-303/0337-efmp-303-u01-independent-g3-review.misc.prompt.md
 - specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run044c8d2c.json
 - specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run044c8d2c.summary.md
 - specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run6844dc97.json
 - specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run6844dc97.summary.md
 - specs/content/efmp-303/reviews/unit-01/G3/manifest.json
 - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/assessment-independent.md
 - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/check-depth-gate.log
 - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/check-docs-sync.log
 - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/check-figures.log
 - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/check-no-answer-keys.log
 - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/check-no-em-dash.log
 - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/fig-U1-1.webp
 - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/figure-geometry.log
 - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/render-review.log
 - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/validate-content.log
 - specs/content/efmp-303/reviews/unit-01/logs-044c8d2c/check-depth-gate.log
 - specs/content/efmp-303/reviews/unit-01/logs-044c8d2c/check-docs-sync.log
 - specs/content/efmp-303/reviews/unit-01/logs-044c8d2c/check-figures.log
 - specs/content/efmp-303/reviews/unit-01/logs-044c8d2c/check-no-answer-keys.log
 - specs/content/efmp-303/reviews/unit-01/logs-044c8d2c/check-no-em-dash.log
 - specs/content/efmp-303/reviews/unit-01/logs-044c8d2c/render-review.log
 - specs/content/efmp-303/reviews/unit-01/logs-044c8d2c/validate-content.log
 - specs/content/efmp-303/reviews/unit-01/renders-044c8d2c/fig-U1-1.webp
 - specs/content/efmp-303/reviews/unit-01/renders-044c8d2c/render-inspect.json
 - specs/content/efmp-303/reviews/unit-01/renders-044c8d2c/render-inspect.log
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u01-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u01-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-303 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

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

## Feedback from the previous attempt
npm run check:content has 315 finding(s) that main does not have:
✗ Content validation failed with 316 error(s):
- glossary.json: invalid JSON: Expected ',' or '}' after property value in JSON at position 121226 (line 1841 column 5)
- docs/semester-1/efmp-301/unit-01/topic-01.mdx: <Glossary term="Educational Psychology"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-02/topic-01.mdx: <Glossary term="Development"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-02/topic-02.mdx: <Glossary term="Adolescence"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-02/topic-03.mdx: <Glossary term="Cognitive Development"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-03/topic-01.mdx: <Glossary term="Behaviorism"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-03/topic-04.mdx: <Glossary term="Constructivism"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-04/topic-01.mdx: <Glossary term="Attention"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-07/topic-01.mdx: <Glossary term="Individual Differences"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-07/topic-02.mdx: <Glossary term="Slow Learner"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-07/topic-02.mdx: <Glossary term="Inclusive Education"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-08/topic-01.mdx: <Glossary term="Classroom Management"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-09/topic-01.mdx: <Glossary term="Assessment"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-09/topic-03.mdx: <Glossary term="Formative Assessment"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-09/topic-03.mdx: <Glossary term="Summative Assessment"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-12/topic-01.mdx: <Glossary term="Guidance and Counseling"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-12/topic-02.mdx: <Glossary term="Professional Ethics"> has no matching entry in glossary.json
- docs/semester-1/efmp-301/unit-12/topic-03.mdx: <Glossary term="Professional Ethics"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-01/topic-01.mdx: <Glossary term="Profession"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-02/topic-01.mdx: <Glossary term="Professional Ethics"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-02/topic-02.mdx: <Glossary term="Code of Ethical Conduct"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-02/topic-03.mdx: <Glossary term="Reflective Decision Making"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-02/topic-04.mdx: <Glossary term="Ethical Dilemma"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-03/topic-01.mdx: <Glossary term="Teacher Effectiveness"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-03/topic-04.mdx: <Glossary term="Verbal Communication"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-03/topic-04.mdx: <Glossary term="Non-verbal Communication"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-04/topic-01.mdx: <Glossary term="Professional Standards"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-04/topic-02.mdx: <Glossary term="National Professional Standards for Teachers"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-04/topic-03.mdx: <Glossary term="Professional Standards"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-04/topic-04.mdx: <Glossary term="Teacher Licensing"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-05/topic-01.mdx: <Glossary term="Burnout"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-05/topic-01.mdx: <Glossary term="Multi-grade Classroom"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-05/topic-02.mdx: <Glossary term="Occupational Status"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-06/topic-01.mdx: <Glossary term="Continuous Professional Development"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-06/topic-03.mdx: <Glossary term="Professional Learning Community"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-06/topic-03.mdx: <Glossary term="Reflective Practice"> has no matching entry in glossary.json
- docs/semester-1/efmp-302/unit-06/topic-04.mdx: <Glossary term="Professional Development Plan"> has no matching entry in glossary.json
- docs/semester-1/geng-300/unit-01/topic-01.mdx: <Glossary term="Register"> has no matching entry in glossary.json
- docs/semester-1/geng-300/unit-01/topic-01.mdx: <Glossary term="Collocation"> has no matching entry in glossary.json


## Response snapshot

Merged origin/main to resolve the systemic glossary syntax error and completed independent G3 English review evidence reporting disposition escalate for EFMP-303 Unit 1.

## Outcome

- Impact: review_en for EFMP-303 Unit 1 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 27 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main to resolve the systemic glossary syntax error and completed independent G3 English review evidence reporting disposition escalate for EFMP-303 Unit 1.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 disposition is escalate because host brief constraints prohibit running build or dev server for live interactive viewport (360x780) and A4 print emulation.
  - Board G0/G1 intake status is noted as pending in tasks.md:15 despite approved content-spec.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
