---
id: 20261266
title: LinkedIn posts start early, approved posts frozen, career repo merged and pushed
stage: general
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: none
branch: docs/phr-linkedin-posts
user: M Yousif Channa
command: none
labels: [board-direct, career, linkedin, social]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/775
files:
  - ~/career main (commits 5124ac7 merge, 2e6dc7a, 47e11ca; pushed): build/posts.py, scripts/crew/{post-stages,career,review}.mjs, tests/posts.test.mjs, .claude/skills/linkedin-posts/SKILL.md, README.md, data/posts/2026-W49.yaml
  - history/prompts/general/20261265-linkedin-personal-branding-posts.general.prompt.md (renumbered from 20261264, which main already used)
  - history/prompts/general/20261266-linkedin-posts-start-early-and-freeze-approved.general.prompt.md
tests:
  - career: node --test tests/*.test.mjs (15 pass), uv run pytest -q (44 pass), build/posts.py --week 2026-W49 --text ok
  - live: P-1 posted to LinkedIn (urn:li:share:7531168821672579072); first comment refused 403
---

## Prompt

yes push it and open the PR

merge the career branch too

approved on the link you sent me on discord, start posting from now, push all  on github

## Response snapshot

Pushed the PHR branch and opened PR #775. Merged feat/linkedin-posts into ~/career main. On "start posting from now": found that a P-2 revise job (c14, agy) had also rewritten P-1 (sketch to photo-quote with a new quote) and P-3 (text to photo) after the owner approved them, because the photo minimum turned from warning to error once his photos arrived. Restored P-1 and P-3 to the approved versions, made revise jobs keep to their own post (the crew splices back anything else), made the photo minimum a warning once any post is approved, and changed planning from "Saturday, next ISO week" to "a seven-day block from the day after the last scheduled post, three days ahead", so a mid-week start leaves no gap. Shifted 2026-W49 to 25 Nov - 1 Dec, re-rendered the review page, posted P-1 now, and pushed ~/career.

## Outcome

- ✅ Impact: the owner's first personal-branding post is live; one post a day follows at its evening time; P-2 waits for his approval of its latest revision.
- 🧪 Tests: 15 node + 44 pytest pass; P-1 posted; the first-comment call returns 403 with the current token scope.
- 📁 Files: career repo (see files); two PHRs in this PR.
- 🔁 Next prompts: owner approves P-2 on the review page before 26 Nov 17:48 PKT; pastes P-1's first comment; decide whether to request LinkedIn comment permission or keep pasting first comments.
- 🧠 Reflection: a rule that changes from warning to error mid-week pushed an AI revise job into editing approved posts; approved content needs a hard guard, not only a brief.

## Handoff (for CEO and agents)

- Shipped / changed: ~/career main merged and pushed (private repo). Live LinkedIn post P-1 on the owner's personal profile. Review page for 2026-W49 republished (same link). Textbook repo: only these PHRs.
- Decisions the team must respect: approved posts are frozen; a posts_revise job changes only its named post; photos that arrive mid-block go into the next block. Posting started 2026-11-25 at the owner's request, so blocks no longer start on Mondays (files keep ISO-week labels).
- Pending / next owner: owner to approve P-2; owner to paste first comments while the token lacks comment permission (LinkedIn returns 403 ACCESS_DENIED on socialActions comments with scope w_member_social); the uncommitted scripts/crew/workers.mjs change in ~/career (opencode replaced by claude_crew) is not ours and was left unpushed; renew the crew's Claude sign-in before 2026-11-27.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: verify_posts passed a revise that touched other posts; PHR ID collision with a concurrent session (20261264).
- Graders run and results (PASS/FAIL): career node tests PASS; career pytest PASS; live post PASS; first comment FAIL (403).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): after the next revise job, confirm the crew log shows no "changes outside" line, or that it put changes back.
