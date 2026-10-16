"use client";
import Link from "next/link";
import {useLanguage} from "./language-provider";
export default function CareerTabs({training=false}:{training?:boolean}){const {text}=useLanguage();return <nav className="career-tabs" aria-label={text('Career resources','Ressources carrières')}><Link href="/careers" aria-current={!training?'page':undefined}>{text('Careers & internships','Métiers et stages')}</Link><Link href="/careers/training" aria-current={training?'page':undefined}>{text('Training & certifications','Formations et certifications')} ↗</Link></nav>;}
