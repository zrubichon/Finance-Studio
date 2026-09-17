import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceStudio — Learn the market, understand the why",
  description: "A bilingual finance learning, market intelligence and interview-preparation platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
