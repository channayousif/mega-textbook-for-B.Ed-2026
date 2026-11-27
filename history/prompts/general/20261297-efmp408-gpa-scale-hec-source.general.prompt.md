---
id: 20261297
title: Bind HEC sources for the EFMP-408 Unit 5 GPA scale
stage: general
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: fix/862-efmp408-gpa-source
user: M Yousif Channa
command: see the issue 802, comment / see <IIU URL> / go ahead, cite the IIU URL
labels: [board-direct, content, efmp-408, sources]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: "#862"
  adr: null
  pr: null
files:
  - docs/semester-4/efmp-408/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-05/topic-01.mdx
  - specs/content/efmp-408/sources/unit-05.md
  - specs/content/efmp-408/sources/texts/hec-2017-cgpa-equivalence.md
  - specs/content/efmp-408/sources/texts/hec-uss-guidelines.md
  - specs/content/efmp-408/coverage/unit-05.md
  - specs/content/efmp-408/tasks.md
  - specs/content/efmp-408/reviews/unit-05/G2/
  - specs/gaps.md
  - specs/034-backlog-tracking/tasks.md
tests:
  - check:depth-gate, check:no-em-dash, check:no-answer-keys, check:source-floor pass
  - check:pipeline-gate after G2 evidence refresh
---

## Prompt

see the  issue 802, comment

see https://www.iiu.edu.pk/wp-content/uploads/downloads/qec/2019/Quality-Assurance-Polices/CGPA-Equivalence-of-Grades-051019.PDF

go ahead, cite the IIU URL

## Response snapshot

#802 had no comments; the owner's comment was on #862 (G-2026-235): Pakistani universities
generally use a 4-point GPA scale, some programmes a 5-point one, and HEC publishes the details.
Found HEC's uniform semester system guidelines (section 13.1, grade/grade point/percentage bands,
CGPA 3.00 = 71%) and read the owner-supplied HEC letter "CGPA Equivalence of Grades" (24 March 2017,
Ref. 1-22 (NQAC)/QAD/2017/HEC/03-360; NQAC 22nd meeting, 9 January 2017): equivalents on 4, 4.5, 5,
8 and 10-point scales, and national universities on the semester system should preferably use the
four-point system (A 4.0, B 3.0, C 2.0, D 1.0). Topic 5.1 (EN and UR) now cites the letter for the
scale and the other scales (B = 3.0 / 3.75 / 7.5), cites the guidelines for F = 0.0 and the
CGPA-to-percentage rule, and practice question 4 says to count an E as an F. Both sources are bound
with excerpt notes; the no-external-source row is replaced; G2 evidence refreshed; gap resolved.

## Outcome

- ✅ Impact: U5-02's grade-point half is now sourced; the disclaimer is gone.
- 🧪 Tests: content gates pass; G2 re-recorded.
- 📁 Files: listed above.
- 🔁 Next prompts: G3 for Unit 5 reads the new sources; G5 checks the Urdu paragraphs.
- 🧠 Reflection: the owner's pointer led to a dated primary HEC letter, better than the undated guidelines alone.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-408 Unit 5 Topic 5.1 GPA section cites HEC (2017) and HEC (n.d.); sources bound.
- Decisions the team must respect: owner ruling 2026-11-27, cite the HEC letter through the IIU-hosted URL.
  The four-point scale is HEC's preferred scale; other scales are named only through the HEC equivalence table.
- Pending / next owner: independent G3 (EN) and G5 (UR) of Unit 5, not started.
- Issues affected: Closes #862.

## Evaluation notes (flywheel)

- Failure modes observed: the owner named #802 but meant #862.
- Graders run and results (PASS/FAIL): content gates PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
