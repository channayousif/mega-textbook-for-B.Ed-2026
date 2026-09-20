<!--
SYNC IMPACT REPORT (v5.0.0)
Version change: 4.2.0 -> 5.0.0
Bump rationale: MAJOR, deliberately, and the choice is stated rather than left to be inferred.
ADR-0025 was MINOR because it ADDED a publication state without relaxing anything. This
REMOVES A PRECONDITION from an existing obligation: section 7 required "a validated report
whose disposition is `pass`" before a unit could publish, and it no longer does. Art. XI.2
defines MAJOR as a principle "removed or redefined in a way that invalidates existing specs",
and Spec 006 FR-016a plus the tracker legend both encode review-before-publish. A MINOR bump
on a relaxation of the publication bar would read badly later, so this is MAJOR.
Modified: Article VII.7, rewritten to define two non-certified publication tiers - a new
gate-checked tier that publishes on deterministic gate evidence alone under a "no reviewer has
read this" notice, and the existing provisional tier, carried over unchanged in substance.
Added: the requirement that gate-checked publication rests on a standing owner authorisation
recorded in specs/decisions/log.md (Art. VII.1 does not delegate publication authority, so
without this the tooling would authorise its own publications); the fail-loud requirement on
the notice mechanism; the status/evidence-kind agreement rule; and an explicit exit condition
tying the provision to the build-out of the 15 catalogued courses.
Removed: the precondition that an agent review must have returned `pass` before publication.
Reviewed and unchanged: sections 1-6 and 8 are carried over verbatim. Section 5's
qualification requirements and the self-approval prohibition are untouched and still bind -
neither tier certifies anything. Section 4's freshness rule still revokes both tiers on any
input change. Article III.2's untranslated-banner obligation remains the standing precedent
that a gap is disclosed to the reader rather than hidden. The practicing-teacher gate in the
Article VII table is not discharged by either tier.
Follow-ups: the unreviewed backlog has no age measure and no deadline; ADR-0026 records that
as a known gap rather than solving it. Feature 014 T007/T008 remain the only path to
certification.
-->

<!--
SYNC IMPACT REPORT (v4.2.0)
Version change: 4.1.0 -> 4.2.0
Bump rationale: MINOR - a new Article VII section 8 delegates two gates that were previously
undelegated. Nothing is redefined and no obligation is relaxed. Section 1 withholds
course-intake approval "by this provision", i.e. from the G3/G5 review delegation; section 8
grants it separately, on its own terms and with its own record. That is an addition, not a
redefinition, which is what keeps this below a MAJOR.
Added: Article VII.8 "Delegated gate evaluation (G0 intake and G1 unit-spec)". An evaluator
agent may approve course intake and unit-spec where the course guide determines the answer,
recording each approval in specs/decisions/log.md under a D-YYYY-NNNN code at
pending-owner-review, for the owner to confirm or reverse in batches.
Modified: nothing. Sections 1-7 are carried over verbatim.
Removed: nothing.
Reviewed and unchanged: section 5's qualification requirements and the self-approval
prohibition bind the evaluator too - 8c restates them for this delegation rather than
weakening them. Section 7's provisional publication is untouched and remains the only
delegation of publication. The practicing-teacher gate and engineering controls stay
undelegated entirely; no agent can dry-run a lesson with children. Article II.3 escalation is
explicitly preserved in 8b: which external document is authoritative is a question about the
world, and no evaluator may settle it.
Follow-ups: the evaluator's qualification is NOT established by this amendment. Its approvals
are recorded decisions awaiting owner confirmation, not certifications, and the registry and
signing-host work in Feature 014 T007/T008 is unaffected.
-->

<!--
SYNC IMPACT REPORT (v4.1.0)
Version change: 4.0.0 -> 4.1.0
Bump rationale: MINOR - a new Article VII section 7 adds a publication state that did not
exist before. Nothing is redefined and no obligation is relaxed, which is what keeps this
below a MAJOR. See ADR-0025.
Added: Article VII.7 "Provisional publication". The owner may authorise publishing a unit on
an independent agent's passing review, under a mandatory visible "Final Review Pending"
notice, with a distinct tracker status that is explicitly not a done mark.
Modified: nothing. Sections 1-6 are carried over verbatim.
Removed: nothing.
Reviewed and unchanged: section 5's qualification requirements and the self-approval
prohibition still bind in full - provisional publication explicitly does NOT satisfy them,
does not qualify a reviewer and does not certify anything. Section 6's transition rule is
untouched: agent reviews remain advisory for CERTIFICATION, and section 7 governs only
PUBLICATION, which section 1 already reserved to the owner and which the owner now delegates
under notice. Article III.2's untranslated-banner obligation is the direct precedent for
publishing with a disclosure rather than withholding content.
Follow-ups: Feature 014 T007 (signing host) and T008 (qualification) remain the path to
certification and are unaffected by this amendment.
-->

<!--
SYNC IMPACT REPORT (v4.0.0)
Version change: 3.0.0 -> 4.0.0
Bump rationale: MAJOR - Article III.2's Urdu-parity obligation is redefined. Parity was a
per-unit PUBLISH gate; it is now a CORPUS COMPLETION requirement. Existing specs that assumed
no unit may go live without an accepted Urdu version are invalidated by this change, which is
what makes it MAJOR rather than MINOR. See ADR-0022.
Modified: Article III.2 only. The exemption, the reviewer-qualification requirements, the
self-approval prohibition and the register rule are carried over verbatim.
Added: the mandatory untranslated-banner obligation for English-only publication, and the
explicit statement that this relaxes WHEN parity is owed and never WHETHER.
Removed: nothing. No obligation is dropped; one is rescheduled.
Reviewed and unchanged: Article VII's Content-gate row ("Urdu parity & register") still holds,
since the gate checks parity wherever an Urdu version exists. Spec 001 FR-003 needs no
amendment: it already specifies the English fallback and the "Urdu translation not yet
available" banner this article now relies on. No .specify/templates file references parity.
Updated: specs/content/style-guide.md (restates the publish rule; style guide -> v4.4).
Follow-up: ADR-0022 is Proposed, not Accepted. If the owner rejects it, revert this amendment.
Risk recorded in ADR-0022: Urdu debt accrues at corpus scale, carrying the single-reviewer G5
bottleneck that Feature 017 has not yet lifted. One unit is translated early as a rate probe
(specs/content/measurement-run-001.md) so the terminal phase is planned from measurement.
-->

<!--
SYNC IMPACT REPORT (v3.0.0)
Version change: 2.9.0 -> 3.0.0
Bump rationale: MAJOR - redefines mandatory human Urdu review and exclusive human G3/G5
execution as qualified human-or-agent review. See ADR-0019 (accepted by the owner on 2026-09-11).
Modified: Article III.2 and Article VII (owner row plus delegated-review provisions).
Added: evidence, independence, freshness, qualification, audit and transition obligations.
Removed: mandatory human countersignature for every G5 after delegated review is enabled.
Updated: README.md, CLAUDE.md, Spec 006 spec.md and quickstart.md transition guidance.
Reviewed: plan/spec/tasks templates; generic constitution checks need no changes.
No .specify/templates/commands directory exists. Prior ADRs and SDD/constitution.md retained.
Feature 014 supplies reviewer skills, an approved spec, evidence validation and registry.
Remaining activation work: protected signer/trust-root provisioning, real qualification and
audit operation. No agent certification is activated without these requirements.
Style-guide remains v3.4. Existing content, tracker rows and translation statuses unchanged.
-->

