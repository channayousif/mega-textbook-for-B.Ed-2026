# G3 English review - GICT-300 Unit 4 (Cyber security and Data Protection) - run 002

- **Report**: `specs/content/gict-300/reviews/unit-04/G3/agent-g3-gict300-u4-run002.json` (validated, exit 0)
- **Reviewer**: `agent:g3-reviewer`, run `agent-g3-gict300-u4-run002`, model LongCat-2.0
- **Author run**: `commit:a7200d2` (the G3 run-001 repair session; no PHR was recorded for it, matching the G5 run-001 convention for the same bytes)
- **Reviewed state**: worktree HEAD `e12079a` (branch `020-author-gict-300`); all 101 manifest digests recomputed with `inputManifest()` at review start AND again at review end - zero mismatches; skill digest matches
- **Disposition**: **revise** - 2 blocking findings, 8 advisory findings; supersedes run 001 (bound to pre-repair bytes), which the G5 run-001 escalation asked to be redone over the current bytes
- **Criteria**: authority pass, sources **fail**, coverage pass, assessment **fail**, accessibility pass, readability pass, pedagogy pass

## Run-001 findings: verified against the current bytes

- **F1 (RRQ distribution) RESOLVED.** RRQs now map 3/2/3/2 across topics 4.1-4.4 (new 4.2 traces item, new 4.3 cloud item, new 4.4 four-questions and classification items); MCQs 3/2/3/2; ERQs one per topic plus an integrative item. The >= 2 per topic blueprint holds for both banks.
- **F2 (I Love You citation) RESOLVED, and the repair was legitimate.** The prose now says "hit roughly 50,000 computers (Bourgeois et al., 2019)" and the a7200d2 repair also edited the bound excerpt to add those words. Because editing a source record is exactly what a reviewer must check, I fetched chapter 6 of the live second edition at opentextbook.site during this review: it reads "An estimated 50,000 computers were affected". The excerpt correction matches the real source; the citation is supported.
- **F3 (sources mapping overstatements) RESOLVED.** The bourgeois2019 Supports cell now claims only U4-01/U4-02/U4-04; the coverage reinforcement rows for U4-03/U4-06 no longer cite it.
- **F4 (unused source and false preamble) PARTIALLY RESOLVED.** erendorYildirim2022 is now cited in body prose (the 517-student survey claim matches the bound abstract). But the rewritten preamble still overclaims - see blocking finding B2.
- **F5 (MCQ answer-position skew) RESOLVED.** Key positions are now 2a/2b/3c/3d.
- Resolved advisories: A6 (new RRQ-10 model is clean), A10 (PECA 2016 now covered by the ncsp2021 declaration), A13 (G2 evidence refreshed; I verified its manifest is identical, 101/101 digests), A14 (handoff label matches the bound digests this time).

## Blocking findings (repair required)

