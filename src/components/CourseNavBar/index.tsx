import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import { useActivePlugin, useDocsSidebar, useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { buildNavLevels, type NavLevel, type NavOption, type SidebarItem } from '@site/src/lib/navCrumbs';
import { useTreeState } from './treeState';
import styles from './styles.module.css';

/**
 * Horizontal breadcrumb bar of dropdowns that replaces the tree sidebar as the
 * main way to move around a course (owner request, 2026-11-03):
 *
 *   [B.Ed ▾] › [Semester 3 ▾] › [EFMP-406 · … ▾] › [Unit 2 · … ▾] › [Topic 2.1 · … ▾]   [All topics]
 *
 * The first segment switches programme (B.Ed degree or teaching licence). The two
 * programmes stay separate trees (ADR-0020); only the switcher joins them.
 */
type Locale = 'en' | 'ur';

const MESSAGES = {
  nav: { en: 'Course navigation', ur: 'کورس نیویگیشن' },
  programme: { en: 'Programme', ur: 'پروگرام' },
  bed: { en: 'B.Ed', ur: 'بی ایڈ' },
  licence: { en: 'Teaching licence', ur: 'تدریسی لائسنس' },
  tree: { en: 'All topics', ur: 'تمام موضوعات' },
  treeShow: { en: 'Show the full topic list', ur: 'موضوعات کی مکمل فہرست دکھائیں' },
  treeHide: { en: 'Hide the full topic list', ur: 'موضوعات کی مکمل فہرست چھپائیں' },
  choose: { en: 'Choose', ur: 'منتخب کریں' },
};

const PROGRAMME_PLUGINS: Record<string, 'bed' | 'licence'> = { default: 'bed', licence: 'licence' };

function Menu({ level, locale, labelPrefix }: { level: NavLevel; locale: Locale; labelPrefix?: string }): React.ReactElement {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  }, []);

  // Outside click and Escape close the menu.
  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  // On open, focus the current option (or the first) so arrow keys start there.
  useEffect(() => {
    if (!open) return;
    const links = listRef.current?.querySelectorAll<HTMLAnchorElement>('a');
    if (!links?.length) return;
    const target = links[Math.max(level.current, 0)] ?? links[0];
    target.focus();
    target.scrollIntoView({ block: 'nearest' });
  }, [open, level.current]);

  const onListKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const links = Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);
    const at = links.indexOf(document.activeElement as HTMLAnchorElement);
    let next = -1;
    if (e.key === 'ArrowDown') next = (at + 1) % links.length;
    else if (e.key === 'ArrowUp') next = (at - 1 + links.length) % links.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = links.length - 1;
    else if (e.key === 'Tab') close(false);
    if (next >= 0) {
      e.preventDefault();
      links[next]?.focus();
    }
  };

  return (
    <div className={styles.segment} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className={clsx(styles.trigger, open && styles.triggerOpen)}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={labelPrefix ? `${labelPrefix}: ${level.label}` : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span className={styles.triggerLabel}>{level.label}</span>
        <span className={styles.caret} aria-hidden="true" />
      </button>
      {open && (
        <>
          <div className={styles.backdrop} aria-hidden="true" onClick={() => close(false)} />
          <ul id={listId} ref={listRef} className={styles.menu} onKeyDown={onListKey} aria-label={level.label || MESSAGES.choose[locale]}>
            {level.options.map((opt: NavOption, i) => (
              <li key={opt.href}>
                <Link
                  to={opt.href}
                  className={clsx(styles.option, i === level.current && styles.optionCurrent, opt.english && styles.optionEnglish)}
                  aria-current={i === level.current ? 'page' : undefined}
                  lang={opt.english && locale === 'ur' ? 'en' : undefined}
                  dir={opt.english && locale === 'ur' ? 'ltr' : undefined}
                  onClick={() => close(false)}
                >
                  {opt.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function CourseNavBar(): React.ReactElement | null {
  const sidebar = useDocsSidebar();
  const breadcrumbs = useSidebarBreadcrumbs();
  const plugin = useActivePlugin();
  const { pathname } = useLocation();
  const { i18n } = useDocusaurusContext();
  const locale: Locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const tree = useTreeState();
  const bedHref = useBaseUrl('/intro');
  const licenceHref = useBaseUrl('/licence/');

  if (!sidebar || !breadcrumbs) return null;
  const levels = buildNavLevels(sidebar.items as SidebarItem[], breadcrumbs as SidebarItem[]);

  const programme = plugin ? PROGRAMME_PLUGINS[plugin.pluginId] : undefined;
  const programmeLevel: NavLevel | null = programme
    ? {
        label: MESSAGES[programme][locale],
        current: programme === 'bed' ? 0 : 1,
        options: [
          { label: MESSAGES.bed[locale], href: bedHref, english: false },
          { label: MESSAGES.licence[locale], href: licenceHref, english: false },
        ],
      }
    : null;

  return (
    <nav className={styles.bar} aria-label={MESSAGES.nav[locale]} data-testid="course-nav-bar">
      <ol className={styles.crumbs}>
        {programmeLevel && (
          <li className={styles.crumb}>
            <Menu level={programmeLevel} locale={locale} labelPrefix={MESSAGES.programme[locale]} />
          </li>
        )}
        {levels.map((level, i) => (
          // pathname in the key closes any open menu when the page changes
          // data-crumb feeds the print title ("subject | unit | topic", src/lib/printPage.ts)
          <li className={styles.crumb} key={`${i}:${pathname}`} data-crumb={level.label}>
            <Menu level={level} locale={locale} />
          </li>
        ))}
      </ol>
      {tree.available && (
        <button
          type="button"
          className={clsx(styles.treeToggle, tree.open && styles.treeToggleOn)}
          aria-pressed={tree.open}
          title={tree.open ? MESSAGES.treeHide[locale] : MESSAGES.treeShow[locale]}
          onClick={tree.toggle}
        >
          <span className={styles.treeIcon} aria-hidden="true" />
          {MESSAGES.tree[locale]}
        </button>
      )}
    </nav>
  );
}
