---
id: 2435
title: Sourced figures policy ADR-0033
stage: general
date: 2026-10-29
surface: agent
model: claude-opus-5-5
feature: none
branch: governance/sourced-figures-policy
user: M Yousif Channa
command: none
labels: ["board-direct", "figures", "maps", "governance", "adr"]
links:
  spec: null
  ticket: null
  adr: history/adr/0033-sourced-geographic-and-real-world-figures.md
  pr: null
files:
 - history/adr/0033-sourced-geographic-and-real-world-figures.md
 - history/adr/README.md
 - scripts/check-map-sources.mjs
 - tests/unit/map-sources-gate.test.mjs
 - package.json
 - .claude/skills/generate-figures/SKILL.md
 - .claude/skills/author-unit/SKILL.md
tests:
 - npx vitest run tests/unit/map-sources-gate.test.mjs (5 pass)
 - npm run check:map-sources (584 rows, pass)
 - npm run check:content (13/13 pass; no review evidence went stale)
---

## Prompt

the svg map created in crew: batch 2026-10-28 14:15Z, 3 jobs (GPKS-402)- #366
#366 is highly inaccurate, maps are highly sensitive artifacts. it should be actual approved not an approximate or careless sketch. replace immediately. one more thing, why should we generate each and every figure when we can download an opensource/free and better alternative we can fetch and modify according to our needs.

## Response snapshot

PR C of the approved plan. ADR-0033, accepted by owner instruction in this session (AskUserQuestion: "Maps and real-world
images"). Maps of real territory are built from Natural Earth Pakistan-POV data, checked against the
Survey of Pakistan, rebuilt from a committed script and signed off by the owner. They are never drawn
or generated. Real-world photos and documents may be reused under PD, CC0 or CC BY with provenance.
Schematics stay hand-authored. New `check:map-sources` rejects a rendered diagram or illustration row
that describes a real-territory map without a `Source:` note. Skills generate-figures and author-unit
now carry the rule.

A first attempt put the rule in check-figures.mjs, but that file (and scripts/lib/gates.mjs) is a
hashed input of every unit's G2 and G3 evidence. The edit made 89 units' G2 evidence stale and
would have done the same to the G3 reviews awaiting owner sign-off. It was reverted. The rule is a
separate script, enforced in CI through `npm test`, so no bound file changes.

## Outcome

- ✅ Impact: an unsourced or freehand map can no longer pass CI unnoticed. Figure reuse has a licence policy.
- 🧪 Tests: 5 new unit tests. The corpus scan passes. check:content 13/13.
- 📁 Files: the ADR and index row, the gate script and its test, the npm script, and two skills.
- 🔁 Next prompts: owner sign-off on #369 (sourced map).
- 🧠 Reflection: before editing any gate script, check whether review manifests bind it
  (specs/content/*/reviews/*/G3/manifest.json lists the bound inputs).

## Handoff (for CEO and agents)

- Shipped / changed: ADR-0033, the `check:map-sources` gate (run in `npm test`), and the skill rules.
- Decisions the team must respect: never draw or generate a map of real territory. Use sourced
  boundary data with a committed script, a `Source:` note in the manifest, and owner sign-off. Reused
  photos and documents need a PD, CC0 or CC BY licence recorded; NC and ND are not allowed. Do not edit
  bound gate files (check-figures.mjs, gates.mjs, the other scripts/lib inputs listed in a G3
  manifest) to add rules, because that makes every review stale.
- Pending / next owner: the owner decides #369. After it merges, the crew retries gpks-402-u04-translate.
- Paperclip issues affected: none (Paperclip retired; crew board tracks work).

## Evaluation notes (flywheel)

- Failure modes observed: editing a bound gate script silently invalidated corpus-wide review evidence.
- Graders run and results (PASS/FAIL): check:content PASS; vitest map-sources PASS; docs-sync PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): make check-docs-sync warn when a PR touches a file bound in review manifests.
