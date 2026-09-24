import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const target = '03722e930fdfbd7bcbbdebd8e8b4d366d0170a95c975366ef9626aa06939787b';
const commits = execSync('git reflog --all --format=%H', { encoding: 'utf8' })
  .split('\n').map((s) => s.trim()).filter(Boolean);
const unique = [...new Set(commits)];
console.log(`reflog commits: ${unique.length}`);
let found = false;
for (const c of unique) {
  let content = null;
  try {
    content = execSync(`git show ${c}:specs/content/gqur-300/content-spec.md`, { encoding: 'utf8', maxBuffer: 1024 * 1024 });
  } catch { continue; }
  const h = createHash('sha256').update(content).digest('hex');
  if (h === target) { console.log(`MATCH ${c}`); found = true; }
}
if (!found) console.log('no reflog commit matches the manifest digest for content-spec.md');
