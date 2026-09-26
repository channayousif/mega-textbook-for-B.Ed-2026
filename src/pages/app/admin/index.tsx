import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';

const sections = [
  ['users', 'Users and roles', 'صارفین اور کردار', 'Select an account, manage access and suspension.'],
  ['records', 'Classes and learner records', 'کلاسیں اور طلبہ کا ریکارڈ', 'Inspect a selected class, student or teacher.'],
  ['reviewers', 'Reviewer applications', 'جائزہ کار کی درخواستیں', 'Decide applications, grant scopes and revoke access.'],
  ['review-decisions', 'Review decisions', 'جائزے کے فیصلے', 'Read criteria and comments, then record a decision.'],
  ['feedback-queue', 'Reader feedback', 'قارئین کی رائے', 'Triage reader reports.'],
  ['suggestions', 'Improvement suggestions', 'بہتری کی تجاویز', 'Moderate teacher suggestions.'],
  ['overview', 'Content status', 'مواد کی صورتحال', 'Inspect units, figures and progress.'],
  ['agent-jobs', 'Agent jobs and settings', 'ایجنٹ کے کام اور ترتیبات', 'Queue approved improvements and inspect draft PRs.'],
  ['audit', 'Privilege audit', 'اختیارات کا ریکارڈ', 'View role and capability changes.'],
] as const;

export default function AdminHome(): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const ur = i18n.currentLocale === 'ur';
  return <Layout title={ur ? 'منتظم کا ڈیش بورڈ' : 'Admin dashboard'}>
    <OwnerConsoleGuard>
      <main className="container auth-page margin-vert--lg" dir={ur ? 'rtl' : 'ltr'}>
        <h1>{ur ? 'منتظم کا ڈیش بورڈ' : 'Admin dashboard'}</h1>
        <p>{ur ? 'کام شروع کرنے کے لیے ایک حصہ منتخب کریں۔' : 'Choose the record or workflow you need.'}</p>
        <div className="work-grid">
          {sections.map(([path, en, urLabel, description]) => <Link className="work-card" key={path} to={`/app/admin/${path}`}>
            <strong>{ur ? urLabel : en}</strong><span>{ur ? urLabel : description}</span>
          </Link>)}
        </div>
      </main>
    </OwnerConsoleGuard>
  </Layout>;
}
