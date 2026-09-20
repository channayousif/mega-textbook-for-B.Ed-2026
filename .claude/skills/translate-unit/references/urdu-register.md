# Urdu register, terminology and script handling (translate-unit)

## Register

**Academic-plain: درسی مگر عام فہم.** Constitution Article III.2. The reader is an entering
B.Ed student, often the first in their family to reach this level, frequently reading Urdu
more comfortably than English but not reading literary Urdu for pleasure.

- Not literary or archaic. No ornamental Persian or Arabic construction where a plain Urdu
  word carries the meaning.
- Not a calque of the English sentence. Urdu is verb-final; an English sentence rendered
  clause-for-clause in English order is grammatical and unreadable. Restructure to natural
  Urdu order, then check the meaning survived the move.
- Not simplified. Academic-plain means plain **wording**, not reduced content. Dropping a
  qualification to make a sentence flow is a semantic change and G5 will find it.

The test: would a first-year B.Ed student in a Sindh government college read this once and
understand it? If it needs a second pass because of the *language* rather than the *idea*, it
is too ornate.

## Terminology

`specs/content/terminology.csv` (`term_en,term_ur,notes`) is mandatory (FR-006), and frozen.

- A `term_ur` may hold an **accepted pair**: two conformant Urdu terms separated by ` / `.
  Either side satisfies `check:pipeline-gate`. The `notes` column records which surface uses
  which, so a pair documents a real split rather than an unresolved decision. Use one term
  consistently within a unit.
- The bank is checked only against `key_terms` in the UR `index.mdx`, and only when
  `reviewed`. Prose terminology drift is not gate-checked at all - it is a G5 finding.
- **Never edit the bank to make your own choice conform.** A conflict is resolved by the
  curriculum owner, and the resolution updates the bank so later translators inherit it.
  Record your proposal in the handoff instead.

Technical terms that have no settled Urdu form are handled one of two ways, consistently
within a unit: transliterate, or give the Urdu with the English in parentheses on first use.
Whichever you pick, do not alternate.

`<Glossary>` keeps its English `term` attribute in both languages: it is a key into
`glossary.json`, which carries `definition_ur` alongside `definition_en`. Translating the
attribute breaks the lookup. Two forms are in use and each crosses over as-is:

- Self-closing, the component supplies the word: `<Glossary term="Educational Psychology" />`
  followed by Urdu prose (EFMP-301 Unit 1).
- Wrapping, the surface text is yours: `<Glossary term="Profession">profession</Glossary>`
  becomes `<Glossary term="Profession">پیشہ</Glossary>` - attribute unchanged, wrapped text
  translated.

## Script, digits and embedded Latin

- **Numerals.** The corpus uses Western Arabic digits (0-9) in Urdu text, matching the existing
  reviewed units. Do not switch to Eastern Arabic numerals (٠-٩) part-way through a corpus.
- **Course codes, SLO identifiers and figure IDs stay Latin and unchanged**: `EFMP-302`,
  `SLO:EFMP-302-1-1`, `fig-U2-3`. They are identifiers, not words.
- **Embedded Latin runs** (an English technical term, a citation, a URL) sit inside an RTL
  paragraph and the bidi algorithm handles them, but punctuation at the boundary is where it
  goes wrong. Check the rendered output, not the source: a full stop after a Latin run at the
  end of an Urdu line is the classic failure.
- **Citations** keep their Latin author-year form. `(Little, 2001)` is not translated.
- **Dates** follow the English unit's convention.

## Punctuation

- Urdu full stop is the danda `۔`. Use it, not `.`, at the end of Urdu sentences.
- Urdu comma `،` and question mark `؟` in Urdu prose.
- **No em dash.** U+2014, U+2015, U+2E3A, U+2E3B are blocked by `check:no-em-dash`, which
  scans `i18n/`. Use a comma, a full stop, parentheses, or a spaced hyphen `" - "`.
- Bold and emphasis markers wrap the Urdu text the same way they wrap the English. Keep the
  same words emphasised; emphasis carries meaning the author chose.

## Meaning-preserving moves that G5 specifically hunts

From `g5.md`: negation, modal force, quantities, percentages, dates, comparisons, causal
claims, examples, pronoun references, instructional sequences.

- **Epistemic force.** "may", "can", "often", "tends to", "in some settings" each have an Urdu
  equivalent that is weaker or stronger than the others. "may" becoming "always" is the named
  example. Translating a hedge away is the most common way a faithful-looking translation
  fails.
- **Attribution and qualification.** Where the English discloses that a claim rests on an
  abstract only, or that a source could not be retrieved, that disclosure is part of the
  claim. It crosses over.
- **Negation scope.** Urdu negation placement can flip which clause is negated. Re-read every
  negated sentence as a reader, not as a translator.
- **Instructional sequence.** "Before you do X, read Y" must not become "Read Y and do X".
  Activity steps are ordered for a reason.

## RTL rendering

Inspect the rendered page, not the source. `node scripts/render-inspect.mjs <COURSE> <N>
--locale ur` gives desktop, 360px and A4-print passes plus SVG text geometry. Look for:

- Nastaliq shaping and legibility at 360px, where line height is tightest.
- Table column order: an RTL table reverses visually, and a table whose first column is a
  label must still read as a label column.
- Figure labels: Urdu frequently sets longer than the English it replaced, inside a viewBox
  inherited from the English. The geometry pass reports text past the viewBox edge.
- Wrapping and clipping in narrow view, and clipping at the A4 page width.
- `.figure` centring and overflow: `custom.css` notes the Urdu RTL build specifically, because
  centring can strand an overflowing figure mid-scroll on first paint.
