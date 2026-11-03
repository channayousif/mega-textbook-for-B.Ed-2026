---
id: crew-gnas-301-u06-repair_en-r1
title: crew repair_en GNAS-301 unit 6 (G3 desk report r1)
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: gnas-301
branch: crew/gnas-301-u06-repair_en-r1
user: crew
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/gnas-301/unit-06/topic-03.mdx
  - docs/semester-1/gnas-301/unit-06/topic-04.mdx
  - docs/semester-1/gnas-301/unit-06/unit-assessment.mdx
  - docs/semester-1/gnas-301/unit-06/unit-teacher-notes.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/unit-teacher-notes.mdx
  - specs/content/gnas-301/concepts/unit-06.md
  - specs/content/gnas-301/tasks.md
  - specs/content/gnas-301/reviews/unit-06/G2/20261103T051634155Z-gates.json
  - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-bloom-bands.txt
  - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-concept-graph.txt
  - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-depth-gate.txt
  - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-docs-sync.txt
  - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-figures.txt
  - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-no-answer-keys.txt
  - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/check-no-em-dash.txt
  - specs/content/gnas-301/reviews/unit-06/G2/logs-20261103T051634155Z/validate-content.txt
  - history/prompts/gnas-301/crew-gnas-301-u06-repair_en-r1.misc.prompt.md
tests:
  - npm run check:content (13/13 passed)
  - npm run check:no-em-dash (0 em dashes)
  - npm run check:pipeline-gate (passed after the G2 evidence refresh)
---

## Prompt

# Crew job gnas-301-u06-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u06-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gnas-301/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-06/`.

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
From `specs/content/gnas-301/reviews/unit-06/G3/20261102T212207Z-g3-desk-06be9f9b.json` (disposition: revise). Resolve each one:
- [blocking] concepts/unit-06.md CON:GNAS-301-6-4 maps RRQ-04/ERQ-02 to dose-response curves; CON:GNAS-301-6-5 maps RRQ-05 to essentiality. Correct these mappings against actual item demand.
- [blocking] topic-03 Activity Build the ladder and ERQ-03 arithmetic rubric provide no concentrations/masses or explicit retention assumptions; multiplying totals does not establish the requested concentration factor. Supply a dimensionally specified example.
- [advisory] Carried prior finding 9: ERQ-02 Evaluate exceeds rubric Apply demand; ERQ-05 Create rests on a one-mark close. Also MCQ-05 Analyze merely retrieves a stated rationale. Align labels and demand.
- [advisory] RRQ-04 assumes sensitization appears only after years; RRQ-05 route ranking needs explicit scenario assumptions. Reword premises and match marking guidance.
- [advisory] topic-04 pane activity and teacher notes should explain model limits; two-pane temperature differences alone do not verify the stated atmospheric radiation mechanism.
- [uncertain] Required current desktop/narrow/A4 inspection is unavailable under the brief browser/build prohibition; do not certify accessibility from historical artifacts.
- [uncertain] Current author run identity and exact model deployment version were not supplied; inherited author provenance cannot establish the repaired version. G-2026-33 also records an exhausted two-cycle allowance, contrary to the brief cycle count.
- [uncertain] Source binding remains incomplete for three year-less excerpts and root glossary.json; current bound excerpts do not verify all toxicology and Lahore chemistry claims or the repaired WHO co-benefit sentence. Request a complete evidence bundle.
- [uncertain] Assessment derivation followed supplied-key exposure and therefore is not the mandated blind independent solve. Obtain this evidence in an authorized fresh review.

## Notes from earlier jobs on this unit
- (gnas-301-u06-review_en-conflict5, fix, agy) G-2026-33 cycle-count decision and existing Unit 6 evidence gaps remain owner-owned; G3 stays open.
- (gnas-301-u06-review_en-conflict1, fix, codex) G-2026-33 and existing Unit 6 evidence gaps remain owner-owned; G3 stays open.
- (gnas-301-u06-review_en-conflict1, fix, codex) G-2026-33 and existing Unit 6 evidence gaps remain owner-owned; G3 stays open.
- (gnas-301-u06-review_en, review_en, codex) Owner must resolve G-2026-33; current rendering, source binding, provenance and assessment evidence remain incomplete.
- (gnas-301-u06-review_en, review_en, codex) Owner must resolve G-2026-33; current rendering, source binding, provenance and assessment evidence remain incomplete.

## Response snapshot

Applied the five actionable findings from the latest G3 desk report (20261102T212207Z-g3-desk-06be9f9b.json) to GNAS-301 Unit 6, English first and then the Urdu mirror:
1. concepts/unit-06.md: moved RRQ-04 and ERQ-02 from CON:GNAS-301-6-4 to CON:GNAS-301-6-3 (effect classes), leaving MCQ-05 as the dose-response item; removed RRQ-05 from CON:GNAS-301-6-5 (essentiality), leaving MCQ-06. RRQ-05 stays with CON:GNAS-301-6-6 (routes).
2. topic-03 activity and ERQ-03 rubric: replaced the totals-only ladder with a dimensionally specified card set (water 0.01 mg/L; plankton 1 mg/kg; small fish 5 mg/kg; large fish 25 mg/kg; family about 12 mg retained) and the concentration formula (food kg x food concentration x kept share, divided by body kg).
3. ERQ-02 relabelled Apply; ERQ-05 Create criterion raised from 0-1 to 0-2 and reworded as a synthesis close; MCQ-05 relabelled Understand. Frontmatter blooms_summary updated to "ERQs from Apply to Create".
4. RRQ-04 reworded to "often appear only after one or more earlier exposures", with marking guidance accepting variable delay; RRQ-05 now requires the formulation, duration and protection assumptions, and the mark scheme rewards them.
5. topic-04 pane activity and teacher notes now state that the lamp-and-glass model is an analogy and does not reproduce the atmosphere's long-wave absorption and re-radiation.
Appended the unticked Unit 6 G3 tracker row naming the report, refreshed the G2 gate evidence, and regenerated the gitignored content-status cache.

## Outcome

- Impact: the five actionable G3 findings are repaired in EN and UR; the four uncertain findings are recorded as owner-owned and were not certifiable under the brief's browser/build prohibition.
- Tests: npm run check:content (13/13 passed).
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: the G2 input manifest is bound to the English bytes, so any content repair invalidates it; prepare-gate-evidence.mjs --refresh-stale re-anchors it in one run.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 6 G3 advisory repairs in EN and UR, the unticked G3 tracker row, and refreshed G2 gate evidence.
- Decisions the team must respect: G3 stays unticked and advisory; no certification or publication transition is claimed. The four uncertain findings (accessibility, author provenance, source binding, blind assessment derivation) remain owner-owned, and G-2026-33's cycle-count conflict is unresolved.
- Pending / next owner: owner resolution of G-2026-33 and a fresh authorised G3 review; the next job should re-check the concept mappings and the new Bloom labels against the content-spec blueprint.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: check:pipeline-gate failed on a stale G2 input manifest after the content edits; resolved by running prepare-gate-evidence.mjs --refresh-stale at the repaired HEAD.
- Graders run and results (PASS/FAIL): npm run check:content PASS (13/13).
- Prompt variant (if applicable): crew brief r1.
- Next experiment (smallest change to try): none.
