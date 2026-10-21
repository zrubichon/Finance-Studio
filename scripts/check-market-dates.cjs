// Regression: provider dates must not crash the dashboard during a refresh.
// Run: node scripts/check-market-dates.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');

function load(source, mocks = {}) {
  const module = {exports: {}};
  const compiled = ts.transpileModule(source, {compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
  }}).outputText;
  vm.runInNewContext(compiled, {module, exports: module.exports,
    require: name => name in mocks ? mocks[name] : require(name),
    console, Intl, Date, Map, Number, Array,
  });
  return module.exports;
}
const dates = load(fs.readFileSync('lib/market-periods.ts', 'utf8'));
for (const value of [null, undefined, '', 'not-a-date', '2026-02-30', '2025-02-29', '2026-13-01', '2026-10-20T99:00:00Z']) {
  assert.equal(dates.observationDate(value), null);
  assert.equal(dates.formatObservationDate(value, 'fr-FR'), '—');
}
assert.equal(dates.observationDate('2024-02-29'), '2024-02-29');
assert.equal(dates.observationDate('2026-10-20T23:30:00-04:00'), '2026-10-20');
assert.equal(dates.observationDate(' 2026-10-20 '), '2026-10-20');
assert.equal(dates.marketHistory([null, {}, {date:'bad', value:2}, {date:'2026-10-20', value:Infinity}]).length, 0);
const observations = [
  {date:'2026-10-16', value:100},
  {date:'2026-10-20T00:00:00Z', value:103},
  {date:'2026-10-20T12:00:00Z', value:104},
  {date:'2026-10-19-bad', value:999},
];
assert.deepEqual(JSON.parse(JSON.stringify(dates.marketHistory(observations))), [
  {date:'2026-10-16', value:100}, {date:'2026-10-20', value:104},
]);
assert.equal(dates.periodMove(observations, 'week', '', '2026-10-21').delta, 4);
assert.equal(dates.periodMove(observations, 'week', '%', '2026-10-21').delta, 400);
assert.equal(dates.periodMove(observations, 'week', 'bps', '2026-10-21').delta, 4);
assert.equal(dates.periodMove([{date:'2026-10-20', value:104}], 'week', '', '2026-10-21'), null);

const source = fs.readFileSync('components/market-panorama.tsx', 'utf8');
let french = false;
const Panorama = load(source, {
  './market-category-guide': () => null,
  'next/link': ({children, ...props}) => React.createElement('a', props, children),
  './language-provider': {useLanguage: () => ({isFrench:french, text:(en,fr)=>french?fr:en})},
  '@/lib/market-periods': dates,
}).default;
for (french of [false, true]) {
  for (const history of [observations, [{date:'2026-10-19-bad',value:999}], [null, {}, ...observations]]) {
    assert.doesNotThrow(() => {
      const html = renderToStaticMarkup(React.createElement(Panorama, {quotes:[{
        id:'regression', label:'Regression index', category:'Equities', unit:'',
        value:104, asOf:'2026-10-20', history,
      }], compact:true}));
      assert.ok(!html.includes('Invalid Date'));
      assert.ok(html.includes('Regression index'));
    }, 'Market refresh must render safely with timestamp, missing or invalid observation dates');
  }
}
console.log('Market date regression checks passed: dates, deduplication, price/rate/spread moves, EN/FR dashboard rendering.');
