// Validate episode.json and script.json against the VS-001 contracts (T005).
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { VS_ROOT } from './paths.ts';

const CONTRACTS = join(VS_ROOT, 'specs', '001-urdu-shorts-pipeline', 'contracts');
const load = (name: string) => JSON.parse(readFileSync(join(CONTRACTS, name), 'utf8'));

// ajv ships CommonJS; under Node ESM the default import is either the class or its namespace.
const AjvClass = ((Ajv2020 as any).default ?? Ajv2020) as typeof Ajv2020;
const formats = ((addFormats as any).default ?? addFormats) as typeof addFormats;
const ajv = new AjvClass({ allErrors: true, strict: false });
formats(ajv);
const validators = {
  episode: ajv.compile(load('episode.schema.json')),
  script: ajv.compile(load('script.schema.json')),
};

export type Contract = keyof typeof validators;

export function validate(kind: Contract, data: unknown): { ok: boolean; errors: string[] } {
  const v = validators[kind];
  const ok = v(data) as boolean;
  const errors = (v.errors ?? []).map((e: { instancePath: string; message?: string }) => `${e.instancePath || '/'} ${e.message}`);
  return { ok, errors };
}

export function assertValid(kind: Contract, data: unknown): void {
  const { ok, errors } = validate(kind, data);
  if (!ok) throw new Error(`${kind} failed its contract:\n  ${errors.join('\n  ')}`);
}
