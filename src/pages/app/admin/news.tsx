import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { PageHeader, Panel, FormField, StatusPill, EmptyState, type Tone } from '@site/src/components/ui';
import Icon, { type IconName } from '@site/src/components/icons/Icon';
import { NewsPreview } from '@site/src/components/NewsTicker';
import {
  DEFAULT_ICON, NEWS_ICONS, archiveNewsItem, callDigest, fetchAllNews, fetchDigestRuns, mergeNews, newsStatus,
  saveNewsItem, type NewsInput, type NewsStatus,
} from '@site/src/lib/news';
import type { DigestRun, NewsEvent, NewsItem, NewsKind } from '@site/src/lib/types';

/**
 * Feature 028: the admin console for the news ticker and the weekly email.
 * Writes go through upsert_news_item/archive_news_item (migration 0052), which
 * check is_admin() and write admin_action_history; this page is convenience only.
 */

const KINDS: { value: NewsKind; label: string }[] = [
  { value: 'news', label: 'News' },
  { value: 'offer', label: 'Offer' },
  { value: 'update', label: 'Platform update' },
  { value: 'event', label: 'Event' },
  { value: 'alert', label: 'Notice or alert' },
];

const STATUS_TONE: Record<NewsStatus, Tone> = {
  live: 'success', scheduled: 'pending', draft: 'neutral', expired: 'warning', archived: 'neutral',
};

const EMPTY: NewsInput = {
  id: null, kind: 'news', title_en: '', title_ur: '', link_url: '', icon: 'megaphone',
  pinned: false, published: true, starts_at: null, ends_at: null,
};

