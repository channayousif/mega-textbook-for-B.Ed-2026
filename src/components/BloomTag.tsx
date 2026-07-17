import React from 'react';

/**
 * Bloom's-level tag for assessment items (Constitution III.3). Per-item Bloom
 * validation is owned by the content pipeline (Spec 006); this component only
 * renders the tag.
 */
const LEVELS = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'] as const;

export default function BloomTag({
  level,
}: {
  level: (typeof LEVELS)[number];
}): React.ReactElement {
  return <span className={`bloom-tag bloom-tag--${level.toLowerCase()}`}>{level}</span>;
}
