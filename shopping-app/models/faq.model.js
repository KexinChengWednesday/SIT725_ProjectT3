const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    faq_id: {
      type: Number,
      required: true,
      unique: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    category: {
      type: String,
      required: true,
      validate: {
        validator: async function (value) {
          const Category = mongoose.model("FQAsCategory");
          const category = await Category.findOne({ category_id: value });
          return category !== null;
        },
        message: "Invalid category ID",
      },
    },
  },
  { collection: "faq-questions", timestamps: true, strict: "throw" }
);

module.exports = mongoose.model("FAQsQuestion", faqSchema);