<!--
SYNC IMPACT REPORT (v2.9.0)
===========================
Version change: 2.8.0 -> 2.9.0
Bump rationale: MINOR - two materially expanded requirements.
  (1) Article III gains III.9a (Figure rendering and colour): figures are themed by the site's
      own theme attribute rather than the OS preference, all figure colour comes from a
      published token set with AA-verified text tokens in both themes, colour stays redundant
      with shape or label, and every figure carries a wordmark plus a caption attribution.
  (2) A new Article X-bis (Discoverability): every student-facing page carries its own
      description in its own language, and the site publishes a favicon, social card,
      robots.txt, a multi-locale sitemap index and structured data.
  Article VII's Engineering-gate row is extended with the figure asset lint and check:docs-sync.

Why III.9a is an amendment and not a style note: the previous behaviour was a DEFECT, not a
  preference. Every figure themed itself with @media (prefers-color-scheme: dark), which follows
  the operating system; Docusaurus toggles [data-theme] on <html>, and an SVG behind an <img>
  cannot observe it. A light-OS reader who clicked the site's dark toggle saw white plates on a
  dark page. Writing the rule down is what stops it recurring.

Note on III.8: unchanged and NOT weakened. "No colour-only meaning" always forbade colour as the
  SOLE carrier while permitting colour redundant with shape or label; it had been read as
  forbidding colour outright, which is how the figure set became eight greys and no hue.

Templates/artifacts requiring updates:
  - specs/content/style-guide.md            -> v3.4 (re-freezes terminology.csv, Spec 006 FR-007)
  - .claude/skills/author-unit/references/structure-standard.md (twin) -> updated
  - .claude/skills/generate-figures/references/svg-authoring.md        -> boilerplate rewritten
  - scripts/check-figures.mjs, scripts/check-docs-sync.mjs             -> enforce III.9a
  - history/adr/0018-figure-theming-palette-and-generated-standard-prose.md

Proving unit (Art. VI.1): EFMP-302 Unit 1, retrofitted in this branch.
Golden unit (Art. VI.1): EFMP-301 Unit 1, already owed at style-guide v3.3; the single
  outstanding author-unit pass now discharges both debts at v3.4.
-->

<!--
SYNC IMPACT REPORT (v2.8.0)
===========================
Version change: 2.7.0 -> 2.8.0
Bump rationale: MINOR - Article III (Content Quality Standards) gains a new sub-point III.10
  (Visual density): every new-shape unit topic file carries at least two figures, and every
  new-shape unit includes at least one concept map, flowchart, or timeline; every figure is
  classified by a closed six-value archetype. This is a new, materially expanded content
  requirement; no existing principle is removed or redefined, and no approved spec is invalidated
  (Specs 001-011 stay valid; legacy five-file units and non-topic pages are exempt, exactly as
  from III's per-topic structure rules). Source: owner instruction, this session (message item 4);
  AskUserQuestion decisions 2026-09-08 (hard enforcement, its own spec, retrofit EFMP-302 Unit 1).
  See Spec 012 and ADR-0017.

Modified:
  - Article III - new sub-point III.10 (Visual density) added. Items III.1-III.9 are unchanged and
    NOT renumbered.
  - Article VII - Engineering-gate row: the figure-marker <-> manifest consistency entry is
    extended with the visual-density floor (>= 2 figures per topic, >= 1
    concept-map/flowchart/timeline per unit, Spec 012 check:figures).

Downstream artifacts reviewed this amendment (2026-09-08):
  ✅ specs/content/style-guide.md - bumped v3.2 -> v3.3; `## Figure markers and manifests` quantity
     rule and `## Diagram conventions` rewritten to state the two-per-topic floor, the
     schematic-per-unit rule, and the six-value archetype. Bumping `version` re-freezes
     terminology.csv as a pair (Spec 006 FR-007 mechanism); no term changed.
  ✅ .claude/skills/author-unit/references/structure-standard.md (the style-guide twin) + SKILL.md
     Step 3.1 / Step 4 + references/figure-prompts.md - mirrored in the same branch.
  ✅ scripts/check-figures.mjs + scripts/lib/figure-manifest.mjs (Kind enum widened 2 -> 6) +
     tests/unit/figures-gate.test.mjs (+5 fixtures) - the enforcement mechanism.
  ✅ src/components/Figure.tsx `kind` prop union + `.figure--*` classes in src/css/custom.css.
  ✅ specs/009-figure-rendering/contracts/figure-manifest-v2.md - v3 note (Kind vocabulary widened).
  ✅ .claude/skills/generate-figures/ SKILL.md + references/svg-authoring.md - six archetype names
     mapped to existing render routes.
  ✅ specs/content/efmp-302/content-spec.md Figure plan + figures/unit-01.md manifest + the
     EFMP-302 Unit 1 retrofit (proving unit, Art. VI.1).
  ✅ .specify/templates/{plan,spec,tasks}-template.md - no hardcoded article numbers; no edit
     needed (III.1-III.9 unchanged).

Follow-up TODOs:
  - Article VI.1: EFMP-301 Unit 1 (the golden unit) is owed a re-proof to style-guide v3.3 as the
    immediate-next content task. Recorded in specs/backlog.md; NOT done in Spec 012.

--- prior report (v2.7.0) retained below ---

SYNC IMPACT REPORT (v2.7.0)
===========================
Version change: 2.6.0 -> 2.7.0
Bump rationale: MINOR - Article III (Content Quality Standards) gains a new sub-point III.9
  (Punctuation): authored student-facing content contains zero em dash characters. This is a
  new, materially expanded content requirement; no existing principle is removed or redefined,
  and no approved spec is invalidated (Specs 001-009 stay valid; the rule is additive and its
  one-time content cleanup changes only punctuation). Source: owner instruction, this session.

Modified:
  - Article III - new sub-point III.9 (Punctuation) added. Items III.1-III.8 are unchanged and
    NOT renumbered.

Downstream artifacts reviewed this amendment (2026-09-03):
  ✅ specs/content/style-guide.md - bumped v3.1 -> v3.2; the no-em-dash rule is added to
     `## EN readability rules` and `## UR register rules`. Bumping `version` re-freezes
     terminology.csv as a pair (Spec 006 FR-007 mechanism); no term changed.
  ✅ scripts/check-no-em-dash.mjs (new) + `npm run check:no-em-dash` + a CI `build`-job step +
     tests/unit/no-em-dash-gate.test.mjs - the enforcement mechanism. Scans docs/, guides/,
     i18n/, specs/content/ for the em-dash class (U+2014/U+2015/U+2E3A/U+2E3B); U+2013 en dash
     is not flagged.
  ✅ One-time cleanup pass in the same change: every em dash in docs/, guides/, i18n/,
     specs/content/ rewritten (restructure, else a spaced hyphen). history/ is exempt as an
     immutable record. .claude/skills/, src/, README.md, CLAUDE.md fixed in the same pass but
     not gated.
  ✅ .specify/templates/{plan,spec,tasks}-template.md - no hardcoded article numbers; no edit
     needed (III.1-III.8 unchanged).
  ℹ SDD/constitution.md - stale legacy draft ("Ratification pending"); not the authority, left
     as-is.

Follow-up TODOs:
  - Spec 010 (curriculum-owner console, structured feedback, interactive self-assessment) is
    authored after this amendment lands; its `.claude/skills/revise-topic` gate list includes
    `check:no-em-dash`.

--- prior report (v2.6.0) retained below ---

SYNC IMPACT REPORT (v2.6.0)
===========================
Version change: 2.5.0 → 2.6.0
Bump rationale: MINOR — several existing Article III/V/VI/VII requirements are materially
  expanded to admit the Spec 008 opt-in nested per-topic unit shape and its enforcement. No
  principle is removed or redefined, and no approved spec is invalidated (Specs 001–007 are
  unaffected; the legacy five-file unit layout remains the default and passes every gate
  unchanged). Source: owner instruction, this session — Feature 008 (`008-rich-unit-pedagogy`)
  planning + /sp.analyze finding X1. See ADR-0011.

Modified:
  - Article III.1 — one-sentence reaffirmation appended: a richer unit *structure* does not
    raise the *language* register; the plain-English ceiling is unchanged.
  - Article III.3 — expanded: a Spec 008 new-shape unit additionally carries a per-topic
    formative + summative cycle AND a unit-end bank of 10 multiple-choice + 10
    restricted-response + 5 extended-response items with rubrics; the "summative includes
    Analyze or above" rule holds at BOTH the per-topic and the unit-end level.
  - Article III.6 — expanded: the Spec 008 per-topic layout (`index.mdx` + `topic-NN.mdx` +
    `unit-assessment.mdx` [+ optional `unit-teacher-notes.mdx`], plus an optional course-level
    `course-review.mdx`) is a permitted alternative carrier of the same guide sections. Spec
    006 FR-004's five-file folding rule is superseded IN PART, not deleted; "MUST NOT be
    invented where the guide is silent" is unchanged.
  - Article V.2 — expanded with a carve-out: a bounded `## Answers and marking guidance`
    section that is the final section of a `unit-assessment.mdx` or `course-review.mdx` page is
    INTENTIONALLY-PUBLIC self-study content (as in a printed textbook), and is distinct from
    the RLS-protected LMS quiz bank / answer-key store (Spec 003), which stays backend-only and
    `verified_teacher`-gated. The "anything in the static bundle is public" principle is
    unchanged — this makes the answers section knowingly, deliberately public. Front-matter
    answer-key fields (`answer_key`/`answers`/`marking_scheme`/`rubric_answers`) remain
    forbidden everywhere.
  - Article VI.1 "Standard versioning" — re-run for the v3.0 bump: the proving unit is
    EFMP-302 Unit 1; the golden unit (EFMP-301 Unit 1) MUST be brought to v3.0 as the
    immediate next content task after the proving unit; EFMP-302 Unit 1 is the working depth
    exemplar until then. (The clause wording is unchanged — this report records its
    application.)
  - Article VII — the Review-Gate table's Engineering-gate row gains "figure-marker/manifest
    consistency" (the `scripts/check-figures.mjs` CI gate).

Downstream artifacts reviewed this amendment (2026-08-27):
  ✅ .specify/templates/{plan,spec,tasks}-template.md — no hardcoded article numbers
     (confirmed at v2.4.0/v2.5.0, unchanged); no edit needed.
  ✅ specs/008-rich-unit-pedagogy/{spec,plan}.md — spec FR-024 + Dependencies + Assumptions and
     plan's Constitution Check already cite this v2.6.0 amendment as a required first task
     (T004); no further edit needed here.
  ✅ specs/content/style-guide.md — v2.0 → v3.0 is a content-pipeline artefact bump (Spec 006
     FR-007 mechanism), covered by the amended VI.1; the bump itself lands last (Spec 008 T056,
     after the human Content gate).
  ℹ history/adr/0011 — records this decision cluster as-of its date; left as-is.
  ℹ history/adr/0005 — Art. V.2's `verified_teacher` line is the boundary the new carve-out
     draws against; still accurate, left as-is.

Superseded obligation (owner-acknowledged, 2026-08-27): the v2.5.0 "Standard versioning"
  obligation — bring the golden unit EFMP-301 Unit 1 to **style-guide v2.0** as the immediate-next
  content task after Spec 007's proving unit — was NOT satisfied (it was never started; EFMP-301's
  content-spec still carries the "> Pending … v2.0" note, and the style guide is still at v2.0).
  It is **superseded, not deferred**: the golden unit skips v2.0 and its next re-proof is directly
  at **v3.0** (the Spec 008 per-topic standard), so it is not proven twice in quick succession.
  Art. VI.1's mechanism is still honoured — the re-proof is the tracked immediate-next content
  task, and EFMP-302 Unit 1 is the working exemplar until it lands.

