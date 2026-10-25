# Constitution - video-studio

Version 1.2 · Ratified 2026-10-24 · Amended 2026-10-26 (Kaggle media runner, media out of git, parent supremacy) · Owner: Yousif
**Subordinate to the parent constitution** (`.specify/memory/constitution.md`, v5.0.0; Art. VI.3 video scope
granted by spec 027 and root ADR-0031, wording amendment pending). Where the two differ, the parent wins. Within `video-studio/` these
principles override its specs, plans, tasks and skills. Changing one requires a VS-ADR.

## I. Learning first, marketing second
Every short teaches exactly **one** idea that a teacher educator or prospective teacher can
use or recall. The call to action (CTA) is the last 4–6 seconds and never replaces content.
A short that would still make sense with the CTA removed passes; one that only advertises fails.

## II. Source fidelity
Content comes from a single page of textbook.com.pk (Mega Textbook or Licence track). Claims
must be traceable to that page. No invented statistics, quotations, research citations or exam
"guarantees", and never a misstatement of official STEDA licence rules or procedures. The episode records its `source_url` and the source excerpt used.

## III. Urdu, done properly
v1 is Urdu only. Scripts use clear, standard Urdu suited to teacher-education audiences in
Sindh; technical terms follow the parent repo's term bank (`specs/content/terminology.csv`, `glossary.json`) and the site's Urdu page, with the English term in
brackets on first use where the site does so. Captions are Nastaliq, right-to-left, and are
checked against the spoken script word by word.

## IV. One brand, one cast, one voice
Characters, voices, colours, fonts, sets, music bed, intro sting and CTA card come only from
`brand/brand-bible.yaml`. Nothing is improvised per episode. Locked items change only via ADR.

## V. Subscriptions only
No pay-as-you-go APIs, no billing accounts, no paid stock libraries. Generation happens in the
owner's existing subscriptions (Gemini/Google AI Pro incl. Flow, ChatGPT Plus, Claude Pro,
LongCat), in free, local, open-source tools (Remotion, FFmpeg, faster-whisper), or on the owner's
**free Kaggle notebook quota** for media compute (VS-ADR-0011): no billing account, private
datasets only, the Kaggle API token kept outside the repo. Where a UI is
required, the pipeline writes a precise handoff brief and waits for files.
"Subscription" means the owner using each product's own interface by hand. It never means
scraping, using session cookies, or automating a subscription website with a browser bot.
The additional billed API spend target is 0 USD; log subscription-credit consumption, free-tier limits and other real costs instead of describing use as unlimited free. Any new charge needs an ADR and owner approval.

## VI. Human in the loop at three gates
1. **Script gate** - owner approves the Urdu script and CTA.
2. **Asset gate** - owner approves character, voice and clip assets.
3. **Render gate** - owner approves the final video before anything is published.
Nothing is posted automatically in v1.

## VII. Deterministic assembly
Everything after the asset gate is reproducible: same inputs → same video. Assembly is code
(Remotion), not manual editing. Generative models supply ingredients; they never assemble.

## VIII. Respect and safety
No real person's likeness or voice is cloned; a human narrator's voice is used only with
recorded consent. Characters are original. Depictions of teachers,
students, classrooms and Sindh culture are respectful and inclusive (gender, rural/urban,
dress). No content that ridicules students or teachers. Applicable platform AI-content disclosures are checked and applied through the owner's publishing workflow; automated labeling is not assumed.

## IX. Small, observable increments
Build in phases with a checkpoint at each. Each episode's state is a JSON file that a person
can read. Reviewer subagents report findings; they do not silently fix.

## X. Provenance and reproducibility
Every source snapshot and every imported asset is recorded with its SHA-256, origin tool,
prompt, rights/consent note, import time and reviewer. Approvals are bound to hashes: if the
source page, script or an approved asset changes, the affected approval is void and the
episode returns to review. Rendering only ever uses already-approved local files - it never
regenerates anything. Sample/fixture content is never substituted silently: production mode
refuses episodes marked `sample`.

## XI. The parent site comes first
The textbook site's build, deploy and dependencies stay untouched. Heavy local jobs obey the parent
host limits (`flock /tmp/mega-book-heavy.lock`); renders and alignment run on Kaggle, not on the
production server. video-studio has its own
package.json and lockfile; the root package.json is not edited. Every change can be rolled
back by reverting the video-studio commits.

## XII. Honest reporting
Claude never claims a file, render or generation exists until a command proves it. Reports
state evidence, changed files, test results and remaining manual steps.

## XIII. Media never enters git
Output videos, audio, images, stills, subtitles files, consent scans and Kaggle bundles live under
`MEDIA_ROOT`, outside the working tree. The repo holds text only: JSON state, scripts, prompts,
reviews and manifests that record hashes and paths. The parent repo is public; a tracked media file
or consent record is a defect, and the parent CI gate `check:no-media-in-video-studio` fails on it.
