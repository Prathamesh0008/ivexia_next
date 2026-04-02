//ivexia\app\api\ingredients\[slug]\route.js
import dbConnect from "@/lib/dbConnect";
import Ingredient from "@/models/Ingredient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getErrorPayload(error) {
  const message =
    typeof error?.message === "string" ? error.message : "Unknown error";

  if (error?.code === "MONGODB_URI_MISSING") {
    return {
      error: "Failed to fetch ingredient",
      code: "MONGODB_URI_MISSING",
      hint: "Set MONGODB_URI in Vercel Production Environment Variables.",
    };
  }

  if (
    /not authorized|authentication failed|bad auth/i.test(message)
  ) {
    return {
      error: "Failed to fetch ingredient",
      code: "DB_AUTH_FAILED",
      hint: "Check MongoDB username/password in MONGODB_URI.",
    };
  }

  if (
    /ip address|etimedout|querysrv|enotfound|econnrefused/i.test(message)
  ) {
    return {
      error: "Failed to fetch ingredient",
      code: "DB_NETWORK_BLOCKED",
      hint: "Allow Vercel access in MongoDB Atlas Network Access and verify DNS.",
    };
  }

  return {
    error: "Failed to fetch ingredient",
    code: "INGREDIENT_FETCH_FAILED",
  };
}

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
    console.error("INGREDIENT DETAIL API ERROR:", error);

    return Response.json(getErrorPayload(error), {
      status: 500,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
