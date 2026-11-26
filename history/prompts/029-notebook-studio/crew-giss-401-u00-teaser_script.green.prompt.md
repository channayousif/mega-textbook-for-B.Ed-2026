---
id: crew-giss-401-u00-teaser_script
title: Draft GISS-401 Urdu course teaser script (steps 1-3)
stage: green
date: 2026-11-26
surface: agy (crew)
model: claude-opus-4-6
feature: 029-notebook-studio
branch: crew/giss-401-u00-teaser_script
user: crew
command: .crew/brief.md
labels: [crew, agy_claude, teaser-script]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/teasers/giss-401.json (new): teaser script for GISS-401 Islamic Studies, recipe teaser@3
  - specs/studio/teasers/media-teasers.json (modified): added giss-401-ur item at planned then scripted
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. Draft the Urdu course teaser script for GISS-401 at specs/studio/teasers/giss-401.json following recipe teaser@3: five shots, on-screen presenter in shots 1 and 5, unseen woman narrator over action in shots 2-4 with named camera moves, at most 18 Urdu words a line, Pakistani school settings, modest dress, no sacred figures, scripture, calligraphy, maps, flags or emblems. Take facts only from the course overview and catalog/courses.json. Run teaser.mjs check, plan and advance to scripted.

## Response snapshot

Created specs/studio/teasers/giss-401.json with five shots (hook, learn, learn, why, cta), cream-and-brown-waistcoat male presenter, classroom/verandah/courtyard Pakistani school settings, named camera moves (push-in, dolly, tracking, crane, push-in). Urdu narration covers beliefs, Qur'an/Sunnah sources, worship, moral/social/economic/political systems, education and civilisation, and the teacher's role in promoting tolerance and peace - all from the course overview. No objectives field (overview uses "Course objectives" heading, which parseOverview does not detect; matches the GICP-400 pattern). QG0 passes. Planned giss-401-ur and advanced to scripted with script_sha256.

## Outcome

- ✅ Impact: GISS-401 teaser script drafted, QG0 pass, item at scripted, ready for owner approval
- 🧪 Tests: npm run check:content - all 14 gates PASS
- 📁 Files: specs/studio/teasers/giss-401.json (new), specs/studio/teasers/media-teasers.json (modified)
- 🔁 Next prompts: owner runs crew approve-script giss-401-ur
- 🧠 Reflection: The GISS-401 overview uses "Course objectives" not "Course learning outcomes", so parseOverview returns 0 outcomes; objectives field omitted to match the GICP-400 pattern and pass QG0.

## Handoff (for CEO and agents)

- Shipped: GISS-401 Urdu teaser script at `specs/studio/teasers/giss-401.json`, ledger item `giss-401-ur` at state `scripted`.
- The overview heading mismatch ("Course objectives" vs "Course learning outcomes") means the objectives field is omitted. If the overview is later standardised, objectives can be added as metadata without reopening the script approval.
- Owner must approve the script with `crew approve-script giss-401-ur` before any Flow credits are spent.
