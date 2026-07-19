# Lighthouse Audit Results (T060a)

**Feature**: 002-authentication | **Date**: 2026-07-19

**Gate**: Constitution Art. VII engineering gate treats a Performance or Accessibility score
below 90 as a failure.

**No public preview deployment exists for this feature** (the live `www.a2ahs.com` predates
Spec 002's auth pages — see ADR-0006's downstream-artifacts note). Ran against
`npm run build && npm run serve` instead — a real production build served statically, the closest
honest substitute to a preview deployment available in this environment. Desktop preset, Chrome
(Playwright's installed binary, headless), one docs page and one auth page as specified.

## Results

| Category | Docs page (`/semester-1/efmp-301/unit-01/`) | Auth page (`/app/login/`) | Gate (≥ 90) |
|---|---|---|---|
| Performance | 99 | 100 | ✅ PASS |
| Accessibility | 100 | 100 | ✅ PASS |
| Best Practices | 96 | 96 | (not gated) |
| SEO | 100 | 100 | (not gated) |

**Both gated categories pass on both pages, with wide margin.**

## Best Practices: the one point lost on both pages

Both pages lose 4 points to the same single audit: `errors-in-console` — a `404` for
`/img/favicon.ico`. Confirmed this is a **pre-existing Feature 001 asset gap**, not something
Spec 002 introduced: `docusaurus.config.ts` references `favicon: 'img/favicon.ico'`, but
`static/img/favicon.ico` does not exist in the repo. It affects every page on the site equally
(reproduced on the docs page too), not specifically the auth pages. Out of scope for this
feature's gate (Best Practices isn't one of the two gated categories) and out of scope to fix
here (a Feature 001 asset, not Spec 002 code) — flagged rather than silently fixed or ignored.

## Why the auth-page Accessibility score is a meaningful 100, not a lucky one

This isn't the first accessibility check this feature has had — T061 (same session) found and
fixed a real, previously-unnoticed gap: Infima ships no `.input` class at all, so every text
field had been rendering as an unstyled, under-44px browser default all session. That fix
(real `.input`/`.auth-tap-target` CSS, `aria-live` on every error region) is very likely why this
audit comes back clean — Lighthouse's accessibility audit specifically checks label association,
color contrast, and (via axe-core) many of the same things T061 targeted by hand with a live
screenshot and `boundingBox()` measurement, not lighthouse. Two independent checks agreeing is
stronger evidence than either alone.

## Reproduce

```bash
npm run build
npm run serve -- --port 3001 &

export CHROME_PATH=<path to a Chrome/Chromium binary>   # e.g. Playwright's installed one:
                                                          # ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome
npx lighthouse http://127.0.0.1:3001/semester-1/efmp-301/unit-01/ \
  --output=json --output=html --output-path=./docs-page \
  --chrome-flags="--headless=new --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo --preset=desktop

npx lighthouse http://127.0.0.1:3001/app/login/ \
  --output=json --output=html --output-path=./auth-page \
  --chrome-flags="--headless=new --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo --preset=desktop
```

## Next step

Re-run against the real `www.a2ahs.com` once this feature is actually deployed publicly — this
result is real (a genuine production build, not dev mode), but not the final, at-the-actual-URL
number T060a's "preview deployment" framing intended, since no such deployment exists yet.
