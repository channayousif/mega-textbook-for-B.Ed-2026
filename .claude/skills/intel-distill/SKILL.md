---
name: intel-distill
description: >-
  Turn the crew's harvested signals (recurring failures, handoff notes, log errors, PHR
  reflections, review findings) into a dated list of reusable-intelligence candidates in
  specs/intelligence/daily/<date>.md: each a proposed skill, gate, crew brief or planner fix,
  AGENTS.md/CLAUDE.md rule, memory note, ADR suggestion or style-guide proposal, with evidence and
  recurrence. Use when a crew brief names this skill or the intel_distill stage, or when asked to
  "distil today's intelligence", "what has the crew learned", "extract lessons from the logs", or
  "propose skills from recurring problems".
---

# Intelligence distill

The crew forgets what it learns unless someone writes it down where every worker reads it. Every 12
hours a harvest (`scripts/crew/intel.mjs`, no model) folds new signals into clusters by their
normalised signature; once a day you judge what the clusters that grew mean. You propose; the weekly
maintenance survey promotes, a reviewer of another model family checks, and the owner approves
anything that changes how workers behave. Pipeline: `ops/crew/README.md`, "Intelligence".

Your brief lists the clusters that grew in the last 24 hours: kind, recent count, total, signature,
an example and evidence (job ids, log files, PHR and report paths).

## Steps

1. **Read before judging.** Open the evidence of every cluster with a recent count of 3 or more, or
   of kind `failure` or `cron`: the job's log under `~/.crew/<project>/logs/` when it is on this
   host, the PHR, the report. Note the root cause, not the symptom: 25 jobs failing the same gate is
   one cause.
2. **Check what already exists.** `specs/intelligence/registry.md` (adopted, proposed and candidate
   items), `.claude/skills/*/SKILL.md`, AGENTS.md, CLAUDE.md, and the last seven
   `specs/intelligence/daily/*.md`. A cluster an adopted item targets is evidence for that item's
   effect, not a new candidate. A repeat of an earlier candidate raises its recurrence; do not
   re-propose it as new.
3. **Write candidates** in `specs/intelligence/daily/<date>.md` in the format of
   `references/candidate-format.md`, strongest first, at most ten. A candidate needs a cause you can
   state, a proposed home, and evidence; "seen once" is not enough unless it broke main or lost data.
4. **Choose the home** (one per candidate):
   - **skill**: a repeatable procedure a worker needs and does not have. New skills follow
     `references/skill-authoring.md`.
   - **gate or check**: a defect a script can detect (the registry guard, a content gate). Name the
     check and what it compares.
   - **crew brief or planner fix**: the dispatcher sends workers into the problem
     (`scripts/crew/crew.mjs` briefs, `planner.mjs`).
   - **AGENTS.md rule**: a one-line rule every worker must follow (CLAUDE.md only imports AGENTS.md).
   - **memory note**: only for the lead's own sessions (Claude memory), when no repo file fits.
   - **ADR suggestion**: an architecturally significant decision (AGENTS.md's three-part test).
     Write the suggestion line; never create the ADR.
   - **style-guide proposal**: content standards are owner-only and re-open the corpus; propose,
     with the cost.
5. **Note effects.** For adopted registry items whose signature appears in your clusters, add one
   line each under "Effects": the item, the signal's recent count, and whether that looks like it
   worked.

## Rules

- Write only `specs/intelligence/daily/<date>.md`. Never edit skills, rules, scripts or the registry
  here: promotion is the weekly survey's job, so every change gets a task, a review and, when
  protected, the owner.
- Evidence is quoted or linked, never invented. If you could not open a log, say so.
- No em dash (U+2014). No secrets, tokens or personal data copied from logs.
- End with `CREW-SUMMARY: <n candidates; the strongest in a few words>`.
