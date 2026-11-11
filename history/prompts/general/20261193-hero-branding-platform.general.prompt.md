---
id: 20261193
title: Change hero branding to "Platform for current & future teachers and teacher educators"
stage: general
date: 2026-11-11
surface: agent
model: longcat/LongCat-2.5-Preview
feature: none
branch: feat/hero-branding-platform
user: M Yousif Channa
command: (chat)
labels: ["board-direct", "landing", "branding", "copy"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/542
files:
  - src/components/landing/copy.ts
  - docusaurus.config.ts
  - tests/e2e/landing.spec.ts
  - history/prompts/general/20261193-hero-branding-platform.general.prompt.md
tests:
  - npx tsc --noEmit
  - npm run check:content
---

## Prompt

Change hero section text and related branding from [Your teacher education textbooks ] to Platform for current & future teachers and teacher educators

Follow-up answers to the clarifying questions: keep the bilingual clause in the h1; translate the Urdu mirror to match; update the meta title and the tagline. Then "ok" to approve the plan.

## Response snapshot

Replaced the landing hero headline, the SEO/meta title and the Docusaurus tagline with the new platform branding. The English h1 keeps its bilingual clause and now reads "Platform for current & future teachers and teacher educators, in English and اردو." The Urdu h1 reads "موجودہ اور مستقبل کے اساتذہ اور اساتذہ کے تربیت کاروں کے لیے پلیٹ فارم، اردو اور انگریزی میں۔" The meta title and tagline use the exact new phrase in both locales. The landing e2e assertion that expected "textbooks" in the h1 was updated to the new headline.

## Outcome

- ✅ Impact: the landing hero, meta title and site tagline now present the platform positioning instead of the "teacher education textbooks" framing.
- 🧪 Tests: `npm run check:content` 14/14 PASS. `npx tsc --noEmit` reports only pre-existing errors in untouched files (`CourseNavBar`, `LogoCarousel`, `Footer`); none in the changed files.
- 📁 Files: `src/components/landing/copy.ts` (en/ur h1a and meta_title), `docusaurus.config.ts` (tagline), `tests/e2e/landing.spec.ts` (h1 assertion), this PHR.
- 🔁 Next prompts: owner visual review of the longer hero headline on narrow and Urdu layouts.
- 🧠 Reflection: the h1 is split into four parts (en lead, en language, ur language, terminator), so only the first part changed; the bilingual emphasis stays intact.

## Handoff (for CEO and agents)

- Shipped / changed: hero h1 (en + ur), meta title (en + ur), Docusaurus tagline, and the landing e2e h1 assertion.
- Decisions the team must respect: the new branding phrase is "Platform for current & future teachers and teacher educators" (owner-supplied, ampersand included). The meta title and tagline drop the old "in English and Urdu" and the audience list; the hero h1 keeps the bilingual clause. The Urdu terms `اساتذہ کے تربیت کار` and `پلیٹ فارم` follow the existing corpus usage. Do not re-add "teacher education textbooks" to the hero, meta title or tagline without an owner ruling.
- Pending / next owner: owner review of the rendered hero (especially the longer headline on 390px and the Urdu Nastaliq line). The work is committed on `feat/hero-branding-platform` and opened as PR #542.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none in the changed files. `npx tsc --noEmit` fails on the base checkout in `CourseNavBar`, `LogoCarousel` and `Footer`; these are pre-existing and unrelated.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS (14/14). `npx tsc --noEmit` FAIL on pre-existing unrelated errors only.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
