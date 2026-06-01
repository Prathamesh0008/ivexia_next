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
  meta: mongoose.Schema.Types.Mixed,
  content: mongoose.Schema.Types.Mixed,
  faqs: [mongoose.Schema.Types.Mixed],
  faqSchema: mongoose.Schema.Types.Mixed,
}, { strict: false });

export default mongoose.models.TestKit ||
  mongoose.model("TestKit", TestKitSchema);
