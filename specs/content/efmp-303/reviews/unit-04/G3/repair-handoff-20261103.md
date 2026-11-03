# Unit 4 G3 repair handoff

Report addressed: `20261102T212207Z-g3-desk-a0d82ff4.json` (revise).

- Topic 4.2, EN and UR: removed the unverified historical GDP percentages and NEP 2009 attribution. The paragraph now introduces a hypothetical budget shortfall, retaining its existing textbook and school examples. No source verification is claimed.
- Topic 4.1, EN and UR: replaced the Coombs-attributed cycle claim with a general explanation of using monitoring data and evaluation findings in the next plan. No source verification is claimed.
- Concept `CON:EFMP-303-4-3`: removed the duplicated English word. Retained `SLO:EFMP-303-4-1`: the approved content spec assigns monitoring and evaluation to this SLO and challenges in implementation to SLO 4-2. Topic 4.1 front matter also binds only SLO 4-1. Adding SLO 4-2 would contradict this mapping. The Urdu label already means M&E process and needs no change.
- Render-review remains unresolved. The crew brief forbids builds, dev servers and Playwright. An independent reviewer on a permitted host must inspect the current unit on a small screen and in A4 print, including figure clipping. This repair pass supplies no rendered evidence or certification.

G3 stays unticked. All translation statuses remain draft. The original report is unchanged; the appended tracker row records repairs only. No stale passage or missing translation was encountered.

Validation: baseline matched `origin/main` at `6af89204762cf2504247cf237ee5d9228a244fe2` and all 13 content gates passed. The post-edit run exposed stale G2 evidence and the tracker-derived content-status cache. Fresh Unit 4 G2 evidence was generated using `scripts/prepare-gate-evidence.mjs EFMP-303 4`, with all eight draft gates passing. The tracker G2 reference was refreshed without changing its status. Unit tests passed: 28 files, 347 tests.

Final `npm run check:content`: 12/13 pass. Only `check:content-status` fails because `static/content-status.json` is stale after the required tracker changes. That tracked generated file is outside the brief scope; an owner scope exception was requested before regenerating or committing it. No cache or publication-state edits were made.
