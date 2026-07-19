# Feature Specification: Authentication & Roles

**Feature Branch**: `002-authentication`  
**Created**: 2026-07-17  
**Status**: Draft  
**Input**: User description: "create feature specs from SDD/002-authentication.md and SDD/ROADMAP.md"

## Clarifications

### Session 2026-07-17

- Q: When the same email address arrives through both providers (email/password account already exists, then the user signs in with Google for that same address), what should happen? → A: One email = one account; the Google sign-in links to and signs into the existing account (no duplicate profile).
- Q: Is a display name required at sign-up? → A: No — name is optional at sign-up. Google sign-up auto-fills the name from the Google profile; email/password sign-up may omit it, and until the user sets one the header falls back to the account's email address.
- Q: How long does a signed-in session last? → A: Long-lived and auto-refreshing — the session survives browser restarts and stays valid across days/weeks of use until the user explicitly signs out (or the account holder's access is revoked).
- Q: Should the teacher role require the admin request→pending→approve workflow, or can users self-select their role? → A: No approval workflow. Users self-select their role (student or teacher) at sign-up so a capable student can lead a peer study group; the admin can edit any user's role at any time. The `admin` role itself is never self-selectable (seed/admin-assigned only). **This amends ROADMAP Decision #4 and Constitution Art. V.3 (teacher approval) — see follow-up on answer-key protection.**
- Q: If the teacher role is self-selectable, what protects answer keys (the original reason for the approval gate)? → A: Split the concerns. Self-selecting **teacher** grants only peer-teaching capabilities (create classes, assign work, give feedback, view own students' submissions). **Answer keys and other restricted material are a separate "verified teacher" capability that only an administrator can grant** — self-declaration never unlocks them. Constitution's answer-key protection is preserved (FR-016/FR-017 unchanged in intent).

### Session 2026-07-18

- Q: A user may self-select student/teacher at sign-up — may they later switch their own role, and what happens to teacher-created classes if they downgrade? → A: Role switching is **not self-service**. The role is chosen once at sign-up; after that only an administrator can change it. This removes the self-downgrade path entirely, so teacher-created classes cannot be orphaned by a user acting alone; an administrator changing a role is a deliberate, mediated action.
- Q: Should privileged changes (role changes, "verified teacher" grants/removals) leave an audit record? → A: Yes — audit **every** role change and verified-teacher grant/removal, capturing who was changed, who made the change, what changed, and when. Administrators can review this history. This is the compensating control for removing the teacher-approval workflow: it makes the answer-key gate reviewable after the fact.
- Q: FR-011a referred to "revocation of the account's access" without defining it — what is revocation? → A: Revocation means **administrator suspension** of an account. A suspended user is signed out immediately, cannot sign in while suspended, and retains their data; an administrator can lift the suspension. Suspension and reinstatement are audited like other privileged changes.
- Q: Can a user end their account, and what happens to their submitted work and grades? → A: Yes — a user may request deletion of their own account. Personal identity (display name, email, login credentials) is **removed**, while submissions and grades are **retained in anonymised form** so teachers' academic records stay intact. Deletion is irreversible and frees the email address for future sign-up as a new account.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sign up and sign in as a student (Priority: P1)

A newcomer to the textbook site creates a personal account so their reading, class membership, and submitted work can be saved and protected. They can sign up either with their Google account in a couple of clicks, or with an email address and a password that they confirm via a verification email. Once signed in, the site identifies them across every page of the book — by display name where one is available, otherwise by their email address.

**Why this priority**: Without a working sign-up/sign-in for the default (student) role, no personal feature — dashboards, class membership, submissions, grading — can exist. This is the minimum viable slice that unlocks every later feature.

**Independent Test**: Create one account with Google and one with email + password without choosing a role; confirm both land on the site signed in, identified in the site header, and that both accounts are recorded with the default "student" role.

**Acceptance Scenarios**:

1. **Given** a signed-out visitor on any book page, **When** they choose "Sign up" and complete the Google flow without selecting a role, **Then** an account is created with the default role "student" and they are returned to the page they started from, now signed in.
2. **Given** a signed-out visitor, **When** they sign up with an email and password, **Then** they receive a verification email and cannot sign in until the email is confirmed.
3. **Given** a verified email account, **When** the user signs in, **Then** they are identified in the site header (display name, or email address when no name is set) along with their role, and their session is active.

---

### User Story 2 - Recover access to an account (Priority: P1)

A user who has forgotten their password requests a reset, receives a secure link by email, sets a new password, and signs in again — without contacting an administrator.

**Why this priority**: Self-service recovery is essential for an unsupervised public site; without it, any forgotten password permanently locks a user out and generates support load.

**Independent Test**: From the sign-in area, request a password reset for a known email, follow the emailed link, set a new password, and confirm sign-in succeeds with the new password and fails with the old one.

**Acceptance Scenarios**:

1. **Given** a registered email account, **When** the user requests a password reset, **Then** a reset link is emailed to that address.
2. **Given** a valid reset link, **When** the user sets a new password, **Then** they can sign in with the new password and the old password no longer works.

---

### User Story 3 - Self-select a teaching role; admin manages roles (Priority: P2)

A user who wants to lead a peer study group selects the **teacher** role at sign-up (or an administrator sets it for them later) and immediately gets peer-teaching tools — create a class, assign work, give feedback, and view their own students' submissions. The role is chosen once at sign-up and cannot be changed by the user afterwards; only an administrator can change an existing account's role. Self-selecting teacher does **not** unlock answer keys or other restricted material: that "verified teacher" access is granted only by an administrator. The administrator role itself can never be self-selected.

**Why this priority**: Letting a capable student teach a peer group directly (no approval ceremony) is a real learning benefit, so the teacher role is self-selectable. The hard governance line — that answer keys and restricted material stay out of unverified hands — is preserved by gating that access behind an admin-granted "verified teacher" capability. This builds on P1 accounts, so it is P2.

**Independent Test**: Sign up choosing the teacher role; confirm peer-teaching tools are available but answer keys/restricted material are blocked. As an administrator, edit another user's role and grant the "verified teacher" capability; confirm the role change and the newly-unlocked access both take effect by the user's next load.

**Acceptance Scenarios**:

1. **Given** a signed-out visitor, **When** they sign up and choose the teacher role, **Then** their account is created as a teacher with peer-teaching capabilities and **without** answer-key/restricted-material access.
2. **Given** a signed-in user, **When** an administrator edits their role, **Then** the new role's capabilities apply by the user's next load.
3. **Given** a teacher who has not been granted the "verified teacher" capability, **When** they attempt to open answer keys or other restricted material, **Then** access is denied.
4. **Given** a signed-in user who is not an administrator, **When** they attempt to reach the role-management area or to set their own role to administrator, **Then** access is denied.
5. **Given** a signed-in user whose account already exists, **When** they attempt to change their own role, **Then** the change is rejected — no self-service role change is offered, and only an administrator can alter an existing account's role.

---

### User Story 4 - Stay signed in across the whole site (Priority: P2)

A signed-in user moves freely between textbook pages and personal pages without being asked to sign in again, sees their name and role consistently in the header, and can sign out from anywhere with the session ending everywhere on that device.

**Why this priority**: A single, continuous session is what makes the book and the personal features feel like one product; broken sessions would undermine every authenticated feature. It builds on P1.

**Independent Test**: Sign in, navigate across several book pages and personal pages, confirm the session persists and the header reflects identity and role throughout; sign out and confirm all pages now treat the user as signed out.

**Acceptance Scenarios**:

1. **Given** a signed-in user, **When** they navigate across book and personal pages, **Then** they remain signed in and their name and role remain visible.
2. **Given** a signed-in user, **When** they sign out from any page, **Then** their session ends across the entire site on that device.

---

### User Story 5 - Manage the end of an account (Priority: P3)

An administrator suspends an account that is being misused; the user is signed out and cannot
return until reinstated, with their data intact. Separately, a user who no longer wants an
account deletes it themselves — their identity is removed while their submitted work remains in
their teachers' records anonymously.

**Why this priority**: Neither path is needed to launch, but both are needed before real student
data accumulates — suspension is the only lever against an abusive account on a public-sign-up
site, and self-service deletion is a reasonable expectation for personal data.

**Independent Test**: Suspend a signed-in test user → session ends, sign-in refused, data
retained, reinstatement restores access. Delete a test account that has submissions → sign-in
impossible, submissions still present and anonymous.

**Acceptance Scenarios**:

1. **Given** a signed-in user, **When** an administrator suspends their account, **Then** their session ends, further sign-in attempts are refused with a clear message, and their data is retained.
2. **Given** a suspended account, **When** an administrator reinstates it, **Then** the user can sign in again with normal access.
3. **Given** a signed-in user with submitted work, **When** they confirm deletion of their account, **Then** they can no longer sign in, their personal identity is removed, and their submissions and grades remain in their teachers' records without being attributable to a named person.
4. **Given** a deleted account's email address, **When** someone signs up with it again, **Then** a brand-new unrelated account is created with none of the previous history attached.

---

### Edge Cases

- A user attempts to sign in with an unverified email → sign-in is refused with a clear message explaining verification is required.
- A user tries to sign up with an email that already has an account → they are guided to sign in or reset their password rather than creating a duplicate.
- A user who registered with email/password later signs in with Google using that same email address → the Google login is linked to the existing account and signs them in; no second account or profile is created.
- A user follows an expired or already-used password-reset link → the link is refused and they are prompted to request a new one.
- A self-declared teacher without the "verified teacher" capability navigates directly to an answer-key or restricted-material address → access is withheld regardless of how the address was reached.
- A non-administrator attempts to set their own role to administrator (or to grant themselves the "verified teacher" capability) → the change is rejected.
- An existing user wants to move between the student and teacher roles → there is no self-service path; the change must be made by an administrator, so a user cannot strand their own students by downgrading themselves.
- An administrator downgrades a teacher who owns active classes → because the action is administrator-mediated and deliberate, the handling of those classes is defined by the class-management feature (Spec 003), not by this feature.
- An administrator suspends an account while its user is signed in → the user's session ends and subsequent sign-in attempts are refused with a clear message until the suspension is lifted; their data is retained throughout.
- A user deletes their account → they are signed out and can no longer sign in; their submissions and grades remain in their teachers' records but are no longer attributable to a named person.
- A user signs up again with an email address belonging to a previously deleted account → a brand-new, unrelated account is created; none of the deleted account's history or anonymised work is reattached to it.
- Repeated rapid sign-in or reset attempts → the user sees a friendly rate-limit message rather than a raw error.
- Authentication messages must be legible to users who read simple English or Urdu.
- The same person signs in on a phone and a laptop → each device holds its own session and signing out on one does not force sign-out on the other.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST let a visitor create an account using either a Google account or an email address with a password.
- **FR-002**: The system MUST require email confirmation for email/password sign-ups and MUST refuse sign-in until the email is verified.
- **FR-003**: The system MUST let a user self-select the "student" or "teacher" role at sign-up, defaulting to "student" when no choice is made; it MUST NOT offer "administrator" as a self-selectable role.
- **FR-003a**: The system MUST treat an email address as a single identity: when a Google sign-in presents an email that already belongs to an existing account, it MUST link to and sign into that existing account rather than create a second account or profile.
- **FR-004**: The system MUST let a user reset a forgotten password through a link sent to their registered email, after which the previous password no longer works.
- **FR-005**: The system MUST record the teacher role as the authorization basis for peer-teaching capabilities — creating classes, assigning work, giving feedback, and viewing the teacher's own students' submissions — which are implemented by Spec 003. The teacher role alone MUST NOT grant access to answer keys or other restricted material.
- **FR-005a**: The system MUST gate access to answer keys and other restricted teaching material behind a separate "verified teacher" capability that only an administrator can grant; self-selecting the teacher role MUST NOT confer it.
- **FR-006**: The system MUST prevent any user from assigning themselves the administrator role and from granting themselves the "verified teacher" capability; both are set only by seeding or by an existing administrator.
- **FR-007**: The system MUST let an administrator edit any user's role (student, teacher, or administrator) and grant or remove the "verified teacher" capability.
- **FR-008**: The system MUST apply any role change or capability grant/removal to the affected user's access no later than their next visit.
- **FR-009**: The system MUST provision the administrator role only by manual seeding (the curriculum owner); it MUST NOT be obtainable through self-service.
- **FR-010**: The system MUST store each account's role and capabilities server-side as authoritative data the account holder can read but not modify. A user MAY choose "student" or "teacher" **once, at sign-up only** (FR-003), and MUST be able to edit their own display name at any time. Restrictions on self-elevation are defined in FR-006; restrictions on changing an existing role are defined in FR-010a.
- **FR-010a**: The system MUST make an existing account's role changeable only by an administrator (FR-007). A user who wants a different role MUST request it from an administrator out-of-band; no in-app self-service role change exists.
- **FR-010b**: The system MUST NOT require a display name at sign-up. It MUST auto-fill the name from the Google profile for Google sign-ups, and when no display name is set it MUST show the account's email address in place of a name until the user provides one.
- **FR-011**: The system MUST keep a signed-in user's session active as they move across all textbook and personal pages, and MUST reflect their name and role consistently in the site header.
- **FR-011a**: The system MUST maintain a long-lived, automatically-refreshed session that survives browser restarts and remains valid across days/weeks of use, ending only on explicit sign-out or administrator suspension of the account (FR-020) — without prompting the user to sign in again during normal use.
- **FR-012**: The system MUST let a signed-in user sign out, ending their session across the whole site on that device.
- **FR-013**: After sign-in or sign-up, the system MUST return the user to the page they were on when they began.
- **FR-014**: The system MUST present authentication prompts and error messages in simple English and Urdu, including friendly handling of rate-limited attempts.
- **FR-015**: The system MUST restrict the administration area — role and capability management, account suspension, and audit review — to administrators only.
- **FR-016**: The system MUST protect personal and restricted data so that one user cannot read another user's private profile and a user without the "verified teacher" capability cannot reach answer keys or other restricted material.
- **FR-017**: The system MUST NOT leak restricted material indirectly through account surfaces — profile payloads, session data, audit records, or error messages MUST NOT disclose answer-key content or its existence to users lacking the "verified teacher" capability.
- **FR-018**: The system MUST record an audit entry for every role change, every grant or removal of the "verified teacher" capability, and every account suspension or reinstatement, capturing the affected account, the administrator who made the change, the previous and new value, and the date and time.
- **FR-019**: The system MUST let administrators review the audit history of role, capability, and suspension changes, and MUST NOT allow audit entries to be edited or deleted through the application.
- **FR-020**: The system MUST let an administrator suspend an account and later reinstate it. A suspended account MUST be signed out immediately, MUST be refused sign-in while suspended (with a clear message), and MUST retain its data so that reinstatement restores normal access. Only administrators may suspend or reinstate.
- **FR-021**: The system MUST let a user request deletion of their own account. On deletion the system MUST remove their personal identity (display name, email address, and sign-in credentials) so they can no longer sign in, and MUST retain their submissions and grades in anonymised form — no longer attributable to a named person — so that academic records remain intact for teachers.
- **FR-022**: The system MUST warn the user before deletion that the action is irreversible and that their submitted work will be retained anonymously, and MUST require an explicit confirmation. After deletion the email address MUST be free to register again as a new, unrelated account.

### Key Entities *(include if feature involves data)*

- **Account**: A person's sign-in identity on the site, established through Google or email/password. Holds the verified identity and links to that person's profile. An email address maps to exactly one account; a Google login and an email/password login for the same address resolve to the same account (linked), never two.
- **Profile**: The account's personal record — display name (optional; auto-filled from Google when available, otherwise empty and shown as the email address until set), role (student, teacher, or administrator), a "verified teacher" capability flag (grants answer-key/restricted-material access; admin-set only, default off), an account status (active or suspended; admin-set only, default active), and creation date. Created automatically when an account is first established. The account holder chooses student or teacher **once at sign-up** and may edit their own display name at any time; after creation the role is immutable to the account holder and changeable only by an administrator. The administrator role and the "verified teacher" flag are authoritative and set only by the system or an administrator.
- **Verified-teacher capability**: An admin-granted flag on a profile that unlocks answer keys and other restricted teaching material. Independent of the self-selectable teacher role; off by default and never self-grantable.
- **Privilege-change audit entry**: An append-only record of a privileged change — the affected account, the administrator who made the change, what changed (role, the "verified teacher" capability, or suspension state), the previous and new value, and the timestamp. Readable by administrators; never editable or deletable through the application.
- **Session**: The active signed-in state of an account on a device. Long-lived and automatically refreshed: it survives browser restarts and continuous use across days/weeks, ending only on explicit sign-out or administrator suspension of the account. Device-scoped — each device holds its own session.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new user can complete Google sign-up and reach a signed-in state on the book in under 30 seconds and within 2 clicks of choosing "Sign up".
- **SC-002**: 100% of newly created accounts (Google or email) are recorded with a matching profile and the role the user selected — "student" when no choice is made — and with the "verified teacher" capability off.
- **SC-003**: Email/password accounts cannot sign in until verified, and a forgotten-password reset can be completed end-to-end (request → email → new password → sign-in) without administrator involvement.
- **SC-004**: No user can obtain the administrator role or the "verified teacher" capability without explicit administrator action; a documented access-control test set confirms that a student cannot read another user's profile and that a self-declared teacher without the "verified teacher" capability cannot reach answer keys or restricted material — 100% of these checks pass.
- **SC-005**: A user who self-selects the teacher role gains peer-teaching capabilities immediately, and any admin-made role change or capability grant takes effect for the affected user within one visit.
- **SC-006**: A signed-in user's session persists across navigation between textbook and personal pages **and across browser restarts**, with no unexpected re-prompt during normal use; sign-out ends the session everywhere on that device.
- **SC-007**: Authentication screens and error messages are available in both English and Urdu.
- **SC-008**: 100% of role changes, "verified teacher" grants/removals, and suspensions/reinstatements produce an audit entry identifying the affected account, the acting administrator, the before/after value, and the timestamp; an administrator can reconstruct from that history who granted answer-key access to any given account and when.
- **SC-009**: A user can delete their own account without administrator involvement; afterwards no personal identifier of theirs remains retrievable through the application, while 100% of their previously submitted work and grades remain present — and anonymous — in their teachers' records.

## Assumptions

- Authentication and personal data are handled by a managed backend service reached from the browser; the static textbook site itself stores no accounts or personal data. (Specific technology is an implementation/planning concern, not part of this spec.)
- The administrator role is limited to the curriculum owner(s) and is seeded outside the self-service flow; no self-service path sets the administrator role (an existing administrator may assign it to others).
- The teacher role is self-selectable (no approval workflow) to enable peer study-group teaching; answer keys and restricted material remain protected because that access is a separate admin-granted "verified teacher" capability. This amends ROADMAP Decision #4 and Constitution Art. V.3 (teacher approval) while preserving the answer-key-protection intent. The amendment has been recorded: Constitution v2.0.0 (Art. V.3 / IX.3), ROADMAP Decision #4, and ADR-0005.
- Sessions are device-scoped: signing out on one device does not force sign-out on another unless the user requests it.
- Answer keys and other restricted teaching material live outside the public site and are governed by the "verified teacher" capability check defined here (their storage is detailed in later specs).
- There is no teacher request/approval workflow; role selection at sign-up is immediate. Thereafter role management is done by administrators only — a user cannot change their own role, and any later change is requested from an administrator out-of-band. Notification mechanics (e.g., informing a user their role or verified status changed) beyond in-app reflection are out of scope for this feature.
- Because users cannot self-downgrade, teacher-owned artifacts (classes, assignments) cannot be orphaned by unilateral user action. What happens to those artifacts when an *administrator* changes a teacher's role is owned by Spec 003 (class management), not by this feature.
- Account deletion anonymises rather than erases academic work. The mechanics of anonymising submissions and grades (and how teacher gradebooks render an anonymised author) are owned by Spec 003; this feature defines only the identity-removal obligation and the retention rule.
- Book-suggestion capabilities, class management, dashboards, and grading are downstream features (Specs 003–005) and are out of scope here; this feature delivers only accounts, roles (self-selected teacher + admin-managed roles and verified-teacher capability), and session.

## Dependencies

- **Spec 001 (Content Platform)**: the bilingual static site into which the authentication pages, header identity widget, and role-aware navigation are integrated.
- **Constitution / ROADMAP**: this feature **amends** the "teacher role requires admin approval" rule (Constitution Art. V.3, ROADMAP Decision #4) to allow self-selected teaching for peer study groups, while **preserving** the answer-key-protection intent by gating that access behind an admin-granted "verified teacher" capability. The private-data-behind-access-control principle is unchanged. This is recorded in Constitution v2.0.0, ROADMAP Decision #4, and `history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md` (status: Proposed — flip to Accepted when the amendment commit lands).
- Blocks Specs 003 (classes/assignments/submissions/grading), 004 (student dashboard), and 005 (teacher dashboard), which all rely on authenticated accounts and roles.
