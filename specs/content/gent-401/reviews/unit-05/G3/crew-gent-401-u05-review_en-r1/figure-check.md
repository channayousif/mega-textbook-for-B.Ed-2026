# GENT-401 Unit 5 - figure source inspection (G3)

Source inspection only (render-review unavailable, see `logs/render-review.txt`).
`measure-figure-text` passes for fig-U5-1 to fig-U5-4 (`logs/measure-figure-text.txt`), and the
visible SVG text of each figure matches its alt text and the prose. The figure that fails is
fig-U5-1, on its plotted values, not its text.

## fig-U5-1 break-even chart: lines not drawn to the chart's own scale

Axis scale read from the gridlines and tick labels in `static/img/figures/gent-401/unit-05/fig-U5-1.svg`:
x = 90 + 31.5 x pupils (0 at 90, 20 at 720); y = 460 - 0.00875 x rupees (0 at 460, 20,000 at 285,
40,000 at 110).

| Element | Should be (from the stated figures) | Drawn | Value the drawn line shows |
|---|---|---|---|
| Fixed-cost line | y = 285 (Rs 20,000) | y = 270 | about Rs 21,700, visibly above the 20,000 gridline |
| Total-cost line | (90,285) to (720,215): Rs 20,000 to Rs 28,000 at 20 pupils | (90,270) to (720,194) | about Rs 21,700 to Rs 30,400 |
| Revenue line | (90,460) to (720,110): Rs 40,000 at 20 pupils | (90,460) to (720,80) | about Rs 43,400 at 20 pupils, above the top gridline |
| Break-even dot and dashes | (483.75, 241.25): 12.5 pupils, Rs 25,000 | (484, 222) | 12.5 pupils, about Rs 27,200 |

The crossing is at the right x (12.5 pupils), but a learner reading the y-axis gets wrong rupee
values for all three lines and for the break-even revenue. The same geometry is in
`fig-U5-1.dark.svg`, `fig-U5-1.ur.svg` and `fig-U5-1.ur.dark.svg`.

Related wording: the alt text, the SVG `<desc>` and topic-01.mdx:71 say the lines "cross at 13
pupils". Mathematically they cross at 12.5 pupils; 13 is the smallest whole number of pupils that
covers costs (as topic-01.mdx:69 correctly says). The manifest prompt
(`specs/content/gent-401/figures/unit-05.md`, fig-U5-1 row) says "cross at 13 pupils and 25,000
rupees", which are not a point on either line (at 13 pupils revenue is Rs 26,000 and total cost
Rs 25,200).

Repair request (F2): redraw the three lines and the break-even marker at the coordinates in the
"Should be" column in all four variants; word the label, alt and desc as "the lines cross at 12.5
pupils (Rs 25,000), so 13 pupils are needed to break even", or keep "Break-even: 13 pupils" as the
label and say the crossing lies between 12 and 13 pupils. Re-run measure-figure-text afterwards.

## Other figures

- fig-U5-2: every value matches the topic-01.mdx:44-51 table and the :87 worked example.
- fig-U5-3: the branches match its alt text and topic-02.mdx:58. Advisory A5: reward
  crowdfunding gives up no ownership (topic-02.mdx:62), but the chart reaches crowdfunding only
  through "willing to give up part ownership? yes"; the start node "How much money is needed?"
  has no branch on amount although the figure plan names amount (content-spec.md:296).
- fig-U5-4: rows match topic-02.mdx:36-64 and the comparison table at :44-48.
- fig-U5-5 (banner, `index.mdx:20`): the committed WebP file was viewed directly (not in a
  browser). It matches its alt text (young man writing in a notebook at a table with a calculator
  and worksheets, chalkboard behind, a woman holding a ledger at the door) and shows plausible
  Sindhi dress and street setting; no text to read. Its rendering on the page is unverified
  because it is newer than the deployment.
