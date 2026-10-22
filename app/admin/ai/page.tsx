import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import SectionLayout from '@/components/section-layout';
import OwnerRevenueSimulator from '@/components/owner-revenue-simulator';
import { createClient } from '@/lib/supabase/server';
import { captureAiCredits } from '@/lib/ai-credit-monitor';
import { creditForecast, type CreditSnapshot } from '@/lib/ai-credit-math';
import './owner-ai.css';
export const dynamic = 'force-dynamic';
export const metadata = { robots: { index:false, follow:false } };

export default async function OwnerAiPage({searchParams}:{searchParams:Promise<{window?:string}>}) {
  const db = await createClient();
  const {data:{user}} = await db.auth.getUser();
  if (!user) redirect('/login');
  if (user.id !== 'b60fe531-9163-4b79-874c-b2910d99ac6e') notFound();
  const {data:allowed} = await db.rpc('finance_admin_access');
  if (allowed !== true) notFound();
  // Authorization precedes every Gateway read and every disclosure of billing data.
  const french = (await cookies()).get('finance-studio-language')?.value === 'FR';
  const t = (en:string,fr:string) => french?fr:en;
  const locale = french?'fr-FR':'en-US';
  let live: CreditSnapshot | null = null;
  try { live = await captureAiCredits(); } catch { /* Show the last dated sample, never a fabricated balance. */ }
  const {data,error} = await db.rpc('finance_admin_ai_history');
  const history = Array.isArray(data)?data as CreditSnapshot[]:[];
  if(live) history.push(live);
  const rows = [...new Map(history.map(row=>[row.observedAt,row])).values()].sort((a,b)=>Date.parse(a.observedAt)-Date.parse(b.observedAt));
  const days = (await searchParams).window==='30'?30:7;
  const forecast = creditForecast(rows, days);
  const usd = (n:number|null|undefined) => n===null||n===undefined?'—':new Intl.NumberFormat(locale,{style:'currency',currency:'USD',maximumFractionDigits:n!==0&&Math.abs(n)<0.01?4:2}).format(n);
  const date = (s:string) => new Date(s).toLocaleString(locale,{dateStyle:'medium',timeStyle:'short'});
  const fmt = (n:number) => new Intl.NumberFormat(locale,{maximumFractionDigits:1}).format(n);
  const chart = rows.filter(row=>Date.parse(row.observedAt)>=Date.now()-30*86400000);
  const start = Date.parse(chart[0]?.observedAt||new Date().toISOString()), end = Date.parse(chart.at(-1)?.observedAt||new Date().toISOString());
  const min = Math.min(0,...chart.map(row=>row.balance)), max = Math.max(1,...chart.map(row=>row.balance));
  const xy = (row:CreditSnapshot) => `${40+(Date.parse(row.observedAt)-start)/(end-start||1)*820},${220-(row.balance-min)/(max-min||1)*180}`;
  return <SectionLayout activeSlug="admin" eyebrow={t('OWNER ONLY','PROPRIÉTAIRE UNIQUEMENT')} title={{en:'Your AI budget, at a glance',fr:'Ton budget IA, en un regard'}} description={{en:'Actual Vercel credits, observed spending and a private forecast. Only your verified owner account can open this page.',fr:'Crédits Vercel réels, dépenses observées et prévision privée. Seul ton compte propriétaire vérifié peut ouvrir cette page.'}}>
    <div className="owner-ai-toolbar"><Link href="/admin">← {t('Administration','Administration')}</Link><form action="/admin/ai"><input type="hidden" name="window" value={days}/><button type="submit" className="full-button">↻ {t('Refresh the balance','Actualiser le solde')}</button></form></div>
    <section className="owner-credit-banner"><div><span className="eyebrow">{t('AI GATEWAY · USD BALANCE','AI GATEWAY · SOLDE EN USD')}</span><h2>{usd(forecast?.latest.balance)}</h2><p>{t('Available AI credit balance','Crédits IA disponibles')}</p></div><div><strong>{live?t('Live balance checked','Solde vérifié en direct'):t('Last known balance','Dernier solde connu')}</strong><p>{forecast?date(forecast.latest.observedAt):t('No balance available yet.','Aucun solde disponible pour le moment.')}</p><p>{t('Shared across this Vercel team. Other projects may also consume it.','Partagé par cette équipe Vercel. D’autres projets peuvent aussi le consommer.')}</p></div></section>
    {!live&&<p role="status" className="owner-notice">{t('Vercel could not be reached right now. A saved balance, if present, is dated above and may have changed. Retry with Refresh.','Vercel n’a pas pu être consulté à cet instant. Le solde enregistré, s’il existe, est daté ci-dessus et peut avoir changé. Réessaie avec Actualiser.')}</p>}
    {error&&<p role="alert">{t('The history is temporarily unavailable.','L’historique est temporairement indisponible.')}</p>}
    <nav className="learner-tabs" aria-label={t('Forecast window','Période de prévision')}>{[7,30].map(n=><Link key={n} prefetch={false} href={`/admin/ai?window=${n}`} aria-current={days===n?'page':undefined}>{n} {t('days','jours')}</Link>)}</nav>
    <section className="owner-credit-metrics">
      <article><span>{t('Observed spend','Dépenses observées')}</span><strong>{usd(forecast?.spend)}</strong><small>{forecast?t(`Over ${fmt(forecast.elapsedDays)} observed days`, `Sur ${fmt(forecast.elapsedDays)} jours observés`):'—'}</small></article>
      <article><span>{t('Average per day','Moyenne par jour')}</span><strong>{usd(forecast?.dailyRate)}</strong><small>{t('Based on credit consumption','Selon la consommation des crédits')}</small></article>
      <article><span>{t('Projected spend / 30 days','Projection de dépenses / 30 jours')}</span><strong>{usd(forecast?.monthlySpend)}</strong><small>{t('If the measured pace stays the same','Si le rythme mesuré reste le même')}</small></article>
      <article><span>{t('Estimated time remaining','Autonomie estimée')}</span><strong>{forecast?.daysLeft===null||!forecast?'—':forecast.daysLeft>3650?t('Over 10 years','Plus de 10 ans'):`${fmt(forecast.daysLeft)} ${t('days','jours')}`}</strong><small>{t('Excludes future top-ups','Hors futures recharges')}</small></article>
    </section>
    <section className="learner-panel"><h2>{t('When should you top up?','Quand prévoir une recharge ?')}</h2>
      {!forecast||forecast.dailyRate===null?<p>{t('The history starts with this feature. At least 24 hours of valid readings are needed before showing a daily rate and a forecast. The daily automatic reading builds this history even when you do not visit.','L’historique commence avec cette fonctionnalité. Il faut au moins 24 heures de relevés valides avant d’afficher un rythme quotidien et une prévision. Le relevé automatique quotidien construit cet historique même sans visite.')}</p>:forecast.dailyRate===0&&forecast.latest.balance>0?<p>{t('No additional credit consumption was observed in this interval. There is no meaningful depletion date yet.','Aucune consommation supplémentaire n’a été observée sur cet intervalle. Il n’y a pas encore de date d’épuisement significative.')}</p>:<><p className={forecast.daysLeft!==null&&forecast.daysLeft<=7?'owner-notice':''}><strong>{forecast.depletionAt?t(`Estimated depletion: ${date(forecast.depletionAt)}`,`Épuisement estimé : ${date(forecast.depletionAt)}`):t('No near-term depletion date.','Aucune date d’épuisement proche.')}</strong></p><p>{t('Additional credits needed to cover the next 30 days at this pace','Crédits supplémentaires pour couvrir les 30 prochains jours à ce rythme')} : <strong>{usd(forecast.rechargeFor30Days)}</strong>.</p></>}
      {forecast?.latest.balance!==undefined&&forecast.latest.balance<=0&&<p role="alert" className="owner-notice">{t('The available balance is exhausted. New AI requests may be rejected.','Le solde disponible est épuisé. Les nouvelles demandes IA peuvent être refusées.')}</p>}
      {forecast?.reset&&<p>{t('The provider cumulative counter decreased. This interval cannot support a reliable spending forecast.','Le compteur cumulé du fournisseur a diminué. Cet intervalle ne permet pas une prévision fiable.')}</p>}
      <p className="owner-method">{t('This is an estimate, not a payment due date. Traffic, model choice, answer length, shared-cache reuse, credit expiry and automatic top-ups can change the result. A partial window is labeled with its actual coverage. Hosting, databases and email are separate.','C’est une estimation, pas une échéance de paiement. Le trafic, le modèle, la longueur des réponses, la réutilisation des fiches, l’expiration des crédits et les recharges automatiques peuvent changer le résultat. Une période incomplète affiche sa durée réellement observée. Hébergement, base de données et email sont distincts.')}</p>
    </section>
    <section className="learner-panel"><h2>{t('Balance history · past 30 days','Évolution du solde · 30 derniers jours')}</h2>{chart.length>1?<figure className="owner-credit-chart"><svg viewBox="0 0 900 260" role="img" aria-label={t('Observed AI credit balance in US dollars','Solde des crédits IA relevé, en dollars américains')}><title>{t('Observed balance, USD','Solde observé, USD')}</title><line x1="40" y1="220" x2="860" y2="220" stroke="currentColor" opacity=".2"/><polyline points={chart.map(xy).join(' ')} fill="none" stroke="var(--accent)" strokeWidth="3"/>{chart.map((row,i)=>{const [cx,cy]=xy(row).split(',');return <circle key={i} cx={cx} cy={cy} r="3" fill="var(--accent)"><title>{`${date(row.observedAt)} · ${usd(row.balance)}`}</title></circle>;})}<text x="40" y="20" fill="currentColor">{usd(max)}</text><text x="40" y="250" fill="currentColor">{new Date(start).toLocaleDateString(locale)}</text><text x="860" y="250" textAnchor="end" fill="currentColor">{new Date(end).toLocaleDateString(locale)}</text></svg><figcaption>{t('Each point is a recorded balance. Lines connect readings; missing intervals are not reconstructed.','Chaque point est un solde enregistré. Les lignes relient les relevés ; les intervalles manquants ne sont pas reconstitués.')}</figcaption></figure>:<p>{t('The chart appears after the second hourly or daily reading.','La courbe apparaîtra après le deuxième relevé horaire ou quotidien.')}</p>}
      <details className="practice-correction"><summary>{t('View readings and method','Voir les relevés et la méthode')}</summary><p>{t('One stored reading per hour when you visit, plus one automatic daily reading. Spending is the increase in Vercel’s cumulative consumed credits; a top-up does not count as negative spending.','Un relevé conservé par heure lors de tes visites, plus un relevé automatique quotidien. La dépense correspond à l’augmentation des crédits cumulés consommés chez Vercel ; une recharge ne devient pas une dépense négative.')}</p><p>{t('Lifetime consumed credits reported by Vercel','Crédits cumulés consommés déclarés par Vercel')} : {usd(forecast?.latest.totalUsed)}.</p><p>{t('Net credits added during the observed interval','Crédits ajoutés nets sur l’intervalle observé')} : {usd(forecast?.netCreditsAdded)}. {t('May include purchases, grants, expiry or adjustments. This is not an invoice total.','Peut refléter achats, crédits offerts, expiration ou ajustements. Ce n’est pas un total de factures.')}</p><div className="admin-table-scroll"><table><thead><tr><th>{t('Reading','Relevé')}</th><th>{t('Balance (USD)','Solde (USD)')}</th><th>{t('Total consumed (USD)','Total consommé (USD)')}</th></tr></thead><tbody>{rows.slice(-30).reverse().map(row=><tr key={row.observedAt}><td>{date(row.observedAt)}</td><td>{usd(row.balance)}</td><td>{usd(row.totalUsed)}</td></tr>)}</tbody></table></div></details>
      <p><a href="https://vercel.com/zoe-rubichon-s-projects/~/ai-gateway" target="_blank" rel="noreferrer">{t('Open Vercel AI Gateway','Ouvrir Vercel AI Gateway')} ↗</a></p>
    </section>
    <OwnerRevenueSimulator french={french}/>
  </SectionLayout>;
}
