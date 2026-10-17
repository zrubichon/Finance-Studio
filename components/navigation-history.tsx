"use client";
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import {usePathname} from 'next/navigation';
const HistoryContext=createContext('/');
export function NavigationHistoryProvider({children}:{children:ReactNode}){
 const pathname=usePathname();const trail=useRef<string[]>([]);const [previous,setPrevious]=useState('/');
 useEffect(()=>{const paths=trail.current;const index=paths.lastIndexOf(pathname);if(index>=0)paths.splice(index+1);else paths.push(pathname);setPrevious(paths.at(-2)||'/');},[pathname]);
 return <HistoryContext.Provider value={previous}>{children}</HistoryContext.Provider>;
}
export function usePreviousSection(){return useContext(HistoryContext);}
