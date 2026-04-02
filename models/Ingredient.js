import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  slug: String,
  cas: String,
  image: String,
});

export default mongoose.models.Ingredient ||
  mongoose.model("Ingredient", IngredientSchema);