import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StudentDashboardGuard from '@site/src/components/StudentDashboardGuard';
import TeacherDashboardGuard from '@site/src/components/TeacherDashboardGuard';
import { studentNav, teacherNav, activeKey, type NavItem } from '@site/src/lib/dashboardNav';

/**
 * Shared authenticated app shell (Spec 011, US1 / FR-001..FR-005).
 *
 * Wraps every `/app/dashboard/*` and `/app/teacher/*` page: the matching cosmetic role
 * guard + a persistent left-side menu (drawer below 768px) + the existing
 * `container auth-page` content frame. RLS is still the real enforcement (Art. IX.2); this
 * component only changes navigation and layout.
 *
 * Docusaurus `src/pages/**` has no nested-layout hook, so each page opts in:
 *   <Layout title="…"><AppDashboardShell role="student">{content}</AppDashboardShell></Layout>
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  menu: { en: 'Menu', ur: 'مینو' },
  openMenu: { en: 'Open menu', ur: 'مینو کھولیں' },
  closeMenu: { en: 'Close menu', ur: 'مینو بند کریں' },
  dashboardNav: { en: 'Dashboard navigation', ur: 'ڈیش بورڈ نیویگیشن' },
} as const;

function NavList({
  items,
  current,
  locale,
  onNavigate,
}: {
  items: readonly NavItem[];
  current: string | null;
  locale: 'en' | 'ur';
  onNavigate?: () => void;
}): React.ReactElement {
  return (
    <ul className="dashboard-shell__navlist">
      {items.map((it) => {
        const isActive = it.key === current;
        return (
          <li key={it.key}>
            <Link
              to={it.to}
              className={`dashboard-shell__navlink${isActive ? ' dashboard-shell__navlink--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              data-nav-key={it.key}
              onClick={onNavigate}
            >
              {it.label[locale]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function AppDashboardShell({
  role,
  children,
}: {
  role: 'student' | 'teacher';
  children: React.ReactNode;
}): React.ReactElement {
  const locale = useLocale();
  const location = useLocation();
  const items = role === 'teacher' ? teacherNav : studentNav;
  const current = activeKey(items, location.pathname);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const drawerId = useId();

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close on route change.
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Focus trap + Escape while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const drawer = drawerRef.current;
    const focusables = drawer
      ? Array.from(
          drawer.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
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

  const Guard = role === 'teacher' ? TeacherDashboardGuard : StudentDashboardGuard;

  return (
    <Guard>
      <div className="dashboard-shell">
        {/* Desktop / wide: a persistent sidebar. */}
        <nav className="dashboard-shell__sidebar" aria-label={MESSAGES.dashboardNav[locale]}>
          <p className="dashboard-shell__sidebar-heading">{MESSAGES.menu[locale]}</p>
          <NavList items={items} current={current} locale={locale} />
        </nav>

        {/* Narrow: a toggle that opens the drawer. */}
        <div className="dashboard-shell__topbar">
          <button
            ref={toggleRef}
            type="button"
            className="button button--secondary button--sm dashboard-shell__toggle"
            aria-expanded={drawerOpen}
            aria-controls={drawerId}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            {drawerOpen ? MESSAGES.closeMenu[locale] : MESSAGES.openMenu[locale]}
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
              <button
                type="button"
                className="button button--secondary button--sm dashboard-shell__drawer-close"
                onClick={closeDrawer}
              >
                {MESSAGES.closeMenu[locale]}
              </button>
              <NavList items={items} current={current} locale={locale} onNavigate={closeDrawer} />
            </div>
          </>
        )}

        <main className="container auth-page margin-vert--lg dashboard-shell__main">
          {children}
        </main>
      </div>
    </Guard>
  );
}
