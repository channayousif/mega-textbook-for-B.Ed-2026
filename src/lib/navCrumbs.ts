/**
 * Breadcrumb-dropdown navigation model (owner request, 2026-11-03).
 *
 * The tree sidebar is replaced by a horizontal bar of dropdowns: one segment per
 * level of the current page's sidebar path (Semester > Course > Unit > Page), each
 * listing that level's siblings. This module is pure (no Docusaurus imports) so it
 * can be unit-tested; CourseNavBar feeds it `useDocsSidebar()` items and
 * `useSidebarBreadcrumbs()`.
 */

/** The subset of Docusaurus' PropSidebarItem this model reads. */
export type SidebarItem = {
  type: 'link' | 'category' | 'html' | string;
  label?: string;
  href?: string;
  className?: string;
  unlisted?: boolean;
  linkUnlisted?: boolean;
  items?: SidebarItem[];
};

export type NavOption = { label: string; href: string; english: boolean };

export type NavLevel = {
  /** Label of the item on the current path at this level. */
  label: string;
  /** Index of that item in `options`, or -1 when it is not navigable. */
  current: number;
  options: NavOption[];
};

/** First navigable href inside an item: its own link, else its first child's. */
export function firstHref(item: SidebarItem): string | undefined {
  if (item.type === 'link') return item.href;
  if (item.type !== 'category') return undefined;
  if (item.href && !item.linkUnlisted) return item.href;
  for (const child of item.items ?? []) {
    const href = firstHref(child);
    if (href) return href;
  }
  return undefined;
}

const isEnglish = (item: SidebarItem) => /(^|\s)sidebar-item--en(\s|$)/.test(item.className ?? '');

function toOptions(items: SidebarItem[]): Array<NavOption & { item: SidebarItem }> {
  const out: Array<NavOption & { item: SidebarItem }> = [];
  for (const item of items) {
    if ((item.type !== 'link' && item.type !== 'category') || item.unlisted) continue;
    const href = firstHref(item);
    if (!href) continue; // an empty category (e.g. a semester with no courses yet)
    out.push({ label: item.label ?? '', href, english: isEnglish(item), item });
  }
  return out;
}

/**
 * One level per breadcrumb. Level 0 lists the sidebar's root items; level i lists
 * the children of breadcrumb i-1. Breadcrumbs are the same object references as the
 * sidebar items, so identity finds the current option; href is the fallback.
 */
export function buildNavLevels(root: SidebarItem[], breadcrumbs: SidebarItem[]): NavLevel[] {
  return breadcrumbs.map((crumb, i) => {
    const siblings = i === 0 ? root : breadcrumbs[i - 1].items ?? [];
    const options = toOptions(siblings);
    let current = options.findIndex((o) => o.item === crumb);
    if (current === -1 && crumb.href) current = options.findIndex((o) => o.href === crumb.href);
    return {
      label: crumb.label ?? '',
      current,
      options: options.map(({ label, href, english }) => ({ label, href, english })),
    };
  });
}
