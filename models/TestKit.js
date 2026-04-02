//models\TestKit.js
import mongoose from "mongoose";

const TestKitSchema = new mongoose.Schema({
  category: String,
  method: String,
  product: String,
  description: String,
  cut_off: String,
  specimen: String,
  certificate: String,
  slug: String,
});

export default mongoose.models.TestKit ||
  mongoose.model("TestKit", TestKitSchema);