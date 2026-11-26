# Limitations - GENT-401 Unit 1 G3 review

1. **Render and print inspection not performed.** Deployed SHA
   `366019f8ace647e892523e553b81ab6d1832ec68` differs from reviewed HEAD
   `6a810e62c7b9d4ff7643b56a17f75cb9db2ce98e` on the unit English directory and
   figure folder, so the production build is not the reviewed input. The brief
   forbids building, serving or running Playwright e2e from a review job. The
   `accessibility` criterion is therefore unverified and the report escalates.
2. **No parent-prepared frozen handoff or runtime provenance was supplied.** The
   manifest was prepared locally over a clean tree and re-verified against a fresh
   `inputManifest()` computation (93 inputs, 0 mismatches). The author identity is
   taken from `history/prompts/gent-401/crew-gent-401-u01-author.green.prompt.md`.
3. **Model version.** The exact deployment build is not exposed to the session; the
   report records the model identity as `Claude Code (model identity LongCat-2.5;
   exact deployment version unavailable)` rather than inventing a version string.
4. **Urdu mirror and `.ur.svg` variants are G5 scope.** They exist and are bound only
   for G5; this G3 review did not evaluate them as content.
5. **No new external retrieval.** The bound excerpts were read; no live fetch of
   OpenStax, Butler, Saeed or the IEA page was attempted from this review. Claims are
   judged against the bound passages, as the contract requires.
6. **Edition year.** The `butler-iea` 2020 year is the content-spec's and is not
   independently confirmed here; the author discloses this in `sources/unit-01.md`.
7. **Advisory only.** No certification, signature, tracker done row, registry change,
   `translation_status` change or publication is claimed.
