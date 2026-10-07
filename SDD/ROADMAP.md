# ROADMAP & ARCHITECTURE OVERVIEW

## Platform Vision *(board direction, 2026-10-07)*

The project is envisioned as a **collection of textbooks and a learning management system (LMS)** for
two audiences:

1. **Grades 9-12** — school subjects, bilingual (English + Urdu), for students and their teachers.
2. **Teacher-education degree programmes** — ADE and B.Ed (Hons), for prospective teachers and their
   instructors, including a teaching-licence track.

**Current state:** an MVP targeted at prospective teachers (ADE/B.Ed students) and their teachers.
The B.Ed (Hons) corpus described in this roadmap is that MVP. Grade 9-12 subject tracks and the ADE
programme are the next expansion — the architecture (static book + signed-in LMS, self-hosted
Supabase, bilingual EN/UR) is built to carry both.

This roadmap documents the B.Ed (Hons) content pipeline, the platform architecture, and the
decisions that govern both. Sections that are B.Ed-specific (corsemester structure, course codes,
the licence overlay) are flagged as such and are expected to be joined by parallel Grade 9-12 and
ADE structures as those tracks are authored.

> **Revision 2026-09-20.** Phases 1-4 are delivered. Phase 5 (content) is live and has changed
> shape: the measurement this roadmap asked for was run, it **refuted the plan it was meant to
> calibrate**, and the publication model was rebuilt around the result. Publication no longer
> waits on certification (ADR-0026, Constitution **v5.0.0**). Content went from 2 publishable
> units to 7 and from 29k to 91k English words. Sections marked **[open]** still need an answer.
>
> **What the measurement found.** Six EFMP-302 units were authored and taken through agent
> review. **One** reached a passing review, after four to seven cycles each against ADR-0019's
> limit of two. The binding constraint was never authoring throughput and never certification
> hours - it was that review kept finding real defects, and repairs kept introducing new ones.
> The sections below that assumed a 15-units-per-week pipeline gated on certification are
> superseded; they are kept, struck through in prose, because the reasoning that produced them
> is what the correction has to answer to.
>
> **Previous revision: 2026-09-12.** Licence-overlap content priority, two-stage bilingual review
> pipeline, independent market posture, style guide v4.0. Those decisions still stand except
> where ADR-0026 supersedes them.

## System Architecture (one picture in words)

```
┌───────────────────────────────────────────────────────────────┐
│  Docusaurus site  (static, self-hosted: nginx → apache2)      │
│  ├── /docs/...            textbook EN                         │
│  ├── /ur/docs/...         textbook UR (RTL)                   │
│  ├── /licence/...         licence track, 3rd docs instance    │
│  ├── /app/login|signup    auth pages (React, Spec 002)        │
│  ├── /app/dashboard/*     student dashboard (Specs 004, 011)  │
│  ├── /app/classes/*       classes, assignments, gradebook     │
│  ├── /app/teacher/*       teacher dashboard (Specs 005, 011)  │
│  └── /app/admin/*         moderation, feedback queue, audit   │
│         │  supabase-js (anon key + RLS)                       │
└─────────┼─────────────────────────────────────────────────────┘
          ▼
┌───────────────────────────────────────────────────────────────┐
│  Supabase, self-hosted on the same VPS (ADR-0006,              │
│  nginx → Kong:8000 - Docker Compose, not Supabase Cloud)       │
│  ├── Auth: Google OAuth + email/password (mail via a           │
│  │         transactional relay - Resend/SES, not local exim)   │
│  ├── Postgres + Row-Level Security (45 migrations)             │
│  ├── Storage: submissions/ bucket                              │
│  └── Edge functions: achievements, exports                     │
└───────────────────────────────────────────────────────────────┘

Content repo (Git) ── CI ──> 11 content gates ──> build EN+UR ──> deploy
                        └──> unit-sync script ──> upsert `units` table

  Deploy is PULL-based: a cron on the VPS polls origin/main and deploys only a
  CI-green SHA (scripts/deploy-prod.sh). While Actions minutes are exhausted it
  accepts a local-CI attestation instead - see the operational note below.
```

**Why this shape:** the book stays a fast, free, version-controlled static site (Constitution Art. V); everything private or personal sits behind database RLS. One domain, one product feel, two cleanly separated concerns. If dashboards ever outgrow embedded pages, they can move to a standalone app without touching the book.

## Where the project actually stands (2026-09-20)

Measured from the working tree, not from the site's own claims.

| | 2026-09-12 | **2026-09-20** |
|---|---|---|
| Units published | 2 | **7** - 2 certified, 5 gate-checked |
| Thin legacy units | 5 (`EFMP-302` U2-U6, ~1,200 words) | **0** - all re-authored, 12.5k-15.3k words each |
| Textbook content | 29,314 EN words | **91,021 EN words** · 31,364 UR |
| Courses in `catalog/courses.json` | 13 | 15 (incl. the licence track) |
| Migrations · specs · ADRs | 42 · 14 · 24 | **45 · 17 · 27** |
| Content gates | 8 | **11** (17 in the full tier) |
| Reviewed Urdu mirrors | 1 | 1 (`EFMP-302` U1) - unchanged, see ADR-0022 |

**Publication tiers** (Constitution Art. VII.7 as amended by ADR-0026):

