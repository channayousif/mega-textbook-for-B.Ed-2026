---
id: crew-efmp-409-u04-author-conflict1
title: crew resolve EFMP-409 unit 4 merge conflicts
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-409
branch: crew/efmp-409-u04-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-409/sources/texts/hec-2013-foundations.md
 - specs/content/efmp-409/tasks.md
 - history/prompts/efmp-409/crew-efmp-409-u04-author-conflict1.misc.prompt.md
tests:
 - npm run build:content-status
 - npm run check:content
---

## Prompt

# Crew job efmp-409-u04-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-409-u04-author conflicts with main (specs/content/efmp-409/sources/texts/hec-2013-foundations.md, specs/content/efmp-409/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-409 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-04/`.

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
- (efmp-409-u04-author, author, claude_crew) G3 should have a qualified scholar check the Islamic material (Surah Al-Alaq, the hadith on knowledge, the Charter of Medina, the Last Sermon, As-Suffa) per content-spec drafting note 8.
- (efmp-409-u04-author, author, claude_crew) `besari-2023-knowledge-ethics`, `farooq-2018-farewell-sermon` and `sani-2019-suffa` were verified only through Crossref metadata and abstracts (full texts not read); their `sources/texts` notes say so, and the Topic 4.1 hadith citations are paraphrased by collection and number.
- (efmp-409-u04-author, author, claude_crew) banner `fig-U4-7` is still prompt-only; the Urdu mirror is a separate job; the authored Urdu concept labels need G5 review.

## Response snapshot

Merged `origin/main` (70e141423) into `crew/efmp-409-u04-author`. Two content conflicts, both resolved by union:

- `specs/content/efmp-409/tasks.md`: kept main's Unit 2 tracker rows, reading estimates and author-notes paragraph, then this branch's Unit 4 rows and reading estimates; the status header now reads Units 1, 2 and 4. Main's author-notes paragraph was kept verbatim because it is a strict superset of the branch's (it adds the Unit 2 re-citations and the shared HEC note sentence).
- `specs/content/efmp-409/sources/texts/hec-2013-foundations.md`: kept notes 1-5, then main's `## Unit 2 evidence notes` (6-10), then this branch's Unit 4 notes renumbered 11-13 under a new `## Unit 4 evidence notes` heading. The branch's notes 6-8 collided with main's 6-10, so they took the next free numbers; nothing references those note numbers.

No shared registry (glossary.json, specs/decisions/log.md, specs/gaps.md, terminology.csv) was touched by either side, so no append-only merge was needed. No ID collisions. Committed as a merge commit, then rebuilt `static/content-status.json` and ran the content gates.

## Outcome

- ✅ Impact: branch now contains main's Unit 2 work and this branch's Unit 4 work with no conflicting tracker rows or source notes; `npm run check:content` passes all 14 gates.
- 🧪 Tests: `npm run build:content-status` wrote `static/content-status.json`; `npm run check:content` reported "All content gates passed" (validate:content, check:pipeline-gate, check:depth-gate, check:figures, check:svg-style, check:no-em-dash, check:no-answer-keys, check:concept-graph, check:bloom-bands, check:source-floor, check:licence, licence:map:check, check:content-status, check:docs-sync).
- 📁 Files: `specs/content/efmp-409/tasks.md`, `specs/content/efmp-409/sources/texts/hec-2013-foundations.md`, this PHR.
- 🔁 Next prompts: the Unit 4 G3 review job and the Unit 4 Urdu mirror job.
- 🧠 Reflection: a shared bound-source note and a shared tracker both grew on two branches at once; union-resolving with main's entries first and renumbering the branch's colliding list indices kept every entry without losing main's.

## Handoff (for CEO and agents)

- Shipped / changed: merge of `origin/main` into `crew/efmp-409-u04-author`; union-resolved `tasks.md` (Unit 2 + Unit 4 rows, estimates, author notes) and `hec-2013-foundations.md` (Unit 2 notes 6-10, Unit 4 notes 11-13).
- Decisions the team must respect: main's entries were left byte-for-byte intact; the branch's Unit 4 evidence notes were renumbered 6-8 to 11-13 because main's Unit 2 notes already occupy 6-10. Do not renumber main's section.
- Pending / next owner: Unit 4 G3 review (qualified scholar for the Islamic material) and the Unit 4 Urdu mirror; banner `fig-U4-7` remains prompt-only.
- Paperclip issues affected: none recorded (`links.ticket: null`).

## Evaluation notes (flywheel)

- Failure modes observed: two parallel authoring branches appended to the same shared tracker and the same bound-source note, so both the row lists and the numbered evidence notes collided.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS (14/14); `node scripts/check-no-em-dash.mjs` PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): give each unit its own bound-source note file, or put per-unit evidence notes in `sources/unit-NN.md`, so parallel units stop colliding in one shared note.
