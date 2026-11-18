import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, utimesSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import {
  parseRpcBody, gflowPayload, gflowRelativePath, gflowProducer, newestCodexImage,
  gflowProjectArgs, recordGflowProject, GFLOW_PROJECT_ROTATE,
  QuotaError, UnavailableError, GFLOW_QUOTA_RE,
} from '../../scripts/lib/image-producers.mjs';

test('JSON-RPC replies are read from plain JSON and from an SSE stream', () => {
  assert.deepEqual(parseRpcBody('{"jsonrpc":"2.0","id":2,"result":{"ok":1}}', 2).result, { ok: 1 });
  const sse = 'event: message\ndata: {"jsonrpc":"2.0","method":"notifications/progress"}\n\nevent: message\ndata: {"jsonrpc":"2.0","id":3,"result":{"ok":2}}\n\n';
  assert.deepEqual(parseRpcBody(sse, 3).result, { ok: 2 });
  assert.throws(() => parseRpcBody('data: {"id":9}', 3), /no JSON-RPC reply/);
});

test('gflow output paths on the Windows PC map to the 18801 file server', () => {
  // The real reply shape from the teaser pipeline (2026-11-17).
  assert.equal(gflowRelativePath('C:\\Users\\Admin\\Downloads\\gflow-cli\\images\\2026-11-17\\10bb3321_1.jpg'), 'images/2026-11-17/10bb3321_1.jpg');
  assert.equal(gflowRelativePath('C:\\Users\\Admin\\Downloads\\gflow-cli\\c0c6d1b5.mp4'), 'c0c6d1b5.mp4');
  assert.deepEqual(gflowPayload({ content: [{ type: 'text', text: '{"status":"completed","files":["a.jpg"]}' }] }).files, ['a.jpg']);
  assert.deepEqual(gflowPayload({ structuredContent: { files: ['b.jpg'] } }).files, ['b.jpg']);
  assert.ok(GFLOW_QUOTA_RE.test('{"title":"RateLimitError","detail":"Daily or per-minute model quota reached"}'));
});

