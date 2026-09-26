import { readFileSync } from 'node:fs';
const r = JSON.parse(readFileSync(process.argv[2] || '/tmp/fig-geometry.json', 'utf8'));
for (const [fig, d] of Object.entries(r)) {
  if (!d.overprints.length) continue;
  console.log('=== ' + fig + ' (' + d.overprints.length + ') ===');
  for (const o of d.overprints) console.log('  ' + o.a + '  <->  ' + o.b + '  [' + o.overlap + ']');
}
