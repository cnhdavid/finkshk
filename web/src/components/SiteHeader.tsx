import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import PhoneIcon from "@mui/icons-material/Phone";
import HeaderNavigation from "@/components/HeaderNavigation";
import MobileNavigation from "@/components/MobileNavigation";
import { primaryRoutes } from "@/components/navigation";
import SiteLogo from "@/components/SiteLogo";
import { company } from "@/content/company";
import { serviceHref, serviceSlugs } from "@/content/services";

export default function SiteHeader() {
  const tNavigation = useTranslations("navigation");
  const tServices = useTranslations("services");

  const serviceLinks = serviceSlugs.map((slug) => ({
    href: serviceHref(slug),
    label: tServices(`${slug}.title`),
  }));
  const primaryLinks = primaryRoutes.map(({ href, labelKey }) => ({
    href,
    label: tNavigation(labelKey),
  }));

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: "appBar",
        bgcolor: "background.paper",
        color: "primary.main",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          minHeight: { xs: 64, md: 80 },
        }}
      >
        <SiteLogo />
        <HeaderNavigation
          serviceLinks={serviceLinks}
          primaryLinks={primaryLinks}
          navigationLabel={tNavigation("main")}
          servicesLabel={tNavigation("services")}
        />
        <Button
          href={company.phoneHref}
          variant="contained"
          startIcon={<PhoneIcon />}
          sx={{ display: { xs: "none", md: "inline-flex" }, flexShrink: 0 }}
        >
          {company.phoneDisplay}
        </Button>
        <MobileNavigation
          serviceLinks={serviceLinks}
          primaryLinks={primaryLinks}
          labels={{
            open: tNavigation("openMenu"),
            close: tNavigation("closeMenu"),
            navigation: tNavigation("mobile"),
            services: tNavigation("services"),
          }}
        />
      </Container>
    </Box>
  );
}
