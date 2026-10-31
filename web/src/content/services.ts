export const serviceSlugs = ["bad", "heizung", "lueftung", "wartung"] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export type ContentItem = {
  title: string;
  text: string;
};

export type ServiceGroup = {
  title: string;
  text?: string;
  items: ContentItem[];
};

export const isServiceSlug = (slug: string): slug is ServiceSlug =>
  serviceSlugs.some((serviceSlug) => serviceSlug === slug);

export const serviceHref = (slug: ServiceSlug) => `/leistungen/${slug}`;

// TODO(content): the old site has no copy on air conditioning, request it from the customer for services.lueftung in messages/de.json
