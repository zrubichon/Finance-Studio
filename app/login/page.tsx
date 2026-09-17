"use client";

import Link from "next/link";
import AuthForm from "@/components/auth-form";
import { useLanguage } from "@/components/language-provider";

export default function LoginPage() {
  const { text } = useLanguage();

  return (
    <main className="auth-shell">
      <section className="auth-story">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>

        <div>
          <p className="eyebrow">{text("YOUR FINANCE WORKSPACE", "TON ESPACE DE TRAVAIL FINANCE")}</p>
          <h1>{text(
            "Learn the market. Build the vocabulary. Be ready for the interview.",
            "Apprends les marchés. Construis ton vocabulaire. Sois prêt pour les entretiens / interviews."
          )}</h1>
          <p>{text(
            "One account keeps your university progress, bilingual vocabulary, interview practice, saved market concepts, theme preferences and virtual investing work in sync.",
            "Un seul compte synchronise ta progression dans l’Université de Finance, ton vocabulaire bilingue, tes entraînements d’entretien / interview practice, tes concepts de marché enregistrés, tes préférences de thème et ton travail d’investissement virtuel / paper investing."
          )}</p>
        </div>

        <div className="auth-benefits">
          <span>{text("Year 1 → Year 4 curriculum", "Programme Année 1 → Année 4")}</span>
          <span>{text("Beginner → Professional explanations", "Explications Débutant → Professionnel")}</span>
          <span>{text("FR + EN finance vocabulary", "Vocabulaire finance FR + EN")}</span>
          <span>{text("Interview & Investing Labs", "Studios Entretien & Investissement")}</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <p className="eyebrow">{text("FINANCESTUDIO ACCOUNT", "COMPTE FINANCESTUDIO")}</p>
          <h2>{text("Continue building your finance knowledge.", "Continue à construire tes connaissances en finance.")}</h2>
          <p className="auth-intro">{text(
            "Create a free account or sign back in. No real-money trading is connected to FinanceStudio.",
            "Crée un compte gratuit ou reconnecte-toi. Aucun trading en argent réel / real-money trading n’est connecté à FinanceStudio."
          )}</p>
          <AuthForm />
          <Link className="auth-back" href="/">← {text("Continue without signing in", "Continuer sans se connecter")}</Link>
        </div>
      </section>
    </main>
  );
}
