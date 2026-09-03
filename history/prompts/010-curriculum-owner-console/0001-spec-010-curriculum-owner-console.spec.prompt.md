---
id: 0001
title: Spec 010 curriculum-owner console
stage: spec
date: 2026-09-03
surface: agent
model: claude-sonnet-5
feature: 010-curriculum-owner-console
branch: 010-curriculum-owner-console
user: channayousif@gmail.com
command: /sp.specify
labels: ["spec", "curriculum-owner", "self-assessment", "content-feedback", "dashboard", "figure-report"]
links:
  spec: specs/010-curriculum-owner-console/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/010-curriculum-owner-console/spec.md
 - specs/010-curriculum-owner-console/checklists/requirements.md
tests:
 - "n/a (spec phase) - quality checklist: all items pass, single validation pass"
---

## Prompt

/sp.specify Curriculum-owner console and the content-improvement loop - a combined feature (Spec 010) covering four gaps the owner reported after Spec 009, per the approved plan at /home/a2ahs/.claude/plans/agile-brewing-puppy.md (Part 1). Item 3 (zero em dash) already shipped as Constitution v2.7.0.

Scope (all four sub-parts are additive - no existing table, trigger, RLS policy, gate, or Spec 005 surface changes):

1A - Interactive, persisted self-assessment checklist. Today every Spec 008 topic file has a `## Self-assessment checklist` section authored as plain GFM `- [ ]` bullets (>= 3, enforced by check-unit-depth.mjs); it renders as static disabled checkboxes. Make each item individually checkable by a signed-in student, persisted per student (survives reload, visible on any device), and queryable for a dashboard roll-up (per topic / unit / course completion %). The curriculum owner (admin) can read an aggregate; teachers cannot (matches the Spec 004 unit_progress privacy posture). Logged-out or unconfigured: checkboxes still interactive, localStorage-only. Independent metric - completing a checklist NEVER auto-writes unit_progress (owner decision); the Progress page may show a hint when a whole unit's checklists are ticked, but the student still presses the existing "Mark as studied" button. Must not change the raw markdown the depth gate greps.

1B - Structured content feedback (general + passage-level) + a Claude revision loop. Today improvement_suggestions (Spec 005) is teacher-only and anchors only to a heading id. Any signed-in reader (student AND teacher) can leave feedback on a topic: either general (whole topic) or specific to a selected sentence/paragraph (a text-quote anchor captured when the reader selects text and clicks a popover action). Feedback is surfaced to the curriculum owner in context (the quoted passage shown as a blockquote), filterable by course / unit / topic / status / scope. The owner can export all open/planned feedback for a topic as a Markdown bundle (repo-relative topic paths + the quotes + comments, no copied topic text) to hand to a new `.claude/skills/revise-topic/` skill, which proposes a minimal-diff revision of the topic file (+ Urdu mirror) in a PR with a feedback->edit map; after merge the owner marks rows resolved/declined in the queue (a skill cannot write the DB). New dedicated `content_feedback` table (improvement_suggestions left untouched) - ADR-worthy. Hand-rolled W3C TextQuoteSelector re-anchoring, no annotation library (Art. V.5 bundle budget) - ADR-worthy. Simplified status lifecycle: open -> planned -> resolved | declined (+ reopen). All authz is DB-layer RLS (Art. IX.2): students & teachers INSERT own rows as 'open'; author_role and status are server-forced by a BEFORE INSERT trigger; only admin transitions status, guarded like 0031.

1C - Curriculum-owner dashboard at /app/admin (new index page; admin today has only /app/admin/suggestions.tsx and /app/admin/feedback.tsx, no overview). Both a read-only cockpit AND in-app actions (owner decision). Cockpit panels: content status per course/unit (authored vs coming_soon, depth-gate state, translation status, figure status) from a new static/content-status.json; pending-figures list; feedback queue counts (content_feedback + improvement_suggestions + activity_feedback) with deep links to the existing queues; unit_progress + self_assessment_checks + student_achievements aggregates; deep links to moderation queues, the Git repo, the catalog. In-app actions: inline feedback triage (open -> planned / declined from the overview), a regenerate-report control, and catalog-entry editing. Catalog editing is the one genuinely new architectural question - catalog/courses.json lives in Git (Art. V.1); resolve in /sp.plan (safe default: a form that composes a PR or downloads edited JSON, not a live DB write to content) - ADR-worthy. Follows the src/lib/teacherOverview.ts data pattern (thin {data,error} libs, browser->PostgREST with RLS, client-side grouping, inline MESSAGES {en,ur} + useLocale()).

