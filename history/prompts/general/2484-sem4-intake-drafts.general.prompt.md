---
id: 2484
title: Semester 4 G0/G1 intake drafts for seven courses
stage: general
date: 2026-11-18
surface: agent
model: claude-opus-5-5
feature: none
branch: content/sem4-content-specs
user: a2ahs
command: none
labels: [board-direct, intake, semester-4]
links:
  spec: specs/content/style-guide.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gcce-400/content-spec.md
  - specs/content/gent-401/content-spec.md
  - specs/content/efmp-409/content-spec.md
  - specs/content/mfpg-402/content-spec.md
  - specs/content/guhq-400/content-spec.md
  - specs/content/efpc-411/content-spec.md
  - specs/content/efmp-408/content-spec.md
  - specs/content/{gcce-400,gent-401,efmp-408,efmp-409,efpc-411,mfpg-402,guhq-400}/intake/manifest.json
tests:
  - npm run check:content after every spec: all 14 content gates pass
---

## Prompt

yes, prepare the semester 4 intake drafts

## Response snapshot

The revised Scheme lists seven Semester IV courses (16 credit hours): GCCE-400, GENT-401, EFMP-408, EFMP-409, EFPC-4-- (guide EFPC-411), MFPG-402 (guide EFPG-402), GUHQ-400 (guide GUHQ-402). Six new `status: draft` content specs were written from `4TH SEMESTER.txt` on the Semester 3 template (GUHQ-301, EFPG-401), and the 2026-09-14 EFMP-408 draft was brought to that template (front matter, keyed reading list, SLO IDs, formative lines, prerequisites, mapped readings, line refs, drafting notes) with its partition and content unchanged. Every guide reading was looked up (Open Library, web) and every author-selected source was fetched or checked through OpenAlex on 2026-11-18. Depth budgets were set as whole-unit bands (topics plus index and assessment), because the depth gate sums all of a unit's files. Frozen intake bundles were prepared with `prepare-intake-evidence.mjs` for a fresh evaluator. Draft specs do not trigger crew author jobs (`specUnitNumbers` returns no units for a draft; test at `tests/crew/planner.test.mjs:101`).

## Outcome

- ✅ Impact: all seven Semester 4 courses have intake-ready draft specs and evaluator bundles.
- 🧪 Tests: `npm run check:content` passes (14 gates).
- 📁 Files: seven content specs, seven intake manifests, this PHR.
- 🔁 Next prompts: a fresh evaluator session runs `evaluate-intake` on each bundle; the owner rules the escalations.
- 🧠 Reflection: the guide's reading lists are weak across the semester (unauthorised PDFs, user uploads, Indian national documents, titles that exist only in an HEC model outline); official Pakistani sources (PIE policy copies, NCC and DCAR curricula, HEC course guides, SECP, IPO) carry the open-access floor.

## Handoff (for CEO and agents)

- Shipped / changed: draft specs for GCCE-400, GENT-401, EFMP-409, MFPG-402, GUHQ-400, EFPC-411; EFMP-408 updated to the intake template; seven intake manifests.
- Decisions the team must respect: none settled here. Specs follow the Scheme for codes and credits where it gives them (MFPG-402, GUHQ-400, GENT-401 at 2 credits) and the guide where it does not (EFPC-411). Two guide links (GENT-401, EFMP-408) serve copyrighted books on unrelated repositories; the specs cite the books and must not link those files.
- Pending / next owner: EVALUATOR (fresh session, not the drafter) - G0/G1 on each bundle. OWNER - rulings on: MFPG-402 vs EFPG-402 code; GUHQ-400 and GENT-401 credits; EFPC-411 number; catalog entries for six courses; EFPC-411 three-unit split; GCCE-400 twelve-week guide and derived U4-07; EFMP-409 derived sub-topics, the "1978-80 policy" reading and Ibn Khaldun under pragmatism; GUHQ-400 duplicate Weeks 9-10 and Week 11 grammar labels; `D-2026-0053` item 2 for Semester 4. Project Gutenberg was in maintenance, so EFMP-409 `gutenberg-primary` needs a recheck.
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: first-pass depth budgets summed topics only and would have failed `check-unit-depth` once units were authored; corrected before commit of the intake bundles.
- Graders run and results (PASS/FAIL): check:content PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): have `check:content` validate a draft spec's depth-budget band against its topic table plus a fixed index/assessment allowance, so the mismatch is caught at drafting time.
