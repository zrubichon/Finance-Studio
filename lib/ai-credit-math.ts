export type CreditSnapshot = { observedAt: string; balance: number; totalUsed: number };
const DAY = 86_400_000;

export function creditForecast(history: CreditSnapshot[], windowDays = 7) {
  const rows = history.filter(row => Number.isFinite(Date.parse(row.observedAt)) &&
    Number.isFinite(row.balance) && Number.isFinite(row.totalUsed) && row.totalUsed >= 0)
    .sort((a, b) => Date.parse(a.observedAt) - Date.parse(b.observedAt));
  const latest = rows.at(-1);
  if (!latest) return null;
  const cutoff = Date.parse(latest.observedAt) - windowDays * DAY;
  const baseline = rows.findLast(row => Date.parse(row.observedAt) <= cutoff) ?? rows[0];
  const selected = rows.filter(row => Date.parse(row.observedAt) >= Date.parse(baseline.observedAt));
  const elapsedDays = (Date.parse(latest.observedAt) - Date.parse(baseline.observedAt)) / DAY;
  const reset = selected.some((row, index) => index > 0 && row.totalUsed < selected[index - 1].totalUsed);
  const spend = reset ? null : Math.max(0, latest.totalUsed - baseline.totalUsed);
  // A short burst should not be presented as a reliable daily spending rate.
  const dailyRate = !reset && elapsedDays >= 1 && spend !== null ? spend / elapsedDays : null;
  const daysLeft = latest.balance <= 0 ? 0 : dailyRate !== null && dailyRate > 0 ? latest.balance / dailyRate : null;
  const depletionAt = daysLeft !== null && daysLeft <= 3650
    ? new Date(Date.parse(latest.observedAt) + daysLeft * DAY).toISOString() : null;
  return { latest, baseline, elapsedDays, spend, reset, dailyRate, daysLeft, depletionAt,
    monthlySpend: dailyRate === null ? null : dailyRate * 30,
    netCreditsAdded: spend === null ? null : latest.balance - baseline.balance + spend,
    rechargeFor30Days: dailyRate === null ? null : Math.max(0, dailyRate * 30 - Math.max(0, latest.balance)),
    coveredWindow: elapsedDays >= windowDays,
  };
}

export type RevenueInputs = {
  price: number; subscribers: number; actions: number; costPerActionUsd: number;
  usdPerEur: number; paymentPercent: number; paymentFixed: number; fixedCosts: number;
};
export function revenueScenario(v: RevenueInputs) {
  const revenue = v.price * v.subscribers;
  const aiPerSubscriber = v.actions * v.costPerActionUsd / Math.max(0.01, v.usdPerEur);
  const feePerSubscriber = v.price * v.paymentPercent / 100 + v.paymentFixed;
  const contribution = v.price - aiPerSubscriber - feePerSubscriber;
  return { revenue, aiCosts: aiPerSubscriber * v.subscribers, fees: feePerSubscriber * v.subscribers,
    margin: contribution * v.subscribers - v.fixedCosts,
    breakEven: contribution > 0 ? Math.ceil(v.fixedCosts / contribution) : null,
    contribution,
  };
}
