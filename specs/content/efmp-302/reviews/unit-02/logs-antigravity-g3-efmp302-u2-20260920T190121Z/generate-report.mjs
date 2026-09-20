import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('specs/content/efmp-302/reviews/unit-02/G3/manifest.json', 'utf8'));

const report = {
  "schema_version": 1,
  "course_code": "EFMP-302",
  "unit_no": 2,
  "stage": "G3",
  "disposition": "escalate",
  "reviewer_id": "agent:g3-antigravity-gemini-31-pro",
  "author_run_id": "commit:3806545",
  "reviewer_run_id": "antigravity-g3-efmp302-u2-20260920T190121Z",
  "model": "gemini-3.1-pro-high",
  "started_at": "2026-09-20T19:01:21Z",
  "completed_at": new Date().toISOString(),
  "skill_digest": manifest.skill_digest,
  "input_manifest": manifest.input_manifest,
  "summary": "Initial G3 English review of EFMP-302 Unit 2 on the re-drafted content. Disposition is escalate due to a blocking `sources` failure: four declared-unretrievable sources (carr2000, icka2024, unesco-teacher-ethics, npst-pakistan-2009) are relied upon in the prose to make factual claims without being disclosed as uncorroborated, which violates the owner ruling on missing source text. Assessment checks passed; MCQs and RRQs exactly match the keys and follow the blueprint. Accessibility checks passed; the wide rubric tables are correctly marked as scrollable regions. Commands executed successfully.",
  "criteria": [
    {
      "id": "authority",
      "status": "pass",
      "evidence": [
        "specs/content/efmp-302/content-spec.md Unit 2 section lists guide headings 2.1-2.3 and properly maps them to sub-topics U2-01 to U2-14.",
        "Assessment blueprint is followed: 5-8 formative Remember/Understand items and at least one Analyze-or-higher summative item applying the 4-step framework."
      ]
    },
    {
      "id": "sources",
      "status": "fail",
      "evidence": [
        "BLOCKING: Four sources (carr2000, icka2024, unesco-teacher-ethics, npst-pakistan-2009) are declared as unverifiable in `sources/unit-02.md`.",
        "The prose in `topic-01.mdx`, `topic-02.mdx`, and `topic-04.mdx` relies on these sources for factual claims (e.g., 'professional ethics as role-attached standards', 'Standard 9 carries the code-of-conduct element directly') without disclosing them as uncorroborated, which violates the G3 rubric and D-2026-0001.",
        "Verified supported: bebeau1999 correctly grounds the four-component model.",
        "Verified supported: ehrich2011 supports the concepts of dilemmas as competing claims rather than right-vs-wrong."
      ]
    },
    {
      "id": "coverage",
      "status": "pass",
      "evidence": [
        "All 14 U2 sub-topics map correctly to sections across topic files 01 through 04 as listed in `coverage/unit-02.md`.",
        "Each guide-required sub-topic is present under a concrete heading in the expected file."
      ]
    },
    {
      "id": "assessment",
      "status": "pass",
      "evidence": [
        "All 10 MCQs and 10 RRQs solved blindly and independently align perfectly with the provided keys and model answers.",
        "Bloom demands accurately reflect the actual cognitive effort required rather than just the surface verb.",
        "Mark schemes are internally consistent and accurately total the stated points for each item.",
        "ERQ 4 is an Evaluate item applying the four-step framework to an equity dilemma, satisfying the unit blueprint requirement."
      ]
    },
    {
      "id": "accessibility",
      "status": "pass",
      "evidence": [
        "Rendered page inspection confirms no skipped heading levels.",
        "SVG text geometry inspection reports clean rendering for all figures with no text clipping the viewBox.",
        "Wide tables in narrow viewports correctly report as scrollable elements with tabindex=0 and appropriate aria-labels (scroller=TABLE), making them reachable.",
        "Print emulation passed without clipping."
      ]
    },
    {
      "id": "readability",
      "status": "pass",
      "evidence": [
        "Specialist terms like 'professional ethics' and 'moral sensitivity' are defined upon their first substantive use.",
        "Prose is accessible to the target audience and uses localized classroom examples."
      ]
    },
    {
      "id": "pedagogy",
      "status": "pass",
      "evidence": [
        "Progression from specific classroom situations (e.g. Miss Rabia) to abstract explanations is well-executed.",
        "Misconceptions (like 'if a teacher knows the right thing, they will do it') are explicitly named and dismantled."
      ]
    }
  ],
  "findings": [
    {
      "id": "unverifiable-sources-undisclosed",
      "severity": "blocking",
      "resolved": false,
      "message": "The unit relies on four sources (carr2000, icka2024, unesco-teacher-ethics, npst-pakistan-2009) that are declared as unverifiable in `sources/unit-02.md`. Under owner ruling D-2026-0001, an unretrievable source does not fail the review provided it is declared AND any claims relying on it are disclosed in the text as uncorroborated. The prose in `topic-01.mdx`, `topic-02.mdx`, and `topic-04.mdx` presents foundational claims derived from these sources (such as NPST Standard 9 carrying the code of conduct) as fact, without any disclosure. Repair: Add explicit disclosures to the text where these claims are made, similar to the treatment of the unverified status comparisons in Unit 5."
    }
  ],
  "commands": [
    {
      "name": "validate:content",
      "exit_code": 0,
      "log_path": "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/validate-content.log"
    },
    {
      "name": "check:depth-gate",
      "exit_code": 0,
      "log_path": "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/check-depth-gate.log"
    },
    {
      "name": "check:figures",
      "exit_code": 0,
      "log_path": "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/check-figures.log"
    },
    {
      "name": "check:no-em-dash",
      "exit_code": 0,
      "log_path": "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/check-no-em-dash.log"
    },
    {
      "name": "check:no-answer-keys",
      "exit_code": 0,
      "log_path": "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/check-no-answer-keys.log"
    },
    {
      "name": "check:docs-sync",
      "exit_code": 0,
      "log_path": "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/check-docs-sync.log"
    },
    {
      "name": "render-review",
      "exit_code": 0,
      "log_path": "specs/content/efmp-302/reviews/unit-02/renders-antigravity-g3-efmp302-u2-20260920T190121Z/render-inspect.log"
    }
  ],
  "evidence_manifest": {
    "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/check-depth-gate.log": "15021f8f88122b596e67cfd48c2ff282fde912e1b86bb03c2137bcf9d8e062fd",
    "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/check-docs-sync.log": "cbc9f6e4b0b674cb49e2d9b795d81ed78f23dc431cba1130e4d64cf6d0bed749",
    "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/check-figures.log": "54a388cb9954b9d2f07f84e5385ac0003b94a6a54023abb188e864346958b04f",
    "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/check-no-answer-keys.log": "b393a0a314f24cdcddad68d5c53018b9909412f1af57c9739a7616db2903a304",
    "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/check-no-em-dash.log": "00405490c649d998b589b23505029de9134497966b02ff9ccefb1075aa414dd3",
    "specs/content/efmp-302/reviews/unit-02/logs-antigravity-g3-efmp302-u2-20260920T190121Z/validate-content.log": "5b3153a9d41a11051bff1d2f0396cf26eaaf00ae79e3b894c202823645c0e6a6",
    "specs/content/efmp-302/reviews/unit-02/renders-antigravity-g3-efmp302-u2-20260920T190121Z/render-inspect.log": "daa2bdcafbde83c1561fba88de1c79b6cdae1fb77ec0743acdc116fb91cad809",
    "specs/content/efmp-302/reviews/unit-02/renders-antigravity-g3-efmp302-u2-20260920T190121Z/desktop-index.png": "6d172269fad04e5baf283018ef336fad49ba7c3805c99fda6aceea9d863edad5"
  }
};

fs.writeFileSync('specs/content/efmp-302/reviews/unit-02/G3/antigravity-g3-efmp302-u2-20260920T190121Z.json', JSON.stringify(report, null, 2));
