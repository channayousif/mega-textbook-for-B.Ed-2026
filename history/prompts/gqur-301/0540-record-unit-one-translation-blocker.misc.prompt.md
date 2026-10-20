---
id: 0540
title: Record Unit One Translation Blocker
stage: misc
date: 2026-10-19
surface: agent
model: GPT-6 (Codex)
feature: gqur-301
branch: crew/gqur-301-u01-translate
user: crew
command: Read .crew/brief.md and carry it out
labels: ["crew", "codex", "board-direct", "translation-blocked"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gqur-301/reviews/unit-01/translation-blocked.md
 - history/prompts/gqur-301/0540-record-unit-one-translation-blocker.misc.prompt.md
tests:
 - Source-derived Node recount of all 25 quiz marks
 - npm run check:content (initial run: missing generated content-status cache)
 - npm run build:content-status
 - npm run check:content (final run: all 13 gates passed)
 - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Invoked brief (verbatim):

# Crew job gqur-301-u01-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u01-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gqur-301-u01-repair_en, repair_en, claude) The 16 unit-01 SVGs have not been re-measured in Chromium. Run `node scripts/measure-figure-text.mjs static/img/figures/gqur-301/unit-01/*.svg` where a browser is allowed, and check the new fig-U1-1 layout.
- (gqur-301-u01-repair_en, repair_en, claude) X2 (narrow-viewport and A4 print check) is still open, the NCC progression grid PDF has not been found or read, and the unit has no Urdu version yet (G4 pending).
- (gqur-301-u01-review_en-conflict1, fix, codex) Prior review findings remain for the unit repair job: SVG overflows, RRQ 5 counts, and topic-02 citations.
- (gqur-301-u01-review_en-conflict1, fix, codex) Prior review findings remain for the unit repair job: SVG overflows, RRQ 5 counts, and topic-02 citations.
- (gqur-301-u01-review_en, review_en, agy) Fix 24 SVG text geometry overflows across all 8 figures in static/img/figures/gqur-301/unit-01/ (add text-anchor: end; to .wm class for wordmark; adjust x/width on fig-U1-1 continuous example).


## Response snapshot

Stopped before translation under translate-unit's explicit English-error stop condition. Documented incorrect topic-03 worked frequencies and dependent fig-U1-5 values, with a source-derived reproducer. Left G4 and draft status unchanged. No build, browser, publication or review certification was performed.

## Outcome

- ✅ Impact: Recorded a concrete prerequisite blocker rather than translating known incorrect arithmetic. The requested Urdu mirror remains outstanding.
- 🧪 Tests: Recount confirms frequencies 4, 10, 10, 1; cumulative frequencies 4, 14, 24, 25. Final check:content: all 13 gates passed.
- 📁 Files: Unit-scoped blocker handoff and this PHR only.
- 🔁 Next prompts: Separate English repair job; resume G4 against repaired frozen English, then independent G5.
- 🧠 Reflection: Green deterministic G2 evidence does not prove that a worked calculation is correct.

## Handoff (for CEO and agents)

- Shipped / changed: Reproducible blocker note for topic-03 tables, interpretation and fig-U1-5.
- Decisions the team must respect: Obey translate-unit stop condition. Do not silently repair meaning in Urdu, modify the frozen bank, mark G3/G5 complete or change draft status. No G4 row appended under Step 7.
- Pending / next owner: English author repairs arithmetic and dependent figures, refreshes affected evidence; translator resumes complete G4; independent reviewer owns subsequent review; host owns rendered inspection barred in this brief.
- Paperclip issues affected: No ticket supplied; links.ticket is null. Crew job gqur-301-u01-translate remains blocked on English repair.

## Evaluation notes (flywheel)

- Failure modes observed: Wrong worked frequencies survived green content gates. Concept graph claims Data is banked although current terminology.csv has no Data entry. Missing ignored content-status cache caused the initial gate failure.
- Graders run and results (PASS/FAIL): Node recount PASS; initial check:content FAIL (missing cache at unchanged origin/main); final check:content PASS (13/13).
- Prompt variant (if applicable): crew brief in .crew/brief.md
- Next experiment (smallest change to try): Recount repaired worked data and figure values before resuming translation.
