const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (/\.(js|jsx)$/.test(file)) files.push(file);
  }
}
walk(path.join(root, 'src'));
const missing = [];
for (const file of files) {
  for (const [, spec] of fs.readFileSync(file, 'utf8').matchAll(/(?:from\s*|import\s*|import\(\s*)['"]([^'"]+)['"]/g)) {
    if (!spec.startsWith('.') && !spec.startsWith('@/')) continue;
    const base = spec.startsWith('@/') ? path.join(root, 'src', spec.slice(2)) : path.resolve(path.dirname(file), spec);
    if (![base, base + '.js', base + '.jsx', base + '.css', path.join(base, 'index.js'), path.join(base, 'index.jsx')].some(f => fs.existsSync(f) && fs.statSync(f).isFile())) {
      missing.push(`${path.relative(root, file)}: ${spec}`);
    }
  }
}
if (missing.length) { console.error(missing.join('\n')); process.exitCode = 1; }
else console.log(`All local imports resolve (${files.length} source files).`);
