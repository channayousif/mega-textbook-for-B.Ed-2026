# EFPG-402 Unit 5 - G4 translation handoff

Date: 2026-11-27. Producer: crew claude worker (job efpg-402-u05-translate). Source: English Unit 5 as of commit 67fd59bde.

## Delivered

- Seven Urdu files: index, topic-01 to topic-05, unit-assessment (10/10/5 bank, same option order, bounded answers section).
- Ten `.ur.svg` figures mirrored right to left, with derived dark twins. Vertical coordinates are stretched by 1.4 to give Nastaliq room, so the viewBox height differs from the English. In fig-U5-10 the rotated aisle label is set horizontally, and in fig-U5-4 and fig-U5-2 two row labels are shortened to fit the label column ("شاگرد", "سرگرمی").
- `translation_status` stays `draft`: G5 has not happened. The English index still shows the "untranslated" badge, as for Units 1 and 2.

## Checks

- With both index files temporarily `reviewed`, `check:content` reported only the two expected findings (G4 and G5 rows not done). Flags were restored to `draft`.
- `measure-figure-text` passes on all ten `.ur.svg`, with local and CI fonts; the figures were also rendered to PNG and looked at.
- Rendered Urdu pages (360px and A4 print) were NOT inspected: this job may not build the site.

## Proposed terms (not in terminology.csv, for the owner)

سبق کی منصوبہ بندی (lesson planning); وقفہ سوچ (wait-time); ادراکِ ذہنی (apperception); تیاری، پیشکش، تقابل اور ربط، تعمیم، اطلاق (Herbartian steps); دلچسپی ابھارنا، کھوج، وضاحت، توسیع، جانچ (5E phases); تدریسی مقاصد (instructional objectives); تعلیمی غایات / نصابی اہداف (aims / goals); مخاطب، طرزِ عمل، شرط، درجہ یا معیار (ABCD); سامان کا منتظم، مرکزی تفتیش کار، ڈیٹا ریکارڈر، حفاظت اور صفائی افسر (group roles); پوچھو، رکو، پکڑو، اچھالو (Pose-Pause-Pounce-Bounce); سمائی بخارات (transpiration).

## English points for the G3 reviewer (translated faithfully, not changed)

- Safety: the Topic 5.2 worked example (5E, Engage) has pupils taste samples ("lemon vs water") during a lesson whose trays hold unlabelled substances, including soap solution and vinegar. This should be removed from the English.
- The ERQ-04 rubric asks to transform "the atmospheric pressure lesson", but ERQ-04 names no such lesson (it looks carried over from the Topic 5.4 summative task).
- fig-U5-4 gives the Herbartian sequence without its fifth step, Application.
- fig-U5-9 and the Topic 5.5 timetable reserve 7 minutes for clean-up; the activity and the ERQ-05 rubric say 5 minutes.
- Topic 5.3 attributes a four-part ABCD framework to Mager (1962), while the figure, its alt text and Check-your-understanding Q1 speak of three components. The attribution needs checking against the source.
- RRQ-03 asks how each Herbartian step builds on the previous one, but its 5 marks reward only naming the steps in order.
