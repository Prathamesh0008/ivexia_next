//ivexia\app\api\products\route.js
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();
  const data = await Product.find().lean();
  return Response.json(data);
}