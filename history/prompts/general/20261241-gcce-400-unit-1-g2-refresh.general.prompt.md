---
id: 20261241
title: Refresh GCCE-400 Unit 1 G2 evidence after the Urdu mirror commit
stage: general
date: 2026-11-22
surface: agent
model: LongCat-2.5
feature: gcce-400
branch: crew/gcce-400-u01-translate
user: crew
command: Read .crew/brief.md
labels: [claude, crew, gcce-400, unit-01, translation]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gcce-400/tasks.md
  - specs/content/gcce-400/reviews/unit-01/G2/20261122T121830940Z-gates.json
  - specs/content/gcce-400/reviews/unit-01/G2/logs-20261122T121830940Z/
  - history/prompts/general/20261241-gcce-400-unit-1-g2-refresh.general.prompt.md
tests:
  - npm run check:content
  - npm run check:pipeline-gate
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gcce-400/unit-01/*.ur.svg
  - npm run figures:variants:check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Execution brief read verbatim:

# Crew job gcce-400-u01-translate

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GCCE-400 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-01/`.

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
- (gcce-400-u01-author, author, claude) The Semester 4 guide source PDF is committed at `static/guides/sources/4th-semester.pdf`, not under `Scheme-and-Course-guides/`, because that tree is a whole-corpus review-input root and adding there staled every accepted G2/G3 manifest (verified by staging it); the other six Semester 4 courses still have no `catalog/course-guides.json` entry, so their course overviews will hit the same `validate:content` finding until the owner adds them.
- (gcce-400-u01-author, author, claude) G3 en-review stays open; the tracker note asks the reviewer to confirm the kymlicka-norman-2000 attribution and constitutional currency in `sources/unit-01.md`.
- (gcce-400-u01-author, author, claude) Banner `fig-U1-7` remains prompt-only for the illustrate job, and no `.ur.svg` figures exist yet because the Urdu mirror is a separate job.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GCCE-400 Unit 1 (docs/semester-4/gcce-400/unit-01): G2 en-draft: stale or incomplete input manifest

## Response snapshot

Continued the branch from commit `8a0d0e139` (the six-page Urdu mirror, six `.ur.svg` figures and six dark twins). The translation was already complete and structurally clean: file set, heading vectors, component and import counts, figure IDs and `.ur.svg` wiring, the 10/10/5 assessment bank and the bank-bound `key_terms` all matched the English. The only branch defect was deterministic evidence: the translation commit added `specs/content/gcce-400/translations/unit-01/`, which names Unit 1 and therefore enters the G3-bound input manifest, so the committed G2 row pointed at a stale `20261122T064410267Z-gates.json`. Re-ran `prepare-gate-evidence.mjs --refresh-stale`, which regenerated the evidence and its eight real gate logs at HEAD and repointed the G2 tracker row. No English or Urdu content changed.

## Outcome

- ✅ Impact: GCCE-400 Unit 1's G2 row now points at gate evidence whose input manifest matches the committed tree; the branch passes all 14 content gates.
- 🧪 Tests: `npm run check:content` 14/14 PASS; `npm run check:pipeline-gate` PASS; a temporary `reviewed` flip of both `index.mdx` files confirmed `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check, reporting only the two expected unfinished G4/G5 tracker rows; `measure-figure-text.mjs` exited 0 on all six `.ur.svg`; `figures:variants:check` clean.
- 📁 Files: fresh G2 evidence and eight logs, the tracker G2 reference, this PHR. The Urdu mirror and figures remain as committed in `8a0d0e139`.
- 🔁 Next prompts: Independent G5 after accepted G3; CI `figure-geometry` for the six SVG text measurements; terminology owner for the proposed terms.
- 🧠 Reflection: A translation handoff file under `specs/content/<course>/` is a G2 input, so recording the translation invalidates the draft evidence and the refresh must be committed with it.

## Handoff (for CEO and agents)

- Shipped / changed: Committed the fresh GCCE-400 Unit 1 G2 gate evidence and the tracker repoint that the translation commit had invalidated.
- Decisions the team must respect: English and Urdu content are unchanged from `8a0d0e139`; `translation_status` stays `draft`; G3/G5 remain open; the skill forbids appending a G4 completion row. No build, server, Playwright, push or PR.
- Pending / next owner: G5 reviewer compares the actual rendered Urdu bundle at 360px and A4 print, and checks the RTL table reading order in `fig-U1-4`/`fig-U1-5`; CI measures SVG text geometry; the terminology owner assesses the proposed terms in `specs/content/gcce-400/translations/unit-01/handoff.md`.
- Paperclip issues affected: Crew job gcce-400-u01-translate; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: The committed translation left its own G2 evidence stale because the handoff file is bound to the unit's input manifest; the previous attempt's handoff claimed the G2 evidence was untouched, which was true of the English bytes but not of the manifest.
- Graders run and results (PASS/FAIL): `npm run check:content` 14/14 PASS; `npm run check:pipeline-gate` PASS; temporary reviewed parity PASS except the two expected unfinished-stage findings; `measure-figure-text.mjs` PASS; `figures:variants:check` PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Commit refreshed gate evidence in the same change that adds a unit-named handoff file, so the branch never carries a stale G2 row.
