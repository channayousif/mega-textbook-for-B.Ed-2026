---
id: crew-gicp-400-u07-repair_en
title: crew repair_en GICP-400 unit 7
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: gicp-400
branch: crew/gicp-400-u07-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/gicp-400/unit-07/index.mdx
 - docs/semester-3/gicp-400/unit-07/topic-01.mdx
 - docs/semester-3/gicp-400/unit-07/unit-assessment.mdx
 - history/prompts/general/20261188-repair-gicp400-unit-seven-g3.general.prompt.md
 - specs/content/gicp-400/concepts/unit-07.md
 - specs/content/gicp-400/coverage/unit-07.md
 - specs/content/gicp-400/figures/unit-07.banner.md
 - specs/content/gicp-400/figures/unit-07.md
 - specs/content/gicp-400/reviews/unit-07/G2/20261110T042755938Z-gates.json
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T042755938Z/check-bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T042755938Z/check-concept-graph.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T042755938Z/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T042755938Z/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T042755938Z/check-figures.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T042755938Z/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T042755938Z/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-07/G2/logs-20261110T042755938Z/validate-content.txt
 - specs/content/gicp-400/sources/texts/dean-2005-citizenship.md
 - specs/content/gicp-400/sources/texts/kennedy-2012-civic.md
 - specs/content/gicp-400/sources/unit-07.md
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-07/fig-U7-1.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-1.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-3.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-3.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u07-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u07-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gicp-400/reviews/unit-07/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 7 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-07/`.

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
From `specs/content/gicp-400/reviews/unit-07/G3/20261108T203238Z-g3-desk-8314fbc3.json` (disposition: revise). Resolve each one:
- [blocking] sources: The three named dimensions and their contents are not Dean's. docs/semester-3/gicp-400/unit-07/topic-01.mdx:40 says she argued for three interlinked dimensions with lists (deliberation, peaceful conflict resolution, critical media literacy; social justice, equal dignity, pluralism). In the full paper 'dimension', 'civic knowledge', 'civic skills', 'media literacy', 'deliberat' and 'conflict resolution' all return zero hits; 'pluralis' hits only a reference-list title. What Dean does write: effective citizens need a body of knowledge, relevant skills, values and dispositions, and fi...
- [blocking] sources: docs/semester-3/gicp-400/unit-07/topic-01.mdx:82 opens 'Dean (2005) put it clearly' and attributes 'primary agents of civic formation' and a statement that nation building in education is not indoctrination. Zero hits for 'primary agent', 'civic formation', 'collaborative inquiry', 'indoctrinat' and 'nation building' in the paper. Her nearest sentence is that the teacher is 'essential to the reconceptualization of education for democratic citizenship'. docs/semester-3/gicp-400/unit-07/topic-01.mdx:40 also lists government departments, historical dates and constitutional bodies as w...
- [blocking] sources: specs/content/gicp-400/sources/texts/dean-2005-citizenship.md second paragraph presents the invented framework as what 'the paper is widely cited for', and sources/unit-07.md claims support for U7-01 and U7-03 from it. The file discloses that the PDF was not authenticated but has no `## Unverifiable sources` section with attempts and owner authorisation, and the prose states these claims with no uncorroborated flag. The disclosure understates the gap: the PDF was retrievable on 2026-11-07, as was the Kennedy full text the file calls bot-protected (www.mdpi.com/2227-7102/2/3/121). R...
- [blocking] sources: The National integration section has no source for its central teaching. The assimilation versus integration distinction and 'Forced assimilation breeds resentment' (docs/semester-3/gicp-400/unit-07/topic-01.mdx:64) cite nothing, and the coverage matrix row mapping U7-02 to kennedy-2012-civic is unsupported: the section never cites Kennedy and his paper has zero hits for 'assimilat'. The causal claim about 1971 (docs/semester-3/gicp-400/unit-07/topic-01.mdx:64) is a contested historical judgement stated without any citation, and no unit source covers it. Repair: bind a real source ...
- [blocking] sources (constitutional accuracy): Article 251 is taught as protecting provincial languages at docs/semester-3/gicp-400/unit-07/topic-01.mdx:70, docs/semester-3/gicp-400/unit-07/topic-01.mdx:96, docs/semester-3/gicp-400/unit-07/topic-01.mdx:119, docs/semester-3/gicp-400/unit-07/unit-assessment.mdx:22, docs/semester-3/gicp-400/unit-07/unit-assessment.mdx:127, docs/semester-3/gicp-400/unit-07/unit-assessment.mdx:129 and the fig-U7-3 label ('provincial languages protected by Article 251'). Clause (3) is permissive: a Provincial Assembly 'may by law prescribe measures' for teaching, promotion a...
- [blocking] sources (constitutional accuracy): docs/semester-3/gicp-400/unit-07/topic-01.mdx:90 derives 'law applies to everyone, including the accused until proven otherwise' from Article 5(2). Article 5(2) states the obligation to obey the Constitution and law and says nothing about the accused. Fair treatment sits in Article 4 and Article 10A. Repair: cite those articles for that half of the sentence.
- [blocking] assessment: Two ERQ rubrics score criteria their stems do not ask for. ERQ 2 (docs/semester-3/gicp-400/unit-07/unit-assessment.mdx:99) asks for Dean and an example, but docs/semester-3/gicp-400/unit-07/unit-assessment.mdx:154 awards 3 of 12 marks for using an article. ERQ 3 (docs/semester-3/gicp-400/unit-07/unit-assessment.mdx:100) never asks for an article or a reflection question, but docs/semester-3/gicp-400/unit-07/unit-assessment.mdx:160 and docs/semester-3/gicp-400/unit-07/unit-assessment.mdx:162 score both (the Topic 7.1 summative task does ask for the article). A learner who answers...
- [blocking] pedagogy: The anchor scenario is incoherent (docs/semester-3/gicp-400/unit-07/topic-01.mdx:24). In a government boys school, 'a third pupil, Zainab' is 'visiting the class with her teacher-education college', so she is both a pupil and a visiting trainee, and she is later answered as a pupil of the class (docs/semester-3/gicp-400/unit-07/topic-01.mdx:96). The topic's closing return to the scenario depends on her. Repair: give her one coherent role, for example a boy in the class or a co-educational school.
- [blocking] coverage: 'Constitutional values' is a spec key term and the object of the Create task, yet it is never defined (used at docs/semester-3/gicp-400/unit-07/topic-01.mdx:100 and in the task). The activity requires 'the value and the article that carries it' and offers equal citizenship, mutual respect and the rule of law, but the unit gives no article for equal citizenship (Article 25 is never named) or the rule of law as such (Article 4 is never named). Repair: define the term and map each offered value to an article.
- [blocking] accessibility: fig-U7-1 overprints its own label. The text 'practice feeds the value' is centred at x=698 and the dashed return path runs vertically at x=690 through the same y, so the line strikes through the word 'feeds' in any font (see evidence/fig-U7-1.sharp.png). The label also ends close to the 780 viewBox edge. Repair: move the label clear of the path and re-run measure-figure-text, which could not run here.
- [advisory] accuracy, not error: Articles 33, 36 and 37 are Principles of Policy, which Article 30(2) makes non-justiciable, but the unit never says so and docs/semester-3/gicp-400/unit-07/unit-assessment.mdx:129 says a school practice 'breaks' Article 33's command. Unit 5 teaches the distinction, so this is a missed link. Also unused: Article 25A's 'as may be determined by law' and the Sindh 2013 Act already in the source folder.
- [advisory] assessment demand: MCQ 5 and MCQ 9 are labelled Understand but are recall. MCQ 6, MCQ 10 and RRQ 9 are labelled Apply or Analyze but restate the topic's worked examples nearly verbatim. RRQ 6 'Analyse what she means' is Understand. MCQ 4, 5 and 7 carry non-functional distractors such as declaring independence. RRQ 5 asks for two sentences and its model has three. RRQ 2 scheme ('1 for each dimension; 1 for a reason why each matters', 4 marks) does not add up if read per dimension. Required bands are still met.
- [advisory] pedagogy: docs/semester-3/gicp-400/unit-07/topic-01.mdx:90 has a class publicly discuss a named pupil's alleged theft, which risks the dignity the unit teaches. docs/semester-3/gicp-400/unit-07/topic-01.mdx:92 says the teacher explains Article 25A and then that the teacher does not lecture about rights, and assumes a teacher can arrange a personal timetable. docs/semester-3/gicp-400/unit-07/topic-01.mdx:74 omits Balochistan in a passage about every province being included.
- [advisory] coverage trace: coverage/unit-07.md lists U7-03 evidence as MCQs 8-10 but its closing paragraph says MCQs 7-10; MCQs 8 and 9 and RRQ 6 test civic education, not teacher responsibility; RRQ 3 is claimed by both U7-01 and U7-02. The concept graph has the same looseness.
- [advisory] figures: figures appear in the order U7-1, U7-3, U7-2. fig-U7-3 arrowheads land on the centre box corners. The tracker says the banner is prompt-only, but specs/content/gicp-400/figures/ has no unit-07.banner.md although units 1-6 do (G6, not G3).
- ...and 4 more in the report.

