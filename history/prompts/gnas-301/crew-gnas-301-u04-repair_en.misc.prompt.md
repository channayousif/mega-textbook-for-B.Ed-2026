---
id: crew-gnas-301-u04-repair_en
title: crew repair_en GNAS-301 unit 4
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: gnas-301
branch: crew/gnas-301-u04-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-04/topic-01.mdx
 - docs/semester-1/gnas-301/unit-04/topic-02.mdx
 - docs/semester-1/gnas-301/unit-04/topic-03.mdx
 - docs/semester-1/gnas-301/unit-04/topic-04.mdx
 - docs/semester-1/gnas-301/unit-04/topic-05.mdx
 - docs/semester-1/gnas-301/unit-04/topic-06.mdx
 - docs/semester-1/gnas-301/unit-04/topic-07.mdx
 - docs/semester-1/gnas-301/unit-04/unit-assessment.mdx
 - history/prompts/gnas-301/0043-repair-unit-four-g3-findings.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-06.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-07.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/unit-assessment.mdx
 - specs/content/gnas-301/concepts/unit-04.md
 - specs/content/gnas-301/coverage/unit-04.md
 - specs/content/gnas-301/reviews/unit-04/G2/20261019T150338371Z-gates.json
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261019T150338371Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261019T150338371Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261019T150338371Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261019T150338371Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261019T150338371Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261019T150338371Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261019T150338371Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261019T150338371Z/validate-content.txt
 - specs/content/gnas-301/sources/unit-04.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u04-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u04-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gnas-301/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/gnas-301/reviews/unit-04/G3/agent-g3-gnas301-u4-run001.json` (disposition: revise). Resolve each one:
- [blocking] topic-02.mdx:24-25 presents an attributed quotation as documented fact: After the 2012 fire, a Karachi factory owner told a reporter, "We had safety measures. We had a fire extinguisher." No source is cited, and the sources/unit-04.md Unverifiable-sources declaration covers only the fire's public-record facts (September 2012, more than 250 workers killed behind locked and barred exits) and the unit's own framework reading. The style guide (specs/content/style-guide.md, Citation format) requires quotations under 15 words to carry a citation to a named source. This 9-word quote is an attribut...
- [blocking] The WHO Deafness and hearing loss fact sheet (who-hearing-2026, verified by direct fetch 2026-09-23 with a bound excerpt at sources/texts/who-hearing-2026.md) is cited in topic-07.mdx:45-46 ("the hearing loss the WHO counts in the hundreds of millions (WHO, 2026)") and listed in topic-07.mdx:156-157 Further reading, but has no row in sources/unit-04.md and no coverage/unit-04.md row. This violates the sources-consulted contract stated in sources/unit-04.md itself ("every key cited in ... the unit's per-topic ## Further reading sections appears here"). The claim itself is supported by the bo...
- [blocking] The abbasi2022 mapping for U4-09 claims support that does not exist in the unit. sources/unit-04.md says abbasi2022 supports "topic-05.mdx U4-09 (bottom-of-hierarchy reliance in practice)", and coverage/unit-04.md maps U4-09 in topic-05.mdx to abbasi2022 plus a reinforcement row "U4-09 | unit-teacher-notes.mdx | Managing the activities | abbasi2022". Neither topic-05.mdx nor unit-teacher-notes.mdx cites abbasi2022 anywhere (grep verified), and neither contains the described bottom-of-hierarchy content; that finding lives in Unit 3 (per the excerpt's own support note). The mapping appears co...
- [blocking] coverage/unit-04.md and sources/unit-04.md over-claim who-occupational-health as the grounding source for U4-03, U4-04, U4-06, U4-08, U4-12, U4-14 and U4-15. The bound excerpt (sources/texts/who-occupational-health.md: definition, three objectives, disciplines, named concerns) contains no passage on OSH management systems, ILO C155/ISO 45001/PDCA, regulatory instruments, duties and rights, management principles, HSE plans, the external environment or HSE tools, and the topic bodies for those sub-topics (topic-02, topic-03, topic-04, topic-05, topic-06, topic-07) never cite WHO in prose; onl...
- [advisory] topic-01.mdx:63-64 calls the 2012 Karachi fire "one of the deadliest industrial fires anywhere on record". The toll (more than 250) makes this defensible public record, but it is a comparative superlative beyond the facts the Unverifiable-sources declaration names (date, toll, locked exits). Consider softening to the declared facts or extending the declaration to cover the characterization.
- [advisory] topic-02.mdx:40-42 states Pakistan's national framework was "strengthened in recent decades by the ILO's post-fire programmes". This is a real, well-documented institutional response, but it is an uncited factual characterization tied to the fire narrative and not covered by the declaration. Consider citing an ILO source or declaring it alongside the fire entry.
- [advisory] topic-03.mdx:48-51 places the abbasi2022 citation at the end of a sentence whose second half is the unit's own inference ("a reminder that enforcement works best when the people exposed are part of it"). The excerpt supports the study's method (community consultation beside site visits), not an enforcement-effectiveness finding. Consider splitting the sentence so the citation scopes only to the method claim.
- [advisory] topic-04.mdx:75 says "the Karachi fire's factories had paperwork too" (plural). The 2012 fire was one factory. Consider "the Karachi fire's factory" or "factories like the one in the Karachi fire".
- [advisory] topic-07.mdx:41-42 references the 2015 Karachi heatwave ("demonstrated at city scale") as an undeclared public-record event. Unlike the 2012 fire it states no toll and no specifics, so it is acceptable as general public record; for consistency with the fire treatment, consider a one-line declaration in sources/unit-04.md.
- [advisory] concepts/unit-04.md assessment-item mappings are topic-level rather than concept-level in three places: RRQ-04 (five layers of internal control) is listed under CON:GNAS-301-4-4 Regulatory ladder as well as the correct CON:...-4-5; RRQ-06 (incident pyramid) is listed under CON:...-4-8 Management functions as well as the correct CON:...-4-9; MCQ-08 (18th Amendment devolution, statutes content) is listed under CON:...-4-11 HSE plan steps, which describes plan steps, not statutes. The concept graph has no concept for the statutes sub-topic (U4-11). Consider correcting the item lists or splitti...
- [advisory] Render inspection notes bare-URL link text for DOI and WHO links in Further reading sections (render-inspect.log section A). This is the established corpus-wide citation style and the inspection tool itself classifies it as advisory; no action required for this unit alone.

## Feedback from the previous attempt
npm run check:content has 1 finding(s) that main does not have:
✗ static/content-status.json is missing. Run: npm run build:content-status


## Response snapshot

Preserved Unit 4 EN/UR repairs, regenerated missing content status, and committed successful validation results.

## Outcome

- Impact: repair_en for GNAS-301 Unit 4 by codex (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 30 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Preserved Unit 4 EN/UR repairs, regenerated missing content status, and committed successful validation results.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains unticked; a third review cycle requires owner authorization under G-2026-31.
  - G3 remains unticked; a third review cycle requires owner authorization under G-2026-31.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
