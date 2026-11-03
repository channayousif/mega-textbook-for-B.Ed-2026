---
id: 20261110
title: Author GISS-401 Unit Two English
stage: general
date: 2026-11-03
surface: agent
model: Codex (GPT-6)
feature: content-pipeline
branch: crew/giss-401-u02-author
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "giss-401", "unit-02", "authoring"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: history/adr/0030-crew-replaces-paperclip-control-plane.md
  pr: null
files:
  - docs/semester-3/giss-401/unit-02/index.mdx
  - docs/semester-3/giss-401/unit-02/topic-01.mdx
  - docs/semester-3/giss-401/unit-02/topic-02.mdx
  - docs/semester-3/giss-401/unit-02/topic-03.mdx
  - docs/semester-3/giss-401/unit-02/unit-assessment.mdx
  - specs/content/giss-401/authoring/unit-02-checks/baseline-content.txt
  - specs/content/giss-401/authoring/unit-02-checks/draft-content.txt
  - specs/content/giss-401/authoring/unit-02-checks/mdx-syntax.txt
  - specs/content/giss-401/authoring/unit-02.md
  - specs/content/giss-401/concepts/unit-02.md
  - specs/content/giss-401/coverage/unit-02.md
  - specs/content/giss-401/figures/unit-02.md
  - specs/content/giss-401/sources/texts/motala-2023-sahih.md
  - specs/content/giss-401/sources/texts/mudawam-2021-usul.md
  - specs/content/giss-401/sources/texts/mufti-2019-hasan.md
  - specs/content/giss-401/sources/texts/quran-translation.md
  - specs/content/giss-401/sources/texts/sahih-bukhari-muslim.md
  - specs/content/giss-401/sources/texts/von-denffer-ulum.md
  - specs/content/giss-401/sources/unit-02.md
  - specs/content/giss-401/tasks.md
tests:
  - "Baseline npm run check:content: 13/13 PASS"
  - "Draft npm run check:content: 10/13 PASS; figures, G2 pipeline and derived status remain blocked"
  - "Direct MDX compile: all five pages PASS"
  - "git diff --check: PASS"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Delegated task, verbatim from .crew/brief.md:

# Crew job giss-401-u02-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GISS-401 Unit 2 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Authored five English pages, the 10/10/5 assessment bank, coverage/source/figure/concept records, six bound source excerpts and backward-design evidence. Completion remains blocked by a conflict between the prompt-only authoring boundary and the rendered figure gate, the brief prohibition on Playwright used by required SVG measurement, and the out-of-scope derived status report. No G3/G5 certification or publication claimed.

## Outcome

- ✅ Impact: Substantive English Unit 2 draft ready for independent review and the designated figure pass; whole-task completion is not claimed.
- 🧪 Tests: Baseline 13/13 gates; final draft 10/13 gates; five MDX syntax checks pass. Actual scoped logs retained with em dash output punctuation normalized.
- 📁 Files: Five MDX pages, four governance artifacts, six source texts, one tracker, author planning/check records and this PHR.
- 🔁 Next prompts: Crew lead to resolve figure-stage/Playwright boundary and approve derived status refresh; then generate figures, record clean G2 evidence, translate and obtain independent review.
- 🧠 Reflection: The current gate implementation requires rendered output and bound excerpts while the author skill describes a prompt-only stopping point. Preserve truthful open stage states instead of manufacturing evidence.

## Handoff (for CEO and agents)

- Shipped / changed: Original English content for all nine guide leaves; 60 reading-minutes; references checked; assessment counts and Bloom bands valid; six figure prompts remain prompt-only.
- Decisions the team must respect: Respect approved content-spec and D-2026-0079; ADR-0030 resolves Codex SVG ownership but does not remove the brief scope and runtime constraints. No changes to catalog, approved spec, gate code, standard or Urdu mirror.
- Pending / next owner: Crew lead/owner: resolve scope conflicts; figure producer: render/measure six assets; author/integrator: refresh status and prepare G2 after passing gates; independent scholar/reviewer: G3; translator and reviewer: G4/G5. Global glossary integration also remains outside scope.
- Paperclip issues affected: No ticket supplied. G-2026-196 remains the catalog integration issue. No external issue or crew state was changed.

## Evaluation notes (flywheel)

- Failure modes observed: Missing bound source excerpts fixed; sixth marker omission fixed. Rendered-figure requirement conflicts with skill stopping point; derived status outside scope; no new gate failures concealed as baseline.
- Graders run and results (PASS/FAIL): PASS: schema, depth, punctuation, answer bounds, concept graph, Bloom bands, source floor, licence, licence mapping, docs sync, MDX syntax. FAIL: figures, pipeline G2, content status. Baseline all passed.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Resolve the explicit stage/runtime and status scope conflicts, then run the unchanged gates against the completed figure pass.
