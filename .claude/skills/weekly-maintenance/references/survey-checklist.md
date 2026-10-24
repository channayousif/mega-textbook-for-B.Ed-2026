# Survey checklist

Standing checks for every weekly survey, on top of what changed since the last run. Each finding
needs evidence; skip a check that finds nothing.

## Code
- Files that grew fastest this week (`git log --since=<date> --numstat`), and functions over about
  80 lines in them. `scripts/crew/crew.mjs` is the usual suspect.
- Logic duplicated in two or more places (a helper reimplemented, a regex list copied).
- Pure logic living in a module that runs on import, so it cannot be tested.
- Dead code: exports nobody imports, commands nobody calls, flags no caller passes.
- Tests missing for code that changed this week; tests not run by CI (`.github/workflows/ci.yml`
  is owner-only: propose, do not edit).

## Docs and artifacts
- README, `ops/crew/README.md`, `guides/`, `AGENTS.md`: commands, paths, numbers and behaviour
  that no longer match the code.
- `.specify/memory/agent-reference.md`'s "Active Technologies" and "Recent Changes" against what actually landed.
- `specs/backlog.md` and `specs/gaps.md`: items that are done or obsolete (propose; gaps are
  append-only, so a resolution is an appended status line, never a deletion).
- PHR hygiene: duplicate IDs, PHRs missing a Handoff section.

## Decisions
- ADRs amended or superseded by a later ADR whose status line does not say so.
- Links between ADRs that do not resolve, and missing back-links.
- Decisions made this week (owner rulings in PHRs, `D-YYYY-NNNN` entries) that meet the AGENTS.md
  ADR significance test: suggest, never create.

## Intelligence
- `specs/intelligence/daily/*.md` since the last run: candidates with recurrence and evidence.
- `specs/intelligence/registry.md`: effect of adopted items (from the digest), stale candidates.
- Crew health: clusters that are still hot (`crew intel status`), jobs that went `gate_red` this
  week and why.
