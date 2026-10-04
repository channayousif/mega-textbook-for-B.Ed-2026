---
id: 0091
title: EFMP-302 U3/U4/U5 QC clearance verdict
stage: misc
date: 2026-10-04
surface: agent
model: claude-opus-5
feature: 023-author-efmp-302
branch: agent/TEX-27
user: channayousif
command: Paperclip heartbeat on TEX-27
labels: ["CurriculumOwner", "efmp-302", "publication", "review-evidence", "adr-0026", "qc"]
links:
  spec: specs/content/efmp-302/tasks.md
  ticket: TEX-27
  adr: history/adr/0026-publish-on-deterministic-gates.md
  pr: null
files:
 - specs/decisions/log.md
 - specs/gaps.md
 - specs/content/efmp-302/tasks.md
 - history/prompts/efmp-302/0091-efmp302-u3-u4-u5-qc-clearance.misc.prompt.md
tests:
 - npm run check:content (13/13 pass at 71dfa698, after node scripts/report-content-status.mjs)
 - acceptProvisionalReport() against the three feature-023 G3 reports (all three FAIL)
 - inputManifest() diff per unit (added/removed/changed bound paths)
---

## Prompt

TEX-27 - EFMP-302 U3/U4/U5: QC clearance and publication at provisional (roadmap Phase 0b).

Phase 0b of the TEX-4 roadmap (revision 2). The reader-facing banner is not a bug and this task
does not remove it; board instruction on TEX-26 is that the notice is our permanent, intentional
disclaimer that the content is machine-authored and that readers may report errors and omissions.
What this task does is publish the accurate disclaimer on three units: EFMP-302 U3, U4 and U5 all
passed independent agent review (`specs/content/efmp-302/tasks.md` lines 62-93) yet
`content-status.json` reports them as `gated`, whose notice says "no reviewer has read it yet".

Authority: the board delegated publication to the CEO once QC checks are clear (TEX-26), on top of
the owner's standing authorisation in `D-2026-0014`. This issue carries that CEO authorisation for
EFMP-302 U3, U4 and U5 only, conditional on the QC checklist being recorded as passing.

Scope - in: Units 3, 4, 5. Out: U2 (G-2026-63 repair unverified) and U6 (two live `sources`
blockers, G-2026-64); anything in the held TEX-7/TEX-8/TEX-18 tree.

QC clearance checklist (roadmap section 2a), result of each recorded per unit:
A. `npm run check:content` passes (13 gates), then `check:all` before merge; `flock` every heavy
   job and check `free -m` first.
B. No open `G-20NN-NN` escalation or `specs/gaps.md` entry against the unit, and no finding in the
   "repaired but unverified" state. U4's 4 recorded residuals from G-2026-66 listed explicitly,
   with a judgement on whether each blocks.
C. Review evidence validates, not merely exists (ADR-0026 sections 2 and 4). A present-but-invalid
   review row is a gate failure.
D. Factual-claim spot check: every statistic, named attribution, accreditation claim and
   institution name. `D-2026-0014` records four fabrications of exactly this class passing the
   gates on this same course.
E. Illustrations inspected for maps, flags and emblems; no classroom that is not plausibly Sindh.
F. The Urdu page carries the same disclaimer and feedback route as the English one.

Deliverables: a comment with the A-F result per unit plus any unit judged not clear (a false
clearance is worse than a delay); a draft PR moving the tracker rows for the clear units to
`provisional`, tier derived from evidence and never hand-authored, including the regenerated
`static/content-status.json`; a numbered decision in `specs/decisions/log.md` citing TEX-26 and
`D-2026-0014` with the standard limits clause; and a PHR. Tier B work, own worktree, draft PR,
never merge.

## Response snapshot

**Verdict: none of the three units cleared. Criterion C fails for all three, and it is the one
criterion that cannot be waived.**

`acceptProvisionalReport()` was run at `71dfa698` against the three feature-023 G3 reports. All
three return `stale or incomplete input manifest`. Under ADR-0026 §2 a G3 row that is present but
whose evidence does not validate is a gate failure, so writing the `🟡` row would have turned
`check:pipeline-gate` red and published a claim of review the repository itself refuses. No
tracker row was edited; all three units stay gate-checked under "Draft - expert review pending".

The `inputManifest()` diffs split the three into two different situations:

- **Units 3 and 4** - commit `08ac3ff1` inserted six raster illustrations into Unit 3's reviewed
  prose and four into Unit 4's, after each had returned a passing G3. The images are live to
  readers and no reviewer has seen them. Each needs a fresh G3 cycle over current bytes.
  Escalated as `G-2026-70`.
