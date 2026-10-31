import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Button from "@mui/material/Button";
import PageIntro from "@/components/PageIntro";
import { Section } from "@/components/Section";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return { title: t("metaTitle"), robots: { index: false } };
}

export default function NotFound() {
  const t = useTranslations("notFound");
  const tActions = useTranslations("actions");

  return (
    <>
      <PageIntro eyebrow={t("eyebrow")} title={t("title")}>
        {t("text")}
      </PageIntro>
      <Section>
        <Button href="/" variant="contained">
          {tActions("toHome")}
        </Button>
      </Section>
    </>
  );
}
