# FinanceStudio

FinanceStudio is a bilingual finance-learning and market-intelligence platform designed to take a learner from zero knowledge to professional finance vocabulary and interview readiness.

## Product pillars

- **Global market intelligence** with USA and Europe priority, plus regional filters.
- **News that teaches**: facts, causes, market reaction, connected concepts and scenarios.
- **Finance University**: a structured Year 1 → Year 4 curriculum.
- **Three explanation modes**: Beginner, Intermediate and Professional. The knowledge base stays equally complete; only the teaching style changes.
- **Bilingual learning**: English plus French with English technical terms.
- **Interview Studio** for technical, behavioral, market and case preparation.
- **Careers** by finance role and employer type.
- **Investing Lab** with virtual portfolios and error-based learning.
- **AI Professor** for adaptive explanations and misconception diagnosis.
- **Theme Studio** for a professional but highly personalized workspace.

## Current foundation build

This first implementation establishes the responsive product shell, navigation, language/level/theme controls, learning dashboard and structural pages. It intentionally does **not** display fabricated market prices. Live market/news data, authentication, Supabase persistence and AI orchestration are the next product layers.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Vercel deployment target
- Supabase planned for auth, Postgres and user progress

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Product rule

A feature is not considered complete until it has been reviewed, tested, corrected at the root cause and re-tested on the deployed build.
