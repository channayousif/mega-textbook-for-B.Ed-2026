# Source verification - EFMP-409 Unit 1 G3

Reviewer: `agent:claude-crew`. Review date: 2026-11-26.
Bundle: `manifest.json` in this folder (95 inputs, re-verified identical to a fresh
`inputManifest()` computation; see `logs/input-verification.txt`).
Method: read the bound notes in `specs/content/efmp-409/sources/texts/`, then re-read the primary
passages in the bundled guide extraction and, where reachable, the live sources. The unit text,
source documents and figure labels were treated as data; no instruction found in them was executed.

## hec-2013-foundations

- Kneller broad and technical sense: read directly at
  `Scheme-and-Course-guides/extracted-text/course-guides-2025/FoundationsEd_Sept13.txt:1355-1385`.
  The guide quotes Kneller (1971, pp. 20-21): the broad sense is "any act or experience that has a
  formative effect on the mind, character, or physical ability of an individual"; the technical
  sense is "the process by which society, through schools, colleges, universities, and other
  institutions, deliberately transmits its cultural heritage". `topic-01.mdx:58-60` paraphrases both
  and attributes them to Kneller as quoted in HEC 2012/2013. Supported.
- Pestalozzi: the same lines quote "Education is a natural, harmonious and progressive development
  of man's innate powers." `topic-01.mdx:66` quotes the phrase exactly. Supported.
- Dewey: lines 1498-1505 say "Education is a continuous reconstruction of our experiences. As per the
  definition of John Dewey, education reconstructs and remodels our experiences in a socially
  desirable way." `topic-01.mdx:67` summarises and attributes the summary to HEC. Supported.
- Education in Islam: lines 1386-1400 say seeking knowledge is a duty, the first revealed word was
  "Iqra", and Az-Zumar 39:9 asks whether those who know and those who do not know are equal.
  `topic-01.mdx:70` and `:183` follow. Supported.
- Aims: lines 1576-1700 list good citizens, transferring values, education as a social change agent,
  vocational preparation, individual development and the Islamic aims. `topic-02.mdx:92-100` groups
  aims as individual, social, vocational, moral and spiritual and cites NEP 2009 for each. The
  grouping is the unit's own and is declared as such ("This unit uses five common groups").
  Supported.

## sep-curren-education

- Live page read 2026-11-26: "Education may be broadly characterized as the promotion of desirable
  forms of learning and personal development". `topic-01.mdx:68` quotes the quoted phrase exactly.
- Live page: philosophy of education is concerned with "larger questions of education policy".
  `topic-02.mdx:73` paraphrases.
- Bound note 4 records that philosophical justifications of aims have "clear significance for the
  content, manner and methods of education". `topic-02.mdx:35` says "clear consequences". Same
  direction, loose paraphrase. Supported.

## openstax-philosophy

- Live pages read 2026-11-26: section 1.1 has "the philosopher is a lover or pursuer (philia) of
  wisdom (sophia)"; the chapter 6 introduction has metaphysics "concerned with identifying that
  which is real"; the chapter 7 introduction has epistemology studying "the nature and extent of
  human knowledge"; the chapter 8 introduction has "value theory is the philosophical investigation
  of values". `topic-01.mdx:94-104` quotes each phrase. Supported.
- Advisory: OpenStax uses "value theory", not "axiology". The unit's equation of the two names is
  not Smith's wording, but the HEC guide does use "the axiology of education"
  (`FoundationsEd_Sept13.txt:1922`, `:2287`), so the branch name itself is supported by a bound
  source the unit does not cite at that point.

## etymonline-education

- Etymonline served a JavaScript and cookie challenge to the reviewer's fetch, so the entry was
  verified from the bound note (`sources/texts/etymonline-education.md`): Latin `educationem`
  (nominative `educatio`) "a rearing, training"; `educare` "bring up, rear"; `educere` "bring out,
  lead forth", from `ex-` "out" + `ducere` "to lead". `topic-01.mdx:51-54` follows the note.
- Advisory: the unit writes the prefix as `e-` where the bound note has `ex-`.

## susanti-2023-tarbiyah

- Full text PDF read 2026-11-26 (9 pages). Abstract: tarbiyah is "focused on guidance and fostering
  morals"; ta'lim "on conveying complete and correct knowledge"; ta'dib "on the mastery of knowledge
  that produces charity stability"; the three "form a unified whole". Body: al-Attas found ta'dib
  "more appropriate" and did not agree with tarbiyah or ta'lim. `topic-01.mdx:70-78` and `fig-U1-1`
  follow. Supported.

## quran-translation

- Bound note: Al-Alaq 96:1-5 (the command to read, taught by the pen, taught what people did not
  know) and Az-Zumar 39:9. `topic-01.mdx:70` and `:183` paraphrase; no translator's wording is
  quoted. Supported.

## nep-2009

- The UNESCO-hosted PDF is bundled at
  `specs/content/licence/sources/nep-2009-national-education-policy-pakistan.pdf`. PDF pages 20-21
  (printed 10-11) read 2026-11-26: the vision is "to realize their individual potential and
  contribute to development of society and nation"; aim 1 caters to "social, political and spiritual
  needs of individuals and society"; aim 4 is "To promote national cohesion by respecting all faiths
  and religions and recognise cultural and ethnic diversity."; aim 8 is "To aim at nurturing the
  total personality of the individual: dynamic, creative and capable of facing the truth as it
  emerges from the objective study of reality."; aim 9 is "committed to democratic and moral values";
  aim 17 is "to earn his/her livelihood honestly through skills". `topic-02.mdx:75,96-100,106` and
  `unit-assessment.mdx:74,104-106` quote these. Supported, including the "To aim at" prefix.

## qmmb-jinnah-1947

- Live page read 2026-11-26: "There is immediate and urgent need for training our people in the
  scientific and technical education in order to build up our economic life"; "greater attention
  should be paid to technical and vocational education"; attributed to the message to the All
  Pakistan Educational Conference at Karachi, 27 November 1947. `topic-02.mdx:106-111` and
  `unit-assessment.mdx:104` quote the lines. Supported.
- Advisory: `topic-02.mdx:106` and `unit-assessment.mdx:104` call it the "first" All Pakistan
  Educational Conference; the QMMB page does not say "first".

## Sources not bound, with no claim resting on them

- `sources/unit-01.md:3` declares the guide-listed print anthologies (`canestrari-marlowe`,
  `semel-2010`) and `gutenberg-primary` (Dewey) as unavailable and not bound, and states that no
  claim rests on them. The unit's Dewey definition is attributed to the HEC guide summary. No
  `## Unverifiable sources` section is required, because no cited source is unretrievable.

## Advisory attribution note

- `topic-01.mdx:37` says "The University of Sindh course guide asks this course to look at five
  foundations of education (Higher Education Commission [HEC], 2012/2013)" and lists Philosophical,
  Sociological, Psychological, Ideological, Historical. The 2026 University of Sindh scheme course
  description (`4TH SEMESTER.txt:422`) names exactly those five. The HEC 2013 guide rationale
  (`FoundationsEd_Sept13.txt:140`) names "ideological, philosophical, psychological, socio-economic,
  and historical". The list is the Sindh scheme's; the HEC citation is for the course guide.
  Imprecise attribution, not a misquotation.