Follow-up TODOs:
  - Feature 008 execution MUST include (or immediately follow with) bringing EFMP-301 Unit 1 to
    style-guide v3.0 per Article VI.1 — tracked as a prose "> Pending" note now (Spec 008 T058,
    which REPLACES the stale "v2.0" note; a `▢` tracker row would flip the published unit to "not
    done" and break the deploy cron), tracker rows when it is scheduled on its own branch.
  - Prior TODOs carried forward from v2.4.0 (README / Student-Guide / Teacher-Guide initial
    authoring) — untouched by this amendment. (The v2.5.0 "EFMP-301 Unit 1 → v2.0" item is
    resolved by the "Superseded obligation" note above.)

--- prior report (v2.5.0) retained below ---

SYNC IMPACT REPORT (v2.5.0)
===========================
Version change: 2.4.0 → 2.5.0
Bump rationale: MINOR — Article VI.1 gains a new, materially expanded requirement ("Standard
  versioning"): when the content quality standard is versioned up (the style-guide /
  terminology-bank freeze marker, Spec 006 FR-007), the golden unit MUST be re-proven at the
  new version as the immediate next content task after the proving unit, and a "working depth
  exemplar" fills the gap until it is. No existing principle is removed or redefined, and no
  approved spec is invalidated — Feature 007's approach (prove on EFMP-302 Unit 1, re-proof
  EFMP-301 Unit 1 as the tracked next task) is exactly what the new wording permits. Source:
  owner instruction, this session (Feature 007 planning surfaced the tension).

Modified: Article VI.1 — the golden unit (EFMP-301 Unit 1) is now named explicitly as "the
  canonical exemplar for unit structure, CLO/SLO traceability, and bilingual parity", and a
  "Standard versioning" paragraph is appended covering proving unit vs golden unit, the
  re-proof obligation, and the working-depth-exemplar fallback. Items VI.2 and VI.3 are
  unchanged and NOT renumbered (they are cross-referenced across specs/ and history/adr/).

Downstream artifacts reviewed this amendment (2026-08-27):
  ✅ .specify/templates/plan-template.md — "Constitution Check" derives generically, no
     hardcoded article numbers (confirmed at v2.4.0, unchanged); no edit needed.
  ✅ .specify/templates/spec-template.md — no hardcoded article references; no edit needed.
  ✅ .specify/templates/tasks-template.md — no hardcoded article references; no edit needed.
  ✅ specs/007-content-depth-standard/plan.md — Constitution Check VI.1 row + note + risks
     updated in the same branch to cite the amended VI.1 (re-proof of EFMP-301 Unit 1 is now
     an explicit constitutional obligation, tracked as the immediate next content task, not a
     mere "governance smell").
  ✅ specs/007-content-depth-standard/spec.md — Dependencies line referencing "Art. VI.1
     (golden-unit-first)" reworded to "Art. VI.1 (golden-unit exemplar + standard-versioning
     re-proof)".
  ℹ history/adr/0010 — references "Art. VI.1's golden-unit-first discipline"; still accurate,
     left as-is (an ADR records the decision as-of its date).

