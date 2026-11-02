# Unit 2 translation blocked on English assessment repairs

Date: 2026-11-03. Worker: codex. Job: efmp-406-u02-translate.
English baseline: 1b7a8ae05553d30307ea7ee2151b8f4cb3d472e9 (also origin/main at inspection).
No earlier branch commits or working-tree changes were present.

## Required stop

The translate-unit skill explicitly excludes English repairs: "if the English is wrong, say so and stop, do not silently improve it in translation". The existing independent G3 findings remain reproducible in `docs/semester-3/efmp-406/unit-02/unit-assessment.mdx`:

- RRQ 2, line 103, requests an assumption and likely exclusion; the scheme at line 150 additionally awards a mark for a consequence or fairer wording.
- RRQ 3, line 104, requests a practical skill and judgement; the scheme at line 152 additionally awards a mark for an example or consequence.
- RRQ 9, line 110, requests two mode transfers; the scheme at line 164 additionally requires explanations of how the transfers address barriers.

See `specs/content/efmp-406/reviews/unit-02/G3/crew-review/findings.md`. Translating these unchanged would carry known assessment defects forward; correcting only Urdu would violate assessment equivalence. The English author owns repairs, followed by fresh independent review as required by the G3 handoff. Source, provenance and render evidence remain open in that report.

## Translation state and next owner

No Urdu files were authored. Translation status remains draft; no G4/G5 completion, tracker row or certification was added. Step 7 of translate-unit forbids appending a G4 row, despite the brief's assumption that the skill requires one. No terminology proposals arise because translation did not start.

After English repairs settle, a translator must read the remaining course/terminology inputs and resume the full skill from that new baseline. Builds, servers and Playwright were prohibited by the crew brief, so browser/print and SVG geometry evidence require an authorised later session.

## Validation

The required content gate run is recorded in `logs/check-content.txt`. The initial English inputs were exactly origin/main, so baseline findings apply equally to main. This handoff changes no content inputs or gate claims. A final gate run after documentation checks verifies the resulting tree.
