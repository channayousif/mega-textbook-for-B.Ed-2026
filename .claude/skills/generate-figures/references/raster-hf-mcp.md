# Raster illustrations — the Hugging Face MCP route + the fallback (generate-figures)

A `Kind: illustration` figure needs pictorial depth a flat SVG can't give (a real scene, people,
a place). It is generated as a raster, optimised to WebP, and committed under
`static/img/figures/<course-lowercase>/unit-NN/<figId>.webp`. **Most figures are not this** —
default to `diagram` (`svg-authoring.md`); reach for raster only when the figure genuinely can't
be carried by shapes + labels.

## Owner-side setup (one time, not committed)

The image generator is an MCP server the **owner** configures in *their* Claude Code MCP
settings — it is never in the repo, and the skill never assumes a specific tool name.

```jsonc
// ~/.claude.json  (or a project .mcp.json) — owner-side, NOT committed, no secret in git
"mcpServers": {
  "huggingface": {
    "type": "http",
    "url": "https://huggingface.co/mcp",
    "headers": { "Authorization": "Bearer ${HF_TOKEN}" }
  }
}
```

Then at `huggingface.co/settings/mcp` the owner either adds an image Space —
`black-forest-labs/FLUX.1-Krea-dev` (photoreal), `Qwen/Qwen-Image` (strong text rendering) — or
turns on **Dynamic Spaces** so a Space can be discovered at run time. Free HF account credits
cover the volume (a few images per unit).

## The skill's run-time flow

1. **Detect** a connected MCP tool that maps a text prompt → an image. The name varies by Space
   (often surfaced as a `gr_*` / Space-derived tool). Do **not** hardcode a name — inspect the
   available tools and pick the one whose schema takes a prompt and returns an image URL/handle.
2. **Call it** with:
   - `prompt` = the marker's generation prompt, verbatim, optionally suffixed with
     ", flat editorial illustration, high contrast, no text labels baked in" so any words stay in
     the page's `alt`/caption, not fried into pixels.
   - an **aspect** hint from the prompt (`landscape` ≈ 3:2, `portrait` ≈ 2:3, `square` ≈ 1:1).
3. **Fetch the result in this same turn** — exactly as `author-unit` uses `WebFetch` — to a temp
   path (e.g. `specs/content/<course>/figures/.staging/<figId>.png`). The committed `scripts/*.mjs`
   never make a network call; the fetch is an agent-turn action.
4. **Optimise into place** — this is where budget is enforced:
   ```
   npm run optimize:figure -- <tmp-raster> static/img/figures/<course-lowercase>/unit-NN/<figId>.webp
   ```
   `optimize-figure.mjs` resizes the longest edge to ≤ 1600 px, encodes WebP q80, and
   **exits non-zero if the result exceeds 150 KB**. On failure: re-generate at a smaller size or
   a simpler composition — do not raise the budget, do not commit the raw file.
5. Proceed to `placement.md` (marker → `<Figure src="/img/…/<figId>.webp">`) and
   `bilingual-figures.md` (the UR `<Figure>` reuses the same `.webp` with a translated `alt`).

## Fallback — no image tool connected

This is a **first-class path, not an error**. Write / update
`specs/content/<course-lowercase>/figures/unit-NN.brief.md`:

```markdown
# Figure generation brief — <COURSE> Unit N

Illustration figures awaiting a raster. Generate each with any image tool (an HF Space, ChatGPT,
Gemini), then drop the file at the exact path below and re-run `generate-figures`.

## fig-U1-2  →  specs/content/<course-lowercase>/figures/.staging/fig-U1-2.png
- **Aspect**: landscape (3:2)
- **Prompt**: <the marker prompt, verbatim>
- **Target**: static/img/figures/<course-lowercase>/unit-01/fig-U1-2.webp (the skill runs optimise)
```

- Leave that figure's manifest row at `Status: prompt-only` (nothing is generated yet) and its
  topic-file marker in place.
- Tell the owner the brief is written and which figures are waiting.
- **Still render every `diagram` figure in the same run** — the diagram route does not depend on
  any tool being connected.

## Ingesting a staged raster

When `specs/content/<course-lowercase>/figures/.staging/<figId>.<ext>` exists on a re-run, treat
it as the step-3 temp file: run `optimize:figure` on it into `static/…/<figId>.webp`, then place.
`.staging/` is git-ignored (`.gitignore`: `specs/content/**/figures/.staging/`).

## Why not a committed generator script

A `scripts/generate-figures.mjs` calling an image API with a key in `.env.local` was rejected: it
would be the repo's first network-calling script (every existing `scripts/*.mjs` is offline),
needs a paid key, and couples CI-adjacent tooling to a third-party endpoint. The generation call
lives in the skill's agent turn instead — same posture as `author-unit`'s `WebSearch`/`WebFetch`.
