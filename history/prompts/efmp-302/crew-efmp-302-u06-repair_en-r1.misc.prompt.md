---
id: crew-efmp-302-u06-repair_en-r1
title: crew repair_en EFMP-302 unit 6 (r1)
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-302
branch: crew/efmp-302-u06-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-302/tasks.md
 - history/prompts/efmp-302/crew-efmp-302-u06-repair_en-r1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u06-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u06-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-302/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-302 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-06/`.

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
From `specs/content/efmp-302/reviews/unit-06/G3/20261108T203238Z-g3-desk-c1793ead.json` (disposition: revise). Resolve each one:
- [blocking] S1 SOURCES, carried unresolved from run-007 (owner-judgement; re-verified live in current bytes). coverage/unit-06.md grounds seven of its thirteen rows in sources the named prose sections never cite: U6-05 and U6-06 in day1999 (coverage/unit-06.md:18-19), U6-07, U6-08 and U6-10 in villegas2003 (:20-21,23), and U6-12 and U6-13 in guskey2000 (:25-26). Verified in current bytes: day1999 is cited exactly once in topic-02.mdx:56-58, inside "### The preservice stage" (U6-04); villegas2003 is never cited in topic-03.mdx body prose (the Conferences, Workshops and Professional learning communities ...
- [blocking] S2 SOURCES, carried unresolved from run-007 (owner-judgement; re-verified live in current bytes). Two substantive attributions to declared-unretrievable sources carry no level-of-support declaration and no point-of-use uncorroborated disclosure, which D-2026-0001's Limits and the G3 rubric both retain as a failure. (a) topic-01.mdx:61-65: "Guskey (2000) ... argues that evaluation must reach beyond participants' satisfaction and even beyond what they learned, to whether their practice changed and whether pupils' outcomes changed" - a specific multi-level argument attributed to a text the reg...
- [advisory] S4 SOURCES, carried unresolved from run-007 (re-verified live). sources/unit-06.md:39 describes villegas2003 as a "Print-only book, not retrievable by the reviewing host". The IIEP catalogue page resolves and describes a 196-page electronic publication with a free "Download the publication" link; unesdoc returns HTTP 403 to this host (reproduced 2026-09-24). "Unretrievable by this host" is correct; "print-only book" is not, and the same file's Verification-method preamble contradicts it ("print books or a UNESCO report"). The bullet should name the actual blocker, as the hennessy2022 bullet...
- [advisory] X1 ACCESSIBILITY, carried unresolved from run-007 (confirmed live by measurement). At 360px the five ERQ rubric tables on unit-assessment expose five identical accessible names, "Scrollable table, scroll sideways to see all columns" (client 328, scroll 439-524), and the topic figures share "Scrollable figure, scroll sideways to see the whole diagram". A screen-reader user listing regions cannot tell which rubric or figure is which. The names come from the site components (src/theme/DocItem/Content.tsx and the Figure component), not from unit content, so this is not repairable by the unit au...
- [advisory] X2 ACCESSIBILITY, carried unresolved from run-007 (confirmed live by this run's own geometry measurement, both theme variants). In fig-U6-2 four of the six dashed "rules out" boxes are narrower than the text inside them: "rules out: training away from the pupils you teach" ends 25.2 user units past the box's right edge, "...generic sessions on teaching in general" +23.7, "...advice about a lesson nobody watched" +20.2, "...the assigned course nobody asked for" +15.4 (logs-feat023-r1/figure-geometry-overlap.log). No text crosses the viewBox (widest 912.2 of 924) and the pixel probe confirms ...
- [advisory] X3 ACCESSIBILITY, carried unresolved from run-007 (re-measured live). The table-archetype figures are the smallest effective text in the unit on desktop: at 1280x900 fig-U6-5 displays 640px against a 936-unit viewBox (scale 0.684, about 7.5px effective for 11px body text) and fig-U6-1/2/4/7 render 640px against 880-924 (about 7.6-7.8px); the timeline and flowchart carriers render 703px (8.6-8.8px). At 360px the figures render at full intrinsic width inside the scroll container, so mobile readers get larger text than desktop (logs-feat023-r1/figure-displayed-size.log).
- [advisory] P3 PEDAGOGY, carried unresolved from run-007 (re-verified live). Of the five misconceptions in content-spec.md:883-886, four are named and repaired in learner-facing prose (topic-01.mdx:67-69, topic-02.mdx:114-118, topic-03.mdx:143-145, topic-04.mdx:106-111). The fifth, "development is what a system provides, so if none is provided none happens", appears only at unit-teacher-notes.mdx:51-54, which learners do not read; it is the misconception most directly answered by Topic 6.3's PLC and reflective-tools material and would cost little to name there.
- [advisory] P4 PEDAGOGY, carried unresolved from run-007 (re-verified live). content-spec.md:141-142 lists "Teacher identity is developed, not fixed ... (Units 1, 3, 6)" as a course through-line, but the string "identity" occurs zero times anywhere under docs/semester-1/efmp-302/unit-06/ (checked across all seven files). topic-04.mdx:113-129 "Closing: what this course was for" recaps Units 1-5 without it. Either the closing recap should carry the identity thread or the through-line should stop claiming Unit 6.
- [advisory] P5 READABILITY, carried unresolved from run-007 (re-verified live). Two sentences addressed to a reviewer sit inside learner prose: topic-01.mdx:97-99 ("Note that this unit cites that work only for the question it asks; its abstract was not available when this unit was written, so no finding from it is claimed here") and topic-03.mdx:90-91 ("Note that scope: this is the right literature for this sub-topic, unlike a general claim about online learning."). These are also the D-2026-0001 point-of-use disclosures, so the request remains: keep the disclosure, rewrite it in the register a student...
- [advisory] P6 ASSESSMENT, carried unresolved from run-007 (re-verified live). concepts/unit-06.md:28 maps CON:EFMP-302-6-12 "Reflective practice as method" to RRQ-08, but RRQ 8 (unit-assessment.mdx:145-146) assesses the LMIC technology review and two Pakistani constraints on online platforms - U6-09 / CON-6-10 territory. Reflective-practice-as-method, a named misconception and a full sub-topic (U6-11), is left with no assessment item while RRQ 8 is attributed to a concept it does not test. check:concept-graph passes because the linkage is well-formed, not because it is semantically right.
- [advisory] NEW ASSESSMENT observation (this run). U6-07 (Conferences) is the only sub-topic with no dedicated bank item: MCQ 7 uses "a conference" only as a distractor, RRQ 7-8 assess workshops and online platforms, and ERQ 3's "compare at least three routes" can be answered without touching conference-specific content (highest cost per teacher, exposure value for an isolated rural teacher). The topic-level blueprint (>= 2 MCQ and 2 RRQ per topic) is met and run-007 passed coverage on the same shape, so this is an observation for the owner's content-improvement loop, not a breach.
- [advisory] NEW ASSESSMENT wording (this run). RRQ 4's stem (unit-assessment.mdx:133-134) says "explain why the new-teacher transition frees attention rather than adding knowledge". The natural reading of "the new-teacher transition" is the transition INTO the new teacher stage, at which topic-02 says attention is consumed, not freed; the mark scheme (:214-217) reads it as the transition OUT of that stage ("mechanics become automatic and attention is freed"), which is the reading the prose supports. A student reading the stem the natural way will answer about the wrong transition. Suggest "the transiti...
- [advisory] NEW ACCESSIBILITY observation (this run). In fig-U6-3 (both variants) the two transition labels graze the adjacent stage-box fills: "from observing" extends about 10px into the Preservice box's corner and "from surviving" about 7px into the Experienced box's left edge (logs-feat023-r1/figure-geometry-overlap.log; pixel probe confirms 30-35% ink over the light fill, fully legible). Cosmetic only - no text-on-text contact, no clipping; same reported-not-failed class as the shape-wordmark grazes G-2026-62 records.
- [uncertain] S3 SOURCES, carried unresolved from run-007 (re-verified live). No source text is bound for ANY of Unit 6's six keys: specs/content/efmp-302/sources/texts/ holds thirteen excerpt files and none of them is guskey2000, day1999, villegas2003, brookfield2017, hennessy2022 or kwakman2003. hennessy2022 (abstract) and kwakman2003 (record plus absent abstract) were independently verified this run via OpenAlex; the four print/report sources could not be read, so support for claims resting on them is unverified rather than verified. Under D-2026-0001 this does not by itself fail sources, and equally ...

## Notes from earlier jobs on this unit
- (efmp-302-u06-repair_en, repair_en, codex) Browser inspection remains pending under the brief’s restrictions.
- (efmp-302-u06-repair_en, repair_en, codex) Full-text source verification remains uncertain; shared scroll-region naming needs platform work.
- (efmp-302-u06-repair_en, repair_en, codex) Browser inspection remains pending under the brief’s restrictions.
- (efmp-302-u06-fix, fix, opencode) G3 en-review for Unit 6 is stale and needs a fresh run; all figure text-geometry checks and content gates pass on the branch.
- (efmp-302-u06-translate-r1, translate, codex) Translation remains draft; independent G3/G5, full-page rendering and existing owner decisions remain pending.

## Response snapshot

Confirmed that every finding in G3 report desk-c1793ead was already repaired on main by c79f0e34a and added an unticked advisory G3 row for EFMP-302 Unit 6 recording the evidence, with no content edits.

## Outcome

- Impact: repair_en for EFMP-302 Unit 6 by opencode (attempt 1, r1).
- Tests: npm run check:content passed in the job worktree.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Confirmed that every finding in G3 report desk-c1793ead was already repaired on main by c79f0e34a and added an unticked advisory G3 row for EFMP-302 Unit 6 recording the evidence, with no content edits.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this commit does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the commit touches a protected path).
- Notes for the next job on this unit:
  - All c1793ead findings were already resolved on main by c79f0e34a, so the next step is a fresh independent G3 review, and running it needs owner authorisation under G-2026-64 / ADR-0019 (D-2026-0005 refuses further cycles unless the owner grants one).
  - S3 full-text source verification remains uncertain; no Unit 6 source excerpt is bound under sources/texts/.
  - X1 generic scroll-region names need platform work outside unit scope; browser inspection remains pending under the brief's restrictions.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
