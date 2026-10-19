---
name: weekly-maintenance
description: >-
  Run one stage of the crew's weekly self-maintenance (spec-driven, with reusable intelligence):
  the Sunday survey that writes specs/maintenance/<week>/ (spec, plan, tasks, intelligence), a code
  refactor task, a docs or artifacts task, the ADR decision register, a skill task, or the
  independent review of another worker's maintenance PR. Use when a crew brief names this skill or
  a maint_* stage, or when asked to "run weekly maintenance", "survey the repo for maintenance",
  "refactor the crew code", "update the ADR index", "refresh the README/docs", or "promote
  intelligence into a skill".
---

# Weekly maintenance

The crew tends the project itself once a week (Sunday 02:00 PKT): it refactors code, keeps the
decisions readable, refreshes docs and artifacts, and turns the week's lessons into skills, gates
and rules. One survey writes the spec; each task becomes its own job and PR; a worker of another
model family reviews every PR; safe PRs merge on green CI and a passing review, protected ones go to
the owner. Pipeline and rules: `ops/crew/README.md`, "Weekly maintenance" and "Intelligence".

Your brief names your stage and, for a task, its row. Do only that stage.

## Rules for every stage

- Never touch course content: `docs/`, `licence/`, `i18n/**/docusaurus-plugin-content-docs*`,
  `specs/content/`, `static/img/figures/`, `glossary.json`. The dispatcher fails any such diff.
- Smallest viable change. No behaviour change in a refactor unless the task says so. No new
  dependency without a task that says why.
- Never change what an ADR decided. Never auto-create an ADR: if a finding is architecturally
  significant, write the CLAUDE.md suggestion line in `intelligence.md` or your summary.
- No em dash (U+2014) anywhere. Heavy commands (vitest, Playwright, builds, `sharp`) only through
  `scripts/heavy.sh`; never `npm run build`, a dev server or Playwright yourself. CI builds the PR.
- Protected paths (scripts, `.claude/`, ADRs, CLAUDE.md, AGENTS.md, catalog, CI, package files)
  may change only inside your task; such a PR waits for the owner, so say why in your summary.
- Write a PHR only if your brief asks; the dispatcher writes the job's PHR.

## Survey (`maint_survey`)

Write four files in `specs/maintenance/<week>/` and change nothing else. Method:
`.claude/commands/sp.reverse-engineer.md` (intent from implementation) and `sp.analyze.md`
(consistency across artifacts), scoped to what changed since the date in your brief, plus the
standing checks in `references/survey-checklist.md`.

1. **spec.md**: findings, each with evidence (file:line, commit, PR, job id, cluster) and why it
   matters; then the goals for this week.
2. **plan.md**: for each goal, the approach and what it must not break.
3. **tasks.md**: the table in `references/tasks-format.md`. At most six rows, ranked by value per
   unit of risk. Each row must be finishable by one worker in one job, with acceptance checks a
   reviewer can verify from the diff.
4. **intelligence.md**: the week's promotion decisions. Read every `specs/intelligence/daily/*.md`
   since the brief's date and `specs/intelligence/registry.md`. For each candidate with recurrence
   and evidence: promote (give it a task row of area `skill`, `code` or `docs`, and a registry row
   to add as `proposed`), defer (why), or reject (why). Also report the effect lines from the daily
   digest for adopted items, and propose `retired` for items whose signal is gone and whose home
   no longer needs them.

## Code (`maint_refactor`)

Tests first: if a suite covers the code (`tests/crew/*.test.mjs` with `node --test`, or
`tests/unit` through `scripts/heavy.sh npx vitest run <file>`), make sure it passes before and after;
add a test for any behaviour your refactor could break. Keep public interfaces, CLI commands and
file formats unchanged unless the task changes them. Pure helpers belong in their own module so they
can be tested (the crew's pattern: `scripts/crew/*.mjs`, tests in `tests/crew/`).

## Docs and artifacts (`maint_docs`)

Make README, `ops/`, `guides/`, `specs/` overviews and comments say what the code does today. Verify
every command, path and number you write against the repo (run the command, open the file). Prefer
deleting a stale paragraph to adding a caveat. Do not touch generated docs: `npm run check:docs-sync`
must still pass.

## ADR register (`maint_adr`)

Regenerate `history/adr/README.md` following `references/adr-register.md`, so a reader understands
every decision in one place and can follow a link to the full ADR. Hygiene fixes in the ADR files
themselves are limited to broken links, status lines that do not record a later amendment, and
missing back-links. Never rewrite a Decision, Consequences or Alternatives section. This PR always
goes to the owner.

## Skill (`maint_skill`)

Create or update `.claude/skills/<name>/` for a promoted candidate, following
`../intel-distill/references/skill-authoring.md`: frontmatter `name` plus a `description` that
says what it does and when to use it (with the phrases people and briefs use), a short SKILL.md with
the procedure, details in `references/`. Every rule in it cites the evidence that justified it
(registry ID, PR, cluster). Add or update the registry row (status `proposed`). If the skill changes
what a crew stage does, say which stage in your summary. This PR always goes to the owner.

## Review (`maint_review`)

You are independent: another model family wrote the PR. Change nothing and commit nothing.

1. Read the task row and acceptance checks in your brief, then `git diff origin/main...HEAD` and
   every file it touches in full.
2. Check: each acceptance item is met; behaviour is unchanged where the task says refactor; tests
   cover what changed and pass (`node --test tests/crew/*.test.mjs` is cheap, run it); no content
   path, no em dash, no secret, no unrelated edit; docs match the code.
3. End with `CREW-SUMMARY: <your verdict in one sentence>` and then exactly one of
   `CREW-VERDICT: pass` or `CREW-VERDICT: revise - <what must change, specific enough to act on>`.
   Revise only for a defect you can point at, never for taste.
