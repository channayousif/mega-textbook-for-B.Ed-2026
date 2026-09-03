# Feature Specification: Curriculum-owner console and the content-improvement loop

**Feature Branch**: `010-curriculum-owner-console`
**Created**: 2026-09-03
**Status**: Draft
**Input**: User description: "Spec 010 - Curriculum-owner console and the content-improvement loop. Combined feature covering four gaps the owner reported after Spec 009 (per approved plan Part 1; item 3 zero em dash already shipped as Constitution v2.7.0). 1A: interactive persisted self-assessment checklist. 1B: structured content feedback general + passage-level with a Claude revise-topic loop. 1C: curriculum-owner dashboard at /app/admin. 1D: content/figure status report. All additive; no existing table, trigger, RLS policy, gate, or Spec 005 surface changes."

## Overview

After Spec 009 shipped, the curriculum owner reported four gaps that this feature closes as one release:

- **1A** - the per-topic self-assessment checklist is dead text; it should be a live, saved record of a student's self-assessment and progress.
- **1B** - reader feedback on a topic has nowhere to go and cannot point at a specific sentence; it should reach the curriculum owner in context and feed a repeatable, assistant-driven revision of the topic.
- **1C** - the curriculum owner has no single place to see the whole picture (content status, outstanding figures, feedback, progress) or act on it.
- **1D** - there is no report of which figures still need to be produced.

Every part is **additive**. No existing table, database trigger, access-control policy, content gate, or Spec 005 surface changes.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A self-assessment checklist that sticks (Priority: P1)

A student working through a topic reaches the "Self-assessment checklist" section and ticks the statements they can now do. The ticks are saved to their account. When they come back next week on a different device, the same items are still ticked, and their progress area shows how much of each unit's self-assessment they have completed.

**Why this priority**: It is self-contained, touches only new student-facing storage, carries the least risk, and on its own turns a static section into the "record of self-assessment and course progress" the owner asked for.

**Independent Test**: Sign in as a student, tick two of four items on one topic, reload and confirm they persist, open the same account in a second browser and confirm they show ticked, and confirm the progress area reports the per-topic and per-unit completion fraction. Sign out and confirm the checklist is still interactive on that device.

**Acceptance Scenarios**:

1. **Given** a signed-in student on a topic page, **When** they tick a checklist item, **Then** the item stays ticked after a full page reload and on another device signed into the same account.
2. **Given** a signed-in student who has ticked items across several topics, **When** they open their progress area, **Then** they see a self-assessment completion figure per topic, per unit, and per course, shown separately from unit-coverage figures.
3. **Given** a signed-out visitor on a topic page, **When** they tick an item, **Then** the item stays ticked for that browser and a hint explains that signing in syncs it across devices.
4. **Given** a student who has ticked every checklist item across every topic of a unit, **When** they view that unit in their progress area, **Then** they see a non-blocking prompt suggesting they mark the unit as studied, and marking it studied is still their explicit action.
5. **Given** a teacher account, **When** they use any part of the platform, **Then** they cannot see any student's self-assessment data.

---

### User Story 2 - Readers flag problems in the text; the owner triages them (Priority: P1)

A student (or a teacher) reading a topic spots a confusing sentence. They select the sentence, click "give feedback on this passage", and write a short comment. They can also leave general feedback on the whole topic. The curriculum owner opens a queue, sees each item with the quoted passage in context, filters to one topic, and moves items through open, planned, resolved, or declined.

**Why this priority**: This is the owner's central ask and the input to every downstream improvement. It is independent of the other stories and delivers value the moment the queue exists.

**Independent Test**: As a signed-in student, submit one general and one passage-anchored comment on a topic in each language. As the curriculum owner, open the queue, confirm both appear with the quoted passage shown as a blockquote, filter by unit and status, and move one item open -> planned -> resolved with a note. Confirm a non-owner cannot change status and a reader sees only their own items.

**Acceptance Scenarios**:

