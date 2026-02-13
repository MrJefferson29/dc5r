const mongoose = require("mongoose");

/**
 * Schema now represents car listings and spare parts.
 * Kept as "Horse" for backward compatibility with routes/imports.
 */
const horseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: { type: String, required: true, trim: true },
    price: { type: String, required: true },
    description: { type: String, default: "" },
    componentType: {
      type: String,
      enum: ["interior", "exterior"],
      required: true,
    },
    condition: {
      type: String,
      enum: ["new", "used"],
      required: true,
    },
    fits: {
      type: [String],
      default: [],
    },
    views: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

horseSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

module.exports = mongoose.model("Horse", horseSchema);

