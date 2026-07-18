#!/usr/bin/env node
/**
 * Build guard: fail if a Supabase service-role key reaches client-side code.
 *
 * Constitution Art. V.1 — "Docusaurus is static and MUST NOT be trusted with
 * secrets or access control." The anon key is expected in the bundle (RLS makes
 * it safe); the service-role key bypasses RLS entirely, so its presence in
 * src/ is a total compromise of the authorization model, not a lint nit.
 *
 * Exit 1 on any hit. Wired into the build via `npm run check:no-service-key`.
 *
 * Usage:
 *   node scripts/check-no-service-key.mjs [--scan-dir <dir>]...
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DEFAULT_SCAN_DIRS = ['src', 'static'];
const SCAN_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.md', '.mdx', '.html', '.css',
]);

/**
 * A Supabase JWT is three base64url segments. The role lives in the payload, so
 * we cannot match on the token shape alone — an anon key looks identical. We
 * therefore decode any JWT-shaped string and inspect its `role` claim, and also
 * match the obvious literal giveaways.
 */
const LITERAL_PATTERNS = [
  { re: /service_role/i, label: 'literal "service_role"' },
  { re: /SUPABASE_SERVICE_ROLE_KEY/, label: 'service-role env var name' },
  { re: /sb_secret_[A-Za-z0-9_-]{10,}/, label: 'new-style Supabase secret key (sb_secret_…)' },
];

const JWT_RE = /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g;

function decodeJwtRole(token) {
  try {
    const payload = token.split('.')[1];
    const json = Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
    return JSON.parse(json).role ?? null;
  } catch {
    return null;
  }
}

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return; // directory absent — nothing to scan
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (SCAN_EXTENSIONS.has(extname(full))) yield full;
  }
}

function scanFile(file) {
  const findings = [];
  const text = readFileSync(file, 'utf8');

  text.split('\n').forEach((line, i) => {
    for (const { re, label } of LITERAL_PATTERNS) {
      if (re.test(line)) findings.push({ file, line: i + 1, label });
    }
    for (const token of line.match(JWT_RE) ?? []) {
      const role = decodeJwtRole(token);
      if (role && role !== 'anon') {
        findings.push({ file, line: i + 1, label: `JWT with role="${role}"` });
      }
    }
  });

  return findings;
}

const args = process.argv.slice(2);
const scanDirs = [];
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--scan-dir' && args[i + 1]) scanDirs.push(args[i += 1]);
}
const dirs = scanDirs.length > 0 ? scanDirs : DEFAULT_SCAN_DIRS;

const findings = dirs.flatMap((dir) => [...walk(dir)].flatMap(scanFile));

if (findings.length > 0) {
  console.error('\n✖ Service-role credential detected in client-side code.\n');
  for (const f of findings) console.error(`  ${f.file}:${f.line} — ${f.label}`);
  console.error(
    '\nThe service-role key bypasses Row-Level Security. It must live only in\n' +
      'Edge Functions (supabase/functions/), never in the browser bundle.\n' +
      'See Constitution Art. V.1 and specs/002-authentication/plan.md.\n'
  );
  process.exit(1);
}

console.log(`✓ no service-role credentials in client code (scanned: ${dirs.join(', ')})`);
