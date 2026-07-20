# Feature Specification: Virtual Classes, Assignments & Assessments

**Feature Branch**: `003-classes-assignments`
**Created**: 2026-07-19
**Status**: Draft
**Input**: User description: "create feature specs from SDD/003-classes-assignments.md and SDD/ROADMAP.md — virtual classes, assignments, submissions, and grading"

## Clarifications

### Session 2026-07-19

- Q: What happens to a class if the admin changes the owning teacher's role away from teacher, or suspends them, mid-term? → A: Auto-archive the class immediately (same read-only rules as FR-015) — no new assignments/submissions/joins, full history stays visible to students and the former teacher, and the class never sits in a live state without an active teacher of record.
- Q: Can auto-graded multiple-choice quiz items be used for summative (higher-stakes) assignments, or only formative ones? → A: Any assignment type, including summative — a teacher may mark any assignment built entirely from multiple-choice quiz items as auto-graded, regardless of its formative/summative weight.
- Q: Can a student resubmit/replace their work for an assignment after their first submission? → A: Yes — a student may edit/resubmit their work any time before the assignment's due date, and the new submission overwrites the prior one (no version history kept). Once the due date has passed, a submission can no longer be edited or resubmitted (this applies to on-time submissions that pass their due date, and to late submissions themselves).
- Q: For an auto-graded practice quiz, can a student retake it, and if so which score counts? → A: Unlimited retakes are allowed before the quiz assignment's due date; the highest (best) score across all attempts is the one recorded in the gradebook and shown to the teacher.
- Q: Can an archived class (manually archived per FR-015, or auto-archived per FR-020) be reactivated back to a live state? → A: Yes — both manual and automatic archives are reversible. The class's own teacher (if still eligible — i.e., still holding the teacher role and not suspended) or an administrator can reactivate an archived class, restoring its live/active state.
- Q: Once a teacher publishes an assignment, can they unpublish it again (hide it from students) without deleting it? → A: Yes, at any time, regardless of whether students have already submitted. While unpublished, students lose visibility of the assignment (and of their own submission/grade for it) until the teacher republishes it; existing submissions and grades are preserved unchanged and simply become invisible to students in the interim.
- Q: SC-005 says a 200-student class's submissions/grading should have "no noticeable slowdown" — what response-time target does this mean? → A: Under 5 seconds at the 95th percentile (p95) for key actions (submitting work, opening the grading queue, loading the roster) at a class size of 200 students.
- Q: A teacher removes a student from a class (FR-018). If that student later enters the class's still-valid join code again, what should happen? → A: Blocked until the teacher restores them — the join code no longer works for that specific student once removed; they cannot self-rejoin. Only the teacher can explicitly reverse the removal (a "restore" action on the roster). Keeps "remove" a deliberate, sticky action rather than one a student can quietly undo by re-entering a code they already have.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Set up a class and enroll students (Priority: P1)

A teacher creates a virtual class for one of their courses and gets a short code to share with their real students. Each student enters that code once and appears on the class roster from then on.

**Why this priority**: Nothing else in this feature has value until a class exists with real students in it — this is the foundation every other story depends on.

**Independent Test**: A teacher can create a class and see a roster of the students who joined using the code, with no assignments involved yet — this alone is useful (e.g., as a class list/attendance reference) and fully verifiable on its own.

**Acceptance Scenarios**:

1. **Given** a teacher is signed in, **When** they create a class for one of their courses, **Then** the class exists with a short, unique join code they can share.
2. **Given** a student is signed in and has a valid join code, **When** they enter it, **Then** they appear on that class's roster immediately.
3. **Given** a class's join code has been reissued by the teacher, **When** a student tries the old code, **Then** joining fails with a clear message, while students already enrolled are unaffected.
4. **Given** a teacher no longer wants new students joining a class, **When** they revoke its join code, **Then** new join attempts fail but the existing roster is unchanged.

---

### User Story 2 - Assign work from the book and collect submissions (Priority: P1)

A teacher picks an activity or assessment straight from a unit of the textbook, sets a due date and maximum marks, and publishes it to their class. Students see what's due and submit their work — text, a file, or both — before the deadline.

**Why this priority**: This is the core transaction the whole feature exists for: turning book content into real, gradable classwork. Without it, a class is just a roster.

