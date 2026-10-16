"use client";
import {useEffect,useId,useRef,type ReactNode} from "react";
import {useLanguage} from "./language-provider";
export default function StudyDialog({title,eyebrow,onClose,children}:{title:string;eyebrow:string;onClose:()=>void;children:ReactNode}){
 const ref=useRef<HTMLElement>(null);const close=useRef(onClose);close.current=onClose;const id=useId();const {text}=useLanguage();
 useEffect(()=>{const prior=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;document.body.style.overflow="hidden";ref.current?.querySelector<HTMLButtonElement>('button')?.focus();
 const handle=(e:KeyboardEvent)=>{if(e.key==="Escape"){e.preventDefault();close.current();}if(e.key==="Tab"){const nodes=ref.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input,textarea,select,[tabindex="0"]');if(!nodes?.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};document.addEventListener("keydown",handle);return()=>{document.removeEventListener("keydown",handle);document.body.style.overflow=overflow;prior?.focus();};},[]);
 return <div className="concept-lens-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><article ref={ref} className="concept-lens-card" role="dialog" aria-modal="true" aria-labelledby={id}><div className="concept-lens-card-head"><div><span className="mini-label">{eyebrow}</span><h2 id={id}>{title}</h2></div><button className="concept-lens-close" type="button" aria-label={text("Close study card","Fermer la fiche")} onClick={onClose}>×</button></div>{children}</article></div>;
}
