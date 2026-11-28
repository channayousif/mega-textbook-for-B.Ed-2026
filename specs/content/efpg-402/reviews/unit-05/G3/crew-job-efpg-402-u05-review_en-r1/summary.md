# EFPG-402 Unit 5 Independent G3 English Review Summary (cycle 2, final)

**Reviewed commit:** `b2dc2715255b31026bf257e58e451ecbf983d001` (deployed SHA `b2dc2715255b31026bf257e58e451ecbf983d001`, equal to HEAD)
**Stage:** G3 English review
**Reviewer:** `agent:claude_crew` (Claude Code, model identity LongCat-2.5), run `crew-job:efpg-402-u05-review_en-r1`
**Author run:** `crew-job:efpg-402-u05-author`. This session did not draft, translate or illustrate the unit.
**Disposition:** revise (advisory only)

This is the second and last repair-and-review cycle for this unit (ADR-0019). It supersedes
`specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en.json`.

## Cycle-1 findings re-checked against the current bytes

| Cycle-1 finding | Status in cycle 2 |
|---|---|
| Blocking: `topic-04.mdx:68` misstated Rowe ("speculative guessing drops") | **Resolved.** The sentence now reads "failures to respond decrease, speculative (tentative, "maybe") responses increase", which matches the bound excerpt (`sources/texts/rowe-1974-waittime.md:14-21`) item for item. |
| Blocking: `sources/unit-05.md:16` overstated its grounding | **Resolved.** The declaration now says several claims rest on the three unread books alone and names U5-01, U5-02, U5-03/U5-05, U5-07 and U5-08, which is exactly what `coverage/unit-05.md` maps. |
| Uncertain: render tool exits 1 on the WebP figures | **Unchanged, carried.** All 10 defects are `fig-U5-12..16` `<id>.svg` URLs that 404 by construction because those figures are `.webp`. Direct HTTP checks return 200 for all five WebPs and the rendered pages show them; the ten schematic SVGs, all seven pages at three viewports and the A4 print view are clean. |
| Advisory: `fig-U5-4` alt text listed rows not in the figure | **Resolved.** Alt text, `<desc>` and the manifest row now say five rows: theory, teacher role, student role, lesson sequence, timing of explanation. |
| Advisory: MCQ key A 0, B 4, C 6, D 0 (predictable position) | **Resolved.** Key is now A 2, B 2, C 2, D 4; every option is used. |
| Advisory: ERQ 4 rubric named an "atmospheric pressure lesson" the prompt never sets | **Resolved.** The criterion now reads "rebuilds the teacher's explanations in the recorded lessons". |
| Advisory: bare-URL link text in three Further reading lists | **Resolved.** All three now carry descriptive link text. |
| Advisory: "cognitive dissonance" undefined | **Resolved.** Defined inline at `topic-01.mdx:65`. |
| Advisory: `fig-U5-7` alt text omitted the metacognitive row | **Resolved.** Alt text, `<desc>` and manifest now name the metacognitive (reflective) row. |
| Advisory: pupils invited to "taste small safe samples" | **Resolved.** Replaced with a teacher demonstration and the explicit note "nothing on the trays is ever tasted". |

## What holds

The unit covers all eight approved Lesson Planning leaves (guide section 5, `4TH SEMESTER.txt:772-778`;
content-spec U5-01 to U5-08) in five topic files, each with a Sindh classroom situation, an explanation, a
worked example, a collaborative activity, a retrieval check, a summary, a self-assessment checklist, a
practicum task and a summative task with an Analyze-or-higher mini-rubric. The 5E model (Topic 5.2) and
Rowe's wait-time (Topic 5.4) are grounded in committed bound excerpts and read accurately. The assessment
meets the 10/10/5 blueprint with the required Create-level 5E lesson-plan item (ERQ 2). I solved all ten
MCQs before opening the answers section (A, B, D, C, A, D, B, A, D, C) and agree with the key on all ten.

Deterministic checks: all six mandatory checks, `check:content` (14 gates), `check:concept-graph`,
`check:bloom-bands` and `measure-figure-text` pass at exit 0. `npm run check:content` was also run on a
clean `origin/main` worktree and reports the same all-pass result, so this branch introduces no finding
that main does not also report.

Rendered evidence: production inspection at the deployed SHA (equal to the reviewed HEAD) on
`https://textbook.com.pk`, all seven pages at desktop 1280x900, narrow 360x780 and A4 print 794px. No
broken, unserved or alt-less images, no heading-level jumps, no document horizontal overflow; every wide
content table scrolls with `tabindex="0"` and an aria-label; no clipped figures or elements in print. All
20 schematic SVG variants are clean on text geometry.

## Remaining findings

Both content findings from cycle 1 are closed. Two findings remain, and neither is a content defect:

- **Uncertain (carried, not a content defect):** the `render-review` command exits 1 solely on the ten
  `<id>.svg` URLs for the five WebP illustrations, which 404 by construction. The images themselves are
  served and render. This is the second cycle reporting the same tool limitation, and it is why the
  disposition is `revise` rather than `pass`: the review contract requires `render-review` at exit 0 for
  a pass, so a mandatory command that cannot exit 0 on this unit's figure mix blocks a clean pass.
  Fixing it means correcting `scripts/render-inspect.mjs` section D to build its geometry URL from the
  figure's actual extension (or skip raster illustrations), which is a repository tooling change outside
  this unit's content scope and outside a reviewer's write authority.
- **Advisory:** the MCQ key is A 2, B 2, C 2, D 4. All four options are used, so the predictability
  concern is closed; D is modal at 4 of 10, which is ordinary MCQ practice.

No blocking content finding remains. Every cycle-1 blocking and advisory finding was verified resolved
against the current bytes, and the unit is content-complete at G3 standard apart from the render-tool
exit code.

## Process notes

The production site was eligible for inspection because
`git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- docs/semester-4/efpg-402/unit-05/ static/img/figures/efpg-402/unit-05/`
exited 0. No local build, dev server or Playwright e2e run was performed. The report is advisory: it does
not certify G3, sign evidence, mark a tracker row done, or authorise publication. Per the acceptance
boundary, certification needs a trusted detached signature and a registered qualified reviewer.
