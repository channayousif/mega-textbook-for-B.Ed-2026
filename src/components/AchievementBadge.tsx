/**
 * Step-shaped achievement badges from the v2 Graphics board: a teal tile with an amber
 * mark. Decorative; the achievement title beside it carries the meaning. Badges not
 * yet earned are muted, and the page text says how to earn them.
 */
import React from 'react';
import clsx from 'clsx';
import type { AchievementKey } from '@site/src/lib/types';

const A = '#E5A333';
const T = '#123E43';

const MARKS: Record<AchievementKey, React.ReactNode> = {
  // a paper plane: work sent to the teacher
  first_submission: <><path d="M18 40 62 20 50 62l-10-16z" fill={A} /><path d="M40 46 62 20" stroke={T} strokeWidth="3" /></>,
  // a flame: days in a row
  study_streak: <path d="M40 16c4 12 16 16 16 30a16 16 0 0 1-32 0c0-8 5-11 7-18 3 3 5 4 6 8 2-6 3-12 3-20z" fill={A} />,
  // the rising steps: every unit of a course covered
  full_course_coverage: <path d="M20 60V48h14V36h14V24h12v36z" fill={A} />,
  // a tick: class work finished on time
  on_time_class_completion: <path d="M24 41l11 11 21-24" fill="none" stroke={A} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />,
};

export default function AchievementBadge({ id, earned, size = 72 }: { id: AchievementKey; earned: boolean; size?: number }): React.ReactElement {
  return (
    <svg className={clsx('achievement-badge', !earned && 'achievement-badge--locked')} width={size} height={size} viewBox="0 0 80 80" aria-hidden="true" focusable="false">
      <path d="M12 4h56a8 8 0 0 1 8 8v56a8 8 0 0 1-8 8H12a8 8 0 0 1-8-8V12a8 8 0 0 1 8-8z" fill={T} />
      {MARKS[id]}
    </svg>
  );
}
