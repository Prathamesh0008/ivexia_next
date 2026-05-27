import mongoose from "mongoose";

const TranslationSchema = new mongoose.Schema(
  {
    group: { type: String, required: true },
    language: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

TranslationSchema.index({ group: 1, language: 1 }, { unique: true });

export default mongoose.models.Translation ||
  mongoose.model("Translation", TranslationSchema);