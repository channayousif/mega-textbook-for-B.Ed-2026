import React from 'react';
import { printWithImages } from '@site/src/lib/printPage';

/**
 * Client-side A4 handout control (FR-011, SC-009). Opens the browser's native
 * print / "Save as PDF" dialog; the @media print stylesheet in custom.css hides
 * site chrome and paginates the page cleanly at A4. No server-side PDF pipeline.
 * It loads every lazy image before opening the dialog (src/lib/printPage.ts), so
 * figures below the fold are in the PDF.
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
      onClick={() => typeof window !== 'undefined' && void printWithImages()}
    >
      <span aria-hidden="true">🖨 </span>
      {label}
    </button>
  );
}
