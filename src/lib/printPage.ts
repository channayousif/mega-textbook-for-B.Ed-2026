/**
 * Print / "Save as PDF" with every image present.
 *
 * Figures use `loading="lazy"`, so anything below the fold, and the light copy a
 * dark-mode reader never saw, has not been fetched when the print snapshot is
 * taken: the PDF showed empty figure boxes. Switching to eager inside
 * `beforeprint` is not enough, because the browser takes the snapshot without
 * waiting for those fetches. So the print paths we control (the PrintHandout
 * button and Ctrl/Cmd+P) load the images first and only then open the dialog.
 */

const IMAGE_TIMEOUT_MS = 10000;

/** Starts fetching every lazy image on the page; resolves when all have loaded or failed. */
export function loadImagesForPrint(timeoutMs = IMAGE_TIMEOUT_MS): Promise<void> {
  const pending = Array.from(document.images)
    .map((img) => {
      if (img.loading === 'lazy') img.loading = 'eager';
      if (img.complete) return null;
      return new Promise<void>((resolve) => {
        img.addEventListener('load', () => resolve(), { once: true });
        img.addEventListener('error', () => resolve(), { once: true });
      });
    })
    .filter((p): p is Promise<void> => p !== null);
  if (!pending.length) return Promise.resolve();
  // A slow or stalled image must not block printing forever.
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, timeoutMs));
  return Promise.race([Promise.all(pending).then(() => undefined), timeout]);
}

/** Loads every image, then opens the browser's print dialog. */
export async function printWithImages(): Promise<void> {
  await loadImagesForPrint();
  window.print();
}