1. **Given** a signed-in reader on a topic page, **When** they select a sentence and submit a comment, **Then** the feedback is recorded against that topic, unit, course, language, and nearest section, with the exact selected text and enough surrounding context to find it again.
2. **Given** a signed-in reader on a topic page, **When** they submit general feedback without selecting text, **Then** the feedback is recorded as whole-topic feedback.
3. **Given** a signed-out visitor, **When** they view a topic page, **Then** no feedback control is shown and they cannot submit feedback.
4. **Given** feedback exists, **When** the curriculum owner opens the feedback queue, **Then** every item is listed with its quoted passage in context and can be filtered by course, unit, topic, status, scope, and language.
5. **Given** an open feedback item, **When** the curriculum owner moves it to planned, then resolved with a note and a reference to the change, **Then** the new status and note are saved and shown to the item's author.
6. **Given** a feedback item, **When** a non-owner attempts to change its status, or anyone attempts an out-of-sequence change, **Then** the change is rejected.
7. **Given** the existing teacher "suggest improvement" flow, **When** this feature ships, **Then** that flow and its moderation queue behave exactly as before.

---

### User Story 3 - The curriculum owner sees the whole picture on one page (Priority: P2)

The curriculum owner opens a single overview page and sees, at a glance: which units are authored versus still planned per course, their language-completion and depth-check state, how many figures are outstanding and where, how much feedback is waiting in each stream, and how students are progressing (unit coverage, self-assessment, achievements). Links take them straight to each detailed queue, to the repository, and to the catalog.

**Why this priority**: High value for the owner, but it presents data the other stories produce, so it lands more usefully after them. Its shell and the progress panels can still ship and be demonstrated on their own.

**Independent Test**: Sign in as the curriculum owner, open the overview, and confirm each panel renders with accurate counts (cross-checked against the underlying checks and queues), shows an explicit empty state where there is no data, and links out to the right places. Confirm a non-owner is refused the page. Confirm the page renders correctly in both languages and right-to-left.

**Acceptance Scenarios**:

1. **Given** the curriculum owner, **When** they open the overview, **Then** they see per-course/per-unit content status (authored vs. planned, language-completion, depth-check), an outstanding-figures list, feedback counts per stream and status with links to each queue, and progress aggregates.
2. **Given** a course with no figure manifest yet, **When** the overview loads, **Then** that course shows zero figures outstanding rather than an error.
3. **Given** no feedback and no outstanding figures, **When** the overview loads, **Then** each panel shows an explicit empty state.
4. **Given** a non-owner account, **When** they navigate to the overview, **Then** they are shown the same "not for this role" treatment used by the other dashboards.
5. **Given** the overview in Urdu, **When** it renders, **Then** every panel, label, and number is translated and laid out right-to-left.

---

### User Story 4 - A report of what content and figures still need work (Priority: P2)

Anyone maintaining the project runs one command and gets a per-course, per-unit status inventory plus a plain list of every figure that has been specified but not yet produced, grouped by course, unit, and topic. The same inventory is produced automatically when the site is prepared for a build so the owner's overview is always current.

**Why this priority**: Small, self-contained, and it is the data source for the outstanding-figures and content-status panels in Story 3.

**Independent Test**: Run the command against the repository and confirm it prints a per-course status table and a "figures pending" section that matches the figure manifests; confirm it writes a machine-readable status file; confirm it runs as part of build preparation and in continuous integration without failing the build; confirm it reuses the existing manifest and depth-check logic (no divergent second implementation).

**Acceptance Scenarios**:

1. **Given** the repository, **When** the report command runs, **Then** it produces a per-course/per-unit record of authored-vs-planned, language-completion, depth-check pass/fail, and figure counts by production state, plus a human-readable list of every not-yet-produced figure grouped by course, unit, and topic.
2. **Given** a unit whose figures are all produced, **When** the report runs, **Then** that unit contributes nothing to the "figures pending" list.
3. **Given** the site is being prepared for a build, **When** preparation runs, **Then** the status file is regenerated so the overview reflects the current state.
4. **Given** continuous integration, **When** it runs the report, **Then** the report is informational and does not block the build.

