export type LearningEvidence={concept_key:string;mastery_score:number;attempts:number;next_review_at:string|null};
export function nextMastery(previous:LearningEvidence|undefined,key:string,correct:boolean,now=Date.now()):LearningEvidence {
 const score=previous?Math.round(previous.mastery_score*.6+(correct?100:0)*.4):correct?100:0;
 const days=!correct?1:previous&&previous.mastery_score>=80?14:previous&&previous.mastery_score>=50?7:previous?2:7;
 return {concept_key:key,mastery_score:score,attempts:(previous?.attempts||0)+1,next_review_at:new Date(now+days*86400000).toISOString()};
}
