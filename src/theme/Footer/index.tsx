import React from 'react';
import Footer from '@theme-original/Footer';
import type { Props as FooterProps } from '@docusaurus/theme-classic/lib/types';
import LogoCarousel from '@site/src/components/LogoCarousel';

export default function FooterWrapper(props: FooterProps): React.ReactElement {
  return (
    <>
      <Footer {...props} />
      <LogoCarousel />
    </>
  );
}
