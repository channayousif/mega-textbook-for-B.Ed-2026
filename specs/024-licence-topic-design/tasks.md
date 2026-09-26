# Tasks: Feature 024

## Phase 0 - platform
- [x] T001 Registry `catalog/licence-objectives.json` from S1 verbatim (57 objectives)
- [x] T002 `content-roots`: topic-list shape, `walkLicenceSubtopics`
- [x] T003 Schema + contract
- [x] T004 `check-licence.mjs` + `lib/licence.mjs`, wired into CONTENT_GATES/CI
- [x] T005 Reverse-link map + `LicenceRelevance` in DocItem footer
- [x] T006 `LicenceObjectives` heading list
- [x] T007 Answer-key bounded exception for licence pages
- [x] T008 Redirects plugin + `catalog/licence-redirects.json`
- [x] T009 Remove licence course codes (catalog, add-course check)
- [x] T010 Scaffold landing + heading pages (EN + UR)
- [x] T011 Tests: content-roots, licence helpers
- [x] T012 ROADMAP: Semester I content-complete; gaps G-2026-69
- [ ] T013 `check:content` + en/ur build green

## Phase 1 - wave 1
- [ ] T020 Heading C: migrate EED-313 into 10 subtopics + practice; redirects; delete `licence/eed-313/` + `specs/content/eed-313/`
- [ ] T021 Heading D: 16 subtopics + practice (EN + UR)
- [ ] T022 Heading A: 11 subtopics + practice (EN + UR)

## Phase 2 - wave 2
- [ ] T030 Heading B: 12 subtopics + practice (EN + UR)
- [ ] T031 Heading E: 8 subtopics + practice (EN + UR)
- [ ] T032 Drop `--allow-missing`; `LICENCE_REQUIRE_UR=1` in CI; blueprint coverage table refreshed
