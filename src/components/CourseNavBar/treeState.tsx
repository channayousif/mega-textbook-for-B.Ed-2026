import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

/**
 * Whether the old tree sidebar is open (owner ruling, 2026-11-03: hidden by
 * default, a toggle opens it). The choice persists in localStorage. The server
 * render and first client render use the default (closed) so hydration matches;
 * a stored "open" is applied right after mount.
 */
const KEY = 'nav.tree.open';

type TreeState = { open: boolean; toggle: () => void; available: boolean };

const TreeContext = createContext<TreeState>({ open: false, toggle: () => {}, available: false });

export function TreeStateProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(KEY) === '1') setOpen(true);
    } catch {
      /* storage blocked: keep the default */
    }
  }, []);

  const toggle = useCallback(() => {
    setOpen((was) => {
      const next = !was;
      try {
        window.localStorage.setItem(KEY, next ? '1' : '0');
      } catch {
        /* storage blocked: the toggle still works for this page view */
      }
      return next;
    });
  }, []);

  return <TreeContext.Provider value={{ open, toggle, available: true }}>{children}</TreeContext.Provider>;
}

export const useTreeState = (): TreeState => useContext(TreeContext);
