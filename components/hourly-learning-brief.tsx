"use client";
import {useState} from 'react';
import Link from 'next/link';
import {useLanguage} from './language-provider';
import {useHourlyLearning} from './use-hourly-learning';
import LearningResponse from './learning-response';
export default function HourlyLearningBrief({level}:{level:string}){
 const {isFrench,text}=useLanguage();const [expanded,setExpanded]=useState(false);const data=useHourlyLearning();const lang=isFrench?'fr':'en';
 if(!data)return <article className="card span-7 hourly-react-brief"><h2>{text('Hourly learning brief','Brief pédagogique horaire')}</h2><p role="status">{text('Loading this hour’s lesson…','Chargement de la leçon de cette heure…')}</p></article>;
 const t=data.topic;
 return <article className={`card span-7 hourly-react-brief${expanded?' brief-expanded':''}`}>
 <div className="card-head"><div><span className="eyebrow">{text('HOURLY LEARNING BRIEF','BRIEF PÉDAGOGIQUE HORAIRE')}</span><h2>{t.title[lang]}</h2></div><span className="pill">{level==='Beginner'?text('Beginner','Débutant'):level==='Intermediate'?text('Intermediate','Intermédiaire'):text('Professional','Professionnel')}</span></div>
 <p className="daily-copy">{t.summary[lang]}</p><div className="concept-strip"><span>{text('Key term','Terme clé')}</span><strong>{t.term[lang]}</strong></div>
 <div className="learning-detail-grid"><article><span>{text('WHY IT MATTERS','POURQUOI C’EST IMPORTANT')}</span><p>{t.why[lang]}</p></article><article><span>{text('WORKED EXAMPLE / ANSWER','EXEMPLE / RÉPONSE EXPLIQUÉE')}</span><p>{t.example[lang]}</p></article></div>
 <button className="learning-expand-button" type="button" aria-expanded={expanded} aria-controls="hourly-complete-lesson" onClick={()=>setExpanded(v=>!v)}>{expanded?text('Close the full lesson ↑','Replier le cours complet ↑'):text('Open the full lesson, examples & explanations ↓','Dérouler le cours complet, les exemples et explications ↓')}</button>
 <section id="hourly-complete-lesson" hidden={!expanded}><h3>{text('Understand the concept','Comprendre la notion')}</h3><p>{t.definition[lang]}</p><LearningResponse content={t.facts.map(f=>`- ${f[lang]}`).join('\n')}/>{t.formula&&<><code>{t.formula.expression}</code><p>{t.formula.explanation[lang]}</p></>}<h3>{text('Go further','Aller plus loin')}</h3><p>{t.advanced[lang]}</p><Link className="full-button" href={`/university/${t.slug}`}>{text('Open the complete course','Ouvrir le cours complet')} →</Link></section>
 <small className="hourly-schedule">{text('Next topic at','Prochain sujet à')} {new Date(data.nextAt).toLocaleTimeString(isFrench?'fr-FR':'en-US',{hour:'2-digit',minute:'2-digit'})} · {data.cycleHours} {text('distinct scheduled exercises; underlying concepts may recur.','exercices distincts dans le cycle ; les notions peuvent se recouper.')}</small>
 </article>;
}