| Tier | Units | Reader-facing notice |
|---|---|---|
| `certified` | 2 - `EFMP-301` U1, `EFMP-302` U1 | none |
| `gated` | 5 - `EFMP-302` U2-U6 | "Draft - expert review pending" |
| `provisional` | 0 | "Final Review Pending" |

`EFMP-302` U3 briefly held `provisional`, then lost it to Art. VII.4 when the reviewer rubric
changed - the freshness rule working as designed, not a regression.

### Governance artefacts added since the last revision

- **`specs/decisions/log.md`** - 16 decisions under stable `D-YYYY-NNNN` codes, 12 confirmed and
  **6 pending owner review**. The counterpart to `specs/gaps.md`: that log records questions
  escalated *to* the owner, this one records decisions taken *on their behalf*.
- **`specs/gaps.md`** - 18 entries, **1 open** (`G-2026-16`).
- **Constitution v5.0.0** (was v4.0.0). Art. VII.7 rewritten, Art. VII.8 added.

### Corpus size, settled from the course guides *(2026-09-12)*

The board scheme's summary table abbreviates the electives as repeated placeholders
(`EFSP-5--` twice, `EFSP-6--` four times), which made the corpus look smaller than it is. **The
eight semester course guides name and fully specify them.** `EFSP-664`, for example, carries a
complete syllabus with description and learning outcomes. They are not pending allocation.

Counted from the guides in `Scheme-and-Course-guides/extracted-text/`:

| | Count |
|---|---|
| Distinct course codes across the 8 semester guides | **74** |
| Non-elective courses | 40 |
| `EFSP-` specialization electives | 34 |
| Practicum with no textbook to write | 5 |

The five practicum courses are `EFPC-411` School Observation, `FDEX-560` Internship, `ETPC-612`
Teaching Practice I, `EFPC-628` Practice Teaching II and `CPPR-650` Capstone Project. The guides
give these the concrete codes the scheme table left as `--` placeholders.

**Three authorable-corpus figures, depending on elective policy:**

| Scope | Courses | Units at 6/course |
|---|---|---|
| Core only (no electives) | **35** | ~210 |
| Core + one specialization track | **41** | ~246 |
| Complete, every elective offered | **69** | ~414 |

A student takes six electives from one track; an institution offering every track needs all 34.
**[open] Elective policy** is therefore a real content decision, not a counting artefact: it moves
the corpus by 34 courses. The Semesters I-IV priority window is unaffected either way, since the
electives all fall in Semesters V-VIII: **27 courses, about 162 units**, less `EFPC-411`.

This closes the 48-vs-57 question. Neither figure was the corpus. 48 is rows in the scheme's
summary table, ~57 was a looser scan, and 74 is what the guides actually specify. The scheme
document's codes are not machine-countable in any case: it writes `GNAS- 401`, `GENG 300`,
`GICT - 300`, `GUHQ - 301` and bare `EFSP-` in the same table, so every automated count of that
file differs. **Count from the guides, not from the scheme summary.**

**[open] Ten guide codes are absent from the appendix**, beyond the five discrepancies already
closed in `specs/gaps.md`: `EFPC-411`, `EFPC-628`, `ETPC-612`, `EFPG-402`, `EFPG-504`, `GETH-401`,
`GNAS-401`, `GPKS-302`, `GUHQ-401`, `GUHQ-402`. Some are the guide-side spelling of an
already-resolved gap (`GNAS-401` vs `GNAS-301`, `GPKS-302` vs `GPKS-402`, `GUHQ-401/402` vs
`GUHQ-301/400`); `EFPG-402` and `EFPG-504` appear to be genuinely missing from the summary table;
and `ETPC-612` carries a prefix used nowhere else, which is probably a typo for `EFPC-612`.
Raise these as new `specs/gaps.md` entries and resolve them the same way the first five were.

## Build Order & Phases

| Phase | Specs | Outcome | Status |
|---|---|---|---|
| 0 | Constitution + specs | Approved foundation | ✅ done |
| 1 | 001 | Bilingual site live, 8-semester scaffold, golden unit | ✅ done, 2026-07-19 |
| 2 | 002 | Auth, self-selectable roles, verified-teacher gate | ✅ done |
| 3 | 003 | Classes, assignments, submissions, grading | ✅ done |
| 4 | 004 + 005 | Both dashboards + suggestion loop | ✅ done |
| **5** | **006 + content** | **Semesters I-IV content through the pipeline** | **▣ live - 7 of ~156 units** |
| 6 | Backlog | Notifications, Sindhi locale, offline PWA, transcripts, parent view | future |

### Specs delivered outside this plan

Eight specs were built that appear in no phase above. Six of them rebuild the authoring standard.
Recording them so the next revision of this roadmap is not surprised by them again:

| Spec | What | Kind |
|---|---|---|
| 007 | Content depth standard, `author-unit` skill, depth gate | authoring standard |
| 008 | Rich unit pedagogy, per-topic layout, figure markers | authoring standard |
| 009 | Figure rendering, `<Figure>`, manifest lifecycle | authoring standard |
| 010 | Curriculum-owner console, content feedback, self-assessment | app |
| 011 | Dashboard redesign, quiz authoring, student notes | app |
| 012 | Visual density standard, figure archetypes | authoring standard |
| 013 | Authoring system v2, colour/branding, generated standard prose | authoring standard |
| 014 | Agent review governance, signed evidence, reviewer registry | authoring standard |
| 015 | Licence content tree, third docs instance, `content-roots.mjs` | authoring standard |
| 016 | Concept graph v4, per-unit concept tables, `check:concept-graph` | authoring standard |
| 017 | The `reviewer` capability and its console surface | app |

