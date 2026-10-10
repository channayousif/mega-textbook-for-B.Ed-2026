# GQUR-301 intake evaluation (G0 / G1)

- **Evaluator:** agent:evaluator (fresh session; did not draft the spec, which was drafted by the
  Paperclip BilingualAuthor agent)
- **Date:** 2026-10-10
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (digest `77ff2fa9...de5ff2`, bound)
- **Worktree:** `wt-tex-41`, detached at `2fd037b20b2c17bb4334e5655c61f7cd2ed9457c`
- **Decision:** `D-2026-0049` (pending-owner-review), appended to `specs/decisions/log.md`
- **Escalations:** `G-2026-82`, `G-2026-83` (open), appended to `specs/gaps.md`. `G-2026-84` to
  `G-2026-86` unused.

## Manifest verification

`manifest.json` was recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
same `intakeRoots('gqur-301')` set that `scripts/prepare-intake-evidence.mjs` uses:

- 65 of 65 input paths present, 0 digest mismatches, 0 extra, 0 missing
- `manifest_digest` reproduced: `3dfe0d37ddf4b9c86599a2699445647cc2bcd33aa266fe7788deac6b8141434a`
- `registers`: `specs/decisions/log.md` and `specs/gaps.md` both matched at read time
- the worktree was clean before any write

## Bound guide

`Scheme-and-Course-guides/extracted-text/2nd 2026.txt:365-580` (University of Sindh, GQUR-301).
The guide gives a 16-chapter outline, one chapter per week, with **no units**. It gives three
course outcomes (`:394-401`) and seven readings (`:551-580`).

## Criterion verdicts

| Criterion | Verdict | Disposition | Key locators |
|---|---|---|---|
| identity | **pass** | approved in D-2026-0049 | guide `:371,375,380,381`; revised Scheme Sem II row 1 `GQUR-301 3(3-0)`; catalog Sem 2 `3 (3-0)` |
| partition | **unverified as to substance** (structural properties pass) | **escalated, G-2026-82** | guide `:405-527` week-mapped chapters, no units; spec `:34-37`, `:107-117` |
| coverage | **fail** | drafter repair | U2-05/07/08 false guide refs `content-spec.md:261,263,264`; week-schedule omissions `:112-117`; locator `:66` |
| outcomes | **pass on trace direction; CLO 3 tools component undelivered** | **escalated, G-2026-83** | guide `:399-401`; CLO 3 refs `:399,482,558`; "verbatim" claim `:41` |
| readings | **fail** (guide list itself present and resolvable) | drafter repair | `:87,88,90,98,100` |
| blueprint | **pass** | approved in D-2026-0049 | `style-guide.md:227-230`; per-unit blueprint lines |
| structure | **fail** | drafter repair | Topic cells `:339,341,342,424,582,584,585`; Unit 5 figures `:510-513` |
| decision-residue | **pass, none found** | approved in D-2026-0049 | sweep of all confirmed entries against the whole spec |

### identity - pass

Code, title and credit hours agree across the guide, the revised board Scheme (final authority)
and `catalog/courses.json`. The guide's bare "3" and the Scheme's `3(3-0)` do not conflict. The
`B.Ed (4-Year) 2025-2` document's "GQUR:401 ... Semester IV" is not the Scheme of record; the
owner's 2026-09-10 designation settles precedence. No Article II.3 question.

### partition - escalated (G-2026-82)

Proposed partition recorded: Ch 1-2 / 3-5 / 6-8 / 9-11 / 12-13 / 14-16 to Units 1-6 (2/3/3/3/2/3).
Verified: contiguous, no chapter split, none reordered, each placed once, week ranges equal the
guide's chapter-to-week mapping. The unit count and the boundaries are not guide-determined
(notably dispersion joined to counting in Unit 3, and Chapter 16's course integration folded into
Unit 6). Owner confirmation needed, as in G-2026-22 and G-2026-52.

### coverage - fail

43 guide leaf sub-topics; 46 checklist rows (6.2, 10.1 and 13.1 split into two each). Every guide
sub-topic appears exactly once in substance, and nothing is added. Defects:

1. Unit 2 guide refs: U2-05 "4.1" should be 4.2 (`guide :463`); U2-07 "5.1" should be 5.2
   (`:467`); U2-08 "5.1" should be 5.3 (`:468`). The drafter appears to have written the topic
   label into the Guide ref column here (the reverse of the Unit 3/4/6 structure defect below).
2. `## Week schedule` sub-topic column omits 8.3, 11.2, 16.2 and 16.3.
3. Description locator `2nd 2026.txt:385-389` should be `:383-388`.

### outcomes - escalated (G-2026-83)

