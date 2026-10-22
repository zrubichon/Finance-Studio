const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
function load(file, mocks = {}, globals = {}) {
  const module = {exports:{}};
  const code = ts.transpileModule(fs.readFileSync(file,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,
    target:ts.ScriptTarget.ES2023, jsx:ts.JsxEmit.ReactJSX, esModuleInterop:true}}).outputText;
  vm.runInNewContext(code, {module,exports:module.exports,require:n=>n in mocks?mocks[n]:require(n),
    console,Date,Intl,Map,Buffer,...globals});
  return module.exports;
}
const math = load('lib/ai-credit-math.ts');
const row = (day,balance,totalUsed) => ({observedAt:`2026-10-${String(day).padStart(2,'0')}T12:00:00Z`,balance,totalUsed});
assert.equal(math.creditForecast([]),null);
assert.equal(math.creditForecast([row(20,20,0)]).dailyRate,null);
assert.equal(math.creditForecast([row(20,20,0),{...row(20,19,1),observedAt:'2026-10-20T13:00:00Z'}]).dailyRate,null);
const topup = math.creditForecast([row(13,20,1),row(20,26,15)]);
assert.equal(topup.dailyRate,2);
assert.equal(topup.netCreditsAdded,20);
assert.equal(topup.daysLeft,13);
assert.equal(topup.monthlySpend,60);
assert.equal(topup.rechargeFor30Days,34);
assert.equal(topup.depletionAt,'2026-11-02T12:00:00.000Z');
assert.equal(math.creditForecast([row(13,20,10),row(20,19,1)]).dailyRate,null);
assert.equal(math.creditForecast([row(13,20,1),row(20,20,1)]).depletionAt,null);
assert.equal(math.creditForecast([row(20,0,20)]).daysLeft,0);
assert.equal(math.creditForecast([row(10,20,0),row(13,18,2),row(20,11,9)],7).spend,7);
const assumptions = {price:10,subscribers:10,actions:50,costPerActionUsd:.02,usdPerEur:1,paymentPercent:2,paymentFixed:.3,fixedCosts:17};
const scenario = math.revenueScenario(assumptions);
assert.equal(scenario.revenue,100); assert.equal(scenario.aiCosts,10); assert.equal(scenario.fees,5);
assert.equal(scenario.margin,68); assert.equal(scenario.breakEven,2);
assert.equal(math.revenueScenario({...assumptions,price:0}).breakEven,null);

async function check() {
  let calls = 0;
  const snapshot = row(21,26,15);
  const capture = async()=>{calls++;return snapshot;};
  const route = load('app/api/internal/ai-credits/route.ts', {'@/lib/ai-credit-monitor':{captureAiCredits:capture}},
    {process:{env:{CRON_SECRET:'test-only-monitor-secret'}}});
  const request = value=>new Request('https://example.com/api/internal/ai-credits',{headers:value?{authorization:value}:{}});
  assert.equal((await route.GET(request())).status,401);
  assert.equal((await route.GET(request('Bearer wrong'))).status,401);
  assert.equal(calls,0);
  const ok = await route.GET(request('Bearer test-only-monitor-secret'));
  assert.equal(ok.status,200); assert.equal(calls,1);
  const json = await ok.json(); assert.equal(json.ok,true); assert.equal(json.balance,undefined);
  const noSecret = load('app/api/internal/ai-credits/route.ts', {'@/lib/ai-credit-monitor':{captureAiCredits:capture}}, {process:{env:{}}});
  assert.equal((await noSecret.GET(request('Bearer '))).status,401);
  const Simulator = load('components/owner-revenue-simulator.tsx',{'@/lib/ai-credit-math':math}).default;
  for(const french of [false,true]) assert.ok(renderToStaticMarkup(React.createElement(Simulator,{french})).includes('7.9'));
  for(const identity of ['guest','other','owner']) {
    const before = calls;
    const Page = load('app/admin/ai/page.tsx', {
      './owner-ai.css':{},'next/headers':{cookies:async()=>({get:()=>({value:'FR'})})},
      'next/navigation':{redirect:()=>{throw Error('LOGIN');},notFound:()=>{throw Error('DENIED');}},
      'next/link':({children,...props})=>React.createElement('a',{href:props.href},children),
      '@/components/section-layout':({children})=>React.createElement('main',null,children),
      '@/components/owner-revenue-simulator':Simulator,'@/lib/ai-credit-math':math,
      '@/lib/ai-credit-monitor':{captureAiCredits:capture},
      '@/lib/supabase/server':{createClient:async()=>({auth:{getUser:async()=>({data:{user:identity==='guest'?null:{id:identity==='owner'?'b60fe531-9163-4b79-874c-b2910d99ac6e':identity}}})},
        rpc:async name=>({data:name==='finance_admin_access'?identity==='owner':[row(13,20,1)]})})},
    }).default;
    if(identity!=='owner') {
      await assert.rejects(()=>Page({searchParams:Promise.resolve({})}),identity==='guest'?/LOGIN/:/DENIED/);
      assert.equal(calls,before,'Unauthorized visitors must never query Gateway credits');
    } else {
      const html = renderToStaticMarkup(await Page({searchParams:Promise.resolve({})}));
      assert.ok(html.includes('Crédits IA disponibles'));
      assert.ok(html.includes('26,00'));
      assert.equal(calls,before+1);
    }
  }
  console.log('Owner AI checks passed: authorization before billing reads, cron authentication, EN/FR rendering, forecasts, top-ups, resets and revenue math.');
}
check().catch(e=>{console.error(e);process.exitCode=1;});
