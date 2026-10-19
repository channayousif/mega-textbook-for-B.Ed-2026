# G4 translation continuation: EFMP-302 Unit 6

Translator: Codex. Date: 2026-10-18 (local). This is translation work, not an independent G5 review or certification.

Baseline: `609577ef07333a421c58ae7118db5dbc927d5402`, also `origin/main` at session start. The branch had no commits ahead of main and no uncommitted changes. English inputs were left unchanged. The earlier seven-page Urdu mirror and eight Urdu schematics were continued.

Changed Urdu files: `index.mdx`, `topic-01.mdx` through `topic-04.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`. All retain `translation_status: draft`. G4's existing tracker row remains in progress; no new completion row, initials or reviewer claim was added. G3 and G5 remain open.

Repairs include the missing district minimum-attendance requirement, Topic 6.1's reversed summary about examining practice, Topic 6.3's evidence-against calque and most-avoided comparison, Topic 6.4's harder-than-it-sounds comparison and does-not-have-to modal force, assessment summary's mixed-evidence qualifier, ERQ 4's full parent-relationship and subject-reading goals, ERQ 2's exclusive-choice rubric, and teacher notes' at-least-three-earlier-units requirement. Urdu sentence order and conspicuously broken wording were repaired across the mirror without changing the English questions or their demand.

All eight schematic page alts now use Urdu clause punctuation and equal their `.ur.svg` descriptions. Dark twins were derived with the repository tool, restricted to this unit. Visible SVG labels, shapes, geometry, IDs and raster assets were preserved. All five raster carriers continue to reuse the English WebPs with Urdu alt text.

Validation artifacts in this directory:

- `check-content-initial.log` and `check-content-main.log`: both pass 12 of 13 gates and fail only because ignored/generated `static/content-status.json` is missing. Main was checked in a detached temporary worktree using the same installed dependencies.
- `check-content-final.log`: final draft run matches main exactly: 12 of 13 gates pass, only the missing generated status artifact fails.
- `check-content-reviewed-probe.log`: both index files temporarily set to reviewed, then restored byte-for-byte in a finally block. File/heading parity, figure parity and terminology conform; pipeline reports only the intentionally open G4/G5 rows. The same missing generated status artifact also fails. No reviewed status remains.
- `parity.log`: seven matching file sets, metadata fields and heading vectors; identical imports and component counts; 13 matching figure carriers with matching IDs/kinds/dimensions; four preserved glossary keys; matching numbered-item sequences; 10/10/5 assessment bands, RRQ mark totals and MCQ letter mapping. Eight Urdu SVGs and their dark twins have exact page-alt/desc agreement and remain under 20 KB.
- `figure-geometry.log`: repository standalone Chromium text measurement passes all 16 Urdu SVG variants. This measures viewBox edges and wordmark collisions, not all enclosing-box geometry and not full pages.
- `terminology.md`: working set and proposed unbanked terms. The terminology bank and concept graph were not edited.

MCQs were read from the Urdu options during comparison: الف، د، ج، ب، ج، الف، د، ب، ج، الف. These agree with the unchanged English key and the Urdu key. This translator check is not an independent assessment review.

Pending owner/reviewer work:

1. Fresh full-page desktop, 360px and A4 inspection is pending. The crew brief explicitly prohibits builds and servers, so this session ran neither a build nor render-inspect and makes no current full-page-render claim. Historical screenshots are not evidence for these changed bytes. The existing fig-U6-2 enclosing-box overflow advisory remains unverified here; passing the simpler boundary check does not close it.
2. Owner term decision: inherited preservice wording تربیت سے پہلے کا مرحلہ is potentially misleading because the English stage includes initial teacher education. The proposal قبل از خدمت تربیت کا مرحلہ is recorded in terminology.md, not silently banked or substituted in the concept graph. Development's growth/professional sense split also remains for the owner. Existing G3 source/authority and G5 advisories remain open; no review cycles were launched.
3. English RRQ 4 and its model answer ask about a new-teacher transition freeing attention, while Topic 6.2 assigns freed attention to the experienced stage. This inherited baseline inconsistency is mirrored, not silently corrected in translation. English author/owner must resolve it before fresh bound G3/G5 review. Existing G3/G5 reports predate this translation and cannot certify it.

This was a continuation and repair pass; the original translation duration cannot be measured from the inherited checkout. No Paperclip issue was supplied. No push or PR is part of this job.

## Generated-status follow-up (2026-10-18)

Continued from abf24dd1 in response to the crew retry feedback. Ran `npm run build:content-status` to restore the ignored generated `static/content-status.json`, then `npm run check:content`: all 13 gates PASS, with no findings. Output is preserved in `check-content-regenerated-status.log`. The generated JSON remains ignored under the repository convention and is not committed. A fresh checkout must run `npm run build:content-status` before the content gate suite (the normal prebuild/prestart hooks also generate it). The earlier missing-file logs above remain historical evidence, superseded by this clean run.

Re-ran `check-parity.cjs`: all seven pages, frozen-bank key terms, assessment mapping and figure carriers PASS. No prose, figure assets, tracker status or publication state changed in this follow-up. Existing owner and independent-review handoffs above still apply.