Unit CLO refs: U1-U3 cite 1, 2; U4-U6 cite 1, 2, 3. All trace to the guide; no addition. But no
guide chapter or teaching strategy names a computational tool, and no unit plans one, so CLO 3's
"through appropriate computational tools" is asserted rather than delivered. This is the
EFMP-302 CLO 4 condition (G-2026-10 / D-2026-0011). Minor: `:41` says "verbatim" while outcome 3
drops "It is an".

### readings - fail

Guide side: all seven entries resolve to real works (Mann; Babones, misprinted "Baboons"; Zaslow;
Chatfield; Lock et al.; Chaudhry & Kamal; Haq 1984, the last cited in the HEC 2008 Statistics
curriculum). Spec side defects:

| Row | Spec says | Found (external, 2026-10-10) |
|---|---|---|
| `baboons` `:87` | unresolvable, "absent from major catalogs" | Babones, S. J. (Ed.), *Applied Statistical Modeling*, 4 vols, SAGE 2013, ISBN 9781446208397 |
| `zaslow` `:88` | unresolvable | Zaslow, E., Cambridge University Press 2020, ISBN 9781108419413 / 9781108410908 |
| `lock2008` `:90` | 2008, ISBN 9780471764003 | 1st ed. Wiley 2012, ISBN 9780470601877; the given ISBN resolves to nothing found |
| `siegfried2020` `:98` | Siegfried, T. (2020), ASA, open access, "verified 2026-10-09" | *Seeing Statistics* is Gary McClelland's commercial web-book (c. 1999) in every record found; URL returned an empty response this run |
| `openstax-stats` `:100` | 2020 | Illowsky & Dean, 2e, publication date Dec 13, 2023 |

`siegfried2020` is the serious one: an attribution and a verification claim that the record does
not support, mapped to Units 1 and 2, which are already authored. Whether the guide misprint
"Baboons" may be resolved to Babones is, in this evaluator's reading, a within-guide slip (exact
title, single catalogue match) rather than an owner question, but readings is not approved here,
so that is left for the re-evaluation to record.

### blueprint - pass

10/10/5 in every unit, Bloom bands within `style-guide.md:227-230`. Per-topic floor of 2 MCQ and 2
RRQ: 8/10 in four-topic units, exactly 10/10 in five-topic Units 3, 4, 6. Feasible, no breach,
no headroom in the five-topic units.

### structure - fail

Front matter valid (ajv 2020 against `contracts/content-spec-frontmatter.schema.json`); sections in
contract order; all per-unit blocks present; partitions total and disjoint; depth-budget counts
match; two figures per topic; plan bullets match topic-list cells; every mapped-readings key
resolves; no em dashes. Defects:

1. Checklist `Topic` cells that are not Topic-list labels: U3-06 (7.2), U3-08 (8.2), U3-09 (8.3),
   U4-07 (11.2), U6-05 (15.3), U6-07 (16.2), U6-08 (16.3). The v3 contract requires the label;
   `check-unit-depth.mjs` does not enforce it today, so this would pass the gate silently.
2. Unit 5 plans only `diagram` and `table` figures: no concept-map, flowchart or timeline,
   breaching Art. III.10 (`style-guide.md:493-494`). `check:figures` will fail Unit 5 at G2.

### decision-residue - pass

No residue found for D-2026-0001, 0002, 0003, 0004, 0005, 0008, 0009, 0010, 0011, 0012, 0013,
0014, 0017, 0021, 0046. Searches for "one-page", "one-term", `.specify`, `Course_guides_and_Scheme`:
zero hits.

## Deterministic checks (run at 2fd037b2)

| Command | Exit | GQUR-301 findings |
|---|---|---|
| `npm run validate:content` | 0 | 0 |
| `npm run check:no-em-dash` | 0 | 0 |
| `npm run check:no-answer-keys` | 0 | 0 |
| `npm run check:concept-graph` | 0 | 0 |
| `npm run check:bloom-bands` | 0 | 0 |
| `npm run check:source-floor` | 0 | 0 |
| `npm run check:depth-gate` | 0 | 0 |
| `npm run check:figures` | 0 | 0 |
| `npm run check:docs-sync` | 0 | 0 |
| `npm run check:pipeline-gate` | 1 | 4: Units 1 and 2, spec `draft` and G2 rows not done (expected after authoring before intake) |

The green gates only see authored Units 1-2. The spec-side invariants for all six units were
replayed directly with `unitSectionLines`, `parsePipeTable`, `tableAfterHeading` and
`parseTopicList`. No heavy job was run.

## Outcome

- Approved under D-2026-0049, pending owner review: **identity, blueprint, decision-residue**.
- Escalated: **G-2026-82** (partition), **G-2026-83** (CLO 3 computational tools).
- Fail, drafter repair needed: **coverage, readings, structure**.
- **The spec may not move to `status: approved` after owner confirmation of D-2026-0049 alone.**
  It needs the owner's rulings on both gaps, the drafter's repairs, a fresh manifest, and a fresh
  evaluation.

Firecrawl reported low account credits during the readings checks.
