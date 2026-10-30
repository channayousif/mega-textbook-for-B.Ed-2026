# GNAS-301 Unit 6 G3 repair reconciliation

Disposition: **escalate**, advisory only. Reviewed commit: 44c92150cbef0270e58b1e06ef56af680633aace. No certification or publication transition.

The crew brief calls this the second and last cycle, but two stored reports already exist and specs/gaps.md G-2026-33 remains open. This records requested repair verification and evidence limitations, not permission for further review cycles.

## Previous findings, in original order

1. **Repaired/closed for this reconciliation:** ERQ-04 and rubric now explicitly integrate greenhouse enhancement and smog, including shared activities and distinct harm routes.

2. **Repaired/closed for this reconciliation:** MCQ-03 and MCQ-10 now cover 6.6; RRQ-08 and RRQ-10 cover 6.6. Counts by topics 6.1..6.6 are 2/2/2/1/1/2 for both banks. concepts/unit-06.md maps the replacements.

3. **Repaired/closed for this reconciliation:** topic-06 Common misconception now says cutting emissions can result in very large gains for health; the unsupported largest-intervention superlative is gone. The WHO excerpt does not contain this repaired sentence, so its current source support remains unverified.

4. **Repaired/closed for this reconciliation:** topic-05 Further reading and sources/texts/anwar2026.md now carry the same ten authors as sources/unit-06.md. The excerpt verification statement names all ten. This verifies consistency, not a new registry fetch.

5. **Repaired/closed for this reconciliation:** Current file inspection confirms the four substantive repairs, rather than relying on commit messages. Historical repair-process failure remains in the prior append-only report.

6. **Repaired/closed for this reconciliation:** topic-06 worked example now describes measures a heat-action plan carries to protect residents, without claiming a measured reduction in deaths.

7. **Repaired/closed for this reconciliation:** The five terms have first-use Glossary tags in topics 01,02,04,06 and entries in root glossary.json. This file is not bound by the generated manifest, so acceptance must bind it separately.

8. **Repaired/closed for this reconciliation:** Current MCQ key is b,d,b,a,c,b,a,d,c,d: a=2,b=3,c=2,d=3. The former eight-b skew is removed.

9. **Carried unresolved:** ERQ-02 is still labelled Evaluate while its rubric tops out at Apply; ERQ-05 Create still rests on the one-mark closing sentence. MCQ-05 Analyze asks for recall of the stated threshold rationale. Align labels and actual required thinking.

10. **Carried unresolved:** Generated manifest still omits sources/texts/who-chemical-safety.md, nasa-climate-evidence.md and un-paris.md. They were read for reconciliation only and do not establish input-bound source acceptance.

11. **Repaired/closed for this reconciliation:** sources/texts/adnan2024.md Abstract now includes the less-than-1-percent emissions sentence.

12. **Repaired/closed for this reconciliation:** figures/unit-06.md fig-U6-3 now says seven rows and lists the seven classes.

13. **Carried unresolved:** No actual author-session identity for the latest reviewed bytes was supplied. The old report author identity describes an earlier repair state and cannot be reused as verified provenance. This session authored none of the inputs; reviewer thread is recorded from CODEX_THREAD_ID.

## Evidence limits

The inherited crew-20261028/manifest.json matches a newly prepared 116-input manifest exactly. No input was changed. Author run provenance and exact reviewer deployment version were not supplied. The current session identity is available, but provenance cannot be inferred from commit authorship.

The brief explicitly forbids builds, servers and Playwright. No current desktop, 360px, A4 print or SVG geometry inspection was performed. Historical September screenshots are not evidence for changed current bytes. All seven criteria are reported; unverified criteria remain unverified.

The assessment bank was encountered with its supplied answers during source reading. The separately saved derivation is a critical re-solve, not a blind pre-key solve; it cannot satisfy the skill requirement to solve before consulting supplied answers.

## Additional actionable observations

- unit-assessment.mdx RRQ-04 presupposes sensitizer harm appears only after years. topic-02 explains later exposure, which does not imply a fixed years-long delay. Remove the absolute premise and accept variable timing.
- RRQ-05 supplies no pesticide formulation, exposure duration or protection data, so a fixed route ranking is not determined. Its marking guide accepts a defensible ranking, but the question should explicitly request assumptions.
- concepts/unit-06.md CON:GNAS-301-6-4 maps RRQ-04 and ERQ-02 to dose-response curves although those assess sensitization and acute/chronic effects, not curve interpretation. CON:GNAS-301-6-5 maps RRQ-05 absorption ranking to essentiality. Reconcile these mappings.
- topic-03 Activity says multiply pollutant totals and read a magnification factor. A concentration comparison needs organism mass or concentrations, not totals alone. Give explicit units, masses/concentrations and retention assumptions; ERQ-03 rubric likewise requests arithmetic without supplied data.
- topic-04 Activity and teacher notes call the two-pane experiment the whole mechanism without stating the model limitations. Ask the subject owner to distinguish the classroom model from the atmospheric radiation explanation.
- Source excerpts are too narrow to verify every toxicology definition, route-ranking assertion, or Lahore sulfurous-dominance claim. This review has not independently established those claims. Bind suitable source passages before accepting them.

## Checks and handoff

All six mandatory npm checks ran successfully; the initial 13-gate check:content also passed. No render-review command is claimed. See commands.json and hashed logs. A later full review needs owner resolution of G-2026-33, a supplied author-session identity, a complete source bundle, blind assessment evidence and current narrow/print renders. The owner/author owns content repairs; a fresh authorized reviewer owns the next full review. G3 and G5 remain open.

Final validation: all 13 content gates passed after regenerating the ignored static/content-status.json cache with npm run build:content-status. The tracker edit had made only its local tracker digest stale. Both the failed pre-refresh log and successful final log are retained. No comparison against origin/main failures was needed because the final suite has zero findings.
