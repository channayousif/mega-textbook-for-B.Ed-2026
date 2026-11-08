---
id: 20261185
title: Adopt ADR-0028, commit historical PHRs, hand the EFMP-304 Urdu overview to the crew
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: records/adr-0028-and-historical-phrs
user: M Yousif Channa
command: /sp.adr
labels: [board-direct, adr, housekeeping, crew]
links:
  spec: null
  ticket: null
  adr: history/adr/0028-platform-expansion-beyond-bed-and-licence.md
  pr: null
files:
  - history/adr/0028-platform-expansion-beyond-bed-and-licence.md
  - history/adr/README.md
  - history/prompts/** (47 historical PHRs from the owner checkout)
tests:
  - npm run check:docs-sync
---

## Prompt

adopt it with /sp.adr, urdu handover to the crew to put through the content gates if it is not alredy done, commit 47 phrs

## Response snapshot

ADR-0028 (platform expansion beyond B.Ed and teaching licence to grades 9-12) existed only as an uncommitted Proposed draft; number 0028 was unused on main. Run through /sp.adr's checks (a decision cluster across constitution, content track, catalog, style guide and gates; two alternatives with rationale; positive and negative consequences; concise): PASS. It is adopted as Accepted by owner instruction on 2026-11-08, with the draft's own condition kept: acceptance commits the direction but does not amend the constitution, and no grade 9-12 content is published until Articles I and II are amended. The ADR index gains its row and the count line. The 47 Paperclip-era PHRs from the owner checkout are committed verbatim (scanned for secrets: none). EFMP-304's Urdu course overview was not on main (only the English one), so crew job efmp-304-u00-fix was queued under the tick lock to add it through the content gates, with the owner's untracked draft staged at ~/.crew/mega-book/handover/ and a crew note; the draft left the owner checkout so it cannot block owner-sync.

## Outcome

- ✅ Impact: the platform-expansion decision is on record; the PHR history is complete in git; the missing Urdu overview is in the crew queue.
- 🧪 Tests: check:docs-sync, see PR.
- 📁 Files: ADR-0028, ADR index, 47 PHRs.
- 🔁 Next prompts: a constitution amendment (MAJOR) for Articles I and II before any grade 9-12 track work.
- 🧠 Reflection: /sp.adr creates ADRs from a plan; adopting an existing numbered draft means keeping its number rather than running create-adr.sh.

## Handoff (for CEO and agents)

- Shipped / changed: ADR-0028 Accepted; 47 historical PHRs; crew job efmp-304-u00-fix queued.
- Decisions the team must respect: no grade 9-12 content or track work ships before the constitution amendment ADR-0028 requires.
- Pending / next owner: the crew owns efmp-304-u00-fix (Urdu course overview, G4 left unticked); the owner owns the constitution amendment.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): ADR checklist PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