---

### User Story 5 - Feedback becomes a proposed revision (Priority: P3)

For one unit, the curriculum owner exports all open and planned feedback as a single document listing the affected topic files by path, each quoted passage, and each comment. They hand it to the project's assistant tooling, which proposes a minimal revision of those topic files and their translations as a reviewable change set that maps every edit back to the feedback item it addresses. After the owner accepts and merges the change, they mark the corresponding items resolved or declined in the queue.

**Why this priority**: It is the highest-leverage part of the loop but depends on Story 2's queue and export, and it introduces the most process. It can ship after the queue is in use.

**Independent Test**: With several open feedback items on a unit, produce the export and confirm it contains repo-relative topic paths, the quotes, and the comments, and no copied topic body text. Follow the documented revision procedure and confirm the result is a change set in which each edit cites a feedback item, topic structure and reading level are preserved, and all content checks (including the em-dash check) pass. Confirm feedback status only changes when the owner changes it.

**Acceptance Scenarios**:

1. **Given** open and planned feedback on a unit, **When** the owner exports it, **Then** they get one self-contained document with the affected topic files as repository-relative paths, each quoted passage, and each comment, and no topic body text is copied in.
2. **Given** an export, **When** the documented revision procedure is followed, **Then** it yields a reviewable change set that changes only what the feedback calls for, preserves topic structure, front matter, figure markers, glossary usage, checklist numbering, and reading level, and passes every content check.
3. **Given** a merged revision, **When** the owner returns to the queue, **Then** the items are still "planned" until the owner explicitly resolves or declines each one.
4. **Given** a quoted passage whose text no longer exists in the topic, **When** the revision procedure reaches it, **Then** it is reported as stale and skipped rather than guessed at.

---

### User Story 6 - The owner acts from the console: triage, refresh, catalog (Priority: P3)

