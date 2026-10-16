"use client";
import FinanceMath from "./finance-math";
import { Fragment, type ReactNode } from "react";

function removeReferences(value: string) {
  return value.replace(/\[(?:M?\d+)\](?:\([^\s)]+\))?|【[^】]*\d+[^】]*】/g, "");
}
function inline(value:string):ReactNode {
  return value.split(/(\\\([^]+?\\\)|\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^\s)]+\))/g).map((part,i)=>{
    if(part.startsWith("\\("))return <FinanceMath key={i} expression={part.slice(2,-2)}/>;
    if(part.startsWith("**"))return <strong key={i}>{removeReferences(part.slice(2,-2))}</strong>;
    if(part.startsWith("`"))return <code key={i}>{part.slice(1,-1)}</code>;
    const link=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if(link && /^M?\d+$/.test(link[1]))return null;
    if(link && /^(https:\/\/|\/(?!\/))/.test(link[2]))return <a key={i} href={link[2]} rel="noreferrer">{link[1]}</a>;
    return <Fragment key={i}>{removeReferences(part)}</Fragment>;
  });
}
export function CausalFlow({steps}:{steps:string[]}) {
  return <ol className="teaching-flow">{steps.map((step,i)=><li key={i}><span className="flow-number">{i+1}</span><span>{inline(step)}</span>{i<steps.length-1&&<b aria-hidden="true">↓</b>}</li>)}</ol>;
}
export default function LearningResponse({content}:{content:string}) {
  const lines=content.replace(/\r/g,"").split("\n");const blocks:ReactNode[]=[];
  for(let i=0;i<lines.length;i++){
    const line=lines[i].trim();if(!line)continue;
    if(line === "\\[" || line === "$$") {const end=line === "$$" ? "$$" : "\\]";const math:string[]=[];while(++i<lines.length&&lines[i].trim()!==end)math.push(lines[i]);blocks.push(<FinanceMath key={i} expression={math.join("\n")} display/>);}
    else if(line.startsWith("```")){
      const kind=line.slice(3).trim().toLowerCase();const code:string[]=[];while(++i<lines.length&&!lines[i].trim().startsWith("```"))code.push(lines[i]);
      if(kind==="flow")blocks.push(<CausalFlow key={i} steps={code.join("\n").split(/\n|→|->/).map(s=>s.trim()).filter(Boolean).slice(0,8)}/>);
      else if(kind==="chart" || kind==="json" || kind===""){
        try {const data=JSON.parse(code.join("\n")) as {title:string;unit?:string;points:{label:string;value:number}[]};if(typeof data.title!=="string"||!Array.isArray(data.points)|| (data.unit!==undefined&&typeof data.unit!=="string"))throw new Error("Invalid chart");const pts=data.points.filter(p=>p && typeof p.label==="string"&&Number.isFinite(p.value)).slice(0,12);const max=Math.max(...pts.map(p=>Math.abs(p.value)),0.0001);const signed=pts.some(p=>p.value<0);blocks.push(<figure className="teaching-bars" key={i}><figcaption>{data.title}</figcaption>{pts.map((p,j)=><div key={j}><span>{p.label}</span><div className={signed?"signed-chart":""}><i style={signed?{width:`${Math.abs(p.value)/max*50}%`,left:`${p.value<0?50-Math.abs(p.value)/max*50:50}%`}:{width:`${Math.abs(p.value)/max*100}%`}}/></div><strong>{p.value} {data.unit}</strong></div>)}</figure>);}catch{blocks.push(<pre key={i}>{code.join("\n")}</pre>);}
      }else blocks.push(<pre key={i}>{code.join("\n")}</pre>);
    }else if(/^#{1,4}\s/.test(line)){const title=line.replace(/^#+\s*/,"");blocks.push(<h3 key={i}>{inline(title)}</h3>);}
    else if(line.startsWith("|")){
      const rows=[line];while(i+1<lines.length&&lines[i+1].trim().startsWith("|"))rows.push(lines[++i].trim());
      const cells=rows.filter(r=>!/^\|[\s:|\-]+\|$/.test(r)).map(r=>r.replace(/^\||\|$/g,"").split("|").map(c=>c.trim()));
      blocks.push(<div className="teaching-table" key={i}><table><thead><tr>{cells[0]?.map((c,j)=><th key={j}>{inline(c)}</th>)}</tr></thead><tbody>{cells.slice(1).map((r,j)=><tr key={j}>{r.map((c,k)=><td key={k}>{inline(c)}</td>)}</tr>)}</tbody></table></div>);
    }else if(/^[-*]\s|^\d+[.)]\s/.test(line)){
      const list=[line];while(i+1<lines.length&&/^([-*]\s|\d+[.)]\s)/.test(lines[i+1].trim()))list.push(lines[++i].trim());blocks.push(<ul key={i}>{list.map((l,j)=><li key={j}>{inline(l.replace(/^([-*]\s|\d+[.)]\s)/,""))}</li>)}</ul>);
    }else if(/^---+$/.test(line)){blocks.push(<hr key={i}/>);}
    else {const paragraph=[line];while(i+1<lines.length&&lines[i+1].trim()&&!/^(#|```|\\\[|\$\$|\||[-*]\s|\d+[.)]\s)/.test(lines[i+1].trim()))paragraph.push(lines[++i].trim());blocks.push(<p key={i}>{inline(paragraph.join(" "))}</p>);}
  }
  return <div className="learning-response">{blocks}</div>;
}
