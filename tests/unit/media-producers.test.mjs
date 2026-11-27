import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import http from 'node:http';
import { mkdtempSync, readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { produce, activeQuota, fromThrowing, REGISTRY } from '../../scripts/media/producers/index.mjs';
import { QuotaError, UnavailableError } from '../../scripts/media/producers/image.mjs';
import { gflowVideo, clearSubmission } from '../../scripts/media/producers/gflow-video.mjs';
import { manualFlow, splitPoints, manualName } from '../../scripts/media/producers/manual-flow.mjs';
import { nlmProducer, classify, createArgs } from '../../scripts/media/producers/nlm.mjs';
import { matchScore, suggestVerdict, skeleton, sameWord } from '../../scripts/media/qg2.mjs';
import { loadRecipe } from '../../scripts/media/recipes.mjs';
import { promptPage } from '../../scripts/media/prompt-page.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const tmp = () => mkdtempSync(join(tmpdir(), 'media-prod-'));
const script = JSON.parse(readFileSync(join(ROOT, 'specs/studio/teasers/efmp-301.json'), 'utf8'));
const recipe = loadRecipe('teaser', 2, ROOT);

describe('producer registry and fallback', () => {
  it('lists producers per medium in fallback order', () => {
    expect(REGISTRY.clip).toEqual(['gflow.video', 'gflow2.video', 'manual.flow']);
    expect(REGISTRY.image).toEqual(['agy', 'agy2', 'gflow', 'gflow2', 'codex']);
  });
  it('records a quota, falls back, and skips the producer while its quota holds', async () => {
    const quotaFile = join(tmp(), 'q.json');
    const calls = [];
    const impls = {
      agy: async () => { calls.push('agy'); return { status: 'quota', resetAt: '2099-01-01T00:00:00Z', reason: 'QUOTA_EXHAUSTED' }; },
      agy2: async () => { calls.push('agy2'); return { status: 'unavailable', reason: 'not signed in' }; },
      gflow: async () => { calls.push('gflow'); return { status: 'unavailable', reason: 'tunnel down' }; },
      gflow2: async () => { calls.push('gflow2'); return { status: 'unavailable', reason: 'tunnel down' }; },
      codex: async () => { calls.push('codex'); return { status: 'ok', file: '/x.png', reason: 'made' }; },
    };
    const r1 = await produce('image', {}, 1, { impls, quotaFile });
    expect(r1).toMatchObject({ status: 'ok', producer: 'codex' });
    expect(r1.tried.map((t) => t.status)).toEqual(['quota', 'unavailable', 'unavailable', 'unavailable', 'ok']);
    expect(activeQuota('agy', quotaFile).resetAt).toBe('2099-01-01T00:00:00.000Z');
    calls.length = 0;
    await produce('image', {}, 1, { impls, quotaFile });
    expect(calls).toEqual(['agy2', 'gflow', 'gflow2', 'codex']);
  });
  it('stops at failed or held without trying the next producer', async () => {
    const quotaFile = join(tmp(), 'q.json');
    let second = 0;
    for (const status of ['failed', 'held']) {
      const r = await produce('clip', {}, 1, { quotaFile, impls: { 'gflow.video': async () => ({ status, reason: 'x' }), 'manual.flow': async () => { second++; return { status: 'ok' }; } } });
      expect(r.status).toBe(status);
    }
    expect(second).toBe(0);
  });
  it('reports the earliest reset when every producer is out', async () => {
    const quotaFile = join(tmp(), 'q.json');
    const r = await produce('image', {}, 1, { quotaFile, impls: {
      agy: fromThrowing(() => { throw new QuotaError('agy', 'out', '2099-02-01T00:00:00Z'); }),
      gflow: fromThrowing(() => { throw new UnavailableError('gflow', 'offline'); }),
      codex: fromThrowing(() => { throw new QuotaError('codex', 'out', '2099-01-05T00:00:00Z'); }),
    } });
    expect(r).toMatchObject({ status: 'quota', producer: null, resetAt: '2099-01-05T00:00:00.000Z' });
  });
});

// ---------------------------------------------------------------- stub gflow (MCP + file server)
function stubGflow() {
  const st = { credits: 500, generate: 0, onGenerate: null, files: new Map() };
  const mcp = http.createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', async () => {
      const msg = JSON.parse(body);
      const reply = (result) => { res.writeHead(200, { 'content-type': 'application/json', 'mcp-session-id': 's1' }); res.end(JSON.stringify({ jsonrpc: '2.0', id: msg.id, result })); };
      if (msg.method === 'initialize') return reply({ protocolVersion: '2025-03-26', capabilities: {} });
      if (!msg.id) { res.writeHead(202); return res.end(); }
      const { name, arguments: args } = msg.params;
      if (name === 'gflow_get_credits') return reply({ structuredContent: { credits: st.credits } });
      if (name === 'gflow_download_media') {
        const f = `${args.media_id}.mp4`;
        return st.files.has(f) ? reply({ structuredContent: { files: [`C:\\Users\\x\\Downloads\\gflow-cli\\${f}`] } }) : reply({ isError: true, content: [{ type: 'text', text: 'not found' }] });
      }
      if (name === 'gflow_generate_video') {
        st.generate++;
        st.lastArgs = args;
        return st.onGenerate(req, res, reply, args);
      }
      reply({ isError: true, content: [{ type: 'text', text: `unknown ${name}` }] });
    });
  });
  const files = http.createServer((req, res) => {
    const name = decodeURIComponent(req.url.slice(1));
    if (!name) { res.writeHead(200, { 'content-type': 'text/html' }); return res.end([...st.files.keys()].map((n) => `<a href="${encodeURIComponent(n)}">${n}</a>`).join('\n')); }
    const f = st.files.get(name);
    if (!f) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'last-modified': new Date(f.mtime).toUTCString(), 'content-length': f.data.length });
    res.end(req.method === 'HEAD' ? undefined : f.data);
  });
  return new Promise((ok) => mcp.listen(0, '127.0.0.1', () => files.listen(0, '127.0.0.1', () => ok({
    st, mcpUrl: `http://127.0.0.1:${mcp.address().port}/mcp`, filesUrl: `http://127.0.0.1:${files.address().port}/`,
    close: () => { mcp.closeAllConnections?.(); files.closeAllConnections?.(); mcp.close(); files.close(); },
  }))));
}

