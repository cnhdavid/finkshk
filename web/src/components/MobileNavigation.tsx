"use client";

import { useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import type { NavigationLink } from "@/components/navigation";

const linkTextStyle = {
  minHeight: 52,
  fontFamily: "var(--font-heading), sans-serif",
  fontSize: "1.375rem",
  fontWeight: 600,
};

export default function MobileNavigation({
  serviceLinks,
  primaryLinks,
  labels,
}: {
  serviceLinks: NavigationLink[];
  primaryLinks: NavigationLink[];
  labels: {
    open: string;
    close: string;
    navigation: string;
    services: string;
  };
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const renderLink = (link: NavigationLink) => (
    <ListItem key={link.href} disablePadding>
      <ListItemButton
        component={NextLink}
        href={link.href}
        selected={pathname === link.href}
        aria-current={pathname === link.href ? "page" : undefined}
        onClick={close}
        sx={linkTextStyle}
      >
        {link.label}
      </ListItemButton>
    </ListItem>
  );

  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      <IconButton
        color="primary"
        aria-label={labels.open}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={close}
        slotProps={{ paper: { sx: { width: "min(22rem, 88vw)" } } }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton color="primary" aria-label={labels.close} onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box component="nav" aria-label={labels.navigation}>
          <List
            subheader={
              <ListSubheader disableSticky component="div">
                {labels.services}
              </ListSubheader>
            }
          >
            {serviceLinks.map(renderLink)}
          </List>
          <Divider />
          <List>{primaryLinks.map(renderLink)}</List>
        </Box>
      </Drawer>
    </Box>
  );
}
