# EFMP-407 Unit 5 - Translation dependency blocker

Checked 2026-11-07 at English baseline `27ca177e6fea2da87b7ec2eebcca9bdbbcf6265d` (also origin/main). The checkout was clean and had no earlier branch commits.

G4 translation has not started. The mandatory translate-unit skill explicitly excludes English repairs and instructs the translator to stop if the English is wrong. The existing independent G3 report has disposition `revise`, with unresolved blocking finding F1. The current English still contains that defect:

- `docs/semester-3/efmp-407/unit-05/topic-03.mdx:76` describes glacier grafting and line 77 attributes its sustainability claim to IUCN Pakistan (2004).
- The reference at line 168 and `specs/content/efmp-407/sources/unit-05.md:14` still use `2004-099.pdf`, identified by the reviewer as an unrelated Tanzania report.
- Evidence: `specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/summary.md:108`, with retrieval details in its sibling `source-verification.md`.

The English author must repair the source or record the required unverifiable-source disclosure under the existing decision procedure, then resolve reviewer finding F2 concerning the formative Bloom band before fresh English review. This translation job does not change English claims or repeat a review.

After repair, resume translate-unit from its terminology working set against the new English baseline. All six English pages and six schematic Urdu variants remain to be translated. No proposed terminology was introduced. `translation_status` remains `draft`; no G4 completion or G3/G5 certification is claimed. No G4 tracker row was appended, as Step 7 of the invoked skill prohibits it. Build, server, browser and print inspection remain prohibited by the crew brief and must be performed in a later permitted job.

Validation: `npm run check:content` passed all 14 gates on 2026-11-07. The content baseline equals origin/main, so there are no additional content findings. These gates do not validate the disputed source or establish semantic translation quality.
