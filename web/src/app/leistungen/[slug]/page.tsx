import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ContactCta from "@/components/ContactCta";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import ServiceList from "@/components/ServiceList";
import ValueList from "@/components/ValueList";
import { isServiceSlug, serviceSlugs } from "@/content/services";
import type { ServiceGroup } from "@/content/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) {
    return {};
  }
  const t = await getTranslations(`services.${slug}`);
  return { title: t("title"), description: t("metaDescription") };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) {
    notFound();
  }

  const t = await getTranslations("services");
  const tActions = await getTranslations("actions");
  const groups = t.raw(`${slug}.groups`) as ServiceGroup[];
  const otherSlugs = serviceSlugs.filter((other) => other !== slug);

  return (
    <>
      <Box sx={{ bgcolor: "surface.main", py: { xs: 5, md: 10 } }}>
        <Container
          sx={{
            display: "grid",
            gap: { xs: 4, md: 8 },
            alignItems: "center",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          }}
        >
          <div>
            <Eyebrow>{t("otherEyebrow")}</Eyebrow>
            <Typography component="h1" variant="h1">
              {t(`${slug}.headline`)}
            </Typography>
            <Typography sx={{ mt: 3 }}>{t(`${slug}.intro`)}</Typography>
            <Button
              href="/kontakt"
              variant="contained"
              color="secondary"
              sx={{ mt: 4 }}
            >
              {tActions("request")}
            </Button>
          </div>
          <ImagePlaceholder label={t(`${slug}.imageLabel`)} />
        </Container>
      </Box>

      {groups.map((group, index) => {
        const headingId = `gruppe-${index}`;
        return (
          <Section
            key={group.title}
            labelledBy={headingId}
            tone={index % 2 === 0 ? "plain" : "warm"}
          >
            <Typography
              id={headingId}
              component="h2"
              variant="h2"
              sx={{ mb: group.text ? 2 : { xs: 4, md: 6 } }}
            >
              {group.title}
            </Typography>
            {group.text && (
              <Typography sx={{ maxWidth: "48rem", mb: { xs: 4, md: 6 } }}>
                {group.text}
              </Typography>
            )}
            <ValueList items={group.items} />
          </Section>
        );
      })}

      <Section
        tone={groups.length % 2 === 0 ? "plain" : "warm"}
        labelledBy="weitere-leistungen"
      >
        <SectionHeading id="weitere-leistungen" eyebrow={t("otherEyebrow")}>
          {t("otherTitle")}
        </SectionHeading>
        <ServiceList slugs={otherSlugs} />
      </Section>

      <ContactCta />
    </>
  );
}
