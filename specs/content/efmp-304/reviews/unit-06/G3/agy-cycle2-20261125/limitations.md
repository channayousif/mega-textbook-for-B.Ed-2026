# Limitations and Review Boundaries - EFMP-304 Unit 6 G3

Reviewer: agent:g3-reviewer (Antigravity agy, Gemini 3.8 Flash)
Conversation ID: 51419376-530b-4268-911b-56fd89ad47b8
Timestamp: 2026-11-25T10:22:00Z

## Review Boundaries
1. Render and Visual Inspection Unavailable:
   - In accordance with .crew/brief.md and AGENTS.md, local npm run build, dev servers, and Playwright e2e runs are strictly prohibited to avoid exhausting host resources on the production server.
   - Per brief instructions, render inspection on the production build (https://textbook.com.pk) was checked via:
     `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- docs/semester-2/efmp-304/unit-06/ static/img/figures/efmp-304/unit-06/`
   - The diff was non-empty (exit 1) because HEAD contains recent illustration additions (fig-U6-9, fig-U6-10, fig-U6-11) not yet deployed in production build b7417e1e0271fd01f1984a48afe830f8ecc3ab85.
   - Consequently, the live site is not the reviewed input. render-review is recorded as unavailable (exit 1), visual accessibility is unverified, and disposition is escalate per review-unit skill contract.

2. Source Text Limits:
   - Print monographs jasper2003, pendrey2022, brookfield2017, taggart2005 are declared in specs/content/efmp-304/sources/unit-06.md as unverifiable for full text and used for title/catalogue-level framing only.
   - pedro2005 is verified open-access via OpenAlex.

3. Assessment Solving:
   - All 10 MCQs were solved independently before reading the answer key. 100% agreement observed.
