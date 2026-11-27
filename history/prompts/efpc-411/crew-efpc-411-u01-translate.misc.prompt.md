---
id: crew-efpc-411-u01-translate
title: crew translate EFPC-411 unit 1 into Urdu
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efpc-411
branch: crew/efpc-411-u01-translate
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["crew", "claude_crew", "translate"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpc-411/crew-efpc-411-u01-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/unit-assessment.mdx
 - specs/content/efpc-411/reviews/unit-01/G4/translation-handoff.md
 - specs/content/efpc-411/tasks.md
 - static/img/figures/efpc-411/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-1.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-2.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-3.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-4.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-5.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-6.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-6.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-7.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-7.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-8.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-8.ur.svg
tests:
 - npm run build:content-status (before every check:content run)
 - npm run check:content: 14/14 PASS in the draft state
 - Temporary reviewed flip of both index.mdx files: all gates PASS except the two expected G4/G5 pipeline findings; reverted to draft and the derived report regenerated
 - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpc-411/unit-01/*.ur.svg: exit 0 on all eight
 - npm run figures:variants:check: OK
 - npm run check:svg-style: PASS with no new baseline entry
 - Heading-vector, file-set, component, figure-ID and alt/desc parity self-check: PASS
 - Urdu MCQs answered from the Urdu alone and compared with the translated key: 10/10 agree
 - npm run build and scripts/render-inspect.mjs: not run, prohibited by the crew brief
---

## Prompt

# Crew job efpc-411-u01-translate

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFPC-411 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPC-411 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-01/`.

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
- (efpc-411-u01-author-cifix1, fix, claude_crew) Push the branch so PR #882 re-runs CI; the RLS red was shared-DB schema drift (main's 0058), not EFPC-411 content.
- (efpc-411-u01-author-cifix1, fix, claude_crew) Unit 1 English is ready for independent G3; banner figure fig-U1-9 is still prompt-only for the illustration pipeline.
- (efpc-411-u01-author, author, agy) Unit 1 English draft is ready for independent G3 review; banner figure fig-U1-9 is prompt-only for the illustration pipeline.

## Response snapshot

Translated the complete EFPC-411 Unit 1 into a same-named academic-plain Urdu mirror, authored
eight localised Nastaliq schematic SVGs with derived dark twins, recorded the G4 tracker note
and the translator handoff, and left `translation_status: draft` everywhere. All content gates
pass in draft; the reviewed-only flip passes except the two expected G4/G5 findings. No push,
no PR.

## Outcome

- ✅ Impact: Unit 1 now has a complete draft Urdu mirror (index, four topics, the 10/10/5
  assessment with bounded answers) plus eight RTL-mirrored figure pairs, bound to the frozen
  terminology bank where it holds terms and recording the rest as owner proposals.
- 🧪 Tests: `npm run check:content` 14/14 PASS in draft. Reviewed-only flip PASS except the two
  expected pipeline findings, then reverted. `measure-figure-text.mjs` exit 0 on all eight
  `.ur.svg`. `figures:variants:check` clean. `check:svg-style` clean with no new baseline entry.
  Parity self-check PASS (file set, heading vectors, imports, components, figure IDs, item
  counts, alt/desc pairs). Urdu MCQ self-solve 10/10 against the translated key.
- 📁 Files: six Urdu MDX pages, eight `.ur.svg` plus eight `.ur.dark.svg`, the G4 tracker note
  and `specs/content/efpc-411/reviews/unit-01/G4/translation-handoff.md`.
- 🔁 Next prompts: independent G5 Urdu review in a fresh session; rendered narrow-width and A4
  inspection; any English G3 repair followed by matching Urdu repairs.
- 🧠 Reflection: The unit's own key terms (classroom observation, checklist, rating scale,
  anecdotal record, observer bias, constructive feedback) are absent from `terminology.csv`, so
  `key_terms` carries the 28 banked terms the unit actually uses and the rest are listed as
  proposals rather than silently banked. Nastaliq set wider than the Latin it replaced but the
  mirrored table columns still measured clean. The Chromium geometry check ran; rendered
  Nastaliq, bidi punctuation and A4 clipping remain unverified under the brief's browser ban.

## Handoff (for CEO and agents)

- Shipped / changed: complete draft Urdu mirror for EFPC-411 Unit 1 and eight localised
  schematic SVG pairs; the Unit 1 `G4 ur-translation` tracker row now points at the translator
  handoff and stays `▢`; `translation_status` is still `draft` on every page.
- Decisions the team must respect: the frozen terminology bank was not edited. No G3/G5
  certification, reviewer identity or publication authority was fabricated. No em dash anywhere;
  heavy jobs went through `scripts/heavy.sh`; no build, dev server or Playwright run.
- Pending / next owner: G5 belongs to a fresh independent session and must inspect actual
  rendered Urdu at narrow width and in A4 print. English G3 is still `▢` (not accepted), so any
  English repair invalidates this translation's baseline (`ff6248a9`). The banner `fig-U1-9`
  stays `prompt-only` for the illustration job.
- Paperclip issues affected: crew job efpc-411-u01-translate; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: generated Urdu prose drifted into Cyrillic and CJK look-alikes for
  "mechanism" twice and once for a quoted string, caught by a script scanning for non-Arabic,
  non-Latin code points before commit. The first mirror run is not an involution, so
  `mirror-figure-rtl.mjs --check` reports "would change" on an already-mirrored file; that is
  expected and is not a signal to mirror again.
- Graders run and results (PASS/FAIL): check:content 14/14 PASS on the draft tree;
  reviewed-only flip PASS except the two expected pipeline findings; measure-figure-text exit 0
  on eight files; figures:variants:check PASS; check:svg-style PASS. Build, dev server and
  render-inspect intentionally not run under the brief.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): run `scripts/render-inspect.mjs EFPC-411 1 --locale ur`
  in an authorised session to confirm Nastaliq shaping, bidi punctuation and A4 clipping, and to
  check the RTL table column order by eye.
