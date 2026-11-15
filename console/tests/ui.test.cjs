const test = require('node:test');
const assert = require('node:assert/strict');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const load = require('./load-source.cjs');

const ui = load(`
export * from './src/components/ui/card.jsx';
export * from './src/components/ui/button.jsx';
export * from './src/components/ui/input.jsx';
export * from './src/components/ui/textarea.jsx';
export * from './src/components/ui/table.jsx';
export * from './src/components/ui/tooltip.jsx';
export { default as DataSourceBadge } from './src/components/ui/DataSourceBadge.js';
export * from './src/helpers/presentation.js';
export * from './src/helpers/aquaculture.js';
`);

test('shadcn primitives forward native form and table semantics', () => {
  const html = renderToStaticMarkup(React.createElement(ui.Card, null,
    React.createElement(ui.Input, { id: 'quantity', type: 'number', disabled: true, 'aria-label': 'Quantity' }),
    React.createElement(ui.Textarea, { 'aria-label': 'Notes', defaultValue: 'Seed notes' }),
    React.createElement(ui.Button, { type: 'submit', disabled: true }, 'Save'),
    React.createElement(ui.Table, null,
      React.createElement(ui.TableHeader, null, React.createElement(ui.TableRow, null, React.createElement(ui.TableHead, { scope: 'col' }, 'Item'))),
      React.createElement(ui.TableBody, null, React.createElement(ui.TableRow, null, React.createElement(ui.TableCell, null, 'Seed')))),
  ));
  assert.match(html, /type="number"/);
  assert.match(html, /aria-label="Quantity"/);
  assert.match(html, /<button[^>]*disabled/);
  assert.match(html, /<th[^>]*scope="col"/);
  assert.match(html, /<textarea[^>]*>Seed notes<\/textarea>/);
});

test('data-source badge keeps source labels and is keyboard focusable', () => {
  const html = renderToStaticMarkup(React.createElement(ui.TooltipProvider, null,
    React.createElement(ui.DataSourceBadge, { source: 'live', lastUpdated: 'Now', showIcon: false })));
  assert.match(html, /LIVE/);
  assert.match(html, /Now/);
  assert.match(html, /tabindex="0"/);
  assert.doesNotMatch(html, /<svg/);
});

test('extracted presentation helpers preserve status and flow styles', () => {
  assert.equal(ui.getStatusColor('ACTIVE').text, '#065F46');
  assert.equal(ui.getFlowTypeColor('ACTUAL').text, '#065F46');
  assert.equal(ui.getFlowTypeColor('PLANNED').text, '#0369A1');
});

test('water-quality calculations do not share mutable alerts between readings', () => {
  const first = ui.getWaterQualityAlerts({ dissolvedOxygenMgL: 3, pH: 9, ammoniaPpm: 1 });
  const second = ui.getWaterQualityAlerts({ dissolvedOxygenMgL: 6, pH: 7, ammoniaPpm: 0.1 });
  assert.equal(first.length, 3);
  assert.deepEqual(second, []);
  assert.notEqual(first, second);
});
