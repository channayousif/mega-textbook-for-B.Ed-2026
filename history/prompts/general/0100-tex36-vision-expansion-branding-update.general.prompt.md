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

### Revision 1 (commit d00de9be)

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

Draft PR #113 opened. Board rejected it with two pieces of feedback (recorded in the
`request_confirmation` interaction result).

### Revision 2 (commit 26839d4b) — addresses board feedback

Board feedback:
1. "Currently our MVP caters ADE and B.Ed(H) students and teachers and also Aspirants of Teacher
   License by STEDA Government of Sindh." → messaging must name STEDA + licence aspirants explicitly.
2. "Add logos in footer: STEDA, HEC, University of Sindh, All Government Elementary Colleges of
   Sindh, Additional Director Teacher training institutions, Sindh, all sindh DETRCs and REEC, PITE
   Sindh."

Changes in rev2:
- **Messaging** (`src/pages/index.tsx`, `src/pages/about.mdx`, `docs/intro.mdx`, `docusaurus.config.ts`
  tagline/keywords/copyright): now explicitly name ADE/B.Ed(H) students + teachers AND STEDA
  teacher-licence aspirants under the Government of Sindh.
- **Footer logo strip** (`src/theme/Footer/index.tsx` NEW, `src/css/custom.css`): a "Supported by"
  strip added via a Footer swizzle, with wordmark placeholders for STEDA, HEC, University of Sindh,
  Govt Elementary Colleges, AD TTIs, DETRCs, REEC, PITE Sindh. Real logo image files to replace
  wordmarks when the board provides them.
- PR #113 body updated; new `request_confirmation` (v2) posted on TEX-36.

### Revision 3 (commit a0fbf577) — board PR comments + real logo images

Board PR comments (on PR #113):
1. `docs/intro.mdx` line 3: "A free bilingual (English and Urdu) textbook collection and learning
   platform for ADE, B.Ed Hons, STEDA teacher-licence aspirants" — use this exact description text.
2. `i18n/ur/.../about.mdx` line 3: "remove کے لیے" — drop the Urdu "for" from the description line.
3. "i donot see ane loge images, search the internet and download the logos" — replace wordmark
   placeholders with real downloaded logo images.

Changes in rev3:
- **Intro description** (`docs/intro.mdx`): matched the board's exact requested text.
- **Urdu about.mdx** (`i18n/ur/.../about.mdx`): description reworded to drop "کے لیے".
- **Logo images**: downloaded real logos from official sources — HEC (Wikimedia thumb), University of
  Sindh (usindh.edu.pk), Government of Sindh (sindh.gov.pk). Created clean SVG wordmarks for STEDA,
  GEC, ADTTI, DETRCs, REEC, PITE. Footer component (`src/theme/Footer/index.tsx`) rewritten to use
  real `<img>` tags with these assets. 9 logo files under `static/img/logos/`.
- PR #113 body updated; new `request_confirmation` (v3) posted on TEX-36.

## Outcome

- ✅ Impact: every public-facing string that narrowly scoped the project to B.Ed / University of
  Sindh is now broadened to the board's vision (ADE, B.Ed Hons, STEDA teacher-licence aspirants,
  Grades 9-12 — students + teachers). Footer now carries an institutional logo strip.
- 🧪 Tests: content-only changes; no logic or schema change.
- 📁 Files: 18 source files + 9 logo assets across all revisions (see lists above) + this PHR.
- 🔁 Next prompts: Urdu mirrors for landing page, contact, and intro need alignment; replace SVG
  wordmark logos (STEDA, GEC, ADTTI, DETRCs, REEC, PITE) with official logo files when obtained.
- 🧠 Reflection: the university branding was already removed per locked decision 7 but had left
  residual references in brand constants, metadata schema, and content pages. The board's rev2
  feedback re-introduces University of Sindh, STEDA, HEC and others as *affiliate logos* in the
  footer — a different framing from "site branding". schema.org stays `Organization`; the logos are
  presentational footer content, not a provider/publisher claim.

## Handoff (for CEO and agents)

- Shipped / changed: branding, content, and footer across 18 files — see Response snapshot for the
  full list per revision.
- Decisions the team must respect: the project is branded as "Mega Textbook" serving ADE, B.Ed Hons,
  STEDA teacher-licence aspirants, and Grades 9-12. The footer carries an institutional logo strip;
  real logo assets are pending from the board. "B.Ed Mega Textbook" and "University of Sindh,
  Faculty of Education" remain retired as *site-branding* strings; University of Sindh appears only
  as an affiliate logo in the footer. schema.org uses `Organization`, not `CollegeOrUniversity`.
- Pending / next owner: real logo image files for the footer strip (board to supply); Urdu mirrors
  for landing page, contact, and intro need alignment; TEX-36 awaiting board review of PR #113 rev2.
- Paperclip issues affected: TEX-36 (this task).
