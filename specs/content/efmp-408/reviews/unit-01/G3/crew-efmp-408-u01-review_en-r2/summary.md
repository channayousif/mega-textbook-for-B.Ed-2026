# EFMP-408 Unit 1 G3 English review (cycle 2)

Disposition: **escalate**. Advisory only; G3 stays open, unsigned, and no gate is marked done.

Reviewed inputs: `docs/semester-4/efmp-408/unit-01/` (6 files), `specs/content/efmp-408/` rows for
Unit 1, and `static/img/figures/efmp-408/unit-01/` (7 assets). Bundle prepared with
`node scripts/review-evidence.mjs prepare EFMP-408 1 G3` over a clean tree; 100 bound inputs, all
digests recomputed and matched (`logs/input-verification.txt`). Reviewed at HEAD
`7fb77de68f5d59bbc507e85c07a892a3cbf93eca`.

This is the second and final cycle. The r1 report
(`specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json`) returned `revise`;
the repair run `claude:crew-efmp-408-u01-repair_en` applied its content findings. Every r1 content
finding was re-checked against the current bytes.

## r1 findings: resolution

| r1 finding | Status | Evidence |
|---|---|---|
| Formative band breach (two Analyze items; 12 items vs approved 9) | Resolved | `topic-01.mdx:121-123`, `topic-02.mdx:105-107`, `topic-03.mdx:120-122` now carry 3 items each, all Remember/Understand/Apply. |
| RRQ 4 below the Understand floor | Resolved | `unit-assessment.mdx:106` is now `*(Understand)*`. |
| MCQ key never uses D | Resolved | `unit-assessment.mdx:152-161` keys A1/B3/C4/D2; MCQ 2 and 9 were re-optioned and re-solved. |
| NPSTP Standard 5 cited but not bound to Unit 1 | Resolved | `sources/unit-01.md:10`, `coverage/unit-01.md:11`; wording aligned to `npstp-2009.md:10`. |
| Scheerens declaration missing owner authorisation | Resolved | `sources/unit-01.md:15` cites `D-2026-0001`; the ruling is confirmed in `specs/decisions/log.md:1-21`. |
| Assessment definition wording | Resolved | `topic-01.mdx:41` matches `hec-2013-classroom-assessment.md:10`. |
| Appraisal definition and usage | Resolved | `topic-01.mdx:78` matches `hec-2013-testdev.md:11`. |
| Render-review unavailable | **Unresolved** | Deployed `7d1ba965530b409ac8e425d07bf86ec24930310d` differs from HEAD on four unit files. |

## Criteria

- **Authority: pass.** The approved content-spec (`status: approved`) and the 2026 guide
  (`4TH SEMESTER.txt:216-224`) allot Weeks 1-2 to the nine taught sub-topics U1-01..U1-09. The
  guide's required NPSTP Standard 5 is now bound to U1-02.
- **Sources: pass.** The bound HEC, Seifert & Sutton, NPSTP and declared-unverifiable Scheerens
  notes support the claims made; the two r1 definition advisories are closed.
- **Coverage: pass.** All nine sub-topics are taught under the mapped headings; `check:depth-gate`
  exit 0; `check:concept-graph` exit 0.
- **Assessment: pass.** All 10 MCQs independently solved and matched; the repaired MCQ 2 and 9 are
  unambiguous; RRQ 4 now meets the floor; the key distribution is balanced; the ERQ rubrics
  distinguish performance and demand Analyze-or-higher where required.
- **Accessibility: unverified.** `render-review` unavailable. Structural accessibility (heading
  order, descriptive link text, non-empty alt text, `role`/`aria-labelledby`/`<title>`/`<desc>` on
  the SVGs) and `measure-figure-text` exit 0 pass from source; the actual 360px, desktop and A4
  print views were not inspected.
- **Readability: pass.** HSC register held; terms defined at first use; worked examples show the
  distinctions rather than assert them.
- **Pedagogy: pass.** All three topic files carry the nine-part cycle; activities are feasible in
  the stated Pakistani classrooms; the three content-spec misconceptions are named and cleared.

## Findings

1. **Uncertain, unresolved: render-review unavailable.** The production build is not the reviewed
   input and no build, server or browser run is permitted, so 360px, desktop and A4 print
   inspection could not be performed. This blocks a pass.
2. **Advisory, unresolved: NPSTP note citation is incomplete.** `sources/unit-01.md:20` says notes 1
   and 3 bind the Unit 1 claims, but MCQ 4 also rests on note 4 and ERQ 5 on note 2. The claims
   themselves are supported.
3. **Advisory, unresolved: content-spec mapped readings omit `npstp-2009`.** `content-spec.md:100`
   still lists four readings while the unit now cites five. The spec is frozen, so the owner should
   record a ruling or update the spec.

## Disposition rationale

All content criteria pass and every r1 content finding is closed, but the required render and print
inspection cannot be performed because the deployed SHA is not the reviewed input and the brief
prohibits building or serving the site. A pass requires a successful `render-review` and a real
render artifact. Missing that evidence is an escalation, not a content revision. G3 and G5 stay
open; no signing, publication, registry change, prose repair or acceptance was performed.
