/**
 * The rising stepped edge under a teal band: five steps with an amber line along
 * the treads, drawn in the colour of the section below. Mirrored on Urdu pages so the
 * steps rise toward the reading start. Decorative. Without `fill` the steps take the
 * page ground colour, so they follow light and dark mode.
 */
import React from 'react';
import clsx from 'clsx';
import s from './landing.module.css';

type Props = { fill?: string; rtl: boolean; height?: number; steps?: number; className?: string };

export default function StepsEdge({ fill, rtl, height = 180, steps = 5, className }: Props): React.ReactElement {
  const w = 1440;
  const sx = w / steps;
  const sy = height / steps;
  let line = `M0 ${height - sy}`;
  for (let i = 0; i < steps; i += 1) {
    line += `H${(i + 1) * sx}`;
    if (i < steps - 1) line += `V${height - (i + 2) * sy}`;
  }
  return (
    <svg
      className={clsx(s.edge, rtl && s.mirror, className)}
      viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio="none"
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <path className={fill ? undefined : s.edgeFill} fill={fill} d={`${line}V${height}H0Z`} />
      <path fill="none" stroke="#E5A333" strokeWidth="4" vectorEffect="non-scaling-stroke" d={line} />
    </svg>
  );
}
