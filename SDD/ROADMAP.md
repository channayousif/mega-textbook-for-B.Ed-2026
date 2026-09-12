# ROADMAP & ARCHITECTURE OVERVIEW

> **Revision 2026-09-12.** Phases 1-4 are delivered. Phase 5 (content) is the live phase and
> is far behind its original estimate; the estimate itself was wrong and has been replaced with
> a measurement task. Owner decisions of 2026-09-11/12 add a licence-overlap content priority,
> a two-stage bilingual review pipeline, an independent (non-endorsed) market posture, and
> style guide v4.0. Sections marked **[open]** need an answer before the work they describe starts.

## System Architecture (one picture in words)

```
┌───────────────────────────────────────────────────────────────┐
│  Docusaurus site  (static, self-hosted: nginx → apache2)      │
│  ├── /docs/...            textbook EN                         │
│  ├── /ur/docs/...         textbook UR (RTL)                   │
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
│  ├── Postgres + Row-Level Security (42 migrations)             │
│  ├── Storage: submissions/ bucket                              │
│  └── Edge functions: achievements, exports                     │
└───────────────────────────────────────────────────────────────┘

Content repo (Git) ── CI ──> validate front-matter ──> build EN+UR ──> deploy
                        └──> unit-sync script ──> upsert `units` table
```

**Why this shape:** the book stays a fast, free, version-controlled static site (Constitution Art. V); everything private or personal sits behind database RLS. One domain, one product feel, two cleanly separated concerns. If dashboards ever outgrow embedded pages, they can move to a standalone app without touching the book.

## Where the project actually stands (2026-09-12)

Measured from the working tree, not from the site's own claims.

| | |
|---|---|
| Units at publishable standard | **2** (`EFMP-301` U1, `EFMP-302` U1) |
| Thin legacy units | 5 (`EFMP-302` U2-U6, ~1,200 words each) |
| Courses in `catalog/courses.json` | 13 of 37 authorable |
| Textbook content | 29,314 EN words · 38,059 UR words |
| App pages · migrations · tests | 34 · 42 · 13,181 lines |
| Specification documents | 21,540 lines |
| Reviewed Urdu mirrors | **1** (`EFMP-302` U1) |

**The corpus is smaller than 48 courses.** Of the 48 rows in the appendix, five are practicum with
no textbook to write (`EFPC-4--` School Observation, `FDEX-560` Internship, `EFPC-6--` Teaching
Practice I and II, `CPPR-650` Capstone) and six are specialization electives whose codes are
placeholders pending department allocation. **37 courses are authorable**, roughly 222 units at
six units each; the Semesters I-IV priority window is 26 courses, about 156 units.

**[open] Course-count reconciliation.** This appendix lists 48 rows; the 2026-09-11 repositioning
plan states the scheme carries ~57 codes. Both may be right depending on how either/or variants
(`GISS-401 / GETH-401`, `EFPG-503` Urdu/Sindhi) and repeated elective placeholders are counted.
Settle this before any figure derived from it enters a pricing model.

## Build Order & Phases

| Phase | Specs | Outcome | Status |
|---|---|---|---|
| 0 | Constitution + specs | Approved foundation | ✅ done |
| 1 | 001 | Bilingual site live, 8-semester scaffold, golden unit | ✅ done, 2026-07-19 |
| 2 | 002 | Auth, self-selectable roles, verified-teacher gate | ✅ done |
| 3 | 003 | Classes, assignments, submissions, grading | ✅ done |
| 4 | 004 + 005 | Both dashboards + suggestion loop | ✅ done |
| **5** | **006 + content** | **Semesters I-IV content through the pipeline** | **▣ live - 2 of ~156 units** |
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

### The structural fix

1. **Phase 5 gets a failing gate like any other phase.** A named per-semester unit target with a
   review date. Missing it triggers a re-plan, not a silent slip.
2. **Measure before planning.** The next five units are authored back to back against a frozen
   standard, with hours logged end to end including Urdu and figures. The repositioning plan
   asserts ~1 day of agent authoring per unit; two units after eight weeks implies review costs
   roughly 27 days per unit on top. **Neither figure is measured.** Until they are, every
   downstream number - pricing, funding need, corpus target - is a guess.
3. **Cost per mastered outcome** is the metric that says whether the authoring standard is
   economically survivable. Adopted as the north-star cost metric.

## Content priority: the licence overlay

**Owner decision, 2026-09-11:** sequence content by the intersection of the B.Ed scheme and the
Sindh teaching-licence / PST-JEST syllabus, not by semester order.

Rationale: the licence test weights **Pedagogical Content 50% · Content Knowledge 30% ·
Psychometric and Analytical Reasoning 20%**, and the two units already built to standard
(`EFMP-301`, `EFMP-302`) sit inside the 50% slice. This makes "one curriculum, two outcomes -
your degree and your licence" a checkable claim rather than a marketing line.

**Tier 1 - Pedagogical Content (50%):** `EFMP-301` *(U1 built)* · `EFMP-302` *(U1 built)* ·
`EFMP-303` · `EFMP-304` · `EFMP-305`

**Tier 2 - Content Knowledge (30%) + Reasoning (20%):** `GQUR-300` / `GQUR-301` (serves
Mathematics *and* the reasoning section) · `GENG-300` / `GENG-301` · `GPKS-402` · `GNAS-301` ·
`GSOS-301` · `GICT-300`

`GENG-300` and `GENG-301` are `bilingual: false` in `catalog/courses.json` and therefore exempt
from the Urdu mirror. They are materially cheaper per unit and should be sequenced early for
that reason alone, independent of licence weight.

### Prerequisite artefact: the licence blueprint

Before authoring against this axis, `specs/content/licence-blueprint.md` maps each licence-test
objective to a `course_code`/`unit_no` with its weight and coverage status, sourced only from
STEDA and STS primary documents, under the same sourcing discipline as `sources/unit-NN.md`
(Constitution Art. II.3). **No invented mappings.** This artefact is what an institution or a
candidate is actually buying, and it is what makes the dual-outcome claim auditable.

### First sellable artefact

An **item bank** for the 50% pedagogy slice, built from the 10/10/5 assessment banks the pipeline
already emits for `EFMP-301` U1 and `EFMP-302` U1. Cheapest artefact per rupee of revenue, reuses
content already through every gate, adds almost no review load, and matches the format this market
already buys in print. Completing a course is the right second move, not the first.

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
   made against the advice recorded below.)*

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
7. **[open] Course-count reconciliation** - 48 rows or ~57 codes.
8. **[open] Phase 5 unit target** - the number and date that make Phase 5 a gate that can fail.
   Cannot be set responsibly until the five-unit measurement is done.

## Immediate Next Steps

1. **Land v4.0** (owner decision 8): concept schema, `check:concept-graph` gate, skill step,
   widened front-matter patterns, retrofit `EFMP-302` U1 then `EFMP-301` U1, verify the reviewed
   Urdu mirror survives. **Then freeze the standard.**
2. **Licence blueprint** from STEDA/STS primary sources. Cheap, no review queue, and it gates the
   content ordering everything else now depends on.
3. **Measure.** Author five units back to back at the frozen v4.0 standard, logging hours. Set the
   Phase 5 target from the result.
4. **Spec the `reviewer` role** and the two-stage review pipeline, including the Art. VII amendment.
5. **Item bank** for the 50% pedagogy slice from the two built units - the first sellable artefact.
6. **Payment rail**: JazzCash / Easypaisa / Raast / challan, one-time, **no auto-renew**. Never
   card-only.

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
