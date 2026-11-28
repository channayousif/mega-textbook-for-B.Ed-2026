# Content Pack cast (Feature 038, ADR-0040)

Season 1 cast for long-form lessons and Shorts. Status: **descriptions approved by the owner 2026-11-28** (cast approval page); sheets not yet generated or locked.

| Slug | Name | Role | Flow voice |
|---|---|---|---|
| `noor` | Noor | The Mentor: experienced teacher educator, explains calmly | Sulafat (female, warm, mid) |
| `sami` | Sami | The Trainee: pre-service teacher, asks viewers' questions, makes the common mistakes | Achird (male, friendly, mid) |
| `lena` | Lena | The Skeptic: in-service teacher, challenges ideas, drives "myth vs fact" | Kore (female, firm, mid) |
| `zara` | Zara | The Student: a pupil who shows the classroom side of a technique | Leda (female, youthful, mid-high) |

Rules (ADR-0040 point 6, spec FR-006):

- Every Flow or image prompt pastes the character's `prompt-block.txt` **verbatim**, plus the style
  token from `_style-guide.md`. Never redescribe a character from memory, never write "same as before".
- Characters are clearly stylised 2D animation, never photoreal, and are never presented as real or
  credentialed experts. The authority in every video is the real faculty, credited by role.
- One sheet version is locked per season. A change to a locked character is a new version
  (`sheet.md` records `version`, `locked_on`, the prompt used and the image paths) and is noted in the
  pack's `shots.csv`.
- Sheet images live in `static/studio/characters/<slug>/` as WebP once locked; working takes stay in
  `$MEDIA_ROOT/cast/`.
- Running series formats: "Staffroom Questions" (Noor answers Sami), "Lesson Plan Clinic" (Noor fixes
  Sami's plan), "Myth or Fact?" (Lena), "From the Back Row" (Zara's view of a technique).
- Not used in new packs: the Ustani Farzana and Bilal puppets (`video-studio/brand/characters/`).

Locking steps (Stage 2, T009): generate each sheet with Nano Banana through gflow in media hours
(15:00-09:00 PKT), owner picks takes, record them in `sheet.md`, then register each character in Flow
with `gflow_character_create` (name, voice, personality from `profile.yaml`).