Three more have landed since. That makes **nine of seventeen specs** authoring-standard work -
the pattern this roadmap flagged in its last revision, and it has not stopped. Style guide v4.0
was declared the last revision before a freeze; the standard is now at **v4.5**, and the freeze
condition (50 units) is still 43 units away.

## Phase 5 is the whole business, and it had no gate

The original estimate for Phase 5 was `~6-8 weeks/semester`, running in parallel from Phase 1.
At that rate Semester I (36 units) would have been complete by week 8. Two units exist.

| Phase 5 at the original rate | Projected | Actual |
|---|---|---|
| Semester I units by week 8 | 36 | 2 |
| Units per week | ~5.1 | 0.25 |
| Whole corpus at that rate | ~1 year | ~17 years |

The estimate was never re-checked because **Phase 5 had no gate that could fail**. Every
engineering phase had a spec, a task list, CI and a merge review. Content had a footnote.

### Why 0.25 understates the achievable rate *(owner note, 2026-09-12)*

The 0.25 figure covers a period in which content authoring and platform engineering ran as one
combined effort, so it measures a shared capacity rather than a content-only rate. It is the
right number for what Phase 5 actually delivered and the wrong number to plan the next phase
from. **Target rate: 15 units per week** once authoring runs as a dedicated track.

| Scope | Units | Weeks at 15/week |
|---|---|---|
| Semesters I-IV priority window | ~162 | ~11 |
| Core corpus, no electives | ~210 | ~14 |
| Complete corpus, every elective | ~414 | ~28 |

At that rate the corpus is a two-quarter problem rather than a multi-year one, which changes the
funding question and the institutional pitch entirely. It also sets a hard requirement on the
review side, which is where the target has to be proven.

### What 15 units per week requires ~~(superseded 2026-09-20)~~

The analysis below assumed certification was the binding constraint. **It was not**, and the
measurement is now in. Kept because the reasoning is what the correction has to answer to.

~~Authoring is agent-bound and plausibly scales. Certification does not scale the same way, and
after the 2026-09-12 decision it is a **single human `reviewer`** holding the G5 gate: 15
units/week is 3 bilingual certifications per working day, around 300,000 words of paired
bilingual text. At 1 hour per unit that works; at 3 hours it does not. **The whole target turns
on a number nobody has measured.**~~

### What the measurement actually found *(2026-09-20)*

Six `EFMP-302` units were authored and taken through agent review at G3. The result:

| | |
|---|---|
| Units authored | 6 |
| Units reaching a **passing** review | **1** |
| Review cycles spent | 6, 7, 4, 4 on Units 3, 4, 5, 6 - against ADR-0019's limit of **two** |
| Units parked with open findings | 3 |

**Certification hours were never the constraint.** Nobody ran out of reviewing time. What
happened is that review kept finding real defects, and repairs kept introducing new ones -
cycles five through seven on Unit 4 each surfaced *new* problems, several created by the
preceding repair. The loop was not converging, so more reviewer capacity would not have helped.

The defects were also not the kind a faster reviewer catches. Across the course, review found a
fabricated author attribution, a false accreditation claim, a fabricated `N=77` sample size, and
a figure teaching the wrong answer to its own MCQ. **All four passed every deterministic gate.**

Two conclusions, and they point opposite ways:

1. **Review is worth more than the plan assumed** - it is the only thing catching that class of
   defect, and the gates provably cannot.
2. **Review cannot sit on the publication path** - at one unit in six, gating publication on a
   passing review produces review debt, not a corpus.

ADR-0026 resolves the tension by separating them: publication rests on the deterministic gates,
review runs asynchronously and upgrades the reader-facing notice. **This is a real trade, not a
free one** - unreviewed content reaches students, and the banner is the entire mitigation.

### The rate question, reopened honestly

The 15-units-per-week target was never tested, because the pipeline never got far enough to test
it. What is now known:

- **Authoring** one unit at the v4.5 standard is roughly one session: 12.5k-15.3k words, four to
  five topics, eight to ten figure specs.
- **Figures are the unmeasured cost and they gate publication.** Art. III.10 requires >= 2
  rendered figures per topic; `check:figures` is inside `DRAFT_COMMANDS`, so figures block G2 and
  G2 now blocks publication. Roughly 700+ hand-authored SVGs across the corpus, main-session
  only. Measurement run 001 wrote 42 figure specs and rendered **zero** of them.
- **Review throughput is no longer on the critical path**, so it no longer sets the rate.

**[open] Phase 5 unit target** stays open, but the number to measure has changed: it is
**hours per authored-and-figured unit**, not hours per certification.

### The structural fix

1. **Phase 5 gets a failing gate like any other phase.** A named per-semester unit target with a
   review date. Missing it triggers a re-plan, not a silent slip. The 15/week target is the
   hypothesis this gate tests.
2. **Measure certification, not authoring.** The five-unit measurement's primary output is
   **hours per certification** through the new two-stage pipeline, not hours per draft. Authoring
   throughput is the easy half and the repositioning plan already puts it near one day per unit;
   review is the half that has never been timed and the half that binds.
