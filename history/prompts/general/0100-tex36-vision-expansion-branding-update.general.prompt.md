---
id: 0100
title: TEX-36 platform vision expansion — branding & content update
stage: general
date: 2026-10-07
surface: agent
model: claude-opus-5-5
feature: none
branch: agent/TEX-36
user: M Yousif Channa
command: TEX-36 board message — note vision, modify landing/footer/docs/roadmap
labels: ["ceo", "branding", "vision", "tex-36", "handoff"]
links:
  spec: null
  ticket: TEX-36
  adr: null
  pr: null
files:
 - src/lib/brand.ts
 - docusaurus.config.ts
 - src/pages/index.tsx
 - src/pages/about.mdx
 - src/pages/contact.mdx
 - docs/intro.mdx
 - src/theme/DocItem/Metadata/index.tsx
 - SDD/ROADMAP.md
 - .specify/memory/constitution.md
 - README.md
 - i18n/ur/docusaurus-plugin-content-pages/about.mdx
 - history/prompts/general/0100-tex36-vision-expansion-branding-update.general.prompt.md
tests:
 - none (content/string changes only; no logic or schema change)
---

## Prompt

TEX-36 board message: the landing page and footer show the B.Ed textbook and University of Sindh,
but the project is envisioned as a collection of textbooks and learning management system (LMS) for
subjects of Grade 9 to 12 and teacher education degree programmes (ADE and B.Ed(Hons)) with students
and their teachers as users. The current state of the project is an MVP targeted at prospective
teachers (the ADE/B.Ed students) and their teachers. Note this overarching vision and modify the
relevant sections (landing page, footer, docs/specs/roadmap). Plan and coordinate the necessary
changes.

## Response snapshot

Applied the vision across all public-facing brand touchpoints and governance docs:

- **Brand constants** (`src/lib/brand.ts`): `SITE_NAME` `B.Ed Mega Textbook` → `Mega Textbook`;
  `PUBLISHER` `University of Sindh, Faculty of Education` → `Mega Textbook` (locked decision 7
  already removed university branding; now enforced everywhere).
- **Site config** (`docusaurus.config.ts`): title, tagline, keywords, navbar logo/title, og:site_name,
  footer copyright — all broadened to "Mega Textbook" + Grades 9-12 / ADE / B.Ed Hons.
- **Landing page** (`src/pages/index.tsx`): headline, subtitle, card copy rewritten for the broader
  vision.
- **About / Contact / Intro** pages: rewritten to reflect dual audience (school + teacher-education).
- **schema.org** (`Metadata/index.tsx`): `CollegeOrUniversity` → `Organization` — no longer making a
  false institutional claim.
- **Roadmap** (`SDD/ROADMAP.md`): new "Platform Vision" section at the top framing the two audiences;
  flagged B.Ed-specific sections as the current MVP with Grade 9-12/ADE as planned expansion.
- **Constitution** (`.specify/memory/constitution.md`): Article I rewritten to name both audiences;
  header simplified to "Mega Textbook".
- **README.md**: header and intro updated.
- **Urdu about mirror** (`i18n/ur/.../about.mdx`): aligned with English rebrand.

## Outcome

- ✅ Impact: every public-facing string that narrowly scoped the project to B.Ed / University of Sindh
  is now broadened to the board's vision (Grades 9-12 + teacher education, students + teachers).
- 🧪 Tests: content-only changes; no logic or schema change.
- 📁 Files: 11 files (listed above) + this PHR.
- 🔁 Next prompts: Urdu mirrors of landing page, contact, intro, and footer copyright translation
  still need a pass (landing/contact/intro were English-only this round); draft PR for board review.
- 🧠 Reflection: the university branding was already removed per locked decision 7 but had left
  residual references in brand constants, metadata schema, and content pages. This pass cleans all of
  them.

## Handoff (for CEO and agents)

- Shipped / changed: branding and content across 11 files — see Response snapshot for the full list.
- Decisions the team must respect: the project is now branded as "Mega Textbook" serving Grades 9-12
  and teacher education (ADE, B.Ed Hons). "B.Ed Mega Textbook" and "University of Sindh, Faculty of
  Education" are retired strings — do not reintroduce them in new content. schema.org uses
  `Organization`, not `CollegeOrUniversity`.
- Pending / next owner: Urdu mirrors for landing page (`index` has no i18n file, uses Translate
  IDs), contact, and intro need alignment; draft PR open for board review.
- Paperclip issues affected: TEX-36 (this task).
