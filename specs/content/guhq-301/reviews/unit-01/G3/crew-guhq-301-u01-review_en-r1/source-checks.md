# Source checks - GUHQ-301 Unit 1 G3 run 1

Retrieved 2026-11-28 from the live sources, independently of the bound excerpts.

## quran-translation (Quran.com API, translation 20, Uthmani text)

Fetched `https://api.quran.com/api/v4/verses/by_key/<surah:ayah>?translations=20&fields=text_uthmani`
for 1:1-2, 1:5, 2:2, 2:10, 2:20, 2:25, 2:32, 2:153, 2:156, 2:157, 2:183, 2:282, 2:286, 4:26,
12:2, 15:21, 18:18, 18:24, 69:41, 96:1, 96:4, 96:5, 103:3, 112:1-4. All HTTP 200. Checks:

- 12:2 "Indeed, We have sent it down as an Arabic Qur'an that you might understand." Exact.
- 38:29 "a blessed Book ... that they might reflect upon its verses". Exact.
- 47:24 "Then do they not reflect upon the Qur'an, or are there locks upon [their] hearts?" Exact.
- 54:17 "And We have certainly made the Qur'an easy for remembrance". Exact.
- 2:2 "a guidance for those conscious of Allah"; 1:5 "It is You we worship and You we ask for help".
  Exact.
- 2:10 ends "ʿadhābun alīm" (a painful punishment) and contains قُلُوبِهِم (hearts); 2:32 ends
  "innaka anta al-ʿalīm al-ḥakīm"; 18:18 contains وَكَلْبُهُم (their dog). Exact.
- 2:153 and 2:183 open with يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟; 2:153 spells the prayer word
  ٱلصَّلَوٰة (wāw before the ta marbuta). As the unit states.
- 2:183 كُتِبَ عَلَيْكُمُ ٱلصِّيَامُ ("decreed upon you is fasting"); root k-t-b. Exact.
- 2:282 contains كَاتِبٌ, فَٱكْتُبُوهُ, وَلْيَكْتُبْ and كَمَا عَلَّمَهُ ٱللَّهُ. Exact.
- 15:21 بِقَدَرٍ مَّعْلُومٍ ("a known [specified] measure"). Exact.
- 96:4 الَّذِي عَلَّمَ بِالْقَلَمِ; 96:5 عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ. Exact.
- 1:2 ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ; 1:1 the basmala. Surah 9 chapter metadata gives
  `bismillah_pre: false`.
- 112:1-4 end on أَحَدٌ, الصَّمَدُ, يُولَدْ, أَحَدٌ, all closing on the د sound.

## quranic-arabic-corpus (dictionary pages, HTTP 200)

- ʿ-l-m: "occurs 854 times in the Quran, in 14 derived forms"; ʿalīm 163, ʿilm 105, ʿallama 41,
  ʿālim 18, maʿlūm 11, muʿallam 1, ʿālamīn 73. Matches the unit.
- k-t-b: 319 in seven forms; kataba 49, kitāb 260, kātib 6, maktūb 1. Matches.
- r-ḥ-m: 339 in nine forms; raḥmat 114, raḥīm 116. Matches.

## yazar-batur-2025 (MDPI, CC BY 4.0)

`https://mdpi-res.com/d_attachment/religions/religions-16-01186/article_deploy/religions-16-01186.pdf`
(HTTP 200, 634141 bytes) read in full. Section 2.1 "The Symbolic Meaning of Ruins (al-At.lāl) and
Spatial Imagery" describes the deserted campsite of the beloved in Zuhayr, Labid and 'Antara; the
conclusion states a significant overlap in vocabulary, that pre-Islamic poetry portrays the world
as it is while the Qur'an embeds similar elements in a metaphysical and moral framework, and that
natural elements become signs (āyāt) and instruments of moral accountability. Supports U1-02 and
U1-03 and the ruins worked example.

## abdelfattah-2025-tajweed (arXiv:2509.00094)

Abstract retrieved from `https://export.arxiv.org/api/query?id_list=2509.00094` and
`https://arxiv.org/abs/2509.00094`: tajwid is enabled by "the rigorous recitation rules (Tajweed)
established through the efforts of Muslim scholars", and the Quran Phonetic Script encodes the
`ṣifāt` (articulation characteristics) of every phoneme. Supports the unit's description of tajwid
in U1-04. The unit does not claim the paper studies Urdu-speaking learners, and it does not.

## muallim-ul-quran

Not cited by the unit. The content spec records it as title-level only (`D-2026-0001`), and
`sources/unit-01.md` says so under `## Mapped-reading limits`. No prose claim rests on it.
