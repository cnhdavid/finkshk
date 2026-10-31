import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const blueprintGrid =
  "linear-gradient(rgb(18 63 74 / 8%) 1px, transparent 1px), linear-gradient(90deg, rgb(18 63 74 / 8%) 1px, transparent 1px)";

// TODO(content): replace every usage with next/image and a real customer photo
export default function ImagePlaceholder({
  label,
  aspectRatio = "4 / 3",
}: {
  label: string;
  aspectRatio?: string;
}) {
  const t = useTranslations("placeholder");

  return (
    <Box
      role="img"
      aria-label={t("label", { label })}
      sx={{
        position: "relative",
        overflow: "hidden",
        aspectRatio,
        minHeight: 200,
        width: "100%",
        bgcolor: "surface.main",
        backgroundImage: blueprintGrid,
        backgroundSize: "32px 32px",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M-10 90 H130 a24 24 0 0 1 24 24 V190 a24 24 0 0 0 24 24 H410"
            stroke="var(--mui-palette-secondary-main)"
            strokeWidth="10"
          />
          <path
            d="M-10 130 H100 a24 24 0 0 1 24 24 V226 a24 24 0 0 0 24 24 H410"
            stroke="var(--mui-palette-primary-main)"
            strokeWidth="10"
          />
          <path
            d="M250 214 V70 a20 20 0 0 1 20 -20 H410"
            stroke="var(--mui-palette-secondary-main)"
            strokeWidth="10"
          />
        </g>
        <circle
          cx="250"
          cy="130"
          r="18"
          fill="var(--mui-palette-background-paper)"
          stroke="var(--mui-palette-primary-main)"
          strokeWidth="6"
        />
      </Box>
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          left: 12,
          bottom: 12,
          px: 1,
          bgcolor: "background.paper",
          color: "text.secondary",
        }}
      >
        {t("caption")}
      </Typography>
    </Box>
  );
}
