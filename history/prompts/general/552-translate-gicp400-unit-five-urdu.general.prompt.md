---
id: 552
title: Translate GICP-400 Unit 5 into Urdu
stage: general
date: 2026-11-07
surface: agent
model: opencode (LongCat-2.0)
feature: gicp-400-unit-05
branch: crew/gicp-400-u05-translate
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["opencode", "crew", "gicp-400"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/unit-assessment.mdx
  - static/img/figures/gicp-400/unit-05/fig-U5-1.ur.svg
  - static/img/figures/gicp-400/unit-05/fig-U5-1.ur.dark.svg
  - static/img/figures/gicp-400/unit-05/fig-U5-2.ur.svg
  - static/img/figures/gicp-400/unit-05/fig-U5-2.ur.dark.svg
  - static/img/figures/gicp-400/unit-05/fig-U5-3.ur.svg
  - static/img/figures/gicp-400/unit-05/fig-U5-3.ur.dark.svg
  - static/img/figures/gicp-400/unit-05/fig-U5-4.ur.svg
  - static/img/figures/gicp-400/unit-05/fig-U5-4.ur.dark.svg
  - static/img/figures/gicp-400/unit-05/fig-U5-5.ur.svg
  - static/img/figures/gicp-400/unit-05/fig-U5-5.ur.dark.svg
  - static/img/figures/gicp-400/unit-05/fig-U5-6.ur.svg
  - static/img/figures/gicp-400/unit-05/fig-U5-6.ur.dark.svg
  - specs/content/gicp-400/tasks.md
  - specs/content/gicp-400/reviews/unit-05/G4/translation-handoff.md
  - history/prompts/general/552-translate-gicp400-unit-five-urdu.general.prompt.md
tests:
  - npm run check:content: all 14 gates PASS in the draft state
  - Temporary reviewed flip of both index files: all gates PASS except the two expected G4/G5 pipeline findings; reverted to draft and the derived report regenerated
  - npm run figures:variants:check: PASS
  - Pillow + Raqm non-browser geometry approximation of scripts/measure-figure-text.mjs: PASS on all six .ur.svg
  - Supplemental parity self-check (file set, invariant metadata, heading vectors, imports, components, Glossary keys, figure IDs, numbered items, alt/desc pairs): PASS
  - node scripts/measure-figure-text.mjs, npm run build and render-inspect.mjs: not run, prohibited by the crew brief
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The delegated brief read for this task:

# Crew job gicp-400-u05-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u05-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-05/`.

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
- (gicp-400-u05-review_en-conflict1, fix, opencode) `static/content-status.json` is gitignored and must be regenerated before `check:content` in a fresh worktree.
- (gicp-400-u05-review_en-conflict1, fix, opencode) G3 stays `▢` advisory; Figure 5.6 alt-text repair, source/provenance checks, rendered review and a fresh blind assessment solve remain open.
- (gicp-400-u05-review_en, review_en, codex) Author should correct Figure 5.6's resource-condition alt text.
- (gicp-400-u05-review_en, review_en, codex) G3 remains escalated pending source/provenance checks, rendered review and a fresh blind assessment solve.
- (gicp-400-u05-review_en, review_en, codex) Author should correct Figure 5.6's resource-condition alt text.

## Response snapshot

Translated the complete GICP-400 Unit 5 into a same-named Urdu mirror, authored six localised schematic SVGs with dark twins, updated the open G4 tracker note, and wrote the translator handoff. All content gates pass in draft; the reviewed-only test passes except the two expected G4/G5 pipeline findings. No push or PR.

## Outcome

- ✅ Impact: Unit 5 now has a complete academic-plain Urdu mirror (index, three topics, assessment with the 10/10/5 bank and bounded answers) plus six RTL-mirrored Nastaliq figure variants, bound to the frozen terminology bank where it holds terms.
- 🧪 Tests: `npm run check:content` passes all 14 gates in draft. The temporary reviewed flip passes every gate except the two expected pipeline findings (G4/G5 rows not done), then both indexes were reverted to draft and `static/content-status.json` regenerated. `figures:variants:check` passes. A Pillow + Raqm non-browser approximation of `measure-figure-text.mjs` reports no viewBox, wordmark, label-overlap or panel-spill problem on the six `.ur.svg`. Supplemental parity self-check passes.
- 📁 Files: Five Urdu MDX pages, six `.ur.svg` plus six derived `.ur.dark.svg`, the G4 tracker note and the translator handoff.
- 🔁 Next prompts: Independent G5 Urdu review; browser/print render inspection; any English G3 repair followed by matching Urdu repair.
- 🧠 Reflection: The unit's key concepts are absent from `terminology.csv`, so `key_terms` is an empty block and the concepts are recorded as owner proposals rather than silently banked. Nastaliq is wider than the Latin it replaced; one row label needed an inline 12px to stay inside its column. The Chromium geometry check remains the authority and was not run under the brief's browser prohibition.

## Handoff (for CEO and agents)

- Shipped / changed: Complete draft Urdu mirror for GICP-400 Unit 5 and six localised schematic SVG pairs; G4 tracker note updated with the handoff path, status still `▢`; `translation_status` still `draft` on every page.
- Decisions the team must respect: The frozen terminology bank was not edited. `key_terms` is empty because no unit key concept is banked; all unbanked constitutional terms are listed as owner proposals in the handoff. No G3/G5 certification, reviewer identity or publication authority was fabricated. No em dash anywhere; heavy jobs stayed under `scripts/heavy.sh`; no build, dev server or Playwright run.
- Pending / next owner: G5 belongs to a fresh independent session and must inspect actual rendered Urdu at narrow width and in A4 print. The Chromium `measure-figure-text.mjs` and `render-inspect.mjs --locale ur` remain unrun and are the next authorised geometry/render check. English G3 remains escalated (source/provenance and Figure 5.6 alt-text repair); any English repair requires matching Urdu repairs.
- Paperclip issues affected: Crew job gicp-400-u05-translate; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Nastaliq sets wider and taller than the Latin source, so column and panel fit must be re-checked per label; one table row label overflowed its column and needed an inline 12px. `key_terms` cannot silently carry unbanked concepts without failing the pipeline gate.
- Graders run and results (PASS/FAIL): All 14 content gates PASS on the draft tree. Reviewed-only flip PASS except the two expected pipeline findings. `figures:variants:check` PASS. Pillow/Raqm geometry approximation PASS on all six `.ur.svg`. Parity self-check PASS. Browser geometry, build, dev server and Playwright intentionally not run under the brief.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the Chromium `measure-figure-text.mjs` and `render-inspect.mjs --locale ur` in an authorised session to confirm the non-browser geometry approximation and inspect Nastaliq shaping, bidi punctuation and A4 clipping.
