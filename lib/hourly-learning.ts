import {lessons} from './lesson-registry';
import type {LocalizedText} from './lesson-content';
export type HourlyTopic={id:string;slug:string;title:LocalizedText;summary:LocalizedText;why:LocalizedText;example:LocalizedText;advanced:LocalizedText;facts:LocalizedText[];term:LocalizedText;definition:LocalizedText;formula?:{expression:string;explanation:LocalizedText};question:LocalizedText};
const entries:HourlyTopic[]=[];
// Interleave courses so consecutive hours do not walk through a single course.
for(let n=0;n<Math.max(...lessons.map(l=>l.sections.length+l.quiz.length));n++)for(const l of lessons){
 const s=l.sections[n];
 if(s){const term=s.vocabulary?.[0];entries.push({id:`${l.slug}:section:${s.id}`,slug:l.slug,title:s.title,summary:s.explanation.Beginner,why:s.marketConnection||s.explanation.Intermediate,example:s.example||s.formula?.workedExample||s.coreFacts.at(-1)!,advanced:s.explanation.Professional,facts:s.coreFacts,term:term?{en:term.en,fr:term.fr}:s.title,definition:term?.definition||s.coreFacts[0],formula:s.formula?{expression:s.formula.expression,explanation:s.formula.explanation}:undefined,question:{en:`In an interview, how would you explain this mechanism: ${s.title.en}? Illustrate your answer and state one limitation.`,fr:`En entretien, comment expliquerais-tu ce mécanisme : ${s.title.fr} ? Illustre ta réponse et précise une limite.`}});}
 else {const q=l.quiz[n-l.sections.length];if(q){const correct=q.options.find(o=>o.id===q.correctOption)!.label;entries.push({id:`${l.slug}:case:${q.id}`,slug:l.slug,title:{en:`Applied question · ${q.question.en}`,fr:`Question appliquée · ${q.question.fr}`},summary:q.explanation,why:l.subtitle,example:{en:`${q.question.en} ${correct.en} — ${q.explanation.en}`,fr:`${q.question.fr} ${correct.fr} — ${q.explanation.fr}`},advanced:l.interviewPrompt.sample,facts:[correct,q.explanation],term:l.title,definition:l.subtitle,question:q.question});}}
}
// Distinct question text in both languages, not merely different internal IDs.
const seen=new Set<string>();export const hourlyTopics=entries.filter(e=>{const k=e.question.en.trim().toLowerCase();if(seen.has(k))return false;seen.add(k);return true;});
export function hourlyLearning(now=Date.now(),offset=0){const hour=Math.floor(now/3600000);const topic=hourlyTopics[((hour+offset)%hourlyTopics.length+hourlyTopics.length)%hourlyTopics.length];return {topic,slot:hour,cycleHours:hourlyTopics.length,nextAt:new Date((hour+1)*3600000).toISOString()};}
