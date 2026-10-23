# Source and authority inspection

Inspected 2026-10-23 through the web tool. External pages are supplementary observations only: they were not in the parent bundle and cannot silently create accepted evidence. No parent bundle was supplied; a clean local 87-path manifest was prepared and recomputed.

## Bound support

- Guide: Scheme-and-Course-guides/extracted-text/2nd 2026.txt:511-513 explicitly names Chapter 13 and sections 13.1 Correlation (Types & Coefficient) and 13.2 Regression Analysis (Linear Regression).
- content-spec.md Unit 13 assigns U13-01/02 to Topic 13.1 and U13-03 to Topic 13.2, matching both topic explanations.
- coverage/unit-13.md maps these named explanations, but the reinforcement mapping is inaccurate: RRQ4 is regression only, not U13-02 correlation computation; RRQ7 is interpolation/extrapolation, not coefficient computation; MCQ7 is residual computation and MCQ10 causal inference, not coefficient calculation. ERQ1 does compute r correctly.
- tasks.md Unit13 G1 remains open. intake-3/evaluation.md approves the superseded six-unit structure. D-2026-0070 requires guide-based 16-unit structure and advises fresh intake; it does not certify this unit.
- The only source-text file in the generated manifest is sources/texts/lane2023.md, which covers Chapters 1/2, not the cited Chapters 4/14. The read OpenStax and NIST local excerpts concern earlier units and are outside this manifest. No relevant full source passages were supplied by the host.
- sources/unit-13.md records an HTTP/title recheck, which cannot establish passage-level support. Its Lock bibliographic-only paragraph lacks the rubric's explicit Unverifiable sources heading, dated attempts and complete declaration; it also says the prose references the course text, whereas neither topic does. Resolve the record honestly with the owner.

## Supplementary primary-source checks

Lane, Values of the Pearson Correlation:
https://onlinestatbook.com/2/describing_bivariate_data/pearson.html
The definition and range paragraphs distinguish sample r from population rho and restrict the summary to linear relationships. They support the unit's linear-only explanation. This inspected page does not establish the exact .30/.70 classification attributed to Lane in Topic13.1; that attribution remains unverified, not proven false.

Lane, Introduction to Linear Regression:
https://onlinestatbook.com/2/regression/intro.html
Computing the Regression Line gives b = r*sY/sX and intercept from means. This supports the least-squares computations but contradicts treating an unstandardised slope as necessarily near zero whenever r is near zero. Its Standardized Variables discussion distinguishes the special case where slope equals r. The residual definition and minimisation discussion agree with the unit.

NIST, 4.1.4.1 Linear Least Squares Regression:
https://www.itl.nist.gov/div898/handbook/pmd/section1/pmd141.htm
The parameter-estimation discussion minimises squared model deviations, supporting the unit's explanation of least squares. It does not establish blanket prediction reliability or statistical confidence from sample r alone.

OpenStax, Introductory Statistics 2e, 12.3 The Regression Equation:
https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation
The opening describes regression predictions as rough and the predicted/observed-value discussion distinguishes y-hat from y. These support the prediction/residual explanations while requiring caution with the topic's blanket reliability wording.

## Independently checkable objections

Topic13.2, What the regression line does not do, says near-zero r implies near-zero slope. Rescaling y changes slope arbitrarily while preserving r. Example x=[-1,0,1], y=[999000,-2000000,1001000] has mean y=0, slope=1000 and r about .00057735. Predictions are [-1000,0,1000]. Exact zero correlation does imply zero slope for nonconstant x, but the approximate claim needs standardisation or relative-scale qualification. The following mean character is a dotless j (ȷ), not y-bar.

Topic13.1, What the sign and size of r tell a teacher, turns a large sample r into confidence that a link exists without sample-size, selection or uncertainty conditions. With two nonconstant paired observations |r| is always 1, so magnitude alone cannot establish population confidence. Near-zero r also does not require literally no straight-line association. Topic13.2 calls interpolation generally reliable without model-fit, population or uncertainty qualifications. Repair these overclaims in a separate author session.

The .30 and .70 range endpoints overlap between rows. Specify nonoverlapping endpoints and contextual status of any classroom convention, and bind a passage that supports any retained attribution.
