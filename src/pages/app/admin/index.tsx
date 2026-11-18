import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { PageHeader } from '@site/src/components/ui';
import Icon, { type IconName } from '@site/src/components/icons/Icon';

const sections = [
  ['users', 'Users and roles', 'صارفین اور کردار', 'Select an account, manage access and suspension.'],
  ['records', 'Classes and learner records', 'کلاسیں اور طلبہ کا ریکارڈ', 'Inspect a selected class, student or teacher.'],
  ['reviewers', 'Reviewer applications', 'جائزہ کار کی درخواستیں', 'Decide applications, grant scopes and revoke access.'],
  ['g3-signoff', 'G3 sign-off desk', 'جی تھری منظوری ڈیسک', 'See every unit awaiting G3 and record sign-offs, one by one or in batches.'],
  ['review-decisions','Review decisions', 'جائزے کے فیصلے', 'Read criteria and comments, then record a decision.'],
  ['feedback-queue', 'Reader feedback', 'قارئین کی رائے', 'Triage reader reports.'],
  ['suggestions', 'Improvement suggestions', 'بہتری کی تجاویز', 'Moderate teacher suggestions.'],
  ['news', 'News and announcements', 'خبریں اور اعلانات', 'Write ticker news and offers; preview the weekly email.'],
  ['overview', 'Content status', 'مواد کی صورتحال', 'Inspect units, figures and progress.'],
  ['agent-jobs', 'Agent jobs and settings', 'ایجنٹ کے کام اور ترتیبات', 'Queue approved improvements and inspect draft PRs.'],
  ['audit', 'Privilege audit', 'اختیارات کا ریکارڈ', 'View role and capability changes.'],
] as const;

const HUB_ICONS: Record<(typeof sections)[number][0], IconName> = {
  users: 'users', records: 'records', reviewers: 'shield', 'g3-signoff': 'signoff', 'review-decisions': 'review',
  'feedback-queue': 'feedback', suggestions: 'suggest', news: 'megaphone', overview: 'analytics', 'agent-jobs': 'jobs', audit: 'audit',
};

export default function AdminHome(): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const ur = i18n.currentLocale === 'ur';
  return <Layout title={ur ? 'منتظم کا ڈیش بورڈ' : 'Admin dashboard'}>
      <AppDashboardShell>
    <OwnerConsoleGuard>
      <div className="app-page-body" dir={ur ? 'rtl' : 'ltr'}>
        <PageHeader title={ur ? 'منتظم کا ڈیش بورڈ' : 'Admin dashboard'} icon="overview"
          lead={ur ? 'کام شروع کرنے کے لیے ایک حصہ منتخب کریں۔' : 'Choose the record or workflow you need.'} />
        <div className="work-grid">
          {sections.map(([path, en, urLabel, description]) => <Link className="work-card hub-card" key={path} to={`/app/admin/${path}`}>
            <span className="hub-card__icon" aria-hidden="true"><Icon name={HUB_ICONS[path]} size={24} accent={false} /></span>
            <strong>{ur ? urLabel : en}</strong><span>{ur ? urLabel : description}</span>
          </Link>)}
        </div>
      </div>
    </OwnerConsoleGuard>
  </AppDashboardShell>
    </Layout>;
}
