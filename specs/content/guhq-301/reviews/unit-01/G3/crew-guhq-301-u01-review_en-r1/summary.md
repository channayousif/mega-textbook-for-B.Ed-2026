# GUHQ-301 Unit 1 - independent G3 English review, run 1 (advisory)

Disposition: **escalate**. Reviewer: `agent:claude-crew` (fresh crew session, model LongCat-2.5).
Author run: `crew:crew-guhq-301-u01-author` (authoring commit `856b9437e`; the banner figure was
placed later by `c0ca97892`). Reviewed HEAD `d103b2448`. Rendered input: deployed SHA
`d103b2448df417cf34c30c95c362e103d962b2fc`, identical to HEAD for the unit's English directory and
figure folder, so the CI-built production site is the reviewed input. Report:
`specs/content/guhq-301/reviews/unit-01/G3/crew-guhq-301-u01-review_en-r1.json`. Advisory only: no
signature, no certification, G3 stays open, no tracker row edited.

## Criteria

| Criterion | Status | Basis |
|---|---|---|
| authority | pass | Guide Unit 01 Weeks 1-2 leaves (importance, characteristics, Classical vs Quranic; 1.4-1.6) map to content-spec U1-01..U1-06 and to named `###` sections in `topic-01.mdx` / `topic-02.mdx`; `D-2026-0080` approved the spec as drafted; the catalog entry `GUHQ-301` is present |
| sources | pass | Four bound sources re-retrieved and read (Quran.com API, Leeds corpus dictionary, Yazar-Batur full text, arXiv abstract); every cited verse, root count and quotation checked; the Urdu letter-merger claim is declared, not sourced (A2) |
| coverage | pass | All six leaves taught under their mapped headings; coverage matrix, concept graph and sources mutually consistent; reading-minutes 40 within the 25-40 band; two figures per topic |
| assessment | pass | 10/10/5 bank, bands Remember-to-Apply / Understand-to-Analyze / Analyze-to-Evaluate-Create; all 10 MCQ keys reproduced independently, RRQ/ERQ solved before reading the key; blueprint spreads met |
| accessibility | pass | Production render inspected at 1280x900, 360x780 and A4 print: heading order monotonic, alt text on every figure, `desc` equals carrier `alt`, tables scroll with `tabindex`/`aria-label`, no document overflow, no print clipping, SVG geometry clean; the two render-inspect flags are lazy-load false positives (U1) |
| readability | pass | HSC register held; technical terms defined at first use; Sindh classroom contexts; no em dash |
| pedagogy | pass | Nine-part cycles in both topics, classroom hook, worked example, misconception corrections, feasible group activities, retrieval, reflection, practicum task |

## Findings

- **U1 (uncertain).** `scripts/render-inspect.mjs` records `exit_code=1` for this unit. Its desktop
  pass reads `img.naturalWidth` without scrolling, so `fig-U1-1` (offset 4781px) and `fig-U1-4`
  (offset 4408px) sit below Chromium's lazy-load threshold and are reported as `visible image did
  not load`, even though `notServed=0` (every distinct `src` returns HTTP 200) and a follow-up scroll
  check loads both (`natural` 265x150 and 300x139). The rendered evidence itself is clean. This is a
  tooling gap, not a content defect. Repair request: add a scroll pass before the desktop
  `naturalWidth` measurement, or accept `notServed=0` plus served-byte identity as load evidence.
  Because the contract requires a successful `render-review` for a pass, the disposition cannot be
  `pass` until the tool is fixed or the owner rules otherwise.
- **A1 (advisory).** MCQ key is B6 / C4 with no item keyed A or D (`unit-assessment.mdx:106-117`).
  This matches the course pattern (Unit 4 B7/C3, Unit 6 B9/A1) but a candidate who always picks B
  scores 6 of 10.
- **A2 (advisory).** `specs/content/guhq-301/sources/unit-01.md:16-18` declares the Urdu
  letter-merger claim in prose under `## Claims without a bound source`, not as a `no-external-source`
  table row (`specs/content/style-guide.md:293`). The declaration is honest and does not overstate.
- **A3 (advisory).** ERQ 3 (`unit-assessment.mdx:100`) repeats the Topic 1.2 Summative task
  (`topic-02.mdx:156-174`) with the same six-word list and the same three sub-questions.
- **A4 (advisory).** Further-reading links use bare URLs as anchor text (`topic-01.mdx:155-157`,
  `topic-02.mdx:178-180`); render-inspect reports this as an advisory on every page.

## What was verified independently

- Every verse the unit quotes or cites was fetched from the Quran.com API (Uthmani text plus
  Saheeh International) and compared word by word: 1:1-2, 1:5, 2:2, 2:10, 2:20, 2:25, 2:32, 2:153,
  2:156, 2:157, 2:183, 2:282, 2:286, 4:26, 12:2, 15:21, 18:18, 18:24, 69:41, 96:1-5, 103:3,
  112:1-4. Surah 9 `bismillah_pre` is false. The Uthmani spelling of 2:153 (`ٱلصَّلَوٰة`) is as the
  unit describes.
- Corpus counts read from the live dictionary pages: ʿ-l-m 854 (ʿalīm 163, ʿilm 105, ʿallama 41,
  ʿālim 18, maʿlūm 11, muʿallam 1, ʿālamīn 73), k-t-b 319 (kataba 49, kitāb 260, kātib 6, maktūb 1),
  r-ḥ-m 339 (raḥmat 114, raḥīm 116).
- Yazar and Batur (2025), MDPI `religions-16-01186.pdf`, read in full: the ruins (`al-At.lāl`)
  contrast, the shared vocabulary and the descriptive-versus-metaphysical transformation are all
  present, supporting U1-02 and U1-03.
- Abdelfattah, Khalil and Abbas (2025), arXiv:2509.00094 abstract: tajwid as rigorous rules precise
  enough for automatic assessment, with `ṣifāt` encoded per phoneme, supporting U1-04.

## Limitations

See `limitations.md`. The report is advisory; acceptance needs a trusted detached signature and a
qualified registry entry, neither of which exists for an agent run.
