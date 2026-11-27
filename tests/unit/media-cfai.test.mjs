/**
 * Workers AI client and the QG2 engine choice (Feature 037, D-2026-0103): free-allowance cap with a
 * UTC daily ledger, error mapping, recorded usage, and the local-whisper fallback.
 */
import { describe, it, expect } from 'vitest';
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { credentials, checkBudget, record, usedToday, classify, run, CfaiError, nextUtcMidnight, complete } from '../../scripts/media/producers/cfai.mjs';
import { qg2, pickEngine } from '../../scripts/media/qg2.mjs';
import { draftMessages, cleanDashes } from '../../scripts/media/cfai-text.mjs';

const tmp = () => mkdtempSync(join(tmpdir(), 'cfai-'));
const T = Date.parse('2026-11-28T10:00:00Z');
const okFetch = (result, calls = []) => async (url, init) => { calls.push({ url, body: JSON.parse(init.body) }); return { ok: true, status: 200, json: async () => ({ success: true, result }) }; };

describe('credentials', () => {
  it('reads the env first, then the host file, and is null without both', () => {
    const f = join(tmp(), 'cf.env');
    writeFileSync(f, 'CF_ACCOUNT_ID=abc\nCF_AI_TOKEN=tok\n');
    expect(credentials({ env: {}, file: f })).toEqual({ id: 'abc', token: 'tok' });
    expect(credentials({ env: { CF_ACCOUNT_ID: 'x', CF_AI_TOKEN: 'y' }, file: f })).toEqual({ id: 'x', token: 'y' });
    expect(credentials({ env: {}, file: join(tmp(), 'none') })).toBeNull();
  });
});

describe('daily cap', () => {
  it('counts per UTC day and refuses before the cap with the next UTC midnight', () => {
    const file = join(tmp(), 'l.json');
    record(8990, { file, ms: T });
    expect(usedToday(file, T)).toBe(8990);
    expect(() => checkBudget(5, { file, ms: T, cap: 9000 })).not.toThrow();
    try { checkBudget(20, { file, ms: T, cap: 9000 }); throw new Error('no throw'); } catch (e) {
      expect(e).toBeInstanceOf(CfaiError);
      expect(e.status).toBe('quota');
      expect(e.resetAt).toBe('2026-11-29T00:00:00.000Z');
    }
    expect(usedToday(file, Date.parse('2026-11-29T00:00:01Z'))).toBe(0);
    expect(nextUtcMidnight(Date.parse('2026-11-28T23:59:00Z'))).toBe('2026-11-29T00:00:00.000Z');
  });
});

describe('classify', () => {
  it('maps auth to unavailable and limits to quota', () => {
    expect(classify(401, {}).status).toBe('unavailable');
    expect(classify(403, { errors: [{ code: 5035, message: 'requires Workers Paid' }] }).status).toBe('unavailable');
    expect(classify(429, {}).status).toBe('quota');
    expect(classify(400, { errors: [{ code: 4006, message: 'daily free allocation of 10,000 neurons used' }] }).status).toBe('quota');
    expect(classify(400, { errors: [{ code: 5006, message: 'Bad input' }] })).not.toBeInstanceOf(CfaiError);
  });
});

describe('run', () => {
  it('records the model usage when reported, else the estimate', async () => {
    const ledger = join(tmp(), 'l.json');
    const creds = { id: 'a', token: 't' };
    await run('@cf/x', {}, { estimate: 10, creds, ledger, fetchImpl: okFetch({ usage: { neurons: 2.5 } }) });
    await run('@cf/x', {}, { estimate: 4, creds, ledger, fetchImpl: okFetch({ text: 'hi' }) });
    expect(JSON.parse(readFileSync(ledger, 'utf8')).neurons).toBe(6.5);
  });
  it('is unavailable without credentials and on a network error', async () => {
    await expect(run('@cf/x', {}, { estimate: 1, creds: null })).rejects.toMatchObject({ status: 'unavailable' });
    const boom = async () => { throw new Error('ECONNRESET'); };
    await expect(run('@cf/x', {}, { estimate: 1, creds: { id: 'a', token: 't' }, ledger: join(tmp(), 'l.json'), fetchImpl: boom })).rejects.toMatchObject({ status: 'unavailable' });
  });
  it('drafts turn thinking off unless asked', async () => {
    const calls = [];
    const text = await complete([{ role: 'user', content: 'hi' }], { creds: { id: 'a', token: 't' }, ledger: join(tmp(), 'l.json'), fetchImpl: okFetch({ choices: [{ message: { content: ' ok ' } }] }, calls) });
    expect(text).toBe('ok');
    expect(calls[0].body.chat_template_kwargs).toEqual({ enable_thinking: false });
  });
});

describe('drafts', () => {
  it('builds house-style messages and strips long dashes', () => {
    const m = draftMessages('alt', 'a teacher in a courtyard');
    expect(m[0].role).toBe('system');
    expect(m[1].content).toMatch(/alt text/);
    expect(() => draftMessages('poem', 'x')).toThrow(/unknown kind/);
    expect(cleanDashes('a\u2014b')).toBe('a - b');
  });
});

describe('qg2 engine', () => {
  it('uses Workers AI when the token exists and falls back to local whisper on a refusal', async () => {
    expect(pickEngine(undefined, { id: 'a', token: 't' })).toBe('cfai');
    expect(pickEngine(undefined, null)).toBe('local');
    expect(pickEngine('local', { id: 'a', token: 't' })).toBe('local');
    const d = tmp();
    const clip = join(d, 'clip.mp4');
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', 'color=c=gray:s=64x64:d=8', '-f', 'lavfi', '-i', 'sine=d=8', '-shortest', '-c:v', 'libx264', '-c:a', 'aac', clip]);
    const local = () => 'ایک دو تین';
    const refused = async () => ({ ok: false, status: 429, json: async () => ({ success: false, errors: [{ code: 3040, message: 'Out of capacity' }] }) });
    const r = await qg2(clip, 'ایک دو تین', { outDir: join(d, 'q'), cfai: { creds: { id: 'a', token: 't' }, ledger: join(d, 'l.json'), fetchImpl: refused }, local });
    expect(r.engine).toBe('local');
    expect(r.fallback).toMatch(/^quota/);
    expect(r.score).toBe(1);
    const viaCf = await qg2(clip, 'ایک دو تین', { outDir: join(d, 'q2'), cfai: { creds: { id: 'a', token: 't' }, ledger: join(d, 'l.json'), fetchImpl: okFetch({ text: 'ایک دو' }) }, local });
    expect(viaCf).toMatchObject({ engine: 'cfai', score: 0.667 });
  });
});
