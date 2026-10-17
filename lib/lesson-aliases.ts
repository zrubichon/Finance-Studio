// Keep existing progress and notebook keys while exposing the proper Year 4 URLs.
const advanced=['advanced-valuation','leveraged-finance','advanced-fixed-income','advanced-derivatives','macro-trading-frameworks','hedge-funds-alternatives','portfolio-construction','behavioral-finance','structured-products','regulation-ethics','professional-market-communication'];
export function lessonStorageSlug(slug:string){if(slug==='year-3-m-a-analysis')return 'year-3-ma-analysis';return advanced.some(name=>slug===`year-4-${name}`)?slug.replace('year-4-','year-3-'):slug;}
export function isFourthYearLesson(slug:string){return advanced.some(name=>slug===`year-3-${name}`||slug===`year-4-${name}`)||slug==='year-4-capstone-investment-deal-case';}
