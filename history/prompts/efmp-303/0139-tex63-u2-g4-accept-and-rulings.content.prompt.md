---
id: 0139
title: TEX-63 EFMP-303 Unit 2 G4 accept and rulings
stage: content
date: 2026-10-15
surface: agent
model: longcat-2.0
feature: efmp-303
branch: agent/TEX-40
user: M Yousif Channa
command: /paperclip-curriculumowner
labels: ["curriculumowner", "paperclip", "tex-63", "efmp-303", "g4", "termedit"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: TEX-63
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/120
files:
 - history/prompts/efmp-303/0139-tex63-u2-g4-accept-and-rulings.content.prompt.md
tests:
 - npm run check:content
 - npm run build (en + ur)
---

## Prompt

TEX-63 handed to CurriculumOwner at in_review after BilingualAuthor completed the G4 Urdu mirror at a936f5fd on agent/TEX-40 (PR #120). Verify the handoff, then rule on two open items: the `Development` / `ترقی` terminology collision, and who fixes the English `fig-U2-1.svg` anchor defect. Accept the mirror into G5 review or send it back.

## Response snapshot

Independent verification against the handoff's claims:

- All 6 Urdu files present under `i18n/ur/.../semester-2/efmp-303/unit-02/` with correct front matter.
- `translation_status: draft` in all 6 Urdu files and the English index. Confirmed via grep after a temporary flip to `reviewed` and back.
- `key_terms` block declares only bank-conformant pairs (`Curriculum/نصاب`, `Critical Thinking/تنقیدی سوچ`, `Rote Learning/رٹا لگانا`) — verified against `terminology.csv`.
- English `docs/` untouched (empty `git diff --stat docs/`).
- `check:content` shows only pre-existing findings for EFMP-303 (the stale G2 input manifest); no new findings from this translation.
- Parity flip test: temporarily set both `index.mdx` to `reviewed`, ran `check:content` (only expected G4/G5 tracker-row findings), then flipped both back to `draft`.
- Build passes for both `en` and `ur` locales.
- `fig-U2-1.ur.svg` desc matches its carrier alt byte-for-byte; no raw `&` in any Urdu file.
- Translation reads in a consistent academic-plain (درسی مگر عام فہم) register. Citations preserved. `<Figure>` / `<Glossary>` / `<PrintHandout>` component calls match English file by file.

### Ruling 1 — Development / ترقی

**Accepted.** BilingualAuthor translated "development" in the national and economic sense as **ترقی** throughout, deliberately leaving `Development` out of the `key_terms` block so nothing false is asserted.

This is consistent with existing bank precedent. The bank already holds `Continuous Professional Development → مسلسل پیشہ ورانہ ترقی` (EFMP-302 Unit 6), proving that the bank's own convention is context-specific: child-development senses bind to نشوونما, while professional/adult/national senses bind to ترقی. The generic `Development → نشوونما` entry remains correct for the developmental-psychology context it was coined for.

To make the disambiguation explicit and reusable for future units, add a new row to `terminology.csv`:

```
National Development,ترقی,
```

This is an additive entry — it does not rebind the existing `Development` entry, which stays with نشوونما for the child-growth context. No other file needs changing; the Urdu mirror already uses ترقی correctly.

### Ruling 2 — English fig-U2-1.svg anchor defect

The English `static/img/figures/efmp-303/unit-02/fig-U2-1.svg` sets `text-anchor="major"` on its title element. `major` is not a valid SVG value, so the title renders start-anchored and runs off to the right instead of centring. The Urdu mirror normalises it to `middle` and renders correctly.

This is an English-side schematic defect. It belongs to [WebLeadAgy](/TEX/agents/webleadagy) because it is a figure-asset fix in `static/img/figures/`, which sits under their lane. BilingualAuthor did the right thing leaving it alone — fixing English content was out of G4 scope.

## Outcome

- ✅ Impact: G4 mirror accepted into the pipeline; two open rulings resolved; follow-up tasks created for G5 review and the English figure fix.
- 🧪 Tests: `check:content` clean (only pre-existing G2 manifest); `build` passes en + ur; parity flip done and reverted.
- 📁 Files: PHR only — no repo changes from this ruling.
- 🧠 Reflection: The bank already encoded the Development/ترقی distinction via context entries. BilingualAuthor's instinct to translate by context rather than mechanical 1:1 lookup was correct and matches how the bank is designed to be used.

## Handoff (for CEO and agents)

- Shipped / changed: PHR 0139 on `agent/TEX-40` (in PR #120). No independent commit — rides with the existing G4 commit.
- Decisions the team must respect:
  - G4 Urdu mirror for EFMP-303 Unit 2 is accepted and ready for independent G5 review.
  - `terminology.csv` to be extended with `National Development,ترقی,` (additive, no rebind).
  - English `fig-U2-1.svg` `text-anchor="major"` → `"middle"` fix is WebLeadAgy's; the Urdu mirror already has `middle`.
- Pending / next owner:
  - [Reviewer](/TEX/agents/reviewer): G5 Urdu review of EFMP-303 Unit 2 in a fresh, independent session (TEX-74 child).
  - [WebLeadAgy](/TEX/agents/webleadagy): fix English `fig-U2-1.svg` anchor (TEX-75 child).
- Paperclip issues affected: [TEX-63](/TEX/issues/TEX-63), [TEX-74](/TEX/issues/TEX-74), [TEX-75](/TEX/issues/TEX-75).

## Evaluation notes (flywheel)

- Failure modes observed: none — verification confirmed all handoff claims.
- Graders run and results (PASS/FAIL): check:content PASS (no new findings); build PASS en+ur.
