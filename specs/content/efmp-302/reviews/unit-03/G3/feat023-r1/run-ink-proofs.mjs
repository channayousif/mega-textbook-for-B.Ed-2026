import { execFileSync } from 'node:child_process';
import { createWriteStream } from 'node:fs';

const cases = [
  ['fig-U3-7.svg', 'held, and not established as a', 'Saying "take your time" while'],
  ['fig-U3-7.svg', 'definitions,', 'instructions,'],
  ['fig-U3-2.svg', 'Effectiveness is a bundle of', 'Each leaf names how it is'],
  ['fig-U3-9.svg', 'still expected to instruct - while', 'That accumulation, not any single'],
  ['fig-U3-6.svg', 'nameable.', 'Escalation is an outcome, not a'],
  ['fig-U3-5.svg', 'the relationship is FOR, not with', 'A relationship that achieves none'],
  ['fig-U3-4.svg', 'seriously', 'Changed in: a day'],
  ['fig-U3-3.svg', 'Adaptability', 'The dashed column is the part'],
];
const out = createWriteStream('specs/content/efmp-302/reviews/unit-03/G3/logs-feat023-r1/ink-collision.log');
for (const [fig, a, b] of cases) {
  out.write(`\n===== ${fig}: "${a}" vs "${b}" =====\n`);
  const r = execFileSync('node', ['specs/content/efmp-302/reviews/unit-03/G3/feat023-r1/ink-collision.mjs', `static/img/figures/efmp-302/unit-03/${fig}`, a, b], { encoding: 'utf8' });
  out.write(r);
  process.stdout.write(`done ${fig}: ${a.slice(0, 25)}\n`);
}
out.end();
console.log('log written');
