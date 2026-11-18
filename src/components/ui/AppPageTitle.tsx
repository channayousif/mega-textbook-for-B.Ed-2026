/** Page header for app pages whose content has no title of its own: picks the locale. */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PageHeader from './PageHeader';
import type { IconName } from '@site/src/components/icons/Icon';

export default function AppPageTitle({ en, ur, icon, lead }: { en: string; ur: string; icon?: IconName; lead?: { en: string; ur: string } }): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const urdu = i18n.currentLocale === 'ur';
  return <PageHeader title={urdu ? ur : en} icon={icon} lead={lead ? (urdu ? lead.ur : lead.en) : undefined} />;
}
