// Regression: provider dates must not crash the dashboard during a refresh.
// Run: node scripts/check-market-dates.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');

function load(source, mocks = {}, globals = {}) {
  const module = {exports: {}};
  const compiled = ts.transpileModule(source, {compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
  }}).outputText;
  vm.runInNewContext(compiled, {module, exports: module.exports,
    require: name => name in mocks ? mocks[name] : require(name),
    console, Intl, Date, Map, Number, Array, ...globals,
  });
  return module.exports;
}
const dates = load(fs.readFileSync('lib/market-periods.ts', 'utf8'));
const {parseFredCsv} = load(fs.readFileSync('lib/providers/fred-csv.ts', 'utf8'), {'@/lib/market-periods':dates});
assert.throws(() => parseFredCsv('<!doctype html>\n<html>\n<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600">\n</html>', 'SP500'), /Invalid FRED CSV schema/);
assert.throws(() => parseFredCsv('observation_date,WRONG\n2026-10-20,400', 'SP500'), /Invalid FRED CSV schema/);
assert.equal(parseFredCsv('\uFEFF"observation_date","SP500"\r\n"2026-10-20","104.5"\r\n2026-10-21,.\r\n2026-02-30,999\r\nnot-a-date,400', 'SP500')[0].value, 104.5);
assert.equal(parseFredCsv('DATE,SP500\n2026-10-20,0\n2026-10-21,-1.5', 'SP500').length, 2);
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
  {date:'    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300', value:400},
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
async function checkProvider() {
  const html = '<!doctype html>\n<html>\n<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600">\n</html>';
  const source = fs.readFileSync('lib/providers/fred-public-market-data.ts', 'utf8');
  const mocks = {'@/lib/providers/fred-csv':{parseFredCsv}};
  const bad = load(source, mocks, {AbortSignal, fetch:async()=>({ok:true, text:async()=>html})});
  const unavailable = await bad.getPublicFredQuotes();
  assert.equal(unavailable.quotes.length, 0);
  assert.equal(unavailable.provider.status, 'error');
  const mixed = load(source, mocks, {AbortSignal, fetch:async url=>({ok:true,
    text:async()=>new URL(url).searchParams.get('id')==='SP500'
      ? 'observation_date,SP500\n2026-10-19,100\n2026-10-20,104' : html,
  })});
  const partial = await mixed.getPublicFredQuotes();
  assert.equal(partial.quotes.length, 1);
  assert.equal(partial.provider.status, 'partial');
  assert.equal(partial.quotes[0].value, 104);
  assert.equal(partial.quotes[0].changePercent, 4);
  console.log('Market regression checks passed: HTML rejection, provider availability, dates, price/rate/spread moves and EN/FR rendering.');
}
checkProvider().catch(error=>{console.error(error);process.exitCode=1;});
