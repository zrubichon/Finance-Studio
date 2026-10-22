import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { captureAiCredits } from '@/lib/ai-credit-monitor';
export const dynamic = 'force-dynamic';
export const maxDuration = 45;
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const authorization = req.headers.get('authorization') || '';
  const expected = `Bearer ${secret || ''}`;
  const a = Buffer.from(authorization), b = Buffer.from(expected);
  if (!secret || a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }
  try {
    const snapshot = await captureAiCredits();
    return NextResponse.json({ ok: true, observedAt: snapshot.observedAt }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Credit synchronization unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
