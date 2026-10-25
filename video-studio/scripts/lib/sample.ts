// Props for the Phase 0 render proof (T006), built from fixtures/sample-positive-reinforcement.md
// and the brand bible. Always mode "sample": production commands refuse it.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import YAML from 'yaml';
import type { ShortProps } from '../../remotion/src/props.ts';
import { VS_ROOT } from './paths.ts';

export const SAMPLE_EPISODE_ID = '20261026-sample-positive-reinforcement';

/** Rows of the fixture's scene table: [scene, time, text]. */
export function fixtureRows(md: string): string[][] {
  return md.split('\n')
    .filter((l) => /^\|\s*\d+\s*\|/.test(l))
    .map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
}

export function brandProps(): ShortProps['brand'] & { cast: ShortProps['cast'] } {
  const b = YAML.parse(readFileSync(join(VS_ROOT, 'brand', 'brand-bible.yaml'), 'utf8'));
  const c = b.typography.captions;
  return {
    colors: {
      primary: b.colors.primary, primary_dark: b.colors.primary_dark, accent: b.colors.accent,
      background: b.colors.background, panel: b.colors.panel, ink: b.colors.ink,
    },
    safe_zone: b.format.safe_zone,
    captions: { size_px: c.size_px, line_height: c.line_height, max_words_per_line: c.max_words_per_line, max_lines: c.max_lines, stroke_px: c.stroke_px },
    font_file: 'fonts/NotoNastaliqUrdu-Regular.woff2',
    cast: { ustani: b.characters.ustani.display_name_ur, shagird: b.characters.shagird.display_name_ur },
  };
}

export function sampleProps(): ShortProps {
  const md = readFileSync(join(VS_ROOT, 'fixtures', 'sample-positive-reinforcement.md'), 'utf8');
  const rows = fixtureRows(md);
  const text = (scene: number) => rows.find((r) => Number(r[0]) === scene)?.[2];
  const hook = text(1);
  const beat = text(3);
  const cta = text(6);
  if (!hook || !beat || !cta) throw new Error('fixture table is missing scene 1, 3 or 6');
  const { cast, ...brand } = brandProps();
  return {
    mode: 'sample',
    episode_id: SAMPLE_EPISODE_ID,
    title_ur: 'مثبت تقویت',
    duration_s: 10,
    lines: [
      { id: 'L01', speaker: 'shagird', text_ur: hook, from_s: 0.3, to_s: 3.6 },
      { id: 'L02', speaker: 'ustani', text_ur: beat, from_s: 3.8, to_s: 7.8 },
    ],
    end_card: { url: 'https://textbook.com.pk', cta_ur: cta, seconds: 2 },
    audio: 'audio/test-tone.wav',
    cast,
    brand,
  };
}
