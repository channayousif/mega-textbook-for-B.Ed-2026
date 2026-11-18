# EFMP-407 Unit 5 - Translation dependency blocker

Checked 2026-11-07 at English baseline `27ca177e6fea2da87b7ec2eebcca9bdbbcf6265d` (also origin/main). The checkout was clean and had no earlier branch commits.

G4 translation has not started. The mandatory translate-unit skill explicitly excludes English repairs and instructs the translator to stop if the English is wrong. The independent G3 report has disposition `revise`; its blocking finding F1 (the IUCN Pakistan 2004 citation and the glacier-grafting claim) and its formative-band finding F2 were repaired by the `efmp-407-u05-repair_en` job on 2026-11-10:

- `docs/semester-3/efmp-407/unit-05/topic-03.mdx` now sources glacier grafting to Munir et al. (2021), a peer-reviewed open-access source verified through Crossref, and the IUCN Pakistan (2004) row is declared under `## Unverifiable sources` per `D-2026-0001` (cited by reference only).
- The two per-topic `## Check your understanding` items tagged `*(Analyze)*` are reworded to the approved `Remember/Understand/Apply` band.
- The Karez crisis numbers and place names, the "concentric" wording, the Purvis et al. (2019) attribution and the missing peace-education definition were also repaired.

Resume translate-unit from its terminology working set against the new English baseline. All six English pages and six schematic Urdu variants remain to be translated. No proposed terminology was introduced. `translation_status` remains `draft`; no G4 completion or G3/G5 certification is claimed. No G4 tracker row was appended, as Step 7 of the invoked skill prohibits it. Build, server, browser and print inspection remain prohibited by the crew brief and must be performed in a later permitted job.

Validation: `npm run check:content` passed all 14 gates on 2026-11-07. The content baseline equalled origin/main at that check. These gates do not validate the disputed source or establish semantic translation quality; a fresh independent G3 review is required after the repairs.