From the overview page the curriculum owner triages a feedback item without leaving the page, triggers a refresh of the content-status information and sees when it was last produced, and updates a catalog entry (a course listing's metadata). Catalog content stays under version control; the console never writes catalog content straight to the live database.

**Why this priority**: These are conveniences layered on Story 3, and the catalog-edit mechanism needs a design decision, so it should come last.

**Independent Test**: From the overview, move a feedback item open -> planned and confirm it persists and shows in the detailed queue. Trigger a content-status refresh and confirm the "last produced" time updates. Edit a catalog entry and confirm the change is delivered as a reviewable change set (or equivalent), not a direct database write to content.

**Acceptance Scenarios**:

1. **Given** the overview, **When** the owner moves a feedback item to planned or declined from a compact control, **Then** the change persists and is reflected in the dedicated queue.
2. **Given** the overview, **When** the owner triggers a content-status refresh, **Then** the "last produced" indicator updates and the panels reflect the new data.
3. **Given** the overview, **When** the owner edits a catalog entry, **Then** the edit is delivered in a form that keeps version control as the source of truth and does not write catalog content to the live database.

---

### Edge Cases

- **Sign-in after local ticks**: a visitor ticks items while signed out, then signs in. Local ticks for the current topic are adopted into the account where the account has no record for that item; nothing is silently lost.
- **Checklist item removed or reordered by an author**: stored ticks that point at a position that no longer exists are ignored; remaining ticks align to the current items by position.
- **Concurrent ticks**: the same item ticked on two devices at once resolves to "ticked" with no error.
- **Selection spans a figure, a heading, and body text**: the platform stores the plain text of the selection; if it cannot form a usable anchor it falls back to general (whole-topic) feedback.
- **Selection in Urdu / across the layout-direction boundary**: the stored quote is in reading order, not visual order.
- **Quoted passage later deleted from the topic**: the owner still sees the quote verbatim as a blockquote; the "jump to it on the page" affordance degrades gracefully to the nearest section.
- **Exported item not closed**: it simply stays "planned"; a later export for that unit includes it again (the export is idempotent).
- **Report runs before any figure manifest exists for a course**: that course shows zero figures outstanding, not an error.
- **Console loads with no feedback and no outstanding figures**: every panel shows an explicit empty state.
- **Account services unavailable**: the checklist stays interactive locally; feedback controls are hidden; each console panel shows a "cannot load" state.

## Requirements *(mandatory)*

### Functional Requirements - Self-assessment checklist (1A)

- **FR-001**: A signed-in student MUST be able to tick and un-tick each item of a topic's self-assessment checklist, and that state MUST persist for that student across reloads, sessions, and devices.
- **FR-002**: The checklist MUST remain fully readable, with every item visibly rendered, for every visitor - including signed-out visitors and when account services are unavailable.
- **FR-003**: For a signed-out visitor, or when account services are unavailable, tick state MUST persist for the current browser on that device, and the interface MUST indicate that signing in enables cross-device sync.
- **FR-004**: The platform MUST show the student a roll-up of their self-assessment completion per topic, per unit, and per course, in their progress area, presented separately from existing unit-coverage figures.
- **FR-005**: Ticking self-assessment items MUST NOT change the student's unit-coverage / "studied" record. When every checklist item across all of a unit's topics is ticked, the progress area MAY show a non-blocking prompt to mark the unit as studied, but the student MUST still take that action explicitly.
- **FR-006**: The curriculum owner MUST be able to view an aggregate of self-assessment completion across students (for example, per course and unit). Teachers MUST NOT have access to any student's self-assessment data.
- **FR-007**: A student MUST be able to read and change only their own self-assessment records, enforced at the data layer, not only in the interface.
- **FR-008**: This feature MUST NOT change how the self-assessment checklist is written in topic source, and the existing content-structure checks MUST continue to pass unchanged.
- **FR-009**: If a checklist item's wording changes materially after a student ticked it, the platform MUST NOT keep showing that item as ticked; the student's other ticks on the same topic MUST be unaffected.

### Functional Requirements - Reader feedback capture (1B)

- **FR-010**: Any signed-in reader (student or teacher) MUST be able to submit feedback on a topic page, either as general feedback on the whole topic or as feedback attached to a specific passage they select.
- **FR-011**: For passage feedback, the platform MUST capture the exact selected text plus enough surrounding context to locate it later, and MUST record the topic, unit, course, language, and nearest section the selection belongs to.
- **FR-012**: The feedback controls MUST work in both languages and right-to-left layout and MUST be usable on a small screen.
- **FR-013**: A signed-out visitor MUST NOT see the feedback controls and MUST NOT be able to submit feedback.
- **FR-014**: The platform MUST record the submitter and their role with each feedback item and MUST set both the submitter identity/role and the initial status server-side, so a client cannot forge them.
- **FR-015**: A reader MUST be able to read only their own feedback items, enforced at the data layer.
- **FR-016**: The existing teacher "suggest improvement" flow and its moderation queue MUST continue to work unchanged; reader feedback is a separate stream.
- **FR-017**: Feedback comment text and quoted passages MUST be length-capped, and the feedback form MUST NOT solicit personal information.

### Functional Requirements - Owner feedback triage (1B)

- **FR-018**: The curriculum owner MUST be able to see every feedback item, with the quoted passage shown in context, filterable by course, unit, topic, status, scope, and language.
- **FR-019**: The curriculum owner MUST be able to move a feedback item through the lifecycle open -> planned, open or planned -> resolved, open or planned -> declined, and reopen a resolved or declined item. Only the owner may change status; the platform MUST enforce this at the data layer and MUST reject out-of-sequence transitions.
- **FR-020**: When resolving or declining an item, the owner MUST be able to attach a note, and for a resolved item a reference to the change that addressed it.
- **FR-021**: The quoted passage MUST stay visible to the owner even after the underlying topic text has changed.

### Functional Requirements - Revision loop (1B)

- **FR-022**: The curriculum owner MUST be able to export, for one unit, all currently open and planned feedback as one self-contained document listing the affected topic files by repository-relative path, each quoted passage, and each comment, without copying topic body text into the export.
- **FR-023**: The platform MUST provide a repeatable, documented procedure that turns that export into a proposed minimal revision of the affected topic files and their translations, delivered as a reviewable change set in which each edit is traceable to the feedback item it addresses.
- **FR-024**: Closing the loop MUST be an explicit owner action in the triage queue after the change set is accepted; the revision procedure MUST NOT change feedback status by itself.
- **FR-025**: The revision procedure MUST preserve topic structure, front matter, figure markers, glossary usage, checklist item numbering, and reading level, and MUST run the full content-check set (including the em-dash check) before proposing the change.

### Functional Requirements - Curriculum-owner console (1C)

- **FR-026**: The platform MUST provide one curriculum-owner overview page, reachable only by the owner, that presents: per-course/per-unit content status (authored vs. planned, language-completion, depth-check state); a list of figures not yet produced; feedback volumes per stream and status with links to each queue; and progress aggregates (unit coverage, self-assessment completion, achievements).
- **FR-027**: From the overview, the owner MUST be able to triage a feedback item (open -> planned or declined) without navigating away; full detail stays in the dedicated queue.
- **FR-028**: From the overview, the owner MUST be able to trigger a refresh of the content-status information and MUST see when it was last produced.
- **FR-029**: The owner MUST be able to update a catalog entry from the console in a way that keeps version control as the source of truth for catalog content and does not write catalog content directly to the live database. The exact mechanism is settled during planning.
- **FR-030**: Every part of the console MUST render in both languages with correct right-to-left layout.

### Functional Requirements - Content / figure status report (1D)

- **FR-031**: The platform MUST provide a command that inventories all authored content and produces a per-course/per-unit status record (authored vs. planned, language-completion, depth-check pass/fail, figure counts by production state) and a human-readable list of every figure specified but not yet produced, grouped by course, unit, and topic.
- **FR-032**: The status record MUST be produced automatically when the site is prepared for a build, and MUST also run in continuous integration for visibility without blocking the build.
- **FR-033**: The report MUST reuse the existing manifest-reading and depth-check logic rather than re-deriving it, so it cannot drift from the gates.

### Key Entities

- **Self-assessment check**: one student's tick against one checklist item of one topic in one language. Holds which student, the topic location (course, unit, topic, page, language), the item's position and a snapshot of its wording, whether it is currently ticked, and when it last changed. A student owns their own; the curriculum owner may read aggregates; teachers may not read any.
- **Content feedback item**: one piece of reader feedback on a topic. Holds the author and their role, the topic location (course, unit, topic, page, language, nearest section), the scope (whole topic or a passage), the quoted passage and its surrounding context when scoped to a passage, the comment, a lifecycle status (open, planned, resolved, declined), an owner note, and a reference to the change that resolved it. The author may read their own; the curriculum owner may read all and is the only one who changes status.
- **Feedback export bundle**: a generated document for one unit listing the affected topic files by repository-relative path, each open/planned quoted passage, and each comment. Transient; not stored; carries no topic body text.
- **Content-status snapshot**: a generated per-course/per-unit inventory of authored-vs-planned, language-completion, depth-check state, and figure counts by production state, plus the list of figures not yet produced. Generated from content and manifests; not a database record.
- **Catalog entry**: an existing course listing (code, title, semester, language flag, and similar metadata). Editable by the owner through the console; its content stays under version control.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A student ticks items on a topic checklist; after closing the browser and reopening on another device signed into the same account, the same items show ticked within a few seconds.
- **SC-002**: No teacher account can see any student's self-assessment data (verified by access-control tests).
- **SC-003**: A signed-in reader can attach a comment to a sentence they selected and submit it in under 30 seconds, in either language, including on a small screen.
- **SC-004**: For any unit, the curriculum owner can see all reader feedback with the quoted passage in context and filter to a single topic and status in under 15 seconds.
- **SC-005**: The owner can produce a feedback export for a unit and, following the documented procedure, obtain a proposed revision change set in which every edit is traceable to a feedback item, with zero content-check regressions.
- **SC-006**: The owner overview shows, for every course, a count of units authored versus planned and figures outstanding that matches what the underlying checks report, with no drift.
- **SC-007**: Out-of-sequence feedback status changes, and any status change attempted by a non-owner, are rejected (verified by access-control tests).
- **SC-008**: Every new screen and control passes the same bilingual and right-to-left review the existing dashboards pass.
- **SC-009**: Existing content checks, the teacher "suggest improvement" flow, and student unit-coverage tracking behave exactly as before this feature (regression-free).
- **SC-010**: The curriculum owner can identify every not-yet-produced figure for any course, grouped by unit and topic, from a single report or panel.

## Assumptions

- "Curriculum owner" is the existing administrator role; no new role or privilege level is introduced.
- Feedback is limited to signed-in users; there is no anonymous or public feedback channel.
- The quoted-passage cap is about 2,000 characters and the comment cap about 4,000 characters; the form collects a free-text comment and the selection, nothing else.
- The owner-facing feedback view may show the submitter's name and role - the owner can already see all profiles; no reader ever sees who else submitted feedback.
- "Unit self-assessment complete" means every checklist item across every topic file of that unit is ticked for that student in that language.
- Passage re-location is best-effort; the verbatim quote is always retained and displayed whether or not re-location succeeds.
- The revision procedure is run by the curriculum owner using the project's assistant tooling; it produces a proposed change set for human review and merge and never writes to the live database.
- The catalog-edit mechanism is settled during planning; the safe default is a change-set or download flow, consistent with content living in version control.
- English and Urdu topic files carry the same number of checklist items in the same order (guaranteed by existing content-structure rules), so item positions align across languages.
- No new third-party library is added for text selection/anchoring or for the console.

## Dependencies

- Builds on: Spec 002 (accounts and roles), Spec 003 (classes and quizzes as progress signals), Spec 004 (student progress and achievements), Spec 005 (teacher "suggest improvement" and activity feedback - left intact), Spec 008 (per-topic unit structure and the self-assessment checklist section), Spec 009 (figures and manifests).
- Requires Constitution v2.7.0 (Art. III.9, zero em dash) already in effect - the revision procedure runs the em-dash check.

## Constraints (non-functional)

- Authorization for both new data types is enforced at the data layer (Constitution Art. IX.2); interface gating is cosmetic only.
- Student self-assessment data is visible only to that student and the curriculum owner (Art. VIII.1); feedback authors see only their own items.
- No personal data is collected in feedback; quoted text is page content, not user data (Art. VIII.2).
- Content stays in version control (Art. V.1): the feedback loop points at files, the revision produces a reviewable change set, the database is closed only after merge, and no export or catalog edit copies content into or out of the live database.
- New reader-facing code loads only on documentation pages and stays within the platform's first-load budget (Art. V.5); no new dependency.
- Every new screen and control is bilingual and right-to-left-correct (Art. III.8, Art. VII); new data-layer rules are covered by access-control tests (Art. VII).
- The three audience documents - README, Student Guide, Teacher Guide - are updated in the same change (Art. X).

## Out of scope

- Auto-syncing self-assessment completion into the unit-coverage record (a future change with its own decision record).
- Editing one's own already-submitted feedback comment.
- A full highlight/annotation layer beyond single-selection passage capture.
- Producing figures for any unit beyond those that already have them.
- A structural parity check comparing an English figure against its translated variant.
- A dedicated reader-facing "my feedback status" page; readers get a submission confirmation and their items remain readable through their account, but no bespoke tracking screen ships in this feature.

## Architectural decisions to record during planning

The plan phase should raise these for `/sp.adr` (all meet the impact + alternatives + cross-cutting test):

1. A dedicated feedback record for reader feedback, separate from the existing teacher "suggest improvement" record.
2. Best-effort passage re-location built in-house rather than adopting an annotation library.
3. The mechanism for owner catalog edits that keeps version control as the source of truth.
4. (Lighter, may be a plan note instead) Self-assessment completion is deliberately independent of the unit-coverage record.
