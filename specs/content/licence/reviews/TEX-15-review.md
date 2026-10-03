# Urdu Quality Review: TEX-15 (PR #86)

**Reviewer Run ID:** AGY_CONVERSATION_ID
**Target:** PR #86 (base `agent/TEX-5`, head `agent/TEX-12`)
**Files under review:**
- `i18n/ur/code.json`
- `i18n/ur/docusaurus-plugin-content-pages/about.mdx`
- `i18n/ur/docusaurus-plugin-content-pages/contact.mdx`

## Specific Calls

1. **`جامعہ سندھ کے شعبۂ تعلیم` for "University of Sindh, Faculty of Education":**
   **Verdict: Approved.**
   This is the correct standard term for the University of Sindh. While `کلیہ تعلیم` is a more formally accurate translation for "Faculty", `شعبۂ تعلیم` (Department of Education) is widely understood and fits the requested academic-plain ("درسی مگر عام فہم") register perfectly. This is the recommended form for accessibility.

2. **`معیارِ جانچ` vs `معیارِ نشان دہی` for "rubric":**
   **Verdict: `معیارِ جانچ` wins.**
   "Rubric" in an educational context means an evaluation standard or scoring guide. `معیارِ جانچ` translates directly to "standard of evaluation/assessment", which is highly accurate and easily understood. `معیارِ نشان دہی` leans towards "standard of indication", which is less precise. The older licence pages should be swept in a follow-up to replace `معیارِ نشان دہی` with `معیارِ جانچ`.

## General Quality Findings

- **Register (Academic-plain / درسی مگر عام فہم):**
  The translation successfully holds the academic-plain register. Phrases like `پاکستان کے زیرِ تربیت اور پہلے سے پڑھا رہے اساتذہ کے لیے` and `یہ منصوبہ نصاب کے ماہرین... کی ایک پُرعزم ٹیم چلا رہی ہے` read very naturally as Urdu written by a Pakistani teacher, not as a gloss.
- **Transliterated product names (`لائسنس پریکٹس پاس` and `بی ایڈ ڈیجیٹل ٹیکسٹ بک`):**
  **Approved.** This matches standard practice in Pakistan where digital product names and technical terms are often kept as English loanwords to avoid clunky literal translations. It is the correct call for paid product names.
- **`پہلے سے پڑھا رہے اساتذہ` for "practising teachers":**
  **Approved.** This choice aligns perfectly with the goal of a plain register. While `دورانِ ملازمت اساتذہ` or `برسرِ روزگار اساتذہ` might sound slightly more professional (for in-service), `پہلے سے پڑھا رہے اساتذہ` is perfectly clear and plain (عام فہم).
- **Exactness:**
  - `Rs 1,500`, `60`, `5`, `CRQ`, `ERQ` and `/app/` have been preserved perfectly without changes.
  - E.g., `معیارِ جانچ کے ساتھ 5 کیس اسٹڈی والے طویل جوابی سوال (ERQ)` correctly matches the source's offer.

## Disposition

**PASS.** 
The Urdu copy passes the quality review. It reads naturally, accurately follows terminology decisions, and successfully targets the plain register. The PR is ready to move forward.
