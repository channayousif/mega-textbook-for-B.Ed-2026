# Concept graph - EFMP-305 Unit 6 (Collaboration and Parental Involvement)

Per `specs/016-concept-graph-v4/contracts/concept-graph.md`. The fourth per-unit governance table,
beside `coverage/unit-06.md`, `sources/unit-06.md` and `figures/unit-06.md`. Those record what the
unit covers, what grounds it and what it shows; this records **what a learner must understand, and in
what order**.

`Topic` values are the `### Topic list` labels in `specs/content/efmp-305/content-spec.md`
(`## Unit 6`). `Assessment item IDs` are **derived** from `unit-assessment.mdx`'s existing numbering
under its three bank headings - no prose was changed to create them. The bank is built so that MCQ
and RRQ items 1 to 3 serve Topic 6.1, items 4 to 7 serve Topic 6.2 and items 8 to 10 serve Topic 6.3,
which is why no restricted item is claimed by concepts in two topics. ERQ 1 to 3 take one topic each,
ERQ 4 integrates the unit and ERQ 5 integrates the whole course, so those last two are claimed by
concepts across topics by design.

**Urdu labels.** These are authored here and carry a G5 flag: a governance file is not published
prose, so it never passes the EN/UR parity gate and nothing else would catch a poor label.

**Cross-unit prerequisites.** The gate requires every `Prerequisites` entry to be a concept in *this*
unit, so genuine cross-unit dependencies are recorded here in prose instead of in the column. This is
the closing unit and it has more of them than any other. Classroom culture (`CON:EFMP-305-6-1`)
depends on Unit 2's stigma (`CON:EFMP-305-2-7`), because a culture is where stigma either operates or
stops, and on Unit 4's inclusive classroom environment, whose social layer it is. Perspective-taking
(`CON:EFMP-305-6-9`) depends on Unit 3's cooperative learning structures, which it reuses as a culture
tool rather than reteaching. The second loop of the attitude-action cycle (`CON:EFMP-305-6-8`) depends
directly on Unit 5's attitude-action cycle (`CON:EFMP-305-5-21`) and is meaningless without it. Help
as a task rather than a charge (`CON:EFMP-305-6-11`) depends on Unit 1's integration-inclusion
distinction, which is what the botched buddy system reproduces. The shared support plan
(`CON:EFMP-305-6-24`) depends on Unit 5's s. 9 school duties (`CON:EFMP-305-5-19`) and on Unit 5's
monitoring duty (`CON:EFMP-305-5-17`), which its evidence column discharges. Barrier with an owner and
a cost (`CON:EFMP-305-6-27`) depends on Unit 5's four levels of a gap (`CON:EFMP-305-5-27`) and
extends it; the written escalation (`CON:EFMP-305-6-34`) is Unit 5's, reused unchanged. Shared classroom design
(`CON:EFMP-305-6-30`) depends on Unit 3's differentiation and Unit 4's accessibility,
which are the two places the reader has already seen a barrier removed by design. Unit 6's `index.mdx`
states these dependencies as prerequisite knowledge, unit by unit.

**Terminology note.** Five labels below use pairs already banked in
`specs/content/terminology.csv`: Inclusive education `شمولیتی تعلیم` (inside the IEP label), Attitude
`رویہ`, Peer Group `ہم عمر گروہ` (inside the buddy-rota label), Collaborative Learning `باہمی تعلم`
(inside the structured-contact label) and Individual Differences `انفرادی اختلافات`. The remaining
labels are **new to this course and not yet banked**. They are proposed for banking in the
[TEX-77](/TEX/issues/TEX-77) handoff rather than written into `terminology.csv` here, for CurriculumOwner and G5 consideration. ADR-0021 decouples terminology data from the
style-guide freeze; the bank remains authoritative wherever it supplies a term. Proposed labels
here await review and do not override it.

