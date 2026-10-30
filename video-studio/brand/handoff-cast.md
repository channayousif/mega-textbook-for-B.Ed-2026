# Cast and set handoff (VS-001 T012)

What the owner generates for Phase 1, with Google tools the owner already uses: **Nano Banana**
(Gemini image generation and editing) for the characters and sets, and **Veo 3 / Flow** for optional
B-roll clips. Claude cuts the puppet layers from the images (T013); nothing here needs an editor.

## How the puppet parts are made (read first)
Every character image after the first is an **edit of the same master image**, never a fresh
generation. Nano Banana keeps the rest of the picture identical when asked to change one part, so
Claude can lift each part (a closed eye, an open mouth, a raised arm) by comparing it with the
master pixel by pixel, and every part lines up on the same canvas.

- Generate the master once (prompt A). If the face or outfit is wrong, regenerate the master; do
  not fix it with edits.
- For every edit (prompts B to D): open the master in Nano Banana, attach it, and paste the edit
  prompt. Keep the chat on that master; start a new chat from the master if drift creeps in.
- Reject an edit if anything outside the named part moved (head size, position, colours, crop).
- Background: flat **magenta #FF00FF** everywhere. Teal is close to green, so a green screen would eat
  the clothes; magenta is far from every brand colour.
- Aspect **3:4 portrait** (Claude scales to the 1080x1440 puppet canvas). PNG if offered.

## Where to put the files
Upload to the server under `~/video-studio-media/brand-assets/inbox/` with these exact names (the
episode media rule: no images in the repo). Note the tool and date for each file; Claude records
them in the asset manifest.

| Character | Files |
|---|---|
| Ustani | `ustani-master.png`, `ustani-eyes_closed.png`, `ustani-mouth_M.png`, `ustani-mouth_E.png`, `ustani-mouth_A.png`, `ustani-mouth_O.png`, `ustani-pose_explain.png`, `ustani-pose_point.png`, `ustani-pose_think.png`, `ustani-pose_celebrate.png`, `ustani-sheet.png` |
| Bilal | the same names with `bilal-` (his idle pose is the master) |
| Sets | `set-classroom.png`, `set-staffroom.png`, `set-studio.png` |
| B-roll (optional) | `broll-<name>.mp4` |

## Style line (append to every image prompt)
> flat 2D vector illustration, soft cel shading, clean outlines, warm natural light, palette of deep
> teal green #1f6f5c, burnt orange #b8551d and white with pale sage #eef3f1, South Asian (Sindh,
> Pakistan) setting and people, modest everyday clothing, friendly educational explainer style, no
> text, no letters, no logos, no watermarks

Avoid: photorealistic, 3D render, text, captions, logos, distorted hands, extra fingers.

---

## Ustani Farzana (استانی فرزانہ)

