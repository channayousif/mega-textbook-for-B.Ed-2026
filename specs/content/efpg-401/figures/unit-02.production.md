# EFPG-401 Unit 2 raster production

- Producer: Codex, built-in image generation and image editing tool, 2026-11-15.
- Approved scene prompts and English alt text: unchanged in `unit-02.md` and `unit-02.banner.md`.
- Generation augmentation: repository house style, Pakistani clothing, warm natural light, calm palette alongside teal, no readable writing, logos, maps, flags, scripture, calligraphy or sacred persons.
- Default Gemini route: both required topic and banner commands were attempted through `scripts/heavy.sh`. Both returned image quota exhaustion for `gemini-3.1-flash-image`, reset reported as `2026-11-17T11:00:06Z`. ADR-0029's Codex alternative completed production. No Gemini image was produced or accepted.
- Sources: generated PNGs staged locally in the ignored `figures/.staging/` directory, then processed through the repository generator's `--reuse-staging` optimisation route. Composition, vocabulary and pronunciation sources were resized to 1100 px before optimisation to preserve the 150 KB budget.
- Inspection: Codex inspected every generated source and every final WebP for the approved teaching point, alt-text agreement, dress, setting, anatomy, absence of readable text and absence of sacred imagery. This production inspection is not G3/G5 certification.

| Figure | Inspection result |
|---|---|
| fig-U2-11 | Accepted: mango presentation, shared story reading with a finger following the page, poem clapping, paired sound practice and independent writing all visible. |
| fig-U2-12 | Accepted: closed textbooks and copied translation contrast with the woodcutter picture, open books, silent reading and raised hands; mentor at doorway. The woodcutter is an ordinary story character, with no sacred person shown. |
| fig-U2-13 | Accepted: stiff choral recitation contrasts with expressive reading, rain at the window, rhythm tapping and a pupil drawing of puddles and wet streets. |
| fig-U2-14 | Accepted: blank-page uncertainty contrasts with paired picture discussion, supported paragraph writing and individual writing; village picture includes mud houses, buffalo, canal and wheat. |
| fig-U2-15 | Accepted: eyes-closed list memorisation contrasts with a real black umbrella, picture card, paired speaking and notebook writing. |
| fig-U2-16 | Initial output rejected: duplicate trainee in the practice panel and unclear lip position. Three targeted edits removed the duplicate and clarified upper-teeth contact with the lower lip, with rounded lips in the wordless chart and paired practice. Final output accepted after inspection. |

All writing is blurred or indistinct. No maps, flags, logos, readable scripture, calligraphy, prophet, companion, angel or other sacred person appears. Both locales reuse the same WebP; Urdu page alt descriptions are translations of the approved English descriptions. No SVG was authored or edited.

The existing topic 2.5 story names Peshawar while its approved scene prompt describes a generic school of the kind found across Sindh. Production preserves that approved contract and names no city in the image. Any editorial reconciliation remains with the content owner.
