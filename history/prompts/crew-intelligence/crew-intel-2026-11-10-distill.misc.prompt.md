---
id: crew-intel-2026-11-10-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-09
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-10-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-10.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-10-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-10-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-10.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [cron] x24 recent, 24 total, since 2026-11-08: owner-sync: fast-forward blocked (n behind): error: your local changes to the following files would be overwritten by merge: agents.md package.json <path>
  example: owner-sync: fast-forward blocked (772 behind): error: Your local changes to the following files would be overwritten by merge: 	AGENTS.md 	package.json 	scripts/heavy.sh
  evidence: cron.log
- [cron] x17 recent, 466 total, since 2026-11-03: owner-sync: fast-forward blocked (n behind): error: your local changes to the following files would be overwritten by merge: package.json please commit your cha
  example: owner-sync: fast-forward blocked (15 behind): error: Your local changes to the following files would be overwritten by merge: 	package.json Please commit your changes or stash them before you merge. A
  evidence: cron.log
- [review] x9 recent, 18 total, since 2026-11-08: inherited unresolved finding from <path>
  example: Inherited unresolved finding from specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/crew-efmp-407-u08-review_en.json
  evidence: review:specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1.json, review:specs/content/efmp-407/reviews/unit-08/G3/20261108T203238Z-g3-desk-04abd597.json
- [review] x7 recent, 14 total, since 2026-11-07: inherited from <path>, not resolved
  example: Inherited from specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json, not resolved
  evidence: review:specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en-r1.json, review:specs/content/efmp-407/reviews/unit-05/G3/20261108T203238Z-g3-desk-7b51d549.json
- [review] x4 recent, 14 total, since 2026-10-28: assessment
  example: assessment
  evidence: review:specs/content/efmp-301/reviews/unit-09/G3/20261108T203238Z-g3-desk-cb72c312.json, review:specs/content/geng-301/reviews/unit-02/G3/20261108T203238Z-g3-desk-573fa197.json, review:specs/content/gicp-400/reviews/unit-07/G3/20261108T203238Z-g3-desk-8314fbc3.json
- [review] x4 recent, 13 total, since 2026-10-30: fn <path>
  example: F07 pedagogy/assessment
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/20261102T211054Z-g3-desk-fd0a1ec1.json, review:specs/content/geng-301/reviews/unit-06/G3/20261108T203238Z-g3-desk-80672f33.json, review:specs/content/gpks-402/reviews/unit-06/G3/20261108T203238Z-g3-desk-558b2467.json
- [review] x3 recent, 12 total, since 2026-10-28: prior findingn partly unresolved
  example: Prior finding6 partly unresolved
  evidence: review:specs/content/efmp-301/reviews/unit-09/G3/20261102T212207Z-g3-desk-b282fccc.json, review:specs/content/efmp-301/reviews/unit-09/G3/20261102T211054Z-g3-desk-15f0d2e9.json, review:specs/content/efmp-301/reviews/unit-09/G3/20261108T203238Z-g3-desk-cb72c312.json