### A. Master (new chat, text to image)
> Full-body character illustration of an original character: a warm South Asian woman teacher
> educator, about 40, kind face, soft closed-mouth smile, eyes open looking at the viewer,
> rectangular reading glasses, shoulder-length dark hair partly covered by a deep teal green
> (#1f6f5c) dupatta loosely over her shoulders, burnt orange (#b8551d) shalwar kameez with a simple
> border, small stud earrings. She stands facing the viewer, turned very slightly to her left,
> relaxed posture, holding a closed book against her waist with both hands. Whole figure visible
> from head to feet with a margin on every side, centred. Flat solid magenta #FF00FF background, no
> floor, no shadow on the background. 3:4 portrait. + style line

### B. Blink (edit of the master)
> Edit this image. Change only her eyes: both eyes gently closed, as in a natural blink, eyelids
> relaxed. Keep everything else exactly the same: glasses, face shape, mouth, hair, clothes, pose,
> position, size, colours and the magenta background.

### C. Mouth shapes (four edits of the master, one at a time)
Same opening and ending as B, with the change line:
- `mouth_M`: "lips pressed together as when saying 'm', no teeth visible"
- `mouth_E`: "mouth slightly open and wide as when saying 'ee', top teeth just visible"
- `mouth_A`: "mouth open wide as when saying 'aa', relaxed jaw"
- `mouth_O`: "lips rounded into a small 'o' as when saying 'oo'"

> Edit this image. Change only her mouth: <change line>. Keep everything else exactly the same:
> eyes, glasses, face shape, hair, clothes, pose, position, size, colours and the magenta background.

### D. Gestures (four edits of the master)
> Edit this image. Change only her arms and hands: <pose line>. Keep her head, face, glasses, body,
> clothes, position, size, colours and the magenta background exactly the same. Hands with five
> fingers, natural proportions.

- `pose_explain`: "her right hand is raised to chest height, palm open and turned up, as when explaining; her left hand holds the book at her waist"
- `pose_point`: "her right arm points up and to the left of the picture with the index finger, as when pointing at a board; her left hand holds the book at her waist"
- `pose_think`: "her right hand rests lightly under her chin, thoughtful; her left hand holds the book at her waist"
- `pose_celebrate`: "both hands are raised to shoulder height with open palms, delighted, as when praising a good answer; the book is tucked under her left arm"

### E. Reference sheet (for approval only, new chat with the master attached)
> Character design sheet of the same woman as in the attached image, same clothes and colours:
> front view, three-quarter view and side view in a row, and below them six head close-ups with the
> expressions neutral, smiling, explaining, surprised, thinking, encouraging. Plain cream background.
> + style line

---

## Bilal (بلال)

### A. Master (new chat, text to image)
> Full-body character illustration of an original character: a friendly young South Asian man,
> about 23, trainee teacher, short neat dark hair, light stubble, bright curious eyes looking at the
> viewer, closed-mouth smile. White kurta with sleeves rolled to the elbow, deep teal green (#1f6f5c)
> waistcoat, brown satchel strap across his chest. He stands facing the viewer, turned very slightly
> to his right, energetic upright posture, holding a burnt orange (#b8551d) notebook against his chest
> with his left hand, right arm relaxed. Whole figure visible from head to feet with a margin on every
> side, centred. Flat solid magenta #FF00FF background, no floor, no shadow on the background. 3:4
> portrait. + style line

### B and C. Blink and mouth shapes
As for Ustani, with "his" for "her" and without the glasses.

### D. Gestures (four edits of the master)
Same edit wording as Ustani's D, with:
- `pose_explain` (asking): "his right hand is raised beside his shoulder with the index finger up, as when asking a question; his left hand holds the notebook at his chest"
- `pose_point`: "his right arm points up and to the right of the picture with the index finger; his left hand holds the notebook at his chest"
- `pose_think`: "his right hand scratches the side of his head, puzzled; his left hand holds the notebook at his chest"
- `pose_celebrate` ("aha!"): "his right hand gives a thumbs up at shoulder height, excited; his left hand holds the notebook at his chest"

### E. Reference sheet
As for Ustani, with the expressions curious, confused, excited, thinking, smiling, "aha!".

---

## Sets (Nano Banana, new chat each, 9:16 portrait)
Characters stand in the lower middle (between about 40% and 80% of the height) and the title panel
covers the top 20%, so keep those areas calm.

- `set-classroom`: "Empty bright government-school classroom in Sindh, Pakistan, seen from the front of the room: a green chalkboard on the back wall with no writing, rows of simple wooden desks, ceramic-tile floor, a tall window with morning light on the left, a potted plant, a wall clock without numbers. No people. Calm open space in the lower middle of the picture. 9:16 portrait. + style line"
- `set-staffroom`: "Empty teachers' staffroom in a Pakistani school: shelves of books without readable titles, a table with two cups of tea, a window with warm afternoon light, a notice board with blank papers. No people. Calm open space in the lower middle. 9:16 portrait. + style line"
- `set-studio`: "Plain deep teal green (#1f6f5c) backdrop with a very subtle pattern of small pale sage (#eef3f1) geometric shapes, slightly lighter in the centre. No objects, no people. 9:16 portrait. + style line"

## B-roll (optional, Veo 3 in Flow, 8 s each)
Choose 9:16 if Flow offers it, else 16:9 (Claude crops). The audio is removed at import. Keep each
clip to one simple action; Veo may draw text on boards or books, so reject any clip with readable
letters.

- `broll-star-sticker`: "Flat 2D animated illustration: a woman teacher in a burnt orange shalwar kameez and teal dupatta smiles and places a star sticker on a young pupil's notebook in a bright Sindh classroom; the pupil beams. Slow gentle camera push-in. No text anywhere. + style line"
- `broll-hands-up`: "Flat 2D animated illustration: several primary-school pupils in a bright Pakistani classroom eagerly raise their hands; the teacher points to one. Static camera. No text anywhere. + style line"
- `broll-board`: "Flat 2D animated illustration: close-up of a hand drawing a simple arrow and circles with white chalk on a green chalkboard, no letters or numbers. Static camera. + style line"

## Rights note
Record for each file: tool (Nano Banana / Veo 3 / Flow), the Google account used and the date.
Google's terms for that account govern the use of the outputs; Google marks its generated media with
an invisible SynthID watermark. Platforms ask for an AI-content label; the publish pack (T060) adds
the reminder.
