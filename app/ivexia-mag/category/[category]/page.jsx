import { notFound } from "next/navigation";
import IvexiaMagClient from "@/components/IvexiaMagClient";

const allowedCategories = ["news", "health"];
export async function generateMetadata({ params }) {
  const { category } = await params;

  return {
    alternates: {
      canonical: `https://www.ivexiapharma.com/ivexia-mag/category/${category}`,
    },
  };
}
export default async function IvexiaMagCategoryPage({ params }) {
  const { category } = await params;

  if (!allowedCategories.includes(category)) {
    notFound();
  }

  return <IvexiaMagClient categoryFilter={category} />;
}
