import SectionLayout from "@/components/section-layout";
import ThemeStudio from "@/components/theme-studio";

export default function ThemesPage() {
  return (
    <SectionLayout
      activeSlug="themes"
      eyebrow="THEME STUDIO"
      title="Make the workspace feel personal without making finance harder to read."
      description="Choose a professional preset, adjust card roundness and set a custom accent. These preferences now persist in the browser across FinanceStudio sections and will later sync to the user account."
    >
      <ThemeStudio />
    </SectionLayout>
  );
}
