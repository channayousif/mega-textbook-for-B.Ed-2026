# Long-form script (v1, Feature 038 stage 3)

Input: `topic.json`, approved `angle.md`, the cast (`specs/studio/characters/`). Output: `script.md` in
`specs/studio/packs/<course>/unit-NN/topic-NN/`. Writer: Claude. The owner approves the script (and its
sha256 is recorded) before any Flow credits are spent (FR-016). `scripts/media/pack/metadata.mjs` reads
the front matter and the `## ` blocks; `highlights.mjs` reads the `[SHORT-CANDIDATE]` tags.

Output shape:

```markdown
---
titles:
  - "<at most 60 characters>"
  - "<...>"
  - "<...>"
summary: "<2-3 sentences for the description>"
tags:
  - "<keyword>"
thumbnail_text:
  - "<at most 4 words>"
pinned_comment: "<a question that invites a classroom answer>"
platform_captions:
  youtube: "<...>"
  instagram: "<... plus 3-5 hashtags>"
  tiktok: "<...>"
  facebook: "<...>"
  linkedin: "<written for teacher educators>"
---

## <Hook title>
Narrator: <0-30 s: a problem, a surprising fact from the page, or a classroom scene; then the promise>

## <Roadmap>
Narrator: <at most 15 s naming the 3-5 blocks; these become chapters>

## <Block 1 title>
[SHORT-CANDIDATE] hook: <one line that works as the first words of a Short>
Narrator: <explain>
Example: <from the page>
In class: <application>
Common mistake: <and the fix>
[SKIT] Sami: "<one line>" / Noor: "<one line>"     (pattern interrupt, at most 15 words a line)
[ON-SCREEN] <key term or short phrase for a caption card>

## <Block 2 ...>

## Recap
Narrator: <30-60 s, the key takeaways>

## Call to action
Narrator: Free notes, the slide deck and the mind map for this topic are on textbook.com.pk.
```

```prompt
Write script.md for an 8-20 minute lesson video from topic.json and the approved angle.md, in the shape above, following ../_common.md "Content Pack v2 audience".
Rules: no logo or greeting before the hook; one concept per block, and each block must make sense alone because it becomes a Short; a pattern interrupt every 60-90 seconds (a skit with the cast, a quick quiz question, a screenshot walkthrough, a visual analogy); skits use only Noor, Sami, Lena and Zara as described in their profile.yaml, never present a character as a real or credentialed expert, and keep each line at most 15 words; one soft call to action at the end only; every factual claim traceable to topic.json or its sources; no answers to the topic's self-check or summative questions; no long dashes.
```
