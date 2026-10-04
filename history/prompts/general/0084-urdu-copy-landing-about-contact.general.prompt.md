---
id: 0084
title: Urdu copy for landing, about and contact pages
stage: general
date: 2026-10-03
surface: agent
model: claude-opus-5
feature: none
branch: agent/TEX-12
user: M Yousif Channa
command: Paperclip TEX-12
labels: ["i18n", "urdu", "landing-page", "translation", "tier-b"]
links:
  spec: null
  ticket: https://textbook.com.pk/TEX/issues/TEX-12
  adr: null
  pr: null
files:
 - i18n/ur/code.json
 - i18n/ur/docusaurus-plugin-content-pages/about.mdx
 - i18n/ur/docusaurus-plugin-content-pages/contact.mdx
tests:
 - npm run check:no-em-dash
 - npm run validate:content
 - npm run check:no-answer-keys
 - flock /tmp/mega-book-heavy.lock npm run build
 - Playwright render inspection of /ur/ at 1280x900 and 360x780
---

## Prompt

TEX-12: Urdu copy for the landing, about and contact pages (TEX-5 blocker).

TEX-5's draft PR #84 ships the landing page with every Urdu string still in English behind
an `[URDU_TODO]` marker. Nothing can merge until this lands. Tier B.

Scope, 3 files, roughly 600 words:

1. `i18n/ur/code.json` - 12 landing-page strings, all currently `"[URDU_TODO] <English>"`:
   site tagline, hero subtitle, and the three cards (Licence Practice Pass / B.Ed Digital
   Textbook / Learning Platform) with their body copy and CTA labels. Replace the whole
   value with Urdu; do not leave the marker or the English behind.
2. `i18n/ur/docusaurus-plugin-content-pages/about.mdx` - front-matter `title` + `description`,
   the `#` heading, and the entire body (Mission / Scheme of Studies / The Team).
3. `i18n/ur/docusaurus-plugin-content-pages/contact.mdx` - same: front-matter, heading and
   full body.

Register: academic-plain Urdu, the same register as the licence practice pages. Bind to the
frozen terminology bank at `specs/content/terminology.csv`. Marketing copy, so it must read
as Urdu a Pakistani teacher would actually write, not a literal gloss. Price, item counts
(60 CRQs, 5 case-study ERQs) and `Rs 1,500` stay exact. No em dash.

Do not invent contact details: `contact.mdx` carries a placeholder email and
`+92 XX XXXXXXX`. Translate the surrounding prose, leave the contact values byte-identical
to the English page, and flag it.

Acceptance: zero `URDU_TODO` in the repo; no English sentence left in the 3 Urdu files except
the frozen contact values; `check:no-em-dash` clean; `npm run build` green; a statement of how
`/ur/` looked on desktop and on a narrow viewport (hero and three cards RTL-correct, no Urdu
string overflowing its button or card); draft PR against `agent/TEX-5`, worktree removed.

## Response snapshot

Translated all three files on a worktree based on `origin/agent/TEX-5`.

Terminology decisions, each grounded in existing repository Urdu rather than invented:

- `Rubric` -> `معیارِ جانچ`, the frozen `terminology.csv` row (adopted 2026-09-14). The
  licence track index still carries the older `معیارِ نشان دہی (روبرک)`; the frozen bank wins
  and the divergence is raised for a separate consistency pass.
- Product names follow the transliteration posture the licence tree already uses
  (`کیس اسٹڈی`, `اسکیم آف اسٹڈیز`, `کلاس روم مینجمنٹ`): `لائسنس پریکٹس پاس`,
  `بی ایڈ ڈیجیٹل ٹیکسٹ بک`.
- `بی ایڈ میگا ٹیکسٹ بک` matches the existing student and teacher guide Urdu.
- UI nouns reuse the established tree: `اسائنمنٹ` (49 uses), `پلیٹ فارم` (32), `ڈیش بورڈ` (22),
  `سمسٹر` (15), `سائن ان` (11), `نمبر لگا` (8).
- `University of Sindh, Faculty of Education` had no prior Urdu anywhere in `i18n/ur`.
  Rendered `جامعہ سندھ کے شعبۂ تعلیم` with the English in parentheses on first use on the
  about page only; the short hero string uses `جامعہ سندھ` alone.
- `trainee teachers` -> `زیرِ تربیت اساتذہ` (established); `practising teachers` ->
  `پہلے سے پڑھا رہے اساتذہ`, chosen over a formal `خدمت میں موجود` for the plain register.

Copy was restructured rather than glossed where English word order would calque. The hero
subtitle, for example, leads with the reader and ends with the languages, which is how an
Urdu sentence of that shape actually runs.

`contact.mdx` contact values left byte-identical to the English page, including the English
`(Placeholder, please replace with actual contact)` parenthetical and `+92 XX XXXXXXX`. Only
the labels and surrounding prose were translated.

## Outcome

- ✅ Impact: unblocks TEX-5 / PR #84. `git grep URDU_TODO` returns nothing repo-wide; `/ur/`,
  `/ur/about/` and `/ur/contact/` render as complete Urdu pages.
- 🧪 Tests: `check:no-em-dash`, `validate:content`, `check:no-answer-keys` all green; full
  bilingual `npm run build` green under `flock /tmp/mega-book-heavy.lock`; Playwright
  inspection of `/ur/` at 1280x900 and 360x780 showed `dir="rtl"`, zero document horizontal
  overflow at both widths, zero element overflow or parent spill on every hero, card and
  button, and correct RTL card order (Licence card first, on the right at desktop).
- 📁 Files: 3 changed, 40 insertions, 31 deletions. `code.json` diff is exactly the 12 target
  keys; no reflow of the other 103 entries.
- 🔁 Next prompts: translate the remaining English in `i18n/ur/code.json` (the 13 `pricing.*`
  keys), `i18n/ur/docusaurus-theme-classic/navbar.json` and `footer.json`, which are still
  English on `/ur/`.
- 🧠 Reflection: the highest-value step was surveying the existing Urdu tree for each UI noun
  before writing. Four terms that would have been plausible inventions already had an
  established form, and matching them keeps the landing page in the same voice as the units.

## Evaluation notes (flywheel)

- Failure modes observed: a first pass on the hero subtitle calqued the English noun phrase
  ("complete bilingual resource" -> `مکمل دو لسانی وسیلہ`), which reads as translationese.
  Rewritten to lead with the reader.
- Graders run and results (PASS/FAIL): `check:no-em-dash` PASS, `validate:content` PASS,
  `check:no-answer-keys` PASS, `npm run build` (en + ur) PASS, RTL/overflow inspection PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add the frozen `terminology.csv` row for `Rubric`
  to the licence track's existing Urdu so the two renderings stop diverging.
