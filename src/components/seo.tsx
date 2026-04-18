import type { Thing, WithContext } from "schema-dts";

type JsonLdNode = WithContext<Thing>;

interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
  siteName?: string;
  jsonLd?: JsonLdNode | JsonLdNode[];
}

export function SEO({
  title,
  description,
  canonicalUrl,
  imageUrl,
  imageAlt,
  type = "website",
  noindex = false,
  siteName = "Astraea",
  jsonLd,
}: SEOProps) {
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;
  const robots = noindex ? "noindex, nofollow" : "index, follow";
  const twitterCard = imageUrl ? "summary_large_image" : "summary";

  const graph = buildJsonLdGraph({
    fullTitle,
    description,
    canonicalUrl,
    imageUrl,
    type,
    siteName,
    extras: jsonLd,
  });

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={robots} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:site_name" content={siteName} />
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {graph.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
        />
      )}
    </>
  );
}

interface BuildGraphArgs {
  fullTitle: string;
  description?: string;
  canonicalUrl?: string;
  imageUrl?: string;
  type: "website" | "article";
  siteName: string;
  extras?: JsonLdNode | JsonLdNode[];
}

function buildJsonLdGraph({
  fullTitle,
  description,
  canonicalUrl,
  imageUrl,
  type,
  siteName,
  extras,
}: BuildGraphArgs): JsonLdNode[] {
  const siteUrl = canonicalUrl ? new URL(canonicalUrl).origin : undefined;
  const orgId = siteUrl ? `${siteUrl}#organization` : undefined;
  const siteId = siteUrl ? `${siteUrl}#website` : undefined;
  const pageId = canonicalUrl ? `${canonicalUrl}#webpage` : undefined;
  const logoUrl = siteUrl ? `${siteUrl}/logo.png` : undefined;

  const defaults: JsonLdNode[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      ...(orgId && { "@id": orgId }),
      name: siteName,
      ...(siteUrl && { url: siteUrl }),
      ...(logoUrl && {
        logo: { "@type": "ImageObject", url: logoUrl },
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      ...(siteId && { "@id": siteId }),
      name: siteName,
      ...(siteUrl && { url: siteUrl }),
      ...(orgId && { publisher: { "@id": orgId } }),
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": type === "article" ? "Article" : "WebPage",
      ...(pageId && { "@id": pageId }),
      name: fullTitle,
      ...(description && { description }),
      ...(canonicalUrl && { url: canonicalUrl }),
      ...(imageUrl && { image: imageUrl }),
      ...(siteId && { isPartOf: { "@id": siteId } }),
      ...(orgId && { about: { "@id": orgId } }),
      inLanguage: "en-US",
    },
  ];


  const extraNodes = extras ? (Array.isArray(extras) ? extras : [extras]) : [];
  const overridden = new Set(extraNodes.map(getType));

  return [
    ...defaults.filter((n) => !overridden.has(getType(n))),
    ...extraNodes,
  ];
}

function getType(node: JsonLdNode): string | undefined {
  const type = (node as { "@type"?: string | string[] })["@type"];
  return Array.isArray(type) ? type[0] : type;
}

function serializeJsonLd(graph: JsonLdNode[]): string {
  const payload = graph.length === 1 ? graph[0] : graph;
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}
