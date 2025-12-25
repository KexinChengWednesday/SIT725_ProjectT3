const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  {
    collection: "banners",
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", bannerSchema);
