---
id: crew-guhq-301-u01-translate
title: crew translate GUHQ-301 unit 1
stage: misc
date: 2026-11-22
surface: agent
model: opencode
feature: guhq-301
branch: crew/guhq-301-u01-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-01/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-01/unit-assessment.mdx
  - specs/content/guhq-301/tasks.md
  - specs/content/guhq-301/translations/unit-01/check-content-parity.txt
  - specs/content/guhq-301/translations/unit-01/handoff.md
  - specs/content/guhq-301/reviews/unit-01/G2/20261121T213727607Z-gates.json
  - specs/content/guhq-301/reviews/unit-01/G2/logs-20261121T213727607Z/check-bloom-bands.txt
  - specs/content/guhq-301/reviews/unit-01/G2/logs-20261121T213727607Z/check-concept-graph.txt
  - specs/content/guhq-301/reviews/unit-01/G2/logs-20261121T213727607Z/check-depth-gate.txt
  - specs/content/guhq-301/reviews/unit-01/G2/logs-20261121T213727607Z/check-docs-sync.txt
  - specs/content/guhq-301/reviews/unit-01/G2/logs-20261121T213727607Z/check-figures.txt
  - specs/content/guhq-301/reviews/unit-01/G2/logs-20261121T213727607Z/check-no-answer-keys.txt
  - specs/content/guhq-301/reviews/unit-01/G2/logs-20261121T213727607Z/check-no-em-dash.txt
  - specs/content/guhq-301/reviews/unit-01/G2/logs-20261121T213727607Z/validate-content.txt
  - static/img/figures/guhq-301/unit-01/fig-U1-1.ur.dark.svg
  - static/img/figures/guhq-301/unit-01/fig-U1-1.ur.svg
  - static/img/figures/guhq-301/unit-01/fig-U1-2.ur.dark.svg
  - static/img/figures/guhq-301/unit-01/fig-U1-2.ur.svg
  - static/img/figures/guhq-301/unit-01/fig-U1-3.ur.dark.svg
  - static/img/figures/guhq-301/unit-01/fig-U1-3.ur.svg
  - static/img/figures/guhq-301/unit-01/fig-U1-4.ur.dark.svg
  - static/img/figures/guhq-301/unit-01/fig-U1-4.ur.svg
tests:
  - npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/guhq-301/unit-01/fig-U1-*.ur.svg
  - npm run figures:variants:check
---

## Prompt

# Crew job guhq-301-u01-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GUHQ-301 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-01/`.

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
- (guhq-301-u01-author, author, claude) The claim that everyday Urdu pronounces groups of Arabic letters alike (Topic 1.2 table) has no open-access source; the sources file flags it, along with the general-knowledge material (characteristics of Quranic Arabic, pattern names), for the G3 reviewer, who must also make the religious-content check in content-spec drafting note 7.
- (guhq-301-u01-author, author, claude) The Urdu job needs `.ur.svg` versions of all four figures (two contain Arabic words) and must have the seven authored Urdu concept labels reviewed at G5; banner fig-U1-5 is still prompt-only for the illustrate job.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GUHQ-301 Unit 1 (docs/semester-3/guhq-301/unit-01): G2 en-draft: stale or incomplete input manifest

## Response snapshot

Continued the existing branch instead of restarting. The Urdu mirror (index, topic-01, topic-02, unit-assessment) and the four `.ur.svg` figures were already present from English 856b9437e; verified their structure, parity and figure geometry, then fixed the one new finding by refreshing the G2 gate evidence, which the translation's own `specs/content/guhq-301/translations/unit-01/` files had invalidated.

## Outcome

- Impact: translate G4 for GUHQ-301 Unit 1 by opencode (attempt 2, continuing attempt 1).
- Tests: npm run check:content passed (14/14) on the committed tree; with both index files temporarily at reviewed, validate:content parity and check:figures Urdu parity pass and only the expected G4/G5 tracker findings remain; measure-figure-text exits 0 on all four `.ur.svg`; figures:variants:check OK.
- Files: 24 file(s), listed above.
- Next prompts: crew lead after merge; G5 review is a separate fresh session.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: complete draft Urdu mirror of GUHQ-301 Unit 1 (index, topic-01, topic-02, 10/10/5 unit-assessment), four RTL-mirrored `.ur.svg` figures with derived dark twins, a bank-bound `key_terms` block, and refreshed G2 gate evidence with the tracker row repointed. `translation_status` stays `draft`; the G4 row keeps status ▢ with a factual note.
- Decisions the team must respect: the G2 manifest binds `specs/content/guhq-301/translations/unit-01/` by unit name, so any later edit under that folder re-opens G2 and needs `node scripts/prepare-gate-evidence.mjs --refresh-stale`. The Urdu verses are an Urdu rendering of the Saheeh International English meaning, not a published Urdu Qur'an translation.
- Pending / next owner: independent G5 review in a fresh session (religious-content check plus the verse meanings and the seven authored concept labels); the banner fig-U1-5 remains prompt-only for the illustrate job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: adding per-unit files under a course folder invalidates the stored G2 input manifest, because `inScope` binds any path named `unit-NN`.
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
