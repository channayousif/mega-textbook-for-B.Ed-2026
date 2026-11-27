/**
 * The closing panel's art (Feature 034 T017, #804, redesigning the 2026-11-06 climb): a student
 * teacher climbs the page's own four-step ladder (Read, Practise, Check, Apply in your school),
 * using the same icons as the "climb" section above. Each step's badge lights as she reaches it;
 * on the top step she lifts her book. Decorative; the panel's heading carries the meaning. The SVG
 * is mirrored on Urdu pages so she climbs toward the reading start; the badge icons are flipped
 * back so they never read mirrored. Keyframes come from the step geometry (see climb.module.css).
 */
import React from 'react';
import clsx from 'clsx';
import useReveal from '@site/src/lib/useReveal';
import { ICONS, type IconName } from '@site/src/components/icons/paths';
import s from './climb.module.css';

const BLOCK = 'M40 280V266H130V236H240V206H350V176H460V146H560V280Z';
const STEPS = 'M40 266H130V236H240V206H350V176H460V146H560';
/** Badge centre on each step, in climb order, with the ladder's icons. */
const BADGES: readonly { cx: number; cy: number; icon: IconName }[] = [
  { cx: 185, cy: 258, icon: 'explain' },
  { cx: 295, cy: 228, icon: 'activity' },
  { cx: 405, cy: 198, icon: 'check' },
  { cx: 510, cy: 168, icon: 'chalkboard' },
];
const DISC = [s.d1, s.d2, s.d3, s.d4];
const ICO = [s.i1, s.i2, s.i3, s.i4];

export default function ClimbArt({ rtl }: { rtl: boolean }): React.ReactElement {
  const [ref, state] = useReveal<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      className={clsx(s.svg, rtl && s.rtl, state === 'pending' && s.pending, state === 'shown' && s.shown)}
      viewBox="0 0 560 280"
      aria-hidden="true"
      focusable="false"
    >
      <path d={BLOCK} fill="#2F7C80" />
      <path d={STEPS} fill="none" stroke="#ffffff40" strokeWidth="4" />
      <path className={s.trace} d={STEPS} fill="none" stroke="#E5A333" strokeWidth="5" strokeLinejoin="round" />
      {BADGES.map(({ cx, cy, icon }, i) => {
        const [base, accent] = ICONS[icon];
        return (
          <g key={icon} transform={rtl ? `matrix(-1 0 0 1 ${2 * cx} 0)` : undefined}>
            <circle className={clsx(s.disc, DISC[i])} cx={cx} cy={cy} r="13" strokeWidth="2" />
            <g className={clsx(s.ico, ICO[i])} transform={`translate(${cx - 9} ${cy - 9}) scale(.75)`}
              fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d={base} />
              {accent && <path d={accent} />}
            </g>
          </g>
        );
      })}
      <path className={s.star} d="M536 40l3.5 7.5 8 1-6 5.5 1.7 8-7.2-4-7.2 4 1.7-8-6-5.5 8-1z" fill="#E5A333" />
      <g className={s.walker}>
        <rect x="-16" y="-50" width="11" height="24" rx="4" fill="#B97F1F" />
        <g className={s.legB}>
          <path d="M-6 -30 L4 -30 L3 -5 L-4 -5Z" fill="#CFDDD9" />
          <path d="M-5 -5h9a4 4 0 0 1 4 5h-13z" fill="#2A1A12" />
        </g>
        <g className={s.legA}>
          <path d="M-5 -30 L6 -30 L5 -5 L-2 -5Z" fill="#F8F5EF" />
          <path d="M-3 -5h9a4 4 0 0 1 4 5h-13z" fill="#2A1A12" />
        </g>
        <path d="M-9 -53 Q0 -57 9 -53 L12 -21 Q0 -16 -12 -21Z" fill="#E5A333" />
        <path d="M-8 -55 Q1 -51 9 -55 L5 -47 L-11 -24 L-14 -31Z" fill="#F8F5EF" />
        <rect x="-2.5" y="-58" width="6" height="6" fill="#C98B62" />
        <circle cx="1" cy="-63" r="8.5" fill="#C98B62" />
        <path d="M-8.5 -60 a9.5 9.5 0 0 1 16 -9 q-5 3 -9 2 q-1 5 -2 9 q-2 3 -5 -2z" fill="#2A1A12" />
        <circle cx="5" cy="-63" r="1" fill="#2A1A12" />
        <path d="M3.5 -58.8 q1.8 1 3.2 -.2" fill="none" stroke="#7A3F28" strokeWidth=".9" strokeLinecap="round" />
        <g className={s.arm}>
          <path d="M3 -50 L8 -51 L17 -40 L13 -36Z" fill="#C98B62" />
          <rect x="10" y="-47" width="13" height="10" rx="1.5" fill="#fff" stroke="#123E43" strokeWidth="1.5" />
          <path d="M16.5 -47v10" stroke="#123E43" strokeWidth="1.2" />
        </g>
      </g>
    </svg>
  );
}
