/**
 * Language switch (owner choice 2026-11-08): a segmented EN | اردو toggle with the
 * current language filled teal. The site has exactly two locales, so both are always
 * visible and one tap switches; the other segment links to the same page in the other
 * language. Replaces the stock locale dropdown on desktop and the text pill on phones.
 *
 * The current language is a span with aria-current, not a link, so keyboard and screen
 * reader users meet one actionable control. Each segment carries its own lang so "اردو"
 * is read in Urdu and "EN" is announced as "English".
 */
import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import styles from './LanguageToggle.module.css';

const SHORT: Record<string, string> = { en: 'EN', ur: 'اردو' };
const GROUP_LABEL: Record<string, string> = { en: 'Language', ur: 'زبان' };

export default function LanguageToggle({ compact = false, className }: { compact?: boolean; className?: string }): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const alternate = useAlternatePageUtils();
  const current = i18n.currentLocale;
  return (
    <div className={clsx(styles.toggle, compact && styles.compact, className)} role="group" aria-label={GROUP_LABEL[current] ?? 'Language'}>
      {i18n.locales.map((code) => {
        const label = SHORT[code] ?? i18n.localeConfigs[code].label;
        const full = i18n.localeConfigs[code].label;
        if (code === current) {
          return (
            <span key={code} className={clsx(styles.seg, styles.on)} lang={code} aria-current="true" aria-label={full}>
              {label}
            </span>
          );
        }
        return (
          <a
            key={code}
            className={styles.seg}
            href={alternate.createUrl({ locale: code, fullyQualified: false })}
            lang={code}
            hrefLang={code}
            aria-label={code === 'en' ? 'Read in English' : 'اردو میں پڑھیں'}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}
