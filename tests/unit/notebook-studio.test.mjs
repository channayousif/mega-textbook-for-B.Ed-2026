import { describe, it, expect } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanReport, hasForbiddenSection } from '../../scripts/notebook-studio/postprocess-report.mjs';
import { normaliseMindMap, posterFrom } from '../../scripts/notebook-studio/ingest.mjs';
import { checkStudio } from '../../scripts/check-studio-manifest.mjs';
import { buildStudioIndex } from '../../scripts/build-studio-index.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

describe('cleanReport', () => {
  const md = [
    '# Study guide',
    '## Key concepts',
    'Attention \u2014 the gateway `encoding` [3].',
    '## Short-Answer Practice Questions',
    '1. Define attention.',
    '### Answer Key & Explanations',
    'SECRET',
    '## Essay Prompts & Rubrics',
    'RUBRIC',
    '## Glossary',
    'Perception: interpretation.',
  ].join('\n');
  const { markdown, removedSections } = cleanReport(md);

  it('removes answer-key, practice-question and rubric sections with their bodies', () => {
    expect(markdown).not.toMatch(/SECRET|RUBRIC|Practice Questions|Answer Key|Essay/);
    expect(removedSections).toBe(2);
    expect(markdown).toContain('## Glossary');
  });

  it('replaces long dashes, unwraps code ticks and drops citation markers', () => {
    expect(markdown).toContain('Attention - the gateway encoding.');
    expect(markdown).not.toMatch(/[\u2014`]|\[3\]/);
  });

  it('drops fenced ASCII diagrams but keeps the text around them', () => {
    const { markdown: out } = cleanReport('Before.\n\n```\n  [ BEAM ]\n /      \\\n```\n\nAfter.\n');
    expect(out).not.toMatch(/BEAM|```/);
    expect(out).toContain('Before.');
    expect(out).toContain('After.');
  });

  it('hasForbiddenSection flags a report that was not cleaned', () => {
    expect(hasForbiddenSection(md)).toBe(true);
    expect(hasForbiddenSection(markdown)).toBe(false);
  });
});

describe('ingest helpers', () => {
  it('normaliseMindMap applies label fixes and keeps the tree', () => {
    const tree = normaliseMindMap({ name: 'Root', children: [{ name: 'Old \u2014 label' }] }, { 'Old \u2014 label': 'New label' });
    expect(tree).toEqual({ label: 'Root', children: [{ label: 'New label', children: [] }] });
  });

  it('posterFrom flattens the poster and strips long dashes', () => {
    const p = posterFrom({ title: 'T', tagline: 'a \u2014 b', poster: { key_terms: [], mnemonics: [] }, slides: [] });
    expect(p).toEqual({ title: 'T', tagline: 'a - b', key_terms: [], mnemonics: [] });
  });
});

describe('check-studio-manifest', () => {
  it('passes on the repository as committed', () => {
    expect(checkStudio(ROOT)).toEqual([]);
  });

  it('rejects a placed row without review, an asset with a long dash, and a quiz answer field', () => {
    const root = mkdtempSync(join(tmpdir(), 'studio-'));
    mkdirSync(join(root, 'specs', 'studio', 'efmp-301'), { recursive: true });
    cpSync(join(ROOT, 'specs', 'studio', 'studio-manifest.schema.json'), join(root, 'specs', 'studio', 'studio-manifest.schema.json'));
    const assetDir = join(root, 'static', 'studio', 'efmp-301', 'unit-04', 'topic-01');
    mkdirSync(assetDir, { recursive: true });
    writeFileSync(join(assetDir, 'brief.en.md'), '# Brief\n\nA \u2014 B\n');
    writeFileSync(join(assetDir, 'quiz.en.json'), '{"correct_option":"a"}');
    const row = { topic: 1, locale: 'en', kind: 'brief', status: 'placed', title: 'Brief', prompt_ref: 'specs/studio/prompts/report.md v1', asset_path: '/studio/efmp-301/unit-04/topic-01/brief.en.md' };
    writeFileSync(join(root, 'specs', 'studio', 'efmp-301', 'unit-04.json'), JSON.stringify({ course: 'efmp-301', unit: 4, notebook_id: 'nb-12345678', artifacts: [row] }));
    const missingReview = checkStudio(root);
    expect(missingReview.join('\n')).toMatch(/must have required property 'review'/);
    row.review = { by: 'Claude (agent)', date: '2026-11-09', verdict: 'pass' };
    row.alt = 'A brief.';
    writeFileSync(join(root, 'specs', 'studio', 'efmp-301', 'unit-04.json'), JSON.stringify({ course: 'efmp-301', unit: 4, notebook_id: 'nb-12345678', artifacts: [row] }));
    const findings = checkStudio(root).join('\n');
    expect(findings).toMatch(/long dash/);
    expect(findings).toMatch(/quiz answer field/);
  });
});

describe('buildStudioIndex', () => {
  it('keeps only placed rows, groups by topic and locale, orders audio parts', () => {
    const index = buildStudioIndex([{ course: 'efmp-301', unit: 4, artifacts: [
      { topic: 1, locale: 'en', kind: 'audio', part: 2, status: 'placed', title: 'B', alt: 'b', host_url: 'https://x/2' },
      { topic: 1, locale: 'en', kind: 'audio', part: 1, status: 'placed', title: 'A', alt: 'a', host_url: 'https://x/1' },
      { topic: 1, locale: 'ur', kind: 'poster', status: 'reviewed', title: 'P', asset_path: '/studio/x.json' },
    ] }]);
    expect(Object.keys(index)).toEqual(['efmp-301/4/1']);
    expect(index['efmp-301/4/1'].en.map((i) => i.part)).toEqual([1, 2]);
    expect(index['efmp-301/4/1'].ur).toEqual([]);
  });
});

import { studioMarkdownToHtml } from '../../src/lib/studioMarkdown.ts';

describe('studioMarkdownToHtml', () => {
  it('escapes HTML before formatting, so asset text can never inject markup', () => {
    const html = studioMarkdownToHtml('Hello <script>alert(1)</script> **bold**');
    expect(html).toBe('<p>Hello &lt;script&gt;alert(1)&lt;/script&gt; <strong>bold</strong></p>');
  });

  it('renders headings one level down, lists, rules and pipe tables', () => {
    const html = studioMarkdownToHtml('# Title\n\n* one\n* two\n\n---\n\n| Term | Meaning |\n| :--- | :--- |\n| **attention** | selection |\n');
    expect(html).toContain('<h2>Title</h2>');
    expect(html).toContain('<ul><li>one</li><li>two</li></ul>');
    expect(html).toContain('<hr>');
    expect(html).toContain('<th>Term</th>');
    expect(html).toContain('<td><strong>attention</strong></td>');
  });

  it('renders every committed Studio text asset without leaking raw markdown table rows', async () => {
    const { readdirSync, readFileSync } = await import('node:fs');
    const dir = join(ROOT, 'static', 'studio', 'efmp-301', 'unit-04', 'topic-01');
    for (const f of readdirSync(dir).filter((n) => n.endsWith('.md'))) {
      const html = studioMarkdownToHtml(readFileSync(join(dir, f), 'utf8'));
      expect(html, f).not.toMatch(/<p>\|/);
      expect(html.length, f).toBeGreaterThan(500);
    }
  });
});

describe('studio media hosts (owner ruling 2026-11-09)', async () => {
  const { youtubeId, youtubeEmbed, isYouTubeMusic, driveEmbed } = await import('../../src/lib/studioMedia.ts');
  it('reads YouTube and YouTube Music ids from the usual URL shapes', () => {
    for (const u of ['https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=3', 'https://youtu.be/dQw4w9WgXcQ', 'https://music.youtube.com/watch?v=dQw4w9WgXcQ&feature=share', 'https://m.youtube.com/shorts/dQw4w9WgXcQ']) {
      expect(youtubeId(u)).toBe('dQw4w9WgXcQ');
    }
    expect(youtubeEmbed('https://youtu.be/dQw4w9WgXcQ')).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0');
    expect(isYouTubeMusic('https://music.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
  });
  it('rejects other hosts, plain http and malformed ids', () => {
    for (const u of ['http://youtu.be/dQw4w9WgXcQ', 'https://evil.com/watch?v=dQw4w9WgXcQ', 'https://youtube.com/watch?v=short', 'not a url']) expect(youtubeEmbed(u)).toBeNull();
  });
  it('maps Google Slides to /embed and Drive files to /preview', () => {
    const id = '1AbCdEfGhIjKlMnOpQrStUvWxYz012345';
    expect(driveEmbed(`https://docs.google.com/presentation/d/${id}/edit?usp=sharing`)).toBe(`https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false`);
    expect(driveEmbed(`https://drive.google.com/file/d/${id}/view?usp=sharing`)).toBe(`https://drive.google.com/file/d/${id}/preview`);
    expect(driveEmbed('https://dropbox.com/s/x')).toBeNull();
  });
  it('the manifest schema accepts only these hosts per kind', () => {
    const base = { topic: 1, locale: 'en', status: 'planned', title: 'Brief', prompt_ref: 'specs/studio/prompts/audio.md' };
    const v = (row) => validateRow({ course: 'efmp-301', unit: 4, notebook_id: 'abcdefgh', artifacts: [row] });
    expect(v({ ...base, kind: 'audio', host_url: 'https://music.youtube.com/watch?v=dQw4w9WgXcQ' })).toBe(true);
    expect(v({ ...base, kind: 'video', host_url: 'https://youtu.be/dQw4w9WgXcQ' })).toBe(true);
    expect(v({ ...base, kind: 'audio', host_url: 'https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz012345/view' })).toBe(false);
    expect(v({ ...base, kind: 'slides', host_url: 'https://docs.google.com/presentation/d/1AbCdEfGhIjKlMnOpQrStUvWxYz012345/edit' })).toBe(true);
    expect(v({ ...base, kind: 'slides', host_url: 'https://youtu.be/dQw4w9WgXcQ' })).toBe(false);
  });
});

async function loadValidator() {
  const { default: Ajv2020 } = await import('ajv/dist/2020.js');
  const { default: addFormats } = await import('ajv-formats');
  const { readFileSync } = await import('node:fs');
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  return ajv.compile(JSON.parse(readFileSync(join(ROOT, 'specs/studio/studio-manifest.schema.json'), 'utf8')));
}
const validateRow = await loadValidator();
