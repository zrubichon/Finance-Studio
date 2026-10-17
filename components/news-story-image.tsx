"use client";
import {useState} from 'react';
import {useLanguage} from './language-provider';
export default function NewsStoryImage({imageUrl,title}:{imageUrl?:string|null;title:string}){
 const {text}=useLanguage();const [failed,setFailed]=useState(false);
 let supplied='';try{const url=new URL(imageUrl||'');if(url.protocol==='https:')supplied=url.href;}catch{}
 const subject=title.toLowerCase();
 const photo=/\b(oil|energy|gas|opec|petrol|énergie|pétrole|tanker|hormuz)\b/.test(subject)?'energy':/\b(gold|bullion|lingot)\b/.test(subject)?'gold':/\b(crypto|bitcoin|ethereum|token)\b/.test(subject)?'crypto':/\b(currency|forex|dollar|euro|yen|devises)\b/.test(subject)?'currency':/\b(bank|fed|ecb|rate|rates|taux|central|banque)\b/.test(subject)?'city':'trading';
 const original=Boolean(supplied&&!failed);
 return <><img draggable={false} className="news-story-background" src={original?supplied:`/market-images/${photo}.jpg`} alt="" loading="lazy" referrerPolicy="no-referrer" onError={()=>{if(original)setFailed(true);}}/><span className="news-photo-caption">{original?text('Image supplied with this article','Image fournie avec cet article'):text('Thematic illustration · Unsplash','Illustration thématique · Unsplash')}</span></>;
}
