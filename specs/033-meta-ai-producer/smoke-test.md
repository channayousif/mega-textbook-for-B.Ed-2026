# Meta AI smoke test (spec 033, User Story 1)

**Date**: 2026-11-28, 02:27-02:40 PKT (inside media hours) | **Run by**: Claude (board-direct), owner's go
**Where**: meta.ai in the davinci workspace Chrome, signed in as the owner's Meta account, driven over
Chrome DevTools (new chat per prompt, the prompt typed into the composer, Send, about 90 s between prompts).
**Prompt sent**: `Create one image, landscape 16:9. Style: <HOUSE_STYLE of generate-illustration.mjs> Scene: <approved row prompt>`,
the same brief agy, gflow and Codex receive (`sceneBrief`). Prompts and alt text unchanged.
**Images**: kept outside git (`~/studio-media` policy); nothing placed in the textbook.

## Results

Every image was 2048 x 1152 (native 16:9), in 13 to 26 s.

| Row | Placed image (producer as placed) | Meta AI | Checks: text / dress and setting / sacred figures / teaches the point / matches alt | Verdict |
|---|---|---|---|---|
| EFPG-401 U1 `fig-U1-10`: two-panel listening lesson, Mirpurkhas | flat vector, clear but plain contrast | clear left/right contrast: puzzled pupils vs. pupils leaning in, picture of farmer and donkey, picture-tick worksheets, older teacher watching | pass / pass / pass / pass / pass | **pass** (left teacher looks like he is shouting rather than reading fast) |
| EFPG-401 U1 `fig-U1-13`: staffroom, two notebooks, Dadu | good, mentor gesturing | sketch of boy and calf, red marks, unreadable handwriting, exam guide, barred window with Sindh trees | pass / pass / pass / pass / pass-with-notes | **pass-with-notes** (mentor's hand rests on the neat notebook, not the sketch one) |
| GNAS-301 U1 `fig-U1-10`: smog, playground, inhaler, Karachi | good | hazy smog, neem trees, glowing unreadable phone, girl with inhaler on shaded bench, second teacher | pass / pass / pass / pass / pass | **pass-with-notes** (three standing girls are near-identical copies) |
| GNAS-301 U1 `fig-U1-12`: Keenjhar Lake ecosystem | bright, simple | fishermen casting a net, egrets and herons, reeds, fish in the water, boy pointing, teacher turning the question back | pass / pass-with-notes / pass / pass / pass | **pass-with-notes** (green rolling hills read as temperate; Keenjhar's shore is drier) |
| GNAS-301 U1 `fig-U1-13`: plastic waste lists, Karachi | good | wrapper, plastic bag, juice box, bottle on desks; teacher's arms wide; litter heap by the gate through an open window | pass / pass / pass / pass / pass-with-notes | **pass-with-notes** (the "realising" girl does not clearly look at the heap; many similar faces) |

**Summary**: 5 of 5 pass the hard rules (no readable text, maps, flags or emblems; Pakistani dress and
Sindh settings; no sacred figures). 1 clean pass, 4 pass-with-notes. In four of five rows the Meta
image follows the prompt's specific details more closely than the placed image, in a richer
hand-drawn editorial style; it is slightly less flat-vector than the house style asks.

## Other findings

- **Provenance**: every file carries a C2PA content credential from Meta AI (`trainedAlgorithmicMedia`).
  Our WebP optimisation strips metadata; the site's AI-disclosure practice should cover it the same way
  as agy and gflow images.
- **Automation**: the composer is a `contenteditable` textbox; a real click (CDP mouse event) is needed
  before typing, and the Send button must be clicked. Images load as full-size CDN URLs that the page
  can fetch, so a producer can save them without screenshots.
- **Account**: one conversation per prompt now sits in the account's history.
- **Not checked**: Meta's terms of use for using generated images in a free educational textbook; the
  owner should confirm before any production use (spec 033 requirement).

## Decision for the owner

Go / no-go on User Story 2 (a `meta` image producer on the reserved `meta` lane, behind the existing
producers, with its own pacing channel, run serially through the workspace Chrome in media hours).
