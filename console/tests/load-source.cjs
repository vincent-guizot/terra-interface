const path = require('node:path');
const Module = require('node:module');
const { buildSync } = require('esbuild');
const root = path.resolve(__dirname, '..');

module.exports = function load(source) {
  const result = buildSync({
    stdin: { contents: source, resolveDir: root, loader: 'jsx' },
    bundle: true, platform: 'node', format: 'cjs', write: false,
    packages: 'external', alias: { '@': path.join(root, 'src') },
    loader: { '.js': 'jsx' }, define: { 'import.meta': '{}' },
  });
  const module = new Module(path.join(root, 'source-test.cjs'));
  module.filename = path.join(root, 'source-test.cjs');
  module.paths = Module._nodeModulePaths(root);
  module._compile(result.outputFiles[0].text, module.filename);
  return module.exports;
};
