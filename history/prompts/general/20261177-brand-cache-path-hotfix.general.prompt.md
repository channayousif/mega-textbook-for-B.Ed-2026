---
id: 20261177
title: Serve kit v2 brand files from a new path so caches drop the v1 logo
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/brand-cache-path
user: M Yousif Channa
command: none
labels: [board-direct, redesign, brand, hotfix]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/kit/ (copies of static/img/brand/ and the social card)
  - docusaurus.config.ts
  - src/theme/Navbar/Logo/index.tsx
  - src/theme/NotFound/Content/index.tsx
  - static/site.webmanifest
  - video-studio/brand/brand-bible.yaml
tests:
  - npm run build
---

## Prompt

main logo https://textbook.com.pk/img/brand/horizontal-color.svg is still the older one

## Response snapshot

The server already returned the v2 file at that URL (checked with curl: amber step, teal t, last-modified 2026-11-08), but static images are served with cache-control max-age=2592000, and the v2 logos reused the v1 file names, so browsers and Cloudflare edges that had the v1 file keep it for up to 30 days. Fix: copy the brand folder to static/img/kit/ (and the social card to static/img/kit/social-card.png) and point every reference on main at the new path: favicon, touch icon, manifest icons, social card, navbar logos, footer logo, 404 mark and the video brand bible. PR 6 (#490) merged meanwhile, so its AuthFrame moved to /img/kit/ in the same change and the old static/img/brand/ and static/img/social-card.png are removed.

## Outcome

- ✅ Impact: every visitor gets the v2 logo on the next page load, without a cache purge.
- 🧪 Tests: build, see PR.
- 📁 Files: new kit folder and six reference updates.
- 🔁 Next prompts: PR 7 (staff screens) after this.
- 🧠 Reflection: replacing a long-cached asset under the same URL never reaches returning visitors; new assets need new URLs.

## Handoff (for CEO and agents)

- Shipped / changed: brand assets now live at /img/kit/.
- Decisions the team must respect: when an image changes, give it a new path or name; the 30-day cache means same-name replacements stay stale for returning visitors and at Cloudflare.
- Pending / next owner: none.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: v2 brand files reused v1 names under a 30-day cache.
- Graders run and results (PASS/FAIL): see PR.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
