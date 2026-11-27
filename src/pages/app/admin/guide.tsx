import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { PageHeader } from '@site/src/components/ui';
import GuideContent from './_guide-content.mdx';

/**
 * Admin guide (Feature 034 T012, #799). It used to be a public page under /guides; the owner ruled
 * on 2026-11-25 that it is for admins only, so it lives in the console behind OwnerConsoleGuard
 * and /guides/admin-guide/ redirects here. The guard is cosmetic (Art. IX.2): the text holds no
 * secrets, and every console query stays RLS-scoped to is_admin().
 */
export default function AdminGuide(): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const ur = i18n.currentLocale === 'ur';
  return <Layout title={ur ? 'منتظم کی رہنمائی' : 'Admin guide'}>
    <Head><meta name="robots" content="noindex, nofollow" /></Head>
    <AppDashboardShell>
      <OwnerConsoleGuard>
        <div className="app-page-body markdown">
          <PageHeader title={ur ? 'منتظم کی رہنمائی' : 'Admin guide'} icon="reading"
            lead={ur ? 'یہ رہنمائی ابھی صرف انگریزی میں ہے۔' : 'How the admin console works.'} />
          <div dir="ltr" lang="en"><GuideContent /></div>
        </div>
      </OwnerConsoleGuard>
    </AppDashboardShell>
  </Layout>;
}
