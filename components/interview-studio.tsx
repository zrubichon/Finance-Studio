"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Track = "Investment Banking" | "Sales & Trading" | "Asset Management" | "Wealth Management" | "Private Equity" | "Equity Research";

const tracks: Track[] = ["Investment Banking", "Sales & Trading", "Asset Management", "Wealth Management", "Private Equity", "Equity Research"];

const questions: Record<Track, { question: string; tests: string; framework: string[]; followUp: string }> = {
  "Investment Banking": {
    question: "Walk me through a DCF.",
    tests: "Valuation logic, enterprise/equity value bridge, discounting and ability to structure a technical answer.",
    framework: ["Forecast unlevered free cash flow", "Estimate WACC", "Calculate terminal value", "Discount cash flows to present value", "Derive enterprise value", "Bridge to equity value"],
    followUp: "What happens to a DCF valuation if WACC rises by 100 bps?",
  },
  "Sales & Trading": {
    question: "The US 10-year yield rises sharply after CPI. Walk me through the cross-asset impact.",
    tests: "Rates intuition, expectations, equity duration, FX, positioning and ability to separate first-order from second-order effects.",
    framework: ["Identify the CPI surprise", "Translate it into Fed expectations", "Explain the Treasury move", "Discuss USD reaction", "Discuss equity sectors", "State what could reverse the move"],
    followUp: "Why might equities rally even if yields initially rise?",
  },
  "Asset Management": {
    question: "You have $10 million to invest. How would you build the portfolio?",
    tests: "Objectives, risk budget, asset allocation, diversification, liquidity and disciplined reasoning rather than stock picking alone.",
    framework: ["Define objective and horizon", "Set risk and liquidity constraints", "Choose strategic asset allocation", "Select implementation vehicles", "Define rebalancing rules", "State key risks"],
    followUp: "How would your answer change if inflation remains structurally high?",
  },
  "Wealth Management": {
    question: "A client wants high returns but says they cannot tolerate losses. How do you respond?",
    tests: "Client discovery, suitability, risk communication, behavioral finance and ability to explain trade-offs clearly.",
    framework: ["Clarify goals", "Separate risk capacity from risk tolerance", "Explain return/risk trade-off", "Propose scenarios", "Build an appropriate allocation", "Document and review"],
    followUp: "How would you explain drawdown risk to a non-financial client?",
  },
  "Private Equity": {
    question: "What makes a company attractive for an LBO?",
    tests: "Cash-flow quality, leverage capacity, entry valuation, operational upside and exit assumptions.",
    framework: ["Stable cash flow", "Defensible business model", "Debt capacity", "Attractive entry valuation", "Operational improvement", "Credible exit pathways"],
    followUp: "Which variable can have the largest impact on IRR?",
  },
  "Equity Research": {
    question: "Pitch me a stock in three minutes.",
    tests: "Thesis construction, valuation, catalysts, risks and concise communication.",
    framework: ["One-line recommendation", "Business model", "Variant thesis", "Valuation", "Catalysts", "Risks and disconfirming evidence"],
    followUp: "What would make you change your recommendation?",
  },
};

function questionKey(track: Track) {
  return track.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function InterviewStudio() {
  const [track, setTrack] = useState<Track>("Investment Banking");
  const [answer, setAnswer] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const active = useMemo(() => questions[track], [track]);

  useEffect(() => {
    let mounted = true;
    async function loadUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted || !user) return;
      setUserId(user.id);
      const { count } = await supabase.from("interview_attempts").select("id", { count: "exact", head: true }).eq("user_id", user.id);
      if (mounted) setAttemptCount(count ?? 0);
    }
    loadUser();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    setAnswer("");
    setStatus("");
  }, [track]);

  async function saveAttempt() {
    if (!userId || !answer.trim()) return;
    setSaving(true);
    setStatus("");
    const supabase = createClient();
    const { error } = await supabase.from("interview_attempts").insert({
      user_id: userId,
      track,
      question_key: questionKey(track),
      answer_text: answer.trim(),
      evaluation: { status: "submitted_unscored", version: 1 },
    });

    if (error) {
      setStatus("Your answer could not be saved. Please try again.");
    } else {
      setAttemptCount((count) => count + 1);
      setStatus("Practice attempt saved to your account.");
    }
    setSaving(false);
  }

  return (
    <div className="workspace-stack">
      <section className="control-panel interview-control-panel">
        <div>
          <span className="control-label">CAREER TRACK</span>
          <div className="chip-row">
            {tracks.map((item) => (
              <button className={track === item ? "chip active" : "chip"} onClick={() => setTrack(item)} key={item} type="button">{item}</button>
            ))}
          </div>
        </div>
        <div className="attempt-counter">
          <span className="control-label">SAVED ATTEMPTS</span>
          <strong>{attemptCount}</strong>
        </div>
      </section>

      <section className="interview-question-panel">
        <div className="question-meta">
          <span className="mini-label">TECHNICAL / MARKET QUESTION</span>
          <span className="pill accent">{track}</span>
        </div>
        <h2>{active.question}</h2>
        <div className="interview-two-column">
          <div>
            <span className="control-label">WHAT THE INTERVIEWER IS TESTING</span>
            <p>{active.tests}</p>
          </div>
          <div>
            <span className="control-label">FOLLOW-UP</span>
            <p>{active.followUp}</p>
          </div>
        </div>
      </section>

      <section className="answer-practice-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">YOUR ANSWER</span>
            <h2>Practice before reading a perfect script.</h2>
          </div>
          <span className="connection-badge">{userId ? "Account sync on" : "Sign in to save"}</span>
        </div>
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Write your answer here as if you were speaking to the interviewer…"
          rows={8}
        />
        <div className="answer-practice-actions">
          {userId ? (
            <button className="full-button" type="button" disabled={!answer.trim() || saving} onClick={saveAttempt}>
              {saving ? "Saving…" : "Save practice attempt"}
            </button>
          ) : (
            <Link className="full-button" href="/login">Sign in to save attempts →</Link>
          )}
          {status && <span className="inline-status" role="status">{status}</span>}
        </div>
      </section>

      <section className="answer-framework-panel">
        <div className="panel-heading">
          <div>
            <span className="mini-label">IDEAL ANSWER STRUCTURE</span>
            <h2>Build reasoning before memorizing wording</h2>
          </div>
          <span className="connection-badge">AI scoring comes after the persistence layer</span>
        </div>
        <div className="framework-steps-grid">
          {active.framework.map((step, index) => (
            <div className="framework-step" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="analysis-grid">
        <article className="analysis-card">
          <span className="mini-label">BEHAVIORAL</span>
          <h3>Tell me about yourself</h3>
          <p>Build a concise present → evidence → finance motivation → why this role structure.</p>
        </article>
        <article className="analysis-card">
          <span className="mini-label">MENTAL MATH</span>
          <h3>Train speed without losing logic</h3>
          <p>Percentages, growth rates, breakevens, multiples, probability and market arithmetic.</p>
        </article>
        <article className="analysis-card">
          <span className="mini-label">MARKET AWARENESS</span>
          <h3>Know what matters today</h3>
          <p>Connect current macro events to assets, sectors, valuation and the role you are interviewing for.</p>
        </article>
      </section>
    </div>
  );
}
