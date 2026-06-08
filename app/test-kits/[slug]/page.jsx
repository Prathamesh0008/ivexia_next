import TestKitDetailClient from "@/components/TestKitDetailClient";
import { getTestKitBySlug } from "@/lib/catalogData";
import { getDetailContent } from "@/lib/detailContent";

const SITE_URL = "https://www.ivexiapharma.com";

async function getTestKit(slug) {
  return getTestKitBySlug(slug);
}

async function getTestKitContent(slug, language = "en") {
  return getDetailContent({
    group: "data3",
    collectionKey: "testKits",
    slug,
    language,
  });
}

function getTestKitTitle(testKit, detailContent) {
  return (
    detailContent?.seo?.title ||
    detailContent?.meta?.title ||
    detailContent?.hero?.title ||
    testKit?.product ||
    "Test Kit"
  );
}

function getTestKitDescription(testKit, detailContent, title) {
  return (
    detailContent?.seo?.description ||
    detailContent?.meta?.description ||
    detailContent?.hero?.description ||
    testKit?.description ||
    `${title} by Ivexia Pharma.`
  );
}

function getCanonicalUrl(slug, detailContent) {
  return (
    detailContent?.seo?.canonical ||
    detailContent?.seo?.canonicalUrl ||
    detailContent?.meta?.canonical ||
    detailContent?.meta?.canonicalUrl ||
    `${SITE_URL}/test-kits/${slug}`
  );
}

function getJsonLdSchemas(detailContent) {
  return [
    detailContent?.schema,
    detailContent?.testKitSchema,
    detailContent?.productSchema,
    detailContent?.faqSchema,
  ].filter(Boolean);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const testKit = await getTestKit(slug);
  const detailContent = await getTestKitContent(slug, "en");
  const title = getTestKitTitle(testKit, detailContent);
  const description = getTestKitDescription(testKit, detailContent, title);
  const canonical = getCanonicalUrl(slug, detailContent);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Ivexia Pharma",
      type: "website",
    },
  };
}

export default async function TestKitDetailPage({ params }) {
  const { slug } = await params;
  const detailContent = await getTestKitContent(slug, "en");
  const schemas = getJsonLdSchemas(detailContent);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`test-kit-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <TestKitDetailClient />
    </>
  );
}
