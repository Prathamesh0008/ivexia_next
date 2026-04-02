//ivexia\app\api\ingredients\[slug]\route.js
import dbConnect from "@/lib/dbConnect";
import Ingredient from "@/models/Ingredient";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const ingredient = await Ingredient.findOne({
      slug: params.slug,
    }).lean();

    if (!ingredient) {
      return Response.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return Response.json(ingredient);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch ingredient" },
      { status: 500 }
    );
  }
}