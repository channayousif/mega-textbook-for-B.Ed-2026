# Summary: G3 English Review of EFPG-402 Unit 1

- **Course**: EFPG-402 (Teaching of General Science)
- **Unit**: 1 (Nature and Importance of Science)
- **Reviewer**: `agent:g3-reviewer`
- **Reviewer run ID**: `e9bd17ee-cecf-4f54-9149-3a5da9b53668`
- **Author run ID**: `commit:5575ac2aba126a90814c26464b885914108d9142`
- **Model**: Gemini 3.8 Flash (Medium)
- **Disposition**: `escalate`

## Key findings

1. **Content and academic quality**:
   - All academic content criteria (`authority`, `sources`, `coverage`, `assessment`, `readability`, `pedagogy`) pass with thorough evidence.
   - The five topics (1.1-1.5) cover all 7 subtopics (U1-01 to U1-07) mapped from Guide Unit 1 (`:738-744`).
   - Mapped readings are fully grounded in bound excerpts: *National Curriculum of Pakistan 2022-23: Science, Grades 4-8*, *The Stanford Encyclopedia of Philosophy (Scientific Method)*, Halai (2003), and EPI Pakistan Fact File. Print monographs (Das 1985, Yadav 2002) are properly declared under `## Unverifiable sources` (`D-2026-0001`).
   - Independent solving of all 10 MCQs confirmed 100% agreement with the answer key. Distractors are well balanced and unambiguous. RRQs and ERQs provide rigorous, Bloom-aligned model answers and analytic rubrics.

2. **Deterministic checks**:
   - `validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`, `build:content-status`, and `check:content` all exit 0.
   - `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-01/*.svg` exits 0 across all 40 SVGs (20 English + 20 Urdu).

3. **Accessibility and render review limitation**:
   - Production website `https://textbook.com.pk` is built from deployed SHA `0cbed86bb96f7a6a03420ad3e5d726a47e8f5513`, which differs from current HEAD `956c4ba914a2750e5058774e1d916bb4b11f7c5d` on `docs/semester-4/efpg-402/unit-01/index.mdx` and `static/img/figures/efpg-402/unit-01/fig-U1-11.webp`.
   - Per brief rules, `render-review` is recorded as unavailable (exit code 1).
   - Visual presentation on live renders remains unverified; disposition is therefore `escalate`.
