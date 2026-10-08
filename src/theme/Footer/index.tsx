import React from 'react';
import Footer from '@theme-original/Footer';
import type { Props as FooterProps } from '@docusaurus/theme-classic/lib/types';

import hecLogo from '@site/static/img/logos/hec.png';
import universityOfSindhLogo from '@site/static/img/logos/university-of-sindh.png';
import sindhGovtLogo from '@site/static/img/logos/sindh-govt.png';
import stedaLogo from '@site/static/img/logos/steda.svg';
import gecLogo from '@site/static/img/logos/gec.svg';
import adttiLogo from '@site/static/img/logos/adtti.svg';
import detrcLogo from '@site/static/img/logos/detrc.svg';
import reecLogo from '@site/static/img/logos/reec.svg';
import piteLogo from '@site/static/img/logos/pite.svg';

const FOOTER_LOGOS = [
  { src: hecLogo, alt: 'Higher Education Commission (HEC)' },
  { src: universityOfSindhLogo, alt: 'University of Sindh' },
  { src: sindhGovtLogo, alt: 'Government of Sindh' },
  { src: stedaLogo, alt: 'STEDA' },
  { src: gecLogo, alt: 'Government Elementary Colleges, Sindh' },
  { src: adttiLogo, alt: 'Additional Director, TTIs' },
  { src: detrcLogo, alt: 'DETRCs' },
  { src: reecLogo, alt: 'REECs' },
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
          {FOOTER_LOGOS.map((logo) => (
            <div key={logo.alt} className="footer-logos__item" title={logo.alt}>
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
