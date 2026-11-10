# Unit 10 English repair handoff

Report: `specs/content/gqur-301/reviews/unit-10/G3/20261102T212207Z-g3-desk-36d2970a.json`.

The only unresolved finding is blocking: actual browser rendering, 360px table scrolling
and A4 print clipping remain unverified. No prose or figure correction is requested.
The resolved bibliographic-only Haq (1984) advisory needs no change.

No content repair or rendered artifact was produced in this repair pass. The crew brief
prohibits builds, dev servers and Playwright on this production host. Deterministic
checks cannot replace the missing inspection. G3 remains open; the original report
and its unresolved finding are preserved unchanged. Urdu remains draft and unchanged.

## Next owner and evidence

The curriculum owner must arrange an authorised non-production review host. A fresh,
independent G3 reviewer must inspect the current frozen Unit 10 English inputs:
`docs/semester-2/gqur-301/unit-10/index.mdx`, `topic-01.mdx`, `topic-02.mdx`
and `unit-assessment.mdx`, including all four figures.

Follow `.claude/skills/review-unit/SKILL.md`, its G3 accessibility rubric and
`specs/014-agent-review-governance/contracts/review-evidence.md`:

- Prepare and retain the exact input manifest and reviewed commit.
- Inspect actual desktop and 360px renders, including access to every table column
  through the table's scroll container, plus A4 print views for clipping.
- Save actual PNG/WebP/JPG render evidence and command/inspection logs under this unit's
  reviews folder. Record viewport, print setup, artifact paths and SHA-256 hashes.
- Preserve this unresolved finding until that inspection supplies evidence; do not
  substitute a successful build, static source checks or a synthetic render log.
- Respect ADR-0019's independence and repair-cycle limits. Any further cycle beyond
  the limit needs recorded owner authorisation. Do not self-sign or mark G3/G5 done.

This handoff is an author repair record, not a new review or certification.

## Addendum, 2026-11-10 (crew gqur-301-u10-repair_en-r1)

The blocking render-review finding from
`G3/20261108T203238Z-g3-desk-29dbcc60.json` is now addressed with actual
rendered evidence. `scripts/render-inspect.mjs GQUR-301 10 --base
https://textbook.com.pk` ran against the live production host and exited 0 with
zero defects, producing 12 PNG/PDF artifacts and logs under
`renders-20261110T-prod/`. Desktop, 360px table scrolling and A4 print clipping
are verified for the published unit; no content repair was required. G3 remains
open and unticked pending a fresh independent review (ADR-0019).
