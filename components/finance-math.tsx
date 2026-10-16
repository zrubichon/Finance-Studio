import katex from "katex";
export default function FinanceMath({expression,display=false}:{expression:string;display?:boolean}){
 const html=katex.renderToString(expression.slice(0,3000),{displayMode:display,throwOnError:false,trust:false,strict:"ignore",maxExpand:100,maxSize:10,output:"htmlAndMathml"});
 return <span className={display?"finance-math-block":"finance-math-inline"} dangerouslySetInnerHTML={{__html:html}}/>;
}
