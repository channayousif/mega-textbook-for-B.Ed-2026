# Figure manifest - EFMP-302 Unit 1 (Understanding Teaching)

Per `specs/009-figure-rendering/contracts/figure-manifest-v2.md` (supersedes the Spec 008
`specs/008-rich-unit-pedagogy/contracts/figures-manifest.md` for this unit - its figures are
rendered). One row per figure carrier in the unit's `topic-*.mdx` files. `Topic` is the
`topic_label` of the file the carrier sits in. All four figures are `Kind: diagram`
(hand-authored self-contained SVG under `static/img/figures/efmp-302/unit-01/`) and
`Status: placed` - the `{/* FIGURE[…] */}` comment in each EN `topic-0N.mdx` has been replaced by
a `<Figure>` element, and the asset is committed. The UR mirror carries the same `<Figure>` ids
pointing at translated-label `.ur.svg` variants; the unit is `translation_status: draft`, so the
`.ur.svg` files are written and wired but not yet gate-enforced. The carrier-ID set and this
table's ID set must match both ways (`scripts/check-figures.mjs`).

| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |
|---|---|---|---|---|---|---|
| fig-U1-1 | 1.1 | diagram | clean flat vector comparison table, landscape, three labelled columns (government-school teacher, shopkeeper, doctor) by four rows (specialised knowledge, extended training and a qualification, a code of conduct, accountability to a professional community), each cell a tick or a cross, high contrast, no colour-only meaning | Table comparing a teacher, a shopkeeper and a doctor against the four features of a profession - the teacher and the doctor meet all four, the shopkeeper meets none. | /img/figures/efmp-302/unit-01/fig-U1-1.svg | placed |
| fig-U1-2 | 1.2 | diagram | two-panel split illustration, landscape; left panel labelled "industrial" shows rows of silent pupils copying from the board while the teacher reads from a fixed script; right panel labelled "inquiry" shows the same pupils in small groups with talk bubbles and the teacher kneeling beside one group with a notebook; clean flat vector, labelled, high contrast, no colour-only meaning | Two classroom scenes side by side - on the left, pupils in rows copying silently; on the right, the same pupils working in groups while the teacher listens and takes notes. | /img/figures/efmp-302/unit-01/fig-U1-2.svg | placed |
| fig-U1-3 | 1.3 | diagram | clean flat vector diagram, portrait; an upward triangle with the three vertices labelled "accountability", "autonomy", "collegiality" and a horizontal base bar beneath the whole triangle labelled "specialised knowledge and training"; a small caption "held in balance"; high contrast, labelled, no colour-only meaning | A triangle whose three corners are accountability, autonomy and collegiality, resting on a base labelled specialised knowledge and training - the caption reads "held in balance". | /img/figures/efmp-302/unit-01/fig-U1-3.svg | placed |
| fig-U1-4 | 1.4 | diagram | clean flat vector diagram, landscape; a central circle labelled "who am I becoming as a teacher?" with arrows pointing into it from six labelled boxes - "my own schooling", "family and community", "national policy and standards", "beliefs about how learning happens", "the pupils in front of me", "mentors and colleagues"; high contrast, labelled, no colour-only meaning | A central question, "who am I becoming as a teacher?", with arrows into it from six influences: my own schooling, family and community, national policy and standards, beliefs about learning, the pupils in front of me, and mentors and colleagues. | /img/figures/efmp-302/unit-01/fig-U1-4.svg | placed |
