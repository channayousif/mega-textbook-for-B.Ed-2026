# Flow kit (Feature 038, Stage 3)

- `prompt-formula.md`: the per-shot formula, rules, mode table and a worked example.
- `shot-list.template.csv`: copy to `specs/studio/packs/<course>/unit-NN/topic-NN/shots.csv`; one row per take.
- `credit-log.csv`: one row per generation session; `running_total` is the cycle's spend.
- `library.md`: prompts that worked, clip naming, Flow feature notes.

Clips go through the existing producers: `gflow.video` on davinci first, `manual.flow` as the fallback
(`scripts/media/producers/`), paced by `scripts/media/pacing.mjs` in media hours.
