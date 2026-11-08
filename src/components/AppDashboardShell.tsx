import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HtmlClassNameProvider } from '@docusaurus/theme-common';
import StudentDashboardGuard from '@site/src/components/StudentDashboardGuard';
import TeacherDashboardGuard from '@site/src/components/TeacherDashboardGuard';
import { useAuth } from '@site/src/contexts/AuthContext';
import { navSections, activeKeyIn, type NavSection } from '@site/src/lib/dashboardNav';
import Icon from '@site/src/components/icons/Icon';

/**
 * The app layout for every signed-in page (Spec 011, redesigned 2026-11-08 after the
 * Materio reference the owner chose): a grouped sidebar whose sections follow the
 * account's roles (Learn, Teach, Manage, Review, Account), collapsible to icons on wide
 * screens, and a drawer on phones. The site navbar stays in the DOM and becomes the
 * app top bar through the `app-page` class on <html> (tests read the account email and
 * the Admin link inside `.navbar`); the site footer is hidden inside the app.
 *
 * `role` keeps the old contract: "student" and "teacher" wrap the content in their
 * dashboard guard. Without it the page brings its own guard (classes, admin, reviewer,
 * profile). RLS is still the real enforcement (Art. IX.2); this only changes layout.
 *
 *   <Layout title="…"><AppDashboardShell role="student">{content}</AppDashboardShell></Layout>
 *   <Layout title="…"><AppDashboardShell><OwnerConsoleGuard>…</OwnerConsoleGuard></AppDashboardShell></Layout>
 */

type Locale = 'en' | 'ur';
const COLLAPSE_KEY = 'app-nav-collapsed';

const MESSAGES = {
  openMenu: { en: 'Open menu', ur: 'مینو کھولیں' },
  closeMenu: { en: 'Close menu', ur: 'مینو بند کریں' },
  dashboardNav: { en: 'Dashboard navigation', ur: 'ڈیش بورڈ نیویگیشن' },
  collapse: { en: 'Collapse menu', ur: 'مینو سکیڑیں' },
  expand: { en: 'Expand menu', ur: 'مینو پھیلائیں' },
} as const;

function useLocale(): Locale {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

function Sections({ sections, current, locale, collapsed, onNavigate, idPrefix }: {
  sections: NavSection[];
  current: string | null;
  locale: Locale;
  collapsed: boolean;
  onNavigate?: () => void;
  idPrefix: string;
}): React.ReactElement {
  return (
    <>
      {sections.map((section) => {
        const headingId = `${idPrefix}-${section.key}`;
        return (
          <div key={section.key} className="dashboard-shell__section">
            <p id={headingId} className="dashboard-shell__section-label">{section.label[locale]}</p>
            <ul className="dashboard-shell__navlist" aria-labelledby={headingId}>
              {section.items.map((it) => {
                const isActive = it.key === current;
                return (
                  <li key={it.key}>
                    <Link
                      to={it.to}
                      className={clsx('dashboard-shell__navlink', isActive && 'dashboard-shell__navlink--active')}
                      aria-current={isActive ? 'page' : undefined}
                      data-nav-key={it.key}
                      title={collapsed ? it.label[locale] : undefined}
                      onClick={onNavigate}
                    >
                      {it.icon && <Icon name={it.icon} size={22} accent={isActive} />}
                      <span className="dashboard-shell__navtext">{it.label[locale]}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default function AppDashboardShell({
  role,
  children,
}: {
  role?: 'student' | 'teacher';
  children: React.ReactNode;
}): React.ReactElement {
  const locale = useLocale();
  const location = useLocation();
  const auth = useAuth();
  // Before the profile loads, fall back to the area's own role so the menu does not jump.
  const sections = navSections({ role: auth.role ?? role ?? null, reviewer: auth.reviewer });
  const current = activeKeyIn(sections, location.pathname);
  const navId = useId();

  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    try { setCollapsed(localStorage.getItem(COLLAPSE_KEY) === '1'); } catch { /* storage blocked */ }
  }, []);
  const toggleCollapsed = () => {
    setCollapsed((v) => {
      try { localStorage.setItem(COLLAPSE_KEY, v ? '0' : '1'); } catch { /* storage blocked */ }
      return !v;
    });
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const drawerId = useId();

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Focus trap + Escape while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const drawer = drawerRef.current;
    const focusables = drawer
      ? Array.from(drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      : [];
    focusables[0]?.focus();
    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDrawer();
        return;
      }
      if (e.key !== 'Tab' || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen, closeDrawer]);

  const body = (
    <div className={clsx('dashboard-shell', collapsed && 'dashboard-shell--collapsed')}>
      <nav className="dashboard-shell__sidebar" aria-label={MESSAGES.dashboardNav[locale]}>
        <Sections sections={sections} current={current} locale={locale} collapsed={collapsed} idPrefix={`${navId}-side`} />
        <button
          type="button"
          className="dashboard-shell__collapse"
          aria-pressed={collapsed}
          onClick={toggleCollapsed}
          title={collapsed ? MESSAGES.expand[locale] : MESSAGES.collapse[locale]}
        >
          <Icon name="chevron" size={20} accent={false} className="dashboard-shell__collapse-icon" />
          <span className="dashboard-shell__navtext">{collapsed ? MESSAGES.expand[locale] : MESSAGES.collapse[locale]}</span>
        </button>
      </nav>

      <div className="dashboard-shell__topbar">
        <button
          ref={toggleRef}
          type="button"
          className="dashboard-shell__toggle"
          aria-expanded={drawerOpen}
          aria-controls={drawerId}
          onClick={() => setDrawerOpen((v) => !v)}
        >
          <Icon name="menu" size={22} accent={false} />
          <span>{drawerOpen ? MESSAGES.closeMenu[locale] : MESSAGES.openMenu[locale]}</span>
        </button>
      </div>

      {drawerOpen && (
        <>
          <div className="dashboard-shell__backdrop" onClick={closeDrawer} aria-hidden="true" />
          <div
            ref={drawerRef}
            id={drawerId}
            className="dashboard-shell__drawer"
            role="dialog"
            aria-modal="true"
            aria-label={MESSAGES.dashboardNav[locale]}
          >
            <button type="button" className="dashboard-shell__drawer-close" onClick={closeDrawer}>
              <Icon name="close" size={20} accent={false} />
              <span>{MESSAGES.closeMenu[locale]}</span>
            </button>
            <Sections sections={sections} current={current} locale={locale} collapsed={false} onNavigate={closeDrawer} idPrefix={`${navId}-drawer`} />
          </div>
        </>
      )}

      <main className="container auth-page dashboard-shell__main">
        {children}
      </main>
    </div>
  );

  const Guard = role === 'teacher' ? TeacherDashboardGuard : role === 'student' ? StudentDashboardGuard : null;
  return (
    <HtmlClassNameProvider className="app-page">
      {Guard ? <Guard>{body}</Guard> : body}
    </HtmlClassNameProvider>
  );
}
