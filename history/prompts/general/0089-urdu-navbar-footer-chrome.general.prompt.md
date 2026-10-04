---
id: 0089
title: Urdu navbar and footer chrome (TEX-17)
stage: general
date: 2026-10-04
surface: agent
model: claude-opus-5
feature: none
branch: agent/TEX-17
user: M Yousif Channa
command: Paperclip heartbeat (issue_assigned, TEX-17)
labels: ["BilingualAuthor", "paperclip", "i18n", "urdu", "ux", "rtl", "licence-paid-layer-hold", "scope-narrowed"]
links:
  spec: null
  ticket: TEX-17
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-theme-classic/navbar.json
 - i18n/ur/docusaurus-theme-classic/footer.json
 - history/prompts/general/0089-urdu-navbar-footer-chrome.general.prompt.md
tests:
 - npm run check:no-em-dash (PASS)
 - npm run validate:content (PASS)
 - npm run check:no-answer-keys (PASS)
 - npm run build (under flock /tmp/mega-book-heavy.lock)
 - npx docusaurus write-translations --locale ur (used to confirm canonical key names, not committed beyond navbar.json)
---

## Prompt

Board: assigned to BilingualAuthor. UI/UX is the current priority, and this closes the gap where
Urdu pages sit inside an English navbar/footer/pricing page. Before starting, read new board-direct
PHRs (history/prompts/general/0087, 0088) per your role file. Coordinate with PR #85 (GA4), which
also adds i18n/ur/docusaurus-theme-classic/footer.json keys: rebase on main after it merges and
keep the union of keys. Draft PR with a PHR.

(TEX-17: "Urdu for the navbar, footer and pricing page (17 strings, finishes the /ur/ shell)",
raised by BilingualAuthor out of TEX-12.)

## Response snapshot

Read PHR 0087 and 0088 first as instructed, then re-measured the issue's string list against
current `main` (`e95bc0cf`) instead of trusting the counts recorded when the issue was raised.
**The 17-string premise is stale and the issue narrows to 6 strings.**

Findings:

1. **No pricing page exists.** `src/pages/pricing*` is absent; PR #89 deferred the Licence
   Practice Pass paywall (PHR 0088). The 11 `pricing.*` keys in `i18n/ur/code.json` are orphans -
   `grep -rn "pricing\." src/` returns zero source references in either locale.
2. **`item.label.Pricing` and `item.label.Sign up` are orphans too.** The `docusaurus.config.ts`
   navbar carries About, Contact, Licence track and custom widgets; no Pricing or Sign up item.
3. **About and Contact had no key at all**, as the issue suspected. Canonical names were confirmed
   by running `docusaurus write-translations --locale ur` rather than guessed: Docusaurus emitted
   `item.label.About` and `item.label.Contact`. (That run needed `npm run build:content-status`
   first, because `docusaurus.config.ts` refuses to load without `static/content-status.json`.)

Decision: the 13 orphaned strings were **left untranslated**. They render nowhere, `pricing.*`
belongs to the Licence paid layer that PHR 0087/0088 put under an active board hold, and
`pricing.activationNotice` / `pricing.refundPolicy` are commercial promises whose English
GrowthLeadAgy has not confirmed - a stale refund window is worse in two languages than one.

Shipped, 6 strings over 2 files, every term reused from PR #86 / TEX-15 so the chrome and the
landing page agree:

| file | key | Urdu |
|---|---|---|
| navbar.json | `title` | بی ایڈ ٹیکسٹ بک |
| navbar.json | `logo.alt` | بی ایڈ میگا ٹیکسٹ بک |
| navbar.json | `item.label.Licence track` | لائسنس ٹریک |
| navbar.json | `item.label.About` (new key) | تعارف |
| navbar.json | `item.label.Contact` (new key) | رابطہ |
| footer.json | `copyright` | بی ایڈ (چار سالہ) میگا ٹیکسٹ بک - جامعہ سندھ، شعبۂ تعلیم۔ |

`شعبۂ تعلیم` for Faculty of Education follows the Urdu about page from PR #86; coining
"فیکلٹی آف ایجوکیشن" here would have made the footer disagree with the about page. The trailing
`۔` (U+06D4) instead of a Latin full stop is what fixes the bidi flip the issue describes, so the
footer stop is a deliberate fix rather than a side effect. No string in this set contains a number,
so the `Rs 1,500 / 60 / 5 / 7` parity constraint is untouched.

PR #85 (GA4) is still an open draft, so there was nothing to rebase onto. It touches `footer.json`
only to add privacy-link keys while this diff touches `copyright` only, so the union merges cleanly
in either order.

## Outcome

- ✅ Impact: a reader on `/ur/` now gets an Urdu navbar title, Urdu About / Contact / Licence track items and an Urdu footer, instead of Urdu pages inside English chrome.
- 🧪 Tests: `check:no-em-dash`, `validate:content`, `check:no-answer-keys` PASS; `npm run build` under the heavy-job lock; `/ur/` inspected for RTL and overflow at desktop and 360px.
- 📁 Files: `i18n/ur/docusaurus-theme-classic/navbar.json`, `.../footer.json`, this PHR.
- 🔁 Next prompts: delete the 13 orphaned `pricing.*` / `item.label.Pricing` / `item.label.Sign up` keys when the paid-layer hold lifts; Reviewer G5-style check on the 6 Urdu strings.
- 🧠 Reflection: the issue's own measured counts had rotted in two days because a board-direct PR removed the page they described. Re-measuring before writing was the whole value of this run.

## Handoff (for CEO and agents)

- Shipped / changed: 6 Urdu chrome strings (navbar title, logo alt, Licence track, new About and Contact keys, footer copyright). The `/ur/` shell is now Urdu end to end for every route that actually exists.
- Decisions the team must respect: the 11 `pricing.*` keys and the orphaned `item.label.Pricing` / `item.label.Sign up` stay **English on purpose**. They render nowhere, they sit in the held Licence paid-layer tree, and the two commercial promises need GrowthLeadAgy to confirm the English before any second locale. Do not "finish" them as a tidy-up.
- Pending / next owner: CurriculumOwner / Reviewer for Urdu quality on the 6 strings. GrowthLeadAgy still owes a currency check on the activation and refund copy. Board to decide whether the 13 orphaned keys get a deletion follow-up issue once the hold lifts.
- Paperclip issues affected: TEX-17 (this run, to `in_review`); TEX-12 (its flagged follow-up, now closed apart from the held pricing strings); TEX-7 / TEX-8 / TEX-18 (held, untouched); TEX-11 / PR #85 (shares `footer.json`, no conflict).

## Evaluation notes (flywheel)

- Failure modes observed: an issue's precisely measured scope went stale when a board-direct PR deleted the page it measured; following it literally would have produced 11 Urdu strings for an unreachable route inside a held tree.
- Graders run and results (PASS/FAIL): check:no-em-dash PASS, validate:content PASS, check:no-answer-keys PASS, build see PR.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): have the role files require re-measuring an issue's stated file/string counts against `origin/main` before acting, since board-direct PRs now land between issue creation and assignment.
