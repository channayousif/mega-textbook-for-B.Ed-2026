import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import registry from '@site/catalog/licence-objectives.json';

/**
 * Feature 024: the objective list on a licence heading's index page.
 *
 * Rendered from `catalog/licence-objectives.json`, the same registry
 * `check-licence.mjs` enforces, so the list can never drift from the syllabus.
 * An objective links only once its page exists in the licence docs instance;
 * until then it shows as "in preparation" rather than a dead link.
 */
type Objective = { id: string; heading: string; group: string; slug: string; steda_objective: string };
type Heading = { id: string; dir: string };

const PENDING = { en: 'in preparation', ur: 'زیرِ تیاری' };

export default function LicenceObjectives({ heading }: { heading: string }): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const docs = useAllDocsData().licence?.versions[0]?.docs ?? [];
  const h = (registry.headings as Heading[]).find((x) => x.id === heading);
  const rows = (registry.objectives as Objective[]).filter((o) => o.heading === heading);
  const groups = [...new Set(rows.map((o) => o.group))];

  return (
    <>
      {groups.map((g) => (
        <section key={g}>
          {groups.length > 1 && <h3>{g}</h3>}
          <ol className="licence-objectives">
            {rows.filter((o) => o.group === g).map((o) => {
              const id = `pedagogy/${h?.dir}/${o.slug}`;
              const doc = docs.find((d) => d.id === id);
              return (
                <li key={o.id} value={Number(o.id.slice(1))}>
                  <span className="licence-objectives__id">{o.id}</span>{' '}
                  {doc ? <Link to={doc.path}>{o.steda_objective}</Link> : <>{o.steda_objective} <em>({PENDING[locale]})</em></>}
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </>
  );
}
