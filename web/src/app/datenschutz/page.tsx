import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageIntro from "@/components/PageIntro";
import { Section } from "@/components/Section";

type PrivacySection = {
  title: string;
  paragraphs: string[];
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("navigation.privacy"),
    description: t("privacy.metaDescription"),
  };
}

// TODO(legal): taken from the old site without the Facebook section; must be reviewed against the final stack (hosting, contact form, map, responsible party) before go-live
export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const sections = t.raw("sections") as PrivacySection[];

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} />
      <Section>
        <Box sx={{ maxWidth: "48rem" }}>
          {sections.map((section) => (
            <Box key={section.title} sx={{ mb: 4 }}>
              <Typography component="h2" variant="h3" sx={{ mb: 1 }}>
                {section.title}
              </Typography>
              {section.paragraphs.map((paragraph) => (
                <Typography key={paragraph} sx={{ mb: 2 }}>
                  {paragraph}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Section>
    </>
  );
}
