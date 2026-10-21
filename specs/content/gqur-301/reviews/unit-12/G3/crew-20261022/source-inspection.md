# Source inspection, 2026-10-22 local date

Primary source passages were retrieved and read using web and curl. Raw HTTP responses were hashed before removal; the observations below are paraphrases. Retrieved pages are supplementary reviewer evidence, not part of the prepared input bundle. They cannot silently support an accepted pass. The next author/host must bind relevant passages in a fresh bundle.

Lane, Introduction to Bivariate Data, https://onlinestatbook.com/2/describing_bivariate_data/intro.html : the learning objectives distinguish linear/nonlinear and positive/negative patterns. The spousal-age example explains why pairing must be preserved; the Galileo example illustrates a nonlinear curve. This supports paired observations, construction and the separate form descriptor. It does not support requiring variables to be of the same kind, as topic-01 says, or requiring explanatory/response roles for every association question. The committed sources/texts/lane2023.md contains only Chapters 1-2 material and does not bind this passage.

OpenStax, 12.2 Scatter Plots, https://openstax.org/books/introductory-statistics-2e/pages/12-2-scatter-plots : Example 12.5 plots child age and vocabulary size. Subsequent discussion judges closeness to a line or another function, and restricts its linear strength explanation to linear patterns. This supports plotting and interpretation but calls for qualifying topic-02's universal invisible-line definition of strength. A tightly curved cloud can have a strong nonlinear relationship.

OpenStax, 12.6 Outliers, https://openstax.org/books/introductory-statistics-2e/pages/12-6-outliers : the opening distinguishes large residuals from horizontal influential points and asks the reader to investigate errors versus informative cases. Example 12.12 recalculates results after a specified deletion. This supports investigation and sensitivity comparison, not a definite deletion effect without coordinates.

The failed Lane scatterplots URL and the failed OpenStax 12-2-the-regression-equation URL were reviewer guesses, not broken links in the candidate. Correct OpenStax section URLs above returned 200. No finding treats those failed guesses as a candidate defect.

Lock is declared bibliographic-only in sources/unit-12.md and supplies no reproduced passage; it is not failed solely because it is print-only. However the declaration does not use the rubric's Unverifiable sources section or list dated retrieval attempts. Reconcile that record before claiming all source evidence verified. NIST is mapped in the approved Unit 12 spec but absent from the unit's source record; a topical substitute can be permissible, so clarify the chosen mapping rather than infer a new authority decision.

Retrieval records (curl -L --max-time 30 -sS -w HTTP_STATUS):
lane-chapter.html: sha256 da1bb9492bf6f43013fbd845b5742b54e0f53603a25083d9a112e50131b8c1d8; HTTP_STATUS=404
lane-intro.html: sha256 7ddd1b235ec16b5f12cca03d838289efccf178a6335072664b2752ac2c267c44; HTTP_STATUS=200
openstax-outliers.html: sha256 ef32d6fd77e0e2973a3e99b6d71289cdbd5ba60e76f54201c3ee817001bd96b5; HTTP_STATUS=200
openstax-scatter.html: sha256 1de39bbcd4e3731e0dedc13af4489255418119df4a13e38edcd516c873260caf; HTTP_STATUS=200
openstax.html: sha256 a21c03d92fc1989fb514ff5258c0c23c306f61f4314cb467e3b68681a3aaa337; HTTP_STATUS=404
