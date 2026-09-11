# ROADMAP & ARCHITECTURE OVERVIEW

## System Architecture (one picture in words)

```
┌───────────────────────────────────────────────────────────────┐
│  Docusaurus site  (static, self-hosted: nginx → apache2)      │
│  ├── /docs/...            textbook EN                         │
│  ├── /ur/docs/...         textbook UR (RTL)                   │
│  ├── /app/login|signup    auth pages (React, Spec 002)        │
│  ├── /app/student         student dashboard (Spec 004)        │
│  ├── /app/teacher         teacher dashboard (Spec 005)        │
│  └── /app/admin           moderation & approvals              │
│         │  supabase-js (anon key + RLS)                       │
└─────────┼─────────────────────────────────────────────────────┘
          ▼
┌───────────────────────────────────────────────────────────────┐
│  Supabase, self-hosted on the same VPS (ADR-0006,              │
│  nginx → Kong:8000 — Docker Compose, not Supabase Cloud)       │
│  ├── Auth: Google OAuth + email/password (mail via a           │
│  │         transactional relay — Resend/SES, not local exim)   │
│  ├── Postgres + Row-Level Security (all app tables)            │
│  ├── Storage: submissions/ bucket                              │
│  └── Edge functions: achievements, exports                     │
└───────────────────────────────────────────────────────────────┘

Content repo (Git) ── CI ──> validate front-matter ──> build EN+UR ──> deploy
                        └──> unit-sync script ──> upsert `units` table
```

**Why this shape:** the book stays a fast, free, version-controlled static site (Constitution Art. V); everything private or personal sits behind database RLS. One domain, one product feel, two cleanly separated concerns. If dashboards ever outgrow embedded pages, they can move to a standalone app without touching the book.

## Build Order & Phases

| Phase | Specs | Outcome | Rough effort* |
|---|---|---|---|
| 0 | Constitution + all specs | Approved foundation (this bundle) | done pending your review |
| 1 | 001 | Bilingual site live with all-8-semester scaffold (folders + metadata) + golden unit | 1–2 weeks |
| 2 | 002 | Login (Google + email), self-selectable roles, admin role management + verified-teacher gate | 1 week |
| 3 | 003 | Classes, assignments, submissions, grading | 2–3 weeks |
| 4 | 004 + 005 | Both dashboards + suggestion loop | 2–3 weeks |
| 5 | 006 (ongoing) | Semesters 1–4 content through the pipeline, sem-by-sem (then 5–8) | ~6–8 weeks/semester in parallel from Phase 1 |
| 6 | Backlog specs | Notifications, Sindhi locale, offline PWA, transcripts export, parent view | future |

*Effort assumes part-time work with Claude doing drafting/implementation and you reviewing. Content (Phase 5) runs in parallel with engineering phases.

## Decisions Locked In (change requires spec amendment)
1. **Docusaurus + Supabase** stack; dashboards embedded as Docusaurus custom pages. Both the
   static site and Supabase are **self-hosted on the existing VPS** — not Vercel/Netlify
   and not Supabase Cloud. *(Backend hosting amended 2026-07-18 — see Constitution v2.2.0 Art.
   V.1/V.6 and ADR-0006; the site itself has run self-hosted since its original deploy.)*
2. **All 8 semesters scaffolded; content priority Semesters 1–4** (new 2026 scheme). Source of truth = the local `Scheme-and-Course-guides/` folder (board scheme + all 8 semester guides).
3. **Answer keys live only in the backend** (`quiz_items`), never in the static site or Git repo.
4. **Teacher role is self-selectable; answer-key access requires admin verification.** Users self-select `student`/`teacher` at sign-up (default student); the teacher role grants peer-teaching only. Access to answer keys/restricted material is a separate admin-granted `verified_teacher` capability (default off). The `admin` role is never self-selectable. *(Amended 2026-07-17 — reverses the original "teacher requires admin approval"; see Constitution v2.0.0 Art. V.3 / IX.3 and ADR-0005.)*
5. **Golden unit** = EFMP-301 Educational Psychology, Unit 1 — sets the quality bar for all 3,000+ future documents.

## Decisions Still Needed From You
1. ~~**Domain & hosting**: do you have a domain in mind, and is Vercel acceptable for the site host?~~ **Resolved**: `textbook.com.pk`, self-hosted on the project's own VPS for both the site and the backend (Decision #1 above; ADR-0006).
2. **Urdu review**: will you personally review Urdu drafts, or should the pipeline plan for a second reviewer?
3. **Institution branding**: should the site carry University of Sindh / Faculty of Education branding (needs permission), or launch as an independent companion resource?
4. **Suggestion access**: teachers only (as specced), or may students also file book suggestions?

## Immediate Next Steps
1. You review this bundle → mark each spec Approved / Amend.
2. On approval of 001: I scaffold the Docusaurus repo (i18n, fonts, components, CI, all-8-semester folder structure from the board scheme + guides).
3. In parallel: G0 content-spec for EFMP-301 from its course guide, then Semester 1 courses, then Semesters 2–4.

## Appendix — Full Course Catalog (from `Scheme-and-Course-guides/B.Ed 4 Year 2026 revised after board.docx`)

Grand total: **132 credit hours across 8 semesters**. Content priority: **Semesters 1–4** (2026 scheme). Codes shown as printed in the **revised** scheme of studies, which the curriculum owner designated final authority on 2026-09-10 (some elective/practical/pedagogy codes are placeholders pending department allocation). The one deliberate departure is **GNAS-301** in Semester I, taken from the Sem I course guide over the scheme's `GNAS-401` (specs/gaps.md G-2026-02).

