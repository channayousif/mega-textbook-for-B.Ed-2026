# Tasks: Install GA4 on textbook.com.pk

## Phase 1: Configuration
- [x] `task-1`: Update `docusaurus.config.ts` to include `gtag: { trackingID: "G-2DCL2X01DL", anonymizeIP: true }` in `preset-classic`.

## Phase 2: Privacy Notice
- [x] `task-2`: Create `src/pages/privacy.md` with English privacy and cookie notice.
- [x] `task-3`: Create `i18n/ur/docusaurus-plugin-content-pages/privacy.md` with Urdu privacy and cookie notice.
- [x] `task-4`: Update `docusaurus.config.ts` footer to include a link to `/privacy`.

## Phase 3: Validation
- [x] `task-5`: Run `npm run build` and capture build delta for the PR.
- [x] `task-6`: Run `npm run check:all` to ensure no regressions.
