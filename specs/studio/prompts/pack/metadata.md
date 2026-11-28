# Metadata pass (v1, Feature 038 stage 9)

Run `node scripts/media/pack/metadata.mjs draft <course> <unit> <topic> --words <long>.en.words.json`,
then fix every item it lists, then `metadata.mjs check`.

```prompt
Complete metadata.json for this pack from script.md, topic.json and the transcript. Keep the three titles from the script front matter unless check reports a problem. Chapters: one per script block, timed from the transcript, the first at 00:00, at least 10 seconds apart. Per short: a hook line of at most 90 characters that teaches something on its own. Sources: the topic's further reading as listed. Keep the disclosure line exactly as metadata.mjs sets it. No long dashes, no all-caps words, no claims beyond the page.
```
