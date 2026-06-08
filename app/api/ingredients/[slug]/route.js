//ivexia\app\api\ingredients\[slug]\route.js
import { getIngredientBySlug } from "@/lib/catalogData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const { slug } = await params;
  const ingredient = getIngredientBySlug(slug);

  if (!ingredient) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(ingredient, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

