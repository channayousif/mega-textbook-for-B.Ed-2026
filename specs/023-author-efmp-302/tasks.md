# Tasks: Complete EFMP-302 · Teaching Profession

**Feature**: 023-author-efmp-302 | **Branch**: `023-author-efmp-302`
**Input**: [spec.md](./spec.md) · [plan.md](./plan.md)

## Format: `[ID] [P?] [Story] Description`

`[P]` marks tasks that touch different files with no incomplete dependency, so they may run in
parallel. Reviewer subagents are capped at 2 concurrent (capacity rule).

## Path Conventions

English units under `docs/semester-1/efmp-302/unit-NN/` (settled; review-demanded repairs
only). Urdu mirrors under `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-NN/`.
Governance under `specs/content/efmp-302/`. Figures under `static/img/figures/efmp-302/unit-NN/`.
Feature tree under `specs/023-author-efmp-302/`. PHRs under `history/prompts/023-author-efmp-302/`
and run records under `history/prompts/efmp-302/`.

---

## Phase 1: SDD scaffolding

- [x] **T001** Create spec.md (P1 bilingual corpus, P2 quality gates, P3 review evidence;
  edge cases: G5-to-G3 binding failures, revoked-provisional history, terminology gaps).
- [x] **T002** Create plan.md (Constitution Check against Art. III.2/III.9/III.10/V.1/VII and
  ADR-0019/0022/0024/0026/0027).
- [x] **T003** Create this tasks.md; record the scaffolding PHR.

## Phase 2: Fresh advisory G3 reviews (Units 2-6)

- [x] **T004** Prepare G3 evidence and spawn a FRESH g3-reviewer for Unit 2; apply sensible
  repairs (max 2 cycles, then escalate under G-2026-62..71); refresh G2 evidence if bytes
  change; tracker Notes updated, row stays open. (feat023-r1: pass, 7/7 criteria, 0 blocking;
  2 advisories repaired at 81ab33b, 2 carried; G2 rebound 20260924T133040759Z)
- [x] **T005** Same for Unit 3 (5 topics; revoked-provisional history respected - fresh review
  binds current bytes, prior reports stay on record). (r1 revise on the b8f8ffe figure
  regression, repaired at 69bae9e; r2 pass, 7/7 criteria, repair verified 4 ways; 14 advisories
  carry)
- [ ] **T006** Same for Unit 4 (carried: ten standard names in topic-02 corroborated from
  secondary sources only; run-007 advisories).
- [ ] **T007** Same for Unit 5 (carried: hennessy2022 declaration, RRQ 9 rebalance; 11
  run-007 advisories).
- [ ] **T008** Same for Unit 6 (carried: A2/S1/S2/P2 owner-judgement findings from run 007
  escalate; not re-litigated).
- [ ] **T009** Record a G-2026-62..71 escalation for every unit whose findings exceed the
  two-cycle budget or need owner judgement; record the G3 run PHRs.

## Phase 3: Urdu mirrors, Units 3-6 (G4)

- [x] **T010** Translate Unit 3 (5 topics, 10 figures): complete mirror, `.ur.svg` +
  `.ur.dark.svg` variants, `key_terms` block, parity flip-check, `check:content`, render
  inspect; commit. (18,378 words; 0 render defects)
- [ ] **T011** Translate Unit 4 (4 topics, 8 figures): same pattern.
- [ ] **T012** Translate Unit 5 (4 topics, 8 figures): same pattern; 14 of 16 concept labels
  already authored (largest authored set).
- [ ] **T013** Translate Unit 6 (4 topics, 8 figures): same pattern; note the Reflective
  practice / Reflective Decision Making relationship flagged in concepts/unit-06.md.
- [ ] **T014** Record per-unit translation PHRs with word counts and proposed (unbanked)
  terms; tracker G4 Notes updated, rows stay open, translation_status stays draft.

## Phase 4: Fresh advisory G5 reviews (Units 1-6)

- [ ] **T015** Prepare G5 evidence and spawn a FRESH g5-reviewer for Unit 2; escalate any
  G3-dependency binding failure under G-2026-62..71 (G-2026-34 pattern); apply Urdu-side
  repairs within two cycles; row stays open.
- [ ] **T016** Same for Unit 3.
- [ ] **T017** Same for Unit 4.
- [ ] **T018** Same for Unit 5.
- [ ] **T019** Same for Unit 6.
- [ ] **T020** Unit 1: if no G5-demanded repair touched its mirror, its accepted human
  sign-off stands and no fresh G5 is forced; otherwise run the same pattern. Record the G5
  run PHRs.

## Phase 5: Final gates + PR

- [ ] **T021** `npm run check:all` (full tier incl. bilingual build); fix findings (max 2
  cycles, then document).
- [ ] **T022** Update `specs/content/efmp-302/tasks.md` Notes with all report paths; verify no
  G3/G5/G6/G7 row was marked done and translation_status is unchanged on units 2-6.
- [ ] **T023** `git push -u origin HEAD`; `gh pr create --base main` with the mandated body
  (course code, Urdu units + word counts, G3/G5 runs and outcomes, D/G codes consumed,
  escalations, gate summary). Do NOT merge.

## Verification

- [ ] `npm run check:content` green after each Urdu unit (T010-T013)
- [ ] `npm run figures:variants:check` clean; units 3-6 figures carry `.ur.svg` + `.ur.dark.svg`
- [ ] `npm run check:all` green at the final commit (T021)
- [ ] Units 2-6 carry fresh advisory G3 reports; units 2-6 carry fresh advisory G5 reports
- [ ] Every binding failure and budget exhaustion escalated under G-2026-62..71
- [ ] No G3/G5/G6/G7 tracker row marked done; no human initials; no self-signing
- [ ] Zero em dash in every file touched
- [ ] PR open to main, not merged
