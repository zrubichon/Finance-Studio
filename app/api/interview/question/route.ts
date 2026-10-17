import {NextRequest,NextResponse} from 'next/server';
import {isInterviewTrack} from '@/lib/interview-content';
import {getInterviewExercise,nextInterviewExercise} from '@/lib/interview-question-bank';
export async function GET(request:NextRequest){const p=request.nextUrl.searchParams,track=p.get('track');if(!isInterviewTrack(track))return NextResponse.json({error:'Unknown career track'},{status:400});const id=p.get('id');const exercise=id?getInterviewExercise(track,id):nextInterviewExercise(track,p.get('after')||'');return exercise?NextResponse.json(exercise,{headers:{'Cache-Control':'no-store'}}):NextResponse.json({error:'Unknown question'},{status:404});}