- [review] x3 recent, 10 total, since 2026-10-28: visual browser and print inspection (npx viewport, keyboard table scrolling, desktop layout, and an print view) could not be executed because the crew job brief
  example: Visual browser and print inspection (360px viewport, keyboard table scrolling, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running npm run 
  evidence: review:specs/content/gnas-301/reviews/unit-01/G3/20261108T203238Z-g3-desk-c79546af.json, review:specs/content/gnas-301/reviews/unit-04/G3/20261108T203238Z-g3-desk-6fc6eb05.json, review:specs/content/gsos-301/reviews/unit-06/G3/20261108T203238Z-g3-desk-c052da40.json
- [review] x3 recent, 8 total, since 2026-10-28: accessibility
  example: accessibility
  evidence: review:specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0.json, review:specs/content/geng-301/reviews/unit-02/G3/20261108T203238Z-g3-desk-573fa197.json, review:specs/content/gicp-400/reviews/unit-07/G3/20261108T203238Z-g3-desk-8314fbc3.json
- [review] x3 recent, 8 total, since 2026-10-28: pedagogy
  example: Pedagogy
  evidence: review:specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0.json, review:specs/content/efmp-301/reviews/unit-09/G3/20261108T203238Z-g3-desk-cb72c312.json, review:specs/content/gicp-400/reviews/unit-07/G3/20261108T203238Z-g3-desk-8314fbc3.json
- [phr] x3 recent, 4 total, since 2026-11-08: reflection: automated generation with strict visual inspection ensures compliance with house style and cultural authenticity. refreshing stale gn evidence immed
  example: reflection: Automated generation with strict visual inspection ensures compliance with house style and cultural authenticity. Refreshing stale G2 evidence immediately after placing banner maintains gr
  evidence: phr:history/prompts/general/2467-efmp-407-u07-illustrate.general.prompt.md, phr:history/prompts/general/2466-efmp-407-u06-illustrate.general.prompt.md, phr:history/prompts/general/2465-efmp-407-u05-illustrate.general.prompt.md
- [review] x2 recent, 8 total, since 2026-10-19: render inspection (visual accessibility
  example: Render inspection (visual accessibility
  evidence: review:specs/content/efmp-304/reviews/unit-03/G3/20261102T211054Z-g3-desk-98445761.json, review:specs/content/efmp-304/reviews/unit-03/G3/20261108T203238Z-g3-desk-ef4a8074.json, review:specs/content/gsos-301/reviews/unit-05/G3/20261108T203238Z-g3-desk-563e3167.json
- [review] x2 recent, 8 total, since 2026-10-28: content-n
  example: CONTENT-01
  evidence: review:specs/content/gnas-301/reviews/unit-02/G3/20261102T212207Z-g3-desk-bc87d518.json, review:specs/content/gnas-301/reviews/unit-02/G3/20261102T211054Z-g3-desk-207756e4.json, review:specs/content/gnas-301/reviews/unit-02/G3/20261108T203238Z-g3-desk-1425bad4.json
- [review] x2 recent, 8 total, since 2026-10-28: prior finding n
  example: Prior finding 2
  evidence: review:specs/content/geng-301/reviews/unit-01/G3/20261102T212207Z-g3-desk-df5b9545.json, review:specs/content/geng-301/reviews/unit-01/G3/20261102T211054Z-g3-desk-78d0fea3.json, review:specs/content/geng-301/reviews/unit-01/G3/20261108T203238Z-g3-desk-277c0cbe.json
- [review] x2 recent, 8 total, since 2026-10-28: carry-forward prior finding n
  example: Carry-forward prior finding 5
  evidence: review:specs/content/efmp-301/reviews/unit-03/G3/20261102T212207Z-g3-desk-aaa9f247.json, review:specs/content/efmp-301/reviews/unit-03/G3/20261102T211054Z-g3-desk-1ffb278b.json, review:specs/content/efmp-301/reviews/unit-03/G3/20261108T203238Z-g3-desk-abd7d7ca.json
- [review] x2 recent, 6 total, since 2026-11-03: carried unresolved from cycle n
  example: Carried unresolved from cycle 1
  evidence: review:specs/content/efmp-302/reviews/unit-02/G3/20261102T212207Z-g3-desk-d78cf623.json, review:specs/content/efmp-302/reviews/unit-02/G3/20261102T211054Z-g3-desk-4739b695.json, review:specs/content/efmp-302/reviews/unit-02/G3/20261108T203238Z-g3-desk-7df34fb8.json
- [review] x2 recent, 6 total, since 2026-11-03: sn sources, carried unresolved from run-n (owner-judgement; re-verified live in current bytes)
  example: S1 SOURCES, carried unresolved from run-007 (owner-judgement; re-verified live in current bytes)
  evidence: review:specs/content/efmp-302/reviews/unit-06/G3/20261102T212207Z-g3-desk-d7dcc6df.json, review:specs/content/efmp-302/reviews/unit-06/G3/20261102T211054Z-g3-desk-cb70bbb5.json, review:specs/content/efmp-302/reviews/unit-06/G3/20261108T203238Z-g3-desk-c1793ead.json
- [review] x2 recent, 6 total, since 2026-11-03: sn sources, carried unresolved from run-n (re-verified live)
  example: S3 SOURCES, carried unresolved from run-007 (re-verified live)
  evidence: review:specs/content/efmp-302/reviews/unit-06/G3/20261102T212207Z-g3-desk-d7dcc6df.json, review:specs/content/efmp-302/reviews/unit-06/G3/20261102T211054Z-g3-desk-cb70bbb5.json, review:specs/content/efmp-302/reviews/unit-06/G3/20261108T203238Z-g3-desk-c1793ead.json
- [review] x2 recent, 6 total, since 2026-11-03: pn pedagogy, carried unresolved from run-n (re-verified live)
  example: P3 PEDAGOGY, carried unresolved from run-007 (re-verified live)
  evidence: review:specs/content/efmp-302/reviews/unit-06/G3/20261102T212207Z-g3-desk-d7dcc6df.json, review:specs/content/efmp-302/reviews/unit-06/G3/20261102T211054Z-g3-desk-cb70bbb5.json, review:specs/content/efmp-302/reviews/unit-06/G3/20261108T203238Z-g3-desk-c1793ead.json
- [review] x2 recent, 6 total, since 2026-11-03: preserved from runn (bank byte-identical)
  example: PRESERVED FROM RUN001 (bank byte-identical)
  evidence: review:specs/content/gict-300/reviews/unit-03/G3/20261102T212207Z-g3-desk-319cad35.json, review:specs/content/gict-300/reviews/unit-03/G3/20261102T211054Z-g3-desk-44d19b33.json, review:specs/content/gict-300/reviews/unit-03/G3/20261108T203238Z-g3-desk-4a1e4039.json
- [review] x2 recent, 4 total, since 2026-11-07: sources (constitutional accuracy)
  example: sources (constitutional accuracy)
  evidence: review:specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0.json, review:specs/content/gicp-400/reviews/unit-07/G3/20261108T203238Z-g3-desk-8314fbc3.json
- [phr] x2 recent, 2 total, since 2026-11-08: failure modes observed: initial live assertion assumed tmux service leaf; corrected to validated agent-slice ancestry. inline scratch test quoting failed before
  example: failure modes observed: Initial live assertion assumed tmux service leaf; corrected to validated agent-slice ancestry. Inline scratch test quoting failed before execution and was replaced by reusable 
  evidence: phr:history/prompts/general/20261123-vscode-containment-persistent-agents.general.prompt.md, phr:history/prompts/general/20261124-windows-contained-ssh-key-instructions.general.prompt.md
- [phr] x2 recent, 2 total, since 2026-11-08: next experiment (smallest change to try): connect two real vs code windows through dedicated identity and check all child cgroups.
  example: next experiment (smallest change to try): Connect two real VS Code windows through dedicated identity and check all child cgroups.
  evidence: phr:history/prompts/general/20261123-vscode-containment-persistent-agents.general.prompt.md, phr:history/prompts/general/20261124-windows-contained-ssh-key-instructions.general.prompt.md
- [review] x2 recent, 2 total, since 2026-11-09: partially repaired
  example: Partially repaired
  evidence: review:specs/content/efmp-301/reviews/unit-05/G3/20261108T203238Z-g3-desk-c3af68da.json
- [review] x1 recent, 19 total, since 2026-10-28: headless review tooling constraint
  example: Headless review tooling constraint
  evidence: review:specs/content/efmp-406/reviews/unit-05/G3/4df544c3-c825-473c-8c69-940a86171cf5.json, review:specs/content/gnas-301/reviews/unit-05/G3/20261102T140729Z-g3-desk-6da9f991.json, review:specs/content/efmp-406/reviews/unit-01/G3/20261108T203238Z-g3-desk-5985010a.json
- [review] x1 recent, 13 total, since 2026-10-31: teaching case illustrations and hypothetical examples
  example: Teaching case illustrations and hypothetical examples
  evidence: review:specs/content/gpks-402/reviews/unit-04/G3/20261102T140729Z-g3-desk-8621b0c7.json, review:specs/content/efmp-406/reviews/unit-01/G3/5be15169-67ce-493e-9ccd-e4c8e6b64a2d.json, review:specs/content/efmp-406/reviews/unit-01/G3/20261108T203238Z-g3-desk-5985010a.json
- [review] x1 recent, 9 total, since 2026-11-02: catalog entry pending owner ruling
  example: Catalog entry pending owner ruling
  evidence: review:specs/content/efmp-406/reviews/unit-01/G3/20261102T212036Z-g3-desk-45e9b45b.json, review:specs/content/efmp-406/reviews/unit-05/G3/20261102T212135Z-g3-desk-466a27a9.json, review:specs/content/efmp-406/reviews/unit-01/G3/20261108T203238Z-g3-desk-5985010a.json
- [review] x1 recent, 6 total, since 2026-10-19: terminology banking proposal
  example: Terminology banking proposal
  evidence: review:specs/content/efmp-305/reviews/unit-03/G3/20261102T212207Z-g3-desk-d26592ad.json, review:specs/content/efmp-305/reviews/unit-03/G3/20261102T211054Z-g3-desk-68a046eb.json, review:specs/content/efmp-305/reviews/unit-03/G3/20261108T203238Z-g3-desk-d15c80fc.json
- [review] x1 recent, 6 total, since 2026-10-23: <path>, rrq n model answer
  example: docs/semester-2/gqur-301/unit-11/unit-assessment.mdx, RRQ 10 model answer
  evidence: review:specs/content/gqur-301/reviews/unit-11/G3/20261102T211054Z-g3-desk-3f0cadea.json, review:specs/content/gqur-301/reviews/unit-15/G3/20261102T211054Z-g3-desk-fa040404.json, review:specs/content/gqur-301/reviews/unit-11/G3/20261108T203238Z-g3-desk-372798f7.json
- [review] x1 recent, 6 total, since 2026-10-23: rendered accessibility unverified
  example: Rendered accessibility unverified
  evidence: review:specs/content/gqur-301/reviews/unit-14/G3/20261102T211054Z-g3-desk-4de3fcfe.json, review:specs/content/gqur-301/reviews/unit-15/G3/20261102T211054Z-g3-desk-fa040404.json, review:specs/content/gqur-301/reviews/unit-14/G3/20261108T203238Z-g3-desk-332287bd.json
- [review] x1 recent, 5 total, since 2026-10-19: unit depth budget
  example: Unit depth budget
  evidence: review:specs/content/efmp-305/reviews/unit-06/G3/20261102T212207Z-g3-desk-5907f448.json, review:specs/content/efmp-305/reviews/unit-06/G3/20261102T211054Z-g3-desk-5e601a1c.json, review:specs/content/efmp-305/reviews/unit-06/G3/20261108T203238Z-g3-desk-2a3b76c3.json
- [review] x1 recent, 5 total, since 2026-10-19: full-text source retrieval for unicef (n)
  example: Full-text source retrieval for UNICEF (2014)
  evidence: review:specs/content/efmp-305/reviews/unit-06/G3/20261102T212207Z-g3-desk-5907f448.json, review:specs/content/efmp-305/reviews/unit-06/G3/20261102T211054Z-g3-desk-5e601a1c.json, review:specs/content/efmp-305/reviews/unit-06/G3/20261108T203238Z-g3-desk-2a3b76c3.json
- [review] x1 recent, 5 total, since 2026-10-19: research context and local applicability
  example: Research context and local applicability
  evidence: review:specs/content/efmp-305/reviews/unit-06/G3/20261102T212207Z-g3-desk-5907f448.json, review:specs/content/efmp-305/reviews/unit-06/G3/20261102T211054Z-g3-desk-5e601a1c.json, review:specs/content/efmp-305/reviews/unit-06/G3/20261108T203238Z-g3-desk-2a3b76c3.json
- [review] x1 recent, 5 total, since 2026-11-02: abstract-level citation for shakir et al
  example: Abstract-level citation for Shakir et al
  evidence: review:specs/content/efmp-406/reviews/unit-01/G3/20261102T210200Z-g3-desk-ca7ba17e.json, review:specs/content/efmp-406/reviews/unit-06/G3/20261102T210705Z-g3-desk-d3bd5a8a.json, review:specs/content/efmp-406/reviews/unit-01/G3/20261108T203238Z-g3-desk-5985010a.json
- [review] x1 recent, 4 total, since 2026-10-19: render-review step could not be performed
  example: render-review step could not be performed
  evidence: review:specs/content/efmp-303/reviews/unit-04/G3/20261102T212207Z-g3-desk-a0d82ff4.json, review:specs/content/efmp-303/reviews/unit-04/G3/20261102T211054Z-g3-desk-9e5135f9.json, review:specs/content/efmp-303/reviews/unit-04/G3/20261108T203238Z-g3-desk-a67ec0a3.json
- [review] x1 recent, 4 total, since 2026-10-19: topic n.n line n cites (government of pakistan, n) for a specific numerical claim (below n.n per cent gdp, n per cent commitment) but the source is declared unv
  example: Topic 4.2 line 36 cites (Government of Pakistan, 2009) for a specific numerical claim (below 2.5 per cent GDP, 4 per cent commitment) but the source is declared unverifiable in sources/unit-04.md with
  evidence: review:specs/content/efmp-303/reviews/unit-04/G3/20261102T212207Z-g3-desk-a0d82ff4.json, review:specs/content/efmp-303/reviews/unit-04/G3/20261102T211054Z-g3-desk-9e5135f9.json, review:specs/content/efmp-303/reviews/unit-04/G3/20261108T203238Z-g3-desk-a67ec0a3.json
- [review] x1 recent, 4 total, since 2026-10-19: topic n.n line n cites (coombs, n) for a specific conceptual claim about the m&e cycle but the source is declared unverifiable in <path>
  example: Topic 4.1 line 38 cites (Coombs, 1970) for a specific conceptual claim about the M&E cycle but the source is declared unverifiable in sources/unit-04.md
  evidence: review:specs/content/efmp-303/reviews/unit-04/G3/20261102T212207Z-g3-desk-a0d82ff4.json, review:specs/content/efmp-303/reviews/unit-04/G3/20261102T211054Z-g3-desk-9e5135f9.json, review:specs/content/efmp-303/reviews/unit-04/G3/20261108T203238Z-g3-desk-a67ec0a3.json
- [review] x1 recent, 4 total, since 2026-10-19: concept-graph concepts con:<course>-n-n label reads m&e process process (duplicate word) and its slo refs are slo:<course>-n-n only, not slo:<course>-n-n
  example: Concept-graph concepts CON:EFMP-303-4-3 label reads M&E process process (duplicate word) and its SLO refs are SLO:EFMP-303-4-1 only, not SLO:EFMP-303-4-2
  evidence: review:specs/content/efmp-303/reviews/unit-04/G3/20261102T212207Z-g3-desk-a0d82ff4.json, review:specs/content/efmp-303/reviews/unit-04/G3/20261102T211054Z-g3-desk-9e5135f9.json, review:specs/content/efmp-303/reviews/unit-04/G3/20261108T203238Z-g3-desk-a67ec0a3.json
- [review] x1 recent, 4 total, since 2026-10-19: full interactive live-browser rendering (narrow nxn viewport and an print emulation) was not performed because brief constraints specify "never run npm run buil
  example: Full interactive live-browser rendering (narrow 360x780 viewport and A4 print emulation) was not performed because brief constraints specify "never run npm run build or a dev server"
  evidence: review:specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run044c8d2c.json, review:specs/content/efmp-303/reviews/unit-01/G3/20261102T212819Z-g3-desk-140ce781.json, review:specs/content/efmp-303/reviews/unit-01/G3/20261108T203238Z-g3-desk-727e527b.json
- [review] x1 recent, 4 total, since 2026-10-19: in <path>:n, unit n gn row states "board <path> intake pending", though <path> status is approved
  example: In specs/content/efmp-303/tasks.md:15, Unit 1 G1 row states "board G0/G1 intake pending", though specs/content/efmp-303/content-spec.md status is approved
  evidence: review:specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run044c8d2c.json, review:specs/content/efmp-303/reviews/unit-01/G3/20261102T212819Z-g3-desk-140ce781.json, review:specs/content/efmp-303/reviews/unit-01/G3/20261108T203238Z-g3-desk-727e527b.json

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-10.md` only.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. The acceptance checks in your task pass; `npm run check:content` reports nothing new against origin/main;
   any `node --test tests/crew/*.test.mjs` or unit tests covering what you changed pass.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (intel-2026-11-09-distill, intel_distill, agy) Nested review bundles under `reviews/unit-NN/G3/<folder>/` continue causing premature repeat reviews that escalate on unchanged inputs (C1).
- (intel-2026-11-09-distill, intel_distill, agy) The owner checkout at `~/mega_book_for_B.Ed` moved to `fix/purge-test-accounts`, ending the 136-signal/day blocked loop; PR #500 awaits owner decision C-019 (C2).
- (intel-2026-11-09-distill, intel_distill, agy) Merging green maintenance PRs for decisions C-017 through C-021 will unblock workflow fixes (row-keyed tracker merge, brief rules, and owner-sync alerts).
- (intel-2026-11-08-distill, intel_distill, agy) Nested review bundles under `reviews/unit-NN/G3/<folder>/` are invisible to `latestReport`, causing premature `review_en-r1` runs on EFMP-407 Units 5 and 8.
- (intel-2026-11-08-distill, intel_distill, agy) The owner checkout at `~/mega_book_for_B.Ed` has 5 modified tracked files preventing ff-merge and is now 790 commits behind origin/main.


## Response snapshot

Distilled 8 daily reusable intelligence candidates for 2026-11-10 covering review bundle layout, finding label normalisation, dev slice containment, accessibility inspection constraints, and gate freshness.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 8 daily reusable intelligence candidates for 2026-11-10 covering review bundle layout, finding label normalisation, dev slice containment, accessibility inspection constraints, and gate freshness.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Nested review bundles under reviews/unit-NN/G3/<folder>/ continue causing premature repeat reviews that escalate on unchanged inputs (C1).
  - Human desk reviews with unnumbered rubric prefixes collapse distinct findings into single-word signatures, requiring expanded label stripping in FINDING_LABEL (C2).
  - Merging PR #500 (decision C-019) will permanently throttle blocked owner-sync logging if the owner checkout returns to main with local modifications (C6).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
