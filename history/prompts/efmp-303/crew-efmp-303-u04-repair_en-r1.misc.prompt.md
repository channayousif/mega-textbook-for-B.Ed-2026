---
id: crew-efmp-303-u04-repair_en-r1
title: crew repair_en EFMP-303 unit 4
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-303
branch: crew/efmp-303-u04-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en", "efmp-303", "unit-04"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-303/crew-efmp-303-u04-repair_en-r1.misc.prompt.md
  - specs/content/efmp-303/tasks.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The delegated brief, preserved verbatim:

# Crew job efmp-303-u04-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u04-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-303/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-04/`.

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
From `specs/content/efmp-303/reviews/unit-04/G3/20261108T203238Z-g3-desk-a67ec0a3.json` (disposition: revise). Resolve each one:
- [blocking] render-review step could not be performed: the review host forbids running npm run build or a dev server, which is required to produce rendered HTML for visual inspection (small-screen layout, A4 print views, figure clipping). This is a required command for a passing report under the evidence contract. Disposition escalated on this limitation.
- [advisory] Topic 4.2 line 36 cites (Government of Pakistan, 2009) for a specific numerical claim (below 2.5 per cent GDP, 4 per cent commitment) but the source is declared unverifiable in sources/unit-04.md with title-and-catalogue-level support only. The declaration understates the reliance. Verify the claim against the NEP 2009 PDF or rephrase to remove the specific citation.
- [advisory] Topic 4.1 line 38 cites (Coombs, 1970) for a specific conceptual claim about the M&E cycle but the source is declared unverifiable in sources/unit-04.md. The prose uses it beyond title-and-catalogue-level support as declared. Consider verifying the claim against the open UNESDOC text or rephrasing to a general statement without a specific citation.
- [advisory] Concept-graph concepts CON:EFMP-303-4-3 label reads M&E process process (duplicate word) and its SLO refs are SLO:EFMP-303-4-1 only, not SLO:EFMP-303-4-2. Minor labeling issue in specs/content/efmp-303/concepts/unit-04.md line 7.

## Notes from earlier jobs on this unit
- (efmp-303-u04-repair_en, repair_en, codex) Render inspection remains blocked by host restrictions; G3 stays unticked pending independent review.
- (efmp-303-u04-repair_en, repair_en, codex) Render inspection remains blocked by host restrictions; G3 stays unticked pending independent review.
- (efmp-303-u04-fix, fix, opencode) G3 en-review remains open and flagged stale  -  needs a fresh independent G3 run. Translation_status stays draft across all 5 mirror files pending G5.
- (efmp-303-u04-translate-r1, translate, agy) All 4 .ur.svg figure variants and derived dark variants are wired in topics 1-2 with passing figures:variants:check.
- (efmp-303-u04-translate-r1, translate, agy) Full structural, heading, component, and bank-bound key_terms parity verified clean under temporary reviewed flip.

## Response snapshot

Verified the latest G3 report against the current committed bytes before editing. The 20261108 desk report's findings array is byte-identical to the 20261102 reports already repaired at 13f55bb64, and its input manifest matches current HEAD exactly (95/95 paths), so it is a verbatim re-report rather than a fresh review. Every editable finding is already present in the current tree: the unsupported GDP percentages and NEP 2009 attribution are removed from topic-02 EN and UR, the Coombs cycle attribution is removed from topic-01 EN and UR, and the concept label is M&E process (SLO 4-1 retained per the approved Topic 4.1 mapping). No new content edits were required. Appended an unticked advisory G3 tracker row naming the report.

## Outcome

- Impact: verified the 20261108 desk report is a stale re-report and recorded the verification in the Unit 4 G3 tracker row.
- Tests: npm run check:content passed 14/14 after regenerating static/content-status.json.
- Files: specs/content/efmp-303/tasks.md (one advisory tracker row); this PHR.
- Next prompts: owner retains the narrow-screen/A4 render inspection; a fresh independent G3 run is required.
- Reflection: the desk report pipeline re-issues prior findings verbatim under a fresh manifest; a repair job must verify current bytes before editing.

## Handoff (for CEO and agents)

- Shipped / changed: one unticked Unit 4 G3 tracker row naming specs/content/efmp-303/reviews/unit-04/G3/20261108T203238Z-g3-desk-a67ec0a3.json and recording that its findings are already repaired at 13f55bb64; this PHR.
- Decisions the team must respect: G3 stays unticked and advisory; no certification, no push, no PR.
- Pending / next owner: owner must provide permitted narrow-screen/A4 render evidence for any further G3 cycle; render-review remains host-blocked (crew brief forbids build, dev server and Playwright).
- Paperclip issues affected: none (work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: a desk report can carry a fresh input manifest while its findings text is a verbatim copy of an already-repaired prior report; applying it blindly would revert correct repairs.
- Graders run and results (PASS/FAIL): PASS: npm run check:content 14/14 after npm run build:content-status; input-manifest comparison 95/95 current; findings-array equality check against the 20261102 reports.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): have the desk report generator compare its findings against the current tracker/repair state and mark already-repaired findings resolved before queueing a repair job.