Five are judgement calls worth the reviewer's attention. **Classroom culture** is rendered
`جماعتی ماحول کا چلن` rather than the calque `جماعتی ثقافت`, because `ثقافت` in ordinary Urdu means
culture in the ethnic or artistic sense and would mislead badly here; `چلن` carries the sense of what
is customarily done, which is exactly the unit's definition. **Empathy** is rendered `ہمدردی` with a
caution: `ہمدردی` also carries "sympathy", and the unit's whole argument distinguishes the two, so the
G4 translator must keep the English term in parentheses on first use and must render the
perspective-taking gloss (`دوسرے کی جگہ خود کو رکھ کر دیکھنا`) in the sentence that defines it.
**Class charter** is rendered `جماعتی عہد نامہ`, with `عہد نامہ` chosen over `چارٹر` so that the
signing, which is the point, reads as a commitment rather than a wall display. **Buddy rota** is
rendered `ساتھی باری نامہ`; `ساتھی` is companion rather than carer, which is the distinction the
concept exists to draw. **Shared support plan** is rendered `مشترکہ معاونت منصوبہ`, deliberately not
`انفرادی تعلیمی منصوبہ`, which is the natural Urdu for IEP: the two must stay distinct in Urdu because
Topic 6.2's argument is precisely that they are different documents.

