import dbConnect from "@/lib/dbConnect";
import { getMongoErrorPayload } from "@/lib/mongoErrorPayload";
import Product from "@/models/Product";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;

    const product = await Product.findOne({
      slug,
    }).lean();

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    return Response.json(getMongoErrorPayload(error, "PRODUCT_FETCH_FAILED"), {
      status: 500,
    });
  }
}