3. **Run the measurement through the new pipeline.** It needs the `reviewer` role to exist and
   v4.0 to have landed, or it measures the old bottleneck at the old standard and misleads.
   Sequence: v4.0 → freeze → `reviewer` role → measure five units → set the Phase 5 target.
4. **Cost per mastered outcome** is the metric that says whether the authoring standard is
   economically survivable. Adopted as the north-star cost metric.

## Content priority: the licence overlay

**Owner decision, 2026-09-11:** sequence content by the intersection of the B.Ed scheme and the
Sindh teaching-licence / PST-JEST syllabus, not by semester order.

Rationale: "one curriculum, two outcomes - your degree and your licence" should be a checkable
claim rather than a marketing line. `specs/content/licence-blueprint.md` is what makes it
checkable, and building it changed the tiers below.

### Reconciled against the blueprint *(2026-09-12)*

The tiers first recorded here were derived from a weighting of **Pedagogical Content 50% ·
Content Knowledge 30% · Psychometric and Analytical Reasoning 20%**. That specification is **not
supported by any primary source**. STEDA's published sample paper gives:

| Type | Questions | Marks | Weightage |
|---|---|---|---|
| Extended Response (ERQ), case study | 1 | 100 | 25 |
| Constructed Response (CRQ) | 10 | 150 | 50 |
| Multiple Choice (MCQ) | 50 | 50 | 25 |

There is no psychometric or analytical-reasoning section at any weight. Two consequences follow,
and both change the ordering.

**Part I is not served by the B.Ed corpus at all.** The 25% MCQ block is assessed from the
*School Curriculum of Class one to eight*, not from the B.Ed scheme. `GQUR-*`, `GENG-*`,
`GNAS-301`, `GPKS-402` and `GICT-300` are university-level courses and do not cover it. **The old
Tier 2 rationale is void.** Covering Part I is a separate content line against the DCAR school
curriculum and a positioning decision, not something authoring B.Ed courses faster can fix.

**The corpus serves 75% of the paper, via constructed response.** Every CRQ and the ERQ carries a
published points rubric. The pipeline's existing 10 RRQ + 5 ERQ with rubrics is exactly that
format, and it is the part a printed MCQ guide serves worst.

### Tier 1 - highest licence-objective density

Ranked by Part II objectives carried, from the blueprint's mapping tables:

| Rank | Course | Semester | Licence load |
|---|---|---|---|
| 1 | `EFMP-408` Educational Assessment and Evaluation | IV | **16 objectives**, the largest single block |
| 2 | `EFMP-409` Foundations of Education | IV | 5 objectives + CRQ 2 + CRQ 8 |
| 3 | `EFMP-305` Inclusive Education | II | ERQ + CRQ 1 + CRQ 7, 3 objectives |
| 4 | `EFID-501` Human Growth & Development | V | 5 objectives, the whole Child Development block |
| 5 | `EFMP-303` Educational Policies and Plans of Pakistan | II | CRQ 5 + policy objectives |
| 6 | `EFMP-301` *(U1 built)* · `EFMP-302` *(U1 built)* | I | 5 authored-unit mappings, incl. CRQ 6 and CRQ 8 |

### Tier 2 - carries some Part II objectives

`GSOS-301` Social Science (5 objectives in School Community and Teacher) · `GCCE-400` Civics and
Community Engagement (CRQ 10) · `GICT-300` Application of ICT and `EFMP-406` Contemporary
Literacies (CRQ 9) · the `EFPG-*` pedagogy courses (instructional approaches, questioning,
cooperative learning, instructional planning / CRQ 3).

### The tension this creates, and how to resolve it

`EFMP-408` and `EFMP-409` are **Semester IV**; `EFID-501` is **Semester V**, outside the locked
Semesters I-IV priority window entirely. Meanwhile `EFMP-301` and `EFMP-302`, the courses already
under way, rank sixth. Pure licence ordering and the degree audience now point in opposite
directions:

- **Licence-first** serves candidates who are graduating or already graduated, and monetises
  soonest, but starts at the far end of the programme.
- **Degree-first** serves Semester I students, who are the users actually arriving on the site
  today, and completes the courses already begun.

**Recommended resolution: finish `EFMP-302` and `EFMP-301` first, then take Tier 1 from the top.**
Both are one unit into six, carry sunk content-spec, coverage-matrix, figure and terminology
setup, and already supply the authored coverage the blueprint records. Abandoning them mid-course
to start `EFMP-408` would leave two half-courses, which no institution can adopt and no candidate
can rely on, and would discard the only licence coverage that exists today.

After those two: `EFMP-408`, `EFMP-409`, `EFMP-305`, `EFMP-303`, then `EFID-501` - which requires
extending the priority window into Semester V, or accepting that one Tier 1 course waits.

**[open] Semester-window amendment.** Locked decision 3 restricts content priority to Semesters
I-IV. `EFID-501` is Semester V. Either amend the decision to "Semesters I-IV plus licence-ranked
courses beyond it", or drop `EFID-501` from Tier 1 and accept the Child Development gap.

`GENG-300` and `GENG-301` remain `bilingual: false` in `catalog/courses.json` and therefore exempt
from the Urdu mirror, so they stay materially cheaper per unit. That is now their **only**
argument for early sequencing, since they serve no licence objective.

