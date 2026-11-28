# Flow shot prompt formula (Content Pack v2)

Fill one block per shot. Every block repeats every essential detail: never write "same as before".

```
[CHARACTER]  <paste specs/studio/characters/<slug>/prompt-block.txt verbatim, one per character in shot>
[ACTION]     <one clear beat, one verb: "Sami holds up his lesson plan and frowns at it">
[SETTING]    <staffroom | classroom, from _style-guide.md, with the details that matter in this shot>
[CAMERA]     <shot size (wide, medium, close-up), angle (eye level, low, high), movement (static, slow push-in, pan left)>
[LIGHTING]   <warm even classroom light from the upper left | soft morning window light>
[STYLE]      <paste the style token from specs/studio/characters/_style-guide.md verbatim>
[AUDIO]      ambience: <quiet staffroom, distant children> ; DIALOGUE: <Name> says: "<one line, at most 15 words>"
[AVOID]      on-screen text, letters, numbers, logos, watermarks, extra characters, photoreal skin, style drift
[ASPECT]     16:9 for long-form | 9:16 for Shorts (generate natively, never crop for a final)
```

Rules

- One action per clip; plan in clip-length units of about 8 s and storyboard the scene before generating.
- One spoken line per clip, attributed to a named character, at most about 15 words.
- Never ask Flow for text, labels, the logo or screenshots; Remotion adds them in post.
- Draft on the Fast model, final on the Quality model; upscale only the selects.
- Watermark: use Flow's Media Watermark setting where the plan allows it and record the result per pack
  (`set_content_pack_watermark`: `off-official`, `not-available` or `regenerated`). Never blur or paint over
  a watermark, and never alter SynthID or C2PA marks (ADR-0040 point 5).
- Log every take in the topic's `shots.csv` and its credits in `credit-log.csv`.

Which Flow mode

| Need | Mode |
|---|---|
| Same character in a new scene | Ingredients to Video (character, location, style references) |
| Exact first or last frame (match a motion-graphics frame or a cut) | Frames to Video |
| Continue an action past one clip | Extend |
| New shot keeping the previous look | Jump to / Scenebuilder |
| Fix one element | Video-to-video edit |
| Explore angles fast | Agent mode, "4 variations with different camera angles" |

Features vary by plan and region and change often: check the Flow UI before relying on one, and note
in `library.md` when a mode is missing or renamed.

Example (Short, Lesson Plan Clinic, shot 1)

```
[CHARACTER] Sami, a young man in his early twenties, light brown skin, short curly black hair, a neat short beard, bright curious eyes, wearing a pale teal button-up shirt with sleeves rolled to the elbow, dark chinos and white trainers, an amber lanyard with a blank card, a canvas backpack on one shoulder, energetic slightly rushed posture.
[ACTION] Sami slaps a single sheet of paper onto a wooden staffroom table and looks up, worried.
[SETTING] Bright staffroom, wooden table with two mugs, bookshelf behind, blank noticeboard.
[CAMERA] Medium shot, eye level, static.
[LIGHTING] Warm even classroom light from the upper left.
[STYLE] Flat 2D vector animation style, clean consistent dark-teal outlines of medium weight, soft cel shading with one shadow tone, simple rounded shapes, friendly proportions (head about one fifth of body height), large expressive eyes, no photorealism, no film grain, warm even classroom lighting from the upper left, muted paper-white background.
[AUDIO] ambience: quiet staffroom ; DIALOGUE: Sami says: "My objective says students will understand fractions. Is that wrong?"
[AVOID] on-screen text, letters, numbers, logos, watermarks, extra characters, photoreal skin, style drift
[ASPECT] 9:16
```
