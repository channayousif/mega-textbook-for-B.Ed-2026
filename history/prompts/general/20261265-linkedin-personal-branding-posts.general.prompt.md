---
id: 20261265
title: LinkedIn personal-branding posts with a weekly review page (career crew)
stage: general
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: none
branch: docs/phr-linkedin-posts
user: M Yousif Channa
command: none
labels: [board-direct, career, linkedin, social, supabase-edge-function]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - ~/career (branch feat/linkedin-posts, commit 8ab0788): build/posts.py, build/visuals.py, templates/posts/, review/career-review/index.ts, scripts/crew/{linkedin,review,post-stages,posts-pipeline}.mjs, scripts/crew/career.mjs, scripts/crew/briefs/posts_*.md, .claude/skills/linkedin-posts/SKILL.md, data/posts/2026-W49.yaml, data/linkedin.yaml, tests/
  - ~/supabase-project/volumes/functions/career-review/index.ts (deployed copy, production host)
  - history/prompts/general/20261265-linkedin-personal-branding-posts.general.prompt.md
tests:
  - career: node --test tests/*.test.mjs (14 pass), uv run pytest -q (44 pass), build/linkedin.py --check, build/build.py --all --check
  - review page: invalid token 403; valid link 200 text/html; image 200; MP4 Range 206; CSP, no-referrer, noindex, no-store headers; decision API accepts valid and rejects unknown post, bad token, empty change note
  - phone-width screenshot of the review page (playwright-core under scripts/heavy.sh)
---

## Prompt

look at the career repo in ~/career, I want to create a self branding posts on my LinkedIn profile. I want to promote my work on my profile and add cta for potential client contracts, only one post per day with realistic story and invitation for feedback on specific problems I solved from my connections, we can make it attractive by using image and short animations. it's more like personal branding than promoting the project I worked on. follow best practices for he personal branding. use existing LinkedIn connection with crew. also suggest profile update options

Follow-ups during planning: "you can add my picture in some post's to give a personal touch. don't make same template which gives a feeling of automated posts, be creative. justify each design decision don't follow blindly." / "create a weekly artifact for approval of the created posts and send the link on career channel on discord". Owner answers: collaboration framing for the CTA (conduct rules for a BS-19 officer); allow the textbook roundup to keep posting to LinkedIn; weekly batch approval; audience EdTech/AI-in-education, AI-automation clients, Pakistani educators and recruiters; self-hosted review page (claude.ai artifacts cannot be published from headless crew runs).

## Response snapshot

Built, in ~/career on branch feat/linkedin-posts (not merged): evidence-checked weekly post files, eight visual formats rendered with Typst (hand-drawn look, rotation rules against a templated feed, MP4 animations via heavy.sh), a LinkedIn poster on the existing member token (text, image, video, document with multi-image fallback, first comment), crew stages (Saturday plan, cross-family verify, revise on request, 30-minute decision sync, one post a day at its time, reminders, token warning), owner commands in #career, and profile branding options plus a banner. Deployed the `career-review` edge function to the self-hosted Supabase with a private `career-review` bucket; published week 2026-W49 (seven true stories, sources cited) and sent the private link to #career.

## Outcome

- ✅ Impact: the owner can review a week of LinkedIn posts on his phone and they post one a day after approval; profile options are in out/linkedin/linkedin-pack.md.
- 🧪 Tests: 14 node + 44 pytest pass; live checks of the review page and decision API pass.
- 📁 Files: career repo (see files); one deployed edge function folder; this PHR.
- 🔁 Next prompts: merge feat/linkedin-posts in ~/career to switch on the cron steps; first live post published by hand (`node scripts/crew/linkedin.mjs post 2026-W49 P-n`) to confirm the document and comment calls; owner sends photos.
- 🧠 Reflection: verify story details against the records before writing them; two first-draft details (where the Nastaliq overlap was caught, how the black figures were found) were wrong until checked.

## Handoff (for CEO and agents)

- Shipped / changed: textbook repo unchanged except this PHR. Production host: new edge function folder `~/supabase-project/volumes/functions/career-review` (undo: delete the folder) and a private storage bucket `career-review` holding the owner's post previews. No migration, no env change, no restart.
- Decisions the team must respect: the career posts never sell (no rates, "hire me", freelance); the textbook social roundup keeps posting to LinkedIn alongside them (owner choice); nothing posts without the owner's approval on the review page; photos stay host-local in ~/.crew/career/media and need recorded consent when other people appear. The `career-review` bucket and function belong to the career crew; do not reuse them for corpus work.
- Pending / next owner: owner to merge feat/linkedin-posts in ~/career (its live checkout has an unrelated uncommitted scripts/crew/workers.mjs change, which this branch does not touch); owner to renew the crew's Claude sign-in before 2026-11-27 (`claude setup-token`); LinkedIn member token expires around 2027-01-16.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: headless `claude -p` has no Artifact tools, so the planned claude.ai review artifact was replaced by a self-hosted page; Typst `par(leading: Nem)` resolves em against the outer size unless the set rule is inside the text's own block; unquoted YAML flow mappings split labels at commas (now a check).
- Graders run and results (PASS/FAIL): career node tests PASS; career pytest PASS; review page live checks PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): after four weeks, compare post analytics by format and posting time and adjust the rotation rules and the 17:30 default.