### Prerequisite artefact: the licence blueprint

Before authoring against this axis, `specs/content/licence-blueprint.md` maps each licence-test
objective to a `course_code`/`unit_no` with its weight and coverage status, sourced only from
STEDA and STS primary documents, under the same sourcing discipline as `sources/unit-NN.md`
(Constitution Art. II.3). **No invented mappings.** This artefact is what an institution or a
candidate is actually buying, and it is what makes the dual-outcome claim auditable.

### First sellable artefact

An **item bank for the 75% constructed-response block** (CRQ 50 + ERQ 25), built from the RRQ and
ERQ items with rubrics that the pipeline already emits for `EFMP-301` U1 and `EFMP-302` U1.
Cheapest artefact per rupee of revenue, reuses content already through every gate, and adds almost
no review load. Completing a course is the right second move, not the first.

The blueprint sharpens this. The licence paper is only 25% MCQ; the rest is rubric-marked
constructed response, which is the format a printed MCQ guide serves worst and the pipeline
already produces. **Lead the product with rubric-marked practice, not an MCQ drill** - the MCQ
block is both the smaller share and the part assessed from the school curriculum the corpus does
not cover.

## The bilingual review pipeline (two stages)

**Owner decision, 2026-09-12.** Urdu review becomes a two-stage pipeline with a third, continuous
improvement input:

| Stage | Actor | Output | Authority |
|---|---|---|---|
| 1 | Specialised Urdu review agent | Findings; advances the unit toward production | Advisory |
| 2 | Human holding a **`reviewer`** role, in the admin panel | Certifies; sets `translation_status: reviewed` | **Certifying** |
| continuous | Any authenticated reader, on EN or UR pages | Passage-level feedback that feeds revision | Input only |

This is the answer to the question this roadmap has carried open since 17 July, and it relieves
the ceiling that made one person's initials appear on every tracker row.

### 1. The certification boundary *(confirmed 2026-09-12)*

**The human `reviewer` certifies. The agent prepares.** The Urdu review agent emits findings and
advances the unit; the `reviewer`-role human makes the G5 call and sets `translation_status:
reviewed`. This is lawful under the constitution as it stands - it needs no amendment and no
reviewer qualification, because nothing is being delegated yet.

**Agent certification is the target state, not the starting state.** Constitution v3.0.0 and
ADR-0019 permit an agent to execute G3/G5 only after qualification against an owner-labelled
held-out set, and the reviewer registry is deliberately empty. For Urdu there is a further
blocker: qualification needs a comparator base and there is exactly **one** reviewed Urdu unit in
the repository. A semantic-equivalence qualification set cannot be built from n=1.

The two stages resolve that circularity by construction: every unit the human `reviewer`
certifies grows the comparator base, and once that base is large enough to qualify an Urdu
reviewer, the agent can be promoted from preparation to certification with the human moving to
audit. Until then, agent output on Urdu is advisory and the tracker records the human.

**Consequence for the G3 English gate:** the same two-stage shape applies, but G3 has no
comparator shortage of the same severity, so G3 delegation under ADR-0019 remains reachable
earlier than G5. Sequence qualification G3 first.

### 2. The `reviewer` role *(accepted as scope, 2026-09-12)*

Current roles are `student`, `teacher`, `verified_teacher` (capability) and `admin`. The
`reviewer` role is new work and gets its own spec before Phase 5 depends on it:

- a migration adding the role, with RLS policies for what a reviewer may read and certify;
- an admin-panel review surface (queue, diff against the English source, certify/reject/escalate);
- an amendment to Constitution Art. VII, which today reserves G3/G5 to the curriculum owner;
- tracker rows that record the certifying reviewer, not the curriculum owner, for units they sign.

This is the first time a person other than the owner holds a content gate, so the audit trail
matters: reviewer identity on the row, and an append-only record of what they certified.

### 3. Feedback is authenticated, all roles *(confirmed 2026-09-12)*

Passage-level feedback on EN or UR pages is open to **any authenticated reader** - student,
teacher, verified teacher, reviewer and admin alike. No anonymous submission, which keeps the
moderation, spam and abuse surface out of scope.

This is already built: `content_feedback` (ADR-0013, Spec 010) captures passage-level feedback
from any authenticated reader on either locale, and the curriculum-owner console already exports
it for revision via the `revise-topic` skill. The only change needed is that the new `reviewer`
role inherits the same insert permission as every other authenticated role.

## Decisions Locked In (change requires spec amendment)

1. **Docusaurus + Supabase**, both **self-hosted on the project VPS** - not Vercel/Netlify, not
   Supabase Cloud. *(Constitution v2.2.0 Art. V.1/V.6, ADR-0006.)*
2. **Primary domain `textbook.com.pk`.** Migrated from `a2ahs.com` (expired 2026-09) across
   Cloudflare, Hestia, Supabase and Resend. *(ADR-0016.)* Deploys to production from `main` via a
   CI-gated cron; never hand-copy `build/`.
3. **All 8 semesters scaffolded; content priority Semesters I-IV**, now ordered within that window
   by licence overlap (above). Source of truth = `Scheme-and-Course-guides/`.
4. **Answer keys live only in the backend** (`quiz_items`), never in the static site or Git.
5. **Teacher role self-selectable; answer-key access requires admin verification.** `admin` is
   never self-selectable. *(Constitution v2.0.0 Art. V.3 / IX.3, ADR-0005.)*