**Independent Test**: With a class and roster already in place (Story 1), a teacher can publish one assignment linked to a real unit, and a student can submit work against it and see a confirmation — independently verifiable without any grading happening yet.

**Acceptance Scenarios**:

1. **Given** a teacher is viewing one of their classes, **When** they pick an activity or assessment from a unit and set a due date and maximum marks, **Then** the assignment is created in a few clicks with the title and unit link already filled in, and is not visible to students until published.
2. **Given** a teacher publishes an assignment, **When** an enrolled student opens their class, **Then** they see the assignment with its due date.
3. **Given** a student is working on an assignment before its due date, **When** they submit text and/or a file, **Then** the submission is recorded as on time.
4. **Given** an assignment's due date has passed and late submissions are allowed, **When** a student submits, **Then** it is accepted and clearly marked late.
5. **Given** an assignment's due date has passed and late submissions are not allowed, **When** a student tries to submit, **Then** the attempt is blocked with a clear, bilingual explanation.
6. **Given** a student is choosing a file to submit, **When** the file is not one of the accepted types or exceeds the size limit, **Then** the upload is rejected with a clear explanation before it counts as a submission attempt.

---

### User Story 3 - Grade submissions and return results (Priority: P1)

A teacher reviews everything submitted for an assignment in one place, marks each one with a score and feedback, and returns it. Students see their marks and feedback as soon as it's returned.

**Why this priority**: Completes the core teaching loop this feature exists to deliver — assign, submit, grade, return — the same loop named as the feature's own definition of done.

**Independent Test**: With at least one real submission in place (Story 2), a teacher can grade it and a student can see the result — independently demonstrable as the final leg of the core loop, regardless of how many other stories are built.

**Acceptance Scenarios**:

