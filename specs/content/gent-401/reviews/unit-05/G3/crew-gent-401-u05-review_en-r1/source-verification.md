# GENT-401 Unit 5 - source verification (G3)

Reviewer run: crew-gent-401-u05-review_en-r1. Each cited claim was compared with the bound
evidence note in `specs/content/gent-401/sources/texts/`. Where a claim went beyond the bound
note, the public source was read (2026-11-27) to decide whether the defect is a missing note or a
misattribution. That outside reading is recorded here openly and does not stand in for bound
evidence: a claim supported only outside the bundle stays unresolved until the note is extended.

Outside reads (scratch copies kept in the git-ignored `.crew/src/`, not committed):

- Scott (2017) PDF, https://www.efmdglobal.org/wp-content/uploads/The-Entrepreneurs-Guide-to-Building-a-Successful-Business-2017.pdf,
  SHA-256 `b16f876c6e8d37671d89a54053417562f21aff9c396562fb6dea8cec76ec2422`, text via `pdftotext -layout`.
- OpenStax *Entrepreneurship* section 9.2, https://openstax.org/books/entrepreneurship/pages/9-2-special-funding-strategies,
  HTML SHA-256 `3279228e44fc275bbb169ed558abb47b5d5fbef2f5368582f8b6af9f7c0ba0aa`.

## Claim-by-claim

| # | Unit locator | Claim | Bound note | Result |
|---|---|---|---|---|
| S1 | topic-01.mdx:55 | Scott ch. 13 lists five ways attention to money keeps a business solvent | scott-2017-efmd.md:40 (U5 note 4) | Supported |
| S2 | topic-01.mdx:73 | Sintha (2020): break-even decides how many products/services must be sold to cover costs, especially fixed costs | sintha-2020-break-even.md:28 (note 2) | Supported |
| S3 | topic-01.mdx:73 | Sintha (2020) "notes that many small businesses fail because they never do this calculation at all" | sintha-2020-break-even.md:27 (note 1): many SMEs "stop trying, and one cause is" that they never do the calculation | **Overstated** (F5): the source gives one cause of giving up; the unit states a general causal claim about failure |
| S4 | topic-01.mdx:89 | Scott ch. 10 names cash-flow problems among the main reasons new businesses fail | None. The U5 notes (scott-2017-efmd.md:35-44) cover chapters 1, 12 and 13 only | **Unbound** (F7). Outside read: Scott ch. 10 "The 13 Main Reasons Why New Businesses Fail", "Reason 3: Cash Flow Problems" supports the claim |
| S5 | topic-01.mdx:89 | OpenStax 9.4: income statement records revenue when work is completed, hence a statement of cash flows | openstax-entrepreneurship.md:55 (note 10) | Supported |
| S6 | topic-02.mdx:36 | OpenStax 9.2 defines bootstrapping as self-funding and making the best use of personal funds | openstax-entrepreneurship.md:54 (note 9) gives "self-funding"; outside read 9.2: "seeks to optimize use of personal funds" | Supported (second half outside the note; advisory to add) |
| S7 | topic-02.mdx:36 | Scott ch. 1: starting with little money teaches frugality and efficiency, because a large pile of cash often gets spent on unneeded things | scott-2017-efmd.md:37 (note 1) covers frugality; the "pile of cash" reason is not in the note | Partly unbound (F7). Outside read ch. 1 "Lack of Money": "too many individuals, when starting with a pile of cash, waste it on things they don't need" supports it |
| S8 | topic-02.mdx:38 | Scott ch. 12: banks seek proven cash revenues or collateral and firm facts and figures | scott-2017-efmd.md:38 (note 2) | Supported |
| S9 | topic-02.mdx:38 | OpenStax 9.1 Table 9.1 debt vs equity trade-off | openstax-entrepreneurship.md:53 (note 8) | Supported |
| S10 | topic-02.mdx:40 | Cegielska & Zawadzka: classical vs alternative sources; Polish startups financed mainly by founders' capital | cegielska-2018-startup-financing.md:13-14 | Supported; setting named as Poland, not presented as Pakistani evidence |
| S11 | topic-02.mdx:50 | Scott ch. 12: VCs expect yearly growth of up to 40 percent or higher | scott-2017-efmd.md:38 | Supported |
| S12 | topic-02.mdx:54, :56 | OpenStax 9.1: angel definition; angels at seed stage; VCs at early stage after angels, specialise in early-stage companies | openstax-entrepreneurship.md:53 | Supported |
| S13 | topic-02.mdx:56 | Scott ch. 12: many VCs not interested in small businesses; high-flying ideas | scott-2017-efmd.md:38 | Supported |
| S14 | topic-02.mdx:62 | OpenStax 9.2: crowdfunding definition, backers, reward/donation/equity/debt models | openstax-entrepreneurship.md:54 | Supported |
| S15 | topic-02.mdx:64 | "The OpenStax textbook warns that a campaign needs an established network and skilful use of the media, and that many projects deliver their rewards late (section 9.2)" | openstax-entrepreneurship.md:54 has the late rewards only | **Misattributed** (F3). Outside read of 9.2: no statement that a campaign needs an established network or skilful media use (it says social media "can backfire", crowdfunding is usually a "kick start", and 84 percent of top Kickstarter projects delivered rewards late). The network/media point is Scott ch. 12: "without an established network and/or skillful media involvement" |
| S16 | topic-02.mdx:64 | Scott ch. 12: without a vibrant network crowdfunding can be as fickle as winning a lottery | scott-2017-efmd.md:38 | Supported |
| S17 | topic-02.mdx:64; unit-assessment.mdx:131 | Wati & Winarno: target, number of backers and minimum sum affected success; funding period did not | wati-2018-crowdfunding.md:44 (note 3) | Supported; setting given as "several countries" |

## Declared teaching devices and settings

- The tuition-centre numbers are declared as the author's teaching device (sources/unit-05.md,
  Notes, first bullet; scott-2017-efmd.md:44; openstax-entrepreneurship.md:57). The unit does
  not present them as a real business. The tracker's request (tasks.md:62) is satisfied on this
  point.
- The Polish and Indonesian/multi-country settings are named in the prose (topic-02.mdx:40,
  :64) and are not presented as Pakistani evidence. Sintha (topic-01.mdx:73) is cited without a
  setting and is not presented as Pakistani evidence.
- No source is declared under `## Unverifiable sources`; none is needed, as all five keys have
  bound notes.

## Citation details

- Cegielska & Zawadzka is cited as 2018 (OpenAlex publication year), while the DOI string and
  the volume (51(6)) are the journal's 2017 issue. Advisory A6.
