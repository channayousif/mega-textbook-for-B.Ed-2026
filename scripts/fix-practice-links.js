const fs = require('fs');
const glob = require('glob');

const files = glob.sync('{licence/pedagogy/*/index.mdx,i18n/ur/docusaurus-plugin-content-docs-licence/current/pedagogy/*/index.mdx}');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace links like (/licence/pedagogy/a-methods-and-foundations/practice)
  content = content.replace(/\(\/licence\/pedagogy\/([a-z-]+)\/practice\/?\)/g, '(/app/licence/practice?unit=$1)');
  
  // Some Urdu links might point to /ur/licence...
  content = content.replace(/\(\/ur\/licence\/pedagogy\/([a-z-]+)\/practice\/?\)/g, '(/app/licence/practice?unit=$1)');

  fs.writeFileSync(file, content);
}
console.log('Fixed links in ' + files.length + ' files');
