---
id: crew-efmp-302-u04-translate-r1
title: crew re-verify EFMP-302 unit 4 Urdu mirror
stage: misc
date: 2026-10-18
surface: agent
model: claude
feature: efmp-302
branch: crew/efmp-302-u04-translate-r1
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-302/crew-efmp-302-u04-translate-r1.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

Brief: Translate EFMP-302 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

## Response snapshot

The branch was already at origin/main with a clean working tree — no prior work to build on. The Urdu mirror already existed on main from a previous G4 job (feature-023, verified 2026-10-17 against English at 65d2428e). Verification steps taken:

1. Read AGENTS.md, CLAUDE.md, translate-unit SKILL.md, and all references (parity-contract.md, urdu-register.md, assessment-translation.md).
2. Read inputs: terminology.csv, concepts/unit-04.md, figures/unit-04.md, glossary.json.
3. Confirmed English content unchanged since last G4 baseline (git diff 65d2428e..HEAD on docs/semester-1/efmp-302/unit-04/ is empty).
4. Component counts match: Figure 13/13, Glossary 4/4, PrintHandout 6/6.
5. Item counts match: 35 numbered assessment items in both EN and UR.
6. key_terms verified against bank: پیشہ ورانہ معیارات, اساتذہ کے لیے قومی پیشہ ورانہ معیارات, اساتذہ کا لائسنس, اساتذہ کی سند بندی — all bank-accepted.
7. No em dashes in Urdu files; no English answer-key prose in Urdu assessment.
8. Ran npm run check:content (all 13 gates pass after building content-status).
9. Temporarily flipped both index.mdx to reviewed and ran gates — only pipeline-gate flagged the open G4/G5 tracker rows (expected, ADR-0019). Reverted both back to draft.
10. Read Urdu topic files and assessment — translation is faithful: option letters mapped (A→الف, B→ب, C→ج, D→د), Bloom tags translated, marks preserved, answer key translated.
11. All .ur.svg and .webp figure assets present on disk.

## Outcome

- ✅ Impact: EFMP-302 Unit 4 Urdu mirror verified complete and current against English baseline; no changes needed.
- 🧪 Tests: npm run check:content 13/13 pass.
- 🔁 Next prompts: Independent G5 review (separate session, ADR-0019).
- 🧠 Reflection: Mirror was already done by feature-023; this run confirmed it remains valid.

## Handoff

- Decisions: translation_status stays draft (skill Step 7); G4/G5 rows left open (ADR-0019).
- Pending: independent G5 review in a fresh session.
- Paperclip issues affected: none.

## Evaluation notes

- Failure modes observed: none.
- Prompt variant: re-run (-r1) of a previously completed G4 job.
