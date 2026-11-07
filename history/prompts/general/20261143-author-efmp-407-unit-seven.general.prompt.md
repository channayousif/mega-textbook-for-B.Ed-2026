---
id: 20261143
title: Author EFMP-407 Unit Seven
stage: general
date: 2026-11-07
surface: agent
model: GPT-6 Codex
feature: 008-rich-unit-pedagogy
branch: crew/efmp-407-u07-author
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "efmp-407", "unit-07"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - "docs/semester-3/efmp-407/unit-07/index.mdx"
  - "docs/semester-3/efmp-407/unit-07/topic-01.mdx"
  - "docs/semester-3/efmp-407/unit-07/topic-02.mdx"
  - "docs/semester-3/efmp-407/unit-07/unit-assessment.mdx"
  - "docs/semester-3/efmp-407/unit-07/unit-teacher-notes.mdx"
  - "specs/content/efmp-407/concepts/unit-07.md"
  - "specs/content/efmp-407/coverage/unit-07.md"
  - "specs/content/efmp-407/figures/unit-07.banner.md"
  - "specs/content/efmp-407/figures/unit-07.md"
  - "specs/content/efmp-407/sources/texts/hopkins-mckeown-2005.md"
  - "specs/content/efmp-407/sources/texts/jumani-abbasi-2015.md"
  - "specs/content/efmp-407/sources/texts/nep-2009.md"
  - "specs/content/efmp-407/sources/unit-07.md"
  - "static/img/figures/efmp-407/unit-07/fig-U7-1.dark.svg"
  - "static/img/figures/efmp-407/unit-07/fig-U7-1.svg"
  - "static/img/figures/efmp-407/unit-07/fig-U7-2.dark.svg"
  - "static/img/figures/efmp-407/unit-07/fig-U7-2.svg"
  - "static/img/figures/efmp-407/unit-07/fig-U7-3.dark.svg"
  - "static/img/figures/efmp-407/unit-07/fig-U7-3.svg"
  - "static/img/figures/efmp-407/unit-07/fig-U7-4.dark.svg"
  - "static/img/figures/efmp-407/unit-07/fig-U7-4.svg"
  - "specs/content/efmp-407/tasks.md"
tests:
  - "npm run check:content (baseline: all 14 pass; final run recorded below)"
  - "check:depth-gate, check:figures and check:svg-style"
  - "figures:variants and non-browser light/dark raster previews"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored the English Unit 7 opening, two topic cycles, teacher notes and 10/10/5 assessment bank. Added coverage, source records with bounded passages, concept graph and four placed schematics with dark variants. Prepared the banner handoff. G2 evidence and final validation are completed in the follow-up commit.

## Outcome

- ✅ Impact: English Unit 7 drafted from the approved specification; independent review and Urdu remain pending.
- 🧪 Tests: Baseline at origin/main passed all 14 gates. Initial failures required rendered figures, bound source passages, G2 evidence and refreshed generated status.
- 📁 Files: Five English MDX files, unit governance and source passages, eight SVG assets, tracker, and this PHR. Generated status and G2 logs follow.
- 🔁 Next prompts: Independent G3 review; Urdu translation; banner production; permitted browser geometry validation.
- 🧠 Reflection: The author-unit prompt-only guidance is older than the actual rendered-figure gate. Followed the brief requirement to resolve all new gate findings without altering the scripts.

## Handoff (for CEO and agents)

- Shipped / changed: English authoring, aligned assessment, source boundaries, and four English schematics with derived dark twins.
- Decisions the team must respect: No G3/G5 certification. Historical 2009 policy is not presented as current national practice. The 2015 article abstract describes proposed research. Local cases are fictional.
- Pending / next owner: Independent reviewer owns G3; translator owns Urdu prose and labels; assets worker owns banner and browser geometry check prohibited by this brief.
- Paperclip issues affected: efmp-407-u07-author; no issue URL supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Skill guidance says prompt-only figures pass, but the current gate requires placement; source excerpts and generated status are also required.
- Graders run and results (PASS/FAIL): Baseline PASS; intermediate failures read and addressed; final gate result appended after evidence preparation.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the independent review against the frozen committed bundle.
