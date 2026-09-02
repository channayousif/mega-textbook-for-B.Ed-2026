# Contract: Figure Manifest v2

**Supersedes**: `specs/008-rich-unit-pedagogy/contracts/figures-manifest.md` for any unit whose
figures have begun rendering. A unit still entirely at `Status: prompt-only` is byte-for-byte
valid under both contracts.
**File**: `specs/content/<course-code>/figures/unit-NN.md` (`NN` zero-padded)
**Read by**: `scripts/check-figures.mjs` (Spec 009 FR-010–FR-013)
**Format**: Markdown, one pipe table.

## Table

```markdown
| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |
|---|---|---|---|---|---|---|
| fig-U1-1 | 1.1 | diagram | clean flat vector comparison table … | Table comparing … | /img/figures/efmp-302/unit-01/fig-U1-1.svg | placed |
| fig-U1-2 | 1.2 | illustration | two-panel classroom scene … | Two classroom scenes side by side … | /img/figures/efmp-302/unit-01/fig-U1-2.webp | placed |
```

| Column | Rule | Gate failure if… |
|---|---|---|
| `Figure ID` | `^fig-U\d+-\d+$`, unique in the table, `U<n>` == the unit-folder number | malformed / duplicate / wrong unit |
| `Topic` | the `topic_label` front-matter of the topic file that carries the figure | ≠ the carrier file's `topic_label` |
| `Kind` | `diagram` \| `illustration` | not in the set, **when `Status ∈ {generated, placed}`** |
| `Prompt` | the generation prompt (retained from Spec 008 for regeneration + the human gate); ≥ 10 non-space chars | blank / too short |
| `Alt text` | the accessible description; SHOULD equal the `<Figure alt>` (human gate reconciles) | blank |
| `Src` | the site path `/img/figures/<course-lowercase>/unit-NN/<figId>[.ur].<ext>`. **Blank iff `Status: prompt-only`** | blank while not `prompt-only`; non-blank while `prompt-only`; for `placed`, the file does not exist under `static/` |
| `Status` | `prompt-only` \| `generated` \| `placed` | not in the set |

**Parser**: column-aware — read the header row, map names → indices. A 5-column Spec 008
manifest (`Figure ID \| Topic \| Prompt \| Alt text \| Status`) and this 7-column v2 manifest
both parse; missing `Kind`/`Src` columns are treated as `prompt-only`-only.

## `Status` lifecycle

| Status | Meaning | Topic file has | Asset | What the gate checks |
|---|---|---|---|---|
| `prompt-only` | Spec 008 state | the `{/* FIGURE[...] */}` comment | none; `Src` blank | exactly the Spec 008 checks — **unchanged code path** |
| `generated` | asset exists, not yet wired | still the comment | `<figId>.<ext>` under `static/` or `figures/.staging/` | + `Kind` in enum; `Src` non-blank |
| `placed` | rendered | `<Figure id="<figId>" src="<Src>" alt="…" />` (comment removed) | `<figId>.<ext>` committed under `static/` | + `Src` file exists; EN `<Figure id>` present; for a `reviewed` bilingual unit the UR `<Figure id>` present and (`diagram`) `<figId>.ur.svg` exists |

A row may not silently regress from `placed`. A unit may hold a mix of statuses (incremental
rendering).

## The `<Figure>` end-state (replaces the comment marker)

When a figure reaches `placed`, its `{/* FIGURE[id]: prompt; alt: alt */}` comment in the EN
`topic-NN.mdx` is **removed** and replaced, at the same position, by:

```mdx
<Figure id="fig-U1-1" src="/img/figures/efmp-302/unit-01/fig-U1-1.svg" alt="Table comparing a teacher, a shopkeeper and a doctor against the four features of a profession — the teacher and the doctor meet all four, the shopkeeper meets none." />
```

- `id` == the marker id and the manifest `Figure ID`.
- `alt` == the marker's alt text, **verbatim** (whitespace-normalised).
- `src` == the manifest `Src`.
- The comment is not kept.

The UR `topic-NN.mdx` gets the mirror `<Figure>` at the same position; for `Kind: diagram` its
`src` points at `<figId>.ur.svg`; for `Kind: illustration` it reuses `<figId>.webp` with a
translated `alt`.

## Bilingual rule

- `Kind: diagram` — a placed figure MUST have `<figId>.ur.svg` (labels translated to Urdu).
  Enforced when the EN `index.mdx` is `translation_status: reviewed`; written-and-wired but not
  gate-blocked while `draft`.
- `Kind: illustration` — the one `<figId>.webp` is reused on both locales; only the `<Figure alt>`
  is translated.

## Carrier

A **carrier** for figure id `X` = a `{/* FIGURE[X]: … */}` comment **or** a
`<Figure id="X" … />` in a topic file's body. The Spec 008 invariants — "every topic file has
≥ 1 figure", "carrier-id set == manifest-id set both ways", "each manifest `Topic` == the
carrier file's `topic_label`" — all count carriers of either form.

## Asset-path grammar

```
static/img/figures/<course-code-lowercase>/unit-NN/<figId>.svg        # diagram, EN
static/img/figures/<course-code-lowercase>/unit-NN/<figId>.ur.svg     # diagram, UR (translated labels)
static/img/figures/<course-code-lowercase>/unit-NN/<figId>.webp       # illustration (both locales)
```

Referenced from `<Figure src>` and the manifest `Src` as `/img/figures/<course>/unit-NN/<figId>…`.

## Not checked by the gate (human Content gate)

Whether the diagram communicates the concept; whether the SVG labels read well in Urdu; whether
the illustration is apt; whether `Alt text` is a *good* description (only that it is non-empty).
