/**
 * Feature 034 T020 (#807): which textbook pages have no Urdu file yet. Walks the three docs
 * instances (docs, guides, licence) and records each English source whose Urdu counterpart under
 * i18n/ur/<plugin dir>/current is missing, as global data. The doc page compares its own
 * metadata.source against the list to grey out the language toggle and show a callout. The
 * missing list (about 140 of 990 pages) is much smaller than the translated one.
 */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const INSTANCES = [
  ['docs', 'docusaurus-plugin-content-docs'],
  ['guides', 'docusaurus-plugin-content-docs-guides'],
  ['licence', 'docusaurus-plugin-content-docs-licence'],
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.mdx?$/.test(name) && !name.startsWith('_')) out.push(p);
  }
  return out;
}

export function missingUrdu(siteDir) {
  const missing = [];
  for (const [path, pluginDir] of INSTANCES) {
    const root = join(siteDir, path);
    if (!existsSync(root)) continue;
    for (const file of walk(root)) {
      const rel = relative(root, file);
      if (!existsSync(join(siteDir, 'i18n', 'ur', pluginDir, 'current', rel))) missing.push(`${path}/${rel}`);
    }
  }
  return missing.sort();
}

export default function urduPagesPlugin(context) {
  return {
    name: 'urdu-pages',
    async loadContent() { return missingUrdu(context.siteDir); },
    async contentLoaded({ content, actions }) { actions.setGlobalData({ missing: content }); },
  };
}
