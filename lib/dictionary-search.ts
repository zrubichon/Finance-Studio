export function normalizeDictionaryTerm(value:string) {
 return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
}
export function dictionaryTarget<T extends {en:string;fr:string}>(entries:T[],query:string):T|undefined {
 const q=normalizeDictionaryTerm(query);if(!q)return;
 const aliases:Record<string,string>={"p e":"price to earnings","p e ratio":"price to earnings","wacc":"weighted average cost of capital","ev":"enterprise value","2s10s":"yield curve","target prices":"target price"};
 const wanted=aliases[q]||q;
 return entries.find(e=>[e.en,e.fr].some(v=>normalizeDictionaryTerm(v)===q))
  ||entries.find(e=>[e.en,e.fr].some(v=>normalizeDictionaryTerm(v.split(/[(/]/)[0])===q))
  ||entries.find(e=>[e.en,e.fr].some(v=>normalizeDictionaryTerm(v)===wanted))
  ||entries.find(e=>[e.en,e.fr].some(v=>normalizeDictionaryTerm(v).startsWith(wanted+" ")));
}
export function dictionaryTermId(term:string){return `term-${normalizeDictionaryTerm(term).replace(/ /g,"-")}`;}
