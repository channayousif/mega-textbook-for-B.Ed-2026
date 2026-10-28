# VS-ADR-0013 - Ustani's voice clones a consented narrator's recording
Status: Accepted (owner 2026-10-28: "prefer her voice") · Date: 2026-10-28

## Context
V005 locked Ustani on `chatterbox-hi` cloning `Sample.mp3`, an ElevenLabs-generated voice supplied
for evaluation only, so the card blocked publishing until its rights were secured. A female narrator
then self-recorded a sample for the owner, with verbal consent recorded as `narrator-02`. VS-003
round 9 cloned the 20 round-5 explanations x 3 seeds with both references: ElevenLabs centroid
similarity 0.922 mean / 0.838 min, CER 0.033, 19 of 60 clips flagged (16 term); narrator 0.918 /
0.796, CER 0.034, 14 of 60 flagged (11 term). The owner listened to both reels and preferred the
narrator. Changing a locked voice card needs an ADR (`brand/voices/README.md`).

## Decision
Ustani's card uses the narrator's reference (`refs/ref-ustani-rec1.wav`, 0.4-17.95 s of her
self-recorded WAV) with the same engine, settings and lexicon. Rights rest on consent record
`narrator-02` (`$MEDIA_ROOT/consents/`, PI-08): given verbally to the owner and attested by the owner
in the session that PHR 0893 records; all platforms, promotional use, Kaggle processing; published
videos stay up on withdrawal. The narrator is cited only by her consent id.

## Consequences
+ Ustani is cleared to publish; with VS-ADR-0012 no third-party voice rights remain for either character.
+ Fewer term flags than the ElevenLabs reference in round 9; same CER and centroid similarity.
- Lower worst-case steadiness (0.796 vs 0.838 min); the per-episode drift check (VS-003) still applies.
- Consent was first verbal; the owner confirmed on 2026-10-28 that written consent is held (PHR 0895).
  A copy should be stored beside the `narrator-02` record in `$MEDIA_ROOT/consents/`.
- Ustani now carries an identifiable person's voice in public; withdrawal follows `narrator-02`.

## Alternatives considered
Keep the ElevenLabs reference (rejected: no rights, and an ElevenLabs plan would still need its terms
checked for cloning into another engine); wait for written consent before switching (moot: the owner
confirmed written consent the same day).
