import type {MetadataRoute} from 'next';
import {curriculumYears,moduleSlug} from '@/lib/curriculum';
export default function sitemap():MetadataRoute.Sitemap{return ['','discover','university','markets','markets/guide','careers','careers/training','dictionary','interview',...curriculumYears.flatMap(y=>y.modules.map(m=>`university/${moduleSlug(y.year,m.title)}`))].map(path=>({url:`https://learnfinancestudio.com/${path}`,changeFrequency:path==='markets'?'daily':'monthly',priority:path==='discover'?1:path===''?.9:.6}));}
