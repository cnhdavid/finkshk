import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { serviceHref } from "@/content/services";
import type { ServiceSlug } from "@/content/services";

export default function ServiceList({ slugs }: { slugs: ServiceSlug[] }) {
  const t = useTranslations("services");

  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      {slugs.map((slug) => (
        <Box
          component="li"
          key={slug}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Link
            href={serviceHref(slug)}
            underline="none"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr auto", md: "2fr 3fr auto" },
              alignItems: "center",
              columnGap: { xs: 2, md: 4 },
              rowGap: 0.5,
              py: { xs: 2.5, md: 3.5 },
              color: "text.primary",
              "& svg": { transition: "transform 150ms ease" },
              "&:hover": { color: "secondary.main" },
              "&:hover svg": { transform: "translateX(6px)" },
            }}
          >
            <Typography component="h3" variant="h3" sx={{ color: "inherit" }}>
              {t(`${slug}.title`)}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                gridColumn: { xs: "1 / -1", md: "auto" },
                gridRow: { xs: 2, md: "auto" },
              }}
            >
              {t(`${slug}.summary`)}
            </Typography>
            <ArrowForwardIcon aria-hidden="true" />
          </Link>
        </Box>
      ))}
    </Box>
  );
}
