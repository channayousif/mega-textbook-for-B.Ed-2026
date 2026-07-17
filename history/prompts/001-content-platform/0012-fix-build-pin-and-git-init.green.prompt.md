---
id: 0012
title: Fix build pin and git init
stage: green
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 001-content-platform
command: /sp.implement (follow-up)
branch: 001-content-platform
user: channayousif@gmail.com
labels: ["build-fix", "docusaurus", "webpack", "git", "github"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - package.json
 - docusaurus.config.ts
 - specs/001-content-platform/research.md
 - .gitignore (verified)
tests:
 - "validate:content PASS; vitest 10/10 PASS (after clean 3.10.2 reinstall)"
 - "dev server: all EN+UR routes HTTP 200 (/, unit EN, course, /ur/, unit UR)"
 - "docusaurus build (SSG): still FAILS — sandbox vm/eval require.resolveWeak"
---

## Prompt

try a different docusaurus version pin now, configure gitignore and create github repo and add as remote origin

## Response snapshot

**Build pin investigation** — diagnosed the real cause of the earlier build failures:
- Two Docusaurus cores in the tree (search-local 0.55.2 pulled @docusaurus/*@3.10.2 while I'd pinned 3.8.1) → the `webpack ProgressPlugin` schema error (webpackbar 6 vs 7 / webpack mismatch). Fixed by unifying to a single coherent version.
- Tried coherent 3.10.2, 3.8.1, 3.7.0, 3.6.3 (+ webpack 5.95 override, + search removed to isolate). The `ProgressPlugin` error is resolved by coherent 3.10.2 (webpackbar7+webpack5.108 match). The `require.resolveWeak is not a function` error persists **identically on every version**, thrown from `@docusaurus/core/lib/ssg/ssg.js` → `eval` → `runInNewContext` — i.e. the sandbox's Node vm context, not a version/content issue.
- **Positive verification**: settled on clean coherent **3.10.2 + search re-enabled**; `npm run start` compiles the client and serves **every route EN+UR with HTTP 200** (`/`, `/semester-1/efmp-301/`, `/semester-1/efmp-301/unit-01/`, `/ur/`, `/ur/.../unit-01/`). validate:content green + vitest 10/10 after the clean reinstall. Only the static SSG export is blocked (env). Documented in research.md status note.

**gitignore**: verified — node_modules/.docusaurus/build excluded, package-lock.json correctly tracked.

**GitHub**: `gh` CLI and GH/GITHUB token both absent → cannot create the repo from here. Made the initial commit (all source + SDD artifacts; node_modules excluded) and created `main` alongside `001-content-platform` (both at 7261b2a). Flagged that Scheme-and-Course-guides/ holds copyrighted PDFs → recommended a **private** repo. User chose: they will create the empty repo and provide the URL; visibility **private**. Awaiting URL to `git remote add origin` + push.

## Outcome

- ✅ Impact: Build failures root-caused; app proven to compile and serve all bilingual routes via dev server; repo initialized and commit-ready.
- 🧪 Tests: validate:content PASS, vitest 10/10 PASS, dev routes 200; SSG static export still env-blocked.
- 📁 Files: package.json (coherent ^3.10.2, no overrides), docusaurus.config.ts (search re-enabled), research.md (refined status note); initial git commit + main branch.
- 🔁 Next prompts: user pastes private-repo URL → add remote + push main & feature branch. Then resolve SSG in real CI, run Playwright e2e (can target dev server), add font binary (T005), search-index exclusion (T026), polish (T038–T042).
- 🧠 Reflection: The ProgressPlugin error was a genuine version-coherence bug worth fixing; resolveWeak proved environmental after four version attempts, so I pivoted to dev-server verification rather than burning more cycles.

## Evaluation notes (flywheel)

- Failure modes observed: dependency incoherence from a plugin pinning a different Docusaurus minor (dual core → webpackbar/webpack mismatch); sandbox vm/eval lacking webpack's require.resolveWeak at SSG.
- Graders run and results (PASS/FAIL): validate:content PASS; vitest PASS (10/10); dev routes PASS (200); SSG build FAIL (env).
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): run `docusaurus build` in a standard Linux CI (GitHub Actions ubuntu-latest) to confirm SSG succeeds outside the sandbox vm.
