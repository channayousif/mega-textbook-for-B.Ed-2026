# tasks.md format

The dispatcher reads this table (`parseTasks` in `scripts/crew/maintenance.mjs`) and queues one job
per row, so its shape is a contract.

```markdown
# Maintenance tasks, 2026-W43

| ID | Area | Title | Files | Acceptance | Risk |
|---|---|---|---|---|---|
| M1 | code | Move PR handling out of crew.mjs into scripts/crew/prs.mjs | scripts/crew/crew.mjs, scripts/crew/prs.mjs, tests/crew/prs.test.mjs | node --test tests/crew/*.test.mjs passes; crew.mjs tick --dry-run output unchanged on a copied state | medium |
| A1 | adr | Regenerate the decision register | history/adr/README.md | every ADR 0001..0030 has a row with status, summary and links; every link resolves | low |
```

- **ID**: unique within the week, letters and digits (`M1`, `D2`, `A1`, `S1`). It becomes part of the
  job ID and branch name.
- **Area**: one of `code`, `docs`, `artifacts`, `adr`, `skill`. Rows with any other area are
  dropped. `code` runs as `maint_refactor`, `docs` and `artifacts` as `maint_docs`, `adr` as
  `maint_adr`, `skill` as `maint_skill`.
- **Title**: what the PR does, in the imperative. It becomes the PR title.
- **Files**: the files the task may change, comma-separated. The worker's scope.
- **Acceptance**: checks a reviewer can verify from the diff and a command run. Not "improved".
- **Risk**: `low`, `medium` or `high`, with the reason in plan.md for anything above low.

At most six rows are used, in table order. Pipes inside a cell break the table: write "or".
