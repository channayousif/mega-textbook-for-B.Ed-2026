const fs = require('fs');
const file = 'catalog/licence-redirects.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

for (const r of data.redirects) {
  if (r.to.endsWith('/practice/')) {
    r.to = '/app/licence/practice/';
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
