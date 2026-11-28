import { describe, test, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { KINDS, PATH, nextState } from '../../scripts/media/states.mjs';
import { playlistFor, PLAYLISTS } from '../../scripts/media/brand.mjs';

// Feature 038 Stage 1 (ADR-0040): pack kinds in the manifest, media states and playlist map, and the
// shape of migration 0060 (the live RLS behaviour is covered by tests/rls/content-packs.test.mjs).
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(JSON.parse(readFileSync(join(ROOT, 'specs/studio/studio-manifest.schema.json'), 'utf8')));
const validateJob = ajv.compile(JSON.parse(readFileSync(join(ROOT, 'specs/studio/media-job.schema.json'), 'utf8')));
const REVIEW = { by: 'curriculum owner', date: '2026-11-28', verdict: 'pass' };
const manifest = (rows) => ({ course: 'efmp-301', unit: 4, notebook_id: 'nb-12345678', artifacts: rows });
const row = (o) => ({ topic: 1, locale: 'en', status: 'planned', title: 'Bloom in practice', prompt_ref: 'specs/studio/prompts/pack/script.md', ...o });

describe('manifest pack kinds', () => {
  test('accepts a placed long-form lesson with chapters, captions and audio tracks', () => {
    const m = manifest([row({
      kind: 'longform', status: 'placed', alt: 'Full lesson', review: REVIEW,
      host_url: 'https://youtu.be/abcdefghijk', playlist: 'PLBPGR4jAnhh4',
      chapters: [{ t: '00:00', title: 'Hook' }, { t: '01:30', title: 'Levels' }, { t: '1:02:03', title: 'Recap' }],
      captions: [{ locale: 'en', status: 'checked' }, { locale: 'ur', status: 'draft' }, { locale: 'pt-BR', status: 'draft' }],
      audio_tracks: ['en', 'ur'],
    })]);
    expect(validate(m), JSON.stringify(validate.errors)).toBe(true);
  });

  test('chapters must start at 00:00', () => {
    const m = manifest([row({ kind: 'longform', chapters: [{ t: '00:15', title: 'Hook' }] })]);
    expect(validate(m)).toBe(false);
  });

  test('a placed short needs its related long-form video and a YouTube url', () => {
    const base = { kind: 'short', status: 'placed', alt: 'One idea', review: REVIEW, host_url: 'https://youtube.com/shorts/abcdefghijk' };
    expect(validate(manifest([row(base)]))).toBe(false);
    expect(validate(manifest([row({ ...base, related_video: 'https://youtu.be/abcdefghijk' })]))).toBe(true);
    expect(validate(manifest([row({ ...base, related_video: 'https://youtu.be/abcdefghijk', host_url: 'https://vimeo.com/1' })]))).toBe(false);
    expect(validate(manifest([row({ kind: 'short' })]))).toBe(true); // planned shorts need nothing yet
  });

  test('infographic and deck_pdf may point at image and PDF assets', () => {
    const m = manifest([
      row({ kind: 'infographic', status: 'placed', alt: 'Overview', review: REVIEW, asset_path: '/studio/efmp-301/unit-04/topic-01/infographic.en.webp' }),
      row({ kind: 'deck_pdf', status: 'placed', alt: 'Deck', review: REVIEW, asset_path: '/studio/efmp-301/unit-04/topic-01/deck.en.pdf' }),
    ]);
    expect(validate(m), JSON.stringify(validate.errors)).toBe(true);
    expect(validate(manifest([row({ kind: 'infographic', asset_path: '/studio/efmp-301/unit-04/topic-01/x.exe' })]))).toBe(false);
  });

  test('rejects a malformed playlist id and an unknown kind', () => {
    expect(validate(manifest([row({ kind: 'longform', playlist: 'nope' })]))).toBe(false);
    expect(validate(manifest([row({ kind: 'teaser' })]))).toBe(false);
  });
});

describe('media states and playlists', () => {
  test('pack videos take the scripted path; the infographic takes the document path', () => {
    for (const k of ['video.longform', 'video.short', 'doc.infographic']) expect(KINDS).toContain(k);
    expect(nextState('video.longform', 'planned')).toBe('scripted');
    expect(nextState('video.short', 'scripted')).toBe('approved');
    expect(PATH['doc.infographic']).toEqual(PATH['doc.poster']);
    const job = (kind) => ({ key: `efmp-301-u04-t1-en-${kind}`, kind, scope: { course: 'EFMP-301', unit: 4, topic: 1, locale: 'en' }, state: 'planned' });
    for (const k of ['video.longform', 'video.short', 'doc.infographic']) expect(validateJob(job(k)), k).toBe(true);
    expect(validateJob(job('video.ad'))).toBe(false);
  });

  test('playlistFor maps known playlists and returns null for unmapped courses', () => {
    expect(playlistFor('video.teaser', 'gict-300')).toBe(PLAYLISTS.teasers);
    expect(playlistFor('audio.brief', 'efmp-302', 'ur')).toBe('PLH7WvExVOw8U');
    expect(playlistFor('video.longform', 'efmp-301', 'en')).toBe('PLBPGR4jAnhh4');
    expect(playlistFor('video.short', 'efmp-301', 'ur')).toBe('PLZVdgN09a2qs');
    expect(playlistFor('video.longform', 'gqur-300', 'en')).toBeNull();
    expect(playlistFor('doc.infographic', 'efmp-301')).toBeNull();
  });
});

describe('migration 0060 shape', () => {
  const sql = readFileSync(join(ROOT, 'supabase/migrations/0060_content_packs.sql'), 'utf8');

  test('both tables have RLS, admin-only reads and no client writes', () => {
    for (const t of ['content_packs', 'content_pack_events']) {
      expect(sql).toContain(`alter table public.${t} enable row level security;`);
      expect(sql).toContain(`revoke all on public.${t} from anon, authenticated;`);
      expect(sql).toContain(`grant select on public.${t} to authenticated;`);
    }
    expect(sql.match(/using \(public\.is_admin\(\)\)/g)).toHaveLength(2);
  });

  test('every RPC is security definer, checks admin first and is not executable by anon', () => {
    const fns = [...sql.matchAll(/create function public\.(\w+)\(/g)].map((m) => m[1]).filter((f) => f !== 'content_pack_stage_keys');
    expect(fns).toEqual(['create_content_pack', 'set_content_pack_stage', 'set_content_pack_link', 'set_content_pack_watermark']);
    for (const f of fns) {
      const body = sql.slice(sql.indexOf(`create function public.${f}(`)).split('end; $$;')[0];
      expect(body, f).toContain('security definer set search_path = public, pg_temp');
      expect(body, f).toMatch(/begin\s+if not public\.is_admin\(\) then raise exception 'admin required'/);
      expect(sql, f).toMatch(new RegExp(`revoke all on function public\\.${f}\\([^)]*\\) from public, anon;`));
    }
  });

  test('the upload bucket is private, capped at 50 MB and accepts no video or audio', () => {
    const bucket = sql.slice(sql.indexOf('insert into storage.buckets'), sql.indexOf('on conflict (id) do nothing;'));
    expect(bucket).toContain("'content-pack-uploads',\n  false,\n  52428800");
    expect(bucket).not.toMatch(/video\/|audio\//);
  });

  test('stage keys match PLAN-v2', () => {
    const plan = readFileSync(join(ROOT, 'specs/038-content-pack-v2/PLAN-v2.md'), 'utf8');
    const keys = sql.match(/select array\[([^\]]+)\]/)[1].replace(/'/g, '').split(',');
    expect(keys).toHaveLength(12);
    expect(plan.replace(/\s+/g, ' ')).toContain(keys.join(', '));
  });
});
