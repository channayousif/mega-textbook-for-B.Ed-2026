# Tasks: Feature 031 Social Updates

## PR 1: Core
- [x] T001 `scripts/social/updates.mjs`: collect (live feed, teaser ledger, merged and deployed feat PRs), copy, drafts, check, captions, ledger states, CLI.
- [x] T002 `scripts/social/card.mjs`: 1080x1350 brand card (EN and UR headlines, up to five highlights, Urdu lines when three or fewer).
- [x] T003 `scripts/social/publish.mjs`: public `social-cards` bucket upload, per-platform posting, retry-safe records.
- [x] T004 `social-post.mjs` image posts: Facebook photo, Instagram image, LinkedIn image.
- [x] T005 Tests: `tests/unit/social-updates.test.mjs`; isolation guard in `tests/unit/media-isolation.test.mjs`.
- [x] T006 Skill `social-updates`, media-studio pointer, spec, decision entry.

## PR 2: Crew
- [ ] T007 `scripts/crew/social.mjs`: `social_roundup` stage planned once a day at 18:00 PKT when there is something new; claude worker; one at a time.
- [ ] T008 Owner commands `crew social on|off|status`, `crew post <id>`, `crew reject-post <id> <note>`; board and digest lines for waiting feature posts.
- [ ] T009 Crew tests.

## PR 3: Pilot
- [ ] T010 Dry-run day rendered for the owner; first content roundup approved by the owner and posted on Facebook, Instagram and LinkedIn; ledger `pilot` set to false; `crew social on`.
