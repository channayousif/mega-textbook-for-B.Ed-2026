# EFPC-411 Unit 1 - figure metadata vs rendered figure (G3)

Source inspection of `specs/content/efpc-411/figures/unit-01.md` against the committed SVGs
(2026-11-27). `check:figures` and `measure-figure-text` exit 0; the mismatches below are between
the manifest prompt/alt text and the figure's actual content, which the gates do not compare.

| Figure | Manifest prompt / alt says | Rendered SVG actually shows | Match |
|---|---|---|---|
| fig-U1-1 | prompt: "on purpose, who observes, instruments used, and what follows"; alt: "across purpose, observer, tools, and outcomes" | columns: Model, Primary Purpose, Who Observes, Typical Outcome (no tools/instruments column) | no |
| fig-U1-3 | prompt: "with two guiding inquiry questions branch-linked under each area"; content-spec Figure plan: "with two questions an observer asks under each" | three questions under each of the five areas | no |
| fig-U1-6 | prompt: "six authentic classroom moments"; alt: "across six classroom scenarios" | four rows (Lesson Start, Exposition, Questioning, Group Activity) | no |
| fig-U1-8 | prompt: "linking five authentic classroom observation findings" | four rows (Math Manipulatives, Question Wait-Time, Chalkboard Work, Transition Routine) | no |

The figures themselves are pedagogically sound and consistent with the prose; the defect is the
manifest prompt/alt (and, for fig-U1-3, the content-spec Figure plan) overstating or misstating
what the figure contains. The alt text is what a screen-reader user hears, so the fig-U1-1 and
fig-U1-6 alt texts are the material ones. Repair: align the manifest prompt/alt (and the
content-spec plan for fig-U1-3) with the figure, or add the missing column/rows/questions.

All eight SVGs carry a `<desc>` equal to the page `alt`; `measure-figure-text` exits 0 on all 16
EN variants. The banner `fig-U1-9.webp` has the same alt in `unit-01.banner.md` and `index.mdx`.