/** ISO timestamp to the value a datetime-local input expects, in the browser's zone. */
function toLocalInput(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
const fromLocalInput = (v: string): string | null => (v ? new Date(v).toISOString() : null);

function validate(f: NewsInput): string | null {
  if (f.title_en.trim().length < 3 || f.title_en.trim().length > 160) return 'The English title needs 3 to 160 characters.';
  if (f.title_ur.trim() && (f.title_ur.trim().length < 3 || f.title_ur.trim().length > 160)) return 'The Urdu title needs 3 to 160 characters, or leave it empty.';
  if (f.link_url.trim() && !/^(\/\S*|https:\/\/\S+)$/.test(f.link_url.trim())) return 'Links must start with / (a page on this site) or https://.';
  if (f.starts_at && f.ends_at && Date.parse(f.ends_at) <= Date.parse(f.starts_at)) return 'The end time must be after the start time.';
  return null;
}

function NewsConsole(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const autoFeed = (siteConfig.customFields as { newsFeed?: NewsEvent[] }).newsFeed ?? [];
  const [items, setItems] = useState<NewsItem[]>([]);
  const [runs, setRuns] = useState<DigestRun[]>([]);
  const [form, setForm] = useState<NewsInput>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const load = useCallback(async () => {
    const [news, digest] = await Promise.all([fetchAllNews(), fetchDigestRuns()]);
    if (news.error) setError(news.error.message); else setItems(news.data ?? []);
    if (!digest.error) setRuns(digest.data ?? []);
  }, []);
  useEffect(() => { void load(); }, [load]);

  const set = <K extends keyof NewsInput>(key: K, value: NewsInput[K]) => setForm((f) => ({ ...f, [key]: value }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const problem = validate(form);
    if (problem) { setError(problem); return; }
    setBusy(true); setError(''); setNotice('');
    const { error: err } = await saveNewsItem(form);
    setBusy(false);
    if (err) { setError(err.message); return; }
    setNotice(form.id ? 'Item updated.' : 'Item created.');
    setForm(EMPTY);
    await load();
  }

  async function archive(id: string) {
    if (!window.confirm('Archive this item? It leaves the ticker and cannot be edited afterwards.')) return;
    setBusy(true); setError(''); setNotice('');
    const { error: err } = await archiveNewsItem(id);
    setBusy(false);
    if (err) setError(err.message); else { setNotice('Item archived.'); if (form.id === id) setForm(EMPTY); await load(); }
  }

  async function digest(mode: 'preview' | 'test') {
    setBusy(true); setError(''); setNotice('');
    const { data, error: err } = await callDigest(mode);
    setBusy(false);
    if (err) { setError(`Weekly email: ${err.message}`); return; }
    if (mode === 'preview') {
      if (data?.html) setPreviewHtml(data.html); else setNotice('Nothing new this week, so no email would be sent.');
    } else {
      setNotice(data?.sent ? 'Test email sent to your address.' : 'Nothing new this week, so no test was sent.');
    }
  }

  const edit = (n: NewsItem) => {
    setForm({
      id: n.id, kind: n.kind, title_en: n.title_en, title_ur: n.title_ur ?? '', link_url: n.link_url ?? '', icon: n.icon,
      pinned: n.pinned, published: n.published, starts_at: n.starts_at, ends_at: n.ends_at,
    });
    setError(''); setNotice('');
    document.getElementById('news-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const preview = useMemo(() => {
    const now = new Date().toISOString();
    const draft: NewsItem = {
      id: 'preview', kind: form.kind, title_en: form.title_en || 'Your headline appears here', title_ur: form.title_ur || null,
      link_url: form.link_url || null, icon: form.icon, pinned: form.pinned, published: true,
      starts_at: form.starts_at ?? now, ends_at: null, created_by: null, created_at: now, updated_at: now, archived_at: null,
    };
    return { en: mergeNews([draft], [], 'en')[0], ur: mergeNews([draft], [], 'ur')[0] };
  }, [form]);

  const visible = items.filter((n) => showArchived || !n.archived_at);

  return (
    <div className="app-page-body">
      <p><Link to="/app/admin/">Admin dashboard</Link></p>
      <PageHeader title="News and announcements" icon="megaphone"
        lead="Write news, offers and notices for the ticker on the landing page and dashboards. New content is announced automatically." />
      {error && <div className="alert alert--danger margin-bottom--md" role="alert">{error}</div>}
      {notice && <div className="alert alert--success margin-bottom--md" role="status">{notice}</div>}

      <Panel id="news-form" title={form.id ? 'Edit item' : 'New item'}
        actions={form.id ? <button type="button" className="button button--sm button--secondary" onClick={() => setForm(EMPTY)}>Cancel edit</button> : undefined}>
        <form className="work-form" onSubmit={(e) => void save(e)}>
          <FormField label="Kind" hint="Choosing a kind also picks its usual icon.">
            <select className="input" value={form.kind}
              onChange={(e) => { const k = e.target.value as NewsKind; setForm((f) => ({ ...f, kind: k, icon: DEFAULT_ICON[k] })); }}>
              {KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
            </select>
          </FormField>
          <fieldset className="news-icon-picker">
            <legend>Icon</legend>
            <div role="radiogroup" aria-label="Icon" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {NEWS_ICONS.map((name) => (
                <label key={name} title={name}
                  style={{ display: 'inline-grid', placeItems: 'center', width: 44, height: 44, borderRadius: 10, cursor: 'pointer',
                    border: `2px solid ${form.icon === name ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-300)'}` }}>
                  <input type="radio" name="news-icon" value={name} checked={form.icon === name} onChange={() => set('icon', name)}
                    className="sr-only" style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }} />
                  <Icon name={name as IconName} size={22} label={name} />
                </label>
              ))}
            </div>
          </fieldset>
          <FormField label="Headline (English)" hint="One short line, 3 to 160 characters.">
            <input className="input" value={form.title_en} maxLength={160} required onChange={(e) => set('title_en', e.target.value)} />
          </FormField>
          <FormField label="Headline (Urdu)" hint="Optional. Urdu pages show the English headline when this is empty.">
            <input className="input" dir="rtl" lang="ur" value={form.title_ur} maxLength={160} onChange={(e) => set('title_ur', e.target.value)} />
          </FormField>
          <FormField label="Link" hint="Optional. A page on this site (/semester-1/...) or a full https:// address.">
            <input className="input" value={form.link_url} onChange={(e) => set('link_url', e.target.value)} placeholder="/semester-1/efmp-301/" />
          </FormField>
          <FormField label="Show from" hint="Leave empty to show it as soon as it is published.">
            <input className="input" type="datetime-local" value={toLocalInput(form.starts_at)} onChange={(e) => set('starts_at', fromLocalInput(e.target.value))} />
          </FormField>
          <FormField label="Show until" hint="Optional. Leave empty to keep it until you archive it.">
            <input className="input" type="datetime-local" value={toLocalInput(form.ends_at)} onChange={(e) => set('ends_at', fromLocalInput(e.target.value))} />
          </FormField>
          <label><input type="checkbox" checked={form.pinned} onChange={(e) => set('pinned', e.target.checked)} /> Pin to the front of the ticker</label>
          <label><input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} /> Published (untick to keep it as a draft)</label>
          <div>
            <p className="margin-bottom--sm"><strong>Preview</strong></p>
            <NewsPreview item={preview.en} />
            <NewsPreview item={preview.ur} rtl />
          </div>
          <button className="button button--primary" type="submit" disabled={busy}>{form.id ? 'Save changes' : 'Create item'}</button>
        </form>
      </Panel>

      <Panel title="Items" subtitle="Live items show to every visitor; scheduled ones start on their own."
        actions={<label><input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} /> Show archived</label>}>
        {visible.length === 0 ? <EmptyState title="No items yet" icon="megaphone">Create one above. Automatic content posts appear below either way.</EmptyState> : (
          <ul className="clean-list">
            {visible.map((n) => {
              const st = newsStatus(n);
              return (
                <li key={n.id} className="work-panel" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Icon name={n.icon as IconName} size={22} />
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <strong>{n.title_en}</strong>{n.pinned && ' (pinned)'}
                    {n.title_ur && <div dir="rtl" lang="ur">{n.title_ur}</div>}
                    <div><small>{KINDS.find((k) => k.value === n.kind)?.label} | from {new Date(n.starts_at).toLocaleString()}{n.ends_at ? ` until ${new Date(n.ends_at).toLocaleString()}` : ''}</small></div>
                  </div>
                  <StatusPill tone={STATUS_TONE[st]}>{st[0].toUpperCase() + st.slice(1)}</StatusPill>
                  {!n.archived_at && <>
                    <button type="button" className="button button--sm button--secondary" onClick={() => edit(n)}>Edit</button>
                    <button type="button" className="button button--sm button--outline button--danger" disabled={busy} onClick={() => void archive(n.id)}>Archive</button>
                  </>}
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <Panel title="Automatic posts" subtitle="Built from the content on each deploy: new courses, units, Urdu translations and certified reviews. Read only.">
        {autoFeed.length === 0 ? <p>No content changes in the last 60 days.</p> : (
          <ul>
            {autoFeed.map((e) => (
              <li key={e.id}>
                <Link to={e.permalink}>{e.type === 'course' ? e.title_en : `${e.course_code} Unit ${e.unit_no}: ${e.title_en}`}</Link>
                {' '}<small>({e.type === 'review' ? `${e.gate} review certified` : { course: 'new course', unit: 'new unit', urdu: 'Urdu added' }[e.type]}, {new Date(e.date).toLocaleDateString()})</small>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Weekly email" subtitle="Sent to registered users on Sundays at 10:00 (Pakistan time), only in weeks with new content. Users can unsubscribe from any email or their profile."
        actions={<>
          <button type="button" className="button button--sm button--secondary" disabled={busy} onClick={() => void digest('preview')}>Preview this week</button>{' '}
          <button type="button" className="button button--sm button--primary" disabled={busy} onClick={() => void digest('test')}>Send test to me</button>
        </>}>
        {previewHtml && (
          <iframe title="Weekly email preview" srcDoc={previewHtml} sandbox=""
            style={{ width: '100%', height: 640, border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 12, background: '#fff' }} />
        )}
        <h3 className="margin-top--md">Recent sends</h3>
        {runs.length === 0 ? <p>No weekly email has run yet.</p> : (
          <table>
            <thead><tr><th>Week</th><th>Status</th><th>Items</th><th>Sent</th><th>Failed</th><th>Finished</th></tr></thead>
            <tbody>
              {runs.map((r) => (
                <tr key={r.iso_week}>
                  <td>{r.iso_week}</td><td>{r.status}{r.error ? `: ${r.error}` : ''}</td><td>{r.items}</td>
                  <td>{r.sent} / {r.recipients}</td><td>{r.failed}</td><td>{r.finished_at ? new Date(r.finished_at).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </div>
  );
}

export default function AdminNewsPage(): React.ReactElement {
  return (
    <Layout title="News and announcements">
      <AppDashboardShell><OwnerConsoleGuard><NewsConsole /></OwnerConsoleGuard></AppDashboardShell>
    </Layout>
  );
}
