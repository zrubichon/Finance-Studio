"use client";
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLanguage} from './language-provider';
export default function SectionReturnLink(){
 const path=usePathname();const {text}=useLanguage();
 const parts=path.split('/').filter(Boolean);const parent=parts.length>1?'/'+parts.slice(0,-1).join('/'):'/';
 const names:Record<string,[string,string]>={'/':['Dashboard','Tableau de bord'],'/careers':['Careers','Métiers'],'/careers/training':['Training','Formations'],'/markets':['Markets','Marchés'],'/markets/guide':['Market learning module','Module marchés'],'/university':['Finance University','Université de Finance'],'/news':['News & Analysis','Actualités et Analyses'],'/investing':['Investing Lab','Laboratoire d’investissement']};
 const label=names[parent]||[text('Previous section','Section précédente'),text('Previous section','Section précédente')];
 return <Link className="back-link" href={parent}>← {text(label[0],label[1])}</Link>;
}
