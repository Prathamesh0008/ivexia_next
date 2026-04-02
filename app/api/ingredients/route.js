// app/api/ingredients/route.js
import dbConnect from "@/lib/dbConnect";
import Ingredient from "@/models/Ingredient";

export async function GET() {
  try {
    await dbConnect();

    const data = await Ingredient.find().lean();

    return Response.json(data);
  } catch (error) {
    console.error("🔥 Mongo Error:", error); // IMPORTANT

    return Response.json(
      {
        error: "Failed to fetch ingredients",
        message: error.message, // 👈 THIS WILL HELP DEBUG
      },
      { status: 500 }
    );
  }
}

// import dbConnect from "@/lib/dbConnect";
// import Ingredient from "@/models/Ingredient";

// export async function GET() {
//   try {
//     await dbConnect();

//     const data = await Ingredient.find().lean();

//     return Response.json(data);
//   } catch (error) {
//     console.error(error);
//     return Response.json(
//       { error: "Failed to fetch ingredients" },
//       { status: 500 }
//     );
//   }
// }


