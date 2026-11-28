/**
 * NotebookLM login health (nlm-health.mjs) and the chunked Study Studio transcriber (transcribe.mjs),
 * with fake commands: no network, no nlm, no ffmpeg.
 */
import { describe, it, expect } from 'vitest';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { due, laneHealthy, probe, checkAll, pktDay } from '../../scripts/media/nlm-health.mjs';
import { transcribeFile, joinParts } from '../../scripts/media/transcribe.mjs';

const tmp = () => mkdtempSync(join(tmpdir(), 'mh-'));
const at = (iso) => Date.parse(iso);
const EXPIRED = '\n✗ Authentication Error\n  Authentication expired. Run \'nlm login\' in your terminal to re-authenticate.\n';

describe('nlm health', () => {
  it('is due every two hours from 14:00 PKT until 09:00 PKT', () => {
    const s = (iso) => ({ lastRun: iso, profiles: {} });
    expect(due(s(null), at('2026-11-28T09:00:00Z'))).toBe(true); // 14:00 PKT, never run
    expect(due(s('2026-11-28T08:30:00Z'), at('2026-11-28T09:00:00Z'))).toBe(false); // ran 30 min ago
    expect(due(s('2026-11-28T06:00:00Z'), at('2026-11-28T06:30:00Z'))).toBe(false); // 11:30 PKT, office hours
    expect(due(s('2026-11-28T18:00:00Z'), at('2026-11-28T20:05:00Z'))).toBe(true); // 01:05 PKT, 2 h later
    expect(pktDay(at('2026-11-28T19:30:00Z'))).toBe('2026-11-29');
  });
  it('keeps only a failing profile\'s lane idle', () => {
    const state = { profiles: { default: { ok: true }, second: { ok: false } } };
    expect(laneHealthy('notebook', state)).toBe(true);
    expect(laneHealthy('notebook2', state)).toBe(false);
    expect(laneHealthy('notebook2', { profiles: {} })).toBe(true);
    expect(laneHealthy('flow', state)).toBe(true);
  });
  it('reads an auth error even when nlm exits 0', () => {
    expect(probe('default', () => ({ status: 0, stdout: EXPIRED, stderr: '' }))).toEqual({ ok: false, detail: 'login expired' });
    expect(probe('default', () => ({ status: 0, stdout: '[{"id":"x"}]', stderr: '' })).ok).toBe(true);
  });
  it('refreshes an expired profile, closes its tunnel, and notifies only when the refresh fails', () => {
    const file = join(tmp(), 'h.json');
    const calls = [];
    let secondFixed = false;
    const run = (cmd, args) => {
      calls.push([cmd, ...args].join(' '));
      if (cmd === 'nlm' && args[0] === 'notebook') {
        const p = args[3];
        return { status: 0, stdout: p === 'default' || (p === 'second' && secondFixed) ? '[{"id":"n"}]' : EXPIRED, stderr: '' };
      }
      if (cmd === 'nlm' && args[0] === 'login') { secondFixed = true; return { status: 0, stdout: '✓', stderr: '' }; }
      if (cmd === 'ssh') return { status: 0, stdout: '', stderr: '' };
      if (cmd === 'pgrep') return { status: 0, stdout: '4242\n', stderr: '' };
      return { status: 0, stdout: '', stderr: '' };
    };
    const notes = [];
    const s = checkAll({ run, file, nowMs: at('2026-11-28T10:00:00Z'), notify: (m) => notes.push(m) });
    expect(s.profiles.default).toMatchObject({ ok: true });
    expect(s.profiles.second).toMatchObject({ ok: true, refreshed: 'refreshed' });
    expect(calls.some((c) => c.startsWith('ssh') && c.includes('127.0.0.1:18803:127.0.0.1:9223'))).toBe(true);
    expect(calls).toContain('kill 4242');
    expect(notes).toEqual([]);
    // A refresh that fails notifies once a day; a check-only run never notifies.
    const failing = (cmd, args) => (cmd === 'nlm' && args[0] === 'notebook' ? { status: 0, stdout: EXPIRED, stderr: '' } : cmd === 'nlm' ? { status: 1, stdout: 'no session', stderr: '' } : { status: 0, stdout: '', stderr: '' });
    checkAll({ run: failing, file, nowMs: at('2026-11-28T12:00:00Z'), notify: (m) => notes.push(m) });
    expect(notes.length).toBe(2);
    checkAll({ run: failing, file, nowMs: at('2026-11-28T14:00:00Z'), notify: (m) => notes.push(m) });
    expect(notes.length).toBe(2);
    const f2 = join(tmp(), 'h.json');
    checkAll({ run: failing, file: f2, doRefresh: false, notify: (m) => notes.push(m) });
    expect(notes.length).toBe(2);
    expect(JSON.parse(readFileSync(file, 'utf8')).profiles.second.ok).toBe(false);
  });
});

describe('transcribe', () => {
  const split = (file, dir) => [0, 1, 2].map((i) => { const p = join(dir, `part-${i}.mp3`); writeFileSync(p, `audio${i}`); return { path: p, seconds: 120 }; });
  it('transcribes chunk by chunk on Workers AI and joins the parts', async () => {
    const seen = [];
    const r = await transcribeFile('/x.m4a', { deps: { split, creds: { id: 'a', token: 't' }, viaCfai: async (bytes, o) => { seen.push([bytes.toString(), o.language]); return ` حصہ ${seen.length} `; }, local: () => 'local' } });
    expect(r).toEqual({ text: 'حصہ 1 حصہ 2 حصہ 3', engine: 'cfai' });
    expect(seen.map((s) => s[0])).toEqual(['audio0', 'audio1', 'audio2']);
    expect(seen[0][1]).toBe('ur');
  });
  it('falls back to local whisper for the whole file on any Workers AI failure, or without a token', async () => {
    const r = await transcribeFile('/x.m4a', { deps: { split, creds: { id: 'a', token: 't' }, viaCfai: async () => { throw new Error('AiError 8004'); }, local: () => 'سب' } });
    expect(r).toMatchObject({ text: 'سب', engine: 'local', fallback: 'AiError 8004' });
    expect(await transcribeFile('/x.m4a', { deps: { split, creds: null, local: () => 'سب' } })).toEqual({ text: 'سب', engine: 'local' });
    expect(joinParts([' a ', '', 'b'])).toBe('a b');
  });
});
