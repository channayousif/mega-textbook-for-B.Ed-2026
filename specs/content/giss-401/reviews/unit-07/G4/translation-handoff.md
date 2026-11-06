# GISS-401 Unit 7 Urdu translation handoff

Translator: Claude (crew job giss-401-u07-translate). Date: 2026-11-06. This is a G4 draft handoff, not a G5 review.

## Baseline and delivered mirror

English source commit: `c01a4ed7b872eac784bf0385ce0f51901aa2f51a`, directory `docs/semester-3/giss-401/unit-07/`. The English G3 is advisory and unsigned (escalated, with repairs requested), so this baseline is gate-checked (`G2 en-draft`), not accepted. A later English edit, including the G3 repairs listed below, invalidates the G5 dependency and needs a matching Urdu edit.

Mirror path, resolved with `resolveUnit()`: `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-07/`. Translated `index.mdx`, `topic-01.mdx` and `unit-assessment.mdx`. The English unit has no teacher-notes page.

Added `fig-U7-1` to `fig-U7-3` as `.ur.svg` with derived `.ur.dark.svg`. Each `<desc>` equals its page `alt` (checked by script). English pages, English assets, manifest rows, the terminology bank and the tracker are unchanged.

`translation_status` remains `draft` on every page because G5 has not happened. Translate-unit Step 7 forbids appending a G4 tracker row, so the brief's "record the G4 tracker row as the skill says" is met by this handoff, as in Units 1, 3 and 4. The Unit 7 `G4 ur-translation` row stays open.

## Decisions a G5 reviewer should check

