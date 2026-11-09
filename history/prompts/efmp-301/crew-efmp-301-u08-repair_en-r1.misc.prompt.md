---
id: crew-efmp-301-u08-repair_en-r1
title: crew repair_en EFMP-301 unit 8 (r1)
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-301
branch: crew/efmp-301-u08-repair_en-r1
user: crew
command: Read .crew/brief.md and carry it out
labels: ["crew", "opencode", "repair_en", "efmp-301", "unit-08"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-301/tasks.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The delegated brief, preserved verbatim:

# Crew job efmp-301-u08-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u08-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-301/reviews/unit-08/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 8 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-08/`.

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
From `specs/content/efmp-301/reviews/unit-08/G3/20261108T203238Z-g3-desk-dd961083.json` (disposition: revise). Resolve each one:
- [blocking] R1 partial repair: MCQs now meet 4/3/3, but RRQ-10 at unit-assessment.mdx:125-126 and its guidance at :197-199 ask about break-time peer inclusion and a once-a-term social seating map. Topic-02:81 only teaches a day-one map for names. RRQ distribution remains 3/3/3 plus an untaught item, not content-spec.md:1026-1028 approved 3/4/3. Replace RRQ-10 with a taught 8.2 item and align guidance/concept mapping through a separate author. Final cycle: escalate to owner.
- [blocking] New assessment defect: unit-assessment.mdx ERQ rubrics 1-5 each award 4/20 for within the word count, but none of the five ERQ stems or shared bank instructions supplies a word limit. Set explicit limits or revise the scoring criteria through a separate author.
- [advisory] R2 persists: MCQ guidance has seven b, two c, one a, zero d (unit-assessment.mdx:159-170). Rebalance option positions; merely changing MCQ-05 to a did not remove the 7/10 b concentration.
- [advisory] R3 partial: unit-teacher-notes.mdx:87-89 now honestly calls the ladder task the unit instantiation of generic practical work. However sources/unit-08.md:20 still calls it guide-named practical work behind teacher notes. Guide 1st 2026.txt:1182-1189 has only generic task categories. Correct the source registry attribution.
- [advisory] R4 partial: sources/unit-08.md:14 removed pacing, but still presents U8-5 as escalation responses including ignoring/conflict resolution instead of distinguishing the unit ladder from source mechanisms. Its support claim for the five-part environment exceeds the short bound Chapter 7 excerpt. Align support locators and distinguish synthesis from documented source findings.
- [advisory] R8 partial: topic-01.mdx:38, figure manifest alt, and fig-U8-1.svg desc now include the not-silence tagline. Manifest Prompt still omits it, so the requested prompt provenance correction remains.
- [uncertain] Fresh narrow-screen and A4 inspection unavailable: .crew/brief.md expressly prohibits builds, dev servers and Playwright. Old render images are not evidence of the repaired current bytes. Accessibility remains unverified; owner must provide permitted input-bound render evidence.
- [uncertain] Source support limited to bound sources/texts/seifert2009.md Chapter 7 excerpt. It verifies prevention, rules and natural/logical consequences, but not the complete environment framework, comparative claims such as most misbehaviour being design or proximity resolving more disruption than any raised voice, or the claimed documented head-teacher practice. No original full source text was provided or independently retrieved in this run. sources/unit-08.md has no Unverifiable sources declaration. Supply bound passages or qualify unsupported claims.
- [uncertain] Review handoff incomplete: parent supplied no current prepared frozen bundle or actual provider session/model-version metadata. This fresh reviewer prepared current committed inputs itself and records provenance transparently; that does not retroactively satisfy the skill requirement for a parent-prepared immutable handoff. No certified or provisional pass is claimed.

## Notes from earlier jobs on this unit
- (efmp-301-u08-repair_en-conflict3, fix, opencode) `check:content-status` fails on both branches because the gitignored `static/content-status.json` is stale/missing; CI regenerates it before checking, so it is a separate fix job.
- (efmp-301-u08-repair_en-conflict3, fix, opencode) Urdu Unit 8 still carries the "کاؤنٹرائزنگ" mistranslation for "management" and the narrow-screen/A4 render check is uninspected; both need a G5/translation or owner job.
- (efmp-301-u08-repair_en-conflict3, fix, opencode) The merge auto-resolved main's newer Unit 5/Unit 9 G2 evidence rows over the branch's older ones (same unit/stage, updated gates); expected, not a lost entry.
- (efmp-301-u08-repair_en-conflict2, fix, opencode) `check:content-status` fails on both branches because the gitignored `static/content-status.json` is stale/missing; regenerating it needs `npm run build:content-status` (separate fix job).
- (efmp-301-u08-repair_en-conflict2, fix, opencode) Urdu Unit 8 still carries the "کاؤنٹرائزنگ" mistranslation for "management" and the narrow-screen/A4 render check is uninspected; both need a G5/translation or owner job.

## Response snapshot

Verified the latest G3 report against the current committed bytes before editing. The 20261108 desk report's findings array is byte-identical to the 20261102 report already repaired at 44e895fb, and its input manifest matches current HEAD exactly (100/100 paths), so it is a verbatim re-report rather than a fresh review. Every editable finding is already present in the current tree: RRQ-10 is the taught Topic 8.2 feedback item with aligned guidance and concept mapping (RRQs 3/4/3), ERQs carry an explicit 400-500 word limit, MCQ keys are 3a/3b/2c/2d, sources/unit-08.md carries the corrected course-generic guide attribution and the scope-of-support note, and fig-U8-1's manifest prompt carries the not-silence tagline. No new content edits were required. Appended an unticked advisory G3 tracker row naming the report.

## Outcome

- Impact: verified the 20261108 desk report is a stale re-report and recorded the verification in the Unit 8 G3 tracker row.
- Tests: npm run check:content passed 14/14 after regenerating static/content-status.json; npm test passed 448/448 (39 files).
- Files: specs/content/efmp-301/tasks.md (one advisory tracker row); this PHR.
- Next prompts: owner retains the narrow-screen/A4 render and review-handoff provenance items; a G5/translation job owns the Urdu "کاؤنٹرائزنگ" mistranslation.
- Reflection: the desk report pipeline re-issues prior findings verbatim under a fresh manifest; a repair job must verify current bytes before editing.

## Handoff (for CEO and agents)

- Shipped / changed: one unticked Unit 8 G3 tracker row naming reviews/unit-08/G3/20261108T203238Z-g3-desk-dd961083.json and recording that its findings are already repaired at 44e895fb; this PHR.
- Decisions the team must respect: G3 stays unticked and advisory; no certification, no push, no PR.
- Pending / next owner: owner must provide permitted narrow-screen/A4 render evidence and a parent-prepared frozen handoff for any further G3 cycle (ADR-0019 cycles exhausted); a G5/translation job owns the Urdu "کاؤنٹرائزنگ" mistranslation for "management".
- Paperclip issues affected: none (work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: a desk report can carry a fresh input manifest while its findings text is a verbatim copy of an already-repaired prior report; applying it blindly would revert correct repairs.
- Graders run and results (PASS/FAIL): PASS: npm run check:content 14/14 after npm run build:content-status; npm test 448/448 (39 files); input-manifest comparison 100/100 current; findings-array equality check against the 20261102 report.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): have the desk report generator compare its findings against the current tracker/repair state and mark already-repaired findings resolved before queueing a repair job.
