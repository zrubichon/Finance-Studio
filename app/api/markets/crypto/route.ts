import { NextResponse } from "next/server";
export const revalidate=900;
export async function GET() {
 const today=new Date().toISOString().slice(0,10);
 const start=new Date(Date.now()-75*86400000).toISOString();
 const results=await Promise.allSettled([['BTC','Bitcoin'],['ETH','Ethereum'],['SOL','Solana'],['XRP','XRP']].map(async([symbol,label])=>{
  const pair=symbol+'-USD';
  const response=await fetch(`https://api.exchange.coinbase.com/products/${pair}/candles?granularity=86400&start=${start}&end=${new Date().toISOString()}`,{headers:{Accept:'application/json'},next:{revalidate:900},signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw new Error('Crypto history unavailable');
  const raw:unknown=await response.json();
  if(!Array.isArray(raw))throw new Error('Invalid history');
  // Completed UTC daily candles only. The current day is not a closing price.
  const history=raw.filter(row=>Array.isArray(row)&&Number.isFinite(row[0])&&Number.isFinite(row[4])).map(row=>({date:new Date(row[0]*1000).toISOString().slice(0,10),value:Number(row[4])})).filter(p=>p.date<today&&p.value>0).sort((a,b)=>a.date.localeCompare(b.date));
  const last=history.at(-1);if(!last)throw new Error('No observations');
  return {id:pair,label,category:'Crypto',region:'Global',unit:'$',value:last.value,asOf:last.date,history,source:'Coinbase Exchange · daily UTC close',sourceUrl:`https://www.coinbase.com/price/${({BTC:'bitcoin',ETH:'ethereum',SOL:'solana',XRP:'xrp'})[symbol as 'BTC'|'ETH'|'SOL'|'XRP']}`};
 }));
 return NextResponse.json({quotes:results.flatMap(r=>r.status==='fulfilled'?[r.value]:[])},{headers:{'Cache-Control':'public, s-maxage=900, stale-while-revalidate=1800'}});
}
