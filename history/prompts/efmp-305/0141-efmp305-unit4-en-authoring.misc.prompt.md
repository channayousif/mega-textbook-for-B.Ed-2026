---
id: 0141
title: EFMP-305 Unit 4 EN authoring
stage: misc
date: 2026-10-15
surface: agent
model: claude-opus-5
feature: efmp-305
branch: agent/TEX-39
user: BilingualAuthor (Paperclip agent)
command: Paperclip heartbeat, issue TEX-76
labels: ["BilingualAuthor", "efmp-305", "unit-04", "g2-en-draft", "content"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: TEX-76
  adr: null
  pr: "119"
files:
  - docs/semester-2/efmp-305/unit-04/index.mdx
  - docs/semester-2/efmp-305/unit-04/topic-01.mdx
  - docs/semester-2/efmp-305/unit-04/topic-02.mdx
  - docs/semester-2/efmp-305/unit-04/unit-assessment.mdx
  - docs/semester-2/efmp-305/unit-04/unit-teacher-notes.mdx
  - specs/content/efmp-305/coverage/unit-04.md
  - specs/content/efmp-305/sources/unit-04.md
  - specs/content/efmp-305/concepts/unit-04.md
  - specs/content/efmp-305/figures/unit-04.md
  - specs/content/efmp-305/tasks.md
  - static/content-status.json
tests:
  - npm run validate:content (pass)
  - npm run check:depth-gate (pass)
  - npm run check:concept-graph (pass)
  - npm run check:bloom-bands (pass)
  - npm run check:source-floor (pass)
  - npm run check:no-em-dash (pass)
  - npm run check:no-answer-keys (pass)
  - npm run check:docs-sync (pass)
  - npm run check:content-status (pass, after build:content-status)
  - npm run check:figures (3 expected prompt-only findings for this unit; pre-existing corpus debt elsewhere, TEX-61)
  - npm run check:pipeline-gate (red for EFMP-305 Units 1-4 by design while G2 rows are in progress)
  - scripts/heavy.sh npm run build (pass, en and ur)
---

## Prompt

Paperclip issue TEX-76 (child of TEX-69, branch `agent/TEX-39`, PR #119):

Author **EFMP-305 Unit 4, "Creating an Inclusive Classroom Environment"** in English, to the
Spec 008 v3.0 per-topic layout. `content-spec.md` is `status: approved` (third intake
`D-2026-0065`); do not edit it, nor `coverage/unit-01..02.md`, `sources/unit-01..02.md`,
`concepts/unit-01..02.md`, `figures/unit-01..02.md`. Per the approved spec: Weeks 8-9; 5
sub-topics (U4-1..U4-5); 2 topics (4.1 Managing an inclusive classroom, U4-1/U4-5; 4.2
Accessibility, aids and arrangement, U4-2/U4-3/U4-4); 4 figures; hit the declared depth band.

Deliverables: `docs/semester-2/efmp-305/unit-04/` (`index.mdx`, `topic-01.mdx`, `topic-02.mdx`,
`unit-assessment.mdx` with 10/10/5 + band rubrics + bounded answers last, `unit-teacher-notes.mdx`)
plus `coverage/unit-04.md`, `sources/unit-04.md`, `concepts/unit-04.md`, `figures/unit-04.md`, and
the `tasks.md` G2 row moved to `▣` (G1 rows left alone).

Standards: follow Unit 3 as the voice/structure/depth model. Pakistani classroom first - this unit
is about rooms teachers cannot structurally change (40-60 pupils, fixed benches, one door), so the
value is what can change: seating, routes, routines, light, noise, where the teacher stands. State
costs in rupees. Bind at least one registry-verified open-access source, verified against
Crossref/OpenAlex/DOAJ by the author, with registry and ISO date in the row; never claim a
verification not made; record scope cautions; include an `## Unverifiable sources` section.
Concept-graph prerequisites must be concepts in the same unit, cross-unit dependencies in prose,
each MCQ/RRQ cited by concepts in only one topic. `description` <= 200 characters. Bloom tags use
`Analyze`. Verify with `npm run check:content` and `scripts/heavy.sh npm run build`;
`check:figures` prompt-only findings for this unit are expected until G6. Leave a PHR, then set
the issue `in_review` and hand to CurriculumOwner.

## Response snapshot

Authored the unit as five learner-facing files and four governance files, on `agent/TEX-39`.

**The unit.** One room runs through both topics: Room 4, Government Girls Primary School, Tando
Allahyar - Grade 3, 58 pupils, 15 fixed benches, one inward-opening door with a six-inch step,
three east windows, morning glare on the left half of the board. Six named pupils recur (Rameen,
crutch; Shabana, low vision; Komal, hearing loss on the left; Hina, leaves her seat at minute
twelve; Zoya, silent since March; Saba, building Urdu).

Topic 4.1 opens with the headmistress praising a silent class, then shows the same ten minutes from
inside the room, and uses that gap to separate observation from inference. It defines classroom
management as what makes learning possible for *every* pupil, names the "management means keeping
everyone quiet" misconception, distinguishes productive from disruptive noise, teaches positive
behaviour support in three steps (function, environment, taught behaviour), gives a seven-part
worked routine for a class of 58 costing about Rs 40 and one period, then turns to the fixed-bench
room: what can and cannot change, the "put the disabled child at the front" misconception worked
through four different barriers, the participation tally, drawing register numbers instead of taking
hands, the fortnightly seating cycle, and the teacher's dead zone.

Topic 4.2 opens with Rameen's seven-minute journey from the gate - mud, a broken drain slab, the
step, the inward door, a 40 cm aisle full of bags, a middle seat she cannot leave - and the fact
that she has stopped drinking water at school. It defines accessibility as four layers (route, room,
material, routine), names the "accessibility is only about ramps" misconception, gives a
fifteen-minute accessibility walk ending in three sorted lists (this week by me / this term with the
head teacher / not by me), covers the free physical changes (washed board, glare control, ear-and-eye
seating, brick footrest, register-on-a-brick slant board, an evacuation in which the slowest pupil
leaves first), defines a teaching aid by the test "does it carry the content", works a tactile number
line (about Rs 110, 20 minutes) and two routes to enlarged print, names the "assistive technology is
always expensive and electronic" misconception with a no-tech / low-tech / high-tech spectrum, costs
four pupils' solutions at about Rs 320 for the afternoon, states plainly what must not be improvised
(anything weight-bearing, anything prescribed), and ends with who owns which change and how to ask
in writing.

**Non-prose elements.** Four figures, specified to the v3 `Kind` vocabulary and recorded
`prompt-only`: `fig-U4-1` concept-map (the four elements of an inclusive classroom environment, with
a ring noting silence measures none of them), `fig-U4-2` table (six situations matched to what they
usually get, what they probably mean, the first change and its cost), `fig-U4-3` diagram (a
before-and-after plan of Room 4, same immovable benches, six placements changed), `fig-U4-4` table
(ten needs matched to aid, material, making time, rupee cost and who provides). Manifest rows were
generated from the markers by script so prompt and alt text match byte for byte. Plus two physical
activities: the participation tally and re-seating plan, and a make-one-aid-and-cost-it workshop
with a peer test.

**Sources.** Four registry-verified open-access bindings, each checked against both the Crossref
REST API and the OpenAlex API from this host on 2026-10-15 (metadata and licence; no full text
retrieved): `batool2023` (CC BY 4.0; Pakistani government primary teachers in Multan district on the
hurdles they face), `pham2025` (CC BY 4.0, diamond; seating zone and participation), `iriyani2025`
(CC BY-NC-ND 4.0, diamond; PBS in an inclusive school), `cote2021` (CC BY 4.0; assistive technology
access in low- and middle-income countries), plus `kurniawati2026` (CC BY 4.0, gold; physical access
alone is not sufficient). The two mapped readings `who2011` and `cast2024` have no registry record,
are labelled as verified by URL only, and are explicitly not counted toward the floor - so the
escalation to `specs/gaps.md` the reading list anticipated for Unit 4 is not needed. Every row
carries a scope caution; the rupee prices are labelled author estimates and are explicitly not bound
to any source.

## Outcome

- ✅ Impact: EFMP-305 Unit 4 drafted at G2 in English, 5 learner files + 4 governance files, open-access floor met with four verified bindings instead of the anticipated escalation.
- 🧪 Tests: 9 content gates pass; `check:figures` shows only the 3 expected prompt-only findings for this unit; `check:pipeline-gate` red for Units 1-4 by design; full `npm run build` passes in both locales.
- 📁 Files: 11 changed (5 new MDX, 4 new governance files, `tasks.md`, regenerated `static/content-status.json`).
- 🔁 Next prompts: G3 EN review (fresh `g3-reviewer` session), then G4 Urdu mirror, then G6 figure rendering (4 schematics, Claude-owned under ADR-0024/0029).
- 🧠 Reflection: the unit landed at exactly 150 reading-minutes, the ceiling of its 120-150 band, because the two topics ran 12,282 words against an allocation of roughly 11,000. Nothing was padded or trimmed to hit the number; the band is the thing that should move if the owner agrees the depth is right.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-305 Unit 4 EN draft (`docs/semester-2/efmp-305/unit-04/`, 5 files, about 18,000 words) with its coverage matrix, sources list, 20-concept graph and 4-row figure manifest; `tasks.md` Unit 4 G2 row moved to `▣`; `static/content-status.json` regenerated. Pushed to `agent/TEX-39` (PR #119). No spec file was edited, so the `D-2026-0065` intake manifest is untouched.
- Decisions the team must respect: (1) Unit 4's open-access floor is met by `batool2023`, `pham2025`, `iriyani2025` and `cote2021`, all Crossref- and OpenAlex-verified on 2026-10-15 for metadata and licence only - no full text was retrieved and no row supports a quotation or page-specific claim. (2) `who2011` and `cast2024` remain URL-verified only and do not count toward the floor. (3) Every rupee figure in the unit is an author's indicative 2026 Sindh estimate, labelled as such, deliberately unsourced, and must not acquire a citation at G2. (4) The 19 authored Urdu concept labels in `concepts/unit-04.md` are proposed for banking, not written into `terminology.csv`; the G4 translator must use them rather than inventing alternatives. (5) `check:pipeline-gate` is red for EFMP-305 Units 1-4 while their G2 rows sit at `▣` - expected, do not merge to clear it.
- Pending / next owner: CurriculumOwner holds the G2 Content-gate review ([TEX-76](/TEX/issues/TEX-76), `in_review`). Depth band re-baselining for Unit 4 (150 min against a 120-150 band) is an owner call. G3 EN review needs a fresh `g3-reviewer` session. G6 figure rendering (4 schematics) is unstarted. Unit 5 and Unit 6 EN authoring remain unstarted under [TEX-69](/TEX/issues/TEX-69).
- Paperclip issues affected: [TEX-76](/TEX/issues/TEX-76) (this unit, to `in_review`), [TEX-69](/TEX/issues/TEX-69) (parent, EFMP-305 full authoring), [TEX-58](/TEX/issues/TEX-58) (Semester 2 coordination), [TEX-61](/TEX/issues/TEX-61) (the pre-existing corpus-wide `check:figures` desc/alt debt that makes the repo-wide gate red; this unit adds none of it).
