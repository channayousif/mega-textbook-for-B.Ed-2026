# GQUR-300 Unit 1 Urdu translation handoff

- Translator: Codex. This is a translation record, not independent review or certification.
- English baseline: `30d8def78ac53fcd2ba001f2361559f71a3fad2d`, also `origin/main` at the start of this job. The checkout was clean and `git log origin/main..HEAD` was empty. No English content changed.
- Refreshed the existing complete six-file mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` beneath the Urdu unit directory resolved by `resolveUnit('.', 'GQUR-300', 1)`.
- Preserved metadata identifiers, reading minutes, heading levels/order, components, glossary lookup keys, numerical quantities, assessment order and marks. Translated all Bloom tags and MCQ option letters, with matching keys. The final answers section remains bounded at the end of the assessment.
- Corrected literal calques and grammar, restored the table-following position of the Gula and Lovric explanation, retained source-retrieval qualifications, and preserved the failure-rate wording in both workbook tasks.
- Updated localized figure labels for `fig-U1-3`, `fig-U1-4` and `fig-U1-6`. Kept all six existing RTL layouts and IDs, synchronized descriptions with page alt text, shortened the compatible-number example without changing its quantities, and raised the final table-row labels to clear the borders. Regenerated dark variants through the repository tool. English briefs, manifests and SVGs were preserved.

## Terminology for the owner

The frozen bank has no entries for the seven core glossary terms below. Their existing Urdu forms remain proposals, not newly approved vocabulary. The glossary definitions and concept-label working set were consulted. The bank was not edited.

| Proposed English term | Existing Urdu form retained |
|---|---|
| Quantitative reasoning | مقداری استدلال |
| Numeracy | عددیت |
| Number sense | عددی شعور |
| Estimation | تخمینہ |
| Approximation | تقریب |
| Logical reasoning | منطقی استدلال |
| Problem-solving strategy | مسائل حل کرنے کی حکمت عملی |

Additional strategy vocabulary needing owner/G5 attention: quantitative literacy / مقداری خواندگی; grouping / گروہ بندی; rounding / گول کرنا; front-end digits / ابتدائی ہندسے; compatible numbers / آسان اعداد; order-of-magnitude / مقدار کا عمومی پیمانہ; deduction / استنباط; elimination / حذف; look back / نظرِ ثانی. The twelve authored concept labels already flagged in `concepts/unit-01.md` remain proposals as well. The new plain wording for front-end digits and order-of-magnitude replaces misleading literal renderings consistently across this unit's prose and figures; it does not amend the concept graph or the bank.

The index `key_terms` declares only bank-approved vocabulary actually used in this unit: Assessment, Rubric, Self-Assessment and National Professional Standards for Teachers. Core unbanked proposals are recorded above rather than falsely declared bank-conformant. These proposals need an owner decision before a future reviewed-state vocabulary declaration can include them.

## Checks and limits

- The initial `npm run check:content` ran on the unmodified checkout at exactly `origin/main`. Twelve gates passed; only `check:content-status` failed because the generated, ignored `static/content-status.json` was missing. `npm run build:content-status` repaired that local prerequisite. It was refreshed again after the tracker handoff note changed the report inputs.
- Final draft-state `npm run check:content`: all 13 gates passed. There are no new findings relative to `origin/main`.
- A temporary, exception-safe change of both indexes to `reviewed` activated file, heading, figure and terminology checks. All passed except the expected pipeline findings that G4 and G5 are not done. Both indexes were restored byte-for-byte to `draft`; the generated content status was refreshed afterward. See `temporary-reviewed.log`.
- Additional direct parity checks passed for all six file sets, metadata, heading vectors, component counts, glossary keys, Bloom sequences and numeric values. The bank is exactly 10/10/5. MCQ options retain their ordering; the Urdu-only answer check gives ج، الف، ب، د، ج، الف، ب، د، ج، الف, matching the English key. RRQ marks and ERQ rubric weights remain unchanged. See `parity.log`.
- `npm run figures:variants:check` passed. Changed SVGs remain below the 20 KB budget. The repository figure geometry check found no overflow or wordmark collision across the six Urdu sources. A further browser check with the local Nastaliq font loaded found no text outside any viewBox, including the left/top edges.
- No full Docusaurus build or dev server was run, as the crew brief prohibits them. An isolated file-based preview compiled the current MDX with the real Figure, Glossary, PrintHandout and TranslationStatusBadge components, source CSS, the existing built theme stylesheet and the local Nastaliq font. Only Docusaurus context was stubbed to the Urdu draft state. All six pages were rendered at desktop, 360px and A4 print-media widths. No page overflow or broken image was detected. The 18 measurements are in `isolated-render-metrics.json`; screenshots were visually sampled for shaping, punctuation, numerals, reading order and figure labels. This checks content rendering, not routing, hydration or print pagination in the complete site. Temporary screenshots stayed outside Git.
- Dense figure tables remain small on phones, as the prior advisory review also observed. A future full-site desktop/narrow/A4 inspection remains necessary for G5, especially for table legibility and MCQ option wrapping.

## Timing

About 9 minutes elapsed from this worker invocation through preparation of the handoff, measured from the running Codex process. This was a repair of an existing complete mirror, not a fresh-translation throughput probe; full-site rendering and independent review are excluded.

## Next owner and status

`translation_status` remains `draft` everywhere because no accepted independent G5 review has occurred. G3 and G5 remain outstanding. The skill's Step 7 says not to append a G4 completion row; the existing G4 row has only a handoff note, with its status and empty initials preserved. No gate was self-certified.

The curriculum owner owns vocabulary rulings and the current English G3 dependency. After that dependency is settled, a fresh independent G5 session should compare the whole mirror and inspect the actual built site. Historical advisory reports were not altered or represented as acceptance. No Paperclip issue was supplied or modified.

## Continuation: evidence freshness repair (2026-10-18)

The initial translation handoff and test logs were committed under `specs/content/gqur-300/translations/unit-01/`. The input manifest scoper binds unit-named course directories outside `/reviews/`, so adding that directory made Unit 1's recorded G2 input manifest stale. Relocated the handoff and log files under `specs/content/gqur-300/reviews/unit-01/G4/`, the excluded lifecycle-record path, matching the repository precedent established in GICT-300 Unit 3. Updated `tasks.md` to reference `reviews/unit-01/G4/handoff.md`. Unit 1's G2 input manifest now matches its recorded evidence manifest exactly, passing `check:pipeline-gate` without modifying G2 evidence.