6. **Golden unit** = `EFMP-301` Educational Psychology Unit 1, with `EFMP-302` U1 as the proving
   unit. *(Constitution Art. VI.1.)*
7. **Independent market posture.** *(Owner decision, 2026-09-12.)* The site launches and sells as
   an independent companion resource. No University of Sindh or Faculty of Education branding is
   sought, and no STEDA endorsement is pursued. See the consequence note below.
8. **Style guide advances to v4.0** with the concept-graph layer. *(Owner decision, 2026-09-12,
   made against the advice recorded below.)* Now at **v4.5**; the freeze at 50 units has not
   been reached, and four further revisions have landed since it was called the last one.
9. **Publication rests on the deterministic gates, not on review.** *(Owner decision 2026-09-20,
   ADR-0026, Constitution v4.2.0 -> **v5.0.0** MAJOR.)* Three tiers - `gated`, `provisional`,
   `certified` - each with its own reader-facing notice, none of them certification. Standing
   authorisation for the 15 catalogued courses is `D-2026-0014`; it carries an exit condition.
10. **Evidence binds per unit, not per course.** *(ADR-0027.)* Authoring unit 6 no longer
    invalidates units 1-5. `EFMP-302` U3's manifest went from 145 bound paths to 112.
11. **An evaluator agent may approve G0/G1 where the course guide determines the answer.**
    *(Constitution Art. VII.8.)* Anything the guide does not settle escalates to `specs/gaps.md`
    instead. Every approval is a recorded `D-` code at `pending-owner-review`.
12. **Urdu parity is a corpus-completion requirement, not a per-unit publish gate.**
    *(ADR-0022, Constitution Art. III.2.)* English-only publication is permitted where the `ur`
    route states the gap.

### Consequence note on decision 7

Staying independent removes institutional endorsement from the sales path. The buyer is therefore
the individual candidate rather than the department, and the 29 Government Colleges of Elementary
Teachers remain a distribution audience rather than a licensing customer. Price and channel should
be planned on that basis: direct-to-candidate, one-time, outcome-named, anchored against the
printed licence guides already on the shelf rather than against per-seat institutional software.

### Cost note on decision 8

Recorded because it was raised and overruled, and the next reader deserves the reasoning. v4.0 is
the ninth revision of the authoring standard. The previous eight each invalidated finished work:
`EFMP-301` U1 has been authored three times and its Urdu review is still open. Landing v4.0 means
a new gate, a skill change, and an Art. VI.1 re-proof on both finished units before the first sale.
The counter-argument accepted by the owner is that retrofitting two units is the cheapest migration
that will ever exist, and that the concept graph is load-bearing for everything after it.

**Mitigations that make the decision safer, and are binding on the v4.0 work:**

- The concept layer is **additive** - `specs/content/<course>/concepts/unit-NN.md`, in the same
  shape as `coverage/` and `sources/`. It must not touch heading vectors, so `checkParity`
  (`scripts/validate-content.mjs`) stays green and **`EFMP-302` U1 keeps `translation_status:
  reviewed`**. If that flips to `draft`, the additive design has failed and must be reconsidered
  before the second unit is touched.
- Widen `contracts/unit-frontmatter.schema.json`'s `course_code` and `clo_refs` patterns in the
  same pass. They are B.Ed-specific today; widening later costs a migration, and SSC/HSC would
  otherwise require minting fake course codes.
- **v4.0 is the last standard revision before the freeze.** After it lands, the standard is frozen
  until 50 units exist. Improvements go to a backlog and are applied in one batch.

## Decisions Still Needed From You

1. ~~**Domain & hosting.**~~ **Resolved**: `textbook.com.pk`, self-hosted (locked decision 2).
2. ~~**Urdu review.**~~ **Resolved 2026-09-12**: two-stage agent-then-human pipeline, subject to
   the three open sub-questions above.
3. ~~**Institution branding.**~~ **Resolved 2026-09-12**: independent, no endorsement sought.
4. ~~**Suggestion access.**~~ **Resolved in implementation**: teachers file structured
   `improvement_suggestions` (Spec 005); any authenticated reader files passage-level
   `content_feedback` (Spec 010, ADR-0013). Both paths exist.
5. ~~**Certification boundary.**~~ **Resolved 2026-09-12**: the human `reviewer` certifies, the
   agent prepares; agent certification is the target state once the comparator base supports
   qualification, G3 before G5.
6. ~~**Anonymous vs authenticated feedback.**~~ **Resolved 2026-09-12**: authenticated only, all
   roles.
7. ~~**Course-count reconciliation.**~~ **Resolved 2026-09-12** from the course guides: 74
   distinct codes, 40 non-elective and 34 electives, 5 of them practicum. See the corpus section.
8. **[open] Elective policy** - core only (35 courses), core plus one specialization track (41),
   or every elective offered (69). Moves the corpus by 34 courses. Semesters I-IV are unaffected.
9. **[open] Ten guide codes absent from the scheme appendix** - raise as `specs/gaps.md` entries.
10. **[open] Semester-window amendment** - `EFID-501` ranks Tier 1 on the licence axis but sits
    in Semester V, outside locked decision 3's Semesters I-IV window. Widen the window or drop it.
11. **[open] Part I positioning** - cover the Class 1-8 school curriculum as a separate content
    line, or state publicly that the product serves Part II (75% of the paper) only.
