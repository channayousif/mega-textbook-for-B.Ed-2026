# Comparator case 001 - EFMP-301 Unit 1, G5 Urdu review

- **Course / unit / stage:** EFMP-301, Unit 1, G5 (Urdu review)
- **Inputs frozen at:** `392b626`
- **Labelled by:** YM (curriculum owner), 2026-09-14
- **Resolution committed at:** `5d0a239`
- **Findings:** 5 · **Traps:** 1

> **Do not show this file to a candidate under qualification.** It is the key. See
> `../README.md` for the procedural-blindness limitation.

## Why this case is frozen at 392b626, not HEAD

At `392b626` the terminology bank holds a single Urdu term for each of the five entries below.
The resolution at `5d0a239` banked four of them as accepted pairs, so **at HEAD the divergences
no longer exist**. A candidate pointed at HEAD would correctly find nothing. Check out `392b626`
to run this case.

## Task as the candidate receives it

> Review the Urdu mirror of EFMP-301 Unit 1 at commit `392b626` for register and terminology
> conformance, per `specs/content/style-guide.md` `## UR register rules` and the terminology
> bank at `specs/content/terminology.csv`. Report each divergence with a file locator and the
> English source that settles it. Return `pass`, `revise` or `escalate`.

Expected disposition: **revise**. A `pass` here is a **false pass** and is disqualifying.

## Key - findings

Locators are `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-01/`.

| # | EN term | Prose uses | Bank at 392b626 | Sites | Severity |
|---|---|---|---|---|---|
| F-1 | Readiness | `تیاری` | `آمادگی` | 8 | blocking |
| F-2 | Rubric | `معیارِ جانچ` | `معیارِ تشخیص` | 5 | blocking |
| F-3 | Self-Assessment | `خود جائزہ` | `خود تشخیصی` | 4 | blocking |
| F-4 | Summative Assessment | `مجموعی جائزہ` | `جامع تشخیص` | 1 | blocking |
| F-5 | Working Memory | `عامل یادداشت` | `فعال یادداشت` | 1 | blocking |

**F-1 is the discriminating finding.** The unit contradicts *itself on one screen*:
`fig-U1-6` and `fig-U1-7` display `آمادگی اور سابقہ علم` in their visible labels and their
embedded `<desc>`, while the paragraph beside them (`topic-03.mdx:46`, `:56`, `:140`) reads
`تیاری اور سابقہ علم`. The MDX `alt` text also disagrees with the SVG's own `<desc>`. A
candidate that checks prose against the bank but never opens the figures will miss this, and
missing it is the single most informative outcome in this case. Other sites: `topic-02.mdx:84`,
`unit-assessment.mdx:36`.

F-2 sites: `topic-01.mdx:206`, `topic-02.mdx:196`, `topic-03.mdx:172`, `topic-04.mdx:193`
(all the `**مختصر معیارِ جانچ**` block label, EN `**Mini-rubric**`), plus
`unit-teacher-notes.mdx:108` (EN "rubrics").
F-3 sites: the `## خود جائزہ فہرست` heading in each of the four topic files
(EN `## Self-assessment checklist`).
F-4 site: `unit-assessment.mdx:47` (EN `## Summative assessment`).
F-5 site: `topic-04.mdx:56` (EN "working memory").

## Key - traps

**T-1: the prose noun uses of `جانچ` are NOT defects.**

`specs/backlog.md` predicted, under "the prose noun uses of `جانچ` (F-04, remainder)", that a
handful of sites use `جانچ` as the noun for the assessment concept where the bank says
`تشخیص`, citing `یونٹ کی سطح کی جانچ`. **This is wrong**, and a candidate that reports it is
producing a false positive.

The English source of that exact site, `docs/semester-1/efmp-301/unit-01/unit-teacher-notes.mdx:106`,
reads "a unit-level **check** rather than a topic-level one" - "check", not "assessment". The
same holds for `topic-04.mdx:181` (`تین سوالوں والی جانچ`, EN "a three-question check") and for
every `قابلِ جانچ` site, which is adjectival "checkable/testable". Of 41 `جانچ` occurrences in
the unit, the verb forms (`جانچے`, `جانچیں`, `جانچنے`, `جانچا`, `جانچتا`, `جانچنا`) are ordinary
Urdu and must not change.

This trap rewards a candidate that checks each occurrence against its English source and
penalises one that pattern-matches a term list. It is the reason the case is worth keeping: the
backlog entry was written by a previous review pass and was believed for a day.

## Notes for the scorer

- A candidate finding F-2 through F-5 but not F-1 has checked prose against the bank and not
  looked at the figures. That is a partial pass at best; F-1 is the finding a reader would hit
  first, because it is visible without reading Urdu closely.
- A candidate reporting T-1 alongside real findings is not disqualified, but the false positive
  must be recorded. A candidate reporting T-1 *instead of* F-1 has inverted the case.
- Correctly banked terms that a candidate might wrongly flag: `محرک` (Motivation),
  `تعلیمی نفسیات`, `اِدراک`, and the 28 legitimate uses of `جائزہ` for "review".
- The owner's resolution was *not* "change the prose". Four terms were banked as accepted pairs
  because `جامع تشخیص` and `خود جائزہ` each appear in five EFMP-302 Unit 1 files already signed
  at G5 and carrying `translation_status: reviewed`, so replacing either would have made signed
  content non-conformant. A candidate is being scored on **detection**, not on picking the same
  remedy.
