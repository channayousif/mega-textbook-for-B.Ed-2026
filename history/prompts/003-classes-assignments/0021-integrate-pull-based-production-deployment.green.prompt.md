---
id: 0021
title: Integrate pull-based production deployment
stage: green
date: 2026-07-20
surface: agent
model: claude-fable-5
feature: 003-classes-assignments
branch: main
user: channayousif@gmail.com
command: null
labels: [ci-cd, deployment, cron, hestiacp, cloudflare, pull-based]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/4
files:
  - scripts/deploy-prod.sh (new — the deployer itself)
  - .github/workflows/deploy.yml (push trigger removed from dead Pages fallback)
  - ~/deploy/mega_book (dedicated deploy clone, outside git)
  - ~/deploy/mega_book/.env.local (URL + anon key only — verified no service key)
  - user crontab (new — */5 deploy tick)
tests:
  - "First deploy executed for real: 3a5cc25 built in the clone and rsynced to the docroot in ~100s; Spec 003 pages verified live through Cloudflare (en 200, /ur/ 200 with dir=rtl)"
  - "CI gate verified in design: queries the ci.yml workflow run by head_sha (not check-run names, which collide with the Pages workflow's own `build` job)"
  - "Autonomy test in progress at time of writing: commit 49da974 expected to reach production via cron alone once its CI completes"
---

## Prompt

Analyze CI/CD pipeline, intigrate deployment on my live site on this machine.

## Response snapshot

Analyzed the pipeline and the actual production serving chain by tracing, not assuming:

- ci.yml (PRs + main) is a solid quality gate: content validation, answer-key
  safety, unit tests, bilingual build, RLS tests against the live Supabase,
  full Playwright e2e vs a served production build, soft Lighthouse budget.
- deploy.yml (GitHub Pages fallback) failed on every push to main — Pages was
  never enabled (404) and the repo is private. Pure red noise.
- Nothing deployed to real production. The live chain turned out to be:
  Cloudflare -> HestiaCP host nginx (10.0.0.150:443) -> Apache ->
  /home/a2ahs/web/a2ahs.com/public_html. Every prior release was a manual
  copy of build/ into that docroot; Spec 003 was merged but NOT live.
- Found a vestigial `serve build -l 3050` process from Jul 18 that nothing
  routes to (the vhost proxies 8080/8443, not 3050) — killed it.
- Constraints gathered before designing: repo is PRIVATE (self-hosted runner
  would be safe), sudo needs a password (I can't install services), 56 GB free.

Presented two designs and asked; user chose the recommended pull-based cron:

- scripts/deploy-prod.sh (versioned in the repo): every 5 min, fetch
  origin/main; if the SHA is new AND its ci.yml workflow run succeeded
  (queried by workflow file + head_sha — deliberately NOT by check-run name,
  because deploy.yml has a colliding job also named `build`), reset a
  dedicated deploy clone (~/deploy/mega_book — never the dev working tree,
  whose build/ is clobbered by test builds), npm ci + build, sanity-check
  the output (en + ur + app/classes index files present), then
  rsync --delete into the docroot. flock single-flight, log rotation,
  self-update-safe (all logic in main(), git renames not in-place writes).
- The clone's .env.local carries only the two client-side build values;
  verified zero SERVICE matches.
- deploy.yml push trigger removed (workflow_dispatch kept), with the comment
  rewritten to document the real production path.
- Cron installed (*/5). First deploy run for real: 3a5cc25 live in ~100s;
  verified through Cloudflare that /app/classes/ (en) and /ur/app/classes/
  (RTL) return 200 with real content — Spec 003 is now in production.
- Committed the deployer + workflow cleanup to main as 49da974, which doubles
  as the autonomy test: that commit should reach production via cron alone
  once its CI goes green (watcher running at time of writing).

## Outcome

- ✅ Impact: www.a2ahs.com now has CI-gated continuous deployment from
  origin/main with zero manual steps; Spec 003 went live as the first
  deploy; the perpetually-failing Pages fallback no longer reddens every
  merge; a vestigial orphan server process is gone.
- 🧪 Tests: first real deploy verified live through Cloudflare (both locales,
  RTL intact); autonomy loop (49da974 via cron) being verified in background.
- 📁 Files: 1 new script, 1 workflow edited, deploy clone + crontab created
  outside git.
- 🔁 Next prompts: consider an ADR for the deployment architecture decision
  (pull-based cron vs self-hosted runner vs SSH-push — real alternatives,
  long-term consequences, cross-cutting); optionally a Cloudflare cache purge
  step if stale-HTML windows ever matter.
- 🧠 Reflection: the most important discovery wasn't the design but the
  as-is state — production was a hand-copied docroot three commits behind,
  fronted by infrastructure (HestiaCP + Cloudflare) that nothing in the repo
  documented, plus an orphaned server process that LOOKED load-bearing (it's
  what I'd assumed served prod earlier in this session) but had zero traffic
  routed to it. Tracing the real serving chain before designing prevented
  automating a deploy to the wrong target.

## Evaluation notes (flywheel)

- Failure modes observed: (1) check-run-name collision between workflows
  would have made a naive CI gate pass/fail on the wrong workflow — caught
  at design time by remembering deploy.yml's job names; (2) the dev working
  tree's build/ is routinely overwritten by test builds, so deploying from
  it would ship whatever was last tested locally — hence the dedicated clone.
- Graders run and results (PASS/FAIL): first deploy — PASS (live-verified
  through Cloudflare, not just rsync exit code). Autonomy test — pending at
  write time; watcher will confirm.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): if the 5-minute latency ever
  chafes, swap the cron for a GitHub webhook -> tiny local listener, or a
  self-hosted runner — the script's CI-gate/build/rsync core stays identical
  under any trigger mechanism.
