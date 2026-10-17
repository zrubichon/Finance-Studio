"use client";
import {useEffect,useState} from 'react';
import type {hourlyLearning} from '@/lib/hourly-learning';
export function useHourlyLearning(kind='brief'){
 const [data,setData]=useState<ReturnType<typeof hourlyLearning>|null>(null);
 useEffect(()=>{const abort=new AbortController();let busy=false;const refresh=async()=>{if(busy)return;busy=true;try{const r=await fetch(`/api/learning/hourly?kind=${kind}`,{signal:abort.signal,cache:'no-store'});if(r.ok){const payload=await r.json();if(!abort.signal.aborted)setData(payload);}}catch{}finally{busy=false;}};void refresh();const timer=setInterval(()=>void refresh(),30000);const visible=()=>{if(document.visibilityState==='visible')void refresh();};document.addEventListener('visibilitychange',visible);return()=>{abort.abort();clearInterval(timer);document.removeEventListener('visibilitychange',visible);};},[kind]);return data;
}
