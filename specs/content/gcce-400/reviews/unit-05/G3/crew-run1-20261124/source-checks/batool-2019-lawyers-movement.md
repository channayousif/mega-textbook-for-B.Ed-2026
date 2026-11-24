# Source check: Batool, Mahmood & Ullah (2019) and the Lawyers' Movement

Reviewer: agent:claude (LongCat-2.5), run `crew-gcce-400-u05-review_en-run1-20261124`.
Date: 2026-11-24. Reviewed HEAD `175a90b7a644bd366cf3d1d2592090a93f912bcb`.

## What the unit claims

- `docs/semester-4/gcce-400/unit-05/topic-03.mdx:71` - the Lawyers' Movement (2007-2009) is
  "documented by Batool, Mahmood, and Ullah (2019)".
- `topic-03.mdx:75-79` - five dated milestones: 9 March 2007 suspension of Chief Justice Iftikhar
  Muhammad Chaudhry; May to August 2007 coalition and Grand Trunk Road caravans; 3 November 2007
  emergency, PCO oath, house arrests; February 2008 elections; 16 March 2009 Long March and
  restoration notifications.
- `topic-03.mdx:81` - "Batool et al. (2019) observe that its success rested on three fundamental
  pillars": non-violent discipline, broad civic coalition, constitutional framing.
- `topic-03.mdx:67` (fig-U5-6 alt text) and `specs/content/gcce-400/figures/unit-05.md:12` - the
  timeline is "based on Batool et al. (2019)".
- `unit-assessment.mdx:113,201` (RRQ 10) and `:234` (ERQ 3 rubric) - the three factors are
  attributed to Batool et al. (2019).

## What the cited source actually contains

Citation: Batool, S., Mahmood, A., & Ullah, A. (2019). The role of civil society in democratic
consolidation in Pakistan and Turkey. *Liberal Arts and Social Sciences International Journal,
3*(1), 85-92. https://doi.org/10.47264/idea.lassij/3.1.8

The full open-access PDF (8 pages, 85-92) was fetched 2026-11-24 from
`https://ideapublishers.org/index.php/lassij/article/download/99/55/359` and read in full. The
extracted text is saved beside this note as `batool-2019-article.txt`.

- The article's abstract and body are about the concept of civil society, its development in
  Pakistan and Turkey, women's empowerment, human rights, and Turkish civil society.
- A full-text search of the article for "Lawyer", "Long March", "Musharraf" (as a movement
  actor), "Chief Justice", "judiciary", "emergency" and "restoration" returns no passage about
  the Lawyers' Movement (2007-2009). The only "legal" reference is a literature-review sentence
  naming "the leadership of the legal community" as one of several factors that supported civil
  society under Musharraf (page 86).
- The article contains no 2007-2009 timeline, no 9 March 2007 date, no 3 November 2007 emergency,
  no February 2008 election, no March 2009 Long March, and no "three pillars" of movement success.
- The article's conclusion (page 91) actually says civil society in Pakistan "has strengthened
  but: failed to produce desired results because of concerted politics", which is the opposite
  register of the unit's "success rested on three fundamental pillars".

## The bound note also misrepresents the article

`specs/content/gcce-400/sources/texts/batool-2019-civil-society.md:12` states: "Focuses on the
Lawyers' Movement (2007-2009) as a major historical example of civil society mobilization in
Pakistan: sparked in March 2007, broadened across civil society and political parties, maintained
non-violent discipline under the November 2007 emergency, and culminated in the March 2009 Long
March restoring the judiciary." That claim is not in the article. The note's first three bullets
(abstract-level points) are accurate; the fourth bullet and the "Use in GCCE-400" line for
U5-03 are not.

## Consequence

The unit's Topic 5.3 case study, fig-U5-6, RRQ 10 and ERQ 3/4 rest on a source that does not
contain the material. The approved content-spec (`specs/content/gcce-400/content-spec.md:281-330`)
maps `batool-2019-civil-society` to Unit 5 and requires fig-U5-6 to be "one documented Pakistani
social action movement, dates and events taken from a bound source". The bound source does not
document that movement, so this is a G0/G1 authority problem as well as a source-support failure.
A repair needs either a different bound source that actually documents the Lawyers' Movement, or
an owner ruling that changes the approved figure plan and mapped readings. It cannot be repaired
by editing the unit alone without re-opening the approved spec.

## Reproduction

```
curl -sSL -A "Mozilla/5.0" \
  https://ideapublishers.org/index.php/lassij/article/download/99/55/359 -o batool.pdf
pdftotext -layout batool.pdf batool.txt
grep -niE "lawyer|long march|chief justice|emergency|restoration" batool.txt
```
