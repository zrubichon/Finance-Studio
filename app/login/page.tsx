import Link from "next/link";
import AuthForm from "@/components/auth-form";

export default function LoginPage() {
  return (
    <main className="auth-shell">
      <section className="auth-story">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>

        <div>
          <p className="eyebrow">YOUR FINANCE WORKSPACE</p>
          <h1>Learn the market. Build the vocabulary. Be ready for the interview.</h1>
          <p>
            One account keeps your university progress, bilingual vocabulary, interview practice,
            saved market concepts, theme preferences and virtual investing work in sync.
          </p>
        </div>

        <div className="auth-benefits">
          <span>Year 1 → Year 4 curriculum</span>
          <span>Beginner → Professional explanations</span>
          <span>FR + EN finance vocabulary</span>
          <span>Interview & Investing Labs</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <p className="eyebrow">FINANCESTUDIO ACCOUNT</p>
          <h2>Continue building your finance knowledge.</h2>
          <p className="auth-intro">Create a free account or sign back in. No real-money trading is connected to FinanceStudio.</p>
          <AuthForm />
          <Link className="auth-back" href="/">← Continue without signing in</Link>
        </div>
      </section>
    </main>
  );
}
