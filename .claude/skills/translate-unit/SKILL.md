---
name: translate-unit
description: >-
  Translate one accepted English unit into its complete Urdu mirror at gate G4 (Spec 008
  per-topic layout): index, every topic file, the unit assessment with its 10/10/5 bank and
  bounded answers section, optional teacher notes, the `.ur.svg` figure wiring, and the UR
  `key_terms` block that `check:pipeline-gate` reads. Use when asked to "translate a unit",
  "do the Urdu version of EFMP-xxx Unit N", "run G4", "build the UR mirror", or to bring an
  existing Urdu mirror up to structural and semantic parity. Produces gate-passing,
  academic-plain (درسی مگر عام فہم) Urdu bound to the frozen terminology bank, ready for an
  independent G5 review. Does not review its own output and never marks itself reviewed.
---

## Independent review handoff

G4 produces a translation; **G5 judges it, and G5 is never this session**. Hand a frozen bundle
to a fresh `g5-reviewer` session using `.claude/skills/review-unit/SKILL.md`. Do not supply the
translator's reasoning or ask for approval. Apply findings in a separate translation pass and
request fresh review after edits. Review reports are advisory until the reviewer has signed
qualification and scope activation under ADR-0019. Agent tracker rows require accepted signed
evidence; never reuse human initials for agent work. See the Feature 014 evidence contract.

`g5.md` states the standard this output is measured against: complete passage-level bilingual
comparison, preserved epistemic force, assessment equivalence, and **actual rendered Urdu**
inspected at narrow width and in A4 print. Read it before starting. Writing to satisfy the
rubric is legitimate; deciding you have satisfied it is not yours to do.


# translate-unit

Turn one accepted English unit into its complete Urdu mirror under
`i18n/ur/<plugin-dir>/current/…/<course>/unit-NN/`. Every English `.mdx` in the unit folder
gets a same-named Urdu file with the same structure, the same components, the same figure
IDs and the same assessment items, carrying the same meaning in academic-plain Urdu.

**One skill, no sub-agent.** The read-baseline → translate → wire figures → run-gates →
read-failure → fix loop needs the harness's own file tools and the gate cycle in the main
loop, exactly as `author-unit` and `revise-topic` do.

**What parity means here.** Structural parity is what the gates check: same file set, same
headings, same component calls, same figure IDs. Semantic parity is what G5 checks and no gate
can: negation, modal force, quantities, causal claims, and whether an item still asks for the
same cognitive work. A green gate run says nothing about the second kind. See
`references/parity-contract.md`.

**Inputs you need before starting**

- `course_code` and `unit_no`, and confirmation the English unit is a settled baseline. Check
  the tracker at `specs/content/<course>/tasks.md`: G3 should be accepted, or the unit should
  at minimum be gate-checked with `G2 en-draft` green. Translating a moving English target
  wastes the work, and a later English edit invalidates the G5 dependency outright.
- `specs/content/terminology.csv` - the frozen bank, mandatory (FR-006). A `term_ur` may hold
  an accepted pair separated by ` / `; either side conforms.
- `glossary.json` - carries `definition_ur` for every `<Glossary>` term.
- `specs/content/style-guide.md` `## UR register rules` and `## Terminology bank`.
- References: `references/parity-contract.md` (the mechanical contract and which gate enforces
  what), `references/urdu-register.md` (register, terminology, RTL, numerals, Latin embeds),
  `references/assessment-translation.md` (the 10/10/5 bank and the bounded answers block).

**Out of scope**: authoring or fixing English content (that is `author-unit` / `revise-topic` -
if the English is wrong, say so and stop, do not silently improve it in translation); authoring
`.ur.svg` figure files (that is `generate-figures` Step 5 and `references/bilingual-figures.md`);
reviewing the translation (G5); flipping the tracker row.

---

## Step 0 - Locate the mirror, never hand-join the path

Docusaurus names each translation directory after its plugin id, so the Urdu base differs per
track. Resolve it, do not construct it:

```bash
node -e "import('./scripts/lib/content-roots.mjs').then(m=>console.log(m.resolveUnit('.','EFMP-302',2).urUnitDir))"
```

`resolveUnit()` returns `unitDir` and `urUnitDir`; `urPathFor(record, ...segments)` is the only
sanctioned way to build a path beneath it. The `docs` track mirrors to
`i18n/ur/docusaurus-plugin-content-docs/current/…`, the `licence` track to
`i18n/ur/docusaurus-plugin-content-docs-licence/current/…`. A hardcoded `UR_BASE` join is the
bug Feature 015 removed from six scripts; do not reintroduce it.

## Step 1 - Build the terminology working set

Before translating a word of prose, assemble the terms this unit is bound to:

1. Every `term_en` in `terminology.csv` that appears in the unit. These are **not negotiable**.
   `check:pipeline-gate` fails a `key_terms` entry that declares an Urdu term the bank does not
   accept.
2. Every `<Glossary term="...">` in the English files, with its `definition_ur` from
   `glossary.json`.
3. Every concept label in `specs/content/<course>/concepts/unit-NN.md` (`Label UR`).

Where the unit needs a term the bank does not hold, **do not invent and bank it silently**.
Translate it, and record it as a proposed term for the owner in your handoff notes. The style
guide is explicit: a conflict between a translator's choice and the bank is resolved by the
curriculum owner, and the resolution updates the bank. Changing `terminology.csv` to make your
own translation conform is the one move that corrupts the bank for everyone after you.

## Step 2 - Translate file by file, structure first

Work one file at a time, in reading order: `index.mdx`, `topic-01 … topic-NN`,
`unit-assessment.mdx`, then `unit-teacher-notes.mdx` if it exists.

