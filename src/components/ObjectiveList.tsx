import React from 'react';

/** Renders a unit's student learning objectives (SLOs) as a list. */
export default function ObjectiveList({
  objectives,
}: {
  objectives: string[];
}): React.ReactElement {
  return (
    <ul className="objective-list">
      {objectives.map((o, i) => (
        <li key={i}>{o}</li>
      ))}
    </ul>
  );
}
