"use client";
import { useState, useId } from "react";
import LearningResponse from "./learning-response";
import { useLanguage } from "./language-provider";

export function splitStudySections(content:string) {
 const lines=content.replace(/\r/g,"").split("\n");
 const exact=lines.some(line=>/^##\s+/.test(line));
 const sections:{title:string;content:string}[]=[];let intro:string[]=[];
 let fenced=false;
 for(const line of lines){
  if(line.trim().startsWith("```"))fenced=!fenced;
  const heading=!fenced&&line.match(exact?/^##\s+(.+)/:/^#{1,3}\s+(.+)/);
  if(heading)sections.push({title:heading[1].replace(/\[(?:M?\d+)\](?:\([^\s)]+\))?|【[^】]*\d+[^】]*】/g, "").replace(/\*\*/g,"").replace(/^\d+(?:[.)·:]\s*|\s+)/,""),content:""});
  else if(sections.length)sections[sections.length-1].content+=line+"\n";
  else intro.push(line);
 }
 return {intro:intro.join("\n"),sections};
}
export default function StudyNotebook({content}:{content:string}) {
 const {text}=useLanguage();const {intro,sections}=splitStudySections(content);
 const [selected,setSelected]=useState(0);const id=useId();const active=Math.min(selected,sections.length-1);
 if(sections.length<2)return <LearningResponse content={content}/>;
 return <div className="study-notebook">
  {intro.trim()&&<div className="study-notebook-intro"><LearningResponse content={intro}/></div>}
  <div className="study-notebook-layout">
   <nav className="study-section-menu" aria-label={text("Explore this explanation","Explorer cette explication")}>{sections.map((s,i)=><button key={i} type="button" aria-pressed={active===i} aria-controls={`${id}-page`} onClick={()=>setSelected(i)}><span>{String(i+1).padStart(2,"0")}</span>{s.title}</button>)}</nav>
   <section className="study-notebook-page" id={`${id}-page`} aria-label={sections[active]?.title}>
    <h3>{sections[active]?.title}</h3><LearningResponse content={sections[active]?.content||""}/>
    <div className="study-page-actions"><span>{active+1} / {sections.length}</span>{active>0&&<button type="button" onClick={()=>setSelected(active-1)}>← {text("Previous","Précédent")}</button>}{active<sections.length-1&&<button type="button" onClick={()=>setSelected(active+1)}>{text("Next section","Section suivante")} →</button>}</div>
   </section>
  </div>
 </div>;
}
