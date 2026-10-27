---
id: 0875
title: Owner rulings on video studio discovery
stage: misc
date: 2026-10-26
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "owner-ruling"]
links:
  spec: specs/027-video-studio/spec.md
  ticket: null
  adr: history/adr/0031-video-studio-sub-project.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/specs/000-discovery/discovery.md
 - video-studio/.claude/skills/topic-harvester/SKILL.md
 - video-studio/.claude/agents/pedagogy-reviewer.md
 - video-studio/CLAUDE.md
 - video-studio/brand/brand-bible.yaml
 - specs/027-video-studio/spec.md
 - specs/027-video-studio/tasks.md
 - history/adr/0031-video-studio-sub-project.md
tests:
 - node scripts/check-no-media-in-video-studio.mjs (PASS)
 - node scripts/check-no-em-dash.mjs --scan-dir video-studio (PASS)
---

## Prompt

allow gated units, studio on server, kaggle is set up, yes

## Response snapshot

Recorded the four rulings. Tier filter now admits `certified`, `provisional` and `gated` (86 authored
units instead of 2); `gated` topics get a stricter source check in the pedagogy reviewer, and a doubt
about the source page is a BLOCK for the owner, never patched in the script. Studio runs on the server
on loopback, reached by SSH tunnel. Logo and handle use approved. Kaggle: found no CLI and no token on
the host; installed `kaggle` CLI 2.2.5 with `uv tool install kaggle`; the API token is still missing.

## Outcome

- ✅ Impact: discovery blocking questions answered; Phase 0 needs only explicit discovery approval and the Kaggle token.
- 🧪 Tests: media gate and em-dash scan PASS.
- 📁 Files: 8 text files updated (see list).
- 🔁 Next prompts: owner approves discovery.md; owner places Kaggle token; `/video-build` Phase 0.
- 🧠 Reflection: "kaggle is set up" was true for the account, not the host; checking before recording avoided a false claim.

## Handoff (for CEO and agents)

- Shipped / changed: owner rulings recorded on PR #336 (discovery.md, harvester tier filter, pedagogy reviewer gated check, Studio-on-server note, brand bible logo/handle approval, ADR-0031 decisions 2 and 5, spec 027 FR-003 and tasks).
- Decisions the team must respect: `gated` units may become shorts, `unpublished` never; Studio binds 127.0.0.1 only on the production host; its web build is a flock'd heavy job.
- Pending / next owner: owner places the Kaggle API token at `~/.kaggle/kaggle.json` (chmod 600) and explicitly approves discovery.md; then Phase 0.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: owner-reported setup state differed from host state (token absent).
- Graders run and results (PASS/FAIL): media gate PASS; em-dash scan PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): `kaggle datasets list --mine` once the token is in place, as the doctor's first live check.
