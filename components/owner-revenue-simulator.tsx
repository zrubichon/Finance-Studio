"use client";
import { useId, useState } from 'react';
import { revenueScenario, type RevenueInputs } from '@/lib/ai-credit-math';

export default function OwnerRevenueSimulator({ french }: { french: boolean }) {
  const id = useId();
  const t = (en: string, fr: string) => french ? fr : en;
  const [v, setV] = useState<RevenueInputs>({ price: 7.9, subscribers: 20, actions: 50,
    costPerActionUsd: 0.02, usdPerEur: 1.1, paymentPercent: 2.5, paymentFixed: 0.3, fixedCosts: 15 });
  const result = revenueScenario(v);
  const eur = (n: number) => new Intl.NumberFormat(french ? 'fr-FR' : 'en-US', { style: 'currency', currency: 'EUR' }).format(n);
  const fields: { key: keyof RevenueInputs; label: string; step: string; max: number; min?: number }[] = [
    { key:'price', label:t('Monthly price (€)','Prix mensuel (€)'), step:'0.1', max:1000 },
    { key:'subscribers', label:t('Paying subscribers','Abonnés payants'), step:'1', max:1000000 },
    { key:'actions', label:t('New AI generations per subscriber / month','Nouvelles générations IA par abonné / mois'), step:'1', max:10000 },
    { key:'costPerActionUsd', label:t('Assumed average cost per generation (USD)','Coût moyen supposé par génération (USD)'), step:'0.001', max:100 },
    { key:'usdPerEur', label:t('Assumed USD for €1','USD supposés pour 1 €'), step:'0.01', min:0.01, max:10 },
    { key:'paymentPercent', label:t('Assumed payment fees (%)','Frais de paiement supposés (%)'), step:'0.1', max:100 },
    { key:'paymentFixed', label:t('Assumed fixed fee per payment (€)','Frais fixes supposés par paiement (€)'), step:'0.01', max:100 },
    { key:'fixedCosts', label:t('Other monthly costs (€)','Autres coûts mensuels (€)'), step:'1', max:100000 },
  ];
  return <section className="learner-panel owner-revenue"><span className="eyebrow">{t('YOUR PRIVATE BUSINESS SIMULATOR','TON SIMULATEUR ÉCONOMIQUE PRIVÉ')}</span>
    <h2>{t('What could FinanceStudio earn?','Combien pourrait rapporter FinanceStudio ?')}</h2>
    <p>{t('Editable assumptions, not measured costs or promised profit. This simulator does not activate subscriptions or payments.','Hypothèses modifiables, et non coûts mesurés ou bénéfices promis. Ce simulateur n’active aucun abonnement ni paiement.')}</p>
    <div className="owner-simulator-fields">{fields.map(field => <label key={field.key} htmlFor={`${id}-${field.key}`}>{field.label}<input id={`${id}-${field.key}`} type="number" min={field.min ?? 0} max={field.max} step={field.step} value={v[field.key]} onChange={e => {
      const n = Number(e.target.value);
      if (Number.isFinite(n)) setV(old => ({...old,[field.key]:Math.min(field.max,Math.max(field.min ?? 0,field.step==='1'?Math.round(n):n))}));
    }}/></label>)}</div>
    <div className="owner-credit-metrics" aria-live="polite"><article><span>{t('Monthly revenue','Chiffre d’affaires mensuel')}</span><strong>{eur(result.revenue)}</strong></article><article><span>{t('Estimated AI cost','Coût IA estimé')}</span><strong>{eur(result.aiCosts)}</strong></article><article><span>{t('Payment fees','Frais de paiement')}</span><strong>{eur(result.fees)}</strong></article><article><span>{t('Balance before tax and pay','Solde avant impôts et rémunération')}</span><strong className={result.margin<0?'owner-negative':''}>{eur(result.margin)}</strong></article></div>
    <p><strong>{t('Break-even','Seuil d’équilibre')} : {result.breakEven===null?t('This price does not cover the variable cost per subscriber.','Ce prix ne couvre pas le coût variable par abonné.'):t(`${result.breakEven} paying subscribers at these assumptions.`,`${result.breakEven} abonnés payants avec ces hypothèses.`)}</strong></p>
    <p className="owner-method">{t('All included AI generations are assumed to be used. Multiply per-generation cost for multi-call features. VAT, social contributions, income/corporation tax, refunds and currency conversion fees are not modeled; this is not take-home pay. The exchange rate and payment fees above are illustrative inputs, not live quotes.','On suppose que toutes les générations incluses sont consommées. Multiplie le coût pour les fonctions qui appellent plusieurs fois l’IA. TVA, cotisations, impôts, remboursements et frais de change ne sont pas modélisés : ce solde n’est pas un revenu net personnel. Le taux de change et les frais de paiement sont des hypothèses, pas des tarifs ou cours en direct.')}</p>
    <details className="practice-correction"><summary>{t('Suggested launch offer','Proposition d’offre pour le lancement')}</summary><div className="owner-offers"><article><h3>{t('Free discovery','Découverte gratuite')}</h3><p>{t('Introductory courses, market guides, dictionary and a small trial of AI features. Saved shared explanations can remain freely readable.','Cours d’introduction, guides des marchés, dictionnaire et quelques essais IA. Les explications partagées déjà créées peuvent rester accessibles gratuitement.')}</p></article><article><h3>{t('Premium · €7.90/month','Premium · 7,90 €/mois')}</h3><p>{t('Full curriculum, guided exercises, learning progress and an initial allowance of 50 new standard AI generations per month. Weight long analyses and mock interviews according to their actual cost.','Programme complet, exercices guidés, progression et quota initial de 50 nouvelles générations IA standard par mois. Pondérer les longues analyses et entretiens blancs selon leur coût réel.')}</p></article><article><h3>{t('Optional top-ups','Recharges facultatives')}</h3><p>{t('Offer extra AI allowances after measuring average cost. Keep a per-account monthly limit and show the remaining allowance before an action. Validate willingness to pay before adding more plans.','Proposer des quotas IA supplémentaires après avoir mesuré le coût moyen. Garder une limite mensuelle par compte et montrer le quota restant avant une action. Valider l’intérêt des utilisateurs avant de multiplier les formules.')}</p></article></div><p>{t('This is a proposal to validate, not an offer currently sold on the site.','C’est une proposition à valider, pas une offre actuellement vendue sur le site.')}</p></details>
  </section>;
}
