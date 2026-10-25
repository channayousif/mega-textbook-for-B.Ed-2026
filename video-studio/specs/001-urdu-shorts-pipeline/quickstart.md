# Quickstart - making one short in the Studio (after the build)

Target: ~20 minutes of your time per episode.

```bash
cd video-studio
npm run studio        # opens http://127.0.0.1:4310
```

1. **Home → New episode** - pick a topic (filter by section, read the Urdu page in the side panel) → **Draft script**.
2. **Script** - edit Urdu lines inline, check the duration meter and reviewer badges → **Approve script**.
3. **Voices** - for each line card: follow the locked voice card shown (e.g. Copy text → open the voice tool → generate, or read the line to the narrator) → drop the file on the card. Listen; replace any line with a wrong pronunciation (flag it to improve the lexicon).
4. **Visuals** - only if the script has B-roll/illustrations: Copy prompt → Open Flow/Gemini → generate → drop on the shot card → pick the best take.
5. **Preview** - watch the whole short in the player, nudge any caption → **Approve assets**.
6. **Render** - click Render, check the audit table → **Approve render**.
7. **Publish** - copy title/description per platform, download video + cover, upload, tick the AI label, paste back the post URLs.

Terminal fallback: every step also works with the `/video-*` commands in Claude Code.

## Weekly rhythm (suggested)
Monday: draft and approve 3 scripts · Tuesday: one voices/visuals session for all 3 · Wednesday: render and schedule Wed/Fri/Sun posts.
