/**
 * One icon from the textbook.com.pk pack. Decorative by default (aria-hidden):
 * the text beside it carries the meaning. Pass `label` only when the icon stands
 * alone, and it becomes an image with that name.
 *
 * The base stroke follows currentColor. The accent stroke is amber, the logo's
 * signature; set `--icon-accent` on a parent to change it, or `accent={false}` to
 * draw the whole icon in currentColor (dense tables, small sizes).
 */
import React from 'react';
import clsx from 'clsx';
import { ICONS, FLIPS_IN_RTL, type IconName } from './paths';
import styles from './styles.module.css';

export type { IconName } from './paths';

type Props = {
  name: IconName;
  size?: number;
  accent?: boolean;
  label?: string;
  className?: string;
};

export default function Icon({ name, size = 24, accent = true, label, className }: Props): React.ReactElement {
  const [base, extra] = ICONS[name];
  return (
    <svg
      className={clsx(styles.icon, FLIPS_IN_RTL.has(name) && styles.flip, className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      <path d={base} />
      {extra && <path d={extra} className={accent ? styles.accent : undefined} />}
    </svg>
  );
}