1. **Given** a teacher opens an assignment with submissions, **When** they view the queue, **Then** they see every submission for that assignment from their own class, one at a time or as a list.
2. **Given** a teacher is reviewing a submission, **When** they enter a mark (within the assignment's maximum) and feedback and return it, **Then** the student can immediately see their mark and feedback.
3. **Given** a submission has already been graded and returned, **When** the teacher edits the mark or feedback, **Then** the student sees the updated result, not the original.
4. **Given** a student has not yet submitted work for a published assignment past its due date, **When** the teacher views the queue, **Then** that student is clearly shown as missing, not blank or absent from the list.

---

### User Story 4 - Consult the official answer key while grading (Priority: P2)

A teacher grading written work wants to check the book's official marking guidance for that assessment, but only teachers the administrator has specifically approved for this can see it — the same "verified teacher" approval already used elsewhere on the platform.

**Why this priority**: Improves grading consistency and quality, but grading itself (Story 3) already works without it — a teacher can grade from their own subject knowledge.

**Independent Test**: An approved ("verified") teacher can open the official answer key or marking rubric for a book assessment and view it; a teacher who is not approved, or a student, cannot — testable independently of any actual grading taking place.

**Acceptance Scenarios**:

1. **Given** a teacher has been approved by an administrator for restricted material, **When** they open a book assessment's official answer key or marking rubric, **Then** they can view it.
2. **Given** a teacher has not been approved for restricted material, **When** they try to view the same answer key or rubric, **Then** access is refused.
3. **Given** any student, **When** they attempt to reach an answer key or marking rubric by any means, **Then** access is refused.

---

### User Story 5 - Export the gradebook (Priority: P2)

A teacher downloads all the marks for a class as a spreadsheet, to share with department records or keep for their own reporting.

**Why this priority**: Valuable for record-keeping and reporting, but not required for the teach-submit-grade loop to deliver its core value.

**Independent Test**: With graded assignments already in place (Story 3), a teacher can export their class's gradebook and open it correctly in a spreadsheet program, including Urdu names — verifiable as a standalone reporting action.

**Acceptance Scenarios**:

1. **Given** a teacher's class has graded assignments, **When** they export the gradebook, **Then** they receive a spreadsheet file with every student's marks per assignment.
2. **Given** a class includes students with Urdu names, **When** the exported file is opened in a common spreadsheet program, **Then** the Urdu names display correctly rather than as garbled characters.

---

### User Story 6 - Take an auto-graded practice quiz (Priority: P3)

A student answers a set of multiple-choice practice questions for a unit and sees their score immediately, without waiting for a teacher to grade it by hand.

**Why this priority**: A useful, self-contained learning aid, but distinct from — and not required by — the core assign/submit/grade loop, which already works entirely through manually graded written work.

**Independent Test**: A student can take a multiple-choice quiz linked to a unit and see an instant score — fully testable without any teacher grading action involved.

**Acceptance Scenarios**:

1. **Given** a teacher has published a multiple-choice practice quiz for a unit, **When** a student completes and submits it, **Then** their score appears immediately without waiting for teacher action.
2. **Given** a student has completed an auto-graded quiz, **When** they view their results, **Then** their score is also visible to their teacher as part of that assignment's results.

---

### Edge Cases

- What happens when a student who was removed from a class tries to view or submit to an assignment there? → Access is refused; their past submissions and grades remain intact for the teacher's records, but they no longer have active access to the class.
- What happens if a removed student enters the class's join code again, hoping to rejoin? → The attempt is blocked with a message telling them they were removed by their teacher (distinct from an "invalid code" message, since they are a known former member, not an unrelated guesser). They can only return via the teacher's explicit restore action, never by re-entering the code themselves.
- What happens to a student's past submissions and grades if they delete their own account? → The gradebook entry is retained (marks, feedback, submission history) but displayed without identifying the student by name, consistent with this platform's rule that account deletion anonymises rather than destroys academic records.
- What happens if a student tries an expired or already-reissued join code? → The old code simply no longer works; no partial or confusing state results.
- What happens when a teacher tries to grade a submission with a mark above the assignment's maximum? → The system rejects the entry and asks for a valid mark.
- What happens when an assignment is edited (e.g., due date changed) after students have already submitted work? → Existing submissions are not altered or lost; the assignment's current due date applies going forward for late/on-time marking of any submission made after the edit.
- What happens if a teacher archives a class? → The class becomes read-only: no new assignments, submissions, or joins are possible, but the existing roster, assignments, submissions, and grades remain fully visible to the teacher and to students who were enrolled.
- What happens if an archived class is reactivated? → It returns to a live/active state (new joins, assignments, and submissions become possible again); its full prior history is unaffected. A class auto-archived due to a teacher role change/suspension (FR-020) can only be reactivated by an administrator, not by the (now-ineligible) former owning teacher.
- What happens to a student's view of an assignment (and their own submission/grade for it) if a teacher unpublishes it after publishing? → The assignment disappears from the student's list along with their submission/grade for it; nothing is deleted, and both reappear unchanged if the teacher republishes it.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Teachers MUST be able to create a class tied to one of their courses, with a short, unique join code students use to enroll themselves.
- **FR-002**: Teachers MUST be able to reissue or revoke a class's join code at any time; doing so MUST only affect future join attempts, never students already enrolled.
- **FR-003**: Students MUST be able to enroll in a class by entering a valid join code while signed in, and MUST appear on that class's roster immediately upon joining.
- **FR-004**: Teachers MUST be able to create an assignment by selecting an activity, formative assessment, or summative assessment directly from a unit of the textbook (or a custom assignment not tied to a specific unit item), with the assignment's title and a link to the source unit pre-filled.
- **FR-005**: Teachers MUST be able to set a due date, a maximum mark, and whether late submissions are allowed, for each assignment, and MUST be able to publish an assignment to make it visible to their enrolled students (assignments are not visible to students before publication). Teachers MUST also be able to unpublish a previously published assignment at any time, regardless of existing submissions; while unpublished, enrolled students MUST NOT see the assignment or their own submission/grade for it, and any existing submissions and grades MUST be preserved unchanged and become visible again if the teacher republishes it.
- **FR-006**: Students MUST be able to see all published assignments for classes they are enrolled in, along with each assignment's due date and current status (not yet submitted, submitted, late, graded, or returned).
- **FR-007**: Students MUST be able to submit work for a published assignment as text, an uploaded file, or both, before or after the assignment's due date (subject to FR-008). Before the due date passes, a student MUST be able to edit or resubmit their work any number of times, with each new submission overwriting the prior one (no version history is retained); once the due date has passed, a submission (on-time or late) MUST become locked and can no longer be edited or resubmitted.
- **FR-008**: The system MUST evaluate every assignment deadline in Pakistan Standard Time (Asia/Karachi). A submission made after the due date MUST be accepted and marked late if the assignment allows late submissions, or MUST be blocked with a clear bilingual explanation if it does not.
- **FR-009**: Uploaded submission files MUST be restricted to a small set of common document and image formats and MUST NOT exceed 10 MB per file; submissions outside these limits MUST be rejected with a clear explanation before being recorded.
- **FR-010**: Teachers MUST be able to view every submission made to one of their own assignments in a single queue, MUST be able to enter a mark (not exceeding the assignment's maximum) and written feedback for each submission, and MUST be able to return it so the student can see the result.
- **FR-011**: Teachers MUST be able to change a mark or feedback on a submission that was already returned, and the student MUST see the corrected result rather than the original.
- **FR-012**: Students MUST be able to see their own mark and feedback for every submission that has been returned to them, and MUST NOT be able to see any other student's submissions, marks, or feedback.
- **FR-013**: The system MUST restrict access to a book assessment's official answer key or marking rubric to teachers an administrator has specifically approved for restricted material (the same "verified teacher" approval used elsewhere on the platform); students MUST NOT be able to access answer keys or marking rubrics under any circumstance.
- **FR-014**: Teachers MUST be able to export their class's complete gradebook (every student, every assignment, every mark) as a spreadsheet file that displays Urdu names correctly when opened in common spreadsheet software.
- **FR-015**: Teachers MUST be able to archive a class, after which no new joins, assignments, or submissions are possible for that class, while its full history (roster, assignments, submissions, grades) remains visible to the teacher and to previously enrolled students. Teachers (if still eligible — holding the teacher role and not suspended) and administrators MUST be able to reactivate an archived class, restoring it to a live/active state.
- **FR-016**: All student- and teacher-facing text for classes, assignments, submissions, grading, and exports MUST be available in both English and Urdu.
- **FR-017**: Teachers MUST be able to publish a multiple-choice practice quiz for a unit; when a student completes it, the system MUST score it automatically and show the result to the student immediately, and MUST make that result visible to the teacher as part of that assignment's results. Students MUST be able to retake the quiz an unlimited number of times before its due date; the system MUST record and display the highest (best) score achieved across all attempts as the score of record in the gradebook and teacher-facing results.
- **FR-018**: A student removed from a class MUST immediately lose the ability to view or submit to that class's assignments, while their prior submissions and grades remain intact and visible to the teacher. A removed student MUST NOT be able to regain access by entering the class's join code again, even if that code remains valid for other students; only an explicit teacher restore action (FR-022) returns them to active enrollment.
- **FR-019**: When a student's account is deleted, their past submissions and grades within any class MUST remain in that class's gradebook with marks, feedback, and submission content intact, displayed without identifying the student by name.
- **FR-020**: If an administrator changes a class's owning teacher's role away from teacher, or suspends that teacher's account, while the class is still active, the system MUST automatically archive that class (per the same read-only rules as FR-015) so it never remains in a live, actively-open state without an active teacher of record. An administrator MUST be able to reactivate such a class (e.g., after restoring the teacher's role/standing, or reassigning it); the owning teacher MUST NOT be able to reactivate it themselves while ineligible (role changed away from teacher, or suspended).
- **FR-021**: The system MUST support automatic multiple-choice scoring for any assignment type — including summative assessments — when a teacher builds that assignment entirely from multiple-choice quiz items.
- **FR-022**: Teachers MUST be able to restore a student they previously removed from their own class, returning that student to active enrollment on the roster with immediate access to the class's published assignments restored; a teacher MUST NOT be able to restore a student removed from another teacher's class.

### Key Entities *(include if feature involves data)*

- **Class**: A teacher-owned virtual section of a course, with a name, an academic term label, a join code, and an archived/active state. Belongs to one course and one teacher; has many enrolled students. Archiving (manual or automatic) is reversible: the eligible teacher or an administrator can reactivate an archived class back to active.
- **Enrollment**: A student's membership in a class, with a status (active or removed) and the date they joined. Links one student to one class. A removed enrollment returns to active only through an explicit teacher restore action — never automatically, and never by the student re-entering the class's join code.
- **Assignment**: A piece of work a teacher publishes to a class, drawn from a unit's activity, formative assessment, or summative assessment (or created as a custom assignment), carrying instructions, a due date, a maximum mark, whether late submissions are allowed, and a publication state (unpublished/draft or published; toggleable by the teacher at any time, including back to unpublished, without affecting existing submissions or grades).
- **Submission**: A student's response to an assignment — text, an uploaded file, or both — with a submission time and a status (submitted, late, graded, or returned). Editable/resubmittable by the student until the assignment's due date passes (each resubmission overwrites the prior content, no version history), then locked.
- **Grade**: The mark and written feedback a teacher gives to one submission, including who graded it and when.
- **Quiz item**: A multiple-choice practice question tied to a unit, used for automatic scoring; visible in full (including the correct answer) only to approved ("verified") teachers and administrators, never to students.
- **Quiz attempt**: A single scored run through an auto-graded quiz assignment by one student. A student may have multiple attempts per quiz assignment (unlimited, before the due date); the highest-scoring attempt is the score of record shown to the teacher and stored in the gradebook.
- **Answer key / marking rubric**: The official, teacher-only marking guidance for a book assessment, gated behind the same "verified teacher" approval as quiz items.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A teacher can go from an empty class to a published, book-linked assignment in under 2 minutes and 3 clicks after selecting the source unit item.
- **SC-002**: A student can join a class and see their first assignment within 1 minute of receiving a join code.
- **SC-003**: 100% of submissions made after an assignment's due date are correctly marked late (when allowed) or correctly blocked (when not), evaluated against Pakistan Standard Time.
- **SC-004**: No student can, under any tested condition, retrieve another student's submission, grade, or feedback, or any assessment's answer key/marking rubric — verified by dedicated tests that specifically try and fail to do so, not only by happy-path tests passing.
- **SC-005**: A class of 200 students can be enrolled and have their submissions collected and graded with key actions (submitting work, opening the grading queue, loading the roster) completing in under 5 seconds at the 95th percentile (p95).
- **SC-006**: A teacher can complete the full core loop — create class, student joins, assignment published, student submits, teacher grades, student sees result — in a single sitting with no dead ends or unclear states at any step.
- **SC-007**: An exported gradebook opens correctly in common spreadsheet software with all names (English and Urdu) displaying correctly, verified across at least one Urdu-name test case.

## Assumptions

- A class has exactly one owning teacher (no co-teaching/multiple instructors per class in this feature); this matches how classes are recorded and is not expected to change without a later amendment.
- A join code is a short, easily shareable code (comparable to widely used classroom tools); it is not intended to resist a determined, targeted guessing effort on its own, since joining also requires the joiner to be signed in as a registered account.
- There is no cap on how many students may enroll in a single class in this feature, beyond the general platform-wide scale target (SC-005); a future feature may introduce one if needed.
- Deleting an assignment or a class outright (as opposed to archiving) is out of scope for this feature; archiving (FR-015) is the only supported way to close out a class, preserving history and avoiding accidental data loss.
- Following Constitution Art. IX.3's precedent for role/capability changes, granting or revoking the "verified teacher" approval that gates answer-key access (User Story 4) continues to be an explicit, audited administrator action, unchanged by this feature — this feature only consumes that existing approval, it does not redefine how it is granted.
- Any user who has self-selected the "teacher" role (per Spec 002/ADR-0005, without requiring administrator approval) may create and run classes and assignments; only access to answer keys/marking rubrics requires the separate administrator-granted "verified teacher" approval. This directly follows the existing decision recorded in ADR-0005 and is not re-opened here.
- Notifying students or teachers of events (a new assignment, a returned grade, an approaching deadline) by email or push notification is out of scope for this feature; results and status are visible in-app only. This matches the notification backlog noted in the source planning material.
- Scanning uploaded files for malware/viruses is out of scope for this feature; file-type and size restrictions (FR-009) are the only safeguard in this feature.

## Dependencies

- **Spec 001 (Content Platform)**: supplies the courses and units this feature's classes and assignments are built on; assignments must stay linked to the textbook's actual unit structure.
- **Spec 002 (Authentication & Roles)**: supplies signed-in accounts, the self-selected teacher/student roles, and the administrator-granted "verified teacher" approval this feature's answer-key access (User Story 4) relies on directly. This feature also resolves two items Spec 002 explicitly deferred here: what happens to a teacher's classes/assignments if their role changes or is suspended (FR-020) and how a deleted student's academic record is anonymised in the gradebook (FR-019).
- Blocks Specs 004 (student dashboard) and 005 (teacher dashboard), which surface this feature's classes, assignments, submissions, and grades in each dashboard's own view.
