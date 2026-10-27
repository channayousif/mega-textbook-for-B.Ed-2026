// Owner-only approval (VS-004 PI003). Usage, typed by the owner in their own terminal:
//   npm run approve -- <episode-id> <script|assets|render> [--changes] [--note "..."]
// Refuses to run without an interactive terminal and a typed confirmation of the episode id, so a
// non-interactive agent shell cannot record consent. Agents are also denied this command in
// .claude/settings.json. When asked to "approve" in chat, an agent replies with this command.
import { createInterface } from 'node:readline/promises';
import { appendApproval, readApprovals } from './lib/approvals.ts';
import { currentDigests, readEpisode } from './lib/episode.ts';
import { bindDigests, evaluate, GATES, UPSTREAM, type Gate } from './lib/invalidation.ts';
import { assertEpisodeId } from './lib/paths.ts';

const [id, gateArg, ...rest] = process.argv.slice(2);
const fail = (msg: string): never => { console.error(`approve: ${msg}`); process.exit(1); };

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  fail('needs an interactive terminal. Only the owner records approvals (VS-004 PI-03).');
}
if (!id || !gateArg) fail('usage: npm run approve -- <episode-id> <script|assets|render> [--changes] [--note "..."]');
assertEpisodeId(id);
if (!GATES.includes(gateArg as Gate)) fail(`unknown gate "${gateArg}"`);
const gate = gateArg as Gate;
const decision = rest.includes('--changes') ? 'changes' : 'approve';
const noteIdx = rest.indexOf('--note');
const note = noteIdx >= 0 ? rest[noteIdx + 1] : undefined;

const ep = readEpisode(id);
if (ep.mode === 'sample' && gate === 'render') fail('sample episodes cannot be render-approved (constitution X)');
const current = currentDigests(id);
const up = UPSTREAM[gate];
if (decision === 'approve' && up) {
  const s = evaluate(readApprovals(id), current)[up];
  if (!s.valid) fail(`upstream ${up} approval is ${s.reason}`);
}
const digests = decision === 'approve' ? bindDigests(gate, current) : {};

console.log(`Episode ${id} · gate ${gate} · decision ${decision}`);
for (const [k, v] of Object.entries(digests)) console.log(`  ${k.padEnd(12)} ${v}`);
const rl = createInterface({ input: process.stdin, output: process.stdout });
const typed = (await rl.question('Type the episode id to confirm: ')).trim();
rl.close();
if (typed !== id) fail('confirmation did not match; nothing recorded');

appendApproval(id, { gate, decision, by: 'owner', at: new Date().toISOString(), digests, note });
console.log(`Recorded ${decision} for ${gate}.`);
