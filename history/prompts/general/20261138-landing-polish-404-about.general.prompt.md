---
id: 20261138
title: Polish before the redesign, 404 and About wording
stage: general
date: 2026-11-07
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/polish
user: M Yousif Channa
command: none
labels: ["board-direct", "ux", "polish"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/464
files:
  - src/theme/NotFound/Content/index.tsx
  - src/theme/NotFound/Content/styles.module.css
  - src/theme/DocItem/Content.tsx
  - src/pages/about.mdx
  - i18n/ur/docusaurus-plugin-content-pages/about.mdx
  - supabase/functions/guest-feedback-submit/index.ts
  - tests/e2e/not-found.spec.ts
tests:
  - tests/e2e/not-found.spec.ts (2 passed)
  - npm run check:all (19 of 20 passed; check:content-status passed after regenerating the git-ignored file)
---

## Prompt

redesign the frontend creatively using my new kit and generate new graphics, icon packs, svgs, raster images, animations, @/home/a2ahs/mega_book_for_B.Ed/video-studio-sdd-ri (2).zip

## Response snapshot

Step 0 of the approved redesign plan: shipped the uncommitted polish work first so nothing is lost. A friendlier 404 with next steps, accessible names on self-assessment checkboxes, About wording that drops "MVP" (English and Urdu), and the guest-feedback email now says textbook.com.pk. The redesign itself is on the design canvas and is not in this PR.

## Outcome

- ✅ Impact: small corrections on public pages; no redesign and no brand change.
- 🧪 Tests: e2e 2 of 2. Gates 19 of 20 on the run; the 20th was a stale git-ignored file that passes once regenerated. CI runs the full set.
- 📁 Files: 7 plus this record.
- 🔁 Next prompts: owner sign-off on the v2 design boards, then PR 1 (brand foundation).
- 🧠 Reflection: scripts/heavy.sh on origin/main has no pressure admission; that check exists only as an uncommitted edit in the main checkout.

## Handoff (for CEO and agents)

- Shipped / changed: the polish items above, in this PR only. Nothing is deployed until the owner merges.
- Decisions the team must respect: the redesign (logo kit v2) waits for owner sign-off on the canvas. The 404 still uses the v1 book mark until the brand PR replaces it. The email change takes effect only when the guest-feedback-submit edge function is deployed.
- Pending / next owner: owner reviews and merges this PR. Owner decides whether to commit the admission-gated scripts/heavy.sh and AGENTS.md edits now in the main checkout.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a local build took about 7 hours with the host mostly idle and steady I/O wait, cause not confirmed; an earlier build log ended mid-compile while reporting exit 0.
- Graders run and results (PASS/FAIL): tests/e2e/not-found.spec.ts PASS; check:all 19 PASS, 1 FAIL then PASS on rerun.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): find out why local builds are so I/O-bound on this host.
