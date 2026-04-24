//models\Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  category: String,
  name: String,
  dosage: String,
  form: String,
  packSize: String,
  type: String,
  casId: {
  type: [String],
  default: []
},
  slug: String,
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);