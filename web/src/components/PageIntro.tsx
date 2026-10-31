import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Eyebrow } from "@/components/Section";

export default function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Box sx={{ bgcolor: "surface.main", py: { xs: 6, md: 10 } }}>
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Typography component="h1" variant="h1" sx={{ maxWidth: "20ch" }}>
          {title}
        </Typography>
        {children && (
          <Typography sx={{ mt: 3, maxWidth: "42rem" }}>{children}</Typography>
        )}
      </Container>
    </Box>
  );
}
