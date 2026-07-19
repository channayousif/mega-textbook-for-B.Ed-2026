import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/**
 * Bilingual Content Platform (FR-001..FR-006).
 * - i18n: en (default, LTR) + ur (RTL) with a per-page locale dropdown.
 * - Docs at site root (routeBasePath '/') so the catalog is the home (SC-003).
 * - Offline bilingual local search via @easyops-cn/docusaurus-search-local.
 * Verify version-sensitive keys against current Docusaurus v3 docs (Context7).
 */
const config: Config = {
  title: 'B.Ed Mega Textbook',
  tagline: 'Bilingual digital textbook for the B.Ed (4-Year) programme',
  favicon: 'img/favicon.ico',
  url: 'https://www.a2ahs.com',
  baseUrl: '/',
  trailingSlash: true, // emit /path/index.html so plain static file servers (nginx/Apache) serve directory URLs
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
    localeConfigs: {
      en: { label: 'English', direction: 'ltr', htmlLang: 'en' },
      ur: { label: 'اردو', direction: 'rtl', htmlLang: 'ur' },
    },
  },

  /**
   * Auth config surfaced to client code (Spec 002).
   * `process.env` is NOT readable from the browser bundle, so these must pass
   * through customFields and be read via useDocusaurusContext().siteConfig.customFields.
   *
   * Both values are public by design: the anon key is safe to ship ONLY because
   * Row-Level Security is enabled on every table (Constitution Art. V.1/V.2).
   * The service-role key must never appear here or anywhere under src/ —
   * `npm run check:no-service-key` fails the build if it does.
   */
  customFields: {
    supabaseUrl: process.env.DOCUSAURUS_SUPABASE_URL ?? '',
    supabaseAnonKey: process.env.DOCUSAURUS_SUPABASE_ANON_KEY ?? '',
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** Bilingual offline search (FR-006, SC-004). 'ur' added to `language` once
       *  the Urdu tokenizer is verified against SC-004 (research R5 / T025). */
      {
        hashed: true,
        language: ['en'],
        indexBlog: false,
        docsRouteBasePath: '/',
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'B.Ed Textbook',
      items: [
        { type: 'localeDropdown', position: 'right' },
        { type: 'search', position: 'right' },
        // Spec 002, T030 — registers src/components/NavbarAuthWidget.tsx via
        // the swizzled src/theme/NavbarItem/ComponentTypes.tsx.
        { type: 'custom-authWidget', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: 'B.Ed (4-Year) Mega Textbook — University of Sindh, Faculty of Education.',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
