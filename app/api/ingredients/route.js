//ivexia\app\api\ingredients\route.js
import dbConnect from "@/lib/dbConnect";
import Ingredient from "@/models/Ingredient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();

    const data = await Ingredient.find().lean();

    return Response.json(data);
  } catch (error) {
    console.error("INGREDIENT API ERROR:", error);

    return Response.json(
      { error: "Failed to fetch ingredients" },
      { status: 500 }
    );
  }
}
