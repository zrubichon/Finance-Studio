"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || password.length < 8) {
      setMessage("Use a valid email and a password of at least 8 characters.");
      return;
    }

    setBusy(true);

    try {
      const supabase = createClient();

      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { name: name.trim() || email.split("@")[0] },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;

        if (data.session) {
          router.push("/account");
          router.refresh();
          return;
        }

        setMessage("Account created. Check your email to confirm your address, then sign in.");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      router.push("/account");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-toggle" aria-label="Authentication mode">
        <button className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")} type="button">Sign in</button>
        <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")} type="button">Create account</button>
      </div>

      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <label>
            <span>Name</span>
            <input autoComplete="name" onChange={(event) => setName(event.target.value)} placeholder="Your name" value={name} />
          </label>
        )}

        <label>
          <span>Email</span>
          <input autoComplete="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" value={email} />
        </label>

        <label>
          <span>Password</span>
          <input autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={8} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" type="password" value={password} />
        </label>

        <button className="auth-submit" disabled={busy} type="submit">
          {busy ? "Working…" : mode === "signup" ? "Create my FinanceStudio account" : "Sign in to FinanceStudio"}
        </button>
      </form>

      {message && <p className="auth-message" role="status">{message}</p>}

      <p className="auth-footnote">Your progress, themes, interview practice and paper portfolio stay tied to your account.</p>
    </div>
  );
}
