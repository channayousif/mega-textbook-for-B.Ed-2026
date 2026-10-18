/**
 * Owner channel over openclaw: Discord for everything, WhatsApp for urgent items
 * and decision requests. Replies are read back from the same places, and ONLY
 * messages authored by the owner IDs in owner.json count. Everything here is
 * text in, text out: nothing an inbound message says is ever run as a command
 * beyond the fixed verbs parsed in crew.mjs.
 *
 * owner.json (in STATE_DIR, host-local, never committed):
 *   { "whatsapp": "+92...", "discordUser": "<id>", "discordChannel": "<id>" }
 */
import { spawnSync } from 'node:child_process';
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { STATE_DIR, load, save, now } from './state.mjs';

const OC_SESSIONS = join(homedir(), '.openclaw', 'agents', 'main', 'sessions');

export function owner() {
  const file = join(STATE_DIR, 'owner.json');
  if (!existsSync(file)) throw new Error(`missing ${file}; see ops/crew/README.md`);
  return JSON.parse(readFileSync(file, 'utf8'));
}

function openclaw(args) {
  const r = spawnSync('timeout', ['90', 'openclaw', ...args], { encoding: 'utf8' });
  return { ok: r.status === 0, out: r.stdout || '', err: (r.stderr || '').trim() };
}

/** Discord caps a message at 2000 characters; WhatsApp is kept short on purpose. */
function chunks(text, size) {
  const out = [];
  for (let i = 0; i < text.length; i += size) out.push(text.slice(i, i + size));
  return out;
}

export function send(text, { urgent = false, media = null, dryRun = false } = {}) {
  const o = owner();
  const targets = [['discord', `channel:${o.discordChannel}`, 1900]];
  if (urgent) targets.push(['whatsapp', o.whatsapp, 3500]);
  let delivered = 0;
  for (const [channel, target, size] of targets) {
    let ok = true;
    for (const [i, part] of chunks(text, size).entries()) {
      const args = ['message', 'send', '--channel', channel, '--target', target, '-m', part];
      if (media && i === 0) args.push('--media', media);
      if (dryRun) { console.log(`[dry-run] ${channel} ${target}: ${part}`); continue; }
      const r = openclaw(args);
      if (!r.ok) { ok = false; console.error(`notify ${channel} failed: ${r.err.slice(-300)}`); break; }
    }
    if (ok) delivered++;
  }
  // Discord failed on a routine message: fall back to WhatsApp before the outbox.
  if (!dryRun && delivered === 0 && !urgent) return send(text, { urgent: true, media, dryRun });
  if (!dryRun && delivered === 0) appendFileSync(join(STATE_DIR, 'OUTBOX.md'), `\n## ${now()}\n${text}\n`);
  return delivered;
}

/**
 * Answer in the place the owner asked: a Discord DM, the WhatsApp chat, or the channel.
 * Falls back to the normal channel route when that target fails.
 */
export function reply(source, text, { dryRun = false } = {}) {
  const o = owner();
  const route = { discord_dm: ['discord', `user:${o.discordUser}`, 1900], whatsapp_dm: ['whatsapp', o.whatsapp, 3500] }[source];
  if (!route) return send(text, { dryRun });
  const [channel, target, size] = route;
  for (const part of chunks(text, size)) {
    if (dryRun) { console.log(`[dry-run] ${channel} ${target}: ${part}`); continue; }
    const r = openclaw(['message', 'send', '--channel', channel, '--target', target, '-m', part]);
    if (!r.ok) { console.error(`reply ${channel} failed: ${r.err.slice(-300)}`); return send(text, { dryRun }); }
  }
  return 1;
}

/** Owner messages from openclaw's own session log for a direct chat. */
function sessionMessages(key) {
  const index = join(OC_SESSIONS, 'sessions.json');
  if (!existsSync(index)) return [];
  const entry = JSON.parse(readFileSync(index, 'utf8'))[key];
  if (!entry?.sessionFile || !existsSync(entry.sessionFile)) return [];
  const out = [];
  for (const line of readFileSync(entry.sessionFile, 'utf8').split('\n')) {
    if (!line.includes('"role":"user"')) continue;
    try {
      const j = JSON.parse(line);
      const c = j.message?.content;
      const text = typeof c === 'string' ? c : Array.isArray(c) ? c.map((x) => x.text || '').join(' ') : '';
      out.push({ at: new Date(j.timestamp).toISOString(), text });
    } catch { /* partial line while openclaw is writing */ }
  }
  return out;
}

function discordChannelMessages(o) {
  const r = openclaw(['message', 'read', '--channel', 'discord', '--target', `channel:${o.discordChannel}`, '--limit', '30', '--json']);
  if (!r.ok) return [];
  try {
    const msgs = JSON.parse(r.out).payload?.messages || [];
    return msgs.filter((m) => m.author?.id === o.discordUser)
      .map((m) => ({ at: new Date(m.timestamp).toISOString(), text: m.content || '' }));
  } catch { return []; }
}

/** New owner messages since the last call, oldest first, across all sources. */
export function readInbox() {
  const o = owner();
  const cursor = load('inbox');
  const sources = {
    discord_channel: () => discordChannelMessages(o),
    discord_dm: () => sessionMessages(`agent:main:discord:direct:${o.discordUser}`),
    whatsapp_dm: () => sessionMessages(`agent:main:whatsapp:direct:${o.whatsapp}`),
  };
  const fresh = [];
  for (const [name, read] of Object.entries(sources)) {
    const msgs = read();
    // First run: start from now rather than replaying the whole history as commands.
    if (!cursor[name]) { cursor[name] = msgs.reduce((m, x) => (x.at > m ? x.at : m), now()); continue; }
    for (const m of msgs) if (m.at > cursor[name]) fresh.push({ ...m, source: name });
    for (const m of msgs) if (m.at > cursor[name]) cursor[name] = m.at;
  }
  save('inbox', cursor);
  return fresh.sort((a, b) => (a.at < b.at ? -1 : 1));
}