12. **[open] Phase 5 unit target** - the five-unit measurement was run and **refuted** the
    hypothesis: certification was never the constraint. The number still to measure is hours per
    authored-and-figured unit, with figures the unmeasured half.
13. **[open] Six decisions await confirmation** in `specs/decisions/log.md` - `D-2026-0006`,
    `0007`, `0015`, `0016` (EFMP-304 intake) sit at `pending-owner-review`. Recorded, so
    authoring is not blocked, but unconfirmed.
14. **[open] `G-2026-16`** - EFMP-304's guide gives no week table, term length or contact hours,
    and the same guide file lays EFMP-305 out week by week, so the silence looks deliberate. The
    3/2/3/3/2/3 split in the spec is a construction. Blocks only `## Week schedule`.
15. **[open] Per-topic logging** - `assignments`, `teaching_log_entries` and `activity_feedback`
    key on `(course_code, unit_no)` with no `topic_no`, so a four-topic unit is one loggable
    item. Migration 0045 widened the kinds; going finer is a schema change and a product call.
16. **[open] Certification has no drain.** Feature 014's qualification work (T007/T008) is
    unstarted, so every unit terminates at `gated` or `provisional`. ADR-0026 records that the
    asynchronous review loop has **no deadline, owner or counter** - the stable state of an
    unbounded loop is that it never runs. If it is to be real it needs a number.

## Semester I is content-complete *(2026-09-26)*

All six Semester I courses (GENG-300, GNAS-301, GICT-300, GQUR-300, EFMP-301, EFMP-302) are
authored and live: 41 of 41 units, the five bilingual courses with full Urdu mirrors, every
figure placed. **Content-complete is not certified.** Only EFMP-301 U1 and EFMP-302 U1 have
passed G3/G5/G7; the other 39 units carry advisory or no reviews, and 17 owner-decision gaps are
open (G-2026-24..26, 29..34, 41, 62..68). No bilingual course has an Urdu `course-overview.mdx`.
Owner decision (2026-09-26): record Semester I as content-complete, keep the review backlog
queued, and move to the licence track (Feature 024).

## Immediate Next Steps *(revised 2026-09-20)*

Four of the six previous steps are done. Struck items are recorded so the next reader can see
what closed rather than wonder.

1. ~~**Land v4.0.**~~ Done, and four revisions past it - the standard is at v4.5. The freeze
   condition (50 units) is 43 units away.
2. ~~**Spec the `reviewer` role.**~~ Done as Spec 017 (capability, migration 0044, console
   surface). The Art. VII amendment landed and went further than planned: v5.0.0 now also
   carries delegated intake evaluation (VII.8) and the publication tiers (VII.7).
3. ~~**Measure.**~~ Done, and it refuted the plan - see the measurement section above. The
   number still worth measuring is hours per authored-and-figured unit.
4. **Author EFMP-304** (spec approved at G0/G1 by the intake evaluator). Six units. This is the
   first course through the full pipeline under the new publication model, so it is also the
   test of whether the model holds at course scale.
5. **Licence blueprint** from STEDA/STS primary sources. Unchanged and still cheap; it gates the
   content ordering everything else depends on.
6. **Item bank** for the 75% constructed-response block. Now buildable from **seven** units
   rather than two, which changes it from a sample to a product.
7. **Payment rail**: JazzCash / Easypaisa / Raast / challan, one-time, **no auto-renew**. Never
   card-only.

### Operational constraint until 2026-10-01

**GitHub Actions minutes are exhausted** (2,000/2,000). Every push still creates a run that
completes with `conclusion=failure`, so `deploy-prod.sh`'s CI gate can never be satisfied and
production would have frozen silently at the next merge.

`npm run ci:local` runs the same steps on the deploy host - it **parses `ci.yml`** rather than
copying the step list, so it cannot check less than CI - and writes a SHA-bound attestation that
the deploy gate accepts. The fallback logs a WARNING on every use and is bounded three ways: a
hard date in the script, an `expires` field in each attestation, and a digest of `ci.yml` that
voids every attestation if the workflow changes. **It expires 2026-10-02.**

Per merge until then: `npm run ci:local` on the merged SHA (~20 min) before the cron will deploy.

## Appendix - Full Course Catalog (from `Scheme-and-Course-guides/B.Ed 4 Year 2026 revised after board.docx`)

Grand total: **132 credit hours across 8 semesters**. Content priority: **Semesters 1–4** (2026 scheme). Codes shown as printed in the **revised** scheme of studies, which the curriculum owner designated final authority on 2026-09-10 (some elective/practical/pedagogy codes are placeholders pending department allocation). The one deliberate departure is **GNAS-301** in Semester I, taken from the Sem I course guide over the scheme's `GNAS-401` (specs/gaps.md G-2026-02).

### Semester I - First Year (18 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| GQUR-300 | Quantitative Reasoning-I (Math) | 3 (3-0) | General Education |
| GNAS-301 | Natural Science (Environmental Sciences) | 3 (2-1) | General Education |
| GENG-300 | Functional English | 3 (3-0) | General Education |
| GICT-300 | Application of ICT | 3 (2-1) | General Education |
| EFMP-301 | Educational Psychology | 3 (3-0) | Major: Professional |
| EFMP-302 | Teaching Profession | 3 (3-0) | Major: Professional |

