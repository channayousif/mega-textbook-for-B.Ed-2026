---
id: crew-intel-2026-11-21-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-20
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-21-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-21.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-21-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-21-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-21.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [phr] x1 recent, 1 total, since 2026-11-20: failure modes observed: gflow returned "error executing tool" for a billed clip (shot n); the
  example: failure modes observed: gflow returned "Error executing tool" for a billed clip (shot 4); the
  evidence: phr:history/prompts/029-notebook-studio/20261224-efmp-302-v2-pilot-gflow-fixed.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-20: next experiment (smallest change to try): flow character ingredient (rnv) for a consistent presenter across shots n and n.
  example: next experiment (smallest change to try): Flow Character ingredient (r2v) for a consistent presenter across shots 1 and 5.
  evidence: phr:history/prompts/029-notebook-studio/20261224-efmp-302-v2-pilot-gflow-fixed.green.prompt.md

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-21.md` only.

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
- (intel-2026-11-20-distill, intel_distill, agy) In `scripts/render-inspect.mjs:306-310`, Section D attempts to fetch `.svg` variants for all placed figures in `unitFigures()`, failing on WebP illustrations (`kind: illustration`).
- (intel-2026-11-20-distill, intel_distill, agy) `prepare-gate-evidence.mjs` rejects lowercase course codes (e.g., `efpg-401`); uppercase arguments remain required until the script normalizes them automatically.
- (intel-2026-11-19-distill, intel_distill, claude) `specs/content/efpg-401/concepts/unit-05.md` has the wrong Urdu word ساتھ ("with") where it should say سات ("seven"); the file is a hashed G2 input, so it needs an English-side repair job.
- (intel-2026-11-18-distill, intel_distill, agy) GISS-401 Unit 7 raster illustrations are landed on main (PR #633) with G2 evidence refreshed; Unit 7 G3 review remains open pending independent academic and scholar review.
- (intel-2026-11-18-distill, intel_distill, agy) OpenClaw loopback transport timeout on WhatsApp notifications (10000ms) recurs during high host memory pressure and needs graceful handling in scripts/crew/notify.mjs.


## Response snapshot

2 candidates; the strongest is recovering billed GFlow clips when tool errors or structlog TypeErrors mask CLI returns.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: 2 candidates; the strongest is recovering billed GFlow clips when tool errors or structlog TypeErrors mask CLI returns.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - GFlow tool errors during clip generation can leave remote clips rendered and billed while structlog TypeError masks the error; recover over port 18801 before retrying.
  - Presenter visual consistency across shots 1 and 5 in teaser recipe v2 requires Flow Character reference ingredient (r2v).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
