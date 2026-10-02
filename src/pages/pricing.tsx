import React from 'react';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';

export default function Pricing(): React.ReactElement {
  return (
    <Layout
      title="Pricing"
      description="Pricing for the B.Ed Mega Textbook and Licence Practice Pass">
      <main className="container margin-vert--lg">
        <h1 className="text--center margin-bottom--lg">
          <Translate id="pricing.title">Licence Practice Pass</Translate>
        </h1>
        
        <div className="row">
          <div className="col col--6 col--offset-3">
            <div className="card shadow--md">
              <div className="card__header text--center">
                <h2><Translate id="pricing.passName">Licence Practice Pass</Translate></h2>
                <h3>Rs 1,500 <small><Translate id="pricing.oneTime">One-time payment</Translate></small></h3>
              </div>
              <div className="card__body">
                <ul>
                  <li><Translate id="pricing.feature1">Lifetime access to all B.Ed textbook content (Free)</Translate></li>
                  <li><Translate id="pricing.feature2">5 Licence practice pages (60 CRQs + 5 case-study ERQs with rubrics)</Translate></li>
                  <li><Translate id="pricing.feature3">Timed server-marked mocks</Translate></li>
                </ul>
                <div className="alert alert--info margin-top--md">
                  <strong><Translate id="pricing.activationNoticeTitle">Notice:</Translate></strong>{' '}
                  <Translate id="pricing.activationNotice">
                    Activation is manual and typically takes one working day. Please do not expect instant access.
                  </Translate>
                </div>
                <div className="alert alert--success margin-top--sm">
                  <strong><Translate id="pricing.refundPolicyTitle">7-Day Refund Policy:</Translate></strong>{' '}
                  <Translate id="pricing.refundPolicy">
                    If you are not satisfied, you can request a no-questions-asked refund within 7 days of purchase.
                  </Translate>
                </div>
              </div>
              <div className="card__footer">
                <Link to="/app/purchase" className="button button--primary button--block button--lg">
                  <Translate id="pricing.buyNow">Buy Now</Translate>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
