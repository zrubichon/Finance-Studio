import {NextRequest,NextResponse} from 'next/server';
import {hourlyLearning} from '@/lib/hourly-learning';
export async function GET(request:NextRequest){return NextResponse.json(hourlyLearning(Date.now(),request.nextUrl.searchParams.get('kind')==='interview'?173:0),{headers:{'Cache-Control':'no-store'}});}
