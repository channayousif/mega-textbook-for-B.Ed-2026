import React from 'react';
import Footer from '@theme-original/Footer';
import type { Props as FooterProps } from '@docusaurus/theme-classic/lib/types';

const FOOTER_LOGOS = [
  { abbr: 'STEDA', name: 'Sindh Teacher Education Development Authority' },
  { abbr: 'HEC', name: 'Higher Education Commission' },
  { abbr: 'UoS', name: 'University of Sindh' },
  { abbr: 'GEC', name: 'Government Elementary Colleges, Sindh' },
  { abbr: 'ADTTI', name: 'Additional Director, Teacher Training Institutions' },
  { abbr: 'DETRC', name: 'District Education Teacher Resource Centres' },
  { abbr: 'REEC', name: 'Regional Education Extension Centres' },
  { abbr: 'PITE', name: 'Provincial Institute of Teacher Education, Sindh' },
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
            <div key={logo.abbr} className="footer-logos__item" title={logo.name}>
              <span className="footer-logos__abbr">{logo.abbr}</span>
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
