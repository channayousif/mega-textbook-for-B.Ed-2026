---
id: 20261298
title: EFMP-301 Unit 5 slide deck
stage: green
date: 2026-11-27
surface: agent
model: claude-sonnet-5-5
feature: 032-textbook-visuals
branch: crew/efmp-301-u05-slides
user: crew
command: crew job efmp-301-u05-slides
labels: [claude, crew, slides, efmp-301]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/slides/efmp-301/unit-05.json
  - static/studio/slides/efmp-301/unit-05.en.pptx
  - static/studio/slides/efmp-301/unit-05.ur.pptx
tests:
  - npm run check:content (14 gates pass)
  - node scripts/build-studio-index.mjs (no skipped slides)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The brief, verbatim:

````markdown
# Crew job efmp-301-u05-slides

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u05-slides`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Make the slide deck for EFMP-301 Unit 5 (Feature 032 phase B; model: specs/studio/slides/efmp-301/unit-04.json). Read every English topic file of the unit and its Urdu mirror. Write `specs/studio/slides/efmp-301/unit-05.json` with the unit title and a subtitle naming the course code and title, then 10 to 16 slides: a section slide per topic, two or three points slides per topic and one summary slide, plus a figure slide for any placed schematic that carries a topic's core idea (figure is its base path, /img/figures/<course>/unit-NN/fig-..., without .svg). Every point restates the topic's Summary or Explanation in plain words (no new facts, numbers or examples), at most 5 points of at most 110 characters; each Urdu point says what the Urdu topic says. No long dashes. Run `node scripts/build-studio-index.mjs` (it must not print "skipped slides" for this unit), then `node scripts/studio/figure-pngs.mjs <outline> /tmp/slides-png` and, for en and ur, `uv run --with python-pptx python scripts/studio/slides-pptx.py <outline> <lang> /tmp/slides-png static/studio/slides/efmp-301/unit-05.<lang>.pptx`. Commit the outline and both .pptx files. Do not edit topic MDX or any file under specs/content/.

## Scope
EFMP-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-05/`.

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
- (efmp-301-u05-flashcards, flashcards, claude) The Urdu card "IQ (ذہانت کا خارج قسمت)" corrects the Urdu topic's garbled "خارج قسمے" wording. The topic file itself still has the garbled text, which G5 should check.
- (efmp-301-u05-flashcards, flashcards, claude) I didn't use the `terminology.csv` pair "Accommodation" → سہولت کاری, because it is an EFMP-305 access sense. Topic 5.2 uses "accommodation" for matching a pupil's skill level and writes it as سہارا.
- (efmp-301-u05-refresh_figures, refresh_figures, claude) fig-U5-2.ur row 3 still says "the prediction" (پیش گوئی / صرف اسکول) while the English says "test scope / sampled tasks", and the fig-U5-1.ur middle box leaves out Thurstone/CHC; both are content mismatches for G5 or the owner, not fixed in this visual redraw.
- (efmp-301-u05-refresh_figures, refresh_figures, claude) fig-U5-1 keeps its left-to-right axis in Urdu on purpose (both alt texts put Spearman on the left); do not run mirror-figure-rtl.mjs on it. The generator for all eight files is in .crew/u5/gen.py.
- (efmp-301-u05-refresh_figures, refresh_figures, claude) no PHR written yet; add one before this branch goes into a PR. Unit 5 needs a fresh, owner-authorised G3 run (▢ row appended).
````

## Response snapshot

An earlier attempt had committed the deck (ffbd515e4). It was checked against both topic files in
English and Urdu and corrected: the creativity slide named four parts but omitted Elaboration; one
Urdu point lost "or trains it out"; one Urdu "unsupported" phrasing was unclear; the fig-U5-2
captions named "the prediction", which the English figure no longer says. Both .pptx files were
rebuilt (title slide plus 13 slides).

## Outcome

- ✅ Impact: EFMP-301 Unit 5 has a checked bilingual slide deck.
- 🧪 Tests: all 14 content gates pass; studio index builds with no skipped slides.
- 📁 Files: one outline and two PPTX exports.
- 🔁 Next prompts: fix fig-U5-2.ur row 3; G5 check of the Urdu topic wording.
- 🧠 Reflection: an already committed deck still needed a point-by-point check against the text.

## Handoff (for CEO and agents)

- Shipped / changed: slide deck outline and PPTX exports on the branch; not pushed, no PR.
- Decisions the team must respect: no topic MDX, figure or specs/content file was edited.
- Pending / next owner: fig-U5-2.ur row 3 still shows a school-performance prediction that neither
  the English figure nor the topic text states, and the deck embeds that figure (G5 or owner).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: list heading promised four items and the points gave three.
- Graders run and results (PASS/FAIL): check:content PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): count named parts against listed points when drafting.
