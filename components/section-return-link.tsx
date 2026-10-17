"use client";
import Link from 'next/link';
import {usePreviousSection} from './navigation-history';
import {usePathname} from 'next/navigation';
import {useLanguage} from './language-provider';
export default function SectionReturnLink(){
 const path=usePathname();const previous=usePreviousSection();const {text}=useLanguage();
 const parts=path.split('/').filter(Boolean);const parent=parts.length>1?'/'+parts.slice(0,-1).join('/'):previous;
 const names:Record<string,[string,string]>={'/':['Dashboard','Tableau de bord'],'/careers':['Careers','Métiers'],'/careers/training':['Training','Formations'],'/markets':['Markets','Marchés'],'/markets/guide':['Market learning module','Module marchés'],'/university':['Finance University','Université de Finance'],'/news':['News & Analysis','Actualités et Analyses'],'/investing':['Investing Lab','Laboratoire d’investissement'],'/dictionary':['Dictionary','Dictionnaire'],'/interview':['Interview Studio','Studio d’entretien'],'/professor':['AI Professor','Professeur IA'],'/saved':['My Library','Ma Bibliothèque'],'/progress':['Progress','Progression'],'/themes':['Theme Studio','Studio de Thèmes']};
 const label=names[parent]||[text('Previous section','Section précédente'),text('Previous section','Section précédente')];
 return <Link className="back-link" href={parent}>← {text(label[0],label[1])}</Link>;
}
