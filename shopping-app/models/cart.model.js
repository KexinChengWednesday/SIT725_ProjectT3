const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number, 
      required: [true, "Product ID is required"],
      index: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    cart_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    user_id: {
      type: String,
      required: [true, "User ID is required"],
      unique: true, 
      index: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "abandoned", "checked_out"],
      default: "active",
    },
  },
  {
    collection: "carts",
    timestamps: true,
    strict: "throw",
  }
);

module.exports = mongoose.model("Cart", cartSchema);
