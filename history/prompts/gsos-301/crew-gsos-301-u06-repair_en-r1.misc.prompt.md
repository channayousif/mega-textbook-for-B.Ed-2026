---
id: crew-gsos-301-u06-repair_en-r1
title: crew repair_en GSOS-301 unit 6 (r1)
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u06-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gsos-301/tasks.md
tests:
  - npm run check:content
---

## Prompt

# Crew job gsos-301-u06-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u06-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gsos-301/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-06/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/gsos-301/reviews/unit-06/G3/20261108T203238Z-g3-desk-c052da40.json` (disposition: revise). Resolve each one:
- [advisory] In docs/semester-2/gsos-301/unit-06/topic-02.mdx line 58, the factual claim that television and social media reach the majority of the population in Pakistan is cited as (Hammond & Cheney, n.d.). Hammond & Cheney is a US college introductory sociology text on LibreTexts and does not contain empirical findings on Pakistani media demographics. The citation should be replaced with a Pakistani empirical source (e.g. PEMRA, PBS, Gallup Pakistan) or stated as a general observation without attributing Pakistani demographics to an American textbook.
- [advisory] In docs/semester-2/gsos-301/unit-06/topic-01.mdx line 60, "a factory in Sialkit supplies garments to a store in Berlin" contains a typographical error in the Pakistani city name ("Sialkit" instead of "Sialkot").
- [advisory] In specs/content/gsos-301/coverage/unit-06.md line 26, Sub-topic U6-07 (Media and society) is mapped to RRQ items 7 and 8, but RRQ item 7 tests environmental issues (U6-09). U6-07 should map to RRQ item 8 only. In line 21, U6-02 (Modernization and globalization) maps to ERQ item 3 but omits ERQ item 2, which directly assesses globalization.
- [advisory] In specs/content/gsos-301/concepts/unit-06.md line 14, CON:GSOS-301-6-10 (Media and society) is mapped to MCQ-06 and RRQ-07 (an environmental item) instead of RRQ-08 (digital divide in media). In line 10, the Urdu label for CON:GSOS-301-6-6 contains a typographical error (ڈیجیتقل تقسیم instead of ڈیجیٹل تقسیم).
- [advisory] specs/content/gsos-301/sources/unit-06.md lists conerly2021 and hammondnd under ## Unverifiable sources, but omits retrieval attempt dates and explicit reference to Constitution Art. VII / decision D-2026-0001 for complete governance traceability.
- [uncertain] Visual browser and print inspection (360px viewport, keyboard table scrolling, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running npm run build, a dev server, or Playwright (render-review command unperformed, exit code 1). Structural accessibility checks (alt text, heading hierarchy, link text, SVG role/title/desc, figure text measurement) pass from source, but visual accessibility remains unverified until a permitted browser/print inspection can be run on a live build.

## Notes from earlier jobs on this unit
- (gsos-301-u06-repair_en-conflict3, fix, opencode) G3 for Unit 6 stays unticked/advisory; G4 remains blocked until a fresh independent G3 confirms the repairs.
- (gsos-301-u06-repair_en-conflict3, fix, opencode) Browser/print render inspection is still unperformed under the brief's no-build/no-server/no-Playwright rule.
- (gsos-301-u06-repair_en-conflict1, fix, opencode) G3 remains unticked; permitted browser/print inspection and fresh independent review are pending.
- (gsos-301-u06-repair_en-conflict1, fix, opencode) G4 stays blocked until a fresh independent G3 review confirms the Unit 6 repairs.
- (gsos-301-u06-repair_en, repair_en, codex) G3 remains unticked; permitted browser/print inspection and fresh independent review are pending.

## Response snapshot

Verified every Nov 8 G3 finding against the current bytes and found them already repaired on main by commit 8a99e8e4e (the Nov 5 repair of the identical Nov 2 report). Appended the required advisory Unit 6 G3 tracker row naming the Nov 8 report. No content edits were needed; no Urdu or licence mirror exists. All 14 content gates passed. Committed locally without pushing or opening a PR.

## Outcome

- Impact: documented the Nov 8 G3 report's resolution in the Unit 6 tracker.
- Tests: npm run build:content-status then npm run check:content (all 14 gates passed).
- Files: specs/content/gsos-301/tasks.md.
- Next prompts: fresh independent G3 review on a permitted rendering host, then G4 translation.
- Reflection: the Nov 8 report duplicated the Nov 2 findings after the repairs landed; the worker verified current bytes rather than re-editing.

## Handoff (for CEO and agents)

- Shipped / changed: appended the Unit 6 G3 advisory repairs-applied row for the Nov 8 report.
- Decisions the team must respect: no self-certification, no browser/build runs, no publication change.
- Pending / next owner: rendering host owns browser/print inspection; independent reviewer owns G3; translator owns the missing Urdu mirror.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: a re-review can re-report already-repaired findings when its snapshot predates the repair; verify current bytes before editing.
- Graders run and results (PASS/FAIL): npm run check:content PASS (14/14).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
