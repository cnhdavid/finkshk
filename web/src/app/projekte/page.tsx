import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Typography from "@mui/material/Typography";
import ContactCta from "@/components/ContactCta";
import PageIntro from "@/components/PageIntro";
import { Section } from "@/components/Section";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("navigation.projects"),
    description: t("projects.metaDescription"),
  };
}

export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")}>
        {t("intro")}
      </PageIntro>
      <Section>
        <Typography sx={{ maxWidth: "42rem" }}>{t("comingSoon")}</Typography>
      </Section>
      <ContactCta />
    </>
  );
}