1. **B2 (sources) - the preamble still claims more than the bytes deliver.** `sources/unit-04.md` lines 3-6 say "the registry-verified keys and the guide-required keys are also cited in prose". The registry-verified half is true; the guide-required half is not: laudonLaudon (`topic-02.mdx` 136-137) and stairReynolds (`topic-04.mdx` 137-138) appear only inside Further reading, both self-described as "cited at bibliographic level". This is the unfixed half of run-001 F4. Repair: restrict the prose-citation claim to the registry-verified keys.
2. **B1 (assessment) - "twelve characters" for an 11-character password.** `Pk!9#mQ2vLx` has 11 characters (P k ! 9 # m Q 2 v L x), but "twelve characters" is stated in the MCQ-3 rationale (`unit-assessment.mdx` 147), the RRQ-6 model answer (175-177), the rendered table text of `fig-U4-6.svg` + `fig-U4-6.dark.svg`, and the figure manifest prompt row. The miscount also hides that the exemplar falls one short of the unit's own cited guidance (Bourgeois: "at least 12 random characters", `topic-03.mdx` 38-41). Repair: correct to eleven, or better, extend the exemplar to 12+ characters so it embodies the cited rule - in both rationales, both English SVGs, the manifest row, and the paired Urdu mirror (`fig-U4-6.ur.svg` already carries the same miscount).

## Advisory findings (unresolved)

A1 Concept-graph mappings stale after the redistribution: RRQ-03 under CIA triad (`concepts/unit-04.md` line 20) and RRQ-08 under Authentication factors (line 26) do not match those items' content. A2 The spec's figure plan (lines 322-324) still describes fig-U4-7 as the cloud diagram for 4.3 while the delivered figure is the pupil-record diagram in 4.4 and U4-05 has no visual - note that a7200d2's commit message claims this line was aligned, but the spec was last touched at 708d85c; the claimed repair never happened. A3 Reading list assigns stairReynolds to units 1, 2, 6 while Unit 4 maps it to U4-06. A4 Eleven bare-URL link texts in Further reading. A5 The integrative ERQ-5 is an evaluation essay; the spec's "integrative item producing a data-protection plan" is delivered as the topic-4.4 ERQ-4. A6 Tooling: the ADR-0027 camelCase regex gap leaves nistCloud2011.md and erendorYildirim2022.md unbound; I verified both at HEAD (hashes in the report). A7 The erendorYildirim2022 Supports cell says "education measurably matters"; the abstract recommends education rather than measuring its effect (learner prose stays within the abstract). A8 Environment, out of scope: five of six contract gates exit 1 at HEAD solely on the stale geng-300 tree (details below).

## Deterministic gates (real exit codes, logs in `logs-agent-g3-gict300-u4-run002/`)

At true HEAD `e12079a`: validate:content 1, check:depth-gate 1, check:figures 1, check:no-em-dash 1, check:no-answer-keys 1 - **every failure is in the stale GENG-300 tree** (13 front-matter errors in `docs/semester-1/geng-300/unit-01`; 4 depth and 1 figures failure for GENG-300 Unit 1; 9 em dashes in `specs/content/geng-300/intake/evaluation.md`, unchanged since a3077f7; 2 answer-key pattern matches in geng-300 build pages). Zero GICT-300 findings in any gate. check:docs-sync 0, check:concept-graph 0, check:bloom-bands 0, build 0.

Because the handoff attributes the geng-300 red gates to another course and the parent's own G2 evidence used a CONTENT_ROOT overlay, I re-ran the five failing gates over a disclosed overlay (`/tmp/g3-run002-overlay`: the repo bytes minus the geng-300 course, with every GICT-300 bound input verified byte-identical to this review's manifest by diff): all five exit 0. Both the full-HEAD and overlay logs are in the evidence manifest. The parent should land the sibling branch's geng-300 repairs or keep using the overlay method.

## Rendered inspection

Fresh `npm run build` (exit 0), then `node scripts/render-inspect.mjs GICT-300 4` (chromium 149.0.7827.0 over `docusaurus serve`, 127.0.0.1:4599). The first attempt crashed when the spawned serve process died mid-run (log retained); attempt 2 ran against a manually started server and completed with exit 0, defects 0: heading order clean on all 7 pages at 1280x900; all 8 figures served with descriptive alt text; 0px document overflow at 360x780 with every figure fitting; 0 clipped elements at A4 794px with all print figures fitting and the Answers section rendering; all 16 light/dark SVG variants pass text-geometry checks. I directly inspected `desktop-topic-03.png`, `narrow360-topic-03.png` and `desktop-unit-assessment.png`; 14 PNGs and 7 print PDFs are hashed in the evidence manifest.

## Assessment independence

I solved all 25 items before opening the Answers section. My MCQ key (b, d, c, a, c, d, b, a, c, d) matches the supplied key 10/10; RRQ model answers and ERQ rubrics are substantively correct, each ERQ rubric totals 10, and Bloom bands sit within the spec. The only defect found in the bank is B1's miscount.

## Process notes

- The handoff's claim that a7200d2 "aligned the content-spec fig-U4-7 plan line" is not borne out by the bytes: the spec was not modified in that commit. Run-001 A8 therefore remains open (advisory A2 above). The commit message also says "advisory, run 001" while applying the five blocking repairs; the parent should treat commit-message repair claims as unverified until a fresh review confirms them.
- Urdu parity criteria do not apply at this stage; the unit is `translation_status: draft` and G4/G5 are later gates. The Urdu mirror's parallel update is out of G3 scope, except that B1's fix must be mirrored there.
- This report is advisory. It does not certify the unit, mark any gate done, or authorize publication; per ADR-0019 the tracker transition and any acceptance remain with the parent and the trusted host.