Follow-up TODOs:
  - Feature 007 execution MUST include (or immediately follow with) a tracked task to bring
    EFMP-301 Unit 1 to style-guide v2.0 per the amended VI.1.
  - Prior TODOs carried forward from v2.4.0 (author README.md; decide which spec owns the
    Student/Teacher Guide initial authoring; v2.3.0 carried items) — untouched by this
    amendment.

--- prior report (v2.4.0) retained below ---

SYNC IMPACT REPORT (v2.4.0)
===========================
Version change: 2.3.0 → 2.4.0
Bump rationale: MINOR — a new governance article is added (Article X — Documentation for
  Multiple Audiences); no existing principle is redefined or removed, and no approved spec is
  invalidated. Source: owner instruction, this session — "update for maintaining Project docs
  for different readers, mainly the main project docs as github readme, a student guide, teacher
  docs."

Added: Article X — Documentation for Multiple Audiences. Establishes three distinct,
  purpose-built documentation surfaces (README for contributors, Student Guide, Teacher Guide),
  each written for its own reader and never merged; ties their upkeep to the spec-drift rule
  (Article IV.4) and adds a Docs gate row to Article VII's review-gate table.

Renumbered: former Article X (Amendment Procedure & Versioning) → Article XI. The intro's
  "(Article X)" cross-reference updated to "(Article XI)".

Downstream artifacts reviewed this amendment (2026-07-20):
  ✅ .specify/templates/plan-template.md — "Constitution Check" section derives from this file
     generically (no hardcoded article numbers found via grep); no change needed.
  ✅ .specify/templates/spec-template.md — no hardcoded article references found; no change
     needed.
  ✅ .specify/templates/tasks-template.md — no hardcoded article references found; no change
     needed.
  ⚠ README.md — does not yet exist at repo root. Creating it satisfies this amendment's new
     Article X.1 obligation but is separate implementation work, not a constitution edit.
  ⚠ Student Guide / Teacher Guide — do not yet exist. No spec currently owns them; the natural
     home is a new or existing feature spec (see Follow-up TODOs) since Article X only mandates
     that they exist and stay in sync, not their authoring.

Follow-up TODOs:
  - Author `README.md` at repo root (contributor-facing: setup, build/test, contribution flow,
    links to specs/ADRs) — no spec currently tracks this; consider a small standalone task or
    folding into whichever spec next touches root-level project scaffolding.
  - Decide which feature spec owns the Student Guide and Teacher Guide's initial authoring (likely
    Spec 004/005's dashboards, since those are the first features giving students/teachers a
    workflow substantial enough to document) — flagged for the owner, not decided here.
  - Prior TODOs carried forward from v2.3.0 (additional English-only courses flagged the same
    way as GENG-300; Feature 001 Vercel-reference reconciliation; specs/gaps.md G-2026-02..05
    catalog-code reconciliation) — untouched by this amendment.

--- prior report (v2.3.0) retained below ---

SYNC IMPACT REPORT (v2.3.0)
===========================
Version change: 2.2.0 → 2.3.0
Bump rationale: MINOR — Article III.2's Urdu-parity requirement, previously unconditional for
  every student-facing unit, gains an explicit carve-out for courses designated English-only by
  the subject matter itself (e.g. GENG-300 Functional English). This materially narrows a
  non-negotiable content obligation rather than merely clarifying wording, so it is not a PATCH;
  it does not remove or invalidate any existing approved unit's requirements (no unit currently
  relies on the old unconditional wording — GENG-300 is still unauthored/`coming_soon`), so it is
  not MAJOR. Source: owner instruction, this session — "there are some english only courses that
  do not require urdu translation like Functional english."

Modified: Article III.2 — added the `bilingual: false` course-level exemption from the Urdu-parity
  gate, naming GENG-300 Functional English as the first instance.

Downstream artifacts updated in this amendment (same session, 2026-07-19):
  ✅ specs/001-content-platform/spec.md — new Clarifications entry (session 2026-07-19); FR-001
     and FR-003 amended with the `bilingual: false` exemption and its `/ur/` fallback behavior
     (no "not yet available" banner when the absence is by design); Key Entities' Course line
     updated.
  ✅ specs/001-content-platform/data-model.md — Course entity gains a `bilingual` field; Unit's
     per-language render "State" list gains the English-only-course case.
  ✅ contracts/course-overview.schema.json (and its specs/001-content-platform/contracts/ copy) —
     new optional `bilingual` boolean property, default `true`.
  ✅ scripts/validate-content.mjs — the EN<->UR structural-parity gate now reads the parent
     course's `bilingual` flag (via a new `isBilingualCourse()` helper) and skips entirely for
     English-only courses, regardless of `translation_status`.
  ✅ docs/semester-1/geng-300/course-overview.mdx — `bilingual: false` set (GENG-300 is the first
     course flagged this way).
  ✅ catalog/courses.json — GENG-300's entry gains `"bilingual": false` for reference; this file
     is a human/scaffold reference, not read by the validator.

Follow-up TODOs:
  - If additional English-only courses are identified beyond GENG-300, flag them the same way
    (`bilingual: false` in their `course-overview.mdx`) — no further code or spec change needed,
    the mechanism is general.
  - Prior TODOs carried forward from v2.2.0 (Feature 001 Vercel-reference reconciliation;
    specs/gaps.md G-2026-02..05 catalog-code reconciliation) — untouched by this amendment.

--- prior report (v2.2.0) retained below ---

SYNC IMPACT REPORT (v2.2.0)
===========================
Version change: 2.1.0 → 2.2.0
Bump rationale: MINOR — the backend hosting model is redefined (managed/hosted → self-hosted on
  project-controlled infrastructure) and a "free-tier friendly" cost mandate is relaxed to a
  "cost-controlled infrastructure" one. This changes an operational commitment, not a user-facing
  authorization or content principle, and does not invalidate any approved spec's requirements or
  acceptance criteria — Spec 002's migrations, RLS policies, and client code are the same
  self-hosted-or-cloud-portable Supabase OSS stack either way (see ADR-0006). Source: owner
  decision, this session — `#decision: we will go with selfhosted backend. we will need it in
  future also. we must have strong foundations` — confirmed via AskUserQuestion
  ("Self-hosted Supabase (Recommended)").

Modified: Article V.1 — "a managed backend (**Supabase**: ...)" → "a **self-hosted Supabase**
  stack ... running on infrastructure the project controls."
Modified: Article V.6 — renamed "Free-tier friendly" → "Cost-controlled infrastructure";
  "MUST run on free/low-cost tiers (e.g., Vercel/Netlify/GitHub Pages ..., Supabase free tier
  for the backend)" → runs on infrastructure the project already owns/controls; a future move
  to a metered vendor tier requires a new ADR.

