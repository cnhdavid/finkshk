import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const pagesBasePath = process.env.PAGES_BASE_PATH;

const nextConfig: NextConfig =
  pagesBasePath === undefined
    ? { output: "standalone" }
    : {
        output: "export",
        basePath: pagesBasePath,
        images: { unoptimized: true },
      };

export default withNextIntl(nextConfig);
