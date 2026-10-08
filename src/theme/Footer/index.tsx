import React from 'react';
import Footer from '@theme-original/Footer';
import type { Props as FooterProps } from '@docusaurus/theme-classic/lib/types';

import hecLogo from '@site/static/img/logos/hec.png';
import universityOfSindhLogo from '@site/static/img/logos/university-of-sindh.png';
import sindhGovtLogo from '@site/static/img/logos/sindh-govt.png';
import stedaLogo from '@site/static/img/logos/steda.png';
import gecLogo from '@site/static/img/logos/gec-cropped.png';
import gec2Logo from '@site/static/img/logos/gec2.png';
import adttiLogo from '@site/static/img/logos/adtti.png';
import detrcLogo from '@site/static/img/logos/detrc.png';
import reecLogo from '@site/static/img/logos/reec.png';
import piteLogo from '@site/static/img/logos/pite.png';

const FOOTER_LOGOS = [
  { src: hecLogo, alt: 'Higher Education Commission (HEC)' },
  { src: universityOfSindhLogo, alt: 'University of Sindh' },
  { src: sindhGovtLogo, alt: 'Government of Sindh' },
  { src: stedaLogo, alt: 'STEDA' },
  { src: gecLogo, alt: 'Government Elementary College, Sindh' },
  { src: gec2Logo, alt: 'Government Elementary College, Sindh' },
  { src: adttiLogo, alt: 'Additional Director, TTIs' },
  { src: detrcLogo, alt: 'DETRC' },
  { src: reecLogo, alt: 'REEC' },
  { src: piteLogo, alt: 'PITE Sindh' },
];

function FooterLogos(): React.ReactElement {
  return (
    <div className="footer-logos">
      <div className="container padding-vert--md">
        <p className="footer-logos__heading text--center margin-bottom--sm">
          Supported by
        </p>
        <div className="footer-logos__strip">
          {FOOTER_LOGOS.map((logo, index) => (
            <div key={`${logo.alt}-${index}`} className="footer-logos__item" title={logo.alt}>
              <img src={logo.src} alt={logo.alt} className="footer-logos__img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FooterWrapper(props: FooterProps): React.ReactElement {
  return (
    <>
      <FooterLogos />
      <Footer {...props} />
    </>
  );
}
