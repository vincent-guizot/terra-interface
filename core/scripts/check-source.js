import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : file.endsWith('.js') ? [file] : [];
  });
}
const files = ['src', 'tests', 'scripts', 'prisma/seeders'].flatMap(dir => walk(path.join(root, dir)));
for (const file of files) {
  execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  if (/\brequire\s*\(|\bmodule\.exports\b|\bexports\./.test(fs.readFileSync(file, 'utf8'))) {
    throw new Error(`${file}: CommonJS syntax is not supported in this ESM package`);
  }
  for (const [, spec] of fs.readFileSync(file, 'utf8').matchAll(/(?:from\s*|import\s*|import\(\s*)['"](\.[^'"]+)['"]/g)) {
    if (!fs.existsSync(path.resolve(path.dirname(file), spec))) throw new Error(`${file}: missing import ${spec}`);
  }
}
console.log(`JavaScript syntax and local imports verified (${files.length} files).`);
