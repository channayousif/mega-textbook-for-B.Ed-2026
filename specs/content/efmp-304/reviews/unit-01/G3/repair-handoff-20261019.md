# Unit 1 G3 repair handoff

This is an author repair record, not independent review or certification. It addresses
`agent-g3-efmp-304-u1-run5e4cc29c.json`; the original report remains unchanged.

- XML syntax: removed the reported malformed `</text>` closing tag and three more of the
  same defect in `fig-U1-3.svg`, then regenerated its dark variant. All 40 Unit 1 SVGs
  parse with Python ElementTree. Both Figure 3 variants decode as images in Chromium
  with nonzero natural dimensions (249 by 150).
- Wordmark overflow: the `text` CSS selector overrode the presentation attribute in
  figures 1, 4, 5, 7 and 10. Added `.wm{text-anchor:end}` to those English sources and
  regenerated dark variants. Browser geometry checks pass for all 12 affected SVGs.
- RRQ distribution: replaced RRQ 9's Topic 1.3 source-authority item with a Topic 1.1
  distinction between critical thinking and general scepticism. Updated the two-mark
  model answer and mirrored question, Bloom tag and answer into Urdu. Added RRQ-09 to
  the matching concept row. RRQ allocation is now Topic 1.1: 1/9; 1.2: 4/8; 1.3: 2/5;
  1.4: 3/7; 1.5: 6/10. The bank remains 10 MCQs, 10 RRQs and 5 ERQs.
- Manifest: changed the stale prompt-only preamble to placed; table rows are unchanged.
- Link accessibility: the existing article titles now link to the existing DOI destinations
  in topics 2 and 3, in English and Urdu. No passages were skipped or left untranslated.

Validation: `npm run check:content` passes all 13 gates after refreshing Unit 1 G2 evidence
and the ignored generated content-status file. `scripts/heavy.sh npm test` passes 314 tests
in 26 files. Unit-scoped `figures:variants:check` passes for all 20 light sources.
`git diff --check` passes. No site build or server was started.

The initial content run failed because the repaired inputs invalidated G2 and the generated
status file was missing. G2 was regenerated using `prepare-gate-evidence.mjs EFMP-304 1`
against commit `c109d734`; the tracker now references `20261019T121920528Z-gates.json`.
Refreshing the status file after the tracker update resolves its subsequent stale-file failure.

Fresh independent G3 and dependent G5 remain pending with the curriculum owner. G3 stays
unticked, with the requested advisory repair row. All translation statuses remain draft.
The browser geometry helper additionally reports a cosmetic border/wordmark intersection in
Figure 3 (88.3 by 4.5 px) in both themes; it is non-failing and is outside the reported
text-overflow defects. The next rendered inspection should check the footer's appearance.
