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
    subcategory: { type: String, default: "", trim: true },
    price: { type: String, required: true },
    description: { type: String, default: "" },
    componentType: {
      type: String,
      enum: ["interior", "exterior", ""],
      default: "",
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

/**
 * Generate a URL-safe slug: no slashes, parentheses, or other chars that break paths.
 * Used in routes like /pet/:slug and /api/horses/:slug.
 */
function toUrlSafeSlug(name) {
  if (!name || typeof name !== "string") return "";
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[/()[\],]/g, "-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

horseSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = toUrlSafeSlug(this.name);
  }
  next();
});

module.exports = mongoose.model("Horse", horseSchema);

