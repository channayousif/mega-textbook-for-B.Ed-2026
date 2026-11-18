/**
 * Tabs with the ARIA tabs pattern: arrow keys move between tabs, Home and End jump,
 * only the selected tab is in the tab order, and each panel is labelled by its tab.
 */
import React, { useId, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ui.module.css';

export type TabItem = { id: string; label: React.ReactNode; content: React.ReactNode };

export default function Tabs({ items, label, initial }: { items: TabItem[]; label: string; initial?: string }): React.ReactElement {
  const base = useId();
  const [selected, setSelected] = useState(initial ?? items[0]?.id);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (i: number) => {
    const n = (i + items.length) % items.length;
    setSelected(items[n].id);
    refs.current[n]?.focus();
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'ArrowRight') { e.preventDefault(); move(rtl ? i - 1 : i + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); move(rtl ? i + 1 : i - 1); }
    else if (e.key === 'Home') { e.preventDefault(); move(0); }
    else if (e.key === 'End') { e.preventDefault(); move(items.length - 1); }
  };
  return (
    <div className={styles.tabsWrap}>
      <div className={styles.tabList} role="tablist" aria-label={label}>
        {items.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`${base}-tab-${t.id}`}
            aria-controls={`${base}-panel-${t.id}`}
            aria-selected={selected === t.id}
            tabIndex={selected === t.id ? 0 : -1}
            className={clsx(styles.tab, selected === t.id && styles.tabOn)}
            onClick={() => setSelected(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {items.map((t) => (
        <div key={t.id} role="tabpanel" id={`${base}-panel-${t.id}`} aria-labelledby={`${base}-tab-${t.id}`} hidden={selected !== t.id} tabIndex={0} className={styles.tabPanel}>
          {t.content}
        </div>
      ))}
    </div>
  );
}
