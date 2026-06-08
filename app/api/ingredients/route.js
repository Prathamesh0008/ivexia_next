import { getIngredients } from "@/lib/catalogData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getIngredients(), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
