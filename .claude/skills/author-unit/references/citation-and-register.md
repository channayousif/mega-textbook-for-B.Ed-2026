# Citation & register (author-unit)

## Citations

- **All prose is original.** Never reproduce a copyrighted textbook passage. A course guide's
  recommended readings are cited by reference only, never reproduced (Constitution Art. III.5,
  Spec 006 FR-010).
- **Quotations under 15 words** may be used and MUST carry a citation to the course guide, an
  HEC/government document, or a named academic source. Longer quotations: paraphrase instead.
- **Cite where you make a claim.** If a sentence asserts a fact, a definition, or a research
  finding, attribute it inline - e.g. "Hargreaves (2000) describes four 'ages' of teacher
  professionalism…". Keep a matching row in `sources/unit-NN.md`.
- **APA-ish reference form** for the `## Further reading` sections and the sources list:
  `Author, A. A. (Year). *Title* (edition). Publisher.` for books;
  `Author, A. A. (Year). Title of article. *Journal, Vol*(Issue), pages. https://doi.org/…`
  for articles. Include the DOI or a stable URL when one exists.
- **Per-topic `## Further reading` (Spec 008 per-topic layout).** There is no single unit-level
  further-reading list any more - each `topic-NN.mdx` ends with its own `## Further reading`
  (≥ 1 line) citing the subset of `sources/unit-NN.md` that topic draws on. The
  coverage↔sources mutual-consistency rule is unchanged: every key cited in any topic appears
  in `sources/unit-NN.md`, and every non-`no-external-source` key there is cited somewhere.
  A legacy five-file unit still uses the single `index.mdx` `## Further reading` block.
- **Never fabricate** a DOI, a page range, an author list, or a quotation. If you can't verify
  it, don't cite it - use a `no-external-source` row and escalate in `specs/gaps.md`.
- **Open-access substitutes** must be genuinely on-topic for the sub-topic they back. An
  off-topic-but-convenient source is rejected at the Content gate. Record its exact URL/DOI
  and mark `Kind: open-access-substitute`.

## Register (Constitution Art. III.1)

- **Audience:** a fresh HSC / intermediate graduate starting a B.Ed. Assume no prior
  education-theory vocabulary.
- **Depth of concept rises; complexity of language does not.** "Inquiry-based professionalism"
  is a deep idea explained in short plain sentences - not a licence for "epistemological
  reflexivity".
- Short sentences. Active voice. One idea per sentence where you can.
- Define a technical term the first time it appears, in plain words, then use it consistently.
  New-to-the-curriculum term → `glossary.json` entry + `<Glossary term="…">` tag.
- **No graduate-level jargon without a glossary entry.** Reaching for it to *signal* depth is
  a Content-gate failure.
- **No em dash** (U+2014, and U+2015 / U+2E3A / U+2E3B) anywhere in the content you emit, EN
  or UR (Constitution Art. III.9, style-guide v3.2). Restructure the sentence or use a spaced
  hyphen `" - "`. The en dash (U+2013) is for numeric ranges only. `check:no-em-dash` fails
  the build on any hit.

## Urdu-translation-friendly phrasing (helps the downstream G4/G5)

- Prefer short, self-contained sentences; avoid long subordinate-clause chains.
- Avoid English idioms and culturally-specific figures of speech ("hit the ground running",
  "a level playing field"). Say the literal thing.
- Keep parallel structure in lists - it survives translation better.
- Put the main clause first; trailing conditionals are hard to mirror in Urdu word order.
