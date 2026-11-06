---
id: 2457
title: Translate GISS-401 Unit 7 into Urdu at G4
stage: misc
date: 2026-11-06
surface: agent
model: claude-opus-5-5
feature: giss-401
branch: crew/giss-401-u07-translate
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["claude", "crew", "giss-401", "translate", "G4"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/giss-401/2457-translate-giss401-unit-seven-urdu.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-07/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-07/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-07/unit-assessment.mdx
  - specs/content/giss-401/reviews/unit-07/G4/conditional-parity-gates.txt
  - specs/content/giss-401/reviews/unit-07/G4/content-gates.txt
  - specs/content/giss-401/reviews/unit-07/G4/translation-handoff.md
  - static/img/figures/giss-401/unit-07/fig-U7-1.ur.svg
  - static/img/figures/giss-401/unit-07/fig-U7-1.ur.dark.svg
  - static/img/figures/giss-401/unit-07/fig-U7-2.ur.svg
  - static/img/figures/giss-401/unit-07/fig-U7-2.ur.dark.svg
  - static/img/figures/giss-401/unit-07/fig-U7-3.ur.svg
  - static/img/figures/giss-401/unit-07/fig-U7-3.ur.dark.svg
tests:
  - "npm run check:content, draft: 14 of 14 pass"
  - "npm run check:content, temporary reviewed flip: only the expected G4 and G5 rows and the flip-caused content-status finding"
  - "figures:variants:check passes; scripted source parity and MDX compilation pass"
  - "npm run build, measure-figure-text and render-inspect: not run, barred by the crew brief"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

### Delegated brief (verbatim)

# Crew job giss-401-u07-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u07-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GISS-401 Unit 7 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-07/`.

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
- (giss-401-u07-review_en, review_en, codex) G3 remains pending: repair assessment and privacy findings; obtain scholar review, provenance and browser/print evidence.
- (giss-401-u07-review_en, review_en, codex) G3 remains pending: repair assessment and privacy findings; obtain scholar review, provenance and browser/print evidence.
- (giss-401-u07-author-conflict5, fix, opencode) `measure-figure-text` was never run on fig-U7-1..3 (Chromium barred); CI `figure-geometry` is the first measured check.
- (giss-401-u07-author-conflict5, fix, opencode) Urdu `.ur.svg` mirrors and the G3 Islamic Studies scholar review remain open; reading time sits at the top of the 25-40 band (40 min, 41 if rounded up).
- (giss-401-u07-author-conflict5, fix, opencode) No ID reassignment was needed (D-2026-0001 is pre-existing and identical on both sides; no branch-added G-YYYY-NN or glossary key collided).

## Response snapshot

Translated GISS-401 Unit 7 from English baseline c01a4ed7b into its complete Urdu mirror: index, Topic 7.1 and the full 10/10/5 assessment with its bounded answers section. Localised and mirrored fig-U7-1 to fig-U7-3 with derived dark twins, and wrote the G4 handoff and gate evidence. translation_status stays draft and the tracker is untouched.

## Outcome

- ✅ Impact: The unit now has a complete Urdu draft ready for the permitted validation session and an independent G5 review.
- 🧪 Tests: check:content passes 14 of 14 in draft. The conditional flip shows only the expected findings. Source parity, MDX compilation and figures:variants:check pass. Build, browser measurement and rendered inspection were not run.
- 📁 Files: Three Urdu pages, six figure files, three G4 evidence files and this PHR.
- 🔁 Next prompts: Run build, measure-figure-text and render-inspect in a permitted session; repair the English G3 findings; then run a fresh G5 review.
- 🧠 Reflection: A Sharp preview found a trailing Urdu comma stranded by SVG's left-to-right base direction, which no gate reports.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu index, one topic and the full assessment for English baseline c01a4ed7b872eac784bf0385ce0f51901aa2f51a; three localised figures plus derived dark twins; G4 handoff at specs/content/giss-401/reviews/unit-07/G4/translation-handoff.md.
- Decisions the team must respect: translate-unit Step 7 forbids appending a G4 tracker row, so the brief's instruction to record it as the skill says is met by the handoff, and the G4 and G5 rows stay open. translation_status stays draft. No review, publication, banking or certification is claimed. No English content, bank or governing document changed. The Urdu Qur'an and hadith quotations are this translator's renderings of the English quotations and no scholar has checked them.
- Pending / next owner: A qualified Islamic Studies reviewer owns G3 and the check of the quotations. An English revision job owns the G3 repairs (ERQ 2 rubric, MCQ 10 tag, private family detail in the roster table and fig-U7-2), and each repair needs a matching Urdu edit. A fresh G5 reviewer owns semantic and assessment equivalence. A permitted validation session owns npm run build, measure-figure-text and render-inspect. The curriculum owner owns the proposed terms and the difference from Unit 1 in how the Saheeh International source is stated.
- Issues affected: No issue identifier supplied; crew job giss-401-u07-translate.

## Evaluation notes (flywheel)

- Failure modes observed: A stranded Urdu comma in fig-U7-1 and tight line spacing, both found in Sharp previews and fixed. A handoff draft misattributed the G3 privacy finding to ERQ 2; corrected after reading the report.
- Graders run and results (PASS/FAIL): check:content PASS 14/14 in draft; conditional run FAIL only for the expected findings; figures:variants:check PASS; source parity and MDX compilation PASS. Browser checks NOT RUN per brief.
- Prompt variant (if applicable): crew brief, translate-unit workflow.
- Next experiment (smallest change to try): Stop the mirror tool adding anchors to tspans whose parent text is middle-anchored.
