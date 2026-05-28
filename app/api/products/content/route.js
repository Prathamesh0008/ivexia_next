import { getProductMetaMap } from "@/lib/productContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || "en";
  const productMetaMap = await getProductMetaMap(language);

  return Response.json(productMetaMap);
}
