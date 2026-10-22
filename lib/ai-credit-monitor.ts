import 'server-only';
import { createGateway } from 'ai';
import { cacheCall } from '@/lib/shared-ai-cache';
import type { CreditSnapshot } from './ai-credit-math';

export async function captureAiCredits(): Promise<CreditSnapshot> {
  const gateway = createGateway({
    teamIdOrSlug: 'team_HN5PcJr1WUFQQxifjDG6fON8',
    fetch: (input, init) => fetch(input, { ...init, cache: 'no-store', signal: AbortSignal.timeout(12000) }),
  });
  const credits = await gateway.getCredits();
  const balance = Number(credits.balance), totalUsed = Number(credits.totalUsed);
  if (!credits.balance.trim() || !credits.totalUsed.trim() || !Number.isFinite(balance) || !Number.isFinite(totalUsed) || totalUsed < 0) {
    throw new Error('Invalid credit response');
  }
  return cacheCall<CreditSnapshot>({ action: 'credit-snapshot', balance, totalUsed });
}
