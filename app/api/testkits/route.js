import dbConnect from "@/lib/dbConnect";
import TestKit from "@/models/TestKit";

export async function GET() {
  await dbConnect();
  const data = await TestKit.find();
  return Response.json(data);
}