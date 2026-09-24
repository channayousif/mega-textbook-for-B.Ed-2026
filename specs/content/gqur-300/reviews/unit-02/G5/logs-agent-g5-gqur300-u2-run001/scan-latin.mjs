import { readFileSync, readdirSync } from 'node:fs';

const dir = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02';
const allowed = new Set([
  'GQUR', 'MCQ', 'MCQs', 'RRQ', 'RRQs', 'ERQ', 'ERQs', 'NCC', 'OpenStax',
  'Marecek', 'Anthony', 'Smith', 'Mathis', 'Prealgebra', 'Ch', 'Percents',
  'Ratios', 'Rate', 'Simplify', 'Use', 'Square', 'Roots', 'Math', 'Models',
  'Geometry', 'Gula', 'Lovric', 'Canadian', 'Journal', 'Science', 'Mathematics',
  'Technology', 'Education', 'National', 'Curriculum', 'Council', 'Ministry',
  'Federal', 'Professional', 'Training', 'Government', 'Pakistan', 'Suggested',
  'Guidelines', 'Grades', 'Progression', 'Grid', 'Remember', 'Understand',
  'Apply', 'Analyze', 'Evaluate', 'sqrt', 'Glossary', 'PrintHandout',
  'TranslationStatusBadge', 'Figure', 'term', 'status', 'import', 'from',
  'course', 'code', 'unit', 'no', 'topic', 'label', 'clo', 'refs', 'SLO',
  'blooms', 'summary', 'est', 'reading', 'minutes', 'translation', 'draft',
  'title', 'description', 'id', 'src', 'alt', 'https', 'eric', 'ed', 'gov',
  'doi', 'org', 'openstax', 'ncc', 'pk', 'Detail', 'EJ', 'www', 'com', 'bat',
  'tutors',
]);
for (const f of readdirSync(dir).sort()) {
  const lines = readFileSync(`${dir}/${f}`, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const tokens = line.match(/[A-Za-z][A-Za-z0-9'.\-]*/g) || [];
    for (const t of tokens) {
      const clean = t.replace(/[^A-Za-z]/g, '');
      if (clean && !allowed.has(clean) && !/^\d/.test(clean)) {
        console.log(`${f}:${i + 1}: ${t}`);
      }
    }
  });
}
console.log('scan done');
