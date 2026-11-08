// 2026-W45 M1: digests 2026-11-01 C2 to 2026-11-07 C5 explain the geometry and stale-status rules.
export function briefRules(j, self) {
  const common = 'no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git';
  if (!self) return `${common}, never mark G3/G5 done, never self-sign or use\nhuman initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.`;
  return `${common}, and never touch course content (\`docs/\`, \`licence/\`, the Urdu docs trees,
\`specs/content/\`, \`static/img/figures/\`, \`glossary.json\`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.`;
}

