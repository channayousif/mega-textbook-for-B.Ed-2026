---
id: 0868
title: Evaluate Agent Phase Kit applicability
stage: general
date: 2026-10-24
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: none
labels: ["board-direct", "evaluation", "agent-memory", "crew"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0868-evaluate-agent-phase-kit-applicability.general.prompt.md
tests:
 - none (read-only evaluation)
---

## Prompt

evaluate the claims and assess the applicability for this setup

<pasted_content>
📁 AI Agent baar baar bhool jata hai? Ye 4 files ka system try karein!

Maine ek nayi video banayi hai jisme dikhaya hai:

✅ Main 1.5 saal Claude Code ke saath kyun fail hua, aur "context rot" kya hota hai
✅ 4 files (AGENTS.md, PHASES.md, PROGRESS.md, IDEAS.md) jo agent ki memory ban jati hain
✅ Phase aur gate: kaam tab done jab real command output proof de
✅ Spec Kit ke saath aur uske bagair, dono tareeqe, ek real project par

Agar aap Claude Code, OpenCode ya Codex use karte ho aur agent rules bhool jata hai ya "done" jaldi bol deta hai, to ye video zaroor dekhein 👇

🔗 https://youtu.be/xZiHKO8xi3g

📌 Video pasand aaye to LIKE karein, SUBSCRIBE karein, repo ko ⭐ karein, aur apne developer dosto aur groups mein SHARE zaroor karein 🙏
</pasted_content>

Follow-up (plan review): also see his repo https://github.com/MuhammadHamidRaza/ai-agent-phases

## Response snapshot

Read the video transcript and the full repo README (one README, no code). Claims: context rot and file-over-chat memory are true and well known; "gate with real output" is the strongest point, but in the demo the agent self-ticks PHASES.md and visibly skipped updating it; "4 files are all you need" is overstated beyond a solo human-in-the-loop project. Applicability: this setup already has stronger equivalents (AGENTS/CLAUDE/constitution; specs + G0-G5 + 13 content gates + CI; crew BOARD.md and PHR handoffs; specs/backlog.md; one fresh session per crew job; the crew's 3-attempt rule matches the kit's Rule of 3), and the crew's reap runs the gate itself so workers cannot self-certify. Do not adopt the 4 files. Real weaknesses the kit's diagnosis points at: rule bloat loaded into every crew brief (AGENTS.md + CLAUDE.md + constitution, about 1,350 lines; crew.mjs:234), too many resume surfaces, gates that pass broken work, and silent stalls (37 h disk-guard idle). Optional follow-ups: one-source AGENTS.md with a slim CLAUDE.md (the kit's bridge-file idea), a crew alert on launch stalls, and a "Resume here" block on BOARD.md. Full write-up: ~/.claude/plans/evaluate-the-claims-and-generic-wren.md.

## Outcome

- Impact: none; evaluation only.
- Tests: none.
- Files: this PHR only.
- Next prompts: owner picks which of the three follow-ups to do (each its own PR; CLAUDE.md/AGENTS.md are protected paths).
- Reflection: the kit's per-task (not per-message) PHR rule conflicts with this repo's PHR-per-prompt rule; noted as a cost trade-off, not a change.

## Handoff (for CEO and agents)

- Shipped: nothing.
- Decisions to respect: do not add PHASES.md/PROGRESS.md/IDEAS.md to this repo; they duplicate existing state.
- Pending: owner choice on follow-ups 1-3.
- Affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment: measure the size of a crew brief's mandatory reads before and after slimming CLAUDE.md.
