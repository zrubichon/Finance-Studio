"use client";
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {createClient} from '@/lib/supabase/client';
import {useLanguage} from './language-provider';
export default function AdminLink(){const [allowed,setAllowed]=useState(false);const {text}=useLanguage();useEffect(()=>{let active=true;void(async()=>{const db=createClient();const {data:{user}}=await db.auth.getUser();if(!user)return;const {data}=await db.rpc('finance_admin_access');if(active)setAllowed(data===true);})();return()=>{active=false;};},[]);return allowed?<Link className="nav-link" href="/admin"><span aria-hidden="true">⚙</span><span className="nav-label">{text('Administration','Administration')}</span></Link>:null;}
