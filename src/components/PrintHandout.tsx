import React from 'react';

/**
 * Client-side A4 handout control (FR-011, SC-009). Opens the browser's native
 * print / "Save as PDF" dialog; the @media print stylesheet in custom.css hides
 * site chrome and paginates the page cleanly at A4. No server-side PDF pipeline.
 */
export default function PrintHandout({
  label = 'Print / Save as PDF',
}: {
  label?: string;
}): React.ReactElement {
  return (
    <button
      type="button"
      className="print-handout print-hidden"
      onClick={() => typeof window !== 'undefined' && window.print()}
    >
      🖨 {label}
    </button>
  );
}
