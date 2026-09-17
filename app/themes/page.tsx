import SectionLayout from "@/components/section-layout";
import ThemeStudio from "@/components/theme-studio";

export default function ThemesPage() {
  return (
    <SectionLayout
      activeSlug="themes"
      eyebrow={{ en: "THEME STUDIO", fr: "STUDIO DE THÈMES" }}
      title={{ en: "Make FinanceStudio feel like your workspace.", fr: "Fais de FinanceStudio ton propre espace de travail." }}
      description={{
        en: "Customize color, density, dashboard modules and visual tone while preserving professional readability.",
        fr: "Personnalise les couleurs, la densité, les modules du tableau de bord et le style visuel tout en conservant une lisibilité professionnelle.",
      }}
    >
      <ThemeStudio />
    </SectionLayout>
  );
}