Downstream artifacts updated in this amendment (same session, 2026-07-18):
  ✅ specs/002-authentication/plan.md — Technical Context and Constitution Check table rewritten
     for self-hosted (VPS + Kong:8000), a "Gate resolution (Art. V.1/V.6)" section added.
  ✅ specs/002-authentication/quickstart.md — §1 rewritten as a self-hosted Docker Compose
     walkthrough (verified against Supabase's own self-hosting docs, not assumed); §3 migration
     application and §7 Edge Function deployment rewritten for the self-hosted flow (no cloud
     `supabase link`/`functions deploy`); §4's admin-seeding SQL also fixed to key on
     `auth_user_id`, not `id` (a pre-existing, unrelated bug found while editing this section).
  ✅ specs/002-authentication/tasks.md — T063 no longer references a Vercel preview environment.
  ✅ SDD/ROADMAP.md — architecture diagram and Decision #1 updated to self-hosted; the
     "Domain & hosting" open question marked resolved.
  ⚠ specs/002-authentication/spec.md and research.md still use technology-agnostic or
     historical-alternative language ("a managed backend service", "rejected: Vercel serverless")
     — left as-is; spec.md is explicitly implementation-agnostic by its own framing, and
     research.md's line documents a rejected alternative, not a current claim.
  — Feature 001's plan.md/research.md/tasks.md (site hosting: "Vercel primary, GitHub Pages
     fallback") are **out of scope for this amendment** — that is ADR-0002's decision for the
     *site*, not this ADR's backend decision, and the site's actual hosting reality (nginx →
     apache2 on this VPS) predates and is independent of today's change. Left flagged, not fixed.

Follow-up TODOs:
  - Reconcile Feature 001's ADR-0002/plan.md Vercel references against the site's actual
    self-hosted deployment — a separate, pre-existing inaccuracy, not created by this amendment.
  - Prior TODO carried forward: reconcile ROADMAP course catalog codes once specs/gaps.md
    G-2026-02..05 are resolved (GNAS code, Pakistan Studies placement, Fehm-e-Quran code, GSOS CH).

--- prior report (v2.1.0) retained below ---

SYNC IMPACT REPORT (v2.1.0)
===========================
Version change: 2.0.0 → 2.1.0
Bump rationale: MINOR — a stated capability is narrowed, not reversed. Article V.3 previously
  granted "a user MAY switch their own role between these two" (student/teacher). Spec 002's
  clarify session (2026-07-18, Q1 answer D) established that the role is self-selectable at
  SIGN-UP ONLY and thereafter changeable by an admin alone, so a teacher cannot strand an
  active class by self-downgrading. No existing spec is invalidated (Spec 002 already encodes
  this as FR-010/FR-010a; Spec 001 does not touch roles). Detected by the Constitution Check
  gate during /sp.plan for 002-authentication and confirmed by the owner.

Modified: Article V.3 — "a user MAY switch their own role between these two" → roles are
  self-selectable at sign-up only; the role is immutable to the account holder afterwards and
  changeable only by an admin.

Downstream artifacts: specs/002-authentication/spec.md already aligned (FR-010, FR-010a,
  US3 acceptance scenario 5). ADR-0005 unaffected in substance (its verified_teacher gate
  stands); its role-switching prose should note the sign-up-only restriction.

--- prior report (v2.0.0) retained below ---

SYNC IMPACT REPORT
==================
Version change: 1.1.0 → 2.0.0
Bump rationale: MAJOR — backward-incompatible redefinition of a governance principle. The
  former non-negotiable rule "Teacher role assignment requires admin approval — no
  self-declared teachers" (Article V.3, reinforced by Article IX.3) is REVERSED: the teacher
  role is now self-selectable, and admin control moves to a separate `verified_teacher`
  capability that gates answer keys/restricted material. Reversing a stated non-negotiable is
  a breaking governance change even though no already-approved spec is invalidated (Spec 001
  does not touch roles; Spec 002 is being drafted to match). Source: /sp.clarify (2026-07-17)
  owner decision + ADR-0005.

Source: history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
  (Proposed) and specs/002-authentication/spec.md Clarifications (Session 2026-07-17).

Modified principles/articles:
  - Article V.3 — Roles: "Teacher role assignment requires admin approval — no self-declared
    teachers" → self-selectable `student`/`teacher` roles (default student; admin never
    self-selectable); teacher grants peer-teaching only; restricted-material access gated
    behind an admin-granted `verified_teacher` capability (default off). Renamed to
    "Roles and restricted-material access."
  - Article IX.3 — Authentication & Access: "Teacher-role elevation is an explicit admin
    action and MUST be recorded" → the audited admin action is now the `verified_teacher`
    grant (access to answer keys/restricted material); self-selecting teacher needs no approval.

