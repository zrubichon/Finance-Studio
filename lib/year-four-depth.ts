import cases from './year-four-cases.json';
import type {FinanceLesson,LessonSection,LocalizedText,QuizQuestion} from './lesson-content';
import {isFourthYearLesson} from './lesson-aliases';

const bi=(en:string,fr:string):LocalizedText=>({en,fr});

/** Keep storage slugs stable: existing learners retain their completed steps. */
export function completeFourthYear(lesson:FinanceLesson):FinanceLesson {
 if(!isFourthYearLesson(lesson.slug))return lesson;
 const subject=lesson.slug.replace(/^year-[34]-/,'');
 const c=cases.find(item=>item.slug===subject);
 if(!c)throw new Error(`Missing fourth-year case: ${subject}`);
 const sections:LessonSection[]=[{
  id:`${subject}-professional-case`,
  kicker:bi('Professional workshop · reconstruct the numbers','Atelier professionnel · reconstruire les chiffres'),
  title:c.title,
  coreFacts:[c.mechanism,c.example],
  explanation:{Beginner:c.mechanism,Intermediate:c.example,Professional:c.stress},
  example:c.example,
  formula:{label:c.title,expression:c.formula,explanation:c.mechanism,workedExample:c.example},
  comparison:{title:bi('Worked case · assumptions and results','Cas résolu · hypothèses et résultats'),headers:[bi('Stage / variable','Étape / variable'),bi('Calculation / result','Calcul / résultat')],rows:c.rows},
  vocabulary:[{en:c.title.en,fr:c.title.fr,definition:c.mechanism}],
  marketConnection:c.stress,
 },{
  id:`${subject}-stress-review`,
  kicker:bi('Decision committee · challenge the conclusion','Comité de décision · mettre la conclusion à l’épreuve'),
  title:bi(`${c.title.en}: stress test and limitations`,`${c.title.fr} : stress et limites`),
  coreFacts:[c.stress,c.mechanism],
  explanation:{Beginner:c.stress,Intermediate:bi(`${c.example.en}\n\n${c.stress.en}`,`${c.example.fr}\n\n${c.stress.fr}`),Professional:bi(`Defend the assumptions, not just the arithmetic. ${c.stress.en}`,`Défends les hypothèses, pas seulement l’arithmétique. ${c.stress.fr}`)},
  example:c.stress,
  comparison:{title:bi('From model to defensible decision','Du modèle à une décision défendable'),headers:[bi('Evidence','Élément de preuve'),bi('What to present','Ce qu’il faut présenter')],rows:[{cells:[bi('Starting assumptions','Hypothèses initiales'),c.example]},{cells:[bi('Mechanism and units','Mécanisme et unités'),bi(c.formula,c.formula)]},{cells:[bi('Stress and limitations','Stress et limites'),c.stress]}]},
  marketConnection:c.stress,
 }];
 const quiz:QuizQuestion[]=c.questions.slice(0,2).map((q,i)=>{
  const offsets=[q.expected, q.expected*1.25+1,q.expected*0.75-1,-q.expected+2];
  const choices=[...new Set(offsets)];
  const correctIndex=(i+1)%4;
  const values=choices.slice(1);values.splice(correctIndex,0,q.expected);
  return {id:`${subject}-applied-${i}`,conceptKey:`${subject}-professional-case`,question:bi(`Using the professional workshop assumptions: ${q.label.en}?`,`Avec les hypothèses de l’atelier professionnel : ${q.label.fr} ?`),options:values.map((n,j)=>({id:String.fromCharCode(97+j),label:bi(`${Number(n.toFixed(5))} ${q.unit}`,`${Number(n.toFixed(5)).toLocaleString('fr-FR',{maximumFractionDigits:5})} ${q.unit}`)})),correctOption:String.fromCharCode(97+correctIndex),explanation:q.explanation};
 });
 return {...lesson,year:bi('Year 4 · Professional Finance','Année 4 · Finance professionnelle'),duration:bi(subject.startsWith('capstone')?'300–360 min':'180–240 min',subject.startsWith('capstone')?'300–360 min':'180–240 min'),sections:[...lesson.sections,...sections],quiz:[...lesson.quiz,...quiz]};
}
