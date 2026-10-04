# Implementation Plan: Install GA4 on textbook.com.pk

## Architecture
- Use Docusaurus `@docusaurus/preset-classic` built-in `gtag` configuration to inject GA4.
- `trackingID`: `G-2DCL2X01DL`
- `anonymizeIP`: `true` (privacy default).
- Add a new page `src/pages/privacy.tsx` (English) and corresponding Urdu translations.

## Phases
1. **Phase 1: Configuration**: Update `docusaurus.config.ts` to include the `gtag` object in the classic preset options.
2. **Phase 2: Privacy Notice**: 
   - Create `src/pages/privacy.tsx` explaining GA4 data collection.
   - Add translation for `ur` locale in `i18n/ur/docusaurus-plugin-content-pages/privacy.tsx` or handle via strings. Since it's just a page, a `.tsx` file or `.md` in pages is fine. Docusaurus allows `src/pages/privacy.md`. Let's use `src/pages/privacy.md` and `i18n/ur/docusaurus-plugin-content-pages/privacy.md` for simplicity and native markdown support.
   - Update `docusaurus.config.ts` footer to include a link to `/privacy`.
3. **Phase 3: Validation**: Build (`npm run build`) and verify the bundle size against Constitution Art. V.5 limits. Run `npm run check:all`.
