# Pack angle (v1, Feature 038 stage 2)

Input: `topic.json` (from `scripts/media/pack/intake.mjs`). Output: `angle.md` in the topic's pack folder.
Writer: Claude. Follow `../_common.md` "Content Pack v2 audience".

```prompt
You are planning one long-form lesson video and its Shorts for teachers worldwide, from the topic in topic.json.
Write angle.md with these sections:
1. Search phrasing: 5 ways teachers worldwide would search for this topic (e.g. "Bloom's taxonomy explained"), most common first. Use your knowledge of common phrasing only; do not quote search volumes.
2. Promise: one sentence, "By the end you'll be able to ...", built from the topic's learning outcomes.
3. Gap: what typical videos on this topic miss that this topic page covers (classroom application, a common mistake, large-class reality).
4. Title options: 5 titles, each at most 60 characters, promise or question first, keyword early, no all-caps.
5. Blocks: 3-5 teaching blocks in the page's order, each with one concept, one example from the page, one classroom application, one common mistake.
6. Short ideas: one per block, naming the Short type (concept in 30 s, common mistake, myth vs fact, quick quiz, classroom scenario, exam or licence tip, before/after) and its first spoken line.
Every claim must be traceable to topic.json or one of its sources; mark any you cannot trace and drop it.
```