- **Unit 5** - zero content paths changed; the English bytes are byte-identical to what the
  reviewer read. The sole invalidating commit is `cac3204c`, the licence-track feature, which
  touched `catalog/courses.json` and three bound gate scripts. This is `D-2026-0017` recurring
  with a third trigger, escalated structurally as `G-2026-71`.

A, B, D, E and F all passed. D was re-verified independently rather than taken from the reports:
NPST Pakistan's ten standard names, three-part division and 2009 MoE/UNESCO/USAID origin confirmed
against ERIC-hosted secondary sources - which closes the largest of Unit 4's carried advisories -
plus exact Crossref matches for `taylor2023`, `keelson2024`, `furlich2016`, `skaalvik2020`,
`naparan2021`, `demirkasimoglu2010` and ERIC `ED521228` for `goe2008`. No fabrication of the
`D-2026-0014` class was found. All ten new illustrations were opened and inspected: no map, flag
or emblem, all plausibly Sindh, one advisory fidelity drift on `fig-U4-12`.

`D-2026-0046` records the refusal, grants Unit 5 one additional G3 cycle on the `D-2026-0017`
reasoning, and requires a fresh cycle for Units 3 and 4.

## Outcome

- ✅ Impact: three false publications prevented; two structural escalations opened; one
  long-standing Unit 4 source advisory closed by independent verification.
- 🧪 Tests: `npm run check:content` 13/13; `acceptProvisionalReport()` FAIL x3 (the finding);
  `inputManifest()` diffs recorded per unit.
- 📁 Files: `specs/decisions/log.md` (D-2026-0046), `specs/gaps.md` (G-2026-70, G-2026-71),
  `specs/content/efmp-302/tasks.md` (QC note), this PHR.
- 🔁 Next prompts: commission the three G3 cycles; decide the `manifestRoots()` scope question.
- 🧠 Reflection: the checklist's criterion C was the only one that failed, and it failed for a
  reason no amount of reading the content would have surfaced. Running the validator first, before
  any content work, would have reached the verdict in ten minutes instead of two hours - though
  the content checks are what make the verdict actionable rather than merely negative.

## Handoff (for CEO and agents)

- **Shipped / changed:** no content, no tier, no tracker row. Three governance records:
  `D-2026-0046` (the refusal and its full A-F record), `G-2026-70` (fifteen unreviewed
  illustrations inserted into three already-reviewed EFMP-302 units) and `G-2026-71` (a
  licence-track commit invalidating an unrelated course's review evidence; ADR-0027's narrowing
  is incomplete), plus a pointer note at the foot of `specs/content/efmp-302/tasks.md`.
- **Decisions the team must respect:**
  1. EFMP-302 Units 3, 4 and 5 stay **gate-checked**. Do not hand-author a `🟡` row for any of
     them; the gate will reject it and the claim would be false.
  2. Inserting a figure into a unit whose G3 has passed **re-opens that G3**. `08ac3ff1` did this
     to Units 2, 3 and 4 without anyone noticing, because no gate can see it.
  3. Unit 5 holds one granted additional G3 cycle (`D-2026-0046` item 2). Units 3 and 4 need a
     fresh cycle each, which is a new submission rather than a continuation of feature 023.
- **Pending / next owner:**
  - Three G3 cycles, CurriculumOwner to commission, reviewer must be independent of the authoring
    and repair sessions.
  - `manifestRoots()` binding scope: owner + [WebLeadAgy](/TEX/agents/weblead), Tier A, amends
    ADR-0027.
  - Two reader-facing gaps for [WebLeadAgy](/TEX/agents/weblead): `FeedbackWidget` is gated on
    `isTopicOrAssessment` (`src/theme/DocItem/Content.tsx:437`), so a unit's `index.mdx` - the
    page a search-engine visitor lands on - carries the disclaimer with no feedback route in
    either locale; and neither banner message tells readers they may report errors and omissions,
    which TEX-26 says is what the notice is for.
- **Paperclip issues affected:** TEX-27 (this), TEX-4 (roadmap Phase 0b does not complete),
  TEX-26 (its conditional delegation did not fire).

## Evaluation notes (flywheel)

- Failure modes observed: the task was written on the assumption that a recorded passing review
  implies validating evidence. It does not, and the gap between "the tracker says pass" and "the
  validator accepts it" is where this whole heartbeat lived.
- Graders run and results (PASS/FAIL): criterion A PASS, B PASS, C **FAIL x3**, D PASS, E PASS,
  F PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): have the roadmap's section 2a checklist put criterion
  C first and make it a hard stop, so a clearance run cannot spend its budget on content checks
  that a failing manifest has already made moot.
