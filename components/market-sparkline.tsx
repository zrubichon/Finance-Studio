import {useLanguage} from "./language-provider";
export default function MarketSparkline({points,label}:{points:{date:string;value:number}[];label:string}) {
  const {text}=useLanguage();if(points.length<2)return null;const values=points.map(p=>p.value);const min=Math.min(...values),max=Math.max(...values);const range=max-min||1;
  return <figure className="quote-history"><svg viewBox="0 0 260 72" role="img" aria-label={`${label}: ${points[0].date} → ${points.at(-1)?.date}; min ${min}, max ${max}`}><title>{label} · {text("Observed history","Historique observé")}</title><polyline points={points.map((p,i)=>`${8+i/(points.length-1)*244},${60-(p.value-min)/range*48}`).join(" ")} fill="none" stroke="var(--accent)" strokeWidth="2.5"/></svg><figcaption>{text("Observed points","Points observés")} · {points[0].date} → {points.at(-1)?.date} · min {min.toFixed(2)} / max {max.toFixed(2)}</figcaption></figure>;
}
