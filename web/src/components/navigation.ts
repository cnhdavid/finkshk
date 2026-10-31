export type NavigationLink = {
  href: string;
  label: string;
};

export const primaryRoutes = [
  { href: "/ueber-uns", labelKey: "about" },
  { href: "/projekte", labelKey: "projects" },
  { href: "/kontakt", labelKey: "contact" },
] as const;

export const legalRoutes = [
  { href: "/impressum", labelKey: "imprint" },
  { href: "/datenschutz", labelKey: "privacy" },
] as const;
