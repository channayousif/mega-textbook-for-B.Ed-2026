# Recording script: Bilal reference voice (round 10 follow-up)

Purpose: a livelier reference recording of the owner's voice for Bilal. Chatterbox copies the
delivery of its reference (round 10), so the energy has to be in this recording. Claude cuts the
best 13 to 18 seconds from it. Kept outside `brand/voices/` on purpose: files there are part of the
voice-card digest that approvals bind to.

## How to record
- **Room:** quiet, soft furnishings (curtains, a bed or a sofa nearby), fan and AC off, no music or TV.
- **Phone:** 15 to 20 cm from your mouth, slightly to the side so breaths do not pop. Use a voice
  recorder app at its highest quality (WAV if it offers it). Send the file as a **document**, not a
  WhatsApp voice note, which compresses the sound.
- **Body:** stand up and smile while you speak; both are audible. Talk as if to a friend across a table.
- **Delivery:** a little faster than your normal pace, with clear rises on questions and real
  excitement on "اچھا!" and "کمال ہے!". Let your pitch move. It is fine to overdo it slightly.
- **Takes:** read the whole script three times in one file, with a 3-second pause between takes.
  Do not stop to fix a slip; just carry on.

## Script (about 35 seconds per take)

1. *(bright, welcoming)*
   السلام علیکم دوستو! میں ہوں بلال، اور آج ہم ایک زبردست چیز سیکھنے والے ہیں!

2. *(curious, rising at the end)*
   استاد صاحبہ، یہ بتائیے، کیا تعریف سے واقعی بچے کا رویہ بدل سکتا ہے؟

3. *(the penny drops, delighted)*
   اچھا! یعنی جب ہم صحیح وقت پر شاباش دیتے ہیں، تو بچہ وہی کام دوبارہ کرنا چاہتا ہے۔ کمال ہے!

4. *(honest, a little shy, then confident)*
   سچ پوچھیں تو مجھے امتحان سے تھوڑا ڈر لگتا تھا... لیکن اب بات سمجھ آ رہی ہے!

5. *(energetic call to action)*
   تو دیر کس بات کی؟ پورا سبق ابھی پڑھیے، اور اپنے دوستوں کو بھی بتائیے!

## After recording
Upload the file to `~/video-studio-media/voice-benchmark/owner-recordings/` (for example
`bilal-rec-4.wav`). Claude checks its quality, adds its SHA-256 to consent record `narrator-01`
(the owner's own voice; same scope), cuts the reference, and runs it against reel C on Kaggle.
