"use client";
import AdminLink from "./admin-link";
import Link from "next/link";
import {createContext,useContext,useEffect,useState,useId,type ReactNode} from "react";
import {useLanguage} from "./language-provider";
import {navItems} from "@/lib/content";
import {allCurriculumModules} from "@/lib/curriculum";
import {createClient} from "@/lib/supabase/client";
const SidebarContext=createContext<{collapsed:boolean;toggle:()=>void}|null>(null);
export function SidebarProvider({children}:{children:ReactNode}) {
 const [collapsed,setCollapsed]=useState(false);
 useEffect(()=>{try{setCollapsed(localStorage.getItem('finance-studio-sidebar-collapsed')==='1');}catch{}},[]);
 function toggle(){setCollapsed(current=>{const next=!current;try{localStorage.setItem('finance-studio-sidebar-collapsed',next?'1':'0');}catch{}return next;});}
 return <SidebarContext.Provider value={{collapsed,toggle}}>{children}</SidebarContext.Provider>;
}
export function useSidebarState(){const context=useContext(SidebarContext);if(!context)throw new Error('SidebarProvider missing');return context;}

type Progress={percent:number;completed:number;total:number;authenticated:boolean;available:boolean};
export default function AppSidebar({activeSlug,collapsed,onToggle,progress}:{activeSlug:string;collapsed:boolean;onToggle:()=>void;progress?:Progress}) {
 const {isFrench,text}=useLanguage();const [account,setAccount]=useState<Progress>({percent:0,completed:0,total:48,authenticated:false,available:true});
 useEffect(()=>{if(progress)return;let active=true;const supabase=createClient();async function load(){const modules=allCurriculumModules();const {data:{user}}=await supabase.auth.getUser();if(!active)return;if(!user){setAccount({percent:0,completed:0,total:modules.length,authenticated:false,available:true});return;}const {data,error}=await supabase.from('course_progress').select('lesson_slug,status').eq('user_id',user.id);if(!active)return;const known=new Set(modules.map(m=>m.slug));const count=new Set((data||[]).filter(r=>r.status==='completed'&&known.has(r.lesson_slug)).map(r=>r.lesson_slug)).size;setAccount({percent:Math.round(count/modules.length*100),completed:count,total:modules.length,authenticated:true,available:!error});}void load();return()=>{active=false;};},[progress]);
 const [mobileOpen,setMobileOpen]=useState(false);const menuId=useId();
 useEffect(()=>setMobileOpen(false),[activeSlug]);
 const info=progress||account;
 return <aside className={`sidebar unified-sidebar${mobileOpen?" mobile-menu-open":""}`}>
  <Link className="brand" href="/"><span className="brand-mark">FS</span><span>FinanceStudio</span></Link>
  <p className="sidebar-kicker">{text('LEARN · MARKETS · CAREERS','APPRENDRE · MARCHÉS · MÉTIERS')}</p>
  <button type="button" className="mobile-menu-toggle" aria-expanded={mobileOpen} aria-controls={menuId} onClick={()=>setMobileOpen(v=>!v)}>{mobileOpen?text("Close menu","Fermer le menu"):text("Menu","Menu")} <span aria-hidden="true">{mobileOpen?"×":"☰"}</span></button>
  <nav id={menuId} className="primary-nav" aria-label={text('FinanceStudio navigation','Navigation FinanceStudio')}>
   {[{slug:'home',label:'Home',labelFr:'Accueil',icon:'⌂'},...navItems].map(item=><Link key={item.slug} className={`nav-link${item.slug===activeSlug?' active':''}`} href={item.slug==='home'?'/':`/${item.slug}`} onClick={()=>setMobileOpen(false)} aria-current={item.slug===activeSlug?'page':undefined} title={isFrench?item.labelFr:item.label}><span aria-hidden="true">{item.icon}</span><span className="nav-label">{isFrench?item.labelFr:item.label}</span></Link>)}
   <AdminLink/>
  </nav>
  <div className="sidebar-bottom"><div className="progress-ring" style={{background:`conic-gradient(var(--accent) ${info.percent}%, var(--surface-2) 0)`}} aria-label={text('Curriculum progress','Progression du programme')}><span>{info.available?`${info.percent}%`:'—'}</span></div><div><strong>{text('Finance University','Université de Finance')}</strong><p>{!info.authenticated?text('Sign in to sync progress','Connecte-toi pour synchroniser'):!info.available?text('Saved progress unavailable','Progression indisponible'):isFrench?`${info.completed}/${info.total} cours terminés`:`${info.completed}/${info.total} lessons completed`}</p></div></div>
  <button type="button" className="sidebar-collapse-toggle" onClick={onToggle} aria-expanded={!collapsed} aria-label={collapsed?text('Expand navigation','Ouvrir la navigation'):text('Collapse navigation','Réduire la navigation')}>{collapsed?'›':'‹'}</button>
 </aside>;
}
