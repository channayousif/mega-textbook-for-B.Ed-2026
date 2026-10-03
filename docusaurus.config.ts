import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
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
/**
 * Units resting at Constitution Art. VII.7 provisional review, as `COURSE:unit`
 * keys, read at config time from the report `prebuild`/`prestart` just wrote.
 *
 * Read here rather than fetched in the browser so the "Final Review Pending"
 * notice is server-rendered: a disclosure that appears only after hydration is
 * invisible to crawlers and flashes in late for readers, which is exactly the
 * wrong behaviour for a notice about content trustworthiness. (Footer.tsx's
 * runtime `fetchContentIndex` is fine for a "mark as studied" button; this is
 * not that.)
 *
 * FAILS LOUD, deliberately (ADR-0026). This used to `catch { return [] }` on the
 * grounds that a missing report should not break `docusaurus start`. That was
 * defensible while a banner meant "reviewed but uncertified". It is not
 * defensible now: since publication no longer waits on review, a unit with no
 * banner is a unit claiming to be certified. A swallowed read error therefore
 * publishes the whole corpus as certified, silently, on a green build - the
 * exact failure the notice exists to prevent.
 *
 * So a missing, malformed or STALE report is a build failure. Staleness is
 * checked against the tracker digests the report recorded when it was written;
 * `prebuild`/`prestart` regenerate it, so the happy path is unchanged.
 */
type PublicationTier = 'certified' | 'provisional' | 'gated' | 'unpublished';
const NOTICE_TIERS: PublicationTier[] = ['provisional', 'gated'];

function reviewNotices(): Record<string, PublicationTier> {
  let raw: string;
  try {
    raw = readFileSync('./static/content-status.json', 'utf8');
  } catch {
    throw new Error(
      'static/content-status.json is missing. Every publication notice is derived from it, '
      + 'so building without it would publish unreviewed units with no notice. '
      + 'Run: npm run build:content-status',
    );
  }

  const report = JSON.parse(raw);
  if (!Array.isArray(report.courses)) {
    throw new Error('static/content-status.json has no `courses` array; it is malformed.');
  }

  for (const [path, digest] of Object.entries(report.trackers ?? {})) {
    const actual = createHash('sha256').update(readFileSync(path)).digest('hex');
    if (actual !== digest) {
      throw new Error(
        `static/content-status.json is stale: ${path} has changed since it was generated. `
        + 'Publication tiers would be wrong. Run: npm run build:content-status',
      );
    }
  }

  const notices: Record<string, PublicationTier> = {};
  for (const course of report.courses) {
    for (const unit of course.units ?? []) {
      if (!unit.authored) continue;
      const tier = unit.publication as PublicationTier | undefined;
      if (tier === undefined) {
        throw new Error(
          `${course.course_code} unit ${unit.unit_no} has no \`publication\` field. `
          + 'Regenerate the report: npm run build:content-status',
        );
      }
      // An unrecognised tier must not silently mean "no notice". Anything the
      // build does not understand is disclosed at the strongest level.
      if (!['certified', 'provisional', 'gated', 'unpublished'].includes(tier)) {
        notices[`${course.course_code}:${unit.unit_no}`] = 'gated';
        continue;
      }
      if (NOTICE_TIERS.includes(tier)) notices[`${course.course_code}:${unit.unit_no}`] = tier;
    }
  }
  return notices;
}

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
    reviewNotices: reviewNotices(),
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
    /**
     * Third docs instance: the licence content track (Feature 015, ADR-0020;
     * reshaped by Feature 024 into a code-free STEDA Part II topic list under
     * `licence/pedagogy/<heading>/<subtopic>.mdx`).
     *
     * Keeping it in its own instance rather than a semester folder avoids
     * recording a false fact about the approved programme in the URL and the
     * sidebar: nothing here is a degree course.
     *
     * `id` is load-bearing: omit it and the instance silently merges into the
     * first one (the failure mode Spec 004's quickstart records). It also fixes
     * the Urdu tree at i18n/ur/docusaurus-plugin-content-docs-licence/, which
     * scripts/lib/content-roots.mjs derives rather than assumes.
     */
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'licence',
        path: 'licence',
        routeBasePath: 'licence',
        sidebarPath: './sidebars-licence.ts',
      },
    ],
    /**
     * Feature 024: redirects for licence URLs retired by the topic-list
     * migration (the old EED-313 course pages). The list is content, kept in
     * catalog/licence-redirects.json so a migration never needs a config edit.
     */
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: (JSON.parse(readFileSync('./catalog/licence-redirects.json', 'utf8')) as {
          redirects: { from: string; to: string }[];
        }).redirects,
      },
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** Bilingual offline search (FR-006, SC-004). 'ur' added to `language` once
       *  the Urdu tokenizer is verified against SC-004 (research R5 / T025).
       *  `docsRouteBasePath` indexes the `guides` instance (Spec 004, T001) and
       *  the `licence` track (Feature 015, T025) alongside the curriculum
       *  instance at `/`. Article X-bis discoverability for the licence track is
       *  met by search plus its own navbar entry, not by the semester sidebar. */
      {
        hashed: true,
        language: ['en'],
        indexBlog: false,
        docsRouteBasePath: ['/', '/guides', '/licence'],
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
      { name: 'description', content: 'Bilingual digital textbook and Licence Practice Pass for the B.Ed (4-Year) programme in Sindh.' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:site_name', content: 'B.Ed Mega Textbook' },
      { property: 'og:type', content: 'website' },
    ],
    navbar: {
      logo: { alt: 'B.Ed Mega Textbook', src: 'img/logo.svg', width: 28, height: 28 },
      title: 'B.Ed Textbook',
      items: [
        { to: '/about', label: 'About', position: 'left' },
        { to: '/contact', label: 'Contact', position: 'left' },
        // Feature 015, T027 - the licence track's only navigation entry.
        // Article X-bis discoverability is met here plus offline search; the
        // track is deliberately absent from the semester sidebar, because
        // EED-313 is not part of the approved 2026 scheme (research R3).
        { to: '/licence/', label: 'Licence track', position: 'left' },
        { to: '/pricing', label: 'Pricing', position: 'right' },
        { to: '/app/signup', label: 'Sign up', position: 'right' },
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