1D - Content / figure status report. check-figures.mjs is pass/fail only; it recognises prompt-only / generated / placed but never lists or counts pending figures. New scripts/report-content-status.mjs walks docs/, every specs/content/<course>/figures/unit-NN.md manifest, and every content-spec; writes static/content-status.json (per course/unit: authored/coming_soon, translation_status, depth-gate pass/fail reusing check-unit-depth.mjs's functions, and a figures block { total, placed, generated, promptOnly, pending: [{topic_label, figId, kind, prompt, status}] } parsed with check-figures.mjs's column-aware parseManifest). Console output: per-course table + a "Figures pending" section (item 5's report). Wired into prebuild next to build-content-index.mjs and run in CI as informational (a report, not a gate). Reuse - do not duplicate - parseManifest, the in-scope-unit walk, and the content-index shape.

Constitution touchpoints: Art. IX.2 (DB-layer authz - both new tables), Art. VIII.1/VIII.2 (self_assessment_checks student+admin only; content_feedback authors see only their own; quotes are page content not PII, lengths capped), Art. V.1 (content stays in Git - the feedback loop points at files, revise-topic edits .mdx + opens a PR, the DB closes only after merge; the export bundle carries repo-relative paths, not copied content), Art. V.5 (textAnchor + popover stay small, load only on doc pages, no annotation dependency), Art. VII (new RLS policies tested; RTL of the checklist and popover verified), Art. X (Student Guide, Teacher Guide, README updated in the same branch).

Out of scope (record in the spec, do not build): auto-sync of self-assessment into unit_progress (a future trigger, its own ADR); editing one's own submitted feedback comment; a full annotation/highlighting layer beyond single-selection quote capture; rendering figures for units beyond what already exists; per-figure SVG element-count parity checks.

## Response snapshot

Created branch `010-curriculum-owner-console` (next free number after specs/009) and wrote
`specs/010-curriculum-owner-console/spec.md`.

Structure:
- **6 prioritised, independently testable user stories**: US1 persisted self-assessment
  checklist (P1); US2 reader feedback capture + owner triage queue (P1); US3 curriculum-owner
  overview page (P2); US4 content/figure status report (P2); US5 feedback -> proposed revision
  loop (P3); US6 in-console triage + report refresh + catalog edit (P3). Each carries an
  Independent Test and Given/When/Then acceptance scenarios.
- **33 functional requirements** grouped by sub-part (1A FR-001..009, 1B capture FR-010..017,
  1B triage FR-018..021, 1B loop FR-022..025, 1C FR-026..030, 1D FR-031..033), all testable
  and business-worded.
- **5 key entities** (self-assessment check, content feedback item, feedback export bundle,
  content-status snapshot, catalog entry) described without schema.
- **10 success criteria**, measurable and technology-agnostic (persistence across devices in
  seconds; teacher isolation by access tests; 30s to submit passage feedback; 15s to filter
  the queue; no count drift; regression-free).
- **11 edge cases** (sign-in after local ticks, item reorder, concurrent ticks, selection
  spanning a figure, RTL selection, deleted quoted passage, idempotent re-export, empty
  states, offline account services).
- Assumptions (10), Dependencies (Specs 002/003/004/005/008/009 + Constitution v2.7.0),
  Constraints mapped to Constitution Art. IX.2 / VIII.1 / VIII.2 / V.1 / V.5 / III.8 / VII / X,
  Out of scope (6 items from the owner), and a closing list of 4 decisions to raise for
  `/sp.adr` during planning.
- Zero `[NEEDS CLARIFICATION]` markers - the approved plan had already resolved every major
  fork (independent metric, dashboard scope = both, new dedicated feedback table, hand-rolled
  anchoring). FR-029 deliberately leaves the catalog-edit mechanism open for `/sp.plan`.

Quality checklist `checklists/requirements.md` written and validated in a single pass: all
Content Quality / Requirement Completeness / Feature Readiness items pass; a note records that
naming repository and Constitution-article concepts is the established house style across
Specs 002-009 and does not pin a tech stack.

## Outcome

- ✅ Impact: Spec 010 is ready for `/sp.plan`. It converts the approved plan's Part 1 into a
  prioritised, testable specification; the four sub-parts can be implemented and shipped as
  independent slices (US1 or US2 alone is a viable increment).
- 🧪 Tests: none (spec phase). Quality checklist: all items pass.
- 📁 Files: specs/010-curriculum-owner-console/spec.md (new);
  specs/010-curriculum-owner-console/checklists/requirements.md (new).
- 🔁 Next prompts: `/sp.plan` (raise ADRs for the dedicated feedback table, in-house passage
  re-location, and the catalog-edit mechanism); optionally `/sp.clarify` first, though the
  spec carries no open clarifications.
- 🧠 Reflection: the approved implementation plan let the spec ship with zero clarification
  markers; the only genuinely open design question (catalog editing) is correctly a planning
  decision, not a scope ambiguity, so it is flagged rather than asked.

## Evaluation notes (flywheel)

- Failure modes observed: none. Risk watched: over-technical language for a "business
  stakeholder" spec - mitigated by keeping FRs and SCs outcome-worded and confining
  data-layer / version-control language to Constraints and a checklist note, matching the
  Spec 002-009 house style.
- Graders run and results (PASS/FAIL): spec quality checklist PASS (all items, one pass).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): in `/sp.plan`, decide the catalog-edit mechanism
  (change-set/download vs. a small function) and confirm the `revise-topic` gate list carries
  `check:no-em-dash`.
