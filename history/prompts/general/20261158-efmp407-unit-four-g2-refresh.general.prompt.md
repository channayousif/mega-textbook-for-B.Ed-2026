---
id: 20261158
title: Refresh EFMP-407 Unit 4 G2 evidence after the Urdu mirror commit
stage: general
date: 2026-11-07
surface: cli
model: opencode/LongCat-2.0
feature: efmp-407-u04-translate
branch: crew/efmp-407-u04-translate
user: crew
command: Read .crew/brief.md
labels: [opencode, crew, efmp-407, unit-04, translation]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-407/tasks.md
  - specs/content/efmp-407/reviews/unit-04/G2/20261107T111834578Z-gates.json
  - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/
  - history/prompts/general/20261158-efmp407-unit-four-g2-refresh.general.prompt.md
tests:
  - npm run check:content
  - npm run check:pipeline-gate
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Execution brief read verbatim:

# Crew job efmp-407-u04-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-04/`.

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
- (efmp-407-u04-review_en, review_en, agy) Excerpt files lim-allan-2016-futures and unesco-2017-esd-objectives exist on disk but were omitted from input_manifest due to citedKeysFor regex; engineering owner should bind them before final qualification.
- (efmp-407-u04-review_en, review_en, agy) Live browser rendering, 360px viewport table scrollability, and A4 print handout inspection remain uninspected under brief execution constraints.
- (efmp-407-u04-review_en, review_en, agy) Candidate English content files in docs/semester-3/efmp-407/unit-04/ remain unchanged and clean across all 14 gates.
- (efmp-407-u04-author-conflict1, fix, opencode) `static/content-status.json` is git-ignored and was regenerated locally only; a root-scope job must regenerate it before publication.
- (efmp-407-u04-author-conflict1, fix, opencode) `fig-U4-1` to `fig-U4-6` browser text geometry is unmeasured until CI `figure-geometry` runs; banner `fig-U4-7` remains prompt-only.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-407 Unit 4 (docs/semester-3/efmp-407/unit-04): G2 en-draft: stale or incomplete input manifest

## Response snapshot

Continued the branch after commit `0418d1b87` (the six-page Urdu mirror, six `.ur.svg` figures and six dark twins). The translation itself was already complete and structurally clean: file-set, heading vectors, component/import counts, figure IDs and `.ur.svg` wiring, the 10/10/5 assessment bank, MCQ letter mapping and `key_terms` all matched the English. The only branch defect was deterministic evidence: adding `specs/content/efmp-407/translation/unit-04.md` to the tree entered the G3-bound input manifest, so the committed G2 row pointed at a stale `20261107T074842577Z-gates.json`. The previous attempt had already generated fresh evidence at HEAD `0418d1b87` (`20261107T111834578Z-gates.json` plus eight real gate logs) and repointed the tracker row, but left both uncommitted. This pass verified that evidence, confirmed the ignored `static/content-status.json` was regenerated for the repointed tracker, and committed the refresh. No English or Urdu content changed.

## Outcome

- ✅ Impact: EFMP-407 Unit 4's G2 row now points at gate evidence whose input manifest matches the committed tree; the branch passes all 14 content gates.
- 🧪 Tests: `npm run check:content` 14/14 PASS; `npm run check:pipeline-gate` PASS; temporary reviewed flip confirmed parity gates and `key_terms` clean (only the expected unfinished G4/G5 rows reported); `git diff --check` clean.
- 📁 Files: fresh G2 evidence and eight logs, tracker G2 reference, this PHR. The Urdu mirror and figures remain as committed in `0418d1b87`.
- 🔁 Next prompts: Independent G5 after accepted G3; CI `figure-geometry` for the six SVG text measurements; terminology owner for the proposed terms.
- 🧠 Reflection: A translation handoff file under `specs/content/<course>/` is a G2 input, so recording the translation invalidates the draft evidence and the refresh must be committed with it.

## Handoff (for CEO and agents)

- Shipped / changed: Committed the fresh EFMP-407 Unit 4 G2 gate evidence and the tracker repoint that the translation commit had invalidated.
- Decisions the team must respect: English and Urdu content are unchanged from `0418d1b87`; `translation_status` stays `draft`; G3/G5 remain open; the skill forbids appending a G4 completion row. No build, server, Playwright, push or PR.
- Pending / next owner: G5 reviewer compares the actual rendered Urdu bundle; CI measures SVG text geometry; the terminology owner assesses the proposed terms in `specs/content/efmp-407/translation/unit-04.md`. The Urdu prose uses `کوڑے دان` for "bin" consistently across `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx` and `fig-U4-3.ur.svg`; a reviewer may prefer `کوڑا دان`, but changing it now would require a fresh SVG text-geometry measurement this brief prohibits.
- Paperclip issues affected: Crew job efmp-407-u04-translate; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: The committed translation left its own G2 evidence stale because the handoff file is bound to the unit's input manifest; the fix existed only as untracked working-tree files.
- Graders run and results (PASS/FAIL): `npm run check:content` 14/14 PASS; `npm run check:pipeline-gate` PASS; temporary reviewed parity PASS except the two expected unfinished-stage findings; `git diff --check` PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Commit refreshed gate evidence in the same change that adds a unit-named handoff file, so the branch never carries a stale G2 row.
