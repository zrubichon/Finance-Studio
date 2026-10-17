import {lessons} from './lesson-registry';
import {sectionPractice,getCourseWorkbook} from './course-practice';
import type {LocalizedText} from './lesson-content';
export type ReviewItem={key:string;slug:string;title:LocalizedText;question:LocalizedText;options:{id:string;label:LocalizedText}[];correct:string;explanation:LocalizedText;kind:'definition'|'quiz'|'calculation';expected?:number;unit?:string};
const items:ReviewItem[]=[];
for(const lesson of lessons){
 for(const [i,s] of lesson.sections.entries()){const task=sectionPractice(lesson,s,i);items.push({key:`section:${lesson.slug}:${s.id}`,slug:lesson.slug,title:s.title,question:{en:`Which statement explains ${s.title.en}?`,fr:`Quelle affirmation explique ${s.title.fr} ?`},options:task.options.map(o=>({id:o.id,label:o.definition})),correct:'correct',explanation:{en:[task.correct.en,s.explanation.Intermediate.en,s.example?.en].filter(Boolean).join('\n\n'),fr:[task.correct.fr,s.explanation.Intermediate.fr,s.example?.fr].filter(Boolean).join('\n\n')},kind:'definition'});}
 for(const q of lesson.quiz)if(!items.some(i=>i.key===q.conceptKey))items.push({key:q.conceptKey,slug:lesson.slug,title:lesson.title,question:q.question,options:q.options,correct:q.correctOption,explanation:q.explanation,kind:'quiz'});
 const w=getCourseWorkbook(lesson.slug);if(w)for(const q of w.questions)items.push({key:`workbook:${lesson.slug}:${q.id}`,slug:lesson.slug,title:q.label,question:{en:w.scenario.en+'\n\n'+q.label.en,fr:w.scenario.fr+'\n\n'+q.label.fr},options:[],correct:String(q.expected),expected:q.expected,unit:q.unit,explanation:q.explanation,kind:'calculation'});
}
export const learningCatalog=items;
export function reviewItem(key:string){return items.find(i=>i.key===key);}
