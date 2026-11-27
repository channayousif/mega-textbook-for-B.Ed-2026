import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (p) => readFileSync(join(root, p), 'utf8');
const hec = JSON.parse(read('catalog/hec-curriculum.json'));
const catalog = JSON.parse(read('catalog/courses.json'));
const booklet = read('specs/hec-curriculum-2025/booklet.txt');
const squash = (s) => s.replace(/\s+/g, ' ').trim();
const pages = booklet.split('\f').map(squash);
const rows = Object.entries(hec.courses);
const crosswalk = new Map(
  read('specs/hec-curriculum-2025/crosswalk.md').split('\n')
    .map((l) => l.match(/^\| ([A-Z]+-\d+) \| (\d+) \| (\w+) \|\s*([\d, ]*?)\s*\|/))
    .filter(Boolean)
    .map((m) => [`${m[1]}#${m[2]}`, { status: m[3], units: m[4].split(',').map(Number).filter(Boolean) }]),
);
const unitDir = (code, n) => {
  const semesters = readdirSync(join(root, 'docs')).filter((d) => d.startsWith('semester-'));
  return semesters.map((s) => join(root, 'docs', s, code.toLowerCase(), `unit-${String(n).padStart(2, '0')}`));
};

describe('HEC curriculum reference', () => {
  it('has a row for every catalogued course', () => {
    const codes = catalog.semesters.flatMap((s) => s.courses.map((c) => c.code));
    expect(codes.filter((c) => !hec.courses[c])).toEqual([]);
  });

  it('points each row at the booklet page that names it', () => {
    for (const [code, row] of rows) {
      const page = pages[row.page + hec.document.pdf_page_offset - 1];
      // Three words: long titles wrap across table columns in the extracted text.
      const name = (row.clo_heading ?? row.hec_title.replace(/ \(.*$/, '').replace(/ - /g, ' – ')).split(' ').slice(0, 3).join(' ');
      expect(page, `${code} on printed page ${row.page}`).toContain(name);
    }
  });

  it('quotes every outcome verbatim', () => {
    const whole = squash(booklet);
    for (const [code, row] of rows) {
      for (const o of row.outcomes ?? []) expect(whole, code).toContain(o.text);
    }
  });

  it('agrees with the crosswalk, and shows only what it verified', () => {
    for (const [code, row] of rows) {
      (row.outcomes ?? []).forEach((o, i) => {
        const entry = crosswalk.get(`${code}#${i + 1}`);
        if (o.status === 'pending') {
          expect(entry, `${code} #${i + 1}`).toBeUndefined();
          return;
        }
        expect(entry, `${code} #${i + 1}`).toBeDefined();
        expect(o.status).toBe(entry.status);
        expect(o.units).toEqual(entry.units);
        if (o.status !== 'covered') return;
        expect(o.text_ur, `${code} #${i + 1} needs Urdu`).toBeTruthy();
        expect(o.units.length).toBeGreaterThan(0);
        for (const n of o.units) {
          expect(unitDir(code, n).some(existsSync), `${code} unit ${n}`).toBe(true);
        }
      });
    }
  });

  it('never claims the book is HEC-approved, and carries no em dash', () => {
    for (const p of ['catalog/hec-curriculum.json', 'src/components/HecCurriculumNotice.tsx']) {
      const text = read(p).split('\n').filter((l) => !l.includes(' * ')).join('\n');
      expect(/hec[- ]approved/i.test(text), p).toBe(false);
      expect(/[—―⸺⸻]/.test(text), p).toBe(false);
    }
  });

  it('keeps the published PDF outside the bound guide folder', () => {
    expect(existsSync(join(root, 'static', hec.document.pdf))).toBe(true);
    expect(read('.gitignore')).toContain('Scheme-and-Course-guides/EDUCATION 2025.pdf');
  });
});
