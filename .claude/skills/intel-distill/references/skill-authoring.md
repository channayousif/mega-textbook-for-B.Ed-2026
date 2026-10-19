# Authoring a skill from intelligence

A skill is a procedure every worker can follow by reading a file. All four CLIs read
`.claude/skills/<name>/SKILL.md` because the crew brief names it, so the skill must work as plain
Markdown, not only as a Claude Code feature. Match the repo's existing skills (`author-unit`,
`review-unit`, `translate-unit`).

## Shape

```
.claude/skills/<name>/
  SKILL.md          frontmatter + the procedure, about 60 to 250 lines
  references/       formats, templates, checklists, worked examples
```

Frontmatter:

```yaml
---
name: <kebab-case, same as the folder>
description: >-
  <What it does, in one sentence.> Use when <the situations, with the exact phrases people and
  crew briefs use: "run X", "fix Y", the stage name>.
---
```

The description decides when the skill is picked up, so it names the triggers concretely. Keep the
SKILL.md body to the procedure and its rules; move formats and long examples to `references/` and
link them (progressive disclosure: a worker reads the detail only when the step needs it).

## Content rules

- Every rule cites what justified it: a registry ID, a PR, a cluster, a decision. A rule without a
  reason gets dropped or broken.
- Steps are imperative and checkable ("run `npm run check:content`; it must report nothing new").
- Say what the skill must not do as plainly as what it does (the protected paths, the owner-only
  calls, ADR-0019 for reviews).
- Repo rules apply: no em dash, heavy commands through `scripts/heavy.sh`, never build locally.
- Prefer updating an existing skill to adding a new one when the procedure belongs to an existing
  stage; a new skill needs a stage or a trigger that no current skill covers.

## Before the PR

- `name` matches the folder; the description says what and when.
- Every file it links exists; every command it names runs in this repo.
- The registry row exists (`proposed`, with the signature it targets).
- The summary names the crew stage whose behaviour changes, if any.
