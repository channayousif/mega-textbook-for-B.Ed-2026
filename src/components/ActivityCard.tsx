import React from 'react';

/** Presentational wrapper for a classroom activity (FR-007 Activities section). */
export default function ActivityCard({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="activity-card">
      <h3 className="activity-card__title">{title}</h3>
      <div className="activity-card__body">{children}</div>
    </div>
  );
}
