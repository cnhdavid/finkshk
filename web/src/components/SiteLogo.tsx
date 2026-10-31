import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

// TODO(content): replace the wordmark with the logo SVG
export default function SiteLogo() {
  const t = useTranslations("brand");

  return (
    <Link
      href="/"
      underline="none"
      sx={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 0.75,
        color: "primary.main",
        fontFamily: "var(--font-heading), sans-serif",
        lineHeight: 1,
      }}
    >
      <Box component="span" sx={{ fontSize: "2rem", fontWeight: 700 }}>
        {t("wordmarkFirst")}
      </Box>{" "}
      <Box
        component="span"
        sx={{ color: "secondary.main", fontSize: "1.125rem", fontWeight: 600 }}
      >
        {t("wordmarkSecond")}
      </Box>
    </Link>
  );
}
