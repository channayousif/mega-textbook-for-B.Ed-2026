# EFMP-303 re-intake evaluation (G0 intake / G1 unit-spec)

- **Evaluator:** agent:evaluator (fresh session; did not draft this spec, which was drafted by the
  Paperclip BilingualAuthor agent)
- **Date:** 2026-10-10
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0, Constitution Art. VII.8
- **Subject:** `specs/content/efmp-303/content-spec.md`, `status: draft`, commit `145fe4f4`
  (author repairs in `2144ac56`, made after `D-2026-0048`)
- **Binding owner ruling:** `D-2026-0053` (confirmed 2026-10-10; file `intake2/D-2026-0053.md`,
  sha256 `56ae62a22da263d8f305e05bca1e3137622c50385be9475cdf9e5e064ab706ff`). It resolves
  `G-2026-77`, `G-2026-78` and `G-2026-79`.
- **Decision recorded:** `D-2026-0059` (pending-owner-review), appended to the worktree's
  `specs/decisions/log.md`
- **Escalations:** none. `G-2026-122` to `G-2026-125` were reserved and not used.

## Manifest verification

- `manifest.json` recomputed with `manifestFor()` over the `prepare-intake-evidence.mjs` root set
  for `efmp-303`: 80 inputs recorded, 80 recomputed, **0 mismatches**.
- `manifest_digest` `fa37085d48cb7bd54a861e1043440fbb7b930739946e87677acafce45ea423c3`
  reproduced from `JSON.stringify(input_manifest)`.
- `registers` (`specs/decisions/log.md`, `specs/gaps.md`) matched at read time.
- Worktree HEAD is `145fe4f4b225ef9bc39538265591b6b241de5718`, the manifest `commit`. The tree
  was clean before the decision-log write.

## Inputs changed since D-2026-0048

`git diff 2452929d 145fe4f4` over the bound roots changes only `specs/content/efmp-303/`:
`content-spec.md` (front-matter floor, reading list, week schedule, Unit 1 CLO trace, six unit week
lines, mapped readings), and the `coverage/`, `figures/` and `sources/` files (key swaps). The guide,
Scheme, catalog, contracts and style guide are unchanged. No checklist row, blueprint or concept
file changed. So the prior verified findings for identity, coverage and blueprint carry over.

## Criterion verdicts

| # | Criterion | Verdict | Locator | Change since D-2026-0048 |
|---|---|---|---|---|
| 1 | identity | **pass** | guide `2nd 2026.txt:1171-1177`; catalog unchanged | unchanged |
| 2 | partition | **pass** | spec `:75-88`, unit lines `:106,171,232,296,350`; D-2026-0053 item 1 | escalated, now settled by owner |
| 3 | coverage | **pass** | 45 checklist rows, guide `:1215-1341` | unchanged |
| 4 | outcomes | **pass** | spec `:108-110` now "CLO 1" | repair applied |
| 5 | readings | **fail** (author repair) | spec `:52-73`; `sources/unit-0[1-6].md` | partly repaired |
| 6 | blueprint | **pass** | unit blueprints unchanged | unchanged |
| 7 | structure | **pass** | gate exit codes below | figures/bloom findings now clear |
| 8 | decision-residue | **fail** (author repair) | spec `:77-79`, `:88`, `:408`, `:415`, `:58` | D-2026-0012 residue cleared; D-2026-0053 not fully applied |

## Findings

### 2. partition: pass
`D-2026-0053` item 1 confirms the grouping. For Units 1-5 the `## Week schedule` and the unit
opening lines now follow the guide table (`:1215-1325`). The false claim "The guide carries no week
table" is gone. Unit 6's week span is a residue item (criterion 8).

### 4. outcomes: pass
The Unit 1 objective-5 trace is removed. No other SLO or trace changed.

### 5. readings: fail, author repairs only
The policy is settled by `D-2026-0053` item 2: author-selected verified works are allowed when
labelled as such, and `open_access_floor` is set to 1 per unit with `default: 1`. The front matter
(`:4-11`) now declares that floor correctly, and `check:source-floor` passes. I checked each locator
independently on 2026-10-10 (curl, OpenAlex API, Crossref API, web search; none of these is a
bound input):

| Key | Spec locator result | Status |
|---|---|---|
| `nep2009` | `web.archive.org/web/20201126091946/http://moe.gov.pk/` returns HTTP 200 with a **0-byte body** | not a working or document-level locator |
| `nep2017` | archived MoFEPT **homepage**; it links a "Policies" page, not the document | not document-level, which `G-2026-79` required |
| `unesco-epg` | `iiep.unesco.org/en/our-mission/educational-planning-explained` **redirects to the IIEP homepage** | dead page. The work with that title is Coombs (1970), *What is educational planning?*, Fundamentals of Educational Planning 1 (unesdoc `pf0000076671`). Its Kind is `guide-required` in `sources/unit-04.md` but `open-access-substitute` in Units 1 and 3 |
| `pak-vision2025` | `pc.gov.pk/uploads/downloads/Vision_2025_Pakistan.pdf` returns **404**. The document is at `pc.gov.pk/uploads/vision2025/Pakistan-Vision-2025.pdf` (200, 110 pp, created 2014-08-10) | a real work, but the URL is wrong and the year is wrong (2014, not 2017). "OpenAlex-verified 2026-10-10" (`sources/unit-03.md`) is unsupported: an OpenAlex search returns only papers *about* Vision 2025 |
| `gem-report2020` | unesdoc `pf0000373718`, which resolves. Crossref DOI `10.54676/jjnk6989` | **verified**. The full title ends "...: All means all" |