- **Qur'an and hadith quotations are Urdu renderings of the unit's English quotations, made by this translator.** They are not taken from a published Urdu translation, and no scholar has checked them. An Islamic Studies reviewer should check every quoted phrase: 2:44, 3:159 (two phrases), 4:58, 4:135, 16:90, 17:34, 23:8, 28:26, 33:21, 42:38, 61:2, 61:3 and 68:4, plus *Sahih al-Bukhari* 893. The paraphrases of 33 and of the other cited verses need the same check. Alternatively the owner can name an Urdu translation to quote.
- **Source statement adapted.** English `index.mdx` says short quotations "are from the Saheeh International translation". That is untrue of Urdu text, so the Urdu says their Urdu sense is taken from the Saheeh International English translation on Quran.com. The Unit 1 mirror keeps the literal claim; the two units now differ. `Saheeh International` stays in Latin here, as a citation, where Unit 1 writes it in Urdu script.
- **MCQ 1 reworded to avoid revealing the answer.** *Amanah* and "trust" are the same Urdu word, امانت. Option ب therefore reads "بھروسے پر سونپی ہوئی چیز، اور قابلِ بھروسا ہونے کی خوبی", so the stem's word is not repeated in the key. The first definition in Topic 7.1 and answer 1 use the same wording. G5 should confirm this keeps the item's demand.
- **"Justice (adl)"** is انصاف (*عدل*) in the list heading and fig-U7-2, to avoid "عدل (عدل)". Elsewhere justice is عدل, or انصاف where the English is the everyday word fairness.
- **Guardian and wards.** "All of you are guardians and responsible for your wards" is ”تم سب نگہبان ہو اور اپنے زیرِ نگہبانی لوگوں کے ذمہ دار ہو“. The word رعیت was avoided for register. It should be checked against a scholarly rendering, along with the *ra'i* and shepherd gloss that the G3 report also sends to a scholar.
- **Gender choices the English does not force:** the Mirpurkhas cousin is feminine (کزن with feminine agreement, in a girls' school); "nephew" is بھتیجا, though Urdu could also use بھانجا; the chosen teacher in the summative case is استانی. "Her own relative" in MCQ 7 and the teacher with a hospitalised child in ERQ 2 keep the masculine default, because the English leaves gender open. The self-assessment checklist uses the masculine default, matching the Unit 1 mirror.
- **Figure headings** add موضوع before "7.1" for reading in RTL. The English reads "7.1 ...".
- **Figure wording is shortened** where a label had to fit: "rumours" row reads افواہ کی تصدیق, "no gifts for favour" reads رعایت کے لیے تحفہ نہیں, and "(trust)" in fig-U7-1 reads سونپی ہوئی ذمہ داری.

## English issues preserved, not fixed

Translation does not repair the English. These need an English revision job or an owner ruling. All five are open findings in the G3 advisory report, `specs/content/giss-401/reviews/unit-07/G3/01a1b093-4435-7a02-a21d-e78212bba060.json`; the first three are blocking there:

1. ERQ 2 asks for an evaluation and an overall judgement, but its rubric gives 3 of 12 marks to "Practical advice", which the question does not ask for.
2. MCQ 10 is tagged Apply, but it only recalls the next taught step; the scenario does not affect the answer.
3. The duty-roster table's "Hard cases" row and the Mercy row of fig-U7-2 tell staff why a teacher with a sick parent gets relief, without consent. Any repair changes the Urdu page, `fig-U7-2.ur.svg` and its dark twin as well.
4. Advisory: the role-modelling passages and summaries say actions teach more than words categorically, and the Urdu keeps that force. Tambak and Sukenti's correlations do not establish it.
5. Advisory: the fig-U7-2 alt names the values but not each school example. The Urdu alt mirrors that.

## Terminology

The frozen bank was not edited. `key_terms` declares only bank-accepted terms, and the temporary `reviewed` run reports no key-term finding. The unit has no `<Glossary>` calls. `Attention` appears only as everyday "paying attention" in a distractor, so it is translated توجہ and left out of `key_terms`.

Proposed terms for the curriculum owner, absent from the bank:

| English | Urdu used |
|---|---|
| Amanah / trust | امانت |
| Trustworthiness | امانت داری |
| Ethics | اخلاقیات |
| Code of conduct | ضابطۂ اخلاق |
| Educational leadership | تعلیمی قیادت |
| Role model, role modelling | عملی نمونہ، عملی نمونہ بننا |
| Guardian (ra'i) | نگہبان (*راعی*) |
| Consultation (shura) | مشاورت (*شوریٰ*) |
| Justice (adl) | انصاف / عدل (*عدل*) |
| Mercy | رحم |
| Accountability | جواب دہی |
| Hypocrite | منافق |
| Cooperating teacher | معاون استاد / استانی |
| Head teacher | ہیڈ ٹیچر |
| Duty roster | ڈیوٹی روسٹر |
| Invigilation | امتحانی نگرانی |
| Subject coordinator | مضمون کا رابطہ کار |
| Flowchart, concept map | فلو چارٹ، تصوراتی نقشہ |

The seven authored concept labels in `concepts/unit-07.md` informed the prose and remain proposals for G5.

## Validation and limits

- `npm run check:content`, draft state: 14 of 14 pass, recorded in `content-gates.txt`.
- Temporary `reviewed` flip of both `index.mdx` files: only the expected findings, recorded in `conditional-parity-gates.txt`: the open G4 and G5 rows in `check:pipeline-gate`, and `check:content-status`, which is stale because of the flip itself. Both files were reverted to `draft` and the revert was confirmed.
- Scripted source parity: heading vectors, numbered items, bullets, table rows, checklist items, figure counts, bold and italic markers, verse references and all other numerals in the page bodies match English on all three pages.
- All three pages compile with `@mdx-js/mdx`. `figures:variants:check` passes.
- The MCQ key maps position for position: ب، الف، ج، ب، ب، ج، الف، ج، د، الف. This is a translator check, not an independent answer run.

**Not run, because the crew brief bars builds, dev servers and Playwright:** `npm run build`, `scripts/render-inspect.mjs --locale ur` and `scripts/measure-figure-text.mjs`, which launches Chromium. So there is no browser geometry measurement and no rendered inspection of the Urdu pages at narrow width or in A4 print. AGENTS.md requires `measure-figure-text` to exit 0 for changed SVG text, and CI's `figure-geometry` job will be its first real run. MDX compilation does not replace the Docusaurus build. A permitted session must do all of this before anyone claims the Urdu is rendered and ready.

Figures were inspected only through serial Sharp previews under `scripts/heavy.sh`, using Noto Nastaliq Urdu with CSS variables resolved in a scratch copy, and two preview faults were fixed (a stranded Urdu comma in fig-U7-1 and tight line spacing).

## Figure notes

- Tspan anchors that `scripts/mirror-figure-rtl.mjs` adds inside middle-anchored text were removed after mirroring, as in Unit 3. The parent `<text>` keeps the anchor.
- SVG text has a left-to-right base direction, so lines that start with a digit or bracket, or end in a bracket or Urdu comma, carry an invisible U+200F so that numbering and punctuation stay on the correct side. Check this in the browser pass.
- Geometry and viewBox are inherited, with horizontal positions mirrored. Text keeps the existing font sizes. Baselines moved a few pixels and line spacing grew to about 22-24px for Nastaliq.
