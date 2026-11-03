---
id: 20261117
title: Verify Unit Eleven Merge
stage: misc
date: 2026-11-03
surface: agent
model: GPT-6
feature: efmp-301
branch: crew/efmp-301-u11-repair_en
user: crew
command: Read .crew/brief.md and carry it out completely
labels: [codex, crew, merge-validation]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-301/20261117-verify-unit-eleven-merge.misc.prompt.md
tests:
  - "npm run check:content: PASS (13/13)"
  - "git diff --check origin/main...HEAD: PASS"
  - "measure-figure-text, four fig-U11-2 variants: PASS"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Delegated task brief (verbatim):

# Crew job efmp-301-u11-repair_en-conflict2

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u11-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-301-u11-repair_en conflicts with main (specs/content/efmp-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 11 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-11/`.

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
- (efmp-301-u11-repair_en, repair_en, claude) Owner escalation is still needed for a qualified subject review of the WHO-bound clinical, urgency and referral wording, for render inspection, and for review provenance; a fresh G3 run needs owner authorisation under ADR-0019.
- (efmp-301-u11-repair_en, repair_en, claude) `sources/texts/who2026.md`'s "Used for" note still lists U11-2 signs; I didn't edit it because the file is shared with Unit 12 and changing it makes Unit 12's G2 evidence stale.
- (efmp-301-u11-repair_en, repair_en, claude) The Urdu wording is new and hasn't had a G5 review; check the added WHO quotations and the "اچانک، نمایاں تبدیلی" sign wording.
- (efmp-301-u11-review_en-conflict1, fix, agy) Owner escalation required for clinical source support, render evidence and review provenance; no automatic third review cycle under ADR-0019.
- (efmp-301-u11-review_en-conflict1, fix, agy) Untracked gitignored static/content-status.json to align with origin/main maintenance 2026-W43.


## Response snapshot

Fetched origin and ran git merge origin/main: already up to date. Preserved the existing merge and Unit 11 repairs. All 13 content gates passed. Committed this work record; no push or PR.

## Outcome

- ✅ Impact: Verified the earlier merge repair remains complete against fetched main.
- 🧪 Tests: All 13 content gates passed; no baseline comparison was necessary because there were no failures.
- 📁 Files: Only this PHR added; no content or tracker changes needed.
- 🔁 Next prompts: Owner handles the existing clinical, render and provenance escalations.
- 🧠 Reflection: Inspect helper scripts before invoking them: the figure text measurement helper launches Chromium.

## Handoff (for CEO and agents)

- Shipped / changed: Verified origin/main is already an ancestor; shared registries have no branch changes; all content gates pass.
- Decisions the team must respect: Retain existing merge 5eadde44d and repairs. G3/G5 and publication states unchanged. No push or PR.
- Pending / next owner: Existing owner escalation for clinical wording, render inspection and review provenance; further G3 requires owner authorisation.
- Paperclip issues affected: efmp-301-u11-repair_en-conflict2; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Invoked measure-figure-text before inspecting its implementation. It launches Chromium, violating the brief browser prohibition and bypassing the heavy wrapper. The command finished and its browser closed; no further browser commands run.
- Graders run and results (PASS/FAIL): PASS: check:content 13/13; diff whitespace; four figure measurements.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Read helper imports and execution paths before any optional verification.
