/**
 * Frame for the sign-in, sign-up, reset and feedback-confirmation pages (redesign v2):
 * a teal art panel with the bilingual logo, a classroom scene and the tagline beside
 * the form on wide screens; the form alone on phones. The form keeps its own
 * `main.auth-page` markup, so tests, labels and focus order are unchanged. The art is
 * decorative.
 */
import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = { width?: number; dir?: 'ltr' | 'rtl'; children: React.ReactNode };

export default function AuthFrame({ width = 420, dir, children }: Props): React.ReactElement {
  const logo = useBaseUrl('/img/brand/bilingual-reverse.svg');
  const scene = useBaseUrl('/img/site/hero-efmp-302-fig-U1-10.webp');
  return (
    <div className="auth-frame">
      <aside className="auth-frame__art" aria-hidden="true">
        <img className="auth-frame__logo" src={logo} alt="" width={960} height={240} />
        <img className="auth-frame__scene" src={scene} alt="" width={1100} height={614} loading="lazy" decoding="async" />
        <p className="auth-frame__tagline" lang="ur" dir="rtl">علم سے عمل تک</p>
      </aside>
      <main className="container auth-page auth-frame__form margin-vert--lg" dir={dir}>
        <div style={{ maxWidth: width, marginInline: 'auto' }}>{children}</div>
      </main>
    </div>
  );
}
