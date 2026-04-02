//ivexia\app\api\ingredients\[slug]\route.js
import dbConnect from "@/lib/dbConnect";
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

    return Response.json(ingredient);
  } catch (error) {
    console.error("INGREDIENT DETAIL API ERROR:", error);

    return Response.json(
      { error: "Failed to fetch ingredient" },
      { status: 500 }
    );
  }
}
