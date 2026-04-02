import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const product = await Product.findOne({
      slug: params.slug,
    }).lean();

    if (!product) {
      return Response.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}