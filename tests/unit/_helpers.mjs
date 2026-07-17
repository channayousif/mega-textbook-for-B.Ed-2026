/**
 * Shared helpers for validator fixture tests.
 * Builds a minimal valid EN+UR golden-unit tree in a temp dir, then lets each
 * test mutate it and assert the validator's exit code.
 */
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const VALIDATOR = join(REPO, 'scripts', 'validate-content.mjs');

const UNIT_FILES = ['index.mdx', 'activities.mdx', 'formative.mdx', 'summative.mdx', 'teacher-notes.mdx'];

function fm(extra = {}) {
  const base = {
    title: 'Unit 1',
    course_code: 'EFMP-301',
    unit_no: 1,
    clo_refs: ['SLO:EFMP-301-1-1'],
    blooms_summary: 'Understand and apply.',
    est_reading_minutes: 5,
    translation_status: 'reviewed',
    ...extra,
  };
  const lines = ['---'];
  for (const [k, v] of Object.entries(base)) {
    if (Array.isArray(v)) {
      lines.push(`${k}:`);
      for (const item of v) lines.push(`  - "${item}"`);
    } else if (v && typeof v === 'object') {
      lines.push(`${k}:`);
      for (const [sk, sv] of Object.entries(v)) lines.push(`  ${sk}: ${sv}`);
    } else if (typeof v === 'string') {
      lines.push(`${k}: "${v}"`);
    } else {
      lines.push(`${k}: ${v}`);
    }
  }
  lines.push('---');
  return lines.join('\n') + '\n';
}

/** Body with a fixed heading vector [1,2,2] used identically for EN and UR. */
function body(glossaryRef = false) {
  const g = glossaryRef ? '\n<Glossary term="Educational Psychology">x</Glossary>\n' : '';
  return `\n# Heading${g}\n\n## Sub A\n\ntext\n\n## Sub B\n\ntext\n`;
}

/**
 * Build a valid content tree. `opts.overrides[file]` merges front-matter for that
 * EN file; `opts.omitUr` skips the UR mirror; `opts.glossary` overrides glossary.json.
 */
export function makeFixture(opts = {}) {
  const root = mkdtempSync(join(tmpdir(), 'bed-fixture-'));
  const enDir = join(root, 'docs', 'semester-1', 'efmp-301', 'unit-01');
  const urDir = join(root, 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current', 'semester-1', 'efmp-301', 'unit-01');
  mkdirSync(enDir, { recursive: true });
  if (!opts.omitUr) mkdirSync(urDir, { recursive: true });

  const overrides = opts.overrides || {};
  for (const f of UNIT_FILES) {
    const useGlossary = f === 'index.mdx' && opts.glossaryRef;
    writeFileSync(join(enDir, f), fm(overrides[f] || {}) + body(useGlossary));
    if (!opts.omitUr) {
      const urBody = opts.urBodyOverride && opts.urBodyOverride[f] ? opts.urBodyOverride[f] : body(useGlossary);
      writeFileSync(join(urDir, f), fm(overrides[f] || {}) + urBody);
    }
  }

  const glossary = opts.glossary ?? [
    { term: 'Educational Psychology', definition_en: 'en def', definition_ur: 'ur def' },
  ];
  writeFileSync(join(root, 'glossary.json'), JSON.stringify(glossary));
  return { root, enDir, urDir };
}

export function runValidator(root) {
  const res = spawnSync('node', [VALIDATOR], {
    env: { ...process.env, CONTENT_ROOT: root },
    encoding: 'utf8',
  });
  return { code: res.status, out: (res.stdout || '') + (res.stderr || '') };
}

export function cleanup(root) {
  rmSync(root, { recursive: true, force: true });
}
