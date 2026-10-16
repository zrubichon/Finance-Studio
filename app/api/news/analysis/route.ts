import {NextRequest,NextResponse} from "next/server";
import {newsAnalysis,safeNewsURL} from "@/lib/news-analysis";
export const maxDuration=120;
export async function POST(request:NextRequest){
 const body=await request.json().catch(()=>null);
 const url=safeNewsURL(body?.url),title=typeof body?.title==="string"?body.title.trim().slice(0,400):"";
 if(!url||!title)return NextResponse.json({error:"A headline and a valid public HTTPS source URL are required."},{status:400});
 try{return NextResponse.json(await newsAnalysis(url,title,body?.language==="FR"?"FR":"EN"));}
 catch{return NextResponse.json({error:body?.language==="FR"?"L’analyse n’a pas pu être préparée. Réessaie dans un instant.":"The commentary could not be prepared. Please try again shortly."},{status:503});}
}
