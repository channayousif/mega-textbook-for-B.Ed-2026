---
id: 0145
title: TEX-100 EFMP-303 Unit 5 accreditation authority baseline correction
stage: general
date: 2026-10-16
surface: agent
model: LongCat-2.0
feature: none
branch: agent/TEX-40
user: M Yousif Channa
command: paperclip-agent
labels: ["paperclip", "curriculumowner", "efmp-303", "tex-100", "unit-05"]
links:
  spec: null
  ticket: TEX-100
  adr: null
  pr: 120
files:
  - docs/semester-2/efmp-303/unit-05/topic-01.mdx
  - static/img/figures/efmp-303/unit-05/fig-U5-2.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-2.dark.svg
  - history/prompts/general/0145-tex100-efmp303-u5-accreditation-fix.general.prompt.md
tests:
  - npm run check:content (pre-existing failures only; no new failures from this change)
  - npm run check:no-answer-keys (pass)
  - npm run check:no-em-dash (pass)
---

## Prompt

TEX-100 (assigned from TEX-66 under TEX-59): correct the English baseline accreditation claim in EFMP-303 Unit 5 topic-01.mdx. "HEC accredits degree programmes" conflates HEC framework/recognition with discipline-specific programme accreditation and omits NACTE in a teacher-education unit. Also reconcile the two (Khan, 2018) in-text citations with the unit-05 source register (which has gem-report2020, nep2009, wb_hci only — not Khan). TEX-68 ruling: further-reading pointers are OK without register rows, but sources actually cited in prose need register rows. Verified against HEC statutory-mandate notice and NACTE mandate/accreditation pages (2026-10-16). Commit to existing PR #120 (agent/TEX-40); no new branch/PR. Keep translation_status draft; no self-review or publication changes.

## Response snapshot

Read PHRs 0136/0138/0139/0140 (72h window). Confirmed PHR 0139: branch/PR rules for TEX-59 still require agent/TEX-40 + PR #120, no new branches. Checked topic-02.mdx and unit-assessment.mdx for dependent HEC claims — none found. The assessment does not repeat the HEC claim. fig-U5-2.svg (light + dark) did repeat it ("HEC or provincial accreditation body" + "Teacher education programme accreditation") and was corrected.

Three changes committed as `69526af0` on agent/TEX-40, pushed to remote, auto-included in draft PR #120:

1. **topic-01.mdx line 34** — Replaced "The Higher Education Commission (HEC) accredits degree programmes" with: "The Higher Education Commission (HEC) establishes the regulatory framework and recognizes degree programmes, while discipline-specific accreditation is handled by professional councils. For teacher education, the National Accreditation Council for Teacher Education (NACTE) accredits programmes such as the B.Ed. and ADE." Also clarified Pakistan Nursing Council as an example of "other professional councils" rather than the only alternative.
2. **topic-01.mdx lines 36 & 56** — Removed both `(Khan, 2018)` parenthetical citations. Khan remains in the Further Reading section as a pointer (permitted under TEX-68). The assertions they tagged (accreditation requires ongoing evidence of action on feedback; training without follow-up doesn't change practice) are supported by the surrounding prose and the nep2009 policy reference already in the text. Khan provenance was not confirmed — no register row added.
3. **fig-U5-2.svg + fig-U5-2.dark.svg** — Accreditation row "Who conducts it" changed from "HEC or provincial accreditation body" to "NACTE (teacher education) / HEC"; Example column changed from "Teacher education programme accreditation" to "B.Ed. programme accreditation (NACTE)".

## Outcome

- ✅ Impact: English baseline now correctly distinguishes HEC's regulatory/recognition role from discipline-specific programme accreditation, and names NACTE for teacher education. Source-register/in-text relationship settled for topic-01. Figure brought into agreement.
- 🧪 Tests: check:content (no new failures — only pre-existing G2 stale manifest and fig-U3-2 alt mismatch), check:no-answer-keys pass, check:no-em-dash pass.
- 📁 Files: 3 files changed, committed `69526af0` on `agent/TEX-40`, included in draft PR #120.
- 🔁 Next prompts: frozen commit `69526af0` supplied back to TEX-66 for translation to proceed.
- 🧠 Reflection: The figure text was the hidden dependency — it repeated the same imprecise claim as the prose and would have stayed wrong if only the MDX was fixed. Always check figures when correcting an authority claim.

## Handoff (for CEO and agents)

- Shipped / changed: commit `69526af0` on `agent/TEX-40` (PR #120). HEC/NACTE distinction corrected in topic-01.mdx and fig-U5-2 (light+dark). Two Khan (2018) in-text citations removed.
- Decisions the team must respect: TEX-68's further-reading ruling stands — Khan remains in Further Reading but has no register row and no in-text citation. Do not add a Khan register row without confirmed provenance. Translator (TEX-66) may now proceed from commit `69526af0`; translation_status stays draft; no self-review or publication changes.
- Pending / next owner: TEX-66 (BilingualAuthor) — Urdu translation of Unit 5 from the corrected baseline at `69526af0`. topic-02.mdx also has two (Khan, 2018) in-text citations (lines 36, 58) but was explicitly out of scope for this task; flag separately if it becomes a blocker for that topic's translation.
- Paperclip issues affected: TEX-100 (this task), TEX-66 (unblocked for Unit 5 translation), TEX-59 (parent).