### Semester I — First Year (18 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| GQUR-300 | Quantitative Reasoning-I (Math) | 3 (3-0) | General Education |
| GNAS-301 | Natural Science (Environmental Sciences) | 3 (2-1) | General Education |
| GENG-300 | Functional English | 3 (3-0) | General Education |
| GICT-300 | Application of ICT | 3 (2-1) | General Education |
| EFMP-301 | Educational Psychology | 3 (3-0) | Major: Professional |
| EFMP-302 | Teaching Profession | 3 (3-0) | Major: Professional |

### Semester II — First Year (19 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| GQUR-301 | Quantitative Reasoning-II (Statistics) | 3 (3-0) | General Education |
| GSOS-301 | Social Science (Sociology) | 2 (2-0) | General Education |
| GENG-301 | Expository Writing | 3 (3-0) | General Education |
| EFMP-303 | Educational Policies and Plans of Pakistan | 3 (3-0) | Major: Professional |
| EFMP-304 | Critical Thinking and Reflective Practices | 3 (3-0) | Major: Professional |
| EFMP-305 | Inclusive Education | 3 (3-0) | Major: Professional |
| GPKS-402 | Pakistan Studies | 2 (2-0) | General Education |

### Semester III — Second Year (16 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| GARH-400 | Arts and Humanities (Introduction to Philosophy) | 2 (2-0) | General Education |
| GISS-401 / GETH-401 | Islamic Studies / Ethics for non-Muslims | 2 (2-0) | General Education |
| GICP-400 | Ideology and Constitution of Pakistan | 2 (2-0) | General Education |
| EFMP-406 | Contemporary Literacies | 3 (3-0) | Major: Professional |
| EFMP-407 | Education for Sustainable Development | 3 (3-0) | Major: Professional |
| EFPG-401 | Teaching of English | 3 (3-0) | Major: Pedagogy |
| GUHQ-301 | Fehm-e-Quran – I | 1 (0-1) | General Education |

### Semester IV — Second Year (16 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| GCCE-400 | Civics and Community Engagement | 2 (1-1) | General Education |
| GENT-401 | Entrepreneurship | 2 (2-0) | General Education |
| EFMP-408 | Educational Assessment and Evaluation | 3 (3-0) | Major: Professional |
| EFMP-409 | Foundations of Education | 3 (3-0) | Major: Professional |
| EFPC-4-- | School Observation | 2 (0-2) | Major: Practical |
| MFPG-402 | Teaching of Science | 3 (3-0) | Major: Pedagogy |
| GUHQ-400 | Fehm-e-Quran – II | 1 (0-1) | General Education |

### Semester V — Third Year (18 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| EFID-501 | Human Growth & Development | 3 (3-0) | Interdisciplinary |
| EFID-502 | Media Education | 3 (3-0) | Interdisciplinary |
| EFMP-510 | School Management | 3 (3-0) | Major: Professional |
| EFMP-511 | Curriculum Development | 3 (3-0) | Major: Professional |
| EFPG-503 | Teaching of Urdu / Teaching of Sindhi | 3 (3-0) | Major: Pedagogy |
| EFSP-5-- | Specialization Elective Course (Elective I) | 3 (3-0) | Major: Elective |

### Semester VI — Third Year (15 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| EFID-503 | Child Abuse & Safety | 3 (3-0) | Interdisciplinary |
| EFPG-505 | Teaching of Math | 3 (3-0) | Major: Pedagogy |
| EFPG-506 | Teaching of Social Studies & Islamiyat | 3 (3-0) | Major: Pedagogy |
| EFSP-5-- | Specialization Elective Course (Elective II) | 3 (3-0) | Major: Elective |
| FDEX-560 | Internship | 3 | Internship |

### Semester VII — Fourth Year (15 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| EFPC-6-- | Teaching Practice – I | 3 (0-3) | Major: Practical |
| EFPG-607 | Teaching of Arts, Craft and Calligraphy | 3 (3-0) | Major: Pedagogy |
| EFSP-6-- | Specialization Elective Course (Elective III) | 3 (3-0) | Major: Elective |
| EFSP-6-- | Specialization Elective Course (Elective IV) | 3 (3-0) | Major: Elective |
| EFMP-612 | Research Methods in Education | 3 (3-0) | Major: Professional |

### Semester VIII — Fourth Year (15 CH)
| Code | Course | CH | Category |
|---|---|---|---|
| EFPC-6-- | Practice Teaching – II | 3 (0-3) | Major: Practical |
| EFID-604 | Science, Technology and Society | 3 (3-0) | Interdisciplinary |
| EFSP-6-- | Specialization Elective Course (Elective V) | 3 (3-0) | Major: Elective |
| EFSP-6-- | Specialization Elective Course (Elective VI) | 3 (3-0) | Major: Elective |
| CPPR-650 | Capstone Project | 3 | Capstone Project |

> **Sem I/II note (updated 2026-09-10):** the PDF guides (`1st 2026.pdf`, `2nd 2026.pdf`) are text-extracted and follow the enriched 2026 structure. The **revised scheme of studies** (`B.Ed 4 Year 2026 revised after board.docx`) is now the final authority and moves three courses: Pakistan Studies (GPKS-402) Sem IV → Sem II, Fehm-e-Quran I (GUHQ-301) Sem II → Sem III, Fehm-e-Quran II (GUHQ-400) Sem III → Sem IV; Sem II 18 → 19 CH, Sem IV 17 → 16 CH, Semester I unchanged. All five board-vs-guide discrepancies in `specs/gaps.md` (G-2026-01…05) are now **resolved**: GNAS-301 (guide code kept, scheme's 3 (2-1) split), GPKS-402 in Sem II, GUHQ-301 in Sem III / GUHQ-400 in Sem IV, and GSOS-301 at 2 (2-0). Teaching Practice / Practice Teaching (EFPC) courses focus on teaching all core subjects across Grades I–VIII.