## Notes from earlier jobs on this unit
- (gicp-400-u07-translate, translate, codex) English repairs and the owner’s ideology ruling must precede translation.
- (gicp-400-u07-translate, translate, codex) English repairs and the owner’s ideology ruling must precede translation.
- (gicp-400-u07-review_en, review_en, claude) Repair needs the actual Dean text (ecommons.aku.edu PDF) and Kennedy text (mdpi.com/2227-7102/2/3/121); do not reuse `sources/texts/dean-2005-citizenship.md`, whose second paragraph is the root of the misattribution.
- (gicp-400-u07-review_en, review_en, claude) The Article 251 fix also touches the `fig-U7-3` label and dark variant plus RRQ 5 and 7 models, and `fig-U7-1` needs its label moved; run `measure-figure-text` where Chromium is allowed.
- (gicp-400-u07-review_en, review_en, claude) The ideology strand awaits an owner ruling; browser and A4 inspection are still outstanding, and this was review round 1 of ADR-0019's limit of 2.


## Response snapshot

Repaired GICP-400 Unit 7 per the latest G3 report findings by restating verified Dean and Kennedy source claims, teaching Article 251(3) permissively with Article 28 language rights and Articles 4/10A due process, excising the 1971 causal claim, resolving rubric/scenario/pedagogy issues, moving fig-U7-1's label clear of its path, reconciling coverage and concepts, creating the unit banner manifest, and refreshing G2 evidence.

## Outcome

- Impact: repair_en for GICP-400 Unit 7 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired GICP-400 Unit 7 per the latest G3 report findings by restating verified Dean and Kennedy source claims, teaching Article 251(3) permissively with Article 28 language rights and Articles 4/10A due process, excising the 1971 causal claim, resolving rubric/scenario/pedagogy issues, moving fig-U7-1's label clear of its path, reconciling coverage and concepts, creating the unit banner manifest, and refreshing G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The ideology strand remains pending an owner ruling before translation (G4) or final certification.
  - G3 tracker row is appended as advisory revise with repairs applied and remains unticked (▢) awaiting fresh round-2 independent review under ADR-0019.
  - All 14 content gates pass and `measure-figure-text.mjs` passes with zero errors on all modified SVG variants.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
