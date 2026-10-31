"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { NavigationLink } from "@/components/navigation";

const servicesButtonId = "services-menu-button";
const servicesMenuId = "services-menu";

export default function HeaderNavigation({
  serviceLinks,
  primaryLinks,
  navigationLabel,
  servicesLabel,
}: {
  serviceLinks: NavigationLink[];
  primaryLinks: NavigationLink[];
  navigationLabel: string;
  servicesLabel: string;
}) {
  const pathname = usePathname();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(menuAnchor);
  const isServiceActive = pathname.startsWith("/leistungen");

  const openMenu = (event: MouseEvent<HTMLElement>) =>
    setMenuAnchor(event.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  return (
    <Box
      component="nav"
      aria-label={navigationLabel}
      sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}
    >
      <Button
        id={servicesButtonId}
        color="inherit"
        endIcon={<ExpandMoreIcon />}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        aria-controls={isMenuOpen ? servicesMenuId : undefined}
        onClick={openMenu}
        sx={{
          paddingInline: 1.5,
          color: isServiceActive ? "secondary.main" : "inherit",
        }}
      >
        {servicesLabel}
      </Button>
      <Menu
        id={servicesMenuId}
        anchorEl={menuAnchor}
        open={isMenuOpen}
        onClose={closeMenu}
        slotProps={{ list: { "aria-labelledby": servicesButtonId } }}
      >
        {serviceLinks.map((link) => (
          <MenuItem
            key={link.href}
            component={NextLink}
            href={link.href}
            selected={pathname === link.href}
            onClick={closeMenu}
          >
            {link.label}
          </MenuItem>
        ))}
      </Menu>
      {primaryLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Button
            key={link.href}
            href={link.href}
            color="inherit"
            aria-current={isActive ? "page" : undefined}
            sx={{
              paddingInline: 1.5,
              color: isActive ? "secondary.main" : "inherit",
            }}
          >
            {link.label}
          </Button>
        );
      })}
    </Box>
  );
}
