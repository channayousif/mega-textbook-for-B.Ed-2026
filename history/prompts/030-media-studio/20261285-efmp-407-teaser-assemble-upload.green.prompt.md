---
id: 20261285
title: EFMP-407 Urdu teaser assembled to qa-pass (upload held by pacing)
stage: green
date: 2026-11-27
surface: agent
model: claude_crew
feature: 030-media-studio
branch: crew/efmp-407-u00-media_assemble
user: crew
command: crew media_assemble
labels: ["crew", "claude_crew", "media_assemble", "efmp-407"]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/teasers/media-teasers.json
  - history/prompts/030-media-studio/20261285-efmp-407-teaser-assemble-upload.green.prompt.md
tests:
  - node scripts/notebook-studio/media-qa.mjs ~/studio-media/teasers/efmp-407/ur/teaser.mp4 --kind short --stage encoded (pass)
  - npm run check:content (14/14 PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

# Crew job efmp-407-u00-media_assemble

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u00-media_assemble`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Assemble and upload the efmp-407-ur Short PRIVATE (studio-teaser skill, steps 8-10). From the ledger's chosen takes, run `scripts/heavy.sh node scripts/notebook-studio/assemble-teaser.mjs efmp-407 ur ~/studio-media/teasers/efmp-407/ur/teaser.mp4 <shot1> ... <shot5>` (its speed and length limit come from the script's recipe; a teaser@2 or teaser@3 Short over 30 s fails), then `scripts/heavy.sh node scripts/notebook-studio/media-qa.mjs <out> --kind short --stage encoded`, look at the end card and thumbnail, and advance to `assembled` and `qa-pass`. Upload with youtube-uploader `upload_video` using `node scripts/notebook-studio/teaser.mjs meta efmp-407-ur` (privacy_status private, the AI-content disclosure on), then `update_video` with the playlist and thumbnail, and advance to `uploaded-private`. Before every YouTube upload run `node scripts/media/pacing.mjs check youtube.upload`: if it prints `hold`, upload nothing more, keep the ledger at the state reached, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful upload run `node scripts/media/pacing.mjs record youtube.upload`. QG3: `list_videos` shows it private and processed, title and description intact; advance to `qa3-pass`. Continue from whatever state the item is in. The owner watches it and replies `crew publish efmp-407-ur` or `crew reject efmp-407-ur <note>`. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

Follow `.claude/skills/studio-teaser/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The EFMP-407 teaser only: `specs/studio/teasers/efmp-407.json` and its own item in `specs/studio/teasers/media-teasers.json` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (efmp-407-u00-teaser_clips, teaser_clips, claude_crew) Shot 3 assembles from take 2; take 1 is the failed REC-overlay clip, so `assemble-teaser.mjs efmp-407 ur <out> 1 2 3 4 5` resolves the right take via `chosenTakes`.
- (efmp-407-u00-teaser_clips, teaser_clips, claude_crew) `youtube.upload` is at its 4/4 daily cap until 2026-11-26T19:00:00Z (00:00 PKT Nov 27), so an upload attempt before then will hold.
- (efmp-407-u00-teaser_clips, teaser_clips, claude_crew) PHR id 20261283 was the next free id on origin/main at commit time (20261245 was already taken).
- (efmp-407-u00-teaser_script, teaser_script, claude) `objectives` omitted because `parseOverview` (scripts/notebook-studio/describe.mjs) needs "## Course learning outcomes" but the EFMP-407 overview says "## Learning outcomes"; adding them later is metadata only and does not reopen approval.
- (efmp-407-u00-teaser_script, teaser_script, claude) PHR id 20261245 was the next free id on origin/main at commit time; renumber if a sibling branch merges the same id first.

## Response snapshot

The ledger item was `clips-qa` with a passing take for every shot, so no clip work was needed.
Assembled from the chosen takes (shot 1 t1, shot 2 t1, shot 3 t2, shot 4 t1, shot 5 t1) into
`~/studio-media/teasers/efmp-407/ur/teaser.mp4` with the recipe's 1.4x voice: 28.9 s, under the
30 s limit. Encoded QG1 passed (1080x1920, -14.8 LUFS, -3.0 dBTP, no silence or black runs).
Eleven frames across the cut were checked: captions fully visible, Urdu reads RTL, English terms
keep their spacing, and the end card shows the exact address
`/ur/semester-3/efmp-407/course-overview/`; the thumbnail hook reads at phone size. Advanced the
item to `assembled` (encoded_file, thumbnail_file) and then `qa-pass` (gates.qa1).

The upload step stopped at the pacing guard: `node scripts/media/pacing.mjs check youtube.upload`
printed `hold: youtube.upload: hourly cap of 1 reached; next at 2026-11-26T20:22:25.607Z` (exit 4).
Per the brief, nothing was uploaded, the ledger stays at `qa-pass`, and the job hands off.

## Outcome

- Impact: efmp-407-ur assembled and at `qa-pass`; the private upload is pending the pacing window.
- Tests: media-qa encoded pass (28.9 s, 1080x1920, -14.8 LUFS, -3.0 dBTP); check:content 14/14 PASS.
- Files: specs/studio/teasers/media-teasers.json (item efmp-407-ur), this PHR.
- Next prompts: the next media_assemble job re-checks `youtube.upload`, uploads private, sets the
  playlist and thumbnail with `update_video`, runs QG3 and advances to `qa3-pass`.
- Reflection: the limiter now is the 45-minute hourly gap, not the 4/day daily cap (1/4 used).

## Handoff (for CEO and agents)

- Shipped / changed: efmp-407-ur reached `qa-pass` with `encoded_file` and `thumbnail_file` recorded
  and the `qa1` gate passed. Media stays under `~/studio-media/teasers/efmp-407/ur/` (not in git).
- Decisions the team must respect: no upload was attempted during the pacing hold; nothing is
  public, unlisted or scheduled. Shot 3 assembles from take 2 (`chosenTakes`); take 1 is the failed
  REC-overlay clip.
- Pending / next owner: the next job resumes from `qa-pass`. `youtube.upload` is held until
  2026-11-26T20:22:25.607Z; after that, `T meta efmp-407-ur` gives the private upload fields, then
  `update_video` with playlist `PLCJn7gAoYIJs` and the recorded thumbnail, then QG3 and `qa3-pass`.
  Only the owner's `crew publish efmp-407-ur` may make it public.
- Paperclip issues affected: none (crew board tracks this).

## Evaluation notes (flywheel)

- Failure modes observed: none in assembly or QG1; the only stop was the expected pacing hold.
- Graders run and results (PASS/FAIL): media-qa encoded PASS; check:content PASS (14/14).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
