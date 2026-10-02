import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import AuthGuard from '@site/src/components/AuthGuard';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useQueryParam } from '@site/src/contexts/ClassContext';
import { supabase } from '@site/src/lib/supabase';
// Need MDX component or just render markdown
import Markdown from 'react-markdown';

export default function LicencePracticePage(): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ur' ? 'ur' : 'en';
  const unit = useQueryParam('unit');
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!unit) {
      setLoading(false);
      return;
    }
    async function load() {
      setLoading(true);
      const id = `pedagogy/${unit}`;
      const { data, error: err } = await supabase
        .from('paid_pages')
        .select('content')
        .eq('id', id)
        .eq('locale', locale)
        .single();
      
      if (err) {
        if (err.code === 'PGRST116') {
          // No rows returned, which means no entitlement or page not found
          setError('Access denied or page not found. If you purchased this pass, please ensure your claim is verified.');
        } else {
          setError(err.message);
        }
      } else if (data) {
        setContent(data.content);
      }
      setLoading(false);
    }
    load();
  }, [unit, locale]);

  return (
    <Layout title="Licence Practice">
      <AuthGuard>
        <main className="container margin-vert--lg">
          {!unit ? (
            <div>
              <h1>Licence Practice Pass</h1>
              <ul>
                <li><a href="?unit=a-methods-and-foundations">A. Methods of Teaching and Foundations of Education</a></li>
                <li><a href="?unit=b-child-dev-and-ed-psych">B. Child Development and Educational Psychology</a></li>
                <li><a href="?unit=c-classroom-management">C. Classroom Management</a></li>
                <li><a href="?unit=d-assessment-and-test-dev">D. Assessment and Test Development</a></li>
                <li><a href="?unit=e-school-community-teacher">E. School, Community and Teacher</a></li>
              </ul>
            </div>
          ) : loading ? (
            <p>Loading...</p>
          ) : error ? (
            <div className="alert alert--danger">
              {error}
              <br/><br/>
              <a href="/pricing" className="button button--secondary">View Pricing</a>
              {' '}
              <a href="/app/support" className="button button--link">I paid but cannot access</a>
            </div>
          ) : (
            <div className="markdown">
              <Markdown>{content || ''}</Markdown>
            </div>
          )}
        </main>
      </AuthGuard>
    </Layout>
  );
}
