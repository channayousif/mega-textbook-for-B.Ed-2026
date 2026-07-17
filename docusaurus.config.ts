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
      ],
    },
    footer: {
      style: 'dark',
      copyright: 'B.Ed (4-Year) Mega Textbook — University of Sindh, Faculty of Education.',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
