import { config as loadEnv } from 'dotenv';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/**
 * Loads `.env.local` into `process.env` for local `npm run build`/`start` -
 * without this, DOCUSAURUS_SUPABASE_URL/ANON_KEY silently come through empty
 * (no error), and every auth-gated UI (NavbarAuthWidget, AuthGuard) just
 * renders nothing. CI is unaffected: it sets these as real environment
 * variables via the workflow's own `env:` block, and dotenv silently no-ops
 * when `.env.local` doesn't exist rather than overriding anything.
 */
loadEnv({ path: '.env.local' });

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
  favicon: 'img/favicon.svg',
  url: 'https://textbook.com.pk',
  baseUrl: '/',
  trailingSlash: true, // emit /path/index.html so plain static file servers (nginx/Apache) serve directory URLs
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // The declared favicon had no file behind it, so every page requested a 404.
  // An SVG icon plus a PNG fallback covers everything current.
  headTags: [
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/img/favicon.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon.png' } },
  ],

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
   * The service-role key must never appear here or anywhere under src/ -
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
        // The sitemap shipped on pure defaults: 88 URLs at a uniform
        // weekly/0.5, including 35 auth-gated /app/* pages and /search/, all
        // of which render empty behind a guard for a crawler. Excluding them
        // is the single biggest crawl-budget win available here.
        sitemap: {
          // Both the default-locale paths AND the /ur/-prefixed ones: the
          // Urdu sitemap is generated with the locale baseUrl, so '/app/**'
          // alone left all 35 auth-gated pages in build/ur/sitemap.xml.
          ignorePatterns: ['/app/**', '/search', '/search/**', '/ur/app/**', '/ur/search', '/ur/search/**'],
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    /**
     * Second docs-plugin instance for the Student/Teacher Guides (Spec 004,
     * ADR-0009, research.md R6, T001). Kept deliberately separate from the
     * curriculum docs instance above - its topic-based navigation (guide ->
     * guide) has nothing to do with the curriculum's semester -> course ->
     * unit hierarchy, and mixing the two would confuse both the sidebar and
     * Spec 001's SC-003 promise that the curriculum catalog is the site's home.
     */
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'guides',
        path: 'guides',
        routeBasePath: 'guides',
        sidebarPath: './sidebars-guides.ts',
      },
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** Bilingual offline search (FR-006, SC-004). 'ur' added to `language` once
       *  the Urdu tokenizer is verified against SC-004 (research R5 / T025).
       *  `docsRouteBasePath` now also indexes the `guides` instance (Spec 004,
       *  T001) alongside the curriculum instance at `/`. */
      {
        hashed: true,
        language: ['en'],
        indexBlog: false,
        docsRouteBasePath: ['/', '/guides'],
      },
    ],
  ],

  themeConfig: {
    // Without this there is no og:image at all, while twitter:card is
    // summary_large_image - so every WhatsApp/social share rendered a blank
    // card. WhatsApp matters a great deal for this audience.
    image: 'img/social-card.png',
    metadata: [
      { name: 'keywords', content: 'B.Ed, B.Ed 4 year, teacher education, University of Sindh, Pakistan, Sindh, bilingual textbook, Urdu, EFMP, GECE' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:site_name', content: 'B.Ed Mega Textbook' },
      { property: 'og:type', content: 'website' },
    ],
    navbar: {
      logo: { alt: 'B.Ed Mega Textbook', src: 'img/logo.svg', width: 28, height: 28 },
      title: 'B.Ed Textbook',
      items: [
        // Spec 010 follow-up, 2026-09-07 - registers
        // src/components/MobileTopBarWidgets.tsx; renders nothing at
        // desktop widths, a compact locale-switch + sign-in-status pair at
        // <=996px, placed first so it sits left of the mobile search icon.
        { type: 'custom-mobileTopBar', position: 'right' },
        { type: 'localeDropdown', position: 'right' },
        { type: 'search', position: 'right' },
        // Spec 004, T007 - registers src/components/DashboardNavLink.tsx;
        // renders nothing unless signed in as a student.
        { type: 'custom-dashboardLink', position: 'right' },
        // Spec 005, T003 - registers src/components/TeacherDashboardNavLink.tsx;
        // renders nothing unless signed in as a teacher.
        { type: 'custom-teacherDashboardLink', position: 'right' },
        // Spec 002, T030 - registers src/components/NavbarAuthWidget.tsx via
        // the swizzled src/theme/NavbarItem/ComponentTypes.tsx.
        { type: 'custom-authWidget', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: 'B.Ed (4-Year) Mega Textbook - University of Sindh, Faculty of Education.',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
