import { useTranslations } from "next-intl";
import Link from "@mui/material/Link";

export const mainContentId = "inhalt";

export default function SkipLink() {
  const t = useTranslations("navigation");

  return (
    <Link
      href={`#${mainContentId}`}
      sx={{
        position: "fixed",
        top: 8,
        left: 8,
        zIndex: "tooltip",
        px: 2,
        py: 1.5,
        bgcolor: "background.paper",
        transform: "translateY(-200%)",
        "&:focus": { transform: "none" },
      }}
    >
      {t("skipToContent")}
    </Link>
  );
}
