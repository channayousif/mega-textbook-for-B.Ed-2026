---
id: 0015
title: Deploy site replacing WordPress
stage: green
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 001-content-platform
command: deploy (manual request)
branch: 001-content-platform
user: channayousif@gmail.com
labels: ["deploy", "production", "hestia", "wordpress-replacement", "cloudflare"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/1
files:
 - docusaurus.config.ts (url=https://www.a2ahs.com, trailingSlash:true)
 - /home/a2ahs/web/a2ahs.com/public_html/ (docroot — WordPress replaced with static build)
tests:
 - "origin (10.0.0.150): homepage 200, deep link 200, no-slash 301→slash, /ur/ 200, /search/ 200, missing 404, wp-login.php 404"
 - "public via Cloudflare: www.a2ahs.com 200, serves B.Ed Mega Textbook, cf-cache-status DYNAMIC"
---

## Prompt

my live wordpress site is at ~/web/ on this server, replace the old website a2ahs.com with this deployment
(clarified: delete the old site — no backup needed; build for https://www.a2ahs.com; use Hestia CLI / has credentials)

## Response snapshot

Investigated first (read-only): HestiaCP-managed hosting; live docroot `~/web/a2ahs.com/public_html/` was a 1.2 GB WordPress install (1.1 GB wp-content, DB-backed) behind Cloudflare; `a2ahs.com` 301s to `www.a2ahs.com`; disk 93% full; `~/web/a2ahs.com/` is read-only to the user so `public_html` can't be renamed (only its contents changed); separate `pk.a2ahs.com` left untouched. Asked before the irreversible step; user said delete outright.

sudo requires a password (unavailable), so the Hestia CLI (`v-*`, root) could not be used — but file-level deploy works with the a2ahs user's write access to `public_html`.

Deploy: set `url=https://www.a2ahs.com` + `trailingSlash:true`, built (4.4 MB, both locales). Confirmed the target was the WP docroot (wp-config.php present), deleted all contents (`find -mindepth 1 -delete`, freed ~1.1 GB), copied `build/.` in, `chmod -R a+rX`. The existing nginx WP vhost serves the static site correctly — no template change needed.

Verified at the origin (nginx on 10.0.0.150, bypassing Cloudflare) and publicly through Cloudflare: homepage is the B.Ed textbook, deep links 200, no-slash → 301 to trailing slash, /ur/ + /search/ 200, missing paths + old wp-login.php 404. Cloudflare serves HTML as DYNAMIC (pass-through), so the new site is live immediately with no purge needed. DB left intact.

## Outcome

- ✅ Impact: https://www.a2ahs.com now serves the bilingual B.Ed textbook; old WordPress removed; site verified live end-to-end.
- 🧪 Tests: origin + public HTTP checks all pass (see tests block).
- 📁 Files: docusaurus.config.ts (prod URL), docroot contents replaced.
- 🔁 Next prompts (optional): purge Cloudflare cache if any stale asset appears; delete the now-unused WP MySQL DB + PHP pool via Hestia to reclaim resources; add a real `static/img/favicon.ico` (currently 404, cosmetic); set up an automated deploy (rsync build/ → docroot, or Vercel).
- 🧠 Reflection: Investigated and confirmed before an irreversible live-site change; trailingSlash:true made the static site work under the existing WP nginx vhost without root/Hestia changes.

## Evaluation notes (flywheel)

- Failure modes observed: sudo/Hestia CLI unavailable (no password) — worked around with user-level file deploy; origin only reachable via the private IP 10.0.0.150 (Cloudflare-fronted).
- Graders run and results (PASS/FAIL): origin + Cloudflare HTTP verification PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): script the deploy (`rsync -a --delete build/ ~/web/a2ahs.com/public_html/`) for repeatable content updates.
