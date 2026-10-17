import {createClient} from './supabase/client';
import {nextMastery,type LearningEvidence} from './learning-schedule';
export type {LearningEvidence} from './learning-schedule';
export async function recordPractice(key:string,correct:boolean){try{const db=createClient();const {data:{user}}=await db.auth.getUser();if(user){const {error}=await db.rpc('record_learning_result',{p_concept_key:key,p_correct:correct});if(error)throw error;}else{const raw=JSON.parse(localStorage.getItem('finance-learning-guest-v1')||'{}');const prev=raw[key] as LearningEvidence|undefined;raw[key]=nextMastery(prev,key,correct);localStorage.setItem('finance-learning-guest-v1',JSON.stringify(raw));}window.dispatchEvent(new Event('finance-learning-updated'));return true;}catch{return false;}}
