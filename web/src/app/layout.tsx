import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import MobileContactBar from "@/components/MobileContactBar";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SkipLink, { mainContentId } from "@/components/SkipLink";
import { defaultLocale } from "@/i18n/config";
import { bodyFont, headingFont } from "@/theme/fonts";
import theme from "@/theme/theme";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  return {
    title: { default: t("defaultTitle"), template: t.raw("titleTemplate") },
    description: t("description"),
    ...(process.env.PAGES_BASE_PATH !== undefined && {
      robots: { index: false, follow: false },
    }),
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={defaultLocale}
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SkipLink />
            <SiteHeader />
            <Box
              component="main"
              id={mainContentId}
              tabIndex={-1}
              sx={{ outline: "none" }}
            >
              {children}
            </Box>
            <SiteFooter />
            <MobileContactBar />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
