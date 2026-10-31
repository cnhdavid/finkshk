import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { company } from "@/content/company";

export default function MobileContactBar() {
  const tNavigation = useTranslations("navigation");
  const tActions = useTranslations("actions");

  return (
    <Box
      component="nav"
      aria-label={tNavigation("quickContact")}
      sx={{
        display: { xs: "grid", md: "none" },
        gridTemplateColumns: "1fr 1fr",
        gap: 1,
        position: "fixed",
        insetInline: 0,
        bottom: 0,
        zIndex: "appBar",
        px: 1,
        pt: 1,
        pb: "calc(8px + env(safe-area-inset-bottom, 0px))",
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Button
        href={company.phoneHref}
        variant="contained"
        startIcon={<PhoneIcon />}
      >
        {tActions("call")}
      </Button>
      <Button
        href={company.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        startIcon={<WhatsAppIcon />}
      >
        {tActions("whatsapp")}
      </Button>
    </Box>
  );
}
