// Voice cards and PI-08 consent scope (VS-003 V006, VS-004 PI-04/PI-08). Consent records live in
// $MEDIA_ROOT/consents/<yyyy-mm>-<id>.md (never in git); cards in brand/voices/ cite only the id.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { digestText } from './hash.ts';

export const CONSENT_ID_RE = /^narrator-\d{2}$/;

export interface VoiceCard {
  character: string;
  name: string;
  cleared: boolean;
  consent_id: string | null;
  reference_sha256: string | null;
  card_sha256: string;
}

export function readVoiceCard(voicesDir: string, character: string): VoiceCard {
  if (!/^[a-z]+$/.test(character)) throw new Error(`invalid character ${JSON.stringify(character)}`);
  const path = join(voicesDir, `${character}.md`);
  if (!existsSync(path)) throw new Error(`no voice card for ${character} (${path})`);
  const md = readFileSync(path, 'utf8');
  const name = /^# Voice card: (\S+)/m.exec(md)?.[1];
  if (!name) throw new Error(`${path}: no "# Voice card: <name>" title`);
  const status = /^- \*\*Status:\*\*(.*)$/m.exec(md)?.[1] ?? '';
  const licence = /^- \*\*Licence \/ consent:\*\*(.*)$/m.exec(md)?.[1] ?? '';
  const reference = /^- \*\*Reference:\*\*(.*)$/m.exec(md)?.[1] ?? '';
  return {
    character, name,
    cleared: /\*\*Cleared to publish\*\*/.test(status),
    consent_id: /consent `(narrator-\d{2})`/.exec(licence)?.[1] ?? null,
    reference_sha256: /SHA-256 `([a-f0-9]{64})`/.exec(reference)?.[1] ?? null,
    card_sha256: digestText(md),
  };
}

export interface Consent { id: string; file: string; sha256: string; fields: Record<string, string> }

/** "- Key: value" lines; indented lines continue the previous value. */
export function parseConsentFields(md: string): Record<string, string> {
  const fields: Record<string, string> = {};
  let key: string | null = null;
  for (const line of md.split(/\r?\n/)) {
    const m = /^- ([^:]+):\s*(.*)$/.exec(line);
    if (m) { key = m[1].trim().toLowerCase(); fields[key] = m[2].trim(); continue; }
    if (key && /^\s+\S/.test(line)) fields[key] += ' ' + line.trim();
    else key = null;
  }
  return fields;
}

export function readConsent(consentsDir: string, id: string): Consent {
  if (!CONSENT_ID_RE.test(id)) throw new Error(`invalid consent id ${JSON.stringify(id)}`);
  const hits = existsSync(consentsDir) ? readdirSync(consentsDir).filter((f) => f.endsWith(`-${id}.md`)) : [];
  if (hits.length !== 1) throw new Error(`expected one consent record for ${id} in ${consentsDir}, found ${hits.length}`);
  const md = readFileSync(join(consentsDir, hits[0]), 'utf8');
  return { id, file: hits[0], sha256: digestText(md), fields: parseConsentFields(md) };
}

/** PI-08: the consent must still stand and cover this character and Kaggle processing. Returns reasons it fails. */
export function consentProblems(c: Consent, card: VoiceCard): string[] {
  const f = c.fields;
  const out: string[] = [];
  const withdrawn = f['withdrawn'];
  if (withdrawn && !/^(no|none|-)\b/i.test(withdrawn)) out.push(`consent ${c.id} is withdrawn (${withdrawn})`);
  if (!f['use']) out.push(`consent ${c.id} has no "Use:" line`);
  else if (!f['use'].toLowerCase().includes(card.name.toLowerCase())) out.push(`consent ${c.id} use does not name ${card.name}`);
  if (!/^agreed\b/i.test(f['processing by third parties'] ?? '')) out.push(`consent ${c.id} does not agree to third-party (Kaggle) processing`);
  if (!f['channels/platforms']) out.push(`consent ${c.id} has no "Channels/platforms:" line`);
  return out;
}
