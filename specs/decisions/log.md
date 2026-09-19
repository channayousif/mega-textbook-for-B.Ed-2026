# Gate Decision Log

Every gate approval that was not made by the curriculum owner in person is recorded here under a
stable code, with the basis it rested on and the inputs it was bound to. The owner reviews entries
in batches and sets `confirmed` or `reversed`.

This register is the counterpart to `specs/gaps.md`. That log records **questions escalated to the
owner**; this one records **decisions taken on the owner's behalf**, so both directions of the
delegation are auditable from the repository alone.

Status: `pending-owner-review` (taken, awaiting the owner) - `confirmed` - `reversed`.

A reversal reopens the gate. It never rewrites the original entry, because the point of the log is
that a decision and its basis remain inspectable after the fact.

## What is NOT delegated

Recorded here so the boundary stays visible as the log grows:

- **Article II.3 discrepancies** - a conflict between the board Scheme of Study and a course guide
  is an adjudication about which external document is authoritative. No agent can settle that; it
  is a question about the world, not the repository. These continue to escalate via
  `specs/gaps.md`.
- **Publication authority** (Constitution Art. VII.1) and **reviewer qualification** (Art. VII.5).
- Anything an evaluator marks as not determined by the course guide.

---

## D-2026-0001 - Unretrievable sources may be flagged and passed

- **Status:** confirmed
- **Gate:** G3 (English review), `sources` criterion
- **Scope:** corpus-wide
- **Decided by:** curriculum owner, 2026-09-19
- **Decision:** A source whose text cannot be obtained may be flagged "Could not be retrieved on
  \<date\>" and the work proceeds, rather than blocking the gate indefinitely.
- **Basis:** Four independent G3 reviews of EFMP-302 Units 3-6 (run 002, reports under
  `specs/content/efmp-302/reviews/unit-0N/G3/`) all returned `escalate`, and all four concluded
  independently that the surviving `sources` findings could not be closed by further authoring:
  the publishers do not serve the text to this host. Re-attempts during review reproduced
  itacec.org HTTP 401/403, nacte.org.pk HTTP 404, unesdoc HTTP 403 and ScienceDirect HTTP 403,
  while ERIC and Crossref answered normally in the same sessions.
- **Applied in:** the `## Unverifiable sources` declarations across
  `specs/content/efmp-302/sources/unit-0{1..6}.md` (24 keys), and the rubric amendment in
  `.claude/skills/review-unit/references/g3.md` plus `.claude/skills/review-unit/SKILL.md` without
  which the declaration alone would still force an escalate.
- **Limits:** The source remains unverified; the declaration is not a substitute for reading it.
  A reviewer still fails `sources` where prose relies on such a source for a claim it does not
  disclose as uncorroborated, or states more than the declaration supports.

## D-2026-0002 - EFMP-302 Unit 6 activity design: the one-page plan

- **Status:** confirmed
- **Gate:** G1 (unit-spec)
- **Scope:** EFMP-302, Unit 6
- **Decided by:** curriculum owner, 2026-09-19
- **Decision:** Unit 6's worked-example activity is the **one-page** development plan, built in
  about twenty minutes and reviewed at a named date, carrying the six blocks of Topic 6.4. The
  competing one-term design, which named one activity from each "ways to continue developing"
  category, is superseded.
- **Basis:** The G3 run-003 review of Unit 6 found `content-spec.md` "## Unit 6" stating both
  designs in the same subsection with no amendment note, which is a contradiction in the G1
  authority itself rather than a defect the author could resolve. `topic-04.mdx:131-143` follows
  the one-page design and `:77-79` argues directly against building a plan from one activity per
  category, so the authored unit already embodies the decision. Escalated because a reviewer
  cannot choose between two readings of an approved spec; that is a scope decision under
  Constitution Art. II.3 and Art. VII.1.
- **Applied in:** `specs/content/efmp-302/content-spec.md` "## Unit 6", both the
  `**Worked-example / activity concepts**` bullet and the `**Worked-examples plan**` paragraph,
  the superseded wording recorded rather than silently deleted.
- **Limits:** Settles Unit 6 only. It does not change the assessment blueprint, the sub-topic
  checklist, or any other unit's activity design.
