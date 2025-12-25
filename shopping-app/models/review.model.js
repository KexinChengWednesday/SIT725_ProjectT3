const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review_id: {
      type: Number,
      required: true,
      unique: true,
    },
    product_id: {
      type: String,
      required: true,
      validate: {
        validator: async function (value) {
          const Product = mongoose.model("Product");
          const product = await Product.findOne({ product_id: value });
          return product !== null;
        },
        message: "Invalid product ID",
      },
    },
    user_id: {
      type: String,
      required: true,
      validate: {
        validator: async function (value) {
          const User = mongoose.model("User");
          const user = await User.findOne({ user_id: value });
          return user !== null;
        },
        message: "Invalid user ID",
      },
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { collection: "reviews", timestamps: true }
);

module.exports = new mongoose.model("Review", reviewSchema);
