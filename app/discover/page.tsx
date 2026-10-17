import type {Metadata} from 'next';
import DiscoverFinance from '@/components/discover-finance';
export const metadata:Metadata={title:'FinanceStudio · Learn, practise and understand finance',description:'A bilingual finance learning studio: 48 modules, financial markets, spaced reviews and mock interviews.',alternates:{canonical:'https://learnfinancestudio.com/discover'},openGraph:{title:'FinanceStudio · Understand the why',description:'Finance courses, markets and interview practice in English and French.',url:'https://learnfinancestudio.com/discover',type:'website'}};
export default function Page(){return <DiscoverFinance/>;}
