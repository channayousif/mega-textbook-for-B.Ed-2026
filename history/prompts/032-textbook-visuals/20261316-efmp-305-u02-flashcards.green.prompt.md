---
id: 20261316
title: Crew efmp-305-u02-flashcards - EFMP-305 Unit 2 bilingual flashcard deck
stage: green
date: 2026-11-28
surface: agent
model: claude-sonnet-5-5
feature: 032-textbook-visuals
branch: crew/efmp-305-u02-flashcards
user: M Yousif Channa
command: crew flashcards job
labels: [claude, crew, interactivity]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/flashcards/efmp-305/unit-02.json
  - specs/studio/flashcards-needed.json
tests:
  - node scripts/build-studio-index.mjs --coverage (no skip for this unit)
  - npm run check:content (14 gates PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The brief, verbatim:

# Crew job efmp-305-u02-flashcards

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u02-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author the flashcard deck for EFMP-305 Unit 2 (Feature 032 phase C; owner, 2026-11-23: "Terms + server marking"). Read every English topic file of the unit and its Urdu mirror. For each topic, pick 6 to 10 key terms a learner must know from that topic, each one used in the topic's own text; prefer the topic's bold or defined terms. Write a plain definition of each in one or two sentences (at most 300 characters), saying only what the topic says (no new facts, no examples the text does not give), and its Urdu card: the Urdu term from `specs/content/terminology.csv` when a pair exists, otherwise the term as the Urdu topic writes it, and an academic-plain Urdu definition matching the English one. Write `specs/studio/flashcards/efmp-305/unit-02.json` as { "course": "EFMP-305", "unit": 2, "topics": { "1": { "en": [{ "term": "...", "definition": "..." }], "ur": [ ...same order... ] }, ... } }. No long dashes. Run `node scripts/build-studio-index.mjs --coverage` (it must not print "skipped" for this unit, and the unit leaves flashcards-needed.json) and commit both files. Do not edit glossary.json, terminology.csv, topic MDX or any file under specs/content/: decks stay outside the review evidence.

## Scope
EFMP-305 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-02/`.

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
- (efmp-305-u02-review_ur, review_ur, opencode) The escalation is advisory only; all six deterministic gates pass and the bilingual comparison found no material semantic defect. The two blockers are missing page-level render access (accessibility/rtl unverified, no build/dev server/Playwright) and terminology bank departures (Assessment جانچ vs تشخیص, Slow Learner سست طالب علم vs کمزور متعلم, Learning Outcome تعلیمی نتائج vs نتیجہ ہائے تعلم, unbanked Labelling لیبل/لیبلنگ/ٹھپا) needing an owner ruling.
- (efmp-305-u02-review_ur, review_ur, opencode) A human should inspect the eight committed PNGs under `reviews/unit-02/logs-abe274b8/` and run a render-capable G5 pass; the accepted G3 dependency (CMY desk report) is unsigned, so automatic acceptance is not possible.
- (efmp-305-u02-review_en, review_en, agy) G3 advisory review passed on cycle 2; next job on EFMP-305 Unit 2 is independent G5 Urdu review (unit has completed G4 translation mirror).
- (efmp-305-u02-repair_en-conflict2, fix, opencode) Urdu topic 2.2 Further reading still needs G5 to verify the Florian citation description line was updated correctly alongside the DOI link.
- (efmp-305-u02-repair_en-conflict2, fix, opencode) translation_status stays draft pending independent G5 review; proposed UR terms (learner diversity, impairment, handicap, labelling, stigma) queued for owner.

## Response snapshot

Authored the Unit 2 deck: 19 cards in English and Urdu across two topics (10 and 9). Each English
headword and its Urdu card term was checked by script to occur in its topic's own text. Topic MDX,
glossary, terminology bank and specs/content were not edited.

## Outcome

- ✅ Impact: EFMP-305 Unit 2 topics gain flashcards; the unit leaves flashcards-needed.json.
- 🧪 Tests: coverage run printed no skip; all 14 content gates pass.
- 📁 Files: one new deck, one line removed from the needed list, this record.
- 🔁 Next prompts: push and open the PR (crew lead).
- 🧠 Reflection: the coverage run also rewrites tracked files under static/studio/flashcards/; they were restored before committing.

## Handoff (for CEO and agents)

- Shipped / changed: specs/studio/flashcards/efmp-305/unit-02.json (committed on the crew branch, not pushed).
- Decisions the team must respect: decks stay outside the review evidence.
- Pending / next owner: crew lead to push and open the PR. Urdu cards copy the topic wording, so a later owner ruling on terms (for example labelling, stigma, impairment, handicap) should be mirrored in the deck.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none in the deck itself.
- Graders run and results (PASS/FAIL): verbatim-term script PASS; deck validation PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add the verbatim-term check to the deck builder as a warning.