// Pacing (D-2026-0100) is unit-tested in tests/crew/media-pacing.test.mjs; here it is a no-op
// so the producers' own behaviour runs without sleeping or the office-hours hold.
const noPace = { pace: async () => {}, record: () => {} };

describe('gflow.video producer', () => {
  let g; let dir; let opts; let job;
  beforeEach(async () => {
    g = await stubGflow();
    dir = tmp();
    opts = { mcpUrl: g.mcpUrl, filesUrl: g.filesUrl, projects: join(dir, 'projects.json'), journal: join(dir, 'journal.json'), timeoutMs: 400, ...noPace };
    job = { key: 'efmp-301-ur', script, recipe, locale: 'ur', outDir: join(dir, 'out') };
  });
  afterEach(() => g.close());

  it('generates a shot with veo_lite and no duration, fetches the file and remembers the project', async () => {
    g.st.onGenerate = (req, res, reply) => {
      g.st.credits -= 10;
      g.st.files.set('m1.mp4', { data: Buffer.from('clip-1'), mtime: Date.now() });
      reply({ structuredContent: { status: 'ok', flow_project_id: 'P1', flow_media_id: 'm1', files: ['C:\\Users\\x\\Downloads\\gflow-cli\\m1.mp4'] } });
    };
    const r = await gflowVideo(opts)(job, 3, { take: 1 });
    expect(r).toMatchObject({ status: 'ok', source: 'generated', credits: 10, mediaId: 'm1' });
    expect(readFileSync(r.file, 'utf8')).toBe('clip-1');
    expect(g.st.lastArgs).toMatchObject({ model: 'veo_lite', aspect: '9:16', project_name: 'teaser efmp-301-ur' });
    expect(g.st.lastArgs).not.toHaveProperty('duration');
    expect(g.st.lastArgs.prompt).not.toMatch(/9:16/);
    expect(JSON.parse(readFileSync(opts.projects, 'utf8'))['efmp-301-ur']).toBe('P1');
    await gflowVideo(opts)(job, 4, { take: 1 });
    expect(g.st.lastArgs.project).toBe('P1');
  });

  it('skips an offline tunnel without spending an attempt or journalling', async () => {
    g.close();
    const r = await gflowVideo(opts)(job, 1);
    expect(r.status).toBe('unavailable');
    expect(existsSync(opts.journal)).toBe(false);
  });

  it('recovers a finished but unreported clip instead of generating again', async () => {
    g.st.onGenerate = (req, res, reply) => {
      g.st.credits -= 10; // Flow billed and finished the clip, but gflow reports a tool error
      g.st.files.set('late.mp4', { data: Buffer.from('late-clip'), mtime: Date.now() + 1000 });
      reply({ isError: true, content: [{ type: 'text', text: 'Error executing tool gflow_generate_video' }] });
    };
    const p = gflowVideo(opts);
    expect((await p(job, 2)).status).toBe('failed');
    const r = await p(job, 2, { take: 2 });
    expect(r).toMatchObject({ status: 'ok', source: 'recovered', mediaId: 'late' });
    expect(readFileSync(r.file, 'utf8')).toBe('late-clip');
    expect(g.st.generate).toBe(1);
  });

  it('holds while a charge is unexplained, and generates once the owner clears it', async () => {
    g.st.onGenerate = (req, res, reply) => { g.st.credits -= 10; reply({ isError: true, content: [{ type: 'text', text: 'Error executing tool' }] }); };
    const p = gflowVideo(opts);
    await p(job, 5);
    const held = await p(job, 5);
    expect(held.status).toBe('held');
    expect(held.reason).toMatch(/balance fell from 500 to 490/);
    expect(g.st.generate).toBe(1);
    expect(clearSubmission('efmp-301-ur', 5, opts.journal)).toBe(true);
    await p(job, 5);
    expect(g.st.generate).toBe(2);
  });

  it('drops a submission that never reached Flow (no charge) and generates', async () => {
    g.st.onGenerate = (req, res, reply) => reply({ isError: true, content: [{ type: 'text', text: 'UiSelectorDriftError' }] });
    const p = gflowVideo(opts);
    await p(job, 1);
    await p(job, 1);
    expect(g.st.generate).toBe(2);
  });

  it('maps a socket reset and a timeout to unavailable and keeps the submission for recovery', async () => {
    g.st.onGenerate = (req) => req.socket.destroy();
    expect((await gflowVideo(opts)(job, 1)).status).toBe('unavailable');
    expect(JSON.parse(readFileSync(opts.journal, 'utf8'))['efmp-301-ur#1'].status).toBe('submitted');
    g.st.onGenerate = () => { /* never answers */ };
    const r = await gflowVideo(opts)(job, 2);
    expect(r).toMatchObject({ status: 'unavailable' });
    expect(r.reason).toMatch(/no reply from gflow/);
  });

  it('treats a quota error as quota and drops the submission', async () => {
    g.st.onGenerate = (req, res, reply) => reply({ isError: true, content: [{ type: 'text', text: 'RateLimitError: Daily or per-minute model quota reached' }] });
    expect((await gflowVideo(opts)(job, 1)).status).toBe('quota');
    expect(JSON.parse(readFileSync(opts.journal, 'utf8'))).toEqual({});
  });
});