| Concept ID | Label EN | Label UR | Prerequisites | Topic | SLO refs | Assessment item IDs |
|---|---|---|---|---|---|---|
| CON:EFMP-305-6-1 | Classroom culture as what reliably happens | جماعتی ماحول کا چلن: جو واقعی ہوتا ہے | - | 6.1 | SLO:EFMP-305-6-1 | MCQ-01, RRQ-01 |
| CON:EFMP-305-6-2 | Who speaks | کون بولتا ہے | CON:EFMP-305-6-1 | 6.1 | SLO:EFMP-305-6-1 | MCQ-01 |
| CON:EFMP-305-6-3 | Who is chosen | کس کو چنا جاتا ہے | CON:EFMP-305-6-1 | 6.1 | SLO:EFMP-305-6-1 | RRQ-02, ERQ-01 |
| CON:EFMP-305-6-4 | Who is helped, and how | کس کی مدد ہوتی ہے، اور کیسے | CON:EFMP-305-6-1 | 6.1 | SLO:EFMP-305-6-1 | RRQ-03, ERQ-01 |
| CON:EFMP-305-6-5 | What happens when someone fails | غلط جواب پر کیا ہوتا ہے | CON:EFMP-305-6-1 | 6.1 | SLO:EFMP-305-6-1 | MCQ-01, ERQ-01 |
| CON:EFMP-305-6-6 | Empathy as a teachable skill, not a trait | ہمدردی ایک سیکھنے کی مہارت، پیدائشی خصلت نہیں | CON:EFMP-305-6-1 | 6.1 | SLO:EFMP-305-6-1 | MCQ-02, RRQ-01 |
| CON:EFMP-305-6-7 | Climate, empathy and attitude: association rather than causation | ماحول، ہمدردی اور رویہ: تعلق، سبب کا ثبوت نہیں | CON:EFMP-305-6-6 | 6.1 | SLO:EFMP-305-6-1 | MCQ-02 |
| CON:EFMP-305-6-8 | The class is watching the teacher's decisions | جماعت استاد کے فیصلے دیکھ رہی ہے | CON:EFMP-305-6-2, CON:EFMP-305-6-5 | 6.1 | SLO:EFMP-305-6-1 | ERQ-01 |
| CON:EFMP-305-6-9 | Perspective-taking as a task with an output | دوسرے کی جگہ خود کو رکھنا: ایک کام، نہ کہ اپیل | CON:EFMP-305-6-6 | 6.1 | SLO:EFMP-305-6-1 | ERQ-01 |
| CON:EFMP-305-6-10 | Class charter | جماعتی عہد نامہ | CON:EFMP-305-6-1 | 6.1 | SLO:EFMP-305-6-1 | RRQ-02 |
| CON:EFMP-305-6-11 | Help as a task, not a charge over a person | مدد ایک کام ہے، کسی فرد کی ذمہ داری نہیں | CON:EFMP-305-6-4 | 6.1 | SLO:EFMP-305-6-1 | MCQ-03, RRQ-03 |
| CON:EFMP-305-6-12 | Buddy rota, and the minder it is not | ساتھی باری نامہ، اور نگران جو یہ نہیں ہے | CON:EFMP-305-6-11 | 6.1 | SLO:EFMP-305-6-1 | MCQ-03, RRQ-03, ERQ-01 |
| CON:EFMP-305-6-13 | Parental involvement spans a range | والدین کی شرکت کے مختلف درجے | - | 6.2 | SLO:EFMP-305-6-2 | RRQ-04 |
| CON:EFMP-305-6-14 | Apparent indifference is a conclusion about the school | بے پروائی کا گمان: اسکول کے بارے میں خاندان کا نتیجہ | CON:EFMP-305-6-13 | 6.2 | SLO:EFMP-305-6-2 | MCQ-05, RRQ-04, ERQ-02 |
| CON:EFMP-305-6-15 | School-made barriers to involvement | شرکت کی وہ رکاوٹیں جو اسکول نے بنائی ہیں | CON:EFMP-305-6-14 | 6.2 | SLO:EFMP-305-6-2 | MCQ-06, RRQ-04 |
| CON:EFMP-305-6-16 | Families' views can be mixed | خاندانوں کی رائے ملی جلی ہو سکتی ہے | CON:EFMP-305-6-14 | 6.2 | SLO:EFMP-305-6-2 | ERQ-02 |
| CON:EFMP-305-6-17 | Who actually raises the child | بچے کی اصل پرورش کون کرتا ہے | - | 6.2 | SLO:EFMP-305-6-2 | MCQ-04, ERQ-02 |
| CON:EFMP-305-6-18 | First-contact protocol | پہلے رابطے کا طریقہ | CON:EFMP-305-6-15, CON:EFMP-305-6-17 | 6.2 | SLO:EFMP-305-6-2 | MCQ-04, ERQ-02 |
| CON:EFMP-305-6-19 | The four questions | چار سوال | CON:EFMP-305-6-18 | 6.2 | SLO:EFMP-305-6-2 | RRQ-05, ERQ-02 |
| CON:EFMP-305-6-20 | A non-literate communication channel | بغیر لکھے پڑھے پیغام کا راستہ | CON:EFMP-305-6-15 | 6.2 | SLO:EFMP-305-6-2 | ERQ-02 |
| CON:EFMP-305-6-21 | Collaboration is co-planning, not a handover | اشتراک: مشترکہ منصوبہ بندی، سپردگی نہیں | - | 6.2 | SLO:EFMP-305-6-2 | ERQ-04 |
| CON:EFMP-305-6-22 | Withdrawal and the twenty-nine other days | بچے کو باہر لے جانا، اور باقی انتیس دن | CON:EFMP-305-6-21 | 6.2 | SLO:EFMP-305-6-2 | MCQ-07, ERQ-04 |
| CON:EFMP-305-6-23 | Watch, then plan, then brief work | پہلے دیکھو، پھر منصوبہ، پھر مختصر کام | CON:EFMP-305-6-21 | 6.2 | SLO:EFMP-305-6-2 | MCQ-07, RRQ-06 |
| CON:EFMP-305-6-24 | Shared support plan, held by the class teacher | مشترکہ معاونت منصوبہ، جماعت کے استاد کے پاس | CON:EFMP-305-6-19, CON:EFMP-305-6-23 | 6.2 | SLO:EFMP-305-6-2 | RRQ-06, ERQ-02 |
| CON:EFMP-305-6-25 | The IEP as a working document, not a legal artefact | انفرادی تعلیمی منصوبہ (IEP): کام کی دستاویز، قانونی کاغذ نہیں | CON:EFMP-305-6-24 | 6.2 | SLO:EFMP-305-6-2 | RRQ-07 |
| CON:EFMP-305-6-26 | The team that already exists in the building | وہ ٹیم جو پہلے ہی اسکول میں موجود ہے | CON:EFMP-305-6-24 | 6.2 | SLO:EFMP-305-6-2 | ERQ-04 |
| CON:EFMP-305-6-27 | Barrier with a level, an owner and a cost | رکاوٹ: سطح، ذمہ دار اور لاگت کے ساتھ | - | 6.3 | SLO:EFMP-305-6-3 | MCQ-08, RRQ-08 |
| CON:EFMP-305-6-28 | "Lack of resources" is not a barrier | "وسائل کی کمی" رکاوٹ نہیں | CON:EFMP-305-6-27 | 6.3 | SLO:EFMP-305-6-3 | RRQ-08, ERQ-05 |
| CON:EFMP-305-6-29 | A barrier with no owner inside the school | وہ رکاوٹ جس کا ذمہ دار اسکول میں کوئی نہیں | CON:EFMP-305-6-27 | 6.3 | SLO:EFMP-305-6-3 | RRQ-10 |
| CON:EFMP-305-6-30 | Inclusion is design, not attention | شمولیت ترتیب سے ہوتی ہے، توجہ سے نہیں | CON:EFMP-305-6-27 | 6.3 | SLO:EFMP-305-6-3 | MCQ-09, ERQ-03 |
| CON:EFMP-305-6-31 | The resource that scales is the children | وہ وسیلہ جو جماعت کے ساتھ بڑھتا ہے: بچے خود | CON:EFMP-305-6-30 | 6.3 | SLO:EFMP-305-6-3 | MCQ-09, ERQ-03 |
| CON:EFMP-305-6-32 | The doubling test | دُگنا کرنے کی جانچ | CON:EFMP-305-6-31 | 6.3 | SLO:EFMP-305-6-3 | MCQ-10, RRQ-09, ERQ-03 |
| CON:EFMP-305-6-33 | The free list and the money list | مفت فہرست اور خرچ والی فہرست | CON:EFMP-305-6-27 | 6.3 | SLO:EFMP-305-6-3 | RRQ-08, ERQ-05 |
| CON:EFMP-305-6-34 | Escalate in parallel, never instead | تحریری درخواست ساتھ ساتھ، بدلے میں نہیں | CON:EFMP-305-6-33 | 6.3 | SLO:EFMP-305-6-3 | ERQ-05 |
| CON:EFMP-305-6-35 | The six design steps | منصوبہ بنانے کے چھ مرحلے | CON:EFMP-305-6-31, CON:EFMP-305-6-32 | 6.3 | SLO:EFMP-305-6-3 | ERQ-03 |
| CON:EFMP-305-6-36 | Universal structure, specific scheduling | ترتیب سب کے لیے، باری مخصوص افراد کے لیے | CON:EFMP-305-6-35, CON:EFMP-305-6-12 | 6.3 | SLO:EFMP-305-6-3 | ERQ-03 |
| CON:EFMP-305-6-37 | Three rings: room, school, beyond the gate | تین حلقے: کمرہ، اسکول، اسکول سے باہر | CON:EFMP-305-6-33, CON:EFMP-305-6-26 | 6.3 | SLO:EFMP-305-6-3 | ERQ-04, ERQ-05 |
| CON:EFMP-305-6-38 | The teacher-sized portion, and Monday | استاد کے حصے کا کام، اور پیر کا دن | CON:EFMP-305-6-37, CON:EFMP-305-6-34 | 6.3 | SLO:EFMP-305-6-3 | ERQ-05 |

