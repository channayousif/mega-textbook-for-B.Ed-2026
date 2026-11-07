# EFMP-407 Unit 3 translation handoff

## Status: blocked before translation

The English baseline is commit `0c0a036d388d62ed71f64eb3a96810390903225b`, also the local `origin/main` at inspection. The branch had no earlier commits or uncommitted changes. No Urdu page or figure was authored, no G4 completion is claimed, and `translation_status` remains `draft`.

The required `.claude/skills/translate-unit/SKILL.md` makes English repair out of scope and explicitly instructs: "if the English is wrong, say so and stop, do not silently improve it in translation". The G2 row is green, but the English still contains an internally contradictory assessment rule:

- `docs/semester-3/efmp-407/unit-03/topic-02.mdx:53` places SDG 5 (gender equality) in Category 2.
- `docs/semester-3/efmp-407/unit-03/unit-assessment.mdx:202` awards marks for calling SDG 5 gender equity in water collection a Category 1 priority.
- The assessment's MCQ 7 guidance at line 139 and RRQ 7 model/guidance at lines 166-167 also mix Category 1 instructions with SDG 5.

This is the existing independent G3 finding F2, not a new review or a translation preference. See `specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/summary.md`. That review also leaves source support, readability and worked-example safeguards unresolved. Translating both rules preserves a contradiction; reconciling them in Urdu alone changes the assessment's meaning. Neither produces the faithful baseline required by G4.

## Next owner and restart conditions

The English author must reconcile the category teaching, questions, guidance and rubric against authoritative evidence, address the existing blocking G3 findings, and refresh stale G2 evidence after English edits. Preserve the independent review history. Then restart G4 against the repaired English commit, using the frozen terminology bank and concept-label proposals. No new Urdu terminology is proposed by this stopped pass.

Use `resolveUnit('.', 'EFMP-407', 3)` and `urPathFor()` to resolve output paths. The intended mirror has five pages: index, Topics 3.1-3.3, and unit assessment. Preserve the 10/10/5 bank, all six figure IDs, learning metadata and heading levels. Translate and wire the six schematic Urdu SVGs with derived dark variants. The banner remains a separate prompt-only illustration job.

The brief prohibits build, server and Playwright execution. Browser-based SVG measurement and narrow/A4 rendered inspection therefore remain pending for an authorised session. Do not substitute source reading for rendered evidence. Keep draft status until independent G5 acceptance. The current translate-unit Step 7 forbids appending a G4 tracker row, so this handoff leaves all gate rows unchanged.

## Validation

`npm run check:content` passed all 14 gates both before edits (HEAD identical to local `origin/main`) and after the handoff and PHR were written. No additional finding relative to main was introduced. Scratch logs are `.crew/content-current.log` and `.crew/content-final.log`. `git diff --check` and explicit new-file punctuation/placeholder checks passed. No build, server, browser, signing, push or PR command was run. These results establish documentation hygiene only; translation remains unstarted and blocked.


## Follow-up: stale evidence repair

The follow-up inspection again found the Category 2 teaching and Category 1 ERQ 4 guidance unchanged. Translation remains blocked by the required skill's English-baseline stop rule. No Urdu pages, figure variants, G4 completion, G3/G5 certification or publication change is claimed.

The previous handoff itself added a unit-scoped input to the G2 manifest. Its reported successful pre-commit gate run did not establish post-commit freshness: the committed handoff invalidated the old G2 evidence. This follow-up commits the handoff first, then regenerates Unit 3 G2 evidence using the repository tool against committed inputs and repoints only Unit 3's G2 reference. This repairs deterministic evidence freshness, not the independent English findings. The generated content-status cache must also be rebuilt after the tracker edit.

The follow-up PHR records the actual final gate result and comparison with a detached local origin/main baseline. English author repair remains the prerequisite for G4. Keep this handoff stable after preparing evidence, because editing it again invalidates G2.
