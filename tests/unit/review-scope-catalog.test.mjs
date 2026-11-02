import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { degreeCourseCodes } from '../../scripts/lib/review-catalog.mjs';

const catalog = JSON.parse(readFileSync('catalog/courses.json', 'utf8'));
const migration = readFileSync('supabase/migrations/0046_scoped_review_and_agent_jobs.sql', 'utf8');
const values = migration.match(/insert into public\.review_course_scopes\(course_code,track\) values([\s\S]*?);/)?.[1] ?? '';
const mapped = [...values.matchAll(/\('([^']+)','bed'\)/g)].map(m => m[1]).sort();
const current = degreeCourseCodes(catalog);

describe('review authorization course map', () => {
  it('seeds the current B.Ed catalog and syncs future additions from metadata', () => {
    // The 0046 seed is history: courses added later reach review_course_scopes through
    // `agent-job sync-catalog` (0048), not a migration per course. So every seeded code
    // must still be a catalog course, and the catalog may hold more than the seed.
    expect(mapped.length).toBeGreaterThan(0);
    expect(current).toEqual(expect.arrayContaining(mapped));
    const expanded = structuredClone(catalog);
    expanded.semesters[0].courses.push({ code: 'TEST-999' });
    expect(degreeCourseCodes(expanded)).toContain('TEST-999');
  });
  it('keeps the licence track free of course codes', () => {
    expect(catalog.tracks.find(t => t.id === 'licence')?.courses).toEqual([]);
  });
});
