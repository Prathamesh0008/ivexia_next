//ivexia\app\api\ingredients\route.js
import dbConnect from "@/lib/dbConnect";
import Ingredient from "@/models/Ingredient";

export async function GET() {
  try {
    await dbConnect();

    const data = await Ingredient.find().lean();

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.error("INGREDIENT API ERROR:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch ingredients" }),
      { status: 500 }
    );
  }
}