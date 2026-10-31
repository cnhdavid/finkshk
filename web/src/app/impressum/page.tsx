import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import PageIntro from "@/components/PageIntro";
import { Section } from "@/components/Section";
import { company } from "@/content/company";

const headingStyle = { mb: 1, mt: 4, "&:first-of-type": { mt: 0 } };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("navigation.imprint"),
    description: t("imprint.metaDescription"),
  };
}

// TODO(legal): the customer must confirm the legal form "e.U." and supply chamber of crafts, professional title with awarding state, applicable professional rules and the insurance scope
export default function ImprintPage() {
  const t = useTranslations("imprint");

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} />
      <Section labelledBy="anbieter">
        <Typography id="anbieter" component="h2" variant="h3" sx={headingStyle}>
          {t("providerTitle")}
        </Typography>
        <Typography component="address" sx={{ fontStyle: "normal" }}>
          {t("providerName")}
          <br />
          {t("providerCompany")}
          <br />
          {company.street}
          <br />
          {company.postalCode} {company.city}
        </Typography>
        <Typography component="h2" variant="h3" sx={headingStyle}>
          {t("contactTitle")}
        </Typography>
        <Typography>
          {t("phoneLabel")}{" "}
          <Link href={company.phoneHref}>{company.phoneDisplay}</Link>
          <br />
          {t("emailLabel")}{" "}
          <Link href={company.emailHref}>{company.email}</Link>
        </Typography>
        <Typography component="h2" variant="h3" sx={headingStyle}>
          {t("vatTitle")}
        </Typography>
        <Typography>{t("vatText")}</Typography>
        <Typography component="h2" variant="h3" sx={headingStyle}>
          {t("insuranceTitle")}
        </Typography>
        <Typography>
          {t("insuranceName")}
          <br />
          {t("insuranceCompany")}
          <br />
          {t("insuranceStreet")}
          <br />
          {t("insuranceCity")}
        </Typography>
      </Section>
    </>
  );
}
