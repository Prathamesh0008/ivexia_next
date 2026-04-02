import dbConnect from "@/lib/dbConnect";
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
    console.error("Failed to load product:", error);

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
