import React from 'react';
import { printHandout } from '@site/src/lib/printPage';

/**
 * Client-side A4 handout control (FR-011, SC-009). Opens the browser's native
 * print / "Save as PDF" dialog; the @media print stylesheet in custom.css hides
 * site chrome and paginates the page cleanly at A4. No server-side PDF pipeline.
 * Before opening the dialog it loads every lazy image and adds a QR code beside
 * each link (src/lib/printPage.ts), so the PDF has every figure and scannable links.
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
      aria-label="Print or save this handout as a PDF"
      onClick={() => typeof window !== 'undefined' && void printHandout()}
    >
      <span aria-hidden="true">🖨 </span>
      {label}
    </button>
  );
}
