import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ContactCta from "@/components/ContactCta";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PageIntro from "@/components/PageIntro";
import { Section, SectionHeading } from "@/components/Section";
import ValueList from "@/components/ValueList";
import type { ContentItem } from "@/content/services";

type TeamMember = {
  name: string;
  role: string;
  text: string;
  imageLabel: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("navigation.about"),
    description: t("about.metaDescription"),
  };
}

export default function AboutPage() {
  const t = useTranslations("about");
  const tRoot = useTranslations();
  const team = t.raw("team") as TeamMember[];

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} />

      <Section labelledBy="team">
        <SectionHeading id="team" eyebrow={t("teamEyebrow")}>
          {t("teamTitle")}
        </SectionHeading>
        <Box sx={{ display: "grid", gap: { xs: 5, md: 8 } }}>
          {team.map((member) => (
            <Box
              key={member.name}
              sx={{
                display: "grid",
                gap: { xs: 3, md: 6 },
                alignItems: "center",
                gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
              }}
            >
              <ImagePlaceholder label={member.imageLabel} aspectRatio="1 / 1" />
              <div>
                <Typography component="h3" variant="h3">
                  {member.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "secondary.main", fontWeight: 600, mb: 2 }}
                >
                  {member.role}
                </Typography>
                <Typography>{member.text}</Typography>
              </div>
            </Box>
          ))}
        </Box>
      </Section>

      <Section tone="warm" labelledBy="werte">
        <SectionHeading id="werte" eyebrow={t("valuesEyebrow")}>
          {t("valuesTitle")}
        </SectionHeading>
        <ValueList items={tRoot.raw("values") as ContentItem[]} />
      </Section>

      <Section labelledBy="ausbildung">
        <Typography id="ausbildung" component="h2" variant="h2" sx={{ mb: 2 }}>
          {t("trainingTitle")}
        </Typography>
        <Typography sx={{ maxWidth: "48rem" }}>{t("trainingText")}</Typography>
      </Section>

      <ContactCta />
    </>
  );
}
