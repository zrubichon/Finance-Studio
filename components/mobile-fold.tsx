"use client";
import {useSyncExternalStore,type ReactNode} from 'react';
const query='(max-width: 900px), (max-width: 1100px) and (pointer: coarse)';
function subscribe(callback:()=>void){const media=window.matchMedia(query);media.addEventListener('change',callback);return()=>media.removeEventListener('change',callback);}
export function usePhoneLayout(){return useSyncExternalStore(subscribe,()=>window.matchMedia(query).matches,()=>false);}
export default function MobileFold({title,children,initialOpen=false}:{title:string;children:ReactNode;initialOpen?:boolean}){const phone=usePhoneLayout();if(!phone)return <>{children}</>;return <details className="mobile-fold" open={initialOpen}><summary>{title}<span aria-hidden="true">⌄</span></summary><div className="mobile-fold-content">{children}</div></details>;}
