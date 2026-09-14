# Business and strategy documents

Strategy, positioning and commercial material for textbook.com.pk. **Not curriculum
authority documents**, and deliberately not stored with them.

## Why this directory exists

`Scheme-and-Course-guides/` holds the official B.Ed scheme and the HEC course guides, which
Constitution Art. II makes the authority every unit traces to. That directory is also a **bound
input to every G3 and G5 review**: `scripts/lib/review-evidence.mjs` walks it into the input
manifest, and it currently supplies 31 of the 129 digests in an EFMP-301 Unit 1 G5 manifest.

A file placed there is therefore bound to every certification produced afterwards, and editing it
invalidates outstanding review evidence. That is correct for a course guide, whose content a review
genuinely depends on. It is wrong for a brand strategy, which no content review has any reason to
depend on.

It also has a sharper consequence, found on 2026-09-14: `review:evidence prepare` refuses to run
over a dirty tree, and it counts an untracked file under a bound root as dirty. One uncommitted PDF
sitting in `Scheme-and-Course-guides/` blocked evidence preparation for **every unit in the
repository**, with an error naming the file but not the reason.

Nothing under `specs/business/` is a bound review input.

## Contents

- `textbook-com-pk-brand-strategy.pdf` - brand and business strategy for textbook.com.pk. Informed
  the Phase 5 roadmap revision and the licence-tier positioning recorded in `SDD/ROADMAP.md`.
