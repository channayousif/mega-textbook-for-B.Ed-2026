/**
 * Ejected from @docusaurus/theme-classic 3.10.2 (DocRoot/Layout is not on the
 * safe-swizzle list; re-check this file against upstream on a Docusaurus bump).
 *
 * Change from upstream: the tree sidebar is hidden by default and opened by the
 * "All topics" toggle in CourseNavBar (owner request, 2026-11-03). While it is
 * hidden the sidebar is not rendered at all, so the page uses the full width
 * instead of upstream's 30px collapsed strip.
 */
import React, { type ReactNode } from 'react';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import { TreeStateProvider, useTreeState } from '@site/src/components/CourseNavBar/treeState';
import styles from './styles.module.css';

function LayoutBody({ children }: { children: ReactNode }): React.ReactElement {
  const sidebar = useDocsSidebar();
  const { open, toggle } = useTreeState();
  // Upstream's collapse button calls this with an updater; any call means "toggle".
  const setHidden = () => toggle();
  return (
    <div className={styles.docRoot}>
      {sidebar && open && (
        <DocRootLayoutSidebar sidebar={sidebar.items} hiddenSidebarContainer={false} setHiddenSidebarContainer={setHidden} />
      )}
      <DocRootLayoutMain hiddenSidebarContainer={!open}>{children}</DocRootLayoutMain>
    </div>
  );
}

export default function DocRootLayout({ children }: { children: ReactNode }): React.ReactElement {
  return (
    <div className={styles.docsWrapper}>
      <BackToTopButton />
      <TreeStateProvider>
        <LayoutBody>{children}</LayoutBody>
      </TreeStateProvider>
    </div>
  );
}
