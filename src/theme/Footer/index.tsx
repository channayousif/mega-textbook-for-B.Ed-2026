import React from 'react';
import Footer from '@theme-original/Footer';
import type { Props as FooterProps } from '@docusaurus/theme-classic/lib/types';
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import LogoCarousel from '@site/src/components/LogoCarousel';

/** The partner logo carousel closes the landing page only (owner ruling, 2026-11-04). */
export default function FooterWrapper(props: FooterProps): React.ReactElement {
  const { pathname } = useLocation();
  const home = useBaseUrl('/');
  return (
    <>
      <Footer {...props} />
      {pathname === home && <LogoCarousel />}
    </>
  );
}
