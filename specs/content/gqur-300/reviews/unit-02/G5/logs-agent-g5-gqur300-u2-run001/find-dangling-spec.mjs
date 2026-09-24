import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const targets = new Set([
  '03722e930fdfbd7bcbbdebd8e8b4d366d0170a95c975366ef9626aa06939787b',
  '97b6ae242cace5897e89f08f1b58219b2291ac31ce4e6bc36221750e536766e1',
]);
const lines = execSync('git fsck --no-reflogs --dangling 2>/dev/null', { encoding: 'utf8', maxBuffer: 1024 * 1024 })
  .split('\n').filter((l) => l.includes('dangling commit'));
console.log(`dangling commits: ${lines.length}`);
for (const line of lines) {
  const c = line.trim().split(' ').pop();
  let content = null;
  try {
    content = execSync(`git show ${c}:specs/content/gqur-300/content-spec.md`, { encoding: 'utf8', maxBuffer: 1024 * 1024 });
  } catch { continue; }
  const h = createHash('sha256').update(content).digest('hex');
  if (targets.has(h)) console.log(`MATCH ${h.slice(0, 8)} ${c}`);
}
console.log('done');
