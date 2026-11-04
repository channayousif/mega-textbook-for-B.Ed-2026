---
id: 20261122
title: Download teaching-licence course guides from HEC
stage: general
date: 2026-11-04
surface: agent
model: claude-opus-5-5
feature: none
branch: docs/licence-hec-guides
user: M Yousif Channa
command: none
labels: [board-direct, licence, sources]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/444
files:
  - specs/content/licence-hec-sources.md
  - .gitignore
  - history/prompts/general/20261122-download-licence-hec-guides.general.prompt.md
tests:
  - curl exit 0 and byte size equals HEC Content-Length for all 12 files
  - file and pdfinfo report valid PDFs with page counts for all 12 files
  - cmp against course-guides-2025 for the 9 guide files, all identical
  - pdftotext unit-heading spot check on ClassroomMgmt and FoundationsEd
  - git check-ignore confirms the PDFs are ignored
---

## Prompt

download all required files for teacheing license in /home/a2ahs/mega_book_for_B.Ed/Scheme-and-Course-guides/teaching-License-course-guides-resources from hec portal (old scheme) https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Pages/Education.aspx this will be the actual pedagogy resources.

## Response snapshot

Scoped "required" from the repository: `catalog/licence-objectives.json` binds all 57 licence objectives to eight HEC guides. Plan approved by the owner. Downloaded those eight, the Child Development faculty resources and three scheme documents (12 PDFs, 61 MB) to the owner's folder on the main checkout. Added a record with source URLs and SHA-256 values (first a folder README, moved to `specs/content/licence-hec-sources.md` after CI failed; see PHR 20261123), and a `.gitignore` rule for the PDFs.

## Outcome

- ✅ Impact: The licence source documents are in one folder, with a restorable record of where each came from.
- 🧪 Tests: All checks listed in the front matter passed.
- 📁 Files: The record, `.gitignore` and this PHR are committed; the 12 PDFs are local only.
- 🔁 Next prompts: Decide whether the three scheme documents need extracted text under `extracted-text/`.
- 🧠 Reflection: The nine guide files were already held in `course-guides-2025/`, byte-identical; only the schemes were new.

## Handoff (for CEO and agents)

- Shipped / changed: `Scheme-and-Course-guides/teaching-License-course-guides-resources/` holds 12 HEC PDFs on the host's main checkout, git-ignored; `specs/content/licence-hec-sources.md` lists URL, size and SHA-256 for each.
- Decisions the team must respect: Scope follows `catalog/licence-objectives.json`. Other HEC guides (English, Maths, Science and so on) were left out because Part I is assessed from the school curriculum. Catalog, blueprint and `licence/` content were not changed.
- Pending / next owner: Owner merges the PR. After that, the main checkout needs updating to get the ignore rule; until then the PDFs show as untracked there.
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): download and PDF integrity checks PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