describe('manual.flow producer', () => {
  it('writes a prompt page and holds, then ingests the owner clip from the inbox', async () => {
    const dir = tmp();
    const inbox = join(dir, 'inbox');
    const p = manualFlow({ filesUrl: 'http://127.0.0.1:9/', inbox, pageDir: inbox });
    const job = { key: 'efmp-301-ur', script, recipe, outDir: join(dir, 'out') };
    const held = await p(job, 2);
    expect(held.status).toBe('held');
    const html = readFileSync(join(inbox, 'efmp-301-ur-prompts.html'), 'utf8');
    expect(html).toContain('Copy prompt');
    expect(html).toContain(manualName('efmp-301-ur', 2));
    writeFileSync(join(inbox, manualName('efmp-301-ur', 2)), 'owner-clip');
    expect(await p(job, 2, { take: 3 })).toMatchObject({ status: 'ok', source: 'manual', credits: 10 });
    expect(readFileSync(join(dir, 'out', 'shot-2-t3.mp4'), 'utf8')).toBe('owner-clip');
  });
  it('splits a joined clip at the pause nearest each 8 s boundary', () => {
    const stderr = 'silence_start: 7.4\nsilence_end: 8.2\nsilence_start: 12.0\nsilence_end: 12.3\nsilence_start: 17.6\nsilence_end: 17.9\n';
    expect(splitPoints(stderr, 24, 3)).toEqual([{ at: 7.8, snapped: true }, { at: 16, snapped: false }]);
  });
  it('escapes prompts in the page', () => {
    expect(promptPage({ title: 't', items: [{ key: 'k', part: 1, prompt: '<b>"x"</b>' }] })).toContain('&lt;b&gt;&quot;x&quot;&lt;/b&gt;');
  });
});

