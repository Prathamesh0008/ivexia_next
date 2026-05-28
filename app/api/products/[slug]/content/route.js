import { getProductContent } from "@/lib/productContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || "en";
  const productContent = await getProductContent(slug, language);

  if (!productContent) {
    return Response.json({ error: "Product content not found" }, { status: 404 });
  }

  return Response.json(productContent);
}
