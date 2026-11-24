---
id: crew-gent-401-u05-author-conflict1
title: crew fix GENT-401 unit 5
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: gent-401
branch: crew/gent-401-u05-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - glossary.json
 - history/prompts/gent-401/crew-gent-401-u05-author-conflict1.misc.prompt.md
 - specs/content/gent-401/reviews/unit-05/G2/20261124T094530692Z-gates.json
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-05/G2/logs-20261124T094530692Z/validate-content.txt
 - specs/content/gent-401/sources/texts/openstax-entrepreneurship.md
 - specs/content/gent-401/sources/texts/scott-2017-efmd.md
 - specs/content/gent-401/tasks.md
tests:
 - npm run check:content
 - node scripts/prepare-gate-evidence.mjs GENT-401 5
 - origin/main baseline content gates
---

## Prompt

# Crew job gent-401-u05-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u05-author conflicts with main (glossary.json, specs/content/gent-401/sources/texts/openstax-entrepreneurship.md, specs/content/gent-401/sources/texts/scott-2017-efmd.md, specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENT-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-05/`.

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
- (gent-401-u05-author, author, claude_crew) The Urdu mirror and `.ur.svg` files are deliberately absent (separate G4/G5 job; EN index is `translation_status: draft`), and banner `fig-U5-5` is a prompt-only row for the illustrate job.
- (gent-401-u05-author, author, claude_crew) G3 should confirm the three substitute open-access sources (Polish startup financing, MSME break-even, Indonesian crowdfunding) are not read as Pakistani evidence and that Imran's tuition-centre figures are the author's teaching device (`sources/unit-05.md`).

## Response snapshot

Merged origin/main into crew/gent-401-u05-author, resolved all four conflicts by keeping both sides' entries (main first, then this branch's), refreshed the Unit 5 G2 gate evidence at the merge commit, and repointed the tracker row.

## Outcome

- ✅ Impact: The branch now carries main's Units 2 and 3 work alongside Unit 5, with no lost entries in the shared glossary and source registries.
- 🧪 Tests: `npm run check:content` passes 14/14; the eight deterministic draft gates pass; `npm run build:content-status` exits 0.
- 📁 Files: Merge commit `0f7ec5168` (four conflict resolutions) and evidence commit `7b41f3173` (new Unit 5 G2 JSON, its logs directory and the tracker row).
- 🔁 Next prompts: Independent G3 review, Urdu translation (G4/G5), the `fig-U5-5` illustrate job, and `.ur.svg` figure variants remain separate work.
- 🧠 Reflection: The conflict markers in glossary.json hid the shared opening brace and closing brace, so a naive side-by-side splice produced invalid JSON; the seam had to be rebuilt around the common `{` and `}` lines.

## Handoff (for CEO and agents)

- Shipped / changed: Merge of origin/main; glossary.json keeps main's 14 new terms then this branch's 14; openstax-entrepreneurship.md keeps Unit 1, Unit 3 and Unit 5 sections; scott-2017-efmd.md keeps a single source header with Unit 3 and Unit 5 note sections; tasks.md status header and stage rows now cover Units 1-3 and 5; Unit 5 G2 evidence refreshed.
- Decisions the team must respect: No entry from main was changed or dropped; no ID collision occurred (no D-/G- IDs and no glossary-key overlap); scott's duplicate Consulted/Locator header from the branch side was dropped because main's header already carries the same ISBN, publisher and consult date.
- Pending / next owner: G3 review, G4/G5 Urdu work, the illustrate job for `fig-U5-5`, and `.ur.svg` variants are all still open.
- Paperclip issues affected: Crew job gent-401-u05-author-conflict1; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Conflict markers can absorb a common opening or closing line, so a literal both-sides concatenation breaks JSON or duplicates a source header; verify the seam structure before splicing.
- Graders run and results (PASS/FAIL): PASS: `npm run check:content` 14/14; PASS: `node scripts/prepare-gate-evidence.mjs GENT-401 5` (eight draft gates); PASS: glossary.json parses with 587 unique terms and no duplicates; PASS: no conflict markers remain in the resolved files.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): When merging two independently created bound-source files, normalise them to one header plus per-unit sections rather than concatenating two full documents.
