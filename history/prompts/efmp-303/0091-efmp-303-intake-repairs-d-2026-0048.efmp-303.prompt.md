---
id: 0091
title: EFMP-303 intake repairs from G0/G1 intake D-2026-0048
stage: efmp-303
date: 2026-10-10
surface: agent
model: claude-opus-5-5
feature: efmp-303
branch: agent/TEX-40
user: M Yousif Channa
command: board directive (issue_reopened_via_comment)
labels: ["bilingualauthor", "efmp-303", "intake-repairs", "content-spec"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: TEX-40
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/120
files:
  - specs/content/efmp-303/content-spec.md
  - specs/content/efmp-303/sources/unit-01.md
  - specs/content/efmp-303/sources/unit-02.md
  - specs/content/efmp-303/sources/unit-03.md
  - specs/content/efmp-303/sources/unit-04.md
  - specs/content/efmp-303/sources/unit-05.md
  - specs/content/efmp-303/sources/unit-06.md
  - specs/content/efmp-303/coverage/unit-01.md
  - specs/content/efmp-303/coverage/unit-02.md
  - specs/content/efmp-303/coverage/unit-03.md
  - specs/content/efmp-303/coverage/unit-04.md
  - specs/content/efmp-303/coverage/unit-05.md
  - specs/content/efmp-303/coverage/unit-06.md
  - docs/semester-2/efmp-303/unit-06/topic-01.mdx
  - docs/semester-2/efmp-303/unit-06/topic-02.mdx
  - docs/semester-2/efmp-303/unit-06/topic-03.mdx
tests:
  - npm run check:content (11/13 PASS; pipeline-gate red because content-spec.status is draft until board intake approves; content-status.json is a build artifact)
---

## Prompt

Board directive (comment a0db04f6): EFMP-303 content-spec.md unchanged since intake D-2026-0048. Make remaining repairs:
- Week schedule follows guide's 16-week table, with Week 16 assigned
- Fix the two NEP links (moe.gov.pk serves unrelated page; mofept.gov.pk bare domain)
- Resolve unesco-epg, andrabi-pak and khan2018 to real works or replace with verified author-selected works
- open_access_floor: 1
- Drop Unit 1's link to objective 5
- Name the outcome or reading behind any added row
Then comment 'repairs done' and set in_review.

## Response snapshot

All repairs applied in commit 2144ac56 on branch agent/TEX-40:

1. **Week schedule**: Replaced the false claim "guide carries no week table" with the actual 16-week guide breakdown. Unit 1 = Weeks 1-2, Unit 2 = Weeks 3-5, Unit 3 = Weeks 6-8, Unit 4 = Weeks 9-10, Unit 5 = Weeks 11-12, Unit 6 = Weeks 13-16.
2. **NEP links**: moe.gov.pk → archived Wayback Machine link (original serves Cisco NetAcad page). mofept.gov.pk → archived Wayback Machine link (domain currently unreachable).
3. **Citations resolved**:
   - `unesco-epg` → IIEP-UNESCO "What is educational planning?" page (verified URL)
   - `andrabi-pak` → replaced with `pak-vision2025` (Pakistan Vision 2025, Planning Commission of Pakistan, open-access PDF)
   - `khan2018` → replaced with `gem-report2020` (UNESCO Global Education Monitoring Report 2020, open-access)
4. **open_access_floor**: Set to 1 per unit (was 0)
5. **Unit 1**: CLO link to objective 5 dropped (now traces to CLO 1 only)
6. **Added rows**: All author-selected readings named with their derivation in the reading list and sources files
7. **Inline citations**: Updated across all topic files (khan2018 → gem-report2020, andrabi-pak → pak-vision2025)
8. **Sources files**: Updated with registry verification (Crossref/OpenAlex) to meet source-floor requirements

QC: depth-gate PASS, source-floor PASS. Expected red: pipeline-gate (content-spec status: draft), content-status.json (build artifact).

Task set to in_review with request_confirmation interaction (cde5a97d) for board review.

## Outcome

- ✅ Impact: All intake repairs complete; content-spec ready for G0/G1 intake re-run
- 🧪 Tests: check:content 11/13 PASS (2 expected red)
- 📁 Files: 16 files modified (content-spec, 6 sources, 6 coverage, 3 topic files)
- 🔁 Next prompts: Board confirms repairs → G0/G1 intake re-run → spec approved → continue authoring
- 🧠 Reflection: The unresolvable print monographs (andrabi-pak, khan2018) were replaced with verifiable open-access government/UNESCO documents that are more useful to students than unverifiable citations.

## Handoff (for CEO and agents)

- **What shipped**: EFMP-303 intake repairs (commit 2144ac56, PR #120)
- **Decisions the team must respect**:
  - `andrabi-pak` and `khan2018` are permanently replaced with `pak-vision2025` and `gem-report2020`
  - NEP links use archived versions until the Ministry sites are restored
  - Week schedule follows the guide's 16-week table exactly
- **What is pending**: Board confirmation of repairs → G0/G1 intake re-run → spec approval → G2 evidence regeneration → G3 review → Urdu mirror (G4)
- **Who owns it**: Board (intake confirmation), then BilingualAuthor (continue authoring)
- **Paperclip issues affected**: TEX-40 (in_review, waiting for board confirmation)
