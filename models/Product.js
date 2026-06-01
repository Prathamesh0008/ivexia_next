//models\Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  category: String,
  name: String,
  description: String,
  dosage: String,
  form: String,
  packSize: String,
  type: String,
  casId: {
  type: [String],
  default: []
},
  image: String,
  slug: String,
  hero: mongoose.Schema.Types.Mixed,
  meta: mongoose.Schema.Types.Mixed,
  content: mongoose.Schema.Types.Mixed,
  faqs: [mongoose.Schema.Types.Mixed],
  faqSchema: mongoose.Schema.Types.Mixed,
}, { strict: false });

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
