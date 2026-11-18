# GICP-400 Unit 2 authoring handoff

Author: agent:codex, 2026-11-06. This is an authoring record, not an independent G3 report or certification.

## Scope and authority

- Approved Unit 2, Weeks 3–4, in `content-spec.md`; owner confirmation `D-2026-0078` resolves the older partial intake. Six guide leaves checked against `3rd 2026.txt:593-600`.
- Two English nine-part topics, an orientation index and a 10/10/5 assessment bank. No teacher-notes file: the guide gives no unit-specific teaching strategies or practical work.
- Urdu mirror and Urdu SVGs intentionally reserved for the separate translation job. All English `translation_status` fields remain `draft`.
- Four English schematic figures placed with generated dark variants. The current figure gate requires rendered output; the brief explicitly requires fixing scoped gate findings, so these SVGs were produced in this job. Original prompts and alt text are retained in the manifest. The optional banner remains prompt-only in its sidecar.
- No publication, deployment, G3/G5 completion, human initials or signing operation.

## Backward design

Topic 2.1 enduring understandings: educational preparation, political vision and constitutional leadership are distinct contributions; historical claims require context; equal citizenship concerns how a state treats its citizens. Evidence: retrieval questions 1–3, matching self-check statements and a comparison task that analyzes an anachronistic claim.

Topic 2.2 enduring understandings: League demands changed; an organisation, resolution, electoral mandate and law perform different roles; state creation required later decisions and left governing responsibilities. Evidence: retrieval questions 1–3, matching self-check statements and the replacement-handout analysis task.

| Sub-topic | Target Bloom | Explanation heading | Evidence |
|---|---|---|---|
| U2-01 | Understand / Analyze | Sir Syed Ahmad Khan: education and political preparation | Topic 2.1 check 1 and comparison task; MCQs 1, 4; RRQs 1, 5; ERQ 1 |
| U2-02 | Understand / Analyze | Allama Muhammad Iqbal: selfhood, community and self-government | Topic 2.1 check 2 and comparison task; MCQs 2, 3; RRQs 2, 3, 5; ERQs 1, 2 |
| U2-03 | Apply / Analyze | Quaid-e-Azam Muhammad Ali Jinnah: representation, statehood and citizenship | Topic 2.1 check 3 and comparison task; MCQ 5; RRQ 4; ERQs 1, 2 |
| U2-04 | Understand / Analyze | The All-India Muslim League: organisation and changing aims | Topic 2.2 check 1 and handout task; MCQs 6, 7; RRQs 6, 7; ERQ 3 |
| U2-05 | Apply / Analyze | Key events, 1906-1947: chronology and turning points | Topic 2.2 checks 2, 3 and handout task; MCQs 8, 9; RRQs 7, 8, 9; ERQs 3, 4 |
| U2-06 | Understand / Evaluate | Creation of Pakistan: decision, transfer and responsibilities | Topic 2.2 check 2 and handout task; MCQ 10; RRQ 10; ERQ 4 |

Assessment spread: MCQs 1–5 / 6–10 and RRQs 1–5 / 6–10 split equally across Topics 2.1 / 2.2. ERQs 1–2 assess Topic 2.1; 3–4 assess Topic 2.2; 5 integrates both. MCQs are worth 1 each, RRQs 4 each, ERQs 12 each if the whole bank is scored, total 110. This practice bank total is not a change to the course's 60/40 summative/formative weighting.

## Source cautions for reviewers

- Print Hamid Khan and Qureshi works were not claimed as consulted. Open scholarship and primary texts fill their relevant roles.
- The Al-Qamar publisher now lists a different DOI from the approved spec. The sources file records both and uses the verified publisher URL. Only the abstract was consulted; primary Iqbal texts ground detailed claims.
- AMU checks the school/college dates. Khan and Khan's article has visible date typos, which were not copied.
- Kamran's article is primarily about later elections; only its explicit opening statement about the restricted 1946 franchise is used.
- The Javid Iqbal PDF was retrieved, but its text extraction is image-only. The indexed pages supplying the resolution wording were read. Reviewers should check the original resolution for finer textual interpretation.
- National Assembly direct access was intermittent; official indexed text and parallel official PDFs supplied the ceremony/oath distinction. The unit does not confuse the 14 August commemoration with the Act's 15 August appointed day.
- Bound notes retain short excerpts with locators and access limits, not full copyrighted texts. Classroom scenarios and analogies are original teaching constructions, not research observations.

## Validation and pending work

The checkout started at the same commit as `origin/main` (`3464fcac89aaf5c285276244c1ff7727a0324d35`), with no earlier branch commits or edits. Its baseline `npm run check:content` passed all 14 gates. The first draft run identified required source notes, registry/date evidence, placed figures, G2 evidence and the ignored generated status refresh. Source notes, registry evidence, placed figures and the ignored status cache were repaired. The resulting full run passed 13 of 14 content gates; only G2 completion remains red. `scripts/lib/review-evidence.mjs:208` requires a course overview which does not exist. Adding it is outside the Unit 2 scope, so a proposed minimal overview is prepared under `.crew/` for the owner's scope decision. No evidence was fabricated or recorded as accepted.

Reading estimates use final visible body words at 190 words per minute, rounded up per file. Activities and response-writing time are additional. No prose was padded to meet the approved 40–55-minute total.

Next owners: independent G3 reviewer for academic quality; translator for Urdu prose, five authored concept labels and mirrored SVG labels; illustration producer for the planned banner; publication owner for release clearance. Do not infer any of those stages from deterministic G2 evidence.

The SVG geometry script imports Playwright/Chromium. The crew brief forbids Playwright, so it was not run. All four light figures were visually inspected with bounded-memory ImageMagick previews; that is a fallback visual inspection, not a substitute claim that the required browser geometry check passed. The figure/style gates and the MDX syntax compilation pass. No build, dev server or Playwright was run.

Final visible-word estimate: index 309 words / 2 minutes; Topic 2.1 2532 / 14; Topic 2.2 2813 / 15; assessment 2985 / 16. Total 47 minutes. Minor future caption edits may change these counts; recalculate after prose changes.