/** A stand-in for `gflow serve` (MCP) and the 18801 file server; `reply` decides the tools/call answer. */
async function stubGflow(reply) {
  const jpeg = await sharp({ create: { width: 64, height: 36, channels: 3, background: '#1f6f5c' } }).jpeg().toBuffer();
  const calls = [];
  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/files/images/2026-11-18/abc_1.jpg') { res.end(jpeg); return; }
    if (req.method !== 'POST' || req.url !== '/mcp') { res.statusCode = 404; res.end(); return; }
    let body = '';
    req.on('data', (c) => { body += c; });
    req.on('end', () => {
      const msg = JSON.parse(body);
      calls.push({ method: msg.method, session: req.headers['mcp-session-id'], args: msg.params?.arguments });
      if (!('id' in msg)) { res.statusCode = 202; res.end(); return; }
      if (msg.method === 'initialize') {
        res.setHeader('mcp-session-id', 's-1');
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({ jsonrpc: '2.0', id: msg.id, result: { protocolVersion: '2025-06-18', capabilities: {} } }));
        return;
      }
      res.setHeader('content-type', 'text/event-stream');
      res.end(`event: message\ndata: ${JSON.stringify({ jsonrpc: '2.0', id: msg.id, result: reply })}\n\n`);
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  return { calls, mcpUrl: `${base}/mcp`, filesUrl: `${base}/files/`, close: () => new Promise((r) => server.close(r)) };
}

const brief = 'Style: flat\nScene: a Sindh classroom\nAspect ratio: 16:9 landscape.';

test('gflow: one Nano Banana image is requested, fetched from the file server and staged as PNG', async () => {
  const stub = await stubGflow({ content: [{ type: 'text', text: JSON.stringify({ status: 'completed', flow_project_id: 'p-1', files: ['C:\\Users\\Admin\\Downloads\\gflow-cli\\images\\2026-11-18\\abc_1.jpg'] }) }] });
  const png = join(mkdtempSync(join(tmpdir(), 'gf-')), 'fig.png');
  try {
    const projectFile = join(mkdtempSync(join(tmpdir(), 'gfp-')), 'gflow-project.json');
    const out = await gflowProducer({ brief, png, aspect: '3:4 portrait', mcpUrl: stub.mcpUrl, filesUrl: stub.filesUrl, projectFile });
    assert.match(out.model, /Nano Banana via gflow/);
    assert.equal((await sharp(png).metadata()).format, 'png');
    const call = stub.calls.find((c) => c.method === 'tools/call');
    assert.equal(call.session, 's-1', 'the session id from initialize is sent back');
    assert.equal(call.args.aspect, '3:4');
    assert.equal(call.args.count, 1);
    assert.equal(call.args.wait, true);
    assert.match(call.args.prompt, /Do not ask any question/);
    assert.ok(stub.calls.some((c) => c.method === 'notifications/initialized'));
    assert.match(call.args.project_name, /^textbook-illustrations /, 'the first image creates a titled project');
    assert.equal(call.args.project, undefined);
    assert.deepEqual(gflowProjectArgs(projectFile), { project: 'p-1' }, 'the next image reuses it');
  } finally { await stub.close(); }
});

test('gflow project: reused until the rotation limit, then a new one; GFLOW_PROJECT pins one', () => {
  const file = join(mkdtempSync(join(tmpdir(), 'gfp-')), 'gflow-project.json');
  assert.ok(gflowProjectArgs(file).project_name);
  for (let i = 0; i < GFLOW_PROJECT_ROTATE - 1; i++) recordGflowProject('p-1', file);
  assert.deepEqual(gflowProjectArgs(file), { project: 'p-1' });
  recordGflowProject('p-1', file);
  assert.ok(gflowProjectArgs(file).project_name, `after ${GFLOW_PROJECT_ROTATE} images a fresh project is started`);
  recordGflowProject('p-2', file);
  assert.deepEqual(gflowProjectArgs(file), { project: 'p-2' }, 'a new project id restarts the count');
  process.env.GFLOW_PROJECT = 'pinned';
  try { assert.deepEqual(gflowProjectArgs(file), { project: 'pinned' }); } finally { delete process.env.GFLOW_PROJECT; }
});

test('gflow: a rate-limit envelope is a QuotaError, not a failed image', async () => {
  const stub = await stubGflow({ isError: true, content: [{ type: 'text', text: '{"status":429,"title":"RateLimitError","detail":"Daily or per-minute model quota reached (nano2)","retryable":true}' }] });
  const png = join(mkdtempSync(join(tmpdir(), 'gf-')), 'fig.png');
  try {
    await assert.rejects(gflowProducer({ brief, png, aspect: '16:9 landscape', mcpUrl: stub.mcpUrl, filesUrl: stub.filesUrl }),
      (e) => e instanceof QuotaError && e.producer === 'gflow');
    assert.ok(!existsSync(png));
  } finally { await stub.close(); }
});

test('gflow: a closed tunnel is UnavailableError, so the batch moves on to Codex', async () => {
  const stub = await stubGflow({});
  const { mcpUrl } = stub;
  await stub.close();
  await assert.rejects(gflowProducer({ brief, png: '/nonexistent/x.png', aspect: '16:9', mcpUrl, filesUrl: 'http://127.0.0.1:9/' }),
    (e) => e instanceof UnavailableError);
});

test('codex: only an image written after the call started is taken', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cx-'));
  mkdirSync(join(dir, 's1'));
  mkdirSync(join(dir, 's2'));
  writeFileSync(join(dir, 's1', 'old.png'), 'x');
  utimesSync(join(dir, 's1', 'old.png'), new Date('2026-11-15T00:00:00Z'), new Date('2026-11-15T00:00:00Z'));
  const since = Date.now() - 500;
  assert.equal(newestCodexImage(since, dir), null);
  writeFileSync(join(dir, 's2', 'exec-new.png'), 'y');
  assert.equal(newestCodexImage(since, dir), join(dir, 's2', 'exec-new.png'));
  assert.equal(newestCodexImage(since, join(dir, 'missing')), null);
});