Added sections: none.
Removed sections: none (the admin-approval obligation is relocated to the verified_teacher grant).

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — "Constitution Check" gate derives from this file
     at plan time; no hardcoded principle text; verified by grep (no admin-approval strings).
  ✅ .specify/templates/spec-template.md — mandatory sections compatible; no change needed.
  ✅ .specify/templates/tasks-template.md — no hardcoded principle references; no change needed.
  ⚠ .specify/templates/commands/*.md — directory absent/empty in this repo; nothing to reconcile.

Downstream artifacts updated in this amendment:
  ✅ SDD/ROADMAP.md — Decision #4 rewritten to match (self-selectable teacher + verified_teacher gate).

Follow-up TODOs:
  ✅ ADR-0005 is Accepted; the amendment landed in commit 9b996bd, and the ADR's Decision
     section was updated for the v2.1.0 sign-up-only narrowing.
  - Prior TODO carried forward: reconcile ROADMAP course catalog codes once specs/gaps.md
    G-2026-02..05 are resolved (GNAS code, Pakistan Studies placement, Fehm-e-Quran code, GSOS CH).
-->

# CONSTITUTION
## B.Ed (4-Year) Mega Textbook & Learning Platform
**University of Sindh, Faculty of Education, Elsa Kazi Campus, Hyderabad**

This constitution is the highest-authority document of the project. Every spec, plan, task,
and line of code MUST comply with it. Amendments require an explicit version bump and a
written rationale (Article XI).

---

## Article I - Purpose

Build a bilingual (English + Urdu) digital textbook and learning platform for the B.Ed
(4-Year) programme (UGE Policy 2023 v1.1, aligned with HEC's 2025 Proposed Curriculum for
Education, applicable from 2026; 8 semesters, 132 credit hours), serving:

1. **Students** - as a primary or teacher-guided secondary learning resource.
2. **Teachers** - as a teaching companion (activities, handouts, formative/summative
   assessments) and a virtual class manager (assignments, grading, progress tracking).

## Article II - Guiding Document Supremacy

1. The **approved Scheme of Study** (`Scheme-and-Course-guides/B.Ed 4 Year board.docx`) and
   the **official course guides** (local folder `Scheme-and-Course-guides/`, covering all 8
   semesters - Sem I–II as PDF, Sem III–VIII as DOCX) are the sole source of truth for WHAT
   is taught.
2. No unit, SLO/CLO, activity, or assessment ships unless it traces to a course-guide item.
   Traceability MUST be recorded in each unit's front-matter (`clo_refs:` field).
3. If a course guide is ambiguous or missing, the gap MUST be logged in `specs/gaps.md` and
   escalated to the curriculum owner (Yousif) - never invented. All 8 semesters' guides are
   now text-extracted; open board-vs-guide discrepancies for Sems I/II (e.g. GNAS code,
   Pakistan Studies placement, Fehm-e-Quran code) are tracked in `specs/gaps.md`.

**Rationale:** Content authority derives from the university/HEC curriculum, not from
authors' preference; traceability makes accreditation review auditable.

## Article III - Content Quality Standards (non-negotiable)

1. **Simple English**: student-facing prose targets an accessible register for a fresh
   HSC/intermediate graduate. No graduate-level jargon without a bilingual glossary entry. A
   richer unit *structure* (e.g. the Spec 008 per-topic learning cycle) does not raise the
   *language* register - the plain-English ceiling is unchanged by it.
2. **Urdu parity**: every student-facing unit MUST have a complete Urdu version accepted
   through G5 **before the corpus is complete**, **except units belonging to a course
   explicitly designated English-only** (e.g. GENG-300 Functional English), flagged
   `bilingual: false` in course-overview metadata.

   Parity is a **corpus completion requirement, not a per-unit publish gate** (ADR-0022). A
   unit MAY publish English-only; when it does, the `ur` route MUST render the "Urdu
   translation not yet available" banner already required by Spec 001 FR-003, so the gap is
   stated to the reader rather than hidden. English-only publication is an acknowledged
   interim state and MUST NOT be presented, in the product or its metadata, as a finished
   bilingual unit. This relaxes *when* parity is owed, never *whether*: a corpus that ships
   complete in English and incomplete in Urdu does not satisfy this article.

   Machine translation MAY draft. G5 MUST be performed by a
   qualified human reviewer or an independently qualified review agent under Article VII.
   A translation cannot approve itself. Register: academic-plain (درسی مگر عام فہم),
   not literary/archaic. Structural parity alone is insufficient evidence of semantic parity.
3. **Bloom's tagging**: every assessment item MUST carry a Bloom's-level tag. Formative sets
   skew Remember→Apply; summative sets MUST include Analyze or above. A Spec 008 new-shape unit
   additionally carries a per-topic formative + summative cycle **and** a unit-end bank of
   **10 multiple-choice + 10 restricted-response + 5 extended-response** items with rubrics;
   the "Analyze or above" rule holds at **both** the per-topic `## Summative task` and the
   unit-end extended-response rubrics.
4. **Pakistan-grounded examples**: case studies and examples use Pakistani/Sindh classroom
   contexts wherever the subject allows.
5. **Citations**: definitions and claims cite the course guide, HEC document, or a named
   academic source. Original prose only - no reproduction of copyrighted textbook passages.
   Each course guide's recommended books/resources are a permitted starting point - used for
   scoping and listed as bibliographic references only, never reproduced.
6. **Guide-section fidelity**: where a course guide provides them, every course/unit MUST
   incorporate the guide's **Teaching/Instructional Strategies**, **Suggested Practical
   Activities (optional)**, **Suggested Instructional/Reading Materials**, **Practical Work**
   (group work, group/individual assignments, presentations), and **Assessment Criteria**
   (class test, mid-term, assignment evaluation, attendance, participation). These fold into
   the existing unit files and a per-course overview page (see Spec 006), **or** into the
   Spec 008 opt-in per-topic layout (`index.mdx` + `topic-NN.mdx` + `unit-assessment.mdx`
   [+ optional `unit-teacher-notes.mdx`], plus an optional course-level `course-review.mdx`) as
   an alternative carrier of the same sections - Spec 006 FR-004's five-file folding rule is
   superseded **in part**, not deleted, and still governs every unit that has not opted in.
   They MUST NOT be invented where the guide is silent.
7. **Assessment weighting**: for the affiliated GECEs (colleges), assessment is **60%
   summative and 40% formative** by default. Assessment blueprints in the pipeline follow
   this split; per-unit deviations MUST be justified in the unit spec.
8. **Accessibility**: semantic heading hierarchy, alt text on all images/diagrams, no
   color-only meaning, and RTL-correct Urdu rendering are required on every page.
9. **Punctuation**: authored student-facing content contains **zero em dash characters**
   (U+2014, and the related U+2015 / U+2E3A / U+2E3B). Where a strong parenthetical break is
   wanted, restructure the sentence (comma, colon, parentheses, or two sentences) or use a
   spaced hyphen `" - "`. The en dash (U+2013) stays permitted for numeric ranges
   (`5-8 items`). Enforced by the `check:no-em-dash` CI gate over `docs/`, `guides/`, `i18n/`,
   and `specs/content/`; `history/` is exempt as an immutable record, and `.claude/skills/`,
   `src/`, `README.md`, `CLAUDE.md` are kept clean by convention but not gated.
9a. **Figure rendering and colour** (Spec 013): a figure MUST be themed by the site's own
   theme attribute, never by the reader's operating-system preference; an SVG behind an
   `<img>` cannot observe the page's theme, so a self-contained `prefers-color-scheme` block
   is a defect, not a style. All figure colour MUST be drawn from the published token set
   (`scripts/lib/figure-palette.mjs`), declared once per file, with every text token clearing
   WCAG AA against its ground in both themes. Colour is always **redundant** with shape, dash
   pattern or label - the test is "delete every colour; does the figure still read?" Every
   figure carries one `textbook.com.pk` wordmark, hidden from assistive technology and absent
   from the figure's description, plus a visible attribution in its caption. Enforced by
   `check:figures`, which reads the committed SVG bytes.

10. **Visual density**: every new-shape unit topic file (`topic-*.mdx`) MUST carry **at least
   two figures** (a `{/* FIGURE[...] */}` marker or a rendered `<Figure>`), and every new-shape
   unit MUST include **at least one concept map, flowchart, or timeline**. Every figure is
   classified by one archetype - `table`, `concept-map`, `flowchart`, `timeline`, `diagram`, or
   `illustration` - recorded on the unit's figure manifest. Legacy five-file units and non-topic
   pages are exempt, as they are from III's per-topic structure rules. Enforced by the
   `check:figures` CI gate. Accessibility (III.8) applies to every figure.

## Article IV - Spec-Driven Development Law

1. **Order of work**: Constitution → Feature Spec → Plan → Tasks → Implementation → Review
   Gate. No implementation before its spec is approved.
2. Each feature lives in `specs/NNN-feature-name/` containing `spec.md` (what & why),
   `plan.md` (how), and `tasks.md` (checklist with acceptance criteria).
3. A task is **Done** only when its acceptance criteria pass and the review gate (Article
   VII) is cleared.
4. Scope changes amend the spec first, then the code. "Spec drift" (code diverging from
   spec) is a defect and MUST be fixed by realigning code or amending the spec.

## Article V - Architecture Principles

1. **Content and application are separate concerns.**
   - Content (the textbook) = Markdown/MDX in a Git repository, rendered by **Docusaurus**.
     Versioned, diffable, reviewable.
   - Application state (users, submissions, grades, feedback) = a **self-hosted Supabase**
     stack (Postgres + Auth + Row-Level Security + Storage) running on infrastructure the
     project controls, not a third-party managed tier. Docusaurus is static and MUST NOT be
     trusted with secrets or access control. (Rationale and alternatives in ADR-0006.)
2. **Security lives in the backend.** Graded-assessment answer keys, grades, and submissions
   are protected by database Row-Level Security, never by "hidden" static pages. Anything
   shipped in the static bundle is public - treat it as such.

   **Carve-out (Spec 008): self-study textbook answers.** A single bounded
   `## Answers and marking guidance` section that is the **final** section of a
   `unit-assessment.mdx` or `course-review.mdx` page MAY carry answer keys and marking rubrics
   as **intentionally public** self-study content - the same role that answers printed at the
   back of a textbook serve for an independent learner. This is distinct from, and MUST NOT be
   confused with, the RLS-protected LMS quiz bank and answer-key store (Spec 003), which
   remains backend-only and gated by the `verified_teacher` capability (Art. V.3, IX.3). The
   "anything in the static bundle is public" principle is unchanged - the carve-out makes the
   answers section *knowingly* public, nothing more. Answer-key **front-matter fields**
   (`answer_key`/`answers`/`marking_scheme`/`rubric_answers`) remain forbidden on every file,
   and the answer-key content scan (`scripts/check-no-answer-keys.mjs`) still rejects
   answer-key markers everywhere outside that one bounded section.
