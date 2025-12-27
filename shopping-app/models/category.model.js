const mongoose = require("mongoose");

// ==================== PRODUCT CATEGORY SCHEMA ====================
const productCategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "product-categories",
    timestamps: true,
  }
);

// ==================== FAQs CATEGORY SCHEMA ====================
const faqCategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "faqs-categories",
    timestamps: true,
  }
);

// ==================== CREATE MODELS ====================
const productCategoryModel = mongoose.model(
  "ProductCategory",
  productCategorySchema
);
const faqsCategoryModel = mongoose.model("FQAsCategory", faqCategorySchema);
// ==================== EXPORT ====================
module.exports = { productCategoryModel, faqsCategoryModel };
