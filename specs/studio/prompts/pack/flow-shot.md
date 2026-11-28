# Flow shot prompts (v1, Feature 038 stage 5)

Use `specs/studio/flow/prompt-formula.md`. For each `[SKIT]` and visual beat in the approved script,
write one formula block per 8-second clip into the topic's `shots.csv` (copy of
`specs/studio/flow/shot-list.template.csv`).

```prompt
From the approved script.md, list every [SKIT] and visual beat as 8-second Flow clips. For each clip write one complete prompt block using specs/studio/flow/prompt-formula.md: paste each character's prompt-block.txt and the style token verbatim (never "same as before"), one action, one spoken line of at most 15 words attributed by name, the camera, the aspect (16:9 for the long video, 9:16 for a Short-only shot), and the AVOID line. Never ask for text, labels, logos or screenshots.
```