3. **Roles and restricted-material access.** The roles are `student`, `teacher`, and `admin`
   (curriculum owner). The `student` and `teacher` roles are **self-selectable at sign-up
   only** (default `student`) so a capable student MAY lead a peer study group. Once an
   account exists its role is **immutable to the account holder**: changing it is an admin
   action. This prevents a teacher from stranding an active class by self-downgrading. The
   `admin` role is **never** self-selectable - it is seeded or assigned only by an existing
   admin. The teacher role grants **peer-teaching
   capabilities only** (create classes, assign, give feedback, view own students' work); it
   MUST NOT by itself grant access to answer keys or other restricted teaching material.
   Access to restricted material is a separate **`verified_teacher` capability**, granted only
   by an admin (default off), enforced at the backend per Article V.2. (This reverses the
   former "teacher requires admin approval" rule; rationale and alternatives in ADR-0005.)
4. **One course = one content module.** Adding a course MUST NOT require changing platform
   code - only adding content folders + metadata.
5. **Offline-tolerant & low-bandwidth first**: the site MUST be usable on low-end mobile
   devices and unreliable connections common in Sindh. Budget: content pages usable at
   < 200 KB first load (excluding images); images lazy-loaded and compressed.
6. **Cost-controlled infrastructure**: the platform runs on infrastructure the project already
   owns or controls rather than a metered vendor tier - the static site and the self-hosted
   Supabase backend (Art. V.1) share the project's existing server. This trades a hosted
   provider's free-tier caps and pause-on-inactivity risk for direct operational ownership
   (backups, upgrades, uptime). A future move to a managed or additional-cost tier requires a
   new ADR.

## Article VI - Scope Discipline

1. **Build once, scale by semester.** The platform is built once. **All 8 semesters MUST be
   scaffolded** (folders + metadata from the Scheme of Study and each guide's unit list).
   **Content-creation priority is Semesters 1–4** for the new 2026 scheme (Sem 1 → 2 → 3 → 4),
   then Semesters 5–8. The **golden unit** that sets the quality bar is EFMP-301
   (Educational Psychology), Unit 1 - the canonical exemplar for unit structure, CLO/SLO
   traceability, and bilingual parity.

   **Standard versioning.** The content quality standard is versioned by the
   `specs/content/style-guide.md` + terminology-bank freeze marker (Spec 006 FR-007). When
   that standard is bumped to a new version, the raised bar is first demonstrated on one
   **proving unit** (which need NOT be the golden unit). The golden unit MUST then be brought
   to the new standard version as the **immediate next content task after the proving unit**,
   recorded as a row in its course's pipeline task tracker; the version bump itself is not
   blocked on it. Until the golden unit is re-proven at the current standard version, the most
   recently accepted unit authored at that version is the **working depth exemplar** in its
   place.
2. Features not in an approved spec are out of scope. A parking lot (`specs/backlog.md`)
   captures ideas without blocking delivery.
3. Real-time features (live chat, video, notifications beyond email) are explicitly
   **Phase 3+** and require a new spec.

## Article VII - Review Gates

Before any unit or feature is marked complete, all applicable gates MUST pass:

| Gate | Checks | Owner |
|---|---|---|
| Content gate | CLO traceability • simple-English readability • Urdu parity & register • Bloom's tags • citations • guide-section fidelity • accessibility | Curriculum owner accountable; qualified human or enabled independent agent executes G3/G5 |
| Engineering gate | Spec compliance • RLS policies tested • responsive/RTL rendering verified • Lighthouse performance pass • figure asset lint (palette, wordmark, dark-variant freshness, Urdu parity) + docs/code sync (`check:docs-sync`) + figure-marker ↔ manifest consistency + visual-density floor: ≥ 2 figures per topic, ≥ 1 concept-map/flowchart/timeline per unit (Spec 008 + Spec 012 `check:figures`) | Developer |
| Teacher gate (per course, once) | One practicing teacher dry-runs the unit's activities & assessments | Pilot teacher |
| Docs gate | A shipped spec that changes a student/teacher workflow or contributor setup updates the matching guide (Student Guide, Teacher Guide, or README - Article X) in the same branch | Feature author |

### Delegated G3/G5 review (ADR-0019)

1. **Scope and accountability.** G3 English review and G5 Urdu review MAY be completed by
   an independently qualified agent without per-unit human countersignature. The curriculum
   owner owns review policy, qualification and escalations. Course-intake approval, unresolved
   guide/scope decisions (Article II.3), the practicing-teacher gate, engineering controls and
   publication authority are not delegated by this provision.
2. **Independence.** The reviewer MUST run separately from the author/translator of the
   reviewed version. It MUST NOT modify its review inputs or approval policy. Repairs go
   through authoring and a fresh review; at most two repair cycles precede escalation.
3. **Evidence.** Acceptance MUST identify the reviewer, configuration, rubric, exact input
   digests and actual per-criterion evidence. Agent identity MUST NOT impersonate human
   initials. All applicable criteria and mandatory deterministic checks MUST pass, with no
   unresolved blocking or uncertain findings. Missing tools or unverifiable evidence require
   escalation. Historical human reviews MUST NOT be relabelled as agent reviews.
4. **Freshness.** Input or dependency changes invalidate affected acceptance. G5 MUST bind
   to accepted G3 evidence for the same English version. Review attempts and supersession
   links MUST remain auditable. Reports and completion metadata MUST NOT hide content edits.
5. **Qualification and revocation.** Before agent sign-off is enabled, a protected registry
   MUST record owner-approved qualification of the exact reviewer configuration and scope,
   supported by held-out clean and defective cases, provenance checks and stale-evidence
   mutation tests as specified by ADR-0019. Candidate content or reviewer output cannot
   authorize itself. Pilot audits MUST cover every fifth agent-approved unit and all
   escalations. A missed blocking defect disables the affected stage and requires affected
   content review and requalification. Model, skill or rubric changes require requalification.
6. **Transition.** Until evidence enforcement and reviewer qualification are implemented,
   agent reviews are advisory and human sign-off remains the operative path. ADR-0019 and
   this version bump alone MUST NOT mark G3/G5 done or change `translation_status`.
   This governance amendment does not alter the content quality standard's version or
   remove existing Article VI.1 obligations.
7. **Publication without certification (ADR-0025, ADR-0026).** A unit MAY be published before it
   is certified, in one of exactly two tiers, provided every reader-facing page of that unit
   displays the notice its tier requires. Neither tier is certification.
   1. **Gate-checked.** The unit's deterministic draft gates pass, evidenced by a valid G2
      record whose input manifest still matches the published bytes, and **no reviewer has read
      it**. Notice: **"Draft - expert review pending"**. Publishing in this tier requires a
      standing authorisation from the curriculum owner, recorded in `specs/decisions/log.md`
      under a decision code naming the courses it covers; section 1 does not delegate
      publication authority, and an unrecorded authorisation is void.
   2. **Provisional.** An independent agent review returned `pass` but carries no signed,
      qualified certification. Notice: **"Final Review Pending"**. Its evidence reference MUST
      identify a validated report whose disposition is `pass` and whose input manifest still
      matches the published bytes.
   The tracker row MUST record the tier's distinct status, never a done mark, and **the status
   MUST agree with the kind of evidence referenced** - gate evidence with the done mark for a
   draft stage, provisional evidence with the provisional mark, signed evidence with the done
   mark. A mismatch is a defect, not a formatting preference: it is how an uncertified unit
   silently presents as certified.
   The absence of a review is permitted; **a broken claim of review is not.** A review row that
   is present but whose evidence does not validate remains a gate failure.
   The notice mechanism MUST fail loudly. A missing, malformed or stale publication-state record
   MUST fail the build rather than resolve to no notice, and a tier the build does not recognise
   MUST render the strongest notice rather than none. Where the notice is the only disclosure
   that content is unreviewed, silently omitting it is the most consequential failure available.
   Neither tier satisfies section 5, qualifies a reviewer, changes `translation_status`, or
   discharges the practicing-teacher gate or any Article VI.1 obligation. A unit in either tier
   remains outstanding work and MUST continue to appear in the review queue until certified. Any
   change to the unit's inputs revokes its tier by invalidating its evidence, exactly as section
   4 requires. The owner MAY withdraw a publication at any time without requalifying anything.
   **Exit condition.** Tier (a) exists for the build-out of the currently catalogued courses.
   When they are authored the owner MUST decide explicitly whether to keep, narrow or withdraw
   it; a unit still in tier (a) at that point is reviewed or withdrawn. It does not become
   permanent by default.

8. **Delegated gate evaluation (G0 intake and G1 unit-spec).** An evaluator agent MAY approve
   G0 course intake and G1 unit-spec for a course whose guide determines the answer, without
   per-course human countersignature. Section 1 withholds course-intake approval from the
   *review* delegation; this section grants it separately and on different terms.
   1. **Recorded decisions.** Every approval MUST be recorded in `specs/decisions/log.md` under
      a stable `D-YYYY-NNNN` code carrying the gate, the scope, the basis it rested on, the
      digests of the inputs it was bound to, and a status of `pending-owner-review`. The owner
      confirms or reverses in batches. An approval that is not recorded is void.
   2. **Guide-determined only.** The evaluator MAY approve only what the course guide settles.
      Anything the guide does not determine - an Article II.3 scheme/guide conflict, an absent
      or unusable reading list, a unit partition the guide does not support - MUST be escalated
      to `specs/gaps.md` and MUST NOT be decided.
   3. **Independence and self-approval.** The evaluator MUST run separately from the session
      that drafted the artefact it evaluates. It MUST NOT modify its inputs, the course guide,
      the non-delegated boundary recorded in the decision log, or its own permissions, and it
      MUST NOT approve a specification it wrote. Candidate output cannot authorize itself.
   4. **Boundaries unchanged.** This section delegates G0 and G1 only. G3 and G5 remain governed
      by sections 1 to 6; publication authority by sections 1 and 7; the practicing-teacher gate
      and engineering controls are not delegated at all. An evaluator approval is not a review,
      certifies no content, and qualifies no reviewer.
   5. **Freshness and reversal.** An approval binds to the input digests it recorded. A change to
      a bound input voids it, exactly as section 4 requires of review acceptance. A reversal
      reopens the gate and never rewrites the original entry.

## Article VIII - Data Protection & Ethics

1. Student data (grades, submissions) is confidential: visible only to the student, their
   enrolled teacher(s), and admin. Enforced via RLS and verified by automated tests.
2. Collect the minimum: name, email, role, enrollment. No CNIC, phone, or address in v1.
3. Passwords are never stored in plaintext (delegated to the auth provider).
4. Students MAY request account deletion; deletion anonymizes submissions rather than
   destroying teacher gradebooks.

## Article IX - Authentication & Access

1. Google OAuth and email/password are the **only** sign-in methods in v1; any additional
   provider requires a new spec.
2. Every authenticated action MUST be authorized against the caller's role (Article V.3)
   at the database layer, not only in the UI.
3. **Verified-teacher elevation** - granting the `verified_teacher` capability (access to
   answer keys and other restricted material) - is an explicit admin action and MUST be
   recorded (who granted, when). Self-selecting the `teacher` role is not an elevation and
   requires no approval.

## Article X - Documentation for Multiple Audiences (non-negotiable)

1. The project MUST maintain three distinct, purpose-built documentation surfaces. Each is
   written for one reader and MUST NOT be merged into a generic catch-all document:
   - **README** (`README.md`, repo root) - for developers and contributors: what the project
     is, local setup, how to build/test, contribution flow, and links to `specs/`, ADRs, and
     the constitution. Technical register; assumes engineering literacy.
   - **Student Guide** - for students: how to navigate the platform, join a class, submit
     work, read grades, and use the dashboard. Plain-English register per Article III.1,
     extended here from curriculum prose to app/workflow text; bilingual per Article III.2,
     since it is student-facing.
   - **Teacher Guide** - for teachers: class, assignment, and grading workflows, the teacher
     dashboard, and what `verified_teacher`-gated features unlock. Written for a pedagogical,
     non-technical reader; describes role capabilities, never implementation.
2. **Stay-in-sync obligation**: a spec that changes a student- or teacher-facing workflow MUST
   update the corresponding guide in the same feature branch; a spec that changes contributor-
   facing setup or process MUST update the README likewise. This extends the spec-drift rule
   (Article IV.4) to these three surfaces - a stale guide is a defect, not a later cleanup task.
3. **No substitution between surfaces**: a developer setting up the repo MUST NOT need to read
   the Student or Teacher Guide, and a student or teacher MUST NOT be pointed at the README or
   `specs/` to learn how to use the platform.
4. **Location & format**: `README.md` is plain Markdown at repo root, GitHub-rendered. The
   Student Guide and Teacher Guide are bilingual Docusaurus-rendered pages (reusing the same
   content pipeline as curriculum material, per Article V.1's content/app separation - these are
   platform-usage docs, not curriculum content) and are reachable from in-app navigation for the
   relevant signed-in role.

**Rationale:** distinct readers have distinct goals and vocabularies. A single combined
document either drowns non-technical readers in engineering detail or starves contributors of
the internals they need. Article III's Simple English mandate governs curriculum content; this
article extends the same plain-language discipline to platform-usage docs for students and
teachers specifically, while keeping the README technical and separate.

## Article X-bis - Discoverability (Spec 013)

The textbook is public and free; a unit nobody can find serves nobody. Every student-facing
page MUST carry its own `description` in its own language - never a fallback shared with
other pages - and the site MUST publish a favicon, a social card, `robots.txt`, a sitemap
index covering every locale, and schema.org structured data. Signed-in application pages are
excluded from the sitemap. Enforced by `validate:content` (description) and reviewed at the
Engineering gate (the rest).

## Article XI - Amendment Procedure & Versioning

1. **Procedure**: propose the change in writing → assess impact on existing specs, plans,
   and templates → bump this constitution's version → update affected specs before touching
   code.
2. **Semantic versioning** of this document:
   - **MAJOR**: backward-incompatible governance changes - a principle is removed or
     redefined in a way that invalidates existing specs.
   - **MINOR**: a new principle/article or a materially expanded requirement is added.
   - **PATCH**: clarifications, wording, or typo fixes with no change to obligations.
3. **Compliance review**: every plan's "Constitution Check" gate MUST verify alignment with
   the current version. Violations are tracked in the plan's Complexity Tracking table with
   justification or are rejected.

---

**Version**: 5.0.0 | **Ratified**: 2026-07-17 | **Last Amended**: 2026-09-20
