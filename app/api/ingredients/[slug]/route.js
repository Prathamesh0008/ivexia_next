//ivexia\app\api\ingredients\[slug]\route.js
import dbConnect from "@/lib/dbConnect";
import { getMongoErrorPayload } from "@/lib/mongoErrorPayload";
import Ingredient from "@/models/Ingredient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;

    const ingredient = await Ingredient.findOne({
      slug,
    }).lean();

    if (!ingredient) {
      return Response.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return Response.json(ingredient, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return Response.json(getMongoErrorPayload(error, "INGREDIENT_FETCH_FAILED"), {
      status: 500,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}

