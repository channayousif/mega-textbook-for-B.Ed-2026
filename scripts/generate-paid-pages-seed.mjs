import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const pages = [
  'a-methods-and-foundations',
  'b-child-dev-and-ed-psych',
  'c-classroom-management',
  'd-assessment-and-test-dev',
  'e-school-community-teacher'
];

let sql = `-- 0051_seed_licence_practice_pages.sql\n\n`;

for (const page of pages) {
  const id = `pedagogy/${page}`;
  
  // English
  const enPath = join('licence', 'pedagogy', page, 'practice.mdx');
  try {
    const enContent = readFileSync(enPath, 'utf8');
    sql += `INSERT INTO public.paid_pages (id, locale, content) VALUES ('${id}', 'en', $dollar$${enContent}$dollar$) ON CONFLICT (id, locale) DO UPDATE SET content = EXCLUDED.content;\n`;
  } catch (e) {
    console.error(`Failed to read ${enPath}:`, e.message);
  }

  // Urdu
  const urPath = join('i18n', 'ur', 'docusaurus-plugin-content-docs-licence', 'current', 'pedagogy', page, 'practice.mdx');
  try {
    const urContent = readFileSync(urPath, 'utf8');
    sql += `INSERT INTO public.paid_pages (id, locale, content) VALUES ('${id}', 'ur', $dollar$${urContent}$dollar$) ON CONFLICT (id, locale) DO UPDATE SET content = EXCLUDED.content;\n`;
  } catch (e) {
    console.error(`Failed to read ${urPath}:`, e.message);
  }
}

writeFileSync('supabase/migrations/0051_seed_licence_practice_pages.sql', sql);
console.log('Seed migration created.');
