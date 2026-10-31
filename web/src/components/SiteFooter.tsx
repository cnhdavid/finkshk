import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { legalRoutes, primaryRoutes } from "@/components/navigation";
import { company } from "@/content/company";
import { serviceHref, serviceSlugs } from "@/content/services";

const footerLinkStyle = { color: "inherit", display: "block", py: 0.5 };
const columnHeadingStyle = { color: "secondary.light", mb: 1.5 };

export default function SiteFooter() {
  const tNavigation = useTranslations("navigation");
  const tActions = useTranslations("actions");
  const tServices = useTranslations("services");
  const tFooter = useTranslations("footer");
  const tBrand = useTranslations("brand");

  return (
    <Box
      component="footer"
      sx={{
        "--focus-ring": "#FFFFFF",
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        pt: { xs: 6, md: 8 },
        pb: { xs: 13, md: 4 },
      }}
    >
      <Container>
        <Box
          sx={{
            display: "grid",
            gap: 5,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "2fr 1fr 1fr",
            },
          }}
        >
          <div>
            <Typography component="h2" variant="h3" sx={{ mb: 1.5 }}>
              {tBrand("wordmarkFirst")} {tBrand("wordmarkSecond")}
            </Typography>
            <Typography component="address" sx={{ fontStyle: "normal", mb: 2 }}>
              {company.street}
              <br />
              {company.postalCode} {company.city}
            </Typography>
            <Link href={company.phoneHref} sx={footerLinkStyle}>
              {company.phoneDisplay}
            </Link>
            <Link href={company.emailHref} sx={footerLinkStyle}>
              {company.email}
            </Link>
            <Link
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              sx={footerLinkStyle}
            >
              {tActions("whatsapp")}
            </Link>
            <Link
              href={company.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              sx={footerLinkStyle}
            >
              {tActions("instagram")}
            </Link>
          </div>
          <nav aria-label={tNavigation("services")}>
            <Typography
              component="h2"
              variant="overline"
              sx={columnHeadingStyle}
            >
              {tNavigation("services")}
            </Typography>
            {serviceSlugs.map((slug) => (
              <Link key={slug} href={serviceHref(slug)} sx={footerLinkStyle}>
                {tServices(`${slug}.title`)}
              </Link>
            ))}
          </nav>
          <nav aria-label={tNavigation("company")}>
            <Typography
              component="h2"
              variant="overline"
              sx={columnHeadingStyle}
            >
              {tNavigation("company")}
            </Typography>
            {[...primaryRoutes, ...legalRoutes].map(({ href, labelKey }) => (
              <Link key={href} href={href} sx={footerLinkStyle}>
                {tNavigation(labelKey)}
              </Link>
            ))}
          </nav>
        </Box>
        <Typography variant="body2" sx={{ mt: 6 }}>
          {tFooter("copyright", { year: new Date().getFullYear() })}
        </Typography>
      </Container>
    </Box>
  );
}
