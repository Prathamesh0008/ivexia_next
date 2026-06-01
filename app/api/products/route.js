//
import dbConnect from "@/lib/dbConnect";
import { getMongoErrorPayload } from "@/lib/mongoErrorPayload";
import Product from "@/models/Product";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const data = await Product.find().lean();

    return Response.json(data);
  } catch (error) {
    return Response.json(
      getMongoErrorPayload(error, "PRODUCTS_FETCH_FAILED"),
      { status: 500 }
    );
  }
}
