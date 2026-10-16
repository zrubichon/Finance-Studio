"use client";
import {useLanguage} from "./language-provider";
type Quote={label:string;category:string;value:number;changePercent:number|null;unit:string};
export default function HomeMarketSummary({quotes,updatedAt}:{quotes:Quote[];updatedAt:string}){
 const {text,isFrench}=useLanguage();
 const biggest=quotes.filter(q=>q.unit!=="%"&&q.category!=="Volatility"&&q.changePercent!==null).sort((a,b)=>Math.abs(b.changePercent||0)-Math.abs(a.changePercent||0))[0];
 const y2=quotes.find(q=>q.label==="US 2Y"),y10=quotes.find(q=>q.label==="US 10Y"),vix=quotes.find(q=>q.label==="VIX"),spx=quotes.find(q=>q.label==="S&P 500");
 const curve=y2&&y10?(y10.value-y2.value)*100:null;
 const cards=[
 [text("BIGGEST PRICE MOVE","PLUS GRANDE VARIATION DE PRIX"),biggest?`${biggest.label} ${(biggest.changePercent||0)>=0?"+":""}${biggest.changePercent?.toFixed(2)}%`:"—",text("Among the displayed price series. Percentage moves in different assets are not measures of equal risk.","Parmi les séries de prix affichées. Des variations en pourcentage de différents actifs ne mesurent pas des risques équivalents.")],
 [text("US 2Y/10Y CURVE","COURBE US 2 ANS/10 ANS"),curve===null?"—":`${curve>=0?"+":""}${curve.toFixed(0)} bps`,curve===null?"":curve>0?text("The 10-year yield is above the 2-year yield.","Le rendement à 10 ans dépasse celui à 2 ans."):curve<0?text("The curve is inverted between 2 and 10 years.","La courbe est inversée entre 2 et 10 ans."):text("These two maturities have the same yield.","Ces deux maturités ont le même rendement.")],
 [text("EQUITIES & VOLATILITY","ACTIONS ET VOLATILITÉ"),`S&P ${spx?.changePercent?.toFixed(2)??"—"}% · VIX ${vix?.value.toFixed(1)??"—"}`,text("Read equities and expected volatility together.","Lire les actions avec la volatilité attendue.")],
 [text("REFRESH","ACTUALISATION"),new Date(updatedAt).toLocaleTimeString(isFrench?"fr-FR":"en-US",{hour:"2-digit",minute:"2-digit"}),text("Refreshed every minute; the observation date of each series is preserved.","Actualisé chaque minute ; la date d’observation de chaque série est conservée.")]
 ];
 return <div className="market-intelligence-strip">{cards.map(([label,value,copy])=><article key={label}><span>{label}</span><strong>{value}</strong><p>{copy}</p></article>)}</div>;
}
