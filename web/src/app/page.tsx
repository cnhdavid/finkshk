import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactCta from "@/components/ContactCta";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import ServiceList from "@/components/ServiceList";
import ValueList from "@/components/ValueList";
import { company } from "@/content/company";
import { serviceSlugs } from "@/content/services";
import type { ContentItem } from "@/content/services";

const twoColumnGrid = {
  display: "grid",
  gap: { xs: 4, md: 8 },
  alignItems: "center",
  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
};

export default function HomePage() {
  const t = useTranslations("home");
  const tActions = useTranslations("actions");
  const tRoot = useTranslations();

  return (
    <>
      <Box sx={{ bgcolor: "surface.main", py: { xs: 5, md: 10 } }}>
        <Container sx={twoColumnGrid}>
          <div>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <Typography component="h1" variant="h1">
              {t("hero.title")}
            </Typography>
            <Typography sx={{ mt: 3, maxWidth: "36rem" }}>
              {t("hero.text")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
              <Button href="/kontakt" variant="contained" color="secondary">
                {tActions("request")}
              </Button>
              <Button
                href={company.phoneHref}
                variant="outlined"
                startIcon={<PhoneIcon />}
              >
                {company.phoneDisplay}
              </Button>
            </Box>
          </div>
          <ImagePlaceholder label={t("hero.imageLabel")} />
        </Container>
      </Box>

      <Section labelledBy="betrieb">
        <Box sx={twoColumnGrid}>
          <div>
            <Eyebrow>{t("intro.eyebrow")}</Eyebrow>
            <Typography id="betrieb" component="h2" variant="h2">
              {t("intro.title")}
            </Typography>
            <Typography sx={{ mt: 3 }}>{t("intro.text")}</Typography>
            <Button href="/ueber-uns" variant="outlined" sx={{ mt: 3 }}>
              {tActions("aboutUs")}
            </Button>
          </div>
          <ValueList items={tRoot.raw("values") as ContentItem[]} />
        </Box>
      </Section>

      <Section tone="warm" labelledBy="leistungen">
        <SectionHeading id="leistungen" eyebrow={t("services.eyebrow")}>
          {t("services.title")}
        </SectionHeading>
        <ServiceList slugs={[...serviceSlugs]} />
      </Section>

      <Section labelledBy="referenzen">
        <SectionHeading id="referenzen" eyebrow={t("projects.eyebrow")}>
          {t("projects.title")}
        </SectionHeading>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          }}
        >
          <ImagePlaceholder
            label={t("projects.imageBathroom")}
            aspectRatio="16 / 9"
          />
          <ImagePlaceholder
            label={t("projects.imageHeating")}
            aspectRatio="auto"
          />
        </Box>
        <Button href="/projekte" variant="outlined" sx={{ mt: 4 }}>
          {tActions("allProjects")}
        </Button>
      </Section>

      <ContactCta />
    </>
  );
}
