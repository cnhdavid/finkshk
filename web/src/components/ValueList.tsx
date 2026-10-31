import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ContentItem } from "@/content/services";

export default function ValueList({ items }: { items: ContentItem[] }) {
  return (
    <Box
      component="ul"
      sx={{
        display: "grid",
        gap: { xs: 3, md: 4 },
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        listStyle: "none",
        m: 0,
        p: 0,
      }}
    >
      {items.map((item) => (
        <Box
          component="li"
          key={item.title}
          sx={{ borderTop: 3, borderColor: "secondary.main", pt: 1.5 }}
        >
          <Typography component="h3" variant="h4" sx={{ mb: 0.5 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