## Authored Urdu labels for G5 review

Thirty-three of the thirty-eight labels above are authored rather than banked. They are listed here so
a G5 reviewer can check them as a set rather than hunting them in a table.

- Classroom culture as what reliably happens - جماعتی ماحول کا چلن: جو واقعی ہوتا ہے
- Who speaks - کون بولتا ہے
- Who is chosen - کس کو چنا جاتا ہے
- Who is helped, and how - کس کی مدد ہوتی ہے، اور کیسے
- What happens when someone fails - غلط جواب پر کیا ہوتا ہے
- Empathy as a teachable skill, not a trait - ہمدردی ایک سیکھنے کی مہارت، پیدائشی خصلت نہیں
- Climate, empathy and attitude: association rather than causation - ماحول، ہمدردی اور رویہ: تعلق، سبب کا ثبوت نہیں
- The class is watching the teacher's decisions - جماعت استاد کے فیصلے دیکھ رہی ہے
- Perspective-taking as a task with an output - دوسرے کی جگہ خود کو رکھنا: ایک کام، نہ کہ اپیل
- Class charter - جماعتی عہد نامہ
- Help as a task, not a charge over a person - مدد ایک کام ہے، کسی فرد کی ذمہ داری نہیں
- Buddy rota, and the minder it is not - ساتھی باری نامہ، اور نگران جو یہ نہیں ہے
- Parental involvement spans a range - والدین کی شرکت کے مختلف درجے
- Apparent indifference is a conclusion about the school - بے پروائی کا گمان: اسکول کے بارے میں خاندان کا نتیجہ
- School-made barriers to involvement - شرکت کی وہ رکاوٹیں جو اسکول نے بنائی ہیں
- Families' views can be mixed - خاندانوں کی رائے ملی جلی ہو سکتی ہے
- Who actually raises the child - بچے کی اصل پرورش کون کرتا ہے
- First-contact protocol - پہلے رابطے کا طریقہ
- The four questions - چار سوال
- A non-literate communication channel - بغیر لکھے پڑھے پیغام کا راستہ
- Collaboration is co-planning, not a handover - اشتراک: مشترکہ منصوبہ بندی، سپردگی نہیں
- Withdrawal and the twenty-nine other days - بچے کو باہر لے جانا، اور باقی انتیس دن
- Watch, then plan, then brief work - پہلے دیکھو، پھر منصوبہ، پھر مختصر کام
- Shared support plan, held by the class teacher - مشترکہ معاونت منصوبہ، جماعت کے استاد کے پاس
- The team that already exists in the building - وہ ٹیم جو پہلے ہی اسکول میں موجود ہے
- Barrier with a level, an owner and a cost - رکاوٹ: سطح، ذمہ دار اور لاگت کے ساتھ
- "Lack of resources" is not a barrier - "وسائل کی کمی" رکاوٹ نہیں
- A barrier with no owner inside the school - وہ رکاوٹ جس کا ذمہ دار اسکول میں کوئی نہیں
- Inclusion is design, not attention - شمولیت ترتیب سے ہوتی ہے، توجہ سے نہیں
- The resource that scales is the children - وہ وسیلہ جو جماعت کے ساتھ بڑھتا ہے: بچے خود
- The doubling test - دُگنا کرنے کی جانچ
- The free list and the money list - مفت فہرست اور خرچ والی فہرست
- Escalate in parallel, never instead - تحریری درخواست ساتھ ساتھ، بدلے میں نہیں
- The six design steps - منصوبہ بنانے کے چھ مرحلے
- Universal structure, specific scheduling - ترتیب سب کے لیے، باری مخصوص افراد کے لیے
- Three rings: room, school, beyond the gate - تین حلقے: کمرہ، اسکول، اسکول سے باہر
- The teacher-sized portion, and Monday - استاد کے حصے کا کام، اور پیر کا دن

