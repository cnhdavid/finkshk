"use client";

import NextLink from "next/link";
import { createTheme } from "@mui/material/styles";
import type { Shadows } from "@mui/material/styles";
import type { LinkProps } from "@mui/material/Link";

declare module "@mui/material/styles" {
  interface Palette {
    surface: { main: string };
  }
  interface PaletteOptions {
    surface?: { main: string };
  }
}

const headingFontStack =
  "var(--font-heading), 'Arial Narrow', Arial, sans-serif";
const bodyFontStack = "var(--font-body), system-ui, Arial, sans-serif";

// TODO(content): replace placeholder palette with colors derived from the logo SVG
const petrol = "#123F4A";
const petrolDark = "#0B2A32";
const copper = "#A8501F";
const copperDark = "#863E16";
const copperLight = "#F0B48F";
const warmSurface = "#F5F2EC";
const ink = "#16262B";
const inkSoft = "#465559";
const line = "#D9D5CC";

const headingStyle = {
  overflowWrap: "break-word" as const,
  fontFamily: headingFontStack,
  fontWeight: 700,
  letterSpacing: "-0.01em",
};

const theme = createTheme({
  cssVariables: true,
  shape: { borderRadius: 2 },
  shadows: Array(25).fill("none") as Shadows,
  palette: {
    primary: { main: petrol, dark: petrolDark, contrastText: "#FFFFFF" },
    secondary: {
      main: copper,
      dark: copperDark,
      light: copperLight,
      contrastText: "#FFFFFF",
    },
    text: { primary: ink, secondary: inkSoft },
    background: { default: "#FFFFFF", paper: "#FFFFFF" },
    surface: { main: warmSurface },
    divider: line,
  },
  typography: {
    fontFamily: bodyFontStack,
    fontSize: 16,
    body1: { fontSize: "1.125rem", lineHeight: 1.65 },
    body2: { fontSize: "1rem", lineHeight: 1.6 },
    h1: {
      ...headingStyle,
      fontSize: "clamp(2.75rem, 7vw, 5rem)",
      lineHeight: 1.04,
    },
    h2: {
      ...headingStyle,
      fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
      lineHeight: 1.1,
    },
    h3: {
      ...headingStyle,
      fontSize: "clamp(1.5rem, 3vw, 2rem)",
      lineHeight: 1.2,
    },
    h4: {
      ...headingStyle,
      fontWeight: 600,
      fontSize: "1.375rem",
      lineHeight: 1.3,
    },
    overline: {
      fontFamily: headingFontStack,
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: "0.08em",
      lineHeight: 1.4,
      textTransform: "uppercase",
    },
    button: {
      fontFamily: headingFontStack,
      fontSize: "1.125rem",
      fontWeight: 600,
      letterSpacing: "0.01em",
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":focus-visible": {
          outline: `3px solid var(--focus-ring, ${copper})`,
          outlineOffset: "2px",
        },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            transitionDuration: "0.01ms !important",
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true, LinkComponent: NextLink },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { minHeight: 48, paddingInline: 24 },
        outlined: { borderWidth: 2, "&:hover": { borderWidth: 2 } },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { borderRadius: 2, width: 48, height: 48 } },
    },
    MuiLink: {
      defaultProps: { component: NextLink } as LinkProps,
      styleOverrides: { root: { textUnderlineOffset: "0.2em" } },
    },
    MuiPopover: {
      styleOverrides: { paper: { border: `1px solid ${line}` } },
    },
    MuiMenuItem: {
      styleOverrides: { root: { minHeight: 48 } },
    },
  },
});

export default theme;
