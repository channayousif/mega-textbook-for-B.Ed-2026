/**
 * Reveal on scroll (redesign motion set). Returns a ref and a state for
 * `data-reveal`: content is fully visible in server HTML and without JavaScript,
 * only marked "pending" after mount when it is still below the fold, then "shown"
 * once it enters the viewport. Reduced motion and missing IntersectionObserver
 * skip straight to "shown". With `once` (the default) it never hides again.
 *
 * CSS pairs with it in tokens.css: [data-reveal='pending'] is hidden and moved,
 * [data-reveal='shown'] transitions in using the --motion-* tokens.
 */
import { useEffect, useRef, useState } from 'react';

export type RevealState = 'static' | 'pending' | 'shown';

export default function useReveal<T extends Element>(options: { once?: boolean; rootMargin?: string } = {}) {
  const { once = true, rootMargin = '0px 0px -10% 0px' } = options;
  const ref = useRef<T | null>(null);
  const [state, setState] = useState<RevealState>('static');

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setState('shown');
      return undefined;
    }
    // Already on screen at mount: show without a jump.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setState('shown');
      if (once) return undefined;
    } else {
      setState('pending');
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setState('shown');
          if (once) io.disconnect();
        } else if (!once) {
          setState('pending');
        }
      }
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin]);

  return [ref, state] as const;
}