### Semester II - First Year (19 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| GQUR-301 | Quantitative Reasoning-II (Statistics) | 3 (3-0) | General Education |
| GSOS-301 | Social Science (Sociology) | 2 (2-0) | General Education |
| GENG-301 | Expository Writing | 3 (3-0) | General Education |
| EFMP-303 | Educational Policies and Plans of Pakistan | 3 (3-0) | Major: Professional |
| EFMP-304 | Critical Thinking and Reflective Practices | 3 (3-0) | Major: Professional |
| EFMP-305 | Inclusive Education | 3 (3-0) | Major: Professional |
| GPKS-402 | Pakistan Studies | 2 (2-0) | General Education |

### Semester III - Second Year (16 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| GARH-400 | Arts and Humanities (Introduction to Philosophy) | 2 (2-0) | General Education |
| GISS-401 / GETH-401 | Islamic Studies / Ethics for non-Muslims | 2 (2-0) | General Education |
| GICP-400 | Ideology and Constitution of Pakistan | 2 (2-0) | General Education |
| EFMP-406 | Contemporary Literacies | 3 (3-0) | Major: Professional |
| EFMP-407 | Education for Sustainable Development | 3 (3-0) | Major: Professional |
| EFPG-401 | Teaching of English | 3 (3-0) | Major: Pedagogy |
| GUHQ-301 | Fehm-e-Quran – I | 1 (0-1) | General Education |

### Semester IV - Second Year (16 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| GCCE-400 | Civics and Community Engagement | 2 (1-1) | General Education |
| GENT-401 | Entrepreneurship | 2 (2-0) | General Education |
| EFMP-408 | Educational Assessment and Evaluation | 3 (3-0) | Major: Professional |
| EFMP-409 | Foundations of Education | 3 (3-0) | Major: Professional |
| EFPC-4-- | School Observation | 2 (0-2) | Major: Practical |
| MFPG-402 | Teaching of Science | 3 (3-0) | Major: Pedagogy |
| GUHQ-400 | Fehm-e-Quran – II | 1 (0-1) | General Education |

### Semester V - Third Year (18 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| EFID-501 | Human Growth & Development | 3 (3-0) | Interdisciplinary |
| EFID-502 | Media Education | 3 (3-0) | Interdisciplinary |
| EFMP-510 | School Management | 3 (3-0) | Major: Professional |
| EFMP-511 | Curriculum Development | 3 (3-0) | Major: Professional |
| EFPG-503 | Teaching of Urdu / Teaching of Sindhi | 3 (3-0) | Major: Pedagogy |
| EFSP-5-- | Specialization Elective Course (Elective I) | 3 (3-0) | Major: Elective |

### Semester VI - Third Year (15 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| EFID-503 | Child Abuse & Safety | 3 (3-0) | Interdisciplinary |
| EFPG-505 | Teaching of Math | 3 (3-0) | Major: Pedagogy |
| EFPG-506 | Teaching of Social Studies & Islamiyat | 3 (3-0) | Major: Pedagogy |
| EFSP-5-- | Specialization Elective Course (Elective II) | 3 (3-0) | Major: Elective |
| FDEX-560 | Internship | 3 | Internship |

### Semester VII - Fourth Year (15 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| EFPC-6-- | Teaching Practice – I | 3 (0-3) | Major: Practical |
| EFPG-607 | Teaching of Arts, Craft and Calligraphy | 3 (3-0) | Major: Pedagogy |
| EFSP-6-- | Specialization Elective Course (Elective III) | 3 (3-0) | Major: Elective |
| EFSP-6-- | Specialization Elective Course (Elective IV) | 3 (3-0) | Major: Elective |
| EFMP-612 | Research Methods in Education | 3 (3-0) | Major: Professional |

### Semester VIII - Fourth Year (15 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| EFPC-6-- | Practice Teaching – II | 3 (0-3) | Major: Practical |
| EFID-604 | Science, Technology and Society | 3 (3-0) | Interdisciplinary |
| EFSP-6-- | Specialization Elective Course (Elective V) | 3 (3-0) | Major: Elective |
| EFSP-6-- | Specialization Elective Course (Elective VI) | 3 (3-0) | Major: Elective |
| CPPR-650 | Capstone Project | 3 | Capstone Project |

> **Sem I/II note (updated 2026-09-10):** the PDF guides (`1st 2026.pdf`, `2nd 2026.pdf`) are text-extracted and follow the enriched 2026 structure. The **revised scheme of studies** (`B.Ed 4 Year 2026 revised after board.docx`) is now the final authority and moves three courses: Pakistan Studies (GPKS-402) Sem IV → Sem II, Fehm-e-Quran I (GUHQ-301) Sem II → Sem III, Fehm-e-Quran II (GUHQ-400) Sem III → Sem IV; Sem II 18 → 19 CH, Sem IV 17 → 16 CH, Semester I unchanged. All five board-vs-guide discrepancies in `specs/gaps.md` (G-2026-01…05) are now **resolved**: GNAS-301 (guide code kept, scheme's 3 (2-1) split), GPKS-402 in Sem II, GUHQ-301 in Sem III / GUHQ-400 in Sem IV, and GSOS-301 at 2 (2-0). Teaching Practice / Practice Teaching (EFPC) courses focus on teaching all core subjects across Grades I–VIII.
