# SPEC 006 — Content Authoring Pipeline (Course Guide → Published Unit)

**Status:** Draft for approval • **Depends on:** Constitution, 001 • **Feeds:** 003 (quiz banks), 005 (suggestions loop)

## 1. Problem & Goal
"Mega textbook" scale (eventually 40+ courses × ~8 units × 5 files × 2 languages ≈ 3,000+ documents) collapses without an assembly line. This spec defines the repeatable pipeline that converts an official course guide into published, review-gated, bilingual units — and how accepted teacher suggestions re-enter it.

## 2. Pipeline Stages (per unit)
```
G0 Course intake   → parse course guide (local Scheme-and-Course-guides/) → course content-spec:
                     unit list, CLOs, weekly breakdown, recommended books/resources,
                     teaching/instructional strategies, practical work, assessment criteria
                     (+ a per-course course-overview page carrying the course-wide items)
G1 Unit spec       → per-unit one-pager: CLO refs, key terms, worked-example ideas,
                     activity concepts (incl. suggested practical activities — optional),
                     reading materials, assessment blueprint (item counts × Bloom's;
                     default 60% summative / 40% formative for GECEs)
G2 EN draft        → index.mdx + activities + formative + summative + teacher-notes,
                     written to the golden template (Spec 001 §6.9). Guide sections FOLD
                     into the five files (no new files) per the mapping below.
```

**Section → file mapping (the folding rule — must match Constitution Art. III and Spec 001 F2/F3):**

| Course-guide section | Where it lands |
|---|---|
| Teaching/Instructional Strategies | `teacher-notes.mdx` (per-unit) + course-overview |
| Suggested Practical Activities (optional) | `activities.mdx` (flagged optional) |
| Suggested Instructional / Reading Materials | `index.mdx` "Further reading / materials" + front-matter `resources[]` |
| Practical Work (group work, assignments, presentations) | `teacher-notes.mdx` "Practical work" block |
| Assessment Criteria (+ 60/40 GECE split) | `formative.mdx` / `summative.mdx` framing + front-matter `assessment_weighting` |
| Recommended Books / References | `index.mdx` "References" + content-spec resource list |

```
G3 EN review       → Content gate (Constitution Art. VII): traceability, readability,
                     citations, Bloom's tags
G4 UR translation  → full Urdu draft (MT-assisted permitted)
G5 UR review       → human register/terminology pass; sets translation_status: reviewed
G6 Assets          → diagrams (original SVG), handout PDFs, quiz bank entries (answers
                     go ONLY to backend quiz_items, never the repo)
G7 Publish         → merge to main → CI validates → deploys both locales
G8 Feedback loop   → accepted suggestions (Spec 005) create revision tasks back at G2/G4
```

## 3. Functional Requirements
| ID | Requirement |
|---|---|
| CP1 | Every course gets `specs/content/<course-code>/content-spec.md` (G0 output) approved before drafting. |
| CP2 | Task tracker: `specs/content/<course-code>/tasks.md` — one row per unit per stage with status ▢/▣/✅ and reviewer initials. Single source of progress truth. |
| CP3 | Terminology bank: `specs/content/terminology.csv` (`term_en, term_ur, notes`) — mandatory reference for translators; conflicts resolved by curriculum owner. Seeded from course guides + standard Urdu education terminology. |
| CP4 | Assessment blueprint standard: formative = 5–8 items (Remember/Understand/Apply), summative = mixed constructed-response with rubric + Analyze-or-higher item(s). Per-unit deviations must be justified in the unit spec. |
| CP4a | Assessment weighting default (GECEs): **60% summative / 40% formative** (Constitution Art. III). The course guide's Assessment Criteria list (class test, mid-term, assignment evaluation, attendance, participation) is reflected in each course-overview page. |
| CP5 | Style guide: `specs/content/style-guide.md` covering EN readability rules, UR register rules, example-localization rules (Sindh/Pakistan contexts), citation format, and diagram conventions. |
| CP6 | Plagiarism rule: all prose original; quotations < 15 words with citation; recommended readings cited by reference, never reproduced. |
| CP7 | Revision tasks from suggestions carry the suggestion id for traceability (`revises: SUG-123` in front-matter of the PR description). |
| CP8 | Each course content-spec lists the guide's **recommended books/resources** as the starting reference set, plus the guide's **teaching/instructional strategies** and **practical work** items. Resources are cited as bibliographic references only — never reproduced (see CP6). |
| CP9 | Each course produces a **course-overview page** (`course-overview.mdx`) carrying course-wide items: teaching strategies, assessment criteria (with 60/40 weighting), practical work, and recommended resources. Units link to it rather than repeating them. |
| CP10 | Guide sections **fold into the five existing unit files** per the mapping in §2 — no new per-unit file types are added. Suggested practical activities are marked optional in `activities.mdx`. |

## 4. Division of Labour (proposed)
| Stage | Primary | Reviewer |
|---|---|---|
| G0–G1 | Claude drafts from course guide | Yousif approves |
| G2 | Claude drafts | Yousif content gate |
| G4 | Claude drafts UR | Yousif (or designated Urdu reviewer) |
| G6 diagrams/quizzes | Claude | Yousif |
| G8 triage | Yousif (admin) | — |

## 5. Step-by-Step Build Plan
1. Write `style-guide.md` + seed `terminology.csv` (~100 core education terms EN↔UR).
2. Run G0 for EFMP-301 (Educational Psychology) from its course guide → first content-spec + course-overview.
3. Run G1–G7 for EFMP-301 Unit 1 (this doubles as Spec 001's golden unit).
4. Retro: adjust template/style guide from lessons learned; freeze v1.
5. Run G0 for the remaining Semester 1 courses (batch), then Semesters 2 → 3 → 4 (content priority), while the folder scaffold covers all 8 semesters.
6. Schedule: complete Semesters 1–4 at a sustainable cadence (suggested: 2 units/week through the pipeline once the template is frozen), then proceed to Semesters 5–8.

## 6. Acceptance Criteria
- [ ] EFMP-301 content-spec approved with every unit mapped to guide CLOs.
- [ ] EFMP-301 content-spec includes the guide's teaching strategies, practical work, and assessment criteria (with 60/40 weighting) plus its recommended-book references, and a course-overview page is produced.
- [ ] Golden unit passes G3 and G5 with zero traceability gaps.
- [ ] Terminology bank consulted (spot-check: 10 random UR terms match the bank).
- [ ] A test suggestion flows: filed → accepted → revision task → published fix, with linkage intact.
