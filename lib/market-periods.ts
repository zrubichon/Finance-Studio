export type MarketPeriod = "year" | "month" | "week" | "last-week" | "yesterday" | "today";
export type HistoryPoint = {date:string;value:number};
const day = (value:string, offset=0) => new Date(Date.parse(value+"T12:00:00Z")+offset*86400000).toISOString().slice(0,10);
export function marketDate(now=new Date()) {
  const parts=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
  return ["year","month","day"].map(type=>parts.find(p=>p.type===type)!.value).join("-");
}
export function periodBounds(period:MarketPeriod,today=marketDate()) {
 const date=new Date(today+"T12:00:00Z");
 if(period==="year"){const prior=new Date(date);prior.setUTCFullYear(prior.getUTCFullYear()-1);if(prior.getUTCMonth()!==date.getUTCMonth())prior.setUTCDate(0);return {start:day(prior.toISOString().slice(0,10),1),end:today};}
 const monday=day(today,-((date.getUTCDay()+6)%7));
 if(period==="month")return {start:today.slice(0,7)+"-01",end:today};
 if(period==="week")return {start:monday,end:today};
 if(period==="last-week")return {start:day(monday,-7),end:day(monday,-1)};
 const selected=period==="yesterday"?day(today,-1):today;
 return {start:selected,end:selected};
}
export function periodMove(history:HistoryPoint[],period:MarketPeriod,unit:string,today=marketDate()) {
 const bounds=periodBounds(period,today);
 const points=[...new Map(history.filter(p=>Number.isFinite(p.value)&&/^\d{4}-\d{2}-\d{2}$/.test(p.date)).map(p=>[p.date,p])).values()].sort((a,b)=>a.date.localeCompare(b.date));
 const last=points.filter(p=>p.date>=bounds.start&&p.date<=bounds.end).at(-1);
 const base=points.filter(p=>p.date<bounds.start).at(-1);
 // Never label an old or missing observation as today's performance.
 if(!last||!base||Date.parse(bounds.start)-Date.parse(base.date)>7*86400000)return null;
 const absolute=last.value-base.value;
 const delta=unit==="%"?absolute*100:unit==="bps"?absolute:base.value!==0?absolute/Math.abs(base.value)*100:null;
 if(delta===null)return null;
 return {from:base.date,to:last.date,value:last.value,delta,deltaUnit:unit==="%"||unit==="bps"?"bps":"%",bounds};
}
