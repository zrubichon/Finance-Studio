import cases from './course-workbooks.json';
import type {FinanceLesson,LessonSection} from './lesson-content';
export type CourseWorkbook=(typeof cases)[keyof typeof cases];
export function getCourseWorkbook(slug:string):CourseWorkbook|undefined{return (cases as Record<string,CourseWorkbook>)[slug];}
export function parsePracticeNumber(value:string,french=false){let s=value.trim().replace(/[\s\u202f\u00a0%$€]/g,'');if(!s)return Number.NaN;s=s.replace(/^−/,'-').replace(/^\((.*)\)$/,'-$1');if(s.includes(',')&&s.includes('.'))s=s.lastIndexOf(',')>s.lastIndexOf('.')?s.replace(/\./g,'').replace(',','.'):s.replace(/,/g,'');else if(s.includes(','))s=!french&&/^[-+]?\d{1,3}(,\d{3})+$/.test(s)?s.replace(/,/g,''):s.replace(',','.');return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)?Number(s):Number.NaN;}
export function checkPracticeNumber(input:string,expected:number,unit:string,french=false){const value=parsePracticeNumber(input,french);const tolerance=unit.startsWith('code')?0:Math.max(.01,Math.abs(expected)*.0005);return Number.isFinite(value)&&Math.abs(value-expected)<=tolerance;}
export function sectionPractice(lesson:FinanceLesson,section:LessonSection,index:number){
 const term=section.vocabulary?.[0];const correct=term?.definition||section.coreFacts[0];
 const pool=lesson.sections.filter(s=>s.id!==section.id).flatMap(s=>s.vocabulary?.length?s.vocabulary.map(t=>({definition:t.definition,term:{en:t.en,fr:t.fr}})):s.coreFacts.map(f=>({definition:f,term:s.title})));
 const distinct=pool.filter((p,i)=>p.definition.en!==correct.en&&pool.findIndex(x=>x.definition.en===p.definition.en)===i).slice(0,2);
 const options=[{id:'correct',definition:correct,term:term?{en:term.en,fr:term.fr}:section.title},...distinct.map((p,i)=>({id:'other-'+i,...p}))];
 const shift=(index+section.id.length)%options.length;return {term:term?{en:term.en,fr:term.fr}:null,options:[...options.slice(shift),...options.slice(0,shift)],correct,application:section.example||section.formula?.workedExample||section.marketConnection||section.coreFacts.at(-1)!};
}
