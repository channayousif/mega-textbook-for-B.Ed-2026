# HEC 2025 outcomes crosswalk

Maps each outcome in HEC's *Revised Curriculum for Degree Programs in Education 2025*
(No. HEC/NCRC/EDUCATION/2025/7367, 11 April 2025; text in `booklet.txt`) to the units that teach it.

- **This is a reference, not a review.** The Sindh scheme and guides still decide what is taught
  (Constitution Art. II). It was read by the authoring agent on 2026-11-04, not by an independent
  G3 reviewer, and it certifies nothing.
- **Method.** Each outcome was read against topic descriptions, section headings, activities and
  summative tasks, with the passage read where the answer was unclear. A keyword match alone does
  not count.
- **Status.** `covered`: the units teach it. `partial`: part of it is taught. `gap`: not taught in
  this course. `pending`: units do not exist yet. Only `covered` appears on the site.
- **Numbers** give the outcome's order in the booklet. `catalog/hec-curriculum.json` must agree,
  and `tests/unit/hec-curriculum.test.mjs` checks it.

| Course | No. | Status | Units | Evidence |
|---|---|---|---|---|
| EFMP-301 | 1 | covered | 2, 3, 6 | Behavioural and cognitive theories (Topics 3.1, 3.2); socio-cultural through Bandura (3.3) and Vygotsky (3.4); motivation theories (6.1); development (2.1-2.4) |
| EFMP-301 | 2 | covered | 2 | Cognitive, emotional and social development (2.3); implications for teaching, with a task on a lesson taught, observed or received as a pupil (2.4) |
| EFMP-301 | 3 | covered | 8, 11 | Designing a positive learning environment (8.2); school and teacher support for well-being (11.2) |
| EFMP-302 | 1 | covered | 2, 3 | Teacher roles (3.5); duties owed under codes of conduct (2.2) |
| EFMP-302 | 2 | covered | 3 | What an effective teacher means (3.1); qualities and traits (3.2) |
| EFMP-302 | 3 | covered | 1, 5 | Accountability, autonomy and collegiality within professionalism (1.3); the increased focus on accountability (5.2) |
| EFMP-302 | 4 | gap | | Planning, implementing and evaluating strategies for diverse learners is not taught here: differentiated instruction has one passing mention (5.1). EFMP-305 Unit 3 teaches it elsewhere in the programme |
| EFMP-302 | 5 | covered | 3 | Effectiveness as the teacher's effect on learners: achievement gain, observed practice and breadth of outcomes, with a task judging two teachers (3.1) |
| EFMP-303 | 1 | covered | 1 | Meaning, scope and importance of policy (1.1) |
| EFMP-303 | 2 | covered | 2, 3 | National Education Policies (2.1-2.3); development plans and Vision 2025 (3.1) |
| EFMP-303 | 3 | covered | 1, 2 | Before and after independence (1.3); milestones (1.4); policies 1947-2000 (2.1) |
| EFMP-303 | 4 | covered | 2, 5 | Outcomes and challenges of NEP 2009, including learning levels (2.2); the 2017 shift to quality (2.3); education's limited contribution so far (5.2) |
| EFMP-303 | 5 | covered | 4, 6 | Analysing a policy's implementation failure (4.2); proposing a future direction (6.3) |
| EFMP-304 | 1 | covered | 1, 4 | Critical thinkers and teachers as critical thinkers (1.5); the reflective process applied to a lesson (4.3) |
| EFMP-304 | 2 | covered | 5, 6 | Comparing and choosing a reflection model for one's own practice (5.4); structuring a journal and plan (6.2) |
| EFMP-304 | 3 | partial | | Collaborative discussion is present: pair work with swaps and disagreement (4.1, 4.2, 5.1) and peer discussion as a reflection route (4.4). Structured peer evaluation is not taught |
| EFMP-305 | 1 | partial | | Segregation, integration and inclusion are distinguished and judged against definitions (1.1, 1.2). Comparing how effective the models are in diverse classrooms is thin; Topic 1.2 itself notes its evidence source could not be verified in full |
| EFMP-305 | 2 | covered | 3, 4 | Differentiation and UDL (3.1); a full inclusive lesson plan (3.3); multiple means in classroom arrangement and aids (4.1, 4.2). Practicum tasks ask for it to be tried |
| EFMP-305 | 3 | covered | 5 | Private written reservation, sorted by source, carried into an honest paragraph on one's own attitude (5.3) |
| EFMP-406 | 1 | covered | 1, 2 | Literacy as social practice (1.1); critical, digital, media, information and multimodal literacies (2.1, 2.2) |
| EFMP-406 | 2 | covered | 2, 4, 5 | Redesigning a message for readers (2.2); a digital reading lesson proposal (4.1); literacy projects and ICT activities (5.1, 5.2) |
| EFMP-406 | 3 | partial | | The change from skills to social practice (1.1), screens (4.1) and future trends (6.2) are taught. The globalised side is thin: little beyond UN Goal 4 (6.2) |

EFMP-407, EFMP-408, EFPG-401 and later major courses are `pending`. School Observation and Practice
Teaching I-II have placeholder codes (`EFPC-`), so they get catalog rows once codes are assigned.
Teaching of Sindhi shares code EFPG-503 with Teaching of Urdu in the scheme and has no HEC row: when
those pages are created, the notice must not show on the Sindhi course.
