import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

type SectionTone = "plain" | "warm" | "dark";

const toneStyles = {
  plain: { bgcolor: "background.default" },
  warm: { bgcolor: "surface.main" },
  dark: {
    bgcolor: "primary.main",
    color: "primary.contrastText",
    "--focus-ring": "#FFFFFF",
    "--eyebrow-color": "var(--mui-palette-secondary-light)",
  },
};

export function Section({
  tone = "plain",
  labelledBy,
  children,
}: {
  tone?: SectionTone;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <Box
      component="section"
      aria-labelledby={labelledBy}
      sx={{ ...toneStyles[tone], py: { xs: 7, md: 12 } }}
    >
      <Container>{children}</Container>
    </Box>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Typography
      component="p"
      variant="overline"
      sx={{
        color: "var(--eyebrow-color, var(--mui-palette-secondary-main))",
        mb: 1.5,
      }}
    >
      {children}
    </Typography>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  children,
}: {
  id: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: "48rem" }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Typography id={id} component="h2" variant="h2">
        {children}
      </Typography>
    </Box>
  );
}