describe('nlm producer', () => {
  const job = (o = {}) => ({ key: 'gnas-301-u01-t1-ur-audio', kind: 'audio.brief', notebook_id: 'nb1', outDir: tmp(), ...o });
  it('returns unavailable on expired cookies, not failed', async () => {
    const r = await nlmProducer({ ...noPace, run: () => ({ status: 1, stdout: '', stderr: 'Error: Cookies have expired. Run nlm login' }) })(job());
    expect(r.status).toBe('unavailable');
    expect(classify({ status: 1, stdout: '', stderr: 'boom' }).status).toBe('failed');
  });
  it('resumes a still-generating artifact without creating another', async () => {
    const calls = [];
    const run = (args) => {
      calls.push(args.slice(0, 2).join(' '));
      if (args[1] === 'create') return { status: 0, stdout: JSON.stringify({ artifact_id: 'a1' }), stderr: '' };
      if (args[0] === 'studio') return { status: 0, stdout: JSON.stringify([{ status: 'in_progress' }]), stderr: '' };
      return { status: 1, stdout: '', stderr: '' };
    };
    const r = await nlmProducer({ ...noPace, run, waitMs: 0 })(job());
    expect(r).toMatchObject({ status: 'unavailable', mediaId: 'a1' });
    calls.length = 0;
    const j = job({ artifact_id: 'a1' });
    const run2 = (args) => {
      calls.push(args.slice(0, 2).join(' '));
      if (args[0] === 'studio') return { status: 0, stdout: JSON.stringify([{ status: 'completed' }]), stderr: '' };
      if (args[0] === 'download') { writeFileSync(args[args.indexOf('--output') + 1], 'audio'); return { status: 0, stdout: '', stderr: '' }; }
      return { status: 1, stdout: '', stderr: '' };
    };
    expect(await nlmProducer({ ...noPace, run: run2 })(j)).toMatchObject({ status: 'ok', mediaId: 'a1' });
    expect(calls).not.toContain('audio create');
  });
  it('makes a mind map without polling and a Urdu study guide with Create Your Own (#908)', async () => {
    const calls = [];
    const run = (args) => {
      calls.push(args);
      if (args[1] === 'create') return { status: 0, stdout: JSON.stringify({ artifact_id: 'm1' }), stderr: '' };
      if (args[0] === 'studio') return { status: 0, stdout: JSON.stringify([{ status: 'completed' }]), stderr: '' };
      if (args[0] === 'download') { writeFileSync(args[args.indexOf('--output') + 1], '{}'); return { status: 0, stdout: '', stderr: '' }; }
      return { status: 1, stdout: '', stderr: '' };
    };
    const r = await nlmProducer({ ...noPace, run })(job({ key: 't1-en-mindmap', kind: 'doc.mindmap', title: 'Topic 1' }));
    expect(r).toMatchObject({ status: 'ok', mediaId: 'm1' });
    expect(r.file).toMatch(/t1-en-mindmap\.json$/);
    expect(calls.map((a) => a.slice(0, 2).join(' '))).toEqual(['mindmap create', 'download mind-map']);
    expect(calls[0]).toEqual(expect.arrayContaining(['--title', 'Topic 1']));
    calls.length = 0;
    const g = await nlmProducer({ ...noPace, run })(job({ key: 't1-ur-studyguide', kind: 'doc.studyguide', prompt: 'Urdu study guide', language: 'ur' }));
    expect(g.file).toMatch(/\.md$/);
    expect(calls[0]).toEqual(expect.arrayContaining(['report', 'create', '--format', 'Create Your Own', '--prompt', 'Urdu study guide', '--language', 'ur']));
    expect(calls.map((a) => a.slice(0, 2).join(' '))).toContain('download report');
    expect(createArgs('report', { notebook_id: 'nb' })).toEqual(expect.arrayContaining(['--format', 'Study Guide']));
  });
});

describe('QG2 word match', () => {
  it('matches English words that whisper wrote in Urdu script', () => {
    expect(skeleton('discount')).toBe(skeleton('ڈسکاؤنٹ'));
    expect(sameWord('result', 'رزلٹ')).toBe(true);
    expect(sameWord('سکھائیں', 'سکھایں')).toBe(true); // whisper drops or adds vowel letters
    expect(sameWord('بل', 'دل')).toBe(false);
    expect(sameWord('یونٹس', 'units')).toBe(true);
  });
  it('scores the approved line against the transcript and suggests a verdict', () => {
    const line = 'بازار میں discount، بجلی کا بل، کلاس کا result۔';
    expect(matchScore(line, 'بازار میں ڈسکاؤنٹ بجلی کا بل کلاس کا رزلٹ').score).toBe(1);
    const half = matchScore(line, 'بازار میں بجلی کا');
    expect(half.score).toBeLessThan(0.6);
    expect(half.missing).toContain('discount');
    expect(matchScore('پورا کورس مفت پڑھیں textbook ڈاٹ کام ڈاٹ پی کے پر۔', 'پورا کورس مفت پڑھیں\ntextbook.com.pk پر').score).toBe(1);
    expect(suggestVerdict(1)).toBe('pass');
    expect(suggestVerdict(0.7)).toBe('pass-with-notes');
    expect(suggestVerdict(half.score)).toBe('fail');
  });
});
