# EFMP-407 Unit 5 - G3 source verification

Reviewer: agent:opencode-g3-reviewer. Date: 2026-11-07.

Method
------
Read every bound excerpt under `specs/content/efmp-407/sources/texts/` that Unit 5 cites, then
attempted to verify the citation and the specific claims against the live source. The bound
digests include only `pakistan-constitution-1973.md` and `un-crc-1989.md`; the other six cited
excerpts were read directly from the repository. URLs were fetched with curl (HTTP status) and,
where reachable, the document text was compared.

Verified sources
----------------
- **unesco-2017-esd-objectives** - SDG 4.7, SDG 5 and SDG 16 passages match the unit's claims
  (topic-01 peace, gender equality and social justice; topic-02 inclusion). The source's own
  locator notes record the consulted copy.
- **unesco-2020-gemr** - "all means all", the beyond-disability definition and the three
  dimensions (access, participation, achievement) match topic-02. One wording stretch, see F4.
- **pakistan-constitution-1973** - Articles 25(1), 25(2), 25A and 37 match the unit's quotations
  and paraphrases. The Article 25(1)/25(2) split is the Constitution's own clause structure.
- **un-crc-1989** - Articles 28 and 29 match the unit's claims; Pakistan's 1990 ratification is
  recorded in the bound excerpt.
- **zidny-2020-indigenous** - the IKS definition, circular-versus-linear worldview and the
  "two-eyed seeing" dialogic integration match topic-03.
- **owuor-2008-indigenous** - the colonial-devaluation argument and the elder/identity pedagogy
  match topic-03.
- **kahlown-1994-karez** - the general claim (motorized tube-wells deplete water tables; the
  karez is gravity-fed and self-limiting; shabana customary allocation) matches the bound
  excerpt. The specific numbers and place names in the unit are not in the bound excerpt, see F3.

Defective citation
------------------
- **iucn-pakistan-2004-tek** - `specs/content/efmp-407/sources/unit-05.md:14` and
  `docs/semester-3/efmp-407/unit-05/topic-03.mdx:168` cite:
  `IUCN Pakistan. (2004). Indigenous Knowledge and Biodiversity Conservation in Pakistan.`
  with URL `https://portals.iucn.org/library/sites/library/files/documents/2004-099.pdf`.
  That URL returns HTTP 200 but the PDF is **The Occupational Structure of the Mnazi Bay Ruvuma
  Estuary Marine Park Communities** by D. Malleret and J. Simbua (July 2004, IUCN Eastern Africa
  Programme), a Tanzania marine-park report. Its text contains no Pakistan indigenous-knowledge
  content (searched: graft, glacier, phaalo, kuhl, karez, rod-kohi, legume - no hits). The exact
  title "Indigenous Knowledge and Biodiversity Conservation in Pakistan" could not be located in
  the IUCN Library search or on the public web. The citation is therefore defective: the URL
  resolves to an unrelated document and the named report could not be found. See F1.

Claims not carried by the bound passage
----------------------------------------
- topic-03's glacier grafting paragraph (male/female ice, mineral soils, willow charcoal, straw,
  `kuhl` canals) is attributed to IUCN Pakistan 2004, but the bound excerpt's four passages do
  not mention glacier grafting at all. The practice itself is real and documented elsewhere
  (Hunza/Gilgit-Baltistan "glacier mating"; the bound excerpt simply does not carry it). See F1.
- topic-03's Karez crisis sentence states "thousands of government-subsidized motorized
  tube-wells", "groundwater tables plunged by dozens of meters across Quetta, Mastung, and Pishin
  valleys", and "forcing entire villages to migrate". The bound excerpt supports only the general
  self-limiting-versus-uncontrolled-pumping contrast. The full Wiley text could not be retrieved
  for verification (HTTP 403). See F3.
- The bound excerpt's rangeland passage names "kash" and "punn" seasonal closures; a web search
  for those terms in Pakistan rangeland management returned no corroborating source. The terms
  are recorded as the excerpt's claim; they could not be independently confirmed. See F3.

Attribution notes
-----------------
- topic-02 says UNESCO (2020) "models the inclusive classroom across three concentric dimensions".
  The bound excerpt says "systemic alignment across three interconnected dimensions". The three
  dimensions are supported; the word "concentric" is the unit's visual framing, not the source's
  wording. See F4.
- topic-01 cites (Purvis et al., 2019) for the social-justice definition. The bound Purvis excerpt
  is a history of the three-pillar concept and does not contain that definition; the definition is
  a standard synthesis. See F5.
- topic-01 uses "peace education" without a standalone definition; the unit defines negative and
  positive peace instead. See F6.

Limitations
-----------
- The Wiley, UNESCO, OHCHR and NA URLs returned HTTP 403 to the review host's curl (bot
  protection); the bound excerpts were used for those sources instead.
- The IUCN library search endpoint returned no results for every query attempted, including
  "Indigenous Knowledge", so the absence of a search hit is not evidence the report is absent.
  The URL-to-document mismatch is the evidence.
