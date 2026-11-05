---
id: 20261126
title: Repair GQUR Unit Four Findings
stage: general
date: 2026-11-05
surface: agent
model: GPT-6 (Codex; exact deployed version unavailable)
feature: none
branch: crew/gqur-300-u04-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "gqur-300", "repair_en"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/gqur-300/unit-04/topic-01.mdx
  - docs/semester-1/gqur-300/unit-04/topic-02.mdx
  - docs/semester-1/gqur-300/unit-04/topic-03.mdx
  - docs/semester-1/gqur-300/unit-04/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-04/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-04/unit-assessment.mdx
  - specs/content/gqur-300/concepts/unit-04.md
  - specs/content/gqur-300/sources/unit-04.md
  - specs/content/gqur-300/tasks.md
  - static/img/figures/gqur-300/unit-04/fig-U4-6.dark.svg
  - static/img/figures/gqur-300/unit-04/fig-U4-6.svg
  - static/img/figures/gqur-300/unit-04/fig-U4-6.ur.dark.svg
  - static/img/figures/gqur-300/unit-04/fig-U4-6.ur.svg
  - specs/content/gqur-300/reviews/unit-04/G3/repair-20261105.md
tests:
  - SVG text measurement: PASS for four changed variants
  - check:content: PASS all 14 gates after G2 evidence and ignored local report refresh
  - npm test via scripts/heavy.sh: PASS, 31 files and 368 tests
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Task brief read verbatim:

# Crew job gqur-300-u04-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u04-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-300/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-04/`.

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
From `specs/content/gqur-300/reviews/unit-04/G3/20261102T212207Z-g3-desk-186abd28.json` (disposition: revise). Resolve each one:
- [blocking] C2-01: unit-assessment.mdx ERQ-04 and ERQ rubric 4 do not fix the store placement or define which boundary receives skirting. A 5 m wide, 4 m deep edge notch gives 108 m; a corner notch gives 100 m; both leave 580 m2. Default 100 m plus vaguely allowing a few metres does not provide a determinate marking rule. Supply a labelled plan and assess specified placements, or explicitly reward conditional solutions and explain that translation along the same edge does not change boundary length.
- [blocking] C2-03: topic-01 Summative task and mini-rubric, repeated as ERQ-01, label routine rice conversion/sack rounding and an estimate Analyze. The prescribed arithmetic plus noting 9 kg is below 25 kg is Apply; topic-01 has no clearly Analyze-or-higher summative criterion. Add an actual comparison of alternatives, diagnosis of a flawed order or justified assumptions, with scoring that requires analysis.
- [advisory] P04 Length, Mass and Capacity remain unglossed declared key terms; no glossary.json entries found.
- [advisory] P05 Topic4.3 still primarily has one MCQ. Approved content-spec permits integrated exception, so not blocking. unit-assessment frontmatter nevertheless claims at least two per topic.
- [advisory] P06 Explicit shapes-properties bank item remains RRQ-08 only; consider an additional classification item.
- [advisory] P07 MCQ-06 and RRQ-06 remain absent from concepts/unit-04.md item mappings.
- [advisory] P08 former render-tool limitation superseded by C2-04; no current render acceptance inferred from old report.
- [advisory] Additional assessment/scaffolding concerns: RRQ-02 should allow other defensible units; RRQ-07 cannot identify a unique most-likely error from4800 alone. ERQ-03 four-shelf bookcase assumption is introduced in rubric only. Topic-02 cylindrical volume formula is assessed without preceding derivation. See assessment-recomputation.md.
- [advisory] fig-U4-6 Shelf-length row unit metres conflicts with method books*spine-width/shelf when shelf denotes shelf length: result is shelf count. Separate length calculation from number of shelves.
- [uncertain] C2-02: sources/unit-04.md Unverifiable sources says None, but texts/ncm.md explicitly has no internal curriculum text. topic-01 Units of measurement now claims NCC carries the same strands across years. texts/openstax-prealgebra.md is structure-level and cannot substantiate topic-02 precise claim about how authors introduce measures together. Obtain bound supporting passages or disclose and authorise unavailable support. See source-inspection.md.
- [uncertain] C2-04: Current narrow, desktop and A4 render inspection unavailable under explicit brief prohibitions. SVG source reads and deterministic gates do not verify current accessibility. No render-review execution or screenshot claimed.
- [uncertain] C2-05: Assessment answers were exposed in the initial whole-file read. Recomputed every bank item and formative task, with reasoning saved, but cannot certify a blind solve before consulting supplied answers. Owner must arrange fresh blind assessment verification.
- [uncertain] C2-06: Fresh reviewer did not author these bytes; actual reviewer session ID recorded from host. Author identity is only repair commit86531818, not an attested author session, and exact deployed model version is not exposed. Parent-supplied frozen manifest/session provenance was absent; reviewer prepared a clean current manifest instead. No qualified acceptance claim can rest on these substitutes.

## Notes from earlier jobs on this unit
- (gqur-300-u04-review_en, review_en, codex) Owner must resolve assessment and source-support concerns; current renders and a fresh blind solve remain pending. G3 stays open.
- (gqur-300-u04-review_en, review_en, codex) Owner must resolve assessment and source-support concerns; current renders and a fresh blind solve remain pending. G3 stays open.
- (gqur-300-u04-fix, fix, opencode) The G3 en-review row for GQUR-300 Unit 4 is stale and needs a fresh G3 run before certification.
- (gqur-300-u04-fix, fix, opencode) `check:content-status` fails on origin/main (pre-existing, content-status.json was generated for commit d5ff559c but origin/main HEAD is 0deb05f4)  -  not in scope for this job.
- (gqur-300-u04-translate-r1, translate, codex) Twelve terms await owner banking; translation remains draft pending independent G5 and rendered RTL/A4 inspection.


## Response snapshot

Applied bounded EN/UR repairs and recorded owner-dependent source, glossary and review follow-ups. G3 remains open. Refreshed deterministic G2 evidence; final validation is recorded in the repair handoff.

## Outcome

- ✅ Impact: Conditional courtyard marking, analytical rice comparison and scaffolding corrected.
- 🧪 Tests: All 14 content gates and 368 unit tests pass; four changed SVG variants pass text measurement.
- 📁 Files: Unit 4 English/Urdu topics and assessment, concept/source records, tracker, shelf figure variants and repair handoff.
- 🔁 Next prompts: Owner to resolve source support, glossary banking, current renders, blind solve and trusted review provenance.
- 🧠 Reflection: Content edits invalidate G2 manifests; regenerate evidence from committed inputs without certifying review.

## Handoff (for CEO and agents)

- Shipped / changed: Applied actionable content findings in both locales; original reviews retained.
- Decisions the team must respect: G3/G5 stay uncertified, translation status remains draft, no build or browser run, no push or PR.
- Pending / next owner: Owner owns limited-source authorisation or bound passages, shared glossary entries and independent review requirements.
- Paperclip issues affected: gqur-300-u04-repair_en; links.ticket is null because the brief provides no issue ID.

## Evaluation notes (flywheel)

- Failure modes observed: Initial content gate correctly detected stale G2 input manifest after repairs.
- Graders run and results (PASS/FAIL): SVG text measurement PASS; all 14 content gates PASS; 31 unit-test files and 368 tests PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh authorised independent verification of changed inputs.
