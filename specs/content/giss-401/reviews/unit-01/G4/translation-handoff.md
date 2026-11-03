# GISS-401 Unit 1 Urdu translation handoff

Translator: Codex. Date: 2026-11-03. English baseline: `ee21e1a43a5fcc61ed6a96ce0b43b8020a6af12a` (also `origin/main` at translation start). The branch had no earlier commits or working changes.

## Delivered bundle

The complete Urdu mirror contains `index.mdx`, `topic-01.mdx`, `topic-02.mdx` and `unit-assessment.mdx`, resolved with `resolveUnit()` and `urPathFor()` into the pre-service Urdu plugin directory. The English unit has no teacher-notes page. All worked examples, classroom cases, activities, checklists, topic mini-rubrics, citations, further reading and the 10 MCQ / 10 restricted-response / 5 extended-response assessment bank, including the final public guidance section, are translated. Option positions, reference numbers, mark allocations and cognitive demands are preserved.

Four `.ur.svg` schematics are wired to the same figure IDs, with translated titles, descriptions and labels, Nastaliq-first fonts and reflected reading order. Four `.ur.dark.svg` files are derived with the repository variant generator. Original English figure prompts, alt text, assets and manifest rows are unchanged.

`translation_status` remains `draft` throughout the final bundle. This is a translation draft, not a G5 review or certification. The translate-unit skill's Step 7 expressly forbids appending a G4 tracker row, so the existing open G4 and G5 rows are unchanged. No human initials or signatures have been supplied. The brief's request to record G4 "as the skill says" is implemented as this handoff, without contradicting that explicit prohibition.

## Terminology working set

The frozen bank remains unchanged. The Urdu index declares bank-conforming entries for Learning (سیکھنا), Assessment (تشخیص), Formative Assessment (تشکیلی تشخیص), Summative Assessment (مجموعی جائزہ), Punishment (سزا), Memory (یادداشت), Personality (شخصیت), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ), and Professional Ethics (پیشہ ورانہ اخلاقیات). These cover the matching bank terms in the English unit and its translated assessment language. There are no Glossary component calls in this unit to resolve against `glossary.json`.

The ten Urdu concept labels in `concepts/unit-01.md` supplied the Islamic Studies working vocabulary. The following unbanked subject terms and phrases used in the translation are proposals for the curriculum owner, not additions to the bank:

| English term | Proposed Urdu |
|---|---|
| Islam | اسلام |
| Muslim | مسلمان |
| Freely chosen submission to Allah | اللہ کی رضاکارانہ اطاعت |
| Islamic Studies | اسلامیات |
| Branches of Islamic Studies | اسلامیات کی شاخیں |
| Scope | دائرۂ مطالعہ |
| Islamic education | اسلامی تعلیم |
| Complete code of life | مکمل ضابطۂ حیات |
| Din | دین |
| Qur'an | قرآن |
| Sunnah | سنت |
| Ulum al-Qur'an | علوم القرآن |
| Tafsir | تفسیر |
| Ulum al-Hadith | علوم الحدیث |
| Aqidah / Aqaid | عقیدہ / عقائد |
| Fiqh | فقہ |
| Usul al-Fiqh | اصولِ فقہ |
| Seerah | سیرت |
| Islamic history | اسلامی تاریخ |
| Akhlaq | اخلاق |
| Islamic social, economic and political thought | اسلامی معاشرتی، معاشی اور سیاسی فکر |
| Comparative religion | تقابلِ ادیان |
| Tauheed | توحید |
| Oneness in lordship / Rububiyyah | ربوبیت میں وحدانیت / ربوبیت |
| Oneness in names and attributes / Asma wa Sifat | ناموں اور صفات میں وحدانیت / اسماء و صفات |
| Oneness in worship / Uluhiyyah | عبادت میں وحدانیت / الوہیت |
| Shirk | شرک |
| Risalat | رسالت |
| Prophethood | نبوت |
| Rasul / Nabi | رسول / نبی |
| Revelation | وحی |
| Finality of prophethood | ختمِ نبوت |
| Akhirat / Hereafter | آخرت |
| Accountability | جواب دہی |
| Day of Judgement | روزِ قیامت |
| Articles of faith | ایمان کے ارکان |
| Iman | ایمان |
| Iman-e-Mujmal | ایمانِ مجمل |
| Iman-e-Mufassal | ایمانِ مفصل |
| Divine decree / Taqdir | تقدیر |
| Human responsibility | انسانی ذمہ داری |
| Khalifah | خلیفہ |
| Trustee / trust | امانت دار / امانت |
| Halal / haram earning | حلال / حرام کمائی |
| Consultation | مشاورت |
| Worship | عبادت |
| Wudu / rak'ah / kalimah | وضو / رکعت / کلمہ |
| Salat / zakat / saum / hajj | نماز / زکوٰۃ / روزہ / حج |
| Riba | سود |

## Validation and limits

- Initial `npm run check:content` on the unchanged baseline passed all 13 gates.
- A source comparison checked identical file sets, metadata invariants, heading-level vectors, component counts, figure-ID order and numbered-item counts. All four Urdu MDX bodies compile with `@mdx-js/mdx`.
- All ten Urdu MCQs were solved from their wording; their option positions agree with the translated final guidance. This is a translator consistency check, not independent G5 evidence.
- Both index statuses were temporarily set to `reviewed` to exercise conditional parity, terminology and Urdu figure checks, then restored to `draft`. The only expected pipeline findings are the open G4/G5 rows. The generated content-status report was regenerated for the temporary state and again after restoration.
- SVG optimisation keeps each localised source below 20 KB. Dark-variant freshness passes. Sharp previews with resolved palette tokens were produced serially under `scripts/heavy.sh` and inspected: Urdu text shapes, tables read from the right, labels remain within their panels, and all four teaching schematics are nonblank. Preview images are scratch material under `.crew/`, not review certification artifacts.
- The crew brief prohibits builds, dev servers and Playwright. Consequently browser text measurement (`measure-figure-text.mjs`), narrow-viewport Urdu page inspection and A4 print inspection were not run. Sharp previews do not establish browser geometry or page-level RTL/print correctness. A permitted validation session must complete these before G5 acceptance.

## Next owner

An independent qualified Islamic Studies reviewer must settle G3 for this English baseline. A fresh G5 reviewer must compare every passage, translated scriptural quotation, label and assessment item and inspect actual rendered Urdu at desktop, narrow width and A4 print. The curriculum owner owns banking the proposed terminology. No doctrinal change or source correction was made in translation. G3/G5 and publication remain open.

Final draft-state `npm run check:content`: all 13 gates pass, matching the clean `origin/main` baseline with no additional findings. The complete conditional-state run passes every gate except the two expected open G4/G5 pipeline findings. Logs are retained beside this handoff as `content-gates.txt`, `conditional-parity-gates.txt` and `source-parity.txt`. The drafting-and-checking wall-clock interval was approximately 12 minutes (from creation of the resolved mirror path to the handoff); browser checks were deferred rather than counted as completed work.