For each file, the invariant is: **an Urdu reader and an English reader reach the same place.**

- **Front matter.** Translate `title`, `description`, `blooms_summary`. Keep `course_code`,
  `unit_no`, `topic_no`, `topic_label`, `clo_refs`, `est_reading_minutes` and
  `translation_status` byte-identical to the English. Reading minutes are not re-estimated:
  they describe the same content.
- **Headings.** Same count, same levels, same order. `validate-content`'s parity gate compares
  the two files' heading **level vectors** and reports the first index where they diverge. Note
  what that does and does not mean: `check:depth-gate` and `check:bloom-bands` walk `docs/` and
  `licence/` only, so they never read the Urdu at all.
- **Components.** Every `<Figure>`, `<Glossary>`, `<PrintHandout>`, `<BloomTag>`,
  `<ObjectiveList>`, `<ActivityCard>` and its import appears in the Urdu file as well.
  EFMP-302 Unit 1 is a live counter-example, not a precedent: its English `topic-01.mdx`
  carries one `<Glossary>` and its accepted Urdu mirror carries none. EFMP-301 Unit 1 preserves
  it correctly. Match EFMP-301.
- **`<Figure>`.** Keep `id`, `kind`, `width`, `height`. Change `src` to the `.ur.svg` variant.
  Translate `alt` fully - the alt text is the figure for a screen-reader user, and G5 inspects
  it.
- **Prose.** Academic-plain Urdu per `references/urdu-register.md`. Preserve hedges exactly:
  "may" must not become "always". Preserve attribution and qualification on every cited claim,
  including any disclosure that a source could not be retrieved.

## Step 3 - The UR `index.mdx` `key_terms` block

The Urdu `index.mdx` carries a block the English one does not:

```yaml
key_terms:
  - en: "Profession"
    ur: "پیشہ"
```

Every `ur` value must be a term `terminology.csv` accepts for that `en` (either side of an
accepted pair). This is enforced by `check:pipeline-gate`, but only once the unit is
`translation_status: reviewed` - so it is silently unchecked while you work. Verify it by hand,
or with the temporary flip in Step 5.

## Step 4 - Figures

The `.ur.svg` files are `generate-figures`' output, not this skill's. For a unit whose figures
are already `placed` in English but have no Urdu variants (the normal case for a
`translation_status: draft` unit - the gate does not require them), invoke
`generate-figures` Step 5 for the unit, then:

```bash
npm run figures:variants        # derives .ur.dark.svg from each .ur.svg
npm run figures:variants:check  # must be clean
```

`build-figure-variants.mjs` treats any `.svg` that is not a `.dark.svg` as an authored source,
so `.ur.svg` yields `.ur.dark.svg` automatically. Do not hand-write a dark variant.

## Step 5 - Run the gates, including the ones that are off

```bash
npm run check:content    # 11 gates; check:no-em-dash scans i18n/ too
npm run build            # the Urdu locale is built here, not by check:content
```

**The parity gates are conditional and default to silent.** `validate-content`'s `checkParity`,
`check:figures`' `.ur.svg` parity and `check:pipeline-gate`'s terminology check all fire only
when the English `index.mdx` is `translation_status: reviewed`. While the unit is `draft`, a
missing Urdu file, a missing `.ur.svg` and a bad `key_terms` entry all pass.

To get real coverage before handing off, flip **both** `index.mdx` files to `reviewed`, run
`npm run check:content`, fix everything it finds, then **flip them back**. The flag is a claim
about G5, and G5 has not happened yet.

```bash
# after the check, confirm you reverted:
grep -n "^translation_status:" docs/<...>/unit-NN/index.mdx \
  "$(node -e "import('./scripts/lib/content-roots.mjs').then(m=>console.log(m.resolveUnit('.','<COURSE>',<N>).urUnitDir))")/index.mdx"
```

## Step 6 - Inspect the rendered Urdu

G5 requires rendered evidence and will reject a translation that has only been read as source.
Do the same inspection yourself first:

```bash
node scripts/render-inspect.mjs <COURSE> <N> --locale ur
```

It serves a build, walks every Urdu page at 1280x900 and 360x780 and in A4 print emulation,
measures the `.ur.svg` text geometry against each viewBox, and writes screenshots plus
`render-inspect.log`. Read the log; the exit code only reports what it can prove. Look for
Nastaliq shaping, bidi punctuation at line ends, Latin terms and numerals embedded in Urdu
runs, table column order, and any figure label that now overflows because Urdu set longer than
the English it replaced.

## Step 7 - Hand off

State plainly, in the handoff:

- Which files were translated and which English commit they were translated from.
- Every term used that the bank does not hold, as proposed terms for the owner.
- Anything you could not resolve confidently, rather than a guess presented as a translation.
- That `translation_status` is still `draft` and why.

Then stop. Do not append a `G4 ur-translation` tracker row, do not flip the status to
`reviewed`, and do not review your own work. `reviewed` is what turns every parity gate on and
tells a student the Urdu is finished; only an accepted G5 earns it.

---

## Where this sits in the programme

Constitution v4.0.0 amended Article III.2: Urdu parity is a **corpus completion requirement**,
not a per-unit publish gate. A unit may publish English-only, rendering the "Urdu translation
not yet available" banner, and must not be presented anywhere as a finished bilingual unit.
Machine translation may draft; a human quality pass is mandatory before `reviewed`.

Note the amendment's own follow-up line: ADR-0022 is recorded as **Proposed, not Accepted**, and
the constitution says that if the owner rejects it the amendment is reverted. ADR-0022 also
records the risk this schedule carries - that Urdu debt accrues at corpus scale behind a single
G5 reviewer. Treat an early unit as the rate probe it was meant to be, and report how long it
actually took.
