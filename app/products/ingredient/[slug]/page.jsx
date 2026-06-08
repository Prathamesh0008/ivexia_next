//app\products\ingredient\[slug]\page.jsx
import IngredientDetailClient from "@/components/IngredientDetailClient";
import { getIngredientBySlug } from "@/lib/catalogData";
import { getDetailContent } from "@/lib/detailContent";

const SITE_URL = "https://www.ivexiapharma.com";

async function getIngredient(slug) {
  return getIngredientBySlug(slug);
}

async function getIngredientContent(slug, language = "en") {
  return getDetailContent({
    group: "data4",
    collectionKey: "ingredients",
    slug,
    language,
  });
}

function getIngredientTitle(ingredient, detailContent) {
  return (
    detailContent?.seo?.title ||
    detailContent?.meta?.title ||
    detailContent?.hero?.title ||
    ingredient?.name ||
    "Ingredient"
  );
}

function getIngredientDescription(ingredient, detailContent, title) {
  return (
    detailContent?.seo?.description ||
    detailContent?.meta?.description ||
    detailContent?.hero?.description ||
    ingredient?.description ||
    `${title} by Ivexia Pharma.`
  );
}

function getCanonicalUrl(slug, detailContent) {
  return (
    detailContent?.seo?.canonical ||
    detailContent?.seo?.canonicalUrl ||
    detailContent?.meta?.canonical ||
    detailContent?.meta?.canonicalUrl ||
    `${SITE_URL}/products/ingredient/${slug}`
  );
}

function getJsonLdSchemas(detailContent) {
  return [
    detailContent?.schema,
    detailContent?.ingredientSchema,
    detailContent?.productSchema,
    detailContent?.faqSchema,
  ].filter(Boolean);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ingredient = await getIngredient(slug);
  const detailContent = await getIngredientContent(slug, "en");
  const title = getIngredientTitle(ingredient, detailContent);
  const description = getIngredientDescription(ingredient, detailContent, title);
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

export default async function IngredientDetailPage({ params }) {
  const { slug } = await params;
  const detailContent = await getIngredientContent(slug, "en");
  const schemas = getJsonLdSchemas(detailContent);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`ingredient-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <IngredientDetailClient />
    </>
  );
}
