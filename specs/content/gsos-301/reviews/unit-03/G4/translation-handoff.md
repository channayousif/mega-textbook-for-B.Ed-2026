# GSOS-301 Unit 3 G4 translation handoff

Date: 2026-10-25. Worker: Claude (translate-unit skill). Branch: crew/gsos-301-u03-translate-r1.
English baseline: `27261f59` (origin/main at start; English Unit 3 files unchanged since `099a6c2d`).

## What was translated

All five Urdu files under `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/`:
`index.mdx` (with UR `key_terms`), `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx` (10/10/5 bank,
option letters الف/ب/ج/د, translated bounded answers heading as the final `##` section), `unit-teacher-notes.mdx`.
Heading level vectors, numbered-item counts, option counts, table rows, checklist items, imports and
components (4 `<Figure>`, `<PrintHandout>`, `<TranslationStatusBadge>`) match the English per file. Locked
front-matter keys are byte-identical. Each `<Figure>` points at its `.ur.svg` with a fully translated alt.

The four `.ur.svg` files had a shorter Urdu `<title>`/`<desc>` than the carrier alt, which `check:figures`
rejects under `reviewed`. Their `<title>` and `<desc>` now carry the full Urdu alt; dark variants were
regenerated with `npm run figures:variants` (`--check` clean). No visible label was changed.

## Known English defects carried over faithfully (not fixed in translation)

The English was translated as it stands, per the skill's rule never to silently improve it. The
existing G3 escalation findings remain in both languages and must be repaired in English first,
then mirrored:

- MCQ 3 (and its key), topic 3.1 village example and teacher notes treat conflicting demands of two
  statuses (daughter-in-law vs teacher) as role strain; standard usage (Macionis; OpenStax) calls this
  role conflict. The Urdu says کردار کا تناؤ wherever the English says role strain.
- RRQ 3 marking guidance defines conflict as no longer bound by shared rules.
- RRQs 1 and 2 remain Remember tasks.

When the English is repaired, re-translate only the changed passages; every other passage is final
draft quality. A later English edit invalidates any G5 run on this draft.

## Terminology

Bank terms used: Verbal Communication زبانی ابلاغ, Non-verbal Communication غیر زبانی ابلاغ, Socialization
معاشرتی بندی (all three in `key_terms`; the `reviewed` flip probe raised no terminology finding).
Concept-graph labels used as is: مقام، کردار، کردار کا تناؤ، معاشرتی گروہ، ابتدائی گروہ، ثانوی گروہ، تنظیم،
بوروکریسی، تعاون، مقابلہ، تصادم، معاشرتی تعامل.

Proposed terms for the owner (not in the bank; not added to it):
- Social structure: معاشرتی ڈھانچہ
- Ascribed / achieved status: منسوب / حاصل کردہ مقام
- Exchange / coercion / conformity: تبادلہ / جبر / مطابقت
- Hierarchy of authority: اختیار کی درجہ بندی; impersonality: غیر شخصی پن
- Role exit: کردار سے دستبرداری; status inconsistency: مقام کا عدم توازن; group conflict: گروہی تصادم
- Communication: ابلاغ in prose. The concept graph labels CON:GSOS-301-3-13 as معاشرے میں مواصلات; the
  prose and heading use معاشرے میں ابلاغ to match the banked زبانی/غیر زبانی ابلاغ. Owner should align the label.
- Norm: سماجی معیار (as in Unit 2 Urdu).

## Not verified

No build, server or browser ran (the crew brief forbids them), so rendered Urdu at desktop, 360px and A4
print has not been inspected; `render-inspect.mjs --locale ur` must run on a permitted host before G5.

## Status

`translation_status` stays `draft` on both `index.mdx` files (G5 has not happened). The G4 tracker row stays
▢ with an updated note; no G3/G5 claim is made. Independent G5 review is required.

## Gates

Temporary `reviewed` flip on both index files: only the expected G4/G5 not-done rows and the derived
content-status staleness remained. Reverted and verified. At `draft`: `npm run check:content` 13/13 pass.

## Earlier blocked handoff (2026-10-24, Codex), kept for history

## GSOS-301 Unit 3 G4 blocked handoff

Date: 2026-10-24. Worker: Codex. Branch: crew/gsos-301-u03-translate.
English baseline: `d064fe72144f24a544de194cda53f8632ffc98d2`, equal to origin/main. Initial working tree and branch-only log were empty.

### Required stop

The translate-unit skill says: "if the English is wrong, say so and stop, do not silently improve it in translation". The existing G2 row meets the minimum prerequisite but cannot override this stop rule.

Confirmed in the current English assessment: MCQ 3 (lines 44-48) describes conflicting daughter-in-law and teacher demands, omits role conflict from its options, and incorrectly keys role strain at line 138. Topic 3.1 line 36 and teacher notes lines 25-29 repeat this conflation. RRQ 3 marking guidance at line 153 incorrectly defines conflict by abandonment of shared rules. RRQs 1 and 2 remain Remember tasks. These are unresolved findings from the existing G3 escalation, not translation choices.

Full repair set: `../G3/crew-review-20261023/summary.md`, `independent-assessment.md`, and `source-inspection.md`. The four figure manifest rows also remain prompt-only with absent assets.

### Ownership and resumption

A separate English author owns G3 repairs and freezing a corrected baseline. The curriculum owner owns any approved-spec correction. Visual production requires corrected figure briefs. The review host owns provenance and permitted rendered evidence for fresh independent review.

After repair, resume translate-unit, assemble the frozen terminology working set and translate all five files against the new English commit. No Urdu prose or figure files were created; no new terms are proposed. Translation status remains draft, G4 remains not-started with a blocker on its existing row, and G3/G5 are unchanged. No certification is claimed. No temporary reviewed parity probe is appropriate without a mirror.

The brief forbids build, server and Playwright, so a permitted host must inspect Urdu desktop, narrow and A4 rendering after translation exists.

### Validation

`main-content.log` records a separate detached origin/main run; `content.log` records the final branch run. Both pass all 13 content gates after refreshing the generated content-status report for the tracker change. The intermediate run reported only that derived-report staleness; `npm run build:content-status` resolved it. No new finding is introduced. `git diff --check` passes. No build, server or browser ran.
