import type { Metadata } from "next";
import ThemeBootstrap from "@/components/theme-bootstrap";
import "./globals.css";
import "./product.css";

export const metadata: Metadata = {
  title: "FinanceStudio — Learn the market, understand the why",
  description: "A bilingual finance learning, market intelligence and interview-preparation platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ThemeBootstrap />
        {children}
      </body>
    </html>
  );
}
