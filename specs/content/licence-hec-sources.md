# Teaching-licence source documents (HEC, old scheme)

The HEC documents behind Part II (Pedagogical Content Knowledge) of the Sindh Teaching Licence
test. The test syllabus assesses Part II from the HEC curriculum, and `catalog/licence-objectives.json`
binds all 57 licence objectives to the eight guides below.

- **Source page:** https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Pages/Education.aspx
- **Retrieved:** 2026-11-04
- **Local folder:** `Scheme-and-Course-guides/teaching-License-course-guides-resources/`. The PDFs are
  git-ignored, as with `course-guides-2025/`. To restore them, download each linked file below and
  check its SHA-256.
- **Why this record is not in that folder:** `manifestRoots` in `scripts/lib/review-evidence.mjs` binds
  every tracked file under `Scheme-and-Course-guides/`, so committing there makes all G2 evidence stale.

Licence headings (`catalog/licence-objectives.json`): a = Methods of Teaching and Foundations of
Education; b = Child Development and Education Psychology; c = Classroom Management; d = Classroom
Assessment and Test Development and Evaluation; e = School Community and Teacher.

## Course guides cited by the licence objectives

| File | Title | Licence heading | Bytes | SHA-256 |
|---|---|---|---|---|
| [MethodsTeaching_Sept13.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/MethodsTeaching_Sept13.pdf) | Methods of Teaching | a | 1708940 | `1ccde846c70ea201b90b3e433cc12393d4c4064e8d6e7c30074c1631c6b94286` |
| [FoundationsEd_Sept13.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/FoundationsEd_Sept13.pdf) | Foundations of Education | a | 1140467 | `8cef0a9d45e76e3b7f6b138d287c25d3facce38a701b4970fe9ce99cf8e9d167` |
| [ChildDevpt_Sept13.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/ChildDevpt_Sept13.pdf) | Child Development | b | 3629678 | `24c8fa4c31101153dd2211f76f403b0ca63dc0ef4778958c065dbdc2f46d4146` |
| [EduPsy_Sept13.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/EduPsy_Sept13.pdf) | Educational Psychology | b | 1442265 | `a5c9ae15afe7d0dcdfdb1ea12e225ea2d401d89e49485dc07fb4786145a4af25` |
| [ClassroomMgmt_Sept13.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/ClassroomMgmt_Sept13.pdf) | Classroom Management | c | 1149793 | `75dccb734bd246517b8a43fa6d542bbf1b4e4486ecd52deafcb9dc05a67d79a6` |
| [ClassroomAssess_Sept13.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/ClassroomAssess_Sept13.pdf) | Classroom Assessment | d | 10041548 | `9d93132003ed9664300e51423cd773874ef8fc3177a88554eef0ed0a957c9a19` |
| [TestDevEval_Sept13.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/TestDevEval_Sept13.pdf) | Test Development and Evaluation | d | 19417468 | `b34aea195f7ed6f9920cff20203282e1e3ea8c91c3e13819d3c7be5e35f0fd13` |
| [SchoolCommTeacher_Sept13.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/SchoolCommTeacher_Sept13.pdf) | School, Community and Teacher | e | 5593981 | `0406597aeff114d31d9ce447362986a469f82c967828c195f22f47c011a74c46` |

## Companion to the Child Development guide

| File | Title | Licence heading | Bytes | SHA-256 |
|---|---|---|---|---|
| [ChildDevpt_Resources_Sept13.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/ChildDevpt_Resources_Sept13.pdf) | Child Development (Faculty Resources) | b | 1198992 | `2ec76f8ebc21c8e556cc6b4911f0076c9846b9c57416110eb04accff41ae5fe5` |

## Schemes of studies

Not cited by any objective. They show where each course sits in the programme.

| File | Title | Licence heading | Bytes | SHA-256 |
|---|---|---|---|---|
| [ADEinService.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/ADEinService.pdf) | Scheme of Studies: Associate Degree for In-Service Teachers | - | 7711241 | `452d3867ae6d9ddab811c712a37f40946fe6de71bf52e94158df65004df7d81b` |
| [Education-2012-Element.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/Education-2012-Element.pdf) | Curriculum of Education: ADE / B.Ed. (Hons) Elementary (Revised 2012) | - | 9398499 | `aa047e835dc7562fd8bf23f6dc0a16822e89db01bdeb63ced81bf9247ca74972` |
| [Scheme of studies for alternate route Entrants.pdf](https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/Scheme%20of%20studies%20for%20alternate%20route%20Entrants.pdf) | Scheme of Studies: B.Ed. (Hons) Secondary and alternate-route entrants | - | 866140 | `9c38f86fc69867c9e13dc5b4539ee1f5cf05e3614168448265949f4b664a7cfc` |

## Notes

- `catalog/licence-objectives.json` cites `ChildDevpt_Sept13-1.pdf`, the name of the local copy in
  `course-guides-2025/`. HEC's name is `ChildDevpt_Sept13.pdf`. The two files are byte-identical.
- The other eight guide files are also byte-identical to their copies in `course-guides-2025/`.
  Only the three scheme documents are new to this repository's source folders.
- Part I of the test (content knowledge, Classes 1-8) is assessed from the school curriculum, not
  from HEC guides, so nothing here covers it. See `specs/content/licence-blueprint.md`.
