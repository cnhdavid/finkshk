import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import { Section, SectionHeading } from "@/components/Section";
import { company } from "@/content/company";

export default function ContactCta() {
  const t = useTranslations("contactCta");
  const tActions = useTranslations("actions");

  return (
    <Section tone="dark" labelledBy="kontakt-cta">
      <SectionHeading id="kontakt-cta" eyebrow={t("eyebrow")}>
        {t("title")}
      </SectionHeading>
      <Typography sx={{ maxWidth: "40rem", mt: -2, mb: 4 }}>
        {t("text")}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Button
          href={company.phoneHref}
          variant="contained"
          color="secondary"
          startIcon={<PhoneIcon />}
        >
          {company.phoneDisplay}
        </Button>
        <Button href="/kontakt" variant="outlined" color="inherit">
          {tActions("request")}
        </Button>
      </Box>
    </Section>
  );
}
