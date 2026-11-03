import { describe, it, expect } from 'vitest';
import { buildNavLevels, firstHref } from '../../src/lib/navCrumbs.ts';

const topic11 = { type: 'link', label: 'Topic 1.1 · A', href: '/s3/efmp-406/unit-01/topic-01' };
const topic12 = { type: 'link', label: 'Topic 1.2 · B', href: '/s3/efmp-406/unit-01/topic-02', className: 'sidebar-item--en' };
const unit1 = { type: 'category', label: 'Unit 1 · Literacy', href: '/s3/efmp-406/unit-01', items: [topic11, topic12] };
const unit2 = { type: 'category', label: 'Unit 2 · Reading', items: [{ type: 'link', label: 'Topic 2.1', href: '/s3/efmp-406/unit-02/topic-01' }] };
const overview = { type: 'link', label: 'Course overview', href: '/s3/efmp-406/course-overview' };
const course = { type: 'category', label: 'EFMP-406 · Literacy', items: [overview, unit1, unit2] };
const otherCourse = { type: 'category', label: 'GISS-401 · Islamic Studies', items: [{ type: 'link', label: 'Course overview', href: '/s3/giss-401/course-overview' }] };
const sem3 = { type: 'category', label: 'Semester 3', items: [course, otherCourse] };
const emptySem = { type: 'category', label: 'Semester 5', items: [] };
const intro = { type: 'link', label: 'Mega Textbook', href: '/intro' };
const root = [intro, sem3, emptySem];

describe('firstHref', () => {
  it('prefers a category link, else descends to the first child link', () => {
    expect(firstHref(unit1)).toBe('/s3/efmp-406/unit-01');
    expect(firstHref(unit2)).toBe('/s3/efmp-406/unit-02/topic-01');
    expect(firstHref(course)).toBe('/s3/efmp-406/course-overview');
    expect(firstHref(emptySem)).toBeUndefined();
  });

  it('skips an unlisted category link', () => {
    expect(firstHref({ ...unit1, linkUnlisted: true })).toBe('/s3/efmp-406/unit-01/topic-01');
  });
});

describe('buildNavLevels', () => {
  const levels = buildNavLevels(root, [sem3, course, unit1, topic12]);

  it('yields one level per breadcrumb with the current item marked', () => {
    expect(levels.map((l) => l.label)).toEqual(['Semester 3', 'EFMP-406 · Literacy', 'Unit 1 · Literacy', 'Topic 1.2 · B']);
    expect(levels.map((l) => l.current)).toEqual([1, 0, 1, 1]);
  });

  it('lists siblings and drops empty categories and html items', () => {
    expect(levels[0].options.map((o) => o.label)).toEqual(['Mega Textbook', 'Semester 3']);
    expect(levels[2].options.map((o) => o.href)).toEqual([
      '/s3/efmp-406/course-overview',
      '/s3/efmp-406/unit-01',
      '/s3/efmp-406/unit-02/topic-01',
    ]);
  });

  it('carries the English-fallback marker for Urdu pages', () => {
    expect(levels[3].options.map((o) => o.english)).toEqual([false, true]);
  });

  it('falls back to href matching when references differ', () => {
    const [level] = buildNavLevels(root, [{ ...intro }]);
    expect(level.current).toBe(0);
  });
});
