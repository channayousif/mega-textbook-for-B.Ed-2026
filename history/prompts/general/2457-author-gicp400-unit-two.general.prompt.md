---
id: 2457
title: Author GICP400 Unit Two
stage: general
date: 2026-11-06
surface: agent
model: GPT-6 (Codex)
feature: none
branch: crew/gicp-400-u02-author
user: crew owner
command: Read .crew/brief.md and carry it out
labels: ["codex", "gicp-400", "unit-02", "crew"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/gicp-400/unit-02/index.mdx
  - docs/semester-3/gicp-400/unit-02/topic-01.mdx
  - docs/semester-3/gicp-400/unit-02/topic-02.mdx
  - docs/semester-3/gicp-400/unit-02/unit-assessment.mdx
  - specs/content/gicp-400/concepts/unit-02.md
  - specs/content/gicp-400/coverage/unit-02.md
  - specs/content/gicp-400/figures/unit-02.banner.md
  - specs/content/gicp-400/figures/unit-02.md
  - specs/content/gicp-400/reviews/unit-02/authoring-handoff.md
  - specs/content/gicp-400/sources/texts/akhter-2023-iqbal.md
  - specs/content/gicp-400/sources/texts/amu-english-history.md
  - specs/content/gicp-400/sources/texts/assembly-history.md
  - specs/content/gicp-400/sources/texts/hassan-2020-two-nation.md
  - specs/content/gicp-400/sources/texts/hayat-2022-jinnah.md
  - specs/content/gicp-400/sources/texts/independence-act-1947.md
  - specs/content/gicp-400/sources/texts/iqbal-1930-allahabad.md
  - specs/content/gicp-400/sources/texts/iqbal-reconstruction.md
  - specs/content/gicp-400/sources/texts/javid-iqbal-2012-lahore.md
  - specs/content/gicp-400/sources/texts/jinnah-1947-assembly.md
  - specs/content/gicp-400/sources/texts/kamran-2009-franchise.md
  - specs/content/gicp-400/sources/texts/khan-khan-2020-aligarh.md
  - specs/content/gicp-400/sources/texts/national-archives-independence.md
  - specs/content/gicp-400/sources/unit-02.md
  - specs/content/gicp-400/tasks.md
  - static/img/figures/gicp-400/unit-02/fig-U2-1.dark.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-1.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-2.dark.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-2.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-3.dark.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-3.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-4.dark.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-4.svg
  - history/prompts/general/2457-author-gicp400-unit-two.general.prompt.md
tests:
  - "Baseline npm run check:content: 14/14 PASS at HEAD equal to origin/main"
  - "Final draft npm run check:content: 13/14 PASS; pipeline gate blocked by missing course overview needed for G2 evidence"
  - "Four MDX files: @mdx-js/mdx compilation PASS"
  - "Four SVG source and dark-variant consistency checks PASS"
  - "Bounded-memory ImageMagick visual inspection; mandatory Playwright geometry script not run under crew prohibition"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The requested brief, read verbatim:

# Crew job gicp-400-u02-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GICP-400 Unit 2 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-02/`.

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

Authored the English Unit 2 index, two topic cycles and assessment bank, with coverage, sources, concept graph and four placed schematics. G3/G5 remain open. The only content-gate blocker is G2: its required course overview is absent and outside the brief. A minimal proposed overview is prepared in .crew/ for a scope decision. The brief also forbids Playwright, so the required SVG geometry script remains unrun. No push or PR.

## Outcome

- ✅ Impact: Complete scoped English draft and reviewable source/figure artefacts prepared; no false completion or certification claim.
- 🧪 Tests: Baseline 14/14; authored tree 13/14 content gates. MDX compilation and figure/style/freshness checks pass. G2 evidence tool explicitly refuses the missing course overview.
- 📁 Files: 32 scoped authored files plus this PHR; ignored scratch and proposed overview stay under .crew/.
- 🔁 Next prompts: Owner scope decision for required course overview and permission decision for the Playwright-based geometry check; independent G3, Urdu translation, G5 and banner production later.
- 🧠 Reflection: Current gates require rendered figures and bound source notes although the authoring skill still describes prompt-only output. The required G2 overview dependency should be checked before assigning isolated units of a new course.

## Handoff (for CEO and agents)

- Shipped / changed: Two nine-part English topic cycles, orientation, 10/10/5 assessment, four English SVGs with dark twins, source verification notes, coverage and concepts, tracker and author handoff.
- Decisions the team must respect: Approved content-spec, catalog, gate scripts, constitution and ADRs untouched. English translation_status remains draft; no G3/G5 approval. Respect strict Unit 2 scope and no-Playwright brief until owner changes it.
- Pending / next owner: Owner must settle missing course-overview dependency outside scope; browser geometry check awaits the explicit exception requested. G2 stays in progress. G3/G4/G5 and banner belong to downstream jobs.
- Paperclip issues affected: No ticket supplied (null).

## Evaluation notes (flywheel)

- Failure modes observed: Missing course overview prevents G2 evidence. Skill references lag live figure/source gates. Initial source-floor row omitted registry/date evidence; repaired with actual Crossref/OpenAlex lookups. Date and access limitations are explicitly documented.
- Graders run and results (PASS/FAIL): Content baseline PASS; final content suite FAIL only on G2 pipeline status; scoped depth, figures, style, source floor, concept graph, Bloom and MDX checks PASS. Browser geometry NOT RUN by brief.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Confirm the minimal course overview scope exception, commit that dependency, then generate real G2 evidence and rerun the full content suite.
