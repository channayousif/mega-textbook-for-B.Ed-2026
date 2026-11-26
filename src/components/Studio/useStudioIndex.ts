import { useEffect, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/** The build-time Study Studio index (static/studio-index.json), fetched once per page load and shared. */
const cache = new Map<string, Promise<Record<string, unknown>>>();

export function useStudioIndex(): Record<string, unknown> | null {
  const url = useBaseUrl('/studio-index.json');
  const [index, setIndex] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    let live = true;
    let p = cache.get(url);
    if (!p) {
      p = fetch(url).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
      cache.set(url, p);
    }
    p.then((d) => { if (live) setIndex(d); });
    return () => { live = false; };
  }, [url]);
  return index;
}
