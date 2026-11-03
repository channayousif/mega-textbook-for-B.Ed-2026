# Unit 6 English repair handoff

Author repair record for `20261102T212207Z-g3-desk-d7dcc6df.json`, not an independent
review or certification. English changes are mirrored in the existing draft Urdu files.
G3/G5 and translation status remain open/draft. No licence copy of Unit 6 exists.

| Finding | Action and current limit |
|---|---|
| S1 coverage groundings | Seven required coverage rows and their reinforcement rows now say `no-external-source`; the sources Supports cells agree. Topic 6.2's new/experienced stages, Topic 6.3's route comparisons and Topic 6.4's plan explicitly distinguish teaching frameworks from verified book findings. These gaps remain under the existing G-2026-64 escalation; no unread reading is promoted to verified grounding. |
| S2 unsupported attributions | Topic 6.1 discloses that the Guskey and Villegas-Reimers attributions are uncorroborated against unavailable texts. The source register declares the level of support. This uses D-2026-0001's disclosure route, rather than accepting reputation as evidence. |
| S3 bound source text | Still uncertain. No source text was obtained in this job. The register explicitly distinguishes the earlier review's abstract/record verification from full-text support and excludes suarez2022 as evidence for Unit 6. Day and Brookfield attributions also now disclose their limits at point of use. Owner/source-access follow-up remains necessary. |
| S4 publication format | Villegas-Reimers is described as an electronic UNESCO publication, with the reviewing host's documented HTTP 403 blocker and historical attempt dates. No new retrieval is claimed. |
| X1 repeated region names | Outside unit scope. `src/theme/DocItem/Content.tsx:233` overwrites table/figure names with generic labels, including on resize, so content attributes cannot repair it. Platform owner must fix the shared component. |
| X2 dashed-box overflow | Already repaired in baseline cfc41817: the four quoted labels in fig-U6-2 are split over two lines inside their dashed boxes in both English theme variants. No SVG rewrite made. |
| X3 desktop text size | Unit-local `figure-readability.css`, imported by all four topics in both locales, removes schematic downscaling on screen and lets the existing keyboard-accessible figure regions scroll at intrinsic width. Eight schematic IDs only; print rules remain in force. Desktop labels therefore retain authored sizes instead of scaling to roughly 7.5px. No browser measurement is claimed. |
| P3 missing misconception | Topic 6.3 now names the belief that development depends entirely on system provision, counters it with colleague-led inquiry, and retains the school's duty to provide support. |
| P4 identity thread | Topic 6.4's closing recap links developing teacher identity to Units 1 and 3 and continuing reflection as responsibilities change. |
| P5 reviewer register | Topic 6.1's Kwakman disclosure and Topic 6.3's Hennessy scope/abstract disclosure now address students directly, while retaining evidence limits. |
| P6 reflection assessment | RRQ 8 retains online-development coverage and adds an evidence-versus-feelings explanation of reflective practice, with two explicit marks (7 total). CON-6-12's RRQ-08 mapping is now substantive; CON-6-10 also links RRQ-08. The 10/10/5 bank and topic allocation stay intact. |
| New conference observation | ERQ 3 explicitly requires conferences in its comparison; its strong comparison criterion weighs exposure for an isolated rural teacher against cost per teacher. |
| New RRQ 4 wording | The stem now explicitly means the transition out of the new teacher stage; Urdu names entry into the experienced stage. |
| New transition-label observation | Already repaired in baseline cfc41817: fig-U6-3's transition lines are at y=54/76, above stage boxes beginning at y=100, in both English theme variants. No SVG rewrite made. |

## Validation and follow-up

The unmodified starting commit equals origin/main (`cfc41817f4da5373f350b120cc7b79dea3437429`):
all 13 content gates passed there. The first post-edit run passed 12 gates and found only
Unit 6's stale G2 manifest, expected after changing bound inputs. Unit tests passed:
28 files, 347 tests. G2 evidence is regenerated after committing the repaired content,
then content gates are rerun to verify no additional findings relative to origin/main.

The crew brief forbids builds, dev servers and Playwright, so full-page desktop/mobile/print
inspection and browser text geometry were not run. Existing SVG repairs were inspected in
source bytes; no SVG text changed. A fresh independent G3/G5 review must assess these repairs
and remaining uncertainty under the owner's review-cycle authorisation. No extra review cycle
is consumed or authorised by this author record.