## Translator instructions that are not optional

This unit is the one most likely to be damaged by a fluent but loose Urdu rendering, because its
argument turns on distinctions that polite Urdu tends to collapse. Four instructions for the G4
translator, and four things a G5 reviewer should treat as defects rather than style choices.

1. **Keep `ہمدردی` and sympathy apart.** The unit's claim is that empathy is a practisable skill, not
   a warm feeling. Where the English says empathy, the Urdu must not drift into `رحم` or `ترس`, both
   of which import pity. Keep **empathy** in parentheses on first use and carry the
   perspective-taking gloss in the defining sentence.
2. **Do not soften "the family did not fail, the school did".** Topic 6.2's opening and its
   misconception section assign responsibility to the school in plain terms. Urdu has many ways to
   make that deferential and vague. Every one of them destroys the argument, and a rendering that
   leaves the reader thinking the families were at fault after all is a failed translation, however
   graceful.
3. **Keep the statutory terms in English on first use.** Six terms from Unit 5 recur here: inclusive
   education, person with disabilities, discrimination, reasonable accommodation, non-discrimination
   and accessibility. A reader who later meets the Act itself or a departmental circular will meet
   the English words. This applies inside figure labels too.
4. **Keep `مشترکہ معاونت منصوبہ` and `انفرادی تعلیمی منصوبہ` distinct.** Topic 6.2 exists partly to
   separate the shared working plan this course recommends from the IEP a Pakistani school is not
   required to produce. A translator who renders both with the same phrase has deleted the topic's
   argument.

A fifth point, on register rather than accuracy. The eight-item Monday list that closes the course is
the most important passage in the unit for a reader who will act on it. It must read as instructions
to a competent colleague, in the imperative, short, and without honorifics or hedging. If it reads as
advice or as exhortation in Urdu, retranslate it.
