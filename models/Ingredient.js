//ivexia\models\Ingredient.js
import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  category: String,
  slug: String,
  cas: String,
  casNumber: String,
  image: String,
  molecularFormula: String,
  molecularWeight: String,
  grade: String,
  meta: mongoose.Schema.Types.Mixed,
  content: mongoose.Schema.Types.Mixed,
  faqs: [mongoose.Schema.Types.Mixed],
}, { strict: false });

export default mongoose.models.Ingredient ||
  mongoose.model("Ingredient", IngredientSchema);
