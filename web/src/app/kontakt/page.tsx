import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/MailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PageIntro from "@/components/PageIntro";
import { Section } from "@/components/Section";
import { company } from "@/content/company";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("navigation.contact"),
    description: t("contact.metaDescription"),
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const tActions = useTranslations("actions");
  const tBrand = useTranslations("brand");

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")}>
        {t("intro")}
      </PageIntro>
      <Section labelledBy="anschrift">
        <Typography id="anschrift" component="h2" variant="h3" sx={{ mb: 1 }}>
          {tBrand("wordmarkFirst")} {tBrand("wordmarkSecond")}
        </Typography>
        <Typography component="address" sx={{ fontStyle: "normal", mb: 4 }}>
          {company.owner}
          <br />
          {company.street}
          <br />
          {company.postalCode} {company.city}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Button
            href={company.phoneHref}
            variant="contained"
            startIcon={<PhoneIcon />}
          >
            {company.phoneDisplay}
          </Button>
          <Button
            href={company.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<WhatsAppIcon />}
          >
            {tActions("whatsapp")}
          </Button>
          <Button
            href={company.emailHref}
            variant="outlined"
            startIcon={<MailIcon />}
          >
            {company.email}
          </Button>
        </Box>
      </Section>
    </>
  );
}