What follows:
- **Unit 3** meets its floor only through the `pak-vision2025` row, and the gate counts that row
  only because of the unsupported OpenAlex marker. Unit 3's other open-access entry (`unesco-epg`)
  has a dead locator. So Unit 3 has no open-access source with a working locator and a genuine
  registry check.
- **Labelling:** `unesco-epg`, `pak-vision2025` and `gem-report2020` are labelled author-selected
  in their Note cells, but they sit under `### Guide-required` (`:58`), under an intro that calls
  the table the guide's "Recommended Readings" (`:54`). The ruling requires them labelled
  "author-selected rather than guide-required".
- The replacement of the guide's unresolvable Andrabi & Rizvi and Khan (2018) entries is disclosed
  in the Note column. That satisfies the ruling's correction requirement.

### 7. structure: pass

| Gate | Exit | Note |
|---|---|---|
| `validate:content` | 0 | |
| `check:depth-gate` (`check-unit-depth.mjs`) | 0 | |
| `check:no-em-dash` | 0 | |
| `check:no-answer-keys` | 0 | |
| `check:concept-graph` | 0 | |
| `check:docs-sync` | 0 | |
| `check:source-floor` | 0 | now enforced at 1 per unit; see the Unit 3 caveat above |
| `check:figures` | 0 | |
| `check:bloom-bands` | 0 | |
| `check:pipeline-gate` | 1 | 12 expected findings: `status: draft` and stale G2 manifests after the spec change, x6 units |

No heavy job was run (no build, vitest or Playwright).

### 8. decision-residue: fail, author repairs only
- `D-2026-0012`: residue cleared. The schedule no longer claims the guide is silent.
- `D-2026-0048`: the Unit 1 trace repair is applied.
- `D-2026-0053` item 1: Week 16 is attached to Unit 6 ("Weeks 13-16", `:408`; Topics "from guide
  Weeks 13-16", `:415`; schedule `:77-79`, `:88`). That Topics line lists no Week 16 item. The guide's
  Week 16 is "Review and Final Assessment" of the whole course (`:1343-1347`), and `G-2026-78`,
  which the ruling resolved to the guide's table, read that table as "Unit 6 = Weeks 13-15, with
  Week 16 as course review". This repair is guide-determined. Route Week 16 to `## Course review
  plan` (`:90-102`), which today does not mention it, and disclose the guide's "student
  presentations and discussions" there.
- The schedule's guide locator "lines 1211-1278" (`:77`) stops at Week 8. The table is `:1215-1347`.
- `D-2026-0053` item 2: the labelling residue in criterion 5.

## Advisory (not blocking; for G2/G3)
- `gem-report2020` replaced `khan2018` by key swap across the coverage and sources files. It is
  now claimed to support Pakistan's 1947-2000 policies (U2-01 to U2-03), ICT and digital
  transformation (U6-04, U6-06), and bureaucratic issues (U4-06). A 2020 global inclusion report
  is unlikely to support those claims, so they need source-level checks.
- `nep2017`: whether the draft or the final edition governs is still unestablished (`D-2026-0001`
  title-level support applies).
- `sources/unit-05.md` `wb_hci` still carries an OpenAlex date of 2024-06-15 (noted in D-2026-0048).

## Outcome

- **Approved (pending owner review), D-2026-0059:** identity, partition, coverage, outcomes,
  blueprint, structure.
- **Not approved:** readings and decision-residue. Both need author repairs only. No owner ruling
  is needed and nothing new was escalated.
- **May the spec move to `status: approved` now?** **No.** The remaining repairs:
  1. `nep2009`: replace the empty archive snapshot with a document-level locator that serves NEP 2009.
  2. `nep2017`: give a document-level locator, not the ministry homepage.
  3. `unesco-epg`: bind an identified, resolvable work (for example Coombs 1970, unesdoc
     `pf0000076671`) and use one Kind for it in every `sources/` file.
  4. `pak-vision2025`: correct the URL to `pc.gov.pk/uploads/vision2025/Pakistan-Vision-2025.pdf`
     and the year to 2014. Remove the unsupported "OpenAlex-verified" marker. Make sure Unit 3
     binds at least one open-access source with a genuine registry check and a working locator.
  5. Move the author-selected entries out of `### Guide-required` into a separately headed
     author-selected list, and fix the intro so it does not call them the guide's readings.
  6. Unit 6: change "Weeks 13-16" to "Weeks 13-15" (opening line, Topics line, schedule row).
     Route Week 16 to `## Course review plan` and disclose "student presentations and
     discussions". Correct the locator `1211-1278` to `1215-1347`.

  After that, prepare a fresh manifest and run a new intake. Setting the status is the owner's act.
