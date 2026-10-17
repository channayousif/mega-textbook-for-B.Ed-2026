---
id: 0143
title: EFMP-305 Unit 5 EN authoring, statutes retrieved in full
stage: misc
date: 2026-10-15
surface: agent
model: claude-opus-5
feature: efmp-305
branch: agent/TEX-39
user: channayousif
command: paperclip heartbeat (BilingualAuthor, TEX-77)
labels: ["BilingualAuthor", "efmp-305", "G2", "authoring", "statute", "primary-sources", "D-2026-0053"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: TEX-77
  adr: null
  pr: "119"
files:
 - docs/semester-2/efmp-305/unit-05/index.mdx
 - docs/semester-2/efmp-305/unit-05/topic-01.mdx
 - docs/semester-2/efmp-305/unit-05/topic-02.mdx
 - docs/semester-2/efmp-305/unit-05/topic-03.mdx
 - docs/semester-2/efmp-305/unit-05/unit-assessment.mdx
 - docs/semester-2/efmp-305/unit-05/unit-teacher-notes.mdx
 - specs/content/efmp-305/coverage/unit-05.md
 - specs/content/efmp-305/sources/unit-05.md
 - specs/content/efmp-305/sources/texts/sindh2018.md
 - specs/content/efmp-305/sources/texts/ict2020.md
 - specs/content/efmp-305/sources/texts/nep2009.md
 - specs/content/efmp-305/concepts/unit-05.md
 - specs/content/efmp-305/figures/unit-05.md
 - specs/content/efmp-305/tasks.md
tests:
 - npm run validate:content (PASS)
 - npm run check:depth-gate (PASS)
 - npm run check:concept-graph (PASS)
 - npm run check:no-answer-keys (PASS)
 - npm run check:no-em-dash (PASS)
 - npm run check:bloom-bands (PASS)
 - npm run check:source-floor (PASS)
 - npm run check:licence, licence:map:check, check:docs-sync (PASS)
 - npm run check:content-status (PASS after regenerating the git-ignored static/content-status.json)
 - npm run check:figures (4 expected prompt-only findings for this unit; 467 -> 471 repo-wide, so this unit adds no new defect; corpus debt is TEX-61)
 - npm run check:pipeline-gate (red for EFMP-305 Units 1-5 by design while G2 rows sit at the in-progress marker)
 - scripts/heavy.sh npm run build (PASS, en and ur; all six unit-05 routes emitted in both locales)
---

## Prompt

Paperclip issue TEX-77 (child of TEX-69, branch `agent/TEX-39`, PR #119). Do not open a new branch
or PR.

Author **EFMP-305 Unit 5, "Policies and Legal Framework in Pakistan"** in English, to the Spec 008
v3.0 per-topic layout. This is the course's longest and most legally sensitive unit. Follow
`specs/content/efmp-305/content-spec.md`, `## Unit 5`; do not edit that file or the units 1-2
governance files, which are bound inputs to the approved `D-2026-0065` intake manifest. Weeks 10-13;
5 sub-topics (U5-1..U5-5); topics and figure plan exactly as the approved spec lists them; hit the
declared depth band.

**The statute question.** Owner ruling `D-2026-0053` item 7 is binding. The guide names only "Rights
of Persons with Disabilities Act (2018)". This course teaches the **Sindh Empowerment of Persons
with Disabilities Act, 2018**, because that is the law in force for the Sindh teachers this book is
written for, with a **short comparison** to the federal **ICT Rights of Persons with Disabilities
Act, 2020** so a reader who meets the federal Act elsewhere can place it. The comparison is one
passage and one figure, not a second topic.

**Source discipline, the hard constraint.** This unit makes claims about what legal documents
require, and bibliographic-level support cannot carry that. At least two of `sindhEPWD2018`,
`ictRPWD2020` and `nep2009` must be **retrieved and read**, not merely named, before the prose
asserts what any of them requires. If the gazette or policy text cannot be retrieved from this
host, do not write what the Act says: write what is verifiable, flag the gap, and raise it to CEO.
Fabricating or paraphrasing an unread statute is the single worst failure available on this course.
Name the NEP edition explicitly (2009); mention the National Education Policy Framework 2018 for
currency but do not analyse it. No section-number recitation in assessment items.

Deliverables: `docs/semester-2/efmp-305/unit-05/` (`index.mdx`, one `topic-NN.mdx` per spec topic
row, `unit-assessment.mdx` with 10/10/5 + band rubrics + bounded answers last,
`unit-teacher-notes.mdx`) plus `coverage/unit-05.md`, `sources/unit-05.md`, `concepts/unit-05.md`,
`figures/unit-05.md`, and the `tasks.md` G2 row moved to the in-progress marker (G1 rows left
alone).

Standards: follow `docs/semester-2/efmp-305/unit-03/` as the model. Teach "reasonable
accommodation" carefully - it is the most misunderstood term in the course and the misunderstanding
(that cost alone decides) is what denies children school places. Keep the policy-to-practice gap
analytical, not cynical; end on what the reader can do. Gate notes: `Analyze` not `Analyse`;
`description` <= 200 chars; same-unit `Prerequisites` only; one topic per MCQ/RRQ; include an
`## Unverifiable sources` section. Verify with `npm run check:content` and
`scripts/heavy.sh npm run build`. PHR with Handoff, then `in_review` to CurriculumOwner.

## Response snapshot

Authored the unit as six learner-facing files and seven governance files on `agent/TEX-39`.

**All three primary documents were retrieved in full and read before a word of prose was written.**
That is the finding that matters most about this run, because the issue permitted writing only what
was verifiable if retrieval failed.

- `sindh2018`: the Sindh Empowerment of 'Persons with Disabilities' Act, 2018 from the Government of
  Sindh Department of Empowerment of Persons with Disabilities page (HTTP 200), about 10,600 words of
  statute text, sha256 `111f17ba0208ba4443201d7b73671734068f06b477b41e82a2ff0f2d1b8d7b0c`.
- `ict2020`: the gazette text of the ICT Rights of Persons with Disability Act, 2020, 17 pages, via
  the Asian Development Bank Law and Policy Reform portal, sha256
  `4ab8e6715a25d279339b65afdbccac86ca513ead786b6ab86c8c4b9b4704af65`.
- `nep2009`: the National Education Policy 2009, 71 pages, UNESCO NEQMAP-hosted PDF, sha256
  `a8c0b3732fc0c25804e54391fa9995bf6c9fc6e2cd54bd40f0b72c79642ce7da`.

Each is committed as a verification excerpt under `specs/content/efmp-305/sources/texts/`, carrying
the retrieval URL, the checksum, a transcription note (the gazette's em dashes are written as a
spaced hyphen because `check:no-em-dash` forbids U+2014 under `specs/content/`), the quoted passages
the unit relies on, and an explicit "what this settles / what it does not settle" section. Every
quotation in the unit's prose is taken from those files. No claim about what a document requires
rests on a secondary account anywhere in this unit.

**The unit.** One case runs through it: Bilal, a seven-year-old deaf boy in a village in Tando
Muhammad Khan, refused admission by Mr Soomro, a head teacher who is not unkind, in a province where
the Act had been in force for three years.

Topic 5.1 separates a policy from an Act, quotes the 2009 policy's two inclusion commitments and its
equity action in full, and then enumerates the silences: no definition of inclusive education, no
chapter, no duty on a school, no disability disaggregation in its own equity annex, no accountability
mechanism, no mention of accommodation. It teaches a reusable four-question reading (addressee,
verb, mechanism, absence), places the policy in sequence against the 1981 Ordinance, the UNCRPD and
the 18th Amendment, audits Mr Soomro's school against the three policy actions, and ends with the
three uses the policy still has. The "two sentences" claim about the policy's inclusion content is a
claim about absence, so the excerpt file records the reproducible search that establishes it.

Topic 5.2 is the core. It reads the Act's long title, extent and dates, then spends its first third
on four definitions: person with disabilities (the social model in statutory language), inclusive
education (learning together **and** "suitably adapted", which is what makes Units 3 and 4 legally
relevant), discrimination ("purpose or effect", and "includes all forms of discrimination, including
denial of reasonable accommodation"), and reasonable accommodation, broken into its four parts.
Reasonable accommodation gets its own section, with the budget misreading dismantled three ways and
eight free accommodations for a deaf child in a crowded Grade 1, followed by the limits of
accommodation and an honest paragraph on what genuinely does cost money. Then the ten section 9
duties with what each means in a village school, the section 9(2) measures including the examination
accommodations Sindh law already names (extra time, a scribe, exemption from second and third
language courses, age relaxation), answers to the head teacher's three objections, the owner-
sanctioned federal comparison kept to one passage and one figure, the five-responsibility audit, and
a seven-step worked admission and accommodation decision costing a sheet of chart paper and about
ninety minutes.

Topic 5.3 redefines a teacher's attitude as the pattern of her small decisions rather than a survey
answer, reports what Pakistani teacher-attitude studies find with their scope stated, works the
attitude-action cycle through a girl who is never asked to read aloud, names the two points at which
the cycle can be interrupted (a declared duty enters at the decision; contact with a pupil
succeeding enters at the evidence), and replaces "good policies, no implementation" with a
four-level gap method (document, system, school, classroom). It ends on what the reader can do:
four things move a case and three of them are free.

**Non-prose elements.** Six figures to the v3 `Kind` vocabulary, all `prompt-only`, manifest rows
generated from the markers by script so prompt and alt text match byte for byte: `fig-U5-1` timeline
(six milestones with the 18th Amendment as a dividing line), `fig-U5-2` table (policy against statute
on the same four questions), `fig-U5-3` table (the owner-sanctioned two-Act comparison across eight
school-facing questions), `fig-U5-4` concept-map (five branches of school duty plus a side box of
what the Government owes the school), `fig-U5-5` diagram (the attitude-action cycle with two
intervention arrows), `fig-U5-6` table (nine gaps by level with the teacher-level action). Plus three
activities: the four-question policy audit with a peer deflection check, the section 9 audit and a
three-role admission role-play in which an observer marks every citation accurate or inaccurate, and
a private reservation task with explicit tutor safeguards in the teacher notes.

**Sources.** Nine keys. Three primary texts retrieved in full and bound as excerpts. Four
registry-verified open-access rows checked against both the Crossref REST API and the OpenAlex API
on 2026-10-15 for metadata and licence: `parveen2022` (CC BY-NC, 191 pre-service teachers in
Lahore), `virani2022` (CC BY, fifteen primary teachers), `anis2025` (CC BY, a validated Pakistani
attitude instrument), `ainscow2020b` (CC BY-NC, which meets the floor). Two URL-only rows,
`unCRPD` and `unesco2020`, carrying framing claims only. The four verified rows were read at
abstract level only and every one of them says so in its own row and in the
`## Unverifiable sources` declaration, with the sample and setting stated in the prose beside the
finding.

## Outcome

- ✅ Impact: EFMP-305 Unit 5 drafted at G2 in English, 19,000 words across three topics, with all three primary legal and policy documents retrieved in full, read, quoted and bound as checksummed excerpts. The hard source constraint asked for two of three; all three were obtained.
- 🧪 Tests: 11 of 13 content gates pass. `check:figures` adds exactly the 4 expected prompt-only findings for this unit (467 -> 471 repo-wide), `check:pipeline-gate` is red for EFMP-305 Units 1-5 by design. Full `npm run build` passes in both locales and emits all six unit-05 routes.
- 📁 Files: 14 changed (6 new MDX, 3 new bound source excerpts, 4 new governance files, `tasks.md`), plus the git-ignored `static/content-status.json` regenerated.
- 🔁 Next prompts: G3 EN review (fresh `g3-reviewer` session), then G4 Urdu mirror, then G6 figure rendering (6 figures, two of them the unit's Art. III.10 schematics). Unit 6 EN authoring remains unstarted.
- 🧠 Reflection: retrieving the statutes changed the unit rather than merely sourcing it. Three things in the prose exist only because the text was read: the "shall endeavor" / flat-prohibition distinction, which is the honest answer to the head teacher's strongest objection; the fact that the Act's definition of discrimination names denial of accommodation inside itself, which is the sentence the whole unit turns on; and the discovery that the 2009 policy's inclusion content is two sentences in seventy-one pages, which turned a summary paragraph into the topic's pedagogical point. A bibliographic citation would have produced a plausible, confident and partly wrong unit.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-305 Unit 5 EN draft (`docs/semester-2/efmp-305/unit-05/`, 6 files, about 26,000 words including the assessment and teacher notes) with its coverage matrix, sources list, 28-concept graph, 6-row figure manifest, and **three committed full-text verification excerpts** at `specs/content/efmp-305/sources/texts/`. `tasks.md` Unit 5 G2 row moved to the in-progress marker. Pushed to `agent/TEX-39` (PR #119). No spec file was edited, so the `D-2026-0065` intake manifest is untouched.
- Decisions the team must respect: (1) **The three primary texts are bound with checksums and are no longer "unverifiable"** - `sindh2018`, `ict2020` and `nep2009` are deliberately excluded from the `## Unverifiable sources` list for this unit, and a reviewer can check every statutory claim offline from `sources/texts/`. Do not re-add them to that list. (2) `parveen2022`, `virani2022`, `anis2025` and `ainscow2020b` were verified for metadata and licence only against Crossref and OpenAlex on 2026-10-15; **no full text was retrieved** and the bound claims come from abstracts, which every row states. They must never be cited for a number or for national prevalence. (3) **Amendments, rules, notifications and case law were not checked** on either statute; the sources file and the teacher notes both say so, and the teacher notes tell the tutor to check the Department's page before relying on a provision in a real case. If the owner wants the amendment history established, that is a separate legal-research task. (4) The 26 authored Urdu concept labels in `concepts/unit-05.md` are proposed for banking, not written into `terminology.csv`. Six of them render **statutory** terms, and the concept file carries a non-optional instruction to the G4 translator: keep the English term in parentheses on first use, and never paraphrase a quoted statutory clause - carry a faithful translation **and** the English words, because Topic 5.2's argument turns on the wording of one clause. (5) Statute framing follows `D-2026-0053` item 7 exactly: the Sindh Act is the law taught, the federal ICT Act is confined to one passage and one figure, and the unit tells trainees three times not to cite the federal Act in Sindh. (6) `check:pipeline-gate` is red for EFMP-305 Units 1-5 while their G2 rows are in progress - expected, do not merge to clear it.
- Pending / next owner: CurriculumOwner holds the G2 content-gate review ([TEX-77](/TEX/issues/TEX-77), `in_review`). G3 EN review needs a fresh `g3-reviewer` session and should be adversarial rather than bibliographic on this unit: check that the prose never upgrades "shall endeavor" into an absolute duty, never attributes a federal provision to Sindh, and never states an implementation fact the excerpts disclaim. G6 figure rendering for Unit 5 (6 figures) is unstarted and is covered by [TEX-79](/TEX/issues/TEX-79) for units 1-3. EFMP-305 Unit 6 EN authoring remains unstarted under [TEX-69](/TEX/issues/TEX-69).
- Paperclip issues affected: [TEX-77](/TEX/issues/TEX-77) (this unit, to `in_review`), [TEX-69](/TEX/issues/TEX-69) (parent, EFMP-305 full authoring), [TEX-58](/TEX/issues/TEX-58) (Semester 2 coordination), [TEX-79](/TEX/issues/TEX-79) (EFMP-305 G6 figure rendering, which now has six more figures to render), [TEX-61](/TEX/issues/TEX-61) (the pre-existing corpus-wide `check:figures` desc/alt debt that keeps the repo-wide gate red; this unit adds none of it).
